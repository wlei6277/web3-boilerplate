import { FC } from 'react';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Header';

interface LayoutProps {
  children: FC
}

function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {children}
    </Container>
  );
}

export default Layout;
