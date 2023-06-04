import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";

import SourceCodeView from "../../components/source-code-view/source_code_view";

import clothingContract from '../../contracts/Clothing.sol';

const Clothing = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("Clothing");
  const [newClothingType, setNewClothingType] = useState("");
  const [newClothingSize, setNewClothingSize] = useState("");
  const [newClothingColor, setNewClothingColor] = useState("");
  const [newClothingItemProperty, setNewClothingItemProperty] = useState("");
  const [newClothingItemPropertyType, setNewClothingItemPropertyType] = useState("");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([
    "TSHIRT",
    "SHIRT", 
    "PANTS", 
    "HOODIES", 
    "SWEATER", 
    "SHORTS", 
    "SKIRTS", 
    "RAINCOAT", 
    "UNDERWEAR", 
    "GYMCLOTHES", 
    "TANKTOP", 
    "PAJAMA", 
    "SWIMSUIT", 
    "BATHROBE", 
    "COAT", 
    "SCARF", 
    "SUIT", 
    "OTHER" 
  ]);
  const [clothingTypesSelected, setClothingTypesSelected] = useState([
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
    true 
  ]);
  const [clothingSizes, setClothingSizes] = useState([
    "XXS", 
    "XS", 
    "S", 
    "SM", 
    "M", 
    "ML", 
    "MT", 
    "L", 
    "LT", 
    "XL", 
    "XLT", 
    "XXL", 
    "XXLT", 
    "XXXL", 
    "XXXLT", 
    "XXXXL", 
    "XXXXLT", 
    "OTHER" 
  ]);
  const [clothingSizesSelected, setClothingSizesSelected] = useState([
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
    true 
  ]);
  const [clothingColors, setClothingColors] = useState([
    "RED", 
    "GREEN", 
    "BLACK", 
    "WHITE", 
    "BLUE", 
    "YELLOW", 
    "GREY", 
    "PURPLE", 
    "PINK", 
    "ORANGE", 
    "BROWN", 
    "OTHER" 
  ]);
  const [clothingColorsSelected, setClothingColorsSelected] = useState([
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
    true
  ]);
  const [clothingItemProperties, setClothingItemProperties] = useState([
    "name",
    "brand",
  ]);
  const [clothingItemPropertiesTypes, setClothingItemPropertiesTypes] = useState([
    "string",
    "string",
  ]);
  const [clothingItemPropertiesSelected, setClothingItemPropertiesSelected] = useState([
    true,
    true,
  ]);

  useEffect(() => {
    fetch(clothingContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract Clothing");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 8 - 7),
          allLines.slice(9 - 7, 12 - 7),
          allLines.slice(15 - 7, 23 - 7),
          allLines.slice(25 - 7, 39 - 7),
          allLines.slice(40 - 7, 43 - 7),
          allLines.slice(56 - 7, 88 - 7),
          allLines.slice(106 - 7),
        ]);
      });
  }, []);

  const setClothingType = (checked, type) => {
    const index = clothingTypes.indexOf(type);
    const newClothingTypesSelected = [
      ...clothingTypesSelected.slice(0, index),
      checked,
      ...clothingTypesSelected.slice(index + 1),
    ];
    setClothingTypesSelected(newClothingTypesSelected);
    setNewContract({newClothingTypesSelected: newClothingTypesSelected});
  };

  const setClothingSize = (checked, size) => {
    const index = clothingSizes.indexOf(size);
    const newClothingSizesSelected = [
      ...clothingSizesSelected.slice(0, index),
      checked,
      ...clothingSizesSelected.slice(index + 1),
    ];
    setClothingSizesSelected(newClothingSizesSelected);
    setNewContract({newClothingSizesSelected: newClothingSizesSelected});
  };

  const setClothingColor = (checked, color) => {
    const index = clothingColors.indexOf(color);
    const newClothingColorsSelected = [
      ...clothingColorsSelected.slice(0, index),
      checked,
      ...clothingColorsSelected.slice(index + 1),
    ];
    setClothingColorsSelected(newClothingColorsSelected);
    setNewContract({newClothingColorsSelected: newClothingColorsSelected});
  };

  const setClothingItemProperty = (checked, i) => {
    const newSelectedPropertyList = [
      ...clothingItemPropertiesSelected.slice(0, i),
      checked,
      ...clothingItemPropertiesSelected.slice(i + 1),
    ];
    setClothingItemPropertiesSelected(newSelectedPropertyList);
    setNewContract({newClothingItemPropertiesSelected: newSelectedPropertyList});
  };

  const targetNameChange = (event) => {
    const inputValue = event.target.value;
    if (isNaN(inputValue)) {
      setContractName(inputValue);
      setNewContract({newContractName: event.target.value});
    }
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract({targetURIParam: event.target.value});
  };

  const clothingTypeChange = (event) => {
    setNewClothingType(event.target.value);
  };

  const clothingColorChange = (event) => {
    setNewClothingColor(event.target.value);
  };

  const clothingSizeChange = (event) => {
    setNewClothingSize(event.target.value);
  };

  const newClothingItemPropertyChange = (event) => {
    setNewClothingItemProperty(event.target.value);
  };

  const newClothingItemPropertyTypeChange = (event) => {
    setNewClothingItemPropertyType(event.target.value);
  };

  const addNewClothingItemProperty = (e) => {
    if (e.key != "Enter") return;
    if (clothingItemProperties.includes(newClothingItemProperty)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newClothingItemPropertyType;
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
      val != "uint16" &&
      val != "uint8"
    ) {
      alert("Please enter a valid type");
      return;
    }
    if (
      newClothingItemProperty == "string" ||
      newClothingItemProperty == "string[]" ||
      newClothingItemProperty == "uint256[]" ||
      newClothingItemProperty == "uint256" ||
      newClothingItemProperty == "bool" ||
      newClothingItemProperty == "address" ||
      newClothingItemProperty == "bytes" ||
      newClothingItemProperty == "uint128" ||
      newClothingItemProperty == "uint64" ||
      newClothingItemProperty == "uint32" ||
      newClothingItemProperty == "uint16" ||
      newClothingItemProperty == "uint8" ||
      newClothingItemProperty == "ClothingType" ||
      newClothingItemProperty == "ClothingSize" ||
      newClothingItemProperty == "ClothingColor"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newClothingItemProperty.length > 0 && newClothingItemPropertyType.length > 0) {
      const newClothingItemPropertiesSelected = [...clothingItemPropertiesSelected, true];
      setClothingItemPropertiesSelected(newClothingItemPropertiesSelected);
      const newClothingItemProperties = [
        ...clothingItemProperties,
        newClothingItemProperty,
      ];
      setClothingItemProperties(newClothingItemProperties);
      const newClothingItemPropertiesTypes = [
        ...clothingItemPropertiesTypes,
        newClothingItemPropertyType,
      ];
      setClothingItemPropertiesTypes(newClothingItemPropertiesTypes);
      setNewClothingItemProperty("");
      setNewClothingItemPropertyType("");
      setNewContract({
        newClothingItemProperties: newClothingItemProperties,
        newClothingItemPropertiesSelected: newClothingItemPropertiesSelected,
        newClothingItemPropertiesTypes: newClothingItemPropertiesTypes
      });
    }
  };

  const addNewClothingType = (e) => {
    if (e.key != "Enter") return;
    if (clothingTypes.includes(newClothingType)) {
      alert("Please enter a unique clothing type");
      return;
    }
    if (newClothingType.length > 0) {
      const newClothingTypesSelected = [
        ...clothingTypesSelected, true];
      setClothingTypesSelected(newClothingTypesSelected);
      const newClothingTypes = [
        ...clothingTypes, newClothingType];
      setClothingTypes(newClothingTypes);
      setNewClothingType("");
      setNewContract({newClothingTypesSelected: newClothingTypesSelected, newClothingTypes: newClothingTypes});
    }
  };

  const addNewClothingSize = (e) => {
    if (e.key != "Enter") return;
    if (clothingSizes.includes(newClothingSize)) {
      alert("Please enter a unique clothing size");
      return;
    }
    if (newClothingSize.length > 0) {
      const newClothingSizesSelected = [
        ...clothingSizesSelected, true];
      setClothingSizesSelected(newClothingSizesSelected);
      const newClothingSizes = [
        ...clothingSizes, newClothingSize];
      setClothingSizes(newClothingSizes);
      setNewClothingSize("");
      setNewContract({newClothingSizesSelected: newClothingSizesSelected, newClothingSizes: newClothingSizes});
    }
  };

  const addNewClothingColor = (e) => {
    if (e.key != "Enter") return;
    if (clothingColors.includes(newClothingColor)) {
      alert("Please enter a unique clothing color");
      return;
    }
    if (newClothingColor.length > 0) { 
      const newClothingColorsSelected = [
        ...clothingColorsSelected, true];
      setClothingColorsSelected(newClothingColorsSelected);
      const newClothingColors = [
        ...clothingColors, newClothingColor];
      setClothingColors(newClothingColors);
      setNewClothingColor("");
      setNewContract({newClothingColorsSelected: newClothingColorsSelected, newClothingColors: newClothingColors});
    }
  };

  const setNewContract = ({
    newContractName,
    targetURIParam,
    newClothingTypesSelected,
    newClothingTypes,
    newClothingSizesSelected,
    newClothingSizes,
    newClothingColorsSelected,
    newClothingColors,
    newClothingItemProperties,
    newClothingItemPropertiesSelected,
    newClothingItemPropertiesTypes
  }) => {
    newContractName = newContractName || contractName;
    targetURIParam = targetURIParam || contractURI;
    newClothingTypesSelected = newClothingTypesSelected ||clothingTypesSelected;
    newClothingTypes = newClothingTypes || clothingTypes;
    newClothingSizesSelected = newClothingSizesSelected || clothingSizesSelected;
    newClothingSizes = newClothingSizes || clothingSizes;
    newClothingColorsSelected = newClothingColorsSelected || clothingColorsSelected;
    newClothingColors = newClothingColors || clothingColors;
    newClothingItemProperties = newClothingItemProperties || clothingItemProperties;
    newClothingItemPropertiesSelected = newClothingItemPropertiesSelected || clothingItemPropertiesSelected;
    newClothingItemPropertiesTypes = newClothingItemPropertiesTypes || clothingItemPropertiesTypes;

    let newLines = [];

    let clothingTypeLine = "    enum ClothingType {";
    let lastClothingType = "";
    let addComma = false;
    for (let i = 0; i < newClothingTypesSelected.length; i++) {
      if (newClothingTypesSelected[i]) {
        if (addComma) clothingTypeLine += ", ";
        lastClothingType = newClothingTypes[i];
        clothingTypeLine += lastClothingType;
        addComma = true;
      }
    }
    clothingTypeLine += "}";
    const lastClothingTypeLine = `        require(clothingType <= uint8(ClothingType.${lastClothingType}), "Clothing type is out of range");`;
    
    let clothingSizeLine = "    enum ClothingSize {";
    let lastClothingSize = "";
    addComma = false;
    for (let i = 0; i < newClothingSizesSelected.length; i++) {
      if (newClothingSizesSelected[i]) {
        if (addComma) clothingSizeLine += ", ";
        lastClothingSize = newClothingSizes[i];
        clothingSizeLine += lastClothingSize;
        addComma = true;
      }
    }
    clothingSizeLine += "}";
    const lastClothingSizeLine = `        require(clothingSize <= uint8(ClothingSize.${lastClothingSize}), "Clothing size is out of range");`;

    let clothingColorLine = "    enum ClothingColor {";
    let lastClothingColor = "";
    addComma = false;
    for (let i = 0; i < newClothingColorsSelected.length; i++) {
      if (newClothingColorsSelected[i]) {
        if (addComma) clothingColorLine += ", ";
        lastClothingColor = newClothingColors[i];
        clothingColorLine += lastClothingColor;
        addComma = true;
      }
    }
    clothingColorLine += "}";
    const lastClothingColorLine = `        require(clothingColor <= uint8(ClothingColor.${lastClothingColor}), "Clothing color is out of range");`;

    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(`contract ${newContractName} is ERC1155, Ownable {`);
      } else if (i === 1) {
        newLines.push(clothingTypeLine);
        newLines.push(clothingSizeLine);
        newLines.push(clothingColorLine);
      } else if (i === 2) {
        for (let j = 0; j < newClothingItemProperties.length; j++) {
          if (!newClothingItemPropertiesSelected[j]) continue;
          newLines.push(
            `        ${newClothingItemPropertiesTypes[j]} ${newClothingItemProperties[j]};`
          );
        }
      } else if (i === 3) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
      } else if (i === 4) {
        let addNewClothingItemFunc = `    function addNewClothingItem(uint256 price, uint8 clothingType, uint8 clothingSize, uint8 clothingColor, uint256 amount`;
        for (let j = 0; j < newClothingItemProperties.length; j++) {
          if (!newClothingItemPropertiesSelected[j]) continue;
          if (newClothingItemPropertiesTypes[j].includes("string") || newClothingItemPropertiesTypes[j].includes("[]")) {
            addNewClothingItemFunc += `, ${newClothingItemPropertiesTypes[j]} memory ${newClothingItemProperties[j]}`;
          } else {
            addNewClothingItemFunc += `, ${newClothingItemPropertiesTypes[j]} ${newClothingItemProperties[j]}`;
          }
        }
        addNewClothingItemFunc += ") public onlyOwner {";
        newLines.push(addNewClothingItemFunc);
        newLines.push(lastClothingTypeLine);
        newLines.push(lastClothingSizeLine);
        newLines.push(lastClothingColorLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newClothingItemPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name must be entered");'
          );
        if (newClothingItemPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(brand), "Brand name must be entered");'
          );
        if (newClothingItemPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(clothingItems[i].name, name), "There is already a clothing item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        uint256 tokenId = _tokenIdCounter.current();");
        newLines.push("        _tokenIdCounter.increment();");
        let itemCreateLine =
          "        clothingItems[tokenId] = ClothingItem(tokenId, price, 0, ClothingType(clothingType), ClothingSize(clothingSize), ClothingColor(clothingColor)";
        for (let j = 0; j < newClothingItemProperties.length; j++) {
          if (!newClothingItemPropertiesSelected[j]) continue;
          itemCreateLine += `, ${newClothingItemProperties[j]}`;
        }
        itemCreateLine += ");";
        newLines.push(itemCreateLine);
      } else if (i === 5) {
        let updateItemFunc = `    function updateClothingItem(uint256 clothingItemId, uint256 price, uint8 clothingType, uint8 clothingSize, uint8 clothingColor`;
        for (let j = 0; j < newClothingItemProperties.length; j++) {
          if (!newClothingItemPropertiesSelected[j]) continue;
          if (newClothingItemPropertiesTypes[j].includes("string") || newClothingItemPropertiesTypes[j].includes("[]")) {
            updateItemFunc += `, ${newClothingItemPropertiesTypes[j]} memory ${newClothingItemProperties[j]}`;
          } else {
            updateItemFunc += `, ${newClothingItemPropertiesTypes[j]} ${newClothingItemProperties[j]}`;
          }
        }
        updateItemFunc += ") public onlyOwner {";
        newLines.push(updateItemFunc);
        newLines.push(lastClothingTypeLine);
        newLines.push(lastClothingSizeLine);
        newLines.push(lastClothingColorLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newClothingItemPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name must be entered");'
          );
        if (newClothingItemPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(brand), "Brand name must be entered");'
          );
        newLines.push(
          '        require(supplies.length > 0, "There is no clothing item to update.");'
        );
        newLines.push(
          '        require(clothingItemId <= supplies.length-1 && clothingItemId >= 0, "Clothing item does not exist.");'
        );
        if (newClothingItemPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(clothingItems[i].name, name), "There is already a clothing item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        clothingItems[clothingItemId].price = price;");
        newLines.push(
          "        clothingItems[clothingItemId].clothingType = ClothingType(clothingType);"
        );
        newLines.push(
          "        clothingItems[clothingItemId].clothingSize = ClothingSize(clothingSize);"
        );
        newLines.push(
          "        clothingItems[clothingItemId].clothingColor = ClothingColor(clothingColor);"
        );
        if (newClothingItemPropertiesSelected[0])
          newLines.push("        clothingItems[clothingItemId].name = name;");
        if (newClothingItemPropertiesSelected[1])
          newLines.push("        clothingItems[clothingItemId].brand = brand;");
        for (let t = 2; t < newClothingItemPropertiesSelected.length; t++) {
          if (!newClothingItemPropertiesSelected[t]) continue;
          newLines.push(
            `        clothingItems[clothingItemId].${newClothingItemProperties[t]} = ${newClothingItemProperties[t]};`
          );
        }
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const clothingItemPropertiesView = [];
  for (let i = 0; i < clothingItemProperties.length; i++) {
    const item = clothingItemProperties[i];
    const itemType = clothingItemPropertiesTypes[i];
    clothingItemPropertiesView.push(
      <CustomCheckbox
        id={item}
        label={item + " - " + itemType}
        onChange={(event) => setClothingItemProperty(event.target.checked, i)}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"Clothing"}
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
                defaultValue="Clothing"
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
          <h5>Clothing Types</h5>
          <FormGroup>
            {clothingTypes.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setClothingType(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={clothingTypeChange}
              label="New Clothing Type"
              value={newClothingType}
              defaultValue=""
              onKeyDown={addNewClothingType}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Clothing Sizes</h5>
          <FormGroup>
            {clothingSizes.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setClothingSize(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={clothingSizeChange}
              label="New Clothing Size"
              value={newClothingSize}
              defaultValue=""
              onKeyDown={addNewClothingSize}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Clothing Colors</h5>
          <FormGroup>
            {clothingColors.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setClothingColor(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={clothingColorChange}
              label="New Clothing Color"
              value={newClothingColor}
              defaultValue=""
              onKeyDown={addNewClothingColor}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Clothing Item Properties</h5>
          <FormGroup>
            {clothingItemPropertiesView}
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
                  onChange={newClothingItemPropertyChange}
                  label="New Clothing Item Property"
                  value={newClothingItemProperty}
                  defaultValue=""
                  onKeyDown={addNewClothingItemProperty}
                />
              </div>
              <div>
                <TextField
                  style={{ marginTop: "15px" }}
                  onChange={newClothingItemPropertyTypeChange}
                  label="Property Type"
                  value={newClothingItemPropertyType}
                  defaultValue=""
                  onKeyDown={addNewClothingItemProperty}
                />
              </div>
            </Box>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Clothing;