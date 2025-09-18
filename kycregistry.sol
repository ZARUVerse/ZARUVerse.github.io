// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract KYCRegistry {
    address public owner;

    enum Status { Pending, Verified, Rejected }

    struct Record {
        Status status;
        string hash; // SHA-256 or IPFS CID
        uint256 timestamp;
    }

    mapping(address => Record) public records;

    event KYCUpdated(address indexed user, Status status, string hash);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function updateKYC(address user, Status status, string calldata hash) external onlyOwner {
        records[user] = Record({
            status: status,
            hash: hash,
            timestamp: block.timestamp
        });
        emit KYCUpdated(user, status, hash);
    }

    function getKYC(address user) external view returns (Status, string memory, uint256) {
        Record memory r = records[user];
        return (r.status, r.hash, r.timestamp);
    }

    function isVerified(address user) external view returns (bool) {
        return records[user].status == Status.Verified;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
