const Button = ({ label, variant, onClickHandler }) => {
  return (
    <button
      className={variant === "inverted" ? "button btn-inverted" : "button btn"}
      onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export default Button;
