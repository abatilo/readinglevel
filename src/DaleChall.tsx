import React from 'react';
import daleChallFormula from 'dale-chall-formula';

type DaleChallProps = {
  sentence: number;
  word: number;
  difficultWord: number;
}

const DaleChall = (props: DaleChallProps) => {
  const daleChallFormulaScore: number = daleChallFormula({...props});
  const daleChallFormulaGrade: number = daleChallFormulaScore < 10 ? daleChallFormula.gradeLevel(daleChallFormulaScore)[0] : 16;
  return (
    <tr>
      <td>Dale Chall</td>
      <td>{daleChallFormulaGrade}</td>
    </tr>
  );
}

export default DaleChall;
