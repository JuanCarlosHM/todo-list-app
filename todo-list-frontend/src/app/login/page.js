import LoginForm from '@/components/auth/LoginForm'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import styles from './login.module.css'
import Link from 'next/link'

export default function LoginPage () {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <LoginForm />
      <div className={styles.link}>
        <Link href='/register'> ¿No tienes una cuenta? <strong> Regístrate </strong> </Link>
      </div>
      <Footer />
    </div>
  )
}
