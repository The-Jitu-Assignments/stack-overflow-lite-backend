CREATE OR ALTER PROC usp_getMyDetails(@id VARCHAR(255)) 
AS
BEGIN 
  SELECT id, name FROM Users WHERE id = @id;
END;