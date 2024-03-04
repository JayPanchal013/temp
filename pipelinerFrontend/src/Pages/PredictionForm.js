import React, { useState, useEffect } from "react";
import TabNavItem from "../Components/TabNavItem";
import TabContent from "../Components/TabContent";

const PredictionForm = () => {
    const [activeTab, setActiveTab] = useState("image");
    const [cameras, setCameras] = useState([]);
    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectFecther")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data["data"]);
            });
    }, []);

    function cameraLoop(event) {
        event.target.classList.add("animate-pulse");
        if (document.getElementById("project").value === "" || document.getElementById("model").value === "") {
            alert("Please select a project and model");
        } else {
            var formdata = new FormData();
            formdata.append("projectName", document.getElementById("project").value);
            formdata.append("modelName", document.getElementById("model").value);
            formdata.append("inputSource", activeTab);
            formdata.append("cameraIndex", document.getElementById("cameraSelect").value);

            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };
            fetch(process.env.REACT_APP_SERVER + "/api/prediction/", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === "success") {
                        document.getElementById("outputImage").src = "data:image/jpg;base64," + result["path"];
                        document.getElementById("predictInfo").innerText = result["results"];

                        cameraLoop(event);
                    } else {
                        alert(result["error"]);
                    }
                })
                .catch((error) => console.log("error", error))
                .finally(() => {
                    event.target.classList.remove("animate-pulse");
                });
        }
    }

    // let cameraInput = document.getElementById("video");
    // // render the video to canvas
    // let canvas = document.createElement("canvas");
    // canvas.width = cameraInput.videoWidth;
    // canvas.height = cameraInput.videoHeight;
    // canvas.getContext("2d").drawImage(cameraInput, 0, 0);
    // canvas.toBlob((blob) => {
    //     // create a file from the blob
    //     let fileInput = new File([blob], "camera.jpg", { type: "image/jpeg" });
    //     formdata.append("camera", fileInput, "camera.jpg");
    //     var requestOptions = {
    //         method: "POST",
    //         body: formdata,
    //         redirect: "follow",
    //     };

    //     fetch(process.env.REACT_APP_SERVER + "/api/prediction/", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             document.getElementById("outputImage").src = "data:image/jpg;base64," + result["path"];
    //             document.getElementById("predictInfo").innerText = result["results"];
    //             event.target.classList.remove("animate-pulse");
    //             cameraLoop(event);
    //         })
    //         .catch((error) => console.log("error", error));
    // });

    function prediction(event) {
        if (activeTab === "image") {
            event.target.classList.add("animate-pulse");
            var formdata = new FormData();
            formdata.append("projectName", document.getElementById("project").value);
            formdata.append("modelName", document.getElementById("model").value);
            formdata.append("inputSource", activeTab);
            let fileInput = document.getElementById("imageInput");
            formdata.append("image", fileInput.files[0], fileInput.files[0].name);
            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };

            fetch(process.env.REACT_APP_SERVER + "/api/prediction/", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    document.getElementById("outputImage").src = process.env.REACT_APP_SERVER + "/static/" + result["path"];
                    document.getElementById("predictInfo").innerText = result["results"];
                    event.target.classList.remove("animate-pulse");
                })
                .catch((error) => console.log("error", error));
        } else if (activeTab === "camera") {
            fetch(process.env.REACT_APP_SERVER + "/api/engageCamera/" + document.getElementById("cameraSelect").value)
                .then((res) => res.json())
                .then((data) => {
                    if (document.getElementById("project").value === "" || document.getElementById("model").value === "") {
                        alert("Please select a project and model");
                    } else {
                        cameraLoop(event);
                    }
                })
                .catch((error) => console.log("error", error));

            // setInterval(() => {
            // }, 100);
        }
    }

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
        <div className="min-h-screen w-[calc(100%-2rem)] mx-auto h-full mb-5">
            <form className="w-full h-full text-white mx-auto mt-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
                <div className="mt-4 ">
                    <div className="grid grid-cols-2 gap-4 gap-y-1 ">
                        <div className="grid grid-rows-3 gap-4 gap-y-1 h-64 mb-5 border border-primary-500 rounded-lg p-2">
                            <label className="block text-sm">
                                <span>Project</span>
                                <span className="relative mt-1.5 flex">
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
                                </span>
                            </label>
                            <label className="block text-sm">
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
                                        <svg fill="currentColor" width="1.2em" height="1.2em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M72.7,65.8a6.6,6.6,0,0,0-3.2.8l-8.8-6.5a11.36,11.36,0,0,0,1.2-5.2A11.91,11.91,0,0,0,53,43.4v-10a7,7,0,0,0,4-6.2,6.9,6.9,0,1,0-13.8,0,6.73,6.73,0,0,0,4,6.2v10a11.91,11.91,0,0,0-8.9,11.5,11.36,11.36,0,0,0,1.2,5.2l-8.8,6.5a7.22,7.22,0,0,0-3.2-.8,6.9,6.9,0,1,0,6.9,6.9c0-.5-.1-.9-.1-1.3l9.2-6.8a11.61,11.61,0,0,0,13.6,0l9.2,6.8a5.7,5.7,0,0,0-.1,1.3,6.9,6.9,0,0,0,13.8,0A7.41,7.41,0,0,0,72.7,65.8ZM51.4,60.7a6.75,6.75,0,0,1-1.4.2,6.1,6.1,0,0,1-5.7-4.4,7.72,7.72,0,0,1-.2-1.5,5.81,5.81,0,0,1,3-5.1,6,6,0,0,1,6,0,5.81,5.81,0,0,1,3,5.1,7.72,7.72,0,0,1-.2,1.5A6.54,6.54,0,0,1,51.4,60.7Z" />
                                        </svg>
                                    </span>
                                </span>
                            </label>
                            <div
                                onClick={() => {
                                    fetch(process.env.REACT_APP_SERVER + "/api/projectFecther/")
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

                        <div className="grid grid-rows-3 gap-4 gap-y-1 h-64 mb-5 border border-primary-500 rounded-lg p-2">
                            <label className="block text-sm">
                                <span>Select Input Type</span>
                                <div>
                                    <ul className="flex items-center gap-3 mt-2">
                                        <TabNavItem classes="bg-primary-500 rounded-lg" title="Image" id="image" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        <TabNavItem classes="bg-primary-500 rounded-lg" title="Video" id="video" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        <TabNavItem classes="bg-primary-500 rounded-lg" title="URL" id="url" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        <TabNavItem classes="bg-primary-500 rounded-lg" title="Camera" id="camera" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </ul>
                                    <div>
                                        <TabContent id="image" activeTab={activeTab}>
                                            <div className="h-40 w-full mt-3 text-white border border-white/10 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-300 overflow-hidden">
                                                <div id="chooseImageFile" className=" flex flex-col items-center justify-center">
                                                    <input
                                                        onChange={() => {
                                                            document.getElementById("chooseImageFile").classList.add("hidden");
                                                            document.getElementById("inputPreviewImage").classList.remove("hidden");
                                                            let file = document.getElementById("imageInput").files[0];
                                                            // convert file to base64 string and add src to inputPreviewImage
                                                            let reader = new FileReader();
                                                            reader.onloadend = function () {
                                                                document.getElementById("inputPreviewImage").src = reader.result;
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                        type="file"
                                                        id="imageInput"
                                                        name="imageInput"
                                                        accept="image/*"
                                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                                                        <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                                                    </svg>
                                                    <p className="text-[13px] font-mono">Drag and Drop Images</p>
                                                </div>
                                                <img id="inputPreviewImage" src="https://via.placeholder.com/640/" alt="" className="w-full h-full object-cover hidden" />
                                            </div>
                                        </TabContent>
                                        <TabContent id="video" activeTab={activeTab}>
                                            <div className="h-40 w-full mt-3 text-white border border-white/10 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center cursor-pointer hover:bg-primary-800/50 transition-all duration-300">
                                                <input type="file" name="video" accept="video/mp4,video/x-m4v,video/*" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                                <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                                                </svg>
                                                <p className="text-[13px] font-mono">Drag and Drop Videos</p>
                                            </div>
                                        </TabContent>
                                        <TabContent id="url" activeTab={activeTab}>
                                            <div className="relative mt-3 w-full">
                                                <input type="text" name="" placeholder="Enter URL" className="border border-transparent bg-white w-full rounded-lg px-3 py-2 pl-8 placeholder:text-black text-black outline-none focus:outline-none hover:border-primary-500" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width={"1.2em"} height={"1.2em"} fill="currentColor" className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-700" viewBox="0 0 16 16">
                                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                                </svg>
                                            </div>
                                        </TabContent>
                                        <TabContent id="camera" activeTab={activeTab}>
                                            <div className="w-full mt-3 mb-2">
                                                <select
                                                    onChange={() => {
                                                        let video = document.getElementById("video");
                                                        if (video.srcObject) {
                                                            video.srcObject.getTracks().forEach((track) => track.stop());
                                                            let mediaDevices = navigator.mediaDevices;
                                                            let cameraSelect = document.getElementById("cameraSelect").value;
                                                            if (cameraSelect === "null") {
                                                                return;
                                                            } else {
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
                                                        }
                                                    }}
                                                    id="cameraSelect"
                                                    className="w-full outline-none focus:outline-none rounded-lg p-[2px] font-medium text-black"
                                                >
                                                    <option value="null" selected>
                                                        --Select Camera--
                                                    </option>
                                                    {cameras.map((camera, index) => (
                                                        <option key={index} value={index}>
                                                            {camera.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="group h-32 w-full text-white border border-white/10 rounded-lg bg-primary-800 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center overflow-hidden">
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
                                                        if (document.getElementById("video").getAttribute("data-status") === "paused") {
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
                                                        if (document.getElementById("video").getAttribute("data-status") === "paused") {
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
                                                    className="hidden h-full w-full object-contain"
                                                ></video>
                                            </div>
                                        </TabContent>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div
                        onClick={(event) => {
                            prediction(event);
                        }}
                        className="bg-primary-800 w-full p-1 py-2 mb-5 rounded-lg text-center cursor-pointer hover:bg-primary-800/50 transition-all duration-300"
                    >
                        <p className="font-mono font-medium">Generate Label Predictions</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary-800 rounded-lg p-2 h-full">
                            <p>Full Results output(metrics, boxes, etc.)</p>
                            <div className="border border-primary-500 w-full h-96 overflow-y-scroll p-1 rounded-lg mt-3">
                                <p id="predictInfo"></p>
                            </div>
                        </div>
                        <div className="bg-primary-800 rounded-lg h-full relative overflow-hidden ">
                            <p className="bg-primary-900 w-fit rounded-br-lg rounded-tl-lg p-1 px-2 font-mono absolute top-0 left-0">Labeled Image</p>
                            <img id="outputImage" name="outputImage" src="https://via.placeholder.com/640/" alt="" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PredictionForm;
