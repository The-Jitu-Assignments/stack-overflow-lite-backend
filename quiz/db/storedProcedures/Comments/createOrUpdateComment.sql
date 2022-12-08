CREATE OR ALTER PROC usp_createOrUpdateComment(
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @answerId VARCHAR(255),
  @comment TEXT
)
AS
BEGIN
  IF EXISTS (SELECT * FROM Comments WHERE id = @id)
    UPDATE Comments SET
      comment = @comment
    WHERE id = @id
  ELSE
    INSERT INTO Comments (id, userId, answerId, comment)
    VALUES (@id, @userId, @answerId, @comment)
END;