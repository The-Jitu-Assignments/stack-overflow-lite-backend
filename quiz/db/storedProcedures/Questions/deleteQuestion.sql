CREATE OR ALTER PROC usp_deleteAQuestion(@id VARCHAR(255))
AS
BEGIN
  DELETE FROM Questions WHERE id = @id
END;
