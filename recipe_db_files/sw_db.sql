DROP TABLE IF EXISTS LOGIN;
DROP TABLE IF EXISTS SAVED_RECIPES;
DROP TABLE IF EXISTS RECIPE_INGREDIENTS;
DROP TABLE IF EXISTS INGREDIENTS;
DROP TABLE IF EXISTS PROFILE;

CREATE TABLE PROFILE(
	userid varchar(255),
	name varchar(255),
	dob date,
	gender varchar(255),
	profession varchar(255),
	affiliation varchar(255),
	PRIMARY KEY(userid)
);

CREATE TABLE LOGIN(
	userid varchar(255),
	username varchar(255),
	password varchar(255),
    FOREIGN KEY(userid) REFERENCES PROFILE(userid),
	PRIMARY KEY(userid, username)
);

/*CREATE TABLE RECIPES(
	recipe_id varchar(255),
	dishname varchar(255),
	category varchar(255),
	recipe_name varchar(255),
	description varchar(255),
	PRIMARY KEY(recipe_id)
);*/

CREATE TABLE SAVED_RECIPES( 
	userid varchar(255),
	recipe_id varchar(255),
    dishname varchar(255),
	category varchar(255),
	recipe_name varchar(255),
	description varchar(255),
	price decimal(18,4),
    PRIMARY KEY(userid, recipe_id),
    CONSTRAINT deleted_key
        FOREIGN KEY(userid) 
        REFERENCES PROFILE(userid)
        ON DELETE CASCADE -- I have it cascade deletion on row deletion here because if a record in the saved_recipes table is deleted, then the corresponding recipe_ingredients entry should also be deleted, since each saved recipe will create a new recipe_ingredients entry.
);

CREATE TABLE INGREDIENTS(
	ingredient_name varchar(255),
	store_location varchar(255),
	store_id varchar(255),
	price decimal(18,4),
    PRIMARY KEY(ingredient_name)
);

CREATE TABLE RECIPE_INGREDIENTS(
	recipe_id varchar(255),
	ingredient_name varchar(255),
	quantity varchar(255),
    FOREIGN KEY(ingredient_name) REFERENCES INGREDIENTS(ingredient_name),
    PRIMARY KEY(recipe_id, ingredient_name)
);
