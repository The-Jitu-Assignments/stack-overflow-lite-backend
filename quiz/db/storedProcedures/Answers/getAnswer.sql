CREATE OR ALTER PROC usp_getAnswer(@answerId VARCHAR(255))
AS
BEGIN
  SELECT 
    *,
    (SELECT COUNT(c.answerId) FROM Comments c WHERE a.id = c.answerId) totalComments,
    (SELECT COUNT(ld.answerId) FROM likeDislikes ld WHERE a.id = ld.answerId AND ld.total = 1) totalLikes,
    (SELECT COUNT(ld.answerId) FROM likeDislikes ld WHERE a.id = ld.answerId AND ld.total = -1) totalDislikes
  FROM Answers a WHERE a.id = @answerId; 
END;