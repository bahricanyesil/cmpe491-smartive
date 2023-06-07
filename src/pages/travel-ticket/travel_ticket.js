import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";
import SourceCodeView from "../../components/source-code-view/source_code_view";

import TravelTicketContract from "../../contracts/Travel_Ticket.sol";

const TravelTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("TravelTicket");
  const [contractURI, setContractURI] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportType, setTransportType] = useState("");
  const [duration, setDuration] = useState(null);
  const [beforeLines, setBeforeLines] = useState([]);
  const [travelDetailItems, setTravelDetailItems] = React.useState([
    "startDate",
    "fromLocation",
    "toLocation",
    "transportType",
    "duration",
  ]);
  const [travelDetailItemTypes, setTravelDetailItemTypes] = React.useState([
    "uint256",
    "string",
    "string",
    "string",
    "uint256",
  ]);
  const [checkedTravelDetailItems, setCheckedTravelDetailItems] = React.useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [newTravelDetailName, setNewTravelDetailName] = useState("");
  const [newTravelDetailType, setNewTravelDetailType] = useState("");
  const [categoryItems, setCategoryItems] = React.useState(["name"]);
  const [categoryItemTypes, setCategoryItemTypes] = React.useState(["string"]);
  const [checkedCategoryItems, setCheckedCategoryItems] = React.useState([
    true,
  ]);
  const [newCategoryItemName, setNewCategoryItemName] = useState("");
  const [newCategoryItemType, setNewCategoryItemType] = useState("");

  useEffect(() => {
    fetch(TravelTicketContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract TravelTicket");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 9 - 8),
          allLines.slice(10 - 8, 30 - 8),
          allLines.slice(31 - 8, 34 - 8),
          allLines.slice(39 - 8, 46 - 8),
          allLines.slice(55 - 8, 79 - 8),
          allLines.slice(81 - 8, 83 - 8),
          allLines.slice(86 - 8, 91 - 8),
          allLines.slice(92 - 8, 99 - 8),
          allLines.slice(100 - 8, 140 - 8),
          allLines.slice(147 - 8, 150 - 8),
          allLines.slice(151 - 8, 152 - 8),
          allLines.slice(153 - 8),
        ]);
      });
  }, []);

  const setNewContract = (
    newContractName,
    targetURIParam,
    newCheckedTravelDetailItems = checkedTravelDetailItems,
    newTravelDetailItems = travelDetailItems,
    newTravelDetailItemTypes = travelDetailItemTypes,
    newCheckedCategoryItems = checkedCategoryItems,
    newCategoryItems = categoryItems,
    newCategoryItemTypes = categoryItemTypes
  ) => {
    let newLines = [];
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        let contractText = `contract ${newContractName} is ERC721,`;
        if (newCheckedTravelDetailItems[0]) contractText += " Pausable,";
        contractText += " Ownable {";
        newLines.push(contractText);
      } else if (i === 1) {
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        ${newCategoryItemTypes[j]} ${newCategoryItems[j]};`
          );
        }
      } else if (i === 2) {
        for (let j = 0; j < newTravelDetailItems.length; j++) {
          if (!newCheckedTravelDetailItems[j]) continue;
          newLines.push(
            `        ${newTravelDetailItemTypes[j]} ${newTravelDetailItems[j]};`
          );
        }
      } else if (i === 3) {
        let constructorText = "    constructor(";
        for (let j = 0; j < newTravelDetailItems.length; j++) {
          if (!newCheckedTravelDetailItems[j]) continue;
          if (
            newTravelDetailItemTypes[j].includes("string") ||
            newTravelDetailItemTypes[j].includes("[]")
          ) {
            constructorText += `${newTravelDetailItemTypes[j]} memory ${newTravelDetailItems[j]}_, `;
          } else {
            constructorText += `${newTravelDetailItemTypes[j]} ${newTravelDetailItems[j]}_, `;
          }
        }
        constructorText = constructorText.slice(0, constructorText.length - 2);
        constructorText += `) ERC721("${targetURIParam}", "${targetURIParam.substring(0,2)}") {`;
        newLines.push(constructorText);
        if (newCheckedTravelDetailItems[0])
          newLines.push(
            '        require(startDate_ > block.timestamp, "You can not set start time of the travel to a past date.");'
          );
        if (newCheckedTravelDetailItems[4])
          newLines.push(
            '        require(duration_ > 0, "The duration should be greater than 0.");'
          );
        newLines.push("        travelDetails = TravelDetails(");
        let entered2 = false;
        for (let j = 0; j < newTravelDetailItems.length; j++) {
          if (!newCheckedTravelDetailItems[j]) continue;
          entered2 = true;
          newLines.push(`            ${newTravelDetailItems[j]}_,`);
        }
        if (entered2) {
          const lastEl = newLines[newLines.length - 1];
          newLines = [
            ...newLines.slice(0, newLines.length - 1),
            lastEl.slice(0, lastEl.length - 1),
          ];
        }
      } else if (i === 4) {
        let addCateText =
          "    function addBlock(uint256 price, uint256 totalRowNumber_";
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          let memoryText = "";
          if (
            newCategoryItemTypes[j].includes("string") ||
            newCategoryItemTypes[j].includes("[]")
          )
            memoryText = "memory ";
          addCateText += `, ${newCategoryItemTypes[j]} ${memoryText}${newCategoryItems[j]}`;
        }
        addCateText += ") public onlyOwner {";
        newLines.push(addCateText);
        if (newCheckedTravelDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Travel has already occurred.");'
          );
      } else if (i === 5) {
        if (newCheckedCategoryItems[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(seatBlocks[i].name, name), "There is already a category with the same name.");'
          );
          newLines.push("        }");
        }
      } else if (i === 6) {
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        newSeatBlock.${newCategoryItems[j]} = ${newCategoryItems[j]};`
          );
        }
      } else if (i === 7) {
        if (newCheckedTravelDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Travel has already occurred.");'
          );
      } else if (i === 8) {
        if (newCheckedTravelDetailItems[0]) {
          newLines.push(
            "    function checkEventPassed() private returns (bool) {"
          );
          newLines.push(
            "        if(block.timestamp >= travelDetails.startDate) {"
          );
          newLines.push("            _pause();");
          newLines.push("            return true;");
          newLines.push("        }");
          newLines.push("        return false;");
          newLines.push("    }");
        }
      } else if (i === 9) {
        if (newCheckedTravelDetailItems[0])
          newLines.push("        whenNotPaused");
      } else if (i === 10) {
        if (newCheckedTravelDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Travel has already occurred.");'
          );
      }
    }
    setContractCode(newLines.join("\n"));
  };
  const startDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const fromLocationChange = (e) => {
    setFromLocation(e.target.value);
  };
  const toLocationChange = (e) => {
    setToLocation(e.target.value);
  };
  const transportTypeChange = (e) => {
    setTransportType(e.target.value);
  };
  const durationChange = (e) => {
    setDuration(e.target.value);
  };
  const targetNameChange = (event) => {
    const inputValue = event.target.value;
    if (isNaN(inputValue)) {
      setContractName(inputValue);
      setNewContract(event.target.value, contractURI);
    }
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(contractName, event.target.value);
  };

  const newTravelDetailNameChange = (event) => {
    setNewTravelDetailName(event.target.value);
  };

  const newTravelDetailTypeChange = (event) => {
    setNewTravelDetailType(event.target.value);
  };

  const newCategoryItemNameChange = (event) => {
    setNewCategoryItemName(event.target.value);
  };

  const newCategoryItemTypeChange = (event) => {
    setNewCategoryItemType(event.target.value);
  };

  const checkTravelDetailItem = (value, index) => {
    const newCheckedTravelDetailList = [
      ...checkedTravelDetailItems.slice(0, index),
      value,
      ...checkedTravelDetailItems.slice(index + 1),
    ];
    setCheckedTravelDetailItems(newCheckedTravelDetailList);
    setNewContract(contractName, contractURI, newCheckedTravelDetailList);
  };

  const checkCategoryItem = (value, index) => {
    const newCheckedCategoryItemList = [
      ...checkedCategoryItems.slice(0, index),
      value,
      ...checkedCategoryItems.slice(index + 1),
    ];
    setCheckedCategoryItems(newCheckedCategoryItemList);
    setNewContract(
      contractName,
      contractURI,
      checkedTravelDetailItems,
      travelDetailItems,
      travelDetailItemTypes,
      newCheckedCategoryItemList
    );
  };

  const addNewTravelDetail = (e) => {
    if (e.key != "Enter") return;
    if (travelDetailItems.includes(newTravelDetailName)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newTravelDetailType;
    if (
      val !== "string" &&
      val !== "string[]" &&
      val !== "uint256" &&
      val !== "uint256[]" &&
      val !== "bool" &&
      val !== "address" &&
      val !== "bytes" &&
      val != "uint128" &&
      val != "uint64" &&
      val != "uint32" &&
      val != "uint16" &&
      val != "TravelDetails" &&
      val != "SeatRow" &&
      val != "SeatBlock"
    ) {
      alert("Please enter a valid type");
      return;
    }
    if (
      newTravelDetailName == "string" ||
      newTravelDetailName == "string[]" ||
      newTravelDetailName == "uint256[]" ||
      newTravelDetailName == "uint256" ||
      newTravelDetailName == "bool" ||
      newTravelDetailName == "address" ||
      newTravelDetailName == "bytes" ||
      newTravelDetailName == "uint128" ||
      newTravelDetailName == "uint64" ||
      newTravelDetailName == "uint32" ||
      newTravelDetailName == "uint16" ||
      newTravelDetailName == "TravelDetails" ||
      newTravelDetailName == "SeatRow" ||
      newTravelDetailName == "SeatBlock" 
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newTravelDetailName.length > 0 && newTravelDetailType.length > 0) {
      const newTravelDetailCheckList = [...checkedTravelDetailItems, true];
      setCheckedTravelDetailItems(newTravelDetailCheckList);
      const newTravelDetailItemList = [...travelDetailItems, newTravelDetailName];
      setTravelDetailItems(newTravelDetailItemList);
      const newTravelDetailTypeList = [
        ...travelDetailItemTypes,
        newTravelDetailType,
      ];
      setTravelDetailItemTypes(newTravelDetailTypeList);
      setNewTravelDetailName("");
      setNewTravelDetailType("");
      setNewContract(
        contractName,
        contractURI,
        newTravelDetailCheckList,
        newTravelDetailItemList,
        newTravelDetailTypeList
      );
    }
  };

  const addNewCategoryItem = (e) => {
    if (e.key != "Enter") return;
    if (categoryItems.includes(newCategoryItemName)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newCategoryItemType;
    if (
      val !== "string" &&
      val !== "string[]" &&
      val !== "uint256" &&
      val !== "uint256[]" &&
      val !== "bool" &&
      val !== "address" &&
      val !== "bytes" &&
      val != "uint128" &&
      val != "uint64" &&
      val != "uint32" &&
      val != "uint16" &&
      val != "TravelDetails" &&
      val != "SeatRow" &&
      val != "SeatBlock"
    ) {
      alert("Please enter a valid type");
      return;
    }
    if (
      newTravelDetailName == "string" ||
      newTravelDetailName == "string[]" ||
      newTravelDetailName == "uint256[]" ||
      newTravelDetailName == "uint256" ||
      newTravelDetailName == "bool" ||
      newTravelDetailName == "address" ||
      newTravelDetailName == "bytes" ||
      newTravelDetailName == "uint128" ||
      newTravelDetailName == "uint64" ||
      newTravelDetailName == "uint32" ||
      newTravelDetailName == "uint16" ||
      newTravelDetailName == "TravelDetails" ||
      newTravelDetailName == "SeatRow" ||
      newTravelDetailName == "SeatBlock"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newCategoryItemName.length > 0 && newCategoryItemType.length > 0) {
      const newCategoryItemCheckList = [...checkedCategoryItems, true];
      setCheckedCategoryItems(newCategoryItemCheckList);
      const newCategoryItemItemList = [...categoryItems, newCategoryItemName];
      setCategoryItems(newCategoryItemItemList);
      const newCategoryItemTypeList = [
        ...categoryItemTypes,
        newCategoryItemType,
      ];
      setCategoryItemTypes(newCategoryItemTypeList);
      setNewCategoryItemName("");
      setNewCategoryItemType("");
      setNewContract(
        contractName,
        contractURI,
        checkedTravelDetailItems,
        travelDetailItems,
        travelDetailItemTypes,
        newCategoryItemCheckList,
        newCategoryItemItemList,
        newCategoryItemTypeList
      );
    }
  };

  const travelCheckboxViews = [];
  for (let i = 0; i < travelDetailItems.length; i++) {
    travelCheckboxViews.push(
      <CustomCheckbox
        label={travelDetailItems[i] + " - " + travelDetailItemTypes[i]}
        onChange={(event) => checkTravelDetailItem(event.target.checked, i)}
      />
    );
  }

  const categoryCheckboxViews = [];
  for (let i = 0; i < categoryItems.length; i++) {
    categoryCheckboxViews.push(
      <CustomCheckbox
        label={categoryItems[i] + " - " + categoryItemTypes[i]}
        onChange={(event) => checkCategoryItem(event.target.checked, i)}
      />
    );
  } 

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={contractName}
            contractCode={contractCode}
            completeContract={completeContractCode}
            constructorParams={[
              new Date(startDate).getTime() / 1000,
              fromLocation,
              toLocation,
              transportType,
              (new Date(duration).getTime() / 1000) - (new Date(startDate).getTime() / 1000),
              
            ]}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>{" "}
      <div
        style={{
          marginTop: "17px",
          marginLeft: "15px",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Edit the Parameters</h3>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Enter Contract Name</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetNameChange}
                id="outlined-required"
                label="Required"
                defaultValue="TravelTicket"
              />
            </div>
          </Box>
        </div>
        <div style={{ color: "#44596e" }}>
          <h5>Enter Token URI</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetURIChange}
                id="outlined-helperText"
                label="URI"
                defaultValue=""
              />
            </div>{" "}
          </Box>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Travel Details
            </Divider>
            {travelCheckboxViews}
          </FormGroup>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newTravelDetailNameChange}
                label="New Travel Detail"
                value={newTravelDetailName}
                defaultValue=""
                onKeyDown={addNewTravelDetail}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newTravelDetailTypeChange}
                label="New Travel Detail Type"
                value={newTravelDetailType}
                defaultValue=""
                onKeyDown={addNewTravelDetail}
              />
            </div>
          </Box>
          <FormGroup>
            <Divider
              style={{ marginTop: "30px", marginBottom: "20px" }}
              spacing={1}
            >
              Block Feature
            </Divider>
            {categoryCheckboxViews}
          </FormGroup>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newCategoryItemNameChange}
                label="New Block Feature"
                value={newCategoryItemName}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newCategoryItemTypeChange}
                label="New Block Feature Type"
                value={newCategoryItemType}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
          </Box>
        </div>

        <div style={{ marginTop: "10px", color: "#44596e" }}>
          <FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Construction Parameters
            </Divider>
          </FormGroup>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              <label style={{ marginRight: "8px" }} htmlFor="dateInput">
                Select a Start Date:{" "}
              </label>
              <input
                type="date"
                id="startDateInput"
                value={startDate}
                onChange={startDateChange}
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={fromLocationChange}
                id="outlined-required"
                label="From Location"
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={toLocation}
                id="outlined-required"
                label="To Location"
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={transportTypeChange}
                id="outlined-required"
                label="Transport Type"
              />
            </div>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              <label style={{ marginRight: "8px" }} htmlFor="dateInput">
                Select a End Date:{" "}
              </label>
              <input
                type="date"
                id="endDateInput"
                value={duration}
                onChange={durationChange}
              />
            </div>


          </Box>
        </div>
      </div>
    </div>
  );
};

export default TravelTicket;
