import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'react-grid-system';
// import { createGlobalStyle } from 'styled-components'

// const GlobalStyle = createGlobalStyle`
//   body {
//     background: 'red';
//   }
// `;

export default function Home() {
  return (
    <Container>
      {/* <GlobalStyle /> */}
      Homepage
      <Link href="/dashboard">Dashboard</Link>
    </Container>
  )
}
