import React from 'react';
import automatedReadability from 'automated-readability';

type AutomatedReadabilityProps = {
  sentence: number;
  word: number;
  character: number;
}

const AutomatedReadability = (props: AutomatedReadabilityProps) => {
  const automatedReadabilityScore: number = Math.floor(automatedReadability({...props}));
  return (
    <tr>
      <td>Automated Readability</td>
      <td>{automatedReadabilityScore}</td>
    </tr>
  );
}

export default AutomatedReadability;
