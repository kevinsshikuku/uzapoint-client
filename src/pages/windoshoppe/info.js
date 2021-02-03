import React from 'react';
import {useHistory} from "react-router-dom"


import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import People from '@material-ui/icons/People';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined'
import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined'

import  './about.css'









/** App information */
const Info = () => {
const history = useHistory();

const toAppInfo = () => {
    history.push("/windoshoppe")
}

    return(
<>
<div className="container" style={{marginTop:"5rem"}}>

<div>

      <div className="contactCard">
          <div className='info_app-about'>
            <People/>
            <div>
                <h4>Contact us</h4>
                <p>Questions? Need help?</p>
            </div>
          </div>

         <div className="call_us">
           <p>0740253367</p>
            <div className="contact_us">
              <a href="tel:0740253367"><PhoneAndroidIcon/></a>
              <p>Call</p>
            </div>
            <div className="contact_us">
              <a href="tel:0740253367"><WhatsAppIcon/> </a>
              <p>WhatsApp</p>
            </div>
         </div>
      </div>

      <div className="policyCard">
        <div className='info_app-about'>
          <FileCopyOutlined/>
           <div>
              <h4>Terms and usage policy</h4>
           </div>
        </div>

        <p>We dont claim any direct responsibilty for content published on our platform. Users are warned to be careful on who the get into transuction with. Content on manupilation, intimidation and descrimination  are not allowed.</p>
      </div>

      <div className="infoCard">
        <div className='info_app-about'>
          <InfoOutlined/>
           <div>
              <h4>App info</h4>
              <p>Get to know about windoshoppe</p>
           </div>
        </div>
           <div>
              <ul>
                  <li>Sell and Buy items at fair price.</li>
                  <li>Incase you're intrested of someone's product Call or WhatsApp the Number on their Bio.</li>
              </ul>
          </div>
      </div>


      <div className="moreInfoCard" onClick={toAppInfo}>
          <div className='info_app-about'>
            <QuestionAnswerOutlined/>
            <div>
                <h4>More info</h4>
                <p>More information about windoshoppe.</p>
            </div>
          </div>
      </div>

      <div className="noteCard">
        <div className='info_app-about'>
          <NoteAddOutlined/>
           <div>
              <h4>Note!</h4>
           </div>
        </div>
        <div className="notice">
          <DirectionsWalkIcon/>
          <p style={{color:"deeppink"}}> Happy selling and Buying </p>
        </div>
      </div>


  </div>
</div>

</>
    )
}

export default Info;