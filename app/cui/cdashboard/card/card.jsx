import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {


  
  return (
    <div className={styles.container}>
      
      <div className={styles.texts}>
      <span className={styles.number}>{item.id}</span>
        <span className={styles.title}>{item.title}</span>        
        <span>{item.description}</span>
      </div>
    </div>
  );
};

export default Card;
