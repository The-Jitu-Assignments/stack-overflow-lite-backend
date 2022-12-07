CREATE OR ALTER PROC usp_createOrUpdateAnswer(
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @questionId VARCHAR(255),
  @comment TEXT,
  @accepted INT = 0,
  @isLiked INT = 0
)
AS
BEGIN
  IF EXISTS(SELECT * FROM Answers WHERE id = @id)
  UPDATE Answers SET
    comment = @comment,
    accepted = @accepted,
    isLiked = @isLiked
  WHERE id = @id
  ELSE
    INSERT INTO answers
      (id, userId, questionId, comment)
    VALUES
      (@id, @userId, @questionId, @comment)
END;