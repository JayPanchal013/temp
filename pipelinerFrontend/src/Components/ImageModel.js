import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper";

const ImageModel = ({ imgSrc, imgArr, swiperRef }) => {
    swiperRef.activeIndex = imgSrc;
    return (
        <div className="h-screen w-full scale-0 opacity-0 fixed top-0 left-0 bg-primary-800/50 backdrop-blur-lg py-5 flex items-center justify-center transition-all duration-300 z-50" id="imageModelContainer">
            <div
                className="absolute top-5 right-5 bg-primary-500 text-white p-2 rounded-full cursor-pointer"
                onClick={() => {
                    document.getElementById("imageModelContainer").classList.add("scale-0", "opacity-0");
                    console.log(imgArr);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </div>
            <Swiper ref={swiperRef} id="swiperImageViewer" navigation={true} pagination={true} modules={[Navigation, Pagination]} className="mx-10 h-full">
                {imgArr.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-[70%] h-full mx-auto relative">
                            <img src={img[0]} alt={img[1]} title={img[1]} className="w-full h-full aspect-square object-contain relative" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageModel;
