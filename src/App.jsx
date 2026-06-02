import React, { useEffect } from "react";
import { getPost } from "./api/Postapi"

const App = () => {

  console.log()

const getPostData = async () => {
  try {

    const res = await getPost()
    console.log(res)

  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    
    getPostData()

  }, [])
  

  return ( 
    <div>
      App
    </div>
  )

}

export default App