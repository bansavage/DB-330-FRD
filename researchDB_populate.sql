use researchdb;

insert into PAPERS values('1', 'Chrus Adventures', 'follow our journey duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck', 'citation1');
insert into PAPERS values('2', 'Drumsticks', 'all you need to know about drumsticks', 'citation2');
insert into PAPERS values('3', 'Pulled Pork', 'simply delicious', 'citation3');
insert into PAPERS values('4', 'Chicken', 'yum', 'citation4');
insert into PAPERS values('5', 'Apple', 'fruit red', 'citation5');
insert into PAPERS values('6', 'Orange', 'fruit yum', 'citation6');
insert into PAPERS values('7', 'Banana', 'yellow', 'citation7');
insert into PAPERS values('8', 'The Heart', 'Biology', 'citation8');
insert into PAPERS values('9', 'The Feets', 'Biology', 'citation9');
insert into PAPERS values('10', 'Eggs', 'Biology', 'citation10');
insert into PAPERS values('11', 'Falling from a Tree', 'Physics', 'citation11');
insert into PAPERS values('12', 'Breaking the Laws', 'Physics', 'citation12');
insert into PAPERS values('13', 'Magiks', 'Physics', 'citation13');
insert into PAPERS values('14', 'Playing with Fire', 'Chemistry', 'citation14');
insert into PAPERS values('15', 'Some H2O2', 'Chemistry', 'citation15');
insert into PAPERS values('16', 'NaBrO', 'Chemistry', 'citation16');
insert into PAPERS values('17', 'Heisenberg Principle', 'Chemistry', 'citation17');
insert into PAPERS values('18', 'Greenhouse Effect', 'Environment', 'citation18');
insert into PAPERS values('19', 'Primate Language', 'Communication', 'citation19');
insert into PAPERS values('20', 'Nanotechnology', 'Technology', 'citation20');
insert into PAPERS values('21', 'Animal Reintroduction', 'Ecology', 'citation21');


insert into searchable_keywords values('1', 'food');
insert into PAPER_KEYWORDS values ('2', 'word', '1','1');
insert into PAPER_KEYWORDS values ('3', 'word', '2','1');
insert into PAPER_KEYWORDS values ('4', 'word', '3','1');
insert into PAPER_KEYWORDS values ('5', 'word', '4','1');
insert into PAPER_KEYWORDS values ('6', 'word', '5','1');
insert into PAPER_KEYWORDS values ('7', 'word', '6','1');

insert into searchable_keywords values('2', 'fruit');
insert into PAPER_KEYWORDS values ('8', 'word', '5','2');
insert into PAPER_KEYWORDS values ('9', 'word', '6','2');
insert into PAPER_KEYWORDS values ('10', 'word', '7','2');

insert into searchable_keywords values('3', 'meat');
insert into PAPER_KEYWORDS values ('11', 'word', '2','3');
insert into PAPER_KEYWORDS values ('12', 'word', '3','3');
insert into PAPER_KEYWORDS values ('13', 'word', '4','3');

insert into searchable_keywords values('4', 'science');
insert into PAPER_KEYWORDS values ('14', 'biology', '8','4');
insert into PAPER_KEYWORDS values ('15', 'biology', '9','4');
insert into PAPER_KEYWORDS values ('16', 'biology', '10','4');
insert into PAPER_KEYWORDS values ('17', 'physics', '11','4');
insert into PAPER_KEYWORDS values ('18', 'physics', '12','4');
insert into PAPER_KEYWORDS values ('19', 'physics', '13','4');
insert into PAPER_KEYWORDS values ('20', 'chemistry', '14','4');
insert into PAPER_KEYWORDS values ('21', 'chemistry', '15','4');
insert into PAPER_KEYWORDS values ('22', 'chemistry', '16','4');
insert into PAPER_KEYWORDS values ('23', 'chemistry', '17','4');
insert into PAPER_KEYWORDS values ('24', 'environment', '18','4');
insert into PAPER_KEYWORDS values ('25', 'communication', '19','4');
insert into PAPER_KEYWORDS values ('26', 'technology', '20','4');
insert into PAPER_KEYWORDS values ('27', 'animal', '21','4');

insert into USERS value ('1', 'Kris', 'Brown', 'username1',
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'k@b.edu', 'public');

insert into USERS value ('2', 'Jon', 'Lee', 'username2',
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'j@l.edu', 'student');

insert into USERS value ('3', 'Joe', 'Doe', 'username3',
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'j@d.edu', 'faculty');

insert into USERS value ('4', 'Boss', 'Guy', 'username4',
'd6e08cfee902d484a95c5ccd4a34c2b60065ed1120293f8c99ac6ca2e9ed81fb',
'3e0e71c7dcd5f79f7fddd9a5148e9fcb3973803440e940a55df2c3f526765d49',
'b@g.edu', 'admin');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('1', '1');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('2', '1');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('3', '1');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('3', '2');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('4', '2');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('5', '2');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('6', '2');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('7', '3');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('8', '3');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('9', '3');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('10', '3');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('11', '3');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('12', '3');

insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('13', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('14', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('15', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('16', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('17', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('18', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('19', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('20', '4');
insert into PAPERS_USERS_MAP (papers_fk, users_fk) value ('21', '4');
