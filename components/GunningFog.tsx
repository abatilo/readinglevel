import { gunningFog } from "gunning-fog";
import styles from "../styles/styles.module.scss";

type Props = {
  sentence: number;
  word: number;
  complexPolysillabicWord: number;
};

const explanation: string = `The Gunning fog index calculates readability by counting the number of words relative to the number of sentences, and the number of words with 3 or more syllables to the total number of words. The Gunning fog index is most accurate for text intended for 6th graders and beyond.`;

const GunningFog = (props: Props) => {
  return (
    <tr>
      <td className={styles.relativeContainer}>
        <p>gunning-Fog</p>
        <div className={styles.toolTip}>{explanation}</div>
      </td>
      <td>{Math.floor(gunningFog(props))}</td>
    </tr>
  );
};

export default GunningFog;
