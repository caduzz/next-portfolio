/* eslint-disable @next/next/no-img-element */
import styles from '../styles/QualificationCard.module.css'

export default function QualificationCard({data}) {
    return (
        <div className={styles.container}>
            <div className={styles.contentProgress}>
                <div className={styles.progressBar}>
                    <div className={styles.progressNumber}>
                        {data.progress}<samp className={styles.porcentagen}>%</samp>
                    </div>
                </div>
            </div>
            <div className={styles.contentInfos}>
                <img className={styles.gitIcon} src='https://api-requests.000webhostapp.com/svg/js-svg.svg' alt='' width={60}/>
                <p className={styles.gitName}>{data.name}</p>
            </div>
        </div>
    )
}
