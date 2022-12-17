CREATE OR ALTER PROC usp_getComments(@answerId VARCHAR(255))
AS
BEGIN
  SELECT 
  c.id, c.userId, c.answerId, c.comment, c.[date], u.name, p.imgUrl
  FROM Comments c LEFT JOIN Users u ON  c.userId = u.id 
  LEFT JOIN Profile p ON p.userId = u.id
  WHERE answerId = @answerId
END;