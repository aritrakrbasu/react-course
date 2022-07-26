import React from "react";
import { NewComponent, NewComponent1 } from "./NewComponent";
import "./Component.css";

function Component({ text, subText, changeText }) {
	return (
		<div className='styledComponent'>
			{text} - {subText}
			<button onClick={changeText}>Change Text</button>
			<NewComponent1 />
			<NewComponent />
		</div>
	);
}

export default Component;
