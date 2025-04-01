document.getElementById("imageForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const prompt = document.getElementById("promptInput").value;
    const size = document.getElementById("size").value;
    const numImages = 1;
    const style = document.getElementById("style").value;

    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("generatedImage").classList.add("hidden");
    document.getElementById("downloadBtn").classList.add("hidden");

    const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
            size,
            n: numImages,
            style
        }),
    });

    const data = await response.json();
    const imageUrl = data.url;

    // Hide loader and show image
    document.getElementById("loader").classList.add("hidden");

    if (imageUrl) {
        const imageElement = document.getElementById("generatedImage");
        imageElement.src = imageUrl;
        imageElement.style.display = "block"; 

        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.href = imageUrl; 
        downloadBtn.classList.remove("hidden");  
        
        downloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'generated_image.png';

            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
        });
    }
});
