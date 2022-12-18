CREATE OR ALTER PROC usp_findMyQuestions(@userId VARCHAR(255))
AS
BEGIN
 SELECT 
    q.id, q.userId, q.question, q.date, u.name, p.imgUrl FROM Questions q 
    LEFT JOIN Users u ON u.id = q.userId 
    LEFT JOIN Profile p ON u.id = p.userId
  WHERE q.userId = @userId
END;