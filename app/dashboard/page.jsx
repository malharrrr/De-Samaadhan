import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";

const Dashboard =async() => {

  const aadhar = 319331933193;

  // DUMMY DATA

 const cards = [
  {
    id: 1,
    title: "Total Complaints",
    number: 76,
    change: 12,
  },
  {
    id: 2,
    title: "Pending",
    number: 23,
    change: -2,
  },
  {
    id: 3,
    title: "Approved",
    number: 34,
    change: 18,
  },

  {
    id: 4,
    title: "Flagged",
    number: 19,
    change: 13,
  },
];

const response = await axios.post('http://localhost:8080/getcomplaints', { useRef:aadhar });

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
