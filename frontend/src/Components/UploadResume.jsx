const UploadResume = ({ setResume }) => {
  return (
    <div className="upload-resume">
      <h3 className="upload-title">Upload Resume (PDF / DOCX)</h3>

      <label className="upload-box">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <span className="upload-text">Choose file</span>
      </label>
    </div>
  );
};

export default UploadResume;
