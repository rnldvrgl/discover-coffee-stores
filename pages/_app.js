import '@/styles/globals.css'
import { createContext, useReducer } from 'react'

// Store Context
const StoreContext = createContext();

// Set Action Types
const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
}

// Create Reducer
const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {

      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Store Provider
const StoreProvider = ({ children }) => {
  // Initialize State
  const initialState = {
    latLong: "",
    coffeeStores: [],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
