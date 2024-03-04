import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const Predictor = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-yellow-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-yellow-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg width={14} height={14} viewBox="0 0 24 24">
						<g id="\uD83D\uDD0D-Product-Icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
							<g id="ic_fluent_predictions_24_regular" fill="currentColor" fillRule="nonzero">
								<path
									d="M12,2 C13.1533411,2 14.239122,2.28925943 15.1887536,2.79918917 C15.112506,3.24499916 14.9646822,3.56044404 14.7625631,3.76256313 C14.651965,3.87316122 14.5073983,3.96747369 14.3258552,4.04282999 C13.6240917,3.69484129 12.8347996,3.5 12,3.5 C9.10050506,3.5 6.75,5.85050506 6.75,8.75 C6.75,10.8881837 8.02822265,12.7278225 9.8622211,13.5464695 C10.5502799,13.8149728 11.1856692,13.9625453 11.7682833,13.9937269 L12,14 C12.6447239,14 13.3574543,13.8508379 14.1372164,13.5477329 C15.0530197,13.1384379 15.8301861,12.4750311 16.3789152,11.6472257 C17.0183307,11.8672416 17.7876826,11.7336231 18.2728071,11.2466813 C17.8577163,12.2895137 17.1901986,13.2039271 16.345851,13.9150872 L17.967289,18.7801589 C18.2335628,19.5789337 17.8932573,20.4540914 17.1573198,20.8631617 C15.7855762,21.6256443 14.0642518,22 12,22 C9.93575073,22 8.214428,21.6256452 6.84268887,20.8631665 C6.10675341,20.4541035 5.76644595,19.5789539 6.03270398,18.7801798 L7.654149,13.9150872 C6.18404803,12.6768801 5.25,10.8225194 5.25,8.75 C5.25,5.02207794 8.27207794,2 12,2 Z M15.0565518,14.7913638 L14.6969316,14.9394573 L14.6788415,14.9475423 C13.9522531,15.2620316 13.1594698,15.452487 12.3271908,15.4922091 C12.3209854,15.4911059 12.3153059,15.4914155 12.3096286,15.4917168 C12.2858058,15.4941022 12.2614052,15.4950751 12.2369716,15.4959181 L12,15.5 L11.804,15.496 L11.6733328,15.4907882 C10.8405302,15.452487 10.0477469,15.2620316 9.32115848,14.9475423 L9.30306837,14.9394573 C9.18403381,14.8929562 9.06416108,14.8435884 8.94344816,14.7913638 L7.45572893,19.2545215 C7.41769197,19.3686323 7.4663069,19.4936526 7.57144272,19.5520914 C8.7000759,20.1794401 10.1740439,20.5 12,20.5 C13.8259583,20.5 15.2999275,20.1794394 16.4285612,19.5520892 C16.533696,19.4936502 16.5823098,19.368631 16.5442682,19.2545129 L15.0565518,14.7913638 Z M11.6898272,15.4930001 L11.804,15.496 L11.8373106,15.4976957 L12,15.5 C11.8960435,15.5 11.7926358,15.49765 11.6898272,15.4930001 Z M17.9924045,1.88020833 L18,2 C18,3.14960906 18.2698654,3.95920521 18.7803301,4.46966991 C19.2515283,4.9408681 19.9776077,5.20705858 20.9907227,5.24522281 L21.25,5.25 C22.2083333,5.25 22.2482639,6.62760417 21.3697917,6.74240451 L21.25,6.75 C20.1003909,6.75 19.2907948,7.01986538 18.7803301,7.53033009 C18.3091319,8.00152827 18.0429414,8.72760769 18.0047772,9.74072273 L18,10 C18,11 16.5,11 16.5,10 C16.5,8.85039094 16.2301346,8.04079479 15.7196699,7.53033009 C15.2484717,7.0591319 14.5223923,6.79294142 13.5092773,6.75477719 L13.25,6.75 C12.2916667,6.75 12.2517361,5.37239583 13.1302083,5.25759549 L13.25,5.25 C14.3996091,5.25 15.2092052,4.98013462 15.7196699,4.46966991 C16.2301346,3.95920521 16.5,3.14960906 16.5,2 C16.5,1.04166667 17.8776042,1.00173611 17.9924045,1.88020833 Z M17.25,4.95250583 L17.1063227,5.15616731 C17.0062588,5.28827689 16.8976229,5.41303729 16.7803301,5.53033009 C16.6043909,5.70626928 16.4116496,5.86273057 16.2025058,6 C16.4116496,6.13726943 16.6043909,6.29373072 16.7803301,6.46966991 C16.9562693,6.64560911 17.1127306,6.8383504 17.25,7.04749417 C17.3872694,6.8383504 17.5437307,6.64560911 17.7196699,6.46966991 C17.8956091,6.29373072 18.0883504,6.13726943 18.2974942,6 C18.0883504,5.86273057 17.8956091,5.70626928 17.7196699,5.53033009 C17.6023771,5.41303729 17.4937412,5.28827689 17.3936773,5.15616731 L17.25,4.95250583 Z"
									id="\uD83C\uDFA8-Color"
								/>
							</g>
						</g>
					</svg>
					<p className="text-sm font-mono">Predictor</p>
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
			<hr className="border-yellow-500" />
			<div className="p-2 w-full h-full bg-primary-800 flex flex-col gap-2 rounded-b-[5px] cursor-default">
				<div className="w-full">
					<div className="text-white flex items-center justify-start gap-[6px] mb-2 text-xs font-mono">
						<svg width={16} height={16} viewBox="0 0 400 400.00001">
							<g transform="translate(0,-652.36216)">
								<path
									style={{
										opacity: 1,
										fill: "currentColor",
										fillOpacity: 1,
										stroke: "none",
										strokeWidth: 25,
										strokeMiterlimit: 4,
										strokeDasharray: "none",
										strokeDashoffset: 0,
										strokeOpacity: 1,
									}}
									d="m 237.4297,701.86214 0,40 -186,0 0,49.6914 -51.4297,0 0,211.30866 400,0 0,-300.00006 0,-1 -137.5703,0 z m 25,25 112.5703,0 0,251 -50,0 0,-185.42 -0.1621,0 0,-0.8886 -248.4082,0 0,-24.6914 186,0.9453 z"
								></path>
							</g>
						</svg>
						<p className="text-white">Project</p>
					</div>
					<select className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium">
						<option selected disabled>
							--Select Project--
						</option>
						<option value="Project-1">Project-1</option>
						<option value="Project-2">Project-2</option>
						<option value="Project-3">Project-3</option>
						<option value="Project-4">Project-4</option>
						<option value="Project-5">Project-5</option>
					</select>
				</div>
				<div className="w-full">
					<div className="text-white flex items-center justify-start gap-1 mb-2 text-xs font-mono">
						<svg fill="currentColor" width="16px" height="16px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
							<path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
						</svg>
						<p className="text-white">Model</p>
					</div>
					<select className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium">
						<option selected disabled>
							--Select Model--
						</option>
						<option value="YOLOv8n-seg">YOLOv8n-seg</option>
						<option value="YOLOv8s-seg">YOLOv8s-seg</option>
						<option value="YOLOv8m-seg">YOLOv8m-seg</option>
						<option value="YOLOv8l-seg">YOLOv8l-seg</option>
						<option value="YOLOv8x-seg">YOLOv8x-seg</option>
					</select>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] -translate-x-0.5 border-yellow-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] translate-x-0.5 border-yellow-500 top-[50px]" />
		</div>
	);
};

export default memo(Predictor);
