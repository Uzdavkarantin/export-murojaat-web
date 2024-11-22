import { getSuggestionsByCategoryId } from "@/apis/dashboard/statistics";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUERY_KEYS } from "@/constants/query-keys";
import { setUTCTime } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface SuggestionsModalProps {
  isOpenSuggestionsModal: boolean;
  setIsOpenSuggestionsModal: (isOpenSuggestionsModal: boolean) => void;
  categoryId: number;
}

export const SuggestionsModal = (props: SuggestionsModalProps) => {
  const { isOpenSuggestionsModal, setIsOpenSuggestionsModal, categoryId } = props;

  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_SUGGESTIONS_BY_CATEGORY_ID, categoryId, pageNumber],
    queryFn: () => getSuggestionsByCategoryId(categoryId, pageNumber),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader />
      </div>
    );
  }

  return (
    <Dialog open={isOpenSuggestionsModal}>
      <DialogContent className="w-[calc(100%-200px)]">
        <DialogHeader>
          <DialogTitle>Total suggestions: {data?.count}</DialogTitle>
          <DialogDescription>You can see total suggestions here</DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Hashtag</TableHead>
                <TableHead>Text</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((suggestion, index) => (
                <TableRow key={suggestion.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{suggestion.user.fish}</TableCell>
                  <TableCell className="text-blue-500">#{suggestion.hashtag}</TableCell>
                  <TableCell>{suggestion.text}</TableCell>
                  <TableCell>{setUTCTime(suggestion.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-5 flex items-center justify-center gap-2">
            <PaginationPrevious
              onClick={() => (data?.previous ? setPageNumber(pageNumber - 1) : null)}
            />
            <PaginationNext onClick={() => (data?.next ? setPageNumber(pageNumber + 1) : null)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpenSuggestionsModal(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
