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
		<Segment>
			<Form onSubmit={handleSubmit}>
				<Form.Input 
					placeholder='Item Details'
					required
					name="caption"
					onChange={handleChange}
				/>
				<Form.Input 
					type='file'
					placeholder="upload image"
					onChange={handleFileInput}
				/>
				<Button type="submit">Add Item</Button>
			</Form>
		</Segment>
	)
}