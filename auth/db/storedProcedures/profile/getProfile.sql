CREATE OR ALTER PROC usp_getUserProfile(@userId VARCHAR(255))
AS
BEGIN
  SELECT 
  id, name, email 
  FROM Users WHERE id = @userId;
END;