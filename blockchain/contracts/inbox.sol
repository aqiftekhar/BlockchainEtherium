pragma solidity >=0.7.0;

contract Inbox{
    string public message;

    function setMessage( string memory newMessage ) public {
        message = newMessage;
    }
}