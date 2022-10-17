import { nanoid } from "nanoid";
import { deleteUrl, getUrlByUrlId, getUrlByUrlIdAndUserId, getUrlDataByShortenedUrl, getUrlObjectByUrlId, getUrlsByUserId, getUserById, insertShortenedUrl, listRanking, updateVisitCount } from "../repositories/url.repository.js";

async function shortenUrl (req, res) {
    const { url } = req.body;
    if (!isStringUrl(url)) return res.status(422).send('Invalid url');

    const userId = res.locals.userId;
    const shortUrl = nanoid()

    try {
        await insertShortenedUrl(url, shortUrl, userId);
        
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
    const urlId = req.params.id;

    try {    
        const urlObj = (await getUrlObjectByUrlId(urlId)).rows[0];
        if (!urlObj) return res.sendStatus(404);

        return res.status(200).send(urlObj);
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function redirectUserToUrl (req, res) {
    const { shortUrl } = req.params;
    try {
        console.log(shortUrl)
        const urlData = (await getUrlDataByShortenedUrl(shortUrl)).rows[0];
        if (!Object.keys(urlData).length) return res.sendStatus(404);
        const newVisitCount = urlData.visitCount + 1;

        await updateVisitCount(newVisitCount, urlData.id);

        return res.redirect(urlData.url);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deleteShortenedUrl (req, res) {
    const urlId = req.params.id;
    const { userId } = res.locals;
    
    try {
        const urlExists = (await getUrlByUrlId(urlId)).rows[0];
        if (!urlExists) return res.sendStatus(404);

        const urlObj = (await getUrlByUrlIdAndUserId(urlId, userId)).rows[0];
        if (!urlObj) return res.sendStatus(401);

        await deleteUrl(urlObj.id);

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function listUsersShortenedUrls (req, res) {
    const { userId } = res.locals;

    try {
        const user = (await getUserById(userId)).rows;
        if (!user) return res.status(404)

        const urls = (await getUrlsByUserId(userId)).rows;

        const result = {
            id: userId,
            name: user[0].name,
            visitCount: 0,
            shortenedUrls: [],
        }

        urls.forEach(url => {
            result.visitCount += url.visitCount;
            result.shortenedUrls.push({
                id: url.id,
                shortUrl: url.shortUrl,
                url: url.url,
                visitCount: url.visitCount,
            })
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function listShortenedUrlsRanking (req, res) {
    try {
        const ranking = (await listRanking()).rows;

        return res.status(200).send(ranking)
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { shortenUrl,
    getShortenedUrl,
    redirectUserToUrl,
    deleteShortenedUrl,
    listShortenedUrlsRanking,
    listUsersShortenedUrls 
}