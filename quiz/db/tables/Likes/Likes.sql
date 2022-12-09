CREATE TABLE LikeTable (
  id VARCHAR(255),
  answerId VARCHAR(255) FOREIGN KEY REFERENCES Answers(id),
  userId VARCHAR(255) FOREIGN KEY REFERENCES Users(id),
  likes INT DEFAULT 0,
  CONSTRAINT PK_Like PRIMARY KEY (answerId, userId)
);