import { FormControl, InputGroup } from 'react-bootstrap';
import React, { useState, state, setStates } from "react";

function SearchBar() {
    return (
        <InputGroup className="search-bar">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">검색</InputGroup.Text>
      </InputGroup>
    )
}

export default SearchBar;