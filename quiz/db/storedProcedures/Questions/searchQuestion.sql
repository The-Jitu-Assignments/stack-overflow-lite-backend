CREATE OR ALTER PROC usp_searchQuestion(@value VARCHAR(255))
AS
BEGIN
  SELECT 
    q.id, q.question, q.date, u.name, p.imgUrl,
    (select count(a.questionId) from Answers a WHERE a.questionId = q.id) totalAns
    FROM Questions q 
    LEFT JOIN Users u ON u.id = q.userId 
    LEFT JOIN Profile p ON u.id = p.userId
  WHERE q.question LIKE '%'+@value+'%';
END;