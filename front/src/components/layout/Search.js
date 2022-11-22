import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate();

    const searchHandler = (elemento) => {
        elemento.preventDefault();

        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }
        else {
            navigate("/")
        }
    }

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder='Que producto Busca?...' 
                    onChange={(elemento) => setKeyword(elemento.target.value)}
                />                    
                <div className='input-group-append'>
                    <button id="search-btn" class="btn">
                        <i className="fa fa-search" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </form>
    );
}