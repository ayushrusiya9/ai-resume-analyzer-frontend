"use client";

import React, { useState } from "react";
import Button from "./Button";
import uploadResume from "@/services/api.service";
import ResultPage from "@/pages/ResultPage";

export default function UploadForm() {
    const [errors, setErrors] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null); 
    const [showResults, setShowResults] = useState(false);

    const validate = (FormData: FormData) => {
        const newError : any = {};
        const companyName = FormData.get("company_name")?.toString().trim();
        const jobTitle = FormData.get("job_title")?.toString().trim();
        const jobDescription = FormData.get("job_description")?.toString().trim();
        const resumeFile = FormData.get("resume_file");

        // form validation
        if (!companyName) {
            newError.company_name = "Company name is required";
        }
        if (companyName && companyName.toString().length < 3) {
            newError.company_name = "Company name must be at least 3 characters";
        }
        if (!jobTitle) {
            newError.job_title = "Job title is required";
        }
        if (jobTitle && jobTitle.toString().length < 3) {
            newError.job_title = "Job title must be at least 3 characters";
        }
        if (!jobDescription) {
            newError.job_description = "Job description is required";
        }
        if (jobDescription && jobDescription.toString().length < 10) {
            newError.job_description = "Job description must be at least 10 characters";
        }
        if (!resumeFile ) {
            newError.resume_file = "Resume file is required";
        }

        // size validation for resume file (max 5MB)
        if (resumeFile && (resumeFile as File).size > 5 * 1024 * 1024){
            newError.resume_file = "Resume file must be less than 5MB";
        }

        if (resumeFile && !["application/pdf", "application/msword"].includes((resumeFile as File).type)){
            newError.resume_file = "Resume file must be a PDF or Word document";
        }
        return newError;
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file || null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        // if there are validation errors, log them and return early
        if (Object.keys(validationErrors).length > 0) {
            // console.log("Form validation errors:", validationErrors);
            return;
        }

        // if validation passes, proceed to upload the resume
        uploadResume(formData) // returns a promise
            .then((data) => {
                console.log("Resume analysis result:", data);
                setAnalysisResult(data); // store the analysis result in state
                setShowResults(true);
            })
            .catch((error) => {
                setErrors({ submit: "Failed to upload resume: " + error.message });                
            })
    }

    return (
        <div className="w-full max-w-screen-md mx-auto mt-10 px-3 sm:px-6 md:px-8 lg:px-0" id="upload-section">
            {analysisResult === null ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 md:gap-10 mx-auto justify-center">
                {/* Company Name */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="company_name" className="text-sm text-gray-600">Company Name:</label>
                    <input type="text" id="company_name" name="company_name" placeholder="Enter Company Name"
                        className="bg-white p-2 border-none rounded" />
                    {/* Error message for company name */}
                    {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
                </div>
                {/* Job Title */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="job_title" className="text-sm text-gray-600">Job Title:</label>
                    <input type="text" id="job_title" name="job_title" placeholder="Enter Job Title"
                        className="bg-white p-2 border-none rounded" />
                    {/* Error message for job title */}
                    {errors.job_title && <p className="text-red-500 text-sm">{errors.job_title}</p>}    
                </div>

                {/* Job Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="job_description" className="text-sm text-gray-600">Job Description:</label>
                    <textarea id="job_description" name="job_description" placeholder="Enter Job Description"
                        className="bg-white p-2 border-none rounded h-32"></textarea>
                    {/* Error message for job description */}
                    {errors.job_description && <p className="text-red-500 text-sm">{errors.job_description}</p>}
                </div>

                {/* Upload Resume */}
                <div className="flex flex-col gap-2">

                    <label className="text-sm text-gray-600">
                        Upload Resume
                    </label>

                    <label
                        htmlFor="resume_file"
                        className="flex flex-col items-center justify-center w-full h-52 px-6 bg-gray-100 rounded-2xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300transition-all duration-200"
                    >

                        <div className="text-3xl mb-3">⬆️</div>

                        <p className="text-gray-700 font-medium">
                            Click to upload <span className="text-gray-500 font-normal">or drag and drop</span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1 text-center">
                            PDF, DOC or DOCX (max. 5MB)
                        </p>

                        {/* Hidden input */}

                        <input
                            type="file"
                            id="resume_file"
                            name="resume_file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                        {/* Show selected file name */}
                        {selectedFile && (
                            <p className="text-green-600 text-sm mt-2">Selected file: {selectedFile.name}</p>
                        )}

                    </label>

                </div>

                {/* Submit Button */}
                <div className="flex justify-center w-full">
                    <Button />
                </div>
                {/* Error message for submit failure */}
                {errors.submit && <p className="text-red-500 text-sm text-center mt-2">{errors.submit}</p>}
            </form>
            ) : (
                <ResultPage />
            )}
        </div>
    )
}
