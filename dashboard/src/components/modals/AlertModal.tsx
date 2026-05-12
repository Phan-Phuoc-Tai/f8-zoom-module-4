import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type Props = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
};
export default function AlertModal({ children, open, onClose, title }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-(--secondary-color)">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{children}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
