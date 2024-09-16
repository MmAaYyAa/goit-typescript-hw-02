import { Image } from "../../api/apiTypes";

export interface ImageGalleryItemProps {
  id?: number;
  largeImageURL: string;
  tags: string;
  webformatURL: string;
  onClick: (state: { largeImageURL: string; tags: string }) => void;
}

export interface ImageGalleryProps {
  hits: Image[];
  onClick: (state: { largeImageURL: string; tags: string }) => void;
}

export interface SearchbarProps {
  onSubmit: (inputValue: string) => void;
}

export interface ButtonProps {
  handleBtnLoad: () => void;
}

export interface ModalProps {
  largeImageURL: string;
  onClose: () => void;
  tags: string;
}
