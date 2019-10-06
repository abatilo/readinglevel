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

const defaultText = `ReadingLevel.app will give you a rough estimate at the required level of education necessary for someone to read and comprehend your body of text.

This can be used to ensure that your speech is easy to understand for your audience, or to make sure that some passage is appropriate to read to your class. There are many reasons that you might want to know what grade level you're communicating at.

To use this web app, just replace this text with whatever you want to analyze. The grade level estimates will update in real time.

ReadingLevel.app implements all of the most commonly used algorithms. By hovering over each algorithm name, you can read a brief summary about what each algorithm is measuring.`;

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
      <ReactTooltip place="right" type="dark" effect="solid" clickable={true} multiline={true} />
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
