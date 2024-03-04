import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const Trainer = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);
	const [epochs, setEpochs] = useState(1)
	const [batch, setBatch] = useState(1)

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-blue-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-blue-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg fill="currentColor" width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								fill="currentColor"
								d="M45.6,18.7,41,14.9V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2L24,5.9,18.5,2.2,17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4L2.4,18.7a.8.8,0,0,0-.4.8v9H2a.8.8,0,0,0,.4.8L7,33.1v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2L24,42.1l5.5,3.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l4.6-3.8a.8.8,0,0,0,.4-.7V19.4h0A.8.8,0,0,0,45.6,18.7Zm-5.1,6.8H42v1.6l-3.5,2.8-.4.3-.4-.2a1.4,1.4,0,0,0-2,.7,1.5,1.5,0,0,0,.6,2l.7.3h0v5.4l-6.6,3.1-4.2-2.8-.7-.5V25.5H27a1.5,1.5,0,0,0,0-3H25.5V9.7l.7-.5,4.2-2.8L37,9.5v5.4h0l-.7.3a1.5,1.5,0,0,0-.6,2,1.4,1.4,0,0,0,1.3.9l.7-.2.4-.2.4.3L42,20.9v1.6H40.5a1.5,1.5,0,0,0,0,3ZM21,25.5h1.5V38.3l-.7.5-4.2,2.8L11,38.5V33.1h0l.7-.3a1.5,1.5,0,0,0,.6-2,1.4,1.4,0,0,0-2-.7l-.4.2-.4-.3L6,27.1V25.5H7.5a1.5,1.5,0,0,0,0-3H6V20.9l3.5-2.8.4-.3.4.2.7.2a1.4,1.4,0,0,0,1.3-.9,1.5,1.5,0,0,0-.6-2L11,15h0V9.5l6.6-3.1,4.2,2.8.7.5V22.5H21a1.5,1.5,0,0,0,0,3Z"
							/>
							<path fill="currentColor" d="M13.9,9.9a1.8,1.8,0,0,0,0,2.2l2.6,2.5v2.8l-4,4v5.2l4,4v2.8l-2.6,2.5a1.8,1.8,0,0,0,0,2.2,1.5,1.5,0,0,0,1.1.4,1.5,1.5,0,0,0,1.1-.4l3.4-3.5V29.4l-4-4V22.6l4-4V13.4L16.1,9.9A1.8,1.8,0,0,0,13.9,9.9Z" />
							<path fill="currentColor" d="M31.5,14.6l2.6-2.5a1.8,1.8,0,0,0,0-2.2,1.8,1.8,0,0,0-2.2,0l-3.4,3.5v5.2l4,4v2.8l-4,4v5.2l3.4,3.5a1.7,1.7,0,0,0,2.2,0,1.8,1.8,0,0,0,0-2.2l-2.6-2.5V30.6l4-4V21.4l-4-4Z" />
						</g>
					</svg>
					<p className="text-sm font-mono">Trainer</p>
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
			<hr className="border-blue-500" />
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

								>
								</path>
							</g>
						</svg>
						<p className="text-white">Project</p>
					</div>
					<select className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium">
						<option selected disabled>--Select Project--</option>
						<option value="Project-1">Project-1</option>
						<option value="Project-2">Project-2</option>
						<option value="Project-3">Project-3</option>
						<option value="Project-4">Project-4</option>
						<option value="Project-5">Project-5</option>
					</select>
				</div>
				<div className="w-full">
					<div className="text-white flex items-center justify-start gap-1 mb-2 text-xs font-mono">
						<svg
							fill="currentColor"
							width="16px"
							height="16px"
							viewBox="0 0 100 100"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
						</svg>
						<p className="text-white">Model</p>
					</div>
					<select className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium">
						<option selected disabled>--Select Model--</option>
						<option value="YOLOv8n-seg">YOLOv8n-seg</option>
						<option value="YOLOv8s-seg">YOLOv8s-seg</option>
						<option value="YOLOv8m-seg">YOLOv8m-seg</option>
						<option value="YOLOv8l-seg">YOLOv8l-seg</option>
						<option value="YOLOv8x-seg">YOLOv8x-seg</option>
					</select>
				</div>
				<div className="w-full my-3">
					<div className="text-white flex items-center justify-start gap-1 mb-2 text-xs font-mono">
						<svg
							fill="currentColor"
							height="16px"
							width="16px"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<g>
								<g>
									<path d="M15,24H0V9h2v13h13V24z M19,20H4V5h2v13h13V20z M24,16H8V0h16V16z M10,14h12V2H10V14z" />
								</g>
							</g>
						</svg>
						<p>Epochs ({epochs})</p>
					</div>
					<input
						type="range"
						min="1"
						max="300"
						value={epochs}
						onChange={(event) => {
							setEpochs(event.currentTarget.value)
						}}
						className="w-full rounded-full"
					/>
				</div>
				<div className="w-full">
					<div className="text-white flex items-center justify-between gap-1 mb-2 text-xs font-mono">
						<div className="flex items-center justify-start gap-1">
							<svg
								width="16px"
								height="16px"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 20v-8h14l.002 8H5zM5 6h14v2H5zm2-4h10v2H7z" />
							</svg>
							<p>Batch ({batch})</p>
						</div>
						<label className="relative max-w-10 w-10 h-4 group-hover:inline-block">
							<input
								type="checkbox"
								onClick={() => {
									setBatch(16)
									if (document.getElementById("batchRange").disabled) {
										document.getElementById("batchRange").disabled = false
									}
									else {
										document.getElementById("batchRange").disabled = true
									}
								}}
								className="peer opacity-0 w-0 h-0"
							/>
							<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-900 transition-all duration-300 rounded-full before:absolute before:h-2 before:w-2 before:bg-white before:content-[''] before:left-[4px] before:top-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-[24px]" />
						</label>
					</div>
					<input
						type="range"
						min="1"
						max="64"
						id="batchRange"
						value={batch}
						onChange={(event) => {
							setBatch(event.currentTarget.value)
						}}
						className="w-full rounded-full"
					/>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] -translate-x-0.5 border-blue-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] translate-x-0.5 border-blue-500 top-[50px]" />
		</div>
	);
};

export default memo(Trainer);