import db from "../../firebase";
import styles from "./page.module.css";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

type User = {
  id: string;
  name: string;
};

export default async function Home() {
  const getUsers = async () => {
    try {
      const unsub = onSnapshot(collection(db, "users"), (doc) => {
        const docs: any = [];
        doc.forEach((d: any) => {
          docs.push({ ...d.data(), id: d.id });
        });
        return docs;
      });
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
      {users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </main>
  );
}
