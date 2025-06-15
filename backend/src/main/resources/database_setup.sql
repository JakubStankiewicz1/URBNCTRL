-- Create database for URBNCTRL
DROP DATABASE IF EXISTS urbnctrl_db;
CREATE DATABASE urbnctrl_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE urbnctrl_db;

-- Create user for the application (optional, tylko jeśli chcesz dedykowanego użytkownika)
-- DROP USER IF EXISTS 'urbnctrl_user'@'localhost';
-- CREATE USER 'urbnctrl_user'@'localhost' IDENTIFIED BY 'urbnctrl_password';
-- GRANT ALL PRIVILEGES ON urbnctrl_db.* TO 'urbnctrl_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Sprawdź czy baza została utworzona
SHOW DATABASES LIKE 'urbnctrl_db';

-- Sprawdź czy możesz się połączyć jako root
SELECT USER(), DATABASE();
