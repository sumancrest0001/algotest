const SelectDropdown = ({
  label,
  onChangeHandler,
  boldLabel,
  value,
  options,
  style,
}) => {
  return (
    <div className="select-container">
      {label ? (
        <label className={boldLabel ? "bold-label" : "label"}>{label}</label>
      ) : null}
      <select className="select" style={style} onChange={onChangeHandler}>
        {options.map((option) => (
          <option
            value={option.value}
            selected={option.value === value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
