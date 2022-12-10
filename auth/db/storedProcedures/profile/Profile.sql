CREATE OR ALTER PROC usp_createOrUpdateProfile(
  @id VARCHAR(255),
  @userId VARCHAR(255),
  @phone VARCHAR(255),
  @address VARCHAR(255),
  @github VARCHAR(255),
  @imgUrl TEXT
)
AS
BEGIN 
  IF EXISTS (SELECT * FROM Profile WHERE id = @id)
    UPDATE Profile SET
      phone = @phone,
      address = @address,
      github = @github,
      imgUrl = @imgUrl
    WHERE id = @id
  ELSE
    INSERT INTO Profile (id, userId, phone, address, github, imgUrl)
    VALUES (@id, @userId, @phone, @address, @github, @imgUrl)
END;