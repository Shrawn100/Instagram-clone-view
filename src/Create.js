import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";

const Create = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectStatus, setSelectStatus] = useState(false);

  const fileInputRef = useRef(null);

  const handleOpenFolderClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const newFiles = [...files];
    for (const file of e.dataTransfer.files) {
      newFiles.push(file);
    }
    setFiles(newFiles);
  };

  const handleFileSelect = (selectedFiles) => {
    const newFiles = [...files];
    for (const file of selectedFiles) {
      newFiles.push(file);
    }
    setFiles(newFiles);
    setSelectStatus(true);
  };
  const handleBackClick = () => {
    setFiles([]);
    setSelectStatus(false);
  };

  useEffect(() => {
    function view() {
      if (files.length > 0) {
        console.log(files);
        console.log(URL.createObjectURL(files[0]));
      }
    }
    view();
  });

  return (
    <div className="create-page-wrapper-two">
      <nav className="create-modal-nav">
        {selectStatus ? (
          <>
            <button onClick={handleBackClick}>Back</button>
            <button>Next</button>
          </>
        ) : (
          <>
            <button className="close-modal">Cancel</button>
          </>
        )}
      </nav>
      {selectStatus ? (
        <></>
      ) : (
        <>
          <div
            className={`drag-drop-container ${dragging ? "dragging" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="drop-area">
              <button
                className="open-folder-btn"
                onClick={handleOpenFolderClick}
              >
                Open Folder
              </button>
              <input
                type="file"
                multiple
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files)}
              />

              <p>Drag and drop photos/videos here</p>
            </div>
          </div>
        </>
      )}

      <div className="image-previews">
        {files.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="image-preview"
          />
        ))}
      </div>
    </div>
  );
};

export default Create;
