import React from 'react';
import colemanLiau from 'coleman-liau';

type ColemanLiauProps = {
  sentence: number;
  word: number;
  letter: number;
}

const ColemanLiau = (props: ColemanLiauProps) => {
  const colemanLiauScore: number = Math.floor(colemanLiau({...props}));
  return (
    <tr>
      <td>Coleman Liau</td>
      <td>{colemanLiauScore}</td>
    </tr>
  );
}

export default ColemanLiau;
