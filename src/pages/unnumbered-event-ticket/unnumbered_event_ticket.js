import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import UnNumberedEventTicketContract from '../../contracts/UnNumbered_Ticket.sol';

const UnNumberedEventTicket = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(UnNumberedEventTicketContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView contractName={"UnNumbered Event Ticket Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default UnNumberedEventTicket;