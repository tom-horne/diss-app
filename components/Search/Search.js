import React, { useState, useRef } from 'react';
import useOutsideClick from '../../utils/useOutsideClick';


function isSearched(searchTerm) {
    return function (item) {
      return item.attributes.username.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }

const Search = ({ value, children, users, selectionHandler, selected }) => {

  const ref = useRef();

    const [searchTerm, changeSearchTerm] = useState('')
    const [allUsers, updateUsers] = useState(users)
    const [focus, setFocus] = useState(false) 
    const toggleFocus = () => setFocus(value => !value);

    const onSearchChange = (event) => {
        changeSearchTerm(event.target.value)
      }

    // useOutsideClick(ref, () => {
    //   setFocus(value => !value)
    // });


    return (
        <div ref={ref} onFocus={() => setFocus(true)}>
            <form>
                {children} <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                            />
                </form>
                { focus &&
                    <Table
                        list={allUsers}
                        pattern={searchTerm}
                        selectionHandler={selectionHandler}
                        selected={selected}
                    />}
        </div>
    )
}

const Table = ({ list, pattern, onDismiss, selectionHandler, selected }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(person =>
      <div key={person.attributes.username} onClick={() => selectionHandler(person.id)} className="table-row">
        <span style={{ width: '40%' }}>
            {person.attributes.username}{person.id} {selected.some(e => e == person.id) ? '✅' : <p></p>}
        </span>
      </div>
    )}
  </div>

export default Search