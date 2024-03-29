import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";
import SourceCodeView from "../../components/source-code-view/source_code_view";

import UnNumberedEventTicketContract from "../../contracts/UnNumbered_Ticket.sol";

const UnNumberedEventTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("UnNumberedTicket");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [eventName, setEventName] = useState("");

  const [eventDetailItems, setEventDetailItems] = React.useState([
    "startDate",
    "locationName",
    "websiteUrl",
    "eventName",
    "duration",
  ]);
  const [eventDetailItemTypes, setEventDetailItemTypes] = React.useState([
    "uint256",
    "string",
    "string",
    "string",
    "uint256",
  ]);
  const [checkedEventDetailItems, setCheckedEventDetailItems] = React.useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [newEventDetailName, setNewEventDetailName] = useState("");
  const [newEventDetailType, setNewEventDetailType] = useState("");
  const [categoryItems, setCategoryItems] = React.useState(["name"]);
  const [categoryItemTypes, setCategoryItemTypes] = React.useState(["string"]);
  const [checkedCategoryItems, setCheckedCategoryItems] = React.useState([
    true,
  ]);
  const [newCategoryItemName, setNewCategoryItemName] = useState("");
  const [newCategoryItemType, setNewCategoryItemType] = useState("");

  useEffect(() => {
    fetch(UnNumberedEventTicketContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract UnNumberedEventTicket");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 10 - 9),
          allLines.slice(11 - 9, 19 - 9),
          allLines.slice(20 - 9, 23 - 9),
          allLines.slice(28 - 9, 35 - 9),
          allLines.slice(44 - 9, 55 - 9),
          allLines.slice(57 - 9, 59 - 9),
          allLines.slice(62 - 9, 64 - 9),
          allLines.slice(65 - 9, 71 - 9),
          allLines.slice(72 - 9, 84 - 9),
          allLines.slice(91 - 9, 94 - 9),
          allLines.slice(95 - 9, 96 - 9),
          allLines.slice(97 - 9),
        ]);
      });
  }, []);

  const newStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const newDurationChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    e.target.value = numericValue;
    setDuration(numericValue);
  };

  const newEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const newWebsiteUrlChange = (e) => {
    setWebsiteUrl(e.target.value);
  };

  const newLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const setNewContract = (
    newContractName,
    targetURIParam,
    newCheckedEventDetailItems = checkedEventDetailItems,
    newEventDetailItems = eventDetailItems,
    newEventDetailItemTypes = eventDetailItemTypes,
    newCheckedCategoryItems = checkedCategoryItems,
    newCategoryItems = categoryItems,
    newCategoryItemTypes = categoryItemTypes
  ) => {
    let newLines = [];
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        let contractText = `contract ${newContractName} is ERC1155,`;
        if (newCheckedEventDetailItems[0]) contractText += " Pausable,";
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
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          newLines.push(
            `        ${eventDetailItemTypes[j]} ${eventDetailItems[j]};`
          );
        }
      } else if (i === 3) {
        let constructorText = "    constructor(";
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          if (
            newEventDetailItemTypes[j].includes("string") ||
            newEventDetailItemTypes[j].includes("[]")
          ) {
            constructorText += `${newEventDetailItemTypes[j]} memory ${newEventDetailItems[j]}_, `;
          } else {
            constructorText += `${newEventDetailItemTypes[j]} ${newEventDetailItems[j]}_, `;
          }
        }
        constructorText = constructorText.slice(0, constructorText.length - 2);
        constructorText += `) ERC1155("${targetURIParam}") {`;
        newLines.push(constructorText);
        if (newCheckedEventDetailItems[0])
          newLines.push(
            '        require(startDate_ > block.timestamp, "You can not set start time of the event to a past date.");'
          );
        if (newCheckedEventDetailItems[4])
          newLines.push(
            '        require(duration_ > 0, "The duration should be greater than 0.");'
          );
        newLines.push("        eventDetails = EventDetails(");
        let entered2 = false;
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          entered2 = true;
          newLines.push(`            ${newEventDetailItems[j]}_,`);
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
          "    function addCategory(uint256 price, uint256 capacity";
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
        if (newCheckedEventDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Event has already occurred.");'
          );
      } else if (i === 5) {
        if (newCheckedCategoryItems[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(categories[i].name, name), "There is already a category with the same name.");'
          );
          newLines.push("        }");
        }
      } else if (i === 6) {
        let createCateModelText =
          "        categories[tokenId] = EventCategory(tokenId, price, capacity, 0";
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          createCateModelText += `, ${newCategoryItems[j]}`;
        }
        createCateModelText += ");";
        newLines.push(createCateModelText);
      } else if (i === 7) {
        if (newCheckedEventDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Event has already occurred.");'
          );
      } else if (i === 8) {
        if (newCheckedEventDetailItems[0]) {
          newLines.push(
            "    function checkEventPassed() private returns (bool) {"
          );
          newLines.push(
            "        if(block.timestamp >= eventDetails.startDate) {"
          );
          newLines.push("            _pause();");
          newLines.push("            return true;");
          newLines.push("        }");
          newLines.push("        return false;");
          newLines.push("    }");
        }
      } else if (i === 9) {
        if (newCheckedEventDetailItems[0])
          newLines.push("        whenNotPaused");
      } else if (i === 10) {
        if (newCheckedEventDetailItems[0])
          newLines.push(
            '        require(!checkEventPassed(), "Event has already occurred.");'
          );
      }
    }
    setContractCode(newLines.join("\n"));
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

  const newEventDetailNameChange = (event) => {
    setNewEventDetailName(event.target.value);
  };

  const newEventDetailTypeChange = (event) => {
    setNewEventDetailType(event.target.value);
  };

  const newCategoryItemNameChange = (event) => {
    setNewCategoryItemName(event.target.value);
  };

  const newCategoryItemTypeChange = (event) => {
    setNewCategoryItemType(event.target.value);
  };

  const checkEventDetailItem = (value, index) => {
    const newCheckedEventDetailList = [
      ...checkedEventDetailItems.slice(0, index),
      value,
      ...checkedEventDetailItems.slice(index + 1),
    ];
    setCheckedEventDetailItems(newCheckedEventDetailList);
    setNewContract(contractName, contractURI, newCheckedEventDetailList);
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
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      newCheckedCategoryItemList
    );
  };

  const addNewEventDetail = (e) => {
    if (e.key != "Enter") return;
    if (eventDetailItems.includes(newEventDetailName)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newEventDetailType;
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
      val != "uint16"
    ) {
      alert("Please enter a valid type");
      return;
    }
    if (
      newEventDetailName == "string" ||
      newEventDetailName == "string[]" ||
      newEventDetailName == "uint256[]" ||
      newEventDetailName == "uint256" ||
      newEventDetailName == "bool" ||
      newEventDetailName == "address" ||
      newEventDetailName == "bytes" ||
      newEventDetailName == "uint128" ||
      newEventDetailName == "uint64" ||
      newEventDetailName == "uint32" ||
      newEventDetailName == "uint16"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newEventDetailName.length > 0 && newEventDetailType.length > 0) {
      const newEventDetailCheckList = [...checkedEventDetailItems, true];
      setCheckedEventDetailItems(newEventDetailCheckList);
      const newEventDetailItemList = [...eventDetailItems, newEventDetailName];
      setEventDetailItems(newEventDetailItemList);
      const newEventDetailTypeList = [
        ...eventDetailItemTypes,
        newEventDetailType,
      ];
      setEventDetailItemTypes(newEventDetailTypeList);
      setNewEventDetailName("");
      setNewEventDetailType("");
      setNewContract(
        contractName,
        contractURI,
        newEventDetailCheckList,
        newEventDetailItemList,
        newEventDetailTypeList
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
      val !== "bool" &&
      val !== "address" &&
      val !== "uint256[]" &&
      val !== "bytes" &&
      val != "uint128" &&
      val != "uint64" &&
      val != "uint32" &&
      val != "uint16"
    ) {
      alert("Please enter a valid type");
      return;
    }
    if (
      newCategoryItemName == "string" ||
      newCategoryItemName == "string[]" ||
      newCategoryItemName == "uint256[]" ||
      newCategoryItemName == "uint256" ||
      newCategoryItemName == "bool" ||
      newCategoryItemName == "address" ||
      newCategoryItemName == "bytes" ||
      newCategoryItemName == "uint128" ||
      newCategoryItemName == "uint64" ||
      newCategoryItemName == "uint32" ||
      newCategoryItemName == "uint16"
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
        checkedEventDetailItems,
        eventDetailItems,
        eventDetailItemTypes,
        newCategoryItemCheckList,
        newCategoryItemItemList,
        newCategoryItemTypeList
      );
    }
  };

  const eventCheckboxViews = [];
  for (let i = 0; i < eventDetailItems.length; i++) {
    eventCheckboxViews.push(
      <CustomCheckbox
        label={eventDetailItems[i] + " - " + eventDetailItemTypes[i]}
        onChange={(event) => checkEventDetailItem(event.target.checked, i)}
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
            contractName={"UnNumberedEventTicket"}
            contractCode={contractCode}
            completeContract={completeContractCode}
            constructorParams={[
              new Date(startDate).getTime() / 1000,
              locationName,
              websiteUrl,
              eventName,
              duration,
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
                defaultValue="UnNumberedTicket"
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
                onChange={newStartDateChange}
              />
            </div>
            <div>
              <TextField
                label="Duration"
                onChange={newDurationChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={newLocationNameChange}
                id="outlined-required"
                label="Location Name"
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={newWebsiteUrlChange}
                id="outlined-required"
                label="Website URL"
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                required
                onChange={newEventNameChange}
                id="outlined-required"
                label="Event Name"
              />
            </div>
          </Box>
        </div>
        <div style={{ padding: "0px 24px", color: "#44596e" }}>
          {/*<FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Event Details
            </Divider>
            {eventCheckboxViews}
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
              onChange={newEventDetailNameChange}
              label="New Event Detail"
              value={newEventDetailName}
              defaultValue=""
              onKeyDown={addNewEventDetail}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: "15px" }}
              onChange={newEventDetailTypeChange}
              label="New Event Detail Type"
              value={newEventDetailType}
              defaultValue=""
              onKeyDown={addNewEventDetail}
            />
          </div>
          </Box> */}
          <FormGroup>
            <Divider
              style={{ marginTop: "30px", marginBottom: "20px" }}
              spacing={1}
            >
              Category Items
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
                label="New Category Item"
                value={newCategoryItemName}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newCategoryItemTypeChange}
                label="New Category Item Type"
                value={newCategoryItemType}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default UnNumberedEventTicket;
