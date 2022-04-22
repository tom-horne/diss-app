import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      Homepage
      <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}
