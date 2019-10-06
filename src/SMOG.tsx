import React from 'react';
import smogFormula from 'smog-formula';
import infoSvg from './info.svg';

type SMOGProps = {
  sentence: number;
  polysillabicWord: number;
}

const explanation: string = `The SMOG grade calculates readability by comparing the number of sentences to the number of words with 3 or more syllables. The SMOG grade works best on text with at least 30 sentences and covers all grade levels.`;

const SMOG = (props: SMOGProps) => {
  const smogFormulaGrade: number = Math.floor(smogFormula({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          SMOG
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{smogFormulaGrade}</td>
    </tr>
  );
}

export default SMOG;
