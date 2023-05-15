/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { Swiper, SwiperSlide } from 'swiper/react';

import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si'

import 'swiper/css';

import GitCard from '../components/GitCard';
import QualificationCard from '../components/QualificationCard';

import styles from '../styles/Home.module.css'
import Terminal from '../components/Terminal';

export default function Home({ repoInfos }) {
  return (<Terminal repos={repoInfos} />)
}

export const getServerSideProps = async () => {
  const urlI = process.env.APICONECTION_URI;

  const data = await fetch(`${urlI}/api/portfolio`);
  const dataInfo = await data.json();

  return {
    props: {
      userInfos: dataInfo.userInfos,
      repoInfos: dataInfo.repoInfos,
      languages: dataInfo.languages
    }
  }
}