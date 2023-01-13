import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import NumberedEventTicketContract from '../../contracts/Numbered_Event_Ticket.sol';

const NumberedEventTicket = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(NumberedEventTicketContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView contractName={"Numbered Event Ticket Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default NumberedEventTicket;