export interface UserProps {
  id: number;
  is_have_unread_msg: boolean;
  last_message_time: string;
  latest_msg_text: string;
  name: string;
  phone: string;
  profile_photo: string;
}

export interface RobotUserProps {
  chat_id: string;
  fish: string;
  joined_at: string;
  lang: string;
  phone: string;
  profile_photo: string;
}
