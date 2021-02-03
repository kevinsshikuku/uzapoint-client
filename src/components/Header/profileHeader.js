import React from "react";
import {useHistory} from "react-router-dom";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';



/**ProfileHeader Header... */
const ProfileHeader = ({tag}) => {
const history = useHistory();

const backHome = () =>{
   history.push('/')

}

return(
<>
 <div className="othertHeader">
   <div className="loggedOutTab">
      <p onClick={backHome}><span className="logo"><ArrowBackIos/></span></p>
      <span className="logo"> {tag} </span>
   </div>
 </div>
</>
)
}

export default ProfileHeader;