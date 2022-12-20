CREATE OR ALTER PROC usp_getMostRecentQuizes(@pageNumber INT, @pageSize INT)
AS
BEGIN
  SELECT * FROM udf_paginateSortedQuizes(@pageNumber, @pageSize)
END;