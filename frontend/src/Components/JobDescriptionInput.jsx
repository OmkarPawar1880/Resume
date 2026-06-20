const JobDescriptionInput = ({ jd, setJd }) => {
  return (
    <div className="jd-input">
      <h3 className="jd-title">Job Description</h3>

      <textarea
        className="jd-textarea"
        rows="6"
        placeholder="Paste job description & responsibilities..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
    </div>
  );
};

export default JobDescriptionInput;
