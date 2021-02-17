import React from 'react';
import './skeleton.css';
import LinearProgress from  "@material-ui/core/LinearProgress";


/** Skeleton post*/
export const Skeleton = () => {
  return (
    <div className="skeleton-item">
       <div className="skeleton-content">
           <div className="skeleton-header">
               <div className="skeleton-img" />
               <div className="skeleton_more">
                   <p className="skeleton-name" />
                   <p className="skeleton-time" />
               </div>
           </div>

          <p className="skeleton-media"/>
           <div className="skeleton-action">
                <p className="skeleton-button"/>
                <p className="skeleton-button1"/>
                <p className="skeleton-button2"/>
                <p className="skeleton-email" />
           </div>
       </div>
    </div>
  );
};

/* --------------------------SkeletonImage------------------------------------------------ */
export const SkeletonImage = () => {
  return(
    <div className="skeleton-img" />
  )
}


/* ----------------------------SkeletonPost---------------------------------------------- */
export const SkeletonPost = () => {
  return(
    <p className="SkeletonPost"/>
  )
}


/* ----------------------------SkeletonButtons---------------------------------------------- */
export const SkeletonButtons = () => {
  return(
    <div className="SkeletonButtons">
      <p className="SkeletonButton"/>
      <p className="SkeletonButton"/>
      <p className="SkeletonButton"/>
    </div>
  )
}


/* ----------------------------SkeletonButtons---------------------------------------------- */
export const SkeletonBar = () => {
  return(
   <div>
      <p className="SkeletonBar1"/>
      <p className="SkeletonBar2"/>
      <p className="SkeletonBar3"/>
      <p className="SkeletonBar4"/>
      <p className="SkeletonBar5"/>
      <p className="SkeletonBar6"/>
   </div>
  )
}

/* ----------------------------SkeletonButtons---------------------------------------------- */
export const SkeletonBar2 = () => {
  return(
   <div>
      <p className="SkeletonBar1"/>
      <p className="SkeletonBar2"/>
   </div>
  )
}


/** Linear prog ********************************************************************************** */
export const LinearProg = () => {
  return(
    <div className="linearProg">
      <LinearProgress/>
    </div>
  )
}


/** Skeleton search*/
export const SearchSkeleton = () => {
  return (
  <div className="search">
    <div className="search-item">
               <div className="search-img" />
               <div className="search_more">
                   <p className="search-name" />
                   <p className="search-name" />
                   <p className="search-time" />
               </div>
    </div>
  </div>
  );
};


/** Skeleton people*/
export const PeopleSkeleton = () => {
  return (
  <div className="person">
   <div className="personDiv">
      <p className="personImg"/>
      <div className="meta" >
          <p className="personName" />
          <p className="personPhone" />
      </div>
   </div>
  </div>
  );
};
