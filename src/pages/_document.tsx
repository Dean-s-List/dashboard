import Document, { Head, Html, Main, NextScript } from "next/document";

import type { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html
        className="scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
        data-theme="deanslist"
      >
        <Head>
          <link rel="icon" href="/images/logo.png" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
