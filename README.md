# sql script

CREATE TABLE companies
(
company_id SERIAL NOT NULL UNIQUE ,
company_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE employees
(
employee_id SERIAL NOT NULL ,
employee_name VARCHAR(255) NOT NULL,
employee_civilId VARCHAR(255) NOT NULL UNIQUE,
company_id INT REFERENCES companies(company_id)
);

INSERT INTO companies (company_name)
VALUES ('renardet');

INSERT INTO employees (employee_name, employee_civilId, company_id)
VALUES ('Giorgio Barboni', 123456, 1);

future plans:

1. when you delete company, delete its empliyees
2. make it so that u can't submit with out selecting a date
3. edge case: when i press home page login text on button disapears
4. refactor code (make it clean), useReducer?
