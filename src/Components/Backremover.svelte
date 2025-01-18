<script>
    import axios from "axios";
    export let selectedImage = null;
    let files = [];
     let isHovering = false;
     let isDragging = false;
     let processedImage = null;
     let downloadLink = '';
     let isLoading = false;
  
     function dropFile(event) {
      event.preventDefault();
      isHovering = false;
      isDragging = false;
  
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (isValidImage(file)) {
          handleFile(file);
        } else {
          alert("Please upload a valid image file (e.g., JPG, PNG).");
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
  
     function UploadImage() {
      const fileInput = document.getElementById("fileInput");
      fileInput.click();
    }
  
     async function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        if (isValidImage(file)) {
          await handleFile(file);
        } else {
          alert("Please upload a valid image file (e.g., JPG, PNG).");
        }
      }
    }
  
     function isValidImage(file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      return validImageTypes.includes(file.type);
    }
  
     async function handleFile(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
        await sendImageToBackend(file);
      }
    }
  
     async function sendImageToBackend(file) {
      const formData = new FormData();
      formData.append("image", file);
      isLoading = true;
  
      try {
        const response = await axios.post("http://127.0.0.1:5000/remove-background", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        });
  
        const blob = new Blob([response.data], { type: "image/png" });
        processedImage = URL.createObjectURL(blob);
        downloadLink = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error sending image to backend:", error.response || error);
      } finally {
        isLoading = false;
      }
    }
  </script>
  <style>
  /* General styling */
  .container {
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: aliceblue;
      margin: 0px;
      flex-direction: column;
      padding: 20px;
      gap: 20px; /* Ensures proper spacing between elements */
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
      transition: transform 0.3s ease, background-color 0.3s ease;
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
  
  .circle.dragging {
      transform: scale(1.1);
      background-color: #e3f2fd; /* Light blue background to indicate drop area */
      border-color: #0077b6; /* Highlight the border */
      box-shadow: 0px 8px 15px rgba(0, 119, 182, 0.2);
  }
  
  .option2 {
      font-size: 1rem;
      color: #555;
  }
  
  /* Ensure spacing between the circle and the download link */
  .uploader {
      margin-top: 30px; /* Creates space between the circle and uploader content */
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px; /* Space between loader or download link and text */
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
  /* Responsive styles for mobile devices */
@media screen and (max-width: 768px) {
    .circle {
        width: 250px;
        height: 250px;
        font-size: 0.9rem;
    }
    .heading {
        font-size: 1.75rem; /* Slightly smaller font size */
        margin-bottom: 15px; /* Reduced margin for smaller screens */
        padding: 8px; /* Adjust padding */
        text-align: center;
    }

    .option1 {
        font-size: 1rem;
    }

    .option2 {
        font-size: 0.9rem;
    }



    .download-link {
        font-size: 1rem;
        padding: 10px 15px;
    }
}

@media screen and (max-width: 480px) {
    .circle {
        width: 200px;
        height: 200px;
        font-size: 0.8rem;
    }
    .heading {
        font-size: 1.5rem; /* Further reduced font size */
        margin-bottom: 10px; /* Adjust margin */
        padding: 5px; /* Adjust padding */
        text-align: center;
    }


    .option1 {
        font-size: 0.9rem;
    }

    .option2 {
        font-size: 0.8rem;
    }

    .download-link {
        font-size: 0.9rem;
        padding: 8px 12px;
    }
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
      BGRemover<br> 100% Automatically and Free
    </div>
    <div
      class="circle"
      role="button"
      tabindex="0"
      on:keydown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          UploadImage();
        }
      }}
      on:click={UploadImage}
      on:drop={dropFile}
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      class:hover={isHovering}
      class:dragging={isDragging}>
      <div class="option1">Upload Image</div>
      <div class="or">OR</div>
      <div class="option2">Drop a File</div>
    </div>
  
    <!-- Hidden file input -->
    <input
      type="file"
      id="fileInput"
      accept="image/*"
      style="display: none;"
      on:change={handleFileSelect}
    />
  
    <div class="uploader">
      {#if isLoading}
        <div class="loader"></div>
        <p>Processing image...</p>
      {/if}
  
      {#if processedImage && !isLoading}
        <a href={downloadLink} download="processed_image.png" class="download-link">Download Now</a>
      {/if}
    </div>
  </div>
  
  

  