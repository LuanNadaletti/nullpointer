CREATE TABLE questions (
   id SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL,
   title VARCHAR(255) NOT NULL,
   question_text TEXT NOT NULL,
   creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id)
);
