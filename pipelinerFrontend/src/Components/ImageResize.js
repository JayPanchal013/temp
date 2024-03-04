import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const ImageResize = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	const [width, setWidth] = useState(640);
	const [height, setHeight] = useState(640);
	const [ratio, setRatio] = useState(1);
	const [keepRatio, setKeepRatio] = useState(true);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-green-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-green-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="currentColor" className="bi bi-aspect-ratio" viewBox="0 0 16 16">
						<path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
						<path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z" />
					</svg>
					<p className="text-sm font-mono">Image Resize</p>
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
			<hr className="border-green-500" />
			<div className="p-2 w-full h-full bg-primary-800 flex flex-col gap-2 rounded-b-[5px] cursor-default">
				<div className="w-full rounded-lg relative flex flex-col items-center justify-center">
					<img style={{ aspectRatio: width + "/" + height }} src={"https://picsum.photos/id/238/300/300"} alt="image" className="h-full max-h-32 max-w-full rounded-lg" />
				</div>
				<div className="flex justify-between items-center flex-nowrap">
					<label className="relative max-w-10 w-10 h-4 group-hover:inline-block">
						<input
							type="checkbox"
							defaultChecked={keepRatio}
							onClick={() => {
								setKeepRatio(!keepRatio);
							}}
							className="peer opacity-0 w-0 h-0"
						/>
						<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-900 transition-all duration-300 rounded-full before:absolute before:h-2 before:w-2 before:bg-white before:content-[''] before:left-[4px] before:top-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-[24px]" />
					</label>
					<button
						onClick={() => {
							setWidth(640);
							setHeight(640);
							setRatio(1);
						}}
						className="text-xs font-semibold font-mono text-white bg-green-500 rounded-full px-2 cursor-pointer"
					>
						640 x 640
					</button>
				</div>
				<div className="w-full">
					<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
						<svg fill="white" width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M22 12H2M22 12L18 16M22 12L18 8M2 12L6 16M2 12L6 8" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<p>Width ({width}px)</p>
					</div>
					<input
						type="range"
						min="400"
						max="1024"
						value={width}
						onChange={(event) => {
							if (keepRatio) {
								let widthTemp = event.currentTarget.value;
								let heightTemp = parseInt(event.currentTarget.value / ratio);
								let ratioTemp = widthTemp / heightTemp;
								setWidth(widthTemp);
								setHeight(heightTemp);
								setRatio(ratioTemp);
							} else {
								let widthTemp = event.currentTarget.value;
								let heightTemp = height;
								let ratioTemp = widthTemp / heightTemp;
								setWidth(widthTemp);
								setRatio(ratioTemp);
							}
						}}
						className="w-full rounded-full"
					/>
				</div>
				<div className="w-full">
					<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
						<svg className="rotate-90" fill="white" width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M22 12H2M22 12L18 16M22 12L18 8M2 12L6 16M2 12L6 8" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<p>Height ({height}px)</p>
					</div>
					<input
						type="range"
						min="400"
						max="1024"
						value={height}
						onChange={(event) => {
							if (keepRatio) {
								let heightTemp = event.currentTarget.value;
								let widthTemp = parseInt(event.currentTarget.value * ratio);
								let ratioTemp = widthTemp / heightTemp;
								setHeight(heightTemp);
								setWidth(widthTemp);
								setRatio(ratioTemp);
							} else {
								let heightTemp = event.currentTarget.value;
								let widthTemp = width;
								let ratioTemp = widthTemp / heightTemp;
								setHeight(heightTemp);
								setRatio(ratioTemp);
							}
						}}
						className="w-full rounded-full"
					/>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-green-200 border-[3px] -translate-x-0.5 border-green-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-green-200 border-[3px] translate-x-0.5 border-green-500 top-[50px]" />
		</div>
	);
};

export default memo(ImageResize);
