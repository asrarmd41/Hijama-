console.log("Hijama Clinic Website Loaded");

// ✅ LIVE BACKEND (Render)
const BASE_URL = "https://hijama-backend.onrender.com";

// --------------------
// LOAD THERAPIES
// --------------------
function loadTherapies() {
  fetch(`${BASE_URL}/therapies`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load therapies");
      return res.json();
    })
    .then(data => {
      const select = document.getElementById("therapy");
      select.innerHTML = `<option value="">Select Therapy</option>`;

      data.forEach(t => {
        const option = document.createElement("option");
        option.value = t.name;
        option.textContent = `${t.name} – ₹${t.price}`;
        select.appendChild(option);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Unable to load therapies. Please refresh.");
    });
}

// --------------------
// BOOK APPOINTMENT
// --------------------
function bookAppointment() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const therapy = document.getElementById("therapy").value;
  const date = document.getElementById("date").value;

  if (!name || !phone || !therapy || !date) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, therapy, date })
  })
    .then(res => {
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    })
    .then(() => {
      alert("✅ Appointment booked successfully!");

      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("therapy").value = "";
      document.getElementById("date").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Failed to book appointment");
    });
}

// AUTO LOAD
loadTherapies();
