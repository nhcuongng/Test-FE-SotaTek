import 'react-responsive-modal/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dropdown/style.css';
import '@styles/global.scss';

import React from 'react';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
