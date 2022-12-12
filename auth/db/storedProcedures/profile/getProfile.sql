CREATE OR ALTER PROC usp_getUserProfile(@userId VARCHAR(255))
AS
BEGIN
  SELECT * FROM Profile WHERE userId = @userId;
END;