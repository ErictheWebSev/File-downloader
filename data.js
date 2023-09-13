<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Downloader</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>File Downloader</h1>
        <input type="text" id="file-url-input" placeholder="Enter File URL">
        <button id="download-button">Download</button>
        <div id="connection-status"></div> <!-- Added for connection status -->
    </div>
    <script src="app.js"></script>
</body>
</html>


**JavaScript Logic (app.js):**
javascript
const fileInput = document.getElementById("file-url-input");
const downloadBtn = document.getElementById("download-button");
const connectionStatus = document.getElementById("connection-status"); // Added for connection status

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    if (navigator.onLine) {
        downloadBtn.innerText = "Downloading file...";
        fetchFile(fileInput.value);
    } else {
        connectionStatus.innerText = "Offline - Can't download right now";
    }
});

function fetchFile(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status}`);
            }
            return res.blob();
        })
        .then(file => {
            let tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, '');
            document.body.appendChild(aTag);
            aTag.click();
            downloadBtn.innerText = "Download File";
            URL.revokeObjectURL(tempUrl);
            aTag.remove();
        })
        .catch(() => {
            alert("Failed to download file!");
            downloadBtn.innerText = "Download File";
        });
}

// Function to check internet connection
function checkInternetConnection() {
    if (navigator.onLine) {
        connectionStatus.innerText = "Online";
    } else {
        connectionStatus.innerText = "Offline";
    }
}

// Initial check
checkInternetConnection();

// Listen for online/offline events
window.addEventListener("online", checkInternetConnection);
window.addEventListener("offline", checkInternetConnection);
```

In this code, we've added the `connectionStatus` element to display the internet connection status. When the user clicks the "Download" button and is offline, it will show a message "Offline - Can't download right now." When the user is online, it will download the file as before.

Make sure to save the HTML, CSS, and JavaScript code into separate files
(index.html, styles.css, and app.js) in the same directory and open index.html
in a web browser.