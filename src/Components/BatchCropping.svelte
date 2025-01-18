<script>
    import axios from "axios";

    let selectedImages = [];
    let files = [];
    let isHovering = false;
    let isDragging = false;
    let croppedZip = null;
    let downloadLink = '';
    let isLoading = false;

    // User-defined cropping dimensions
    let cropX = 0;
    let cropY = 0;
    let cropWidth = 100;
    let cropHeight = 100;

    function dropFiles(event) {
        event.preventDefault();
        isHovering = false;
        isDragging = false;

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            handleFiles(event.dataTransfer.files);
            event.dataTransfer.clearData();
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        isHovering = true;
        isDragging = true;
    }

    function handleDragLeave() {
        isHovering = false;
        isDragging = false;
    }

    function UploadImages() {
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
    }

    function handleFileSelect(event) {
        if (event.target.files) {
            handleFiles(event.target.files);
        }
    }

    function handleFiles(uploadedFiles) {
        for (const file of uploadedFiles) {
            if (isValidImage(file)) {
                files.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    selectedImages = [...selectedImages, e.target.result];
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please upload valid image files (e.g., JPG, PNG).");
            }
        }
    }

    function isValidImage(file) {
        const validImageTypes = ["image/jpeg", "image/png"];
        return validImageTypes.includes(file.type);
    }

    async function sendImagesToBackend() {
        const formData = new FormData();
        for (const file of files) {
            formData.append("images", file);
        }
        formData.append("crop_x", cropX);
        formData.append("crop_y", cropY);
        formData.append("crop_width", cropWidth);
        formData.append("crop_height", cropHeight);

        isLoading = true;

        try {
            const response = await axios.post("http://127.0.0.1:5000/batch-crop-and-compress", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/zip" });
            croppedZip = URL.createObjectURL(blob);
            downloadLink = URL.createObjectURL(blob);
        } catch (error) {
            console.error("Error sending images to backend:", error);
            alert("An error occurred while processing images. Please try again.");
        } finally {
            isLoading = false;
        }
    }

    function resetState() {
        selectedImages = [];
        files = [];
        croppedZip = null;
        downloadLink = '';
    }
</script>

<style>
/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.heading {
    font-size: 2rem;
    font-weight: bold;
    color: #0077b6;
    margin-bottom: 20px;
    text-align: center;
    line-height: 1.4;
    padding: 10px;
}

.upload-circle {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #0077b6;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
    text-align: center;
    margin-bottom: 20px;
}

.upload-circle:hover {
    transform: scale(1.05);
}

.option-primary {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0077b6;
    margin: 8px 0;
    cursor: pointer;
}

.option-secondary {
    font-size: 1rem;
    color: #555;
}

.controls-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin: 20px 0;
    width: 100%;
    max-width: 600px;
}

.controls-label {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    color: #333;
    font-weight: bold;
}

.controls-input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #cad9e4;
    border-radius: 5px;
}

.image-grid-container {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    border: 2px solid #cad9e4;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
}

.image-grid img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.uploader-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.uploader-button {
    background-color: #0077b6;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.uploader-button:hover {
    background-color: #005f8c;
    transform: translateY(-2px);
}

.uploader-button:active {
    transform: translateY(0);
}

.loader {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #0077b6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.download-link {
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    color: #0077b6;
    padding: 10px 20px;
    border: 2px solid #0077b6;
    border-radius: 8px;
    text-align: center;
    transition: background-color 0.5s ease, transform 0.3s ease;
}

.download-link:hover {
    background-color: #0077b6;
    color: white;
    transform: translateY(-3px);
}

.download-link:active {
    transform: translateY(0);
}
@media (max-width: 600px) {
    .container {
        padding: 15px;
    }

    .heading {
        font-size: 1.5rem;
    }

    .upload-circle {
        width: 70%;
        height: 70%;
    }

    .controls-container {
        grid-template-columns: 1fr;
    }

    .image-grid-container {
        max-height: 200px;
    }}
</style>
<div class="container">
    <div class="heading">
        Batch Crop Images<br />
        100% Automatically and Free
    </div>
    <div
        class="upload-circle"
        role="button"
        tabindex="0"
        on:keydown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                UploadImages();
            }
        }}
        on:click={UploadImages}
        on:drop={dropFiles}
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
    >
        <div class="option-primary">Upload Images</div>
        <div class="option-secondary">or Drop Files Here</div>
    </div>

    <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        style="display: none;"
        on:change={handleFileSelect}
    />

    <div class="controls-container">
        <label class="controls-label">
            Crop X (pixels):
            <input type="number" class="controls-input" bind:value={cropX} />
        </label>
        <label class="controls-label">
            Crop Y (pixels):
            <input type="number" class="controls-input" bind:value={cropY} />
        </label>
        <label class="controls-label">
            Crop Width (pixels):
            <input type="number" class="controls-input" bind:value={cropWidth} />
        </label>
        <label class="controls-label">
            Crop Height (pixels):
            <input type="number" class="controls-input" bind:value={cropHeight} />
        </label>
    </div>

    <div class="uploader-container">
        {#if selectedImages.length > 0}
            <div class="image-grid-container">
                <div class="image-grid">
                    {#each selectedImages as image}
                        <img src={image} alt="Preview" />
                    {/each}
                </div>
            </div>
            <button class="uploader-button" on:click={sendImagesToBackend}>Crop Images</button>
        {/if}

        {#if isLoading}
            <div class="loader"></div>
            <p>Processing images...</p>
        {/if}

        {#if croppedZip && !isLoading}
            <a
                href={downloadLink}
                download="cropped_images.zip"
                class="download-link"
                on:click={resetState}
            >
                Download Cropped Images
            </a>
        {/if}
    </div>
</div>

