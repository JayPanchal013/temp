import TextGenerator from "../Components/textGenerator";
import React, { useState } from "react";

const TextAnotator = () => {
	const [classArr, setClassArr] = useState({ Noun: [], Pronoun: [], Verb: [], Adjective: [], Adverb: [], Preposition: [], Conjunction: [], Interjection: [], None: [] });
	const [countArr, setCountArr] = useState({ Noun: 0, Pronoun: 0, Verb: 0, Adjective: 0, Adverb: 0, Preposition: 0, Conjunction: 0, Interjection: 0 });
	const [text, setText] = useState([""]);
	setTimeout(() => {
		const words = document.querySelectorAll(".customWord");
		let demoClassArr = classArr;
		for (let i = 0; i < words.length; i++) {
			let word = words[i].getAttribute("data-word");
			demoClassArr[words[i].getAttribute("data-partOfSpeech")].push(word);
		}
		console.clear();
		console.log(demoClassArr);
		setClassArr(demoClassArr);
	}, 10000);
	return (
		<div className="flex flex-nowrap gap-5 h-full w-full p-3">
			<div className="bg-primary-700 rounded-xl h-full w-[20%]">
				<div className="relative bg-primary-100 text-primary-700 rounded-lg font-semibold h-48 m-2 overflow-hidden flex justify-center items-center">
					<p className="text-xl text-center text-primary-700 font-mono">
						Drag and Drop
						<br />
						<span className="text-sm font-bold">Text File</span>
					</p>
					<input
						onChange={() => {
							let files = document.getElementById("inputFile").files;
							for (let i = 0; i < files.length; i++) {
								let file = files[i];
								let reader = new FileReader();
								reader.onload = function (e) {
									let fileViewer = document.createElement("div");
									fileViewer.classList.add("m-2", "px-2", "flex", "gap-2", "h-10", "rounded-lg", "bg-primary-100", "items-center");
									fileViewer.innerHTML = `
										<svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
											<path d="M8 40C8 36 8 10 8 10C8 6.68629 10.8654 4 14.4 4H40V36C40 36 19.9815 36 14.4 36C9.36225 36 8 36.6842 8 40Z" fill="#0369a1" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M12 44H40V36H12C9.79086 36 8 37.7909 8 40C8 42.2091 9.79086 44 12 44Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
										<p class="text-primary-700 font-bold truncate w-48">${file.name}</p>
									`;
									fileViewer.addEventListener("click", () => {
										//read file from inputfield and display it
										setText([e.target.result]);
										setCountArr({ Noun: 0, Pronoun: 0, Verb: 0, Adjective: 0, Adverb: 0, Preposition: 0, Conjunction: 0, Interjection: 0 });
										let customWords = document.querySelectorAll(".customWord");
										for (let i = 0; i < customWords.length; i++) {
											customWords[i].setAttribute("class", "customWord rounded border-2 border-transparent hover:border-primary-700 bg-transparent hover:bg-primary-200 px-0.5");
										}
									});
									document.getElementById("fileList").appendChild(fileViewer);
								};
								reader.readAsText(file);
							}
						}}
						id="inputFile"
						type="file"
						className="absolute w-full h-full opacity-0 cursor-pointer"
					/>
				</div>
				<hr className="border border-primary-100"></hr>
				<div id="fileList"></div>
			</div>
			<TextGenerator text={text[0]} countArr={countArr} setCountArr={setCountArr} />
			<div className="bg-primary-700 rounded-xl h-full w-[20%] p-2 text-white overflow-y-scroll noScroll">
				<pre>{JSON.stringify(classArr, null, 4)}</pre>
			</div>
		</div>
	);
};

export default TextAnotator;
