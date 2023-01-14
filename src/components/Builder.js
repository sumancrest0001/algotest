import React, { useState } from "react";
import Form from "./Form";
import Button from "./../atoms/Button";
import uuid from "react-uuid";

const initialState = {
  PositionType: "PositionType.Sell",
  Lots: 1,
  InstrumentKind: "LegType.CE",
  ExpiryKind: "ExpiryType.Weekly",
  EntryType: {
    "EntryType.EntryByStrikeType": {
      strikeParameters: "StrikeType.ATM",
    },
    "EntryType.EntryByPremiumRange": {
      strikeParameters: {
        Lower: 70,
        Upper: 200,
      },
    },
    "EntryType.EntryByPremium": {
      strikeParameters: 50,
    },
    "EntryType.EntryByStraddleWidth": {
      strikeParameters: {
        Adjustment: "Plus",
        Multiplier: 0.5,
      },
    },
  },
  activeEntryType: "EntryType.EntryByStrikeType",
};

const additionalInitialState = {
  LegMomentum: { Type: "MomentumType.PointsUp", Value: null, isActive: false },
  LegTrailSL: { Type: "TrialStopLossType.Point", Value: {}, isActive: false },
};

const Builder = ({ submitNewLeg }) => {
  const [formValues, setFormValues] = useState(
    JSON.parse(JSON.stringify(initialState))
  );

  const onStrikeParameterChange = (value) => {
    let updatedEntryType = { ...formValues.EntryType };
    if (typeof value === "object") {
      let updatedStrikeParameters = {
        ...formValues.EntryType[formValues.activeEntryType].strikeParameters,
      };
      updatedStrikeParameters = { ...updatedStrikeParameters, ...value };
      updatedEntryType[formValues.activeEntryType] = {
        ...updatedEntryType[formValues.activeEntryType],
        strikeParameters: updatedStrikeParameters,
      };
    }
    if (typeof value === "string") {
      updatedEntryType[formValues.activeEntryType].strikeParameters = value;
    }
    setFormValues({ ...formValues, EntryType: updatedEntryType });
  };

  const handleLegBuilderChange = (data) => {
    setFormValues({ ...formValues, ...data });
  };

  const handleAddLegSubmit = () => {
    const EntryType = {
      ...initialState.EntryType,
      [formValues.activeEntryType]:
        formValues.EntryType[formValues.activeEntryType],
    };
    const data = {
      ...formValues,
      id: uuid(),
      EntryType,
      LegMomentum: JSON.parse(
        JSON.stringify(additionalInitialState.LegMomentum)
      ),
      LegTrailSL: JSON.parse(JSON.stringify(additionalInitialState.LegTrailSL)),
    };
    submitNewLeg(data);
    setFormValues(JSON.parse(JSON.stringify(initialState)));
  };

  return (
    <div>
      <div className="header-section">
        <p className="header-label">Select Segments</p>
        <div className="toggle-container">
          <div className="toggle-button">Features</div>
          <div className="toggle-button active">Options</div>
        </div>
      </div>
      <Form
        formValues={formValues}
        onStrikeParameterChange={onStrikeParameterChange}
        handleLegBuilderChange={handleLegBuilderChange}
      />
      <div className="buttons">
        <Button label={"Add Leg"} onClickHandler={handleAddLegSubmit} />
        <Button label={"Cancel"} variant="inverted" />
      </div>
    </div>
  );
};

export default Builder;
