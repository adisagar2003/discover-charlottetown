/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, createContext, useState, useRef } from "react";
import "./UploadWidget.css";
import { MdCloudUpload } from "react-icons/md";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

// Types for better code understanding
interface UploadWidgetProps {
    uwConfig: any;
    setPublicId: (id: string) => void;
    setResultUrl: (url: string) => void;
}

interface CloudinaryResult {
    event: string;
    info: {
        public_id: string;
        secure_url: string;
    };
}

const UploadWidget = ({ uwConfig, setPublicId, setResultUrl }: UploadWidgetProps) => {
    // State management
    const [loaded, setLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const widgetRef = useRef(null);

    // Initialize the widget when the script is loaded
    useEffect(() => {
        initializeCloudinaryScript();
    }, [loaded]);

    const handleUploadSuccess = (result: CloudinaryResult) => {
        console.log("Upload successful:", result);
        setPublicId(result.info.public_id);
        localStorage.setItem("profilePicture", result.info.secure_url);
        setResultUrl(result.info.secure_url);
        setPreviewUrl(result.info.secure_url);
    };

    const handleUploadError = (error: any) => {
        console.log("Upload error:", error);
    };

    const createUploadWidget = () => {
        if (loaded && !widgetRef.current) {
            widgetRef.current = window.cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: CloudinaryResult) => {
                    if (!error && result && result.event === "success") {
                        handleUploadSuccess(result);
                    } else {
                        handleUploadError(error);
                    }
                }
            );
        }
    };

    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (loaded && widgetRef.current) {
            widgetRef.current.open();
        }
    };

    const initializeCloudinaryScript = () => {
        const uwScript = document.getElementById("uw");
        if (!uwScript) {
            createCloudinaryScript();
        } else {
            setLoaded(true);
            createUploadWidget();
        }
    };

    // Create and load Cloudinary script
    const createCloudinaryScript = () => {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => {
            setLoaded(true);
            createUploadWidget();
        });
        document.body.appendChild(script);
    };

    // Render preview image or placeholder
    const renderPreview = () => {
        if (previewUrl) {
            return (
                <div className="upload-preview">
                    <img src={previewUrl} alt="Profile preview" />
                </div>
            );
        }
        return (
            <div className="upload-preview">
                <div className="upload-preview-placeholder">
                    No image selected
                </div>
            </div>
        );
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <div className="upload-container">
                {renderPreview()}
                <button
                    id="upload_widget"
                    className="cloudinary-button"
                    onClick={handleUploadClick}
                >
                    <MdCloudUpload size={20} />
                    Upload Profile Picture
                </button>
            </div>
        </CloudinaryScriptContext.Provider>
    );
};

export default UploadWidget;
export { CloudinaryScriptContext };

