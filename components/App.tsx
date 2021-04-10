import Head from "next/head";
import React, { useState } from "react";
import Tokenizer from "sentence-tokenizer";
import { syllable } from "syllable";
import FleshKincaid from "../components/FleschKincaid";
import GunningFog from "../components/GunningFog";
import styles from "../styles/styles.module.scss";

const tok = new Tokenizer("readinglevel");

const defaultText = `ReadingLevel.app will give you a rough estimate at the required level of education necessary for someone to read and comprehend your body of text.

This can be used to ensure that your speech is easy to understand for your audience, or to make sure that some passage is appropriate to read to your class. There are many reasons that you might want to know what grade level you're communicating at.

To use this web app, just replace this text with whatever you want to analyze. The grade level estimates will update in real time.`;

const App: React.FC = () => {
  const [content, setContent] = useState(defaultText);

  tok.setEntry(content);
  const sentenceCount = tok.getSentences().length;
  const tokens = tok
    .getSentences()
    .map((_, i) => tok.getTokens(i))
    .reduce((a, b) => a.concat(b), []);
  const wordCount = tokens.length;
  const syllableCount = syllable(content);
  const polySyllableCount = tokens.map((t) => syllable(t)).filter((n) => 3 <= n)
    .length;

  const textProperties = {
    sentence: sentenceCount,
    word: wordCount,
    syllable: syllableCount,
    complexPolysillabicWord: polySyllableCount,
  };

  return (
    <div className={styles.global}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.svg" />
      </Head>
      <div className={styles.app}>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textArea}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className={styles.scoreContainer}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Algorithm</th>
                <th>U.S. Grade Level</th>
              </tr>
              <FleshKincaid {...textProperties} />
              <GunningFog {...textProperties} />
            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <p>
          If you have any feedback, we'd love to hear it at{" "}
          <a href="mailto:feedback@readinglevel.app">
            feedback@readinglevel.app
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
