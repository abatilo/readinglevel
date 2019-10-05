import React from 'react';
import smogFormula from 'smog-formula';

type SMOGProps = {
  sentence: number;
  polysillabicWord: number;
}

const SMOG = (props: SMOGProps) => {
  const smogFormulaGrade: number = Math.floor(smogFormula({...props}));
  return (
    <tr>
      <td>SMOG</td>
      <td>{smogFormulaGrade}</td>
    </tr>
  );
}

export default SMOG;
