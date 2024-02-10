import Navbar from "../cui/cdashboard/navbar/navbar"
import Sidebar from "../cui/cdashboard/sidebar/sidebar"
import styles from "../cui/cdashboard/dashboard.module.css"
import Footer from "../cui/cdashboard/footer/footer"

const cLayout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default cLayout