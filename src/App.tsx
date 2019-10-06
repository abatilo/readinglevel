import React, { useState } from 'react';
import winkTokenizer from 'wink-tokenizer';
import tokenizer from 'sbd';
import syllables from 'syllable';
import spache from 'spache';
import daleChall from 'dale-chall';
import GunningFog from './GunningFog';
import AutomatedReadability from './AutomatedReadability';
import ColemanLiau from './ColemanLiau';
import DaleChall from './DaleChall';
import Flesch from './Flesch';
import FleschKincaid from './FleschKincaid';
import SMOG from './SMOG';
import Spache from './Spache';
import ReactTooltip from 'react-tooltip';
import styles from './App.module.scss';

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
      <ReactTooltip type="dark" multiline={true} />
      <div className={styles.app}>
        <div className={styles.textAreaContainer}>
          <textarea className={styles.textArea} value={words} onChange={(event) => setWords(event.target.value)} />
        </div>
        <div className={styles.scoreContainer}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Algorithm</th>
                <th>U.S. Grade Level</th>
              </tr>
              <AutomatedReadability {...params} />
              <ColemanLiau {...params} />
              <DaleChall {...params} />
              <Flesch {...params} />
              <FleschKincaid {...params} />
              <GunningFog {...params} />
              <SMOG {...params} />
              <Spache {...params} />
            </tbody>
          </table>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>
          If you have any feedback, we'd love to hear it at <a
          href="mailto:feedback@readinglevel.app">feedback@readinglevel.app</a>
        </p>
        <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></p>
      </footer>
    </div>
  );
}

export default App;
