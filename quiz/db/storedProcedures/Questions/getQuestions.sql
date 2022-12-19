CREATE OR ALTER PROC usp_getAllQuestions(@pageNumber INT, @pageSize INT)
AS
BEGIN
  SELECT * FROM udf_getPaginatedData(@pageNumber, @pageSize)
END