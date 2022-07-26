import logo from "./logo.svg";
import "./App.css";
import Component from "./components/Component";
import { useEffect, useState } from "react";

function App() {
	const [message, setMessage] = useState("hi");
	const [message1, setMessage1] = useState("hello");
	// meme state
	const [memes, setMemes] = useState([]);

	useEffect(() => {
		//fetch memes list
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => {
				return res.json();
			})
			.then((resJSON) => setMemes(resJSON.data.memes))
			.catch((err) => console.log(err));
	});

	// change parent component value using callback
	function changeText() {
		setMessage("hello");
	}

	return (
		<div className='App'>
			<Component text={message} subText={message1} changeText={changeText} />
			{memes[0]?.id}
			{memes.map((meme, index) => {
				return <p key={index}>{meme.url}</p>;
			})}
		</div>
	);
}

export default App;
