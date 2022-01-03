import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

// TODO: swap with our own

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

// fetch all the queries that in the children components
MyApp.getStaticProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getStaticProps) {
    pageProps = await Component.getStaticProps(ctx);
  }
  // allow to get any query variables at page level
  pageProps.query = ctx.query;
  return { pageProps };
};

// Give you the app but inject the apollo client inside of it
export default withData(MyApp);
