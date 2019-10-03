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
    <div>
      Automated Readability (Grade Level): {automatedReadabilityScore}
    </div>
  );
}

export default AutomatedReadability;
