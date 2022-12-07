CREATE OR ALTER PROC usp_getQuestion(@id VARCHAR(255))
AS
BEGIN
  SELECT * FROM Questions WHERE id = @id
END;