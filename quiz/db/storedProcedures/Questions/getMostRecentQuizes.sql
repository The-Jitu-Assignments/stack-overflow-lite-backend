CREATE OR ALTER PROC usp_getMostRecentQuizes
AS
BEGIN
  SELECT * FROM Questions ORDER BY [date] DESC
END;