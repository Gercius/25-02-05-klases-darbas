import { useState } from "react";
import "./SearchBar.scss";

export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        props.onSearch(searchInput);
        setSearchInput("");
    };

    return (
        <form className="search-bar" onSubmit={handleForm}>
            <label>Įveskite vietovę</label>
            <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type="text" />
            <button>Ieškoti</button>
        </form>
    );
};
