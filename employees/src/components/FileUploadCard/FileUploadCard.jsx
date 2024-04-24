/* eslint-disable react/prop-types */
// Styles
import './FileUploadCard.css';
// SVG
import Info from '../../assets/svg/info.svg';
// Components
import Toast from '../Toast';

const FileUploadCard = ({
  selectedFile,
  handleFileChange,
  handleTriggerInfo,
  showToast,
  handleCloseToast,
  toastMessage,
}) => {
  return (
    <section className="employees-container">
      <article className="employees-card">
        <h1 className="mb-60">
          Identify the pair of employees who have worked together on common
          projects for the longest period of time.
        </h1>
        <label htmlFor="file-upload" className="upload-button">
          {selectedFile ? selectedFile.name : 'Upload File'}
        </label>
        <input
          id="file-upload"
          type="file"
          className="file-input"
          onChange={handleFileChange}
          accept=".csv"
        />
        <div className="info-container">
          <div className="tooltip" onClick={handleTriggerInfo}>
            <div className="info-icon cursor-pointer">
              <img src={Info} alt="" />
            </div>
            <span className="tooltip-text">Click for info</span>
          </div>
        </div>
        <Toast
          showToast={showToast}
          handleClose={handleCloseToast}
          message={toastMessage}
        />
      </article>
    </section>
  );
};

export default FileUploadCard;
