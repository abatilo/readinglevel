import React from 'react';
import colemanLiau from 'coleman-liau';
import infoSvg from './info.svg';

type ColemanLiauProps = {
  sentence: number;
  word: number;
  letter: number;
}

const explanation: string = `The Coleman-Liau index calculates readability by counting letters per word, and counting words per sentence. The Coleman-Liau index covers Kindergarten and beyond.`;

const ColemanLiau = (props: ColemanLiauProps) => {
  const colemanLiauScore: number = Math.floor(colemanLiau({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Coleman-Liau
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{colemanLiauScore}</td>
    </tr>
  );
}

export default ColemanLiau;
