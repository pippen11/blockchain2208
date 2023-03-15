import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';

// _app.tsx에서 헤더를 만들면 모든 page가 헤더를 갖고 있는다.
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
