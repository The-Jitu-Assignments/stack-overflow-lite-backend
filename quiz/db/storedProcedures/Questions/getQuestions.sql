CREATE OR ALTER PROC usp_getAllQuestions
AS
BEGIN
  SELECT 
    q.id, q.userId, q.question, q.date, p.imgUrl, u.name
  FROM Questions q LEFT JOIN Profile p ON q.userId = p.userId LEFT JOIN Users u ON u.id = q.userId;
END;