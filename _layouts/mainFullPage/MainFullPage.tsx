"use server"

// styles
import styles from './MainFullPage.module.scss';

interface MainFullPageProps {
  children: React.ReactNode;
}

export const MainFullPage = ({ children }: MainFullPageProps) => {
  return (
    <main
      className={styles.mainFullPage}
    >
      {children}
    </main>
  )
}
