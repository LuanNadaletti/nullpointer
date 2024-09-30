import { useState } from "react";
import { uploadFile } from "../services/fireBaseService";

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload");
            return;
        }

        try {
            setError(null);
            const url = await uploadFile(selectedFile);
            setDownloadURL(url);
            console.log("File available at: ", url);
        } catch (error: any) {
            setError(error.message || "An error ocurred during upload");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-xl mb-4">Upload File</h1>

            <input type="file" onChange={handleFileChange} className="mb-4" />

            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>

            {progress > 0 && <p>Upload progress: {progress}%</p>}
            {downloadURL && (
                <div className="mt-4">
                    <img src={downloadURL} alt="Uploaded file" className="w-32 h-32 rounded-full" />
                </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    )
}

export default FileUpload;