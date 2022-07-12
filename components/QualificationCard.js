/* eslint-disable @next/next/no-img-element */
import styles from '../styles/QualificationCard.module.css'

export default function QualificationCard({data}) {
    return (
        <div className={styles.container}>
            <div className={styles.contentProgress}>
                <div className={styles.progressBar} style={{background: `conic-gradient(#333339 ${data.progress *3.6}deg, #dddddc 0deg)`}}>
                    <div className={styles.progressNumber}>
                        {data.progress}<span className={styles.porcentagen}>%</span>
                    </div>
                </div>
            </div>
            <div className={styles.contentInfos}>
                <img className={styles.icons} src={data.language_url} alt='' width={55}/>
                <p className={styles.name}>{data.language}</p>
            </div>
        </div>
    )
}
