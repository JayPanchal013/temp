import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const ImageRotateFlip = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);
	const [rotation, setRotation] = useState(0);
	const [flipY, setFlipY] = useState(0);
	const [flipX, setFlipX] = useState(0);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-green-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-green-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
						<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
					</svg>
					<p className="text-sm font-mono whitespace-nowrap">Image Rotate</p>
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
				<div className="w-full rounded-lg relative flex flex-col items-center justify-center overflow-hidden drop-shadow-lg">
					<img src={"https://picsum.photos/id/237/300/300"} alt="image" style={{ transform: "rotate(" + rotation + "deg) rotateX(" + flipX + "deg) rotateY(" + flipY + "deg)" }} className="h-full max-h-32 w-auto max-w-full rounded-lg transition-all object-contain" />
				</div>
				<div className="text-green-500 flex items-cneter justify-between">
					<div
						className="bg-white p-1 rounded-full cursor-pointer"
						onClick={() => {
							setRotation((rotation + 90) % 360);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
						</svg>
					</div>
					<div
						className="bg-white p-1 rounded-full cursor-pointer"
						onClick={() => {
							setRotation((rotation - 90) % 360);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
							<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
						</svg>
					</div>
					<div
						className="bg-white p-1 rounded-full cursor-pointer"
						onClick={() => {
							setFlipY((flipY + 180) % 360);
						}}
					>
						<svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.9472136,12.7236068 C7.82371897,12.970596 7.52338245,13.0707082 7.2763932,12.9472136 C7.02940395,12.823719 6.92929178,12.5233825 7.0527864,12.2763932 C8.13468107,10.1126039 9.80358687,9 12,9 C14.1964131,9 15.8653189,10.1126039 16.9472136,12.2763932 C17.0707082,12.5233825 16.970596,12.823719 16.7236068,12.9472136 C16.4766175,13.0707082 16.176281,12.970596 16.0527864,12.7236068 C15.1346811,10.8873961 13.8035869,10 12,10 C10.1964131,10 8.86531893,10.8873961 7.9472136,12.7236068 Z M8,12 L10.5,12 C10.7761424,12 11,12.2238576 11,12.5 C11,12.7761424 10.7761424,13 10.5,13 L7.5,13 C7.22385763,13 7,12.7761424 7,12.5 L7,9.5 C7,9.22385763 7.22385763,9 7.5,9 C7.77614237,9 8,9.22385763 8,9.5 L8,12 Z M5.5,3 C5.77614237,3 6,3.22385763 6,3.5 C6,3.77614237 5.77614237,4 5.5,4 C4.67157288,4 4,4.67157288 4,5.5 C4,5.77614237 3.77614237,6 3.5,6 C3.22385763,6 3,5.77614237 3,5.5 C3,4.11928813 4.11928813,3 5.5,3 Z M7.5,4 C7.22385763,4 7,3.77614237 7,3.5 C7,3.22385763 7.22385763,3 7.5,3 L9.5,3 C9.77614237,3 10,3.22385763 10,3.5 C10,3.77614237 9.77614237,4 9.5,4 L7.5,4 Z M3,8.5 C3,8.22385763 3.22385763,8 3.5,8 C3.77614237,8 4,8.22385763 4,8.5 L4,10.5 C4,10.7761424 3.77614237,11 3.5,11 C3.22385763,11 3,10.7761424 3,10.5 L3,8.5 Z M3,13.5 C3,13.2238576 3.22385763,13 3.5,13 C3.77614237,13 4,13.2238576 4,13.5 L4,15.5 C4,15.7761424 3.77614237,16 3.5,16 C3.22385763,16 3,15.7761424 3,15.5 L3,13.5 Z M3,18.5 C3,18.2238576 3.22385763,18 3.5,18 C3.77614237,18 4,18.2238576 4,18.5 C4,19.3284271 4.67157288,20 5.5,20 C5.77614237,20 6,20.2238576 6,20.5 C6,20.7761424 5.77614237,21 5.5,21 C4.11928813,21 3,19.8807119 3,18.5 Z M7.5,21 C7.22385763,21 7,20.7761424 7,20.5 C7,20.2238576 7.22385763,20 7.5,20 L9.5,20 C9.77614237,20 10,20.2238576 10,20.5 C10,20.7761424 9.77614237,21 9.5,21 L7.5,21 Z M12,2.5 C12,2.22385763 12.2238576,2 12.5,2 C12.7761424,2 13,2.22385763 13,2.5 L13,6.5 C13,6.77614237 12.7761424,7 12.5,7 C12.2238576,7 12,6.77614237 12,6.5 L12,2.5 Z M12,14.5 C12,14.2238576 12.2238576,14 12.5,14 C12.7761424,14 13,14.2238576 13,14.5 L13,21.5 C13,21.7761424 12.7761424,22 12.5,22 C12.2238576,22 12,21.7761424 12,21.5 L12,14.5 Z M15.5,4 C15.2238576,4 15,3.77614237 15,3.5 C15,3.22385763 15.2238576,3 15.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L15.5,21 C15.2238576,21 15,20.7761424 15,20.5 C15,20.2238576 15.2238576,20 15.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L15.5,4 Z" />
						</svg>
					</div>
					<div
						className="bg-white p-1 rounded-full cursor-pointer"
						onClick={() => {
							setFlipX((flipX - 180) % 360);
						}}
					>
						<svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24" className="rotate-90" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.0527864,12.7236068 C15.1346811,10.8873961 13.8035869,10 12,10 C10.1964131,10 8.86531893,10.8873961 7.9472136,12.7236068 C7.82371897,12.970596 7.52338245,13.0707082 7.2763932,12.9472136 C7.02940395,12.823719 6.92929178,12.5233825 7.0527864,12.2763932 C8.13468107,10.1126039 9.80358687,9 12,9 C14.1964131,9 15.8653189,10.1126039 16.9472136,12.2763932 C17.0707082,12.5233825 16.970596,12.823719 16.7236068,12.9472136 C16.4766175,13.0707082 16.176281,12.970596 16.0527864,12.7236068 Z M16,12 L16,9.5 C16,9.22385763 16.2238576,9 16.5,9 C16.7761424,9 17,9.22385763 17,9.5 L17,12.5 C17,12.7761424 16.7761424,13 16.5,13 L13.5,13 C13.2238576,13 13,12.7761424 13,12.5 C13,12.2238576 13.2238576,12 13.5,12 L16,12 Z M18.5,3 C19.8807119,3 21,4.11928813 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 C20.2238576,6 20,5.77614237 20,5.5 C20,4.67157288 19.3284271,4 18.5,4 C18.2238576,4 18,3.77614237 18,3.5 C18,3.22385763 18.2238576,3 18.5,3 Z M16.5,4 L14.5,4 C14.2238576,4 14,3.77614237 14,3.5 C14,3.22385763 14.2238576,3 14.5,3 L16.5,3 C16.7761424,3 17,3.22385763 17,3.5 C17,3.77614237 16.7761424,4 16.5,4 Z M21,8.5 L21,10.5 C21,10.7761424 20.7761424,11 20.5,11 C20.2238576,11 20,10.7761424 20,10.5 L20,8.5 C20,8.22385763 20.2238576,8 20.5,8 C20.7761424,8 21,8.22385763 21,8.5 Z M21,13.5 L21,15.5 C21,15.7761424 20.7761424,16 20.5,16 C20.2238576,16 20,15.7761424 20,15.5 L20,13.5 C20,13.2238576 20.2238576,13 20.5,13 C20.7761424,13 21,13.2238576 21,13.5 Z M21,18.5 C21,19.8807119 19.8807119,21 18.5,21 C18.2238576,21 18,20.7761424 18,20.5 C18,20.2238576 18.2238576,20 18.5,20 C19.3284271,20 20,19.3284271 20,18.5 C20,18.2238576 20.2238576,18 20.5,18 C20.7761424,18 21,18.2238576 21,18.5 Z M16.5,21 L14.5,21 C14.2238576,21 14,20.7761424 14,20.5 C14,20.2238576 14.2238576,20 14.5,20 L16.5,20 C16.7761424,20 17,20.2238576 17,20.5 C17,20.7761424 16.7761424,21 16.5,21 Z M12,2.5 L12,6.5 C12,6.77614237 11.7761424,7 11.5,7 C11.2238576,7 11,6.77614237 11,6.5 L11,2.5 C11,2.22385763 11.2238576,2 11.5,2 C11.7761424,2 12,2.22385763 12,2.5 Z M12,14.5 L12,21.5 C12,21.7761424 11.7761424,22 11.5,22 C11.2238576,22 11,21.7761424 11,21.5 L11,14.5 C11,14.2238576 11.2238576,14 11.5,14 C11.7761424,14 12,14.2238576 12,14.5 Z M8.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L8.5,20 C8.77614237,20 9,20.2238576 9,20.5 C9,20.7761424 8.77614237,21 8.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L8.5,3 C8.77614237,3 9,3.22385763 9,3.5 C9,3.77614237 8.77614237,4 8.5,4 Z" />
						</svg>
					</div>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-green-200 border-[3px] -translate-x-0.5 border-green-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-green-200 border-[3px] translate-x-0.5 border-green-500 top-[50px]" />
		</div>
	);
};

export default memo(ImageRotateFlip);
