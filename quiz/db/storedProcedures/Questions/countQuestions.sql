CREATE OR ALTER PROC usp_countQuestions
AS
BEGIN
  SELECT COUNT(id) as total FROM Questions
END;