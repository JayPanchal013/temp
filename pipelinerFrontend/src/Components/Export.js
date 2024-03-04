import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const Export = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	const [brightness, setBrightness] = useState(100);
	const [contrast, setContrast] = useState(100);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-blue-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-blue-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg fill="currentColor" width={14} height={14} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<polyline
							id="primary"
							points="17 3 21 3 21 7"
							style={{
								fill: "none",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
							}}
						/>
						<line
							id="primary-2"
							data-name="primary"
							x1={11}
							y1={13}
							x2={21}
							y2={3}
							style={{
								fill: "none",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
							}}
						/>
						<path
							id="primary-3"
							data-name="primary"
							d="M19,13.89V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h6.11"
							style={{
								fill: "none",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
							}}
						/>
					</svg>
					<p className="text-sm font-mono">Export</p>
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
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] -translate-x-0.5 border-blue-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] translate-x-0.5 border-blue-500 top-[50px]" />
		</div>
	);
}

export default memo(Export)