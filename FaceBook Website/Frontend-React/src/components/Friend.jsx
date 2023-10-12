import { Link } from "react-router-dom";

const Friend = ({ mailId ,id}) => {
    console.log(mailId);
    return (
        <Link to ={`/profile/${id}`}>{mailId}</Link>
    )
}


export default Friend