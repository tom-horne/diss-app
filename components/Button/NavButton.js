import React from 'react'
import styled from 'styled-components';

const StyledNavButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  cursor: pointer;
  /* display: inline-block; */
  line-height: 1;
  /* margin-left: 10px; */
  background-color: #00ff00;
  color: "black";
  height: 75px;
  padding: 0 20px;
`;

const NavButton = ({label}) => {

  return (
    <StyledNavButton>{label}</StyledNavButton>
  )
}

export default NavButton