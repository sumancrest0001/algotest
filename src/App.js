import React, { useState } from "react";
import Builder from "./components/Builder";
import SingleLeg from "./components/SingleLeg";
import uuid from "react-uuid";
import axios from "axios";
import Button from "./atoms/Button";

function App() {
  const [availableLegs, setAvailableLegs] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  const submitNewLeg = (data) => {
    setAvailableLegs((prev) => [...prev, { ...data }]);
  };

  const updateLeg = (data, id) => {
    const updatedLegs = availableLegs.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    setAvailableLegs(updatedLegs);
  };

  const deleteLeg = (legId) => {
    const updatedLegs = availableLegs.filter((item) => item.id !== legId);
    setAvailableLegs(updatedLegs);
  };

  const copyLeg = (legId) => {
    let duplicateLeg = availableLegs.find((item) => item.id === legId);
    let newLeg = JSON.parse(JSON.stringify(duplicateLeg));
    newLeg = { ...newLeg, id: uuid() };
    setAvailableLegs([...availableLegs, newLeg]);
  };
  const onStrikeParameterChange = (legData, value) => {
    let updatedEntryType = { ...legData.EntryType };
    if (typeof value === "object") {
      let updatedStrikeParameters = {
        ...legData.EntryType[legData.activeEntryType].strikeParameters,
      };
      updatedStrikeParameters = { ...updatedStrikeParameters, ...value };
      updatedEntryType[legData.activeEntryType] = {
        ...updatedEntryType[legData.activeEntryType],
        strikeParameters: updatedStrikeParameters,
      };
    }
    if (typeof value === "string") {
      updatedEntryType[legData.activeEntryType].strikeParameters = value;
    }

    const updatedLegsArr = availableLegs.map((item) => {
      if (item.id === legData.id) {
        return { ...legData, EntryType: updatedEntryType };
      }
      return item;
    });
    setAvailableLegs(updatedLegsArr);
  };

  const handleLegBuilderChange = (legData, data) => {
    const updatedLeg = { ...legData, ...data };
    const updatedLegsArr = availableLegs.map((item) => {
      if (item.id === legData.id) {
        return { ...updatedLeg };
      }
      return item;
    });
    setAvailableLegs(updatedLegsArr);
  };

  const handleStoreLegs = () => {
    const finalLegsArr = availableLegs.map((item) => {
      const formattedLeg = {
        id: item.id,
        PositionType: item.PositionType,
        Lots: item.Lots,
        LegStopLoss: item.LegStopLoss,
        LegTarget: item.LegTarget,
        EntryType: item.activeEntryType,
        ExpiryKind: item.ExpiryKind,
        InstrumentKind: item.InstrumentKind,
        strikeParameter: item.EntryType[item.activeEntryType].strikeParameters,
      };
      if (item.LegTrailSL.isActive) {
        formattedLeg.LegTrailSL = {
          Value: item.LegTrailSL.Value,
          Type: item.LegTrailSL.Type,
        };
      }
      if (item.LegMomentum.isActive) {
        formattedLeg.LegMomentum = {
          Value: item.LegMomentum.Value,
          Type: item.LegMomentum.Type,
        };
      }
      return formattedLeg;
    });
    const promiseArr = finalLegsArr.map((item) =>
      axios.post(
        "https://algotest-e6126-default-rtdb.firebaseio.com/legs.json",
        item
      )
    );
    Promise.all(promiseArr)
      .then((values) => console.log(values))
      .catch((error) => console.log(error));
  };

  const handleFetchLegs = () => {
    axios
      .get("https://algotest-e6126-default-rtdb.firebaseio.com/legs.json")
      .then(function (response) {
        setFetchedData(Object.values(response.data));
      });
  };

  return (
    <div className="App">
      <Builder submitNewLeg={submitNewLeg} />
      <div>
        {availableLegs.map((item) => (
          <SingleLeg
            id={item.id}
            legData={item}
            onCopyLeg={copyLeg}
            onDeleteLeg={deleteLeg}
            onStrikeParameterChange={onStrikeParameterChange}
            onUpdateLeg={updateLeg}
            handleLegBuilderChange={handleLegBuilderChange}
          />
        ))}
      </div>

      <Button label={"Store Legs"} onClickHandler={handleStoreLegs} />

      <Button label={"Fetch data from db"} onClickHandler={handleFetchLegs} />

      {fetchedData.length > 0 ? (
        <div>
          {fetchedData.map((item) => (
            <div key={item.ids} style={{ marginTop: "1rem" }}>
              {JSON.stringify(item)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
