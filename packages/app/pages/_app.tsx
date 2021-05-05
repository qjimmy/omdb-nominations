import '../styles/index.scss';

import { Provider } from 'react-redux';
import { configureEpic, store } from '@shopify/core';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';

configureEpic();
function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div id='background' />
        <ColorModeScript initialColorMode='dark' />
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
