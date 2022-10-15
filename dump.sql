--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (6, 'https://node-postgres.com/features/types', 'jDFew-6DWFOe3Kqx8ISpR', 8, 9, '2022-10-14 20:48:54.959987');
INSERT INTO public.urls VALUES (4, 'https://node-postgres.com/features/types', 'tKSEDoeuqtomw9JsQOxcx', 6, 9, '2022-10-14 20:48:54.975872');
INSERT INTO public.urls VALUES (5, 'https://node-postgres.com/features/types', 'Sq09cCPZVdWP4ZIlpGTsA', 2, 9, '2022-10-14 20:48:54.991995');
INSERT INTO public.urls VALUES (8, 'https://node-postgres.com/features/types', 'fnlYjgSQLCs_U9GuqcebB', 0, 8, '2022-10-14 20:48:55.009269');
INSERT INTO public.urls VALUES (7, 'https://node-postgres.com/features/types', 'u3it3TrYvgCUogNpLjgsn', 1, 8, '2022-10-14 20:48:55.026734');
INSERT INTO public.urls VALUES (9, 'https://node-postgres.com/features/types', 'yuxFBOw7bnXmg1rxwc3xM', 0, 8, '2022-10-14 20:48:55.044425');
INSERT INTO public.urls VALUES (10, 'https://node-postgres.com/features/types', 'LbGEbxIyLv264X8DC7Dqs', 0, 8, '2022-10-14 20:48:55.061018');
INSERT INTO public.urls VALUES (11, 'https://node-postgres.com/features/types', 'MdUQKTakQ82N1p-a36-1t', 0, 8, '2022-10-14 20:48:55.078132');
INSERT INTO public.urls VALUES (12, 'https://node-postgres.com/features/types', 'FdcdisYla1eAor6uBIPrk', 1, 21, '2022-10-14 20:48:55.094681');
INSERT INTO public.urls VALUES (13, 'https://node-postgres.com/features/types', '-PzOr0SfA9_AKWkDmj-m6', 0, 21, '2022-10-14 20:48:55.111423');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (8, 'Gabriel', 'test3@gmail.com', '$2b$12$Q2QPOCbwFdBbpTely1b9xuTMLfrMhNJUK5hVwNTNpKC9QWJAhBrDq', '2022-10-14 20:48:25.141131');
INSERT INTO public.users VALUES (9, 'Gabriel', 'test4@gmail.com', '$2b$12$f3d0Ui31AXqUr8ZQiY9UZuMS.rTj0ljAo65XnoIMdVoTFQbUPHaw.', '2022-10-14 20:48:25.157152');
INSERT INTO public.users VALUES (10, 'Gabriel', 'test5@gmail.com', '$2b$12$4IyO2YBasLQNoH7SpeYaF.9mtfsJhcoq75qLXKl3SoQpUsHDUr.KG', '2022-10-14 20:48:25.173305');
INSERT INTO public.users VALUES (11, 'Gabriel', 'test6@gmail.com', '$2b$12$uqiSMsDJwsLONCUSUuarUuJhFtKRK5OEZ7zWacf/U8Ubn3M96HwZG', '2022-10-14 20:48:25.189437');
INSERT INTO public.users VALUES (12, 'Gabriel', 'test7@gmail.com', '$2b$12$ZBIEj3GJlSZk.rTeFufE.e81uyBsK.CKRbY1MM0y/oxsQzp1PcFyy', '2022-10-14 20:48:25.204825');
INSERT INTO public.users VALUES (13, 'Gabriel', 'test8@gmail.com', '$2b$12$jo3hCGdtU3Z2OE5.da/qLOU.B/qYEb0nGJNgoXmtBni4SBjYtak8a', '2022-10-14 20:48:25.220197');
INSERT INTO public.users VALUES (14, 'Gabriel', 'test9@gmail.com', '$2b$12$yYfGe/yjXaKVLR8FpYcfh.kO/MpWDOZ0GxFPI/xLeCjz6c2VWIDp6', '2022-10-14 20:48:25.235633');
INSERT INTO public.users VALUES (15, 'Gabriel', 'test10@gmail.com', '$2b$12$3UFNoM2oSgOUxEAGu7Y.5uWupxpKKGzI5lWw8XyUvpUHPJAPVWasC', '2022-10-14 20:48:25.25098');
INSERT INTO public.users VALUES (16, 'Gabriel', 'test11@gmail.com', '$2b$12$jsgNTJioiMxiwCao6OWmxO4UpwddpQ13KPA4kQUeqWqTPjbigYF6G', '2022-10-14 20:48:25.26635');
INSERT INTO public.users VALUES (17, 'Gabriel', 'test12@gmail.com', '$2b$12$h9sD33vC7QqU9JdyKZUfZe4JwU5qKOh9EUDM0ehX9ASxg0hb4mysi', '2022-10-14 20:48:25.281822');
INSERT INTO public.users VALUES (18, 'Gabriel', 'test13@gmail.com', '$2b$12$aIJpGLXIoWRe4O0VclQ1Q.w.w/1DVdRwqDQZ619MG6tnuouMOcYSa', '2022-10-14 20:48:25.297239');
INSERT INTO public.users VALUES (19, 'Gabriel', 'test14@gmail.com', '$2b$12$5oXDNJIPbQX8fXCUskkTAes1PRB/KACxT4x0h5YflbzfizSKssP0C', '2022-10-14 20:48:25.312684');
INSERT INTO public.users VALUES (20, 'Gabriel', 'test15@gmail.com', '$2b$12$bJo9/UaJiLlhzS34gyFGM.nBZXTiuerinWsNdTODb4hbPRz8rVmUK', '2022-10-14 20:48:25.328351');
INSERT INTO public.users VALUES (21, 'Gabriel', 'test16@gmail.com', '$2b$12$zFF1As/SYdJV8oH4RupFKucNlNSK78VWijWVAJpNb0ZUTF3NLfeRq', '2022-10-14 20:48:25.344228');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

