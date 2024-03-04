import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

const CamreraDataSource = ({ data, selected }) => {
	const [finalData, setFinalData] = useState(data);
	const [images, setImages] = useState(["https://source.unsplash.com/featured/300x300?sig=1", "https://source.unsplash.com/featured/300x300?sig=2", "https://source.unsplash.com/featured/300x300?sig=3", "https://source.unsplash.com/featured/300x300?sig=4"]);
	const [cameras, setCameras] = useState([]);
	window.onload = () => {
		navigator.mediaDevices.enumerateDevices().then(function (devices) {
			let tempCameras = [];
			for (var i = 0; i < devices.length; i++) {
				var device = devices[i];
				if (device.kind === "videoinput") {
					tempCameras.push(device);
				}
			}
			setCameras(tempCameras);
		});
	};
	return (
		<div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-yellow-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
			<div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-yellow-500 rounded-t-[5px]">
				<div className="flex gap-1 justify-between items-center text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
						<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
						<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
					</svg>
					<p className="text-sm font-mono">Camera</p>
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
						className="border border-white p-1 rounded-full shadow-inner text-yellow-800 bg-white cursor-pointer"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
							<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
						</svg>
					</div>
				</div>
			</div>
			<hr className="border-yellow-500" />
			<div id={"dragAndDropContainer_" + data["id"]} className="p-2 w-full h-full bg-primary-800 rounded-b-[5px] cursor-default">
				<div className="w-full mb-2">
					<select
						onChange={() => {
							let video = document.getElementById("video");
							if (video.srcObject) {
								video.srcObject.getTracks().forEach((track) => track.stop());
								video.srcObject = null;
								let mediaDevices = navigator.mediaDevices;
								let cameraSelect = document.getElementById("cameraSelect").value;
								let constraints = {
									video: {
										deviceId: cameraSelect,
									},
									audio: true,
								};
								video.muted = true;
								mediaDevices
									.getUserMedia(constraints)
									.then((stream) => {
										video.srcObject = stream;
										video.addEventListener("loadedmetadata", () => {
											video.play();
											video.setAttribute("data-status", "playing");
										});
									})
									.catch(alert);
							}
						}}
						id="cameraSelect"
						className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium"
					>
						<option selected disabled>
							--Select Camera--
						</option>
						{cameras.map((camera, index) => (
							<option key={index} value={camera.deviceId}>
								{camera.label}
							</option>
						))}
					</select>
				</div>
				<div className="group h-32 w-full text-white border border-white/10 rounded-lg bg-white/10 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center overflow-hidden">
					<div
						onClick={() => {
							document.getElementById("videoPlaceholder").classList.add("hidden");
							document.getElementById("video").classList.remove("hidden");
							document.getElementById("playBtn").classList.remove("hidden");
							let video = document.getElementById("video");
							let mediaDevices = navigator.mediaDevices;
							let cameraSelect = document.getElementById("cameraSelect").value;
							let constraints = {
								video: {
									deviceId: cameraSelect,
								},
								audio: true,
							};
							video.muted = true;
							mediaDevices
								.getUserMedia(constraints)
								.then((stream) => {
									video.srcObject = stream;
									video.addEventListener("loadedmetadata", () => {
										video.play();
										video.setAttribute("data-status", "playing");
									});
								})
								.catch(alert);
						}}
						id="videoPlaceholder"
						className="h-32 w-full flex flex-col items-center justify-center"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
							<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
							<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
						</svg>
						<p className="text-[13px] font-mono">Open Camera</p>
					</div>
					<svg
						onClick={() => {
							console.log(document.getElementById("video").getAttribute("data-status"));
							if (document.getElementById("video").getAttribute("data-status") == "paused") {
								document.getElementById("video").play();
								document.getElementById("video").setAttribute("data-status", "playing");
							} else {
								document.getElementById("video").pause();
								document.getElementById("video").setAttribute("data-status", "paused");
							}
						}}
						xmlns="http://www.w3.org/2000/svg"
						id="playBtn"
						width={30}
						height={30}
						fill="currentColor"
						className="hidden scale-0 group-hover:scale-100 hover:scale-110 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
						viewBox="0 0 16 16"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
					</svg>
					<video
						onClick={() => {
							if (document.getElementById("video").getAttribute("data-status") == "paused") {
								document.getElementById("video").play();
								document.getElementById("video").setAttribute("data-status", "playing");
								document.getElementById("playBtn").innerHTML = '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />';
							} else {
								document.getElementById("video").pause();
								document.getElementById("video").setAttribute("data-status", "paused");
								document.getElementById("playBtn").innerHTML = '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />';
							}
						}}
						id="video"
						data-status="paused"
						className="hidden h-full w-full object-cover"
					></video>
				</div>
			</div>
			<Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] -translate-x-0.5 border-yellow-500 top-[50px]" />
			<Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-yellow-200 border-[3px] translate-x-0.5 border-yellow-500 top-[50px]" />
		</div>
	);
};

export default memo(CamreraDataSource);
