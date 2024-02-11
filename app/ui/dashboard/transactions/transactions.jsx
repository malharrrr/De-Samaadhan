'use client'
import React,{ useState } from "react";
import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = (props) => {

  const { data,show } = props;
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Complaints</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
            <td>{show && (<>Malhar ka Metamask Wallet</>)}</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
              {show && (<>Pending</>)}
              </span>
            </td>
            <td>{show && (<>FIRs</>)}</td>
            <td>{show && (<>11.02.2024</>)}</td>
          </tr>
          {/* Repeat similar structure for other complaints */}
          {/* Example for another complaint */}
          <tr>
            <td>2</td>
            <td>
            {show && (<>FRAUD Messages</>)}
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>{show && (<>Done</>)}</span>
            </td>
            <td>{show && (<>FIRs</>)}</td>
            <td>{show && (<>11.02.2024</>)}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
            {show && (<>Transcation Fraud</>)}
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>{show && (<>Done</>)}</span>
            </td>
            <td>{show && (<>Tax</>)}</td>
            <td>{show && (<>11.02.2024</>)}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
            {show && (<>Tax Fraud</>)}
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>{show && (<>Pending</>)}</span>
            </td>
            <td>{show && (<>Tax</>)}</td>
            <td>{show && (<>10.02.2024</>)}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
            {show && (<>Public Service</>)}
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>{show && (<>Pending</>)}</span>
            </td>
            <td>{show && (<>Public Service</>)}</td>
            <td>{show && (<>10.02.2024</>)}</td>
          </tr>
          {/* Repeat this structure for other complaints */}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
