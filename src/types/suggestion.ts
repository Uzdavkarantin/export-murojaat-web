import { RobotUserProps } from "./user";

export interface AnswerProps {
  created_at: string;
  id: number | string;
  text: string;
}

export interface SuggestionProps {
  answers: AnswerProps[];
  created_at: string;
  hashtag: string;
  id: number | string;
  text: string;
}

export interface DashboardSuggestionProps {
  id: number;
  text: string;
  created_at: string;
  hashtag: string;
  user: RobotUserProps;
}
