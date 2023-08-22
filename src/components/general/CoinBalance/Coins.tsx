import './index.scss';

const Coins: any = ({ val }: { val: string }) => {
  return (
    <div className="coinBalance">
      <img src="/images/coin-icon/coin.svg" alt={'coin'} />
      <span>{parseFloat(val).toFixed()}</span>
    </div>
  );
};
export default Coins;
