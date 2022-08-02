import { Link } from "react-router-dom"
import { TrainWrapper } from "./styles"

export const TrainComponent = () => {
  return <TrainWrapper>
    <Link to="/draw">Train</Link>
  </TrainWrapper>
}