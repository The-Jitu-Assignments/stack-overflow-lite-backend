CREATE OR ALTER PROC usp_getUserProfile(@userId VARCHAR(255))
AS
BEGIN
  select 
    u.id, u.name, u.email, p.id as profileId, p.phone, p.address, p.github, p.imgUrl 
  from Users u LEFT JOIN Profile p ON u.id = p.userId WHERE u.id = @userId;
END;