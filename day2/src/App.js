import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
	// meme state
	const [memes, setMemes] = useState([]);
	const [selectedMeme, setSelectMeme] = useState({});
	const [selectedMemeImage, setSelectMemeImage] = useState("");
	const [captions, setCaptions] = useState([]);

	useEffect(() => {
		//fetch memes list
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => {
				return res.json();
			})
			.then((resJSON) => setMemes(resJSON.data.memes))
			.catch((err) => console.log(err));
	}, []);

	function selectMemeTemplate(memeObj) {
		setSelectMeme(memeObj);
		setSelectMemeImage(memeObj.url);
		setCaptions(new Array(memeObj.box_count).fill({}));
	}

	function generateMeme() {
		// const param = new FormData();
		// param.append("template_id", selectedMeme.id);
		// param.append("username", "AritraBasu");
		// param.append("password", "aritrabasu");

		// fetch("https://api.imgflip.com/caption_image", {
		// 	method: "POST",
		// 	body: param,
		// })
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((resJSON) => setSelectMemeImage(resJSON.data.url))
		// 	.catch((err) => console.log(err));

		console.log(captions);
	}

	function setCaption(e, index) {
		var captionValue = e.target.value || "";
		var dupCaptionsArray = [...captions];
		dupCaptionsArray[index] = captionValue;
		setCaptions(dupCaptionsArray);
	}
	return (
		<div className='App'>
			<div className='selected-meme-container'>
				<div className='selected-meme-container-left'>
					<form onSubmit={(e) => e.preventDefault()}>
						{captions &&
							captions.map((value, index) => {
								return (
									<>
										<label>Caption {index + 1}</label>
										<input
											type='text'
											onChange={(e) => {
												setCaption(e, index);
											}}></input>
									</>
								);
							})}
						<button onClick={generateMeme}> Generate Meme </button>
					</form>
				</div>
				<div className='selected-meme-container-right'>
					{selectedMemeImage && (
						<img src={selectedMemeImage} className='selected-image' />
					)}
				</div>
			</div>
			<div className='meme-container'>
				{memes.map((meme, index) => {
					return (
						<img
							key={index}
							src={meme.url}
							alt='memeImage'
							style={{ height: "150px", margin: "40px" }}
							onClick={() => selectMemeTemplate(meme)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
