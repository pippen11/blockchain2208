export interface IFarmMachinery {
  idx: number;
  name: string;
  price: number;
  img: string;
  desc: string;
}

export const farmMachineryList: IFarmMachinery[] = [
  {
    idx: 1,
    name: '농업용 트랙터',
    price: 2000,
    img: '/images/tractor.jpeg',
    desc: '농업용 트랙터 입니다.',
  },
  {
    idx: 2,
    name: '콤바인',
    price: 3000,
    img: '/images/combine.jpeg',
    desc: '농경지에서 수확한 곡물을 탈곡한 다음 자루나 통에 쏟아주는 농기계.[1] 영어로는 Combine Harvester(콤바인 하베스터)라고 부르며, 줄여서 Combine으로 부르기도 한다. 크기는 농경지의 크기에 따라 달라지며, 가을 수확철마다 높은 확률로 볼 수 있다.',
  },
  {
    idx: 3,
    name: '농업용 굴삭기',
    price: 1000,
    img: '/images/forkrain.png',
    desc: '건설 현장을 상징하는 기계로 굴착 작업, 토사 운반, 건물 해체, 지면 정리, 구덩이에 빠진 차량 구조 등 못하는 업무가 없다. 또한 타 건설기계와 달리 트럭에 적재하는 것도 무난한 편.[1] 기본적으로 쇼벨 끝에 버킷(삽)을 달아 사용하며 착암기, 집게 등을 장착해 다목적으로 사용할 수 있는 기계이다.',
  },
  {
    idx: 4,
    name: '감자 수확기',
    price: 4000,
    img: '/images/potato.jpeg',
    desc: '감자를 수확할때 사용하는 농기구 이다.',
  },
  {
    idx: 5,
    name: '고구마 수확기',
    price: 6000,
    img: '/images/sweet_potato.jpeg',
    desc: '고구마를 수확할 때 사용되는 농기구 입니다.',
  },
  {
    idx: 6,
    name: '비료 살포기',
    price: 2000,
    img: '/images/firtilizer.jpeg',
    desc: '넓은 영역의 밭에 비료를 살포해주는 농기구입니다.',
  },
];
