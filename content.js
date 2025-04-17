const data = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
  };
  
  const createWidget = () => {
    const widget = document.createElement("div");
    widget.id = "force-widget";
  
    widget.innerHTML = `
      <div class="widget-header">
        <strong>${data.companyName}</strong>
      </div>
      <div class="match-score">
        Match Score: ${data.matchScore}%
        <div class="progress-bar">
          <div class="progress" style="width: ${data.matchScore}%"></div>
        </div>
      </div>
      <div class="status-tag ${data.accountStatus === "Target" ? "target" : "not-target"}">
        ${data.accountStatus}
      </div>
      <button id="toggle-widget">Hide</button>
    `;
  
    document.body.appendChild(widget);
  
    document.getElementById("toggle-widget").onclick = () => {
      chrome.storage.sync.set({ widgetVisible: false });
      widget.remove();
    };
  };
  
  chrome.storage.sync.get(["widgetVisible"], (result) => {
    if (result.widgetVisible === false) return;
  
    createWidget();
  });
  