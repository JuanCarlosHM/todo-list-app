import RegisterForm from '@/components/auth/Registerform'
import Header from '@/components/common/Header'
import styles from '@/app/login/login.module.css'
import Footer from '@/components/common/Footer'
import Link from 'next/link'

export default function RegisterPage () {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>Registrate</h1>
      <RegisterForm />

      <div className={styles.link}>
        <Link href='/login'>¿Tienes una cuenta? <strong> Inicia sesión </strong></Link>
      </div>
      <Footer />
    </div>
  )
}
