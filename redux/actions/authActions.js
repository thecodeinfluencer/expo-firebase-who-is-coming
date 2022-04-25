import {
  auth,
  child,
  createUserWithEmailAndPassword,
  database,
  get,
  ref,
  set,
  signInWithEmailAndPassword,
} from '../../config/firebase';
import { setActionBusy, setActionError } from '../utilities/actionHelpers';

export const actionLogin = (email, password) => {
  return dispatch => {
    setActionBusy(dispatch, 'AUTH_BUSY', 'login', true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        get(child(ref(database), `users/${user.uid}`))
          .then(snap => {
            if (snap.exists()) {
              const user = snap.val();
              dispatch({ type: 'USER_LOGIN', user });
              setActionBusy(dispatch, 'AUTH_BUSY', 'login', false);
            } else {
              setActionError(dispatch, 'AUTH_ERROR', 'login', {
                message: 'user-deleted/contact-admin',
              });
              setActionBusy(dispatch, 'AUTH_BUSY', 'login', false);
            }
          })
          .catch(error => {
            setActionError(dispatch, 'AUTH_ERROR', 'login', error);
            setActionBusy(dispatch, 'AUTH_BUSY', 'login', false);
          });
      })
      .catch(error => {
        setActionError(dispatch, 'AUTH_ERROR', 'login', error);
        setActionBusy(dispatch, 'AUTH_BUSY', 'login', false);
      });
  };
};

export const actionRegister = data => {
  return dispatch => {
    setActionBusy(dispatch, 'AUTH_BUSY', 'register', true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user: cUser }) => {
        set(ref(database, 'users/' + cUser.uid), {
          ...data,
          uid: cUser.uid,
          password: null,
        })
          .then(() => {
            const user = { ...data, uid: cUser.uid, password: null };
            dispatch({ type: 'USER_REGISTER', user });
            setActionBusy(dispatch, 'AUTH_BUSY', 'register', false);
          })
          .catch(error => {
            setActionError(dispatch, 'AUTH_ERROR', 'register', error);
            setActionBusy(dispatch, 'AUTH_BUSY', 'register', false);
          });
      })
      .catch(error => {
        setActionError(dispatch, 'AUTH_ERROR', 'register', error);
        setActionBusy(dispatch, 'AUTH_BUSY', 'register', false);
      });
  };
};

export const actionUpdateUser = data => {
  return (dispatch, getState) => {
    setActionBusy(dispatch, 'AUTH_BUSY', 'update', true);
    set(ref(database, 'users/' + getState().auth.user?.uid), {
      ...getState().auth.user,
      ...data,
    })
      .then(() => {
        const user = { ...getState().auth.user, ...data };
        dispatch({ type: 'USER_UPDATE', user });
        setActionBusy(dispatch, 'AUTH_BUSY', 'update', false);
      })
      .catch(error => {
        setActionError(dispatch, 'AUTH_ERROR', 'update', error);
        setActionBusy(dispatch, 'AUTH_BUSY', 'update', false);
      });
  };
};
