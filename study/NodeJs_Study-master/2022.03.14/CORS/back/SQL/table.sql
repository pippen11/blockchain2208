use home;
CREATE TABLE user(
    userlevel INT NOT NULL,
    userid VARCHAR(10) NOT NULL ,
    userpw VARCHAR(10) NOT NULL,
    name VARCHAR(10) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    birth DATE,
    gender CHAR(1),
    phone VARCHAR(11),
    mobile VARCHAR(11) NOT NULL,
    active INT NOT NULL DEfAULT 1,
    PRIMARY KEY(userid)
);

CREATE TABLE board(
    idx INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(40) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content TEXT,
    hit INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(idx)
);

INSERT INTO board (subject, nickname, content) SELECT 'INGOO' , 'WEB7722', '아하하하';
SELECT DATE_FORMAT('2022-03-14', '%Y%m%d') FROM board;

INSERT INTO board (subject,nickname,content) SELECT subject,nickname,content FROM board;

-- SELECT는 테이블이다.
SELECT * FROM (SELECT 1) AS a;

(SELECT 1) UNION ALL (SELECT 2);

SELECT subject, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board;

SELECT * FROM (SELECT subject, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board) AS a;

SELECT count(date), date FROM (SELECT subject, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board) AS a GROUP BY date;