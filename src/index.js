import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Error from './components/Error';
import App from './containers/App';
import reducers from './reducers/index';
import './main.sass';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

render(
  <AppContainer>
    <Provider store={store}>
      <React.Fragment>
        <App />
        <Error />
      </React.Fragment>
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <React.Fragment>
            <App />
            <Error />
          </React.Fragment>
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
