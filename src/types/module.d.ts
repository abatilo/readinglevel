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
  }
  export default function gunningFog(value: GunningFogCounts): number;
}

declare module 'automated-readability' {
  type AutomatedReadabilityCounts = {
    sentence: number;
    word: number;
    character: number;
  }
  export default function automatedReadability(value: AutomatedReadabilityCounts): number;
}

declare module 'coleman-liau' {
  type ColemanLiauCounts = {
    sentence: number;
    word: number;
    letter: number;
  }
  export default function colemanLiau(value: ColemanLiauCounts): number;
}

declare module 'dale-chall-formula' {
  type DaleChallFormulaCounts = {
    sentence: number;
    word: number;
    difficultWord?: number;
  }

  interface GradeLevelFunction {
    (value: DaleChallFormulaCounts): number[];
    gradeLevel(score: number[]): number;
  }

  declare const daleChallFormula: GradeLevelFunction;

  export default daleChallFormula;
}
