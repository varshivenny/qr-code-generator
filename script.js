let qr;

// DOM elements
const input = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const sizeSelect = document.getElementById('size-select');
const canvasEl = document.getElementById('qr-code');
const themeToggle = document.getElementById('theme-toggle');

function generateQR() {
  const text = input.value.trim();
  const size = parseInt(sizeSelect.value);

  if (!text) {
    alert("Enter something first!");
    return;
  }

  if (!qr) {
    qr = new QRious({
      element: canvasEl,
      size: size,
      value: text
    });
  } else {
    qr.set({ value: text, size: size });
  }

  downloadBtn.disabled = false;
}

function downloadQR() {
  const dataURL = canvasEl.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = `qr_${Date.now()}.png`;
  a.click();
}

// Dark mode toggle
themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;

  document.body.classList.toggle("dark", isDark);
  document.querySelector(".container").classList.toggle("dark", isDark);
  input.classList.toggle("dark", isDark);
  sizeSelect.classList.toggle("dark", isDark);

  generateBtn.classList.toggle("dark", isDark);
  downloadBtn.classList.toggle("dark", isDark);
});

// Events
generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);

// Enter key generates
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateQR();
});

