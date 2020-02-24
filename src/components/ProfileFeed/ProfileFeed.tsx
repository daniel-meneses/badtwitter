import React from 'react'
import PostMini from "../PostMini/PostMini"

type Props = {
  profileTimeline: Array<number>
}

const ProfileFeed = ({profileTimeline} : Props ) => {

  return (
     <div className="main">
       <div className="feed">
          { profileTimeline.map( (postId: number) =>
            <PostMini key={postId}
                      postId={postId}
                      />
                    )}
                    </div>
                  </div>
  );
}

export default ProfileFeed;
