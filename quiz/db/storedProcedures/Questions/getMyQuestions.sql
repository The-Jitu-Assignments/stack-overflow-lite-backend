CREATE OR ALTER PROC usp_findMyQuestions(@userId VARCHAR(255))
AS
BEGIN
 SELECT * FROM Questions WHERE userId = @userId;
END;