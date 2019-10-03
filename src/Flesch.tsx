import React from 'react';
import flesch from 'flesch';

type FleschProps = {
  sentence: number;
  word: number;
  syllable: number;
}

const Flesch = (props: FleschProps) => {
  const fleschScore: number = flesch({...props});
  const fleschAge: number = 20 - Math.floor(fleschScore / 10);
  return (
    <div>
      Flesch (Age): {fleschAge}
    </div>
  );
}

export default Flesch;
