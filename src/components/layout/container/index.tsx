import Head from 'next/head';
import React from 'react';

import styles from './container.module.scss';

type TProp = {

};

export const Container: React.FC<TProp> = ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>Todo App</title>
      <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Todo App
      </h1>

      <p className={styles.description} />
      {children}
    </main>
  </div>
);
