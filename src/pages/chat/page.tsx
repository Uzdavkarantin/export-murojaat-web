import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTER } from "@/constants/routers";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline, IoMdSettings } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { answerSuggestion, getSuggestions } from "@/apis/users/chat";
import { AnswerProps, SuggestionProps } from "@/types/suggestion";
import { setUTCTime } from "@/utils/date";
import { Skeleton } from "@/components/ui/skeleton";
import { getRobotUserById } from "@/apis/users/user";
import { WsContext } from "../inbox/page";

const Page = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const chatContentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ws } = useContext<any>(WsContext);
  const [latestSuggestion, setLatestSuggestion] = useState<SuggestionProps | null>();
  const [newMessage, setNewMessage] = useState("");

  const { data: userInfo, isLoading: loadingUserInfo } = useQuery({
    queryKey: [QUERY_KEYS.GET_ROBOT_USER_ID, params.id],
    queryFn: () => getRobotUserById(params.id),
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ID_SUGGESTIONS, params.id],
    queryFn: () => getSuggestions(params.id),
  });

  const { mutate, isPending: isSending } = useMutation({
    mutationFn: async (data: { text: string }) => {
      if (latestSuggestion?.id) {
        await answerSuggestion(latestSuggestion.id, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_ID_SUGGESTIONS],
      });
    },
  });

  const refreshWebSocket = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: "refresh" }));
    }
  };

  useEffect(() => {
    if (data?.data) {
      setLatestSuggestion(data?.data[0]);
      refreshWebSocket();
    }
  }, [data]);

  const handleSend = (text: string) => {
    if (text.trim()) {
      mutate({ text });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [data]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [params.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(ROUTER.INBOX);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const messages = data?.data?.slice()?.reverse() || [];

  if (isError)
    return (
      <div className="h-full w-full overflow-y-auto flex justify-center items-center max-sm:bg-background max-sm:fixed left-0 right-0 top-0 bottom-0 z-20">
        <Button variant="outline" className="rounded-full px-10">
          Error loading chat. Please try again.
        </Button>
      </div>
    );

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col justify-between max-sm:bg-background max-sm:fixed left-0 right-0 top-0 bottom-0 z-20">
      <div className="p-2 h-16 border-b flex items-center justify-between">
        {isLoading || loadingUserInfo ? (
          <div className="p-2">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2">
              <Button variant={"ghost"} size={"icon"} onClick={() => navigate(ROUTER.INBOX)}>
                <ArrowLeft />
              </Button>
              <Avatar>
                <AvatarImage
                  src={userInfo?.profile_photo}
                  alt={`${userInfo?.fish}'s profile photo`}
                />
                <AvatarFallback className="font-bold">
                  {userInfo?.fish.slice(0, 1).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">
                  {userInfo?.fish}
                  <span className="ml-1">{userInfo?.lang === "uz" ? "🇺🇿" : "🇷🇺"}</span>
                </h2>
                <p className="text-sm text-muted-foreground">{userInfo?.phone}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="" variant={"ghost"} size={"icon"}>
                  <BsThreeDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2">
                <DropdownMenuItem>
                  <IoMdSettings size={18} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IoMdCloseCircleOutline size={18} />
                  <span>Clear Chat History</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MdDelete size={18} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col p-2 gap-2 justify-end h-full overflow-y-hidden">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <Skeleton className="h-10 w-[calc(50%-20px)] animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div ref={chatContentRef} className="p-4 h-[100%] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-center text-muted-foreground">No messages here yet.</p>
            </div>
          ) : (
            messages.map((message: SuggestionProps, index: number) => (
              <div key={index} className="flex flex-col">
                {/* SUGGESTION */}
                <div className={`flex justify-start my-1`}>
                  <div className={`max-w-[80%] rounded-xl px-4 pr-14 py-2 relative bg-muted`}>
                    <p className="text-sm">
                      <span className="text-blue-500">#{message.hashtag}</span>
                      <br />
                      <br />
                      {message.text}
                    </p>
                    <div className="text-end absolute right-3 bottom-1 z-[2]">
                      <span className="text-xs">{setUTCTime(message.created_at, "hh:mm")}</span>
                    </div>
                  </div>
                </div>

                {/* ANSWER(S) */}
                {message.answers
                  .slice()
                  .reverse()
                  .map((item: AnswerProps, i: number) => (
                    <div className={`flex justify-end my-1`} key={i}>
                      <div
                        className={`max-w-[80%] rounded-xl px-4 pr-14 py-2 relative bg-primary text-primary-foreground`}
                      >
                        <p className="text-sm">{item.text}</p>
                        <div className="text-end absolute right-3 bottom-1 z-[2]">
                          <span className="text-xs">{setUTCTime(item.created_at, "hh:mm")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      )}

      <div className="p-2 h-16 border-t flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend(newMessage)}
          className="flex-1"
          ref={inputRef}
        />
        <Button
          size="icon"
          onClick={() => handleSend(newMessage)}
          loading={isSending}
          disabled={newMessage.trim().length === 0}
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
