
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './browser-solc.min.js';
import './test.js';

const CompileContract = () => {
  const location = useLocation();
  const data = location.state;
  const contractCode = data['contractCode'];

  useEffect(() => {
    window['onload'](contractCode);
    document.getElementById("source").value = contractCode;
  }, [contractCode])
  
  return (
  <div className="container">
  <div className="col-md-7">
      <textarea id="source" onClick={window.select} style={{height:"500px", width: "600px", display:"block", marginLeft:"20px"}}></textarea>
  </div>
  <div className="col-md-5">
      <select id="versions" className="form-control" ></select>
      <button id="test-button" className="btn btn-outline btn-xl" style={{marginTop: "20px"}}>compile</button>
      <p id="status" style={{float:"right", marginTop:"20px"}}></p>
      <p style={{marginTop:"20px"}}>Output: </p>
      <textarea id="compile-output" onClick={window.select} style={{width:"445px", height:"360px"}} readOnly></textarea>
  </div>
  </div>
  );
};

export default CompileContract;
