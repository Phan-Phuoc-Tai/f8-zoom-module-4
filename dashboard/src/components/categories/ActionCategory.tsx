"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "../modals/Modal";
import UpdateForm from "./UpdateForm";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import AlertModal from "../modals/AlertModal";
import DeleteCategory from "./DeleteCategory";
type Props = {
  id: string;
};
export default function ActionCategory({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  return (
    <div className="flex gap-2">
      <Edit className="w-5 h-5 cursor-pointer" onClick={() => setOpen(true)} />
      <Trash2
        className="w-5 h-5 cursor-pointer text-red-400"
        onClick={() => setOpenAlert(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={CATEGORY_CONFIG.MODAL.UPDATE_FORM.TITLE}
      >
        <UpdateForm onClose={() => setOpen(false)} id={id} />
      </Modal>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={CATEGORY_CONFIG.MODAL.DELETE.TITLE}
      >
        <DeleteCategory onClose={() => setOpenAlert(false)} id={id} />
      </AlertModal>
    </div>
  );
}
