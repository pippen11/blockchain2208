import type { NextPage } from 'next';
import { useState } from 'react';
import ItemList from '../components/itemList';
import ItemModal from '../components/itemModal';
import { farmMachineryList, IFarmMachinery } from '../data/data';
import { Items } from '../styles/content/lists';

const Home: NextPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IFarmMachinery>({
    idx: 0,
    name: '',
    price: 0,
    img: '',
    desc: '',
  });

  const controllModal = (v?: IFarmMachinery) => () => {
    if (v) {
      setModalData(v);
    }
    setModal(!modal);
  };

  return (
    <>
      <Items>
        <ItemList items={farmMachineryList} openModal={controllModal} />
      </Items>
      {modal && <ItemModal item={modalData} closeModal={controllModal()} />}
    </>
  );
};

export default Home;
