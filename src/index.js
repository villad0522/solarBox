import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  diff: true,
  collapsed: true,
});
const store = createStore(
  reducer,
  compose(applyMiddleware(
    sagaMiddleware,
    //logger,
  )));
sagaMiddleware.run(rootSaga)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
// ↑ アプリのパフォーマンスを測定したいときは、
// ↑ 「reportWebVitals()」の括弧の中に表示用関数を書いてください。
// ↑ たとえば「reportWebVitals(console.log)」と記述すると、
// ↑ ログに測定結果を表示できます。
// ↑ 詳しくは https://bit.ly/CRA-vitals を参照してください。