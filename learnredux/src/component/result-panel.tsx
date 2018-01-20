import * as React from 'react';
import { connect } from 'react-redux';

class ResultPanel extends React.Component<any, any>{
  
  render() {
    const result = this.props.result;
    let resDemo = {};
    if (result) {
     resDemo = (
        <ul>
          <li>
            <div>
              <span>ProName 1</span><span>Star</span>
            </div>
            <div>
              Introduce
            </div>
          </li>
        </ul>
      )
    } else {

    resDemo = (
      <ul>
        <li>
          <div>
            <span>ProName 1</span><span>Star</span>
          </div>
          <div>
            Introduce
          </div>
        </li>
        <li>
          <div>
            <span>ProName 1</span><span>Star</span>
          </div>
          <div>
            Introduce
          </div>
        </li>
        <li>
          <div>
            <span>ProName 2</span><span>Star</span>
          </div>
          <div>
            Introduce
          </div>
        </li>
        <li>
          <div>
            <span>ProName 3</span><span>Star</span>
          </div>
          <div>
            Introduce
          </div>
        </li>
      </ul>
    )
    }
    return (
      <section>
        {resDemo}
      </section>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    result: state.result
  }
}

export default connect(mapStateToProps)(ResultPanel);