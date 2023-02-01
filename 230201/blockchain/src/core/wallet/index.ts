import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public publicKey: string;
  public address: string;
  public balence: number;
  public signature: TSignature;

  constructor(_sender: string, _signature: TSignature) {
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    this.balence = 0;
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static verify(_receivedTx: {
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    console.log("5-11 서명 확인");

    const { sender, received, amount, signature } = _receivedTx;
    const hash = SHA256(sender + received + amount)
      //hash는 보내는사람:sender여기서는 공개키 +받는사람+보내는금액?
      //여기서 address가 publickey임
      .toString()
      .toUpperCase();
    const keyPair = ec.keyFromPublic(sender, "hex");
    //공개키로 키페어만듬
    const isValid = keyPair.verify(hash, signature);
    if (!isValid) return { isError: true, msg: "서명오류" };
    return { isError: false, value: undefined };
    //내보내줄게딱히없어서 undefined
    // declare type TValue<T> = {
    //   isError: false;
    //   value: T;
    // };
    // 이부분에서 value T때문에 undefined안넣어주면암됨
  }
}

export default Wallet;
