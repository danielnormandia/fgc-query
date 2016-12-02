DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS queries CASCADE;

CREATE TABLE Users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   joinDate timestamp NOT NULL,
   password_digest VARCHAR(255) NOT NULL
   );

CREATE TABLE queries(
   id SERIAL PRIMARY KEY,
   user_id integer REFERENCES users(id),
   term VARCHAR(255) NOT NULL,
   searchTime timestamp NOT NULL,
   type VARCHAR(1) NOT NULL
   );

