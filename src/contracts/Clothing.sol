// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

abstract contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

interface IERC1155 is IERC165 {
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);

    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );

    event ApprovalForAll(address indexed account, address indexed operator, bool approved);

    event URI(string value, uint256 indexed id);

    function balanceOf(address account, uint256 id) external view returns (uint256);

    function balanceOfBatch(
        address[] calldata accounts,
        uint256[] calldata ids
    ) external view returns (uint256[] memory);

    function setApprovalForAll(address operator, bool approved) external;

    function isApprovedForAll(address account, address operator) external view returns (bool);

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;
}

interface IERC1155MetadataURI is IERC1155 {
    function uri(uint256 id) external view returns (string memory);
}

interface IERC1155Receiver is IERC165 {
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4);
}

library Counters {
    struct Counter {
        uint256 _value;
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0);
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender());
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0));
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

library Address {
    function isContract(address account) internal view returns (bool) {
        return account.code.length > 0;
    }

    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount);

        (bool success, ) = recipient.call{value: amount}("");
        require(success);
    }

    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, "Address: low-level call failed");
    }

    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value);
        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target));
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(bytes memory returndata, string memory errorMessage) private pure {
        if (returndata.length > 0) {
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}

contract ERC1155 is Context, ERC165, IERC1155, IERC1155MetadataURI {
    using Address for address;

    mapping(uint256 => mapping(address => uint256)) private _balances;

    mapping(address => mapping(address => bool)) private _operatorApprovals;

    string private _uri;

    constructor(string memory uri_) {
        _setURI(uri_);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function uri(uint256) public view virtual override returns (string memory) {
        return _uri;
    }

    function balanceOf(address account, uint256 id) public view virtual override returns (uint256) {
        require(account != address(0));
        return _balances[id][account];
    }

    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) public view virtual override returns (uint256[] memory) {
        require(accounts.length == ids.length);

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(from == _msgSender() || isApprovedForAll(from, _msgSender()));
        _safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(from == _msgSender() || isApprovedForAll(from, _msgSender()));
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0));

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount);
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(ids.length == amounts.length);
        require(to != address(0));

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount);
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
    }

    function _setURI(string memory newuri) internal virtual {
        _uri = newuri;
    }

    function _mint(address to, uint256 id, uint256 amount, bytes memory data) internal virtual {
        require(to != address(0));

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, address(0), to, id, amount, data);
    }

    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(to != address(0));
        require(ids.length == amounts.length);

        address operator = _msgSender();

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] += amounts[i];
        }

        emit TransferBatch(operator, address(0), to, ids, amounts);

        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);

        _doSafeBatchTransferAcceptanceCheck(operator, address(0), to, ids, amounts, data);
    }

    function _burn(address from, uint256 id, uint256 amount) internal virtual {
        require(from != address(0));

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, address(0), ids, amounts, "");

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount);
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }

        emit TransferSingle(operator, from, address(0), id, amount);

        _afterTokenTransfer(operator, from, address(0), ids, amounts, "");
    }

    function _burnBatch(address from, uint256[] memory ids, uint256[] memory amounts) internal virtual {
        require(from != address(0));
        require(ids.length == amounts.length);

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, address(0), ids, amounts, "");

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount);
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
        }

        emit TransferBatch(operator, from, address(0), ids, amounts);

        _afterTokenTransfer(operator, from, address(0), ids, amounts, "");
    }

    function _setApprovalForAll(address owner, address operator, bool approved) internal virtual {
        require(owner != operator);
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (
                bytes4 response
            ) {
                if (response != IERC1155Receiver.onERC1155BatchReceived.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}

contract Clothing is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    enum ClothingType {TSHIRT, SHIRT, PANTS, HOODIES, SWEATER, SHORTS, SKIRTS, RAINCOAT, UNDERWEAR, GYMCLOTHES, TANKTOP, PAJAMA, SWIMSUIT, BATHROBE, COAT, SCARF, SUIT, OTHER}
    enum ClothingSize {XXS, XS, S, SM, M, ML, MT, L, LT, XL, XLT, XXL, XXLT, XXXL, XXXLT, XXXXL, XXXXLT, OTHER}
    enum ClothingColor {RED, GREEN, BLACK, WHITE, BLUE, YELLOW, GREY, PURPLE, PINK, ORANGE, BROWN, OTHER}
    
    struct ClothingItem {
        uint256 tokenId;
        uint256 price;
        uint256 numberOfSales;
        ClothingType clothingType;
        ClothingSize clothingSize;
        ClothingColor clothingColor;
        string name;
        string brand;
    }

    struct Order {
        uint256 tokenId;
        address orderOwner;
        uint256 amount;
        bool received;
    }

    mapping (uint256 => ClothingItem) public clothingItems;
    mapping (address => Order) private orders;
    uint256[] public supplies;
    uint256 public lastUpdate;

    constructor() ERC1155("") {
        lastUpdate = block.timestamp;
    }

    function addNewClothingItem(uint256 price, uint8 clothingType, uint8 clothingSize, uint8 clothingColor, uint256 amount, string memory name, string memory brand) public onlyOwner {
        require(clothingType <= uint8(ClothingType.OTHER), "Clothing type is out of range");
        require(clothingSize <= uint8(ClothingSize.OTHER), "Clothing size is out of range");
        require(clothingColor <= uint8(ClothingColor.OTHER), "Clothing color is out of range");
        require(price >= 0, "Price should be greater than or equal to 0.");
        require(!isEmpty(name), "Name must be entered");
        require(!isEmpty(brand), "Brand name must be entered");
        for(uint256 i=0; i<supplies.length; i++) {
            require(!compareStrings(clothingItems[i].name, name), "There is already a clothing item with the same name.");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        clothingItems[tokenId] = ClothingItem(tokenId, price, 0, ClothingType(clothingType), ClothingSize(clothingSize), ClothingColor(clothingColor), name, brand);
        supplies.push(amount);
        _mint(owner(), tokenId, amount, "");
    }

    function getCatalog() public view returns(uint256[] memory availableClothingItemList) {
        availableClothingItemList = new uint256[](supplies.length);
        for(uint256 i = 0; i < supplies.length; i++) {
            availableClothingItemList[i] = (supplies[i] - clothingItems[i].numberOfSales);
        }
        return availableClothingItemList;
    }

    function getClothingItemForSaleAmount(uint256 _clothingItemId) public view returns(uint256 forSaleAmount){
        require(_clothingItemId <= supplies.length - 1, "The clothing item couldn't be found.");
        return supplies[_clothingItemId] - clothingItems[_clothingItemId].numberOfSales;
    }

    function getClothingItemNumberOfSales(uint256 _clothingItemId) public view returns(uint256 numberOfSales) {
        require(_clothingItemId <= supplies.length - 1, "The clothing item couldn't be found.");
        return clothingItems[_clothingItemId].numberOfSales;
    }

    function getClothingItemById(uint256 _clothingItemId) private view returns(ClothingItem memory clothingItem) {
        require(_clothingItemId <= supplies.length - 1, "The clothing item couldn't be found.");
        return clothingItems[_clothingItemId];
    }

    function getAddressOrder() private view returns(Order memory order) {
        require(orders[msg.sender].amount > 0, "You don't have any order.");
        return orders[msg.sender];
    }

    function updateClothingItem(uint256 clothingItemId, uint256 price, uint8 clothingType, uint8 clothingSize, uint8 clothingColor, string memory name, string memory brand) public onlyOwner {
        require(clothingType <= uint8(ClothingType.OTHER), "Clothing type is out of range");
        require(clothingSize <= uint8(ClothingSize.OTHER), "Clothing size is out of range");
        require(clothingColor <= uint8(ClothingColor.OTHER), "Clothing color is out of range");
        require(price >= 0, "Price should be greater than or equal to 0.");
        require(!isEmpty(name), "Name must be entered");
        require(!isEmpty(brand), "Brand name must be entered");
        require(supplies.length > 0, "There is no clothing item to update.");
        require(clothingItemId <= supplies.length-1 && clothingItemId >= 0, "Clothing item does not exist.");
        for(uint256 i=0; i<supplies.length; i++) {
            require(!compareStrings(clothingItems[i].name, name), "There is already a clothing item with the same name.");
        }
        clothingItems[clothingItemId].price = price;
        clothingItems[clothingItemId].clothingType = ClothingType(clothingType);
        clothingItems[clothingItemId].clothingSize = ClothingSize(clothingSize);
        clothingItems[clothingItemId].clothingColor = ClothingColor(clothingColor);
        clothingItems[clothingItemId].name = name;
        clothingItems[clothingItemId].brand = brand;
        lastUpdate = block.timestamp;
    }

    function produceClothingItem(uint256 clothingItemId, uint256 amount) public onlyOwner {
        require(supplies.length > 0, "There is no clothing item to produce.");
        require(clothingItemId <= supplies.length-1 && clothingItemId >= 0, "Clothing item does not exist.");
        supplies[clothingItemId] = supplies[clothingItemId] + amount;
        _mint(owner(), clothingItemId, amount, "");
        lastUpdate = block.timestamp;
    }

    function buyClothingItem(uint256 clothingItemId, uint256 amount) public payable {
        require(supplies.length > 0, "There is no clothing item to buy.");
        require(clothingItemId <= supplies.length-1 && clothingItemId >= 0, "Clothing item does not exist.");
        require(amount > 0, "The amount should be greater than 0.");
        require(supplies[clothingItemId] - clothingItems[clothingItemId].numberOfSales >= amount, "There is no enough produced clothing items.");
        require(msg.value >= (clothingItems[clothingItemId].price * amount), "You don't have enough balance.");
        require(orders[msg.sender].amount == 0, "You already have an order to wait for receiving, first get it.");
        _safeTransferFrom(owner(), msg.sender, clothingItemId, amount, "");
        clothingItems[clothingItemId].numberOfSales += amount;
        orders[msg.sender] = Order(clothingItemId, msg.sender, amount, false);
        lastUpdate = block.timestamp;
    }

    function receiveClothingItem(uint256 clothingId, uint256 amount) public {
        require(supplies.length > 0, "There is no clothing item to receive.");
        require(clothingId <= supplies.length-1 && clothingId >= 0, "Clothing item does not exist.");
        require(amount > 0, "The amount should be greater than 0.");
        require(balanceOf(msg.sender, clothingId) >= amount, "You didn't have a clothing item with the amount you gave.");
        require(orders[msg.sender].amount > 0, "You don't have any order to receive.");
        orders[msg.sender].received = true;
        _burn(msg.sender, clothingId, amount);
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
