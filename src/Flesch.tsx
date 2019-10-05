import React from 'react';
import flesch from 'flesch';
import usGrades from './AgeTranslation';

type FleschProps = {
  sentence: number;
  word: number;
  syllable: number;
}

const Flesch = (props: FleschProps) => {
  const fleschScore: number = flesch({...props});
  const fleschAge: number = 20 - Math.floor(fleschScore / 10);
  const fleschGrade: number = usGrades(fleschAge);
  return (
    <tr>
      <td>Flesch</td>
      <td>{fleschGrade}</td>
    </tr>
  );
}

export default Flesch;
