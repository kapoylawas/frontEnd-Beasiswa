import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalKesra() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Beasiswa Prestasi Bidang Keagamaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            mahasiswa yang memiliki prestasi baik tingkat Internasional,
            Nasional, Provinsi dan Kabupaten pada bidang keagamaan yang
            dibuktikan dengan sertifikat, piagam dan/atau surat keterangan dari
            pejabat yang berwenang
          </p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
