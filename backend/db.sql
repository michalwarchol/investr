--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE investr;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:NibBfTRxnYsfXMi5UKIdug==$QO7sUbxlpKi+DOsJ88Nig2kVk6um6cipUM9rXptoo1U=:j50P6CtEVqFJyQseIFYiBwNLS84Xf/fr4TwFMTV7edk=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "investr" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

--
-- Name: investr; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE investr WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE investr OWNER TO postgres;

\connect investr

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

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: User_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."User_role_enum" AS ENUM (
    'investor',
    'company'
);


ALTER TYPE public."User_role_enum" OWNER TO postgres;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role_enum AS ENUM (
    'investor',
    'company'
);


ALTER TYPE public.user_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    name character varying(500) NOT NULL,
    password text NOT NULL,
    role public."User_role_enum" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    goal numeric NOT NULL,
    image character varying NOT NULL,
    url character varying,
    contact_email character varying NOT NULL,
    contact_phone character varying NOT NULL,
    "ownerId" uuid
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_tags_tag (
    "productId" uuid NOT NULL,
    "tagId" uuid NOT NULL
);


ALTER TABLE public.product_tags_tag OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: tag_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag_product (
    tag_id uuid NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.tag_product OWNER TO postgres;

--
-- Name: tag_products_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag_products_product (
    "tagId" uuid NOT NULL,
    "productId" uuid NOT NULL
);


ALTER TABLE public.tag_products_product OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    name character varying(500) NOT NULL,
    password text NOT NULL,
    role public.user_role_enum NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, password, role) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
133	1704647281499	Tags1704647281499
134	1704648635770	ProductsTags1704648635770
135	1704649406682	Products1704649406682
136	1704651510051	Users1704651510051
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, goal, image, url, contact_email, contact_phone, "ownerId") FROM stdin;
be30dabe-9fad-41f5-8586-4d4f551597c7	PetPlanet 2	<h2>We take care of our little friends</h2>	30000	uploads/1706756443107-petplanet.png	http://example.com	example@example.com	12312312321	dea8e029-b966-4487-949e-a894d20abf6d
9c79506f-7aab-41c1-bccd-a0dbdf9c86b0	Pet Planet 3	opis	5000	uploads/1706818278096-petplanet.png	http://example.com	example@example.com	213123123	4f7dc0b6-7e6e-46c5-9836-bace3e8e9e28
701a6e21-4da6-47fa-b24e-663f7a35086c	Pet Planet 4	abcdef	123000	uploads/1706821456704-petplanet.png	http://example.com	example@example.com	123321123	4f7dc0b6-7e6e-46c5-9836-bace3e8e9e28
f7af40ef-1e11-41b0-84eb-a894bf636259	PetPlanet	<h2>We take care of our little friends</h2>	10000	uploads/1706752651326-petplanet.png	http://example.com	example@example.com	12312312321	dea8e029-b966-4487-949e-a894d20abf6d
\.


--
-- Data for Name: product_tags_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_tags_tag ("productId", "tagId") FROM stdin;
f7af40ef-1e11-41b0-84eb-a894bf636259	4101a3fb-c7cf-4e19-9bb6-b32b2578de95
be30dabe-9fad-41f5-8586-4d4f551597c7	4101a3fb-c7cf-4e19-9bb6-b32b2578de95
9c79506f-7aab-41c1-bccd-a0dbdf9c86b0	4101a3fb-c7cf-4e19-9bb6-b32b2578de95
9c79506f-7aab-41c1-bccd-a0dbdf9c86b0	972afda7-aeb7-461f-af2e-df602e708d3c
9c79506f-7aab-41c1-bccd-a0dbdf9c86b0	903903fd-c58f-41f1-9165-d667b2e4e921
701a6e21-4da6-47fa-b24e-663f7a35086c	5fb3e410-95b0-46c4-acfd-24092dc78f94
701a6e21-4da6-47fa-b24e-663f7a35086c	9fb2691b-28b9-4c98-b1ca-d35b760ece79
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
f1ff102f-1a96-4047-b27f-7b06347f3e0b	Health
28480b47-6362-4e89-a67e-7872daf2924c	Education
4101a3fb-c7cf-4e19-9bb6-b32b2578de95	Infrastructure
972afda7-aeb7-461f-af2e-df602e708d3c	Tech
903903fd-c58f-41f1-9165-d667b2e4e921	IT
0b437aa8-8f86-4a52-9c5e-5024f5fd896f	Bio
5fb3e410-95b0-46c4-acfd-24092dc78f94	Fitness
9fb2691b-28b9-4c98-b1ca-d35b760ece79	E-commerce
\.


