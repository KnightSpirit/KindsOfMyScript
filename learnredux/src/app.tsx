import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import Main from './Main';


class GithubStarSearch extends React.Component{
  render() {
    const store = applyMiddleware(thunk)(createStore)(reducer);
    return (
      <Provider store={ store }>
        <Main />
      </Provider> 
    )
  }
}

ReactDOM.render(
  <GithubStarSearch />,
  document.getElementById("app")
);