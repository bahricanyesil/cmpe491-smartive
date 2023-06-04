import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import TravelTicketContract from '../../contracts/Travel_Ticket.sol';

const TravelTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [completeContractCode, setCompleteContractCode] = useState("");

  useEffect(() => {
    fetch(TravelTicketContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"TravelTicket"} contractCode={contractCode}
            completeContract={completeContractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default TravelTicket;