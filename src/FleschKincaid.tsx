import React from 'react';
import fleschKincaid from 'flesch-kincaid';

type FleschKincaidProps = {
  sentence: number;
  word: number;
  syllable: number;
}

const FleschKincaid = (props: FleschKincaidProps) => {
  const fleschKincaidScore: number = Math.floor(fleschKincaid({...props}));
  return (
    <div>
      Flesch Kincaid (Grade Level): {fleschKincaidScore}
    </div>
  );
}

export default FleschKincaid;
