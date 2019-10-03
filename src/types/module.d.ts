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
