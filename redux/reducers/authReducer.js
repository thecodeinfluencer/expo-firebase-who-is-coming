const initialState = {
  user: null,
  error: null,
  busy: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_BUSY':
      return {
        ...state,
        busy: { ...state.busy, [action.busy.type]: action.busy.state },
      };
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case 'USER_REGISTER':
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case 'USER_UPDATE':
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        error: null,
        user: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.error.type]:
            action.error.state
        },
      };
    default:
      return { ...state };
  }
}
