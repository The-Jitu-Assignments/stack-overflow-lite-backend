CREATE OR ALTER PROC usp_createOrUpdateQuestion (
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @question TEXT
)
AS
BEGIN
IF EXISTS (SELECT * FROM Questions WHERE id = @id)
  UPDATE Questions SET
  question = @question
WHERE id = @id
ELSE 
  INSERT INTO Questions
    (id, userId, question, date)
  VALUES (@id, @userId, @question, GETDATE())
END;