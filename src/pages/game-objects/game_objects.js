import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import GameObjectsContract from '../../contracts/game_objects.sol';

const GameObjects = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(GameObjectsContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"Game Objects Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default GameObjects;