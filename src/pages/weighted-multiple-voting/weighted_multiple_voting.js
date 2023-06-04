import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";
import SourceCodeView from "../../components/source-code-view/source_code_view";

import WeightedMultipleVotingContract from "../../contracts/Weighted_Multiple_Voting.sol";

const WeightedMultipleVoting = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("WeightedMultipleVoting");
  const [tokenName, setTokenName] = useState("WeightedToken");
  const [tokenSymbol, setTokenSymbol] = useState("WeTo");
  const [beforeLines, setBeforeLines] = useState([]);
  const [eventDetailItems, setEventDetailItems] = React.useState([]);
  const [eventDetailItemTypes, setEventDetailItemTypes] = React.useState([]);
  const [checkedEventDetailItems, setCheckedEventDetailItems] = React.useState(
    []
  );
  const [newEventDetailName, setNewEventDetailName] = useState("");
  const [newEventDetailType, setNewEventDetailType] = useState("");
  const [updatableStartTime, setUpdatableStartTime] = useState(true);
  const [updatableEndTime, setUpdatableEndTime] = useState(true);
  const [categoryItems, setCategoryItems] = React.useState([]);
  const [categoryItemTypes, setCategoryItemTypes] = React.useState([]);
  const [checkedCategoryItems, setCheckedCategoryItems] = React.useState([
    true,
  ]);
  const [newCategoryItemName, setNewCategoryItemName] = useState("");
  const [newCategoryItemType, setNewCategoryItemType] = useState("");

  useEffect(() => {
    fetch(WeightedMultipleVotingContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract WeightedMultipleVoting");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 9 - 8),
          allLines.slice(10 - 8, 13 - 8),
          allLines.slice(14 - 8, 20 - 8),
          allLines.slice(21 - 8, 29 - 8),
          allLines.slice(31 - 8, 33 - 8),
          allLines.slice(34 - 8, 39 - 8),
          allLines.slice(40 - 8, 53 - 8),
          allLines.slice(54 - 8, 60 - 8),
          allLines.slice(61 - 8, 126 - 8),
          allLines.slice(140 - 8),
        ]);
      });
  }, []);

  const setNewContract = (
    newContractName = contractName,
    newTokenName = tokenName,
    newTokenSymbol = tokenSymbol,
    newCheckedEventDetailItems = checkedEventDetailItems,
    newEventDetailItems = eventDetailItems,
    newEventDetailItemTypes = eventDetailItemTypes,
    newUpdatableStartTime = updatableStartTime,
    newUpdatableEndTime = updatableEndTime,
    newCheckedCategoryItems = checkedCategoryItems,
    newCategoryItems = categoryItems,
    newCategoryItemTypes = categoryItemTypes
  ) => {
    let newLines = [];
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(
          `contract ${newContractName} is ERC20, Pausable, Ownable {`
        );
      } else if (i === 1) {
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          newLines.push(
            `        ${newEventDetailItemTypes[j]} ${newEventDetailItems[j]};`
          );
        }
        newLines.push(`    }`);
      } else if (i === 2) {
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        ${newCategoryItemTypes[j]} ${newCategoryItems[j]};`
          );
        }
        newLines.push(`    }`);
      } else if (i === 3) {
        let constructorText = "    constructor(string[] memory candidateNames";
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          constructorText +=
            ", " +
            newEventDetailItemTypes[j] +
            "[] memory candidate" +
            newEventDetailItems[j] +
            "s";
        }
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          if (
            newCategoryItemTypes[j].includes("string") ||
            newCategoryItemTypes[j].includes("[]")
          ) {
            constructorText +=
              ", " +
              newCategoryItemTypes[j] +
              " memory owner" +
              newCategoryItems[j];
          } else {
            constructorText +=
              ", " + newCategoryItemTypes[j] + " owner" + newCategoryItems[j];
          }
        }
        constructorText +=
          ", uint256 maxVotes, uint256 ownerWeight, uint256 startTime_, uint256 endTime_)";
        newLines.push(constructorText);
        newLines.push(`    ERC20("${newTokenName}", "${newTokenSymbol}")`);
      } else if (i === 4) {
        newLines.push("        voters[msg.sender].weight = ownerWeight;");
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        voters[msg.sender].${newCategoryItems[j]} = owner${newCategoryItems[j]};`
          );
        }
      } else if (i === 5) {
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          newLines.push(
            `                ${newEventDetailItems[j]}: candidate${newEventDetailItems[j]}s[i],`
          );
        }
        newLines.push("                voteCount: 0");
      } else if (i === 6) {
        let addVoterFunc =
          "    function addVoter(address voterAddress, uint256 weight";
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          if (
            newCategoryItemTypes[j].includes("string") ||
            newCategoryItemTypes[j].includes("[]")
          ) {
            addVoterFunc +=
              ", " + newCategoryItemTypes[j] + " memory " + newCategoryItems[j];
          } else {
            addVoterFunc +=
              ", " + newCategoryItemTypes[j] + " " + newCategoryItems[j];
          }
        }
        addVoterFunc += ") public onlyOwner {";
        newLines.push(addVoterFunc);
      } else if (i === 7) {
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        voters[voterAddress].${newCategoryItems[j]} = ${newCategoryItems[j]};`
          );
        }
        newLines.push("    }");
      } else if (i === 8) {
        if (newUpdatableStartTime) {
          newLines.push(
            "    function updateStartTime(uint256 newStartTime) public onlyOwner {"
          );
          newLines.push(
            '        require(newStartTime > block.timestamp, "You can not set the start time to past.");'
          );
          newLines.push(
            '        require(endTime > newStartTime, "You can not set start time after the end time.");'
          );
          newLines.push(
            '        require(startTime > block.timestamp, "You can not change the start time after the WeightedMultipleVoting started.");'
          );
          newLines.push("        startTime = newStartTime;");
          newLines.push("    }");
          newLines.push("");
        }
        if (newUpdatableEndTime) {
          newLines.push(
            "    function updateEndTime(uint256 newEndTime) public onlyOwner {"
          );
          newLines.push(
            '        require(newEndTime > block.timestamp, "You can not set the end time to past.");'
          );
          newLines.push(
            '        require(newEndTime > startTime, "You can not set start time after the end time.");'
          );
          newLines.push(
            '        require(endTime > block.timestamp, "You can not change the end time after the WeightedMultipleVoting finished.");'
          );
          newLines.push("        endTime = newEndTime;");
          newLines.push("    }");
          newLines.push("");
        }
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const targetNameChange = (event) => {
    const inputValue = event.target.value;
    if (isNaN(inputValue)) {
      setContractName(inputValue);
      setNewContract(event.target.value, tokenName);
    }
  };

  const targetTokenNameChange = (event) => {
    setTokenName(event.target.value);
    setNewContract(contractName, event.target.value);
  };

  const targetTokenSymbolChange = (event) => {
    setTokenSymbol(event.target.value);
    setNewContract(contractName, tokenName, event.target.value);
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
    setNewContract(
      contractName,
      tokenName,
      tokenSymbol,
      newCheckedEventDetailList
    );
  };

  const checkUpdatableStartTime = (event) => {
    const value = event.target.checked;
    setUpdatableStartTime(value);
    setNewContract(
      contractName,
      tokenName,
      tokenSymbol,
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      value,
      updatableEndTime
    );
  };

  const checkUpdatableEndTime = (event) => {
    const value = event.target.checked;
    setUpdatableEndTime(value);
    setNewContract(
      contractName,
      tokenName,
      tokenSymbol,
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      updatableStartTime,
      value
    );
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
      tokenName,
      tokenSymbol,
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      updatableStartTime,
      updatableEndTime,
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
        tokenName,
        tokenSymbol,
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
      val !== "bytes" &&
      val !== "uint256[]" &&
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
        tokenName,
        tokenSymbol,
        checkedEventDetailItems,
        eventDetailItems,
        eventDetailItemTypes,
        updatableStartTime,
        updatableEndTime,
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
        key={eventDetailItems[i] + " - " + eventDetailItemTypes[i]}
        label={eventDetailItems[i] + " - " + eventDetailItemTypes[i]}
        onChange={(event) => checkEventDetailItem(event.target.checked, i)}
      />
    );
  }

  const categoryCheckboxViews = [];
  for (let i = 0; i < categoryItems.length; i++) {
    categoryCheckboxViews.push(
      <CustomCheckbox
        key={categoryItems[i] + " - " + categoryItemTypes[i]}
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
            contractName={"WeightedMultipleVoting"}
            contractCode={contractCode}
            completeContract={completeContractCode}
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
                defaultValue="WeightedMultipleVoting"
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
                onChange={targetTokenNameChange}
                id="outlined-helperText"
                label="Token Name"
                defaultValue="WeightedToken"
              />
            </div>
            <div>
              <TextField
                required
                onChange={targetTokenSymbolChange}
                id="outlined-helperText"
                label="Token Symbol"
                defaultValue="WeTo"
              />
            </div>
          </Box>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Updatable Voting Time Limits
            </Divider>
            <CustomCheckbox
              label={"Updatable Start Time"}
              onChange={checkUpdatableStartTime}
            />
            <CustomCheckbox
              label={"Updatable End Time"}
              onChange={checkUpdatableEndTime}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Candidate Information
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
                label="New Candidate Info Name"
                value={newEventDetailName}
                defaultValue=""
                onKeyDown={addNewEventDetail}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newEventDetailTypeChange}
                label="New Info Type"
                value={newEventDetailType}
                defaultValue=""
                onKeyDown={addNewEventDetail}
              />
            </div>
          </Box>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <FormGroup>
            <Divider
              style={{ marginTop: "10px", marginBottom: "8px" }}
              spacing={1}
            >
              Voter Information
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
                label="New Voter Info Name"
                value={newCategoryItemName}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newCategoryItemTypeChange}
                label="New Voter Info Type"
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

export default WeightedMultipleVoting;
