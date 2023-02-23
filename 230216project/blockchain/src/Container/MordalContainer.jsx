import MordalComponent from "../Components/ModalComponent";
import { useNavigate } from "react-router-dom";

const MordalContainer = ({ SetMordal }) => {
  //   const navigate = useNavigate();
  //   const moveTo = (where) => {
  //     navigate(`/${where}`);
  //   };

  return <MordalComponent SetMordal={SetMordal}></MordalComponent>;
};

export default MordalContainer;
