import React, { useState } from "react";

const ImageAnnotationTools = ({ tempShape, setTempShape, mode, setMode, magicPoints, setMagicPoints }) => {
	return (
		<div className="absolute flex flex-col py-2 items-center justify-between h-96 w-12 rounded-lg shadow-lg top-1/2 -translate-y-1/2 right-5 bg-primary-800 z-40">
			<div className="flex flex-col gap-1 border-b-2 pb-1 border-primary-200/50">
				<button
					onClick={() => {
						setMode("drag");
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "drag" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Drag Tool&nbsp;<span className="text-xs font-thin">(D)</span>
						</p>
						<p className="text-[10px] font-[100]">Pan the image or select / reposition annotations.</p>
					</div>
					<svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
						<path
							fill="var(--primary-200)"
							d="M13.5 2.4c-0.4-0.4-1-0.5-1.5-0.3 0-0.3-0.1-0.6-0.4-0.9-0.2-0.2-0.6-0.4-1.1-0.4-0.3 0-0.5 0.1-0.7 0.1 0-0.2-0.1-0.3-0.2-0.5-0.5-0.6-1.5-0.6-2 0-0.2 0.2-0.4 0.4-0.4 0.6-0.2 0-0.4-0.1-0.6-0.1-0.5 0-0.8 0.2-1.1 0.5-0.5 0.5-0.5 1.3-0.5 1.3v3.8c-0.3-0.3-0.8-0.8-1.5-0.8-0.2 0-0.5 0.1-0.7 0.2-0.4 0.2-0.6 0.5-0.7 0.9-0.3 1 0.6 2.4 0.6 2.5 0.1 0.1 1.2 2.7 2.2 3.8 1 1.2 2.1 1.9 4.9 1.9 2.9 0 4.2-1.6 4.2-5.1v-5.5c0-0.1 0.1-1.3-0.5-2zM8 2c0-0.3-0.1-1 0.5-1 0.5 0 0.5 0.5 0.5 1v4c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5v-3.8c0 0 0-0.4 0.5-0.4 0.6 0 0.5 0.9 0.5 0.9v3.3c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5v-2.4c0-0.1 0-0.6 0.5-0.6s0.5 1 0.5 1v5.9c0 3.4-1.3 4.1-3.2 4.1-2.4 0-3.3-0.5-4.1-1.6-0.9-1-2.1-3.6-2.1-3.7-0.3-0.3-0.7-1.2-0.6-1.6 0-0.1 0.1-0.2 0.2-0.3 0.1 0 0.2-0.1 0.2-0.1 0.4 0 0.8 0.5 0.9 0.7l0.6 0.9c0.1 0.2 0.4 0.3 0.6 0.2 0.4 0 0.5-0.2 0.5-0.4v-5.2c0-0.4 0-1 0.5-1 0.4 0 0.5 0.3 0.5 0.8v3.3c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5z"
						/>
					</svg>
				</button>
				<button
					onClick={() => {
						setMode("rectangle");
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "rectangle" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Bounding Box&nbsp;<span className="text-xs font-thin">(B)</span>
						</p>
						<p className="text-[10px] font-[100]">Draw annotations that are boxes.</p>
					</div>
					<svg fill="#00000000" strokeWidth={2} stroke="var(--primary-200)" viewBox="0 0 32 32" width="25px" height="25px">
						<circle cx={6} cy={6} r={3} />
						<circle cx={26} cy={6} r={3} />
						<circle cx={6} cy={26} r={3} />
						<circle cx={26} cy={26} r={3} />
						<line x1={6} y1={9} x2={6} y2={23} />
						<line x1={26} y1={9} x2={26} y2={23} />
						<line x1={9} y1={26} x2={23} y2={26} />
						<line x1={9} y1={6} x2={23} y2={6} />
					</svg>
				</button>
				<button
					onClick={() => {
						setMode("polygon");
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "polygon" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Polygon&nbsp;<span className="text-xs font-thin">(P)</span>
						</p>
						<p className="text-[10px] font-[100]">Freeform draw annotations for more precise shapes.</p>
					</div>
					<svg fill="var(--primary-200)" width="25px" height="25px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
						<path d="M230.63,49.37a32.05,32.05,0,0,0-45.26,0h0a31.85,31.85,0,0,0-5.15,6.76L152,48.43a32,32,0,0,0-54.6-23.06h0a32.05,32.05,0,0,0-5.75,37.41L57.68,93.33a32.06,32.06,0,0,0-40.31,4h0a32,32,0,0,0,42.88,47.4l70,51.36a32,32,0,1,0,52.34-10.76,31.51,31.51,0,0,0-4.78-3.92l27.39-77.59q1.38.12,2.76.12a32,32,0,0,0,22.63-54.61ZM108.69,36.69h0a16,16,0,1,1,0,22.62A16,16,0,0,1,108.69,36.69Zm-80,94.62a16,16,0,0,1,0-22.62h0a16,16,0,1,1,0,22.62Zm142.62,88a16,16,0,0,1-22.62-22.62h0a16,16,0,0,1,22.62,22.62Zm-8.55-43.17a31.93,31.93,0,0,0-23,7.09l-70-51.36a32.13,32.13,0,0,0-1.33-26.65l33.94-30.55a32,32,0,0,0,45.46-10.8L176,71.57a31.87,31.87,0,0,0,14.11,27Zm56.55-92.83a16,16,0,0,1-22.62-22.62h0a16,16,0,0,1,22.62,22.62Z" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col gap-1 border-b-2 pb-1 border-primary-200/50">
				<button
					onClick={() => {
						setMode("magic");
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "magic" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] p-1 px-2 text-white bg-primary-800 rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left ">
						<p className="text-xl font-mono">
							Smart Polygon&nbsp;<span className="text-xs font-thin">(S)</span>
						</p>
						<p className="text-[10px] font-[100]">Use an intelligent assistant to draw your polygons. Click the center of your object, then keep clicking to add or subtract areas.</p>
					</div>
					<svg fill="var(--primary-200)" width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
						<path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z" />
					</svg>
				</button>
				<button
					onClick={() => {
						setMode("repeat");
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "repeat" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Repeat Last&nbsp;<span className="text-xs font-thin">(R)</span>
						</p>
						<p className="text-[10px] font-[100]">Applies all of the annotations from the last image you annotated. (Useful for video frames.)</p>
					</div>
					<svg fill="var(--primary-200)" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3A.997.997 0 0 0 21 6m-.076-.383a.996.996 0 0 1 .076.38l-.076-.38zm-17.848 12a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3m-.217.324a.997.997 0 0 1 .215-.322l-.215.322z" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col gap-1 border-b-2 pb-1 border-primary-200/50">
				<button
					onClick={() => {
						if (mode === "polygon") {
							let tempList = [...tempShape];
							tempList[tempList.length - 1].pop();
							setTempShape(tempList);
						} else if (mode == "magic") {
							let tempList = [...magicPoints];
							tempList.pop();
							setMagicPoints(tempList);
						}
					}}
					className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "undo" ? "bg-primary-300/25" : "border-transparent")}
				>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Undo&nbsp;<span className="text-xs font-thin">(Z)</span>
						</p>
						<p className="text-[10px] font-[100]">Undo the previous action.</p>
					</div>
					<svg fill="var(--primary-200)" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.207 2.293a1 1 0 0 1 0 1.414L10.914 5H12.5c4.652 0 8.5 3.848 8.5 8.5S17.152 22 12.5 22 4 18.152 4 13.5a1 1 0 1 1 2 0c0 3.548 2.952 6.5 6.5 6.5s6.5-2.952 6.5-6.5S16.048 7 12.5 7h-1.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0z" />
					</svg>
				</button>
				<button className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "redo" ? "bg-primary-300/25" : "border-transparent")}>
					<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
						<p className="text-xl font-mono">
							Redo&nbsp;<span className="text-xs font-thin">(Y)</span>
						</p>
						<p className="text-[10px] font-[100]">Redo the previous action.</p>
					</div>
					<svg fill="var(--primary-200)" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
						<path d="M12.207 2.293a1 1 0 0 1 0 1.414L10.914 5H12.5c4.652 0 8.5 3.848 8.5 8.5S17.152 22 12.5 22 4 18.152 4 13.5a1 1 0 1 1 2 0c0 3.548 2.952 6.5 6.5 6.5s6.5-2.952 6.5-6.5S16.048 7 12.5 7h-1.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0z" />
					</svg>
				</button>
			</div>
			<button
				onClick={() => {
					setMode("null");
				}}
				className={"hover:bg-primary-300/25 h-10 w-10 flex items-center justify-center rounded-lg border-2 hover:border-primary-200 transition-all relative group " + (mode === "null" ? "bg-primary-300/25" : "border-transparent")}
			>
				<div className="absolute -left-[500%] right-[150%] bg-primary-800 p-1 px-2 text-white rounded-lg scale-0 opacity-0 group-hover:scale-100 origin-right group-hover:opacity-100 translate-x-20 group-hover:translate-x-0 transition-all duration-300 text-left">
					<p className="text-xl font-mono">
						Remove All&nbsp;<span className="text-xs font-thin">(N)</span>
					</p>
					<p className="text-[10px] font-[100]">A null image is one with no objects of interest present. An unannotated image is waiting for a human to annotate it.</p>
				</div>
				<svg width="20px" height="20px" viewBox="0 0 273.346 273.346" fill="var(--primary-200)">
					<path d="M267.489,5.858c-7.811-7.811-20.475-7.811-28.285,0l-28.03,28.03c-20.942-15.221-46.689-24.214-74.501-24.214 c-70.028,0-127,56.972-127,127c0,27.812,8.993,53.559,24.214,74.501l-28.03,28.03c-7.81,7.811-7.81,20.475,0,28.285 c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857l28.03-28.03c20.942,15.221,46.689,24.214,74.501,24.214 c70.028,0,127-56.972,127-127c0-27.812-8.993-53.559-24.214-74.501l28.03-28.03C275.298,26.333,275.298,13.668,267.489,5.858z  M49.673,136.673c0-47.972,39.028-87,87-87c16.755,0,32.417,4.766,45.708,13.007L62.68,182.381 C54.439,169.09,49.673,153.429,49.673,136.673z M223.673,136.673c0,47.972-39.028,87-87,87c-16.756,0-32.417-4.766-45.708-13.007 L210.666,90.965C218.907,104.257,223.673,119.918,223.673,136.673z" />
				</svg>
			</button>
		</div>
	);
};

export default ImageAnnotationTools;
