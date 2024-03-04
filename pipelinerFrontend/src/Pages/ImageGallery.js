import React, { useState, useEffect, useRef } from "react";
import TabNavItem from "../Components/TabNavItem";
import TabContent from "../Components/TabContent";
import ImageModel from "../Components/ImageModel";

const ImageGallery = () => {
    const [activeTab, setActiveTab] = useState("Train");
    const [projects, setProjects] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [testImages, setTestImages] = useState([]);
    const [trainImages, setTrainImages] = useState([]);
    const [valImages, setValImages] = useState([]);
    const [swiperArr, setSwiperArr] = useState([]);
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [annotators, setAnnotators] = useState([]);

    const swiperRef = useRef(null);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data["data"]);
            });
        fetch(process.env.REACT_APP_SERVER + "/api/AnnotatorDetails")
            .then((res) => res.json())
            .then((data) => {
                setAnnotators(data["data"]);
            });
        let project = localStorage.getItem("project");
        let dataset = localStorage.getItem("dataset");
        if (project !== null && dataset !== null) {
            fetch(process.env.REACT_APP_SERVER + "/api/imageGallery?project=" + project + "&dataset=" + dataset)
                .then((res) => res.json())
                .then((data) => {
                    setTrainImages(data.train);
                    setTestImages(data.test);
                    setValImages(data.valid);
                    let arr = [];
                    for (let i = 0; i < data.train.length; i++) {
                        arr.push([process.env.REACT_APP_SERVER + "/static/" + data.train[i], data.train[i]]);
                    }
                    setSwiperArr(arr);
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
                });
        }
    }, []);
    return (
        <div className="mt-4 w-[80%] text-white mx-auto">
            <ImageModel imgSrc={swiperIndex} imgArr={swiperArr} swiperRef={swiperRef} />
            <div className="grid grid-cols-1 gap-4 gap-y-1 ">
                <div className="grid grid-cols-2 gap-4 border border-primary-500 rounded-lg p-2">
                    <label className="block text-sm">
                        <span>Project</span>
                        <span className="relative mt-1.5 flex">
                            <select
                                onChange={() => {
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
                            <select required id="dataset" name="dataset" className="form-input outline-none peer w-full rounded-lg border border-slate-300 bg-white text-black px-3 py-2 pl-9 placeholder:font-light hover:border-secondary-700 focus:border-secondary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent">
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
                </div>
                <div
                    onClick={() => {
                        let project = document.getElementById("project").value;
                        let dataset = document.getElementById("dataset").value;
                        fetch(process.env.REACT_APP_SERVER + "/api/imageGallery?project=" + project + "&dataset=" + dataset)
                            .then((res) => res.json())
                            .then((data) => {
                                setTrainImages(data.train);
                                setTestImages(data.test);
                                setValImages(data.valid);
                                let arr = [];
                                for (let i = 0; i < data.train.length; i++) {
                                    arr.push([process.env.REACT_APP_SERVER + "/static/" + data.train[i], data.train[i]]);
                                }
                                setSwiperArr(arr);
                            });
                    }}
                    className="bg-primary-800 h-10 my-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3"
                >
                    <p className="font-mono font-meduim">Load Dataset </p>
                </div>
            </div>
            <div className="h-fit mb-5 border border-primary-500 rounded-lg p-2">
                <label className="block text-sm">
                    <span>Select Input Type</span>
                    <div>
                        <div className="flex items-center justify-between w-full mt-2">
                            <ul className="flex items-center gap-3">
                                <div
                                    onClick={() => {
                                        let arr = [];
                                        for (let i = 0; i < trainImages.length; i++) {
                                            arr.push([process.env.REACT_APP_SERVER + "/static/" + trainImages[i], trainImages[i]]);
                                        }
                                        setSwiperArr(arr);
                                    }}
                                >
                                    <TabNavItem classes="bg-primary-500 rounded-lg" title="Train" id="Train" activeTab={activeTab} setActiveTab={setActiveTab} />
                                </div>
                                <div
                                    onClick={() => {
                                        let arr = [];
                                        for (let i = 0; i < testImages.length; i++) {
                                            arr.push([process.env.REACT_APP_SERVER + "/static/" + testImages[i], testImages[i]]);
                                        }
                                        setSwiperArr(arr);
                                    }}
                                >
                                    <TabNavItem classes="bg-primary-500 rounded-lg" title="Test" id="Test" activeTab={activeTab} setActiveTab={setActiveTab} />
                                </div>
                                <div
                                    onClick={() => {
                                        let arr = [];
                                        for (let i = 0; i < valImages.length; i++) {
                                            arr.push([process.env.REACT_APP_SERVER + "/static/" + valImages[i], valImages[i]]);
                                        }
                                        setSwiperArr(arr);
                                    }}
                                >
                                    <TabNavItem classes="bg-primary-500 rounded-lg" title="Validation" id="Validation" activeTab={activeTab} setActiveTab={setActiveTab} />
                                </div>
                            </ul>
                            <label className="block text-sm">
                                <span className="relative flex">
                                    {/* <select id="Annotator" name="Annotator" className="form-input outline-none peer w-72 rounded-lg border bg-white border-slate-300 bg-transparent px-3 py-2 text-sm text-black hover:border-secondary-700 focus:border-secondary ">
                                        <option selected value="">
                                            --Select Annotator--
                                        </option>
                                        {annotators.map((item, index) => (
                                            <option value={item[0]} key={index}>
                                                {item[1]}
                                            </option>
                                        ))}
                                    </select> */}
                                </span>
                            </label>
                        </div>
                        <div>
                            <TabContent id="Train" activeTab={activeTab}>
                                <div className="grid grid-cols-8 gap-4 mt-3 max-h-[40rem] overflow-y-scroll">
                                    {trainImages.map((image, index) => (
                                        <div key={index} className="relative cursor-pointer hover:scale-90 transition-all">
                                            <img
                                                src={process.env.REACT_APP_SERVER + "/static/" + image}
                                                alt=""
                                                className="rounded-lg"
                                                onClick={() => {
                                                    setSwiperIndex(index);
                                                    document.getElementById("imageModelContainer").classList.remove("scale-0", "opacity-0");
                                                }}
                                            />
                                            {/* <div className="bg-primary-500 text-white font-bold absolute top-[5px] left-[5px] rounded-full aspect-square p-1 px-2.5"><p>{(index % annotators.length) + 1}</p></div> */}
                                        </div>
                                    ))}
                                </div>
                            </TabContent>
                            <TabContent id="Test" activeTab={activeTab}>
                                <div className="grid grid-cols-8 gap-4 mt-3 max-h-[40rem] overflow-y-scroll">
                                    {testImages.map((image, index) => (
                                        <div key={index} className="relative cursor-pointer hover:scale-90 transition-all">
                                            <img
                                                src={process.env.REACT_APP_SERVER + "/static/" + image}
                                                alt=""
                                                className="rounded-lg"
                                                onClick={() => {
                                                    setSwiperIndex(index);
                                                    document.getElementById("imageModelContainer").classList.remove("scale-0", "opacity-0");
                                                }}
                                            />
                                            {/* <div className="bg-primary-500 text-white font-bold absolute top-[5px] left-[5px] rounded-full p-1 px-2.5">
                                                <p>{(index % annotators.length) + 1}</p>
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            </TabContent>
                            <TabContent id="Validation" activeTab={activeTab}>
                                <div className="grid grid-cols-8 gap-4 mt-3 max-h-[40rem] overflow-y-scroll">
                                    {valImages.map((image, index) => (
                                        <div key={index} className="relative cursor-pointer hover:scale-90 transition-all">
                                            <img
                                                src={process.env.REACT_APP_SERVER + "/static/" + image}
                                                alt=""
                                                className="rounded-lg"
                                                onClick={() => {
                                                    setSwiperIndex(index);
                                                    document.getElementById("imageModelContainer").classList.remove("scale-0", "opacity-0");
                                                }}
                                            />
                                            {/* <div className="bg-primary-500 text-white font-bold absolute top-[5px] left-[5px] rounded-full p-1 px-2.5">
                                                <p>{(index % annotators.length) + 1}</p>
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            </TabContent>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default ImageGallery;
