/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from '../styles/GitCard.module.css'

export default function GitCard({data}) {
  return (
    <Link href={data.url}>
        <a className={styles.container} target="_blank">
            <div className={styles.content}>
                <img className={styles.gitIcon} src='https://api-requests.000webhostapp.com/svg/git-svg.svg' alt='' width={60}/>
                <p className={styles.gitName}>{data.name}</p>
            </div>
        </a>
    </Link>
  )
}
