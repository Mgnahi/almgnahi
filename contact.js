const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = `form-status form-status--${type}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI: sending state
  sendBtn.disabled = true;
  setStatus("Sending...", "loading");

  try {
    const formData = new FormData(form);

    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      form.reset();
      setStatus("✅ Message sent! I'll get back to you soon.", "success");
    } else {
      setStatus("❌ Something went wrong. Please try again.", "error");
    }
  } catch (err) {
    setStatus("❌ Network error. Please try again.", "error");
  } finally {
    sendBtn.disabled = false;
  }
});