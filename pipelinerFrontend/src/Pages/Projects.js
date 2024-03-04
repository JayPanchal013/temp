import React, { useState, useEffect } from "react";

const Projects = () => {
    const [fabric, setFabric] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectDetails")
            .then((res) => res.json())
            .then((data) => {
                setFabric(data["data"]);
            });
    }, []);
    return (
        <div className="text-white w-[calc(100%-2rem)] mx-auto h-full my-5">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search project..."
                        className="bg-primary-800 rounded-lg p-1 px-4 pl-8 w-64 outline-none focus:outline focus:outline-primary-500"
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                        }}
                    />
                    <svg viewBox="0 0 16 16" className="w-4 h-5 text-white absolute top-1/2 left-2 -translate-y-1/2">
                        <path fillRule="evenodd" fill="currentColor" d="M9.331 9.331a3.088 3.088 0 1 0-4.368-4.368 3.088 3.088 0 0 0 4.368 4.368Zm.655 2.11a5.149 5.149 0 0 1-6.478-7.933 5.147 5.147 0 0 1 7.934 6.478l2.256 2.257a1.03 1.03 0 1 1-1.455 1.455l-2.257-2.256Z" />
                    </svg>
                </div>
                <div
                    onClick={() => {
                        window.location.href = "/registration";
                    }}
                    className="flex items-center gap-2 bg-primary-500 rounded-lg p-1.5 px-4 cursor-pointer"
                >
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    <p>Add new project</p>
                </div>
            </div>
            <div className="grid grid-cols-5 mt-5 gap-4">
                {fabric.map((item, index) => {
                    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return (
                            <a href={"/project/" + item.id}>
                                <div key={index} className="w-full border-2 border-primary-600 outline outline-4 outline-transparent hover:outline-primary-600/50 outline-offset-4 cursor-pointer hover:scale-95 transition-all rounded-lg overflow-hidden">
                                    <img
                                        src={process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[0]}
                                        onMouseEnter={(event) => {
                                            let imageCount = item.sampleImages?.length;
                                            window.imageRotator = setInterval(() => {
                                                let index = Math.floor(Math.random() * imageCount);
                                                event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[index];
                                            }, 1000);
                                        }}
                                        onMouseLeave={(event) => {
                                            event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[0];
                                            clearInterval(window.imageRotator);
                                        }}
                                        onError={(event) => {
                                            let imageCount = item.sampleImages?.length;
                                            let index = Math.floor(Math.random() * imageCount);
                                            event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[index];
                                        }}
                                        className="w-full h-auto aspect-square object-cover border-b-2 border-primary-600"
                                        alt=""
                                    />
                                    <div className="p-2 bg-primary-900 text-white">
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Title :</span> {item.name}
                                        </h1>
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Dataset :</span> {item.datasetCount}
                                        </h1>
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Model :</span> {item.modelCount}
                                        </h1>
                                    </div>
                                </div>
                            </a>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Projects;
