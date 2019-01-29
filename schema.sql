/*  Execute this file from the command line by typing:
 *    sqlite3 groceries.db < schema.sql
 *  to execute the queries in this file.
 */

/* 
  # insert 3 groceries of your choice
*/

DROP TABLE groceries;

CREATE TABLE groceries (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL
);

INSERT INTO groceries (id, name, quantity) values (1, 'Ben & Jerrys', 22);
INSERT INTO groceries (id, name, quantity) values (2, 'gummy worms', 12);
INSERT INTO groceries (id, name, quantity) values (3, 'gummy bears', 12);


