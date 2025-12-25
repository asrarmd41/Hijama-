console.log("Hijama Clinic Website Loaded");

// 🔗 LIVE BACKEND BASE URL (Render)
const BASE_URL = "https://hijama-backend.onrender.com";

// Load therapies from backend
function loadTherapies() {
  fetch(`${BASE_URL}/therapies`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load therapies");
      return res.json();
    })
    .then(data => {
      const list = document.getElementById("therapyList");
      const select = document.getElementById("therapy");

      list.innerHTML = "";
      select.innerHTML = "<option value=''>Select Therapy</option>";

      data.forEach(t => {
        list.innerHTML += `
          <li>
            <strong>${t.name}</strong> – ₹${t.price}<br>
            <small>${t.description || "No description available"}</small>
          </li>
        `;

        select.innerHTML += `<option value="${t.name}">${t.name}</option>`;
      });
    })
    .catch(err => {
      console.error(err);
      alert("Unable to load therapies. Please try again later.");
    });
}

// Book appointment
function bookAppointment() {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const therapyInput = document.getElementById("therapy");
  const dateInput = document.getElementById("date");

  if (!nameInput.value || !phoneInput.value || !therapyInput.value || !dateInput.value) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      phone: phoneInput.value,
      therapy: therapyInput.value,
      date: dateInput.value
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    })
    .then(() => {
      alert("✅ Appointment booked successfully");
      nameInput.value = "";
      phoneInput.value = "";
      therapyInput.value = "";
      dateInput.value = "";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Failed to book appointment. Try again.");
    });
}

// Load therapies on page load
loadTherapies();
