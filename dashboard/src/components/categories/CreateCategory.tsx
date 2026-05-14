"use client";
import CreateForm from "@/components/categories/CreateForm";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateCategory() {
  const [open, setOpen] = useState<boolean>(false);
  const ADD_FORM = CATEGORY_CONFIG.MODAL.ADD_FORM;
  return (
    <div>
      <Button
        className="px-6 py-2 h-auto w-auto bg-transparent border-(--primary-color) text-(--primary-color) cursor-pointer hover:underline hover:bg-(--primary-color)/10"
        onClick={() => setOpen(true)}
      >
        <>
          <Plus /> {CATEGORY_CONFIG.ADD_BTN}
        </>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={ADD_FORM.TITLE}>
        <CreateForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
