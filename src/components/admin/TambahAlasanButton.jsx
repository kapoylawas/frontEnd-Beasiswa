// components/TambahAlasanButton.js
import React, { useState } from "react";
import AlasanKkModal from "./AlasanKkModal";

export default function TambahAlasanButton({ 
    item, 
    onAlasanSaved,
    variant = "primary"
}) {
    const [showAlasanModal, setShowAlasanModal] = useState(false);

    const handleOpenAlasanModal = (e) => {
        e.stopPropagation();
        setShowAlasanModal(true);
    };

    const handleCloseAlasanModal = () => {
        setShowAlasanModal(false);
    };

    const handleAlasanSaved = (itemId, alasan) => {
        if (onAlasanSaved) {
            onAlasanSaved(itemId, alasan);
        }
        setShowAlasanModal(false);
    };

    const getButtonProps = () => {
        const baseProps = {
            onClick: handleOpenAlasanModal,
            className: "btn btn-sm",
            title: item.alasan_kk ? "Edit Alasan" : "Tambah Alasan"
        };

        switch (variant) {
            case "outline":
                return {
                    ...baseProps,
                    className: `${baseProps.className} btn-outline-primary`
                };
            case "success":
                return {
                    ...baseProps,
                    className: `${baseProps.className} btn-success`
                };
            case "warning":
                return {
                    ...baseProps,
                    className: `${baseProps.className} btn-warning`
                };
            default:
                return {
                    ...baseProps,
                    className: `${baseProps.className} btn-primary`
                };
        }
    };

    const buttonProps = getButtonProps();

    return (
        <>
            <button {...buttonProps}>
                {item.alasan_kk ? (
                    <>
                        <i className="fa fa-edit me-1"></i> Edit
                    </>
                ) : (
                    <>
                        <i className="fa fa-plus me-1"></i> Tambah
                    </>
                )}
            </button>

            {showAlasanModal && (
                <AlasanKkModal
                    item={item}
                    show={showAlasanModal}
                    onClose={handleCloseAlasanModal}
                    onSave={handleAlasanSaved}
                />
            )}
        </>
    );
}