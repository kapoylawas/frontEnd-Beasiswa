import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalLuarNegeri() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            CONTOH SCREENSHOT PERGURUAN TINGGI YANG DIAKUI DIKTI{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <img
              src={"/images/luar_negeri.png"}
              width={"475"}
              height={"320"}
            />
          </p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
