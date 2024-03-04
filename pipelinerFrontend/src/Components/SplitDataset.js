import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

function SplitDataset({ data, selected }) {
	const [finalData, setFinalData] = useState(data);
	const [train, setTrain] = useState(80);
	const [test, setTest] = useState(10);
	const [validation, setValidation] = useState(10);
	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-red-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-red-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
						<path fill="currentColor" d="M0 11h6v5h-6v-5z" />
						<path fill="currentColor" d="M11 10v-2l-0.64 0.64c-0.851-0.81-1.38-1.952-1.38-3.217 0-0.149 0.007-0.296 0.022-0.441l1.999 0.018v-5h-6v5h2c0.013 0.127 0.020 0.274 0.020 0.423 0 1.265-0.529 2.407-1.378 3.216l-0.642-0.638v2h2l-0.65-0.65c1.028-0.991 1.667-2.38 1.667-3.919 0-0.152-0.006-0.302-0.018-0.45-0.010 0.149-0.016 0.299-0.016 0.45 0 1.539 0.639 2.928 1.665 3.917l-0.648 0.652h2z" />
						<path fill="currentColor" d="M10 11h6v5h-6v-5z" />
					</svg>
					<p className="text-sm font-mono">Dataset Split</p>
				</div>
				<div className="flex items-center gap-[6px]">
					<div
						onClick={(event) => {
							var backspaceEventDown = new KeyboardEvent("keydown", {
								key: "Backspace",
								keyCode: 8,
								which: 8,
								code: "Backspace",
								bubbles: true,
							});
							event.currentTarget.dispatchEvent(backspaceEventDown);
						}}
						onMouseEnter={(event) => {
							var backspaceEventUp = new KeyboardEvent("keyup", {
								key: "Backspace",
								keyCode: 8,
								which: 8,
								code: "Backspace",
								bubbles: true,
							});
							event.currentTarget.dispatchEvent(backspaceEventUp);
						}}
						className="border border-white p-1 rounded-full shadow-inner text-red-800 bg-white cursor-pointer"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
							<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
						</svg>
					</div>
				</div>
			</div>
			<hr className="border-red-500" />
			<div className="px-2 py-1 w-full h-full flex flex-col gap-2 justify-between items-center bg-primary-800 rounded-b-[5px] cursor-default">
				<div className="border border-white/10 rounded-lg bg-white/10 backdrop-blur-xl p-2 my-1 w-[95%]">
					<div className="">
						<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
							<svg height={"15px"} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 28.054 28.054" xmlSpace="preserve">
								<g>
									<path
										style={{
											fill: "white",
										}}
										d="M27.961,1.867v11.204c0,0.319-0.258,0.578-0.578,0.578H12.144c-0.319,0-0.578-0.259-0.578-0.578 v-0.885l1.156-0.775v1.082h14.082V2.444H12.721v4.229c-0.051,0.039-0.106,0.073-0.154,0.117l-0.162,0.112 c-0.195-0.51-0.492-0.912-0.839-1.242V1.867c0-0.319,0.26-0.578,0.578-0.578h15.239C27.703,1.289,27.961,1.547,27.961,1.867z  M14.316,9.461l0.692-0.464h-0.001c0.001-0.004,0.003-0.004,0.005-0.007c0.352-0.349,0.406-0.868,0.188-1.277l5.599-3.799 l-0.254-0.375l-5.646,3.83c-0.177-0.128-0.375-0.209-0.583-0.216c-0.296-0.01-0.597,0.09-0.823,0.317c0,0-0.005,0.006-0.007,0.006 l-0.138,0.096l-1.254,0.856V8.064c-0.233-2.769-3.442-2.728-3.442-2.728h-1.39L6.094,7.258L4.92,5.337H3.587 c-3.621,0.068-3.493,2.727-3.493,2.727v6.206h0.002c0.001,0.016-0.002,0.035-0.002,0.048c0,0.591,0.477,1.066,1.066,1.066 c0.587,0,1.064-0.477,1.064-1.066c0-0.013,0-0.032-0.002-0.048h0.002V8.53H2.89L2.882,26.613c0,0.795,0.646,1.441,1.438,1.441 c0.795,0,1.439-0.646,1.439-1.441v-11.67H6.4v11.683l0.012,0.013c0.01,0.781,0.646,1.415,1.432,1.415 c0.789,0,1.431-0.643,1.431-1.432L9.271,8.5h0.693v1.888c0,0.002,0,0.007,0,0.009c0,0.587,0.477,1.065,1.063,1.065 c0.173,0,0.328-0.049,0.475-0.125l0.005,0.007l1.84-1.234L14.316,9.461z M6.073,4.874c1.346,0,2.437-1.091,2.437-2.437 S7.419,0,6.073,0S3.636,1.092,3.636,2.437S4.727,4.874,6.073,4.874z"
									/>
								</g>
							</svg>
							<p>Train ({train}%)</p>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							value={train}
							onChange={(event) => {
								setTrain(event.currentTarget.value);
								let trainTemp = event.currentTarget.value;
								let testTemp = 100 - trainTemp;
								testTemp = parseInt(testTemp / 2);
								let validationTemp = 100 - trainTemp - testTemp;
								setTest(testTemp);
								setValidation(validationTemp);
							}}
							className="w-full rounded-full"
						/>
					</div>
					<div className="">
						<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
							<svg fill="white" height="15px" width="15px" id="XMLID_215_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlSpace="preserve">
								<g>
									<g>
										<path d="M12,24c-1.2,0-2.1-1-2.8-1.8c-0.4-0.4-0.8-0.9-1-1c-0.3-0.1-1-0.1-1.5-0.1c-1.1,0.1-2.3,0.1-3.1-0.7s-0.8-2.1-0.7-3.1 c0-0.6,0.1-1.2-0.1-1.5c-0.1-0.3-0.6-0.7-1-1C1,14.1,0,13.2,0,12s1-2.1,1.8-2.8c0.4-0.4,0.9-0.8,1-1c0.1-0.3,0.1-1,0.1-1.5 C2.8,5.6,2.8,4.4,3.6,3.6c0.8-0.8,2.1-0.8,3.1-0.7c0.6,0,1.2,0.1,1.5-0.1c0.3-0.1,0.7-0.6,1-1C9.9,1,10.8,0,12,0s2.1,1,2.8,1.8 c0.4,0.4,0.8,0.9,1,1c0.3,0.1,1,0.1,1.5,0.1c1.1-0.1,2.3-0.1,3.1,0.7c0.8,0.8,0.8,2.1,0.7,3.1c0,0.6-0.1,1.2,0.1,1.5 c0.1,0.3,0.6,0.7,1,1C23,9.9,24,10.8,24,12s-1,2.1-1.8,2.8c-0.4,0.4-0.9,0.8-1,1c-0.1,0.3-0.1,1-0.1,1.5c0.1,1.1,0.1,2.3-0.7,3.1 c-0.8,0.8-2.1,0.8-3.1,0.7c-0.6,0-1.2-0.1-1.5,0.1c-0.3,0.1-0.7,0.6-1,1C14.1,23,13.2,24,12,24z M7.5,19.1c0.5,0,1,0.1,1.5,0.2 c0.7,0.3,1.3,0.9,1.8,1.5c0.4,0.5,1,1.1,1.3,1.1s0.9-0.6,1.3-1.1c0.5-0.6,1.1-1.2,1.8-1.5c0.7-0.3,1.6-0.3,2.4-0.2 c0.6,0,1.4,0.1,1.6-0.1s0.1-1,0.1-1.6c-0.1-0.8-0.1-1.7,0.2-2.4c0.3-0.7,0.9-1.3,1.5-1.8c0.4-0.3,1-0.9,1-1.2s-0.6-0.9-1.1-1.3 c-0.6-0.5-1.2-1.1-1.5-1.8c-0.3-0.7-0.3-1.6-0.2-2.4c0-0.6,0.1-1.4-0.1-1.6c-0.2-0.2-1-0.1-1.6-0.1c-0.8,0.1-1.7,0.1-2.4-0.2 c-0.7-0.3-1.3-0.9-1.8-1.5C12.9,2.6,12.3,2,12,2s-0.9,0.6-1.3,1.1c-0.5,0.6-1.1,1.2-1.8,1.5S7.3,4.9,6.5,4.8 c-0.6,0-1.4-0.1-1.6,0.1c-0.2,0.2-0.1,1-0.1,1.6c0.1,0.8,0.1,1.7-0.2,2.4c-0.3,0.7-0.9,1.3-1.5,1.8C2.6,11.1,2,11.7,2,12 s0.6,0.9,1.1,1.3c0.6,0.5,1.2,1.1,1.5,1.8s0.3,1.6,0.2,2.4c0,0.6-0.1,1.4,0.1,1.6c0.2,0.2,1,0.1,1.6,0.1 C6.8,19.2,7.1,19.1,7.5,19.1z M11,16.4l-3.7-3.7l1.4-1.4l2.3,2.3l5.3-5.3l1.4,1.4L11,16.4z" />
									</g>
								</g>
							</svg>
							<p>validation ({validation}%)</p>
						</div>
						<input
							type="range"
							value={validation}
							onChange={(event) => {
								setValidation(event.currentTarget.value);
								let trainTemp = train;
								let testTemp = 100 - trainTemp - event.currentTarget.value;
								setTest(testTemp);
							}}
							min="0"
							max={100 - train}
							className="w-full rounded-full"
						/>
					</div>
					<div className="">
						<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
							<svg height={"15px"} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
								<path fill="white" d="M180.942,18.633v96.969c0,14.051-11.39,25.443-25.443,25.443H56.205c-1.607,0-2.84-1.418-2.64-3.013 c1.667-13.219,7.681-25.607,17.201-35.112l69.453-69.453c10.16-10.175,23.589-16.342,37.817-17.483 C179.595,15.859,180.942,17.067,180.942,18.633z" />
								<g>
									<path fill="white" d="M155.501,156.832H56.205c-5.291,0-10.332-2.277-13.833-6.246c-3.505-3.976-5.135-9.271-4.471-14.531 c2.105-16.697,9.816-32.434,21.71-44.309l69.444-69.444c12.758-12.775,29.707-20.611,47.72-22.056 c10.882-0.859,19.959,7.729,19.959,18.388v96.969C196.731,138.335,178.236,156.832,155.501,156.832z M73.8,125.254h81.701 c5.323,0,9.654-4.329,9.654-9.652V35.256c-5.098,2.212-9.778,5.378-13.762,9.368l-69.461,69.461 C78.646,117.364,75.906,121.149,73.8,125.254z" />
									<path
										fill="white"
										d="M408.51,512H103.489C66.992,512,37.3,482.307,37.3,445.812V145.584c0-1.827,0.071-3.74,0.213-5.689 c1.372-18.205,9.218-35.292,22.095-48.149l69.444-69.445C142.77,8.564,161.024,0.655,180.442,0.039 C181.305,0.017,182.104,0,182.884,0H408.51c36.497,0,66.19,29.693,66.19,66.188v237.183c0,8.719-7.07,15.789-15.789,15.789 s-15.789-7.07-15.789-15.789V66.188c0-19.084-15.527-34.61-34.611-34.61H182.884c-0.504,0-1.02,0.014-1.524,0.027 c-11.27,0.358-21.942,4.981-29.968,13.018l-69.461,69.461c-7.536,7.525-12.125,17.518-12.925,28.146 c-0.084,1.146-0.128,2.288-0.128,3.354v300.228c0,19.084,15.525,34.61,34.61,34.61H408.51c19.084,0,34.611-15.526,34.611-34.61 v-47.71c0-8.719,7.07-15.789,15.789-15.789s15.789,7.07,15.789,15.789v47.71C474.7,482.308,445.008,512,408.51,512z"
									/>
									<path fill="white" d="M162.302,365.742c0-0.777,0.259-1.809,0.518-2.847l48.159-157.941 c2.848-9.063,14.501-13.463,26.411-13.463c11.91,0,23.562,4.4,26.411,13.463l48.417,157.941c0.259,1.036,0.518,2.07,0.518,2.847 c0,9.581-14.758,16.572-25.891,16.572c-6.474,0-11.651-2.073-13.204-7.509l-8.802-32.365h-54.635l-8.802,32.365 c-1.554,5.436-6.732,7.509-13.204,7.509C177.058,382.314,162.302,375.323,162.302,365.742z M256.288,311.367l-18.901-69.389 l-18.901,69.389H256.288z" />
									<path fill="white" d="M318.651,239.97v-18.38h-18.379c-5.305,0-8.905-4.737-8.905-11.935 c0-6.821,3.598-12.126,8.905-12.126h18.379V179.34c0-4.549,5.304-9.095,12.126-9.095c7.2,0,11.937,4.546,11.937,9.095v18.189 h18.189c4.547,0,9.095,5.304,9.095,12.126c0,7.198-4.547,11.935-9.095,11.935h-18.189v18.38c0,5.304-4.737,8.903-11.937,8.903 C323.956,248.874,318.651,245.275,318.651,239.97z" />
								</g>
							</svg>
							<p>Test ({test}%)</p>
						</div>
						<input
							type="range"
							value={test}
							onChange={(event) => {
								setTest(event.currentTarget.value);
								let trainTemp = train;
								let validationTemp = 100 - trainTemp - event.currentTarget.value;
								setValidation(validationTemp);
							}}
							min="0"
							max={100 - train}
							className="w-full rounded-full"
						/>
					</div>
				</div>
			</div>
			<Handle type="target" id="image" position={Position.Left} title="image" className="h-3 w-3 rounded-full bg-red-200 border-[3px] -translate-x-0.5 border-red-500 top-[50px]" />
			<Handle type="target" id="label" position={Position.Left} title="label" className="h-3 w-3 rounded-full bg-red-200 border-[3px] -translate-x-0.5 border-red-500 top-[80px]" />
			<Handle type="target" id="zip" position={Position.Left} title="zip" className="h-3 w-3 rounded-full bg-red-200 border-[3px] -translate-x-0.5 border-red-500 top-[110px]" />
			<Handle type="source" position={Position.Right} className="h-3 w-3 rounded-full bg-red-200 border-[3px] translate-x-0.5 border-red-500 top-[50px]" />
		</div>
	);
}

export default memo(SplitDataset);
