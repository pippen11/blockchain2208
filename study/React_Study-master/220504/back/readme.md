    ORM (Object Relational Mapping)
        // sequelize : ORM을 사용할 수 있는 라이브러리 중 하나

    DBMS에서 사용 
    mysql, oracle, mssql, postgresql, ...

    mysql2
    mysql.createPool(접속정보)
    nodejs 코드에서 -> mysql 접속

    SQL
    promisePool.query(sql) -> DB에서 결과물을 받아온다.

    webserver : select문을 작성해서 보냈다면

    ORM을 사용하면 find() 함수를 이용해서 정보를 가져올 수 있다. 
    // find() 함수가 select문을 만들어준다고 생각하자.

    중간에 sequelize를 거치면서 DB와 통신하지만 편의성, 호환성 때문에 ORM 사용

    table -> Object
    // DB에 있는 table구조를 Object화 시키는 것
    // table을 object로 mapping

    idx subject content
     0    hi     안녕하세요
     1    hi     안녕하세요

    [
        {
            idx: 0,
            subject: 'hi',
            content: '안녕하세요'
        },
        {
            idx: 1,
            subject: 'hi',
            content: '안녕하세요'
        }
    ]