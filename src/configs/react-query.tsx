import { type ErrorProps } from "@/types/error";
import { QueryCache, QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

const mutationCache = new MutationCache({
  onError: res => {
    const error = res as unknown as ErrorProps;
    console.log(error);
    if (error?.response) {
      toast.error(
        error?.response?.data?.detail ? error?.response?.data?.detail : error?.response?.statusText,
      );
    } else {
      toast.error(error.message);
    }
  },
});

const queryCache = new QueryCache({
  onError: res => {
    const error = res as unknown as ErrorProps;
    console.log(error);
    if (error?.response) {
      toast.error(
        error?.response?.data?.detail ? error?.response?.data?.detail : error?.response?.statusText,
      );
    } else {
      toast.error(error.message);
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
