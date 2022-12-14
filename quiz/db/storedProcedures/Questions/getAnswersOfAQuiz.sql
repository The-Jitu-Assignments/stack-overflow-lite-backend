CREATE OR ALTER PROC usp_getAnswersOfAQuiz(@questionId VARCHAR(255))
AS
BEGIN
  SELECT * FROM Answers a WHERE a.questionId = @questionId;
END;