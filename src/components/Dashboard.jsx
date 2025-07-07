import React, { useRef } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onFileChange, onUpload, uploadMessage, loading }) => {
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.email}</h2>
      <div
        className="file-drop-area"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        <p>Drag & drop a hash file here, or click to select</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>
      <button className="upload-btn" onClick={onUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
      <div className="dashboard-section">
        <h3>Your Uploaded Files</h3>
        <div className="placeholder">(Coming soon)</div>
      </div>
      <div className="dashboard-section">
        <h3>Hash Comparison Results</h3>
        <div className="placeholder">(Coming soon)</div>
      </div>
    </div>
  );
};

export default Dashboard; 