import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null);
  const [shouldOpenChatbot, setShouldOpenChatbot] = useState(false);

  const setImage = (file, base64, mimeType) => {
    setUploadedImage(file);
    setImageBase64(base64);
    setImageMimeType(mimeType);
    setShouldOpenChatbot(true);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImageBase64(null);
    setImageMimeType(null);
  };

  return (
    <ImageContext.Provider
      value={{
        uploadedImage,
        imageBase64,
        imageMimeType,
        shouldOpenChatbot,
        setImage,
        clearImage,
        setShouldOpenChatbot,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within ImageProvider");
  }
  return context;
}

