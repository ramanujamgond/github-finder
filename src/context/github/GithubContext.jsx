import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";

const GithubContex = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_FINDER_TOKEN;

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get Search Results
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const { items } = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }


    // Get a Single User
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if (response.status === 404) {
            window.location("/not-found")
        } else {
            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }

    }


    // set loading
    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    // claer search input
    const clearInput = () => dispatch({ type: 'CLAER_INPUT' });

    return <GithubContex.Provider
        value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            searchUsers,
            clearInput,
            getUser
        }}
    >
        {children}
    </GithubContex.Provider>
}

export default GithubContex;