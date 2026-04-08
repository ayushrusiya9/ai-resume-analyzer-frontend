import Navbar from "@/components/Navbar";
import React from "react";

// Props: expects the backend response structure
interface ResultPageProps {
    match_score?: number;
    resume_skills?: string[];
    missing_skills?: string[];
    suggestions?: string[];
}

// Helper for score color
function getScoreColor(score: number) {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
}

// Main ResultPage
const ResultPage: React.FC<ResultPageProps> = ({ match_score = 88, resume_skills = ["Python", "React"], missing_skills = ["TypeScript", "FastAPI"], suggestions = ["Add more TypeScript experience.", "Highlight FastAPI projects."] }) => {
    // Demo breakdown (static for now, can be dynamic)
    const breakdown = [
        { label: "Tone & Style", value: 55, tag: "Good Start", tagColor: "bg-yellow-100 text-yellow-700" },
        { label: "Content", value: 25, tag: "Needs work", tagColor: "bg-red-100 text-red-700" },
        { label: "Structure", value: 70, tag: "Strong", tagColor: "bg-green-100 text-green-700" },
        { label: "Skills", value: 32, tag: "Needs work", tagColor: "bg-red-100 text-red-700" },
    ];

    return (
        <section className="min-h-screen bg-cover bg-center w-full flex flex-col items-center md:p-10">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mt-12">
                <h2 className="text-2xl font-bold mb-2">Resume Review</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Score Gauge (static arc for demo) */}
                    <div className="flex flex-col items-center justify-center w-40 h-40">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <defs>
                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#AB8C95" />
                                    <stop offset="50%" stopColor="#000000" />
                                    <stop offset="100%" stopColor="#8E97C5" />
                                </linearGradient>
                            </defs>
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#eee" strokeWidth="14" />
                            <path d="M 60 10 A 50 50 0 1 1 59.99 10" fill="none" stroke="url(#scoreGradient)" strokeWidth="14" strokeLinecap="round" />
                        </svg>
                        <div className="absolute mt-[-90px] flex flex-col items-center">
                            <span className="text-2xl font-bold">{Math.round(match_score)}/100</span>
                            <span className="text-gray-500 text-xs">{missing_skills.length} issues</span>
                        </div>
                    </div>
                    {/* Score Details */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">Your Resume Score</h3>
                        <p className="text-gray-500 text-sm mb-4">This score is calculated based on the variables listed below.</p>
                        <div className="space-y-3">
                            {breakdown.map((item) => (
                                <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">{item.label}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                                    </div>
                                    <span className="font-bold text-gray-700">{item.value}/100</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Skills and Suggestions */}
                <div className="mt-8">
                    <h4 className="font-semibold mb-2">Skills Found:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {resume_skills.map((skill) => (
                            <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{skill}</span>
                        ))}
                    </div>
                    <h4 className="font-semibold mb-2">Missing Skills:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {missing_skills.length > 0 ? missing_skills.map((skill) => (
                            <span key={skill} className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">{skill}</span>
                        )) : <span className="text-green-600 text-xs">None</span>}
                    </div>
                    <h4 className="font-semibold mb-2">Suggestions:</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm">
                        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ResultPage;