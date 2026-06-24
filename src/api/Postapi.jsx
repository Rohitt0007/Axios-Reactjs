import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get methode//

export const getPost = () => {
  return api.get("/posts");
};

//delete Post

export const deletPost = (id) => {
  return api.delete(`posts/${id}`);
};

//Post method

export const postData = (post) => {
  return api.post("/posts", post);
};

export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
