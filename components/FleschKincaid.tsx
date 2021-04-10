import { fleschKincaid } from "flesch-kincaid";
import styles from "../styles/styles.module.scss";

type Props = {
  sentence: number;
  word: number;
  syllable: number;
};

const explanation: string = `The Flesch-Kincaid readability test calculates readability by comparing the number of words to the number of sentences and the number of syllables to the number of words. The Flesch reading ease test is most accurate for text intended for 5th graders and beyond.`;

const FleshKincaid = (props: Props) => {
  return (
    <tr>
      <td className={styles.relativeContainer}>
        <p>Flesch-Kincaid</p>
        <div className={styles.toolTip}>{explanation}</div>
      </td>
      <td>{Math.floor(fleschKincaid(props))}</td>
    </tr>
  );
};

export default FleshKincaid;
