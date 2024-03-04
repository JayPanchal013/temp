import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [system, setSystem] = useState({ ram: 15, cpu: 15 });
    useEffect(() => {
        // let systemInterval = setInterval(() => {
        //     fetch(process.env.REACT_APP_SERVER + "/api/sysInfo/")
        //         .then((res) => res.json())
        //         .then((data) => {
        //             setSystem(data);
        //         })
        //         .catch((err) => {
        //             setSystem({ ram: 15, cpu: 15 });
        //         });
        // }, 5000);
    }, []);
    return (
        <div>
            <header className="flex justify-between h-14 items-center px-4 py-2 bg-primary-900">
                <div className="flex flex-nowrap items-center justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 320 320">
                        <path d="M100.75 303.2v-3.825l-5.45-2.725C78 288 65.45 278.7 51.925 264.525c-17.9-18.775-31.3-43.95-37-69.65-4.225-19-4.75-39.275-1.525-58.625 3.75-22.525 13.875-46.075 27.725-64.475 3.85-5.125 8.4-10.3 14.25-16.25C63.1 47.7 69.25 42.6 78.25 36.6c20.225-13.475 43.225-21.85 67.25-24.475 4.9-.55 20.625-.775 26.875-.4 5.8.35 7.975.6 13.75 1.55 18.3 3.05 34.275 8.725 50.5 18 8.95 5.1 18.6 12.125 26.825 19.55l1.3 1.175h-38.575l-2.65-1.475c-14.625-8.125-31.45-13.5-48.275-15.4-7.475-.85-21.55-.725-29.25.275-28.5 3.65-55.225 16.975-75.25 37.5C62.825 81.025 58.025 87.275 52.2 97c-4.5 7.525-6.275 11.15-9.725 20.2-5.55 14.425-8.3 31.175-7.9 47.8.25 9.65 1.35 18 3.575 27C45 219.775 60.9 244.325 83.5 262.025c6.45 5.05 16.4 11.4 16.95 10.85.25-.225.375-67.5.175-72.8l-.175-4.325H63.5v-3.8c0-5.6.425-10.425 1.125-13.425 1.725-7.15 5.35-13.5 10.75-18.9 5.7-5.725 11.225-8.825 19.5-11.025l3.25-.85h143.7l-.175 6.075c-.175 6.8-.5 9.2-1.65 12.75-2.575 7.95-5.45 12.7-10.925 17.925-5.8 5.575-13.5 9.375-21.325 10.525-1.225.175-11.65.325-30.3.45-15.625.075-28.475.2-28.525.275-.075.075-.2 13.525-.3 29.875-.2 35.225-.325 40.425-1.225 44-2.175 8.775-6.075 16.05-11.975 22.3-7.65 8.1-17.725 13.225-28.875 14.7-1.55.2-3.5.375-4.325.375h-1.475v-3.8z" fill="#FFF" />
                        <path d="M151.25 311.75c-2.4-.1-5.675-.375-7.25-.575-5.875-.8-14.25-2.3-14.175-2.525.05-.125 1.225-.875 2.625-1.625 6.775-3.725 13.05-9.425 17.2-15.675l1.725-2.575 8.775-.025c9.325 0 13.1-.2 18.725-1.025 28.25-4.075 53.075-16.375 72.75-36.1 11.675-11.65 20.75-25.1 27.325-40.5 8.975-21 12-45.225 8.525-68.375-2.225-14.75-7.125-29.275-14.225-42.175-2.775-5.025-4.2-7.325-4.55-7.325-.125 0-1.55 1.325-3.15 2.95-7.175 7.275-14.9 11.525-25.475 14.075l-3.05.725h-20.1c-11.05 0-30.9.075-44.1.175l-24.025.15-.15 7.025c-.1 3.875-.225 7.45-.3 7.975l-.15.925h-47.525l.15-10.3c.1-5.675.275-11.225.425-12.325C102.325 96.55 106.175 87.8 111.675 81c1.95-2.4 5.9-6.225 8.325-8.025 5.425-4.075 12.625-7.35 19.575-8.95 1.975-.475 4.475-.5 70.75-.675L279 63.175v4.075l2.475 3.3c16.9 22.725 26.475 46.8 29.8 75.05 1.025 8.6.875 26.025-.275 35.1-.95 7.25-3.175 17.5-5.475 25.05-2.5 8.225-4.95 14.35-9.15 22.875-7.55 15.325-15.925 26.95-28.25 39.25-7.15 7.15-12.175 11.425-19.85 16.925-19.8 14.125-44.875 23.65-69.65 26.425-5.175.575-19.9.85-27.375.525z" fill="#569CDC" />
                    </svg>
                    <h1 className="text-4xl text-white font-bold capitalize font-mono">
                        <span className="text-primary-400 normal-case">abric</span>Scan
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <a href="/setting" title="setting" className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-800 hover:bg-primary-700 transition-all duration-300">
                        <svg width={32} height={32} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9-1.28 2.22-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4 4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2" />
                        </svg>
                    </a>
                    <div className="h-10 w-10 group rounded-full flex items-center justify-center relative" style={{ background: "conic-gradient(var(--primary-500) " + system["cpu"] * 3.6 + "deg,var(--primary-800) " + system["cpu"] * 3.6 + "deg)" }}>
                        <div className="h-8 w-8 rounded-full bg-primary-900 text-white p-2 text-xs flex item-center justify-center">CPU</div>
                        <div className="absolute scale-y-0 group-hover:scale-y-100 origin-top text-sm text-white top-14 bg-primary-800 w-max rounded-md px-2 transition-all">CPU usage : {system["cpu"]}%</div>
                    </div>
                    <div className="h-10 w-10 group rounded-full flex items-center justify-center relative" style={{ background: "conic-gradient(var(--primary-500) " + system["ram"] * 3.6 + "deg,var(--primary-800) " + system["ram"] * 3.6 + "deg)" }}>
                        <div className="h-8 w-8 rounded-full bg-primary-900 text-white p-2 text-xs flex item-center justify-center">RAM</div>
                        <div className="absolute right-0 scale-y-0 group-hover:scale-y-100 -translate-y-1/2 origin-top text-sm text-white top-14 bg-primary-800 w-max rounded-md px-2 transition-all">RAM usage : {system["ram"]}%</div>
                    </div>
                </div>
            </header>
            <div className="flex px-2 gap-2 noScroll flex-nowrap overflow-x-scroll items-center h-fit py-1 w-full mt-2 drop-shadow-lg">
                <div className={(window.location.pathname === "/" || window.location.pathname.includes("project") ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Projects
                    </a>
                </div>
                <div className={(window.location.pathname === "/registration" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/registration" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Registration
                    </a>
                </div>
                {/* <div className={(window.location.pathname === "/annotator-allocation" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/annotator-allocation" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Annotator Allocation
                    </a>
                </div> */}
                <div className={(window.location.pathname === "/image-annotation" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/image-annotation" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Image Annotation
                    </a>
                </div>
                {/* <div className={(window.location.pathname === "/image-gallery" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/image-gallery" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Image Gallery
                    </a>
                </div> */}
                <div className={(window.location.pathname === "/train" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/train" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Training
                    </a>
                </div>
                <div className={(window.location.pathname === "/prediction" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/prediction" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Prediction
                    </a>
                </div>
                <div className={(window.location.pathname === "/realtime" ? "bg-primary-600  text-white" : "text-primary-500") + " border-2 border-primary-800 transition-all duration-300 rounded-full px-4 hover:bg-primary-500  hover:text-white"}>
                    <a href="/realtime" className="text-xl font-mono my-0.5 whitespace-nowrap">
                        Realtime
                    </a>
                </div>

                {/* <div className={(window.location.pathname === "/text" ? "bg-primary-700 hover:bg-primary-600 text-white" : "text-primary-700") + " border-2 border-primary-700 transition-all duration-300 rounded-full px-4"}>
					<a href="/text" className="text-xl font-mono my-0.5 whitespace-nowrap">
						Text Anotator
					</a>
				</div> */}
            </div>
        </div>
    );
};

export default Navbar;
