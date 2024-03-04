import React, { useState, useRef } from "react";

import ImageAnnotationSidebar from "../Components/ImageAnnotationSidebar";
import ImageAnnotationTools from "../Components/ImageAnnotationTools";

const ImageAnnotation = () => {
    const [mode, setMode] = useState("polygon");
    const [tempShape, setTempShape] = useState([[]]);
    const [magicPoints, setMagicPoints] = useState([]);
    const [magicMode, setMagicMode] = useState(0);
    const [currentPolygonIndex, setCurrentPolygonIndex] = useState(0);
    const [labels, setLabels] = useState([]);
    const dragIndexRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });

    const handleMouseDown = (index, event) => {
        try {
            dragIndexRef.current = index;
            dragStartRef.current = { x: event.clientX, y: event.clientY };
            document.getElementById("annotationBox").addEventListener("mousemove", handleMouseMove);
        } catch (err) {}
    };

    const handleMouseMove = (event) => {
        try {
            const dragDeltaX = event.clientX - dragStartRef.current.x;
            const dragDeltaY = event.clientY - dragStartRef.current.y;
            if (dragIndexRef.current !== null) {
                if (mode === "magic") {
                    setMagicPoints((prevMagicPoints) => {
                        const updatedMagicPoints = [...prevMagicPoints];
                        updatedMagicPoints[dragIndexRef.current] = [updatedMagicPoints[dragIndexRef.current][0] + dragDeltaX, updatedMagicPoints[dragIndexRef.current][1] + dragDeltaY];
                        return updatedMagicPoints;
                    });
                } else if (mode === "polygon") {
                    setTempShape((prevTempShape) => {
                        const updatedTempShape = [...prevTempShape];
                        updatedTempShape[dragIndexRef.current.split(",")[0]][dragIndexRef.current.split(",")[1]] = [updatedTempShape[dragIndexRef.current.split(",")[0]][dragIndexRef.current.split(",")[1]][0] + dragDeltaX, updatedTempShape[dragIndexRef.current.split(",")[0]][dragIndexRef.current.split(",")[1]][1] + dragDeltaY];
                        return updatedTempShape;
                    });
                }

                dragStartRef.current = { x: event.clientX, y: event.clientY };
            }
        } catch (err) {}
    };

    const handleMouseUp = () => {
        try {
            document.getElementById("annotationBox").removeEventListener("mousemove", handleMouseMove);
        } catch (err) {}
    };

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        let menu = document.getElementById("menu");
        menu.classList.remove("scale-y-0");
        let imageAnnotationMain = document.getElementById("imageAnnotationMain");
        let corridates = {
            x: event.clientX - imageAnnotationMain.offsetLeft,
            y: event.clientY - imageAnnotationMain.offsetTop,
        };
        menu.style.top = corridates.y + "px";
        menu.style.left = corridates.x + 20 + "px";
        let menuTimer = setTimeout(() => {
            menu.classList.add("scale-y-0");
        }, 2000);
        menu.addEventListener(
            "mouseenter",
            () => {
                clearTimeout(menuTimer);
            },
            { once: true }
        );
        menu.addEventListener(
            "mouseleave",
            () => {
                menu.classList.add("scale-y-0");
            },
            { once: true }
        );
    });

    function segmentImage(event) {
        if (mode === "polygon") {
            console.log(mode);
            try {
                console.log(dragIndexRef.current);
                if (dragIndexRef.current == null) {
                    let corridates = {
                        x: event.nativeEvent.offsetX,
                        y: event.nativeEvent.offsetY,
                    };
                    let shapes = [];
                    if (tempShape[0].length === 0) {
                        shapes = [[]];
                    } else {
                        shapes = [...tempShape];
                    }
                    let currentShape = shapes[currentPolygonIndex];
                    console.log(shapes);
                    if (corridates.x !== NaN && corridates.y !== NaN) {
                        let annotationBox = document.getElementById("annotationBox");
                        let annotationBoxWidth = annotationBox.clientWidth;
                        let annotationBoxHeight = annotationBox.clientHeight;
                        let corrPercentX = (corridates.x / annotationBoxWidth) * 100;
                        let corrPercentY = (corridates.y / annotationBoxHeight) * 100;
                        currentShape.push([corrPercentX, corrPercentY]);
                        setTempShape([...shapes]);
                    }
                } else {
                    dragIndexRef.current = null;
                }
            } catch (err) {}
        } else if (mode === "magic") {
            setTempShape([[]]);
            try {
                let corridates = {
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                };
                setMagicPoints((prevMagicPoints) => {
                    let updatedMagicPoints = [...prevMagicPoints];
                    updatedMagicPoints.push([corridates.x, corridates.y, magicMode]);
                    return updatedMagicPoints;
                });
            } catch (err) {}
        }
    }
    return (
        <div className="bg-primary-950 p-3 w-full h-[calc(100vh-7rem)] flex flex-nowrap gap-3 overflow-hidden">
            <ImageAnnotationSidebar setTempShape={setTempShape} setCurrentPolygonIndex={setCurrentPolygonIndex} setMagicPoints={setMagicPoints} labels={labels} setLabels={setLabels} />
            <div id="imageAnnotationMain" className="w-[80%] h-full bg-primary-900 rounded-lg inner-shadow overflow-hidden cursor-crosshair">
                <div className="absolute top-0 left-0 w-full bg-primary-800/50"></div>
                <div
                    id="imageContainer"
                    onMouseMove={(event) => {
                        let imageContainer = document.getElementById("imageContainer");
                        let corridates = {
                            x: event.pageX - imageContainer.offsetLeft,
                            y: event.pageY - imageContainer.offsetTop,
                        };
                        let horizontalBar = document.getElementById("horizontalBar");
                        let verticalBar = document.getElementById("verticalBar");
                        horizontalBar.style.top = corridates.y + "px";
                        verticalBar.style.left = corridates.x + "px";
                    }}
                    className="w-full h-full flex items-center justify-center object-cover relative"
                >
                    <img
                        id="annotationFinalImage"
                        alt=""
                        src="http://via.placeholder.com/1080x500/1a202c/2d3748?text=Image"
                        className="w-full h-full object-contain "
                        onDragStart={(event) => {
                            event.preventDefault();
                        }}
                    ></img>
                    <div
                        id="annotationBox"
                        onDragStart={(event) => {
                            event.preventDefault();
                        }}
                        onClick={(event) => {
                            segmentImage(event);
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="h-full w-full absolute top-0 left-0">
                            <svg id="annotationShape" className="h-full w-full">
                                {tempShape.map((shape, index) => (
                                    <polygon id={"shape_" + index} fill="green" fillOpacity={0.5} stroke="var(--primary-500)" points={shape.map((point) => (point[0] !== undefined ? (point[0] * document.getElementById("annotationBox").clientWidth) / 100 + "," + (point[1] * document.getElementById("annotationBox").clientHeight) / 100 + " " : ""))} />
                                ))}
                            </svg>
                            {tempShape.map((shape, index) => (
                                <>
                                    {shape.map((point, index2) => (
                                        <div id={"annotationShape_" + index + "_" + index2} onMouseUp={() => handleMouseUp()} onMouseDown={(event) => handleMouseDown(index + "," + index2, event)} key={index2} style={{ left: point[0] + "%", top: point[1] + "%" }} className={"absolute h-2 w-2 border-2  -translate-x-1/2 -translate-y-1/2 rounded-full outline-offset-4 border-of cursor-move " + (index2 === 0 ? "border-red-500 scale-150 bg-red-500/50" : "border-primary-500 bg-primary-200/50")}></div>
                                    ))}
                                </>
                            ))}
                            {magicPoints.map((point, index) => (
                                <div id={"magicPoint_" + index} onMouseUp={() => handleMouseUp()} onMouseDown={(event) => handleMouseDown(index, event)} key={index} style={{ left: point[0], top: point[1] }} className={"absolute h-4 w-4 border-2  -translate-x-1/2 -translate-y-1/2 rounded-full outline-offset-4 border-of cursor-move scale-150 " + (point[2] === 1 ? "border-red-500 bg-red-500/50" : "border-green-500 bg-green-200/50")}></div>
                            ))}
                        </div>
                    </div>
                    <div id="menu" className="scale-y-0 h-fit w-fit py-1 px-2 bg-primary-800 shadow-lg text-white absolute rounded-lg transition-all">
                        {mode === "magic" ? (
                            <div className="flex flex-col justify-center items-center p-1 gap-2">
                                <div className="flex justify-center items-center p-1 gap-2">
                                    <button
                                        onClick={() => {
                                            setMagicMode(0);
                                        }}
                                        className={"h-7 w-7 pb-1 cursor-pointer flex justify-center items-center rounded  text-white text-xl font-bold hover:scale-110 transition-all duration-300  " + (magicMode === 0 ? "bg-green-500" : "bg-green-300 ")}
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMagicMode(1);
                                        }}
                                        className={"h-7 w-7 pb-1 cursor-pointer flex justify-center items-center rounded  text-white text-xl font-bold hover:scale-110 transition-all duration-300  " + (magicMode === 1 ? "bg-red-500" : "bg-red-300 ")}
                                    >
                                        -
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        document.getElementById("loader").classList.remove("scale-0");
                                        var formdata = new FormData();
                                        let image = document.getElementById("annotationFinalImage");
                                        let width = image.naturalWidth;
                                        let height = image.naturalHeight;
                                        let name = image.getAttribute("data-name");
                                        let points = { data: [] };
                                        let labels = { data: [] };
                                        magicPoints.forEach((point) => {
                                            points.data.push([(point[0] * 100) / width, (point[1] * 100) / height]);
                                            labels.data.push(point[2]);
                                        });
                                        // convert image to file object
                                        fetch(image.src)
                                            .then((res) => res.blob())
                                            .then((blob) => {
                                                const file = new File([blob], name, { type: "image/jpeg" });
                                                formdata.append("image", file, name);
                                                formdata.append("points", JSON.stringify(points));
                                                formdata.append("labels", JSON.stringify(labels));

                                                var requestOptions = {
                                                    method: "POST",
                                                    body: formdata,
                                                    redirect: "follow",
                                                };

                                                fetch(process.env.REACT_APP_SERVER + "/api/segment", requestOptions)
                                                    .then((response) => response.json())
                                                    .then((result) => {
                                                        let newShapes = result.data;

                                                        setTempShape([...newShapes, []]);
                                                        document.getElementById("loader").classList.add("scale-0");
                                                    })
                                                    .catch((error) => {
                                                        alert("error", error);
                                                        document.getElementById("loader").classList.add("scale-0");
                                                    });
                                            })
                                            .catch((error) => {
                                                alert("error", error);
                                                document.getElementById("loader").classList.add("scale-0");
                                            });
                                    }}
                                    className="bg-primary-500 p-1 px-2 rounded hover:scale-110 transition-all duration-300"
                                >
                                    Process
                                </button>
                            </div>
                        ) : (
                            <>
                                <p
                                    onClick={() => {
                                        if (tempShape[tempShape.length - 1].length > 0) {
                                            setCurrentPolygonIndex(currentPolygonIndex + 1);
                                            setTempShape([...tempShape, []]);
                                            document.getElementById("menu").classList.add("scale-y-0");
                                        }
                                        if (document.getElementById("annotatorEditorContainer").classList.contains("scale-0")) {
                                            document.getElementById("annotatorEditorContainer").classList.remove("scale-0");
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    Done
                                </p>
                                <p
                                    onClick={() => {
                                        if (tempShape[tempShape.length - 1].length > 0) {
                                            let tempData = [...tempShape];
                                            tempData.pop();
                                            setTempShape([...tempData, []]);
                                        }
                                        document.getElementById("annotatorEditorContainer").classList.add("scale-0");
                                    }}
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </p>
                            </>
                        )}
                    </div>
                    <div id="horizontalBar" className="absolute  h-0 w-full outline-1 outline-red-500 outline-dashed z-30"></div>
                    <div id="verticalBar" className="absolute h-full w-0 outline-1 outline-red-500 outline-dashed z-30"></div>
                    <div id="loader" className="absolute h-full w-full bg-primary-800/70 z-40  backdrop-blur-lg animate-pulse scale-0 transition-all">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{
                                margin: "auto",
                                background: "#ffffff00",
                                display: "block",
                            }}
                            className="w-full h-full mix-blend-multiply"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                        >
                            <path
                                fill="none"
                                stroke="#3182ce"
                                strokeWidth={4}
                                strokeDasharray="42.76482137044271 42.76482137044271"
                                d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                                strokeLinecap="round"
                                style={{
                                    transform: "scale(0.8)",
                                    transformOrigin: "50px 50px",
                                }}
                            >
                                <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="3.571428571428571s" keyTimes="0;1" values="0;256.58892822265625" />
                            </path>
                        </svg>
                    </div>
                    <div id="annotatorEditorContainer" className="bg-primary-950 border border-gray-100/25 absolute top-4 left-4 h-max w-max rounded-xl transition-all duration-300 z-[60] overflow-hidden scale-0">
                        <div className="flex items-center justify-between gap-4 text-white border-b border-gray-100/25 px-2 cursor-move">
                            <p>Annotator Editor</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={14}
                                fill="#ffffff"
                                className="cursor-pointer"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                    document.getElementById("annotatorEditorContainer").classList.toggle("scale-0");
                                }}
                            >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </div>
                        <div className="w-full px-2 my-2">
                            <select id="labelConfirm" className="w-full p-1 rounded focus:outline-none">
                                {labels.map((label, index) => (
                                    <option key={index} value={label.color}>
                                        {label.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-between px-2">
                            <p
                                className="border border-red-500 bg-red-200 text-red-800 rounded px-2 cursor-pointer"
                                onClick={() => {
                                    document.getElementById("annotatorEditorContainer").classList.toggle("scale-0");
                                }}
                            >
                                Delete
                            </p>
                            <p
                                className="border border-green-500 bg-green-200 text-green-800 rounded px-2 cursor-pointer"
                                onClick={() => {
                                    document.getElementById("annotatorEditorContainer").classList.toggle("scale-0");
                                    let shapeLength = document.getElementById("annotationShape").childNodes.length;
                                    document.getElementById("annotationShape").childNodes[shapeLength - 2].setAttribute("fill", document.getElementById("labelConfirm").value);
                                }}
                            >
                                Save
                            </p>
                        </div>
                        <div className="mt-2 border-t border-gray-100/25">
                            {labels.map((label, index) => (
                                <p
                                    key={index}
                                    onClick={() => {
                                        document.getElementById("labelConfirm").value = label.color;
                                    }}
                                    className="px-2 font-semibold text-black cursor-pointer"
                                    style={{ backgroundColor: label.color }}
                                >
                                    {label.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <ImageAnnotationTools tempShape={tempShape} setTempShape={setTempShape} setMagicPoints={setMagicPoints} magicPoints={magicPoints} setMode={setMode} mode={mode} />
                <div id="annotationPointContainer"></div>
            </div>
        </div>
    );
};

export default ImageAnnotation;
