import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";

import SourceCodeView from "../../components/source-code-view/source_code_view";

import gameObjectContract from '../../contracts/game_objects.sol';

const GameObjects = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState("Game Objects");
  const [newGameObjectType, setNewGameObjectType] = useState("");
  const [newGameObjectRareness, setNewGameObjectRareness] = useState("");
  const [newGameObjectProperty, setNewGameObjectProperty] = useState("");
  const [newGameObjectPropertyType, setNewGameObjectPropertyType] = useState("");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [gameObjectTypes, setGameObjectTypes] = useState([
    "CHARACTER",
    "CLOTHING",
    "COLLECTIBLE", 
    "SKIN", 
    "WEAPON", 
    "OTHER"
  ]);
  const [gameObjectTypesSelected, setGameObjectTypesSelected] = useState([
    true,
    true,
    true, 
    true, 
    true, 
    true
  ]);
  const [gameObjectRarenesses, setGameObjectRarenesses] = useState([
    "COMMON", 
    "RARE", 
    "SUPERRARE", 
    "LEGENDARY", 
    "UNIQUE", 
    "OTHER"
  ]);
  const [gameObjectRarenessesSelected, setGameObjectRarenessesSelected] = useState([
    true, 
    true, 
    true, 
    true, 
    true, 
    true, 
  ]);
  const [gameObjectProperties, setGameObjectProperties] = useState([
    "name",
    "gameName",
  ]);
  const [gameObjectPropertiesTypes, setGameObjectPropertiesTypes] = useState([
    "string",
    "string",
  ]);
  const [gameObjectPropertiesSelected, setGameObjectPropertiesSelected] = useState([
    true,
    true,
  ]);

  useEffect(() => {
    fetch(gameObjectContract)
      .then((r) => r.text())
      .then((text) => {
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 8),
          allLines.slice(9, 12),
          allLines.slice(14, 21),
          allLines.slice(23, 37),
          allLines.slice(38, 41),
          allLines.slice(53, 85),
          allLines.slice(101),
        ]);
      });
  }, []);

  const setGameObjectType = (checked, type) => {
    const index = gameObjectTypes.indexOf(type);
    const newGameObjectTypesSelected = [
      ...gameObjectTypesSelected.slice(0, index),
      checked,
      ...gameObjectTypesSelected.slice(index + 1),
    ];
    setGameObjectTypesSelected(newGameObjectTypesSelected);
    setNewContract({newGameObjectTypesSelected: newGameObjectTypesSelected});
  };

  const setGameObjectRareness = (checked, size) => {
    const index = gameObjectRarenesses.indexOf(size);
    const newGameObjectRarenessesSelected = [
      ...gameObjectRarenessesSelected.slice(0, index),
      checked,
      ...gameObjectRarenessesSelected.slice(index + 1),
    ];
    setGameObjectRarenessesSelected(newGameObjectRarenessesSelected);
    setNewContract({newGameObjectRarenessesSelected: newGameObjectRarenessesSelected});
  };

  const setGameObjectProperty = (checked, i) => {
    const newSelectedPropertyList = [
      ...gameObjectPropertiesSelected.slice(0, i),
      checked,
      ...gameObjectPropertiesSelected.slice(i + 1),
    ];
    setGameObjectPropertiesSelected(newSelectedPropertyList);
    setNewContract({newGameObjectPropertiesSelected: newSelectedPropertyList});
  };

  const targetNameChange = (event) => {
    setContractName(event.target.value);
    setNewContract({newContractName: event.target.value});
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract({targetURIParam: event.target.value});
  };

  const gameObjectTypeChange = (event) => {
    setNewGameObjectType(event.target.value);
  };

  const gameObjectRarenessChange = (event) => {
    setNewGameObjectRareness(event.target.value);
  };

  const newGameObjectPropertyChange = (event) => {
    setNewGameObjectProperty(event.target.value);
  };

  const newGameObjectPropertyTypeChange = (event) => {
    setNewGameObjectPropertyType(event.target.value);
  };

  const addNewGameObjectProperty = (e) => {
    if (e.key != "Enter") return;
    if (gameObjectProperties.includes(newGameObjectProperty)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newGameObjectPropertyType;
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
      newGameObjectProperty == "string" ||
      newGameObjectProperty == "string[]" ||
      newGameObjectProperty == "uint256[]" ||
      newGameObjectProperty == "uint256" ||
      newGameObjectProperty == "bool" ||
      newGameObjectProperty == "address" ||
      newGameObjectProperty == "bytes" ||
      newGameObjectProperty == "uint128" ||
      newGameObjectProperty == "uint64" ||
      newGameObjectProperty == "uint32" ||
      newGameObjectProperty == "uint16" ||
      newGameObjectProperty == "uint8" ||
      newGameObjectProperty == "ItemType" ||
      newGameObjectProperty == "Rareness"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newGameObjectProperty.length > 0 && newGameObjectPropertyType.length > 0) {
      const newGameObjectPropertiesSelected = [...gameObjectPropertiesSelected, true];
      setGameObjectPropertiesSelected(newGameObjectPropertiesSelected);
      const newGameObjectProperties = [
        ...gameObjectProperties,
        newGameObjectProperty,
      ];
      setGameObjectProperties(newGameObjectProperties);
      const newGameObjectPropertiesTypes = [
        ...gameObjectPropertiesTypes,
        newGameObjectPropertyType,
      ];
      setGameObjectPropertiesTypes(newGameObjectPropertiesTypes);
      setNewGameObjectProperty("");
      setNewGameObjectPropertyType("");
      setNewContract({
        newGameObjectProperties: newGameObjectProperties,
        newGameObjectPropertiesSelected: newGameObjectPropertiesSelected,
        newGameObjectPropertiesTypes: newGameObjectPropertiesTypes
      });
    }
  };

  const addNewGameObjectType = (e) => {
    if (e.key != "Enter") return;
    if (gameObjectTypes.includes(newGameObjectType)) {
      alert("Please enter a unique game object type");
      return;
    }
    if (newGameObjectType.length > 0) {
      const newGameObjectTypesSelected = [
        ...gameObjectTypesSelected, true];
      setGameObjectTypesSelected(newGameObjectTypesSelected);
      const newGameObjectTypes = [
        ...gameObjectTypes, newGameObjectType];
      setGameObjectTypes(newGameObjectTypes);
      setNewGameObjectType("");
      setNewContract({newGameObjectTypesSelected: newGameObjectTypesSelected, newGameObjectTypes: newGameObjectTypes});
    }
  };

  const addNewGameObjectRareness = (e) => {
    if (e.key != "Enter") return;
    if (gameObjectRarenesses.includes(newGameObjectRareness)) {
      alert("Please enter a unique game object rareness");
      return;
    }
    if (newGameObjectRareness.length > 0) {
      const newGameObjectRarenessSelected = [
        ...gameObjectRarenessesSelected, true];
      setGameObjectRarenessesSelected(newGameObjectRarenessSelected);
      const newGameObjectRarenesses = [
        ...gameObjectRarenesses, newGameObjectRareness];
      setGameObjectRarenesses(newGameObjectRarenesses);
      setNewGameObjectRareness("");
      setNewContract({newGameObjectRarenessSelected: newGameObjectRarenessSelected, newGameObjectRarenesses: newGameObjectRarenesses});
    }
  };

  const setNewContract = ({
    newContractName,
    targetURIParam,
    newGameObjectTypesSelected,
    newGameObjectTypes,
    newGameObjectRarenessesSelected,
    newGameObjectRarenesses,
    newGameObjectProperties,
    newGameObjectPropertiesSelected,
    newGameObjectPropertiesTypes
  }) => {
    newContractName = newContractName || contractName;
    targetURIParam = targetURIParam || contractURI;
    newGameObjectTypesSelected = newGameObjectTypesSelected ||gameObjectTypesSelected;
    newGameObjectTypes = newGameObjectTypes || gameObjectTypes;
    newGameObjectRarenessesSelected = newGameObjectRarenessesSelected || gameObjectRarenessesSelected;
    newGameObjectRarenesses = newGameObjectRarenesses || gameObjectRarenesses;
    newGameObjectProperties = newGameObjectProperties || gameObjectProperties;
    newGameObjectPropertiesSelected = newGameObjectPropertiesSelected || gameObjectPropertiesSelected;
    newGameObjectPropertiesTypes = newGameObjectPropertiesTypes || gameObjectPropertiesTypes;

    let newLines = [];

    let gameObjectTypeLine = "    enum ItemType {";
    let lastGameObjectType = "";
    let addComma = false;
    for (let i = 0; i < newGameObjectTypesSelected.length; i++) {
      if (newGameObjectTypesSelected[i]) {
        if (addComma) gameObjectTypeLine += ", ";
        lastGameObjectType = newGameObjectTypes[i];
        gameObjectTypeLine += lastGameObjectType;
        addComma = true;
      }
    }
    gameObjectTypeLine += "}";
    const lastGameObjectTypeLine = `        require(itemType <= uint8(ItemType.${lastGameObjectType}), "Type of game item is out of range");`;
    
    let gameObjectRarenessLine = "    enum Rareness {";
    let lastGameObjectRareness = "";
    addComma = false;
    for (let i = 0; i < newGameObjectRarenessesSelected.length; i++) {
      if (newGameObjectRarenessesSelected[i]) {
        if (addComma) gameObjectRarenessLine += ", ";
        lastGameObjectRareness = newGameObjectRarenesses[i];
        gameObjectRarenessLine += lastGameObjectRareness;
        addComma = true;
      }
    }
    gameObjectRarenessLine += "}";
    const lastGameObjectRarenessLine = `        require(rareness <= uint8(Rareness.${lastGameObjectRareness}), "Rareness of game item is out of range");`;

    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(`contract ${newContractName} is ERC1155, Ownable {`);
      } else if (i === 1) {
        newLines.push(gameObjectTypeLine);
        newLines.push(gameObjectRarenessLine);
      } else if (i === 2) {
        for (let j = 0; j < newGameObjectProperties.length; j++) {
          if (!newGameObjectPropertiesSelected[j]) continue;
          newLines.push(
            `        ${newGameObjectPropertiesTypes[j]} ${newGameObjectProperties[j]};`
          );
        }
      } else if (i === 3) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
      } else if (i === 4) {
        let addNewGameObjectFunc = `    function addNewGameItem(uint256 price, uint8 itemType, uint8 rareness, uint256 amount`;
        for (let j = 0; j < newGameObjectProperties.length; j++) {
          if (!newGameObjectPropertiesSelected[j]) continue;
          if (newGameObjectPropertiesTypes[j].includes("string") || newGameObjectPropertiesTypes[j].includes("[]")) {
            addNewGameObjectFunc += `, ${newGameObjectPropertiesTypes[j]} memory ${newGameObjectProperties[j]}`;
          } else {
            addNewGameObjectFunc += `, ${newGameObjectPropertiesTypes[j]} ${newGameObjectProperties[j]}`;
          }
        }
        addNewGameObjectFunc += ") public onlyOwner {";
        newLines.push(addNewGameObjectFunc);
        newLines.push(lastGameObjectTypeLine);
        newLines.push(lastGameObjectRarenessLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newGameObjectPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name of game item must be entered");'
          );
        if (newGameObjectPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(gameName), "Name of game must be entered");'
          );
        if (newGameObjectPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(gameItems[i].name, name), "There is already a game item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        uint256 tokenId = _tokenIdCounter.current();");
        newLines.push("        _tokenIdCounter.increment();");
        let itemCreateLine =
          "        gameItems[tokenId] = GameItem(tokenId, price, 0, ItemType(itemType), Rareness(rareness)";
        for (let j = 0; j < newGameObjectProperties.length; j++) {
          if (!newGameObjectPropertiesSelected[j]) continue;
          itemCreateLine += `, ${newGameObjectProperties[j]}`;
        }
        itemCreateLine += ");";
        newLines.push(itemCreateLine);
      } else if (i === 5) {
        let updateItemFunc = `    function updateGameItem(uint256 gameItemId, uint256 price, uint8 itemType, uint8 rareness`;
        for (let j = 0; j < newGameObjectProperties.length; j++) {
          if (!newGameObjectPropertiesSelected[j]) continue;
          if (newGameObjectPropertiesTypes[j].includes("string") || newGameObjectPropertiesTypes[j].includes("[]")) {
            updateItemFunc += `, ${newGameObjectPropertiesTypes[j]} memory ${newGameObjectProperties[j]}`;
          } else {
            updateItemFunc += `, ${newGameObjectPropertiesTypes[j]} ${newGameObjectProperties[j]}`;
          }
        }
        updateItemFunc += ") public onlyOwner {";
        newLines.push(updateItemFunc);
        newLines.push(lastGameObjectTypeLine);
        newLines.push(lastGameObjectRarenessLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newGameObjectPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name of game item must be entered");'
          );
        if (newGameObjectPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(gameName), "Name of game must be entered");'
          );
        newLines.push(
          '        require(supplies.length > 0, "There is no game item to update.");'
        );
        newLines.push(
          '        require(gameItemId <= supplies.length-1 && gameItemId >= 0, "Game item does not exist.");'
        );
        if (newGameObjectPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(gameItems[i].name, name), "There is already a game item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        gameItems[gameItemId].price = price;");
        newLines.push(
          "        gameItems[gameItemId].itemType = ItemType(itemType);"
        );
        newLines.push(
          "        gameItems[gameItemId].rareness = Rareness(rareness);"
        );
        if (newGameObjectPropertiesSelected[0])
          newLines.push("        gameItems[gameItemId].name = name;");
        if (newGameObjectPropertiesSelected[1])
          newLines.push("        gameItems[gameItemId].gameName = gameName;");
        for (let t = 2; t < newGameObjectPropertiesSelected.length; t++) {
          if (!newGameObjectPropertiesSelected[t]) continue;
          newLines.push(
            `        gameItems[gameItemId].${newGameObjectProperties[t]} = ${newGameObjectProperties[t]};`
          );
        }
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const gameObjectPropertiesView = [];
  for (let i = 0; i < gameObjectProperties.length; i++) {
    const item = gameObjectProperties[i];
    const itemType = gameObjectPropertiesTypes[i];
    gameObjectPropertiesView.push(
      <CustomCheckbox
        id={item}
        label={item + " - " + itemType}
        onChange={(event) => setGameObjectProperty(event.target.checked, i)}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"Game Objects Contract Code Editor"}
            contractCode={contractCode}
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
                defaultValue="Game Objects"
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
          <h5>Game Object Types</h5>
          <FormGroup>
            {gameObjectTypes.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setGameObjectType(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={gameObjectTypeChange}
              label="New Game Object Type"
              value={newGameObjectType}
              defaultValue=""
              onKeyDown={addNewGameObjectType}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Game Object Rarenesses</h5>
          <FormGroup>
            {gameObjectRarenesses.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setGameObjectRareness(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={gameObjectRarenessChange}
              label="New Game Object Rareness"
              value={newGameObjectRareness}
              defaultValue=""
              onKeyDown={addNewGameObjectRareness}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Game Object Properties</h5>
          <FormGroup>
            {gameObjectPropertiesView}
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
                  onChange={newGameObjectPropertyChange}
                  label="New Game Object Property"
                  value={newGameObjectProperty}
                  defaultValue=""
                  onKeyDown={addNewGameObjectProperty}
                />
              </div>
              <div>
                <TextField
                  style={{ marginTop: "15px" }}
                  onChange={newGameObjectPropertyTypeChange}
                  label="Property Type"
                  value={newGameObjectPropertyType}
                  defaultValue=""
                  onKeyDown={addNewGameObjectProperty}
                />
              </div>
            </Box>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default GameObjects;