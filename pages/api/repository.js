// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const result = await fetch(' https://api.github.com/users/caduzz/repos');
    const repo = await result.json();
    
    const name = repo.map((repo) => ({"name":repo.name.replace(/\-/g, ' '), "url": repo.html_url } ))
    
    res.status(200).json(name)
  }
  