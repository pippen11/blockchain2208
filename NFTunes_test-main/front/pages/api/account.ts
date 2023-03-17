import axios from 'axios';

export async function getUserInfo() {
  const res = await axios.post('https://nft-unes-test-be.vercel.app/api/user/getAllUserInfo');
  return res.data;
}

export async function getUserByAcct(acct: string) {
  const res = await axios.get(`https://nft-unes-test-be.vercel.app/api/user/details/${acct}`);
  console.log(res.data);
  return res.data;
}
