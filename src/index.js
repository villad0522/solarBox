import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import rootSaga from './sagas/rootSaga'

import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

reportWebVitals()
// ↑ アプリのパフォーマンスを測定したいときは、
// ↑ 「reportWebVitals()」の括弧の中に表示用関数を書いてください。
// ↑ たとえば「reportWebVitals(console.log)」と記述すると、
// ↑ ログに測定結果を表示できます。
// ↑ 詳しくは https://bit.ly/CRA-vitals を参照してください。