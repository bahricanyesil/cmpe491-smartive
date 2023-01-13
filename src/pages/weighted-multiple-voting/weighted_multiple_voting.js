import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import WeightedMultipleVotingContract from '../../contracts/Weighted_Multiple_Voting.sol';

const WeightedMultipleVoting = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(WeightedMultipleVotingContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView contractName={"Weighted Multiple Voting Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default WeightedMultipleVoting;