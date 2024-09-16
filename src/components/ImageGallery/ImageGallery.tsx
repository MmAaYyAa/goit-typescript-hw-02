import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";
import { ImageGalleryProps } from "../ComponentsProps/Props.types";

const ImageGallery: React.FC<ImageGalleryProps> = ({ hits, onClick }) => {
  return (
    <>
      <ImageGalleryList className="gallery">
        {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        ))}
      </ImageGalleryList>
    </>
  );
};
export default ImageGallery;
