import { List } from 'semantic-ui-react'

export default function PageFooter() {
  return (
    <>
    <List floated='left'>
    Additional Info
    </List>
    <div>
    <List floated='right' horizontal>
      <List.Item disabled href='#'>
        © HatTrickHub, Inc.
      </List.Item>
      <List.Item href='#'>Terms</List.Item>
      <List.Item href='#'>Privacy</List.Item>
      <List.Item>Contact
      <List.Content>
        <a href='mailto:ndm9412@gmail.com'>
        <List.Icon name='mail' />ndm9412@gmail.com</a>
      </List.Content>
      </List.Item>
    </List>
    <List horizontal>
      <br />
      <List.Item href='#'>About Us</List.Item>
      <List.Item href='#'>Jobs</List.Item>
    </List>
  </div>
  </>
  )
}