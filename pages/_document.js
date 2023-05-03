import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link ref="preload" href="/fonts/Poppins-Regular.ttf" as="font" crossOrigin='anonymous'></link>
      <link ref="preload" href="/fonts/Poppins-SemiBold.ttf" as="font" crossOrigin='anonymous'></link>
      <link ref="preload" href="/fonts/Poppins-Bold.ttf" as="font" crossOrigin='anonymous'></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
