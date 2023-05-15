/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from '../styles/GitCard.module.css'


import { AiFillGithub } from 'react-icons/ai'


export default function GitCard({data}) {
  return (
    <Link href={data.url}>
        <a className={styles.container} target="_blank">
            <div className={styles.content}>
                <AiFillGithub className={styles.gitIcon} size={65}/>
                <p className={styles.gitName}>{data.name}</p>
            </div>
        </a>
    </Link>
  )
}
