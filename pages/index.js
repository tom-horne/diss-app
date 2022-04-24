import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'react-grid-system';
// import { useSession, signIn, signOut } from "next-auth/client";


export default function Home() {

  // const [session, loading] = useSession()

  return (
    <Container>
      Homepage
      <Link href="/dashboard">Dashboard</Link>
    </Container>
  )
}
