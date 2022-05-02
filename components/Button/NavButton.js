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
  border-bottom: ${props => props.router == props.location ? "solid 3px black" : "none"};
`;

const NavButton = ({ label, router, location }) => {

  return (
    <StyledNavButton router={router} location={location}>{label}</StyledNavButton>
  )
}

export default NavButton