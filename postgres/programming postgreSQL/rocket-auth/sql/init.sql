drop schema if exists membership CASCADE;

create schema membership;
set search_path = membership;

select 'Schema initialized' as result;

create EXTENSION if not EXISTS pgcrypto with schema membership;
