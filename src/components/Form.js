import dropdownOptions from "../data";
import Input from "../atoms/Input";
import SelectDropdown from "../atoms/Select";
import StrikeParameterForm from "./StrikeParameterForm";

const Form = ({
  formValues,
  handleLegBuilderChange,
  onStrikeParameterChange,
  fromLeg = false,
}) => {
  return (
    <div className="builder-container">
      <Input
        value={formValues.Lots}
        label={fromLeg ? "" : "Total Lot"}
        onChangeHandler={(e) =>
          handleLegBuilderChange({ Lots: e.target.value })
        }
      />
      <SelectDropdown
        options={dropdownOptions.PositionType}
        label={fromLeg ? "" : "Position"}
        onChangeHandler={(e) =>
          handleLegBuilderChange({ PositionType: e.target.value })
        }
      />
      <SelectDropdown
        options={dropdownOptions.ExpiryKind}
        label={fromLeg ? "" : "Option Type"}
        onChangeHandler={(e) =>
          handleLegBuilderChange({ ExpiryKind: e.target.value })
        }
      />
      <SelectDropdown
        options={dropdownOptions.InstrumentKind}
        label={fromLeg ? "" : "Expiry"}
        onChangeHandler={(e) =>
          handleLegBuilderChange({ InstrumentKind: e.target.value })
        }
      />
      <SelectDropdown
        options={dropdownOptions.EntryType}
        label={fromLeg ? "Select Strike" : "Select Strike Criteria"}
        onChangeHandler={(e) =>
          handleLegBuilderChange({ activeEntryType: e.target.value })
        }
      />
      <StrikeParameterForm
        strikeType={formValues.activeEntryType}
        strikeParameters={
          formValues.EntryType[formValues.activeEntryType].strikeParameters
        }
        onStrikeParameterChange={onStrikeParameterChange}
        fromLeg
      />
    </div>
  );
};

export default Form;
