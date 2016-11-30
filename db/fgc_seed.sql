DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS queries;

CREATE TABLE Users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   joinDate timestamp NOT NULL,
   password_digest VARCHAR(255) NOT NULL
   )

CREATE TABLE queries(
   user_id REFERENCES users,
   term VARCHAR(255) NOT NULL,
   searchTime timestamp NOT NULL
   )

