import React, { createContext, useState, useContext } from 'react';

export const UploadedFileContext = createContext();

export const UploadedFileProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null); // Initialize with null or default value

  return (
    <UploadedFileContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </UploadedFileContext.Provider>
  );
};

export const useUploadedFile = () => {
  const context = useContext(UploadedFileContext);
  if (!context) {
    throw new Error('useUploadedFile must be used within a UploadedFileProvider');
  }
  return context;

  };
