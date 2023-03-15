import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { IDIDpoint } from '../components/itemModal';
import purchase from '../pages/api/purchase';
import { Global } from '../pages/_app';
import Router from 'next/router';

interface IErrors {
  [key: string]: string;
}

interface IValues {
  [key: string | number]: string;
}

const useValues = (
  price: number,
  DIDpoint: IDIDpoint[],
  closeModal: () => void
) => {
  const { userData, setUserData } = useContext(Global);
  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [isPurchase, setIsPurchase] = useState<boolean>(false);

  const controllValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validation = () => {
    const newErrors: IErrors = {};

    const valueArr: number | string[] = Object.values(values);

    const entryArr = Object.entries(values);

    const sumPrice = valueArr.reduce((acc, cur) => {
      return Number(acc) + Number(cur);
    }, 0);

    valueArr.forEach((v) => {
      if (isNaN(Number(v))) {
        newErrors.error = '숫자만 입력 가능합니다.';
      }
    });

    if (sumPrice !== price) {
      newErrors.error = '포인트의 합이 물품 가격과 일치하지 않습니다.';
    }

    entryArr.forEach((v) => {
      const [matched] = DIDpoint.filter((did) => did.a_idx === Number(v[0]));
      if (matched && matched.pt < Number(v[1])) {
        newErrors[matched.name] = '보유 중인 포인트를 확인해주세요.';
      }
    });

    setErrors(newErrors);
  };

  const controllPurchase = () => {
    setIsPurchase(true);
    validation();
  };

  useEffect(() => {
    if (!isPurchase || !userData) return;

    if (Object.keys(errors).length) return;

    (async () => {
      const { userCode } = userData;
      const result = await purchase(values, userCode);
      if (result && setUserData) {
        setUserData({
          ...userData,
          pt: userData.pt - (values.local ? Number(values.local) : 0),
        });
        closeModal();
        alert('구매 성공!');
      } else {
        alert('구매 실패');
      }
    })();
  }, [errors]);

  return { values, controllValues, errors, controllPurchase };
};

export default useValues;
