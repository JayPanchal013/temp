import React, { useState, useRef } from "react";
import ReactImageAnnotate from "react-image-annotate";

import ImageAnnotationSidebar from "../Components/ImageAnnotationSidebar";
const CustomAnnotation = () => {
    const [labels, setLabels] = useState([]);

    return (
        <div className="bg-primary-950 p-3 w-full h-[calc(100vh-7rem)] flex flex-nowrap gap-3 overflow-hidden">
            <ImageAnnotationSidebar setLabels={setLabels} />
            <div id="imageAnnotationMain" className="w-[80%] h-full bg-primary-900 rounded-lg inner-shadow overflow-hidden ">
                {/* <ReactImageAnnotate
                    labelImages
                    regionClsList={labels}
                    enabledTools={["select", "create-box", "create-polygon", "create-pixel"]}
                    onExit={(event) => {
                        console.log(event.images);
                    }}
                    images={[
                        {
                            src: "https://loremflickr.com/640/360",
                            name: "Image 1",
                            regions: [],
                        },
                        {
                            src: "https://placekitten.com/512/512",
                            name: "Image 2",
                            regions: [],
                        },
                    ]}
                /> */}
            </div>
        </div>
    );
};

export default CustomAnnotation;
