import connection from "../db/db.js";

function insertShortenedUrl(url, shortUrl, userId) {
    return connection.query(
        'INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);',
        [url, shortUrl, userId]
    );
}

function getUrlObjectByUrlId(urlId) {
    return connection.query(
        'SELECT id, "shortUrl", url FROM urls WHERE id = $1;',
        [urlId]
    );
}

function getUrlDataByShortenedUrl(shortUrl) {
    return connection.query(
        'SELECT id, url, "visitCount" FROM urls WHERE "shortUrl" = $1;',
        [shortUrl]
    );
}

function updateVisitCount(newVisitCount, urlId) {
    return connection.query(
        'UPDATE urls SET "visitCount" = $1 WHERE id = $2;',
        [newVisitCount, urlId]
    );
}

function getUrlByUrlId(urlId) {
    return connection.query(
        'SELECT id FROM urls WHERE id = $1;',
        [urlId]
    );
}

function getUrlByUrlIdAndUserId(urlId, userId) {
    return connection.query(
        'SELECT id FROM urls WHERE id = $1 AND "userId" = $2;',
        [urlId, userId]
    );
}

function deleteUrl(urlId) {
    return connection.query(
        'DELETE FROM urls WHERE id = $1',
        [urlId]
    );
}

function getUserById(userId) {
    return connection.query(
        'SELECT name FROM users WHERE id = $1;',
        [userId]
    );
}

function getUrlsByUserId(userId) {
    return connection.query(
        'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1;',
        [userId]
    );
}

function listRanking() {
    return connection.query(
        `SELECT 
            users.id,
            users.name,
            COUNT(urls.id) AS "linksCount",
            COALESCE(SUM(urls."visitCount"), 0) AS "visitCount" 
        FROM 
            users 
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;`
    );
}

export { insertShortenedUrl,
    getUrlObjectByUrlId,
    getUrlDataByShortenedUrl,
    updateVisitCount,
    getUrlByUrlId,
    getUrlByUrlIdAndUserId,
    deleteUrl,
    getUserById,
    getUrlsByUserId,
    listRanking
};