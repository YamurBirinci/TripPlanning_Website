-- Drop the existing database if it exists
DROP DATABASE IF EXISTS tripPlannerDB;

CREATE DATABASE IF NOT EXISTS tripPlannerDB;

USE tripPlannerDB;

CREATE TABLE user (
    userID BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    mail VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(10)
);


CREATE TABLE Hotel (
    hotelID INT PRIMARY KEY AUTO_INCREMENT,
    hotel_name VARCHAR(255),
    address VARCHAR(255),
    star INT NOT NULL,
    status VARCHAR(50),
    userID BIGINT,
    FOREIGN KEY (userID) REFERENCES user(userID)
);

select * from Hotel;


CREATE TABLE Explore (
    exploreID INT PRIMARY KEY AUTO_INCREMENT,
    explore_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    star INT NOT NULL
);


CREATE TABLE Hotel_Explore (
    hotelID INT,
    exploreID INT,
    PRIMARY KEY (hotelID, exploreID),
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID),
    FOREIGN KEY (exploreID) REFERENCES Explore(exploreID)
);

CREATE TABLE ExploreReview (
    reviewID INT PRIMARY KEY AUTO_INCREMENT,
    review_text TEXT NOT NULL,
    rate INT NOT NULL,
    exploreID INT,
    FOREIGN KEY (exploreID) REFERENCES Explore(exploreID)
);

CREATE TABLE Room (
    room_typeID INT PRIMARY KEY AUTO_INCREMENT,
    hotelID INT,
    room_size VARCHAR(255),
    max_adults INT,
    max_children INT,
    daily_price DOUBLE,
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID)
);

CREATE TABLE Amenity (
	hotelID INT,
    amenityID INT PRIMARY KEY AUTO_INCREMENT,
    amenity_name VARCHAR(255),
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID)
);


CREATE TABLE Review (
    reviewID INT PRIMARY KEY AUTO_INCREMENT,
    review_text TEXT,
    hotelID INT,
    cleanliness_rating INT,
    location_rating INT,
    staff_rating INT,
    userID BIGINT,
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID)
);


CREATE TABLE Hotelimages (
    imageID INT PRIMARY KEY AUTO_INCREMENT,
    imageURL VARCHAR(255),
    hotelID INT,
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID)
);

CREATE TABLE Exploreimages (
    imageID INT PRIMARY KEY AUTO_INCREMENT,
    imageURL VARCHAR(255),
    exploreID INT,
    FOREIGN KEY (exploreID) REFERENCES Explore(exploreID)
);

CREATE TABLE Reservation (
    reservationID BIGINT PRIMARY KEY AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    room_typeID INT,
    hotelID INT,
    userID BIGINT,
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID)
);

INSERT INTO Explore (explore_name, address, star) VALUES 
('Explore Park', '123 Main St', 4),
('Explore Museum', '456 Elm St', 5),
('Explore Beach', '789 Ocean Ave', 3);

INSERT INTO Exploreimages (imageURL, exploreID) VALUES 
('../images/Angeles1.PNG', 1),
('../images/Angeles2.PNG', 1),
('../images/Angeles3.PNG', 2),
('../images/Angeles4.PNG', 3),
('../images/Angeles5.PNG', 2),
('../images/Angeles6.PNG', 1),
('../images/Angeles1.PNG', 1),
('../images/Angeles2.PNG', 2),
('../images/Angeles3.PNG', 2),
('../images/Angeles4.PNG', 3);

