import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";

const GithubContex = createContext();

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        userRepos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    return <GithubContex.Provider
        value={{
            ...state,
            dispatch,
        }}
    >
        {children}
    </GithubContex.Provider>
}

export default GithubContex;