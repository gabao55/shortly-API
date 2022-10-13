import { nanoid } from "nanoid";
import connection from "../db/db.js";


async function shortenUrl (req, res) {
    const { url } = req.body;
    console.log(url)
    console.log(isStringUrl(url))
    if (!isStringUrl(url)) return res.status(422).send('Invalid url');

    const userId = res.locals.userId;
    const shortUrl = nanoid()

    try {
        await connection.query(
            'INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);',
            [url, shortUrl, userId]
        );
        
        return res.status(201).send(shortUrl);
    } catch (error) {
        return res.status(500).send(error);
    }
    
}

function isStringUrl (url) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?'+
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i'
    );
    
    return urlPattern.test(url);
}

async function getShortenedUrl (req, res) {
    const urlId = parseInt(req.params.id);

    try {    
        const urlObj = (await connection.query(
            'SELECT id, "shortUrl", url FROM urls WHERE id = $1;',
            [urlId]
        )).rows[0];
        if (!urlObj) return res.sendStatus(404);

        return res.status(200).send(urlObj);
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function redirectUserToUrl (req, res) {

}

async function deleteShortenedUrl (req, res) {

}

async function listUsersShortenedUrls (req, res) {

}

async function listShortenedUrlsRanking (req, res) {

}

export { shortenUrl,
    getShortenedUrl,
    redirectUserToUrl,
    deleteShortenedUrl,
    listShortenedUrlsRanking,
    listUsersShortenedUrls 
}