import {AUTH, LOGOUT} from '../actiontypes/auth';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify(action?.data));
    //   localStorage.setItem('profile2', JSON.stringify({ ...action?.data }));
     return { ...state, authData: action?.data };
    //   return { ...state, authData: action.data, loading: false, errors: null };

    case LOGOUT:
      localStorage.removeItem("profile")
      return { ...state, authData: null};

    default:
      return state;
  }
};

export default authReducer;