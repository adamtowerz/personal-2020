import SingleColumn from "../components/layout/SingleColumn";
import Link from "next/link";
import styles from "./404.module.scss";

const Page404 = () => {
  return (
    <SingleColumn header={false} footer={false}>
      <div className={styles.container}>
        <h1>404: Page not found</h1>
        <Link href="/">
          <a className={styles.homeLink}>Let's go back home</a>
        </Link>
      </div>
    </SingleColumn>
  );
};

export default Page404;
