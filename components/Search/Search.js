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
                    placeholder="Search Users To Add..."
                    style={{  padding: '10px', width: '100%' }}
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
  <div className="table" style={{overflow: 'scroll', backgroundColor: '#eddada'}}>
    {list.filter(isSearched(pattern)).map(person =>
      <div key={person.attributes.username} style={{ marginTop: '10px' }} onClick={() => selectionHandler(person.id)} className="table-row">
        <span style={{ width: '40%' }}>
            {person.attributes.username}{person.id} {selected.some(e => e == person.id) ? '✅' : <p></p>}
            {/* <hr style={{borderTop: 'solid 2px black !important'}}/> */}
        </span>
      </div>
    )}
  </div>

export default Search