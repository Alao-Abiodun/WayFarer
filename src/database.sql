CREATE DATABASE WayFarer_db;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 'true'
);

INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES ('alao43844@gmail.com', 'abiodun', 'alao', 'devmean2020', 'false');
INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES ('abiodundev@gmail.com', 'alao', 'abiodun', 'abiodun10620', 'true');
INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES ('joshking@gmail.com', 'joshua', 'olaniyi', 'josking2001', 'false');


CREATE TABLE buses(
    bid BIGSERIAL PRIMARY KEY,
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(100) NOT NULL,
    capacity INT NOT NULL
);

INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ('4739DJSKD', 'Innoson', 'v5', '2019', 30);
INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ('SJDKS2389', 'Benz', 'Mex', '2020', 25);
INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ('JS743JS8H', 'Corolla', 'Six5', '2021', 15);



CREATE TABLE trips(
    tid BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    bus_id INT NOT NULL REFERENCES buses(bid),
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    fare FLOAT DEFAULT 00.000,
    status BOOLEAN DEFAULT 'true'
);

INSERT INTO trips (user_id, bus_id, origin, destination, trip_date, fare, status) VALUES (7, 1, 'lagos', 'lokoja', '2020-08-16', 156.000, 'true');
INSERT INTO trips (user_id, bus_id, origin, destination, trip_date, fare, status) VALUES (8, 2, 'lagos', 'jos', '2020-10-16', 200.000,'true');
INSERT INTO trips (user_id, bus_id, origin, destination, trip_date, fare, status) VALUES (9, 3, 'jos', 'lokoja', '2020-08-16', 350.000,'true');

CREATE TABLE bookings(
    bid BIGSERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trips(tid),
    user_id INT NOT NULL REFERENCES users(id),
    created_on TIMESTAMP NOT NULL
);

INSERT INTO bookings (trip_id, user_id, created_on) VALUES (2, 1, '2020-08-16');
INSERT INTO bookings (trip_id, user_id, created_on) VALUES (3, 2, '2020-10-16');
INSERT INTO bookings (trip_id, user_id, created_on) VALUES (4, 3, '2020-12-16');

