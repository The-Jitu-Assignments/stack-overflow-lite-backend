CREATE OR ALTER PROC usp_getAllQuestions
AS
BEGIN
  SELECT 
    q.id, q.userId, q.question, q.date, p.phone, p.address, p.github, p.imgUrl
  FROM Questions q LEFT JOIN Profile p ON q.userId = p.userId;
END;