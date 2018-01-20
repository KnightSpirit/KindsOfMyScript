interface Rstate {

}
let metals = new Set();
export default function reducer(state: Rstate = {}, action: any): Rstate {
  switch (action.type) {
    case 'CHANGE_RESULT':
      return {
        ...state,
        result: action.result
      }
    case 'KEYWORD':
      const langType = ['java', 'javascript', 'c#', 'c++'];
      return {
        ...state,
        langs: langType.filter(v => v.includes(action.keyword)),
        showPanel: true
      }
    case 'ADD_METAL':
      metals.add(action.metalValue);
      return {
        ...state,
        metals: Array.from(metals),
        showPanel: false
      } 
    case 'DELETE_METAL': 
      metals.delete(action.metalValue);
      return {
        ...state,
        metals: Array.from(metals)
      } 
  }
  return state;
}