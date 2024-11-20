import { useUserStore } from "@/store/user";
import {
  AlertDialogDescription,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface LogoutDialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpenDialog: boolean) => void;
}

export const LogoutDialog = ({ isOpenDialog, setIsOpenDialog }: LogoutDialogProps) => {
  const logOut = useUserStore(state => state.setClearUser);

  return (
    <AlertDialog open={isOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out from your account. You can log in again anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpenDialog(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              logOut();
              setIsOpenDialog(false);
            }}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
