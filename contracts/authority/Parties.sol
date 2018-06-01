pragma solidity ^0.4.16;
import "./Owned.sol";
import "./Roles.sol";


contract Parties is Owned,Roles {

    struct Party {
        address wallet;
        uint amount;
        bool has_accepted;
    }

    enum State { New, Invited, Locked, Approved, Reimbursed}

    Party[] parties;

    State public state;

    address public owner;

    address public buyer;

    uint accepted_count;


    modifier onlyState(State _state) {
        require(state == _state);
        _;
    }

    function Parties() {
        owner = msg.sender;
    }

    function inviteParticipants(address[] _parties, uint[] _amounts) onlyState(State.New) public  {
        require(_parties.length == _amounts.length);    
        buyer = msg.sender;        
        for (uint i = 0; i < _parties.length; i++) {
            parties.push(Party(_parties[i], _amounts[i], false));
        }
        state = State.Invited;
    }

    function getParticipants() constant returns (address [], uint [])  {
        address [] memory wallets = new address[](parties.length);
        uint [] memory amounts = new uint[](parties.length);
        for (uint i = 0; i < parties.length; i++) {
            wallets[i] = parties[i].wallet;
            amounts[i] = parties[i].amount;
        }
        return (wallets, amounts);
    }

    function getPartyByAddress(address _address) constant internal returns (Party) {
        for (uint i = 0; i < parties.length; i++) {
            if (parties[i].wallet == _address) {
                return parties[i];
            }
        }
        require(false);
    }


    function acceptInvite() onlyState(State.Invited) {
        Party memory party = getPartyByAddress(msg.sender);
        require(!party.has_accepted);
        party.has_accepted = true;
        accepted_count++;        
        if (accepted_count == parties.length) {
            state = State.Locked;
        }
    }

    function approve() onlyState(State.Locked) onlyOwner {
        state = State.Approved;
    }

    // function reimburse() onlyState(State.Locked) onlyOwner {
    //     token.transfer(buyer, token.balanceOf(this));
    //     state = State.Reimbursed;      
    // }

    function sum(uint[] memory self) internal constant returns (uint result) {
        result = self[0];
        for (uint i = 1; i < self.length; i++) {
            result += self[i];
        }
    }
}
