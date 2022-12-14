CREATE OR ALTER PROC usp_getAnswersOfAQuiz(@questionId VARCHAR(255))
AS
BEGIN
  SELECT 
    a.id, a.userId, a.questionId, a.comment, a.[date], a.accepted, u.name, p.imgUrl
    FROM Answers a LEFT JOIN Users u ON a.userId = u.id
    LEFT JOIN Profile p ON p.userId = u.id
  WHERE a.questionId = @questionId;
END;