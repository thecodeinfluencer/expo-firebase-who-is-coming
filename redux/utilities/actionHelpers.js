export const setActionBusy = (dispatch, VAR, type, state) => {
  const busy = {
    type,
    state,
  };
  dispatch({ type: VAR, busy });
};

export const setActionError = (dispatch, VAR, type, err) => {
  const error = {
    type,
    state: err?.code || err?.message,
  };
  dispatch({ type: VAR, error });
};
