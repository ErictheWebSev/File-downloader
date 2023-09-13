document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById('fileInput');
  const downloadBtn = document.getElementById('download-btn');
  const status = document.getElementById('status');
  const statusContainer = document.getElementById('status-con');
  
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      downloadBtn.innerText = "Downloading file...";
      fetchFile(fileInput.value);
    } else {
      downloadBtn.textContent = 'Download'
      statusContainer.classList.toggle('hidden')
      status.innerHTML = 'Oops You are Offline'
    }
  })
  
  function fetchFile(url) {
    fetch(url)
    .then(res => res.blob())
    .then(file => {
      let tempUrl = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = tempUrl;
      a.download = url.replace(/^.*[\\\/]/, '');
      document.body.appendChild(a);
      a.click()
      console.log('downlsded')
      downloadBtn.textContent = 'Download'
      URL.revokeObjectURL(tempUrl);
      
      a.remove();
    })
    .catch(error => {
      alert("Failed to download file!");
      downloadBtn.innerText = "Download";
      console.log(error)
    }) 
  }
  
  function checkConnection() {
    if (navigator.onLine) {
      statusContainer.classList.toggle('hidden')
      status.innerHTML = ' You are Connected'
      setTimeout(() => {
          statusContainer.classList.add('hidden')
    }, 2000);
    } else {
      statusContainer.classList.toggle('hidden')
      status.innerHTML = 'Oops You are Offline'
    }
  }
  
  checkConnection()
  
  window.addEventListener("online", checkConnection);
  window.addEventListener("offline", checkConnection);
})