import React, { useState, useRef, useContext } from "react";
import Image from "next/image";
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import Link from 'next/link';
import NavItem from "../NavItem/NavItem";
import { useRouter, withRouter } from 'next/router'
import Button from '../Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import NavButton from "../Button/NavButton";

const Outer = styled.header`
  background: white;
  box-shadow: 0 0 5px #d0d0d0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
`;

const ProfilePic = styled(Image)`
  object-fit:cover;
  border-radius:50%;
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

  const router = useRouter();

  const [session, loading] = useSession()

  console.log("sesssssh", session);

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

                  </a>
                </Link>
              </div>

                <div>
                  <Link href='/dashboard'>
                    <a>
                    <NavButton router={router.pathname} location='/dashboard' label="Home"/>
                    </a>
                  </Link>
                  <Link href='/dashboard/new'>
                    <a>
                    <NavButton router={router.pathname} location='/dashboard/new' label="Create"/>
                    </a>
                  </Link>
                  <Link href='/dashboard/mycalendar'>
                    <a>
                    <NavButton router={router.pathname} location='/dashboard/mycalendar' label="My Calendar"/>
                    </a>
                  </Link>
                  <Link href='/invites'>
                    <a>
                    <NavButton router={router.pathname} location='/myevents' label="My Events"/>
                    </a>
                  </Link>
                </div>

              <NavItems>
                { session ? (
                  <Buttons>
                    <Button primary size="large" onClick={() => signOut()} label="Log out" />
                    <ProfilePic src={session.user.image} width='30' height='30' />
                    {/* <Link href={`/[id]`} as={`/dashboard`}>
                      <Button primary size="large" label="Home" />
                    </Link> */}
                  </Buttons>
                ) : (
                  <div className="multiButtons">
                    <Button primary size="large" onClick={() => signIn()} label="Log in" />
                  </div>
                )}

              </NavItems>

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