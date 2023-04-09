// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity >= 0.8.0;

contract ProductManagement is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    enum ProductType {FOOD, FURNITURE, JEWELRY, HOUSEHOLD ELECTRICAL APPLIANCES, RAW MATERIAL, CLOTHING, OTHER}

    struct ProductItem {
        uint256 tokenId;
        uint256 price;
        uint256 numberOfSales;
        ProductType productType;
        string name;
        string brand;
    }

    struct Order {
        uint256 tokenId;
        address orderOwner;
        uint256 amount;
        bool received;
    }

    mapping (uint256 => ProductItem) public productItems;
    mapping (address => Order) private orders;
    uint256[] public supplies;
    uint256 public lastUpdate;

    constructor() ERC1155("") {
        lastUpdate = block.timestamp;
    }

    function addNewProductItem(uint256 price, uint8 productType, uint256 amount, string memory name, string memory brand) public onlyOwner {
        require(productType <= uint8(ProductType.OTHER), "Product type is out of range");
        require(price >= 0, "Price should be greater than or equal to 0.");
        require(!isEmpty(name), "Name must be entered");
        require(!isEmpty(brand), "Brand name must be entered");
        for(uint256 i=0; i<supplies.length; i++) {
            require(!compareStrings(productItems[i].name, name), "There is already a product item with the same name.");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        productItems[tokenId] = ProductItem(tokenId, price, 0, ProductType(productType), name, brand);
        supplies.push(amount);
        _mint(owner(), tokenId, amount, "");
    }

    function getCatalog() public view returns(uint256[] memory availableProductItemList) {
        availableProductItemList = new uint256[](supplies.length);
        for(uint256 i = 0; i < supplies.length; i++) {
            availableProductItemList[i] = (supplies[i] - productItems[i].numberOfSales);
        }
        return availableProductItemList;
    }

    function getProductItemForSaleAmount(uint256 _productItemId) public view returns(uint256 forSaleAmount){
        require(_productItemId <= supplies.length - 1, "The product item couldn't be found.");
        return supplies[_productItemId] - productItems[_productItemId].numberOfSales;
    }

    function getProductItemNumberOfSales(uint256 _productItemId) public view returns(uint256 numberOfSales) {
        require(_productItemId <= supplies.length - 1, "The product item couldn't be found.");
        return productItems[_productItemId].numberOfSales;
    }

    function getProductItemById(uint256 _productItemId) private view returns(Product memory productItem) {
        require(_productItemId <= supplies.length - 1, "The product item couldn't be found.");
        return productItems[_productItemId];
    }

    function getAddressOrder() private view returns(Order memory order) {
        require(orders[msg.sender].amount > 0, "You don't have any order.");
        return orders[msg.sender];
    }

    function updateProductItem(uint256 productItemId, uint256 price, uint8 productType, string memory name, string memory brand) public onlyOwner {
        require(productType <= uint8(ProductType.OTHER), "Product type is out of range");
        require(price >= 0, "Price should be greater than or equal to 0.");
        require(!isEmpty(name), "Name must be entered");
        require(!isEmpty(brand), "Brand name must be entered");
        require(supplies.length > 0, "There is no product item to update.");
        require(productItemId <= supplies.length-1 && productItemId >= 0, "Product item does not exist.");
        for(uint256 i=0; i<supplies.length; i++) {
            require(!compareStrings(productItems[i].name, name), "There is already a product item with the same name.");
        }
        productItems[productItemId].price = price;
        productItems[productItemId].productType = ProductType(productType);
        productItems[productItemId].name = name;
        productItems[productItemId].brand = brand;
        lastUpdate = block.timestamp;
    }

    function produceProductItem(uint256 productItemId, uint256 amount) public onlyOwner {
        require(supplies.length > 0, "There is no product item to produce.");
        require(productItemId <= supplies.length-1 && productItemId >= 0, "Product item does not exist.");
        supplies[productItemId] = supplies[productItemId] + amount;
        _mint(owner(), productItemId, amount, "");
        lastUpdate = block.timestamp;
    }

    function buyProductItem(uint256 productItemId, uint256 amount) public payable {
        require(supplies.length > 0, "There is no product item to buy.");
        require(productItemId <= supplies.length-1 && productItemId >= 0, "Product item does not exist.");
        require(amount > 0, "The amount should be greater than 0.");
        require(supplies[productItemId] - productItems[productItemId].numberOfSales >= amount, "There is no enough produced product items.");
        require(msg.value >= (productItems[productItemId].price * amount), "You don't have enough balance.");
        require(orders[msg.sender].amount == 0, "You already have an order to wait for receiving, first get it.");
        _safeTransferFrom(owner(), msg.sender, productItemId, amount, "");
        productItems[productItemId].numberOfSales += amount;
        orders[msg.sender] = Order(productItemId, msg.sender, amount, false);
        lastUpdate = block.timestamp;
    }

    function receiveProductItem(uint256 productItemId, uint256 amount) public {
        require(supplies.length > 0, "There is no product item to receive.");
        require(productItemId <= supplies.length-1 && productItemId >= 0, "Product item does not exist.");
        require(amount > 0, "The amount should be greater than 0.");
        require(balanceOf(msg.sender, productItemId) >= amount, "You didn't have a product item with the amount you gave.");
        require(orders[msg.sender].amount > 0, "You don't have any order to receive.");
        orders[msg.sender].received = true;
        _burn(msg.sender, productItemId, amount);
        lastUpdate = block.timestamp;
    }

    function isEmpty(string memory str) private pure returns (bool) {
        return (bytes(str).length == 0);
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is 0.");
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw couldn't be completed.");
    }
}
