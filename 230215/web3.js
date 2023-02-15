const web3 = new Web3("http://localhost:8080");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
//이렇게 적는거랑 똑같다

web3.eth.extend({
  // RPC에 대한 메서드를 추가한다
  property: "txpool",

  methods: [
    {
      name: "content",
      //호출할때 이름(선언되는 메서드의 이름)
      call: "txpool_content",
      //RPC 이름
    },
  ],
});

web3.eth.txpool.content().then((data) => console.log(data));
