import express from 'express';
import { deleteShortenedUrl,
    getShortenedUrl,
    listShortenedUrlsRanking,
    listUsersShortenedUrls,
    redirectUserToUrl,
    shortenUrl
} from '../controllers/url.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/urls/shorten', validateToken, shortenUrl);
router.get('/urls/:id', getShortenedUrl);
router.get('/urls/open/:shortUrl', redirectUserToUrl);
router.delete('/urls/:id', validateToken, deleteShortenedUrl);
router.get('/users/me', validateToken, listUsersShortenedUrls);
router.get('/ranking', listShortenedUrlsRanking);

export default router;