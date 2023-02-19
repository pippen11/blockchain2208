import EtherstatusComponent from "../Components/Etherstatus";

const EtherstatusContainer = ({ Transactiondata }) => {
  return (
    <EtherstatusComponent
      Transactiondata={Transactiondata}
    ></EtherstatusComponent>
  );
};

export default EtherstatusContainer;
