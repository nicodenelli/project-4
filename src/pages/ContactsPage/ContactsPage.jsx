import { List, Grid, Message } from 'semantic-ui-react'
import PageHeader from "../../components/Header/Header";



export default function ContactsPage({loggedUser, handleLogout}){


    return (
        <>
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}  />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h1>Contact Us!</h1>
                    <List>
                        <List.Item>
                        <Message color='lime green'>Social Media
                            <List.Content>
                                <a href='https://www.facebook.com'>
                                    <List.Icon name='facebook' />Facebook</a>
                            </List.Content>
                                <br />
                            <List.Content>
                                <a href='https://www.instagram.com'>
                                    <List.Icon name='instagram' />Instagram</a>
                            </List.Content>
                                <br />
                            <List.Content>
                                <a href='https://www.linkedin.com'>
                                    <List.Icon name='linkedin' />linkedIn</a>
                            </List.Content>                                               
                            <List.Content>Email
                                <br />
                                <a href='mailto:ndm9412@gmail.com'>
                                    <List.Icon name='mail' />ndm9412@gmail.com</a>
                            </List.Content>
                        </Message>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </>
      )
}