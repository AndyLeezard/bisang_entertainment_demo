import { NextPage } from "next"
import BanalceSynthesis from "../components/balanceSynthesis"
import Navbar from "../components/layout/navbar"

const Home: NextPage = () => {
  return (
    <>
      <div className="available-space">
        <BanalceSynthesis />
      </div>
      <Navbar />
    </>
  )
}

export default Home
