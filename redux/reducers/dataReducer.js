const initialState = {
  list: null,
  error: null,
  busy: null,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case 'DATA_BUSY':
      return {
        ...state,
        busy: { ...state.busy, [action.busy.type]: action.busy.state },
      };
    case 'DATA_FETCH':
      return {
        ...state,
        list: { ...state.list, [action.snapList.type]: action.snapList.state },
        error: null,
      };
    case 'DATA_ADD':
      return {
        ...state,
        list: {
          ...state.list,
          // [action.snapObject.type]: [
          //   ...state.list[action.snapObject.type],
          //   action.snapObject.state,
          // ],
        },
        error: null,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        error: { ...state.error, [action.error.type]: action.error.state },
      };
    default:
      return { ...state };
  }
}
