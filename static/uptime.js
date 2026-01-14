<script>
(async function () {
  const url = "https://dzwoqltsvi8zj.cloudfront.net/netlify/data/uptime.json";
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  // --- Update timestamp ---
  document.getElementById("uptime-updated").innerText =
    "Last updated: " + data.generatedAt;

  // --- Build graphical cards ---
  let html = "";
  data.services.forEach(svc => {
    const color =
      svc.status === "operational" ? "#22c55e" :
      svc.status === "degraded"    ? "#facc15" :
                                     "#ef4444";

    html += `
      <div style="
        border: 1px solid #ddd;
        border-left: 5px solid ${color};
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        background: white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      ">
        <h3 style="margin: 0 0 10px;">${svc.name}</h3>

        <p style="font-size: 14px; color: #666;">Status: 
          <strong style="color:${color}; text-transform: capitalize;">
            ${svc.status}
          </strong>
        </p>

        <p style="margin-top: 10px;">24h Uptime: <strong>${svc.uptime24h}%</strong></p>
        <div style="background:#eee; height:10px; border-radius:6px; overflow:hidden;">
          <div style="width:${svc.uptime24h}%; height:100%; background:${color};"></div>
        </div>

        <p style="margin-top: 15px;">7d Uptime: <strong>${svc.uptime7d}%</strong></p>
        <div style="background:#eee; height:10px; border-radius:6px; overflow:hidden;">
          <div style="width:${svc.uptime7d}%; height:100%; background:${color};"></div>
        </div>
      </div>
    `;
  });

  document.getElementById("uptime-cards").innerHTML = html;

  // --- Chart.js Bar Chart ---
  const ctx = document.getElementById("uptimeChart");

  const svc = data.services[0];

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["24h", "7d"],
      datasets: [{
        label: svc.name + " Uptime (%)",
        data: [svc.uptime24h, svc.uptime7d],
        backgroundColor: ["#22c55e", "#3b82f6"]
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
})();
</script>
