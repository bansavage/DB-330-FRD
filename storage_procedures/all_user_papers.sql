use researchdb;

delimiter //

drop procedure if exists `all_user_papers` //

create procedure all_user_papers (in p_users_id varchar(64))

begin
	select title, abstract, citation, keyword, searchable_keywords from users
    inner join papers_users_map
    on papers_users_map.users_fk = users.users_id
    inner join papers
    on papers_users_map.papers_fk = papers.papers_id
    inner join paper_keywords
    on paper_keywords.papers_fk = papers.papers_id
    inner join searchable_keywords
    on searchable_keywords.searchable_keywords_id = paper_keywords.searchable_keywords_fk
    where users.users_id = p_users_id
    order by searchable_keywords.searchable_keywords;
    
end //

delimiter ;