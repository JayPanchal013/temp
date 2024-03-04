import React, { useCallback, useRef, useState } from "react";
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../Components/Sidebar";
// Input / Output
import InputImage from "../Components/InputImage";
import SplitDataset from "../Components/SplitDataset";
import InputLabel from "../Components/InputLabel";
import InputDataset from "../Components/InputDataset";

// Pre-processeing
import ImageResize from "../Components/ImageResize";
import ImageRotateFlip from "../Components/ImageRotateFlip";
import ImageGrayscale from "../Components/ImageGrayscale";
import ImageBrightness from "../Components/ImageBrightness";

// Training
import Trainer from "../Components/Trainer";
import Metrics from "../Components/Metrics";
import Output from "../Components/Output";
import Export from "../Components/Export";

// Inference
import Predictor from "../Components/Predictor";
import ImageDataSource from "../Components/ImageDataSource";
import UrlDataSource from "../Components/UrlDataSource";
import CamreraDataSource from "../Components/CamreraDataSource";
import AnnotatedOutput from "../Components/AnnotatedOutput";

// Gallery
import ImageViewer from "../Components/ImageViewer";

const nodeTypes = {
	InputImage: InputImage,
	InputLabel: InputLabel,
	InputDataset: InputDataset,
	SplitDataset: SplitDataset,
	ImageResize: ImageResize,
	ImageRotateFlip: ImageRotateFlip,
	ImageGrayscale: ImageGrayscale,
	ImageBrightness: ImageBrightness,
	Trainer: Trainer,
	Metrics: Metrics,
	Output: Output,
	Export: Export,
	Predictor: Predictor,
	ImageDataSource: ImageDataSource,
	UrlDataSource: UrlDataSource,
	CamreraDataSource: CamreraDataSource,
	AnnotatedOutput: AnnotatedOutput,
	ImageViewer: ImageViewer,
};

const initNodes = [
	{
		id: "1",
		type: "ImageDataSource",
		data: { id: 1, images: 0, items: 0, completed: 0, inProgress: 0, progress: 20 },
		position: { x: -150, y: 0 },
		dragHandle: ".custom-drag-handle",
	},
	{
		id: "2",
		type: "UrlDataSource",
		data: { id: 2, images: 0, items: 0, completed: 0, inProgress: 0, progress: 20 },
		position: { x: -150, y: 200 },
		dragHandle: ".custom-drag-handle",
	},
	{
		id: "3",
		type: "CamreraDataSource",
		data: { id: 3, images: 0, items: 0, completed: 0, inProgress: 0, progress: 20 },
		position: { x: -150, y: -250 },
		dragHandle: ".custom-drag-handle",
	},
	{
		id: "4",
		type: "Predictor",
		data: { id: 4, images: 0, items: 0, completed: 0, inProgress: 0, progress: 20 },
		position: { x: 150, y: 0 },
		dragHandle: ".custom-drag-handle",
	},
	{
		id: "5",
		type: "AnnotatedOutput",
		data: { id: 5, images: 0, items: 0, completed: 0, inProgress: 0, progress: 20 },
		position: { x: 400, y: 0 },
		dragHandle: ".custom-drag-handle",
	},
];

const initEdges = [
	{
		id: "e3-4",
		source: "3",
		target: "4",
	},
	{
		id: "e4-5",
		source: "4",
		target: "5",
	},
];

const PreditionPipeline = () => {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	let id = 0;
	const getId = () => `pipeJoins_${id++}`;
	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);
	const onDrop = useCallback(
		(event) => {
			event.preventDefault();
			console.log(reactFlowWrapper);
			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");
			// check if the dropped element is valid
			if (typeof type === "undefined" || !type) {
				return;
			}
			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});
			let tempData = {};
			if (type === "Predictor") {
				tempData = { id: getId(), images: 0, items: 0, completed: 0, inProgress: 0, progress: 0 };
			} else if (type === "ImageDataSource") {
				tempData = { id: getId(), labels: 0, items: 0, completed: 0, inProgress: 0, progress: 0 };
			} else if (type === "UrlDataSource") {
				tempData = { id: getId(), labels: 0, items: 0, completed: 0, inProgress: 0, progress: 0 };
			} else if (type === "CamreraDataSource") {
				tempData = { id: getId(), labels: 0, items: 0, completed: 0, inProgress: 0, progress: 0 };
			} else if (type === "AnnotatedOutput") {
				tempData = { id: getId(), labels: 0, items: 0, completed: 0, inProgress: 0, progress: 0 };
			}
			const newNode = {
				id: getId(),
				type,
				position,
				data: tempData,
				dragHandle: ".custom-drag-handle",
			};
			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance]
	);
	return (
		<ReactFlowProvider>
			<div className="w-full h-screen rounded-lg p-2 flex items-center gap-2" ref={reactFlowWrapper}>
				<Sidebar />
				<div className="bg-primary-900 w-[80vw] overflow-hidden drop-shadow-lg h-full rounded-xl relative">
					<ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} onInit={setReactFlowInstance} onDrop={onDrop} onDragOver={onDragOver} fitView>
						<MiniMap zoomable pannable className="bg-primary-600 rounded-xl" />
						<Controls />
						<Background variant="dots" color="var(--primary-500)" className="opacity-40" gap={8} size={1.5} />
					</ReactFlow>
					<div className="absolute flex flex-nowrap items-center justify-center gap-3 top-3 right-5 text-2xl p-1 px-2 text-white">
						<button className="flex flex-nowrap items-center justify-center gap-1 bg-green-600 rounded-lg p-1 px-2">
							<svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 36 36">
								<path className="clr-i-solid clr-i-solid-path-1" d="M32.16,16.08,8.94,4.47A2.07,2.07,0,0,0,6,6.32V29.53a2.06,2.06,0,0,0,3,1.85L32.16,19.77a2.07,2.07,0,0,0,0-3.7Z" />
								<rect x={0} y={0} width={36} height={36} fillOpacity={0} />
							</svg>
							Start
						</button>
						<button className="flex flex-nowrap items-center justify-center gap-1 bg-red-600 rounded-lg p-1 px-2">
							<svg width={25} height={25} viewBox="0 0 24 24" fill="none">
								<path d="M8 2 2 8.156V16l6 6h8l6-6V8.156L16 2H8Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
								<path d="M16 12H8" stroke="white" strokeWidth={2} strokeLinecap="round" />
							</svg>
							stop
						</button>
					</div>
				</div>
			</div>
		</ReactFlowProvider>
	);
};

export default PreditionPipeline;
