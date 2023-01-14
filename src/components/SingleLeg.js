import Form from "./Form";
import Checkbox from "../atoms/CheckBox";
import SelectDropdown from "../atoms/Select";
import Input from "../atoms/Input";

import dropdownOptions from "../data";

const SingleLeg = ({
  legData,
  onCopyLeg,
  onDeleteLeg,
  onStrikeParameterChange,
  onUpdateLeg,
  handleLegBuilderChange,
}) => {
  const newData = JSON.parse(JSON.stringify(legData));
  const handleCheckBoxChange = (e, field) => {
    let updatedData = { ...legData[field] };
    if (e.target.checked) {
      updatedData = { ...updatedData, isActive: true };
    } else {
      updatedData = { ...updatedData, isActive: false };
    }
    const finalData = {};
    finalData[field] = { ...updatedData };
    onUpdateLeg(finalData, legData.id);
  };

  const handleAdditionalParaChange = (data, field) => {
    let updatedData = JSON.parse(JSON.stringify({ ...legData[field] }));
    updatedData = {
      ...updatedData,
      ...data,
    };
    const finalData = {};
    finalData[field] = { ...updatedData };
    onUpdateLeg(finalData, legData.id);
  };

  const onLegBuilderChange = (value) => {
    handleLegBuilderChange(newData, value);
  };

  const handleStrikeParameterChange = (value) => {
    onStrikeParameterChange(newData, value);
  };
  return (
    <div className="single-leg">
      <div className="delete-icon" onClick={() => onDeleteLeg(legData.id)}>
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 .96C5.913.96.96 5.913.96 12c0 6.087 4.953 11.04 11.04 11.04 6.087 0 11.04-4.953 11.04-11.04C23.04 5.913 18.087.96 12 .96Zm4.18 14.54a.484.484 0 0 1 0 .68.492.492 0 0 1-.34.14.492.492 0 0 1-.34-.14L12 12.683 8.5 16.18a.492.492 0 0 1-.34.139.492.492 0 0 1-.34-.14.484.484 0 0 1 0-.68l3.498-3.5L7.82 8.5a.484.484 0 0 1 0-.68.484.484 0 0 1 .682 0L12 11.317l3.5-3.499a.484.484 0 0 1 .68 0 .484.484 0 0 1 0 .682L12.683 12l3.499 3.5Z"
            fill="#F07777"
          ></path>
        </svg>
      </div>
      <div className="copy-icon" onClick={() => onCopyLeg(legData.id)}>
        <svg
          width="12"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.56 0v1.44l.48.48V.48h3.6v2.88h2.88V9.6h-3.6v.48H12V3.022L8.977 0H4.56Zm4.56.818 2.063 2.062H9.12V.817ZM0 1.92V12h7.44V4.942l-.068-.075-2.88-2.88-.074-.067H0Zm.48.48h3.6v2.88h2.88v6.24H.48V2.4Zm4.08.345L6.615 4.8H4.56V2.745Z"
            fill="#375A9E"
          ></path>
        </svg>
      </div>
      <Form
        formValues={legData}
        onStrikeParameterChange={handleStrikeParameterChange}
        handleLegBuilderChange={onLegBuilderChange}
        fromLeg
      />
      <div className="additional-features">
        <div className="additional-features__item">
          <Checkbox
            label="Simple Momentum"
            onChangeHandler={(e) => handleCheckBoxChange(e, "LegMomentum")}
          />
          <div
            className={`strike-parameters ${
              legData.LegMomentum.isActive ? "active" : "in-active"
            }`}
          >
            <SelectDropdown
              value={legData.LegMomentum.Type}
              options={dropdownOptions.momentum}
              style={{ backgroundColor: "#375a9e", color: "#fff" }}
              onChangeHandler={(e) =>
                handleAdditionalParaChange(
                  { Type: e.target.value },
                  "LegMomentum"
                )
              }
            />
            <Input
              value={legData.LegMomentum.Value}
              onChangeHandler={(e) =>
                handleAdditionalParaChange(
                  { Value: e.target.value },
                  "LegMomentum"
                )
              }
            />
          </div>
        </div>
        <div className="additional-features__item">
          <Checkbox
            label="SL Trial"
            onChangeHandler={(e) => handleCheckBoxChange(e, "LegTrailSL")}
          />
          <div
            className={`strike-parameters ${
              legData.LegTrailSL.isActive ? "active" : "in-active"
            }`}
          >
            <SelectDropdown
              value={legData.LegTrailSL.Type}
              options={dropdownOptions.trialSL}
              style={{ backgroundColor: "#375a9e", color: "#fff" }}
              onChangeHandler={(e) =>
                handleAdditionalParaChange(
                  { Type: e.target.value },
                  "LegTrailSL"
                )
              }
            />
            <Input
              value={legData.LegTrailSL.Value?.InstrumentMove || null}
              onChangeHandler={(e) => {
                const data = {
                  Value: {
                    ...legData.LegTrailSL.Value,
                    InstrumentMove: e.target.value,
                  },
                };
                handleAdditionalParaChange(data, "LegTrailSL");
              }}
            />
            <Input
              value={legData.LegTrailSL.Value?.StopLossMove || null}
              onChangeHandler={(e) => {
                const data = {
                  Value: {
                    ...legData.LegTrailSL.Value,
                    StopLossMove: e.target.value,
                  },
                };
                handleAdditionalParaChange(data, "LegTrailSL");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLeg;
