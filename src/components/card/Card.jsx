import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getContributors, getCurrentRepo} from "../actions/repos";
import './сard.less'

const Card = () => {
    const navigate = useNavigate()
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])

    useEffect(() => {
       getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    },[])

    console.log(repo)
    return (
        <div>
            <button onClick={() => navigate("/")} className={"back-btn"}>BACK</button>
            <div className="card">
                <img src={repo.owner.avatar_url || ''} alt=""/>
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazer_count}</div>
            </div>
            {contributors.map((c, index) =>(
                <div key={index}>{index+1}.{c.login}</div>
            ))
            }
        </div>
    );
};

export default Card;