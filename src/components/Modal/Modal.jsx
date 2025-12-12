import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

ReactModal.setAppElement("#root");

export default function Modal({ isOpen, closeModal, selectedImage }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Image Modal"
    >
      {selectedImage && (
        <img
          src={selectedImage.urls?.regular}
          alt={selectedImage.alt_description || selectedImage.id}
          onClick={closeModal}
          style={{
            cursor: "pointer",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        />
      )}
    </ReactModal>
  );
}
