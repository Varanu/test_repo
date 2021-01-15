CREATE DATABASE CityInfo;

USE CityInfo;

CREATE TABLE Users(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
)ENGINE = InnoDB;

CREATE TABLE Evenimente(
	id_e INT NOT NULL PRIMARY KEY,
    nume VARCHAR(100),
    descriere VARCHAR(100),
    data_eveniment VARCHAR(100),
    locatie VARCHAR(100)
)ENGINE = InnoDB;

CREATE TABLE Hotels(
	id_h INT NOT NULL PRIMARY KEY,
    nume VARCHAR(100),
    descriere VARCHAR(100),
    pret FLOAT,
    adresa VARCHAR(100)
)ENGINE = InnoDB;

CREATE TABLE Restaurants(
	id_r INT NOT NULL PRIMARY KEY,
    nume VARCHAR(100),
    adresa VARCHAR(100),
    link VARCHAR(100)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Mobility(
	id_m INT NOT NULL PRIMARY KEY,
    nume_firma VARCHAR(100),
    nr_telefon VARCHAR(100),
    tarif FLOAT
)ENGINE = InnoDB;

CREATE TABLE Visiting(
	id_v INT NOT NULL PRIMARY KEY,
    locatie VARCHAR(100),
    descriere VARCHAR(100)
)ENGINE = InnoDB;

CREATE TABLE Shopping(
	id_s INT NOT NULL PRIMARY KEY,
    denumire VARCHAR(100),
    descriere VARCHAR(100),
    adresa VARCHAR(100)
)ENGINE = InnoDB;

CREATE TABLE RatingsEvenimente(
	id_ra INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_e INT NOT NULL,
    rating_1 INT,
    rating_2 INT,
    rating_3 INT,
    rating_4 INT,
    rating_5 INT,
    FOREIGN KEY (id_e) REFERENCES Evenimente(id_e)
)ENGINE = InnoDB;

CREATE TABLE RatingsRestaurants(
	id_ra INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_r INT NOT NULL,
    rating_1 INT,
    rating_2 INT,
    rating_3 INT,
    rating_4 INT,
    rating_5 INT,
    FOREIGN KEY (id_r) REFERENCES Restaurants(id_r)
)ENGINE = InnoDB;

CREATE TABLE UsersRestaurants(
	id_ur INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_u INT NOT NULL,
    id_r INT NOT NULL,
    FOREIGN KEY (id_r) REFERENCES Restaurants(id_r),
    FOREIGN KEY (id_u) REFERENCES Users(id)
)ENGINE = InnoDB;

INSERT INTO Users
VALUES
(1, "Denis", "denis@yahoo.com", "$2a$08$O9GkG3H/IE6f.qKqmOB07.q9dV8By5pfBTEvJ1k.q2hgj6MT/RZYi"),
(2, "Andrei", "andrei@yahoo.com", "$2a$08$tYrby4FS3RuS7InlDejNku.Fz.wEwG6nVkxBRBy8Hdpf5Nt40AC.q");

INSERT INTO Restaurants
VALUES
(1, "Hanul Dacilor", "Strada Alexandru Vaida Voievod", "https://casa-dacilor.ro/rezerva-masa/"),
(2, "Roata", "Strada Alexandru Ioan Ciurea 6", "http://www.restaurant-roata.ro/"),
(3, "Restaurant Valachia", "Strada Govora 27", "http://www.restaurantvalachia.ro/contact"),
(4, "Casa Maramureseana", "Bulevardul 21 Decembrie 1989", "http://casa-maramureseana.ro/contact/"),
(5, "Zama", "Strada Napoca 16", "https://zamabistro.ro/contact/"),
(6, "Crama Haiducilor", "Strada Comotei 12-14", "https://cramahaiducilorcluj.ro/"),
(7, "Napoli Centrale", "Strada Dobrogeanu Gherea", "https://www.pizzerianapolicentrale.ro/contact"),
(8, "Pizza Acrobatica", "Strada Avram Iancu 13", "https://acrobatica.ro/contact-adresa/"),
(9, "Cut & Crust", "Strada Donath 65", "https://www.cutandcrust.ro/cutandcrust-contact"),
(10, "Pizza Venezia", "Strada Observatorului 90", "http://www.pizza-venezia.ro/contact"),
(11, "Toskana", "Strada Hașdeu 1", "http://www.pizzeriatoskana.ro/contact-pizzeria-restaurant-toskana-cluj/"),
(12, "Gente Senior", "Strada Horea 5", "http://www.gentepizza.ro/contact/"),
(13, "Big Belly", "Calea Mănăștur 68", "https://www.bigbelly-cluj.ro/contact"),
(14, "Pizzeria D'Autore", "Calea Turzii 123", "https://pizzeriadautore.ro/contact/"),
(15, "Samsara Foodhouse", "Strada Cardinal Iuliu Hossu", "https://www.opentable.com/r/samsara-foodhouse-cluj-napoca-6"),
(16, "Indigo", "Strada Piezișă 12-14", "https://indigorestaurant.ro/contact/"),
(17, "Tokyo", "Strada Gheorghe Marinescu 5", "https://tokyorestaurant.ro/bookings/?lang=en"),
(18, "Carrousel", "Strada George Coșbuc 14", "https://www.chios.ro/rezervari-duplicate-1/"),
(19, "Rochelle", "Strada Traian 2", "http://www.rochellerestaurant.ro/"),
(20, "Zucca Bistro", "Strada Louis Pasteur 74", "https://zucca.ro/"),
(21, "Rod", "Calea Turzii 160", "https://restaurantrod.ro/rezervari/"),
(22, "Adi Steak House", "Strada Andrei Mureșanu 5", "http://www.adisteakhouse.ro/rezervare/"),
(23, "Meat Up", "Strada Gheorghe Șincai 16", "https://meatupburgerbar.business.site/#details"),
(24, "Klausen Pub", "Strada Georges Clemenceau 1", "https://www.facebook.com/klausen.pubhouse/"),
(25, "Osteria del Buon Vino", "Calea Dorobanților 7", "https://www.osteriadelbuonvino.ro/reservations/"),
(26, "Marty", "Strada Alexandru Vaida Voievod", "https://martyrestaurants.ro/#rezevari"),
(27, "Burger House", "Strada Emil Isac 15", "http://www.burgerhouse.ro/"),
(28, "California Burger", "Strada George Barițiu 20", "https://www.facebook.com/californiaburger.cluj/"),
(29, "Da Vinci", "Strada Fagului 87", "https://davinciristorante.ro/contact/"),
(30, "Dolce Vita", "Strada Piezișă 24", "https://www.dolce-vita.ro/contact/"),
(31, "Luvaria", "Strada Avram Iancu 29", "https://www.facebook.com/Luvaria"),
(32, "Hugo Restaurants", "Bulevardul 21 Decembrie 1989", "https://www.hugorestaurants.ro/contact/"),
(33, "Baracca", "Strada Napoca 8A", "https://www.baracca.ro/"),
(34, "Bujole", "Piața Unirii 15", "http://www.bujole.com/locations"),
(35, "Maimuța Plângătoare", "Strada Emil Isac 3", "https://maimutaplangatoare.ro/rezervari/"),
(36, "Toulouse", "Piața Unirii 12", "https://toulouse.ro/contact/"),
(37, "Manger", "Strada Regele Ferdinand 23", "http://www.manger.ro/"),
(38, "25th) downtown flavours", "Piața Unirii 5", "https://25th.ro/"),
(39, "Restaurant Livada", "Strada Clinicilor 14", "https://www.livadarestaurant.ro/contact/"),
(40, "Casa TIFF", "Piața Universității 6", "https://casatiff.ro/contact/"),
(41, "Panoramic Cetățuie", "Strada Șerpuitoare 1", "https://panoramic-cluj.ro/contact/"),
(42, "Aroma Restaurant", "Calea Turzii 295", "https://www.restaurant-aroma.ro/contact");

INSERT INTO Evenimente
VALUES
(1, "Jazz in the Park", "Eveniment de Jazz", "02-12-2020", "Parcul Central"),
(2, "Untold", "Eveniment cu muzica diversa", "01-08-2020", "Parcul Central");

INSERT INTO RatingsEvenimente
VALUES
(1, 1, 1, 2, 3, 4, 2),
(2, 2, 0, 0, 0, 2, 1);

INSERT INTO RatingsRestaurants
VALUES
(1, 1, 64, 41, 9, 6, 76), 
(2, 2, 60, 20, 93, 99, 18), 
(3, 3, 34, 1, 33, 49, 77), 
(4, 4, 56, 80, 49, 11, 68), 
(5, 5, 13, 42, 22, 87, 51), 
(6, 6, 84, 46, 91, 88, 82), 
(7, 7, 4, 12, 18, 11, 86), 
(8, 8, 89, 83, 91, 5, 22), 
(9, 9, 2, 59, 18, 8, 67), 
(10, 10, 80, 13, 59, 97, 86), 
(11, 11, 91, 88, 98, 42, 16), 
(12, 12, 63, 75, 76, 41, 55), 
(13, 13, 82, 99, 52, 98, 27), 
(14, 14, 99, 18, 36, 83, 6), 
(15, 15, 37, 64, 20, 67, 48), 
(16, 16, 91, 74, 36, 25, 4), 
(17, 17, 50, 98, 38, 50, 2), 
(18, 18, 55, 35, 20, 17, 30), 
(19, 19, 91, 90, 97, 30, 41), 
(20, 20, 50, 38, 77, 88, 90), 
(21, 21, 41, 7, 76, 30, 18), 
(22, 22, 63, 80, 50, 4, 91), 
(23, 23, 61, 45, 48, 51, 55), 
(24, 24, 45, 77, 9, 59, 43), 
(25, 25, 91, 28, 10, 16, 47), 
(26, 26, 51, 5, 37, 3, 42), 
(27, 27, 34, 40, 63, 90, 99), 
(28, 28, 7, 39, 98, 34, 23), 
(29, 29, 55, 46, 77, 95, 18), 
(30, 30, 9, 11, 34, 36, 52), 
(31, 31, 77, 60, 76, 56, 75), 
(32, 32, 8, 53, 85, 51, 23), 
(33, 33, 87, 49, 61, 21, 18), 
(34, 34, 37, 96, 21, 28, 28), 
(35, 35, 89, 27, 57, 33, 46), 
(36, 36, 70, 81, 62, 34, 41), 
(37, 37, 17, 83, 91, 91, 94), 
(38, 38, 94, 77, 70, 62, 62), 
(39, 39, 51, 97, 29, 30, 4), 
(40, 40, 78, 78, 86, 41, 15), 
(41, 41, 32, 38, 66, 76, 12), 
(42, 42, 44, 18, 7, 68, 80);

INSERT INTO UsersRestaurants
VALUES
(1, 2, 1);