// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const languages = [
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

export default async function handler(req, res) {
  const result = await fetch('https://portfolio-cadu-api.herokuapp.com/users/1');
  const userInfos = await result.json();
  
  const resultRepo = await fetch('https://api.github.com/users/caduzz/repos');
  const repo = await resultRepo.json();
  
  const repoInfos = repo.map((repo) => ({"name":repo.name.replace(/\-/g, ' '), "url": repo.html_url } ))
  
  res.status(200).json({userInfos: userInfos, repoInfos: repoInfos, languages})
}
