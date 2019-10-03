import React, { useState } from 'react';
import winkTokenizer from 'wink-tokenizer';
import tokenizer from 'sbd';
import syllables from 'syllable';
import gunningFog from 'gunning-fog';

const App: React.FC = () => {
  const [words, setWords] = useState("");

  const wordCount: number = new winkTokenizer().tokenize(words).length;
  const sentenceCount: number = tokenizer.sentences(words).length;
  const syllableCount: number = syllables(words);
  const gunningFogScore: number = gunningFog({sentence:sentenceCount, word: wordCount});

  return (
    <div>
      <textarea onChange={(event) => setWords(event.target.value)} />
      <div>
        Word count: {wordCount}
      </div>
      <div>
        Sentence count: {sentenceCount}
      </div>
      <div>
        Syllables: {syllableCount}
      </div>
      <div>
        Gunning Fog: {gunningFogScore}
      </div>
    </div>
  );
}

export default App;
