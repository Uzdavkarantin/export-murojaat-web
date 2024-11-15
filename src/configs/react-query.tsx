import { type ErrorProps } from "@/types/error";
import { QueryCache, QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

const mutationCache = new MutationCache({
  onError: res => {
    const error = res as unknown as ErrorProps;
    console.log(error);
    toast.error(error.response.data?.detail ?? error.response.statusText ?? "An Error Occured!");
  },
});

const queryCache = new QueryCache({
  onError: res => {
    const error = res as unknown as ErrorProps;
    console.log(error);
    toast.error(error.response.data?.detail ?? error.response.statusText ?? "An Error Occured!");
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
