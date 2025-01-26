import "./Stats.css";

interface Props {
  text: string;
  value: number;
}

const Stats = ({ text, value }: Props) => {
  return (
    <div className="stats-card">
      <h3>{text}</h3>
      <h1>{value}</h1>
    </div>
  );
};

export default Stats;
