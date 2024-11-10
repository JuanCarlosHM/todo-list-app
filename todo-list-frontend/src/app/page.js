'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthContext } from '@/context/authcontext'
import Header from '@/components/common/Header'
import styles from './page.module.css'
import Footer from '@/components/common/Footer'

export default function HomePage () {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/tasks')
    }
  }, [user, router])

  if (user) return null

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.main__title}> todo- list app for important things </h1>
        <p className={styles.main__content}> Sign up for free and become one of the millions of people around the world who have fallen in love with todo app! </p>
      </main>

      <div className={styles.nav}>
        <Link className={styles.nav__links} href='/register'>
          <strong> Register </strong>
        </Link>

        <Link className={styles.nav__links} href='/login'>
          <strong> Sign in </strong>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
