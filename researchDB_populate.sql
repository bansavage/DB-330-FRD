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
insert into PAPER_KEYWORDS values ('3', 'word', '1','1');
insert into PAPER_KEYWORDS values ('4', 'word', '1','1');
insert into PAPER_KEYWORDS values ('5', 'word', '1','1');
insert into PAPER_KEYWORDS values ('6', 'word', '1','1');
insert into PAPER_KEYWORDS values ('7', 'word', '1','1');

insert into searchable_keywords values('2', 'fruit');
insert into PAPER_KEYWORDS values ('5', 'word', '1','2');
insert into PAPER_KEYWORDS values ('6', 'word', '1','2');
insert into PAPER_KEYWORDS values ('7', 'word', '1','2');

insert into searchable_keywords values('3', 'meat');
insert into PAPER_KEYWORDS values ('8', 'word', '1','3');
insert into PAPER_KEYWORDS values ('9', 'word', '1','3');
insert into PAPER_KEYWORDS values ('10', 'word', '1','3');

insert into PERMISSIONS value ('0', 'public');

insert into USERS value ('1', 'first', 'last', 'username', 'pass_hash', 'a@a.edu', '0');