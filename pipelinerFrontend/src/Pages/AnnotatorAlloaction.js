import React, { useState, useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const AnnotatorAlloaction = () => {
    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);
    const [baseModel, setBaseModel] = useState("");
    const [epochs, setEpochs] = useState(100);
    const [images, setImages] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [modelName, setModelName] = useState("");
    const [datasetName, setDatasetName] = useState("");
    const [datasets, setDatasets] = useState([]);
    const [annotators, setAnnotators] = useState([]);

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
        fetch(process.env.REACT_APP_SERVER + "/api/AnnotatorDetails")
            .then((res) => res.json())
            .then((data) => {
                setAnnotators(data["data"]);
            });
    }, []);

    return (
        <div className="min-h-screen h-full mb-5">
            <div className="lg:w-[80%] w-full h-full text-white mx-auto mt-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
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

                        <div className="grid grid-rows-3 gap-4 gap-y-1 h-fit border border-primary-500 rounded-lg p-2">
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="block text-sm">
                                    <span>Annotator</span>
                                    <span className="relative mt-1.5 flex">
                                        <select id="Annotator" name="Annotator" className="form-input outline-none peer w-full rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-2 text-black hover:border-secondary-700 focus:border-secondary ">
                                            <option selected value="">
                                                --Select Annotator--
                                            </option>
                                            {annotators.map((annotator, index) => (
                                                <option value={annotator[0]} key={index}>
                                                    {annotator[1]}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                                <div className="w-full">
                                    <p>Annotator Role</p>
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="annotatorRole" id="trainRadio" value="Train" />
                                            <label for="trainRadio">Train</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="annotatorRole" id="testRadio" value="Test" />
                                            <label for="testRadio">Test</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="annotatorRole" id="validRadio" value="Validation" />
                                            <label for="validRadio">Validation</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    document.getElementById("cover").classList.remove("hidden");
                                }}
                                className="bg-primary-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3"
                            >
                                <p className="font-mono font-meduim">Assign Annotator In CVAT</p>
                            </div>
                        </div>

                        <div id="cover" className="hidden absolute top-0 left-0 bg-primary-200/80 animate-pulse h-full w-full rounded-md backdrop-blur-xl z-50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnotatorAlloaction;
