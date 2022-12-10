CREATE OR ALTER PROC usp_addLike (
  @id VARCHAR (255),
  @answerId VARCHAR(255),
  @userId VARCHAR(255),
  @likes INT = 0
)
AS
BEGIN
  IF EXISTS (SELECT * FROM LikeTable WHERE id = @id)
    UPDATE LikeTable SET
      likes = 0
    WHERE id = @id
  ELSE
    INSERT INTO LikeTable (id, answerId, userId, likes)
    VALUES (@id, @answerId, @userId, @likes)
END;
