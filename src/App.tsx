import React, { useState } from 'react';
import winkTokenizer from 'wink-tokenizer';
import tokenizer from 'sbd';
import syllables from 'syllable';
import spache from 'spache';
import { asyncComponent } from 'react-async-component';
import daleChall from 'dale-chall';

const defaultText = `In computer science, radix sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit, while preserving the ordering of the prior step, until all digits have been considered. For this reason, radix sort has also been called bucket sort and digital sort.

Radix sort can be applied to data that can be sorted lexicographically, be they
integers, words, punch cards, playing cards, or the mail.`;

const AsyncGunningFog = asyncComponent({
                               resolve: () => import('./GunningFog')});
const AsyncAutomatedReadability = asyncComponent({
                               resolve: () => import('./AutomatedReadability')});
const AsyncColemanLiau = asyncComponent({
                               resolve: () => import('./ColemanLiau')});
const AsyncDaleChall = asyncComponent({
                               resolve: () => import('./DaleChall')});
const AsyncFlesch = asyncComponent({
                               resolve: () => import('./Flesch')});
const AsyncFleschKincaid = asyncComponent({
                               resolve: () => import('./FleschKincaid')});
const AsyncSMOG = asyncComponent({
                               resolve: () => import('./SMOG')});
const AsyncSpache = asyncComponent({
                               resolve: () => import('./Spache')});

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

  const params = {
    sentence: sentenceCount,
    word: wordCount,
    letter: characterCount,
    difficultWord: hardWordCount,
    syllable: syllableCount,
    polysillabicWord: multiSyllabicWordCount,
    complexPolysillabicWord: multiSyllabicWordCount,
    character: characterCount,
    unfamiliarWord: unfamiliarSpacheWordsCount
  };

  return (
    <div>
      <textarea value={words} onChange={(event) => setWords(event.target.value)} />
      <AsyncGunningFog {...params} />
      <AsyncAutomatedReadability {...params} />
      <AsyncColemanLiau {...params} />
      <AsyncDaleChall {...params} />
      <AsyncFlesch {...params} />
      <AsyncFleschKincaid {...params} />
      <AsyncSMOG {...params} />
      <AsyncSpache {...params} />
    </div>
  );
}

export default App;
