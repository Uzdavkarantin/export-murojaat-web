import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const mails = [
  {
    name: "William Smith",
    email: "williamsmith@example.com",
    subject: "Meeting Tomorrow",
    date: "09:34 AM",
    teaser:
      "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
  },
  {
    name: "Alice Smith",
    email: "alicesmith@example.com",
    subject: "Re: Project Update",
    date: "Yesterday",
    teaser:
      "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
  },
  {
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    subject: "Weekend Plans",
    date: "2 days ago",
    teaser:
      "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    subject: "Re: Question about Budget",
    date: "2 days ago",
    teaser:
      "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
  },
  {
    name: "Michael Wilson",
    email: "michaelwilson@example.com",
    subject: "Important Announcement",
    date: "1 week ago",
    teaser:
      "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
  },
  {
    name: "Sarah Brown",
    email: "sarahbrown@example.com",
    subject: "Re: Feedback on Proposal",
    date: "1 week ago",
    teaser:
      "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
  },
  {
    name: "David Lee",
    email: "davidlee@example.com",
    subject: "New Project Idea",
    date: "1 week ago",
    teaser:
      "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
  },
  {
    name: "Olivia Wilson",
    email: "oliviawilson@example.com",
    subject: "Vacation Plans",
    date: "1 week ago",
    teaser:
      "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
  },
  {
    name: "James Martin",
    email: "jamesmartin@example.com",
    subject: "Re: Conference Registration",
    date: "1 week ago",
    teaser:
      "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
  },
  {
    name: "Sophia White",
    email: "sophiawhite@example.com",
    subject: "Team Dinner",
    date: "1 week ago",
    teaser:
      "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
  },
];

export const Sidebar = () => {
  return (
    <div className="w-72 border-r h-full overflow-auto">
      <div className="p-3">
        <Input className="bg-muted" placeholder="Search" type="search" />
      </div>
      <div>
        {mails.map(mail => (
          <Link
            to={mail.email}
            key={mail.email}
            className="flex items-center gap-4 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Avatar>
              {/* <AvatarImage src={img} alt={mail.name} /> */}
              <AvatarFallback className="font-bold bg-primary/50">
                {mail.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold truncate">{mail.name}</h2>
                <span className="text-xs text-muted-foreground">12:36</span>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-muted-foreground truncate">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptas. Qui
                  reprehenderit officia quia rem dolor, maxime eius consectetur dolore.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
