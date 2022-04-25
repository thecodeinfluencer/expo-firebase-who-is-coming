import { database, onValue, ref, set } from '../../config/firebase';
import { setActionBusy, setActionError } from '../utilities/actionHelpers';

export const actionLoadList = list => {
  return dispatch => {
    setActionBusy(dispatch, 'DATA_BUSY', 'login', true);

    onValue(
      ref(database, `${list}`),

      snap => {
        if (snap.exists()) {
          const snapList = {
            type: list,
            state: Object.values(snap.val()),
          };
          dispatch({ type: 'DATA_FETCH', snapList });
          setActionBusy(dispatch, 'DATA_BUSY', list, false);
        } else {
          setActionError(dispatch, 'DATA_ERROR', list, {
            message: 'No data found',
          });
          setActionBusy(dispatch, 'DATA_BUSY', list, false);
        }
      }
    );
  };
};

export const actionSetList = (list, data) => {
  return dispatch => {
    setActionBusy(dispatch, 'DATA_BUSY', list, true);
    const id = Date.now();
    const dbRef = ref(database, `${list}/${id}`);
    set(dbRef, {
      ...data,
      id,
    })
      .then(() => {
        const snapObject = {
          type: list,
          state: {
            ...data,
            id,
          },
        };
        dispatch({ type: 'DATA_ADD', snapObject });
        setActionBusy(dispatch, 'DATA_BUSY', list, false);
      })
      .catch(error => {
        console.log('ERR: ', { ...error, error });
        setActionError(dispatch, 'DATA_ERROR', list, error);
        setActionBusy(dispatch, 'DATA_BUSY', list, false);
      });
  };
};

export const actionUpdateListItem = (list, data, listItemId) => {
  return (dispatch, getState) => {
    setActionBusy(dispatch, 'DATA_BUSY', 'updateList', true);

    set(ref(database, `${list}/${listItemId}`), {
      ...getState().data.list[list]?.filter(({ id }) => id == listItemId)[0],
      ...data,
    })
      .then(() => {
        setActionBusy(dispatch, 'DATA_BUSY', 'updateList', false);
      })
      .catch(error => {
        setActionError(dispatch, 'DATA_ERROR', 'updateList', error);
        setActionBusy(dispatch, 'DATA_BUSY', 'updateList', false);
      });
  };
};
