import { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-grid-system';
import { useSession, signIn, signOut } from "next-auth/client"

// import { createGlobalStyle } from 'styled-components'

// const GlobalStyle = createGlobalStyle`
//   body {
//     background: 'red';
//   }
// `;

export default function Home() {
  const router = useRouter()

  const [session, loading] = useSession()

  useEffect(() => {
    if (session) {
      router.push(`/dashboard`)
    } 
}, [session])

  return (
    <Container>
      {/* <GlobalStyle /> */}
      Homepage
      <Link href="/dashboard">Dashboard</Link>
    </Container>
  )
}
