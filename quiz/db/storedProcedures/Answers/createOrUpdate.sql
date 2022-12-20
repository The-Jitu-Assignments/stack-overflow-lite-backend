CREATE OR ALTER PROC usp_createOrUpdateAnswer(
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @questionId VARCHAR(255),
  @comment TEXT,
  @accepted INT = 0
)
AS
BEGIN
  DECLARE @exists BIT;
  SELECT @exists = count(id) from Answers WHERE questionId = @questionId AND accepted = 1
  IF @exists > 0
    UPDATE Answers SET accepted = 0 WHERE questionId = @questionId
  END

  BEGIN
  IF EXISTS(SELECT * FROM Answers WHERE id = @id)
  UPDATE Answers SET
    comment = @comment,
    accepted = @accepted
  WHERE id = @id
  ELSE
    INSERT INTO answers
      (id, userId, questionId, comment, date)
    VALUES
      (@id, @userId, @questionId, @comment, GETDATE())
END;