import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";

import SourceCodeView from "../../components/source-code-view/source_code_view";

import cafeMenuContract from "../../contracts/Cafe_Menu.sol";

const CafeMenu = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("CafeMenu");
  const [newMenuItem, setNewMenuItem] = useState("");
  const [newMenuItemProperty, setNewMenuItemProperty] = useState("");
  const [newMenuItemPropertyType, setNewMenuItemPropertyType] = useState("");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [menuItemTypes, setMenuItemTypes] = useState([
    "BREAKFAST",
    "ENTREE",
    "SALAD",
    "PIZZA",
    "BURGER",
    "PASTA",
    "MEAT",
    "COLDDRINK",
    "HOTDRINK",
    "SPECIAL",
    "CAKE",
    "COOKIE",
    "BISKUIT",
    "PASTRY",
    "CANDY",
    "PUDDING",
    "DEEPFRIED",
    "FROZEN",
    "GELATIN",
    "FRUIT",
  ]);
  const [menuItems, setMenuItems] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [menuItemProperties, setMenuItemProperties] = useState([
    "name",
    "calories",
    "preparationTime",
    "ingredients",
  ]);
  const [menuItemPropertiesTypes, setMenuItemPropertiesTypes] = useState([
    "string",
    "uint256",
    "uint256",
    "string[]",
  ]);
  const [menuItemPropertiesCheck, setMenuItemPropertiesCheck] = useState([
    true,
    true,
    true,
    true,
  ]);

  useEffect(() => {
    fetch(cafeMenuContract)
      .then((r) => r.text())
      .then(async (text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract CafeMenu");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 8 - 7),
          allLines.slice(9 - 7, 12 - 7),
          allLines.slice(13 - 7, 19 - 7),
          allLines.slice(23 - 7, 37 - 7),
          allLines.slice(38 - 7, 41 - 7),
          allLines.slice(53 - 7, 85 - 7),
          allLines.slice(102 - 7),
        ]);
      });
  }, []);

  const setItem = (checked, item) => {
    const index = menuItemTypes.indexOf(item);
    const newMenuItems = [
      ...menuItems.slice(0, index),
      checked,
      ...menuItems.slice(index + 1),
    ];
    setMenuItems(newMenuItems);
    setNewContract(contractName, contractURI, newMenuItems);
  };

  const setMenuItemProperty = (checked, i) => {
    const newCheckedPropertyList = [
      ...menuItemPropertiesCheck.slice(0, i),
      checked,
      ...menuItemPropertiesCheck.slice(i + 1),
    ];
    setMenuItemPropertiesCheck(newCheckedPropertyList);
    setNewContract(
      contractName,
      contractURI,
      menuItems,
      menuItemTypes,
      menuItemProperties,
      newCheckedPropertyList,
      menuItemPropertiesTypes
    );
  };

  const targetNameChange = (event) => {
    const inputValue = event.target.value;
    if (isNaN(inputValue)) {
      setContractName(inputValue);
      setNewContract(inputValue, contractURI, menuItems);
    }
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(contractName, event.target.value, menuItems);
  };

  const menuItemChange = (event) => {
    setNewMenuItem(event.target.value);
  };

  const newMenuItemPropertyChange = (event) => {
    setNewMenuItemProperty(event.target.value);
  };

  const newMenuItemPropertyTypeChange = (event) => {
    setNewMenuItemPropertyType(event.target.value);
  };

  const addNewMenuItemProperty = (e) => {
    if (e.key != "Enter") return;
    if (menuItemProperties.includes(newMenuItemProperty)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newMenuItemPropertyType;
    if (
      val !== "string" &&
      val !== "string[]" &&
      val !== "uint256[]" &&
      val !== "uint256" &&
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
      newMenuItemProperty == "string" ||
      newMenuItemProperty == "string[]" ||
      newMenuItemProperty == "uint256[]" ||
      newMenuItemProperty == "uint256" ||
      newMenuItemProperty == "bool" ||
      newMenuItemProperty == "address" ||
      newMenuItemProperty == "bytes" ||
      newMenuItemProperty == "uint128" ||
      newMenuItemProperty == "uint64" ||
      newMenuItemProperty == "uint32" ||
      newMenuItemProperty == "uint16"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newMenuItemProperty.length > 0 && newMenuItemPropertyType.length > 0) {
      const newMenuItemPropertiesCheck = [...menuItemPropertiesCheck, true];
      setMenuItemPropertiesCheck(newMenuItemPropertiesCheck);
      const newMenuItemProperties = [
        ...menuItemProperties,
        newMenuItemProperty,
      ];
      setMenuItemProperties(newMenuItemProperties);
      const newMenuItemPropertiesTypes = [
        ...menuItemPropertiesTypes,
        newMenuItemPropertyType,
      ];
      setMenuItemPropertiesTypes(newMenuItemPropertiesTypes);
      setNewMenuItemProperty("");
      setNewMenuItemPropertyType("");
      setNewContract(
        contractName,
        contractURI,
        menuItems,
        menuItemTypes,
        newMenuItemProperties,
        newMenuItemPropertiesCheck,
        newMenuItemPropertiesTypes
      );
    }
  };

  const addNewMenuItem = (e) => {
    if (e.key != "Enter") return;
    if (menuItems.includes(newMenuItem)) {
      alert("Please enter a unique name");
      return;
    }
    if (newMenuItem.length > 0) {
      const newMenuItemsCheck = [...menuItems, true];
      setMenuItems(newMenuItemsCheck);
      const newMenuItemTypes = [...menuItemTypes, newMenuItem];
      setMenuItemTypes(newMenuItemTypes);
      setNewMenuItem("");
      setNewContract(
        contractName,
        contractURI,
        newMenuItemsCheck,
        newMenuItemTypes
      );
    }
  };

  const setNewContract = (
    newContractName,
    targetURIParam,
    newMenuItemChecks,
    newMenuItems = menuItemTypes,
    newMenuItemProperties = menuItemProperties,
    newMenuItemPropertiesCheck = menuItemPropertiesCheck,
    newMenuItemPropertiesTypes = menuItemPropertiesTypes
  ) => {
    let newLines = [];
    let itemLine = "    enum MenuItemType {";
    let lastItem = "";
    let addComma = false;
    for (let i = 0; i < newMenuItemChecks.length; i++) {
      if (newMenuItemChecks[i]) {
        if (addComma) itemLine += ", ";
        lastItem = newMenuItems[i];
        itemLine += lastItem;
        addComma = true;
      }
    }
    itemLine += "}";
    const lastItemLine = `        require(itemType <= uint8(MenuItemType.${lastItem}), "Menu item type is out of range.");`;
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(`contract ${newContractName} is ERC1155, Ownable {`);
      } else if (i === 1) {
        newLines.push(itemLine);
      } else if (i === 2) {
        for (let j = 0; j < newMenuItemProperties.length; j++) {
          if (!newMenuItemPropertiesCheck[j]) continue;
          newLines.push(
            `        ${newMenuItemPropertiesTypes[j]} ${newMenuItemProperties[j]};`
          );
        }
      } else if (i === 3) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
      } else if (i === 4) {
        let addNewItemFunc = `    function addNewMenuItem(uint256 price, uint8 itemType, uint256 initialAmount`;
        for (let j = 0; j < newMenuItemProperties.length; j++) {
          if (!newMenuItemPropertiesCheck[j]) continue;
          if (
            newMenuItemPropertiesTypes[j].includes("string") ||
            newMenuItemPropertiesTypes[j].includes("[]")
          ) {
            addNewItemFunc += `, ${newMenuItemPropertiesTypes[j]} memory ${newMenuItemProperties[j]}`;
          } else {
            addNewItemFunc += `, ${newMenuItemPropertiesTypes[j]} ${newMenuItemProperties[j]}`;
          }
        }
        addNewItemFunc += ") public onlyOwner {";
        newLines.push(addNewItemFunc);
        newLines.push(lastItemLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newMenuItemPropertiesCheck[1])
          newLines.push(
            '        require(calories > 0, "Calories should be greater than 0.");'
          );
        if (newMenuItemPropertiesCheck[2])
          newLines.push(
            '        require(preparationTime > 0, "Preparation time should be greater than 0.");'
          );
        if (newMenuItemPropertiesCheck[3])
          newLines.push(
            '        require(ingredients.length > 0, "Ingredients can not be empty.");'
          );
        if (newMenuItemPropertiesCheck[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(menuItems[i].name, name), "There is already a menu item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        uint256 tokenId = _tokenIdCounter.current();");
        newLines.push("        _tokenIdCounter.increment();");
        let itemCreateLine =
          "        menuItems[tokenId] = MenuItem(tokenId, price, 0, MenuItemType(itemType)";
        for (let j = 0; j < newMenuItemProperties.length; j++) {
          if (!newMenuItemPropertiesCheck[j]) continue;
          itemCreateLine += `, ${newMenuItemProperties[j]}`;
        }
        itemCreateLine += ");";
        newLines.push(itemCreateLine);
      } else if (i === 5) {
        let addNewItemFunc = `    function updateItemData(uint256 itemId, uint256 price, uint8 itemType`;
        for (let j = 0; j < newMenuItemProperties.length; j++) {
          if (!newMenuItemPropertiesCheck[j]) continue;
          if (
            newMenuItemPropertiesTypes[j].includes("string") ||
            newMenuItemPropertiesTypes[j].includes("[]")
          ) {
            addNewItemFunc += `, ${newMenuItemPropertiesTypes[j]} memory ${newMenuItemProperties[j]}`;
          } else {
            addNewItemFunc += `, ${newMenuItemPropertiesTypes[j]} ${newMenuItemProperties[j]}`;
          }
        }
        addNewItemFunc += ") public onlyOwner {";
        newLines.push(addNewItemFunc);
        newLines.push(lastItemLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newMenuItemPropertiesCheck[1])
          newLines.push(
            '        require(calories > 0, "Calories should be greater than 0.");'
          );
        if (newMenuItemPropertiesCheck[2])
          newLines.push(
            '        require(preparationTime > 0, "Preparation time should be greater than 0.");'
          );
        if (newMenuItemPropertiesCheck[3])
          newLines.push(
            '        require(ingredients.length > 0, "Ingredients can not be empty.");'
          );
        newLines.push(
          '        require(supplies.length > 0, "There is no item to update.");'
        );
        newLines.push(
          '        require(itemId <= supplies.length-1 && itemId >= 0, "Menu item does not exist.");'
        );
        if (newMenuItemPropertiesCheck[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(menuItems[i].name, name), "There is already a menu item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        menuItems[itemId].price = price;");
        if (newMenuItemPropertiesCheck[0])
          newLines.push("        menuItems[itemId].name = name;");
        newLines.push(
          "        menuItems[itemId].itemType = MenuItemType(itemType);"
        );
        if (newMenuItemPropertiesCheck[1])
          newLines.push("        menuItems[itemId].calories = calories;");
        if (newMenuItemPropertiesCheck[2])
          newLines.push(
            "        menuItems[itemId].preparationTime = preparationTime;"
          );
        for (let t = 3; t < newMenuItemPropertiesCheck.length; t++) {
          if (!newMenuItemPropertiesCheck[t]) continue;
          newLines.push(
            `        menuItems[itemId].${newMenuItemProperties[t]} = ${newMenuItemProperties[t]};`
          );
        }
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const menuItemPropertiesView = [];
  for (let i = 0; i < menuItemProperties.length; i++) {
    const item = menuItemProperties[i];
    const itemType = menuItemPropertiesTypes[i];
    menuItemPropertiesView.push(
      <CustomCheckbox
        id={item}
        label={item + " - " + itemType}
        onChange={(event) => setMenuItemProperty(event.target.checked, i)}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"CafeMenu"}
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
                defaultValue="CafeMenu"
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
            </div>
          </Box>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Menu Item Types</h5>
          <FormGroup>
            {menuItemTypes.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setItem(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={menuItemChange}
              label="New Menu Item"
              value={newMenuItem}
              defaultValue=""
              onKeyDown={addNewMenuItem}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Menu Item Properties</h5>
          <FormGroup>
            {menuItemPropertiesView}
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              {" "}
              <div>
                {" "}
                <TextField
                  style={{ marginTop: "15px" }}
                  onChange={newMenuItemPropertyChange}
                  label="New Menu Property"
                  value={newMenuItemProperty}
                  defaultValue=""
                  onKeyDown={addNewMenuItemProperty}
                />
              </div>
              <div>
                <TextField
                  style={{ marginTop: "15px" }}
                  onChange={newMenuItemPropertyTypeChange}
                  label="Property Type"
                  value={newMenuItemPropertyType}
                  defaultValue=""
                  onKeyDown={addNewMenuItemProperty}
                />
              </div>
            </Box>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default CafeMenu;
