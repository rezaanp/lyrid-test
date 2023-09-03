import { LOGIN, LOGOUT } from "./constanst";

const initialState = {
  token: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        token: payload,
      };
    case LOGOUT:
      return {
        token: "",
      };
    default:
      return state;
  }
};

export default authReducer;
