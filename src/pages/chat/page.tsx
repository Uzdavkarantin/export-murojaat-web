import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTER } from "@/constants/routers";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const Page = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const chatContentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [latestSuggestion, setLatestSuggestion] = useState<SuggestionProps | null>();
  const [newMessage, setNewMessage] = useState("");

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

  useEffect(() => {
    if (data?.data?.results) {
      setLatestSuggestion(data?.data?.results[0]);
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
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
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

  const messages = data?.data?.results?.slice().reverse() || [];

  if (isLoading) return <div>Loading chat...</div>;
  if (isError) return <div>Error loading chat. Please try again.</div>;

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col justify-between max-sm:bg-background max-sm:fixed left-0 right-0 top-0 bottom-0 z-20">
      <div className="p-2 h-16 border-b flex items-center justify-between">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <Button variant={"ghost"} size={"icon"} onClick={() => navigate(ROUTER.INBOX)}>
              <ArrowLeft />
            </Button>
            <Avatar>
              <AvatarFallback className="font-bold">
                {params.id?.slice(0, 1).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Sofia Davis</h2>
              <p className="text-sm text-muted-foreground">{params.id}</p>
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
      </div>

      <div ref={chatContentRef} className="p-4 h-[100%] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message: SuggestionProps, index: number) => (
            <div key={index} className="flex flex-col">
              {/* SUGGESTION */}
              <div className={`flex justify-start my-1`}>
                <div className={`max-w-[80%] rounded-xl px-4 pr-14 py-2 relative bg-muted`}>
                  <p className="text-sm">
                    <span className="text-blue-500">#{message.hashtag}</span>
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
      <div className="p-2 h-16 border-t flex items-center gap-2">
        <Button size="icon" variant={"outline"} className="relative p-2">
          <div
            className="w-5 h-5 absolute dark:bg-white bg-black"
            style={{
              maskImage: "url(/attach.png)",
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          ></div>
          <Input type="file" className="opacity-0" />
        </Button>
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
