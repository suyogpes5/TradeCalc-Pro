// ========================================
// TRADECALC PRO
// SCRIPT.JS - PART 1
// ========================================

// ---------- SIDEBAR ----------

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// ---------- PAGE NAVIGATION ----------

const navButtons =
  document.querySelectorAll(".nav-btn");

const pages =
  document.querySelectorAll(".page");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pageId =
      btn.dataset.page;

    pages.forEach((page) => {
      page.classList.remove(
        "active-page"
      );
    });

    navButtons.forEach((b) => {
      b.classList.remove("active");
    });

    document
      .getElementById(pageId)
      .classList.add(
        "active-page"
      );

    btn.classList.add("active");

    closeSidebar();
  });
});

// ========================================
// SIMPLE CALCULATOR
// ========================================

const display =
  document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value =
    display.value.slice(0, -1);
}

function calculate() {
  try {
    if (
      display.value.trim() === ""
    ) {
      return;
    }

    let expression =
      display.value;

    expression =
      expression.replace(
        /×/g,
        "*"
      );

    expression =
      expression.replace(
        /÷/g,
        "/"
      );

    display.value =
      eval(expression);

  } catch {
    display.value = "Error";
  }
}

// ========================================
// KEYBOARD SUPPORT
// ========================================

document.addEventListener(
  "keydown",
  (e) => {

    const isSimplePage =
      document
        .getElementById(
          "simplePage"
        )
        .classList.contains(
          "active-page"
        );

    if (!isSimplePage) {
      return;
    }

    const key = e.key;

    if (
      (key >= "0" &&
        key <= "9") ||
      key === "." ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/" ||
      key === "%"
    ) {
      appendValue(key);
    }

    if (key === "Enter") {
      e.preventDefault();
      calculate();
    }

    if (key === "Backspace") {
      deleteLast();
    }

    if (key === "Escape") {
      clearDisplay();
    }
  }
);

// ========================================
// ADVANCED CALCULATOR
// ========================================

const advInput =
  document.getElementById(
    "advInput"
  );

const advResult =
  document.getElementById(
    "advResult"
  );

function getNumber() {
  return Number(
    advInput.value
  );
}

function showResult(value) {
  if (
    value === Infinity ||
    isNaN(value)
  ) {
    advResult.innerHTML =
      "Invalid Input";
    return;
  }

  advResult.innerHTML =
    value;
}

// x²
function square() {
  const n = getNumber();

  showResult(n * n);
}

// √x
function sqrtCalc() {
  const n = getNumber();

  if (n < 0) {
    advResult.innerHTML =
      "Cannot calculate √ of negative number";
    return;
  }

  showResult(
    Math.sqrt(n)
      .toFixed(6)
  );
}

// log10
function logCalc() {
  const n = getNumber();

  if (n <= 0) {
    advResult.innerHTML =
      "Enter a positive number";
    return;
  }

  showResult(
    Math.log10(n)
      .toFixed(6)
  );
}

// sin
function sinCalc() {
  const n = getNumber();

  const radians =
    n *
    (Math.PI / 180);

  showResult(
    Math.sin(radians)
      .toFixed(6)
  );
}

// cos
function cosCalc() {
  const n = getNumber();

  const radians =
    n *
    (Math.PI / 180);

  showResult(
    Math.cos(radians)
      .toFixed(6)
  );
}

// tan
function tanCalc() {
  const n = getNumber();

  const radians =
    n *
    (Math.PI / 180);

  showResult(
    Math.tan(radians)
      .toFixed(6)
  );
}

// π
function showPi() {
  showResult(
    Math.PI.toFixed(10)
  );
}

