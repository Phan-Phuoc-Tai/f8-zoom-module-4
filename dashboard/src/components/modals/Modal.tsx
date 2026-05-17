import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
type Props = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  titleColor: string;
  width?: string;
};
export default function Modal({
  children,
  open,
  onClose,
  title,
  titleColor,
  width,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={width}>
        <DialogHeader>
          <DialogTitle className={titleColor}>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="py-2 ">{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
