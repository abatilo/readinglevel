import React, { useState } from 'react';
import winkTokenizer from 'wink-tokenizer';
import tokenizer from 'sbd';
import syllables from 'syllable';
import gunningFog from 'gunning-fog';
import automatedReadability from 'automated-readability';
import colemanLiau from 'coleman-liau';
import daleChall from 'dale-chall';
import daleChallFormula from 'dale-chall-formula';
import flesch from 'flesch';
import fleschKincaid from 'flesch-kincaid';
import smogFormula from 'smog-formula';
import spache from 'spache';
import spacheFormula from 'spache-formula';

const defaultText = `In computer science, radix sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit, while preserving the ordering of the prior step, until all digits have been considered. For this reason, radix sort has also been called bucket sort and digital sort.

Radix sort can be applied to data that can be sorted lexicographically, be they
integers, words, punch cards, playing cards, or the mail.`;

const App: React.FC = () => {
  const [words, setWords] = useState(defaultText);

  const characterCount = words.replace(/\W/g, "").length;
  const tokens = new winkTokenizer().tokenize(words).filter(t => t.tag === "word").map(t => t.value.toLowerCase());
  const wordCount: number = tokens.length;

  const hardWords: string[] = tokens.filter(t => !daleChall.includes(t));
  const hardWordCount: number = hardWords.length;

  const unfamiliarSpacheWords: string[] = tokens.filter(t => !spache.includes(t));
  const unfamiliarSpacheWordsCount: number = unfamiliarSpacheWords.length;

  const sentenceCount: number = tokenizer.sentences(words).length;
  const syllableCount: number = syllables(words);

  const multiSyllabicWordCount: number = tokens.map(t => syllables(t)).filter(n => 3 <=
                                                                           n).length;

  const gunningFogScore: number = Math.floor(gunningFog({sentence:sentenceCount, word: wordCount, complexPolysillabicWord: multiSyllabicWordCount}));
  const automatedReadabilityScore: number = Math.floor(automatedReadability({sentence:sentenceCount, word: wordCount, character: characterCount}));
  const colemanLiauScore: number = Math.floor(colemanLiau({sentence:sentenceCount, word: wordCount, letter: characterCount}));

  const daleChallFormulaScore: number = daleChallFormula({word: wordCount, sentence: sentenceCount, difficultWord: hardWordCount});
  const daleChallFormulaGrade: number = daleChallFormulaScore < 10 ? daleChallFormula.gradeLevel(daleChallFormulaScore)[0] : 16;
  console.log(daleChallFormulaScore);
  console.log(daleChallFormulaGrade);

  const fleschScore: number = flesch({word: wordCount, sentence: sentenceCount,
                                     syllable: syllableCount});
  const fleschAge: number = 20 - Math.floor(fleschScore / 10);

  const fleschKincaidScore: number = Math.floor(fleschKincaid({word: wordCount, sentence: sentenceCount,
                                     syllable: syllableCount}));

  const smogFormulaGrade: number = Math.floor(smogFormula({sentence: sentenceCount,
                                                         polysillabicWord:
                                                         multiSyllabicWordCount}));

  const spacheFormulaGrade: number = Math.floor(spacheFormula({word: wordCount, sentence: sentenceCount, unfamiliarWord:
                      unfamiliarSpacheWordsCount}));

  return (
    <div>
      <textarea value={words} onChange={(event) => setWords(event.target.value)} />
      <div>
        Gunning Fog (Grade Level): {gunningFogScore}
      </div>
      <div>
        Automated readability (Grade Level): {automatedReadabilityScore}
      </div>
      <div>
        Coleman Liau (Grade Level): {colemanLiauScore}
      </div>
      <div>
        Dale Chall (Grade Level): {daleChallFormulaGrade}
      </div>
      <div>
        Flesch (Age): {fleschAge}
      </div>
      <div>
        Flesch Kincaid (Grade Level): {fleschKincaidScore}
      </div>
      <div>
        SMOG Formula (Grade Level): {smogFormulaGrade}
      </div>
      <div>
        Spache Formula (Grade Level): {spacheFormulaGrade}
      </div>
    </div>
  );
}

export default App;
