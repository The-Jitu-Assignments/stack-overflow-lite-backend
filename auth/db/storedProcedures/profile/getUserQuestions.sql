CREATE OR ALTER PROC usp_getUserQuestions (@userId VARCHAR(255))
AS
BEGIN
  select COUNT(u.id) as totalQuestionsAsked from Users u LEFT JOIN Questions q ON u.id = q.userId GROUP BY u.id HAVING u.id = @userId
END;