CREATE DATABASE form_db;
USE form_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    biography TEXT,
    contract BOOLEAN NOT NULL
);

CREATE TABLE languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

INSERT INTO languages (name) VALUES
('Pascal'), ('C'), ('C++'), ('JavaScript'), ('PHP'),
('Python'), ('Java'), ('Haskel'), ('Clojure'),
('Prolog'), ('Scala'), ('Go');

CREATE TABLE user_languages (
    user_id INT,
    language_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (language_id) REFERENCES languages(id)
);