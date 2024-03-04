import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingPipeline from "./Pages/trainingPipeline";
import TrainForm from "./Pages/TrainForm";

import PredictionPipeline from "./Pages/PreditionPipeline";
import PredictionForm from "./Pages/PredictionForm";

import TextAnotator from "./Pages/textAnotator";
import ImageAnnotation from "./Pages/imageAnnotation";
import Navbar from "./Components/Navbar";
import ImageGallery from "./Pages/ImageGallery";

import FabricRegistration from "./Pages/FabricRegistration";
import AnnotatorAlloaction from "./Pages/AnnotatorAlloaction";
import Projects from "./Pages/Projects";
import ProjectDetails from "./Pages/ProjectDetails";
import RealtimeForm from "./Pages/RealtimeForm";
import Settings from "./Pages/Settings";
// import CustomAnnotation from "./Pages/CustomAnnotation";

export default function App() {
    return (
        <Router>
            <div className="flex flex-col bg-primary-950 min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Projects />} />
                    <Route path="/registration" element={<FabricRegistration />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                    <Route path="/train" element={<TrainForm />} />
                    <Route path="/prediction" element={<PredictionForm />} />
                    <Route path="/realtime" element={<RealtimeForm />} />
                    <Route path="/image-annotation" element={<ImageAnnotation />} />
                    <Route path="/image-gallery" element={<ImageGallery />} />
                    <Route path="/annotator-allocation" element={<AnnotatorAlloaction />} />
                    <Route path="/setting" element={<Settings />} />

                    <Route path="/text" element={<PredictionPipeline />} />
                </Routes>
            </div>
        </Router>
    );
}
