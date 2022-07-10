/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'

import styles from '../styles/QualiBox.module.css'

export default function QualiBox({ name }) {
  return (
    <div className={styles.container}>
        <div className={styles.hoverarea}>
            <div className={styles.iconquali} id={styles.js}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/js-svg.svg' alt='' width="40"/>
            </div>
            <div className={styles.iconquali} id={styles.html}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/html-svg.svg' alt='' width="42"/>
            </div>
            <div className={styles.iconquali} id={styles.css}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/css-svg.svg' alt='' width="42"/>
            </div>

            <div className={styles.iconquali} id={styles.react}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/react-svg.svg' alt='' width="45"/>
            </div>
            <div className={styles.iconquali} id={styles.python}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/python-svg.svg' alt='' width="40"/>
            </div>
            <div className={styles.iconquali} id={styles.php}>
                <img className={styles.icon} src='https://api-requests.000webhostapp.com/svg/php-svg.svg' alt='' width="50"/>
            </div>
        </div>
        <div className={styles.iconquali} id={styles.pc}>
            <img src='https://api-requests.000webhostapp.com/svg/pc-svg.svg' alt='' width="100"/>
        </div>
    </div>
  )
}
