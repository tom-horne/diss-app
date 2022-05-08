import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' rel='stylesheet' />
      </Head>
      <Layout>
          <Component {...pageProps} />        
      </Layout>
    </Provider>
  )
  

}

export default MyApp