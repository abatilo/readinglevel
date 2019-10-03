import React, { useState } from 'react';
import winkTokenizer from 'wink-tokenizer';
import tokenizer from 'sbd';
import syllables from 'syllable';
import gunningFog from 'gunning-fog';
import automatedReadability from 'automated-readability';
import colemanLiau from 'coleman-liau';
import daleChall from 'dale-chall';
import daleChallFormula from 'dale-chall-formula';

const App: React.FC = () => {
  const [words, setWords] = useState("");

  const characterCount = words.replace(/\W/g, "").length;
  const tokens = new winkTokenizer().tokenize(words).filter(t => t.tag === "word").map(t => t.value.toLowerCase());
  const wordCount: number = tokens.length;

  const hardWords = tokens.filter(t => !daleChall.includes(t));
  const hardWordCount: number = hardWords.length;

  const sentenceCount: number = tokenizer.sentences(words).length;
  const syllableCount: number = syllables(words);

  const gunningFogScore: number = Math.ceil(gunningFog({sentence:sentenceCount, word: wordCount}));
  const automatedReadabilityScore: number = Math.ceil(automatedReadability({sentence:sentenceCount, word: wordCount, character: characterCount}));
  const colemanLiauScore: number = Math.ceil(colemanLiau({sentence:sentenceCount, word: wordCount, letter: characterCount}));

  const daleChallFormulaScore: number[] = daleChallFormula({word: wordCount, sentence: sentenceCount, difficultWord: hardWordCount});
  const daleChallFormulaGrade: number = Math.ceil(daleChallFormula.gradeLevel(daleChallFormulaScore));

  return (
    <div>
      <textarea onChange={(event) => setWords(event.target.value)} />
      <div>
        Gunning Fog: {gunningFogScore}
      </div>
      <div>
        Automated readability: {automatedReadabilityScore}
      </div>
      <div>
        Coleman Liau: {colemanLiauScore}
      </div>
      <div>
        Dale Chall: {daleChallFormulaScore}
      </div>
    </div>
  );
}

export default App;
