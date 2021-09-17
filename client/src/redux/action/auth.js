import { AUTH, LOGOUT} from '../actiontypes/auth';
import * as api from '../../api'


export const authAction = (result, token) => {
    return {
        type: AUTH,
        data: { result, token }
     }
}

export const logoutAction = () => {
    return { type: LOGOUT }
}

const signInAction = (data) => {
 return { type: AUTH, data }
}

const signUpAction = (data) => {
    return { type: AUTH, data }
}


export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(signInAction(data));

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch(signUpAction(data));

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};