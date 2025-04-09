// Generate input fields based on number of processes
function generateProcessInputs() {
  const num = document.getElementById('numProcesses').value;
  const container = document.getElementById('processInputs');
  container.innerHTML = '';

  for (let i = 0; i < num; i++) {
    container.innerHTML += `
      <div>
        <h3>Process P${i + 1}</h3>
        <label>Arrival Time:</label>
        <input type="number" id="arrival${i}" min="0" required>
        <label>Burst Time:</label>
        <input type="number" id="burst${i}" min="1" required>
      </div>
    `;
  }
}

// Calculate FCFS Scheduling
function calculateFCFS() {
  const num = parseInt(document.getElementById('numProcesses').value);
  const processes = [];

  for (let i = 0; i < num; i++) {
    const arrival = parseInt(document.getElementById(`arrival${i}`).value);
    const burst = parseInt(document.getElementById(`burst${i}`).value);
    processes.push({ id: i + 1, arrival, burst });
  }

  // Sort by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let totalWT = 0, totalTAT = 0, totalRT = 0;
  let resultHTML = `
    <h2>FCFS Scheduling Results</h2>
    <table>
      <tr>
        <th>Process</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
        <th>Completion Time (CT)</th>
        <th>Waiting Time (WT)</th>
        <th>Turnaround Time (TAT)</th>
        <th>Response Time (RT)</th>
      </tr>
  `;

  processes.forEach(p => {
    const startTime = Math.max(currentTime, p.arrival);
    const ct = startTime + p.burst;
    const wt = startTime - p.arrival;
    const tat = ct - p.arrival;
    const rt = wt; // In FCFS, RT = WT

    totalWT += wt;
    totalTAT += tat;
    totalRT += rt;

    currentTime = ct;

    resultHTML += `
      <tr>
        <td>P${p.id}</td>
        <td>${p.arrival}</td>
        <td>${p.burst}</td>
        <td>${ct}</td>
        <td>${wt}</td>
        <td>${tat}</td>
        <td>${rt}</td>
      </tr>
    `;
  });

  const avgWT = (totalWT / num).toFixed(2);
  const avgTAT = (totalTAT / num).toFixed(2);
  const avgRT = (totalRT / num).toFixed(2);

  resultHTML += `
    </table>
    <h3>Average Waiting Time: ${avgWT}</h3>
    <h3>Average Turnaround Time: ${avgTAT}</h3>
    <h3>Average Response Time: ${avgRT}</h3>
  `;

  document.getElementById('result').innerHTML = resultHTML;
}
