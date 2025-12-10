const ErrorMessage = ({ message }) => {
  return (
    <p>
      An error occurred: The image gallery could not be loaded. Error message:
      {message}{" "}
    </p>
  );
};

export default ErrorMessage;
