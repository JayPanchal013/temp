import React, { useState, useEffect } from "react";

const TextGenerator = ({ text, countArr, setCountArr }) => {
	const classDict = {
		Noun: "bg-red-200 border-red-600",
		Pronoun: "bg-blue-200 border-blue-600",
		Verb: "bg-green-200 border-green-600",
		Adjective: "bg-pink-300 border-pink-600",
		Adverb: "bg-yellow-200 border-yellow-600",
		Preposition: "bg-purple-200 border-purple-600",
		Conjunction: "bg-gray-200 border-gray-600",
		Interjection: "bg-indigo-200 border-indigo-600",
	};

	const textArray = text.split("\n");
	async function fetchWord() {
		const words = document.querySelectorAll(".customWord");
		for (let i = 0; i < words.length; i++) {
			let word = words[i]
				.getAttribute("data-word")
				.toLowerCase()
				.replace(/[^a-zA-Z ]/g, "");

			var requestOptions = {
				method: "GET",
				redirect: "follow",
			};
			// fetch("https://corsproxy.io/?https://www.dictionary.com/browse/" + word, requestOptions)
			// 	.then((response) => response.text())
			// 	.then((result) => {
			// 		try {
			// 			let partOfSpeech = result.split('class="luna-pos">')[1].split("</")[0].replace(/,/g, "");
			// 			let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
			// 			words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
			// 			words[i].classList.remove("bg-transparent");
			// 			words[i].classList.remove("border-transparent");
			// 			words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
			// 			let demoCountArr = countArr;
			// 			demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
			// 			setCountArr(demoCountArr);
			// 		} catch {
			// 			fetch("https://corsproxy.io/?https://www.vocabulary.com/dictionary/definition.ajax?search=" + word + "&lang=en", requestOptions)
			// 				.then((response) => response.text())
			// 				.then((result) => {
			// 					try {
			// 						let partOfSpeech = result.split('title="')[1].split('"')[0].replace(/,/g, "");
			// 						let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
			// 						words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
			// 						words[i].classList.remove("bg-transparent");
			// 						words[i].classList.remove("border-transparent");
			// 						words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
			// 						let demoCountArr = countArr;
			// 						demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
			// 						setCountArr(demoCountArr);
			// 					} catch {}
			// 				})
			// 				.catch((error) => {});
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		fetch("https://corsproxy.io/?https://www.vocabulary.com/dictionary/definition.ajax?search=" + word + "&lang=en", requestOptions)
			// 			.then((response) => response.text())
			// 			.then((result) => {
			// 				try {
			// 					let partOfSpeech = result.split('title="')[1].split('"')[0].replace(/,/g, "");
			// 					let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
			// 					words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
			// 					words[i].classList.remove("bg-transparent");
			// 					words[i].classList.remove("border-transparent");
			// 					words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
			// 					let demoCountArr = countArr;
			// 					demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
			// 					setCountArr(demoCountArr);
			// 				} catch {}
			// 			})
			// 			.catch((error) => {});
			// 	});
			try {
				const response = await fetch("https://corsproxy.io/?https://www.dictionary.com/browse/" + word, requestOptions);
				const result = await response.text();

				try {
					let partOfSpeech = result.split('class="luna-pos">')[1].split("</")[0].replace(/,/g, "");
					let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
					words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
					words[i].classList.remove("bg-transparent");
					words[i].classList.remove("border-transparent");
					words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
					let demoCountArr = countArr;
					demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
					setCountArr(demoCountArr);
				} catch {
					const response = await fetch("https://corsproxy.io/?https://www.vocabulary.com/dictionary/definition.ajax?search=" + word + "&lang=en", requestOptions);
					const result = await response.text();
					try {
						let partOfSpeech = result.split('title="')[1].split('"')[0].replace(/,/g, "");
						let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
						words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
						words[i].classList.remove("bg-transparent");
						words[i].classList.remove("border-transparent");
						words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
						let demoCountArr = countArr;
						demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
						setCountArr(demoCountArr);
					} catch {}
				}
			} catch {
				const response = await fetch("https://corsproxy.io/?https://www.vocabulary.com/dictionary/definition.ajax?search=" + word + "&lang=en", requestOptions);
				const result = await response.text();
				try {
					let partOfSpeech = result.split('title="')[1].split('"')[0].replace(/,/g, "");
					let classes = classDict[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()];
					words[i].classList.add(classes.split(" ")[0], classes.split(" ")[1]);
					words[i].classList.remove("bg-transparent");
					words[i].classList.remove("border-transparent");
					words[i].setAttribute("data-partOfSpeech", partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase());
					let demoCountArr = countArr;
					demoCountArr[partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.substr(1).toLowerCase()]++;
					setCountArr(demoCountArr);
				} catch {}
			}
		}
	}
	return (
		<div className="bg-primary-700 flex flex-col gap-2 rounded-xl h-full w-[60%] p-2">
			<div className="h-fit flex flex-wrap gap-2 w-full bg-primary-100 rounded-lg p-2">
				<div className={classDict["Noun"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Noun <span class={classDict["Noun"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Noun"]}</span>
				</div>
				<div className={classDict["Pronoun"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Pronoun <span class={classDict["Pronoun"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Pronoun"]}</span>
				</div>
				<div className={classDict["Verb"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Verb <span class={classDict["Verb"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Verb"]}</span>
				</div>
				<div className={classDict["Adjective"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Adjective <span class={classDict["Adjective"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Adjective"]}</span>
				</div>
				<div className={classDict["Adverb"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Adverb <span class={classDict["Adverb"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Adverb"]}</span>
				</div>
				<div className={classDict["Preposition"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Preposition <span class={classDict["Preposition"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Preposition"]}</span>
				</div>
				<div className={classDict["Conjunction"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Conjunction <span class={classDict["Conjunction"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Conjunction"]}</span>
				</div>
				<div className={classDict["Interjection"] + " border-2 rounded-lg px-2 h-8 flex items-center text-black relative"}>
					Interjection <span class={classDict["Interjection"] + " rounded-full border-2 text-xs absolute -top-2 -right-2 px-1"}>{countArr["Interjection"]}</span>
				</div>
				<div className="text-primary-700 rounded-full h-8 w-8 flex items-center justify-center border-2 border-primary-800">
					<svg fill="#0369a1" width="20px" height="20px" viewBox="0 0 24 24" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" className="icon line-color">
						<path
							d="M5,12H19M12,5V19"
							style={{
								fill: "none",
								stroke: "#0369a1",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
							}}
						/>
					</svg>
				</div>
				<div onClick={() => fetchWord()} className="text-primary-700 rounded-full h-8 w-8 flex items-center justify-center border-2 border-primary-800 hover:scale-105 transition-all duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 32 32" xmlSpace="preserve">
						<style type="text/css">{"\n\t.linesandangles_een{fill:#0369a1;}\n"}</style>
						<path className="linesandangles_een" d="M23,3l-7,5L4.031,19.875l1,1L3,25l1,1l-2,2l3,1l1-1l1,1l4-2l1,1l12-12l5-7L23,3z M16.704,10.118 l5.174,5.174l-9.586,9.586l-5.212-5.212L16.704,10.118z M5.427,24.599l1.24-2.518L9.9,25.314l-2.505,1.253L5.427,24.599z  M23.155,13.741l-4.897-4.897l4.525-3.232l3.604,3.604L23.155,13.741z" />
					</svg>
				</div>
			</div>
			<div className="overflow-y-scroll noScroll">
				{textArray.map((line, index) => {
					return (
						<div key={index} className="bg-primary-100 p-2 h-max w-full rounded-lg mb-2 flex flex-wrap">
							{line
								.replace(/\n/g, "")
								.split(" ")
								.map((word, index1) => {
									if (word === "\n") {
										return <br key={index1} />;
									} else if (word !== " " && word !== "") {
										return (
											<div key={index1} data-word={word} data-partOfSpeech="None" className="customWord rounded border-2 border-transparent hover:border-primary-700 bg-transparent hover:bg-primary-200 px-0.5">
												{word}
											</div>
										);
									}
								})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TextGenerator;
