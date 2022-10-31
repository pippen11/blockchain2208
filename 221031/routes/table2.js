const router = require("express").Router();

const { Table1, Table2 } = require("../models/index.js");

router.get("/", async (req, res) => {
  const { body, query } = req;
  const options = {};
  if (query.id) {
    options.where = {
      id: query.id,
    };
  }
  const tempTables = await Table2.findAll(options);
  res.send({ name: "get", body, query, tempTables });
});

router.post("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.create({
    column3: body.column3,
    column4: body.column4,
  });
  res.send({ name: "post", body, query, tempTable });
});

router.put("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.update(
    {
      column3: body.column3,
      column4: body.column4,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
  res.send({ name: "put", body, query, tempTable });
});

router.patch("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.update(
    {
      column3: body.column3,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
  res.send({ name: "patch", body, query, tempTable });
});

router.patch("/associate", async (req, res) => {
  const { body, query } = req;
  if (body.column2) {
    const tempTable1 = await Table1.findOne({
      where: { column2: body.column2 },
    });
    const tempTable2 = await Table2.findOne({ where: { id: body.id } });
    tempTable1.addTable2s(tempTable2);
    // Table1을 기준으로 Table2를 추가한다.
    // 추가할 때 메서드는 add + 우리가 as 설정한 텍스트다.

    res.send({ name: "patch", body, query, tempTable1 });
  } else {
    const tempTable1 = await Table2.findOne({ where: { id: body.id1 } });
    const tempTable2 = await Table2.findOne({ where: { id: body.id2 } });
    tempTable1.addToTable2s(tempTable2);
    tempTable2.addFromTable2s(tempTable1);
    // 네이버의 서로이웃

    res.send({ name: "patch", body, query, tempTable1 });
  }
});

router.delete("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.destroy({
    where: {
      id: query.id,
    },
  });
  res.send({ name: "delete", body, query, tempTable });
});

module.exports = router;

///////////////////////////////////////////////////////////////
// const router = require("express").Router();

// //express 서버에서 사용하는 라우터를 생성한다

// const { Table1, Table2 } = require("../models/index.js");

// //models의 index.js이 table.init해서

// //GET/POST/PUT/PATCH/DELETE
// //위 5가지 방식으로 통신을 하는 방식?을 REST API라고 한다.
// //REST API=RESTFUL API=RESTFUL
// //HTTP 통신 , 즉 web통신을 할때 기본적으로 사용되는 방식이다
// //REST API VS GraphGL << 요런놈도 있긴하다.

// //CRUD -> sequelize / mySQL
// //Create ->create/INSERT
// //Read -> findAll || findOne / SELECT
// //Update-> update/UPDATE
// //Delete=> destroy /DELETE

// //미들웨어(선행작업을 미들웨어에서 처리하기위해 , 메서드마다 공통작업이잇으면 미들웨어에넣는다)
// // 미들웨어는 위에있어야함 한두개가아니면 순서대로 하면됨
// //next가 중요하다 next잇는건 중간단계니까 다미들웨어라 생각하면됨
// //next적는건 내맘
// // router.get("/", (req, res, next) => {
// //   const { body, query } = req;
// //   res.cookie("middle", "testing", {
// //     expires: new Date(Date.now() + 1000 * 60),
// //   });
// //   next();
// // });
// //요 위가 미들웨어다.

// router.get("/", async (req, res) => {
//   const { body, query } = req; // 구조분해할당
//   const options = {};
//   if (query.id) {
//     options.where = {
//       // 어떤 조건으로 찾을거냐?
//       id: query.id, // column2가 query.column2인 애를 찾겠다
//     };
//   }
//   // [].find
//   const tempTables = await Table1.findAll(options);
//   //const tempTables = await Table1.findAll({where:{colum2:query.column2}});
//   //이렇게적으면 undefined?로나옴
//   //findAll이 프로미스형식이다 데이터받고해야돼서 프로미스쓴다
//   // Table1.findOne()
//   res.send({ name: "get", body, query, tempTables });
// });

// router.post("/", async (req, res) => {
//   const { body, query } = req;
//   const tempTable = await Table2.create({
//     column3: body.column3,
//     column4: body.column4,
//   });
//   //colum2는 자동으로돼서 뺌
//   res.send({ name: "post", body, query, tempTable });
// });

// router.put("/", async (req, res) => {
//   // 수정시 전부 수정을 요청할때
//   const { body, query } = req;
//   const tempTable = await Table2.update(
//     {
//       column3: body.column3,
//       column4: body.column4,
//     },
//     {
//       where: {
//         column2: body.column2,
//       },
//     }
//   );
//   res.send({ name: "put", body, query, tempTable });
// });

// router.patch("/", async (req, res) => {
//   //수정시 일부분 수정을 요청할때
//   const { body, query } = req;
//   const tempTable = await Table2.update(
//     {
//       column3: body.column3,
//     },
//     {
//       where: {
//         id: body.id,
//       },
//     }
//   );
//   res.send({ name: "patch", body, query, tempTable });
// });

// router.patch("/associate", async (req, res) => {
//   //수정시 일부분 수정을 요청할때
//   const { body, query } = req;
//   if (body.colum2) {
//     const tempTable1 = await Table1.findOne({
//       where: { column2: body.column2 },
//     });
//     const tempTable2 = await Table2.findOne({ where: { id: body.id } });
//     tempTable1.addTable2s(tempTable2);
//     //1대다
//     //가운데는 as랑 이름 갔아야함
//     // Table1을 기준으로 Table2를 추가한다.
//     // 추가할때 메서드는 add+ 우리가 as설정한 텍스트다
//     //

//     res.send({ name: "patch", body, query, tempTable1 });
//   } else {
//     const tempTable1 = await Table2.findOne({ where: { id: body.id1 } });
//     const tempTalbe2 = await Table2.findOne({ where: { id: body.id2 } });
//     tempTable1.addTable2s(tempTable2);
//     tempTable2.addTable2s(tempTalbe1);
//     //네이버의 서로이웃

//     res.send({ name: "patch", body, query, tempTable1 });
//   }
// });

// router.delete("/", async (req, res) => {
//   const { body, query } = req;
//   const tempTable = await Table2.destroy({
//     where: {
//       id: query.id,
//     },
//   });
//   res.send({ name: "delete", body, query, tempTable });
// });

// //router.use('/user')
// //use를 먼저적는게 보통 관례다
// //router.get("/")
// //router.post('/user')

// /////////위에랑 밑에방식 똑 같음 적어야함 밑에
// // router.route("/".get((res,res)=>{res.end()}))

// module.exports = router;
// //express서버의 root에 연결하기위해서 생성한 라우터를 외부로 보낸다
