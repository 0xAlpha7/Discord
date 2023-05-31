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
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
        
    }
    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }
}