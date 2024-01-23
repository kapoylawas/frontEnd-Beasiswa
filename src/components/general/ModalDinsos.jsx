import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalDinsos() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Beasiswa Dinas Sosial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            mahasiswa dari keluarga kurang mampu yang terdaftar dalam Data
            Terpadu Kesejahteraan Sosial (DTKS) atau Non DTKS yang dibuktikan
            dengan melampirkan Surat Keterangan Tidak Mampu (SKTM) dari Desa
          </p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
