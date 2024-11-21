import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { imgBaseURL, wsURL } from "@/constants";
import { cn } from "@/lib/utils";
import { UserProps } from "@/types/user";
import { setUTCTime } from "@/utils/date";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WsContext } from "../page";

export const Sidebar = () => {
  const params = useParams();
  const { setWs } = useContext<any>(WsContext);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const websocket = new WebSocket(`${wsURL}top-users/`);
    setWs(websocket);

    websocket.onopen = () => {
      // console.log("WebSocket connection opened");
    };

    websocket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        setUsers(data.users || []);
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    websocket.onclose = () => {
      // console.log("WebSocket connection closed");
    };

    return () => {
      websocket.close();
    };
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full h-full border-r overflow-y-auto">
      <div className="p-3">
        <Input
          className="bg-muted"
          placeholder="Search"
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div>
        {filteredUsers?.map(user => {
          return (
            <Link
              key={user?.id}
              to={`${user?.id}?name=${user.name}`}
              className={cn(
                "flex items-center gap-4 border-b p-4 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                user?.id.toString() === params.id && "bg-sidebar-accent",
              )}
            >
              <Avatar>
                <AvatarImage
                  src={`${imgBaseURL}${user?.profile_photo}`}
                  alt={`${user?.name}'s profile photo`}
                />
                <AvatarFallback className="font-bold bg-primary/50">
                  {user?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{user?.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    {setUTCTime(user?.last_message_time, "hh:mm")}
                  </span>
                </div>
                <div className="flex items-end gap-1 justify-between">
                  <p className="text-sm text-muted-foreground w-[calc(100%-20px)]">
                    {user?.latest_msg_text?.length < 50
                      ? user?.latest_msg_text
                      : `${user?.latest_msg_text?.slice(0, 50)}...`}
                  </p>
                  {user?.is_have_unread_msg && (
                    <div className="w-4 h-4 rounded-full bg-destructive"></div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}

        {filteredUsers?.length === 0 && (
          <div className="text-center flex flex-col items-center">
            <div
              className="w-12 h-12 bg-muted-foreground"
              style={{
                maskImage: "url(/empty-folder.png)",
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "cover",
              }}
            ></div>
            <p className="text-muted-foreground ml-2 text-sm">No Users Available</p>
          </div>
        )}
      </div>
    </div>
  );
};
