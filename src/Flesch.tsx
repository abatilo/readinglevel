import React from 'react';
import flesch from 'flesch';
import usGrades from './AgeTranslation';
import infoSvg from './info.svg';

type FleschProps = {
  sentence: number;
  word: number;
  syllable: number;
}

const explanation: string = `The Flesch reading ease test calculates readability by comparing the number of words to the number of sentences and the number of syllables to the number of words. The Flesch reading ease test is most accurate for text intended for 5th graders and beyond.`;

const Flesch = (props: FleschProps) => {
  const fleschScore: number = flesch({...props});
  const fleschAge: number = 20 - Math.floor(fleschScore / 10);
  const fleschGrade: number = usGrades(fleschAge);
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Flesch
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{fleschGrade}</td>
    </tr>
  );
}

export default Flesch;
