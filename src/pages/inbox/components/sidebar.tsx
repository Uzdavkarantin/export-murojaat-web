import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { imgBaseURL, wsURL } from "@/constants";
import { cn } from "@/lib/utils";
import { UserProps } from "@/types/user";
import { setUTCTime } from "@/utils/date";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// const mails = [
//   {
//     name: "William Smith",
//     email: "williamsmith@example.com",
//     subject: "Meeting Tomorrow",
//     date: "09:34 AM",
//     teaser:
//       "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
//   },
// ];

export const Sidebar = () => {
  const params = useParams();
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`${wsURL}top-users/`);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        setUsers(data.users || []);
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-full border-r h-full overflow-y-auto">
      <div className="p-3">
        <Input className="bg-muted" placeholder="Search" type="search" />
      </div>
      <div>
        {users.map(user => {
          return (
            <Link
              key={user.chatId}
              to={user.id.toString()}
              className={cn(
                "flex items-center gap-4 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                user.id.toString() === params.id && "bg-sidebar-accent",
              )}
            >
              <Avatar>
                <AvatarImage src={`${imgBaseURL}${user.profile_photo}`} />
                <AvatarFallback className="font-bold bg-primary/50">
                  {user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{user.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    {setUTCTime(user.last_message_time, "hh:mm")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-muted-foreground">
                    {user.latest_msg_text.slice(0, 50)}...
                  </p>
                </div>
              </div>
            </Link>
          );
        })}

        {users.length === 0 ? <div className="p-4 text-center">No users available</div> : ""}
      </div>
    </div>
  );
};
