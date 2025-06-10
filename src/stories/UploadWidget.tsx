/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, createContext, useState } from "react";
import "./UploadWidget.css";
import { MdCloudUpload } from "react-icons/md";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

const UploadWidget = ({uwConfig, setPublicId, setResultUrl}) => {
    const [loaded, setLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(()=>{
        // Check if the script is already loaded
        const uwScript = document.getElementById("uw");
        if (!uwScript) {
            // if not loaded, create one
            const script = document.createElement("script");
            script.setAttribute("async", "");
            script.setAttribute("id", "uw");
            script.src = "https://upload-widget.cloudinary.com/global/all.js";
            script.addEventListener("load", () => setLoaded(true));
            document.body.appendChild(script);
            initializeCloudinaryWidget(setResultUrl);
        } else {
            setLoaded(true);
        }
    }, [loaded]);

    // create upload widget
    const initializeCloudinaryWidget = (setResultUrl:any) => {
        if (loaded) {
            console.log("creating upload widget");
            const myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result);
                        setPublicId(result.info.public_id);
                        localStorage.setItem("profilePicture", result.info.secure_url);
                        setResultUrl(result.info.secure_url);
                        setPreviewUrl(result.info.secure_url);
                    }
                    else {
                        console.log(result);
                    }
                }
            )
    
            document.getElementById("upload_widget").addEventListener("click",
                function() {
                    myWidget.open();
                },
                false
            );
        }
    }

    return (
        <CloudinaryScriptContext.Provider value={{loaded}}>
            <div className="upload-container">
                {previewUrl ? (
                    <div className="upload-preview">
                        <img src={previewUrl} alt="Profile preview" />
                    </div>
                ) : (
                    <div className="upload-preview">
                        <div className="upload-preview-placeholder">
                            No image selected
                        </div>
                    </div>
                )}
                <button
                    id="upload_widget"
                    className="cloudinary-button"
                    onClick={(e)=>{e.preventDefault(); initializeCloudinaryWidget(setResultUrl)}}
                >
                    <MdCloudUpload size={20} />
                    Upload Profile Picture
                </button>
            </div>
        </CloudinaryScriptContext.Provider>
    )
}

export default UploadWidget;
export {CloudinaryScriptContext}