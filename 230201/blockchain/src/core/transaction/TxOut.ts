// tsconfig.json에서 설정해놔서 type가져와서 쓸수있음
export default class TxOut implements ITxOut {
  public address: string;
  public amount: number;

  constructor(_address: string, _amount: number) {
    this.address = _address;
    this.amount = _amount;
  }
}
