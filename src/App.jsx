import { useState } from 'react';
import { Container, Box, useToast } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import KeywordsModal from './components/KeywordsModal';

function App() {
	const [keywords, setKeywords] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const extractKeywords = async (text) => {
		setLoading(true);
		setIsOpen(true);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: text
			})
		};

		try {
			const response = await fetch('/api/post-keywords', options);
			const json = await response.json();
			console.log(json);
			const data = json.data.choices[0].text.trim();
			setKeywords(data);
		} catch (error) {
			toast({
				title: 'Something went wrong.',
				description: 'Please try again or contact support.',
				status: 'error',
				duration: 5000,
				isClosable: false
			});
		} finally {
			setLoading(false);
		}
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
			<Container maxW='3x1' centerContent>
				<Header />
				<TextInput extractKeywords={extractKeywords} />
				<Footer />
			</Container>
			<KeywordsModal keywords={keywords} loading={loading} isOpen={isOpen} closeModal={closeModal} />
		</Box>
	);
}

export default App;
