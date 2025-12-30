"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function ModalSection() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Modal
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          footer={
            <div className="flex gap-2.5 xl:gap-5 justify-end">
              <Button
                variant="secondary"
                size="small"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => setModalOpen(false)}
              >
                Confirm
              </Button>
            </div>
          }
        >
          <p className="text-primary-text mb-2.5 xl:mb-5">
            This is an example modal component. It features a backdrop, header
            with close button, scrollable body content, and a customizable
            footer.
          </p>
          <p className="text-secondary-text mb-2.5 xl:mb-5">
            You can put any content here, including forms, images, or other
            components.
          </p>
        </Modal>
      </div>
    </section>
  );
}