// Factorial
function factorialCalc() {

  let n =
    getNumber();

  if (
    n < 0 ||
    !Number.isInteger(n)
  ) {
    advResult.innerHTML =
      "Enter a positive integer";
    return;
  }

  let fact = 1;

  for (
    let i = 1;
    i <= n;
    i++
  ) {
    fact *= i;
  }

  showResult(fact);
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatCurrency(
  amount
) {
  return Number(
    amount
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );
}

// ========================================
// TRADECALC PRO
// SCRIPT.JS - PART 2
// FOREX TOOLS
// ========================================

// ========================================
// PIP CALCULATOR
// ========================================

function calculatePips() {
  const multiplier =
    Number(
      document.getElementById("pair")
        .value
    );

  const entry =
    Number(
      document.getElementById(
        "entry"
      ).value
    );

  const exit =
    Number(
      document.getElementById(
        "exit"
      ).value
    );

  const lotSize =
    Number(
      document.getElementById(
        "lotSize"
      ).value
    );

  const usdRate =
    Number(
      document.getElementById(
        "usdRate"
      ).value
    );

  const position =
    document.querySelector(
      'input[name="position"]:checked'
    ).value;

  const result =
    document.getElementById(
      "pipResult"
    );

  if (
    !entry ||
    !exit ||
    !lotSize
  ) {
    result.innerHTML =
      "Please fill all fields.";
    result.className =
      "result";
    return;
  }

  let pips = 0;

  if (position === "buy") {
    pips =
      (exit - entry) *
      multiplier;
  } else {
    pips =
      (entry - exit) *
      multiplier;
  }

  pips =
    Number(
      pips.toFixed(1)
    );

  const usd =
    Math.abs(
      pips *
        10 *
        lotSize
    );

  const inr =
    usd * usdRate;

  if (pips >= 0) {
    result.className =
      "result profit";

    result.innerHTML = `
      🟢 Pips :
      ${pips}

      <br><br>

      💵 Profit :
      $${usd.toFixed(2)}

      <br><br>

      🇮🇳 Profit :
      ₹${formatCurrency(
        inr
      )}
    `;
  } else {
    result.className =
      "result loss";

    result.innerHTML = `
      🔴 Pips :
      ${pips}

      <br><br>

      💵 Loss :
      $${usd.toFixed(2)}

      <br><br>

      🇮🇳 Loss :
      ₹${formatCurrency(
        inr
      )}
    `;
  }
}

// ========================================
// PIP TO USD / INR
// ========================================

function convertPips() {
  const pips =
    Number(
      document.getElementById(
        "converterPips"
      ).value
    );

  const lot =
    Number(
      document.getElementById(
        "converterLot"
      ).value
    );

  const rate =
    Number(
      document.getElementById(
        "converterRate"
      ).value
    );

  const result =
    document.getElementById(
      "converterResult"
    );

  if (
    !pips ||
    !lot
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const usd =
    pips *
    10 *
    lot;

  const inr =
    usd *
    rate;

  result.innerHTML = `
      💵 USD Value :
      $${usd.toFixed(2)}

      <br><br>

      🇮🇳 INR Value :
      ₹${formatCurrency(
        inr
      )}
  `;
}

// ========================================
// POSITION SIZE
// ========================================

function calculatePosition() {

  const balance =
    Number(
      document.getElementById(
        "positionBalance"
      ).value
    );

  const risk =
    Number(
      document.getElementById(
        "positionRisk"
      ).value
    );

  const stopLoss =
    Number(
      document.getElementById(
        "positionSL"
      ).value
    );

  const result =
    document.getElementById(
      "positionResult"
    );

  if (
    !balance ||
    !risk ||
    !stopLoss
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const riskAmount =
    (balance *
      risk) /
    100;

  const lotSize =
    riskAmount /
    (
      stopLoss *
      10
    );

  result.innerHTML = `
      💰 Risk Amount :
      ₹${formatCurrency(
        riskAmount
      )}

      <br><br>

      📈 Suggested Lot Size :
      ${lotSize.toFixed(
        2
      )} Lots
  `;
}

// ========================================
// MARGIN CALCULATOR
// ========================================

function calculateMargin() {

  const lot =
    Number(
      document.getElementById(
        "marginLot"
      ).value
    );

  const price =
    Number(
      document.getElementById(
        "marginPrice"
      ).value
    );

  const leverage =
    Number(
      document.getElementById(
        "marginLeverage"
      ).value
    );

  const result =
    document.getElementById(
      "marginResult"
    );

  if (
    !lot ||
    !price ||
    !leverage
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const contract =
    100000;

  const margin =
    (
      lot *
      contract *
      price
    ) /
    leverage;

  result.innerHTML = `
      🏦 Required Margin :

      ₹${formatCurrency(
        margin
      )}
  `;
}

// ========================================
// RISK : REWARD
// ========================================

function calculateRR() {

  const entry =
    Number(
      document.getElementById(
        "rrEntry"
      ).value
    );

  const stop =
    Number(
      document.getElementById(
        "rrSL"
      ).value
    );

  const target =
    Number(
      document.getElementById(
        "rrTP"
      ).value
    );

  const result =
    document.getElementById(
      "rrResult"
    );

  if (
    !entry ||
    !stop ||
    !target
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const risk =
    Math.abs(
      entry -
        stop
    );

  const reward =
    Math.abs(
      target -
        entry
    );

  const rr =
    reward /
    risk;

  result.innerHTML = `
      Risk :
      ${risk}

      <br><br>

      Reward :
      ${reward}

      <br><br>

      🎯 R:R =
      1 :
      ${rr.toFixed(2)}
  `;
}

// ========================================
// PROFIT / LOSS
// ========================================

function calculateProfit() {

  const entry =
    Number(
      document.getElementById(
        "profitEntry"
      ).value
    );

  const exit =
    Number(
      document.getElementById(
        "profitExit"
      ).value
    );

  const qty =
    Number(
      document.getElementById(
        "profitQty"
      ).value
    );

  const result =
    document.getElementById(
      "profitResult"
    );

  if (
    !entry ||
    !exit ||
    !qty
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const pnl =
    (
      exit -
      entry
    ) *
    qty;

  if (pnl >= 0) {
    result.className =
      "result profit";
  } else {
    result.className =
      "result loss";
  }

  result.innerHTML = `
      💹 Profit/Loss :

      ₹${formatCurrency(
        pnl
      )}
  `;
}

// ========================================
// CURRENCY CONVERTER
// ========================================

function convertCurrency() {

  const usd =
    Number(
      document.getElementById(
        "usdAmount"
      ).value
    );

  const rate =
    Number(
      document.getElementById(
        "usdInrRate"
      ).value
    );

  const result =
    document.getElementById(
      "currencyResult"
    );

  if (
    !usd ||
    !rate
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const inr =
    usd *
    rate;

  result.innerHTML = `
      💵 USD :
      $${usd.toFixed(2)}

      <br><br>

      🇮🇳 INR :
      ₹${formatCurrency(
        inr
      )}
  `;
}

// ========================================
// GOLD CALCULATOR
// ========================================

function calculateGold() {

  const entry =
    Number(
      document.getElementById(
        "goldEntry"
      ).value
    );

  const exit =
    Number(
      document.getElementById(
        "goldExit"
      ).value
    );

  const lot =
    Number(
      document.getElementById(
        "goldLot"
      ).value
    );

  const result =
    document.getElementById(
      "goldResult"
    );

  if (
    !entry ||
    !exit ||
    !lot
  ) {
    result.innerHTML =
      "Please enter values.";
    return;
  }

  const points =
    (
      exit -
      entry
    ) *
    100;

  const usd =
    Math.abs(
      points *
        lot
    );

  if (points >= 0) {
    result.className =
      "result profit";
  } else {
    result.className =
      "result loss";
  }

  result.innerHTML = `
      🥇 Points :
      ${points.toFixed(
        2
      )}

      <br><br>

      💵 Value :
      $${usd.toFixed(2)}
  `;
}
// ========================================
// TRADECALC PRO
// SCRIPT.JS - PART 3
// ========================================

// ========================================
// COMPOUNDING + SIP CALCULATOR
// ========================================

function calculateCompound() {
  const capital = Number(
    document.getElementById("capital").value
  );

  const monthlyReturn = Number(
    document.getElementById("monthlyReturn").value
  );

  const months = Number(
    document.getElementById("months").value
  );

  const sipAmount = Number(
    document.getElementById("sipAmount").value
  );

  const sipReturn = Number(
    document.getElementById("sipReturn").value
  );

  const sipYears = Number(
    document.getElementById("sipYears").value
  );

  const result =
    document.getElementById(
      "compoundResult"
    );

  let html = "";

  // ---------- LUMP SUM ----------
  if (
    capital > 0 &&
    monthlyReturn > 0 &&
    months > 0
  ) {
    const finalValue =
      capital *
      Math.pow(
        1 +
          monthlyReturn / 100,
        months
      );

    const profit =
      finalValue -
      capital;

    html += `
      <h3>
        📊 Lump Sum Growth
      </h3>

      <br>

      Starting Capital:
      ₹${formatCurrency(
        capital
      )}

      <br><br>

      Final Value:
      ₹${formatCurrency(
        finalValue
      )}

      <br><br>

      Profit:
      ₹${formatCurrency(
        profit
      )}

      <br><br>
      <hr>
      <br>
    `;
  }

  // ---------- SIP ----------
  if (
    sipAmount > 0 &&
    sipReturn > 0 &&
    sipYears > 0
  ) {
    const monthlyRate =
      sipReturn /
      12 /
      100;

    const totalMonths =
      sipYears * 12;

    const futureValue =
      sipAmount *
      (
        (
          Math.pow(
            1 +
              monthlyRate,
            totalMonths
          ) - 1
        ) /
        monthlyRate
      ) *
      (
        1 +
        monthlyRate
      );

    const invested =
      sipAmount *
      totalMonths;

    const gain =
      futureValue -
      invested;

    html += `
      <h3>
        📈 SIP Growth
      </h3>

      <br>

      Total Invested:
      ₹${formatCurrency(
        invested
      )}

      <br><br>

      Final Value:
      ₹${formatCurrency(
        futureValue
      )}

      <br><br>

      Wealth Gained:
      ₹${formatCurrency(
        gain
      )}
    `;
  }

  if (html === "") {
    result.innerHTML =
      "Please enter calculator values.";
  } else {
    result.innerHTML =
      html;
  }
}

// ========================================
// TRADING JOURNAL
// ========================================

const STORAGE_KEY =
  "tradecalcProJournal";

loadJournal();

function saveTradeJournal() {
  const date =
    document.getElementById(
      "tradeDate"
    ).value;

  const pair =
    document.getElementById(
      "tradePair"
    ).value;

  const type =
    document.getElementById(
      "tradeType"
    ).value;

  const pnl =
    Number(
      document.getElementById(
        "tradePnL"
      ).value
    );

  const notes =
    document.getElementById(
      "tradeNotes"
    ).value;

  if (
    !date ||
    !pair ||
    isNaN(pnl)
  ) {
    alert(
      "Please fill all required fields."
    );
    return;
  }

  const trade = {
    id: Date.now(),
    date,
    pair,
    type,
    pnl,
    notes
  };

  let journal =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      )
    ) || [];

  journal.unshift(
    trade
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      journal
    )
  );

  clearJournalForm();
  loadJournal();
}

// ========================================
// LOAD JOURNAL
// ========================================

function loadJournal() {
  const journalList =
    document.getElementById(
      "journalList"
    );

  const stats =
    document.getElementById(
      "journalStats"
    );

  if (
    !journalList ||
    !stats
  ) {
    return;
  }

  const journal =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      )
    ) || [];

  journalList.innerHTML =
    "";

  if (
    journal.length === 0
  ) {
    stats.innerHTML =
      "No trades yet.";
    return;
  }

  let totalTrades =
    journal.length;

  let winningTrades = 0;
  let losingTrades = 0;
  let netProfit = 0;

  journal.forEach(
    (trade) => {

      netProfit +=
        trade.pnl;

      if (
        trade.pnl >= 0
      ) {
        winningTrades++;
      } else {
        losingTrades++;
      }

      const card =
        document.createElement(
          "div"
        );

      card.classList.add(
        "result"
      );

      card.style.marginBottom =
        "20px";

      card.innerHTML = `
          📅 ${trade.date}

          <br><br>

          💱 ${trade.pair}

          <br><br>

          ${trade.type}

          <br><br>

          ${
            trade.pnl >= 0
              ? "🟢"
              : "🔴"
          }

          ₹${formatCurrency(
            trade.pnl
          )}

          <br><br>

          📝 ${trade.notes}

          <br><br>

          <button
            onclick="deleteTrade(${trade.id})"
          >
            Delete
          </button>
      `;

      journalList.appendChild(
        card
      );
    }
  );

  const winRate =
    (
      (winningTrades /
        totalTrades) *
      100
    ).toFixed(2);

  stats.innerHTML = `
      📊 Total Trades:
      ${totalTrades}

      <br><br>

      🟢 Winning Trades:
      ${winningTrades}

      <br><br>

      🔴 Losing Trades:
      ${losingTrades}

      <br><br>

      🎯 Win Rate:
      ${winRate}%

      <br><br>

      💰 Net P/L:
      ₹${formatCurrency(
        netProfit
      )}
  `;
}

// ========================================
// DELETE TRADE
// ========================================

function deleteTrade(
  id
) {
  let journal =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      )
    ) || [];

  journal =
    journal.filter(
      (trade) =>
        trade.id !== id
    );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      journal
    )
  );

  loadJournal();
}

// ========================================
// CLEAR FORM
// ========================================

function clearJournalForm() {
  document.getElementById(
    "tradeDate"
  ).value = "";

  document.getElementById(
    "tradePair"
  ).value = "";

  document.getElementById(
    "tradePnL"
  ).value = "";

  document.getElementById(
    "tradeNotes"
  ).value = "";

  document.getElementById(
    "tradeType"
  ).selectedIndex = 0;
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadJournal();
  }
);
