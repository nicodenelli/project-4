import { List } from 'semantic-ui-react'


export default function ContactsPage(){


    return (
        <>
        <h1>Contact Us!</h1>
        <br />
        <List>
          <List.Item>Social Media
          <List.Content>
            <br />
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
          <br />
          </List.Item>
          <List.Item>Email
          <List.Content>
            <br />
            <a href='mailto:ndm9412@gmail.com'>
            <List.Icon name='mail' />ndm9412@gmail.com</a>
          </List.Content>
          </List.Item>
        </List>
        <List horizontal>
          <List.Item href='#'>About Us</List.Item>
          <List.Item href='#'>Jobs</List.Item>
        </List>
      </>
      )
}