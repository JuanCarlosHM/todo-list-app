import Link from 'next/link'
import Header from '@/components/common/Header'
import styles from './page.module.css'
import Footer from '@/components/common/Footer'

export default function HomePage () {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.main__title}> todo- list para las cosas importantes </h1>
        <p className={styles.main__content}> ¡Regístrate gratis y únete a los millones de personas en todo el mundo que se han enamorado de Todo App! Todo.

        </p>
      </main>

      <div className={styles.nav}>
        <Link className={styles.nav__links} href='/register'>
          <strong> Regístrate </strong>
        </Link>

        <Link className={styles.nav__links} href='/login'>
          <strong> Inicia sesión </strong>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
