CREATE OR ALTER PROC usp_searchQuestion(@value VARCHAR(255))
AS
BEGIN
  SELECT * FROM Questions WHERE question LIKE '%'+@value+'%';
END;