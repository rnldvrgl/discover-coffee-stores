import '@/styles/globals.css'
import { createContext } from 'react'

// Store Context
const StoreContext = createContext();

// Store Provider
const StoreProvider = ({ children }) => {
  // Initialize State
  const initialState = {
    latLong: "",
    coffeeStores: [],
  }
  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider >
  )
}

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider >
  )
}
