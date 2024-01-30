import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalFinish() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>PERINGATAN !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            HARAP CENTANG TERLEBIH DAHULU VERIFIKASI USER SUBMIT DATA ANDA !!!!
          </p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
