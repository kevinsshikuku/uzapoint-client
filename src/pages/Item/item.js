import React from 'react';
import {useHistory} from 'react-router-dom';
import {useQuery}  from '@apollo/client';

import {GET_POST } from '../../graphql/post';
import RouteHeader from "../../components/Header/routeHeader";
import LikeButton from "../../components/Like/Like";
import { weekDay} from '../../Utils/date';
import Comments from "../../components/Comment/comments";
import "./item.css"
import {CreateComment} from "../../components/CreateCommnet/createComment";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {SkeletonPost,SkeletonPostLoader, SkeletonBar2} from "../../components/Skeleton/skeleton";
import {Place, WhatsApp, Call} from "@material-ui/icons";
import {Image, Transformation, Placeholder} from 'cloudinary-react';



/**single Item component */
function Item({match}) {
 const history = useHistory();
 UsedocumentTitle("Item")

 const { data,loading} = useQuery(GET_POST,{
   variables:{
     id: match.params.id
   },
   fetchPolicy:"cache-and-network"
 });



  let loader;
  if(loading){
    return (
    <>
    <RouteHeader tag="product details"/>
    <br/> <br/>
    <SkeletonPostLoader/>
    <SkeletonBar2/>
    </>
    )
  }




const { id , imagePublicId,likes, price,crossedPrice, title, author, description,
        features,location, comments, createdAt} = data.getPost;

const weekday = weekDay(createdAt);
const slicedTitle = title.slice(0,50);
const internationalPhone = author.phonenumber && `+254${author.phonenumber.substring(1)}`;
const toProfile = () =>{
    history.push(`/${author.username}`)
}
 const itemFeatures = features && features.split("#")
 const main = (
  <>
    <div className="itemCard">
        <div className="cardMedia" >
            {title && imagePublicId && <div className="cardTitle">  {title}</div>}
            { imagePublicId ?
               <Image
                  publicId={imagePublicId}
                  loading="lazy"
                  >
                  <Placeholder type="blur"/>
                  <Transformation height="50%" width="100%" crop="fill"/>
               </Image> : <SkeletonPost title={`${slicedTitle}...`}/> }
         </div>

        <div className="itemStats">
          <p>{likes.length} likes</p>
          <p>{comments.length} comments</p>
          <p>{weekday}</p>
        </div>
        <div className="itemBtns">
            <a className="button" href={`https://api.whatsapp.com/send?phone=${internationalPhone}`}>
              <WhatsApp/>
              <p>Whatsapp</p>
            </a>
            <a href={`tel:${author.phonenumber}`} className="button">
                <Call/>
                <p>Call me</p>
            </a>
            <LikeButton likes={likes} postId={id}/>
        </div>


        <div className="item_price">
            <>
              { price && <p>Ksh.{price}</p>}
              {crossedPrice && <p style={{color:"red"}} > was Ksh. <i>{crossedPrice}</i> </p>}
            </>
        </div>

        {(location || author?.location) && <div className="itemlocation">
          <Place/>
          {location ? `${location}` : `${author.location}`}
        </div>}

       {description &&
        <div className="itemDescription">
           {description}
        </div>
       }

        {features &&
        <div className="itemFeatures">
          <p style={{fontWeight:"bolder"}}>Item features:</p>
            <ul>
              {itemFeatures.map((item, i) => (
                 <li key={i} >{item}</li>
              ))}
            </ul>

        </div>
        }

         <div onClick={toProfile} className="profilebutton"> check my profile </div>

          <div className="createComment">
           <CreateComment postId={id} comments={comments}/>
          </div>

        <div className="itemComments">
          <p style={{fontWeight:"bolder"}}>Comments and Reviews:</p>
          <div>
            {comments.length && comments.map( comment => (
                <div className="comment" key={comment.id}>
                  <Comments comment={comment}/>
                </div>
            ))}
          </div>
        </div>
    </div>
  </>

)


 return (
  <>
  <RouteHeader tag={"product details"}/>
  {loading ? loader : main}
  </>
 )
}

export default Item;
