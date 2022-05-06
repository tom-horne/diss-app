import { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-grid-system';
import { useSession, signIn, signOut } from "next-auth/client"
import styled from 'styled-components';

const EmptyDashboard = styled.div`
  background-color: white;
  width: 100%;
  height: 500px;
  margin-top: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px #d0d0d0;
  text-align: center;
  padding: 10px;

  hr{
    border-top: 2px solid #fd1e61;
  }
`;

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
      <Row>
        <Col md={3}>
        </Col>
        <Col md={6}>
          <EmptyDashboard>
            <h3>
              Sign in to start creating and viewing events!
            </h3>
            <hr/>
          </EmptyDashboard>
        </Col>
        <Col md={3}>
        </Col>
      </Row>
      
      {/* <Link href="/dashboard">Dashboard</Link> */}
    </Container>
  )
}
