import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, userData: [] }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };

    case actionType.USER_PROFILE:
      return { ...state, userData: action.payload.data, loading: false, errors: null }

    case actionType.FOLLOW_USER:
      return { ...state, userData: action.payload.data }

    case actionType.DELETE_USER:
      if (Array.isArray(state.userData)) {
        return {
          ...state,
          userData: state.userData.filter((user) => user._id !== action.payload),
        };
      }

    default:
      return state;
  }
};

export default authReducer;