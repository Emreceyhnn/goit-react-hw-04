import "./App.css";
import { getPhotos } from "./api";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { InfinitySpin } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Modal from "./components/Modal/Modal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, SetErrorMessage] = useState("");

  const fetchPhotos = async (searchQuery, pageNum = 1, isLoadMore = false) => {
    setLoading(true);
    SetErrorMessage("");

    try {
      const photos = await getPhotos(searchQuery, pageNum);

      if (!photos || photos.length === 0) {
        if (!isLoadMore) {
          setImages([]);
          SetErrorMessage("No images found. Try a different search.");
        }
        return;
      }

      if (isLoadMore) {
        setImages((prev) => [...prev, ...photos]);
      } else {
        setImages(photos);
      }
    } catch (error) {
      SetErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const notification = () => toast.error("Please enter text to search.");

  const submitHandler = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      notification();
      return;
    }
    setPage(1);
    fetchPhotos(query, 1, false);
  };

  const searchBarHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPhotos(query, nextPage, true);
  };
  const imageClickHandler = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={submitHandler} onChange={searchBarHandler} />

      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <ImageGallery imageList={images} imageOnclick={imageClickHandler} />
      )}
      {loading && (
        <InfinitySpin
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />

      {images.length !== 0 && <LoadMoreBtn onclick={handleLoadMore} />}
      <Toaster />
    </>
  );
}

export default App;
