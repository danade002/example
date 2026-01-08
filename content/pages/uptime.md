
title: Uptime Metrics
description: Automatically updated uptime metrics from APIs
---
<div id="uptime-widget" style="font-size:14px">Loading uptime...</div>

<script>
(async () => {
  try {
    const res = await fetch('/data/uptime.json', {cache: 'no-store'});
    const data = await res.json();
    const html = Object.entries(data.services).map(([name, s]) => {
      return `
        <div style="margin:8px 0;">
          <strong>${name}</strong><br>
          24h: ${(s.last24h_availability * 100).toFixed(2)}%<br>
          7d: ${(s.last7d_availability * 100).toFixed(2)}%<br>
          Last check: ${new Date(s.last_check).toLocaleString()}
        </div>
      `;
    }).join('');
    document.getElementById('uptime-widget').innerHTML = html;
  } catch (e) {
    document.getElementById('uptime-widget').innerHTML = "No data available yet";
  }
})();
</script>
