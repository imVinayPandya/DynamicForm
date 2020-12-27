--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Ubuntu 12.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.3 (Ubuntu 12.3-1.pgdg18.04+1)

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
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: vinay
--

CREATE SCHEMA postgraphile_watch;


ALTER SCHEMA postgraphile_watch OWNER TO vinay;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: vinay
--

CREATE FUNCTION postgraphile_watch.notify_watchers_ddl() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'ddl',
      'payload',
      (select json_agg(json_build_object('schema', schema_name, 'command', command_tag)) from pg_event_trigger_ddl_commands() as x)
    )::text
  );
end;
$$;


ALTER FUNCTION postgraphile_watch.notify_watchers_ddl() OWNER TO vinay;

--
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: vinay
--

CREATE FUNCTION postgraphile_watch.notify_watchers_drop() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'drop',
      'payload',
      (select json_agg(distinct x.schema_name) from pg_event_trigger_dropped_objects() as x)
    )::text
  );
end;
$$;


ALTER FUNCTION postgraphile_watch.notify_watchers_drop() OWNER TO vinay;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: form_responses; Type: TABLE; Schema: public; Owner: vinay
--

CREATE TABLE public.form_responses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    form_id uuid NOT NULL,
    answers json,
    created_at timestamp(0) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.form_responses OWNER TO vinay;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: vinay
--

CREATE TABLE public.forms (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    form_name character varying NOT NULL,
    form_fields json NOT NULL,
    created_at timestamp(0) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.forms OWNER TO vinay;

--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: vinay
--

COPY public.form_responses (id, form_id, answers, created_at) FROM stdin;
c13197b1-1e51-45a1-82a2-4e23a3e638fc	a9581774-10a6-4712-999a-d03b22d13843	{"radioField":"Radio one"}	2020-12-27 00:23:31+05:30
fced8887-da40-4331-8800-fa0b6052e895	a9581774-10a6-4712-999a-d03b22d13843	{"radioField":"Radio two"}	2020-12-27 00:23:34+05:30
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: vinay
--

COPY public.forms (id, form_name, form_fields, created_at) FROM stdin;
a9581774-10a6-4712-999a-d03b22d13843	Random form	{"question":"hello world","answerType":"radio","answers":"Radio one\\nRadio two"}	2020-12-27 00:23:27+05:30
\.


--
-- Name: form_responses form_responses_pk; Type: CONSTRAINT; Schema: public; Owner: vinay
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_pk PRIMARY KEY (id);


--
-- Name: forms forms_pk; Type: CONSTRAINT; Schema: public; Owner: vinay
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pk PRIMARY KEY (id);


--
-- Name: form_responses_form_id_idx; Type: INDEX; Schema: public; Owner: vinay
--

CREATE INDEX form_responses_form_id_idx ON public.form_responses USING btree (form_id);


--
-- Name: form_responses form_responses_fk; Type: FK CONSTRAINT; Schema: public; Owner: vinay
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_fk FOREIGN KEY (form_id) REFERENCES public.forms(id);


--
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: vinay
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_ddl();


ALTER EVENT TRIGGER postgraphile_watch_ddl OWNER TO vinay;

--
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: vinay
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_drop();


ALTER EVENT TRIGGER postgraphile_watch_drop OWNER TO vinay;

--
-- PostgreSQL database dump complete
--

