import React from "react";

const Sidebar = () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	const nodesData = [
		{
			mainSVG: (
				<svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="text-red-500" fill="currentColor">
					<g>
						<g data-name="invisible box">
							<rect width={48} height={48} fill="none" />
						</g>
						<g id="icons_Q2" data-name="icons Q2">
							<path d="M8,9.7a2,2,0,0,1,.6-1.4A21.6,21.6,0,0,1,24,2a22,22,0,0,1,0,44A21.6,21.6,0,0,1,8.6,39.7a2,2,0,1,1,2.8-2.8,18,18,0,1,0,0-25.8,1.9,1.9,0,0,1-2.8,0A2,2,0,0,1,8,9.7Z" />
							<path d="M33.4,22.6l-7.9-8a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L27.2,22H4a2,2,0,0,0-2,2H2a2,2,0,0,0,2,2H27.2l-4.6,4.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l7.9-8A1.9,1.9,0,0,0,33.4,22.6Z" />
						</g>
					</g>
				</svg>
			),
			mainName: "Input / Output",
			borderColor: "red",
			subItems: [
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20}>
							<path d="M180-120q-24.75 0-42.375-17.625T120-180v-600q0-24.75 17.625-42.375T180-840h409v60H180v600h600v-408h60v408q0 24.75-17.625 42.375T780-120H180Zm520-498v-81h-81v-60h81v-81h60v81h81v60h-81v81h-60ZM240-282h480L576-474 449-307l-94-124-115 149Zm-60-498v600-600Z" fill="currentColor" />
						</svg>
					),
					subName: "Add Image",
					subNodeType: "InputImage",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
							<path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
							<path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
						</svg>
					),
					subName: "Add Label",
					subNodeType: "InputLabel",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-file-earmark-zip" viewBox="0 0 16 16">
							<path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z" />
							<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
						</svg>
					),
					subName: "Add Zip",
					subNodeType: "InputDataset",
				},
				{
					subSVG: (
						<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<path fill="currentColor" d="M0 11h6v5h-6v-5z" />
							<path fill="currentColor" d="M11 10v-2l-0.64 0.64c-0.851-0.81-1.38-1.952-1.38-3.217 0-0.149 0.007-0.296 0.022-0.441l1.999 0.018v-5h-6v5h2c0.013 0.127 0.020 0.274 0.020 0.423 0 1.265-0.529 2.407-1.378 3.216l-0.642-0.638v2h2l-0.65-0.65c1.028-0.991 1.667-2.38 1.667-3.919 0-0.152-0.006-0.302-0.018-0.45-0.010 0.149-0.016 0.299-0.016 0.45 0 1.539 0.639 2.928 1.665 3.917l-0.648 0.652h2z" />
							<path fill="currentColor" d="M10 11h6v5h-6v-5z" />
						</svg>
					),
					subName: "Dataset Split",
					subNodeType: "SplitDataset",
				},
			],
		},
		{
			mainSVG: (
				<svg fill="currentColor" width="20px" height="20px" className="text-green-500" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
					<path d="M33.49,26.28a1,1,0,0,0-1.2-.7l-2.49.67a14.23,14.23,0,0,0,2.4-6.75A14.48,14.48,0,0,0,27.37,7.35,1,1,0,0,0,26,7.44a1,1,0,0,0,.09,1.41,12.45,12.45,0,0,1,4.16,10.46,12.19,12.19,0,0,1-2,5.74L28,22.54a1,1,0,1,0-1.95.16l.5,6.44,6.25-1.66A1,1,0,0,0,33.49,26.28Z" className="clr-i-outline clr-i-outline-path-1" />
					<path d="M4.31,17.08a1.06,1.06,0,0,0,.44.16,1,1,0,0,0,1.12-.85A12.21,12.21,0,0,1,18.69,5.84L16.45,7.37a1,1,0,0,0,.47,1.79A1,1,0,0,0,17.56,9l5.33-3.66L18.33.76a1,1,0,1,0-1.39,1.38l1.7,1.7A14.2,14.2,0,0,0,3.89,16.12,1,1,0,0,0,4.31,17.08Z" className="clr-i-outline clr-i-outline-path-2" />
					<path d="M21.73,29.93a12,12,0,0,1-4.84.51,12.3,12.3,0,0,1-9.57-6.3l2.49.93a1,1,0,0,0,.69-1.84l-4.59-1.7h0L4.44,21,3.33,27.35a1,1,0,0,0,.79,1.13l.17,0a1,1,0,0,0,1-.81l.42-2.4a14.3,14.3,0,0,0,11,7.14,13.91,13.91,0,0,0,5.63-.6,1,1,0,0,0-.6-1.9Z" className="clr-i-outline clr-i-outline-path-3" />
					<path d="M22,13H14a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V14A1,1,0,0,0,22,13Zm-1,8H15V15h6Z" className="clr-i-outline clr-i-outline-path-4" />
					<rect x={0} y={0} width={36} height={36} fillOpacity={0} />
				</svg>
			),
			mainName: "Pre Processing",
			borderColor: "green",
			subItems: [
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-aspect-ratio" viewBox="0 0 16 16">
							<path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
							<path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z" />
						</svg>
					),
					subName: "Image Resize",
					subNodeType: "ImageResize",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
						</svg>
					),
					subName: "Image Rotate / Flip",
					subNodeType: "ImageRotateFlip",
				},
				{
					subSVG: (
						<svg fill="currentColor" width={18} height={18} viewBox="0 0 20 20">
							<path d="M10,20C4.5,20,0,15.5,0,10S4.5,0,10,0s10,4.5,10,10S15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2 z" />
							<path d="M10,4v12c3.3,0,6-2.7,6-6S13.3,4,10,4z" />
						</svg>
					),
					subName: "Satuaration, Grayscale",
					subNodeType: "ImageGrayscale",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
							<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
						</svg>
					),
					subName: "Brightness, Contrast",
					subNodeType: "ImageBrightness",
				},
			],
		},
		{
			mainSVG: (
				<svg fill="currentColor" className="text-blue-500" width="20px" height="20px" viewBox="10 10 70 70">
					<g>
						<path d="M54.6,61c-1,0.4-2,0.7-3.2,0.8c-7.3,0.8-13.4-4.9-13.4-12c0-1.2,0.2-2.4,0.5-3.6c0.2-0.5,0.8-0.6,1.1-0.3 l6.8,6.8c0.5,0.5,1.3,0.5,1.9,0l4.8-4.8c0.5-0.5,0.5-1.3,0-1.9l-6.8-6.8c-0.3-0.4-0.2-1,0.3-1.1c1.1-0.3,2.3-0.5,3.5-0.5 c7.1,0,12.8,6.1,12,13.4c-0.1,1.1-0.4,2.1-0.8,3.2l12.6,12.6c3.9-4.6,6.2-10.5,6.2-16.8C80,34.5,66.6,22.3,50,22.3 c-16.7,0-30,12.3-30,27.4c0,4.8,1.4,9.3,3.6,13.3c0.4,0.6,0.5,1.4,0.3,2.1L20,75.8c-0.4,1,0.6,1.9,1.6,1.6l10.9-4.1 c0.6-0.3,1.4-0.1,2.1,0.3c4.5,2.5,9.9,4,15.7,4c6-0.1,11.6-1.8,16.3-4.6L54.6,61z" />
					</g>
				</svg>
			),
			mainName: "Training",
			borderColor: "blue",
			subItems: [
				{
					subSVG: (
						<svg fill="currentColor" width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
							<g>
								<path
									fill="currentColor"
									d="M45.6,18.7,41,14.9V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2L24,5.9,18.5,2.2,17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4L2.4,18.7a.8.8,0,0,0-.4.8v9H2a.8.8,0,0,0,.4.8L7,33.1v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2L24,42.1l5.5,3.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l4.6-3.8a.8.8,0,0,0,.4-.7V19.4h0A.8.8,0,0,0,45.6,18.7Zm-5.1,6.8H42v1.6l-3.5,2.8-.4.3-.4-.2a1.4,1.4,0,0,0-2,.7,1.5,1.5,0,0,0,.6,2l.7.3h0v5.4l-6.6,3.1-4.2-2.8-.7-.5V25.5H27a1.5,1.5,0,0,0,0-3H25.5V9.7l.7-.5,4.2-2.8L37,9.5v5.4h0l-.7.3a1.5,1.5,0,0,0-.6,2,1.4,1.4,0,0,0,1.3.9l.7-.2.4-.2.4.3L42,20.9v1.6H40.5a1.5,1.5,0,0,0,0,3ZM21,25.5h1.5V38.3l-.7.5-4.2,2.8L11,38.5V33.1h0l.7-.3a1.5,1.5,0,0,0,.6-2,1.4,1.4,0,0,0-2-.7l-.4.2-.4-.3L6,27.1V25.5H7.5a1.5,1.5,0,0,0,0-3H6V20.9l3.5-2.8.4-.3.4.2.7.2a1.4,1.4,0,0,0,1.3-.9,1.5,1.5,0,0,0-.6-2L11,15h0V9.5l6.6-3.1,4.2,2.8.7.5V22.5H21a1.5,1.5,0,0,0,0,3Z"
								/>
								<path fill="currentColor" d="M13.9,9.9a1.8,1.8,0,0,0,0,2.2l2.6,2.5v2.8l-4,4v5.2l4,4v2.8l-2.6,2.5a1.8,1.8,0,0,0,0,2.2,1.5,1.5,0,0,0,1.1.4,1.5,1.5,0,0,0,1.1-.4l3.4-3.5V29.4l-4-4V22.6l4-4V13.4L16.1,9.9A1.8,1.8,0,0,0,13.9,9.9Z" />
								<path fill="currentColor" d="M31.5,14.6l2.6-2.5a1.8,1.8,0,0,0,0-2.2,1.8,1.8,0,0,0-2.2,0l-3.4,3.5v5.2l4,4v2.8l-4,4v5.2l3.4,3.5a1.7,1.7,0,0,0,2.2,0,1.8,1.8,0,0,0,0-2.2l-2.6-2.5V30.6l4-4V21.4l-4-4Z" />
							</g>
						</svg>
					),
					subName: "Trainer",
					subNodeType: "Trainer",
				},
				{
					subSVG: (
						<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width={20} height={25} viewBox="0 0 100 100">
							<g>
								<path d="M72,22H28c-3.3,0-6,2.7-6,6v44c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V28C78,24.7,75.3,22,72,22z M38,66 c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V55c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M48,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V40 c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M58,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z  M68,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V47c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z" />
							</g>
						</svg>
					),
					subName: "Metrics",
					subNodeType: "Metrics",
				},
				{
					subSVG: (
						<svg width={18} height={18} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
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
					),
					subName: "Output",
					subNodeType: "Output",
				},
				{
					subSVG: (
						<svg fill="currentColor" width={18} height={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
					),
					subName: "Export",
					subNodeType: "Export",
				},
			],
		},
		{
			mainSVG: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" className="text-yellow-500" width="20px" height="20px" fill="currentColor">
					<circle cx={48.4} cy={43} r={16.5} />
					<path d="M10.8,97.8c4-13.4,12.6-31.6,24.7-33.7c0.2,0,0.8-0.1,0.8-0.1c2.3-0.3,4.7-0.1,6.5,0.3L67.9,71l6.4-24h-6v-8 h25.8v-2.5h20v13h-20V47H89c0.1,0.9,0,1.8-0.2,2.7l-8.6,32.2c-1,3.9-5,6.2-8.9,5.2L53,82.1L52.9,112H8 C8.2,108.1,9.1,103.4,10.8,97.8z" />
					<rect x={116} y={35} transform="matrix(-1 -1.224647e-016 1.224647e-016 -1 236 86)" width={4} height={16} />
				</svg>
			),
			mainName: "Inference",
			borderColor: "yellow",
			subItems: [
				{
					subSVG: (
						<svg width={20} height={20} viewBox="0 0 24 24">
							<g id="\uD83D\uDD0D-Product-Icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
								<g id="ic_fluent_predictions_24_regular" fill="currentColor" fillRule="nonzero">
									<path
										d="M12,2 C13.1533411,2 14.239122,2.28925943 15.1887536,2.79918917 C15.112506,3.24499916 14.9646822,3.56044404 14.7625631,3.76256313 C14.651965,3.87316122 14.5073983,3.96747369 14.3258552,4.04282999 C13.6240917,3.69484129 12.8347996,3.5 12,3.5 C9.10050506,3.5 6.75,5.85050506 6.75,8.75 C6.75,10.8881837 8.02822265,12.7278225 9.8622211,13.5464695 C10.5502799,13.8149728 11.1856692,13.9625453 11.7682833,13.9937269 L12,14 C12.6447239,14 13.3574543,13.8508379 14.1372164,13.5477329 C15.0530197,13.1384379 15.8301861,12.4750311 16.3789152,11.6472257 C17.0183307,11.8672416 17.7876826,11.7336231 18.2728071,11.2466813 C17.8577163,12.2895137 17.1901986,13.2039271 16.345851,13.9150872 L17.967289,18.7801589 C18.2335628,19.5789337 17.8932573,20.4540914 17.1573198,20.8631617 C15.7855762,21.6256443 14.0642518,22 12,22 C9.93575073,22 8.214428,21.6256452 6.84268887,20.8631665 C6.10675341,20.4541035 5.76644595,19.5789539 6.03270398,18.7801798 L7.654149,13.9150872 C6.18404803,12.6768801 5.25,10.8225194 5.25,8.75 C5.25,5.02207794 8.27207794,2 12,2 Z M15.0565518,14.7913638 L14.6969316,14.9394573 L14.6788415,14.9475423 C13.9522531,15.2620316 13.1594698,15.452487 12.3271908,15.4922091 C12.3209854,15.4911059 12.3153059,15.4914155 12.3096286,15.4917168 C12.2858058,15.4941022 12.2614052,15.4950751 12.2369716,15.4959181 L12,15.5 L11.804,15.496 L11.6733328,15.4907882 C10.8405302,15.452487 10.0477469,15.2620316 9.32115848,14.9475423 L9.30306837,14.9394573 C9.18403381,14.8929562 9.06416108,14.8435884 8.94344816,14.7913638 L7.45572893,19.2545215 C7.41769197,19.3686323 7.4663069,19.4936526 7.57144272,19.5520914 C8.7000759,20.1794401 10.1740439,20.5 12,20.5 C13.8259583,20.5 15.2999275,20.1794394 16.4285612,19.5520892 C16.533696,19.4936502 16.5823098,19.368631 16.5442682,19.2545129 L15.0565518,14.7913638 Z M11.6898272,15.4930001 L11.804,15.496 L11.8373106,15.4976957 L12,15.5 C11.8960435,15.5 11.7926358,15.49765 11.6898272,15.4930001 Z M17.9924045,1.88020833 L18,2 C18,3.14960906 18.2698654,3.95920521 18.7803301,4.46966991 C19.2515283,4.9408681 19.9776077,5.20705858 20.9907227,5.24522281 L21.25,5.25 C22.2083333,5.25 22.2482639,6.62760417 21.3697917,6.74240451 L21.25,6.75 C20.1003909,6.75 19.2907948,7.01986538 18.7803301,7.53033009 C18.3091319,8.00152827 18.0429414,8.72760769 18.0047772,9.74072273 L18,10 C18,11 16.5,11 16.5,10 C16.5,8.85039094 16.2301346,8.04079479 15.7196699,7.53033009 C15.2484717,7.0591319 14.5223923,6.79294142 13.5092773,6.75477719 L13.25,6.75 C12.2916667,6.75 12.2517361,5.37239583 13.1302083,5.25759549 L13.25,5.25 C14.3996091,5.25 15.2092052,4.98013462 15.7196699,4.46966991 C16.2301346,3.95920521 16.5,3.14960906 16.5,2 C16.5,1.04166667 17.8776042,1.00173611 17.9924045,1.88020833 Z M17.25,4.95250583 L17.1063227,5.15616731 C17.0062588,5.28827689 16.8976229,5.41303729 16.7803301,5.53033009 C16.6043909,5.70626928 16.4116496,5.86273057 16.2025058,6 C16.4116496,6.13726943 16.6043909,6.29373072 16.7803301,6.46966991 C16.9562693,6.64560911 17.1127306,6.8383504 17.25,7.04749417 C17.3872694,6.8383504 17.5437307,6.64560911 17.7196699,6.46966991 C17.8956091,6.29373072 18.0883504,6.13726943 18.2974942,6 C18.0883504,5.86273057 17.8956091,5.70626928 17.7196699,5.53033009 C17.6023771,5.41303729 17.4937412,5.28827689 17.3936773,5.15616731 L17.25,4.95250583 Z"
										id="\uD83C\uDFA8-Color"
									/>
								</g>
							</g>
						</svg>
					),
					subName: "Predictor",
					subNodeType: "Predictor",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
						</svg>
					),
					subName: "Data Source (Image/Video)",
					subNodeType: "ImageDataSource",
				},
				{
					subSVG: (
						<svg width={18} height={18} viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2"
								style={{
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 12,
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeMiterlimit: 10,
								}}
							/>
						</svg>
					),
					subName: "Data Source (URL)",
					subNodeType: "UrlDataSource",
				},
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
							<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
							<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
						</svg>
					),
					subName: "Data Source (Camera)",
					subNodeType: "CamreraDataSource",
				},
				{
					subSVG: (
						<svg width={18} height={18} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
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
					),
					subName: "Annotated Output",
					subNodeType: "AnnotatedOutput",
				},
			],
		},
		{
			mainSVG: (
				<svg fill="currentColor" width="20px" height="20px" className="text-pink-500" viewBox="0 0 24 24">
					<g id="gallery">
						<g>
							<circle cx={6} cy={6} r={2} />
						</g>
						<g>
							<path d="M24,23H4v-4H0V0h20v4h4V23z M6,21h16V6h-2v13H6V21z M3.2,17H18v-1.6l-4-4.8l-3.9,4.9l-3-3L3.2,17z M2,2v13.3l4.9-5.8l3,3 L14,7.4l4,4.8V2H2z" />
						</g>
					</g>
				</svg>
			),
			mainName: "Gallery",
			borderColor: "pink",
			subItems: [
				{
					subSVG: (
						<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
							<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
							<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
						</svg>
					),
					subName: "Image Viewer",
					subNodeType: "ImageViewer",
				},
			],
		},
	];

	return (
		<div className="w-[20vw] h-full border-2 border-primary-500 rounded-xl overflow-hidden">
			<div className="w-full bg-primary-900 py-2 border-b-2 border-primary-500">
				<p className="text-center font-bold text-primary-500">Nodes</p>
			</div>
			<div className="relative border-b border-primary-500">
				<input type="text" name="nodeSearch" id="nodeSearch" placeholder="Search..." className="w-full p-2 pl-9 outline-none focus:outline-none bg-primary-800 text-white" />
				<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-search absolute top-1/2 -translate-y-1/2 left-2 text-white" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
				</svg>
			</div>
			<div
				className="w-full p-2 flex items-center justify-center cursor-pointer"
				onClick={() => {
					document.getElementById("allContainerOpenArrow").classList.toggle("-rotate-180");
					for (let i = 0; i < nodesData.length; i++) {
						document.getElementById("dropdownContainer-" + i).classList.toggle("max-h-[48px]");
						document.getElementById("dropdownContainer-" + i).classList.toggle("max-h-full");
						document.getElementById("dropdownArrow-" + i).classList.toggle("-rotate-180");
					}
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="text-white transition-all duration-300" viewBox="0 0 16 16" id="allContainerOpenArrow">
					<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
				</svg>
			</div>
			<div className="overflow-y-scroll noScroll h-[calc(100vh-250px)]">
				{nodesData.map((item, index) => (
					<div className="flex w-full" key={index}>
						<div className="w-full">
							<div className="bg-primary-900 max-h-[48px] overflow-hidden transition-all duration-300" id={"dropdownContainer-" + index}>
								<div
									className="w-full flex items-center justify-between bg-primary-900 p-2 py-3 cursor-pointer"
									onClick={() => {
										document.getElementById("dropdownContainer-" + index).classList.toggle("max-h-[48px]");
										document.getElementById("dropdownContainer-" + index).classList.toggle("max-h-full");
										document.getElementById("dropdownArrow-" + index).classList.toggle("-rotate-180");
									}}
								>
									<div className="flex items-center gap-2">
										{item.mainSVG}
										<p className="text-white font-bold uppercase">{item.mainName}</p>
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" id={"dropdownArrow-" + index} className="transition-all duration-300 text-white" viewBox="0 0 16 16">
										<path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
									</svg>
								</div>
								<div className="px-2">
									{item.subItems.map((subItem, subIndex) => (
										<div key={subIndex} onDragStart={(event) => onDragStart(event, subItem.subNodeType)} draggable className={"pipeJoins flex items-center gap-2 p-2 px-3 bg-primary-800 text-white rounded-xl border-l-[5px] border-" + item.borderColor + "-600 mb-3"}>
											{subItem.subSVG}
											<p className="text-white">{subItem.subName}</p>
										</div>
									))}
									{/* <div onDragStart={(event) => onDragStart(event, "InputDataset")} draggable className="flex items-center gap-2 p-2 px-3 bg-primary-800 text-white rounded-xl border-l-[5px] border-red-600 mb-3">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
										<path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
										<path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
									</svg>
									<p className="text-white">Add Label</p>
								</div>
								<div onDragStart={(event) => onDragStart(event, "SplitDataset")} draggable className="flex items-center gap-2 p-2 px-3 bg-primary-800 text-white rounded-xl border-l-[5px] border-red-600 mb-3">
									<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-file-earmark-zip" viewBox="0 0 16 16">
										<path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z" />
										<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
									</svg>
									<p className="text-white">Add Zip</p>
								</div> */}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
