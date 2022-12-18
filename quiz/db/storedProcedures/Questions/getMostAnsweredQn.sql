CREATE OR ALTER PROC usp_mostAnsweredQuestion
AS
BEGIN
 select q.id, count(a.questionId) as total from Questions q LEFT JOIN Answers a ON q.id = a.questionId GROUP BY q.id HAVING count(a.questionId) >= 1 ORDER BY count(a.questionId) DESC;
END;