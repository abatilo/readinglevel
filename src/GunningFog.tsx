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
    <div>
      Gunning Fog (Grade Level): {gunningFogScore}
    </div>
  );
}

export default GunningFog;
