import React from "react";
import {useHistory} from "react-router-dom";
// import {Image, Transformation} from "cloudinary-react";
import { timeAgo } from '../../Utils/date';
import useGaEvents from "../../Hooks/useGAEvents";
import  "./postcard.css"
import {SkeletonPost} from "../Skeleton/skeleton";
import {Avatar } from '@material-ui/core';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import {WhatsApp, Call,Person} from "@material-ui/icons";
import Img from "react-cool-img";

/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();
      const GAEventTracker = useGaEvents("Click on item");

      const {id , author, image, inStock, price,crossedPrice, title, createdAt} =  post ;

      const slicedTitle = post?.title?.slice(0,50);
      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

/* -------------------------------------------------------------------------- */
      const toPost = async (e) => {
          GAEventTracker("Item view", e.target.currentSrc);
          history.push(`/item/${id}`);
      }



   return(
  <>

    <div className="postCard">
        <div className="buyer_avator"  onClick={toProfile} >
          <Avatar name={author.username} src={author?.image} />
          <p> {author.username}</p>
          <p style={{marginLeft:"2rem"}} > {timeAgo(createdAt)}</p>
        </div>
        <div>
         {image ? <div className="cardMedia">
            { image &&
                <Img
                  style={{
                    backgroundColor:"grey",
                    width:"50%",
                    height:"100%"
                  }}
                  src={image}
                  alt={title}
                  debounce={1000}
                />
              // <LazyLoadImage
              //   alt={title}
              //   effect="blur"
              //   height="50%"
              //   width="100%"
              //   onClick={toPost}
              //   loading="lazy"
              //   placeholder={<SkeletonPost/>}
              //   src={image}/>
             }
        </div> : <div onClick={toPost}>  <SkeletonPost title={slicedTitle}/> </div> }

        {image && title &&
        <div className="itemTitle">
          {title}
        </div>}

        { price &&
        <>
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
          <div className="priceInfo">
            {price && <p style={{color:"blue"}} >Ksh {price}</p>}
            {crossedPrice && <p className="crossedPrice">{crossedPrice}</p>}
          </div>
        </div>
        <div> {inStock && <p className="inStock">{inStock} in Stock</p>}</div>
        </>
        }

        <div className="buy_itemBtns">
            <a className="buy_button" href={`https://api.whatsapp.com/send?phone=${"internationalPhone"}`}>
              <WhatsApp/>
              <p>Whatsapp</p>
            </a>
            <a href={`tel:${author.phonenumber}`} className="buy_button">
                <Call/>
                <p>Call me</p>
            </a>
            <p onClick={toProfile} className="buy_profilebutton"> <Person/> My profile</p>
        </div>

      </div>
    </div>
  </>

   )
}
export default Postcard;