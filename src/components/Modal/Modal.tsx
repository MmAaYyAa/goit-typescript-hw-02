import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalStyled } from "./Modal.styled";
import { ModalProps } from "../../components/ComponentsProps/Props.types";

const modalRoot = document.querySelector("#root-modal") as HTMLElement;
export default function Modal({ largeImageURL, onClose, tags }: ModalProps) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  if (!largeImageURL || !tags || !modalRoot) return null;

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
}
