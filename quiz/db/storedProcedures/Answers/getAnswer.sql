CREATE OR ALTER PROC usp_getAnswer(@answerId VARCHAR(255))
AS
BEGIN
  SELECT * FROM Answers WHERE id = @answerId
END;