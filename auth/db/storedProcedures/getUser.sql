CREATE OR ALTER PROC usp_getUser(@email VARCHAR(255))
AS
BEGIN
  SELECT * FROM Users WHERE email = @email
END;