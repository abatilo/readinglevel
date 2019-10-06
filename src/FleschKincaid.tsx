import React from 'react';
import fleschKincaid from 'flesch-kincaid';
import infoSvg from './info.svg';

type FleschKincaidProps = {
  sentence: number;
  word: number;
  syllable: number;
}

const explanation: string = `The Flesch-Kincaid readability test calculates readability by comparing the number of words to the number of sentences and the number of syllables to the number of words. The Flesch reading ease test is most accurate for text intended for 5th graders and beyond.`;

const FleschKincaid = (props: FleschKincaidProps) => {
  const fleschKincaidScore: number = Math.floor(fleschKincaid({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Flesch-Kincaid
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{fleschKincaidScore}</td>
    </tr>
  );
}

export default FleschKincaid;
