import React from 'react';
import './repo.less'
import {NavLink} from "react-router-dom";
const Repo = (props) => {
   const repo = props.repo
    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name">Название репозитория: <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink></div>
                <div className="repo-header-start">Количество звезд: {repo.stargazers_count}</div>
            </div>
           <div className="repo-content">
               <div className="repo-last-commit">Последний коммит: {repo.updated_at}</div>
               <a href={repo.html_url} target={"_blank"} className="repo-link">Ссылка на репозиторий: {repo.html_url}</a>
           </div>
        </div>
    );
};

export default Repo;