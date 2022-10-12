-- Creates Database
CREATE DATABASE shortly;

-- Creates tables
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE urls(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    token TEXT NOT NULL
);