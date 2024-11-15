import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTER } from "@/constants/routers";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline, IoMdCopy, IoMdSettings } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  content: string;
  sender: "user" | "agent";
}

const Page = () => {
  const params = useParams();
  const navigate = useNavigate();
  const chatContent = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { content: "Hi, how can I help you today?", sender: "agent" },
    { content: "Hey, I'm having trouble with my account.", sender: "user" },
    { content: "What seems to be the problem?", sender: "agent" },
    { content: "I can't log in.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { content: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatContent.current) {
      chatContent.current.scrollTop = chatContent.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [params.id]);

  // Add Escape key handling for navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(ROUTER.INBOX);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

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

      <div>
        <div
          ref={chatContent}
          className="p-4 h-[calc(100vh-192px)] overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((message, index) => (
            <ContextMenu key={index}>
              <ContextMenuTrigger>
                <div
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 pr-14 py-2 relative ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-end absolute right-3 bottom-1 z-[2]">
                      <span className="text-xs">14:18</span>
                    </div>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <IoMdCopy size={18} />
                  <span className="ml-2">Copy Text</span>
                </ContextMenuItem>
                <ContextMenuItem>
                  <IoCheckmarkDoneOutline size={18} />
                  <span className="ml-2">13 Nov 2024 at 15:42:30</span>
                </ContextMenuItem>
                <ContextMenuItem>
                  <MdEdit size={18} />
                  <span className="ml-2">Edit</span>
                </ContextMenuItem>
                <ContextMenuItem>
                  <MdDelete size={18} />
                  <span className="ml-2">Delete</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
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
            onKeyDown={e => e.key === "Enter" && handleSend()}
            className="flex-1"
            ref={inputRef}
          />
          <Button size="icon" onClick={handleSend} disabled={newMessage.trim().length === 0}>
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
