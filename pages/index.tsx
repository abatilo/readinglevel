import React, { useState } from "react";
import Head from "next/head";
import Tokenizer from "sentence-tokenizer";
import AutomatedReadability from "../components/AutomatedReadability";
import styles from "../styles/styles.module.scss";

const tok = new Tokenizer("readinglevel");

const defaultText = `ReadingLevel.app will give you a rough estimate at the required level of education necessary for someone to read and comprehend your body of text.

To use this web app, just replace this text with whatever you want to analyze.`;

const App: React.FC = () => {
  const [content, setContent] = useState(defaultText);

  tok.setEntry(content);
  const sentenceCount = tok.getSentences().length;
  const wordCount = tok
    .getSentences()
    .map((_, i) => tok.getTokens(i).length)
    .reduce((a, b) => a + b);
  const charCount = content.replace(/\W/g, "").length;

  const textProperties = {
    sentence: sentenceCount,
    word: wordCount,
    character: charCount,
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
              <AutomatedReadability {...textProperties} />
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
