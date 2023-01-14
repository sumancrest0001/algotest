const Input = ({
  label,
  value,
  onChangeHandler,
  placeholder,
  boldLabel,
  ...otherProps
}) => {
  return (
    <div className="input-container">
      {label ? (
        <label className={boldLabel ? "bold-label" : "label"}>{label}</label>
      ) : null}
      <input
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className="input"
        {...otherProps}
      />
    </div>
  );
};

export default Input;
