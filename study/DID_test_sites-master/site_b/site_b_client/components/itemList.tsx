import Image from 'next/image';
import { IFarmMachinery } from '../data/data';
import {
  ImgWrap,
  ItemDesc,
  ItemPrice,
  ItmeListWrap,
  ItmeTitle,
  PriceUnit,
  PriceWrap,
} from '../styles/content/lists';

interface IItemListProps {
  items: IFarmMachinery[];
  openModal: (v: IFarmMachinery) => () => void;
}

const ItemList = ({ items, openModal }: IItemListProps) => {
  return (
    <>
      {items.map((v) => {
        return (
          <ItmeListWrap key={v.idx} onClick={openModal(v)}>
            <ImgWrap>
              <Image src={v.img} alt={v.name} height="100%" width="100%" />
            </ImgWrap>
            <div>
              <ItmeTitle>{v.name}</ItmeTitle>
              <ItemDesc>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
                voluptates eveniet ipsam quod eaque eos eligendi, provident
                accusantium omnis earum quia iure eum debitis minus non, ab
                atque nesciunt. Id.
              </ItemDesc>
              <PriceWrap>
                <ItemPrice>{v.price}</ItemPrice>
                <PriceUnit>원 /월</PriceUnit>
              </PriceWrap>
            </div>
          </ItmeListWrap>
        );
      })}
    </>
  );
};

export default ItemList;
