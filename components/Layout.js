
import Footer from './footer'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
  return (
    <>
      
      {/* <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div> */}

      {children}
      {/* <Footer/> */}
      
    </>
  )
}

export default Layout