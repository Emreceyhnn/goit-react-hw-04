import "./App.css";
import { getPhotos } from "./api";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { InfinitySpin } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ReactModal from "react-modal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "0",
      padding: "0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };
  ReactModal.setAppElement("#root");

  const fetchPhotos = async (searchQuery, pageNum = 1, isLoadMore = false) => {
    setLoading(true);
    try {
      const photos = await getPhotos(searchQuery, pageNum);
      if (isLoadMore) {
        setImages((prev) => [...prev, ...photos]);
      } else {
        setImages(photos);
      }
    } catch (error) {
      setLoading(false);
      return <ErrorMessage message={error.message} />;
    }
    setLoading(false);
  };

  const notification = () =>
    toast.error("Lütfen Arama Yapmak İçin Metin Giriniz");

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
      <ImageGallery imageList={images} imageOnclick={imageClickHandler} />
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
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        {selectedImage && (
          <img
            src={selectedImage.urls?.regular}
            alt={selectedImage.alt_description || selectedImage.id}
            style={{
              cursor: "pointer",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          />
        )}
      </ReactModal>
      {images.length !== 0 && <LoadMoreBtn onclick={handleLoadMore} />}
      <Toaster />
    </>
  );
}

export default App;
