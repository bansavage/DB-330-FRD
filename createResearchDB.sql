# ISTE 330 CHRIS DOMINIC KAT KYLE

drop database if exists researchDB;

create database researchDB;

use researchDB;

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
searchable_keywords varchar(45),
primary key(searchable_keywords_id)
);


drop table if exists USERS;

create table USERS(
users_id varchar(64) not null,
fName varchar(45),
lName varchar(45),
username varchar(45),
pass_hash varchar(255),
salt varchar(255),
email varchar(45),
permission varchar(45) not null,
primary key(users_id)
);



drop table if exists PAPER_KEYWORDS;

create table PAPER_KEYWORDS(
paper_keywords_id varchar(64) not null,
keyword varchar(45),
papers_fk varchar(64) not null,
searchable_keywords_fk varchar(64) not null,
primary key(paper_keywords_id, papers_fk, searchable_keywords_fk),
constraint papers_fk foreign key(papers_fk) references PAPERS(papers_id),
constraint searchable_keywords_fk foreign key(searchable_keywords_fk) references SEARCHABLE_KEYWORDS(searchable_keywords_id)
);


drop table if exists PAPERS_USERS_MAP;

create table PAPERS_USERS_MAP(
papers_fk varchar(64) not null,
users_fk varchar(64) not null,
primary key(papers_fk, users_fk),
foreign key(papers_fk) references PAPERS(papers_id),
foreign key(users_fk) references USERS(users_id)
);
