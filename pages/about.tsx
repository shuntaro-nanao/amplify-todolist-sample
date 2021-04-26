import { LoginRequired } from '@/components/auth'
import { Layout } from '@/components/Layout'
import Link from 'next/link'

const AboutPage = () => (
  <LoginRequired>
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  </LoginRequired>
)

export default AboutPage