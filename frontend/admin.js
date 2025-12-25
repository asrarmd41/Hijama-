// ================= LOGIN =================

function login() {
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
      loadTherapies();
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

      const tbody = document.getElementById("tableBody");
      tbody.innerHTML = "";

      data.forEach(a => {
        tbody.innerHTML += `
          <tr>
            <td>${a.name}</td>
            <td>${a.phone}</td>
            <td>${a.therapy}</td>
            <td>${a.date}</td>
            <td>${a.status}</td>
            <td>
              <button onclick="approve('${a._id}')">Approve</button>
              <button onclick="removeApp('${a._id}')">Delete</button>
            </td>
          </tr>
        `;
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

// ================= THERAPIES =================

function loadTherapies() {
  fetch("http://localhost:5000/therapies")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("therapyTable");
      table.innerHTML = "";

      data.forEach(t => {
        table.innerHTML += `
          <tr>
            <td>${t.name}</td>
            <td>₹${t.price}</td>
            <td>${t.description}</td>
            <td>
              <button onclick="deleteTherapy('${t._id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

function addTherapy() {
  console.log("Add Therapy clicked");

  const name = document.getElementById("tname").value;
  const price = document.getElementById("tprice").value;
  const description = document.getElementById("tdesc").value;

  if (!name || !price) {
    alert("Please fill therapy name and price");
    return;
  }

  fetch("http://localhost:5000/therapies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      price: price,
      description: description
    })
  })
  .then(res => res.text())
  .then(msg => {
    console.log(msg);

    document.getElementById("tname").value = "";
    document.getElementById("tprice").value = "";
    document.getElementById("tdesc").value = "";

    loadTherapies();
  });
}

function deleteTherapy(id) {
  fetch(`http://localhost:5000/therapies/${id}`, {
    method: "DELETE"
  }).then(() => loadTherapies());
}

// ================= LOGOUT =================

function logout() {
  location.reload();
}
