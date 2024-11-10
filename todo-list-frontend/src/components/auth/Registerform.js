'use client'

import { useState } from 'react'
import { registerUser } from '@/services/authApi'
import styles from '@/components/auth/auth.module.css'
import { useRouter } from 'next/navigation'

export default function RegisterForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser(email, password)
      alert(`${res.message}, por favor inicia sesión`)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse')
    }
    router.push('/login')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label
          className={styles.form__label}
          htmlFor='email'
        >Correo:
        </label>
        <input
          className={styles.form__input}
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          className={styles.form__label}
          htmlFor='password'
        >
          Contraseña:
        </label>
        <input
          className={styles.form__input}
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className={styles.form__button}
        type='submit'
      >
        Registrarse
      </button>
      {error && <p className={styles.form__error}>{error}</p>}
    </form>
  )
}
