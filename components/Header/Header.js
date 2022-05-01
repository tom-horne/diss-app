import React, { useState, useRef, useContext } from "react";
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import Link from 'next/link';
import NavItem from "../NavItem/NavItem";
import Image from 'next/image'
import Button from '../Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import NavButton from "../Button/NavButton";

const Outer = styled.header`
  background: #fffafa;

`;

const Wrapper = styled.div`
  /* height: ${props => props.isSearchOpen ? "100vh" : "150px"}; */
  max-height: 150px;
  height: 75px;
  /* min-height: 150px; */
  /* padding: 15px 20px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

const NavItems = styled.ul`
  display: flex;
  margin: 0;
  height: 100%;
  list-style-type: none;
  padding: 0;
  ${'' /* width: 50%; */}
  /* position: absolute; */
  align-items: center;
  justify-content: space-between;
  font-family: 'Museo Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const Nav = styled.div`
  display: flex;
  list-style-type: none;
  padding: 0;
  overflow: auto;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  /* overflow: hidden; */
  @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      flex-direction: column;
      z-index: 1;
      border: none;
      background-color: #FFF;
      padding: 2em;
      padding-top: 70vh;
      transition: 0.2s ease-out;
      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
`;

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;;
    display: none;
    @media only screen and (max-width: 40em) {
      display: block;
    }
    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;
    z-index: 5;
    cursor: pointer;
    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;
    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }
    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }
    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};

const Header = () => {

  const [session, loading] = useSession()

  const [openDrawer, toggleDrawer] = useState(false);
  const toggleChecked = () => toggleDrawer(value => !value);
  const drawerRef = useRef(null);

  return (
    <Outer>
      <Container>
        <Wrapper>
          <Nav ref={drawerRef} openDrawer={openDrawer}>
              
              <div>
                <Link href="/">
                  <a>
                    SocialClub
                    {/* <Image src={logo} alt="Vercel Logo" width={103} height={94} /> */}
                  </a>
                </Link>
              </div>

                <div>
                  <NavButton label="Home"/>
                  <NavButton label="Create"/>
                  <NavButton label="Calendar"/>
                  <NavButton label="Invites"/>
                </div>

              <NavItems>
                
                {/* {data?.data.global?.navigation?.panels && data.data.global.navigation.panels.map(item => (
                  <NavItem item={item} />
                ))} */}
                {/* <Button primary size="large" label="Login" onClick={() => signIn()}/>
                <Button size="large" label="Sign out" onClick={() => signOut()}/> */}
                { session ? (
                  <div className="multiButtons">
                    <Button size="large" onClick={() => signOut()} label="Log out" />
                    <Link href={`/[id]`} as={`/dashboard`}>
                      <Button primary size="large" label="Home" />
                    </Link>
                  </div>
            ) : (
                  <div className="multiButtons">
                    <Button primary size="large" onClick={() => signIn()} label="Log in" />
                    {/* <Button primary size="small" onClick={() => loginWithRedirect({
                      screen_hint: "signup",
                    })} label="Sign Up" /> */}
                  </div>
            )}
              </NavItems>

            {/* </Navrow> */}
          </Nav>
          <HamburgerButton.Wrapper onClick={() => toggleChecked(true)}>
            <HamburgerButton.Lines />
          </HamburgerButton.Wrapper>
          
        </Wrapper>
      </Container>
    </Outer>
  );
};


export default Header