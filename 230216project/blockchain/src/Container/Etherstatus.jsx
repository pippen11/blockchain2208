import EtherstatusComponent from "../Components/Etherstatus";

const EtherstatusContainer = ({ Transactiondata, Transactionsdata }) => {
  // console.log(Transactionsdata);
  return (
    <EtherstatusComponent
      Transactiondata={Transactiondata}
      Transactionsdata={Transactionsdata}
    ></EtherstatusComponent>
  );
};

export default EtherstatusContainer;
