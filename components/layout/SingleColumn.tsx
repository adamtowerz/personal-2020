import Head from "next/head";
import Socials from "../Socials";

import styles from "./SingleColumn.module.scss";

const SingleColumn = ({
  header = true,
  footer = true,
  children,
}: {
  header?: boolean;
  footer?: boolean;
  children: React.ReactElement;
}) => {
  return (
    <>
      <div className={styles.singleCol}>
        <Head>
          <title>Adam Towers</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {header && (
          <header className={styles.titlebox}>
            <h1>
              Heya, I'm <b>Adam</b>
            </h1>
            <Socials />
          </header>
        )}
        <main className={styles.content}>{children}</main>
        {footer && (
          <footer>
            <hr />

            <Socials />
          </footer>
        )}
      </div>
    </>
  );
};

export default SingleColumn;
