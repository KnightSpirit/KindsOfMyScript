import * as React from 'react';
import SearchBar from './component/search-bar';
import ResultPanel from './component/result-panel';
import { connect } from 'react-redux';
import style = require('./app.less');

class Main extends React.Component{
  render() {
    return(
      <div className={ style.app }>
        <SearchBar />
        <ResultPanel />
      </div>
    )
  }
}

export default connect()(Main);