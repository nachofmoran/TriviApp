# TriviApp

Trivia game developed with LitElement components, tested with Jest and Cypress, deployed within a docker container, hosted in firebase and automated with a CI Gitlab pipeline.

It consists of three pages:

- Home.
- Game. Launches questions while you are right. When you miss, sends your score to the firestore database.
- Leaderboard. Reads the data from the database and lists the leaderboard.
