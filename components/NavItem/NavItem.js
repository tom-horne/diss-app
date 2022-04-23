import React, { useState } from 'react'
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';

const Item = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  /* padd */
`;

const NavItem = ({ item }) => {

    return (
        <Item> 
            <Container >
                <Link href={item.link.href}>
                    <a>
                    {item.link.label}
                    </a>
                </Link>
            </Container>
        </Item>
    )
}


export default NavItem
