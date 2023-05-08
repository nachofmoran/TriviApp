import axios from "axios";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export class TriviaRepository {
  async getQuestion() {
    return await (
      await axios.get(
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple"
      )
    ).data.results[0];
  }

  async getLeaderboard() {
    const ref = collection(db, "leaderboard");
    const snapshot = await getDocs(ref);
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push(doc.data());
    });
    return results;
  }

  async addScore(player, score) {
    const ref = collection(db, "leaderboard");
    await addDoc(ref, {
      name: player,
      score: score,
    });
  }
}
