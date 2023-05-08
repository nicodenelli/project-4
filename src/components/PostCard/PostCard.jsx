import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, isProfile, loggedUser }) {
  console.log(loggedUser);

  return (
    <Card raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${post.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  post.user.photoSrc
                    ? post.user.photoSrc
                    : "https://i.imgur.com/sP26kFn.png"
                }
              />
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post?.photoSrc}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
    </Card>
  );
}
