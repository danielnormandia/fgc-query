DROP TABLE IF EXISTS users;

CREATE TABLE Users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   joinDate timestamp NOT NULL,
   password_digest VARCHAR(255) NOT NULL
   )
