// ===============================
// USER PERMISSION CONFIG
// ===============================

const users = {
  "UserA": {
    "3D_DAI": true,
    "3D_TWANT": true,
    "2D": true,
    limit: 100000
  },

  "UserB": {
    "3D_DAI": false,
    "3D_TWANT": false,
    "2D": true,
    limit: 50000
  }
};

// ===============================
// CHECK PERMISSION
// ===============================

function canBet(username, type, amount) {
  const user = users[username];

  if (!user) {
    return { ok: false, reason: "User မရှိပါ" };
  }

  if (!user[type]) {
    return { ok: false, reason: `${type} ထိုးခွင့်မရှိပါ` };
  }

  if (amount > user.limit) {
    return { ok: false, reason: "Limit ကျော်နေပါတယ်" };
  }

  return { ok: true, reason: "OK" };
}

// ===============================
// ADMIN BET ACTION
// ===============================

function adminBet(username, type, amount) {
  const check = canBet(username, type, amount);

  if (!check.ok) {
    console.log("❌ Reject:", check.reason);
    return false;
  }

  console.log(`✅ ${username} ကို ${type} ${amount} ထိုးပြီးပါပြီ`);
  return true;
}

// ===============================
// TEST CASES
// ===============================

adminBet("UserB", "3D_DAI", 1000);   // ❌
adminBet("UserB", "2D", 1000);       // ✅
adminBet("UserA", "3D_TWANT", 200000); // ❌ limit
adminBet("UserA", "3D_TWANT", 5000);   // ✅
