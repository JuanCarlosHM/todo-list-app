import styles from './BreadcrumHeader.module.css'

export default function BreadcrumbHeader ({ breadcrumbs }) {
  return (
    <div className={styles.header}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className={styles.breadcrumb}>
          {index !== breadcrumbs.length - 1
            ? (
              <>
                {breadcrumb.link
                  ? (
                    <a href={breadcrumb.link} className={styles.link}>
                      {breadcrumb.label}
                    </a>
                    )
                  : (
                    <span>{breadcrumb.label}</span>
                    )}
                <span className={styles.separator}> / </span>
              </>
              )
            : (
              <span className={styles.current}>{breadcrumb.label.slice(0, 20) + '...'}</span>
              )}
        </span>
      ))}
    </div>
  )
}
