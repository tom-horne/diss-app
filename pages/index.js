import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'react-grid-system';

export default function Home() {
  return (
    <div>
      Homepage
      <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}
