import EtherstatusComponent from "../Components/Etherstatus";

const EtherstatusContainer = ({
  Blocksdata,
  Transactiondata,
  Transactionsdata,
}) => {
  // console.log(Transactionsdata);
  // console.log(Blocksdata);
  return (
    <EtherstatusComponent
      Blocksdata={Blocksdata}
      Transactiondata={Transactiondata}
      Transactionsdata={Transactionsdata}
    ></EtherstatusComponent>
  );
};

export default EtherstatusContainer;
