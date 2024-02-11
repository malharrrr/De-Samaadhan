'use client'
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";

const Dashboard =() => {

  const { user } = UserAuth();

  // DUMMY DATA

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

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

async function fetchData(){
  // console.log("USER ID IS ",user.uid);
  // const response = await axios.post('http://localhost:8080/getcomplaints', { useRef: user.uid });
  // setData(response.data);
  // console.log(data);
  setTimeout(() => {
    setShow(true);
}, 1000); 
}





  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}          
        </div>
        <button onClick={fetchData} className="text-3xl">FETCH</button>
        {/* <button onClick={() => fetchData()} className="text-3xl">FETCH DATA</button> */}
        <Transactions data={data} show={show}/>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
