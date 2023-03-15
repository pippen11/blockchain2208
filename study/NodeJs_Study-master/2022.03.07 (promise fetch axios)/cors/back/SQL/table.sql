USE home;

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