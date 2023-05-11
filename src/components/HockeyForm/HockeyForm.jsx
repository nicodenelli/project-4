import { useState } from 'react'

import { Button, Form, Segment} from 'semantic-ui-react'

export default function HockeyForm({handleAddPost}){

	const [caption, setCaption] = useState('')

	const [selectedFile, setSelectedFile] = useState('')

	function handleChange(e){
		setCaption(e.target.value)
	}

	function handleFileInput(e){
		setSelectedFile(e.target.files[0])
	}

	function handleSubmit(e){
		e.preventDefault();

		const formData = new FormData();
		formData.append('caption', caption);
		formData.append('photo', selectedFile);

		handleAddPost(formData);
	}

	return (
        <>
		<Segment>
        <span className="profile-bio-span">Create a New Post!</span>
        <br />
        <br />
			<Form onSubmit={handleSubmit}>
				<Form.Input 
					placeholder='Post Details'
					required
					name="caption"
					onChange={handleChange}
				/>
				<Form.Input 
					type='file'
					placeholder="upload image"
					onChange={handleFileInput}
				/>
				<Button type="submit">Add Post</Button>
			</Form>
		</Segment>
        </>
	)
}