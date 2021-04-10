declare module 'sbd' {
  export function sentences(text: string): string[];
}

declare module 'syllable' {
  export default function syllables(value: string): number;
}

declare module 'gunning-fog' {
  type GunningFogCounts = {
    sentence: number;
    word: number;
    complexPolysillabicWord?: number;
  };
  export default function gunningFog(value: GunningFogCounts): number;
}

declare module 'automated-readability' {
  type AutomatedReadabilityCounts = {
    sentence: number;
    word: number;
    character: number;
  };
  export default function automatedReadability(
    value: AutomatedReadabilityCounts
  ): number;
}

declare module 'coleman-liau' {
  type ColemanLiauCounts = {
    sentence: number;
    word: number;
    letter: number;
  };
  export default function colemanLiau(value: ColemanLiauCounts): number;
}

declare module 'dale-chall-formula' {
  type DaleChallFormulaCounts = {
    sentence: number;
    word: number;
    difficultWord?: number;
  };

  interface GradeLevelFunction {
    (value: DaleChallFormulaCounts): number;
    gradeLevel(score: number): number[];
  }

  declare const daleChallFormula: GradeLevelFunction;

  export default daleChallFormula;
}

declare module 'flesch' {
  type FleschCounts = {
    sentence: number;
    word: number;
    syllable: number;
  };
  export default function flesch(value: FleschCounts): number;
}

declare module 'flesch-kincaid' {
  type FleschKincaidCounts = {
    sentence: number;
    word: number;
    syllable: number;
  };
  export default function fleschKincaid(value: FleschKincaidCounts): number;
}

declare module 'smog-formula' {
  type SmogFormulaCounts = {
    sentence: number;
    polysillabicWord: number;
  };
  export default function smogFormula(value: SmogFormulaCounts): number;
}

declare module 'spache-formula' {
  type SpacheFormulaCounts = {
    word: number;
    sentence: number;
    unfamiliarWord: number;
  };
  export default function spacheFormula(value: SpacheFormulaCounts): number;
}
