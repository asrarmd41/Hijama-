console.log("Hijama Clinic Website Loaded");

function loadTherapies() {
  fetch("http://localhost:5000/therapies")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("therapyList");
      const select = document.getElementById("therapy");

      list.innerHTML = "";
      select.innerHTML = "";

      data.forEach(t => {
        list.innerHTML += `
          <li>
            <strong>${t.name}</strong> – ₹${t.price}<br>
            <small>${t.description || "No description available"}</small>
          </li>
        `;

        select.innerHTML += `<option>${t.name}</option>`;
      });
    });
}


function bookAppointment() {
  fetch("http://localhost:5000/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      phone: phone.value,
      therapy: therapy.value,
      date: date.value
    })
  })
  .then(() => alert("Appointment booked successfully"));
}

loadTherapies();
