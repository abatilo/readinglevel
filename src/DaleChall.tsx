import React from 'react';
import daleChallFormula from 'dale-chall-formula';

type DaleChallProps = {
  sentence: number;
  word: number;
  difficultWord: number;
}

const explanation: string = `The Dale-Chall readability formula calculates readability by referencing a list of approximately 3000 words that are deemed to be reliably understandable by 4th grade American students. The Dale-Chall readability formula is most accurate for text intended for 4th graders and beyond.`;

const DaleChall = (props: DaleChallProps) => {
  const daleChallFormulaScore: number = daleChallFormula({...props});
  const daleChallFormulaGrade: number = daleChallFormulaScore < 10 ? daleChallFormula.gradeLevel(daleChallFormulaScore)[0] : 16;
  return (
    <tr>
      <td><span data-tip={explanation}>Dale-Chall</span></td>
      <td>{daleChallFormulaGrade}</td>
    </tr>
  );
}

export default DaleChall;
