import React from 'react';
import {useQuery } from '@apollo/client'
import { Grid} from 'semantic-ui-react';


import CreateCommnet from "./createComment"
import {GET_POST} from "../graphql/post"
import { timeAgo } from '../Utils/date';
import { useStore } from '../store';
import DeleteButton from './DeleteButton';
import shoes from "./shoes.jpeg"
import SkeletonPost from "../components/SinglePostSkeleton"


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';




const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(6.2,-1.5,0,-1.5),
  },
  media: {
    height: 190,
  },
  paragraph:{
     margin: theme.spacing(2,1,0,1),
     overflowWrap:"break-word"
  },
postMarkup:{
 display:"flex",
 flexDirection:"row",
 justifyContent:"spaceAround",
 alignItems:"center",
 marginTop:"-1rem",
 marginBottom:"1rem",
}
}));



function SinglePost({history, match}){
  const classes = useStyles();
  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user

  const {data, loading, error} = useQuery(GET_POST, { variables:{id: postId} })



 function deletePostCallback(){
    history.push("/")
  }

   if (loading) {
     return(
       <div className={classes.skeleton}>
         <SkeletonPost/>
       </div>

     )
   }

   if (!data && !loading) {
     return (
        <div className={classes.skeleton}>
           <SkeletonPost/>
        </div>
     )
   }
   if (error) {
     return <div>Error!</div>;
   }

  const{ id ,author, comments, createdAt, title, price, likes} =  data.getPost



 let postMarkup;
        postMarkup = (
       <div className={classes.postMarkup}>

        <div style={{flexGrow:"1"}}>
         {`Likes: ${likes.length}`}
        </div>
        <div  style={{flexGrow:"1"}}>
          {`Replies: ${comments.length}`}
        </div>
      { user && <div  style={{flexGrow:"1"}}>
            {user.username === author.username  &&
           <DeleteButton id={id} callback={deletePostCallback}/>}
        </div>}
     </div>
        )



return (
    <>
<Card className={classes.card}>
       <CardMedia
          className={classes.media}
          image={shoes}
          title={user.username}
        />
     <div variant="body1" className={classes.paragraph}>
         {postMarkup} <br/>
{/**............................................................................................ */}
       <div className={classes.postMarkup}>
          <div style={{flexGrow:"1"}}>
          {timeAgo(createdAt)}
          </div>
          <div  style={{flexGrow:"1"}}>
            {`Ksh. ${price}`}
          </div>
     </div>
{/**................................................................................................ */}
         <b>{title}</b>
         <hr/>
     </div>
</Card>
  <Grid>

    <Grid.Column mobile={16} tablet={10} computer={7}>
              <br/> <p>Replies</p>
               <CreateCommnet match={match} comments={comments} />
    </Grid.Column>
  </Grid>
    </>
      )
}



export default SinglePost;


















