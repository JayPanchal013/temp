import React, { useState, useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const TrainForm = () => {
    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);
    const [baseModel, setBaseModel] = useState("");
    const [epochs, setEpochs] = useState(100);
    const [imageSize, setImageSize] = useState(640);
    const [tableData, setTableData] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [modelName, setModelName] = useState("");
    const [datasetName, setDatasetName] = useState("");
    const [datasets, setDatasets] = useState([]);
    const [resume, setResume] = useState(false);

    const wrapperRef = useRef(null);

    const grid = new Grid({
        columns: ["Epochs", "Metrics/Precision(B)", "Metrics/Recall(B)", "Metrics/mAP50(B)", "Metrics/mAP50-95(B)"],
        data: tableData,
        sort: true,
        pagination: {
            limit: 10,
            summary: true,
        },
    });

    useEffect(() => {
        let project = localStorage.getItem("project");
        let dataset = localStorage.getItem("dataset");
        if (project !== null && dataset !== null) {
            localStorage.removeItem("project");
            localStorage.removeItem("dataset");
            let newOption = document.createElement("option");
            newOption.value = project;
            newOption.innerHTML = project;
            document.getElementById("project").appendChild(newOption);
            document.getElementById("project").value = project;
            let newOption2 = document.createElement("option");
            newOption2.value = dataset;
            newOption2.innerHTML = dataset;
            document.getElementById("dataset").appendChild(newOption2);
            document.getElementById("dataset").value = dataset;
        }
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data["data"]);
            });
        fetch(process.env.REACT_APP_SERVER + "/api/basemodelFecther")
            .then((res) => res.json())
            .then((data) => {
                setModels(data["data"]);
            });
    }, []);
    return (
        <div className="min-h-screen w-[calc(100%-2rem)] mx-auto h-full mb-5">
            <div className="w-full h-full text-white mx-auto mt-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
                <div className="mt-4 ">
                    <div className="grid grid-cols-2 gap-4 gap-y-1 relative mb-5 overflow-hidden">
                        <div className="grid grid-rows-3 gap-4 gap-y-1 h-64 border border-primary-500 rounded-lg p-2">
                            <label className="block text-sm">
                                <span>Project</span>
                                <span className="relative mt-1.5 flex">
                                    <select
                                        onChange={() => {
                                            setProjectName(document.getElementById("project").value);
                                            let project = document.getElementById("project").value;
                                            if (project === "") {
                                                setDatasets([]);
                                            } else {
                                                fetch(process.env.REACT_APP_SERVER + "/api/datasetFecther?project=" + project)
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        // check if the data has error key
                                                        if (!data.hasOwnProperty("error")) {
                                                            setDatasets(data["data"]);
                                                        } else {
                                                            setDatasets([]);
                                                            alert(data["error"]);
                                                        }
                                                    });

                                                fetch(process.env.REACT_APP_SERVER + "/api/basemodelFecther?project=" + project)
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        setModels(data["data"]);
                                                        if (document.getElementById("resume").classList.contains("hidden")) {
                                                            document.getElementById("resume").classList.remove("hidden");
                                                            document.getElementById("resume").classList.add("flex");
                                                        }
                                                    });
                                            }
                                        }}
                                        id="project"
                                        name="project"
                                        className="form-input outline-none peer w-full rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-2 pl-9 text-black hover:border-secondary-700 focus:border-secondary "
                                    >
                                        <option selected value="">
                                            --Select Project--
                                        </option>
                                        {projects.map((project, index) => (
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
                            </label>
                            <label className="block text-sm">
                                <span>Path to Dataset</span>
                                <span className="relative mt-1.5 flex">
                                    <select
                                        onChange={() => {
                                            let dataset = document.getElementById("dataset").value;
                                            setDatasetName(dataset);
                                        }}
                                        required
                                        id="dataset"
                                        name="dataset"
                                        className="form-input outline-none peer w-full rounded-lg border border-slate-300 bg-white text-black px-3 py-2 pl-9 placeholder:font-light hover:border-secondary-700 focus:border-secondary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                    >
                                        <option selected value="">
                                            --Select Dataset--
                                        </option>
                                        {datasets.map((dataset, index) => (
                                            <option key={index} value={dataset}>
                                                {dataset}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                        <svg fill="currentColor" width="1.2em" height="1.2em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
                                        </svg>
                                    </span>
                                </span>
                            </label>
                            <div
                                onClick={() => {
                                    fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
                                        .then((res) => res.json())
                                        .then((data) => {
                                            setProjects(data["data"]);
                                        });
                                }}
                                className="bg-primary-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3"
                            >
                                <p className="font-mono font-meduim">Click Here To Refresh Project List</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-3 gap-y-1 h-64 border border-primary-500 rounded-lg p-2">
                            <div id="resume" className="items-center justify-end gap-3 hidden">
                                <p>Resume</p>
                                <label className="relative w-10 h-5">
                                    <input
                                        type="checkbox"
                                        defaultChecked={resume}
                                        onClick={() => {
                                            setResume(!resume);
                                        }}
                                        className="peer w-11 h-2 opacity-0"
                                    />
                                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-800 transition-all duration-300 rounded-full before:absolute before:h-3 before:w-3 before:bg-white before:content-[''] before:left-[4px] before:top-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-[20px]" />
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full">
                                    <p>Model Name</p>
                                    <input
                                        onChange={() => {
                                            setModelName(document.getElementById("modelName").value);
                                        }}
                                        id="modelName"
                                        name="modelName"
                                        value={modelName}
                                        type="text"
                                        placeholder="Enter name..."
                                        className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black"
                                    />
                                </div>
                                <label className="block text-sm">
                                    <span>Path to model</span>
                                    <span className="relative mt-1.5 flex">
                                        <select
                                            onChange={() => {
                                                setBaseModel(document.getElementById("baseModel").value);
                                            }}
                                            required
                                            id="baseModel"
                                            name="baseModel"
                                            className="form-input outline-none peer w-full rounded-lg border border-slate-300 bg-white text-black px-3 py-2 pl-9 placeholder:font-light hover:border-secondary-700 focus:border-secondary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                        >
                                            <option selected disabled value="">
                                                --Select Model--
                                            </option>
                                            {resume
                                                ? models?.projectModel?.map((model, index) => (
                                                      <option key={index} value={model}>
                                                          {model}
                                                      </option>
                                                  ))
                                                : models?.baseModel?.map((model, index) => (
                                                      <option key={index} value={model}>
                                                          {model}
                                                      </option>
                                                  ))}
                                            {/* {resume &&
                                                models?.projectModel?.map((model, index) => (
                                                    <option key={index} value={model}>
                                                        {model}
                                                    </option>
                                                ))}
                                            {!resume &&
                                                models?.baseModel?.map((model, index) => (
                                                    <option key={index} value={model}>
                                                        {model}
                                                    </option>
                                                ))} */}
                                        </select>
                                        <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                            <svg fill="currentColor" width="1.2em" height="1.2em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
                                            </svg>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="w-full my-3">
                                    <div className="text-white flex items-center justify-start gap-1 mb-2 text-xs font-mono">
                                        <svg fill="currentColor" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g>
                                                <g>
                                                    <path d="M15,24H0V9h2v13h13V24z M19,20H4V5h2v13h13V20z M24,16H8V0h16V16z M10,14h12V2H10V14z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <p>Epochs ({epochs})</p>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="300"
                                        id="epochs"
                                        name="epochs"
                                        value={epochs}
                                        onChange={(event) => {
                                            setEpochs(event.currentTarget.value);
                                        }}
                                        className="w-full rounded-full"
                                    />
                                </div>
                                <div className="w-full my-3">
                                    <div className="text-white flex items-center justify-start gap-1 mb-2 text-xs font-mono">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="currentColor" className="bi bi-aspect-ratio" viewBox="0 0 16 16">
                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                            <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z" />
                                        </svg>
                                        <p>Image Size ({imageSize})</p>
                                    </div>
                                    <input
                                        type="range"
                                        min="320"
                                        max="1024"
                                        id="imageSize"
                                        name="imageSize"
                                        value={imageSize}
                                        onChange={(event) => {
                                            setImageSize(event.currentTarget.value);
                                        }}
                                        className="w-full rounded-full"
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    document.getElementById("progressBar").classList.remove("hidden");
                                    document.getElementById("cover").classList.remove("hidden");
                                    let progressInterval = setInterval(() => {
                                        localStorage.setItem("progress", localStorage.getItem("progress") + 2);
                                        document.getElementById("progress").style.width = localStorage.getItem("progress") + "%";
                                        if (localStorage.getItem("progress") > 95) {
                                            localStorage.setItem("progress", 10 + (Math.floor(Math.random() * 10) + 1) * 2);
                                            document.getElementById("progress").style.width = localStorage.getItem("progress") + "%";
                                        }
                                    }, 1000);
                                    var formdata = new FormData();
                                    formdata.append("projectName", projectName);
                                    formdata.append("datasetName", datasetName);
                                    formdata.append("epochs", epochs);
                                    formdata.append("baseModel", baseModel);
                                    formdata.append("imgsz", imageSize);
                                    formdata.append("name", modelName);
                                    formdata.append("resume", resume);

                                    var requestOptions = {
                                        method: "POST",
                                        body: formdata,
                                        redirect: "follow",
                                    };

                                    fetch(process.env.REACT_APP_SERVER + "/api/training/", requestOptions)
                                        .then((response) => response.json())
                                        .then((result) => {
                                            if (result["error"] === undefined) {
                                                alert(result["success"]);
                                            } else {
                                                alert(result["error"]);
                                            }
                                            clearInterval(resultInterval);
                                            clearInterval(progressInterval);
                                            document.getElementById("progressBar").classList.add("hidden");
                                            document.getElementById("cover").classList.add("hidden");
                                        })
                                        .catch((error) => console.log("error", error));
                                    let resultInterval = setInterval(() => {
                                        try {
                                            fetch(process.env.REACT_APP_SERVER + "/api/modelDetails?project=" + projectName + "&model=" + modelName)
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    // check if data has error key
                                                    if (data["error"] === undefined) {
                                                        setTableData(data["data"]);
                                                        grid.render(wrapperRef.current);
                                                        grid.updateConfig({
                                                            data: data["data"],
                                                            sort: true,
                                                            pagination: {
                                                                limit: 10,
                                                                summary: true,
                                                            },
                                                        }).forceRender();
                                                    } else {
                                                        setTableData([]);
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }, 10000);
                                }}
                                className="bg-primary-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3 h-10 mt-3"
                            >
                                <p className="font-mono font-meduim">Train</p>
                            </div>
                        </div>
                        <div id="cover" className="hidden absolute top-0 left-0 bg-primary-200/80 animate-pulse h-full w-full rounded-md backdrop-blur-xl"></div>
                    </div>
                    <div className="w-full h-4 bg-primary-800 rounded-full mb-3 relative shadow-inner hidden" id="progressBar">
                        <div id="progress" className="absolute top-0 left-0 rounded-full h-full bg-primary-500 shadow-lg transition-all duration-300" style={{ width: 0 + "%" }}></div>
                    </div>
                    <div className="h-fit mb-5 border border-primary-500 rounded-lg p-2" ref={wrapperRef}></div>
                </div>
            </div>
        </div>
    );
};

export default TrainForm;
