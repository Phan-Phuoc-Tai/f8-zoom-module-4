import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type Props = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  titleColor: string;
};
export default function AlertModal({
  children,
  open,
  onClose,
  title,
  titleColor,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={titleColor}>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{children}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
