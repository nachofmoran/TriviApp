import axios from "axios";

export class TriviaRepository {
  async getQuestion() {
    return await (
      await axios.get(
        "https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple"
      )
    ).data.results[0];
  }

  async addPost(post) {
    const postDto = {
      id: post.id,
      title: post.title,
      body: post.content,
      userId: 1,
    };
    return await (
      await axios.post("https://jsonplaceholder.typicode.com/posts", postDto)
    ).data;
  }

  async removePost(id) {
    return await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }

  async updatePost(post) {
    const postDto = {
      id: post.id,
      title: post.title,
      body: post.content,
      userId: 1,
    };
    return await (
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        postDto
      )
    ).data;
  }
}
