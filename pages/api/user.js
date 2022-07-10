import { apiBase } from "../../lib/tmdb";

const handler = async (req, res) => {
    const result = await fetch(`${apiBase}/users/1`);
    const json = await result.json();

    res.status(200).json({
        list: json
    })
}

export default handler