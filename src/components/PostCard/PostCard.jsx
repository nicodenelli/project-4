import { Card, Image, Icon, CardDescription } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, isProfile, loggedUser, addFavorite, removeFavorite }) {
  console.log(loggedUser);

  const favoritedIndex = post.favorites.findIndex(
    (favorite) => favorite.username === loggedUser.username
  );

  const favoriteColor = favoritedIndex > -1 ? "red" : "grey";
  const cardDate = new Date(post.cardDate);
  const postDate = `${cardDate.toLocaleString('default', { month: 'long' })} ${cardDate.getDate()}, ${cardDate.getFullYear()}`;

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
              <span className="profile-bio-span">{post.user.username}</span>
            </Link>
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post?.photoSrc}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description><span className="profile-bio-span">{post.caption}</span></Card.Description>
        <Card.Description>{postDate}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"favorite"}
          size="large"
          color={favoriteColor}
          onClick={clickHandler}
        />
        <span className="profile-bio-span">{post.favorites.length} Favorites</span>
      </Card.Content>
    </Card>
  );
}
