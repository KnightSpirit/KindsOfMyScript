export default {
  getTop20RepByLang: function(lang: string) {
    return (dispatch: any) => {
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_RESULT',
          result: []
        })
      }, 2000);
    }
  }
}