INSERT INTO user (first_name, last_name, mail, password, role) VALUES 
('John', 'Doe', 'john.doe@example.com', 'password123', 'customer'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'customer'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password789', 'customer'),
('Bob', 'Brown', 'bob.brown@example.com', 'password111', 'customer'),
('Emily', 'Davis', 'emily.davis@example.com', 'password222', 'customer'),
('Michael', 'Scott', 'michael.scott@dundermifflin.com', 'password123', 'owner'),
('Dwight', 'Schrute', 'dwight.schrute@dundermifflin.com', 'password456', 'owner'),
('Jim', 'Halpert', 'jim.halpert@dundermifflin.com', 'password789', 'owner'),
('Pam', 'Beesly', 'pam.beesly@dundermifflin.com', 'password111', 'admin'),
('Stanley', 'Hudson', 'stanley.hudson@dundermifflin.com', 'password222', 'admin');

INSERT INTO Hotel (hotel_name, address, star, status, userID) VALUES 
('Hotel Angeles Center', 'Calle Juan De Mata Carriazo 7, Seville, Spain', 4, 'Active',6),
('Hotel Cervantes', 'Old Town, Seville, Spain', 5, 'Active',7),
('Torre Melina', 'Barselona, Spain', 3, 'Pending',8),
('Gran Hotel Miramar', 'Paseo de Reding 22, Málaga, Spain', 5, 'Pending',7),
('Hotel Ritz', 'Plaza de la Lealtad 5, Madrid, Spain', 5, 'Pending',6),
('Hotel Deneme', 'Uskudar / Istanbul', 5, 'Pending',6);

INSERT INTO Room (hotelID, room_size, max_adults, max_children, daily_price) VALUES 
(1, 'Single Room', 1, 0, 100.00),
(1, 'Double Room', 2, 1, 150.00),
(2, 'Suite', 3, 2, 300.00),
(2, 'Standard Room', 2, 2, 200.00),
(3, 'Luxury Room', 2, 3, 400.00),
(3, 'Family Room', 4, 4, 500.00),
(4, 'Presidential Suite', 2, 0, 600.00),
(4, 'Deluxe Room', 3, 2, 250.00),
(5, 'Superior Room', 2, 1, 350.00),
(5, 'Junior Suite', 3, 2, 450.00),
(6, 'Single Room', 1, 1, 50.00),
(6, 'Single Room', 1, 1, 50.00),
(6, 'Deluxe Room', 3, 2, 150.00),
(6, 'Family Room', 4, 1, 250.00);

INSERT INTO Amenity (hotelID, amenity_name) VALUES 
(1, 'wifi'),
(6, 'pool'),
(6, 'gym'),
(6, 'briefcase'),
(3, 'smoking'),
(2, 'Restaurant'),
(4, 'wheelchair'),
(4, 'bus'),
(5, 'breakfast'),
(6, 'pets'),
(1, 'tennis'),
(5, 'parking'),
(6, 'spa'),
(5, 'golf'),
(2, 'game');

INSERT INTO Review (review_text, cleanliness_rating, location_rating, staff_rating, hotelID,userID) VALUES 
('Great service and location!', 5, 5, 5, 1,1),
('Excellent experience, will come again.', 4, 4, 4, 2,2),
('Very comfortable and pleasant stay.', 5, 5, 5, 3,2),
('Absolutely amazing, worth every penny.', 5, 5, 5, 4,1),
('Best hotel experience ever!', 5, 5, 5, 5,1),
('Yorum1!', 5, 5, 5, 6,2),
('Yorums!', 5, 5, 5, 6,2);

INSERT INTO Hotelimages (imageURL, hotelID) VALUES 
('../images/Angeles1.PNG', 1),
('../images/Angeles2.PNG', 1),
('../images/Angeles3.PNG', 1),
('../images/Angeles4.PNG', 1),
('../images/Angeles3.PNG', 2),
('../images/Angeles4.PNG', 3),
('../images/Angeles5.PNG', 4),
('../images/Angeles6.PNG', 5),
('../images/Angeles1.PNG', 6),
('../images/Angeles2.PNG', 6),
('../images/Angeles3.PNG', 6),
('../images/Angeles4.PNG', 6);

INSERT INTO Hotel_Explore (hotelID, exploreID)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 3),
       (1, 3);

INSERT INTO ExploreReview (review_text, rate, exploreID)
VALUES ('Amazing place to visit!', 5, 1),
       ('Beautiful architecture.', 4, 1),
       ('A must-see landmark.', 5, 2),
       ('Great view and atmosphere.', 4, 3);
       
INSERT INTO Reservation (start_date, end_date, room_typeID, hotelID, userID) VALUES 
('2024-03-14', '2024-03-15', 1, 1, 1),
('2024-03-14', '2024-03-16', 2, 1, 2),
('2024-03-15', '2024-03-17', 3, 2, 3),
('2024-03-16', '2024-03-18', 4, 2, 1),
('2024-03-17', '2024-03-19', 5, 3, 2),
('2024-06-17', '2024-06-25', 2, 1, 2),
('2024-03-18', '2024-03-20', 6, 3, 3),
('2024-04-10', '2024-04-15', 7, 4, 4),
('2024-04-20', '2024-04-25', 8, 4, 5),
('2024-05-01', '2024-05-05', 9, 5, 1),
('2024-05-10', '2024-05-15', 10, 5, 2),
('2024-07-01', '2024-07-05', 12, 6, 1),
('2024-07-10', '2024-07-15', 13, 6, 2);

select * from reservation;



USE tripPlannerDB;
select * from review;
select * from user where role = "owner";

select * from hotel where status = "pending" ;

select * from reservation;


SELECT DISTINCT h.*, rt.room_typeID, rt.room_size, rt.daily_price, MIN(hi.imageURL) as imageURL
FROM Hotel h
JOIN Room rt ON h.hotelID = rt.hotelID
LEFT JOIN Hotelimages hi ON h.hotelID = hi.hotelID
LEFT JOIN Reservation r ON h.hotelID = r.hotelID AND rt.room_typeID = r.room_typeID 
  AND ((( '2024-06-07' < r.start_date AND '2024-06-7' < r.end_date)
    OR ( '2024-06-07' > r.end_date AND '2024-06-7' > r.end_date)))
    AND not ( '2024-06-07' = r.start_date AND '2024-06-7' = r.end_date)
    where rt.max_adults >= 1
  AND rt.max_children >= 1
  AND (r.reservationID IS NULL)
  AND h.status = 'Active'
GROUP BY h.hotelID, rt.room_typeID, rt.room_size, rt.daily_price;