--
-- Data for Name: tag_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag_product (tag_id, product_id) FROM stdin;
\.


--
-- Data for Name: tag_products_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag_products_product ("tagId", "productId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, name, password, role) FROM stdin;
4fe68800-5004-4a18-b617-7368eda6a1e5	mymail@example.com	Michal	$2a$10$Qpk8hcEdZlDfiqvPWL7eiOT4W/p/FziILNlwc4SL8Ld2fkpQ8DtJ2	investor
dea8e029-b966-4487-949e-a894d20abf6d	example-company@example.com	Michal Company	$2a$10$nbARTeK/lyhRx11oDMUyVOPocsaYivGaSax3lXSQX0pAxHhDiehLS	company
4f7dc0b6-7e6e-46c5-9836-bace3e8e9e28	example@example.com	Michal	$2a$10$mu64AtcMch21w9x5LKT/k.7zFd9a5auxXUML8bFs9.//xjygltyHm	company
bfa16bd9-eef9-4956-b801-b0d50334f606	example2@example.com	Michal	$2a$10$7DrgIlwZHzaaaNq7beogmewUkfj8r/ezFB71Sc6obLikJ1PKCq736	investor
f6fa8720-6d02-486e-a712-42ca7b2252f2	example3@example.com	Michal	$2a$10$hD6zEkqmW/8wBWHE9k7HwuKvCME7iK3LEO2qUC/bmiKVK/v.hWFrW	investor
e76bc2ed-303f-49ba-a50e-3b23bcc04c42	example4@example.com	Michal	$2a$10$hrNK1A99ZPpGwZTGHa5yV.mM1HKW2ZngnqdusBtaqiDHuBOX1ZtAS	company
4893e50b-bfe3-46b5-a362-7aed51e0a0a0	example6@example.com	investor	$2a$10$Mv9uwUQaSR4tvSI3rKFei.aFj8qOGAYJLnRbM/.GNho25ROz5aNe2	investor
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 136, true);


--
-- Name: tag_product PK_3562bfefeca8f2a23e1208f4b03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_product
    ADD CONSTRAINT "PK_3562bfefeca8f2a23e1208f4b03" PRIMARY KEY (tag_id, product_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: product_tags_tag PK_8da52c0bc9255c6cb07af25ac73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_tags_tag
    ADD CONSTRAINT "PK_8da52c0bc9255c6cb07af25ac73" PRIMARY KEY ("productId", "tagId");


--
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- Name: User PK_9862f679340fb2388436a5ab3e4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY (id);


--
-- Name: tag_products_product PK_9a4ce503ba4dc0b750ec4beadaa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_products_product
    ADD CONSTRAINT "PK_9a4ce503ba4dc0b750ec4beadaa" PRIMARY KEY ("tagId", "productId");


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: User UQ_4a257d2c9837248d70640b3e36e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE (email);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_0de90b04710a86601acdff88c2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0de90b04710a86601acdff88c2" ON public.product_tags_tag USING btree ("tagId");


--
-- Name: IDX_208235f4a5c925f11171252b76; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_208235f4a5c925f11171252b76" ON public.product_tags_tag USING btree ("productId");


--
-- Name: IDX_5eac1ad6916cde3fd72bf1f74c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5eac1ad6916cde3fd72bf1f74c" ON public.tag_products_product USING btree ("tagId");


--
-- Name: IDX_aafffb66d09391239e500edd6c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_aafffb66d09391239e500edd6c" ON public.tag_products_product USING btree ("productId");


--
-- Name: product_tags_tag FK_0de90b04710a86601acdff88c21; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_tags_tag
    ADD CONSTRAINT "FK_0de90b04710a86601acdff88c21" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: product_tags_tag FK_208235f4a5c925f11171252b760; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_tags_tag
    ADD CONSTRAINT "FK_208235f4a5c925f11171252b760" FOREIGN KEY ("productId") REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tag_products_product FK_5eac1ad6916cde3fd72bf1f74cc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_products_product
    ADD CONSTRAINT "FK_5eac1ad6916cde3fd72bf1f74cc" FOREIGN KEY ("tagId") REFERENCES public.tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tag_products_product FK_aafffb66d09391239e500edd6c7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_products_product
    ADD CONSTRAINT "FK_aafffb66d09391239e500edd6c7" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: product FK_cbb5d890de1519efa20c42bcd52; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

