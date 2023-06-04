import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import CustomCheckbox from "../../components/checkbox/custom_checkbox";

import SourceCodeView from "../../components/source-code-view/source_code_view";

import ProductManagementContract from '../../contracts/Product_Management.sol';

const ProductManagement = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");
  const [contractName, setContractName] = useState("ProductManagement");
  const [newProductType, setNewProductType] = useState("");
  const [newProductItemProperty, setNewProductItemProperty] = useState("");
  const [newProductItemPropertyType, setNewProductItemPropertyType] = useState("");
  const [contractURI, setContractURI] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [productTypes, setProductTypes] = useState([
    "FOOD",
    "FURNITURE", 
    "JEWELRY", 
    "HOUSEHOLD_ELECTRICAL_APPLIANCES", 
    "RAW_MATERIAL", 
    "CLOTHING", 
    "OTHER"
  ]);
  const [productTypesSelected, setProductTypesSelected] = useState([
    true,
    true, 
    true, 
    true, 
    true, 
    true, 
    true
  ]);
  const [productItemProperties, setProductItemProperties] = useState([
    "name",
    "brand",
  ]);
  const [productItemPropertiesTypes, setProductItemPropertiesTypes] = useState([
    "string",
    "string",
  ]);
  const [productItemPropertiesSelected, setProductItemPropertiesSelected] = useState([
    true,
    true,
  ]);

  useEffect(() => {
    fetch(ProductManagementContract)
      .then((r) => r.text())
      .then((text) => {
        setCompleteContractCode(text);
        const startIndex = text.indexOf("contract ProductManagement");
        text = text.substring(startIndex - 1);
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 8 - 7),
          allLines.slice(9 - 7, 12 - 7),
          allLines.slice(13 - 7, 19 - 7),
          allLines.slice(21 - 7, 35 - 7),
          allLines.slice(36 - 7, 39 - 7),
          allLines.slice(50 - 7, 82 - 7),
          allLines.slice(96 - 7),
        ]);
      });
  }, []);

  const setProductType = (checked, type) => {
    const index = productTypes.indexOf(type);
    const newProductTypesSelected = [
      ...productTypesSelected.slice(0, index),
      checked,
      ...productTypesSelected.slice(index + 1),
    ];
    setProductTypesSelected(newProductTypesSelected);
    setNewContract({newProductTypesSelected: newProductTypesSelected});
  };

  const setProductItemProperty = (checked, i) => {
    const newSelectedPropertyList = [
      ...productItemPropertiesSelected.slice(0, i),
      checked,
      ...productItemPropertiesSelected.slice(i + 1),
    ];
    setProductItemPropertiesSelected(newSelectedPropertyList);
    setNewContract({newProductItemPropertiesSelected: newSelectedPropertyList});
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

  const productTypeChange = (event) => {
    setNewProductType(event.target.value);
  };

  const newProductItemPropertyChange = (event) => {
    setNewProductItemProperty(event.target.value);
  };

  const newProductItemPropertyTypeChange = (event) => {
    setNewProductItemPropertyType(event.target.value);
  };

  const addNewProductItemProperty = (e) => {
    if (e.key != "Enter") return;
    if (productItemProperties.includes(newProductItemProperty)) {
      alert("Please enter a unique name");
      return;
    }
    const val = newProductItemPropertyType;
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
      newProductItemProperty == "string" ||
      newProductItemProperty == "string[]" ||
      newProductItemProperty == "uint256[]" ||
      newProductItemProperty == "uint256" ||
      newProductItemProperty == "bool" ||
      newProductItemProperty == "address" ||
      newProductItemProperty == "bytes" ||
      newProductItemProperty == "uint128" ||
      newProductItemProperty == "uint64" ||
      newProductItemProperty == "uint32" ||
      newProductItemProperty == "uint16" ||
      newProductItemProperty == "uint8" ||
      newProductItemProperty == "ProductType"
    ) {
      alert("Please enter a valid name");
      return;
    }
    if (newProductItemProperty.length > 0 && newProductItemPropertyType.length > 0) {
      const newProductItemPropertiesSelected = [...productItemPropertiesSelected, true];
      setProductItemPropertiesSelected(newProductItemPropertiesSelected);
      const newProductItemProperties = [
        ...productItemProperties,
        newProductItemProperty,
      ];
      setProductItemProperties(newProductItemProperties);
      const newProductItemPropertiesTypes = [
        ...productItemPropertiesTypes,
        newProductItemPropertyType,
      ];
      setProductItemPropertiesTypes(newProductItemPropertiesTypes);
      setNewProductItemProperty("");
      setNewProductItemPropertyType("");
      setNewContract({
        newProductItemProperties: newProductItemProperties,
        newProductItemPropertiesSelected: newProductItemPropertiesSelected,
        newProductItemPropertiesTypes: newProductItemPropertiesTypes
      });
    }
  };

  const addNewProductType = (e) => {
    if (e.key != "Enter") return;
    if (productTypes.includes(newProductType)) {
      alert("Please enter a unique product type");
      return;
    }
    if (newProductType.length > 0) {
      const newProductTypesSelected = [
        ...productTypesSelected, true];
      setProductTypesSelected(newProductTypesSelected);
      const newProductTypes = [
        ...productTypes, newProductType];
      setProductTypes(newProductTypes);
      setNewProductType("");
      setNewContract({newProductTypesSelected: newProductTypesSelected, newProductTypes: newProductTypes});
    }
  };

  const setNewContract = ({
    newContractName,
    targetURIParam,
    newProductTypesSelected,
    newProductTypes,
    newProductItemProperties,
    newProductItemPropertiesSelected,
    newProductItemPropertiesTypes
  }) => {
    newContractName = newContractName || contractName;
    targetURIParam = targetURIParam || contractURI;
    newProductTypesSelected = newProductTypesSelected ||productTypesSelected;
    newProductTypes = newProductTypes || productTypes;
    newProductItemProperties = newProductItemProperties || productItemProperties;
    newProductItemPropertiesSelected = newProductItemPropertiesSelected || productItemPropertiesSelected;
    newProductItemPropertiesTypes = newProductItemPropertiesTypes || productItemPropertiesTypes;

    let newLines = [];

    let productTypeLine = "    enum ProductType {";
    let lastProductType = "";
    let addComma = false;
    for (let i = 0; i < newProductTypesSelected.length; i++) {
      if (newProductTypesSelected[i]) {
        if (addComma) productTypeLine += ", ";
        lastProductType = newProductTypes[i];
        productTypeLine += lastProductType;
        addComma = true;
      }
    }
    productTypeLine += "}";
    const lastProductTypeLine = `        require(productType <= uint8(ProductType.${lastProductType}), "Product type is out of range");`;
    
    for (let i = 0; i < beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(`contract ${newContractName} is ERC1155, Ownable {`);
      } else if (i === 1) {
        newLines.push(productTypeLine);
      } else if (i === 2) {
        for (let j = 0; j < newProductItemProperties.length; j++) {
          if (!newProductItemPropertiesSelected[j]) continue;
          newLines.push(
            `        ${newProductItemPropertiesTypes[j]} ${newProductItemProperties[j]};`
          );
        }
      } else if (i === 3) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
      } else if (i === 4) {
        let addNewProductItemFunc = `    function addNewProductItem(uint256 price, uint8 productType, uint256 amount`;
        for (let j = 0; j < newProductItemProperties.length; j++) {
          if (!newProductItemPropertiesSelected[j]) continue;
          if (newProductItemPropertiesTypes[j].includes("string") || newProductItemPropertiesTypes[j].includes("[]")) {
            addNewProductItemFunc += `, ${newProductItemPropertiesTypes[j]} memory ${newProductItemProperties[j]}`;
          } else {
            addNewProductItemFunc += `, ${newProductItemPropertiesTypes[j]} ${newProductItemProperties[j]}`;
          }
        }
        addNewProductItemFunc += ") public onlyOwner {";
        newLines.push(addNewProductItemFunc);
        newLines.push(lastProductTypeLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newProductItemPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name must be entered");'
          );
        if (newProductItemPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(brand), "Brand name must be entered");'
          );
        if (newProductItemPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(productItems[i].name, name), "There is already a product item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        uint256 tokenId = _tokenIdCounter.current();");
        newLines.push("        _tokenIdCounter.increment();");
        let itemCreateLine =
          "        productItems[tokenId] = ProductItem(tokenId, price, 0, ProductType(productType)";
        for (let j = 0; j < newProductItemProperties.length; j++) {
          if (!newProductItemPropertiesSelected[j]) continue;
          itemCreateLine += `, ${newProductItemProperties[j]}`;
        }
        itemCreateLine += ");";
        newLines.push(itemCreateLine);
      } else if (i === 5) {
        let updateItemFunc = `    function updateProductItem(uint256 productItemId, uint256 price, uint8 productType`;
        for (let j = 0; j < newProductItemProperties.length; j++) {
          if (!newProductItemPropertiesSelected[j]) continue;
          if (newProductItemPropertiesTypes[j].includes("string") || newProductItemPropertiesTypes[j].includes("[]")) {
            updateItemFunc += `, ${newProductItemPropertiesTypes[j]} memory ${newProductItemProperties[j]}`;
          } else {
            updateItemFunc += `, ${newProductItemPropertiesTypes[j]} ${newProductItemProperties[j]}`;
          }
        }
        updateItemFunc += ") public onlyOwner {";
        newLines.push(updateItemFunc);
        newLines.push(lastProductTypeLine);
        newLines.push(
          '        require(price >= 0, "Price should be greater than or equal to 0.");'
        );
        if (newProductItemPropertiesSelected[0])
          newLines.push(
            '        require(!isEmpty(name), "Name must be entered");'
          );
        if (newProductItemPropertiesSelected[1])
          newLines.push(
            '        require(!isEmpty(brand), "Brand name must be entered");'
          );
        newLines.push(
          '        require(supplies.length > 0, "There is no product item to update.");'
        );
        newLines.push(
          '        require(productItemId <= supplies.length-1 && productItemId >= 0, "Product item does not exist.");'
        );
        if (newProductItemPropertiesSelected[0]) {
          newLines.push("        for(uint256 i=0; i<supplies.length; i++) {");
          newLines.push(
            '            require(!compareStrings(productItems[i].name, name), "There is already a product item with the same name.");'
          );
          newLines.push("        }");
        }
        newLines.push("        productItems[productItemId].price = price;");
        newLines.push(
          "        productItems[productItemId].productType = ProductType(productType);"
        );
        if (newProductItemPropertiesSelected[0])
          newLines.push("        productItems[productItemId].name = name;");
        if (newProductItemPropertiesSelected[1])
          newLines.push("        productItems[productItemId].brand = brand;");
        for (let t = 2; t < newProductItemPropertiesSelected.length; t++) {
          if (!newProductItemPropertiesSelected[t]) continue;
          newLines.push(
            `        productItems[productItemId].${newProductItemProperties[t]} = ${newProductItemProperties[t]};`
          );
        }
      }
    }
    setContractCode(newLines.join("\n"));
  };

  const productItemPropertiesView = [];
  for (let i = 0; i < productItemProperties.length; i++) {
    const item = productItemProperties[i];
    const itemType = productItemPropertiesTypes[i];
    productItemPropertiesView.push(
      <CustomCheckbox
        id={item}
        label={item + " - " + itemType}
        onChange={(event) => setProductItemProperty(event.target.checked, i)}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"ProductManagement"}
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
                defaultValue="ProductManagement"
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
          <h5>Product Types</h5>
          <FormGroup>
            {productTypes.map((item) => (
              <CustomCheckbox
                id={item}
                label={item}
                onChange={(event) => setProductType(event.target.checked, item)}
              />
            ))}
            <TextField
              style={{ marginTop: "15px" }}
              onChange={productTypeChange}
              label="New Product Type"
              value={newProductType}
              defaultValue=""
              onKeyDown={addNewProductType}
            />
          </FormGroup>
        </div>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Product Item Properties</h5>
          <FormGroup>
            {productItemPropertiesView}
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
                  onChange={newProductItemPropertyChange}
                  label="New Product Item Property"
                  value={newProductItemProperty}
                  defaultValue=""
                  onKeyDown={addNewProductItemProperty}
                />
              </div>
              <div>
                <TextField
                  style={{ marginTop: "15px" }}
                  onChange={newProductItemPropertyTypeChange}
                  label="Property Type"
                  value={newProductItemPropertyType}
                  defaultValue=""
                  onKeyDown={addNewProductItemProperty}
                />
              </div>
            </Box>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;