import styles from "./Dado.module.css";

export default function Dado({ valor }) {
  if (!valor) {
    return (
      <div className={`${styles.dado} ${styles.vazio}`}>
        <span>?</span>
      </div>
    );
  }

  return (
    <div className={styles.dado}>
      <img
        src={`/public/dice/${valor}.png`.replace(".png", ".svg")}
        alt={`Dado com valor ${valor}`}
        width={70}
        height={70}
      />
    </div>
  );
}
