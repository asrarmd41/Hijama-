// ================= LOGIN =================

function login() {
  const user = document.getElementById("user");
  const pass = document.getElementById("pass");

  fetch("http://localhost:5000/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        loadAppointments();
      } else {
        alert("Invalid credentials");
      }
    });
}

// ================= APPOINTMENTS =================

function loadAppointments() {
  fetch("http://localhost:5000/appointments")
    .then(res => res.json())
    .then(data => {
      document.getElementById("total").innerText = data.length;

      const today = new Date().toISOString().split("T")[0];
      document.getElementById("today").innerText =
        data.filter(a => a.date === today).length;

      const tbody = document.getElementById("appointmentsTable");
      tbody.innerHTML = "";

      data.forEach(a => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${a.name}</td>
          <td>${a.phone}</td>
          <td>${a.date}</td>
          <td>${a.status}</td>
          <td>
            <button class="approve-btn" onclick="approve('${a._id}')">Approve</button>
            <button class="delete-btn" onclick="removeApp('${a._id}')">Delete</button>
          </td>
        `;

        tbody.appendChild(row);
      });
    });
}

function approve(id) {
  fetch(`http://localhost:5000/appointments/${id}`, {
    method: "PUT"
  }).then(() => loadAppointments());
}

function removeApp(id) {
  if (confirm("Delete this appointment?")) {
    fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE"
    }).then(() => loadAppointments());
  }
}

// ================= LOGOUT =================

function logout() {
  location.reload();
}
