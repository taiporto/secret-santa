import styles from "./page.module.css";
import { DocumentData, collection, getDocs } from "firebase/firestore/lite";

type User = {
  id: string;
  name: string;
};

export default async function Home() {
  const getUsers = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "users"));
      console.log(userSnapshot);
      const userList = userSnapshot.docs.map((doc) => {
        console.log(doc);
        return doc.data();
      });

      return userList;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const users = await getUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      {users.map((user: DocumentData) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </main>
  );
}
