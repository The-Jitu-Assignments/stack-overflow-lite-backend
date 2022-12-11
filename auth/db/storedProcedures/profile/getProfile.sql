CREATE OR ALTER PROC usp_getUserProfile(@id VARCHAR(255))
AS
BEGIN
  SELECT * FROM Profile WHERE id = @id;
END;