import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>Home

    <Link to={"/agencys"}>agency</Link>
    </div>
  )
}

export default Home