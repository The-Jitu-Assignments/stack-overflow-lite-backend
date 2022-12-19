CREATE OR ALTER PROC usp_getMostRecentQuizes
AS
BEGIN
  SELECT 
    q.id, q.userId, q.question, q.date, p.imgUrl, u.name,
    (select count(a.questionId) from Answers a WHERE a.questionId = q.id) totalAns
  FROM Questions q LEFT JOIN Profile p ON q.userId = p.userId LEFT JOIN Users u ON u.id = q.userId order by q.date desc;
END;