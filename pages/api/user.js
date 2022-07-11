// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const result = await fetch('https://portfolio-cadu-api.herokuapp.com/users/1');
  const userInfos = await result.json();

  res.status(200).json(userInfos)
}
