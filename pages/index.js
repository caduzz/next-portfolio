/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import GitCard from '../components/GitCard';
import QualificationCard from '../components/QualificationCard';

import LanguagesBox from '../components/LanguagesBox'
import styles from '../styles/Home.module.css'

const qualit = [
  {
    language: 'html',
    language_url: 'https://api-requests.000webhostapp.com/svg/html-svg.svg',
    progress: 88
  },
  {
    language: 'css',
    language_url: 'https://api-requests.000webhostapp.com/svg/css-svg.svg',
    progress: 90
  },
  {
    language: 'javascript',
    language_url: 'https://api-requests.000webhostapp.com/svg/js-svg.svg',
    progress: 72
  },
  {
    language: 'react',
    language_url: 'https://api-requests.000webhostapp.com/svg/react-svg.svg',
    progress: 65
  },
  {
    language: 'php',
    language_url: 'https://api-requests.000webhostapp.com/svg/php-svg.svg',
    progress: 85
  },
  {
    language: 'python',
    language_url: 'https://api-requests.000webhostapp.com/svg/python-svg.svg',
    progress: 15
  },
]

export default function Home({ userInfos, repoInfos }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main className={styles.main}>
        <nav className={styles.navbar}>
          <div className={styles.navbararea}>
            <div className='nav-items'>
              <a href='#inicio' className={styles.naviten} id={styles.active}>
                <img className={styles.navicon} src='https://api-requests.000webhostapp.com/svg/home-svg.svg' alt='' width="20"/>
              </a>
              <a href='#sobre' className={styles.naviten}>
                <img className={styles.navicon} src='https://api-requests.000webhostapp.com/svg/person-svg.svg' alt='' width="20"/>
              </a>
              <a href='#inicio' className={styles.naviten}>
                <img className={styles.navicon} src='https://api-requests.000webhostapp.com/svg/file-svg.svg' alt='' width="20"/>
              </a>
              <a href='#inicio' className={styles.naviten}>
                <img className={styles.navicon} src='https://api-requests.000webhostapp.com/svg/email-svg.svg' alt='' width="20"/>
              </a>
            </div>
          </div>
        </nav>

        <section id={styles.inicio}>
          <div className={styles.inicioarea}>
            <div className={styles.inicioinfoarea}>
                <div className={styles.myinfos}>
                    <h1 className={styles.userName}>{userInfos.name}</h1>
                    <p className={styles.serviceName}>{userInfos.service}</p>
                </div>
                <div className={styles.socialarea}>
                </div>
            </div>
            <div className={styles.inicioinfoarea}>
              <div>
                <LanguagesBox array={qualit} className={styles.qualiBox}/>
              </div>
            </div>
          </div>
          <div className={styles.iniciofooter}>
            <img className={styles.wave} src='https://api-requests.000webhostapp.com/svg/wave-top.svg' alt=''/>
            <img className={styles.arrowDown} src='https://api-requests.000webhostapp.com/svg/arrow-svg.svg' alt='' width={30}/>
          </div>
        </section>
        
        <section id={styles.sobre}>
          <div className={styles.gitArea}>
            {repoInfos.map((item, key) => <GitCard key={key} data={item} />)}
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className={styles.gitAreaSwiper}
          >
          {qualit.map((item, key) => (
            <SwiperSlide key={key}>
              <QualificationCard data={item} />
            </SwiperSlide>
          ))}
          </Swiper>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const userRes = await fetch(`${process.env.APICONECTION_URI || process.env.APICONECTION_URI_PRODUCTION}/api/user`);
  const userInfos = await userRes.json();

  const repoRes = await fetch(`${process.env.APICONECTION_URI || process.env.APICONECTION_URI_PRODUCTION}/api/repository`);
  const repoInfos = await repoRes.json();

  return {
    props: {
      userInfos,
      repoInfos
    }
  }
}