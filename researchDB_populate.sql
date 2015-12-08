use researchdb;

insert into PAPERS values('1', 'Chrus Adventures', 'follow our journey..', 'citation1');
insert into PAPERS values('2', 'Drumsticks', 'all you need to know about drumsticks', 'citation2');
insert into PAPERS values('3', 'Pulled Pork', 'simply delicious', 'citation3');
insert into PAPERS values('4', 'Chicken', 'yum', 'citation4');
insert into PAPERS values('5', 'Apple', 'fruit red', 'citation5');
insert into PAPERS values('6', 'Orange', 'fruit yum', 'citation6');
insert into PAPERS values('7', 'Banana', 'yellow', 'citation7');


insert into searchable_keywords values('1', 'food');
insert into PAPER_KEYWORDS values ('2', 'word', '1','1');
insert into PAPER_KEYWORDS values ('3', 'word', '2','1');
insert into PAPER_KEYWORDS values ('4', 'word', '3','1');
insert into PAPER_KEYWORDS values ('5', 'word', '4','1');
insert into PAPER_KEYWORDS values ('6', 'word', '5','1');
insert into PAPER_KEYWORDS values ('7', 'word', '6','1');

insert into searchable_keywords values('2', 'fruit');
insert into PAPER_KEYWORDS values ('5', 'word', '7','2');
insert into PAPER_KEYWORDS values ('6', 'word', '1','2');
insert into PAPER_KEYWORDS values ('7', 'word', '2','2');

insert into searchable_keywords values('3', 'meat');
insert into PAPER_KEYWORDS values ('8', 'word', '3','3');
insert into PAPER_KEYWORDS values ('9', 'word', '4','3');
insert into PAPER_KEYWORDS values ('10', 'word', '5','3');

insert into USERS value ('1', 'Kris', 'Brown', 'username', 
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'a@a.edu', 'public');

insert into USERS value ('2', 'John', 'Doe', 'username2', 
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'b@b.edu', 'admin');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('1', '1');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('2', '1');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('3', '1');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('4', '2');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('5', '2');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('6', '2');