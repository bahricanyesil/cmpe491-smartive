import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';

import cafeMenuContract from '../../contracts/Cafe_Menu.sol';

const CafeMenu = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(cafeMenuContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView contractName={"Cafe Menu Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
      </main>
      </div>
  );
};

export default CafeMenu;