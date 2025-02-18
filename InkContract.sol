pragma solidity ^0.8.0;

contract InkContract {
    address public owner;
    
    // Event pre výbery
    event Withdrawal(address indexed user, uint amount);

    constructor() public {
        owner = msg.sender;  // Oprava: použitie = namiesto ==
    }

    // Fallback funkcia
    fallback() external payable { 
        // Sem môžeš pridať nejakú logiku, ak je potrebná
    }

    // Receive funkcia pre Ether transfery
    receive() external payable {}

    // Funkcia na výber Ink
    function withdrawInk(uint amount) public {
        // Oprava: kontrola návratnej hodnoty send
        (bool success,) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");

        // Oprava: logovanie výberu
        emit Withdrawal(msg.sender, amount);
    }

    // Funkcia na porovnanie Ink ID
    function compareInkIds(string memory string1, string memory string2) public pure returns (bool) {
        // Oprava: použitie keccak256 na porovnávanie stringov
        return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
    }

    // Funkcia na štvorenie čísla (s opravením: použitie * namiesto ^)
    function squareNumber(uint num) public pure returns (uint) {
        return num * num;  // Oprava: použitie * namiesto ^
    }

    // Funkcia na pripojenie dvoch stringov
    function concatenateStrings(string memory string1, string memory string2) public pure returns (string memory) {
        // Oprava: použitie abi.encodePacked na spojenie stringov
        return string(abi.encodePacked(string1, string2));
    }

    // Funkcia na porovnanie vlastníka
    function onlyOwner() public view {
        // Oprava: pridanie chybovej správy pre require
        require(msg.sender == owner, "Only the owner can call this function");
    }
}
