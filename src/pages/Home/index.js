import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton,LinearProg} from "../../components/Skeleton/skeleton";
import { Waypoint} from "react-waypoint";

import  "./home.css";
import Header from "../../components/Header";
import PostCard from "../../components/Postcard/postCard";
import { GET_PAGINATED_POSTS} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import CreateItem from "../../components/CreateItem/CreateItem";




/**Home componen */
function Home() {
        UsedocumentTitle("Home");
        const variables = {
          cursor: null,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading, fetchMore } = useQuery(GET_PAGINATED_POSTS,{
          variables,
          fetchPolicy:"cache-first",
          pollInterval:50000,
          notifyOnNetworkStatusChange:true,
          });

        const skeleton = (
          <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </>
        )

        let loader;
        if(loading){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }

        if(!loading && !data){
          return loader = (
            <div>
              <Header/>
              <LinearProg/>
              {skeleton}
            </div>
          )
        }


const { posts ,cursor } = data.getPaginatedPosts;
  const main =  posts && (
  <div className="homeContainer">
          { posts.map( (post, i) => (
            <div className="card"  key={post.id} >
                  { <PostCard  post={post}/>}
                  {i === posts.length - 10 &&
                    <Waypoint onEnter={
                      () => fetchMore({
                        variables:{
                          cursor: cursor,
                          limit: HOME_PAGE_POSTS_LIMIT
                      },
                      updateQuery:(pv,{fetchMoreResult}) => {
                        if(!fetchMoreResult){
                          return pv
                        }
                        return {
                          getPaginatedPosts:{
                           __typename: "PostsConnection",
                           posts: [ pv.getPaginatedPosts.posts, ...fetchMoreResult.getPaginatedPosts.posts ],
                           hasMore: fetchMoreResult.getPaginatedPosts.hasMore,
                           cursor: fetchMoreResult.getPaginatedPosts.cursor
                          }
                        }
                      }
                  })} />
                  }
            </div>
            ))}
  </div>
  )

 return (
<>
  <Header/>
  {loading && loader}

  {data && !loading  && main}
  {(!loading && !data) && loader }

  <div className="createItemForm" >
    <CreateItem/>
  </div>
</>
 )
}

export default Home;
