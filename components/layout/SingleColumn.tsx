import Link from "next/link";
import Head from "next/head";
import { ReactNode } from "react";
import Socials from "../Socials";

import styles from "./SingleColumn.module.scss";

type Props = {
  header?: boolean;
  headerNode?: ReactNode;
  footer?: boolean;
  title?: string;
};

const DEFAULT_HEADER = (
  <header className={styles.titlebox}>
    <h1>
      Heya, I'm <b>Adam</b>
    </h1>
    <Socials />
  </header>
);

const DEFAULT_PAGE_TITLE = "Adam Towers";

const SingleColumn: React.FC<Props> = ({
  header,
  footer,
  children,
  headerNode,
  title = DEFAULT_PAGE_TITLE,
}) => {
  let headerForRender = null;
  if (headerNode) {
    headerForRender = headerNode;
  } else if (header) {
    headerForRender = DEFAULT_HEADER;
  }

  return (
    <div className={styles.singleCol}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {headerForRender}
      <main className={styles.content}>{children}</main>
      {footer && (
        <footer>
          <hr />
          <Link href="/">Adam Towers</Link>
          <Socials />
        </footer>
      )}
    </div>
  );
};

export default SingleColumn;
