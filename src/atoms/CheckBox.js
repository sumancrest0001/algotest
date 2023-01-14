const Checkbox = ({ label, onChangeHandler }) => {
  return (
    <div className="checkbox-container">
      <label>
        <input
          type="checkbox"
          onChange={onChangeHandler}
          className="checkbox"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
