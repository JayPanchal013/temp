import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const Metrics = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-blue-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-blue-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 100 100">
						<g>
							<path d="M72,22H28c-3.3,0-6,2.7-6,6v44c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V28C78,24.7,75.3,22,72,22z M38,66 c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V55c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M48,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V40 c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M58,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z  M68,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V47c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z" />
						</g>
					</svg>
					<p className="text-sm font-mono">Metrics</p>
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
			<div className="p-2 px-5 w-full h-full bg-primary-800 flex flex-col gap-2 rounded-b-[5px] cursor-default">
				<div className="text-xs font-mono text-white">
					<p>MAP:</p>
					<p className="text-xl mt-1">100%</p>
				</div>
				<div className="text-xs font-mono text-white">
					<p>Precision:</p>
					<p className="text-xl mt-1">100%</p>
				</div>
				<div className="text-xs font-mono text-white">
					<p>Recall:</p>
					<p className="text-xl mt-1">100%</p>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] -translate-x-0.5 border-blue-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-blue-200 border-[3px] translate-x-0.5 border-blue-500 top-[50px]" />
		</div>
	);
}

export default memo(Metrics)