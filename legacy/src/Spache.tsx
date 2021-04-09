import React from 'react';
import spacheFormula from 'spache-formula';
import infoSvg from './info.svg';

type SpacheProps = {
  word: number;
  sentence: number;
  unfamiliarWord: number;
}

const explanation: string = `The Spache readability formula calculates readability by comparing average sentence length to a list of words considered familiar to children up to the 4th grade. The Spache readability formula is most accurate for text intended for children below 4th grade.`;

const Spache = (props: SpacheProps) => {
  const spacheFormulaGrade: number = Math.floor(spacheFormula({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Spache Formula
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{spacheFormulaGrade}</td>
    </tr>
  );
}

export default Spache;
