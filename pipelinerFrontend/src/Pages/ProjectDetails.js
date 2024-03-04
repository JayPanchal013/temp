import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { id } = useParams("id");
    const [projectDetails, setProjectDetails] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectDetailsFetch?projectID=" + id)
            .then((res) => res.json())
            .then((data) => {
                setProjectDetails(data["data"]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    margin: "auto",
                    display: "block",
                }}
                width={200}
                height={200}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle cx={50} cy={50} fill="none" stroke="#559bdb" strokeWidth={10} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                </circle>
            </svg>
        );
    }

    return (
        <div className="h-full mb-5 w-[calc(100%-2rem)] mx-auto">
            <div className="px-1 w-full h-full text-white mx-auto mt-5 backdrop-blur-xl rounded-none lg:rounded-xl overflow-hidden">
                <div className="flex">
                    <a href="/" className="flex items-center gap-2">
                        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                        <p>Back to Projects</p>
                    </a>
                </div>
                <div className="flex gap-5 border border-primary-500 bg-primary-900 p-4 px-6 rounded-xl overflow-hidden my-5 mb-8">
                    <div className="w-1/2 border-r border-primary-500 pr-6">
                        <div className="flex items-center justify-between">
                            <p className="text-primary-400 text-2xl font-semibold">{projectDetails?.fabricName}</p>
                        </div>
                        <div className="my-5 flex justify-between">
                            <div>
                                <p className="text-white/50 font-semibold">Fabric</p>
                                <p className="text-lg">{projectDetails?.fabricName}</p>
                            </div>
                            <div>
                                <p className="text-white/50 font-semibold">Fabric Type</p>
                                <p className="text-lg">{projectDetails?.fabricType}</p>
                            </div>
                        </div>
                        <div className="my-5">
                            <p className="text-white/50 font-semibold">Fabric Details</p>
                            <p className="text-lg w-full border border-primary-700 rounded-lg p-1 px-4 mt-2">{projectDetails?.fabricDescription}</p>
                        </div>
                        <div className={"flex justify-between " + (projectDetails?.labels?.length > 0 ? "my-5" : "mt-5")}>
                            <div>
                                <p className="text-white/50 font-semibold">Color</p>
                                <p className="text-lg capitalize">{projectDetails?.color}</p>
                            </div>
                            <div>
                                <p className="text-white/50 font-semibold">GSM</p>
                                <p className="text-lg capitalize">{projectDetails?.GSM}</p>
                            </div>
                            <div>
                                <p className="text-white/50 font-semibold">Material</p>
                                <p className="text-lg capitalize">{projectDetails?.material}</p>
                            </div>
                        </div>
                        {projectDetails?.labels?.length > 0 && (
                            <div className="mt-5">
                                <p className="text-white/50 font-semibold">Labels</p>
                                <div className="grid grid-cols-3 grid-flow-row">
                                    {projectDetails?.labels?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 text-lg">
                                            <div className="flex gap-2">
                                                <p>{index + 1}.</p>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: item.color }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-1/2">
                        <p className="text-white/50 font-semibold mb-2">Images</p>
                        <div className="grid grid-cols-5 gap-5">
                            {projectDetails?.images?.map((item, index) => (
                                <img key={index} src={process.env.REACT_APP_SERVER + "/static/" + item} className="rounded-lg w-full h-auto object-contain aspect-square" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={"Search Dataset..."}
                            className="bg-primary-800 rounded-lg p-1 px-4 pl-8 w-64 outline-none focus:outline focus:outline-primary-500"
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                            }}
                        />
                        <svg viewBox="0 0 16 16" className="w-4 h-5 text-white absolute top-1/2 left-2 -translate-y-1/2">
                            <path fillRule="evenodd" fill="currentColor" d="M9.331 9.331a3.088 3.088 0 1 0-4.368-4.368 3.088 3.088 0 0 0 4.368 4.368Zm.655 2.11a5.149 5.149 0 0 1-6.478-7.933 5.147 5.147 0 0 1 7.934 6.478l2.256 2.257a1.03 1.03 0 1 1-1.455 1.455l-2.257-2.256Z" />
                        </svg>
                    </div>
                </div>
                <div className="min-h-10">
                    <div className="grid grid-cols-2 gap-3">
                        {projectDetails?.datasetDetail.map((item, index) => {
                            if (item.datasetName.toLowerCase().includes(searchQuery.toLowerCase())) {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            localStorage.setItem("project", projectDetails?.fabricName);
                                            localStorage.setItem("dataset", item?.datasetName);
                                            window.location.href = "/image-gallery";
                                        }}
                                        className="border bg-primary-900 border-primary-500 rounded-lg overflow-hidden flex items-center justify-between w-full p-3 hover:border-primary-500 cursor-pointer  hover:scale-95 transition-all"
                                    >
                                        <div className="flex flex-nowrap items-start justify-center gap-4">
                                            <img
                                                onMouseEnter={(event) => {
                                                    let imageCount = item.images?.length;
                                                    window.imageRotator = setInterval(() => {
                                                        let index = Math.floor(Math.random() * imageCount);
                                                        event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.images?.[index];
                                                    }, 1000);
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.images?.[0];
                                                    clearInterval(window.imageRotator);
                                                }}
                                                src={process.env.REACT_APP_SERVER + "/static/" + item.images[0]}
                                                className="h-32 w-auto aspect-square border-b-2 border-primary-500 object-cover rounded-md"
                                            />
                                            <div className="grid grid-cols-2 gap-5">
                                                <p className="text-white/50 font-normal">
                                                    Name : <span className="font-semibold truncate text-white">{item.datasetName}</span>
                                                </p>
                                                <p className="text-white/50 font-normal">
                                                    Train Images : <span className="text-white font-semibold">{item.trainCount}</span>
                                                </p>
                                                <p className="text-white/50 font-normal">
                                                    Test Images : <span className="text-white font-semibold">{item.testCount}</span>
                                                </p>
                                                <p className="text-white/50 font-normal">
                                                    Valid Images : <span className="text-white font-semibold">{item.validCount}</span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    localStorage.setItem("project", projectDetails?.fabricName);
                                                    localStorage.setItem("dataset", item?.datasetName);
                                                    window.location.href = "/train";
                                                }}
                                                className="bg-primary-500 rounded-lg px-4 py-1 text-white hover:bg-primary-600 transition-all"
                                            >
                                                Quick Train
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
