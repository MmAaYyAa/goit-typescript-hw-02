import React, { Component } from "react";
import {
  ImageGalleryItemImg,
  ImageGalleryItemStyled,
} from "./ImageGalleryItem.styled";
import { ImageGalleryItemProps } from "../ComponentsProps/Props.types.ts";

interface ImageGalleryItemState {
  largeImageURL: string;
  tags: string;
}

export default class ImageGalleryItem extends Component<ImageGalleryItemProps> {
  state: ImageGalleryItemState = {
    largeImageURL: this.props.largeImageURL,
    tags: this.props.tags,
  };
  handleImageClick = () => {
    this.props.onClick(this.state);
  };
  render() {
    const { webformatURL, tags } = this.props;
    return (
      <>
        <ImageGalleryItemStyled
          className="gallery-item"
          onClick={this.handleImageClick}
        >
          <ImageGalleryItemImg src={webformatURL} alt={tags} />
        </ImageGalleryItemStyled>
      </>
    );
  }
}
