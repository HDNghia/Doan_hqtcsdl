import React from "react"
import ReactDOM from "react-dom"
import App from "./views/App"
import reportWebVitals from "./reportWebVitals"

import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./store/reducers/rootReducer"

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme.ts"
import axios from "axios"

axios.defaults.baseURL = "http://26.27.124.196:8080"
axios.defaults.headers.post["Content-Type"] = "application/json"
const reduxStore = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
   <React.StrictMode>
      <Provider store={reduxStore}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
         </ThemeProvider>
         ,
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
