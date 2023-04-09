// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract timeSlotSystem  is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _timeSlotIdCounter;

    address Owner;
    struct timeSlot {
        uint256 timeSlotId;
        uint256 price;
        uint256 startTime;
        uint256 endTime;
    }

    struct Event {
        string eventName;
        uint256 eventStartTime;
        uint256 interval;
        uint256 eventEndTime;
    }

    Event public EventDetails;
    mapping (uint256 => timeSlot) public timeSlots;

    constructor ( ) ERC721("","")
    {
        EventDetails.eventName = "";
        EventDetails.eventStartTime = block.timestamp;
        EventDetails.eventEndTime = 0;
        EventDetails.interval = 0;
        Owner = msg.sender;

    }

    function addTimeSlot(uint256 price) public onlyOwner {
        uint256 slotEndTime =  EventDetails.eventStartTime +  ( (_timeSlotIdCounter.current() + 1) * EventDetails.interval);
        require(slotEndTime < EventDetails.eventEndTime, "You can not add a time slot after event end time.");
         timeSlots[_timeSlotIdCounter.current()].timeSlotId = _timeSlotIdCounter.current();
         timeSlots[_timeSlotIdCounter.current()].price = price;
         timeSlots[_timeSlotIdCounter.current()].startTime = EventDetails.eventStartTime + ( _timeSlotIdCounter.current() * EventDetails.interval);
         timeSlots[_timeSlotIdCounter.current()].endTime =  timeSlots[_timeSlotIdCounter.current()].startTime + EventDetails.interval;

        _timeSlotIdCounter.increment();
        _tokenIdCounter.increment();

    }

    function ownTimeSlot(uint256 _timeSlotId) public payable {
        uint256 slotStartTime =  EventDetails.eventStartTime +  ( (_timeSlotId  ) * EventDetails.interval);
        require(block.timestamp < slotStartTime, "Time slot is past. You can own another time slot.");
         require(!checkEventPassed(), "Event has already occurred.");
         require(msg.value >= timeSlots[_timeSlotId].price, "You should send price of time slot.");
         require(_timeSlotId <= _tokenIdCounter.current(),"You can not set invalid time slot number");
         _safeMint(msg.sender, _timeSlotId);
        _timeSlotIdCounter.increment();
        _tokenIdCounter.increment();
        
    }


   function checkEventPassed() private returns (bool) {
        if(block.timestamp >= EventDetails.eventStartTime) {
            _pause();
            return true;
        }
        return false;
    }



    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is 0.");
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw couldn't be completed.");
    }

    function isEmpty(string memory str) private pure returns (bool) {
        return (bytes(str).length == 0);
    }
}