import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './action';
import Selector from './selector';

// const SearchBar = (props: any) => {
//   const d = [1,2,3,4,];
//   return (
//     <div>
//       <input type="text"/>
//       <Selector OptData={d} />
//       <input type="button" value="搜索"/>
//     </div>
//   )
// }

class SearchBar extends React.Component<any, any>{

  changeResult(){
    this.props.dispatch(actionCreator.default.getTop20RepByLang('ads'));
  }

  render() {
    return (
      <div>
        <input type="text"/> <input onClick={() => this.changeResult() } type="button" value="搜索"/>
        <Selector OptData={[1,2,3,4,5,6]} />
      </div>
    )
  }
}

export default connect()(SearchBar);