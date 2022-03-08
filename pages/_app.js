import NProgress from "nprogress";
import Head from "next/head"
import Router from "next/router"
import '../styles/globals.css'
import Layout from '../components/Layout'


Router.onRouteChangeStart = url => {
  console.log(url);
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
