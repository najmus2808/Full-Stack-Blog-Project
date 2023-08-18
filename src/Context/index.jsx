import { useReducer, createContext, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
        isAdmin: action.payload.user.role === 1,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
export default AppProvider;
