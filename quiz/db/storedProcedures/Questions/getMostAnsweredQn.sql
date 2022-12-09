CREATE OR ALTER PROC usp_mostAnsweredQuestion (@range INT)
AS
BEGIN
  SELECT q.id from Questions q LEFT JOIN Answers a ON q.id = a.questionId GROUP BY q.id HAVING count(a.questionId) > @range
END;