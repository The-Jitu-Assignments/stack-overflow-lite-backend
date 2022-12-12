CREATE OR ALTER PROC usp_likeDislike(
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @answerId VARCHAR(255),
  @total INT = 0
)
AS
BEGIN

  DECLARE @exists BIT

  SELECT @exists = count(id) from likeDislikes WHERE userId = @userId AND answerId = @answerId and total=@total
  
  if @exists > 0
    BEGIN
      DELETE FROM likeDislikes WHERE userId = @userId AND answerId = @answerId
    END
  ELSE
    BEGIN
      IF EXISTS (SELECT * FROM likeDislikes WHERE userId = @userId AND answerId = @answerId)
        UPDATE likeDislikes SET
          total = @total
        WHERE userId = @userId AND answerId = @answerId
      ELSE
        INSERT INTO likeDislikes (id, userId, answerId, total)
        VALUES (@id, @userId, @answerId, @total)
      END;
END
