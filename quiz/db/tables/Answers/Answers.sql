CREATE TABLE Answers (
  id VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) FOREIGN KEY REFERENCES Users(id),
  questionId VARCHAR(255) FOREIGN KEY REFERENCES Questions(id),
  comment TEXT,
  accepted INT DEFAULT 0,
  isLiked INT DEFAULT 0
);