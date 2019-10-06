import React from 'react';
import automatedReadability from 'automated-readability';
import infoSvg from './info.svg';

type AutomatedReadabilityProps = {
  sentence: number;
  word: number;
  character: number;
}

const explanation: string = `The automated readability index calculates readability by looking at the ratio of number of characters to number of words, and the ratio of the number of words to the number of sentences. The automated readability index covers Kindergarten and beyond.`;

const AutomatedReadability = (props: AutomatedReadabilityProps) => {
  const automatedReadabilityScore: number = Math.floor(automatedReadability({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Automated Readability
          <img src={infoSvg} />
        </span>
      </td>
      <td>{automatedReadabilityScore}</td>
    </tr>
  );
}

export default AutomatedReadability;
