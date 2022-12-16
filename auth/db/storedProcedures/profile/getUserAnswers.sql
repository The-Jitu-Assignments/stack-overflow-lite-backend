CREATE OR ALTER PROC usp_getUserAnswers (@userId VARCHAR(255))
AS
BEGIN
  select COUNT(u.id) as totalAnswersGiven from Users u LEFT JOIN Answers a ON u.id = a.userId GROUP BY u.id HAVING u.id = @userId;
END;