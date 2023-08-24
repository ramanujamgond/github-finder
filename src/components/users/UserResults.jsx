import { useContext } from "react";
import SpinnerLoader from "../layout/Spinner";
import UserItem from "../users/UserItem";
import GithubContex from "../../context/github/GithubContext";

const UserResults = () => {
    const { users, loading } = useContext(GithubContex);

    if (!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users?.map((user) => {
                    return (
                        <UserItem key={user.id} user={user} />
                    )
                })}
            </div>
        )
    } else {
        return <SpinnerLoader />
    }



}

export default UserResults