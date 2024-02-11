'use client'
import Card from "../ui/dashboard/card/card";
import React,{useState} from "react";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";

const cDashboard = () => {

  const [show, setShow] = useState(false);
  // DUMMY DATA

 const cards = [
  {
    id: 1,
    title: "Missed Filing Tax Return",
    category: "TAX",
    description: "Missed the Deadline to file tax return",
  },
  {
    id: 2,
    title: "Delayed Police Response",
    category: "Public Service",
    description: "Reported a burglary, but police response was delayed, compromising safety.",
  },
  {
    id: 3,
    title: "Public Property Neglect",
    category: "Public Service",
    description: "Sidewalks in disrepair pose tripping hazards, endangering pedestrians.",
  },

  {
    id: 4,
    title: "Police Misconduct ",
    category: "FIRs",
    description: "Excessive force used during arrest, resulting in injuries and trauma.",
  },
];

async function handlefetch(){
  setTimeout(() => {
    setShow(true);
}, 2500);
}

  return (
    <div className={styles.wrapper}>      
      <div className={styles.main}>
        {show && (<div className={styles.cards}>
           {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>)}
        <button className="text-3xl p-3 m-3 bg-[#182237]" onClick={handlefetch}>FETCH My Complaints</button>
      <button className="text-3xl p-3 m-3 bg-[#182237]"><a href="/grievanceportal">Lodge Grievance</a></button>
      </div>
    </div>
  );
};

export default cDashboard;
