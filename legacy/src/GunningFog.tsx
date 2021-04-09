import React from 'react';
import gunningFog from 'gunning-fog';
import infoSvg from './info.svg';

type GunningFogProps = {
  sentence: number;
  word: number;
  complexPolysillabicWord: number;
}

const explanation: string = `The Gunning fog index calculates readability by counting the number of words relative to the number of sentences, and the number of words with 3 or more syllables to the total number of words. The Gunning fog index is most accurate for text intended for 6th graders and beyond.`;

const GunningFog = (props: GunningFogProps) => {
  const gunningFogScore: number = Math.floor(gunningFog({...props}));
  return (
    <tr>
      <td>
        <span data-tip={explanation}>
          Gunning Fog
          <img src={infoSvg} alt="Info icon" />
        </span>
      </td>
      <td>{gunningFogScore}</td>
    </tr>
  );
}

export default GunningFog;
