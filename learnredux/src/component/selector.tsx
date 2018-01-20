import * as React from 'react';
import { connect } from 'react-redux';
import styles = require('./selector.less');

interface SelectorProps {
  OptData: any,
  dispatch: (action: any) => void
  langs: any,
  metals: any,
  showPanel: boolean
}


// const Selector: React.SFC<SelectorProps> = (props: SelectorProps) => {
//     let langs = [];
//     const optData = props.OptData.map((v: any, ind: any) => {
//       return <option value={v} key={ind}>{v}</option>;
//     });
//     return (
//       <div>
//         <div className={styles.selector}>
//           <div className={styles['lang-panel']}></div>
//           <input type="text" onChange={(e) => getLang(e.currentTarget.value) }/>
//         </div>
//         <div>
//           <ul>
//             {langs}
//           </ul>
//         </div>
//       </div>
//     );
// }

function mapStateToProps(state: any) {
  return {
    langs: state.langs,
    metals: state.metals,
    showPanel: state.showPanel
  }
}

class Selector extends React.Component<SelectorProps, any> {

  getLang(con: string) {
    this.props.dispatch({
      type: 'KEYWORD',
      keyword: con
    });
  }

  AddToPanel(v) {
    this.props.dispatch({
      type: 'ADD_METAL',
      metalValue: v
    })
  }

  DeleteMetal(v) {
    this.props.dispatch({
      type: 'DELETE_METAL',
      metalValue: v 
    })
  }

  render() {
    let langsData = [], metals = [];
    const optData = this.props.OptData.map((v: any, ind: any) => {
      return <option value={v} key={ind}>{v}</option>;
    });
    if (this.props.langs && this.props.showPanel){
      langsData = this.props.langs.map((v, ind) => {
        return <li key={ind} onClick={() => this.AddToPanel(v)}>{v}</li>;
      })
    }
    if (this.props.metals){
      metals = this.props.metals.map((v: any, ind: any) => {
        return (
          <div key={ind} className={styles.metal}>
            {v}
            <span className={ styles.close } onClick={() => this.DeleteMetal(v)}>X</span>
          </div>
        )
      })
    }
    return (
      <div>
        <div className={styles.selector}>
          <div className={styles['lang-panel']}>
            {metals}
          </div>
          <input type="text" onChange={(e) => this.getLang(e.currentTarget.value) }/>
        </div>
        <div className={styles['lang-selector']}>
          <ul>
            {langsData}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Selector);