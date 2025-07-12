// 🌐 Backend API Base URL
const API_BASE = "http://localhost:8080"; // Change if your backend runs elsewhere

// 🔐 SESSION UTILITIES
function saveSession(upiId) {
  localStorage.setItem("upiId", upiId);
}

function getSession() {
  return localStorage.getItem("upiId");
}

function logout() {
  localStorage.removeItem("upiId");
  window.location.href = "index.html";
}

// ✅ LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const upiId = document.getElementById("loginUpiId").value.trim();
    const pin = document.getElementById("loginPin").value.trim();

    if (!upiId || !pin) return alert("Please fill all fields.");

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiId, pin }),
      });

      if (res.ok) {
        alert("✅ Login successful");
        saveSession(upiId);
        window.location.href = "balance.html";
      } else {
        alert("❌ Invalid UPI ID or PIN");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("🚫 Network error during login");
    }
  });
}

// ✅ REGISTER FORM
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const bank = document.getElementById("bank").value;
    const upiId = document.getElementById("upiId").value.trim();
    const pin = document.getElementById("pin").value.trim();

    if (!name || !phone || !bank || !upiId || !pin) {
      return alert("Please fill all fields.");
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/registerAndLink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, bank, upiId, pin }),
      });

      if (res.ok) {
        alert("✅ Registered successfully!");
        saveSession(upiId);
        window.location.href = "balance.html";
      } else {
        const msg = await res.text();
        alert("❌ Registration failed: " + msg);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("🚫 Network error during registration");
    }
  });
}

// ✅ BALANCE PAGE
const balanceText = document.getElementById("balanceText");
if (balanceText) {
  const upiId = getSession();
  if (!upiId) {
    window.location.href = "index.html";
  } else {
    fetch(`${API_BASE}/api/balance/${upiId}`)
      .then(res => res.json())
      .then(data => {
        balanceText.textContent = `₹ ${data.balance}`;
      })
      .catch(err => {
        console.error("Balance error:", err);
        balanceText.textContent = "⚠️ Failed to load balance";
      });
  }
}

// ✅ TRANSFER FORM
const transferForm = document.getElementById("transferForm");
if (transferForm) {
  transferForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fromUpiId = getSession();
    const toUpiId = document.getElementById("toUpiId").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const pin = document.getElementById("sendPin").value.trim();

    if (!fromUpiId || !toUpiId || !amount || !pin) {
      return alert("Fill all fields.");
    }

    try {
      const res = await fetch(`${API_BASE}/api/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromUpiId, toUpiId, amount, pin }),
      });

      if (res.ok) {
        alert("✅ Transfer successful");
        window.location.href = "balance.html";
      } else {
        const errText = await res.text();
        alert("❌ Transfer failed: " + errText);
      }
    } catch (err) {
      console.error("Transfer error:", err);
      alert("🚫 Network error during transfer");
    }
  });
}

// ✅ TRANSACTION HISTORY
const transactionHistory = document.getElementById("transactionHistory");
if (transactionHistory) {
  const upiId = getSession();
  if (!upiId) {
    window.location.href = "index.html";
  } else {
    fetch(`${API_BASE}/api/history/${upiId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          transactionHistory.innerHTML = "<p>No transactions yet.</p>";
        } else {
          transactionHistory.innerHTML = data.map(txn => {
            return `<p>
              <strong>${txn.type}</strong> ₹${txn.amount} 
              ${txn.toUpiId ? `to <em>${txn.toUpiId}</em>` : ""}
              <br/><small>${txn.timestamp}</small>
            </p>`;
          }).join("");
        }
      })
      .catch(err => {
        console.error("History error:", err);
        transactionHistory.innerHTML = "<p>⚠️ Error fetching history</p>";
      });
  }
}
