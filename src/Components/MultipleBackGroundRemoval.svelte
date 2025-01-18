<script>
    import axios from "axios";
    import JSZip from "jszip";
    
    export let selectedImages = [];
    let files = [];
    let isHovering = false;
    let isDragging = false;
    let processedImages = [];
    let isLoading = false;
    
    function dropFiles(event) {
      event.preventDefault();
      isHovering = false;
      isDragging = false;
    
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter(isValidImage);
        if (validFiles.length) {
          handleFiles(validFiles);
        } else {
          alert("Please upload valid image files (e.g., JPG, PNG).");
        }
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
    
    function uploadImages() {
      const fileInput = document.getElementById("fileInput");
      fileInput.click();
    }
    
    async function handleFileSelect(event) {
      files = Array.from(event.target.files);
      const validFiles = files.filter(isValidImage);
      if (validFiles.length) {
        await handleFiles(validFiles);
      } else {
        alert("Please upload valid image files (e.g., JPG, PNG).");
      }
    }
    
    function isValidImage(file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      return validImageTypes.includes(file.type);
    }
    
    async function handleFiles(files) {
      if (files && files.length) {
        selectedImages = [];
        isLoading = true;
        processedImages = [];  // Reset the processed images before uploading new ones
    
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e) => {
            selectedImages.push(e.target.result); // Display images as preview
          };
          reader.readAsDataURL(file);
          await sendImageToBackend(file);
        }
    
        isLoading = false;
      }
    }
    
    async function sendImageToBackend(file) {
      const formData = new FormData();
      formData.append("image", file);
    
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/remove_backgrounds",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: "blob",
          }
        );
    
        // Handle the zip file response and push its URL
        const zipBlob = new Blob([response.data], { type: "application/zip" });
        const zipUrl = URL.createObjectURL(zipBlob);
        processedImages.push(zipUrl);
      } catch (error) {
        console.error("Error sending image to backend:", error.response || error);
      }
    }
    
    // Add this function to reset the state
    function resetUploader() {
      isLoading = false;
      selectedImages = [];
      processedImages = [];
    }
    
    // Modify the downloadAllImages function to include the reset
    async function downloadAllImages() {
      const zip = new JSZip();
      for (let i = 0; i < processedImages.length; i++) {
        const zipBlob = await fetch(processedImages[i]).then((res) => res.blob());
        const zipData = await zip.loadAsync(zipBlob);

        zipData.forEach(async (relativePath, file) => {
          const filename = relativePath.split("/").pop();
          const blob = await file.async("blob");
          zip.file(filename, blob);
        });
      }

      const zipFileBlob = await zip.generateAsync({ type: "blob" });
      const zipFileUrl = URL.createObjectURL(zipFileBlob);

      const link = document.createElement("a");
      link.href = zipFileUrl;
      link.download = "background_removed_images.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset uploader after download
      resetUploader();
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

    .uploader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        margin-bottom: 20px; /* Adds some space below the loader */
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

</style>

<div class="container">
    <div class="heading">
      Batch BGRemover<br />100% Automatically and Free
    </div>
    <div
      class="circle"
      role="button"
      tabindex="0"
      on:keydown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          uploadImages();
        }
      }}
      on:click={uploadImages}
      on:drop={dropFiles}
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      class:hover={isHovering}
      class:dragging={isDragging}>
      <div class="option1">Upload Images</div>
      <div class="or">OR</div>
      <div class="option2">Drop Files</div>
    </div>
  
    <!-- Hidden file input -->
    <input
      type="file"
      id="fileInput"
      accept="image/*"
      style="display: none;"
      multiple
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
        {/if}
      {#if isLoading}
        <div class="loader"></div>
        <p>Processing images...</p>
      {/if}
  
      {#if processedImages.length && !isLoading}
        <div>
          <button class="download-link" on:click={downloadAllImages}>
            Download All Images
          </button>
        </div>
      {/if}
    </div>
  </div>
