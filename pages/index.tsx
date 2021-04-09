import React, { useState } from "react";

const defaultText = `ReadingLevel.app will give you a rough estimate at the required level of education necessary for someone to read and comprehend your body of text.

This can be used to ensure that your speech is easy to understand for your audience, or to make sure that some passage is appropriate to read to your class. There are many reasons that you might want to know what grade level you're communicating at.

To use this web app, just replace this text with whatever you want to analyze. The grade level estimates will update in real time.

ReadingLevel.app implements all of the most commonly used algorithms. By hovering over each algorithm name, you can read a brief summary about what each algorithm is measuring.`;

const App: React.FC = () => {
  const [words, setWords] = useState(defaultText);

  return <div>Hello</div>;
};

export default App;
