import React, { useState, useEffect, useRef } from "react";
import ImageModel from "./ImageModel";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

const ImageAnnotationSidebar = ({ setLabels }) => {
    const swiperRef = useRef(null);
    const [images, setImages] = useState([]);
    const [viewImageSrc, setViewImageSrc] = useState(0);
    const [activeTab, setActiveTab] = useState("Non-Annotated");
    const [projects, setProjects] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [project, setProject] = useState("");
    const [dataset, setDataset] = useState("");
    const [testImages, setTestImages] = useState([]);
    const [trainImages, setTrainImages] = useState([]);
    const [valImages, setValImages] = useState([]);
    const [swiperArr, setSwiperArr] = useState([]);
    const [notAnnotated, setNotAnnotated] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data["data"]);
            });
    }, []);

    return (
        <div className="w-[20%] bg-primary-800 rounded-lg inner-shadow p-3 relative">
            <div id="cvatLink" className="absolute -right-5 top-2 h-fit bg-primary-950 border border-gray-100/25 p-1 gap-1 flex flex-col rounded-lg z-[70] translate-x-full cursor-pointer scale-0 transition-all ">
                <div
                    onClick={() => {
                        document.getElementById("cvatLink").classList.toggle("scale-0");
                    }}
                    className="absolute -top-3 -left-2 bg-white rounded-full p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="#000" className="" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </div>
                <a href="https://www.cvat.ai/" target="_blank">
                    <div className="">
                        {/* <img src=process.env.REACT_APP_SERVER + "/static/CVAT-Logo.jpg" alt="error" className="h-full rounded-lg shadow-xl overflow-hidden" /> */}
                        <button className="h-10 rounded shadow-xl overflow-hidden bg-primary-800 text-white w-20 flex flex-nowrap justify-center items-center gap-2">
                            Train
                            <svg width={18} height={18} fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.293 20.707a1 1 0 0 1 0-1.414L17.586 5H12a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.414L4.707 20.707a1 1 0 0 1-1.414 0Z" />
                            </svg>
                        </button>
                    </div>
                </a>
                <a href="https://www.cvat.ai/" target="_blank">
                    <div className="">
                        {/* <img src=process.env.REACT_APP_SERVER + "/static/CVAT-Logo.jpg" alt="error" className="h-full rounded-lg shadow-xl overflow-hidden" /> */}
                        <button className="h-10 rounded shadow-xl overflow-hidden bg-primary-800 text-white w-20 flex flex-nowrap justify-center items-center gap-2">
                            Test
                            <svg width={18} height={18} fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.293 20.707a1 1 0 0 1 0-1.414L17.586 5H12a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.414L4.707 20.707a1 1 0 0 1-1.414 0Z" />
                            </svg>
                        </button>
                    </div>
                </a>
                <a href="https://www.cvat.ai/" target="_blank">
                    <div className="">
                        {/* <img src=process.env.REACT_APP_SERVER + "/static/CVAT-Logo.jpg" alt="error" className="h-full rounded-lg shadow-xl overflow-hidden" /> */}
                        <button className="h-10 rounded shadow-xl overflow-hidden bg-primary-800 text-white w-20 flex flex-nowrap justify-center items-center gap-2">
                            Valid
                            <svg width={18} height={18} fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.293 20.707a1 1 0 0 1 0-1.414L17.586 5H12a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.414L4.707 20.707a1 1 0 0 1-1.414 0Z" />
                            </svg>
                        </button>
                    </div>
                </a>
            </div>
            <ImageModel imgArr={notAnnotated} imgSrc={viewImageSrc} swiperRef={swiperRef} />
            <div>
                <div className="block text-sm">
                    <span className="text-white">Project</span>
                    <span className="relative mt-1.5 flex">
                        <select
                            onChange={() => {
                                let project = document.getElementById("project").value;
                                setProject(project);
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
                </div>
                <div className="block text-sm my-2">
                    <span className="text-white">Path to Dataset</span>
                    <span className="relative mt-1.5 flex">
                        <select
                            onChange={() => {
                                let dataset = document.getElementById("dataset").value;
                                let project = document.getElementById("project").value;
                                setDataset(dataset);
                                if (dataset !== "") {
                                    fetch(process.env.REACT_APP_SERVER + "/api/taskDetails?project=" + project + "&dataset=" + dataset)
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log(data);
                                            if (!data.hasOwnProperty("error")) {
                                                let taskDetails = data["tasks"];
                                                let labels = data["labels"];
                                                setLabels(labels);
                                                try {
                                                    let cvatLink = document.getElementById("cvatLink");
                                                    cvatLink.childNodes[1].href = "https://app.cvat.ai/tasks/" + taskDetails["train"];
                                                    cvatLink.childNodes[2].href = "https://app.cvat.ai/tasks/" + taskDetails["test"];
                                                    cvatLink.childNodes[3].href = "https://app.cvat.ai/tasks/" + taskDetails["valid"];
                                                    cvatLink.classList.remove("scale-0");
                                                } catch (err) {}
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }
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
                                let arrCombined = [];
                                let TempCombined = [...data.train, ...data.test, ...data.valid];
                                for (let index = 0; index < TempCombined.length; index++) {
                                    const element = TempCombined[index];
                                    arrCombined.push([process.env.REACT_APP_SERVER + "/static/" + element, element]);
                                }
                                setNotAnnotated(arrCombined);
                                let arr = [];
                                for (let i = 0; i < data.train.length; i++) {
                                    arr.push([process.env.REACT_APP_SERVER + "/static/" + data.train[i], data.train[i]]);
                                }
                                setSwiperArr(arr);
                            });
                    }}
                    className="bg-primary-900 text-white h-10 my-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-900/50 transition-all duration-3"
                >
                    <p className="font-mono font-meduim">Load Dataset</p>
                </div>
            </div>
            {/* <div className="relative group bg-gradient-to-tr from-primary-800 to-primary-900/50 rounded-lg h-48 shadow-xl outline-2 outline-dashed outline-primary-900 hover:outline-primary-800 -outline-offset-8 flex flex-col items-center justify-center transition-all duration-500">
                <input
                    onChange={(event) => {
                        let files = event.target.files;
                        let tempTmages = [];
                        for (let i = 0; i < files.length; i++) {
                            tempTmages.push([URL.createObjectURL(files[i]), files[i].name]);
                        }
                        setImages(tempTmages);
                    }}
                    type="file"
                    multiple
                    name="images"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <svg width="100px" height="100px" className="text-primary-200 opacity-50 group-hover:opacity-100 transition-all" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                </svg>
                <p className="text-lg text-white opacity-50 group-hover:opacity-100 font-mono transition-all">Drag and Drop Files</p>
            </div> */}
            <hr className="my-3 border-primary-200 scale-x-110" />
            <div className="h-full">
                <ul className="flex items-center justify-between">
                    <TabNavItem title="Non-Annotated" classes={activeTab === "Non-Annotated" ? "bg-primary-900" : ""} id="Non-Annotated" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabNavItem title="Annotated" classes={activeTab === "Annotated" ? "bg-primary-900" : ""} id="Annotated" activeTab={activeTab} setActiveTab={setActiveTab} />
                </ul>
                <div>
                    <TabContent id="Non-Annotated" activeTab={activeTab}>
                        <div className="min-h-10 max-h-[calc(100vh-26rem)] rounded-lg noScroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3 overflow-y-scroll">
                            {notAnnotated.map((image, index) => (
                                <div key={index} className="text-white overflow-hidden w-full">
                                    <div className="relative group">
                                        <button
                                            onClick={() => {
                                                document.getElementById("annotationFinalImage").src = image[0];
                                                document.getElementById("annotationFinalImage").setAttribute("data-name", image[1]);
                                                let annotationBox = document.getElementById("annotationBox");
                                                let imageContainer = document.getElementById("imageContainer");
                                                let height = document.getElementById("annotationFinalImage").naturalHeight;
                                                let width = document.getElementById("annotationFinalImage").naturalWidth;
                                                let ratio = height / width;
                                                let maxWidth = imageContainer.offsetWidth;
                                                let maxHeight = imageContainer.offsetHeight;
                                                if (ratio < 1) {
                                                    annotationBox.style.width = maxWidth + "px";
                                                    annotationBox.style.height = maxWidth * ratio + "px";
                                                } else {
                                                    annotationBox.style.height = maxHeight + "px";
                                                    annotationBox.style.width = maxHeight / ratio + "px";
                                                }
                                            }}
                                            className="absolute h-7 w-7 scale-0 -translate-x-full group-hover:translate-x-0 group-hover:scale-100 bg-transparent hover:bg-primary-200 top-2 right-2 rounded border-2 border-transparent hover:border-primary-500 flex items-center justify-center transition-all duration-300"
                                        >
                                            <svg stroke="var(--primary-700)" strokeWidth={1} width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--primary-500)">
                                                <path d="M2.345 2.245a1 1 0 0 1 1.102-.14l18 9a1 1 0 0 1 0 1.79l-18 9a1 1 0 0 1-1.396-1.211L4.613 13H10a1 1 0 1 0 0-2H4.613L2.05 3.316a1 1 0 0 1 .294-1.071z" />
                                            </svg>
                                        </button>
                                        <img
                                            onClick={() => {
                                                setViewImageSrc(index);
                                                swiperRef.current.swiper.slideTo(index);
                                                document.getElementById("imageModelContainer").classList.remove("scale-0", "opacity-0");
                                            }}
                                            id={"Non-Annotated-Image" + index}
                                            src={image[0]}
                                            className="w-full h-auto aspect-square rounded-lg object-cover"
                                            alt={image[1]}
                                        />
                                    </div>
                                    <p className="truncate">{image[1]}</p>
                                </div>
                            ))}
                        </div>
                    </TabContent>
                    <TabContent id="Annotated" activeTab={activeTab}>
                        Annotated Images
                    </TabContent>
                </div>
            </div>
        </div>
    );
};

export default ImageAnnotationSidebar;
