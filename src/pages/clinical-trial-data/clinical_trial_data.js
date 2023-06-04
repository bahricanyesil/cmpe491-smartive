import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";
import SourceCodeView from "../../components/source-code-view/source_code_view";

import ClinicalTrialDataContract from "../../contracts/Clinical_Trial_Data.sol";

const ClinicalTrialData = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("ClinicalTrialData");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [eventDetailItems, setEventDetailItems] = React.useState([
    "name",
    "workerCapacity",
  ]);
  const [eventDetailItemTypes, setEventDetailItemTypes] = React.useState([
    "string",
    "uint256",
  ]);
  const [checkedEventDetailItems, setCheckedEventDetailItems] = React.useState([
    true,
    true,
  ]);
  const [patientDetailItems, setPatientDetailItems] = React.useState([]);
  const [checkedPatientDetailItems, setCheckedPatientDetailItems] =
    React.useState([]);
  const [patientDetailItemTypes, setPatientDetailItemTypes] = React.useState(
    []
  );

  const [labResultDetailItems, setLabResultDetailItems] = React.useState([]);
  const [checkedLabResultDetailItems, setCheckedLabResultDetailItems] =
    React.useState([]);
  const [labResultDetailItemTypes, setLabResultDetailItemTypes] =
    React.useState([]);

  const [newEventDetailName, setNewEventDetailName] = useState("");
  const [newEventDetailType, setNewEventDetailType] = useState("");
  const [newPatientDetailName, setNewPatientDetailName] = useState("");
  const [newPatientDetailType, setNewPatientDetailType] = useState("");
  const [newLabResultDetailName, setNewLabResultDetailName] = useState("");
  const [newLabResultDetailType, setNewLabResultDetailType] = useState("");

  const [categoryItems, setCategoryItems] = React.useState(["name"]);
  const [categoryItemTypes, setCategoryItemTypes] = React.useState(["string"]);
  const [checkedCategoryItems, setCheckedCategoryItems] = React.useState([
    true,
  ]);
  const [newCategoryItemName, setNewCategoryItemName] = useState("");
  const [newCategoryItemType, setNewCategoryItemType] = useState("");

  useEffect(() => {
    fetch(ClinicalTrialDataContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract ClinicalTrialData");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 9 - 8),
          allLines.slice(10 - 8, 32 - 8),
          allLines.slice(32 - 8, 38 - 8),
          allLines.slice(38 - 8, 44 - 8),
          allLines.slice(45 - 8, 49 - 8),
          allLines.slice(51 - 8, 63 - 8),
          allLines.slice(70 - 8, 74 - 8),
          allLines.slice(77 - 8, 81 - 8),
          allLines.slice(82 - 8, 95 - 8),
          allLines.slice(95 - 8, 100 - 8),
          allLines.slice(105 - 8),
        ]);
      });
  }, []);

  const setNewContract = (
    newContractName,
    targetURIParam,
    newCheckedEventDetailItems = checkedEventDetailItems,
    newEventDetailItems = eventDetailItems,
    newEventDetailItemTypes = eventDetailItemTypes,
    newCheckedCategoryItems = checkedCategoryItems,
    newCategoryItems = categoryItems,
    newCategoryItemTypes = categoryItemTypes,
    newCheckedPatientDetailItems = checkedPatientDetailItems,
    newPatientDetailItems = patientDetailItems,
    newPatientDetailItemTypes = patientDetailItemTypes,
    newCheckedLabResultsDetailItems = checkedLabResultDetailItems,
    newLabResultDetailItems = labResultDetailItems,
    newLabResultDetailItemTypes = labResultDetailItemTypes
  ) => {
    let newLines = [];
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        let contractText = `contract ${newContractName} is ERC1155, Ownable, AccessControl {`;
        newLines.push(contractText);
      } else if (i === 1) {
        for (let j = 0; j < newPatientDetailItems.length; j++) {
          if (!newCheckedPatientDetailItems[j]) continue;
          newLines.push(
            `        ${newPatientDetailItemTypes[j]} ${newPatientDetailItems[j]};`
          );
        }
      } else if (i === 2) {
        for (let j = 0; j < newLabResultDetailItems.length; j++) {
          if (!newCheckedLabResultsDetailItems[j]) continue;
          newLines.push(
            `        ${newLabResultDetailItemTypes[j]} ${newLabResultDetailItems[j]};`
          );
        }
      } else if (i === 3) {
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          newLines.push(
            `        ${newCategoryItemTypes[j]} ${newCategoryItems[j]};`
          );
        }
      } else if (i === 4) {
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          newLines.push(
            `        ${newEventDetailItemTypes[j]} ${newEventDetailItems[j]};`
          );
        }
      } else if (i === 5) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
        newLines.push(`        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);`);
        newLines.push(`    }`);
        newLines.push(``);
        let addCateText = "    function addDoctor(address doctorAddress,";
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
        newLines.push(
          `        require(doctors[msg.sender].doctorAddress == address(0), "Doctor has already added.");`
        );
        let text = `        doctors[doctorAddress] = Doctor(doctorAddress, 0, 0`;
        for (let j = 0; j < newCategoryItems.length; j++) {
          if (!newCheckedCategoryItems[j]) continue;
          text += `, ${newCategoryItems[j]}`;
        }
        text += ");";
        newLines.push(text);
      } else if (i === 6) {
        let addCateText =
          "    function addDataCenter(address dataCenterAddress";
        for (let j = 0; j < newEventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          let memoryText = "";
          if (
            newEventDetailItemTypes[j].includes("string") ||
            newEventDetailItemTypes[j].includes("[]")
          )
            memoryText = "memory ";
          addCateText += `, ${newEventDetailItemTypes[j]} ${memoryText}${newEventDetailItems[j]}`;
        }
        addCateText += ") public onlyOwner {";
        newLines.push(addCateText);
        newLines.push(
          `        require(dataCenters[msg.sender].addressInfo == address(0), "Data center has already added.");`
        );
        let text = `        dataCenters[dataCenterAddress] = ClinicalDataCenter(dataCenterAddress`;
        for (let j = 0; j < eventDetailItems.length; j++) {
          if (!newCheckedEventDetailItems[j]) continue;
          text += `, ${eventDetailItems[j]}`;
        }
        text += ");";
        newLines.push(text);
      } else if (i === 7) {
        let addCateText =
          "    function addPatient(uint256 age, uint8 genderIndex, string[] memory diseases, string[] memory drugs";
        for (let j = 0; j < newPatientDetailItems.length; j++) {
          if (!newCheckedPatientDetailItems[j]) continue;
          let memoryText = "";
          if (
            newPatientDetailItemTypes[j].includes("string") ||
            newPatientDetailItemTypes[j].includes("[]")
          )
            memoryText = "memory ";
          addCateText += `, ${newPatientDetailItemTypes[j]} ${memoryText}${newPatientDetailItems[j]}`;
        }
        addCateText += ") public onlyRole(DOCTOR_ROLE) payable {";
        newLines.push(addCateText);
      } else if (i === 8) {
        for (let j = 0; j < newPatientDetailItems.length; j++) {
          if (!newCheckedPatientDetailItems[j]) continue;
          newLines.push(
            `        patientEntered.${newPatientDetailItems[j]} = ${newPatientDetailItems[j]};`
          );
        }
      } else if (i === 9) {
        let addCateText =
          "    function addLabResult(uint256 patientId, string memory testName, uint256 testValue";
        for (let j = 0; j < newLabResultDetailItems.length; j++) {
          if (!newCheckedLabResultsDetailItems[j]) continue;
          let memoryText = "";
          if (
            newLabResultDetailItemTypes[j].includes("string") ||
            newLabResultDetailItemTypes[j].includes("[]")
          )
            memoryText = "memory ";
          addCateText += `, ${newLabResultDetailItemTypes[j]} ${memoryText}${newLabResultDetailItems[j]}`;
        }
        addCateText += ") public onlyRole(DOCTOR_ROLE) {";
        newLines.push(addCateText);
        newLines.push(
          '        require(patients[patientId].age > 0, "There is no patient with the given id.");'
        );
        newLines.push(
          '        require(patients[patientId].doctorAddress == msg.sender, "This patient is not your patient.");'
        );
        let text = `        patients[patientId].labResults.push(LabResult(testName, testValue, block.timestamp`;
        for (let j = 0; j < newLabResultDetailItems.length; j++) {
          if (!newCheckedLabResultsDetailItems[j]) continue;
          text += `, ${newLabResultDetailItems[j]}`;
        }
        text += "));";
        newLines.push(text);
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const newLabResultDetailNameChange = (event) => {
    setNewLabResultDetailName(event.target.value);
  };
  const newLabResultDetailTypeChange = (event) => {
    setNewLabResultDetailType(event.target.value);
  };

  const newPatientDetailNameChange = (event) => {
    setNewPatientDetailName(event.target.value);
  };
  const newPatientDetailTypeChange = (event) => {
    setNewPatientDetailType(event.target.value);
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

  const checkPatientDetailItem = (value, index) => {
    const newCheckedPatientDetailList = [
      ...checkedPatientDetailItems.slice(0, index),
      value,
      ...checkedPatientDetailItems.slice(index + 1),
    ];
    setCheckedPatientDetailItems(newCheckedPatientDetailList);
    setNewContract(
      contractName,
      contractURI,
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      checkedCategoryItems,
      categoryItems,
      categoryItemTypes,
      newCheckedPatientDetailList
    );
  };

  const checkLabResultDetailItem = (value, index) => {
    const newCheckedLabResultDetailList = [
      ...checkedLabResultDetailItems.slice(0, index),
      value,
      ...checkedLabResultDetailItems.slice(index + 1),
    ];
    setCheckedPatientDetailItems(newCheckedLabResultDetailList);
    setNewContract(
      contractName,
      contractURI,
      checkedEventDetailItems,
      eventDetailItems,
      eventDetailItemTypes,
      checkedCategoryItems,
      categoryItems,
      categoryItemTypes,
      checkedPatientDetailItems,
      patientDetailItems,
      patientDetailItemTypes,
      newCheckedLabResultDetailList
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

  const addNewPatientItem = (e) => {
    if (e.key != "Enter") return;
    if (patientDetailItems.includes(newPatientDetailName)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newPatientDetailType;
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
      newPatientDetailName == "string" ||
      newPatientDetailName == "string[]" ||
      newPatientDetailName == "uint256[]" ||
      newPatientDetailName == "uint256" ||
      newPatientDetailName == "bool" ||
      newPatientDetailName == "address" ||
      newPatientDetailName == "bytes" ||
      newPatientDetailName == "uint128" ||
      newPatientDetailName == "uint64" ||
      newPatientDetailName == "uint32" ||
      newPatientDetailName == "uint16"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newPatientDetailName.length > 0 && newPatientDetailType.length > 0) {
      const newPatientItemCheckList = [...checkedPatientDetailItems, true];
      setCheckedPatientDetailItems(newPatientItemCheckList);
      const newPatientItemItemList = [
        ...patientDetailItems,
        newPatientDetailName,
      ];
      setPatientDetailItems(newPatientItemItemList);
      const newPatientItemTypeList = [
        ...patientDetailItemTypes,
        newPatientDetailType,
      ];
      setPatientDetailItemTypes(newPatientItemTypeList);
      setNewPatientDetailName("");
      setNewPatientDetailType("");
      setNewContract(
        contractName,
        contractURI,
        checkedEventDetailItems,
        eventDetailItems,
        eventDetailItemTypes,
        checkedCategoryItems,
        categoryItems,
        categoryItemTypes,
        newPatientItemCheckList,
        newPatientItemItemList,
        newPatientItemTypeList
      );
    }
  };

  const addLabResultItem = (e) => {
    if (e.key != "Enter") return;
    if (labResultDetailItems.includes(newLabResultDetailName)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newLabResultDetailType;
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
      newLabResultDetailName == "string" ||
      newLabResultDetailName == "string[]" ||
      newLabResultDetailName == "uint256[]" ||
      newLabResultDetailName == "uint256" ||
      newLabResultDetailName == "bool" ||
      newLabResultDetailName == "address" ||
      newLabResultDetailName == "bytes" ||
      newLabResultDetailName == "uint128" ||
      newLabResultDetailName == "uint64" ||
      newLabResultDetailName == "uint32" ||
      newLabResultDetailName == "uint16"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (
      newLabResultDetailName.length > 0 &&
      newLabResultDetailType.length > 0
    ) {
      const newLabResultItemCheckList = [...checkedLabResultDetailItems, true];
      setCheckedLabResultDetailItems(newLabResultItemCheckList);
      const newLabResultItemItemList = [
        ...labResultDetailItems,
        newLabResultDetailName,
      ];
      setLabResultDetailItems(newLabResultItemItemList);
      const newLabResultItemTypeList = [
        ...labResultDetailItemTypes,
        newLabResultDetailType,
      ];
      setLabResultDetailItemTypes(newLabResultItemTypeList);
      setNewLabResultDetailName("");
      setNewLabResultDetailType("");
      setNewContract(
        contractName,
        contractURI,
        checkedEventDetailItems,
        eventDetailItems,
        eventDetailItemTypes,
        checkedCategoryItems,
        categoryItems,
        categoryItemTypes,
        checkedPatientDetailItems,
        patientDetailItems,
        patientDetailItemTypes,
        newLabResultItemCheckList,
        newLabResultItemItemList,
        newLabResultItemTypeList
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

  const patientsCheckboxViews = [];
  for (let i = 0; i < patientDetailItems.length; i++) {
    patientsCheckboxViews.push(
      <CustomCheckbox
        label={patientDetailItems[i] + " - " + patientDetailItemTypes[i]}
        onChange={(event) => checkPatientDetailItem(event.target.checked, i)}
      />
    );
  }

  const labResultCheckboxViews = [];
  for (let i = 0; i < labResultDetailItems.length; i++) {
    labResultCheckboxViews.push(
      <CustomCheckbox
        label={labResultDetailItems[i] + " - " + labResultDetailItemTypes[i]}
        onChange={(event) => checkLabResultDetailItem(event.target.checked, i)}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"ClinicalTrialData"}
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
                defaultValue="ClinicalTrialData"
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
              Clinical Data Center Details
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
                label="New Data Center Detail"
                value={newEventDetailName}
                defaultValue=""
                onKeyDown={addNewEventDetail}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newEventDetailTypeChange}
                label="New Data Center Detail Type"
                value={newEventDetailType}
                defaultValue=""
                onKeyDown={addNewEventDetail}
              />
            </div>
          </Box>
          <FormGroup>
            <Divider
              style={{ marginTop: "30px", marginBottom: "20px" }}
              spacing={1}
            >
              Doctor Details
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
                label="New Doctor Feature"
                value={newCategoryItemName}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newCategoryItemTypeChange}
                label="New Doctor Feature Type"
                value={newCategoryItemType}
                defaultValue=""
                onKeyDown={addNewCategoryItem}
              />
            </div>
          </Box>

          <FormGroup>
            <Divider
              style={{ marginTop: "30px", marginBottom: "20px" }}
              spacing={1}
            >
              Patient Details
            </Divider>
            {patientsCheckboxViews}
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
                onChange={newPatientDetailNameChange}
                label="New Patient Detail"
                value={newPatientDetailName}
                defaultValue=""
                onKeyDown={addNewPatientItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newPatientDetailTypeChange}
                label="New Patient Detail Type"
                value={newPatientDetailType}
                defaultValue=""
                onKeyDown={addNewPatientItem}
              />
            </div>
          </Box>

          <FormGroup>
            <Divider
              style={{ marginTop: "30px", marginBottom: "20px" }}
              spacing={1}
            >
              Lab Result Details
            </Divider>
            {labResultCheckboxViews}
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
                onChange={newLabResultDetailNameChange}
                label="New Lab Result Detail"
                value={newLabResultDetailName}
                defaultValue=""
                onKeyDown={addLabResultItem}
              />
            </div>
            <div>
              <TextField
                style={{ marginTop: "15px" }}
                onChange={newLabResultDetailTypeChange}
                label="New Lab Result Detail Type"
                value={newLabResultDetailType}
                defaultValue=""
                onKeyDown={addLabResultItem}
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ClinicalTrialData;
