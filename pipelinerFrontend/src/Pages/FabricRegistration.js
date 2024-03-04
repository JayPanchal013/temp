import React, { useState, useEffect } from "react";

const FabricRegistration = () => {
    const [images, setImages] = useState([]);
    const [fabric, setFabric] = useState([]);
    const [models, setModels] = useState([]);
    const [datasetName, setDatasetName] = useState("");
    const [datasets, setDatasets] = useState([]);
    const [datasetsList, setDatasetsList] = useState([]);
    const [fabricName, setFabricName] = useState("");
    const [fabricDetails, setFabricDetails] = useState("");
    const [fabricImages, setFabricImages] = useState([]);
    const [labelColor, setLabelColor] = useState("#FFFF00");

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setFabric(data["data"]);
            });
        fetch(process.env.REACT_APP_SERVER + "/api/basemodelFecther")
            .then((res) => res.json())
            .then((data) => {
                setModels(data["data"]);
            });
    }, []);

    return (
        <div className="min-h-screen w-[calc(100%-2rem)] mx-auto h-full mb-5">
            <div className="p-[2px] w-full h-full text-white mx-auto mt-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
                <div className="mt-4">
                    <div className="grid grid-cols-4 gap-4 gap-y-1">
                        <div className="h-64 mb-5 border border-primary-500 rounded-lg p-2 overflow-hidden">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full h-fit mb-3">
                                    <p>Fabric Name</p>
                                    <input id="fabricName" name="fabricName" type="text" placeholder="Enter fabric name..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                                </div>
                                <div className="w-full h-fit mb-3">
                                    <p>Fabric Type</p>
                                    <div className="relative mt-1.5 flex">
                                        <select id="fabricType" name="fabricType" className="form-input outline-none peer w-full rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-1.5 text-black hover:border-secondary-700 focus:border-secondary ">
                                            <option selected value="">
                                                --Fabric Type--
                                            </option>
                                            <option value="Printed">Printed</option>
                                            <option value="Not Printed">Not Printed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mb-3">
                                <p>Fabric Details</p>
                                <textarea id="fabricDetails" name="fabricDetails" rows={1} placeholder="Enter fabric details..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none resize-none" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="w-full h-fit mb-3">
                                    <p>Color</p>
                                    <input id="fabricColor" name="fabricColor" type="text" placeholder="Enter color..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                                </div>
                                <div className="w-full h-fit mb-3">
                                    <p>GSM</p>
                                    <input id="fabricGSM" name="fabricGSM" type="text" placeholder="Enter GSM..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                                </div>
                                <div className="w-full h-fit mb-3">
                                    <p>Material</p>
                                    <input id="fabricMaterial" name="fabricMaterial" type="text" placeholder="Enter material..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                                </div>
                            </div>
                        </div>
                        <div id="labelContainer" className="h-64 mb-5 border border-primary-500 rounded-lg  overflow-y-scroll">
                            <div className="flex flex-nowrap justify-between sticky top-0 z-40 bg-primary-950 p-2">
                                <p>Labels</p>
                                <div className="flex flex-nowrap ">
                                    <svg
                                        onClick={() => {
                                            let labelContainer = document.getElementById("labelContainer");
                                            let childCount = labelContainer.childElementCount;
                                            let newDiv = document.createElement("div");
                                            newDiv.setAttribute("class", "w-full group h-fit px-2 flex flex-nowrap gap-2 mb-3 mt-1.5 items-center justify-between");
                                            let newInput = document.createElement("input");
                                            newInput.setAttribute("id", "label" + childCount);
                                            newInput.setAttribute("name", "label" + childCount);
                                            newInput.setAttribute("type", "text");
                                            newInput.setAttribute("placeholder", "Enter label " + childCount + " name...");
                                            newInput.setAttribute("class", "w-full rounded-lg px-3 py-1.5  bg-white text-black placeholder:text-black outline-none focus:outline-none");
                                            let newSubDiv = document.createElement("div");
                                            newSubDiv.setAttribute("class", "w-10 h-9 overflow-hidden rounded-lg");
                                            let newColorInput = document.createElement("input");
                                            newColorInput.setAttribute("id", "labelColor" + childCount);
                                            newColorInput.setAttribute("name", "labelColor" + childCount);
                                            newColorInput.setAttribute("type", "color");
                                            var letters = "0123456789ABCDEF";
                                            var color = "#";
                                            for (var i = 0; i < 6; i++) {
                                                color += letters[Math.floor(Math.random() * 16)];
                                            }
                                            newColorInput.setAttribute("value", color);
                                            newColorInput.setAttribute("class", "scale-150 h-full");
                                            newSubDiv.appendChild(newColorInput);
                                            newDiv.appendChild(newInput);
                                            newDiv.appendChild(newSubDiv);
                                            labelContainer.appendChild(newDiv);
                                        }}
                                        width={25}
                                        height={25}
                                        viewBox="0 0 48 48"
                                    >
                                        <circle fill="#4CAF50" cx={24} cy={24} r={21} />
                                        <g fill="#fff">
                                            <path d="M21 14h6v20h-6z" />
                                            <path d="M14 21h20v6H14z" />
                                        </g>
                                    </svg>
                                    <svg
                                        onClick={() => {
                                            let labelContainer = document.getElementById("labelContainer");
                                            let childCount = labelContainer.childElementCount;
                                            if (childCount > 2) {
                                                labelContainer.removeChild(labelContainer.lastChild);
                                            }
                                        }}
                                        width={25}
                                        height={25}
                                        viewBox="0 0 48 48"
                                    >
                                        <circle fill="#ff0000" cx={24} cy={24} r={21} />
                                        <g fill="#fff">
                                            <path d="M14 21h20v6H14z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full px-2 group h-fit flex flex-nowrap gap-2 mb-3 mt-1.5 items-center justify-between">
                                <input id="label1" name="label1" type="text" placeholder="Enter label 1 Name..." className="w-full rounded-lg px-3 py-1.5  bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                                <div className="w-10 h-9 overflow-hidden rounded-lg">
                                    <input
                                        id="labelColor1"
                                        name="labelColor1"
                                        type="color"
                                        className="scale-150 h-full"
                                        value={labelColor}
                                        onChange={(event) => {
                                            setLabelColor(event.currentTarget.value);
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 mb-5 border border-primary-500 rounded-lg p-2">
                            <p>Images</p>
                            <div className="h-28 w-full text-white border border-white/10 mt-1.5 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center">
                                <input
                                    onChange={() => {
                                        // get total number of files
                                        const files = document.getElementById("fabricImageInput").files;

                                        const images = [];
                                        for (let i = 0; i < files.length; i++) {
                                            images.push(URL.createObjectURL(files[i]));
                                        }
                                        setImages(images);
                                        // 	document.getElementById("dragAndDropContainer_" + data["id"]).classList.add("hidden");
                                        // 	document.getElementById("previewInputData_" + data["id"]).classList.remove("hidden");
                                    }}
                                    id="fabricImageInput"
                                    type="file"
                                    multiple
                                    name="images"
                                    accept="image/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                />
                                <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                                </svg>
                                <p className="text-[13px] font-mono">Drag and Drop Files</p>
                            </div>
                            <div className="flex w-full gap-4 mt-4 overflow-x-scroll noScroll">
                                {images.map((image, index) => (
                                    <img src={image} key={index} className="rounded-lg max-w-20 w-20 min-w-20 h-20 aspect-square object-cover" />
                                ))}
                            </div>
                        </div>
                        <div className="h-64 mb-5 border border-primary-500 rounded-lg p-2">
                            <p>Dataset</p>
                            <div className="h-52 w-full text-white border border-white/10 mt-1.5 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    name="datasetInput"
                                    id="datasetInput"
                                    accept=".zip,.rar,.7zip"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={() => {
                                        const files = document.getElementById("datasetInput").files;
                                        if (files.length > 0) {
                                            document.getElementById("datasetName").innerHTML = files[0].name;
                                        }
                                    }}
                                />
                                <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                                </svg>
                                <p className="text-[13px] font-mono" id="datasetName">
                                    Drag and Drop Files
                                </p>
                            </div>
                        </div>
                        <div id="cover" className="hidden absolute top-0 left-0 bg-primary-200/80 animate-pulse h-full w-full rounded-md backdrop-blur-xl z-50"></div>
                    </div>
                    <div
                        onClick={(event) => {
                            event.target.classList.add("animate-pulse");
                            document.getElementById("cover").classList.remove("hidden");
                            let labelContainer = document.getElementById("labelContainer");
                            let labels = [];
                            for (let i = 1; i < labelContainer.children.length; i++) {
                                let tempLabel = document.getElementById("label" + i).value;
                                let tempLabelColor = document.getElementById("labelColor" + i).value;
                                labels.push([tempLabel, tempLabelColor]);
                            }

                            var formdata = new FormData();
                            formdata.append("fabricName", document.getElementById("fabricName").value);
                            formdata.append("fabricDetails", document.getElementById("fabricDetails").value);
                            formdata.append("fabricType", document.getElementById("fabricType").value);
                            formdata.append("fabricColor", document.getElementById("fabricColor").value);
                            formdata.append("fabricGSM", document.getElementById("fabricGSM").value);
                            formdata.append("fabricMaterial", document.getElementById("fabricMaterial").value);
                            formdata.append("fabricLabels", JSON.stringify(labels));

                            for (var i = 0; i < document.getElementById("fabricImageInput").files.length; i++) {
                                let file = document.getElementById("fabricImageInput").files[i];
                                formdata.append("images", file, file.name);
                            }
                            formdata.append("dataset", document.getElementById("datasetInput").files[0], document.getElementById("datasetInput").files[0].name);

                            var requestOptions = {
                                method: "POST",
                                body: formdata,
                                redirect: "follow",
                            };

                            fetch(process.env.REACT_APP_SERVER + "/api/addNewFebric/", requestOptions)
                                .then((response) => response.json())
                                .then((result) => {
                                    if (!result.hasOwnProperty("error")) {
                                        event.target.classList.remove("animate-pulse");
                                        alert("Fabric Added Successfully");
                                        window.location.reload();
                                        document.getElementById("cover").classList.remove("hidden");
                                    } else {
                                        alert(result["error"]);
                                        document.getElementById("cover").classList.remove("hidden");
                                    }
                                })
                                .catch((error) => console.log("error", error));
                        }}
                        className="w-full bg-primary-800 rounded-lg text-center p-2 cursor-pointer"
                    >
                        <p className="font-mono font-medium">Register Fabric</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 gap-y-1 mt-5">
                        <div className="h-fit border border-primary-500 rounded-lg p-2">
                            <div className="block text-sm">
                                <p>Fabric</p>
                                <span className="relative mt-1.5 flex">
                                    <select
                                        onChange={() => {
                                            fetch(process.env.REACT_APP_SERVER + "/api/getFebricDetails?fabricName=" + document.getElementById("project").value)
                                                .then((response) => response.json())
                                                .then((result) => {
                                                    setFabricDetails(result["description"]);
                                                    setFabricImages(result["images"]);
                                                })
                                                .catch((error) => console.log("error", error));
                                            fetch(process.env.REACT_APP_SERVER + "/api/datasetFecther?project=" + document.getElementById("project").value)
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    // check if the data has error key
                                                    if (!data.hasOwnProperty("error")) {
                                                        setDatasetsList(data["data"]);
                                                    } else {
                                                        setDatasetsList([]);
                                                        alert(data["error"]);
                                                    }
                                                });
                                        }}
                                        id="project"
                                        name="project"
                                        className="form-input outline-none peer w-full rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-2 pl-9 text-black hover:border-secondary-700 focus:border-secondary "
                                    >
                                        <option selected value="">
                                            --Select Fabric--
                                        </option>
                                        {fabric.map((project, index) => (
                                            <option key={index} value={project}>
                                                {project}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 400 400">
                                            <path
                                                style={{
                                                    opacity: 1,
                                                    fill: "currentColor",
                                                    fillOpacity: 1,
                                                    stroke: "none",
                                                    strokeWidth: 25,
                                                    strokeMiterlimit: 4,
                                                    strokeDasharray: "none",
                                                    strokeDashoffset: 0,
                                                    strokeOpacity: 1,
                                                }}
                                                d="M237.43 701.862v40h-186v49.692H0v211.308h400v-301H262.43zm25 25H375v251h-50v-185.42h-.162v-.888H76.43v-24.692l186 .945z"
                                                transform="translate(0 -652.362)"
                                            />
                                        </svg>
                                    </span>
                                </span>
                                <p>Dataset</p>
                                <span className="relative mt-1.5 flex">
                                    <select id="dataset" name="dataset" className="form-input outline-none peer w-full rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-2 pl-9 text-black hover:border-secondary-700 focus:border-secondary ">
                                        <option selected value="">
                                            --Select Dataset--
                                        </option>
                                        {datasetsList.map((project, index) => (
                                            <option key={index} value={project}>
                                                {project}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 400 400">
                                            <path
                                                style={{
                                                    opacity: 1,
                                                    fill: "currentColor",
                                                    fillOpacity: 1,
                                                    stroke: "none",
                                                    strokeWidth: 25,
                                                    strokeMiterlimit: 4,
                                                    strokeDasharray: "none",
                                                    strokeDashoffset: 0,
                                                    strokeOpacity: 1,
                                                }}
                                                d="M237.43 701.862v40h-186v49.692H0v211.308h400v-301H262.43zm25 25H375v251h-50v-185.42h-.162v-.888H76.43v-24.692l186 .945z"
                                                transform="translate(0 -652.362)"
                                            />
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            <div className="w-full mt-2">
                                <p>Fabric Details</p>
                                <textarea id="fabricDetails" name="fabricDetails" value={fabricDetails} rows={3} placeholder="Enter fabric details..." className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" />
                            </div>
                            <div className="bg-primary-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3 py-2 mt-1">
                                <p className="font-mono font-meduim">Click Here To Refresh Fabric List</p>
                            </div>
                        </div>
                        <div className="h-64 border border-primary-500 rounded-lg p-2">
                            <p>Images</p>
                            <div className="grid grid-cols-4 gap-4 mt-1.5 max-h-[13rem] overflow-y-scroll">
                                {fabricImages.map((image, index) => (
                                    <img key={index} src={process.env.REACT_APP_SERVER + "/static/" + image} alt="" className="w-full h-20 rounded-lg aspect-square object-cover hover:scale-90 transition-all duration-300" />
                                ))}
                            </div>
                        </div>
                        <div className="h-64 mb-5 border border-primary-500 rounded-lg p-2 relative overflow-hidden">
                            <p>Dataset</p>
                            <div
                                onClick={(event) => {
                                    event.target.classList.add("animate-pulse");
                                    var formdata = new FormData();
                                    try {
                                        formdata.append("dataset", document.getElementById("datasetInput2").files[0], "/D:/pythonProjects/TextileProject/NoteBooks/datasets/data.zip");
                                    } catch (e) {}
                                    formdata.append("projectName", document.getElementById("project").value);
                                    if (document.getElementById("dataset").value !== "") {
                                        formdata.append("datasetName", document.getElementById("dataset").value);
                                    }

                                    var requestOptions = {
                                        method: "POST",
                                        body: formdata,
                                        redirect: "follow",
                                    };
                                    document.getElementById("cover").classList.remove("hidden");
                                    fetch(process.env.REACT_APP_SERVER + "/api/extractFolder/", requestOptions)
                                        .then((response) => response.json())
                                        .then((result) => {
                                            if (result["error"] === undefined) {
                                                alert(result["success"]);
                                                document.getElementById("cover").classList.add("hidden");
                                            } else {
                                                alert(result["error"]);
                                                document.getElementById("cover").classList.add("hidden");
                                            }
                                            event.target.classList.remove("animate-pulse");
                                        })
                                        .catch((error) => {
                                            console.log("error", error);
                                            document.getElementById("cover").classList.add("hidden");
                                        });
                                }}
                                className="absolute top-0 right-0  bg-green-500 px-3  rounded-bl-lg cursor-pointer hover:bg-green-600 transition-all duration-300"
                            >
                                <p>Upload</p>
                            </div>
                            <div className="h-52 w-full text-white border border-white/10 mt-1.5 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    name="datasetInput2"
                                    id="datasetInput2"
                                    accept=".zip,.rar,.7zip"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={() => {
                                        const files = document.getElementById("datasetInput2").files;
                                        if (files.length > 0) {
                                            document.getElementById("datasetName2").innerHTML = files[0].name;
                                        }
                                    }}
                                />
                                <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                                </svg>
                                <p className="text-[13px] font-mono" id="datasetName2">
                                    Drag and Drop Files
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FabricRegistration;
