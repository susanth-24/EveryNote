import * as api from '../api';
import { AUTH, USER_PROFILE, FOLLOW_USER, DELETE_USER } from '../constants/actionTypes';

export const signin = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(input);
        dispatch({ type: AUTH, data });
        history('/posts')
    } catch (error) {
        throw error;
    }
}
export const userProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.userprofile(id);

        dispatch({ type: USER_PROFILE, payload: { data } });
    } catch (error) {
        throw error
    }
}
export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        throw error;
    }
}


export const followUser = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data: { data } } = await api.followUser(id, user?.token);
        dispatch({ type: FOLLOW_USER, payload: data });
    } catch (error) {
        throw error;
    }
}

export const signup = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(input);
        dispatch({ type: AUTH, data });
        history('/posts')
    } catch (error) {
        throw error
    }
}
