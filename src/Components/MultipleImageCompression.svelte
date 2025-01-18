<script>
    import axios from "axios";
    let selectedImages = [];
    let files = [];
    let isHovering = false;
    let isDragging = false;
    let compressedZip = null;
    let downloadLink = '';
    let isLoading = false;

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
        isLoading = true;

        try {
            const response = await axios.post("http://127.0.0.1:5000/compress-imagess", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            compressedZip = URL.createObjectURL(response.data);
            downloadLink = compressedZip;
        } catch (error) {
            console.error("Error sending images to backend:", error.response || error);
        } finally {
            isLoading = false;
        }
    }

    function resetState() {
        selectedImages = [];
        files = [];
        compressedZip = null;
        downloadLink = '';
    }
</script>

<style>
    .container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: aliceblue;
        padding: 20px;
        margin: 0;
    }

    .circle {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 3px solid #cad9e4;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        cursor: pointer;
        text-align: center;
    }

    .circle:hover {
        transform: scale(1.05);
    }

    .option1 {
        font-size: 1.2rem;
        font-weight: bold;
        color: #0077b6;
        margin: 8px 0;
        cursor: pointer;
    }

    .option2 {
        font-size: 1rem;
        color: #555;
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
        width: 100%;
    }

    .image-grid img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .uploader button {
        background-color: #0077b6;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin-top: 15px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .uploader button:hover {
        background-color: #005f8c;
        transform: translateY(-2px);
    }

    .uploader button:active {
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
        font-size: 1.2rem;
        font-weight: bold;
        color: #0077b6;
        margin-top: 15px;
        padding: 12px 20px;
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

    .heading {
        font-size: 2rem;
        font-weight: bold;
        color: #0077b6;
        margin-bottom: 20px;
        text-align: center;
        line-height: 1.4;
        padding: 10px;
    }
</style>

<div class="container">
    <div class="heading">
        Batch Compress<br />
        100% Automatically and Free
    </div>
    <div
        class="circle"
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
        <div class="option1">Upload Images</div>
        <div class="option2">or Drop Files Here</div>
    </div>

    <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        style="display: none;"
        on:change={handleFileSelect}
    />

    <div class="uploader">
        {#if selectedImages.length > 0}
            <div class="image-grid-container">
                <div class="image-grid">
                    {#each selectedImages as image}
                        <img src={image} alt="Preview" />
                    {/each}
                </div>
            </div>
            <button on:click={sendImagesToBackend}>Compress Images</button>
        {/if}

        {#if isLoading}
            <div class="loader"></div>
            <p>Processing images...</p>
        {/if}

        {#if compressedZip && !isLoading}
            <a
                href={downloadLink}
                download="compressed_images.zip"
                class="download-link"
                on:click={resetState}
            >
                Download Compressed Images
            </a>
        {/if}
    </div>
</div>
