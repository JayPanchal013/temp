import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

const ImageViewer = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);
	const [activeTab, setActiveTab] = useState("tab1");

	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-96 rounded-md border border-pink-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-pink-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
						<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
						<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
					</svg>
					<p className="text-sm font-mono">Image Viewer</p>
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
			<hr className="border-pink-500" />
			<div className="p-2 w-full h-full bg-primary-800 flex flex-col gap-2 rounded-b-[5px] cursor-default">
				<ul className="flex items-center justify-between">
					<TabNavItem title="Train" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
					<TabNavItem title="Validation" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
					<TabNavItem title="Test" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
				</ul>
				<div>
					<TabContent id="tab1" activeTab={activeTab}>
						<div className="grid grid-cols-5 gap-2 h-fit max-h-[18.5rem] overflow-hidden">
							<img src={"https://picsum.photos/id/239/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/243/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/240/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/238/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/244/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/237/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/214/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/247/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/241/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/260/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/242/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/280/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/248/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/270/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/249/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/290/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/250/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/230/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/212/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/220/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/210/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/211/300/300"} className="w-full h-auto object-cover rounded-lg" />
						</div>
					</TabContent>
					<TabContent id="tab2" activeTab={activeTab}>
						<div className="grid grid-cols-5 gap-2 h-fit max-h-[18.5rem] overflow-hidden">
							<img src={"https://picsum.photos/id/242/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/270/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/237/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/241/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/243/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/280/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/240/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/214/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/244/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/247/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/260/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/248/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/238/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/239/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/230/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/249/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/220/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/210/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/211/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/290/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/250/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/212/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
						</div>
					</TabContent>
					<TabContent id="tab3" activeTab={activeTab}>
						<div className="grid grid-cols-5 gap-2 h-fit max-h-[18.5rem] overflow-hidden">
							<img src={"https://picsum.photos/id/237/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/238/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/239/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/240/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/241/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/242/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/243/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/244/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/214/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/247/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/248/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/249/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/250/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/260/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/270/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/280/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/290/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/230/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/220/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/210/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/211/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/212/300/300"} className="w-full h-auto object-cover rounded-lg" />
							<img src={"https://picsum.photos/id/213/300/300"} className="w-full h-auto object-cover rounded-lg" />
						</div>
					</TabContent>
				</div>
			</div>
		</div>
	);
};

export default memo(ImageViewer);
