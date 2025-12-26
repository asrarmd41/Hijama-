console.log("Hijama Clinic Website Loaded");

// ✅ LIVE BACKEND (Render)
const BASE_URL = "https://hijama-backend.onrender.com";

// --------------------
// BOOK APPOINTMENT
// --------------------
function bookAppointment() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;

  // Validation
  if (!name || !phone || !date) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, phone, date })
  })
    .then(res => {
      if (!res.ok) throw new Error("Booking failed");
      return res.text();
    })
    .then(() => {
      alert("✅ Appointment booked successfully!");

      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("date").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Failed to book appointment");
    });
}
