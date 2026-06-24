import React, { useState, useEffect } from "react";
import {postData, updateData} from "../api/Postapi"

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the updated

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name; //e.target.name   // "title" pahle
    // "meeting" first step me //e.target.name   // "body" dusre
    // "kya hal hai bhai"
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // "Pehle jo meeting title me likha hai usko rehne do (...prev), fir body me jo naya likha gaya hai usko update kar do ([name]: value)."
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
     

    }
  };

  // updatePostData

  const updatePostData = async () => {
  try {
    const res = await updateData(updateDataApi.id, addData);
    console.log(res);

    if(res.status === 200){
      setData((prev)=> {
        return prev.map((curElem)=>{
          return curElem.id === res.data.id ? res.data : curElem;
        })
      })
    }

    setAddData({title: "", body: ""})
    setUpdateDataApi({});

  } catch (error) {
    
  }
  }

  const handleFormSumit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSumit}>
      <label htmlFor="title"></label>
      <input
        type="text"
        autoComplete="off"
        id="title"
        name="title"
        placeholder="Add Title"
        value={addData.title}
        onChange={handleInputChange}
      />

      <label htmlFor="body"></label>
      <input
        type="text"
        autoComplete="off"
        id="body"
        name="body"
        placeholder="Add Post"
        value={addData.body}
        onChange={handleInputChange}
      />

      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form