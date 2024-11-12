export interface ErrorProps {
  status: number;
  message?: string;
  response: { data: { detail: string }; status: number; statusText?: string };
}
