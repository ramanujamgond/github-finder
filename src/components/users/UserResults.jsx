import { useEffect, useState } from "react";
import SpinnerLoader from "../layout/Spinner";

const UserResults = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_FINDER_TOKEN}`
            }
        })
        const data = await response.json();
        setUsers(data);
        setLoading(false);
    }


    if (!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => {
                    return (
                        <h3>{user.login}</h3>
                    )
                })}
            </div>
        )
    } else {
        return <SpinnerLoader />
    }



}

export default UserResults