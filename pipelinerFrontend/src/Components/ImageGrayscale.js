import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const ImageGrayscale = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	const [grayscale, setGrayscale] = useState(0);
	const [satuaration, setSatuaration] = useState(100);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-green-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-green-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg fill="currentColor" width={14} height={14} viewBox="0 0 20 20">
						<path d="M10,20C4.5,20,0,15.5,0,10S4.5,0,10,0s10,4.5,10,10S15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2 z" />
						<path d="M10,4v12c3.3,0,6-2.7,6-6S13.3,4,10,4z" />
					</svg>
					<p className="text-sm font-mono">Image Grayscale</p>
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
					<img style={{ filter: "grayscale(" + grayscale + "%) saturate(" + satuaration + "%)" }} src={"https://picsum.photos/id/200/300/300"} alt="image" className="h-full max-h-32 max-w-full rounded-lg" />
				</div>
				<div className="flex justify-end items-center flex-nowrap">
					<button
						onClick={() => {
							setGrayscale(0);
							setSatuaration(100);
						}}
						className="text-xs font-semibold font-mono text-white bg-green-500 rounded-full px-2 cursor-pointer"
					>
						Reset
					</button>
				</div>
				<div className="w-full">
					<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
						<svg fill="white" width="15px" height="15px" viewBox="-4 0 32 32" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 25.344v-18.688h24v18.688h-24zM11.969 21.781v1.969h2v-1.969h2.031v-1.906h-2.031v-1.969h2.031v-1.906h-2.031v-1.938h2.031v-1.906h-2.031v-1.969h2.031v-1.938h-2.031v1.938h-2v-1.938h-2.031v1.938h-1.938v-1.938h-6.406v15.5h8.344v-1.969h2.031zM11.969 10.188v1.969h-2.031v-1.969h2.031zM8 14.063v-1.906h1.938v1.906h-1.938zM13.969 14.063h-2v-1.906h2v1.906zM9.938 14.063h2.031v1.938h-2.031v-1.938zM8 17.906v-1.906h1.938v1.906h-1.938zM13.969 17.906h-2v-1.906h2v1.906zM9.938 19.875v-1.969h2.031v1.969h-2.031zM8 21.781v-1.906h1.938v1.906h-1.938zM11.969 19.875h2v1.906h-2v-1.906z" />
						</svg>
						<p>Grayscale ({grayscale}%)</p>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						value={grayscale}
						onChange={(event) => {
							setGrayscale(event.currentTarget.value);
						}}
						className="w-full rounded-full"
					/>
				</div>
				<div className="w-full">
					<div className="text-xs font-mono flex items-center justify-start gap-2 text-white">
						<svg fill="white" width="15px" height="15px" viewBox="0 0 20 20" enableBackground="new 0 0 20 20" xmlSpace="preserve">
							<path d="M10,20C4.5,20,0,15.5,0,10S4.5,0,10,0s10,4.5,10,10S15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2 z" />
							<path d="M10,4v12c3.3,0,6-2.7,6-6S13.3,4,10,4z" />
						</svg>
						<p>Satuaration ({satuaration}%)</p>
					</div>
					<input
						type="range"
						min="0"
						max="300"
						value={satuaration}
						onChange={(event) => {
							setSatuaration(event.currentTarget.value);
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

export default memo(ImageGrayscale);
