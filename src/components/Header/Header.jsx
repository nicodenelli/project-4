import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon, List } from "semantic-ui-react";

export default function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing>
        <Header as="h2" floated="left">
            <Link to="/">
                <Icon name="home" className="profile-bio-span">Home</Icon>
            </Link>
        </Header>
        <br />
        <Header as="h2" floated="right">
            <Link to="" onClick={handleLogout}><span className="profile-bio-span">
            Logout</span>
            </Link>
        </Header>
        <br />
        <Header as="h2" floated="left">
            <Link to={`/${loggedUser?.username}`}><span className="profile-bio-span">Profile </span>
                <Image
                src={
                    loggedUser?.photoSrc
                    ? loggedUser?.photoSrc
                    : "https://i.imgur.com/sP26kFn.png"
                }
                avatar>
                </Image>
            </Link>
        </Header>
        <br />
        <br />
        <Segment>
        </Segment>
        <Header as="h2" floated="left">
            <a href="https://www.purehockey.com/"><span className="profile-bio-span">Pure Hockey Website</span></a>
        </Header>
            <List floated='right' link>
                <List.Item>
                <List.Content>
                    <a href="/">
                        <List.Icon name='angle double right' />Home</a>
                </List.Content>
                </List.Item>
                <List.Item>
                <List.Content>
                    <a href={`/${loggedUser?.username}`}>
                        <List.Icon name='angle double right' />Profile</a>
                </List.Content>
                </List.Item>
                <List.Item>
                <List.Content>
                    <a href={'/favorites'}>
                        <List.Icon name='angle double right' />Favorites</a>
                </List.Content>    
                </List.Item>
                <List.Item>
                <List.Content>
                    <a href={'/contacts'}>
                        <List.Icon name='angle double right' />Contact Us</a>
                </List.Content>
                </List.Item>
            </List>
    </Segment>
  )
}