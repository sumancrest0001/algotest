import Input from "../atoms/Input";
import SelectDropdown from "../atoms/Select";
import dropdownOptions from "../data";

const StrikeParameterForm = ({
  strikeType,
  strikeParameters,
  onStrikeParameterChange,
  fromLeg,
}) => {
  const renderForm = () => {
    if (strikeType === "EntryType.EntryByStrikeType") {
      return (
        <SelectDropdown
          label={fromLeg ? "" : "Strike Type"}
          options={dropdownOptions.StrikeType}
          value={strikeParameters}
          onChangeHandler={(e) => onStrikeParameterChange(e.target.value)}
        />
      );
    }

    if (strikeType === "EntryType.EntryByPremium") {
      return (
        <Input
          label={fromLeg ? "" : "Premium"}
          value={strikeParameters}
          onChangeHandler={(e) => onStrikeParameterChange(e.target.value)}
        />
      );
    }

    if (strikeType === "EntryType.EntryByPremiumRange") {
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Input
            label={fromLeg ? "" : "Lower"}
            value={strikeParameters.Lower}
            onChangeHandler={(e) =>
              onStrikeParameterChange({ Lower: e.target.value })
            }
          />
          <Input
            label={fromLeg ? "" : "Upper"}
            value={strikeParameters.Upper}
            onChangeHandler={(e) =>
              onStrikeParameterChange({ Upper: e.target.value })
            }
          />
        </div>
      );
    }

    if (strikeType === "EntryType.EntryByStraddleWidth") {
      return (
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
          <span>&#91; ATM Strike</span>
          <SelectDropdown
            value={strikeParameters.Adjustments}
            options={dropdownOptions.Adjustments}
            onChangeHandler={(e) =>
              onStrikeParameterChange({ Adjustments: e.target.value })
            }
          />
          <span>&#40;</span>
          <Input
            value={strikeParameters.Multiplier}
            onChangeHandler={(e) =>
              onStrikeParameterChange({ Multiplier: e.target.value })
            }
          />
          <span>x ATM Straddle Price&#41; &#93;</span>
        </div>
      );
    }
  };

  return <div className="strike-parameter-form">{renderForm()}</div>;
};

export default StrikeParameterForm;
