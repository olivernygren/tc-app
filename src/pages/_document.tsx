import {
  Head, Html, Main, NextScript
} from 'next/document';

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="overscroll-y-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
