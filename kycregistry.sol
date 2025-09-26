// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title KYCRegistry — ZARUverse Protocol
/// @notice On-chain registry for verified KYC certificates issued by MAKESE Holding Ltd.
/// @dev Designed for global listing, audit verification, and compliance tracking

contract KYCRegistry {
    struct Certificate {
        string fullName;
        string email;
        string country;
        string nationality;
        string certHash;
        string signature;
        uint256 issuedOn;
    }

    mapping(address => Certificate) public certificates;
    address public owner;

    event CertificateRegistered(
        address indexed user,
        string fullName,
        string certHash,
        uint256 issuedOn
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Register a new KYC certificate
    /// @param fullName Full legal name of applicant
    /// @param email Verified email address
    /// @param country Country of residence
    /// @param nationality Nationality (e.g. British)
    /// @param certHash SHA256 hash of the certificate document
    /// @param signature Compliance officer's signature hash
    /// @param issuedOn Timestamp of issuance
    function registerCertificate(
        string memory fullName,
        string memory email,
        string memory country,
        string memory nationality,
        string memory certHash,
        string memory signature,
        uint256 issuedOn
    ) external {
        certificates[msg.sender] = Certificate(
            fullName,
            email,
            country,
            nationality,
            certHash,
            signature,
            issuedOn
        );
        emit CertificateRegistered(msg.sender, fullName, certHash, issuedOn);
    }

    /// @notice Retrieve certificate details for a given address
    /// @param user Address of the certificate holder
    function getCertificate(address user) external view returns (Certificate memory) {
        return certificates[user];
    }

    /// @notice Transfer registry ownership
    /// @param newOwner Address of new registry owner
    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
