import '../src/modules/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/modules/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from '../src/features/_main/Header';
import GnbModal from '../src/features/_main/GnbModal';
import JoinModal from '../src/features/user/JoinModal';
import Wrap from '../src/features/_main/Wrap';
import './app.css';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider>
          <Wrap>
            <Header />
            <GnbModal />
            {/* <JoinModal /> */}
            <Component {...pageProps} />
          </Wrap>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
