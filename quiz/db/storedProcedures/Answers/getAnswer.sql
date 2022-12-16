CREATE OR ALTER PROC usp_getAnswer(@answerId VARCHAR(255))
AS
BEGIN
  SELECT 
    a.id, c.id as commentId, c.comment, c.[date], u.name, p.imgUrl  
    FROM Answers a LEFT JOIN Comments c ON a.id = c.answerId
  LEFT JOIN Users u ON u.id = a.userId LEFT JOIN Profile p ON u.id = p.userId WHERE a.id = @answerId
END;