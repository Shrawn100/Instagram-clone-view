import React, { useState, useRef } from "react";

const Create = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

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
  };

  return (
    <div
      className={`drag-drop-container ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="drop-area">
        <button className="open-folder-btn" onClick={handleOpenFolderClick}>
          Open Folder
        </button>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
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
        {files.length === 0 ? (
          <p>Drag and drop photos/videos here</p>
        ) : (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Create;
