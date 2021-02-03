import React from 'react';
import RouteHeader from "../../components/Header/routeHeader";
import Postgrid from "../../components/PostGrid/postGrid";

/**AuthUser items */
function UserItems({posts}) {
const count = posts.length;

 return (
  <>
  <RouteHeader tag={` ${count} items`}/>
  <div className="auth_prifile_grid">
          { posts.length && posts.map( post =>
            <div className="ProfileGridcard" key={post.id}>
                { <Postgrid  post={post} count={count}/>}
            </div>
            )}
  </div>
  </>
 )
}

export default UserItems;
