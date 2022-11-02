/*Create tables if the tables do not exist */
CREATE TABLE IF NOT EXISTS CUSTOMER (ID int, Name VARCHAR(255), AMOUNT int, BROKER_ID int );
CREATE TABLE IF NOT EXISTS BROKER (ID int, Name VARCHAR(255) );

/*Insert data as shown in the description */

/*Insert data into customer table */
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (1,"sam",3000,4); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (2,"john",4000,2); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (3,"mack",5000,2); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (4,"test",3000,3); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (5,"june",2000,3); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (6,"mike",4000,1); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (7,"annie",4000,2); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (8,"micheal",2000,1); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (9,"tom",2000,4); 
INSERT INTO CUSTOMER (Id, Name, AMOUNT, BROKER_ID)
VALUES (10,"jason",6000,4); 

/*Insert data into broker table */
INSERT INTO BROKER (Id, Name)
VALUES (1,"Ted"); 
INSERT INTO BROKER (Id, Name)
VALUES (2,"Mark"); 
INSERT INTO BROKER (Id, Name)
VALUES (3,"Aaron");
INSERT INTO BROKER (Id, Name)
VALUES (4,"Luke"); 

/*Query to get the desired result - getting a summary of number of customers under a broker */
SELECT BROKER.name, COUNT(CUSTOMER.Id) as Customers_Count
FROM CUSTOMER
LEFT JOIN BROKER
on BROKER.Id = CUSTOMER.BROKER_ID
GROUP BY BROKER.Id
ORDER BY Customers_Count DESC, BROKER.name ASC;





