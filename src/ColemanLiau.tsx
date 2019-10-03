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
    <div>
      Coleman Liau (Grade Level): {colemanLiauScore}
    </div>
  );
}

export default ColemanLiau;
