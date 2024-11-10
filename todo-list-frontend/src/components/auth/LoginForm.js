'use client'

import { useState } from 'react'

import { loginUser } from '@/services/authApi'
import styles from './auth.module.css'
import { redirect } from 'next/navigation'

export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Llamada al servicio de login
      await loginUser(email, password)
      console.log('Inicio de sesión exitoso, redirigiendo...')
    } catch (err) {
      // Manejar errores
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    }
    redirect('/tasks')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label
          className={styles.form__label}
          htmlFor='email'
        >
          Correo:
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
        >Contraseña:
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
      <button className={styles.form__button} type='submit'>Iniciar Sesión</button>
      {error && <p className={styles.form__error}>{error}</p>}
    </form>
  )
}
