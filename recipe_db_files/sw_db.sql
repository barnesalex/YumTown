/* Created by Andrew Krall 8 */
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
    CONSTRAINT login_delete
        FOREIGN KEY(userid)
        REFERENCES PROFILE(userid)
        ON DELETE CASCADE, -- Will delete the login row associated with the user's id if a user is deleted.
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
    PRIMARY KEY(userid, recipe_id),
    CONSTRAINT saved_recipe_delete
        FOREIGN KEY(userid) 
        REFERENCES PROFILE(userid)
        ON DELETE CASCADE -- Will delete the saved recipes associated with the user's id if a user is deleted.
);