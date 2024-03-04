import React, { useState, useEffect } from "react";
import TabNavItem from "../Components/TabNavItem";
import TabContent from "../Components/TabContent";

const RealtimeForm = () => {
    const [cameras, setCameras] = useState([]);
    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);
    const [cameraList, setCameraList] = useState([]);
    const [toggleStart, setToggleStart] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data["data"]);
            });
    }, []);

    function cameraLoop(selectedCamera) {
        if (document.getElementById("project").value === "" || document.getElementById("model").value === "") {
            alert("Please select a project and model");
        } else {
            var formdata = new FormData();
            formdata.append("projectName", document.getElementById("project").value);
            formdata.append("modelName", document.getElementById("model").value);
            formdata.append("cameraIndex", selectedCamera);

            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };
            fetch(process.env.REACT_APP_SERVER + "/api/realtimePrediction/", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === "success") {
                        document.getElementById("outputImage" + selectedCamera).src = "data:image/jpg;base64," + result["path"];

                        cameraLoop(selectedCamera);
                    } else {
                        alert("Camera Disconnected");
                    }
                })
                .catch((error) => console.log("error", error));
        }
    }

    // function realtimeCameraLoop(selectedCamera) {
    //     if (document.getElementById("project").value === "" || document.getElementById("model").value === "") {
    //         alert("Please select a project and model");
    //     } else {

    //     }
    // }

    window.onload = () => {
        // navigator.mediaDevices.enumerateDevices().then(function(devices) {
        //     let tempCameras = [];
        //     for (var i = 0; i < devices.length; i++) {
        //         var device = devices[i];
        //         if (device.kind === "videoinput") {
        //             tempCameras.push(device);
        //         }
        //     }
        //     setCameras(tempCameras);
        // });
        fetch(process.env.REACT_APP_SERVER + "/api/cameraListFetcher/")
            .then((res) => res.json())
            .then((data) => {
                setCameras(data["data"]);
            });
    };
    return (
        <div className="min-h-screen w-[calc(100%-2rem)] mx-auto h-full mb-5">
            <div className="w-full h-full text-white mx-auto mt-5 pb-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
                <div className="mt-4 flex gap-3 items-center justify-start">
                    <div className="flex gap-4 gap-y-1 w-fit h-fit border border-primary-500 rounded-lg p-2 overflow-hidden">
                        <div className="block text-sm" title="Select a Project">
                            <span>Project</span>
                            <div className="relative mt-1.5 flex gap-2">
                                <select
                                    onChange={() => {
                                        let project = document.getElementById("project").value;
                                        if (project === "") {
                                            setModels([]);
                                        } else {
                                            fetch(process.env.REACT_APP_SERVER + "/api/modelFecther?project=" + document.getElementById("project").value)
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    // check if the data has error key
                                                    if (!data.hasOwnProperty("error")) {
                                                        setModels(data["data"]);
                                                    } else {
                                                        setModels([]);
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
                                <div
                                    onClick={() => {
                                        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther/")
                                            .then((res) => res.json())
                                            .then((data) => {
                                                setProjects(data["data"]);
                                            });
                                    }}
                                    title="Refresh Projects"
                                    className="bg-primary-800 w-10 h-10 p-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-3"
                                >
                                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve">
                                        <path fill="none" stroke="#FFFFFF" strokeWidth={4} strokeMiterlimit={10} d="M25.7 10.9C23.9 7.4 20.2 5 16 5c-4.7 0-8.6 2.9-10.2 7m.4 9c1.8 3.5 5.5 6 9.8 6 4.7 0 8.6-2.9 10.2-7" />
                                        <path fill="none" stroke="#FFFFFF" strokeWidth={4} strokeMiterlimit={10} d="M26 5v6h-6M6 27v-6h6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="block text-sm" title="Select a model">
                            <span>Path to model</span>
                            <span className="relative mt-1.5 flex">
                                <select required id="model" name="model" className="form-input outline-none peer w-full rounded-lg border border-slate-300 bg-white text-black px-3 py-2 pl-9 placeholder:font-light hover:border-secondary-700 focus:border-secondary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent">
                                    <option selected disabled value="">
                                        --Select Model--
                                    </option>
                                    {models.map((model, index) => (
                                        <option key={index} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                    <svg fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
                                    </svg>
                                </span>
                            </span>
                        </div>
                        <div className="block text-sm" title="Select a model">
                            <span>Cameras</span>
                            <div className="relative mt-1.5 flex gap-2">
                                <select required id="cameraSelect" name="cameraSelect" className="form-input outline-none peer w-full rounded-lg border border-slate-300 bg-white text-black px-3 py-2 pl-9 placeholder:font-light hover:border-secondary-700 focus:border-secondary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent">
                                    <option value="null" selected>
                                        --Select Camera--
                                    </option>
                                    {cameras?.map((camera, index) => {
                                        return (
                                            <option key={index} value={JSON.stringify(camera)}>
                                                {camera?.[1]}
                                            </option>
                                        );
                                    })}
                                </select>
                                <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-secondary-700 peer-focus:text-secondary dark:text-navy-300 dark:peer-focus:text-accent">
                                    <svg fill="currentColor" width="1.2em" height="1.2em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
                                    </svg>
                                </span>
                                <div
                                    onClick={() => {
                                        if (document.getElementById("project").value === "" || document.getElementById("model").value === "") {
                                            alert("Please select a project and model");
                                        } else {
                                            let selectedCamera = document.getElementById("cameraSelect").value;
                                            if (cameraList.includes(selectedCamera)) {
                                                alert("Camera already added to the system");
                                            } else {
                                                setCameraList([...cameraList, selectedCamera]);
                                                if (parseInt(JSON.parse(selectedCamera)[0]) !== NaN) {
                                                    fetch(process.env.REACT_APP_SERVER + "/api/engageCamera/" + JSON.parse(selectedCamera)[0])
                                                        .then((res) => res.json())
                                                        .then((data) => {
                                                            let index = JSON.parse(selectedCamera)[0];
                                                            // cameraLoop(index);
                                                        })
                                                        .catch((error) => console.log("error", error));
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <svg className="w-10 h-10 bg-green-600 rounded-lg cursor-pointer" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="#fff">
                                            <path d="M.84.56h.24v.8H.84v-.8z" />
                                            <path d="M.56.84h.8v.24h-.8V.84z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(event) => {
                            setToggleStart(!toggleStart);
                            fetch(process.env.REACT_APP_SERVER + "/api/toggleRealtimePrediction");
                        }}
                        title="Start and Stop Cameras"
                        className="bg-primary-800 font-mono font-medium flex gap-3 items-center justify-between px-5 w-fit h-16 py-3 rounded-lg text-center cursor-pointer hover:bg-primary-800/50 transition-all duration-300"
                    >
                        {toggleStart ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 3.25 3.25" xmlSpace="preserve">
                                <path fill="#FFFFFF" d="M1.317.649 1.308.65V.649H.972a.07.07 0 0 0-.07.07v1.812c0 .039.031.07.07.07h.345a.07.07 0 0 0 .07-.07V.719a.07.07 0 0 0-.07-.07zm1.031 1.882V.719a.07.07 0 0 0-.07-.07L2.269.65V.649h-.336a.07.07 0 0 0-.07.07v1.812c0 .039.031.07.07.07h.345a.07.07 0 0 0 .07-.07z" />
                            </svg>
                        ) : (
                            <svg width={26} height={26} viewBox="0 0 0.78 0.78" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#FFFFFF" d="M0 0.038v0.704a0.041 0.041 0 0 0 0.061 0.033l0 0 0.697 -0.351a0.038 0.038 0 0 0 0 -0.069l0 0L0.061 0.004A0.041 0.041 0 0 0 0 0.038v0z" />
                            </svg>
                        )}
                        {toggleStart ? "Stop" : "Start"}
                    </div>
                </div>
                <div className={`grid grid-cols-2 gap-5 mt-10`}>
                    {cameraList.map((item, index) => {
                        let cameraData = JSON.parse(item);
                        return (
                            <div key={index} className="relative border border-primary-500 rounded-lg p-4 w-full h-fit">
                                <p className="bg-primary-950 absolute top-0 left-4 -translate-y-3 px-5">
                                    {index + 1} : <span className="font-semibold">{cameraData[1]}</span>
                                </p>
                                <div
                                    onClick={() => {
                                        fetch(process.env.REACT_APP_SERVER + "/api/disengageCamera/" + cameraData[0])
                                            .then((res) => res.json())
                                            .then((data) => {
                                                console.log(data);
                                            })
                                            .catch((error) => console.log("error", error))
                                            .finally(() => {
                                                setCameraList((prev) => prev.filter((item) => item !== JSON.stringify(cameraData)));
                                            });
                                    }}
                                    className="absolute top-3 right-3 bg-red-500 rounded-full w-10 h-10 p-1 hover:scale-105 cursor-pointer"
                                >
                                    <svg className="w-full h-full" viewBox="0 0 0.96 0.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#FFFFFF" d="M.28.16A.08.08 0 0 1 .36.08H.6a.08.08 0 0 1 .08.08v.08h.16a.04.04 0 1 1 0 .08H.797L.762.806A.08.08 0 0 1 .683.88H.277a.08.08 0 0 1-.08-.074L.163.32H.12a.04.04 0 0 1 0-.08h.16V.16zm.08.08H.6V.16H.36v.08zM.243.32.277.8h.406L.717.32H.243zM.4.4a.04.04 0 0 1 .04.04v.24a.04.04 0 1 1-.08 0V.44A.04.04 0 0 1 .4.4zm.16 0A.04.04 0 0 1 .6.44v.24a.04.04 0 1 1-.08 0V.44A.04.04 0 0 1 .56.4z" />
                                    </svg>
                                </div>
                                <img
                                    id={"outputImage" + cameraData[0]}
                                    name={"outputImage" + cameraData[0]}
                                    src={process.env.REACT_APP_SERVER + "/api/realtimePrediction/?cameraIndex=" + cameraData[0] + "&project=" + document.getElementById("project").value + "&modelName=" + document.getElementById("model").value}
                                    onError={(event) => {
                                        event.target.src = process.env.REACT_APP_SERVER + "/static/error.png";
                                    }}
                                    alt=""
                                    className="w-full h-full rounded-lg object-contain"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RealtimeForm;
