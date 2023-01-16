import React, {useEffect, useState} from 'react';
import './Main.less'
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../actions/repos";
import Repo from "./repo/Repo.jsx";
import {setCurrentPage} from "../../reducers/reposReducer";
import {createPages} from "../../utils/pagesCreator";

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const perPage = useSelector(state => state.repos.perPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const pagesCount = Math.ceil(totalCount/perPage)
    const pages = []

    createPages(pages, pagesCount, currentPage)

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    const searchHandler = () => {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue))
    }

    return (
        <div className='container'>
            <div className="search">
                <input type="text"
                       placeholder='Input repo name'
                       className="search-input"
                       value={searchValue}
                       onChange={(e) => setSearchValue(e.currentTarget.value)}/>
                <button className="search-btn" onClick={searchHandler}>Search</button>
            </div>
            {isFetching === false ?
                repos.map((repo, index) => (<Repo key={index} repo={repo}/>))
                : <div className="fetching"></div>
            }
            <div className={"pages"}>
                {pages.map((page, index) =>
                    <span key={index}
                          className={currentPage === page ? "current-page" : "page"}
                          onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </div>
    )
        ;
};

export default Main;