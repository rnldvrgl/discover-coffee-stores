import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
  <Component {...pageProps} />
    <footer>
        <p>© 2023 RNLD VRGL</p>
    </footer>
    </>
  )
}
