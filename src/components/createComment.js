import React,{useState, useRef, useEffect} from 'react';
import { useMutation} from '@apollo/client';
import { TransitionGroup} from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';

import {CREATE_COMMENT} from "../graphql/comment";
import { GET_POST } from '../graphql/post';
import { useStore } from '../store';
import DeleteButton from './DeleteButton';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import logo from "./images.jpeg";





const useStyles = makeStyles(() => ({
input:{
  border:"none",
  resize: "none",
  outline: "none",
  width:"100%",
  },
 addButton: {
    position: 'fixed',
    top:"0",
    right:"20vw",
    zIndex:"11",
    marginTop:"1rem"
  },
 comment:{
    display:"flex",
    flexDirection:"row",
    marginTop:"1rem",
    aligncontent: "flex-end",
    color:"black",
    backgroundColor:"#ededed",
    padding:"3px",
    borderRadius:"3px"
  },
 flex1:{
   width:"85%",
   overflowWrap:"break-word"
 },
flex2:{
   width:"15%",
 },
i:{
   color:"red",
   fontSize:"0.9rem"
 }
}));



function SinglePost({comments, match}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const anchirOpen = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
/* -------------------------------------------------------------------------- */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAchorClose = () => {
    setAnchorEl(null);
  };
/* -------------------------------------------------------------------------- */



  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user
  const variables = {
      postId,
      comment,
      author: user.id
  };


  const [submitCommnet,{ loading, data}] = useMutation(CREATE_COMMENT,{
     variables,
     refetchQueries:[
       {query:GET_POST, variables:{
          id:postId
    }}]
  });

  const handleSubmit = async (e) => {
     e.preventDefault();
     submitCommnet();
     handleClose();

  };


useEffect(() => {
 data && !loading && setComment("")
},[data, loading])

const Input = (
  <>
      <TextareaAutosize
                rowsMin={3}
                placeholder="Reply"
                name="comment"
                className={classes.input}
                autoFocus
                value={comment}
                ref={commentInputRef}
                onChange={ e => setComment(e.target.value)}
                />
  </>
      )

return (
    <>
        {user && ( <button onClick={handleClickOpen} className={classes.addButton}>
                <AddCommentRoundedIcon/>
                   </button>)}

          <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
          >
            <DialogContent >
                {Input}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" autoFocus disabled={!comment}>
                Send
              </Button>
            </DialogActions>
          </Dialog>

        <TransitionGroup>
          <div>
           {!data &&  loading && <div className={classes.comment}>
                                      <div className={classes.flex1}>
                                        {comment} <p className={classes.i}>sending...</p>
                                      </div>
                               </div>}

            {comments && comments.map( comment =>(
               <div key={comment.id} className={classes.comment}>
                  <div className={classes.flex1}>

                      <div>
                        <Image src={logo} avatar/>
                        <span>{comment.author.username}</span>
                      </div>
                      {comment.comment}

                  </div>
                   {user.username === comment.author.username && <div className={classes.flex2}>

                      <IconButton aria-label="more"
                                  aria-haspopup="true"
                                  onClick={handleMenu}
                                  >
                        <MoreVertIcon />
                      </IconButton>
{/* -------------------------------------------------------------------------- */}
                      <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={anchirOpen}
                        onClose={handleAchorClose}
                      >
                    {user &&
                        <MenuItem onClick={handleAchorClose}>
                            <DeleteButton postId={postId} commentId={comment.id}/>
                  {/* <button onClick={deleteMutation}> {deleting ? "Deletting": deleted ? "Deleted" : "Delete" } </button> */}
                        </MenuItem>}
                      </Menu>
                  </div>}
               </div>
            ))}
          </div>
        </TransitionGroup>
    </>
      )
}
export default SinglePost;