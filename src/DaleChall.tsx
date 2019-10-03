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
    <div>
      Dale Chall (Grade Level): {daleChallFormulaGrade}
    </div>
  );
}

export default DaleChall;
