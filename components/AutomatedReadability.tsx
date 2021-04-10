import { automatedReadability } from "automated-readability";
import styles from "../styles/styles.module.scss";
import usGrades from "../util/ageTranslation";

type Props = {
  sentence: number;
  word: number;
  character: number;
};

const explanation: string = `The automated readability index calculates readability by looking at the ratio of number of characters to number of words, and the ratio of the number of words to the number of sentences. The automated readability index covers Kindergarten and beyond.`;

const AutomatedReadability = (props: Props) => {
  return (
    <tr>
      <td className={styles.relativeContainer}>
        <p>Automated Readability</p>
        <div className={styles.toolTip}>{explanation}</div>
      </td>
      <td>{usGrades(automatedReadability(props))}</td>
    </tr>
  );
};

export default AutomatedReadability;
