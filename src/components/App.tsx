import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { serviceGetPhotos } from "../api/api";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import StyledApp from "../App.styled";
import { Image } from "../api/apiTypes";

interface ModalObj {
  largeImageURL: string;
  tags: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [gallery, setGallery] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quantityPages, setQuantityPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [largeImageURL, setLargeImageURL] = useState<string | null>(null);
  const [tags, setTags] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      Notify.failure(error);
    }
  }, [error]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await serviceGetPhotos(
          searchQuery,
          currentPage
        );
        if (!hits.length) {
          Notify.failure("Sorry,no images found.Please,try again.");
          return;
        }
        if (hits.length > 0) {
          setGallery((prev: Image[]) => [...prev, ...hits]);
          setQuantityPages(Math.ceil(totalHits / 12));
        }
      } catch (error: any) {
        Notify.failure(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [currentPage, searchQuery]);

  const handleFormSubmit = (searchQuery: string) => {
    setCurrentPage(1);
    setQuantityPages(null);
    setGallery([]);
    setError(null);
    setSearchQuery(searchQuery);
  };

  const handleModal = (obj: ModalObj) => {
    setIsLoading(false);
    setShowModal(true);
    setLargeImageURL(obj.largeImageURL);
    setTags(obj.tags);
  };

  const onClose = () => {
    setIsLoading(false);
    setShowModal(false);
  };

  const handleBtnLoad = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {isLoading && <Loader />}

      {gallery && gallery.length > 0 && (
        <ImageGallery hits={gallery} onClick={handleModal} />
      )}
      {currentPage < (quantityPages ?? 0) && (
        <Button handleBtnLoad={handleBtnLoad} />
      )}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL || ""}
          tags={tags || ""}
          onClose={onClose}
        />
      )}
    </StyledApp>
  );
}
