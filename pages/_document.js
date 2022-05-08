import Document, { Html, Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <meta charset="utf-8" />
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_oOgOm8W_Ct0CRT0bBwR4QaHkYm9QjZU&v=3.exp&libraries=geometry,drawing,places"></script> */}
        {/* <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_oOgOm8W_Ct0CRT0bBwR4QaHkYm9QjZU&libraries=places"
        /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}