import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.lds}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
