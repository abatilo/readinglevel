import React from 'react';
import gunningFog from 'gunning-fog';

type GunningFogProps = {
  sentence: number;
  word: number;
  complexPolysillabicWord: number;
}

const GunningFog = (props: GunningFogProps) => {
  const gunningFogScore: number = Math.floor(gunningFog({...props}));
  return (
    <tr>
      <td>Gunning Fog:</td>
      <td>{gunningFogScore}</td>
    </tr>
  );
}

export default GunningFog;
