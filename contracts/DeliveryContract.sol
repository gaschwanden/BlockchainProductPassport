pragma solidity ^0.4.21;
import "./PPcoin.sol";
import "./Measurements.sol";

contract DeliveryContract {

    address owner;

    bytes32 public name;
    bytes32 public code;
    uint escrowed_amount;

    enum Stages {
        New,
        hasAttributes,
        WaitingForParties,
        InProgress,
        Complete,
        Canceled,
        reimburse
    }

    struct Party {
        address wallet;
        uint amount;
        bool has_accepted;
    }

    uint accepted_no;

    Stages public stage = Stages.New;

    Measurements [] measurements;

    Party [] parties;

    mapping(address => uint) party_from_address;

    PPcoin public ppcoin;

    modifier onlyOwner {
        assert(msg.sender == owner);
        _;
    }

    modifier onlyStage(Stages desired_stage) {
        if (stage != desired_stage) throw;
        _;
    }

    function DeliveryContract(bytes32 _name, bytes32 _code, address _ppcoinAddress) {
        owner = msg.sender;
        name = _name;
        code = _code;
        ppcoin = PPcoin(_ppcoinAddress);
    }

    function inviteParticipants(address [] _parties, uint [] _amounts)
    onlyOwner
    onlyStage(Stages.hasAttributes)
    {
        stage = Stages.WaitingForParties;
        escrowed_amount = sum(_amounts);
        for (uint i = 0; i < _parties.length; i++) {
            parties.push(Party(_parties[i], _amounts[i], false));
            party_from_address[_parties[i]] = i;
        }
        assert(ppcoin.transferFrom(owner, this, escrowed_amount));
    }

    function processInvite(address _party, bool response) onlyStage(Stages.WaitingForParties) returns (uint)
    {
        // Party doesn't exist -- overflow.
        uint party_index = party_from_address[_party];
        assert(party_index < parties.length);
        assert(msg.sender == parties[party_index].wallet);
        assert(!parties[party_index].has_accepted);

        // User has accepted.
        if(response)
        {
            parties[party_index].has_accepted = true;
            accepted_no += 1;

            // All accepted.
            if(accepted_no == parties.length)
            {
                stage = Stages.InProgress;
            }
        }
        else
        {
            stage = Stages.Canceled;
        }
    }

    function approve() onlyOwner onlyStage(Stages.InProgress)  {
        stage = Stages.Complete;
        for (uint i = 0; i < parties.length; i++) {
            assert(ppcoin.transfer(parties[i].wallet, parties[i].amount));
        }
    }

    function reimburse() onlyOwner onlyStage(Stages.InProgress) {
        stage = Stages.reimburse;
        uint amount = escrowed_amount;
        escrowed_amount = 0;
        ppcoin.transfer(owner, amount);
    }

    function getParticipants() constant returns (address [], uint []) {
        address [] memory wallets = new address[](parties.length);
        uint [] memory amounts = new uint[](parties.length);
        for (uint i = 0; i < parties.length; i++) {
            wallets[i] = parties[i].wallet;
            amounts[i] = parties[i].amount;
        }
        return (wallets, amounts);
    }

    function sum(uint[] memory self) internal constant returns (uint r) {
        r = self[0];
        for (uint i = 1; i < self.length; i++) {
            r += self[i];
        }
    }

}
