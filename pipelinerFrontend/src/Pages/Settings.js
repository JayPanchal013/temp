import React, { useState } from "react";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("Saving images/grids");
    const Tabs = ["Saving images/grids", "Paths for saving", "Saving to a directory", "Upscaling", "Face restoration"];

    return (
        <div className="bg-primary-950 min-h-screen">
            <div className="px-4 py-6">
                <div className="flex gap-3 justify-between">
                    <div className="w-56 space-y-2 bg-primary-800 p-3 rounded-lg text-primary-500 h-[calc(100vh-9rem)] sticky top-4">
                        {Tabs.map((item, index) => (
                            <button
                                key={index}
                                className={"w-full p-1 px-2 text-left hover:bg-primary-500 hover:text-white hover:font-semibold rounded transition-all " + (activeTab === item ? "bg-primary-500 text-white font-semibold" : "")}
                                onClick={() => {
                                    setActiveTab(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    {activeTab === "Saving images/grids" && (
                        <div className="flex-1 rounded-lg bg-primary-800 p-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="always-save-images">
                                        Always save all generated images
                                    </label>
                                    <ToggleBtn value={true} id="always-save-images" />
                                </div>
                                <input className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" placeholder="File format for images" type="text" />
                                <div className="flex items-center justify-between">
                                    <label className="text-white">Always save all generated images</label>
                                    <input className="w-12 px-1 rounded-lg py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" type="number" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="add-number-to-filename">
                                        Add number to filename when saving
                                    </label>
                                    <ToggleBtn value={true} id="add-number-to-filename" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-white">Add number to filename when saving</label>
                                    <RangeInput defaultValue={50} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="always-save-grids">
                                        Always save all generated image grids
                                    </label>
                                    <ToggleBtn value={true} id="always-save-grids" />
                                </div>
                                <input className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" placeholder="File format for grids" type="text" />
                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="add-extended-info">
                                        Add extended info (seed, prompt) to filename when saving grid
                                    </label>
                                    <ToggleBtn value={true} id="add-extended-info" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="do-not-save-single-picture-grids">
                                        Do not save grids consisting of one picture
                                    </label>
                                    <ToggleBtn value={true} id="do-not-save-single-picture-grids" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="prevent-empty-spots-in-grid">
                                        Prevent empty spots in grid (when set to autodetect)
                                    </label>
                                    <ToggleBtn value={true} id="prevent-empty-spots-in-grid" />
                                </div>
                                <input className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" placeholder="File format for images" type="text" />
                                <input className="w-full rounded-lg px-3 py-1.5 mt-1.5 bg-white text-black placeholder:text-black outline-none focus:outline-none" placeholder="Images filename pattern" type="text" />

                                <div className="flex items-center justify-between">
                                    <label className="text-white" htmlFor="save-copy-before-face-restoration">
                                        Save a copy of image before doing face restoration.
                                    </label>
                                    <ToggleBtn value={true} id="save-copy-before-face-restoration" />
                                </div>
                                <button className="w-fit bg-primary-950 text-white rounded-lg text-center p-2 px-5 cursor-pointer">Apply setting</button>
                            </div>
                        </div>
                    )}
                    {activeTab === "Paths for saving" && <div className="flex-1 rounded-lg bg-primary-800 p-4"></div>}
                    {activeTab === "Saving to a directory" && <div className="flex-1 rounded-lg bg-primary-800 p-4"></div>}
                    {activeTab === "Upscaling" && <div className="flex-1 rounded-lg bg-primary-800 p-4"></div>}
                    {activeTab === "Face restoration" && <div className="flex-1 rounded-lg bg-primary-800 p-4"></div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;

const ToggleBtn = (prop) => {
    const [value, setValue] = useState(prop.value);
    return (
        <label className="relative max-w-10 w-10 h-6 group-hover:inline-block">
            <input
                id={prop.id}
                type="checkbox"
                defaultChecked={value}
                onClick={() => {
                    setValue(!value);
                }}
                className="peer opacity-0 w-0 h-0"
            />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-900 transition-all duration-300 rounded-full before:absolute before:h-4 before:w-4 before:bg-white before:content-[''] before:left-[4px] before:top-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-[17px]" />
        </label>
    );
};

const RangeInput = (prop) => {
    const [value, setValue] = useState(prop.defaultValue);
    return (
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) => {
                setValue(event.currentTarget.value);
            }}
            className="w-full rounded-full"
        />
    );
};
