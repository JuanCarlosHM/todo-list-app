import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        <p>© {new Date().getFullYear()} Todo List App. Todos los derechos reservados.</p>
        <p>© Made by @JuanCarlosHM on Github, follow me! </p>
      </div>
    </footer>
  )
}
