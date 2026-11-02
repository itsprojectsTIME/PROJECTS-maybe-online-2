async function loadapistatus(){
    let response = await fetch("http://localhost:3000/status");
    let data = await response.json();
    document.getElementById("apiStatus").textContent = `Status: ${data.status}, Uptime: ${data.uptime.toFixed(2)} seconds, Version: ${data.version}`;
    console.log(data);
    if (data.status === "Online") {
        console.log("API is online");
    } else {
        console.error("API is offline");
    }
}
loadapistatus();


