import React from 'react';
import spacheFormula from 'spache-formula';

type SpacheProps = {
  word: number;
  sentence: number;
  unfamiliarWord: number;
}

const Spache = (props: SpacheProps) => {
  const spacheFormulaGrade: number = Math.floor(spacheFormula({...props}));
  return (
    <tr>
      <td>Spache Formula</td>
      <td>{spacheFormulaGrade}</td>
    </tr>
  );
}

export default Spache;
