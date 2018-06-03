pragma solidity ^0.4.16;

contract Parties {
    bool response;
    uint escrowed_amount;

    enum Stages {
        New,
        Waiting,
        Progressing,
        Completed,
        Canceled
    }

    struct Party {
        address user;
        uint amount;
        bool has_accepted;
    }

    uint accepted_no;

    Stages public stage = Stages.New;

    Party [] parties;

    mapping(address => uint) party_from_address;


    modifier onlyStage(Stages desired_stage) {
          assert(stage == desired_stage);
        _;
       
    }



    function inviteParties  (address [] _parties, uint [] _amounts)public
    onlyStage(Stages.New)
    {
        stage = Stages.Waiting;
        escrowed_amount = sum(_amounts);
        for (uint i = 0; i < _parties.length; i++) {
            parties.push(Party(_parties[i], _amounts[i], false));
            party_from_address[_parties[i]] = i;
        }
    }
     
     function transferTo(address dst, uint256 wad) public {
        
       dst.transfer(wad);
      
    }
    
    function processInvite(address _party, bool response) onlyStage(Stages.Waiting)public returns (uint) 
    {
        uint party_index = party_from_address[_party];
        assert(party_index < parties.length);
        assert(msg.sender == parties[party_index].user);
        assert(!parties[party_index].has_accepted);

        if(response)
        {
            parties[party_index].has_accepted = true;
            accepted_no += 1;

            // All accepted.
            if(accepted_no == parties.length)
            {
                stage = Stages.Progressing;
            }
        }
        else
        {
            stage = Stages.Canceled;
        }
    }

    function approve()  onlyStage(Stages.Progressing) public {
        stage = Stages.Completed;
        for (uint i = 0; i < parties.length; i++) {
            transferTo(parties[i].user, parties[i].amount);
        }
         escrowed_amount = 0;
    }

    function getParticipants() public constant returns (address [], uint [])  {
        address [] memory users = new address[](parties.length);
        uint [] memory amounts = new uint[](parties.length);
        for (uint i = 0; i < parties.length; i++) {
            users[i] = parties[i].user;
            amounts[i] = parties[i].amount;
        }
        return (users, amounts);
    }

    function sum(uint[] memory self) internal constant returns (uint r) {
        r = self[0];
        for (uint i = 1; i < self.length; i++) {
            r += self[i];
        }
    }

}
