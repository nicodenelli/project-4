import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, isProfile, loggedUser, addFavorite, removeFavorite }) {
  console.log(loggedUser);

  const favoritedIndex = post.favorites.findIndex(
    (favorite) => favorite.username === loggedUser.username
  );

  const favoriteColor = favoritedIndex > -1 ? "red" : "grey";

  const clickHandler =
  favoritedIndex > -1
      ? () => removeFavorite(post.favorites[favoritedIndex]._id)
      : () => addFavorite(post._id);

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
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={favoriteColor}
          onClick={clickHandler}
        />
        {post.favorites.length} Favorites
      </Card.Content>
    </Card>
  );
}
