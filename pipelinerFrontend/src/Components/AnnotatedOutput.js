import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const AnnotatedOutput = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-yellow-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-yellow-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg width={14} height={14} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
						<g id="Layer_2" data-name="Layer 2">
							<g id="invisible_box" data-name="invisible box">
								<rect width={48} height={48} fill="none" />
							</g>
							<g id="Layer_6" data-name="Layer 6">
								<g>
									<path d="M45.4,22.6l-7.9-8a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H16a2,2,0,0,0,0,4H39.2l-4.6,4.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l7.9-8A1.9,1.9,0,0,0,45.4,22.6Z" />
									<path d="M28,42H24A18,18,0,0,1,24,6h4a2,2,0,0,0,1.4-.6A2,2,0,0,0,30,4a2.4,2.4,0,0,0-.2-.9A2,2,0,0,0,28,2H23.8a22,22,0,0,0,.1,44H28a2,2,0,0,0,1.4-.6l.4-.5A2.4,2.4,0,0,0,30,44,2,2,0,0,0,28,42Z" />
								</g>
							</g>
						</g>
					</svg>
					<p className="text-sm font-mono">Annotated Output</p>
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
				<div className="h-32 w-full text-white border border-white/10 rounded-lg bg-white/10 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center">
					<img src={"https://picsum.photos/300/300"} alt="image" className="w-full h-full object-contain rounded-lg" />
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] -translate-x-0.5 border-yellow-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] translate-x-0.5 border-yellow-500 top-[50px]" />
		</div>
	);
};

export default memo(AnnotatedOutput);
