CREATE TABLE board (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    date TIMESTAMP NOT NULL,
    hit INT NOT NULL
)DEFAULT CHARSET=utf8mb4;

INSERT INTO board (title, content, date, hit) VALUES ('Hi', '안녕하세요, bitkunst 입니다.', CURRENT_TIMESTAMP, 0);
