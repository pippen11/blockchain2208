export default class UnspentTxOut implements IUnspentTxOut {
  public address: string;
  public amount: number;
  public txOutId: string;
  public txOutIndex: number;

  constructor(
    _address: string,
    _amount: number,
    _txOutId: string,
    _txOutIndex: number
  ) {
    this.address = _address;
    this.amount = _amount;
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
  }

  static getMyUTXO(
    _address: string,
    _utxos: Array<UnspentTxOut>
  ): Array<UnspentTxOut> {
    console.log("6-21 보내는 사람의 utxo 목록 가져오기");

    return _utxos.filter((item) => item.address === _address);
    // address utxo가 address가 각각 다르니까 같은걸 가져옴  특정 계정의 adress를 가져오려고 씀

    // const temp = [];
    // for (let i = 0; i < _utxos.length; ++i) {
    //   if (_utxos[i].address === _address) temp.push(_utxos[i]);
    // }
    // return temp;
  }
}
