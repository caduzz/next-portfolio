/* eslint-disable @next/next/no-img-element */
import 'swiper/css';

import Terminal from '../components/Terminal';

export default function Home({ repos }) {
  return (<Terminal repos={repos} />)
}

export const getServerSideProps = async () => {
  const data = await fetch(`https://api.github.com/users/caduzz/repos`);
  const repo = await data.json();

  const repos = repo.map((repo) => ({"name":repo.name.replace(/\-/g, ' '), "url": repo.html_url } ))
  return {
    props: {
      repos
    }
  }
}