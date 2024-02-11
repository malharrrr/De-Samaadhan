import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
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
            <td>Phone Theft</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>Theft</td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
                Fraud messages
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>Fraud</td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
                Transactiion fraud
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>Fraud</td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
                Transactiion fraud
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>Fraud</td>
            <td>14.02.2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
