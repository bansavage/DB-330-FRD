drop database if exists researchDB;
create database researchDB;

use researchDB;

drop table if exists PERMISSIONS;

create table PERMISSIONS(
permissions_id varchar(64) not null,
level varchar(45),
primary key(permissions_id)
);

drop table if exists PAPERS;

create table PAPERS(
papers_id varchar(64) not null,
title varchar(45),
abstract TEXT,
citation varchar(45),
primary key(papers_id)
);

drop table if exists SEARCHABLE_KEYWORDS;
create table SEARCHABLE_KEYWORDS(
searchable_keywords_id varchar(64) not null,
searchable_keyword varchar(45),
primary key(searchable_keywords_id)
);

drop table if exists USERS;

create table USERS(
users_id varchar(64) not null,
fName varchar(45),
lName varchar(45),
username varchar(45),
password varchar(255),
email varchar(45),
permissions_fk varchar(64) not null,
primary key(users_id, permissions_fk),
foreign key(permissions_fk) references PERMISSIONS(permissions_id)
);


drop table if exists AUTH_TOKEN;

create table AUTH_TOKEN(
auth_token_id varchar(64) not null,
value varchar(255),
users_fk varchar(64) not null,
primary key(auth_token_id, users_fk),
foreign key(users_fk) references USERS(users_id)
);

drop table if exists PAPER_KEYWORDS;

create table PAPER_KEYWORDS(
papers_fk varchar(64) not null,
searchable_keywords_fk varchar(64) not null,
primary key(papers_fk, searchable_keywords_fk),
foreign key(papers_fk) references PAPERS(papers_id),
foreign key(searchable_keywords_fk) references SEARCHABLE_KEYWORDS(searchable_keywords_id)
);

drop table if exists AUTHORSHIP;

create table AUTHORSHIP(
papers_fk varchar(64) not null,
users_fk varchar(64) not null,
foreign key(papers_fk) references PAPERS(papers_id),
foreign key(users_fk) references USERS(users_id)
);
