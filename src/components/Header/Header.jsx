import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home" className="profile-bio-span"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}><span className="profile-bio-span">
          Logout</span>
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoSrc
                ? loggedUser?.photoSrc
                : "https://i.imgur.com/sP26kFn.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
      <br />
      <br />
      <Segment>
      </Segment>
      <Header as="h2" floated="left">
        <Link to="https://www.purehockey.com/">
        Pure Hockey Website
        </Link>
      </Header>

    </Segment>
  )
}

export default PageHeader;