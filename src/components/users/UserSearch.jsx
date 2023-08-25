import { useState, useContext } from "react";
import GithubContex from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";

const UserSearch = () => {
    const [text, setText] = useState("");
    const { users, dispatch } = useContext(GithubContex);
    const { setAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text === "") {
            setAlert("Please enter something", "error");
        } else {
            dispatch({ type: 'SET_LOADING' })
            const users = await searchUsers(text)
            dispatch({ type: "GET_USERS", payload: users })

            setText("");
        }
    }

    return (
        <div className="grid grid-cols-1xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search"
                                value={text}
                                onChange={handleChange}
                            />
                            <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" type="Submit">
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <buttom onClick={() => dispatch({ type: "CLAER_INPUT" })} className="btn btn-ghost btn-lg">Clear</buttom>
                </div>
            )}
        </div>
    )
}

export default UserSearch