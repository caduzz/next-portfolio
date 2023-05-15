export default async function handler(req, res) {
  const result = await fetch('http://localhost:3232/users/1');
  const userInfos = await result.json();

  const resultQuali = await fetch('http://localhost:3232/quali');
  const qualidade = await resultQuali.json();
  
  const resultRepo = await fetch('https://api.github.com/users/caduzz/repos');
  const repo = await resultRepo.json();
  
  const repoInfos = repo.map((repo) => ({"name":repo.name.replace(/\-/g, ' '), "url": repo.html_url } ))
  
  res.status(200).json({userInfos: userInfos, repoInfos: repoInfos, languages: qualidade})
}