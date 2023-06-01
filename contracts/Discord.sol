// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Discord is ERC721 {
    uint256 public totalSupply;
    uint256 public totalChannels;
    address public owner;

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;       
    }
    mapping (uint256 => Channel) public channels;
    mapping (uint256 => mapping (address => bool)) public hasJoined; //channelId => userAddress => true/false

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
   
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }
    //cost is the fee to join the channel
    function createChanel(string memory _name, uint256 _cost) public onlyOwner {
        totalChannels += 1;
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }
    function mint(uint256 _id) public payable {
        require(_id != 0, "Id will not be 0");
        require(_id <= totalChannels, "id should be less than total channels");
        require(hasJoined[_id][msg.sender] == false, "Already joined");
        require(msg.value >= channels[_id].cost, "invalid cost");
        hasJoined[_id][msg.sender] = true; 
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
        
    }
    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }
}