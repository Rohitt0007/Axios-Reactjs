import React from "react";
import { useEffect, useState } from "react";
import { getPost } from "../api/Postapi";
import { deletPost } from "../api/Postapi";
import Form from "../components/Form"

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    try {
      const res = await getPost();
      // console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletPost = async (id) => {
    try {
      const res = await deletPost(id);
      console.log(res);

      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.id !== id;
        });

        setData(newUpdatedPost);
      } else {
        console.log("Failed to delete the post", res.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  //handleUpdatePost//

  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="posts">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;

            return (
              <li key={id} className="post-card">
                <p className="post-title">Title:{title}</p>

                <p className="post-body">Body:{body}</p>

                <div className="post-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleUpdatePost(curElem)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletPost(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};;

export default Posts;
