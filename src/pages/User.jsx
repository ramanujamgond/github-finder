import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useContext, useEffect } from "react";
import GithubContex from "../context/github/GithubContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import RepoList from "../components/repos/RepoList";
import { getUserAndRepos } from "../context/github/GithubActions";

const User = () => {
    const { user, loading, userRepos, dispatch } = useContext(GithubContex);

    const param = useParams();

    // useEffect(() => {
    //     getUser(param.login)
    //     getUserRepo(param.login);
    // }, [])

    useEffect(() => {
        dispatch({ type: "SET_LOADING" })
        const getUserData = async () => {
            const userData = await getUserAndRepos(param.login);
            dispatch({ type: "GET_USER_AND_REPOS", payload: userData })
        }

        getUserData();
    }, [dispatch, param.login])

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to="/" className="btn btn-ghost">Back to Search</Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 gap-8">
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="" />
                            </figure>
                            <div className="card-body justify-end">
                                <h2 className="card-title mb-0 text-white">{name}</h2>
                                <p className="text-white grow-0">{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>
                                {hireable && (
                                    <div className="mx-1 badge badge-info">Hirable</div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className="mt-4 card-actions">
                                <Link to={html_url} target="_blank" className="btn btn-outline">Visit Github Profile</Link>
                            </div>
                        </div>

                        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                            {location && (
                                <div className="stat">
                                    <div className="stat-title title-md">Location</div>
                                    <div className="text-lg stat-value">{location}</div>
                                </div>
                            )}

                            {blog && (
                                <div className="stat">
                                    <div className="stat-title title-md">Website</div>
                                    <div className="text-lg stat-value">
                                        <Link to={`https://${blog}`} target="_blank">{blog}</Link>
                                    </div>
                                </div>
                            )}

                            {twitter_username && (
                                <div className="stat">
                                    <div className="stat-title title-md">Twitter</div>
                                    <div className="text-lg stat-value">
                                        <Link to={`https://twitter.com/${twitter_username}`} target="_blank">{twitter_username}</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
                    <div className="stat">
                        <div className="stat-figure text-seconday">
                            <FaUsers className="text-3xl md:text-5xl" />
                        </div>

                        <div className="stat-title pt-5">
                            Followers
                        </div>

                        <div className="stat-value pr-5 text-3xl md:text-4xl">{followers}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-seconday">
                            <FaUserFriends className="text-3xl md:text-5xl" />
                        </div>

                        <div className="stat-title pt-5">
                            Following
                        </div>

                        <div className="stat-value pr-5 text-3xl md:text-4xl">{following}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-seconday">
                            <FaCodepen className="text-3xl md:text-5xl" />
                        </div>

                        <div className="stat-title pt-5">
                            Public Repos
                        </div>

                        <div className="stat-value pr-5 text-3xl md:text-4xl">{public_repos}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-seconday">
                            <FaStore className="text-3xl md:text-5xl" />
                        </div>

                        <div className="stat-title pt-5">
                            Public Gists
                        </div>

                        <div className="stat-value pr-5 text-3xl md:text-4xl">{public_gists}</div>
                    </div>
                </div>
                <RepoList repos={userRepos} />
            </div>
        </>
    )
}

export default User