CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"age" INTEGER,
	"color" VARCHAR,
	"transfer" VARCHAR,
	"notes" VARCHAR (250)
	);
	
INSERT INTO "koalas"
	("name", "age", "color","transfer", "notes") 
VALUES
	('Scotty', '4', 'Red', 'true', 'Born in Guatemala'),
	('Jean', '5', 'Green', 'true', 'Allergic to lots of lava'),
	('Ororo', '4', 'Yellow', 'false', 'Loves listening to Paula (Abdul)'),
	('KLeaf', '15', 'Purple', 'false', 'Never refuses a treat'),
	('Charlie', '9', 'Orange', 'true', 'Favorite band is Nirvana'),
	('Betsy', '4', 'Blue', 'true', 'Has a pet iguana');