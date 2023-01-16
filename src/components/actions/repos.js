import axios from "axios";
import {setIsFetching, setRepos} from "../../reducers/reposReducer";


export const instance = axios.create({
    baseURL: 'https://api.github.com/'
})

export const getRepos = (searchQuery = "stars:>1", currentPAge, perPage) => {
    if (searchQuery === "") {
        searchQuery = "stars:>1" // %3E1
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        // const response = await instance.get(`search/repositories?q=${searchQuery}&sort=stars`)
        const response = await instance.get(`search/repositories`, {
            params: {
                q: searchQuery,
                sort: 'stars',
                per_page: perPage,
                page: currentPAge
            }
        })
        dispatch(setRepos(response.data))
    }
}

export const getCurrentRepo = async (username, repoName, setPero) => {
    const response = await instance.get(`repos/${username}/${repoName}`)
    setPero(response.data)
}
export const getContributors = async (username, repoName, setContributors) => {
    const response = await instance.get(`repos/${username}/${repoName}/contributors?page=1&per_page=10`)
    setContributors(response.data)
}