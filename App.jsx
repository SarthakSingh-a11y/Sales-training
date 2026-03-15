import { useState } from "react";

// ─── ADMIN NOTIFICATION CONFIG ────────────────────────────────────────────────
// ✏️  Change this to your WhatsApp number (country code + number, no + or spaces)
//     India example:  "919876543210"
const ADMIN = {
  whatsappNumber: "919336286116",
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const PHASE_CODES = {
  INITIAL: "DMH-INIT",
  DAY1:    "DMH-DAY1",
  DAY2:    "DMH-DAY2",
  DAY3:    "DMH-DAY3",
  DAY4:    "DMH-DAY4",
  DAY5:    "DMH-DAY5",
  DAY6:    "DMH-DAY6",
  DAY7:    "DMH-DAY7",
  FINAL:   "DMH-FINAL",
};

const PHASES = [
  { key: "INITIAL", label: "Initial Task",             icon: "🎯", short: "Init"  },
  { key: "DAY1",    label: "Day 1 — Training Videos",  icon: "🎬", short: "Day 1" },
  { key: "DAY2",    label: "Day 2 — Interview I",      icon: "🎤", short: "Day 2" },
  { key: "DAY3",    label: "Day 3 — Chat Analysis I",  icon: "💬", short: "Day 3" },
  { key: "DAY4",    label: "Day 4 — Chat Analysis II", icon: "📊", short: "Day 4" },
  { key: "DAY5",    label: "Day 5 — Theme Research",   icon: "🎨", short: "Day 5" },
  { key: "DAY6",    label: "Day 6 — Brand Stores",     icon: "🏪", short: "Day 6" },
  { key: "DAY7",    label: "Day 7 — Portfolio Review", icon: "📁", short: "Day 7" },
  { key: "FINAL",   label: "Second Interview",          icon: "🏆", short: "Final" },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0a0f1e; --navy-mid: #111827; --navy-light: #1a2540; --navy-card: #162035;
    --gold: #c9a227; --gold-light: #e8c84a; --gold-dim: #8a6e18;
    --white: #f0f4ff; --dim: #9aa5c4;
    --red-bg: #2a0808; --red-br: #7a1a1a; --red-tx: #ff6b6b;
    --grn-bg: #051a0f; --grn-br: #0d4a25; --grn-tx: #4ade80;
    --blue: #3b82f6; --orange: #f59e0b;
  }
  body { background:var(--navy); color:var(--white); font-family:'DM Sans',sans-serif; min-height:100vh; }
  ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:var(--navy-mid)} ::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:3px}
  @keyframes goldShine{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(201,162,39,.4)}50%{box-shadow:0 0 0 8px rgba(201,162,39,0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  @keyframes slideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeUp .45s ease both} .fade-up-1{animation:fadeUp .45s .1s ease both}
  .fade-up-2{animation:fadeUp .45s .2s ease both} .fade-up-3{animation:fadeUp .45s .3s ease both}
  .slide-in{animation:slideIn .35s ease both}

  /* WELCOME */
  .welcome-bg{background:radial-gradient(ellipse at 20% 20%,#1a2a50 0%,transparent 55%),radial-gradient(ellipse at 80% 80%,#1a1500 0%,transparent 55%),var(--navy);min-height:100vh}
  .gold-text{background:linear-gradient(90deg,#c9a227,#f0d060,#c9a227,#a07018);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShine 4s linear infinite}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,162,39,.1);border:1px solid rgba(201,162,39,.3);border-radius:100px;padding:6px 16px;font-size:13px;color:var(--gold-light);font-weight:500;letter-spacing:.05em}
  .timeline{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:28px 0}
  .tl-step{display:flex;align-items:center;gap:5px}
  .tl-badge{background:rgba(26,37,64,.8);border:1px solid rgba(201,162,39,.25);border-radius:8px;padding:7px 13px;font-size:13px;font-weight:500;color:var(--dim)}
  .tl-arrow{color:var(--gold-dim);font-size:13px}
  .login-card{background:var(--navy-card);border:1px solid rgba(201,162,39,.2);border-radius:20px;padding:40px;max-width:460px;width:100%;margin:0 auto;box-shadow:0 24px 80px rgba(0,0,0,.5)}
  .lbl{display:block;font-size:12px;font-weight:600;color:var(--dim);margin-bottom:7px;letter-spacing:.06em;text-transform:uppercase}
  .inp{width:100%;background:var(--navy-light);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:13px 15px;color:var(--white);font-size:15px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s}
  .inp:focus{border-color:var(--gold)} .inp::placeholder{color:rgba(154,165,196,.45)}
  .btn-gold{width:100%;background:linear-gradient(135deg,#c9a227,#e8c84a,#a07018);border:none;border-radius:10px;padding:15px;font-size:16px;font-weight:700;color:#0a0f1e;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;animation:pulseGold 2s infinite}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,162,39,.45)}
  .err-box{background:var(--red-bg);border:1px solid var(--red-br);border-radius:8px;padding:12px 15px;color:var(--red-tx);font-size:14px;margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .ok-box{background:var(--grn-bg);border:1px solid var(--grn-br);border-radius:10px;padding:16px 18px;color:var(--grn-tx);font-size:14px;display:flex;align-items:flex-start;gap:10px;line-height:1.6}

  /* DASHBOARD */
  .dash{display:flex;min-height:100vh}
  .sbar{width:256px;min-width:256px;background:var(--navy-card);border-right:1px solid rgba(201,162,39,.1);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto}
  .sbar-hdr{padding:22px 18px 18px;border-bottom:1px solid rgba(201,162,39,.1);background:linear-gradient(180deg,rgba(201,162,39,.06) 0%,transparent 100%)}
  .sbar-logo{font-family:'Playfair Display',serif;font-size:15px;color:var(--gold-light);font-weight:700;line-height:1.3}
  .sbar-sub{font-size:11px;color:var(--dim);letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
  .phase-nav{padding:10px 0;flex:1}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 18px;cursor:pointer;transition:all .2s;border-left:3px solid transparent}
  .nav-item:hover:not(.nav-locked){background:rgba(255,255,255,.04)}
  .nav-item.nav-active{background:rgba(201,162,39,.08);border-left-color:var(--gold)}
  .nav-item.nav-locked{opacity:.38;cursor:not-allowed}
  .nav-icon{font-size:15px;min-width:22px;text-align:center}
  .nav-label{font-size:12.5px;font-weight:500;color:var(--dim);line-height:1.3;flex:1}
  .nav-item.nav-active .nav-label{color:var(--gold-light)}
  .nav-status{font-size:13px;flex-shrink:0}
  .topbar{background:var(--navy-card);border-bottom:1px solid rgba(201,162,39,.1);padding:14px 28px;position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .tb-name{font-size:14px;font-weight:600;color:var(--white)}
  .prog-wrap{flex:1;max-width:300px}
  .prog-lbl{font-size:11px;color:var(--dim);margin-bottom:5px;display:flex;justify-content:space-between}
  .prog-track{height:5px;background:rgba(255,255,255,.07);border-radius:100px;overflow:hidden}
  .prog-fill{height:100%;background:linear-gradient(90deg,var(--gold-dim),var(--gold-light));border-radius:100px;transition:width .7s ease}

  /* CONTENT */
  .content{padding:36px 36px 64px;max-width:860px}
  .ph-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(201,162,39,.1);border:1px solid rgba(201,162,39,.2);border-radius:6px;padding:4px 11px;font-size:11px;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
  .ph-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--white);line-height:1.2;margin-bottom:10px}
  .ph-intro{font-size:15px;color:var(--dim);line-height:1.75}

  /* RULES BLOCK — FIRST */
  .rules-block{background:var(--red-bg);border:1px solid var(--red-br);border-radius:14px;padding:22px 24px;margin:22px 0 26px}
  .rules-title{font-size:13.5px;font-weight:700;color:var(--red-tx);text-transform:uppercase;letter-spacing:.07em;display:flex;align-items:center;gap:8px;margin-bottom:14px}
  .rule-row{display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:13.5px;color:#ffaaaa;line-height:1.55}
  .rule-row:last-child{border-bottom:none}
  .rule-dot{color:#ff4444;font-size:15px;flex-shrink:0;margin-top:1px}

  /* INSTRUCTION BLOCK */
  .instr-block{background:rgba(59,130,246,.07);border:1px solid rgba(59,130,246,.18);border-radius:12px;padding:18px 20px;margin-bottom:22px}
  .instr-title{font-size:12px;font-weight:700;color:#93c5fd;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px}
  .instr-row{display:flex;align-items:flex-start;gap:9px;padding:5px 0;font-size:13.5px;color:#bfdbfe;line-height:1.55}
  .instr-dot{color:#60a5fa;flex-shrink:0;margin-top:2px}

  /* CHECKLIST */
  .checklist{background:var(--navy-card);border:1px solid rgba(255,255,255,.06);border-radius:13px;padding:20px 22px;margin-bottom:16px}
  .cl-title{font-size:12px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}
  .cl-item{display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;border-radius:6px}
  .cl-item:last-child{border-bottom:none}
  .cl-item:hover .cl-label{color:var(--white)}
  .cl-box{width:20px;height:20px;border-radius:5px;border:2px solid rgba(201,162,39,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
  .cl-box.on{background:var(--gold);border-color:var(--gold)}
  .cl-label{font-size:13.5px;color:var(--dim);transition:color .15s}
  .cl-item.done .cl-label{color:var(--white);opacity:.55;text-decoration:line-through}

  /* BUTTONS */
  .btn-complete{width:100%;border:none;border-radius:12px;padding:16px;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;transition:all .25s;margin-top:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px}
  .btn-complete.ready{background:linear-gradient(135deg,#16a34a,#22c55e);color:white;animation:pulseGold 2s infinite}
  .btn-complete.ready:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(34,197,94,.4)}
  .btn-complete.locked-btn{background:rgba(255,255,255,.05);color:rgba(255,255,255,.3);cursor:not-allowed;border:1px dashed rgba(255,255,255,.1)}
  .btn-final{width:100%;background:linear-gradient(135deg,#c9a227,#e8c84a);border:none;border-radius:12px;padding:17px;color:#0a0f1e;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;animation:pulseGold 2s infinite}
  .btn-final:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(201,162,39,.5)}
  .btn-primary{background:linear-gradient(135deg,#1d4ed8,#3b82f6);border:none;border-radius:9px;padding:12px 22px;color:white;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
  .btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,130,246,.4)}

  /* CARDS */
  .submit-card{background:var(--navy-card);border:1px solid rgba(255,255,255,.06);border-radius:13px;padding:24px;margin-bottom:18px}
  .sc-title{font-size:15px;font-weight:600;color:var(--white);margin-bottom:18px}
  .ig{margin-bottom:16px}
  .divider{height:1px;background:rgba(255,255,255,.05);margin:18px 0}
  .store-card{background:var(--navy-card);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:16px 18px;margin-bottom:10px;display:flex;align-items:center;gap:12px;transition:all .2s}
  .store-card:hover{border-color:var(--gold)}
  .store-emoji{font-size:22px}
  .store-name{font-weight:600;color:var(--white);font-size:14px}
  .store-desc{font-size:12.5px;color:var(--dim);margin-top:2px}

  /* LOCK WARN */
  .lock-warn{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);border-radius:11px;padding:13px 17px;margin-bottom:16px;color:#fcd34d;font-size:13.5px;display:flex;align-items:center;gap:10px;line-height:1.5}

  /* NOTE BOTTOM */
  .note-bottom{background:linear-gradient(135deg,rgba(201,162,39,.08),rgba(201,162,39,.03));border:1px solid rgba(201,162,39,.2);border-radius:12px;padding:16px 18px;margin-top:28px;color:var(--gold-light);font-size:14px;line-height:1.6}

  /* COMPLETE BANNER */
  .done-banner{background:var(--grn-bg);border:1px solid var(--grn-br);border-radius:13px;padding:28px;margin-top:4px;text-align:center}
  .db-icon{font-size:48px;margin-bottom:12px;animation:float 3s infinite}
  .db-title{font-family:'Playfair Display',serif;font-size:24px;color:var(--grn-tx);margin-bottom:8px}
  .db-text{font-size:14px;color:rgba(74,222,128,.7);line-height:1.6}

  /* TABLE */
  .tbl{width:100%;border-collapse:collapse;font-size:12.5px;margin:10px 0}
  .tbl th{background:rgba(201,162,39,.1);color:var(--gold);padding:9px 12px;text-align:left;border:1px solid rgba(201,162,39,.15);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
  .tbl td{padding:9px 12px;border:1px solid rgba(255,255,255,.05);color:var(--dim)}

  /* LOCKED PHASE VIEW */
  .locked-phase{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;padding:40px;text-align:center}

  /* MOBILE */
  .mob-nav{display:none}
  .grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .dl-row{display:flex;align-items:center;gap:14px;border-radius:12px;padding:14px 18px;margin-bottom:10px;transition:all .2s}
  .dl-btn{border:none;border-radius:9px;padding:10px 18px;color:white;font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all .2s;flex-shrink:0;white-space:nowrap}
    @media(max-width:768px){
    /* ── Sidebar → mobile nav ── */
    .sbar{display:none}
    .mob-nav{display:flex;overflow-x:auto;background:var(--navy-card);border-bottom:1px solid rgba(201,162,39,.1);padding:8px 10px;gap:5px;scrollbar-width:none}
    .mob-nav::-webkit-scrollbar{display:none}
    .mob-btn{flex-shrink:0;padding:7px 11px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,.08);color:var(--dim);font-size:11.5px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .2s;white-space:nowrap}
    .mob-btn.active{background:rgba(201,162,39,.12);border-color:var(--gold);color:var(--gold-light)}

    /* ── Topbar ── */
    .topbar{padding:12px 14px;flex-wrap:wrap;gap:8px}
    .tb-name{font-size:13px;width:100%}
    .prog-wrap{max-width:100%;width:100%;order:3}

    /* ── Content area ── */
    .content{padding:20px 14px 56px}
    .ph-title{font-size:24px}
    .ph-intro{font-size:14px}
    .ph-badge{font-size:10px}

    /* ── Welcome screen ── */
    .login-card{padding:24px 16px}
    .timeline{gap:4px}
    .tl-badge{padding:5px 9px;font-size:11.5px}
    .tl-arrow{font-size:11px}

    /* ── All 2-col grids → single column ── */
    .grid-2col,
    .vid-grid,
    [style*="grid-template-columns: 1fr 1fr"],
    [style*="gridTemplateColumns: \"1fr 1fr\""],
    [style*="gridTemplateColumns:\"1fr 1fr\""] {
      grid-template-columns: 1fr !important;
    }

    /* ── Cards ── */
    .store-card{flex-wrap:wrap}
    .submit-card{padding:16px 14px}
    .checklist{padding:16px 14px}
    .rules-block{padding:16px 14px}
    .instr-block{padding:14px 14px}

    /* ── Tables → scrollable ── */
    .tbl{font-size:11px}
    .tbl th,.tbl td{padding:7px 8px}

    /* ── Buttons ── */
    .btn-complete{font-size:13.5px;padding:14px}
    .btn-final{font-size:14px;padding:14px}
    .btn-gold{font-size:15px;padding:14px}

    /* ── Completion / done banner ── */
    .done-banner{padding:20px 16px}
    .db-icon{font-size:38px}
    .db-title{font-size:20px}

    /* ── Note bottom ── */
    .note-bottom{font-size:13px;padding:14px 14px}

    /* ── Focus area grid (Day 7) ── */
    .focus-grid{grid-template-columns:1fr!important}
  }

  @media(max-width:600px){
    .dl-row{flex-wrap:wrap}
    .dl-btn{width:100%;margin-top:10px;justify-content:center}
  }
    .ph-title{font-size:21px}
    .content{padding:16px 12px 52px}
    .rules-block{padding:14px 12px}
    .tl-badge{padding:5px 8px;font-size:10.5px}
    .submit-card{padding:14px 12px}
    .checklist{padding:14px 12px}
    .topbar .tb-name{font-size:12px}
    .btn-complete{font-size:13px;padding:13px}
  }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function S() { return <style>{css}</style>; }

function CB({ label, checked, onChange }) {
  return (
    <div className={`cl-item ${checked ? "done" : ""}`} onClick={onChange}>
      <div className={`cl-box ${checked ? "on" : ""}`}>
        {checked && <span style={{ color: "#0a0f1e", fontSize: 11, fontWeight: 800 }}>✓</span>}
      </div>
      <span className="cl-label">{label}</span>
    </div>
  );
}

function RulesBlock({ title = "⚠️ IMPORTANT RULES — Read Before Proceeding", items }) {
  return (
    <div className="rules-block">
      <div className="rules-title"><span>🚨</span>{title}</div>
      {items.map((it, i) => (
        <div className="rule-row" key={i}><span className="rule-dot">🔴</span><span>{it}</span></div>
      ))}
    </div>
  );
}

function InstrBlock({ title = "📋 Instructions", items }) {
  return (
    <div className="instr-block">
      <div className="instr-title">{title}</div>
      {items.map((it, i) => (
        <div className="instr-row" key={i}><span className="instr-dot">▸</span><span>{it}</span></div>
      ))}
    </div>
  );
}

function NoteBottom({ children }) {
  return <div className="note-bottom"><span style={{ marginRight: 8 }}>💡</span>{children}</div>;
}

function DoneBanner({ phase }) {
  return (
    <div className="done-banner slide-in">
      <div className="db-icon">✅</div>
      <div className="db-title">{phase} — Completed!</div>
      <div className="db-text">You have marked this phase complete.<br />Contact Sarthak for the next code to unlock the next phase.</div>
    </div>
  );
}

function CompletionSection({ label, disabled, isDone, onClick, trainee, phaseLabel }) {
  const [waSent, setWaSent] = useState(false);

  const sendWA = () => {
    const time = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    const msg = encodeURIComponent(
      `✅ *DMH Training Portal — Phase Completed*\n\n` +
      `👤 *Trainee:* ${trainee}\n` +
      `📌 *Phase:* ${phaseLabel}\n` +
      `🕐 *Completed at:* ${time}\n\n` +
      `Please verify and take the next action.`
    );
    window.open(`https://wa.me/${ADMIN.whatsappNumber}?text=${msg}`, "_blank");
    setWaSent(true);
  };

  if (isDone) return null;

  return (
    <div style={{ marginTop: 20 }}>
      {/* WhatsApp notify button — only shown when tasks are done */}
      {!disabled && (
        <button
          onClick={sendWA}
          style={{
            width: "100%", marginBottom: 10,
            background: waSent
              ? "linear-gradient(135deg,#0a5c3e,#0e7a52)"
              : "linear-gradient(135deg,#128C7E,#25D366)",
            border: "none", borderRadius: 12, padding: "15px 20px",
            color: "white", fontSize: 15, fontWeight: 700,
            fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all .2s",
          }}
          onMouseOver={e => { if (!waSent) e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <span style={{ fontSize: 20 }}>💬</span>
          {waSent ? "WhatsApp Opened — Press Send!" : `Notify Sarthak on WhatsApp`}
          <span style={{ fontSize: 11, opacity: .75, fontWeight: 500 }}>
            {waSent ? "✅" : "(opens WhatsApp)"}
          </span>
        </button>
      )}

      {waSent && (
        <div style={{ marginBottom: 10, background: "rgba(37,211,102,.08)", border: "1px solid rgba(37,211,102,.2)", borderRadius: 9, padding: "10px 14px", fontSize: 13, color: "#86efac", lineHeight: 1.6 }}>
          ✅ WhatsApp opened. Make sure you <strong>press Send</strong> in WhatsApp to notify Sarthak.
        </div>
      )}

      {/* Green complete button */}
      <button
        className={`btn-complete ${disabled ? "locked-btn" : "ready"}`}
        onClick={disabled ? undefined : onClick}
        style={{ marginTop: 0 }}
      >
        {disabled
          ? <><span>🔒</span>Complete all required tasks above to unlock this button</>
          : <><span>✅</span>{label}</>}
      </button>
    </div>
  );
}

// ─── PHASES ───────────────────────────────────────────────────────────────────

function InitialPhase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("INITIAL");
  const [sLink, setSLink] = useState(appState.shopifyLink || "");
  const [sPass, setSPass] = useState(appState.shopifyPass || "");
  const [gLink, setGLink] = useState(appState.gravityLink || "");
  const [gPass, setGPass] = useState(appState.gravityPass || "");
  const [saved, setSaved] = useState(appState.initialSaved || false);

  const handleSave = () => {
    if (!sLink.trim() || !gLink.trim()) return;
    setAppState(s => ({ ...s, shopifyLink: sLink, shopifyPass: sPass, gravityLink: gLink, gravityPass: gPass, initialSaved: true }));
    setSaved(true);
  };

  const [waSent, setWaSent] = useState(false);

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      `🚨 *DMH Training Portal — New Submission*\n\n` +
      `👤 *Trainee:* ${trainee}\n` +
      `🕐 *Submitted:* ${new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}\n\n` +
      `🛍️ *Shopify Store*\n` +
      `URL: ${sLink}\n` +
      `Password: ${sPass || "Not provided"}\n\n` +
      `🌐 *Anti-Gravity Website*\n` +
      `URL: ${gLink}\n` +
      `Password: ${gPass || "Not provided"}\n\n` +
      `Please review. ✅`
    );
    window.open(`https://wa.me/${ADMIN.whatsappNumber}?text=${msg}`, "_blank");
    setWaSent(true);
  };

  return (
    <div className="content fade-up">
      <div className="ph-badge">🎯 Initial Task</div>
      <h1 className="ph-title">Before Training Begins</h1>
      <p className="ph-intro">Complete both tasks below before your training officially starts. These will be reviewed live in your Day 2 interview.</p>

      <RulesBlock items={[
        "You MUST complete BOTH tasks — Shopify Store AND Anti-Gravity Website",
        "Both must be live, accessible, and look complete — not half-done",
        "Provide correct passwords so Sarthak can access and review your stores",
        "Do NOT proceed further until Sarthak has confirmed both tasks",
        "Quality matters — these will be reviewed LIVE in your Day 2 interview",
        "Do not copy someone else's store or use templates without customization",
        "Clicking 'Mark Complete' below does NOT mean you get the next code automatically — Sarthak reviews first",
      ]} />

      <InstrBlock title="📋 What You Need to Build" items={[
        "Create a Shopify practice store using a free Shopify trial account",
        "Add products, collections, a homepage banner, and basic navigation menus",
        "Build an Anti-Gravity themed website using any website builder (Wix, WordPress, etc.)",
        "Both sites must look clean, professional, and properly set up",
        "Paste the live URL + access password for each site in the form below",
      ]} />

      <div className="grid-2col" style={{ marginBottom: 20 }}>
        {[{ e: "🛍️", t: "Shopify Store", d: "Practice e-commerce store on Shopify" }, { e: "🌐", t: "Anti-Gravity Website", d: "Custom site with Anti-Gravity theme" }].map(x => (
          <div key={x.t} className="store-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{x.e}</div>
            <div className="store-name">{x.t}</div>
            <div className="store-desc" style={{ marginTop: 5 }}>{x.d}</div>
          </div>
        ))}
      </div>

      {isDone ? <DoneBanner phase="Initial Task" /> : (
        <>
          <div className="submit-card">
            <div className="sc-title">📤 Submit Your Links</div>
            <div className="ig"><label className="lbl">Shopify Store URL</label><input className="inp" placeholder="https://yourstore.myshopify.com" value={sLink} onChange={e => setSLink(e.target.value)} /></div>
            <div className="ig"><label className="lbl">Shopify Store Password</label><input className="inp" placeholder="Store access password" value={sPass} onChange={e => setSPass(e.target.value)} /></div>
            <div className="divider" />
            <div className="ig"><label className="lbl">Anti-Gravity Website URL</label><input className="inp" placeholder="https://yourwebsite.com" value={gLink} onChange={e => setGLink(e.target.value)} /></div>
            <div className="ig"><label className="lbl">Anti-Gravity Website Password (if any)</label><input className="inp" placeholder="Optional" value={gPass} onChange={e => setGPass(e.target.value)} /></div>
            {saved
              ? <div className="ok-box" style={{ marginTop: 10 }}><span>✅</span><span>Links saved! Now notify Sarthak using the buttons below.</span></div>
              : <button className="btn-primary" style={{ width: "100%", marginTop: 6 }} onClick={handleSave}>Save Links 💾</button>
            }
          </div>

          {/* ── NOTIFICATION PANEL — shows after saving ── */}
          {saved && (
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(37,211,102,.25)", borderRadius: 13, padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--white)", marginBottom: 6 }}>
                📬 Notify Sarthak on WhatsApp
              </div>
              <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 18, lineHeight: 1.6 }}>
                Your links are saved. Click below to send Sarthak a pre-filled WhatsApp message with all your details so he can review your work.
              </div>

              <button
                onClick={sendWhatsApp}
                style={{
                  width: "100%",
                  background: waSent
                    ? "linear-gradient(135deg,#0a5c3e,#0e7a52)"
                    : "linear-gradient(135deg,#128C7E,#25D366)",
                  border: "none", borderRadius: 10, padding: "15px 20px",
                  color: "white", fontSize: 15, fontWeight: 700,
                  fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "all .2s",
                }}
                onMouseOver={e => { if (!waSent) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span style={{ fontSize: 20 }}>💬</span>
                {waSent ? "WhatsApp Opened — Send the Message!" : "Send WhatsApp to Sarthak"}
                <span style={{ fontSize: 11, opacity: .75, fontWeight: 500 }}>{waSent ? "✅" : "(opens WhatsApp)"}</span>
              </button>

              {waSent && (
                <div style={{ marginTop: 12, background: "rgba(37,211,102,.08)", border: "1px solid rgba(37,211,102,.2)", borderRadius: 9, padding: "11px 14px", fontSize: 13, color: "#86efac", lineHeight: 1.6 }}>
                  ✅ WhatsApp opened with your submission details. Make sure you <strong>press Send</strong> in WhatsApp — Sarthak will review your stores.
                </div>
              )}

              {/* Submission summary */}
              <div style={{ marginTop: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)", borderRadius: 9, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8, fontWeight: 700 }}>What will be sent to Sarthak</div>
                {[
                  ["👤 Trainee",        trainee],
                  ["🛍️ Shopify URL",   sLink],
                  ["🔑 Shopify Pass",   sPass || "Not provided"],
                  ["🌐 Anti-Gravity URL", gLink],
                  ["🔑 AG Password",    gPass || "Not provided"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 10, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12.5 }}>
                    <span style={{ color: "var(--dim)", minWidth: 140, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: "var(--white)", wordBreak: "break-all" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!saved && <div className="lock-warn"><span>⚠️</span>Save both links above to activate the Complete button</div>}
          <CompletionSection label="Mark Initial Task Complete — Unlock Day 1 🔓" disabled={!saved} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Initial Task" />
        </>
      )}
      <NoteBottom>After notifying Sarthak, wait for him to review your stores. He will get back to you once reviewed.</NoteBottom>
    </div>
  );
}

function Day1Phase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("DAY1");
  const notes = appState.day1Notes || {};
  const toggle = i => setAppState(s => ({ ...s, day1Notes: { ...notes, [i]: !notes[i] } }));

  const videos = [
    { t: "Client Centric Research for Effective Sales",                                        url: "https://youtu.be/w2KCPqb_3A4" },
    { t: "What We Sell",                                                                       url: "https://youtu.be/0D_TJw7OOBk" },
    { t: "Sales SOP",                                                                          url: "https://youtu.be/WK5xbqnhV2M" },
    { t: "Type of Customer to Onboard + Brief Handling + Market & Store Research",             url: "https://youtu.be/hx39swDdyx0" },
    { t: "Ecommerce Workflow {Winning Product + Store Setup + Marketing}",                     url: "https://youtu.be/0jcOsGHeo0o" },
    { t: "Sales Mindset",                                                                      url: "https://youtu.be/DsK_904V2Pg" },
    { t: "Client Chat Creation",                                                               url: "https://youtu.be/nJOKospAu4A" },
    { t: "Types of Clients",                                                                   url: "https://youtu.be/FTIgqgXhabI" },
    { t: "How to Interact and Deal with Clients",                                              url: "https://youtu.be/268iH95K_po" },
    { t: "The Process of Creating a Shopify Store",                                            url: "https://youtu.be/RribBV1_gKE" },
  ];
  const noteItems = ["Shopify basics & store creation", "Sales flow & SOP", "Client handling techniques", "Types of clients", "Ecommerce workflow", "Market & store research", "Sales mindset", "Client chat creation"];
  const checkedCount = Object.values(notes).filter(Boolean).length;
  const canComplete = checkedCount >= noteItems.length;

  return (
    <div className="content fade-up">
      <div className="ph-badge">🎬 Day 1</div>
      <h1 className="ph-title">Watch All Training Videos</h1>
      <p className="ph-intro">Today you begin your core training. Watch all 10 videos carefully and take detailed notes. These are the foundation of everything at Digital Marketing Heroes.</p>

      <RulesBlock items={[
        "Watch EVERY video in full — no skipping, no fast-forwarding",
        "No rushing — understanding over speed, always",
        "You have 24 hours from receiving the Day 1 code to complete all videos",
        "Your Day 2 interview is based ENTIRELY on these 10 videos",
        "Minimum 80% accuracy required in the Day 2 interview to qualify",
        "Take notes while watching — you will need them in the interview",
        "Do NOT ask for the Day 2 code until all videos are fully watched",
      ]} />

      <InstrBlock title="📋 How to Complete Day 1" items={[
        "Click each video card below — it opens in a new YouTube tab",
        "Watch the full video, pause and rewatch any complex sections",
        "After each video topic, check it off in the note-taking checklist below",
        "ALL 8 checklist items must be ticked to unlock the Complete button",
        "Once done, inform Sarthak to receive the Day 2 code",
      ]} />

      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>
        10 Training Videos — ({checkedCount}/{noteItems.length} topics noted)
      </div>

      <div className="grid-2col" style={{ gap: 10, marginBottom: 20 }}>
        {videos.map((v, i) => (
          <a key={i} href={v.url} target="_blank" rel="noreferrer" style={{ background: "var(--navy-card)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: "14px 15px", display: "flex", alignItems: "flex-start", gap: 11, textDecoration: "none", transition: "all .2s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = "var(--gold)"}
            onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gold)", background: "rgba(201,162,39,.12)", borderRadius: 5, padding: "3px 7px", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--white)", lineHeight: 1.5 }}>{v.t}</div>
              <div style={{ fontSize: 11, color: "var(--blue)", marginTop: 3 }}>▶ Watch on YouTube ↗</div>
            </div>
          </a>
        ))}
      </div>

      {isDone ? <DoneBanner phase="Day 1" /> : (
        <>
          <div className="checklist">
            <div className="cl-title">✏️ Note-Taking Checklist — Check Off Each Topic After Watching</div>
            {noteItems.map((item, i) => <CB key={i} label={item} checked={!!notes[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canComplete && <div className="lock-warn"><span>⚠️</span>Check all {noteItems.length} topics to unlock the Complete button ({checkedCount}/{noteItems.length} done)</div>}
          <CompletionSection label="Mark Day 1 Complete — Unlock Day 2 🔓" disabled={!canComplete} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Day 1 — Training Videos" />
        </>
      )}
      <NoteBottom>Once all videos are watched and checklist is complete, inform Sarthak to receive your Day 2 code.</NoteBottom>
    </div>
  );
}

function Day2Phase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("DAY2");
  const tech = appState.day2Tech || {};
  const toggle = i => setAppState(s => ({ ...s, day2Tech: { ...tech, [i]: !tech[i] } }));
  const [confirmed, setConfirmed] = useState(appState.day2Confirmed || false);
  const techItems = ["Microphone tested and working clearly", "Internet connection stable (test at fast.com)", "Laptop ready — mobile only if mic not working", "Camera on throughout the entire interview", "Quiet environment — zero background noise", "All Day 1 notes ready for reference"];
  const checkedCount = Object.values(tech).filter(Boolean).length;
  const canConfirm = checkedCount >= techItems.length;
  const canComplete = confirmed || appState.day2Confirmed;
  const handleConfirm = () => { setAppState(s => ({ ...s, day2Confirmed: true })); setConfirmed(true); };

  return (
    <div className="content fade-up">
      <div className="ph-badge">🎤 Day 2</div>
      <h1 className="ph-title">Your First Interview</h1>
      <p className="ph-intro">Your interview will be conducted by <strong style={{ color: "var(--gold-light)" }}>Divyansh Sir</strong> after 2:00 PM today. This is your chance to prove everything you have learned.</p>

      <RulesBlock items={[
        "Minimum 80% accuracy required — below this you do NOT proceed to Day 3",
        "Be on time — do NOT keep the interviewer waiting for even 1 minute",
        "Unclear audio = rescheduling or immediate disqualification — test your mic first",
        "Camera MUST be on for the entire interview — no exceptions",
        "You will be tested on ALL 10 Day 1 training videos — revise everything",
        "Your Shopify store AND Anti-Gravity website will be reviewed LIVE",
        "Do NOT attend unprepared — inform Sarthak to reschedule if not ready",
      ]} />

      <InstrBlock title="✅ Interview Will Cover" items={[
        "All 10 training videos from Day 1 — concepts, workflow, client types",
        "Sales SOP and the complete client handling process",
        "Live review of your Shopify store — navigation, products, design quality",
        "Live review of your Anti-Gravity website — quality and creativity",
        "Sales mindset and approach — how you think about clients and deals",
      ]} />

      <div className="checklist">
        <div className="cl-title">🖥️ Technical Checklist — Complete This BEFORE the Interview</div>
        {techItems.map((item, i) => <CB key={i} label={item} checked={!!tech[i]} onChange={() => toggle(i)} />)}
      </div>

      {isDone ? <DoneBanner phase="Day 2 Interview" /> : (
        <>
          {!canConfirm && <div className="lock-warn"><span>⚠️</span>Complete all {techItems.length} technical checks first ({checkedCount}/{techItems.length} done)</div>}
          {canComplete ? (
            <>
              <div className="ok-box" style={{ marginBottom: 14 }}><span>✅</span><span>Interview readiness confirmed! Divyansh Sir will call you after 2:00 PM. Good luck!</span></div>
              <CompletionSection label="Mark Day 2 Interview Complete — Unlock Day 3 🔓" disabled={false} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Day 2 — Interview I" />
            </>
          ) : (
            <button className="btn-final" style={!canConfirm ? { opacity: .35, cursor: "not-allowed", animation: "none" } : {}} onClick={canConfirm ? handleConfirm : undefined}>
              I Am Ready for My Interview ✅
            </button>
          )}
        </>
      )}
      <NoteBottom>Once interview is complete and you qualify, Sarthak will send your Day 3 code.</NoteBottom>
    </div>
  );
}

// ─── CHAT FILES (Embedded for Download) ─────────────────────────────────────
const CHAT_FILES = [
  { filename: "Chat_1_Damon_Terral.txt", client: "Damon Terral", niche: "Custom Apparel / Print-on-Demand", content: `Client Name: - Damon Terral 





* Third: create Zeely-style short, high-impact videos
  * You’ll see previews before anything is finalized

Please send the refined images, updated apparel designs, and priority slogans. Once we have those, we’ll rebuild the hero with video and share the next round of visuals.

We’re aligned on doing this the right way.

D
Profile Image
Damon T

Dec 16, 7:47 PM
I always knew I picked the right person for my future....You will be the foundation of my new found wealth...Thank You...

S
Profile Image
Me

Dec 16, 7:55 PM
Thank you, Damon. I truly appreciate your trust and kind words.
I’m committed to building this the right way and laying a strong foundation for the brand. We’ll stay focused, intentional, and aligned with your vision as we move forward.

Looking forward to what we’re creating together.

S
Profile Image
Me

Dec 17, 1:45 PM
We’ve added the model images and products from Printful, along with the assets you shared. We’ve also updated the original store with the slogans as discussed.
Please review the store when you get a moment and share your feedback so we can refine it further.

Store: https://concordia-apparel-com.myshopify.com/
Password: peatia

S
Profile Image
Me

Dec 19, 12:05 PM
We has to deliver your store.

We want to let you know that we’re fully committed to supporting you not just for this delivery, but also long-term as you grow the brand. We’re genuinely interested in continuing to work with you and helping SONDER evolve step by step.

We’ve also tried reaching out to you via Mail to make sure nothing was missed and to keep communication smooth. Whenever you’re ready to share feedback, product details, or next ideas, we’ll pick things up right away and continue refining the store to match your vision.

You don’t need to rush, take your time reviewing everything. We’re here, available, and ready to support you now and in the future.

D
Profile Image
Damon T

Dec 20, 1:47 AM
Hello my Brother,

D
Profile Image
Damon T

Dec 20, 2:05 AM
Here are the first wave of corrections: 1. Please remove black family from landing page. 2. See pricing sheet I am attaching 3. Add black swimsuit that I have created (Remove current bathing suit). 4. Kids Clothing - remove "Be strong shirt" keep kids clothing simple, only have Concordia Logo 5. Make QR Code smaller on back of shirts 6. See if you can add more videos with happy people (if possible). 7. Under "Shop" can you make sub-categories like: Tops, T-Shirts, Hoodies, etc...8. Please re-word the "About Us" to read more like my mission statement. 9. Please read my attached file about my first launch and incorporate some of my ideas on incentives. 10. Add another section for merchandise - Backpacks and totes. 11. Under Calm Tones: please use this wording: "Concordia exists to create harmony through fashion. Each Design is crafted with positive messages that spark connection through thoughtful slogans and our apparel carries messages meant to uplift, unite, and inspire - helping you share positivity with every step you take."

D
Profile Image
Damon T

Dec 20, 2:06 AM
4 Files

Download All

Concordia_Pricing_Deck.pdf

(3.87 kB)


Lanch Package.pdf

(3.81 MB)


Incentives.pdf

(3.85 MB)


Concordia Pricing _ Brand Value.pdf

(4.01 MB)

S
Profile Image
Me

Dec 20, 2:07 AM
Replied

Damon T

Dec 20, 2:06 AM

4 Files

+4


Got it I will go through them all ..

S
Profile Image
Me

Dec 20, 5:47 PM
Please share verification code of klaviyo

S
Profile Image
Me

Dec 20, 5:49 PM
We need it for Incorporate launch incentives design

D
Profile Image
Damon T

Dec 21, 7:43 PM
please resend

S
Profile Image
Me

Dec 22, 10:44 AM
Please share verification code

S
Profile Image
Me

Dec 23, 12:15 PM
We’ve updated the hero banner with your product and added the slogan you selected everything is aligned with your mission direction.
We just need the Klaviyo verification code to complete the setup for the incentive messages. Once we receive the code, we’ll activate the flow right away.
Whenever you have a moment, please review the store updates and share your feedback. We’ll adjust anything as needed.
Looking forward to your response.

D
Profile Image
Damon T

Dec 23, 9:16 PM
HELLO

D
Profile Image
Damon T

Dec 23, 9:18 PM
I haven't received any codes....

S
Profile Image
Me

Dec 23, 10:10 PM
We've shared again, please share.

S
Profile Image
Me

Dec 24, 3:06 PM
Hi Damon,

Just checking in for clarification so we can move forward smoothly:

Pricing Updates – Please confirm whether you want us to update the prices for all product templates we created (backpacks, swimsuits, windbreakers, etc.). Once confirmed, we will apply the updated pricing across the entire store.
Product Templates – Since these items were created as templates, please confirm if you want all of them published on the live store or only selected categories.
About Us Page – We have updated the About Us page according to the mission-based content you provided. If you’d like any fine-tuning, just let us know.
Klaviyo Verification Code – We still need the Klaviyo verification code to complete the incentive flow setup. Once we receive it, we will activate the entire sequence immediately.

Please reply when you get a moment so we can continue with the next steps and finalize everything for you.

Thank you!

S
Profile Image
Me

Dec 26, 5:01 PM
I wanted to let you know that we've moved forward with the delivery to meet the fiverr's timeline. We've also tried to contact you via mail, please let us know if you've received the mails. We'd like to continue via mail if you'll allow. 
You can have a look at the store and share the details with us as soon as possible, we'll take care of them right away. 

Looking forward to your response!

D
Profile Image
Damon T

Dec 26, 7:46 PM
Hello my brother,

D
Profile Image
Damon T

Dec 26, 7:47 PM
It's been a busy week for me and I apologize, the Holidays are crazy here so now I am back to work...Please send me a link to get the code, I have not received any codes...

S
Profile Image
Me

Dec 26, 8:33 PM
Hi Damon,
No worries at all, totally understand how busy the holidays can be.
We’ve just sent the Klaviyo verification code again now. Please check your inbox (and spam/junk folder just in case). The email should be from Klaviyo.

Once you receive and share the code with us, we’ll complete the incentive flow setup right away.
Thanks, and welcome back looking forward to moving ahead together.

D
Profile Image
Damon T

Dec 26, 10:03 PM
722962

S
Profile Image
Me

Dec 26, 10:21 PM
This code was expired, we've send again, please share that

D
Profile Image
Damon T

Dec 26, 10:21 PM
221254

D
Profile Image
Damon T

Dec 26, 10:21 PM
221254

D
Profile Image
Damon T

Dec 26, 10:22 PM
also, when I am on Printful and I design a new piece, how do I add this or save so you or I can place on our store?

S
Profile Image
Me

Dec 26, 10:24 PM
Hi Damon,
When you create a new design in Printful, you have two options:

Option 1 (Recommended):
Save and publish it directly to Shopify from Printful. It will automatically appear in the store, and we’ll handle pricing, templates, and layout.

Option 2:
Save it as a product template in Printful (don’t publish) and let us know — we’ll publish and set it up for you.

Both ways work smoothly. Let us know what you prefer

S
Profile Image
Me

Dec 26, 10:32 PM
Please confirm this also, whether you want us to update the prices for all product templates we created (backpacks, swimsuits, windbreakers, etc.). Once confirmed, we will apply the updated pricing across the entire store.

D
Profile Image
Damon T

Dec 27, 1:34 AM
ok, i will...thank you

S
Profile Image
Me

Dec 27, 7:41 AM
Thank you. I’ll proceed once you confirm.` },
  { filename: "Chat_2_Milla_BabyClothing.txt", client: "Milla (valentimc)", niche: "Second-hand / Sustainable Baby Clothing", content: `Client Name: - valentimc


PROMOTED

Oct 08, 3:13 PM
Hi Shreyansh, I come to you given your fantastic reviews! I would like your advice on which of your products to get. I want to launch an online store of used baby clothing—so basically, I have three main needs: 1) large number of products: I’ll always have 300-600 unique products (only one item of each), because they’re used. 2) Because I will have a large number of products, I need an excellent filtering capacity, through which the client can select products based on at least 8 different categories and subcategories (such as gender, size, brand, material, color, country made, organics, and others); 3)I am based in Europe but I want to sell in Europe and in the US, therefore an extremely reliable international payment capability is key. 4) Since my products will be changing almost daily, I would like to be able to upload new products myself, and since I have no experience with websites it has to be something simple to use. What do you think would be better for this purpose, Wix, Shopify or something else? And what can you offer me to make this store beautiful and super-functional? Thank you in advance and looking forward to your reply, Milla

S
Profile Image
Me

Oct 08, 3:13 PM
Hey! I'm Shreyansh from "Digital Marketing Heroes" (2.5M+ YouTube). We teach Shopify Store Design & Brand building.

Portfolio: https://indulgentbutters.com (Pass: ROYAL) • https://americandreamprinting.com • https://shipezusa.com • https://patasymimos.com • https://gooubeauty.com • https://mycommercialkitchen.co • https://maajab.com

Enterprise Package - $1,800 (3 Months VIP Support)

Here is our complete business-ready solution designed :

→ Upto 100 products uploads 
→ Custom AI visuals for EVERY product → without designers
→ Premium theme customization → Unique brand identity
→ Mobile + Speed optimization (90+ score) → 20% fewer abandonments
→ Professional branding → Logo, colors, typography, guidelines

Advanced Conversion & Sales Systems:
→ Multi-tier upsell & cross-sell Setup
→ Trust badges & social proof integration 
→ Typography pairing for brand consistency
→ Automated email sequences (Welcome, Abandoned Cart, Post-Purchase) 
→ A/B testing setup → Continuous improvement framework
→ Complete tracking & SEO (GA4, Meta Pixel, TikTok Pixel)

Enterprise-Only Features:
→ 7 rounds of revisions → Perfect everything
→ Priority support (24-48hr response) for 3 months via Google Meet/Zoom → Never stuck during critical launch phase
→ Custom app recommendations + Seasonal Graphics → For any specific needs
→ On Demand Video walkthrough → Understand all features

🏆 Why Trust Us
✅ 8+ years Shopify/eCom experience (Fiverr Pro verified)
✅ Founder, Digital Marketing Heroes (2.5M+ YouTube subscribers)
✅ Our stores: ~4.2% conversion vs ~1.8% industry average
✅ CRO mindset & quality builds you won't find anywhere else
✅ No outsourcing: Everything done in-house personally


Share your brand vision, preferred style (minimalist/bold/luxury), and any design references you love as this helps me create the perfect look for your store! If you have a lower budget, we can explore lower package options with less features from the Enterprise plan.
Looking forward to Building together!

S
Profile Image
Me

Oct 08, 3:40 PM
hi how are you/

S
Profile Image
Me

Oct 08, 4:01 PM
we can do all that you mentioned above in the message

S
Profile Image
Me

Oct 08, 4:02 PM
Replied

valentimc

Oct 08, 3:13 PM

Hi Shreyansh, I come to you given your fantastic reviews! I would like your advice on which of your products to get. I want to launch an online store of used baby clothing—so basically, I have three main needs: 1) large number of products: I’ll always have 300-600 unique products (only one item of each), because they’re used. 2) Because I will have a large number of products, I need an excellent filtering capacity, through which the client can select products based on at least 8 different categories and subcategories (such as gender, size, brand, material, color, country made, organics, and others); 3)I am based in Europe but I want to sell in Europe and in the US, therefore an extremely reliable international payment capability is key. 4) Since my products will be changing almost daily, I would like to be able to upload new products myself, and since I have no experience with websites it has to be something simple to use. What do you think would be better for this purpose, Wix, Shopify or something else? And what can you offer me to make this store beautiful and super-functional? Thank you in advance and looking forward to your reply, Milla

I suggest you to go with shopify because it's very user friendly to maintain and customize your store down the line...

S
Profile Image
Me

Oct 08, 4:03 PM
Do you want us to put all the 300 to 600 products ?

V
valentimc

Oct 08, 4:04 PM
Hi Shreyansh, unfortunately I don’t have the budget right now for the enterprise package. I’m not sure how working per hour would be needed. I was wondering if you can do what I need through one of your fiverr packages. Based on what I described, I don’t know what the requirements or how many plugins/ extensions would be needed.

S
Profile Image
Me

Oct 08, 4:06 PM
Hey 👋

Just wanted to highlight something most people don’t realize — many clients come to us after getting their store built elsewhere. At first, everything looks great, but soon bugs appear, features stop working, or they discover their theme is so heavily custom-coded that even small changes need a developer. They end up spending more and more just to keep things running.

We’re not like that.
At Digital Marketing Heroes, we don’t disappear after delivery — we stay with you. Our builds are clean, scalable, and made for non-tech users so you can edit anything easily.

Plus, we provide 6 months of post-launch support to help you fix bugs, integrate new tools, improve SEO, and truly understand how Shopify works.

You’ll have access to us for:
✅ Ongoing technical fixes & troubleshooting
✅ New app integrations & growth tweaks
✅ Strategy guidance for sales & scaling
✅ Speed and performance optimization

We’re proud that every store we deliver earns full reviews — backed by the trust of our 2.5M+ YouTube community.
Our goal isn’t just to hand over a site — it’s to make sure you never face those same issues again.

V
valentimc

Oct 08, 4:07 PM
I believe you could put in like 10 products just so I see how it should look like and I’ll upload the rest of tge initial stock of products myself. Right now I have more available time than available budget so I’d rather do it myself in the beginning 😊

S
Profile Image
Me

Oct 08, 4:09 PM
Replied

valentimc

Oct 08, 4:07 PM

I believe you could put in like 10 products just so I see how it should look like and I’ll upload the rest of tge initial stock of products myself. Right now I have more available time than available budget so I’d rather do it myself in the beginning 😊

Noted, So let me give you learner plan before that could you give your Budget for your store?

V
valentimc

Oct 08, 4:10 PM
The whole store budget or the budget for the website?

S
Profile Image
Me

Oct 08, 4:10 PM
We will build whole store for you everything we will setup for you from shipping to app integration not just the website....
So Store budget..

V
valentimc

Oct 08, 4:14 PM
To
Be honest I don’t know. I don’t even know what you mean by that. I lost my job
And since it had been hard to find a new job at my age I
Decided to start this shop. I have been buying clothing with what is left over of my unemployment assistance salary for several months. I could pay for the fiverr best package with 10 pages and 10 plug ins. Do you think you could satisfy the needs I described in my first message with this level of budget (max $500)?

S
Profile Image
Me

Oct 08, 4:25 PM
Replied

valentimc

Oct 08, 4:14 PM

To Be honest I don’t know. I don’t even know what you mean by that. I lost my job And since it had been hard to find a new job at my age I Decided to start this shop. I have been buying clothing with what is left over of my unemployment assistance salary for several months. I could pay for the fiverr best package with 10 pages and 10 plug ins. Do you think you could satisfy the needs I described in my first message with this level of budget (max $500)?

Give us some time and We will let you know..

S
Profile Image
Me

Oct 08, 5:32 PM
hey

S
Profile Image
Me

sent this recommendation

Oct 08, 5:33 PM
Please connenct with my friend he is from my team

Take your next steps with this referral:

V
Vivek
Vivek

4.8
(40)


WordPress

From $80/Gig

Why Shreyansh Singh believes they could be a good fit:

Vivek specializes in WordPress and Shopify and has more experience (Level 2 seller). He’s a great option if you want someone who can provide a bit more depth, especially if your project grows and needs advanced support in the future.

Freelancers may earn benefits for connecting clients with the right talent.

S
Profile Image
Me

Oct 08, 6:49 PM
Replied

valentimc

Oct 08, 4:14 PM

To Be honest I don’t know. I don’t even know what you mean by that. I lost my job And since it had been hard to find a new job at my age I Decided to start this shop. I have been buying clothing with what is left over of my unemployment assistance salary for several months. I could pay for the fiverr best package with 10 pages and 10 plug ins. Do you think you could satisfy the needs I described in my first message with this level of budget (max $500)?

Hey Milla 👋

Thank you for sharing your story — I completely understand where you’re coming from, and since you’re just starting out, we’d be happy to work within your $500 budget and make sure you get a clean, professional store you can grow from.

Here’s what we can do for you at that price 👇

💎 $500 Shopify Starter Build Plan

1️⃣ Full Store Setup
Build your Shopify store from scratch — clean, easy-to-use, and beginner-friendly
Configure everything: navigation, collections, categories, cart, and checkout
Add 10 demo products so you can easily follow the same structure to upload the rest yourself
2️⃣ Filtering & Product Organization
Create an advanced filter system so customers can browse by size, gender, color, brand, or material
Easy for you to manage daily inventory changes and updates
3️⃣ Design & Branding
Use a free or premium theme that fits the baby clothing niche (soft, trustworthy, clean look)
Custom banner, color palette, and layout design for a calm, family-oriented shopping feel
4️⃣ Essential Integrations
Set up reliable international payments (Europe + U.S. friendly)
Add shipping zones and tax setup for both regions
Integrate email notifications, trust badges, and basic SEO (titles, descriptions, images)
5️⃣ Launch Support (1 Month)
Chat-based help after delivery for any questions or tweaks
Guidance on how to upload products, manage orders, and make edits on your own

💬 What You’ll Get

A ready-to-sell, professional Shopify store that’s simple to manage — no technical knowledge needed, and you’ll have a strong foundation to expand later when sales start coming in.

Would you like me to send the custom $500 offer and get started on your store this week?

V
valentimc

Oct 08, 7:27 PM
Sounds very good! I appreciate you taking the time to read my request and preparing an offer accordingly. Please send me the custom offer with all the services included, including the website specs (plugins/expansions added, maximum number of products possible, integrations you will include—types of payment that my eshop will be ready to accept, etc) and if you offer any guarantees for fixing bugs after launching (you just mentioned a support chat, I would like to know if there’s any support service as well). Thank you so much and looking forward to working with you!

S
Profile Image
Me

Oct 08, 7:28 PM
Here's your custom offer

$500
I will build shopify store, design redesign copy ecommerce website, dropshipping store
💎 $500 Shopify Starter Build Plan

1️⃣ Full Store Setup
Build your Shopify store from scratch — clean, easy-to-use, and beginner-friendly
Configure everything: navigation, collections, categories, cart, and checkout
Add 10 demo products so you can easily follow the same structure to upload the rest yourself
2️⃣ Filtering & Product Organization
Create an advanced filter system so customers can browse by size, gender, color, brand, or material
Easy for you to manage daily inventory changes and updates
3️⃣ Design & Branding
Use a free or premium theme that fits the baby clothing niche (soft, trustworthy, clean look)
Custom banner, color palette, and layout design for a calm, family-oriented shopping feel
4️⃣ Essential Integrations
Set up reliable international payments (Europe + U.S. friendly)
Add shipping zones and tax setup for both regions
Integrate email notifications, trust badges, and basic SEO (titles, descriptions, images)
5️⃣ Launch Support (1 Month)
Chat-based help after delivery for any questions or tweaks
Guidance on how to upload products, manage orders, and make edits on your own

💬 What You’ll Get

A ready-to-sell, professional Shopify store that’s simple to manage — no technical knowledge needed, and you’ll have a strong foundation to expand later when sales start coming in.

Read more
Your offer includes

7 Revisions

25 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
V
valentimc

Oct 08, 9:30 PM
Hi Shreyansh, thank you for the offer. It seems very good, it’s just that, since I don’t have any experience with websites, I need a bit more of clarifications: could you kindly tell me:

1) how many pages maximum can the website have?

2) how many products maximum can I have at one time and can it have infinite scrolling?

3) I need more filtering criteria than the ones you mentioned, is it possible to add more without changing the price?

4) what type of payments will it be prepared to accept when you deliver it ?

5) can you specify the plugins/integrations you will add ? Would I be able to ask you to install a few more if not on your list?

Thank you again!

S
Profile Image
Me

Oct 08, 11:57 PM
Replied

valentimc

Oct 08, 9:30 PM

Hi Shreyansh, thank you for the offer. It seems very good, it’s just that, since I don’t have any experience with websites, I need a bit more of clarifications: could you kindly tell me: 1) how many pages maximum can the website have? 2) how many products maximum can I have at one time and can it have infinite scrolling? 3) I need more filtering criteria than the ones you mentioned, is it possible to add more without changing the price? 4) what type of payments will it be prepared to accept when you deliver it ? 5) can you specify the plugins/integrations you will add ? Would I be able to ask you to install a few more if not on your list? Thank you again!

Hey Milla 👋

I’m really glad you liked the plan — and absolutely, let me clarify everything for you in detail below so you feel confident moving forward 😊

💻 Website Structure

1️⃣ Pages Included:
Up to 10 pages — typical setup includes:
Home
Shop (with advanced filters)
Product Page Template
About
Contact
FAQ / Policies (Privacy, Returns, Shipping)
Blog / News (optional)
Cart + Checkout
All of these are included in your $500 plan.

🛍️ Products & Catalog

2️⃣ Products:
You can upload unlimited products on Shopify — it’s built for stores with even 10,000+ items.
We’ll add 10 sample products as a guide so you can easily duplicate the structure and upload the rest.
And yes — infinite scrolling or “Load More” pagination can be enabled for a smoother shopping experience.

🔍 Filtering System

3️⃣ Product Filters:
We’ll create 8+ custom filters (expandable without extra charge), covering things like:
Gender
Size
Brand
Material
Color
Country of Origin
Condition (New / Used)
Organic / Eco-Friendly
You can later add or remove filters easily via Shopify’s built-in product tags and metafields — we’ll guide you on how to manage that.

💳 Payments & International Setup
4️⃣ Payment Methods:
We’ll integrate Shopify Payments (works across Europe & US) which supports:
Visa / Mastercard / Amex
Apple Pay & Google Pay
PayPal

Local EU payment options (iDEAL, Sofort, Bancontact, etc.)
You’ll be able to sell globally with automatic currency conversion and region-based taxes (VAT setup included).

🔌 Plugins & Integrations

5️⃣ Plugins (Included):
Smart Product Filter & Search (for multi-category filtering)
Geolocation & Currency Converter (auto currency display)
Email & Abandoned Cart Recovery
SEO Booster (basic on-page optimization)
Trust & Review app (for credibility)
Shipping Rate Calculator
Social Media Integration (IG, FB, TikTok)

If you’d like to add a few extra apps later, no problem — we can install 2–3 additional ones during your build if they’re free or lightweight.

🛠️ Support & Bug Fix Guarantee
You’ll get 1 month of post-launch chat support, which includes:
Fixing any bugs or layout issues
Help with uploading new products
Minor text/image updates
Guidance on Shopify usage

So you won’t be left alone after delivery — we’ll make sure everything runs smoothly as you start selling.

You’ll have a beautiful, easy-to-manage Shopify store with strong filters, smooth payments, and full flexibility to grow.

V
valentimc

Oct 09, 2:40 AM
Hi Shreyansh, this is great! You deserve your success because you really listen to what your clients want. And also congrats for responding fast; I wrote to some other developers at the same time I wrote you the first time and I’m still waiting for them to respond. So how should I proceed from here to accept this proposal?

S
Profile Image
Me

Oct 09, 2:43 AM
Replied

Me

Oct 08, 7:28 PM

Custom offer

You can Start by accepting the offer... and we can start working ASAP..

S
Profile Image
Me

Oct 09, 2:43 AM
this offer

V
valentimc

Oct 10, 2:08 AM
Sorry, it’s been a busy day; I’ll accept and pay tomorrow.

S
Profile Image
Me

Oct 10, 2:33 AM
Ok np

S
Profile Image
Me

Oct 10, 7:52 PM
To give me collaborator access to your Shopify store, please follow these steps:

🔐Step-by-step process:
Generate an access code: Go to Settings > Users > Security in your Shopify admin, then copy the 4-digit collaborator access code
Share the code: Provide this 4-digit code to your collaborator (developer, freelancer, or agency)
Collaborator submits request: The collaborator uses this code to submit an access request from their Partner Dashboard
Review and approve: You'll receive an mail notification and can manage the request by going to Settings > Users, filtering by "Requests" status
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

V
valentimc

Oct 10, 9:16 PM
Ok will do!

S
Profile Image
Me

Oct 10, 11:33 PM
Hi, Once we start working on your store, we'll keep you updated on the progress.

S
Profile Image
Me

Oct 11, 8:00 PM
We have created a Shopify store for you.... We will present the preview in 3 to 5 days :)
Have a nice day .

V
valentimc

Oct 11, 8:13 PM
Oh… ok. Do I still need to create an account at Shopify and add you as collaborator?

V
valentimc

Oct 11, 8:14 PM
Also, if later on I decide I need help
Uploading the products photos and info, do you have anybody on your team that could help me? And how much would it cost per hour?

S
Profile Image
Me

Oct 11, 8:22 PM
Replied

valentimc

Oct 11, 8:13 PM

Oh… ok. Do I still need to create an account at Shopify and add you as collaborator?

No needed we already created the store for you , we will give you the access while giving you the preview

S
Profile Image
Me

Oct 11, 8:23 PM
Replied

valentimc

Oct 11, 8:14 PM

Also, if later on I decide I need help Uploading the products photos and info, do you have anybody on your team that could help me? And how much would it cost per hour?

We do offer those services no worries how many product you are looking to upload and you also want to optimize them ?

V
valentimc

Oct 13, 4:10 PM
Hi Shreyansh, I sent you some graphics from my computer but I’m not seeing them in this conversation. Perhaps my computer has a different fiverr account logged in

V
valentimc

Oct 13, 4:11 PM
In any case, please check your fiverr messages for some graphs you can use in the same style as the logo

V
valentimc

Oct 13, 4:12 PM
You don’t need to use them all, I prefer less than more, but it’s there if you need something colorful in the same palette

S
Profile Image
Me

Oct 13, 4:43 PM
could you please share it again i'm not sure i have got it all

V
valentimc

Oct 13, 8:14 PM
1 File


18.png

(2.57 MB)

V
valentimc

Oct 13, 8:14 PM
1 File


4.png

(2.32 MB)

V
valentimc

Oct 13, 8:15 PM
1 File


7.png

(1.78 MB)

V
valentimc

Oct 13, 8:16 PM
1 File


13.png

(848.2 kB)

V
valentimc

Oct 13, 8:17 PM
1 File


16.png

(2.41 MB)

V
valentimc

Oct 13, 8:18 PM
Replied

valentimc

Oct 13, 8:17 PM

1 File


use this dress image

V
valentimc

Oct 13, 8:19 PM
1 File


9.png

(2.07 MB)

V
valentimc

Oct 13, 8:20 PM
just to confirm, the correct name of the store is "Bébé Europa"

S
Profile Image
Me

Oct 14, 1:36 AM
Got it ! Thanks

S
Profile Image
Me

Oct 17, 11:46 PM
Just a quick update on the progress 
I have set the home page layout design of the store please have a look and let me know if i'm moving in the right direction. Also if you need any thing to be adjusted or changed let me know i'm still working on it i'll fix it immediately
Store Link- https://bebe-europa.myshopify.com/
Password- tholdu

S
Profile Image
Me

Oct 18, 10:38 PM
I'm still waiting for your feedback. Please have a look and let me know if i'm moving forward in the right direction

V
valentimc

Oct 19, 3:21 AM
Hi Shreyansh, I’m sorry for my delay, I’m busy this weekend. Here are some things you can change: 

1) I’m not too fond of the tone pink that was used, I would like something more like “blush” or “dusty rose”. If you put logo on Canva they give you a color scheme based— I would like you to use a light “rose” color from the dress color scheme.  If you want it I can send some examples to you from Canva, but only on Monday.

2) please use just the dress pic and the name of the store in the Headers (not the url or insta handle).

3) we need to add one accent in the first “e” of the word Bébé in the headers (it was a typo on my part). I’ll send you the logo again with the correct spelling, unless you can add the accent yourself.

V
valentimc

Oct 19, 3:28 AM
4) the website in general looks very busy. You can remove the unnecessary stock photos, just leave some space for plain text on the top of each page. I love this website: https://www.blueberryshop.co/?srsltid=AfmBOoqL4ewiz2uFjkzlGIU5lja8ogXmbR5csmEIPkrotjdNFY8UUY0t  It is also from Shopify. If it is up to me you can copy the entire look and plugins, just use my logo instead of theirs 🤭

S
Profile Image
Me

Oct 19, 3:55 PM
Thank you for the detailed feedback, I'll make sure that these are implemented on your store. I'll keep you updated.

V
valentimc

Oct 19, 10:04 PM
Hi Shreyshan, I want to write a quick reminder of the two other items that I think are my greatest differential from other second-hand shops and that I would like to have on the website. The password you sent me is not working anymore so I can’t enter the website again to see if you included a “Suatainability” page. In any case, definitely need the following 2 pages:

1) Brands : in this page I list all the brands I will sell and a 1-paragraph summary of their sustainability measures. I’ll start with 25-30 brands

2) Sustainability: on this page I will have a list of all the sustainability measures the kids clothing brands are taking to preserve the environment. I will have my own list of sustainability measures but it will have a lot in common with the one on the website of the Dutch store “wat mooi”. You can copy the sustainability criteria they use to classify their clothing (cotton, natural fibers, bamboo, etc.) and add similar symbols for each criterion as they do (preferably in the same “rose” palette as the rest of the website). I will also need 3 extra symbols, which can be the logos of the following 3 organizations: GOTS certification, OEKO-TEX certification, a platform called “Good on You” (you can find these 3 symbols/logos on the internet; I’m sending you screenshots in a message below so you can see what they look like, plus a link with wat mooi’s sustainability criteria and symbols.

V
valentimc

Oct 19, 10:12 PM
Every piece of clothing for sale will receive one or more of these sustainability symbols (e.g., natural fibers, organic cotton, fair trade, etc.). What is most important to me is that a) when shoppers click on these symbols they are directed to the part of the “Sustainability” page has the explanation of what that symbol means; and b) that clients can also filter products by these sustainability criteria. 
And finally, I want that the name of the brand indicated in every product page is also a link that redirects to the description of that brand on the “Brands” page. 

I’m sorry for the loads of written instructions but I think in practice these requests are not hard to implement 😊

V
valentimc

Oct 19, 10:13 PM
Sustainability criteria and symbols inspiration: https://www.watmooi.nl/mooi-gemaakt/

V
valentimc

Oct 19, 10:35 PM
Replied

valentimc

Oct 19, 10:04 PM

Hi Shreyshan, I want to write a quick reminder of the two other items that I think are my greatest differential from other second-hand shops and that I would like to have on the website. The password you sent me is not working anymore so I can’t enter the website again to see if you included a “Suatainability” page. In any case, definitely need the following 2 pages: 1) Brands : in this page I list all the brands I will sell and a 1-paragraph summary of their sustainability measures. I’ll start with 25-30 brands 2) Sustainability: on this page I will have a list of all the sustainability measures the kids clothing brands are taking to preserve the environment. I will have my own list of sustainability measures but it will have a lot in common with the one on the website of the Dutch store “wat mooi”. You can copy the sustainability criteria they use to classify their clothing (cotton, natural fibers, bamboo, etc.) and add similar symbols for each criterion as they do (preferably in the same “rose” palette as the rest of the website). I will also need 3 extra symbols, which can be the logos of the following 3 organizations: GOTS certification, OEKO-TEX certification, a platform called “Good on You” (you can find these 3 symbols/logos on the internet; I’m sending you screenshots in a message below so you can see what they look like, plus a link with wat mooi’s sustainability criteria and symbols.

Please disregard the entire last sentence of this message (Everything after “ I will need 3 extra symbols…”. I realized that obtaining the licenses to use their logos may be too complicated. Just add 5 more general, sustainability-related symbols and I’ll assign criteria for them later. Sorry for the mess; it would be easier if I could have just edited my message but it seems fiverr does not allow editing. 

Thank you for your beautiful work so far, I can’t wait to see more!

S
Profile Image
Me

Oct 19, 10:38 PM
No problem We are here to deliver everything according to your vision

V
valentimc

Oct 19, 10:49 PM
Thank you, you are the best! 🧡🧡🧡

S
Profile Image
Me

Oct 19, 11:14 PM
Just a quick heads-up, there might be a slight delay in updates regarding the changes. It’s the festive season here in India, and our team is spending some precious time celebrating with their families. We truly appreciate your patience and understanding during this time!

Rest assured, once we’re back, we’ll make sure everything is completed on time and perfectly aligned with your requirements and vision. We’ll be resuming work from Wednesday onwards, refreshed and ready to continue where we left off!

V
valentimc

Oct 20, 2:15 AM
No problem, enjoy your days off, happy Diwali!

S
Profile Image
Me

Oct 23, 2:06 PM
Regarding the Brands page, you mentioned that there will be around 25–30 brands to feature. To proceed smoothly and ensure accuracy, could you please share the names of the brands you’d like to include?
Once I have the list, I can start creating the page layout and design accordingly.

V
valentimc

Oct 23, 8:53 PM
Hi Shreyshan, I am adding a list of 32 core brands. If it does not take too much extra work, please add the other 14 brands as well (total of 46). Thank you so much!

V
valentimc

Oct 23, 8:54 PM
1 File


image.png

(45.94 kB)

S
Profile Image
Me

Oct 23, 8:54 PM
Sure I’ll do that and update you

V
valentimc

Oct 23, 8:56 PM
Thank you! I will need to incorporate more brands in the future; do you think it is something I can do myself without knowing coding or would I better collect all brand-names possible and give them to you now? I can do that, too, I think I have about 80 names

S
Profile Image
Me

Oct 23, 9:05 PM
You’re very welcome! Yes, once I finish setting up the Brands page structure, you’ll be able to add or remove brands yourself easily from the Shopify editor, without needing any coding.

So no worries if you plan to add more later. I’ll make sure the layout is flexible and simple to update.

S
Profile Image
Me

Oct 24, 9:35 PM
Replied

valentimc

Oct 19, 10:12 PM

Every piece of clothing for sale will receive one or more of these sustainability symbols (e.g., natural fibers, organic cotton, fair trade, etc.). What is most important to me is that a) when shoppers click on these symbols they are directed to the part of the “Sustainability” page has the explanation of what that symbol means; and b) that clients can also filter products by these sustainability criteria. And finally, I want that the name of the brand indicated in every product page is also a link that redirects to the description of that brand on the “Brands” page. I’m sorry for the loads of written instructions but I think in practice these requests are not hard to implement 😊

Thank you so much for explaining everything so thoughtfully, I truly appreciate the clarity! To make sure I capture your vision exactly the way you imagine it, could you please share a reference website link or even a quick screenshot showing how you’d like the feature to work? That would really help me understand the functionality better and bring it to life just the way you want.

V
valentimc

Oct 24, 9:53 PM
Hi Shreyshan, on two occasions I have sent you links of 2 websites: one with the clean, minimalist look I aspire (blueberry) and the other link for a site with the sustainability symbols I want to use (wat mooi). Are you asking for MORE websites in addition to those two or did you not receive the links of the sites I sent a few days ago?

V
valentimc

Oct 24, 9:53 PM
If fiverr removed the urls I sent I can make screenshots of the sites

S
Profile Image
Me

Oct 25, 11:28 PM
Replied

valentimc

Oct 24, 9:53 PM

If fiverr removed the urls I sent I can make screenshots of the sites

yes go ahread

S
Profile Image
Me

Oct 25, 11:28 PM
Hey Milla 👋

The full store setup for Bébé Europa is now complete ✅

Everything from the design, branding, collections, filtering, and sustainability system has been fully implemented and optimized for both desktop and mobile.

Please go through the entire store carefully and let me know if you’d like any changes —
✨ updates in design,
📄 adjustments in policy pages (shipping, returns, privacy, etc.),
🖼️ text or layout modifications, or
🔠 color or font refinements.

I’ll be happy to fine-tune anything you’d like to adjust before final handover.

🧩 Regarding your brand link request:

For your request —
“I want that the name of the brand indicated in every product page is also a link that redirects to the description of that brand on the ‘Brands’ page.”
Here’s how I’ve set it up:
Each product page now includes a brand pop-up that clearly shows which brand the item belongs to.
Inside the pop-up, there’s also a direct button to visit the Brands page if the visitor wants to explore more about that brand.

Technically, we can also make the brand name itself a clickable link that redirects straight to the brand’s section on the Brands page —
however, this approach can reduce conversion rate since customers may bounce away from the product page instead of completing the purchase.

So the current setup keeps engagement high on the product page while still allowing easy access to the full brand info when someone chooses to see more.

Please review everything and let me know:
if you’d like me to make the brand name fully clickable anyway,
or if you prefer to keep the current optimized version.
Once you confirm everything looks good, I’ll finalize the delivery

V
valentimc

Oct 26, 1:22 AM
Thats exciting news! I can’t wait to see everything! I’m not home today but I’ll look it carefully on Monday (or tomorrow if I get a chance)

V
valentimc

Oct 26, 1:23 AM
One question about the 30-day guarantee: when do they start? Now or after the finalized delivery?

V
valentimc

Oct 26, 1:25 AM
Also, I have to wait until the first week
Of december to have all the papers so I can register the store with the government and put the site live. Could the guarantee begin then, since in November I will have no activity?

S
Profile Image
Me

Oct 26, 1:30 AM
Replied

valentimc

Oct 26, 1:23 AM

One question about the 30-day guarantee: when do they start? Now or after the finalized delivery?

30 days guarantee you mean 1 month support we offer that is post delivery

S
Profile Image
Me

Oct 26, 1:31 AM
Replied

valentimc

Oct 26, 1:25 AM

Also, I have to wait until the first week Of december to have all the papers so I can register the store with the government and put the site live. Could the guarantee begin then, since in November I will have no activity?

I will check up on that and will let you know..

S
Profile Image
Me

Oct 27, 1:25 PM
I wanted to let you know that the 1-month support period begins right after the final delivery.
Any adjustments, updates, or refinements you’d like (design tweaks, text edits, small fixes, etc.) will all be covered during that support period.
Once the support period ends, any future updates would fall under a new service request but don’t worry, I’ll make sure everything is running perfectly before we wrap it up.
Please let me know how you’d like to proceed.

V
valentimc

Oct 27, 2:11 PM
Thank you! I’ll check it out carefully tonight and let you know!

S
Profile Image
Me

Oct 29, 7:05 PM
Ok

S
Profile Image
Me

Oct 31, 1:42 PM
Hi,

I’m excited to deliver your Bébé Europa Shopify store fully built, refined, and ready to launch.

Your store has been designed with a clean, elegant, and family-friendly aesthetic inspired by your references. It’s built to give you complete flexibility for future growth from adding brands and products to expanding sustainability features and marketing automations. Every element reflects Bébé Europa’s calm, trustworthy, and sustainable spirit while staying conversion-focused and easy to manage.
✅ Full Shopify setup from scratch — theme installation, structure & design customization
✅ Homepage, Shop, Brands, Sustainability, and Contact pages with smooth navigation
✅ Product filtering system by brand, size, and sustainability criteria
✅ Custom icons & color-coordinated sustainability tags linked to explanations
✅ Optimized product layout with brand info pop-ups and internal linking
✅ SEO setup, speed optimization, and responsive mobile-first design
✅ Mail, analytics & trust badge integrations for launch readiness
I’m sending the delivery now to officially close the order on Fiverr but please know I’m not going anywhere. You still have my 1-month post-delivery support, and I’ll continue refining anything you need until everything feels absolutely perfect.

🧾 Next Step:
Please share the mail address you’d like to use for Shopify ownership transfer, and I’ll initiate the transfer immediately so you have full control over your store.

Even after delivery:
If you’d like to adjust text, layout, or colors or add new features or brands just message me anytime in the inbox and I’ll take care of it right away. My goal is for you to feel completely confident and proud of your new store.

It’s been a genuine pleasure creating this for you. I truly believe Bébé Europa has the perfect foundation to grow and shine.

Warm regards,
Shreyansh Singh
Digital Marketing Heroes


bebe europa.png

(365.13 kB)

V
valentimc

Oct 31, 10:13 PM
Replied

Me

Oct 27, 1:25 PM

I wanted to let you know that the 1-month support period begins right after the final delivery. Any adjustments, updates, or refinements you’d like (design tweaks, text edits, small fixes, etc.) will all be covered during that support period. Once the support period ends, any future updates would fall under a new service request but don’t worry, I’ll make sure everything is running perfectly before we wrap it up. Please let me know how you’d like to proceed.

Hi Shreyansh, thank you for finishing the website. I am still checking everything and making a list of revisions. I’ll send you a few notes you can start working on while I check the rest

1) the tone of pink of the text boxes is perfect now, I just wanted to see if you could add more tints to make it lighter, more pastel.

S
Profile Image
Me

Oct 31, 10:46 PM
Thank you for the update! I’m really glad you liked the current pink tone. I can definitely make it a bit lighter and give it a more pastel look. Once you share the rest of your notes, I’ll take care of everything together to keep the revisions consistent.

Looking forward to your full list so we can finalize the updates smoothly.

V
valentimc

Nov 01, 12:26 AM
I’ll do my best to send it tomorrow!

V
valentimc

Nov 01, 12:27 AM
I’m really happy with your work so far, really happy to have chosen you!

S
Profile Image
Me

Nov 01, 10:38 AM
Thank you so much for your kind words really made my day !

V
valentimc

Nov 03, 3:37 AM
Hi Shreyansh,

V
valentimc

Nov 03, 3:38 AM
Here is the list of what I could see on the website:

V
valentimc

Nov 03, 3:38 AM
1) 1) the tone of pink of the text boxes is perfect now, I just wanted to see if you could add more tints to make it lighter, more pastel.

V
valentimc

Nov 03, 4:38 AM
GENERAL:
1)	the tone of pink of the text boxes is perfect now, I just wanted to see if you could add more tints to make it lighter, more pastel.
HOME PAGE:

2)	The header with the dress, store name and “the tabs:  shop, sustainability , brands, Blog, about Us and contact”” disappears when we scroll down, both in the mobile and in the computer. I would like to make it fix so that, no matter how far down they scroll, they can still see the header at all times.

V
valentimc

Nov 03, 4:39 AM
3)	I Would prefer to remove the first big stock photo of clothes on a hanger. Perhaps keep the background white, put the Logo and store name (in larger size than in the header) in the center, Turn the font from the writing “Sustainable European baby & Kids clothing, Unique, pre-loved, etc.) to black, and color the “shop now” button in the same pastel dusty rose that will be the theme of the site. 

4)	As we scroll down, please remove stock photos from “New Arrivals”, “Girl”, and Boy. Same as above, leave white background, Font in black, rose “shop” buttons. You can use the graphs I sent you that I paid licensing for commercial use. I’ll send them again belo: the rocking horse for “boys”,  Dress # 18 for “girls” (it’s slightly different than the dress in the logo), and the baby socks for “new arrivals”

5)	Social media icons: Leave only facebook, Instagram, tiktok and youtube

6)	In Quick Links, please write “Brands” instead of “Collections”




FIRST TAB (“SHOP”):
Since I won’t sell accessories in the beginning, we can have a  “Made in the EU”  category.

SECOND TAB (“SUSTAINABILITY”) :

On the title, please write “Sustainability Measures We Love” instead of “our sustainability measures”
The icons  is the most serious issue we have and must correct. I’m afraid we cannot use the same green sustainability icons as on the site “wat mooi” because the pink flowers on them are part of their brand logo. Also, I will need some different icons for some categories not yet categories. I will send you the exact list of categories tomorrow, Monday, Nov 3. In the meantime, please just tell me what we can do about the icons. I’ve seen some collections of sustainability icons licenses online, should I buy the commercial license for a set and pass it to you, or can you get new icons yourself?  

Also, about the icons, if possible, I would like to make green little bit more “light olive green”, as to match the details on the dress in the logo. 

The text boxes here I expect will also be on a lighter, pastel rose as in the rest of the website, correct?

V
valentimc

Nov 03, 4:53 AM
Since I cannot edit my messages, i am reposting my previous message with the requests numbered, to make it easier for you. When you work, you can go straight from request number 6) in the previous message to number 7) below: 

7)	FIRST TAB (“SHOP”):
SECOND TAB (“SUSTAINABILITY”) :
8)	On the title, please write “Sustainability Measures We Love” instead of “our sustainability measures”
The icons  is the most serious issue we have and must correct. I’m afraid we cannot use the same green sustainability icons as on the site “wat mooi” because the pink flowers on them are part of their brand logo. Also, I will need some different icons for some categories not yet categories. I will send you the exact list of categories tomorrow, Monday, Nov 3. 
9)	In the meantime, please just tell me what we can do about the icons. I’ve seen some collections of sustainability icons licenses online. Should I buy the commercial license for a set and pass it to you, or can you get new icons yourself?  

10)	Also, about the icons, if possible, I would like to make green little bit more “light olive green”, as to match the details on the dress in the logo. 

The text boxes here I expect will also be on a lighter, pastel rose as in the rest of the website, correct?

V
valentimc

Nov 03, 4:55 AM
* Correction: 7) FIRST TAB (“SHOP”):
Since I won’t sell accessories in the beginning, we can have a  “Made in the EU”  category.

V
valentimc

Nov 03, 4:58 AM
THIRD TAB (“BRANDS”): 
Same as with the textboxes in “Sustainability”, I hope this all will be colored in the pastel rose theme-tone. BTW, I’m really REALLY impressed that you researched each brand and wrote their own slogans on each one of them!!! This is an incredible level of detail and I will recommend you to everyone I know! I also love the idea of making pop-ups when clients click on brands on products pages to ensure conversion, thank you so much. 
11)	Just please remove the link at the bottom of all pop-ups “Please visit our brand page”. The only other change I ask: 
12)	since I don’t have partnerships (yet) with any of those brands, I would like you to write on the title “Our Favorite Brands” instead of “our partner brands”

Tabs “Blog”, about us and contact are fine.

HEADER
13)	At the end of the header, where I see the EU symbol for currency, is it possible to also have options of automatic translation into other European languages?
Also, back to the first tab “SHOP”: can you add the category “All Products”, listing all products in addition to “boy”, “girl” ” Made in the EU” and “Unisex”?

V
valentimc

Nov 03, 5:09 AM
FROM FILTERING:
15)	Please remove criterion “Availability”, since I only have one unit of each product.
16)	Condition: please rename the conditions from excellent, good and like new to: “New with Tags”, “Almost New”, “Gently Used”, and “Great for the Playground”
17)	Instead of “Age Groups”, please write “Sizes” (as I will add the actual sizes of each age group). 
18)	Instead of “Country”, let’s call it “Place of Origin” with three possible options: “Made in the EU”, “EU and Neighboring Countries”, and “Fair Global Production”.
19)	From “Sorting”, please remove the options “alphabetically” and “best-selling”

FROM PRODUCT PAGES:
20)	Will the drop-down windows disappear? I don’t need them
21)	The product brand is listed twice in each product description: once in the drop-down window, and once at the bottom, where it opens the pop-up. Can we leave only the one with the link to the pop-up?
22)	Please remove section with “care instructions”,
23)	Please remove star ratings
24)	Please remove “write a review” buttohn
25)	In all products pages: please go directly from “brand & origin” to “you may also like”. Please remove all photos and text in between.

V
valentimc

Nov 03, 5:24 AM
That is all I have for now. Please let me know if I need to buy more sustainability icons or if you can get new ones.  Just so we don't waste time, here are the 5 categories I need icons for: Non-Toxic Dyes (this can go in place of "Bamboo" with a new , more appropriate icon. "Pollution Reduction Measures" (this can go in place of the category "Clean Production" with a new icon); "Other Natural Fibers" (this can go in place of Linen and keep the same icon; "Renewable Energies" (in place of "Hemp" with a new icon); Reduced Water Consumption (in place of "Soy" with a new icon. ) Please let me know!

V
valentimc

Nov 03, 5:25 AM
6 Files

Download All

1.png

(2.73 MB)


18.png

(2.57 MB)


11.png

(2.47 MB)


13.png

(848.2 kB)


9.png

(2.07 MB)


5.png

(1.91 MB)

S
Profile Image
Me

Nov 03, 7:19 AM
Thank for detailed feedback. I'll go through them carefully and implement them on the store. I'll keep you updated.

V
valentimc

Nov 03, 4:19 PM
Thank YOU so much for your patience!

S
Profile Image
Me

Nov 04, 10:22 PM
I wanted to inform you that I’m currently implementing the updates you’ve shared. However, as the store is still on a trial plan. To proceed smoothly and ensure all features function as intended, please consider upgrading your Shopify plan.

V
valentimc

Nov 04, 11:58 PM
Yes, of course, I’ll do it tomorrow!

S
Profile Image
Me

Nov 05, 12:00 AM
Thanks

V
valentimc

Nov 05, 12:00 AM
Do I create an account and you can migrate the website to the new account or do I need to upgrade the account that currently contains the website ?

V
valentimc

Nov 05, 3:06 PM
Hi Shreyansh, I am ready to purchase the Shopify membership, just wanted a confirmation from you: is Basic level sufficient for me?

V
valentimc

Nov 05, 3:08 PM
Also: do I create a new account and pay for it, or do I upgrade the account you created ?

V
valentimc

Nov 05, 3:20 PM
I saw the website today, and I love the top image with the big dress and store name! I have a few remarks I would like to make:

a) the larger dress seems very low resolution. I own the images, is there a way I can send you the original (not through fiverr) to make it look clearer, with more definition?

b) for the other images that I sent (horse, socks, etc) , can you make them smaller and put the words (“new arrivals”, “boys”, “girls”, etc.) beside the picture (on the white background)?

c) one more favor: on the header with the small picture of the dress and the tabs, would it be possible to increase a tiny bit the space between the dress and the store name?

Thank you so much!

S
Profile Image
Me

Nov 05, 4:40 PM
Yes, the Basic Shopify plan is perfectly fine for now. You can upgrade later if needed. Buy the plan so I can make changes.

V
valentimc

Nov 05, 7:31 PM
So I create a new account, pay for basic and add you as collaborator?

S
Profile Image
Me

Nov 05, 7:31 PM
No

S
Profile Image
Me

Nov 05, 7:31 PM
Buy tge basic plan of the same store

V
valentimc

Nov 06, 2:45 PM
What is the email you used for the login at Shopify?

S
Profile Image
Me

Nov 06, 9:45 PM
Hi! I wanted to let you know that there are two ways you can get access and buy the Shopify plan. 

The first is that we give you admin access, and then you simply add us as a collaborator so we can continue working on the store. However, if we transfer ownership now, Shopify requires the plan to be purchased within 6 hours, otherwise the store may be automatically deleted.

The second option is that you log in directly using the mail and buy the plan yourself, once the store is complete, we’ll transfer admin access to your own mail so you have full ownership.  For your convenience, we’ve also shared the login credentials.


login id -samuel.price35 at hotmail.com
password- Sam at 3942

Using 'at' instead of symbol to avoid fiverr flagging this message.

V
valentimc

Nov 08, 2:01 AM
Thank you, I’ll take care of that

V
valentimc

Nov 10, 10:18 PM
Hi Shreyansh, i have tried to pay for Shopify but it is set for Indian rupees and my credit card is not going through. I tried to change it to USD but it’s not allowing me. Could you kindly change it to US-dollars as I am trying to pay with an American credit card ? Thank you in advance

V
valentimc

Nov 11, 2:17 PM
Hi Shreyansh, please let me know when you make the change so I can make the payment on Shopify

S
Profile Image
Me

Nov 11, 3:53 PM
I will inform you as soon as I change the settings for payment

S
Profile Image
Me

Nov 11, 4:34 PM
I’m currently unable to change the billing currency from my side. You can update it directly by following the steps below:

If you're located in an eligible country or region, you can change your billing currency. Here's how:

Go to Settings > Billing in your Shopify admin.

Click Billing profile.

In the Address and currency > Currency section, click Manage.

Select your new billing currency in the dialog.

Click Confirm.

Local currency billing is available in Australia (AUD), Canada (CAD), European Union countries (EUR), India (INR), Japan (JPY), Singapore (SGD), and United Kingdom (GBP).
Changes take effect on your next billing cycle, and any outstanding charges will be billed in your original currency.

V
valentimc

Nov 11, 10:01 PM
Hi Shreyansh, the issue is that, the solution you sent is only available for active stores. Right now the store is not active, it needs payment to become active so we can even get to the billing profile. And the payment, of course, is not going through because of the currency issue.

V
valentimc

Nov 11, 11:44 PM
My husband spoke with Shopify help center for 45 minutes, and apparently there is no way around it—until the account is paid nothing can be changed, and until the currency is changed nothing can be paid. I’m thinking that there is only one way to get out of this vicious cycle:

V
valentimc

Nov 11, 11:45 PM
Would you consider paying the 20 rupees to reactivate the access to the account?

V
valentimc

Nov 11, 11:45 PM
1 File


PHOTO-2025-11-11-19-11-27.jpeg

(82.87 kB)

V
valentimc

Nov 11, 11:47 PM
Once you pay and regain access you can change the login info and immediately remove the credit card info so we don’t have access to it.

V
valentimc

Nov 11, 11:47 PM
So you can have peace of mind

V
valentimc

Nov 11, 11:48 PM
Then you can create a new login and password and share it with us

V
valentimc

Nov 11, 11:49 PM
Unless you can think of another way for us to pay it

V
valentimc

Nov 11, 11:52 PM
Never mind, Shopify’s help center changed it!

V
valentimc

Nov 12, 12:11 AM
Replied

valentimc

Nov 11, 11:44 PM

My husband spoke with Shopify help center for 45 minutes, and apparently there is no way around it—until the account is paid nothing can be changed, and until the currency is changed nothing can be paid. I’m thinking that there is only one way to get out of this vicious cycle:

It’s paid

S
Profile Image
Me

Nov 12, 8:54 AM
Thank you so much for your efforts. I really appreciate it. I'll resume my work shortly.

S
Profile Image
Me

Nov 13, 12:51 PM
Thank you for your recent feedback.
I am working on your recent changes. Please send me the original high-resolution images for the first change so I can replace them and make the banner look clearer and more defined.
(You can share the google drive link for the images)
Also, could you please send the sustainability icons you’d like me to use? That will make it easier for me to add the correct ones without wasting time.

V
valentimc

Nov 15, 1:24 AM
Here''s the link of the images to add to the website:  https://drive.google.com/drive/folders/1UPJ97FosJrwX3vhgHxRsPD6-OOEqy-Id?usp=drive_link

V
valentimc

Nov 15, 1:26 AM
I'll buy the rights for the sustainability icons and will share them with you as soon as I get them

V
valentimc

Nov 15, 3:05 AM
hopefully tomorrow

S
Profile Image
Me

Nov 15, 10:13 AM
Thank you for sharing the Google Drive link I’ve received the images and will start placing them on the website.
And sure, once you purchase and send the sustainability icons, I’ll add those as well.

V
valentimc

Nov 17, 3:15 AM
Here are the icons I bought:

V
valentimc

Nov 17, 3:15 AM
https://drive.google.com/file/d/1ZTvUdYu_Owz-j2zXsvxBC5CiUTT6Ug60/view?usp=sharing

V
valentimc

Nov 17, 3:32 AM
use this link: https://drive.google.com/drive/folders/1sZbMFDnG0zUHfh86zT80IFLUyq79LN60?usp=sharing

V
valentimc

Nov 17, 3:36 AM
in terms of colors of the icons, I would like them to be a light olive green circle with the icon drawns in a darker olive line. Look at the light green icons from this set as inspiration:

V
valentimc

Nov 17, 3:37 AM
https://creativemarket.com/pepulousdsg/42290429-Icon-Design-Set-Environment

V
valentimc

Nov 17, 3:52 AM
These are the 16 sustainability criteria we'll have, and I tried to draw the icon to be used for each one. What I drew in red already exists in the files I purchased. What I drew in green is to be combined from other files from the purchased icons folder

V
valentimc

Nov 17, 3:52 AM
1 File


IMG_8050 (002).jpg

(2.57 MB)

V
valentimc

Nov 17, 3:58 AM
Most changes is just adding a circle around the icon (and a light olive green fill). The only significant modifications I would like to see if you can make is: 10) add a small leaf overlapping with the yarn ball. 16) Put the letters "EU" in the map; and 14) If possible, take the bottle icon, the t-shirt (without the recycling symbol) icon, and connect them with a curved arrow.

V
valentimc

Nov 17, 4:16 AM
About item 16; the 3 icons I would like you to combine are the bottle on page 103; the arrow on page 125; and the t-shirt of page 13. If itrequires too much work let me know and I will think of something else simpler.

V
valentimc

Nov 17, 4:17 AM
When you put the icons on the website, please write their names underneath, outside of the circle (as in my hand-drawing).

V
valentimc

Nov 17, 4:19 AM
And I forgot one very important criteria! here it is: Number 17) Fair Fashion . (Please use the icon number 130 ).

V
valentimc

Nov 17, 4:23 AM
Please let me know if anything is unclear!

V
valentimc

Nov 17, 4:24 AM
Thank you very much for your hard work!

S
Profile Image
Me

Nov 17, 12:13 PM
Thank you for sharing the icons I will add those. And yes, If I won't understand anything I will ask you

S
Profile Image
Me

Nov 17, 7:58 PM
I just want to confirm that this icon is correct or not. I have created two icons as you said I have added color please check and let me know if this is correct or not. Or you want any other changes

Download All

unnamed (15).jpg

(62.41 kB)


unnamed (16).jpg

(57.36 kB)

S
Profile Image
Me

Nov 17, 8:04 PM
Please let me know if this is correct or not so I can move forward with these icons

V
valentimc

Nov 17, 9:20 PM
They are perfect!!

V
valentimc

Nov 17, 9:20 PM
Thank you for asking!

V
valentimc

Nov 17, 9:43 PM
So just to confirm: each product on sale will have about  2-4 of these icons, for example: a T-shirt may have the cotton, the organic, the locally made and the made in the EU icons. I would like them to be small and all in a horizontal line, just like in watmooie website. I’ll add a link to one of their product pages:

V
valentimc

Nov 17, 9:43 PM
https://www.watmooi.nl/shop/lounge-sweater-hailey-black-van-bamboo-basics-p-14681.html

V
valentimc

Nov 17, 9:46 PM
If clients click on an icon it opens/goes to the Sustainability  box that explains what that icon means. And clients can also filter products by the icon names (the ones I wrote in the notebook). Thank you so very much!

S
Profile Image
Me

Nov 18, 10:24 AM
Ok thank you so much for the confirmation I will create other icons like that and also as you mention I will add sustainability icons to the product page in horizontal line and when click on that icon it will redirect to the explanation of that sustainability icon

S
Profile Image
Me

Nov 20, 9:10 PM
I want to tell you that I have added the icons as you want in the product page you can check. If you want any other changes then tell me, I will make the changes

S
Profile Image
Me

Nov 22, 12:27 AM
I’ve now added the sustainability icons to the product pages exactly as requested, and everything is functioning beautifully with the click-through to the explanation section. If you’d like any last refinements or adjustments, just let me know — I’m here and happy to keep polishing things.

Also, since Fiverr has now opened the review window for this order, it would mean a lot to me if you could share your experience when you have a moment 🌟
Your feedback helps our small business grow and supports us so we can continue delivering this level of detail and care to every client.

As a thank-you, I’ll add a complimentary extra 1 month of support to your project — including updates, troubleshooting, and any additional tweaks you’d like.

Thank you so much for trusting me with your brand — and I’m right here if you need anything else!

S
Profile Image
Me

Nov 22, 12:28 AM
https://www.fiverr.com/orders/FO114457CC0C5/activities

V
valentimc

Nov 22, 7:26 PM
Thank you, I’ll look at it tonight!

V
valentimc

Dec 09, 6:25 PM
Dear Shreyansh, thank you so much for your hard work and patience. The website is *beautiful*, I would just appreciate some minor tweaks that I will list below!

S
Profile Image
Me

Dec 09, 6:28 PM
Replied

valentimc

Dec 09, 6:25 PM

Dear Shreyansh, thank you so much for your hard work and patience. The website is *beautiful*, I would just appreciate some minor tweaks that I will list below!

Yes sure go ahead and drop it  in chat and i will take care of it no problem

V
valentimc

Dec 09, 6:29 PM
1) Uniformize the rose-color of the text-boxes, buttons and banner fills: I love the lighter rise you used in the Brands tab! It would be great if you could use it all over the site! Below is an example of the different intensities


IMG_8200.jpeg

(622.71 kB)

V
valentimc

Dec 09, 6:40 PM
2) Uniformize the green fill of the sustainability icons. The icons came out amazing, better than I imagined—thank you so much for the time you invested making them! The only issue I see is that the green fill is varies slightly among the icons, esp. in the last three ones. It would be great if they could all have the exact same fill. The lighter, more paste green on icon “non-toxic dies” is great, if you could  copy it on all icons it would be great.

V
valentimc

Dec 09, 6:44 PM
3) when I click on “brands” in “quick links” at the bottom of the page, it goes to “collections” instead

V
valentimc

Dec 09, 7:09 PM
I asked you to change the name of the link (from “collections” to “brands”  in my request for change 6) on November 03 above) but I forgot to ask you to link it to the appropriate page, sorry

V
valentimc

Dec 09, 7:37 PM
4) so far I’m looking only in the mobile version, I still need to look at it  at the desktop version. 

4)In the “home page” of the mobile version, it would be great if you could a) make the dress and”Bebe Europa” slightly bigger, b) bring them both just a tiny bit farther up, and c) bring “sustainable European…” just a tad closer to “Bebe Europa”, so that when we scroll all the way up we have a beautifully laid out visual of the logo, name of the store and 1
2-line store description, all in one screen, as I drew below


IMG_8208.jpeg

(259.01 kB)

S
Profile Image
Me

Dec 09, 7:43 PM
I will make all the changes and inform you

V
valentimc

Dec 09, 7:43 PM
Thank you!

V
valentimc

Dec 09, 7:49 PM
5) Just as you did in the banner (it looks great now!), could you also separate a bit “Bebe Europa” from the dress in the footer? Perhaps centralize it instead of justifying to the left, too.


IMG_8211.jpeg

(592.86 kB)

S
Profile Image
Me

Dec 09, 7:52 PM
Replied

valentimc

Dec 09, 7:49 PM

5) Just as you did in the banner (it looks great now!), could you also separate a bit “Bebe Europa” from the dress in the footer? Perhaps centralize it instead of justifying to the left, too.


I will try for this change and let you know

V
valentimc

Dec 09, 7:55 PM
6) one more small correction: Re item 16 from Nov 03,  in the product filters, under “condition”, can you leave only these 4 conditions and write them in this order: “New with Tags”, “Almost New”, “Gently Used”, and “Great for the Playground”

S
Profile Image
Me

Dec 09, 7:56 PM
sure , I will make this change

V
valentimc

Dec 09, 8:31 PM
7) where is the filter “materials” getting its information from? Shouldn’t they match the materials from the sustainability criteria? Let’s have the following materials in the filter, in this order, please: Organic Cotton, GOTS Certified, OEKO-TEX Certified, Bamboo, Linen, Other Natural Fibers, Recycled Polyester

V
valentimc

Dec 09, 8:35 PM
Ah no, disregard my last comment. I see we already have a filter for the “sustainability” criteria

V
valentimc

Dec 09, 8:45 PM
7) for the sustainability icons, I was hoping from the start that they would function both ways to and from the products page. I love it that when I click on the icons in the products pages it leads me to the description of that criterion in the Suatainability page. But I was hoping that clicking on the icon on the Sustainabilty page would function like the filtering function and show the client all the current products that contain that icon. Is this something difficult to do?

V
valentimc

Dec 09, 8:55 PM
8) the products pages still have some repetitions that we could delete to make them clearer. For example: under the product name and price we have “condition - new with tags”. Then the next line we have a black button with “new with tags” again. I was wondering if we could just have on the first line “Condition:” and let the type of condition appear only in the black button. Same with Place of Origin.


IMG_8212.jpeg

(107.12 kB)

V
valentimc

Dec 09, 9:00 PM
the

V
valentimc

Dec 09, 9:01 PM
9) still in the oroducts pages, we can delete the quantity box, as I will most likely have only one item of each.

V
valentimc

Dec 09, 9:04 PM
10) and still in the products page, it would be helpful if you could write "Brand:" in the same font and size as "Condition" and "Place of Origin" right above the brands names, as some brand names are not very well-known and people may not know it is a brand name

V
valentimc

Dec 09, 9:11 PM
11) Finally about the products pages, since I may have many sustainability icons, it would be great if you could make them smaller , so I can fit many in one line, like in the site I sent you as inspiration watmooi dot nl

V
valentimc

Dec 09, 9:11 PM
1 File


IMG_8213.png

(289.97 kB)

S
Profile Image
Me

Dec 09, 9:14 PM
I will make changes and inform you

V
valentimc

Dec 09, 9:16 PM
Summary of changes on product pages


IMG_8214.jpeg

(782.95 kB)

V
valentimc

Dec 09, 9:26 PM
12) My next-to-last request is to see if you could make, on the home page, the illustrations of the dress and horse slightly bigger, proportional to the illustration of the pink socks (new arrivals), and also repeat the illustrations at the top of each page they lead to: the dress on top of the girls selections (right above where it says "Girl", in the top center; the horse in the boys session, and the socks in the "new arrivals" page (which should be different tha

V
valentimc

Dec 09, 9:31 PM
I hope "new arrivals" will lead to a subsection showing only some of the newest added products (30-40 products in my case); not to "all products"

V
valentimc

Dec 09, 9:46 PM
13) Finally, this is one favor I would like to ask you, because it is something I changed my mind after you worked, so I will understand if you do not feel like doing it: I wanted to change the name of the "cotton" icon in the sustainability page and sustainability filters to "100% cotton". I would be really really happy if you could do it! thank you so much and apologies for my delayed response! I will check the desktop version next and try to make a purchase to see how it responds.

S
Profile Image
Me

Dec 09, 9:52 PM
Thank you for the update I will make all this changes and I will let you know as soon as it is completed

V
valentimc

Dec 10, 12:14 AM
Make these slightly bigger


IMG_8199.jpeg

(520.88 kB)

S
Profile Image
Me

Dec 10, 11:08 AM
I will make this change also

S
Profile Image
Me

Dec 10, 10:24 PM
Hey, I want to give you update on your recent changes:
The changes which are done:
1. I have changed the color of whole store and use the color which you want 
2.I have link the

Me

Dec 10, 10:24 PM
Hey, I want to give you update on your recent changes:
The changes which are done:
1. I have changed the color of whole store and use the color which you want 
2.I have link the Brands to brands page on the footer
3. I have also change the main image banner on homepage in mobile version 
4. I have also rearranged the condition filter with this order: “New with Tags”, “Almost New”, “Gently Used”, and “Great for the Playground”
5. for sustainability icon when user click on the sustainability icon user will redirect to that specific icon explanation and below that I have added products which are related to that sustainability icon
6.As you told there are some repetitions on product page I have corrected it now there is no repetitions
7.Quantity box is also removed now.
8.I have added "Brand:" in product page same as "condition" and "place of origin" 
9.Also I have changed the cotton on sustainability icon and filtering to 100% cotton

The changes which are remaining (In Progress):
1.I have changed the green color in sustainability icon some icons are remaining and I am working on that.
2.Also as you want sustainability icon size smaller on product page they are almost done but as the above change means as the remaining icon color will change then I will replace the remaining icons with that icon
3.And you want the logo in center on the footer I am also working on this change 

And only 1 change which I can't understand is this: 
12) My next-to-last request is to see if you could make, on the home page, the illustrations of the dress and horse slightly bigger, proportional to the illustration of the pink socks (new arrivals), and also repeat the illustrations at the top of each page they lead to: the dress on top of the girls selections (right above where it says "Girl", in the top center; the horse in the boys session, and the socks in the "new arrivals" page (which should be different tha
please can you again explain me this change with the screenshot ?

Please check all the done changes If you want any other change then let me know I will make it .

V
valentimc

Dec 10, 10:57 PM
Thank you so much Shreyansh! I’m so happy to see the website coming to perfection! I will send you screenshots later today.

V
valentimc

Dec 10, 10:59 PM
Also, I wanted to schedule a day for a brief video call before my 30 days are over so you can show me how to make changes on the website

V
valentimc

Dec 10, 11:05 PM
I also wanted to know how I can add the option for translation into Dutch.  is it free on Shopify or do I have to pay for each language plugin individually?

S
Profile Image
Me

Dec 11, 11:59 AM
Replied

valentimc

Dec 10, 10:57 PM

Thank you so much Shreyansh! I’m so happy to see the website coming to perfection! I will send you screenshots later today.

Yes please send the screenshot so I will make the changes

S
Profile Image
Me

Dec 11, 12:02 PM
Replied

valentimc

Dec 10, 11:05 PM

I also wanted to know how I can add the option for translation into Dutch. is it free on Shopify or do I have to pay for each language plugin individually?

For translation into Dutch it is free. I have added a option for language translation the button for translation is at the footer you can check.

S
Profile Image
Me

Dec 11, 1:16 PM
Replied

valentimc

Dec 10, 10:59 PM

Also, I wanted to schedule a day for a brief video call before my 30 days are over so you can show me how to make changes on the website

Yes sure, we will schedule a day before your 30 days over . let me know your available day and time so I will share the google meet link with you and then I will show you how you can make changes on website

V
valentimc

Dec 11, 4:42 PM
Replied

Me

Dec 10, 10:24 PM

Hey, I want to give you update on your recent changes: The changes which are done: 1. I have changed the color of whole store and use the color which you want 2.I have link the Brands to brands page on the footer 3. I have also change the main image banner on homepage in mobile version 4. I have also rearranged the condition filter with this order: “New with Tags”, “Almost New”, “Gently Used”, and “Great for the Playground” 5. for sustainability icon when user click on the sustainability icon user will redirect to that specific icon explanation and below that I have added products which are related to that sustainability icon 6.As you told there are some repetitions on product page I have corrected it now there is no repetitions 7.Quantity box is also removed now. 8.I have added "Brand:" in product page same as "condition" and "place of origin" 9.Also I have changed the cotton on sustainability icon and filtering to 100% cotton The changes which are remaining (In Progress): 1.I have changed the green color in sustainability icon some icons are remaining and I am working on that. 2.Also as you want sustainability icon size smaller on product page they are almost done but as the above change means as the remaining icon color will change then I will replace the remaining icons with that icon 3.And you want the logo in center on the footer I am also working on this change And only 1 change which I can't understand is this: 12) My next-to-last request is to see if you could make, on the home page, the illustrations of the dress and horse slightly bigger, proportional to the illustration of the pink socks (new arrivals), and also repeat the illustrations at the top of each page they lead to: the dress on top of the girls selections (right above where it says "Girl", in the top center; the horse in the boys session, and the socks in the "new arrivals" page (which should be different tha please can you again explain me this change with the screenshot ? Please check all the done changes If you want any other change then let me know I will make it .

Hi Shreyansh, thank you for making all the changes so fast! Here are some screenshots to help clarify item 12). Sorry that my drawing on the phone screen is terrible. Let me know if it is still not clear

V
valentimc

Dec 11, 4:45 PM
First, I wanted to see if you can make this pic just a tiny bit bigger (looking at my phone screen, I wish it were about 1mm bigger on each side).


IMG_8251.jpeg

(217.09 kB)

V
valentimc

Dec 11, 4:47 PM
The bigger image should still fit in the blue square I drew

V
valentimc

Dec 11, 4:48 PM
Same here; just a tiny bit larger:


IMG_8252.jpeg

(195.64 kB)

V
valentimc

Dec 11, 4:52 PM
Then on “Girls” page, put image of Dress2 on top center (same size as in home page), the word “Girls” underneath, then the first photo

Download All

IMG_8256.jpeg

(824 kB)


IMG_8257.jpeg

(168.54 kB)

V
valentimc

Dec 11, 4:54 PM
In “Boys” page: horse illustration, word “Boys” underneath, then blue jacket photo


IMG_8254.jpeg

(902.88 kB)

V
valentimc

Dec 11, 4:56 PM
In “New Arrivals”: make illustration smaller so it’s not cut (whole socks appear). Set it on top center, then “New Arrivals” underneath, and then first photo

V
valentimc

Dec 11, 5:03 PM
In the footer: bring text a bit closer to logo. Also: it is visible that you pasted there a pic containing the dress and the name: I can see the shape of the picture because the background of the dress is slightly different than the background of the website. Can you make it smoother? Perhaps if you use the original image of the dress in the shared google file and the actual font? I think I purchased this font too, I can add it to the google file


IMG_8255.jpeg

(525.39 kB)

V
valentimc

Dec 11, 5:10 PM
I enhanced the contrast here for you to see that the background of the logo is a bit darker than the background of the page- but in my phone this different is visible without any enhancing. I wish the dress and name would sit seamlessly on the white background of the header and footer


IMG_8260.jpeg

(586.46 kB)

V
valentimc

Dec 11, 5:44 PM
Bébé Europa is written in La Luxes (serif) font

V
valentimc

Dec 11, 5:45 PM
You can get it here: https://freefontgenerator.net/la-luxes-font/

V
valentimc

Dec 11, 5:47 PM
In addition to the darker background, the definition of the dress illustration in the header and footer is visibly low, too. If there’s a way you could make it look sharper it would be great!

S
Profile Image
Me

Dec 11, 5:59 PM
Thankyou for the update I will look at this all the changes and I will let you know as soon as it is completed

S
Profile Image
Me

Dec 12, 8:05 PM
Hi, I want to give you update on your recent changes
All the changes are done 
1.The image of dress and horse are now big
2.In girl , boy and new arrivals page I have added layout as you want 
3.Then In footer reduce the space between image and text 
4.And also I used the font which you have sent and again I added proper image on header and footer
Please have a look on it and let me know if you want any other changes

V
valentimc

Dec 12, 11:00 PM
Thank you so much Shreyansh! The site is so beautiful now! The header and footer look great now, the sustainability icons size in the products pages are the perfect size, the colors are uniform, the sizes of the illustrations are perfect! Just a couple small things are left:

V
valentimc

Dec 12, 11:01 PM
This text box is still in dark pink


IMG_8265.png

(368.21 kB)

V
valentimc

Dec 12, 11:03 PM
The brands start with two squares per line and thn become one large rectangle per line. It would be great if you could make them all 2 squares per line


IMG_8267.png

(296.49 kB)

V
valentimc

Dec 12, 11:08 PM
When I click on individual products I still see two invitations for subscription: “Subscribe to our emails” followed by “Join our family”. I would like to have only one: “Join our family”


IMG_8269.jpeg

(252.5 kB)

V
valentimc

Dec 12, 11:15 PM
Finally, I would like to ask
You to use the ligature between the R and the O where you wrote Bebe Europa at the top of the home page


IMG_8266.jpeg

(253.87 kB)

V
valentimc

Dec 12, 11:17 PM
For the rest there are some other small things like spelling, spacing, using caps letters etc that I think I can fix myself later

V
valentimc

Dec 12, 11:19 PM
I am on vacation this week and the next and don’t have my computer with me. I’ll take a look at the desktop version from my husband’s computer tomorrow and will let you know if it needs any tweaks.

V
valentimc

Dec 12, 11:21 PM
If you are available, Dec 22 or 23 would be the best days for me to have a meeting; I’m free all day those 2  days. If that doesn’t work for you let me know when you’re available and I’ll try to match your schedule!

S
Profile Image
Me

Dec 13, 10:39 AM
Thankyou for your update I will make the remaining changes

S
Profile Image
Me

Dec 13, 10:41 AM
Replied

valentimc

Dec 12, 11:21 PM

If you are available, Dec 22 or 23 would be the best days for me to have a meeting; I’m free all day those 2 days. If that doesn’t work for you let me know when you’re available and I’ll try to match your schedule!

Yes this both days best to do a meeting let me know 1 day 22 or 23 Dec we will do meeting on that day .

S
Profile Image
Me

Dec 13, 10:07 PM
Hey , I want to give you update of your recent remaining changes
All the changes are done now 
1.I have change the background color of text box which is in dark pink
2.In brands page all the brands will have 2 squares per line now
3.I have also removed the extra email signup from the product pages 
4.And I have also change the home page image banner with proper font .

V
valentimc

Dec 20, 5:05 PM
Can we meet on Tuesday the 23rd at 13:30h Brussels time? If yes, send me
A link on a platform
Of your choice

S
Profile Image
Me

Dec 20, 6:13 PM
Yeah sure this time and date is perfect for meet . I will send you the google meet link on 23rd dec Tuesday

S
Profile Image
Me

Dec 23, 5:50 PM
Here is the google meet link: https://meet.google.com/knc-zpfk-wmz

V
valentimc

Dec 23, 8:31 PM
Hi Shreyansh, I’m so, so sorry I missed our meeting. I checked my emails until 13:15h today, and  Since I did not see a message from you with the chat link, I thought you had forgotten our meeting and I went with my husband to visit a client of his. Please accept my sincere apologies, I almost never stand people up unless there is a real serious medical emergency! Please let me know another day and time of your choice on any of the next days; I’m free from 11-18h on the 24th;  on the 26th from 17-20h and on the 27th from 11h until 17h. If none of these work for you we can set for next week, on the 29th or 30th at 13:30h. Let me know what you prefer!

S
Profile Image
Me

Dec 23, 11:16 PM
It's ok I will share you the meeting link tomorrow 24th Dec

S
Profile Image
Me

Dec 24, 3:14 PM
Here is the google meet link join at 11h: https://meet.google.com/irt-wvrx-rce

S
Profile Image
Me

Dec 24, 3:51 PM
Can you please tell me the today's fix available time for meet? so that I will share the google meet link with you at that time

V
valentimc

Dec 24, 4:39 PM
Can you meet in about 2 hours, at 14h Brussels time?

S
Profile Image
Me

Dec 24, 5:12 PM
Yeah sure , I will send you the google meet link at 14h

V
valentimc

Dec 24, 5:29 PM
Great, thank
You for letting me know in advance, see you there!

S
Profile Image
Me

Dec 24, 6:22 PM
Join using this link https://meet.google.com/irt-wvrx-rce

V
valentimc

Dec 25, 4:14 PM
Thank you so much for everything Shreyansh, you did an amazing job ! I will recommend you for everyone I know! I hope you will still help me with advice if i encounter any problems with the payments on the site <3 Thanks again for your wonderful work!

V
valentimc

Dec 25, 4:28 PM
I also tried to leave a feedback now and I found out it is no longer possible on fiverr because it has been more than 30 days since delivery. please let me know if there is any other platform where I can tell others what an amazing job you did for me!

S
Profile Image
Me

Dec 25, 4:37 PM
Hi,
Thank you so much for your kind words — I really appreciate that 🙏

Just to clarify, Fiverr allows feedback to be left within 18 days after delivery, and unfortunately that window has now passed. But honestly, your appreciation already means a lot to me.

If you’d still like to share your experience, you’re very welcome to recommend my work directly to others or share it on any platform you’re comfortable with. I’d truly appreciate it.

Of course I’ll always be happy to help you with any questions or payment-related issues whenever you need 😊

Wishing you a very Merry Christmas and a wonderful holiday season 🎄
Thanks again — it was a pleasure working with you!

V
valentimc

Dec 26, 6:20 PM
Hi Shreyansh, I feel so bad that I could not leave you a raving review on fiverr! You deserved it so much! Next time I buy some other service I will leave a review for this job. Speaking of which: I’m thinking of creating another eshop, this one with a very basic website: only three types of products, filtered by brands and sizes, two languages, payments only in euro, stock photos, I’ll add the products myself.  No complicated things such as sustainability icons 😅. How much would you charge for something very simple like this?

S
Profile Image
Me

Dec 26, 11:38 PM
Hi Valentimc,

Thank you so much again for your kind words — I truly appreciate them 😊 It was a pleasure working with you, and I’d be very happy to collaborate again on your new e-shop.

Just to be transparent about pricing:
My basic website plan now starts from $800, which includes everything needed for a clean, fully functional, and professional e-commerce website.

However, since we already worked together before on a $500 order, and I really value our collaboration, I’m happy to honor the same $500 price for you and include all the features that are part of my $800 basic plan` },
  { filename: "Chat_3_DeJessHub_Coffee.txt", client: "dejesshub", niche: "Premium Coffee / Lifestyle (Australia + US)", content: `Client Name: - dejesshub



dejesshub

Oct 25, 12:10 PM
I want a Shopify store built for a premium lifestyle brand that sells coffee accessories and minimalist home tools.

The store should be:

Clean, modern, and mobile-responsive

Includes: Home, Shop, About Us, Contact, FAQs, and Shipping Policy pages

Optimized for conversion (clear CTA buttons, easy checkout, trust badges)

Integrated with email signup (Klaviyo or Omnisend)

TikTok Pixel + Google Analytics installed

Basic SEO setup (meta titles, product tags, and descriptions template)

Apps to install:

DSers or Zendrop (for product fulfillment if dropshipping)

Loox or Judge.me (reviews)

ReConvert (thank-you upsells)

Klaviyo (email automation)

Sellbrite or LitCommerce (for Etsy/eBay sync)

S
Profile Image
Me

Oct 25, 12:10 PM
Hey! I'm Shreyansh from "Digital Marketing Heroes" (2.5M+ YouTube). We teach Shopify Store Design & Brand building.

Portfolio: https://indulgentbutters.com (Pass: ROYAL) • https://americandreamprinting.com • https://shipezusa.com • https://patasymimos.com • https://gooubeauty.com • https://mycommercialkitchen.co • https://maajab.com

Enterprise Package - $1,800 (3 Months VIP Support)

Here is our complete business-ready solution designed :

→ Upto 100 products uploads 
→ Custom AI visuals for EVERY product → without designers
→ Premium theme customization → Unique brand identity
→ Mobile + Speed optimization (90+ score) → 20% fewer abandonments
→ Professional branding → Logo, colors, typography, guidelines

Advanced Conversion & Sales Systems:
→ Multi-tier upsell & cross-sell Setup
→ Trust badges & social proof integration 
→ Typography pairing for brand consistency
→ Automated email sequences (Welcome, Abandoned Cart, Post-Purchase) 
→ A/B testing setup → Continuous improvement framework
→ Complete tracking & SEO (GA4, Meta Pixel, TikTok Pixel)

Enterprise-Only Features:
→ 7 rounds of revisions → Perfect everything
→ Priority support (24-48hr response) for 3 months via Google Meet/Zoom → Never stuck during critical launch phase
→ Custom app recommendations + Seasonal Graphics → For any specific needs
→ On Demand Video walkthrough → Understand all features

🏆 Why Trust Us
✅ 8+ years Shopify/eCom experience (Fiverr Pro verified)
✅ Founder, Digital Marketing Heroes (2.5M+ YouTube subscribers)
✅ Our stores: ~4.2% conversion vs ~1.8% industry average
✅ CRO mindset & quality builds you won't find anywhere else
✅ No outsourcing: Everything done in-house personally


Share your brand vision, preferred style (minimalist/bold/luxury), and any design references you love as this helps me create the perfect look for your store! If you have a lower budget, we can explore lower package options with less features from the Enterprise plan.
Looking forward to Building together!

S
Profile Image
Me

Oct 25, 12:13 PM
hi how are you?

D
dejesshub

Oct 25, 12:13 PM
Good and you?

S
Profile Image
Me

Oct 25, 12:26 PM
I am doing good too Thanks for asking

S
Profile Image
Me

Oct 25, 12:26 PM
Replied

dejesshub

Oct 25, 12:10 PM

I want a Shopify store built for a premium lifestyle brand that sells coffee accessories and minimalist home tools. The store should be: Clean, modern, and mobile-responsive Includes: Home, Shop, About Us, Contact, FAQs, and Shipping Policy pages Optimized for conversion (clear CTA buttons, easy checkout, trust badges) Integrated with email signup (Klaviyo or Omnisend) TikTok Pixel + Google Analytics installed Basic SEO setup (meta titles, product tags, and descriptions template) Apps to install: DSers or Zendrop (for product fulfillment if dropshipping) Loox or Judge.me (reviews) ReConvert (thank-you upsells) Klaviyo (email automation) Sellbrite or LitCommerce (for Etsy/eBay sync)

we can do this no problem

S
Profile Image
Me

Oct 25, 12:28 PM
Do you have any reference site which you prefer in terms of Styles and look and you want your site to look like that?

S
Profile Image
Me

Oct 25, 12:36 PM
Replied

dejesshub

Oct 25, 12:10 PM

I want a Shopify store built for a premium lifestyle brand that sells coffee accessories and minimalist home tools. The store should be: Clean, modern, and mobile-responsive Includes: Home, Shop, About Us, Contact, FAQs, and Shipping Policy pages Optimized for conversion (clear CTA buttons, easy checkout, trust badges) Integrated with email signup (Klaviyo or Omnisend) TikTok Pixel + Google Analytics installed Basic SEO setup (meta titles, product tags, and descriptions template) Apps to install: DSers or Zendrop (for product fulfillment if dropshipping) Loox or Judge.me (reviews) ReConvert (thank-you upsells) Klaviyo (email automation) Sellbrite or LitCommerce (for Etsy/eBay sync)

How many products you initially planning to launch ?

D
dejesshub

Oct 25, 12:39 PM
At the moment. 100 products but only 2 will be my branded products. The rest maybe dropshipped.

S
Profile Image
Me

Oct 25, 12:58 PM
Replied

dejesshub

Oct 25, 12:39 PM

At the moment. 100 products but only 2 will be my branded products. The rest maybe dropshipped.

got it

D
dejesshub

Oct 25, 1:05 PM
So how much do you charge? Can you also share some sample works

S
Profile Image
Me

Oct 25, 1:07 PM
Hey there 👋

I love your brand direction — a premium lifestyle concept blending coffee culture with minimalist home design has massive potential.
We can build you a clean, conversion-focused Shopify store that feels modern, editorial, and timeless — exactly like the luxury lifestyle brands you’re referencing.

Below is a detailed overview of everything we’ll handle for your store 👇
☕ Complete Brand Store Setup (Built for Lifestyle Luxury)
🏠 Core Store Build
Home, Shop, Product, About, Contact, FAQs, Shipping Policy pages
Custom layout flow: Hero (purpose) → Story → Featured products → Lifestyle imagery → mail capture
Minimalist & premium typography + brand color pairing (warm neutrals, blacks, metallic tones)
Smooth transitions & hover animations for a refined, modern look
Fully mobile-responsive design optimized for 90+ mobile score

⚙️ Store Functionality
Smart navigation with mega-menu (for “Shop,” “Collections,” “Journal,” etc.)
Drawer cart with real-time updates, progress bars & upsell modules
Integrated search & filtering (color, category, material, price)
Variant swatches & quick view setup
Wishlist + “Recently viewed” integration

🛍️ Product Management & Conversion Enhancements
Up to 100 products uploaded (2 branded + 98 synced via DSers/Zendrop)
Dynamic cross-sell and upsell system (e.g., “Complete the Brew Set”)
Product bundle setup for lifestyle pairings
Review app integration (Loox or Judge.me)
ReConvert post-purchase upsell configuration

🧠 Marketing, Tracking & Analytics
Google Analytics 4 + Meta (Facebook/Instagram) Pixel + TikTok Pixel
Full conversion tracking setup for all channels
SEO setup: product tags, keyword structure, meta titles & descriptions
Structured data (schema) setup for better Google visibility

💌 mail & Retention Systems
Klaviyo or Omnisend integration (choose one)
Automated flows:
Welcome series
Abandoned cart
Post-purchase thank-you
Review request sequence
Branded popup for mail capture (“Join the Brew Circle — Get 10% Off”)

🔄 Omnichannel Integration
Sellbrite or LitCommerce setup for Etsy/eBay sync
Seamless product inventory syncing & order routing
Google Merchant Center + free product listings configuration

⚡ Performance, Speed & Trust
Speed optimization (90+ GTMetrix score target)
Trust badges & secure checkout integrations
Sticky add-to-cart (mobile)
Lazy loading for images + app cleanup for faster performance

S
Profile Image
Me

Oct 25, 1:07 PM
🎨 Creative Enhancements
AI-generated lifestyle imagery for banners & product showcases
Custom icon set (Minimalist + coffee/lifestyle theme)
Seasonal/launch banner graphics
Font pairing & brand guideline setup

S
Profile Image
Me

Oct 25, 1:07 PM
Here is our recent work on Art/Creative store - https://eyeamcreation.com/
1 Product/Dropshipping store - https://www.nutripium.com/
Journals/Creative Store - https://theawwshop.com/
Beauty/Wellness store - https://emani.com/
https://biggamesports.co.uk/
let me know Your thoughts :)

D
dejesshub

Oct 25, 1:12 PM
What theme do you use?

S
Profile Image
Me

Oct 25, 3:27 PM
Replied

dejesshub

Oct 25, 1:12 PM

What theme do you use?

We have out fully customized theme which made by us using inspiration from shrine theme

D
dejesshub

Oct 25, 3:34 PM
Ok, what is your cost

S
Profile Image
Me

Oct 25, 3:52 PM
Thanks for confirming — here are the two best plans you can choose from depending on how deep you want to go with your brand setup 👇

☕ $1,200 — Premium Lifestyle Build (2–3 Weeks)

Perfect if you want a clean, conversion-ready Shopify brand store launched fast with all essential systems.
Included:
Full Shopify setup (Home, Shop, Product, About, Contact, FAQs, Policies)
Up to 100 products (2 branded + 98 dropship synced via DSers/Zendrop)
Premium minimalist theme setup (based on our custom Shrine-inspired framework)
Drawer cart + upsell system + shipping bar
Loox/Judge.me + ReConvert integration
Klaviyo/Omnisend mail automations (Welcome, Abandoned Cart, Post-Purchase)
TikTok + Meta Pixel + Google Analytics 4 integration
Basic SEO (meta titles, tags, product descriptions)
Speed optimization (90+ desktop / 85+ mobile target)
Launch popup + mail capture
2 weeks of post-launch support

🎯 Goal: A high-performing lifestyle store that’s visually elegant and ready to convert traffic from day one.

🏆 $1,800 — Enterprise Brand Experience (3–4 Weeks + 3-Month VIP Support)

Built for long-term brand growth and scaling ads across TikTok, Meta, and Google.
Everything in $1,200 plan, plus:
AI-generated lifestyle banners and cinematic visuals
Custom UX layout flow: Story-driven homepage (Purpose → Product → Lifestyle)
Advanced CRO setup (A/B testing, sticky ATC, urgency triggers)
Full SEO optimization: schema data, image ALT, keyword structure
Mega menu + refined navigation (for Shop, Journal, Collections, etc.)
Blog / Journal setup for organic content growth
3-month VIP support — includes updates, app integration help, seasonal graphics, and CRO tuning

✨ Goal: Position your brand as a top-tier lifestyle label with a site that feels editorial, emotional, and built to scale globally.

🏆 Why Work With Us
✅ 8+ years Shopify expertise (Fiverr Pro verified)
✅ Founder — Digital Marketing Heroes (2.5M+ YouTube)
✅ 4.2% average conversion rate vs 1.8% industry average
✅ 100% in-house design + development (no outsourcing)
✅ Clean, scalable builds that you fully control

Would you like me to prepare the $1,200 Premium Build or the $1,800 Enterprise Experience offer so you can review and reserve your slot? 🚀

D
dejesshub

Oct 26, 7:00 AM
Are these your best price?

S
Profile Image
Me

Oct 26, 10:11 AM
Since you’d like to explore a leaner plan, let’s definitely tailor something that fits where you are right now while keeping the brand integrity and scalability intact.

Before I put together that version — could you share a quick sense of your current budget range for the initial build? 💰

That’ll help me suggest the right balance between design quality, conversion features, and future-ready setup (so we don’t overbuild too early or undercut your brand presence).

D
dejesshub

Oct 26, 11:53 AM
Sorry, I don't understand. Being new to shopify, does not mean I want sub-standard website or store.

S
Profile Image
Me

Oct 26, 11:58 AM
Replied

dejesshub

Oct 26, 11:53 AM

Sorry, I don't understand. Being new to shopify, does not mean I want sub-standard website or store.

I am sorry if i misunderstood you, Do you have a reference website which matches your vision?

S
Profile Image
Me

Oct 26, 12:00 PM
This is a special custom order website we build for Brand 'Emani'
If you want something like this let me know

D
dejesshub

Oct 26, 12:08 PM
Can you provide sample and price for each category, so that I can compare. I need something professional.

D
dejesshub

Oct 26, 12:18 PM
Replied

Me

Oct 26, 12:00 PM

This is a special custom order website we build for Brand 'Emani' If you want something like this let me know

This look good

D
dejesshub

Oct 26, 12:19 PM
But too static

S
Profile Image
Me

Oct 26, 12:20 PM
Replied

dejesshub

Oct 26, 12:08 PM

Can you provide sample and price for each category, so that I can compare. I need something professional.

sending you now

S
Profile Image
Me

Oct 26, 12:24 PM
💰 $800 Stores:
Art/Creative store - https://eyeamcreation.com/
1 Product/Dropshipping store - https://www.nutripium.com/
Journals/Creative Store - https://theawwshop.com/ 

💰 $1200 Store:
https://fashionjonn.com/
JONN7654fashion

💰 $1800 Store:
https://biggamesports.co.uk/

💰 $2400 Store:
Beauty/Wellness store - https://emani.com/

D
dejesshub

Oct 26, 12:46 PM
Unfortunately, the $1200 store did not open

D
dejesshub

Oct 26, 12:52 PM
Are you able to integrate the store to my Amazon and ebay store?

S
Profile Image
Me

Oct 26, 12:58 PM
Replied

dejesshub

Oct 26, 12:46 PM

Unfortunately, the $1200 store did not open

use password below that ..

S
Profile Image
Me

Oct 26, 12:58 PM
Replied

dejesshub

Oct 26, 12:52 PM

Are you able to integrate the store to my Amazon and ebay store?

yes we do that to in this setup

S
Profile Image
Me

Oct 26, 12:58 PM
You are talking about using Amazon Fulfillment service right?

D
dejesshub

Oct 26, 1:05 PM
Replied

Me

Oct 26, 12:58 PM

use password below that ..

Looks good. Also have a look at these. 1. https://hismileteeth.com/?rdr=1,  2. https://www.silkandwillow.com/, 3. https://row.gymshark.com/, 4.

D
dejesshub

Oct 26, 1:05 PM
Replied

Me

Oct 26, 12:58 PM

You are talking about using Amazon Fulfillment service right?

Yes

S
Profile Image
Me

Oct 26, 1:18 PM
Animation, videos, graphics and photos you have to provide

D
dejesshub

Oct 26, 1:22 PM
Hmm, why

D
dejesshub

Oct 26, 2:58 PM
Replied

Me

Oct 25, 3:52 PM

Thanks for confirming — here are the two best plans you can choose from depending on how deep you want to go with your brand setup 👇 ☕ $1,200 — Premium Lifestyle Build (2–3 Weeks) Perfect if you want a clean, conversion-ready Shopify brand store launched fast with all essential systems. Included: Full Shopify setup (Home, Shop, Product, About, Contact, FAQs, Policies) Up to 100 products (2 branded + 98 dropship synced via DSers/Zendrop) Premium minimalist theme setup (based on our custom Shrine-inspired framework) Drawer cart + upsell system + shipping bar Loox/Judge.me + ReConvert integration Klaviyo/Omnisend mail automations (Welcome, Abandoned Cart, Post-Purchase) TikTok + Meta Pixel + Google Analytics 4 integration Basic SEO (meta titles, tags, product descriptions) Speed optimization (90+ desktop / 85+ mobile target) Launch popup + mail capture 2 weeks of post-launch support 🎯 Goal: A high-performing lifestyle store that’s visually elegant and ready to convert traffic from day one. 🏆 $1,800 — Enterprise Brand Experience (3–4 Weeks + 3-Month VIP Support) Built for long-term brand growth and scaling ads across TikTok, Meta, and Google. Everything in $1,200 plan, plus: AI-generated lifestyle banners and cinematic visuals Custom UX layout flow: Story-driven homepage (Purpose → Product → Lifestyle) Advanced CRO setup (A/B testing, sticky ATC, urgency triggers) Full SEO optimization: schema data, image ALT, keyword structure Mega menu + refined navigation (for Shop, Journal, Collections, etc.) Blog / Journal setup for organic content growth 3-month VIP support — includes updates, app integration help, seasonal graphics, and CRO tuning ✨ Goal: Position your brand as a top-tier lifestyle label with a site that feels editorial, emotional, and built to scale globally. 🏆 Why Work With Us ✅ 8+ years Shopify expertise (Fiverr Pro verified) ✅ Founder — Digital Marketing Heroes (2.5M+ YouTube) ✅ 4.2% average conversion rate vs 1.8% industry average ✅ 100% in-house design + development (no outsourcing) ✅ Clean, scalable builds that you fully control Would you like me to prepare the $1,200 Premium Build or the $1,800 Enterprise Experience offer so you can review and reserve your slot? 🚀

Will still provide these for $1,800 — Enterprise Brand Experience (3–4 Weeks + 3-Month VIP Support)?

D
dejesshub

Oct 26, 2:59 PM
Can we conclude on this , so that I can move forward if it is not working?

S
Profile Image
Me

Oct 26, 3:28 PM
Just to clarify everything clearly before we move forward —

We can definitely create the entire premium Shopify brand store for you (all the structure, integrations, optimization, and setup). However, when it comes to graphics and animations, there are a few limitations I want to be fully upfront about 👇

🎨 Graphics, Photos & AI Generation

We use AI generation tools to maintain consistency across all your product visuals (color tone, lighting, layout).
That said — AI images may lack perfect realism compared to real product photography.

To keep your brand’s visuals authentic, we’ll need initial product photos from your end (even a few).
Once we have those, we can generate:
Matching product images
Review/lifestyle visuals
Background variants for product banners
If you’re okay with slightly stylized but cohesive AI visuals, we can absolutely handle those for you.

🎞️ Animations & Visual Motion
We can implement basic interactive animations to make your site look premium and smooth, such as:
Fade-in / fade-away transitions
Lazy load animations for images
Subtle hover or reveal effects
Parallax-style section movement
But we don’t do 3D or complex rendered animations, since those require external 3D rendering tools and high-end motion graphics software — outside Shopify’s native performance limits.
Our focus is always on clean, fast, and mobile-optimized visuals that enhance your site’s performance (not slow it down).

🛍️ Product Requirements

You’ll just need to provide:
Initial branded product photos
Product details (titles, prices, variants, etc.)
We’ll handle the rest — product page setup, AI-generated review visuals, SEO-optimized descriptions, and automated mail flow integrations.

⏳ Timeline & Support

⏰ Delivery: 25–30 days (complete build)
🛠️ Support: 3 months post-delivery

Support Includes:
✅ Fixes and adjustments after launch
✅ Help with app integrations or updates
✅ Mail automations & tracking adjustments
✅ Seasonal graphic or banner updates
✅ Guidance on scaling your store and running promotions
✅ Speed and performance optimization

In short — you’ll get a premium, fast, conversion-optimized lifestyle brand store, built for growth and smooth operation, with honest limitations clearly communicated.

If you’re comfortable with this setup and our AI-assisted approach for visuals, we can lock in your project today and get started 🚀

Would you like me to send the final offer link for $1,800 (Enterprise Brand Experience)?

D
dejesshub

Oct 29, 2:56 AM
Hi, 
I’m ready to move forward at USD $1,200.
Before awarding, please confirm in writing the scope & inclusions below (or note any exclusions + price adders).

Deliverables (must-haves)
	•	Theme setup (premium minimalist); pages: Home, Shop, Collections, PDP, Cart drawer, Checkout styling, About, Contact, FAQs, Refunds/Shipping/Privacy/Terms.
	•	Catalog: 100 products (2 branded + up to 98 via DSers/Zendrop), 5–8 collections, menus/search.
	•	CRO: Cart drawer + shipping bar + one order bump/upsell.
	•	Reviews: Loox/Judge.me on PDP.
	•	Post-purchase upsell: ReConvert basic funnel live.
	•	Launch popup + email capture → Klaviyo.
	•	Klaviyo flows live: Welcome (3–5), Abandoned Checkout (2–3), Post-Purchase (2–3 incl. review ask), double opt-in.
	•	Analytics: GA4 + Meta + TikTok pixels installed and verified via 1 test order (Purchase event visible in all).
	•	Performance: Lighthouse ≥90 desktop / ≥85 mobile (Home/Collection/PDP) with before/after screenshots.
	•	SEO basics: titles/meta templates, product schema (theme-level), image ALT, fix 404s with 301s if needed.
	•	Ops: payments, AU GST, shipping zones/rates, policies.
	•	Handover: Loom (10–15 min) + quick-start doc, 30-day bug-fix support.

Theme & Apps
	•	Please confirm: does $1,200 include theme purchase? If yes, theme name + license transfer.
	•	List every paid app you’ll use with plan tier. No paid app installs without my written OK.
	•	If theme/app purchases are not included, confirm “labour-only” and I’ll buy them.

Milestones & timeline
	•	30/40/30: (1) structure + app plan → (2) staging w/ flows & pixels + speed proof → (3) go-live + test order + handover.
	•	Timeline: 10 business days from access/assets.

Please reply: “Agreed — [All-inclusive / Labour-only]”, and fill in theme name + app list. Then send collaborator request and milestone dates. Also, I will need to import some reviews from my eBay store .

D
dejesshub

Oct 29, 11:52 AM
Hello, how are you doing?

D
dejesshub

Oct 29, 11:52 AM
Hope you got my message

S
Profile Image
Me

Oct 29, 11:52 AM
Hi I am doing great

S
Profile Image
Me

Oct 29, 11:53 AM
Replied

dejesshub

Oct 29, 11:52 AM

Hope you got my message

yes I am just Listing all your requirements and preparing your offer Give me few mins and I am sending it right now

S
Profile Image
Me

Oct 29, 12:09 PM
Thanks for sharing the detailed breakdown — that helps a lot.
Here’s a full confirmation of what’s covered in the $1,200 Premium Lifestyle Build along with the timeline and process details 👇

💼 Scope of Work – $1,200 Premium Lifestyle Build

1. Store Setup & Design
Complete Shopify setup with pages: Home, Shop, Collections, Product (PDP), Cart Drawer, Checkout Styling, About, Contact, FAQs, Refund, Shipping, Privacy & Terms.
Use of our custom Pro Theme Version 2 (fully built and owned by us) — a premium framework inspired by Shrine, optimized for speed and conversions.
After delivery, all rights to the theme, design, layout, sections, and any custom coding will be transferred to your store.
You’ll own everything — no recurring license or dependency.

2. Catalog & Navigation
Setup of up to 100 products (2 branded + up to 98 synced via DSers/Zendrop).
Creation of 5–8 curated collections with advanced filters and search integration.
Fully structured navigation + dropdown menus for clean product discovery.

3. Conversion Optimization
Cart drawer + shipping progress bar.
Order bump / upsell integration at checkout (ReConvert).
Sticky add-to-cart (mobile) for higher engagement.
Loox or Judge.me reviews on PDPs.

4. Marketing & Automations
Klaviyo integration with live automation flows:
Welcome Series (3–5 mails)
Abandoned Checkout (2–3 mails)
Post-Purchase (2–3 mails, includes review ask)
Branded popup for mail capture with double opt-in.

5. Analytics & Tracking
Full integration and testing of:
Google Analytics 4
Meta (Facebook/Instagram) Pixel
TikTok Pixel
Verification via 1 test order showing purchase event across all platforms.

6. Performance & SEO
Target speed: 90+ desktop / 85+ mobile (Lighthouse-tested).
Basic SEO setup: meta titles, descriptions, product schema, image ALT tags.
404 fix + 301 redirects if needed.

7. Operations
Paayment gateways + AU GST setup.
Shipping zones & rates configuration.
Policy pages completed and linked in footer.

8. Integrations & Apps
We’ll only use essential apps that are high-quality and budget-friendly — no unnecessary paid apps.
We cannot list an exact final set right now since we test and choose what’s best during setup, but below are typical examples we’ll use:
DSers or Zendrop (dropshipping fulfillment)
Loox or Judge.me (reviews)
ReConvert (thank-you upsell)
Klaviyo (mail automation)
LitCommerce or Sellbrite (Etsy/eBay integration)

S
Profile Image
Me

Oct 29, 12:09 PM
⚠️ We will not install any paid app without your written approval.
Our goal is to deliver performance and features without adding unnecessary monthly costs.

⏱ Timeline & Process
Total Duration: 25–30 days for complete setup
Includes: Build, testing, and handover with video walkthrough
30-day post-launch support (bug fixes & clarifications)

💰 Paayment & Security
We work only on fixed one-time paayments (no milestones).
You don’t need to worry — Fiverr securely holds your paayment until you fully approve the delivery.
Once you’re satisfied and mark it complete, Fiverr releases the amount to us within 7 days.

🧩 Additional Notes
eBay review import: Yes, that can be handled easily via the review app you choose.
All visuals, graphics, or animations you provide will be seamlessly integrated.
Any future improvements or new app integrations can also be handled within the support period.

D
dejesshub

Oct 29, 3:39 PM
Hi Shreyansh,

Thanks for the detailed confirmation — this looks good. I’m ready to proceed at USD $1,200 with the points below added for clarity:

1) Timeline & checkpoints (total 25–30 days)

Week 1: Theme scaffold + navigation/collections + app plan for approval.

Week 2: Catalog load (initial 20–30 products), cart drawer + ReConvert + reviews in staging.

Week 3: Klaviyo flows live (Welcome, Abandoned, Post-Purchase), pixels installed; test order recorded in GA4/Meta/TikTok.

Week 4: Speed optimization + SEO basics; before/after Lighthouse screenshots (Home/Collection/PDP).

Handover: Go-live, domain, Loom video, quick-start doc, and start of 30-day bug-fix support.

2) Delivery & payments

I’m fine using Fiverr escrow, but please submit staged deliveries aligned to the checkpoints above (or Fiverr milestones if enabled) so we can review/approve step-by-step.

3) Theme & IP

Provide the theme ZIP + all source code (unobfuscated) at handover.

Confirm ownership transfer (no recurring license).

30-day bug-fix coverage also applies if a Shopify update breaks a section within that window.

D
dejesshub

Oct 29, 3:40 PM
*Week 2: Catalog load (initial 90–100 products), cart drawer + ReConvert + reviews in staging.*

S
Profile Image
Me

Oct 29, 3:44 PM
Thanks for sharing all the details — I’ve reviewed your entire message, and yes, everything mentioned fits perfectly under the $1,200 Premium Lifestyle Build Plan.
Here’s the full scope confirmation, timeline, and inclusions 👇

💼 Scope of Work – $1,200 Premium Lifestyle Build

1. Theme Setup & Design
Premium minimalist theme (our custom Pro Theme V2, inspired by Shrine — license included and fully transferred).
Complete page setup: Home, Shop, Collections, Product (PDP), Cart Drawer, Checkout Styling, About, Contact, FAQs, Refund, Shipping, Privacy, Terms.
Responsive, conversion-focused layout with modern UX flow.
All source code and theme files will be transferred at handover (no recurring license or dependency).

2. Catalog & Navigation
Setup of 100 products (2 branded + 98 via DSers/Zendrop).
5–8 collections with smart filtering and menu structure.
Mega-menu or dropdown navigation for easy product discovery.

3. Conversion Optimization (CRO)
Cart drawer + dynamic shipping bar.
One-click order bump/upsell via ReConvert.
Sticky Add to Cart (mobile).
Loox or Judge.me integrated for live product reviews.

4. Marketing & Mail Automation (Klaviyo)
Popup + double opt-in mail capture.
Automated Klaviyo flows:
Welcome (3–5 mails)
Abandoned Checkout (2–3 mails)
Post-Purchase (2–3 mails, includes review request)

5. Analytics & Tracking
GA4 + Meta + TikTok Pixels fully installed and verified with one test order showing Purchase events in all dashboards.

6. SEO & Speed Optimization
Basic SEO setup (meta titles, schema, ALT tags, product tags).
Lighthouse score target: ≥90 desktop / ≥85 mobile (Home, Collection, PDP).
Before/after speed proof screenshots.
404 fixes + 301 redirects (if needed).

7. Operations Setup
Shopify paayments / AU GST setup.
Shipping zones & rates for all key regions.
Refund, privacy, and policy pages fully configured.

8. App Integrations (included)
DSers or Zendrop (dropshipping).
Loox or Judge.me (reviews).
ReConvert (post-purchase upsell).
Klaviyo (mail automation).
Sellbrite or LitCommerce (Etsy/eBay sync).
No paid app will be installed without your written approval.

9. Amazon + eBay Integration
Yes — we’ll integrate your Shopify with Amazon and eBay for sync and fulfillment setup.

10. eBay Reviews Import
We’ll import your eBay reviews into the Shopify store via the review app you choose.

S
Profile Image
Me

Oct 29, 3:44 PM
🗓 Timeline & Checkpoints (28 Business Days)
Week 1:
Theme scaffold + navigation + collections setup + app plan approval.
Week 2:
Catalog load (initial 90–100 products), cart drawer, ReConvert + reviews integration.
Week 3:
Klaviyo automations + Pixel setup + test order tracking verification.
Week 4:
Speed optimization + SEO polish + Lighthouse proof + final QA.

✅ Handover: Go-live, domain connection, Loom walkthrough (10–15 mins), and 30-day bug-fix support.

🧩 Delivery & Ownership
You’ll own the full theme + code (we’ll transfer everything at delivery).
30-day post-launch bug-fix support covers any breakages, including Shopify updates within that window.

Fiverr escrow ensures secure paayment release only after full approval from your side.

D
dejesshub

Oct 29, 4:00 PM
One more thing, I have a domain dejess.com.au, you will connect this domain to the store.

D
dejesshub

Oct 29, 4:01 PM
Create order and let’s get started

S
Profile Image
Me

Oct 29, 4:07 PM
Replied

dejesshub

Oct 29, 4:00 PM

One more thing, I have a domain dejess.com.au, you will connect this domain to the store.

yes You can connect it to shopify store and we can take care of the rest

S
Profile Image
Me

Oct 29, 4:10 PM
Yes we can do that

S
Profile Image
Me

Oct 29, 4:16 PM
Here's your custom offer

$1,200
I will build shopify store, design redesign copy ecommerce website, dropshipping store
Premium Lifestyle Shopify Store – $1,200 (All-Inclusive)

We’ll build your complete premium lifestyle Shopify store for Dejess — focused on coffee accessories & minimalist home tools.

✅ Scope:

Premium minimalist theme (Pro Theme V2 – license included & transferred).

Pages: Home, Shop, Collections, Product (PDP), Cart Drawer, Checkout Styling, About, Contact, FAQs, Refunds, Shipping, Privacy, Terms.

Catalog setup: 100 products (2 branded + 98 via DSers/Zendrop), 5–8 collections, smart navigation & filters.

CRO: Cart drawer, shipping bar, ReConvert upsell, Loox/Judge.me reviews, sticky Add-to-Cart.

Mail: Klaviyo integration + popup + flows (Welcome, Abandoned, Post-Purchase).

Analytics: GA4, Meta, TikTok Pixels verified with test order.

SEO & Speed: ≥90 desktop / ≥85 mobile, basic meta + schema + ALT tags, 404 → 301 fixes.

Shipping, policies, AU GST, paayments setup.

Integration with Amazon + eBay (Sellbrite/LitCommerce).

Import reviews from eBay.

🗓 Timeline (28 Days Total):
Week 1 – Theme + structure setup
Week 2 – Catalog, cart drawer, reviews
Week 3 – Klaviyo + Pixels + test order
Week 4 – Speed + SEO + final QA + domain (dejess.com.au) connection

Includes: 30-day bug-fix support, full theme + code ownership (no recurring license).
Security: Fiverr escrow — paayment released only after your full approval.

Read more
Your offer includes

5 Revisions

28 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Oct 29, 4:57 PM
Please share with me the details for getting the access to your store. Also please fill the requirements so that i can start working on your store. To give me collaborator access to your Shopify store, please follow these steps:

🔐Step-by-step process:
Generate an access code: Go to Settings > Users > Security in your Shopify admin, then copy the 4-digit collaborator access code
Share the code: Provide this 4-digit code to your collaborator (developer, freelancer, or agency)
Collaborator submits request: The collaborator uses this code to submit an access request from their Partner Dashboard
Review and approve: You'll receive an mail notification and can manage the request by going to Settings > Users, filtering by "Requests" status
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

D
dejesshub

Oct 29, 6:26 PM
Collaborator Request Code 0419, Store URL:www.dejess.com.au

S
Profile Image
Me

Oct 29, 6:27 PM
Thank you for the details, I'll send the request for the access now

S
Profile Image
Me

Oct 29, 6:28 PM
I have sent the request please accept it and i will start working on your store.


image.png

(5.05 kB)

D
dejesshub

Oct 29, 6:29 PM
Done

S
Profile Image
Me

Oct 29, 6:31 PM
Got it, Thank you

D
dejesshub

Nov 05, 5:26 PM
Hi

D
dejesshub

Nov 05, 5:27 PM
How is the job going?

D
dejesshub

Nov 05, 5:28 PM
I reckoned it is one week already. Checking to know where things are

D
dejesshub

Nov 05, 5:30 PM
Also, I would love to have this app installed because I want to fulfil US orders through my Amazon US store but It is complaining of store address. Do you know if there is any work around on this?


Screenshot 2025-11-05 at 10.25.47 pm.png

(820.48 kB)

S
Profile Image
Me

Nov 05, 5:33 PM
Thanks for checking in! Yes, we’ve already started working on the layout and are currently researching and testing different design options to ensure the final version feels modern, high-converting, and fully aligned with your brand.

You’ll receive a preview within the next 2 days, sir — I just want to make sure it’s polished and visually strong before sharing it.

Regarding the Amazon US fulfillment app, yes, we can definitely help with that as well. I’ll look into the store address issue and set it up so it connects properly with your Amazon store

D
dejesshub

Nov 05, 5:34 PM
Great

S
Profile Image
Me

Nov 05, 5:35 PM
thanks

D
dejesshub

Nov 08, 7:26 AM
Hello

S
Profile Image
Me

Nov 08, 9:19 AM
Hi there

S
Profile Image
Me

Nov 08, 9:19 AM
I will get back to you with an update shortly

D
dejesshub

Nov 09, 1:14 PM
Hello

D
dejesshub

Nov 09, 1:14 PM
I did not hear from you again?

S
Profile Image
Me

Nov 09, 1:24 PM
Hello Sir,
Apologies for not getting back sooner — I was a bit sick over the past few days. 
I’ve completed the setup and here’s the store preview link and password for you to review. Please take a look and share your feedback — I’ll be happy to make any adjustments you’d like.

S
Profile Image
Me

Nov 09, 1:24 PM
https://dejess.com.au/

S
Profile Image
Me

Nov 09, 1:25 PM
password- yushew

D
dejesshub

Nov 09, 3:33 PM
Sorry to hear this

D
dejesshub

Nov 09, 3:34 PM
I will go through and share feedback

D
dejesshub

Nov 09, 3:45 PM
Just opening the page, I noticed that the animation video is a bit blur. Also, we need to have a country filter to chose which country and base on the chosen country, price should display the county currency. I have shared a sample here. Secondly, We need to have a sales and shipping time flashed at the top of the page. See the attached image. Thirdly, I need to have more product category such such as outdoor/home. And also, Use a mono/bronze logo on site; save the red mark for promos. I will share more feedbacks


image.png

(2.17 MB)

S
Profile Image
Me

Nov 10, 8:22 AM
Gt it, I'll look into it, and update you once done

S
Profile Image
Me

Nov 11, 3:56 PM
Hey, Do you have any specific categories in mind that you’d like us to include? It will be helpful for me to ensure everything is arranged the way you prefer.

D
dejesshub

Nov 11, 5:31 PM
Have a look at this site, see the way they arrange their categories https://brewingculture.com.au/

D
dejesshub

Nov 11, 5:39 PM
I would love to have additional category, where I can list any product that is not coffee related. Name it Outlet Deals.

D
dejesshub

Nov 11, 5:43 PM
Also, I planed to Amazon MCF for US products because I will be shipping my US products to Amazon US. So it will worth having a separate shipping policy for US products with delivery(2 to 3 days)

D
dejesshub

Nov 11, 5:50 PM
Remember to add country filter as shown above. When you choose a country in filter, it will display the country currency in product and cat.


80CBC87E-F820-4502-ACD3-F5170306E112.png

(394.25 kB)

S
Profile Image
Me

Nov 11, 6:16 PM
I’ll check the site for the category layout and I’ll make sure to add the correct country selector so the currency updates accordingly.

D
dejesshub

Nov 12, 12:51 PM
Also footnote should have Dejess Pty Ltd and ABN 48692756639

D
dejesshub

Nov 12, 2:49 PM
Please where are we now?

S
Profile Image
Me

Nov 12, 3:01 PM
I’ve added the currency selector. And I’m currently working on the menu will update you once done.

D
dejesshub

Nov 13, 10:37 AM
I have seen the currency selector but it looks hidden. Not everyone will see this quickly

S
Profile Image
Me

Nov 13, 3:37 PM
The currency selector is now working properly and is clearly visible for everyone.

D
dejesshub

Nov 13, 4:48 PM
Ok, great. You still need to work on the catalogue. A lot of mismatched.Also the promo flashing is not yet there. You added only shipping at the top.


Screenshot 2025-11-13 at 9.41.50 pm.png

(419.57 kB)

D
dejesshub

Nov 13, 4:50 PM
Also, what are the remaining works on the backend? When are you going to start uploading the products and enabling MCF for US products?

S
Profile Image
Me

Nov 13, 5:05 PM
I’m currently working on the menu, and I’ll also be adding the promo flashing banner. I’ll update you once everything is done.

S
Profile Image
Me

Nov 13, 5:05 PM
Also, please share the products or the product list you’d like me to add to the store. I’ll start uploading them right away.

D
dejesshub

Nov 14, 5:32 AM
Hi, this is one of the product url https://www.amazon.com/dp/B0FXRNVHZ2/ref=olp-opf-redir?aod=1&ref=sp_email

S
Profile Image
Me

Nov 14, 8:01 AM
Okay, do you want us to add only this product?

D
dejesshub

Nov 14, 8:26 AM
No, I provide others soon

S
Profile Image
Me

Nov 14, 4:16 PM
Okay, just send them when you can, and I’ll add them to the store right away.

D
dejesshub

Nov 14, 6:18 PM
Ok

D
dejesshub

Nov 14, 6:20 PM
Also I have installed Tiktok and Meta Apps. You can continue with the setups. We will like to have at least  2 different ads sets targeting different markets(US and AU)

D
dejesshub

Nov 15, 7:28 AM
First product to add in the Outlet Deals. The brand name will change to DEJESS and not HONEST. https://www.ebay.com.au/itm/177482932843

D
dejesshub

Nov 15, 7:41 AM
I will get the pictures of other products from supplier on Monday

D
dejesshub

Nov 15, 11:37 AM
Also changes to make on the collection:

D
dejesshub

Nov 15, 11:41 AM
Rename collection “Outdoor Coffee Gear” → “Coffee”.

Make it Automated with rule: Product tag is any of: coffee, beans, espresso, filter.

Set handle to /collections/coffee (create URL redirect).

Description: Espresso & filter roasts. Roast date + best before on every bag.

Merge “Mugs & Cups” and “Outdoor Coffee Gear” inventory.

Keep Mugs & Cups and rename label to “Drinkware & Outdoor.”

Include outdoor items: if automated, expand rules to tags mug, cup, tumbler, travel, outdoor; if manual, add those products.

Prefer to keep the original handle; if changed, add a redirect.

Navigation (Main menu) → order like this:
Portafilters | Espresso Tools | Manual Brew Tools | Coffee | Drinkware & Outdoor | Outlet Deals | Blog | About

Update menu links to new Coffee and Drinkware & Outdoor destinations.

Coffee products (each SKU)

Uncheck “Charge tax on this product.”

Assign to Coffee shipping profile with AU only enabled.

Add metafields (Products): roast_date (date), best_before (date), lot_code (text).

Tag with coffee + one of espresso/filter.

Aging/clearance (manual for now)

Create tags aging_45, aging_60.

Ensure Outlet Deals includes items with those tags.

We’ll apply discounts manually when tagged.

Acceptance checks

New Coffee collection exists, shows only coffee SKUs, URL /collections/coffee works.

Drinkware & Outdoor shows mugs/cups plus outdoor items.

Coffee SKUs don’t charge tax at checkout; AU shipping only.

Menu updated; no 404s (redirects in place).

Metafields present on coffee products.

S
Profile Image
Me

Nov 15, 11:54 AM
Got it! I’ll make all these updates accordingly and will update you once everything is done.

D
dejesshub

Nov 15, 11:56 AM
Have you done anything about the MCF and drop ship apps?

S
Profile Image
Me

Nov 15, 12:06 PM
I’ve been reviewing the requirements for the MCF and drop shipping setup. Once I start implementing it, I’ll update you right away.

D
dejesshub

Nov 15, 12:07 PM
Ok

D
dejesshub

Nov 15, 12:21 PM
For coffee collection, Add 2 products: Dejess Classic Espresso — Whole Bean (250 g / 12oz)
Dejess Bold Espresso — Whole Bean (250 g / 12oz)

D
dejesshub

Nov 15, 12:21 PM
For now

D
dejesshub

Nov 15, 12:28 PM
1 File

TCR Q4 2025 Drop Ship Pricing.xlsx

(30.87 kB)

S
Profile Image
Me

Nov 15, 2:11 PM
Replied

dejesshub

Nov 15, 12:21 PM

For coffee collection, Add 2 products: Dejess Classic Espresso — Whole Bean (250 g / 12oz) Dejess Bold Espresso — Whole Bean (250 g / 12oz)

Sure, I’ll add these two products.

D
dejesshub

Nov 15, 6:50 PM
More update


image.png

(41.28 kB)

S
Profile Image
Me

Nov 15, 8:10 PM
Got it! I’ll add all these updates to the store. Let me know if you need anything else.

D
dejesshub

Nov 16, 1:31 PM
Hi

D
dejesshub

Nov 16, 1:36 PM
For the coffee product. We will be drop shipping US products and Self Fulfil AU products. So I have created the product CSV. Please import to the store. The CSV has all the detailed instructions. I have installed the app for Coffee drop ship. Kindly complete the configurations. I have also attached the guild to setup the app which I got from the partner.

Download All
DEJESS_Coffee_Final_Freelancer_Spec.numbers

(117.46 kB)


2024 App Quick Start Guide.pdf

(217.81 kB)

D
dejesshub

Nov 16, 1:44 PM
I will provide more products as I am still negotiating with the companies.

S
Profile Image
Me

Nov 16, 2:03 PM
Okay got I’ll keep you posted

S
Profile Image
Me

Nov 17, 6:54 PM
Hi,
To set up the geo targeted announcement bar, I need to install the required app. Shopify is asking for additional permissions, so I’m currently unable to proceed.

Could you please grant me access to install apps with the necessary permissions?
If you prefer, you can install the app from your side and I will handle all the configuration.

I’m also facing the same permission issue with the Klaviyo app, so I will need access for that as well. You can also install it yourself if that’s easier, and I will take care of the setup and flows.

Additionally, please share the email you want me to use for setting up the Klaviyo account and connecting it to the store.


Screenshot 2025-11-17 184913.png

(26.33 kB)

D
dejesshub

Nov 17, 7:15 PM
info@dejess.com.au

D
dejesshub

Nov 17, 7:21 PM
Which apps do you want to install?

D
dejesshub

Nov 17, 7:21 PM
I can not find where to give the access

S
Profile Image
Me

Nov 17, 7:22 PM
Replied

dejesshub

Nov 17, 7:21 PM

Which apps do you want to install?

Zo Announcement Bar and Klaviyo

S
Profile Image
Me

Nov 17, 7:23 PM
Regarding Amazon MCF, I tried installing the app, but Shopify is blocking it because the store is registered with an Australian business address, and the app only supports stores with a US business address.

We have two options to move forward:
1. Add or change to a US business address in Shopify so the app can be installed.
2. Use alternative apps that still allow us to connect Amazon MCF and fulfil US orders without changing the store address.

Please let me know which option you prefer, and I’ll proceed accordingly.

D
dejesshub

Nov 17, 7:32 PM
Login details for  Klaviyo account: admin@dejess.com.au, Password: Coffe_shop2025

D
dejesshub

Nov 17, 7:43 PM
1 File


Screenshot 2025-11-18 at 12.42.31 am.png

(1.25 MB)

D
dejesshub

Nov 17, 7:46 PM
When you say add US address, do you mean having 2 stores or can a store have 2 addresses?

D
dejesshub

Nov 17, 7:47 PM
If it is possible to have 2 addresses, then proceed with that. If not use option 2

S
Profile Image
Me

Nov 17, 7:49 PM
I’m currently having trouble logging in to Klaviyo, Could you please verify the login details or provide the correct credentials so I can access the account?


Screenshot 2025-11-17 194615.png

(28.16 kB)

D
dejesshub

Nov 17, 7:50 PM
Coffee_shop2025

S
Profile Image
Me

Nov 17, 7:51 PM
Klaviyo sent a verification code. please share the code you received

D
dejesshub

Nov 17, 7:52 PM
001805

S
Profile Image
Me

Nov 17, 7:55 PM
Thanks! I’ll go ahead and set up the flow and everything else. Also, I think it might be best for us to use an alternative app for Amazon fulfillment. I’ll check into it and confirm with you shortly.

D
dejesshub

Nov 18, 4:15 AM
Ok

S
Profile Image
Me

Nov 18, 1:45 PM
Hi,
I’ve checked alternative apps for connecting Amazon MCF, since the official Amazon app can’t be installed. I found two reliable options that fully support Amazon MCF for US fulfillment. Below are the plan details for each:

ByteStand – FBA Shipping
• $25 / $35 / $45 per month
• Unlimited orders on all plans
• Includes automatic fulfillment, packing slips, and shipping rate options

WebBee – Multi-Channel Fulfillment
• $19 plan: 50 orders/month
• $35 plan: 1,000 orders/month
• $70 plan: 2,500 orders/month
• $95 plan: 5,000 orders/month
• Includes SKU mapping, order automation, Amazon MCF support, and multi-market features. and WebBee is commonly used for MCF setups.

Please let me know which app you’d prefer us to proceed with, and I’ll continue with the setup accordingly.

D
dejesshub

Nov 18, 3:20 PM
I am being careful about any paid apps. So there is no way we can get MCF working without changing the store address?

S
Profile Image
Me

Nov 18, 4:39 PM
Let me look into this a bit more and I’ll get back to you shortly.

D
dejesshub

Nov 18, 4:46 PM
If we can not get Amazon MCF working, We can go with ByteStand, but this should be the last resort.

S
Profile Image
Me

Nov 18, 7:10 PM
I’ve looked into this thoroughly, and unfortunately Amazon MCF can only be enabled for US-based stores. Since the store is not registered in the US, there’s no direct way to activate MCF without using an app.

Changing the store address to the US is not recommended because it can affect taxes, payment settings, and other store configurations.

So the only reliable and safe solution is to use an app. Please L=let me know if you’d like me to proceed with that app.

S
Profile Image
Me

Nov 18, 11:44 PM
I also wanted to discuss about our delivery timeline. Since most of the design, setup, and functionality on the store is now fully completed from our side, so we would like to move ahead with the delivery to keep everything on schedule.

Please rest assured, delivery does NOT mean the work stops. We will continue taking care of all the remaining tweaks, adjustments, and final points you need until you are completely satisfied. We’ve also assigned one dedicated team member specifically to your store, so any updates you request will be handled quickly and with priority.

We’re fully committed to completing the last steps smoothly for you, even after delivery.

Just let us know whenever you're ready, and we’ll proceed.

S
Profile Image
Me

Nov 19, 12:00 AM
Replied

dejesshub

Nov 16, 1:36 PM

For the coffee product. We will be drop shipping US products and Self Fulfil AU products. So I have created the product CSV. Please import to the store. The CSV has all the detailed instructions. I have installed the app for Coffee drop ship. Kindly complete the configurations. I have also attached the guild to setup the app which I got from the partner.

+2

The CSV file you shared seems to be incorrect, and I’m unable to add the product using it.  Please check the file and share it again?

D
dejesshub

Nov 19, 2:43 AM
The CSV file contains additional information on how how I wanted the products to be mapped, so it may not be imported directly to the store. Also, where are we on the social media pages? And setting up the TikTok Analytics: GA4, Meta Pixel, TikTok Pixel (verify with one test purchase).

D
dejesshub

Nov 19, 3:04 AM
Also the apps setup seems incomplete

Download All

8707AE59-1D86-4DD2-9950-8EA605C5A890.png

(263.02 kB)


6EABCF4D-5F31-4D83-B071-BFCB0973D12C.png

(267.31 kB)


CE87BA15-B1DA-4698-B662-2C3F9BC620E5.png

(282.08 kB)

D
dejesshub

Nov 19, 3:05 AM
We also talked about zendrop and other tools

D
dejesshub

Nov 19, 3:05 AM
Have they been setup?

D
dejesshub

Nov 19, 3:06 AM
The shipping policy needs to be changed also

S
Profile Image
Me

Nov 19, 1:25 PM
Klaviyo is fully set up and working correctly. I’ll be completing the rest of the setups today, including the social media pages, TikTok Analytics (GA4, Meta Pixel, TikTok Pixel with test purchase), and Zendrop. I’ll also update the shipping policy.

S
Profile Image
Me

Nov 19, 4:22 PM
Hi,
To complete the Meta Pixel and TikTok Pixel setup on the store, I need the following two details from you:

1. Your Meta Pixel ID
2. Your TikTok Pixel ID

Once you share these two IDs, I’ll add them to the apps and finish the full tracking setup for you. Let me know once you have them. Thanks!

D
dejesshub

Nov 19, 5:39 PM
TikTok Pixel ID:D4AUAHBC77U76PVIRF30

D
dejesshub

Nov 19, 5:53 PM
Dejess Pty Ltd's pixel
ID: 1853127268908370⁠⁠

S
Profile Image
Me

Nov 19, 6:11 PM
ok Thanks ! I will  added by today

S
Profile Image
Me

Nov 19, 6:36 PM
Please share conversion API access token this for TikTok pixel. Meta pixel has been added.


Screenshot 2025-11-19 at 18.23.25.png

(71.05 kB)

D
dejesshub

Nov 19, 6:53 PM
Where did they send the conversion API access token?

D
dejesshub

Nov 19, 7:14 PM
c710bb98e68ffc997efceee7d38c2655b39c8a94

S
Profile Image
Me

Nov 20, 12:25 PM
Hi, please share the Conversion API access token for the Meta Pixel? I need it to complete the setup.

S
Profile Image
Me

Nov 20, 12:29 PM
Also, Zendrop is now integrated.

D
dejesshub

Nov 20, 1:05 PM
EAAPwFYcWZA7wBPxV83hRQ94IwwoBRJbJ3z5NBHzbXTIqEgmlzDpwhKQm9cVzJZBEW5GnsZASFZAAymkTtqYw3zty4P290wwFRo7ZAJAzrElJf7QlGaGWjB88Js6u0hyyawZBhYBDSKYOAnrh0JYe9TjwN1ZAD3fBZAeTbaggl35UUXBZAoLZAb5Pqu8ZBze87rS6wZDZD

D
dejesshub

Nov 20, 1:05 PM
I hope sharing tokens here are safe

S
Profile Image
Me

Nov 20, 1:49 PM
Yes, it’s safe here

S
Profile Image
Me

Nov 20, 2:07 PM
Hey, I just need a quick clarification regarding the products.

You added Temecula, and you also shared two coffee names, but these names don’t seem to match anything on the Temecula Coffee Roaster price list.
Could you please confirm the exact product names from Temecula that you would like me to use, and also share the product images for them?

For the bundle products, you’ve shared the names, but I’ll need a bit more information as well.
please provide:
- The prices for both bundle items
- The product images for these items

Once I have these details, I’ll set everything up accurately.

D
dejesshub

Nov 20, 2:25 PM
For Temecula Coffee:The app’s wording (“Bean Expresso”) is just their label. Map like this:

Classic → 6 Bean Espresso

Bold → Italian Roast

Breakfast → Breakfast Blend

Decaf → Decaf (water-process)

D
dejesshub

Nov 20, 2:34 PM
Per-SKU choices in TCR “SKU Creator”

1. Dejess Classic — 12 oz (US)

Coffee Type: 6 Bean Espresso

Size: 12oz

Grind: whole bean

Bag: black



2. Dejess Bold — 12 oz (US)

Coffee Type: Italian Roast

Size: 12oz

Grind: whole bean

Bag: black



3. Dejess Breakfast — 12 oz (US)

Coffee Type: Breakfast Blend

Size: 12oz

Grind: whole bean

Bag: black


4. Dejess Decaf Espresso — 12 oz (US)

Coffee Type: Decaf (water-process)

Size: 12oz

Grind: whole bean

Bag: black

Download All

image.png

(0 byte)


image.png

(302.37 kB)


image.png

(302.37 kB)

D
dejesshub

Nov 20, 2:36 PM
So Coffee type is Temecula names. example Breakfast Blend, 6 Bean Espresso, Italian Roast and Decaf (water-process)

S
Profile Image
Me

Nov 20, 3:35 PM
Got it, I'll start adding the products.

S
Profile Image
Me

Nov 20, 3:56 PM
and should I go ahead and install ByteStand and complete the setup for you?

D
dejesshub

Nov 20, 6:55 PM
Please I have added some product via Zendrop. Can you bring them to the right category in the store?

D
dejesshub

Nov 20, 6:56 PM
Between ByteStand and WebBee, which one do you recommend?

S
Profile Image
Me

Nov 20, 7:05 PM
Both ByteStand and WebBee work well for Amazon MCF.
The main differences are:

ByteStand:
- Simple setup
- Very user-friendly
- Plans start around $25/month (usually $25–$45 depending on tier)
- No order limits — they specifically mention unlimited order capacity

WebBee:
- More detailed control and customization options
- Their pricing is based on order volume:
- Starter – $19/month: up to 50 orders/month
- Professional – $35/month: up to 1,000 orders/month
- Plus – $70/month: up to 2,500 orders/month
- Enterprise – $95/month: up to 5,000 orders/month

It really depends on your expected order volume and how much flexibility you need.

D
dejesshub

Nov 20, 7:07 PM
We are just starting, I would know how much is expected order for now.

S
Profile Image
Me

Nov 20, 7:09 PM
I’d recommend ByteStand because it’s much more hassle-free to set up and very user-friendly.
Another big advantage is that ByteStand has no order limits, while WebBee’s plans cap orders based on the tier.

D
dejesshub

Nov 20, 7:16 PM
It is ok.

D
dejesshub

Nov 20, 7:17 PM
Look at the products too. Also the prices are not right. Those products which you added, are they placeholders?

S
Profile Image
Me

Nov 20, 7:20 PM
Yes, the old ones were just dummy products. I’ve archived them now. I’ll review the products and update the correct pricing accordingly.

S
Profile Image
Me

Nov 20, 7:20 PM
Let me know if there are any specific items you want me to prioritize.

D
dejesshub

Nov 20, 7:25 PM
Ok, I need most of those product. I was thinking that they were imported from Zendrop

S
Profile Image
Me

Nov 20, 7:52 PM
You can share the names of the products you want from that dummy list, and I’ll check each one on Zendrop and add the correct versions to the store.

D
dejesshub

Nov 20, 7:56 PM
Okay

D
dejesshub

Nov 20, 7:57 PM
I will

D
dejesshub

Nov 20, 8:06 PM
These are the list of products, we are looking at PL but if we can drop ship them first. That would be great. Can you please see if you can get them from Zendrop


EA03D5FE-A4D7-48A0-B0DC-555AD9484A59.png

(586.09 kB)

D
dejesshub

Nov 20, 8:08 PM
3 Files

Download All

C0C5406E-2069-4DC3-A895-096710E2FB34.png

(1.38 MB)


05106067-5412-4CDF-98FA-29C4A8B6A782.png

(1.42 MB)


18699FD2-64D8-46A7-B515-A2941555CE0C.png

(574.77 kB)

S
Profile Image
Me

Nov 20, 8:12 PM
Okay, I’ll go through each product and check which ones are available on Zendrop.

S
Profile Image
Me

Nov 20, 9:48 PM
To complete the ByteStand setup, I’ll need access to your Amazon Seller Central.

S
Profile Image
Me

Nov 21, 12:46 AM
I also wanted to discuss about our delivery timeline. Since most of the design, setup, and functionality on the store is now fully completed from our side, so we would like to move ahead with the delivery to keep everything on schedule.

Please rest assured, delivery does NOT mean the work stops. We will continue taking care of all the remaining tweaks, adjustments, and final points you need until you are completely satisfied. We’ve also assigned one dedicated team member specifically to your store, so any updates you request will be handled quickly and with priority.

We’re fully committed to completing the last steps smoothly for you, even after delivery.

Just let us know whenever you're ready, and we’ll proceed.

D
dejesshub

Nov 21, 3:04 AM
Ok

D
dejesshub

Nov 21, 4:33 PM
Hi

D
dejesshub

Nov 21, 4:34 PM
I understand that you need access to Amazon seller account. Can you send me your email so that I can invite you

S
Profile Image
Me

Nov 21, 4:36 PM
mabtang1 at gmail dot com

D
dejesshub

Nov 21, 4:42 PM
https://spcentral.amazon.com/redirect/account/permissions/request-client-invitation?tokenId=3130b218-816a-4f5d-961b-4f0254b99756

D
dejesshub

Nov 21, 4:57 PM
Can you click on the link?

S
Profile Image
Me

Nov 21, 5:18 PM
Yes, I’m checking it now.

S
Profile Image
Me

Nov 21, 5:27 PM
please add me using my email instead of the link

D
dejesshub

Nov 21, 5:31 PM
Any reason for that?

S
Profile Image
Me

Nov 21, 5:32 PM
The link isn’t opening on my side, so adding me by mail will make sure I receive the invitation properly.

D
dejesshub

Nov 21, 5:33 PM
It is still a link https://sellercentral.amazon.com/invitation/accept?globalAccountId=A1PFCEAMLZRXFQ&invitationId=7126ba59-aa91-4c14-8794-2d48330a35ba

S
Profile Image
Me

Nov 21, 5:35 PM
Wait, I’ll try again.

D
dejesshub

Nov 21, 6:23 PM
Any luck?

S
Profile Image
Me

Nov 21, 6:30 PM
I'll update you once it's done.

D
dejesshub

Nov 21, 6:38 PM
It is late here.

S
Profile Image
Me

Nov 21, 7:41 PM
I am not able to gain access through the link. please add me using my mail: mabtang1 at gmail dot com.

here are the step-by-step guide how you can give access:
- Sign in to Seller Central.
- Go to Settings (top right) → User Permissions.
- Under Add a New Seller Central User, enter Name and mail: mabtang1 at gmail dot com.
- Click Send invitation.

After I accept, you can assign the required permissions from the User Permissions page.

Please let me know once the invitation is sent so I can check my inbox.

D
dejesshub

Nov 21, 7:42 PM
This is what I did. the link I sent to you is an invitation

D
dejesshub

Nov 21, 7:44 PM
1 File


Screenshot 2025-11-22 at 12.42.59 am.png

(275.85 kB)

S
Profile Image
Me

Nov 21, 7:49 PM
Okay, wait I’ll check the link again and get back to you.

S
Profile Image
Me

Nov 21, 7:51 PM
Hi, I’ve just delivered the updated version of your store so you can review everything in one place.
Please feel free to go through it at your convenience — and just to reassure you, delivery does NOT mean the work stops from our side.
To make things even smoother, we’ve assigned one dedicated team member exclusively for your project.
This person will focus only on your store and will handle:
All remaining changes and refinements
Amazon Seller & ByteStand setup
Product updates, pricing adjustments, and category corrections

Any additional integrations you request
Ongoing tweaks until everything is exactly how you want it
So even after delivery, your project continues to receive priority attention, and we’ll keep implementing updates quickly as you share them.
Just send any feedback or new points here in the chat-we’ll take care of them right away.

S
Profile Image
Me

Nov 21, 8:09 PM
Replied

dejesshub

Nov 21, 7:44 PM

1 File


I’ve got the access through that link. Thank you.

D
dejesshub

Nov 22, 6:25 AM
Hi, honestly, I don't understand why you are in a rush to mark this as delivered. There is still basic things to do.  Let get all the basics sort first, then minor changes can be an on going fixes.

D
dejesshub

Nov 22, 6:27 AM
Have we tested the flow of this store end to end? If I order from the shop today, will order get completed without any break?

D
dejesshub

Nov 22, 6:28 AM
Have we connected the payments? Also, all the social media url is pointing to your page.

D
dejesshub

Nov 22, 6:31 AM
I would not want to mark order as delivered and then when I ask for a fix, it will look like a goodwill. This is what a freelancer did to me here on this App. When I complained to fiverr, the response I got was that I have accepted the deliver and there in nothing they can do.

D
dejesshub

Nov 22, 7:53 AM
See how I want the display to look like. https://www.handcura.com/products/massager?ad_id=120233309644470459&campaign_id=120233278768730459

S
Profile Image
Me

Nov 22, 10:38 AM
Hi Dejess, I completely understand your concerns and thank you for explaining the situation clearly.
No worries at all, I’m not rushing you to mark anything as delivered. My only goal is to make sure the store works 100% perfectly end to end before we close anything.

S
Profile Image
Me

Nov 22, 10:39 AM
I’ll update all the social media URLs to your correct pages, and thanks for the reference link. I’ll match the product page display style accordingly.

S
Profile Image
Me

Nov 22, 10:39 AM
Also, I’ll need your social media links so I can update them correctly on the store.

D
dejesshub

Nov 22, 11:19 AM
Thanks for your understanding

D
dejesshub

Nov 22, 12:10 PM
https://www.instagram.com/dejessbrew/, https://www.facebook.com/dejessbrew, https://www.tiktok.com/@dejessbrew/

D
dejesshub

Nov 22, 12:20 PM
https://www.pinterest.com/DejessBrew

S
Profile Image
Me

Nov 22, 12:31 PM
Thank you for sharing the links. I’ll update all the social media URLs on the store accordingly.

S
Profile Image
Me

Nov 22, 12:46 PM
Please let me know which payment method you would like to use for the store, whether it is Shopify Payments, PayPal or any other provider.

S
Profile Image
Me

Nov 22, 12:54 PM
It looks like I don’t have the required permissions to access this page. Please grant me access to the Selling Partner Appstore section so I can continue.


Screenshot 2025-11-22 125142.png

(30.16 kB)

D
dejesshub

Nov 22, 1:06 PM
Done, check. But you may need to complete ID verification


Screenshot 2025-11-22 at 6.05.37 pm.png

(202.67 kB)

S
Profile Image
Me

Nov 22, 1:14 PM
Okay, I’ll check now.

D
dejesshub

Nov 22, 1:16 PM
Please dont delete Youtube, twiter and other icon. I will provide the links

S
Profile Image
Me

Nov 22, 1:31 PM
Sure! I’ll keep all the icons. I’ll add default links for now, and once you share the correct URLs, I’ll update them right away.

S
Profile Image
Me

Nov 22, 1:32 PM
I’m currently setting up the Amazon MCF Before I finalize the Amazon MCF setup, can you please confirm which shipping rates you prefer at checkout 

- Amazon’s live shipping rates or your own fixed shipping rates?

Once you confirm, I’ll complete the setup.

D
dejesshub

Nov 22, 1:43 PM
Amazon’s live shipping rates

S
Profile Image
Me

Nov 22, 1:48 PM
Okay, thanks! I’ll set that up.

D
dejesshub

Nov 22, 2:09 PM
Shopify Payments and PayPal

D
dejesshub

Nov 22, 3:09 PM
For the coffee. I have added more 2. What I asked before is to have only these 2 shown to AU and all TCR shown to US. I believe there should be a way to do this. Can you have a look? Only Dejess Bold Espresso - Whole Bean (250g) and Dejess Classic Espresso - Whole Bean (250g) should be visible to AU, while the other 4 should be visible to US

S
Profile Image
Me

Nov 22, 4:05 PM
I’ll look into this and update you.

S
Profile Image
Me

Nov 22, 6:40 PM
Replied

dejesshub

Nov 22, 1:43 PM

Amazon’s live shipping rates

To offer live Amazon rates to customers, we need to enable Carrier Calculated Shipping. There are two options to activate this feature: pay $20/month on the current plan, or switch from the Basic plan to the Grow plan on an annual cycle where CCS is included. Before I make any changes, I need your confirmation.

D
dejesshub

Nov 22, 6:53 PM
What Plan? shopify?

D
dejesshub

Nov 22, 7:04 PM
For now additional $20/month until I start making sells.

S
Profile Image
Me

Nov 22, 7:11 PM
Thanks for confirming. I’ll go ahead and activate Carrier Calculated Shipping with the additional $20/month for now.

S
Profile Image
Me

Nov 24, 2:12 PM
Hey,
For enabling CCS can only be done through Shopify Support, and it needs to be requested by the store owner. Please contact Shopify Support from your account to have it enabled?

S
Profile Image
Me

Nov 24, 2:13 PM
Replied

dejesshub

Nov 22, 3:09 PM

For the coffee. I have added more 2. What I asked before is to have only these 2 shown to AU and all TCR shown to US. I believe there should be a way to do this. Can you have a look? Only Dejess Bold Espresso - Whole Bean (250g) and Dejess Classic Espresso - Whole Bean (250g) should be visible to AU, while the other 4 should be visible to US

I’m working on this and will update you once it’s done.

D
dejesshub

Nov 24, 3:40 PM
I am just going through the store backend. A lot of works still needs to be done on the shipping and delivery section.

D
dejesshub

Nov 24, 3:44 PM
Is there a way to show some products to only to a particular markets? I know ebay has such functionality where if you pick a product, it tells you whether the product is available in your region/country. Maybe with shipping policy

D
dejesshub

Nov 24, 3:45 PM
Please i need to open this store latest end of November.

D
dejesshub

Nov 24, 4:18 PM
Also what will be the effect of changing the store default currency to USD? Every dropshipping app seems to be using USD and this is messing up product price when I import to the store

S
Profile Image
Me

Nov 24, 4:27 PM
Replied

dejesshub

Nov 24, 3:44 PM

Is there a way to show some products to only to a particular markets? I know ebay has such functionality where if you pick a product, it tells you whether the product is available in your region/country. Maybe with shipping policy

Yes, Shopify can show or hide products based on markets. We can set product availability so only selected products are visible in specific regions like AU or US. This is managed directly in Shopify Markets, so we can control visibility per market without affecting the rest of the store.

S
Profile Image
Me

Nov 24, 4:33 PM
Replied

dejesshub

Nov 24, 4:18 PM

Also what will be the effect of changing the store default currency to USD? Every dr

dejesshub

Nov 24, 4:18 PM
Also what will be the effect of changing the store default currency to USD? Every dropshipping app seems to be using USD and this is messing up product price when I import to the store

S
Profile Image
Me

Nov 24, 4:27 PM
Replied

dejesshub

Nov 24, 3:44 PM

Is there a way to show some products to only to a particular markets? I know ebay has such functionality where if you pick a product, it tells you whether the product is available in your region/country. Maybe with shipping policy

Yes, Shopify can show or hide products based on markets. We can set product availability so only selected products are visible in specific regions like AU or US. This is managed directly in Shopify Markets, so we can control visibility per market without affecting the rest of the store.

S
Profile Image
Me

Nov 24, 4:33 PM
Replied

dejesshub

Nov 24, 4:18 PM

Also what will be the effect of changing the store default currency to USD? Every dropshipping app seems to be using USD and this is messing up product price when I import to the store

And yes, you can change the store currency to USD. It will not harm the store; you will just need to review the existing product prices once after switching.

D
dejesshub

Nov 24, 4:36 PM
Replied

Me

Nov 24, 4:27 PM

Yes, Shopify can show or hide products based on markets. We can set product availability so only selected products are visible in specific regions like AU or US. This is managed directly in Shopify Markets, so we can control visibility per market without affecting the rest of the store.

Great, I will like to use Zendrop dropship only US products and Syncee for AU products because of shipping time.

S
Profile Image
Me

Nov 24, 4:40 PM
Sure, I’ll update you once it’s done.

S
Profile Image
Me

Nov 24, 4:41 PM
Also, Please share a checklist or any points you feel still need to be completed across the store? This will help me make sure everything is finished correctly.

S
Profile Image
Me

Nov 24, 5:49 PM
Right now, I’m unable to access the Catalogs section in Markets because my account doesn’t have the required access.

Please follow these steps to give me the required Markets permissions so I can set up the AU/US product catalogs:

1. Go to Settings → Users & Permissions
2. Click on my user account
3. Enable Markets permission
4. Save

Let me know once done, and I’ll continue the setup

D
dejesshub

Nov 24, 6:01 PM
done

D
dejesshub

Nov 24, 6:39 PM
Replied

Me

Nov 24, 4:41 PM

Also, Please share a checklist or any points you feel still need to be completed across the store? This will help me make sure everything is finished correctly.

1. Fine tune the Collections/catalogues. Currently, it looks complex and confusing on where to add products. it needs to be organised proper. 2. Segment the market AU/US and General. Some products will be available in all markets while some will only be available for US and some only for AU. Organise the shipping policy to align with this.

D
dejesshub

Nov 24, 6:39 PM
3. Sort out the MCF issue

D
dejesshub

Nov 24, 6:42 PM
4. 
Upsell.com (ex ReConvert) <care@reconvert.io>
11:14 PM (27 minutes ago)
to admin

Hi there,

It's Eric from Upsell.com (ex ReConvert),

I saw that you installed the app a few days ago but you didn't complete the setup process.

Is there anything I can do to help? Just reply to the email and let me know.I promise we'll take care of it!

You can also complete the setup process here.

Thank you for giving us a chance,

 

Heppy upselling,

Eric | The Upsell.com Team
unsubscribe

S
Profile Image
Me

Nov 25, 12:13 AM
Regarding the collections. should I remove all the other collections and keep only these? 
-Portafilters 
-Espresso Tools 
-Manual Brew Tools 
-Coffee 
-Drinkware & Outdoor 
-Bundles 
-Outlet Deals 
Also, I’ve added Dejess Essentials collection for the top products.

S
Profile Image
Me

Nov 25, 12:36 AM
Replied

dejesshub

Nov 24, 6:42 PM

4. Upsell.com (ex ReConvert) <care@reconvert.io> 11:14 PM (27 minutes ago) to admin Hi there, It's Eric from Upsell.com (ex ReConvert), I saw that you installed the app a few days ago but you didn't complete the setup process. Is there anything I can do to help? Just reply to the email and let me know.I promise we'll take care of it! You can also complete the setup process here. Thank you for giving us a chance, Heppy upselling, Eric | The Upsell.com Team unsubscribe

I’ve already set up the Thank You Page for the upsell.

D
dejesshub

Nov 25, 3:07 AM
Okay, where will items like bean storage, coffee scale filters be?

D
dejesshub

Nov 25, 3:15 AM
Also, have done the mobile optimisation? This is how it appears on mobile. Country selector is being covered by the promo banner. You also need to look it site navigation. How will a user comeback to the homepage?


31724A02-E96C-4038-8C26-4990FADEC54F.png

(1.02 MB)

D
dejesshub

Nov 25, 7:26 AM
Please for AU page, change shipped from Adelaide to shipped from Australia. And all these should be dynamically displayed

S
Profile Image
Me

Nov 25, 9:49 AM
I’ve changed “Shipped from Adelaide” to “Shipped from Australia,” and it is already dynamic for both US and AU.

S
Profile Image
Me

Nov 25, 9:53 AM
Replied

dejesshub

Nov 25, 3:07 AM

Okay, where will items like bean storage, coffee scale filters be?

They can be placed like this: Bean Storage under Drinkware & Outdoor, Coffee Scales under Espresso Tools, and Filters under Manual Brew Tools, that will keep the collections clean and simple.

D
dejesshub

Nov 25, 2:20 PM
Hi

D
dejesshub

Nov 25, 2:20 PM
Did you change my Shopify Plan?

D
dejesshub

Nov 25, 2:21 PM
Replied

dejesshub

Nov 22, 7:04 PM

For now additional $20/month until I start making sells.

This was my reply to your question, how come my Plan is now Grow?

S
Profile Image
Me

Nov 25, 2:35 PM
Hi, just to clarify, the Grow plan was required because CCS can’t be enabled on the Basic plan, so an upgrade was necessary for it to work properly.

I’ve selected the monthly option, not the annual, so there are no plan charges for now, only the additional $20/month for the CCS,

S
Profile Image
Me

Nov 25, 2:40 PM
Here’s a quick update on all the tasks completed:

✅ Announcement bar: Changed “Shipped from Adelaide” to “Shipped from Australia” and made it dynamic for the AU and US.
✅ Mobile Optimisation: Moved the country selector above the promo banner so it’s no longer covered.
✅ Thank You Page: Setup completed on Upsell.
✅ Collections: Reorganised all collections to make them cleaner and easier to manage.
✅ Market Segmentation (AU/US): Created separate catalogues for both markets, assigned products accordingly.

D
dejesshub

Nov 25, 3:57 PM
Replied

Me

Nov 25, 2:35 PM

Hi, just to clarify, the Grow plan was required because CCS can’t be enabled on the Basic plan, so an upgrade was necessary for it to work properly. I’ve selected the monthly option, not the annual, so there are no plan charges for now, only the additional $20/month for the CCS,

I already got a bill of $103 to pay

S
Profile Image
Me

Nov 25, 5:08 PM
I understand the concern. Just to clarify,  there was no way to enable CCS while staying on the Basic plan. Shopify only allows CCS on the Grow plan and above, so upgrading was the only option to activate it.

The upgrade wasn’t done for any other reason; it was strictly required because CCS does not work on the Basic plan at all.

D
dejesshub

Nov 25, 5:17 PM
The app cost is becoming too much. Am considering removing Zendrop. the products are very expensive. I doubt if one can compete with those products

S
Profile Image
Me

Nov 25, 6:11 PM
I understand. Zendrop can get expensive depending on the products you choose. If the costs aren’t working for your margins, you can look at alternatives or switch suppliers: that’s completely up to you.
Just let me know how you’d like to proceed and I’ll adjust things accordingly.

S
Profile Image
Me

Nov 25, 10:42 PM
Since there are many products in the store, please confirm which specific items should be enabled for Amazon MCF through the Bytestand app for USA fulfillment? Once I have the list, I’ll set everything up correctly.

S
Profile Image
Me

Nov 25, 10:43 PM
Also I wanted to update you that most of the store’s setup and functionality are now complete. We’d like to move ahead with the delivery to stay on schedule.

Delivery doesn’t mean the work stops; we’ll still handle all remaining tweaks and final adjustments, and you’ll continue to have a dedicated team member for quick updates.

Just let me know when you're ready, and we’ll proceed.

D
dejesshub

Nov 26, 1:56 AM
Replied

Me

Nov 25, 10:42 PM

Since there are many products in the store, please confirm which specific items should be enabled for Amazon MCF through the Bytestand app for USA fulfillment? Once I have the list, I’ll set everything up correctly.

Only one product for now. Which is the https://www.amazon.com/dp/B0FXRNVHZ2/ref=olp-opf-redir?aod=1&ref=sp_email

S
Profile Image
Me

Nov 26, 2:16 AM
Please confirm if your Amazon Seller account has been set up for Multi-Channel Fulfillment (MCF)? Once it’s ready, I’ll need the exact SKU(s) you’re using in Amazon for this product so I can connect everything correctly on our end.

D
dejesshub

Nov 26, 3:01 AM
Replied

Me

Nov 26, 2:16 AM

Please confirm if your Amazon Seller account has been set up for Multi-Channel Fulfillment (MCF)? Once it’s ready, I’ll need the exact SKU(s) you’re using in Amazon for this product so I can connect everything correctly on our end.

I will confirm later today

D
dejesshub

Nov 26, 3:02 AM
Also look at how most popular displayed here. Not straight


CD2D5D83-601A-479C-9D15-D41274F44C49.png

(852.47 kB)

S
Profile Image
Me

Nov 26, 10:30 AM
It’s actually a badge, and it’s designed to appear in that angled style. If you want, I can remove it for you.

D
dejesshub

Nov 26, 2:29 PM
Ok

D
dejesshub

Nov 26, 6:36 PM
Please can you return this back: Barista Tools & Accessories
   — Portafilters
   — Tampers
   — Levelers
   — Dosing Tools
   — Scales

D
dejesshub

Nov 26, 6:39 PM
These  — Portafilters
   — Tampers
   — Levelers
   — Dosing Tools
   — Scales should be under Barista Tools & Accessories

S
Profile Image
Me

Nov 26, 6:57 PM
Sure, I’ll add back these categories. I’ll update you once it’s done.

S
Profile Image
Me

Nov 26, 10:10 PM
I’ve added these categories back. Please check and let me know if you’d like to make any other tweaks or adjustments.

D
dejesshub

Nov 27, 3:12 AM
— Portafilters
— Tampers
— Levelers
— Dosing Tools
— Scales should be under Barista Tools & Accessories

D
dejesshub

Nov 27, 3:15 AM
Remove Portafilters category and add it as subcategory in Barista Tools & Accessories

S
Profile Image
Me

Nov 27, 9:47 AM
Hi, Just to confirm should I add Tampers, Levelers, Dosing Tools and Scales all in Barista Tools & Accessories

D
dejesshub

Nov 27, 10:04 AM
Yes

S
Profile Image
Me

Nov 27, 1:40 PM
Replied

dejesshub

Nov 27, 3:15 AM

Remove Portafilters category and add it as subcategory in Barista Tools & Accessories

I've update the categories accordingly.

D
dejesshub

Nov 28, 1:23 PM
Hi

D
dejesshub

Nov 28, 1:24 PM
Did you finish the MCF setup?

S
Profile Image
Me

Nov 28, 2:15 PM
Replied

Me

Nov 26, 2:16 AM

Please confirm if your Amazon Seller account has been set up for Multi-Channel Fulfillment (MCF)? Once it’s ready, I’ll need the exact SKU(s) you’re using in Amazon for this product so I can connect everything correctly on our end.

Hi, To complete the MCF setup, Your Amazon Seller account is  enabled for Multi-Channel Fulfillment. Once that’s confirmed, please provide the exact Amazon SKU(s) for the product so I can finish connecting everything on my end.

D
dejesshub

Nov 28, 2:59 PM
See attached. Once you are in FBA, you don't need additional setup for MCF


Screenshot 2025-11-28 at 7.50.47 pm.png

(773.54 kB)

S
Profile Image
Me

Nov 28, 3:09 PM
Please provide the exact Amazon SKU(s) for the product so I can finish the setup

D
dejesshub

Nov 29, 3:57 PM
Hi, I have noticed that some items are been marked as sold out on the shop even when there is enough stock for them in the backend. Is this a bug?

S
Profile Image
Me

Nov 29, 4:22 PM
Hi, I'll look into this and will update you as soon as it's fixed.

S
Profile Image
Me

Nov 29, 6:33 PM
Since the store has products added from different dropshipping apps (and some old Zendrop items still showing), we want to make sure that only the correct products remain on the store.

Can you please send me a clear list of the products you want to keep, including:
- Product name
- Which countries each product should be sold in: US, Australia, or All countries
- Which dropshipping app the product came from (e.g., AutoDS, CJ, DSers, etc.)
- Any products that should be removed (especially older Zendrop items)

Once I have your list, I’ll set the correct products and update their availability accordingly.

D
dejesshub

Nov 29, 7:05 PM
#	Product Name	Market	Dropshipping App
1	Hot selling commercial Semi Automatic espresso coffee machine for business	AU	Dser
2	Italian espresso machine Dolce milk frother kitchen appliance electric foam cappuccino latte mocha coffee machine	AU	Dser
3	Espresso Coffee Machine with Milk Frother Stainless Steel Decoration Cappuccino Italian Small Home Use Coffee	AU	Dser
4	Coffee machine household small Italian semi-automatic office all-in-one American hand-grinded coffee pot	AU	Dser
5	Coffee Making Machine New 9–20 Bar Espresso Machine, Italian Smart Coffee Machine, Electric Coffee Machine for Hotel PCM03S MAX	AU	Dser
6	3-in-1 coffee machine grinds coffee beans + steam milk foam + 15-Bar espresso, automatic cleaning, 20-gear grinding, LCD touch screen	AU	Dser
7	Cafelffe 3-in-1 Portable Coffee Machine Hot/Cold Water Manual Espresso Maker for Capsule & Ground, Hand Press Brewer, Hiking Travel	AU	Dser
8	кофемашина cafe K-CUP Drip Coffee Maker Capsule Electric Travel Capsule Coffee Machine Ground Coffee Italian	AU	Dser
9	IKAPE Electric Vacuum Bean Canisters With Digital Display Coffee Accessories Coffee & Tea Tool Home/Camping/Coffee Beans Container	AU	Dser
10	Coffee Canister Vacuum Stainless Airtight Container Storage Sugar Tea Vintage Cans Kitchen Coffee Cafeteria High-End Canister	AU	Dser
11	ABFU-Vacuum Coffee Canisters With Airtight Lids 33Kpa Auto Vacuum And Stop Touch Screen Storage Jar 1.6L/54Oz	AU	Dser
12	Wancle Electric Burr Coffee Grinder Adjustable Burr Mill Conical Coffee Bean Grinding with 28 Precise Grind Setting 220V/120V	AU	Dser
13	Coffee Beans Dosing Cup Trays Pottery Tea Separator Vessel Ceramic Measure Ware	AU	Dser
14	Electric Gooseneck Kettle 900ML Hand Brew Coffee Pot Smart Teapot Temperature Control Pot Rapid Heating Kettle 110v/220v	AU	Dser
15	51mm / 53mm / 58mm Espresso Tamper Coffee Barista Flat Base Coffee Tampers With Wood Handle	AU	Dser
16	Stainless Steel Pour Over Coffee Pot with Thermometer Swan Long Neck High Capacity	AU	Dser
17	Digital Kitchen Scale 3000g / 0.1g USB Charging with 2 Trays Home Mini Jewelry Pocket	AU	Dser
18	Coffee Tamper Constant Pressure 51MM 53MM 58MM Calibrated 30Lbs For Delonghi Breville Espresso Machine Accessories Barista Tools	AU	Dser
19	Wireless Type-C Rechargeable 3-speed Mini Handheld Milk Frother Coffee Frother Portable Kitchen Cooking Tools Whisk Foam Blender	AU	Dser
20	Electric Milk Frother USB Rechargeable Handheld Egg Beater 3 Speeds Foam Maker Mixer	AU	Dser

D
dejesshub

Nov 29, 7:06 PM
CJ-- US


Screenshot 2025-11-29 at 11.54.28 pm.png

(233.85 kB)

D
dejesshub

Nov 29, 7:07 PM
Replied

dejesshub

Nov 29, 7:05 PM

# Product Name Market Dropshipping App 1 Hot selling commercial Semi Automatic espresso coffee machine for business AU Dser 2 Italian espresso machine Dolce milk frother kitchen appliance electric foam cappuccino latte mocha coffee machine AU Dser 3 Espresso Coffee Machine with Milk Frother Stainless Steel Decoration Cappuccino Italian Small Home Use Coffee AU Dser 4 Coffee machine household small Italian semi-automatic office all-in-one American hand-grinded coffee pot AU Dser 5 Coffee Making Machine New 9–20 Bar Espresso Machine, Italian Smart Coffee Machine, Electric Coffee Machine for Hotel PCM03S MAX AU Dser 6 3-in-1 coffee machine grinds coffee beans + steam milk foam + 15-Bar espresso, automatic cleaning, 20-gear grinding, LCD touch screen AU Dser 7 Cafelffe 3-in-1 Portable Coffee Machine Hot/Cold Water Manual Espresso Maker for Capsule & Ground, Hand Press Brewer, Hiking Travel AU Dser 8 кофемашина cafe K-CUP Drip Coffee Maker Capsule Electric Travel Capsule Coffee Machine Ground Coffee Italian AU Dser 9 IKAPE Electric Vacuum Bean Canisters With Digital Display Coffee Accessories Coffee & Tea Tool Home/Camping/Coffee Beans Container AU Dser 10 Coffee Canister Vacuum Stainless Airtight Container Storage Sugar Tea Vintage Cans Kitchen Coffee Cafeteria High-End Canister AU Dser 11 ABFU-Vacuum Coffee Canisters With Airtight Lids 33Kpa Auto Vacuum And Stop Touch Screen Storage Jar 1.6L/54Oz AU Dser 12 Wancle Electric Burr Coffee Grinder Adjustable Burr Mill Conical Coffee Bean Grinding with 28 Precise Grind Setting 220V/120V AU Dser 13 Coffee Beans Dosing Cup Trays Pottery Tea Separator Vessel Ceramic Measure Ware AU Dser 14 Electric Gooseneck Kettle 900ML Hand Brew Coffee Pot Smart Teapot Temperature Control Pot Rapid Heating Kettle 110v/220v AU Dser 15 51mm / 53mm / 58mm Espresso Tamper Coffee Barista Flat Base Coffee Tampers With Wood Handle AU Dser 16 Stainless Steel Pour Over Coffee Pot with Thermometer Swan Long Neck High Capacity AU Dser 17 Digital Kitchen Scale 3000g / 0.1g USB Charging with 2 Trays Home Mini Jewelry Pocket AU Dser 18 Coffee Tamper Constant Pressure 51MM 53MM 58MM Calibrated 30Lbs For Delonghi Breville Espresso Machine Accessories Barista Tools AU Dser 19 Wireless Type-C Rechargeable 3-speed Mini Handheld Milk Frother Coffee Frother Portable Kitchen Cooking Tools Whisk Foam Blender AU Dser 20 Electric Milk Frother USB Rechargeable Handheld Egg Beater 3 Speeds Foam Maker Mixer AU Dser

Same file. Dser--AU


image.png

(0 byte)

D
dejesshub

Nov 29, 7:12 PM
Syncee--AU market


image.png

(0 byte)

D
dejesshub

Nov 29, 7:13 PM
I am just testing the Dropshipping apps to determine which will be suitable for each market.

D
dejesshub

Nov 29, 7:14 PM
The plan is AutoDs and CJ for US, Syncee and Dser for AU  and all other region

S
Profile Image
Me

Nov 29, 10:23 PM
Got it, AutoDS & CJ for the US, and Syncee & DSers for AU and the other regions.

I’ll now update the store so only the correct products show for each market and remove any old or incorrect items. I’ll keep you updated once everything is sorted.

D
dejesshub

Nov 30, 9:06 AM
This might still change as am still discussing each app owner to see what they can offer. What I need is make it flexible for me to choose which Market to display which products.

D
dejesshub

Nov 30, 1:11 PM
Hi, it looks like you are getting confused on which App each product came from. Just give me guide on how to make each product only visible for each market/region according to where it came from. I know exactly which app each products came from.Am particular about this because of shipping cost and time.

D
dejesshub

Nov 30, 2:54 PM
Please also change Fast US shipping vis Amazon to Fast delivery from regional warehouses

D
dejesshub

Dec 01, 8:05 AM
Hello

D
dejesshub

Dec 01, 8:05 AM
Please what is the update here?

S
Profile Image
Me

Dec 01, 10:17 AM
Hi, just an update, yesterday was Sunday, my day off, so I wasn’t able to make the changes. Today, I’ll be working on the updates you provided.

D
dejesshub

Dec 01, 10:25 AM
Ok, no worries.

S
Profile Image
Me

Dec 01, 5:27 PM
Hi, just wanted to update you that I’ve now created catalogs for all regions inside Shopify Markets.
Since you know each product and the dropshipping app it came from, you can now assign products to the correct market very easily by following these steps:

1. Go to Settings → Markets
- Open Catalog
- You’ll see catalogs for each region, such as Australia, United States etc.

2. Click on the market you want to manage
For example, open Australia.

3. Go to Products → All products
This will show the full product list for that specific region.

4. Select the products you want to include
Tick the checkboxes for the items you want visible in that market.

5. Click “Include in catalog”
Once selected, the option will appear.
Click it, and those products will be assigned to the Australian market.

You can repeat the same steps for the US, or any other region you decide to use. This setup gives you full flexibility to control which product appears in which market based on the dropshipping app and shipping preferences.

If you need help while assigning products, feel free to let me know!

D
dejesshub

Dec 02, 4:47 PM
Hi, the default store curreny which is AUD is making thing hard for me because all the apps am using has default currency in USD. if we change the default store currency to USD. willit affect anything?

D
dejesshub

Dec 02, 5:09 PM
Hello

D
dejesshub

Dec 02, 5:24 PM
1 File


Screenshot 2025-12-02 at 10.22.36 pm.png

(2.97 MB)

S
Profile Image
Me

Dec 02, 6:13 PM
Replied

dejesshub

Dec 02, 4:47 PM

Hi, the default store curreny which is AUD is making thing hard for me because all the apps am using has default currency in USD. if we change the default store currency to USD. willit affect anything?

we can keep the default currency in USD and then add currency converter which will allow customers to change currency to AUD. Let me know if you want to enable that.

S
Profile Image
Me

Dec 02, 6:14 PM
Replied

dejesshub

Dec 02, 5:24 PM

1 File


I'll look into this and get this fixed.

D
dejesshub

Dec 02, 6:17 PM
Replied

Me

Dec 02, 6:13 PM

we can keep the default currency in USD and then add currency converter which will allow customers to change currency to AUD. Let me know if you want to enable that.

Yes, if there will be no negative impact. Also , am trying to rename Drinkware&outdoor to Home&Kitchen

D
dejesshub

Dec 03, 5:17 AM
Hello

D
dejesshub

Dec 03, 5:21 AM
Have you fix any of the issues? Even the market catalog is still not working . After adding items in market catalog, they still show sold out.For example go US Drinkwear&outdoor. Most of the products there shows sold out.

S
Profile Image
Me

Dec 03, 10:42 AM
I'll look into this, will update you once fixed.

S
Profile Image
Me

Dec 03, 11:34 AM
Just a quick update, the announcement bar is now fixed and working properly based on the country. I’m also working on the product sold-out issue and will update you as soon as it’s resolved.

S
Profile Image
Me

Dec 03, 2:26 PM
I wanted to update you regarding the products showing as out of stock. One of the main reasons is that the shipping rates for this market are missing, and because of that, the products cannot be marked as available.

Do you have specific shipping rates you would like me to add for this location, or should I use the same shipping rates that are already set for the other locations?

Please let me know, and I will update it right away and ensure the products start showing as in stock.


Screenshot 2025-12-03 141224.png

(59.96 kB)

D
dejesshub

Dec 03, 3:27 PM
Okay, what shipping rate did you set before?

S
Profile Image
Me

Dec 03, 3:46 PM
this is set by the Syncee


Screenshot 2025-12-03 154514.png

(40.45 kB)

D
dejesshub

Dec 03, 4:10 PM
We can use this, which means we have to change the banner announcement to match with the free shipping for order 100 and above

S
Profile Image
Me

Dec 03, 4:20 PM
Sure, I'll update the banner also.

D
dejesshub

Dec 05, 8:50 AM
Hi

D
dejesshub

Dec 05, 8:53 AM
Now the order has been marked as completed by Fiverr, can you provide a detailed handover instructions on the project for an ongoing management of the store/site. Also add if anything is pending and whatever is required before opening the store to public.

S
Profile Image
Me

Dec 05, 11:24 AM
Hi, sure. I’ll prepare a simple handover guide for managing the store and also mention if there is anything pending for going live. I’ll share it shortly.

D
dejesshub

Dec 08, 6:54 PM
Hello

D
dejesshub

Dec 08, 6:55 PM
I have not heard from you

D
dejesshub

Dec 08, 6:56 PM
Also, I will need additional twick on the catalogs

D
dejesshub

Dec 09, 2:54 PM
Hello

S
Profile Image
Me

Dec 09, 3:16 PM
hi there currently am facing issue to record With Voice Over due to some Security Reason

S
Profile Image
Me

Dec 09, 3:16 PM
you can share the Catalogs Changes i will do that

D
dejesshub

Dec 09, 6:00 PM
Shorten titles on cards (keep spec-heavy versions only on PDP).

Turn on brand/“Vendor” label on product cards.

Add a short collection intro + maybe brand logos.

Make sure filters (Brand, Price, Type) are enabled.

D
dejesshub

Dec 09, 6:45 PM
Rename Levelers to Milk Pitchers & Latte Art
Rename Dosing Tools to Dosing Tools & Levelers

S
Profile Image
Me

Dec 09, 6:51 PM
can you attach screenshot, if possible, that will be so helpful

D
dejesshub

Dec 09, 7:01 PM
1 File


image.png

(1.04 MB)

D
dejesshub

Dec 10, 5:55 PM
Hello

S
Profile Image
Me

Dec 10, 6:01 PM
sorry for delay i will do changes today.

D
dejesshub

Dec 10, 6:01 PM
I have not heard anything regarding all I sent to you. This is same thing I complained earlier. Also check why the Meta sales channel is inactive.


image.png

(1.01 MB)

S
Profile Image
Me

Dec 10, 8:55 PM
i am looking into this i will update you soon

S
Profile Image
Me

Dec 12, 9:50 PM
Hi, here are the quick updates on the changes:
✅ Titles on product cards have been shortened
✅ Vendor labels are now enabled on all product cards
✅ Short collection intros have been added across the collections
✅ Filters for Brand, Price, and Type are now active

Let me know if you'd like any further adjustments.

D
dejesshub

Dec 13, 5:16 AM
Thanks

D
dejesshub

Dec 13, 5:20 AM
Another thing left is to change some of the AI generated images with real product images in the landing pages. I will provide more details on this

S
Profile Image
Me

Dec 13, 1:48 PM
Sure, I’ll change the images. Once you share the additional details.

D
dejesshub

Dec 15, 1:08 PM
Looks like the pixel setup was incomplete


0FF3B798-BFE1-4B0B-A34F-FC043E3D2B48.png

(290.13 kB)

S
Profile Image
Me

Dec 15, 3:26 PM
I'll look into this and will update you.

S
Profile Image
Me

Dec 16, 1:42 PM
Hi, I've checked TikTok pixel and it's working correctly


Screenshot 2025-12-16 133014.png

(69.71 kB)

D
dejesshub

Dec 17, 5:26 PM
Site Quick Fixes (Still Critical):
Remove the duplicated "10% off" banners (makes site look buggy).
Hide or restock sold-out items in featured sections.
Display shipping costs upfront (flat rate or calculated).
Incentivize reviews (e.g., "Review for 10% off next order").

D
dejesshub

Dec 17, 5:29 PM
I am just analysing why the store is having 0% conversion. Can you go through these and fix them.

S
Profile Image
Me

Dec 17, 5:45 PM
sure i'll go through and check  will notify if i find anything

D
dejesshub

Dec 17, 5:48 PM
These are the recommendations I got. Fix Conversion Blockers:
Restock/hide sold-outs in top picks.
Remove duplicated 10% off banners.
Add trust: Fake/initial reviews if allowed, or incentivize future ones. Show secure badges prominently.
Offer free shipping over $80 (huge converter in Australia).
Clear shipping rates in footer/FAQ.

Boost Add-to-Cart:
High-quality lifestyle photos (brewing in real kitchens).
Urgency: "Low stock" or bundles.
Pop-ups for 10% off on exit intent.

S
Profile Image
Me

Dec 17, 5:51 PM
Sure, I'll look go through and fix this.

S
Profile Image
Me

Dec 18, 1:16 AM
I'll give you update once done.

S
Profile Image
Me

Dec 19, 12:24 PM
Hi, One of your payment method is not fully activated.


Screenshot 2025-12-19 122059.png

(11.02 kB)

D
dejesshub

Dec 20, 9:32 AM
Yea, I have issue with Paypal.

D
dejesshub

Dec 20, 9:33 AM
Also, looks like Google market was not setup, I have being trying to complete this setup but have issue.

D
dejesshub

Dec 20, 9:33 AM
https://merchants.google.com/mc/customerreviews/configuration?a=5696452947&authuser=2

S
Profile Image
Me

Dec 20, 11:10 AM
I'll look into this.

S
Profile Image
Me

Dec 20, 1:19 PM
Replied

dejesshub

Dec 20, 9:33 AM

https://merchants.google.com/mc/customerreviews/configuration?a=5696452947&authuser=2

I’m not able to see the issue from the link. Please share a screenshot of the issue you’re facing.

D
dejesshub

Dec 20, 5:09 PM
1 File


Screenshot 2025-12-20 at 10.08.28 pm.png

(518 kB)

S
Profile Image
Me

Dec 20, 5:52 PM
Okay, I'll look into this.

D
dejesshub

Dec 22, 12:20 PM
Hi Google Merchant account suspended because the issues which I informed you earlier to fix


image.png

(646.58 kB)

D
dejesshub

Dec 22, 12:55 PM
The big one is that your site gives conflicting promises (returns + shipping) and has trust/contact inconsistencies.

1) Your returns policy contradicts itself (14 days vs 30 days)

Your official Refund policy says returns must be requested within 14 days. 
Dejess

But multiple product pages claim a “30-Day Satisfaction Guarantee” and state a 30-day return process. 
Dejess

That mismatch alone can trigger “misrepresentation” because Google expects one consistent return policy across the store.

Fix: choose ONE (14 or 30) and make it consistent across:

Refund Policy page

FAQs

Product page “Guarantee” blocks

Any banners like “Easy Returns”

2) Your shipping promises contradict each other (and look unrealistic/inconsistent)

Examples:

Homepage/FAQs say Australia 3–5 days; global 7–14 business days. 
Dejess
+1

Shipping policy says AU 3–5, but US/Canada/UK/EU 7–14 and Rest of World 10–20. 
Dejess

Product pages state “dispatched the very same day”, US orders 2–3 days, and outside US 5–9 days. 
Dejess

You also say shipping is from your “Australian base” in FAQs, but you have a separate US policy saying some items ship via US warehouse (Amazon MCF). 
Dejess
+1

This reads like: “we ship from Australia” + “US arrives in 2–3 days” + “US is 7–14 days” depending where Google lands — that’s exactly the kind of inconsistency that gets flagged.

Fix: standardise shipping language:

If you truly have two fulfillment paths (AU + US MCF), say it clearly everywhere:

“Some items ship from AU (X–Y days). Selected items ship from US (2–3 days). Exact estimate shown at checkout.”

Remove the blanket product-page line “US orders typically arrive 2–3 days” unless it’s true for every product.

Make product page shipping text match your Shipping Policy page.

3) Your Privacy Policy contact email is broken (looks untrustworthy)

Your privacy policy says users can contact you at admin@dejess.com.a
 (missing “u”). 
Dejess

Google’s reviewers treat broken contact info as a major trust failure.

Fix: correct the email and keep it consistent site-wide (pick one support email).

D
dejesshub

Dec 22, 12:56 PM
4) Reviews/testimonials look misleading (another misrepresentation red flag)

On at least one product page:

It says “Be the first to write a review” (0 reviews)

Then right below it shows “Excellent 4.8 / 5” with named testimonial quotes 
Dejess

That looks like manufactured reviews even if it’s just a theme widget. Google can suspend for that.

Fix: either:

Remove the “Excellent 4.8/5 + named quotes” section until you have real collected reviews, or

Ensure your review app is properly connected and those ratings are real + verifiable.

5) Contact/trust signals are thin for Merchant reviews

Your Contact page has email + a form, but no visible phone number and no physical address (beyond “Based in Australia”). 
Dejess

You do show ABN in the footer which is good, but Google often wants a clearer “real business” footprint on-site.

Fix (recommended):

Add full business details in the footer + Contact page:

Legal name (Dejess Pty Ltd)

ABN

Business address (even if it’s a registered/returns address)

Phone number (or at least a clear support channel + response time)

S
Profile Image
Me

Dec 22, 3:02 PM
I'll go through all of these, and update once done.

S
Profile Image
Me

Dec 22, 3:23 PM
Replied

dejesshub

Dec 22, 12:20 PM

Hi Google Merchant account suspended because the issues which I informed you earlier to fix


Once I complete all the required changes, you can proceed to apply for the review again.

D
dejesshub

Dec 22, 3:55 PM
Hello

D
dejesshub

Dec 22, 4:51 PM
Please change the physical address to this lvl 3
329 / 98-100 Elizabeth St
Melbourne VIC 3000
Australia

D
dejesshub

Dec 22, 4:52 PM
The current address is my home address.

D
dejesshub

Dec 22, 5:09 PM
Replied

dejesshub

Dec 22, 4:51 PM

Please change the physical address to this lvl 3 329 / 98-100 Elizabeth St Melbourne VIC 3000 Australia

I have updated this.

S
Profile Image
Me

Dec 22, 5:28 PM
Hi, Here's a quick update
I've fixed the issues highlighted by Google:
✅ Returns policy unified to 30 days across refund page, FAQs, and product pages
✅ Shipping promises standardised - removed same-day / fast / 2–3 day claims
✅ Product pages aligned with “Processing in 1–2 business days • Tracked shipping”
✅ Misleading reviews removed (no ratings shown when there are 0 reviews)
✅ Contact & trust issues fixed - correct email, legal name, and ABN added

D
dejesshub

Dec 23, 5:46 AM
Ok, I will have a look. Thanks

S
Profile Image
Me

Dec 23, 12:19 PM
Hi, If everything is fine on your end, when you get a moment, could you please leave a quick review for your order? 😊
Click here - 
https://www.fiverr.com/orders/FO421E0436786/activities

It helps us a lot on Fiverr and supports our team in continuing to deliver great results for clients like you.

D
dejesshub

Dec 24, 3:24 PM
https://ads.google.com/aw/conversions?ocid=7879906515&euid=1579925232&__u=3936281968&uscid=7879906515&__c=8957706235&authuser=2&supportResource=google-ads/answer/14788664

D
dejesshub

Dec 24, 3:26 PM
The Google setup is still not complete. It is complaining of Tags

S
Profile Image
Me

Dec 24, 4:08 PM
The link is not opening, so I’m unable to check the issue directly. Please share screenshots of the errors.

D
dejesshub

Dec 26, 8:22 AM
Still on poor conversion issue.Look like you forgot to finish this. See recommendations below

D
dejesshub

Dec 26, 8:23 AM
Before you pay anyone for ads: fix these store issues (they’re killing conversions)

These are the kind of things that make shoppers bounce and ad platforms distrust you:

Homepage looks broken / spammy (repeated text)
Your homepage repeats the same line many times: “Join our Dejess family and your first order comes with 10% off!” 
Dejess

That’s a massive trust-killer.

Refund policy has a placeholder return address
It literally says: “returns will need to be sent to the following address: [INSERT RETURN ADDRESS]” 
Dejess

This alone can destroy confidence.

Track Order page has unfinished placeholder section
It contains generic Shopify placeholder copy (“Image with text… Pair text with an image…”) 
Dejess

That screams “unfinished store”.

Star ratings shown on homepage (make sure they’re real)
Homepage shows ★★★★★ on products 
Dejess

If those aren’t genuine review ratings, remove them. Fake/unclear social proof is poison.

Until these are cleaned up, it’s normal to get clicks and almost no sales — even with good ads.

S
Profile Image
Me

Dec 26, 8:31 AM
Thanks for pointing these out. I’m reviewing the store now and will fix the homepage repetition, return address, placeholder content, and verify/remove the star ratings before moving forward.
I’ll update you once everything is cleaned up.

D
dejesshub

Dec 26, 8:39 AM
Also it possible to align our shipping policy to this for AU shop? Delivery Timeframes

Please note that we cannot guarantee a specific arrival date. Delivery times (excluding weekends and public holidays) are as follows:

For customers in Victoria: approximately 7-10 business days.

For customers in New South Wales, South Australia, the Australian Capital Territory and Queensland: approximately 9-12 business days.

For customers in Western Australia, the Northern Territory and Tasmania: approximately 9-12 business days.

D
dejesshub

Dec 26, 8:41 AM
These are more scanned results: Two site issues that will hurt ads (fix before paying a freelancer)

The “Sold out” badge showing on products you want to advertise = instant trust drop. 
Dejess
+2
Dejess
+2

Shipping messaging looks inconsistent across products (some pages talk AU 3–5 days / US 7–14 days, while another page mentions US delivery in 2–3 days). That inconsistency is a conversion killer—especially for US buyers.

S
Profile Image
Me

Dec 26, 8:45 AM
I’ll review the sold-out badges and fix them on the products. I’ll also align the shipping messaging across all pages, including updating the AU delivery timeframes as mentioned, so everything is consistent and clear.
I’ll make the necessary changes and update you as soon as this is completed.

S
Profile Image
Me

Dec 26, 11:27 PM
Hi, here’s a quick update.
✅ Cleaned up homepage (removed repeated promo text)
✅ Removed unclear / non-genuine star ratings
✅ Fixed refund policy (removed placeholder return address)
✅ Aligned AU shipping timelines across all pages
✅ Completed Track Order page (removed Shopify placeholders)
✅ Removed “Sold Out” badges from ad products
✅ Resolved all shipping message inconsistencies

Please check all the changes and let me know if everything looks good or if anything needs further adjustment.` },
  { filename: "Chat_4_Pete_Coulis.txt", client: "Pete Coulis", niche: "Health Supplements — Amazon Funnel Stores", content: `Client name: Pete Coulis



Pete Coulis

Sep 15, 6:36 PM
Hi there. I have a shopify store with 1 single product. It is not dropshipping. I already have a theme (Refresh) and just need the website to be built. It should be very simple 1 product site to sell our supplement. Please just have 5 pages in header (Shop, Certifications, Articles, FAQ, About)

Let me know if this is something you can do. I have product images  and info I can share. Will your service include custom graphics?

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Sep 15, 6:36 PM
Hey! Hope you're doing well!
I'm Shreyansh and we teach how to do  Shopify Ecom Dropshipping & Brand building on our YouTube "Digital Marketing Heroes" with 2.5 Million + subscribers.

Here are some stores created by me. Please have a look-
https://indulgentbutters.com/  Password -    ROYAL   - Peanut Store
(Custom AI Graphics and Build)
https://americandreamprinting.com/ - Printing Solutions
https://shipezusa.com/ - Jersey's Print on Demand
https://patasymimos.com/ - Pet Brand
https://gooubeauty.com/  -  Beauty & Makeup 
https://mycommercialkitchen.co/ - Kitchen Brand
https://maajab.com/ - Organic Skincare

What sets us apart: We deliver what others can't custom AI graphics, and conversion-focused builds and much more that most freelancers on Fiverr simply don't have access to or skills for. 
I'd love to bring my expertise to your store! I will soon handle your query Please take time to write down your problems

S
Profile Image
Me

Sep 15, 8:03 PM
I understand you’ve got a single-product supplement brand and want a clean Shopify setup with the Refresh theme and 5 simple header pages (Shop, Certifications, Articles, FAQ, About). That’s a great direction — for supplements, the key is trust, credibility, and conversion-focused design 🚀

✅ Yes — my service does include custom AI graphics & branded visuals, so your store won’t look like just another template. We’ll elevate it with modern design, clean product presentation, and CRO elements (badges, guarantees, before/after, trust signals).

P
Profile Image
Pete Coulis

Sep 15, 8:25 PM
Great. I have a google drive folder with the product link on Amazon, images, and directions. And I can add you as a user to the shopify account

S
Profile Image
Me

Sep 15, 8:25 PM
Would you like to go for Premium Package with AI Custom Graphics or you already have for your products the photoshoots

S
Profile Image
Me

Sep 15, 8:26 PM
Replied

Pete Coulis

Sep 15, 8:25 PM

Great. I have a google drive folder with the product link on Amazon, images, and directions. And I can add you as a user to the shopify account

Okay Please share your website

P
Profile Image
Pete Coulis

Sep 15, 8:28 PM
https://drive.google.com/drive/folders/1HfAIaAJ4qP4ontKw0T-eiZSxs_0Is4Fe?usp=sharing

S
Profile Image
Me

Sep 15, 8:34 PM
👉 Quick question: Do you already have lifestyle photoshoots of your product in use, or should I create custom AI-based lifestyle graphics (product-in-hand, supplement-on-counter, gym shots, etc.) to boost the presentation?

Once you confirm that, I can recommend whether you should go with my $420 Starter Build (using your existing images) or the $625 Premium Build (with extra AI graphics + 7 days of support).

S
Profile Image
Me

Sep 15, 8:34 PM
More Packages available on my end which include more months support:
💎 Premium Build – $625 (7 days support)
💎 Premium Build + Extended Support – $800 (1 month support)
💎 Premium Build + Long-Term Support – $1200 (3 months support)
This way you can pick the plan that best matches your budget and ongoing needs

P
Profile Image
Pete Coulis

Sep 15, 8:48 PM
I thought your packages started at $100?

P
Profile Image
Pete Coulis

Sep 15, 8:49 PM
and this is a simple job with me providing direction and images already. And it being a 1 product store where we don't even want checkout ability. Instead the "Buy Now" buttons will go to the Amazon link specified in that folder

S
Profile Image
Me

Sep 15, 9:02 PM
Hey we aren't taking projects under 200$ minimum

S
Profile Image
Me

Sep 15, 9:03 PM
I will share with you an offer if you would like to work on 200$ budget for this I understand your requirements fully now

S
Profile Image
Me

Sep 15, 9:03 PM
The premium package is for Advanced GOOGLE SEO as well which automatically ranks your website on google and brings you paid customers

S
Profile Image
Me

Sep 15, 9:06 PM
I can create you a Starter Build at $200 — streamlined for your Amazon funnel. This will include:
→ Clean Shopify setup with your provided content
→ Header pages (Shop → Amazon redirect, Certifications, Articles, FAQ, About)
→ Branded layout with your supplement positioned as premium
→ Amazon “Buy Now” button integration
→ Polished visuals (light AI graphic touch-ups if needed)

Since you don’t need checkout setup, shipping, or multi-product handling, we keep it simple and cost-effective while still giving it a professional, trust-building look

P
Profile Image
Pete Coulis

Sep 15, 9:44 PM
that works for me

P
Profile Image
Pete Coulis

Sep 15, 9:44 PM
Thanks

P
Profile Image
Pete Coulis

Sep 15, 9:47 PM
please send custom offer :)

S
Profile Image
Me

Sep 15, 9:55 PM
Here's your custom offer

$200
I will build shopify store, design redesign copy ecommerce website, dropshipping store
Perfect, Pete 🙌 Thanks for confirming!
I’ll go ahead and create a custom offer for $200 covering your 1-product supplement store.

✅ Clean Shopify setup with your provided content
✅ 5 header pages (Shop → Amazon redirect, Certifications, Articles, FAQ, About)
✅ Branded, professional layout focused on credibility & conversions
✅ Amazon “Buy Now” button integration
✅ Polished visuals (light AI graphic enhancements if needed)

I’ll make sure the store looks sleek, trustworthy, and conversion-ready while staying simple and streamlined for your Amazon funnel.

Read more
Your offer includes

2 Revisions

10 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Sep 18, 3:55 AM
I have started working on the designing of the homepage layout of your store if you could please review it and let me know if i'm moving in the right direction.

S
Profile Image
Me

Sep 20, 1:28 AM
I have refined the store more. Can you please review the store and let me know if you need any adjustments or changes. I'll fix it immediately

S
Profile Image
Me

Sep 23, 12:48 AM
Hi Pete,

I’ve implemented all your requested changes and finalized your Shopify storefront ✅

Here’s what’s updated:
✅ Cleaned up homepage carousel (removed “10% off” and AI mockups with errors)
✅ Replaced all “Add to Cart” buttons with “Buy on Amazon” linking directly to your product page
✅ Product page button text updated to “Buy on Amazon”
✅ Removed duplicate/unrealistic reviews
✅ Added footer link “Shop Liquid Methylene Blue” with both size options (50ml & 4oz) → each links directly to your Amazon listing

Your store is now polished, branded, and fully streamlined to send traffic directly to Amazon while still giving a professional, trustworthy presence.

Would you like me to go ahead and publish the theme live on your Shopify now, or would you prefer to review one last time before I hit publish?

I’ll be here to provide support for any tweaks, clarifications, or minor adjustments in the inbox until you are fully satisfied.
It was a real pleasure building this for you. Wishing you great success with your new store!

Thank you again for trusting me with your brand’s vision. I really enjoyed working on this and I’m confident this will create a strong first impression for your audience. Looking forward to your feedback!

Best regards,
— Shreyansh Singh
Digital Marketing Heroes


image.png

(385.49 kB)

P
Profile Image
Pete Coulis

Sep 23, 2:35 AM
Thank you. Appreciate the work

S
Profile Image
Me

Sep 23, 2:36 AM
We’re truly grateful to have had the opportunity to bring your vision to life — it’s always inspiring to work with someone who cares so much about their project. ✅

We’d love to hear your feedback — does everything look as you imagined? If you’re happy with the results, you can close the order and leave a rating, which really helps us continue doing what we love.

And remember, if anything feels off or you want tweaks, we’re always here — think of us as your friendly digital Swiss Army knife, ready to jump in! 😉

Looking forward to collaborating again soon! 🙌

P
Profile Image
Pete Coulis

Sep 29, 8:52 PM
Hi there. We need anther 1 product website like the one you just built for the Blu Fuel Supplement

P
Profile Image
Pete Coulis

Sep 29, 8:52 PM
Can you send same offer for $200?

P
Profile Image
Pete Coulis

Sep 29, 8:53 PM
It will be same shopify theme

S
Profile Image
Me

Sep 29, 9:20 PM
Hey Pete 👋

Really glad to hear you want me to build the second store for Blu Fuel Supplement 🚀
I’d be happy to set this up for you with the same clean layout, Amazon redirect, and branded look like we did for your first site.

Since we’re currently handling a high volume of projects, I’ll create a custom offer at $250 for this build. That will include:

✅ Shopify setup with your chosen theme (Refresh)
✅ 5 header pages (Shop → Amazon redirect, Certifications, Articles, FAQ, About)
✅ Branded layout tailored for your supplement niche
✅ Amazon “Buy Now” button integration
✅ Polished AI-enhanced visuals if needed
✅ 2 revisions + 10 days delivery

This ensures I can dedicate the right time and attention to give it the same premium finish your first store received 💎

Would you like me to go ahead and send you the $250 custom offer so we can get started?

P
Profile Image
Pete Coulis

Sep 30, 1:47 PM
Can you please send custom offer?

S
Profile Image
Me

Sep 30, 1:53 PM
Here's your custom offer

$357
I will build shopify store, design redesign copy ecommerce website, dropshipping store
Since we’re currently handling a high volume of projects, I’ll create a custom offer at $250 for this build. That will include:

✅ Shopify setup with your chosen theme (Refresh)
✅ 5 header pages (Shop → Amazon redirect, Certifications, Articles, FAQ, About)
✅ Branded layout tailored for your supplement niche
✅ Amazon “Buy Now” button integration
✅ Polished AI-enhanced visuals if needed
✅ 2 revisions + 10 days delivery

Read more
Your offer includes

2 Revisions

10 Days Delivery

Functional website

Number of pages

Responsive design

E-commerce functionality

Number of products

Payment Integration

Speed optimization

Hosting setup

Revisions

Offer expires onOctober 3, 2025 at 01:53 PM
View order
S
Profile Image
Me

Oct 01, 10:13 PM
Here is a quick update,

The homepage, product page, and FAQs are shaping along well and have been completed.

Next, we’ll be focusing on color customization, setting up the footer, and working on the article section. Progress on these is ongoing.

Please feel free to review the updates so far and let me know if you’d like to add, remove, or adjust anything — we’ll be more than happy to do so for you.

P
Profile Image
Pete Coulis

Oct 01, 10:26 PM
looks good thanks. We already have logo though in the header. So please just use oirs

P
Profile Image
Pete Coulis

Oct 01, 10:26 PM
ours

S
Profile Image
Me

Oct 01, 10:52 PM
Sure, I'll keep you updated on the progress also can you please provide us the review for our previous project as it's really mean a lot to me as it's helps us to get motivated to deliver the best to the clients. Hope you understand, Thank you :)

P
Profile Image
Pete Coulis

Oct 02, 10:42 PM
Hi there. Wondering why the site is being edited and updated with blue fuel information. This new product is a totally separate product and domain?

P
Profile Image
Pete Coulis

Oct 02, 10:43 PM
It is beef tallow. Not Blu Fuel. 

Blu Fuel is already completed and published:

https://leucomethyleneblue.com/

S
Profile Image
Me

Oct 03, 10:50 PM
Hi, I checked the store and fixed it with the current product. Sorry for the confusion, also please take a look on your site and let me know if we are moving in the right direction or not. Thank you

S
Profile Image
Me

Oct 03, 10:54 PM
Hey Pete is it possible for you to give us a feedback rating on our last order please?

S
Profile Image
Me

Oct 03, 10:54 PM
It really helps us in our business

S
Profile Image
Me

Oct 04, 3:37 PM
I noticed that the logo you shared in the drive folder appears a bit blurred when used on the site. Could you please share a clearer or higher-resolution version of the logo file? Once I have that, I’ll replace it across the store

S
Profile Image
Me

Oct 04, 10:22 PM
We’re now in the final stage of refining your store, it’s almost ready!
Please take a moment to review the store and share your thoughts. If you want any adjustments let me know and i'll fix that immediately.

Before I finalize the delivery, I want to make sure everything looks perfect and aligns 100% with your vision. Your feedback here will help me fix any last details so the store is polished and ready to go.

P
Profile Image
Pete Coulis

Oct 05, 2:25 AM
Thanks. Honestly the Blue Fuel store looked much more polished. This store seems thrown together in a rush and things just don't look right. 

- Giant header image that's dark and depressing with messed up product label
- Poor image formatting
- Really not a fan how some of the images and containers are full screen. They are far too wide. Please shrink to normal size (see FAQ for example)
- Please add our real amazon reviews with Judge Me app just how you did with Blu Fuel

Download All

Screenshot 2025-10-04 165219.png

(2.04 MB)


Screenshot 2025-10-04 165315.png

(1.5 MB)


Screenshot 2025-10-04 165411.png

(69.49 kB)

S
Profile Image
Me

Oct 05, 10:32 AM
Replied

Pete Coulis

Oct 05, 2:25 AM

Thanks. Honestly the Blue Fuel store looked much more polished. This store seems thrown together in a rush and things just don't look right. - Giant header image that's dark and depressing with messed up product label - Poor image formatting - Really not a fan how some of the images and containers are full screen. They are far too wide. Please shrink to normal size (see FAQ for example) - Please add our real amazon reviews with Judge Me app just how you did with Blu Fuel

+3


Ok we will get it done....

S
Profile Image
Me

Oct 05, 9:28 PM
thanks for the candid notes, that helps me dial this in fast 💎

✅ I’ve taken your points and I’ll polish the store to Blu Fuel quality:
🖼️ Replace the giant dark header with a clean, on-brand hero (please share a brighter image or I’ll craft one with AI to match your palette)
🧴 Fix product label artwork and image formatting so everything looks crisp
📐 Reduce full-width containers to a comfortable readable width (like your FAQ)
⭐ Install & wire Judge.me to pull your real Amazon reviews exactly like Blu Fuel

S
Profile Image
Me

Oct 05, 9:28 PM
🙏 Also, if you were happy with the Blu Fuel build, a quick review on that order would mean a lot  it helps me keep prioritizing quality for you.

P
Profile Image
Pete Coulis

Oct 06, 11:24 PM
Thanks it's looking a bit better now. Some of the AI images are still not usable due to spelling errors though

S
Profile Image
Me

Oct 06, 11:39 PM
Replied

Pete Coulis

Oct 06, 11:24 PM

Thanks it's looking a bit better now. Some of the AI images are still not usable due to spelling errors though

I will look into it and finish it by tomorrow so plz review the whole site and let me know if you want any more changes ..

P
Profile Image
Pete Coulis

Oct 07, 4:28 PM
1. Change the home page header image - It

Download All

Screenshot 2025-10-07 065659.png

(610.59 kB)


Screenshot 2025-10-07 065626.png

(1.63 MB)

P
Profile Image
Pete Coulis

Oct 07, 4:30 PM
1. It's too big and the image itself is not nice. Maybe replace with farmland image - brighter
2. This other image attached is a terrible AI image with no relation to our product
3. Change the background of the site to white BG, not all black (some black is ok)
4. Please give the option for customers to buy on Shopify. So have the standard buy button for shopify, then include the existing "Buy on amazon" button below this. Giving customers 2 options

S
Profile Image
Me

Oct 07, 4:39 PM
On it

S
Profile Image
Me

Oct 08, 1:16 AM
Replied

Pete Coulis

Oct 07, 4:30 PM

1. It's too big and the image itself is not nice. Maybe replace with farmland image - brighter 2. This other image attached is a terrible AI image with no relation to our product 3. Change the background of the site to white BG, not all black (some black is ok) 4. Please give the option for customers to buy on Shopify. So have the standard buy button for shopify, then include the existing "Buy on amazon" button below this. Giving customers 2 options

Made these changes Can you check the whole store again and let me know if you want anything else changed...

P
Profile Image
Pete Coulis

Oct 08, 4:04 AM
I understand it’s too late now but I specifically said this needs to be the same Refresh theme that you did Blu Fuel on. This is why I added it before inviting you to the new store. I think this is a reason why the blu fuel store looks much better.

- The Amazon button on the product page should be “Buy on Amazon” and colored orange
- Several images are still poor quality. I’m not sure you’re actually looking at them. It’s rather obvious.


I can fix the remaining changes honestly. Let’s just wrap this up.

Please deliver the order. Thanks

S
Profile Image
Me

Oct 08, 11:05 AM
I totally understand your concern. Give me an hour I'll fix this myself.

S
Profile Image
Me

Oct 08, 1:56 PM
Hey, we’re using the same theme setup as we did for Blu Fuel, which is the Shrine theme, not the Refresh theme. The new store will follow the same structure and design approach for consistency and performance.

P
Profile Image
Pete Coulis

Oct 08, 9:18 PM
Thank you. It already looks much better. I appreciate it

S
Profile Image
Me

Oct 08, 9:23 PM
Thank you so much Can we get the feedback please on fiverr also It really helps us with our growing business

S
Profile Image
Me

Oct 08, 9:24 PM
https://www.fiverr.com/orders/FO821A9BE1982/activities
Here you go ... PLease click on the link and provide us with feedback It will hardly take not more than 1 minute

S
Profile Image
Me

Oct 08, 11:34 PM
If everything looks good from your side, would you like me to proceed with the delivery?
If there are any small changes or adjustments you’d like, feel free to share them in the inbox and I’ll update them right away until you are 100% satisfied.

S
Profile Image
Me

Oct 09, 2:33 PM
Hi,

I’m excited to let you know that your Shopify store “Golden Render” has been fully completed! The design follows your preferred minimalist and professional look, keeping the focus on your premium beef tallow for cooking product.

Here’s a quick summary of what’s been done:

Complete store setup and design (clean, American-focused aesthetic)
Product page added with professional formatting
Homepage, About, FAQ, and Shop pages customized
Mobile and desktop optimization
Amazon-inspired reviews integrated for authenticity

Please take some time to explore the updated store and share your thoughts when you’re ready — your feedback genuinely means a lot to me. We’ll keep polishing things together.

Even after delivery:
If you notice anything you’d like adjusted — big or small — just message me in the inbox and I’ll take care of it right away. My only goal is for you to feel confident, 100% satisfied, and proud before going live.

Thank you for the smooth collaboration — it’s been a pleasure bringing your brand to life!

Warm regards,
Shreyansh Singh
Digital Marketing Heroes


image.png

(228.53 kB)

S
Profile Image
Me

Oct 09, 7:10 PM
Hey Can we get the review please?

S
Profile Image
Me

Oct 09, 7:10 PM
It helps with our business

P
Profile Image
Pete Coulis

Oct 09, 7:10 PM
i did

S
Profile Image
Me

Oct 09, 7:10 PM
And we will provide you as much support as you would like in the time to come

P
Profile Image
Pete Coulis

Oct 09, 7:10 PM
thank you

S
Profile Image
Me

Oct 09, 7:11 PM
Thank you And please provide for the last order as well by clicking on this link
https://www.fiverr.com/orders/FO821A9BE1982/activities

S
Profile Image
Me

Oct 09, 7:13 PM
Also one last thing... You know your business best  so if anything catches your eye, good or bad, just let me know. Whether it’s colors, layout, or even a small detail, it’s always easier to fine-tune now than later.
Your store should feel like you, not something you’re settling for. I’m here to keep adjusting until you’re fully confident and excited about it I will make sure we are on the point exactly and Also I am willing to do a google meet just in case if I am unable to understand the vision or due to some confusion

S
Profile Image
Me

Oct 09, 7:13 PM
Replied

Me

Oct 09, 7:11 PM

Thank you And please provide for the last order as well by clicking on this link https://www.fiverr.com/orders/FO821A9BE1982/activities

Can you plz Write review for both orders, Thank you
https://www.fiverr.com/orders/FO821A9BE1982/activities

P
Profile Image
Pete Coulis

Oct 13, 1:16 AM
I need to ask you to make an edit. On the reviews, you didn't import them from Amazon properly. You made a bunch of them 2 and 3 star ratings when they are actually all 5 stars

P
Profile Image
Pete Coulis

Oct 13, 1:16 AM
Why would you do this?

Please delete all the reviews you did  and re-upload them

P
Profile Image
Pete Coulis

Oct 13, 1:16 AM
properly

P
Profile Image
Pete Coulis

Oct 13, 1:18 AM
Nevermind. Please do not do anything. I Will do it Thank you

S
Profile Image
Me

Oct 13, 1:45 AM
Replied

Pete Coulis

Oct 13, 1:16 AM

I need to ask you to make an edit. On the reviews, you didn't import them from Amazon properly. You made a bunch of them 2 and 3 star ratings when they are actually all 5 stars

I am really sorry I Will fix that right away

S
Profile Image
Me

Oct 13, 1:46 AM
Replied

Pete Coulis

Oct 13, 1:18 AM

Nevermind. Please do not do anything. I Will do it Thank you

I will do it no issue.... plz let me correct my mistake..

S
Profile Image
Me

Oct 13, 1:46 AM
I used a Automation software I think it bugged out in exporting reviews ...

S
Profile Image
Me

Oct 13, 1:50 AM
I can see 21 ful star review have you fixed it..?

P
Profile Image
Pete Coulis

Oct 13, 2:02 AM
I am in process of fixing

P
Profile Image
Pete Coulis

Oct 13, 2:02 AM
Thanks

P
Profile Image
Pete Coulis

Oct 13, 2:02 AM
Please don't fix anything

S
Profile Image
Me

Oct 13, 2:08 AM
I have fixed the reviews part

P
Profile Image
Pete Coulis

Oct 13, 2:09 AM
I said to leave it alone

P
Profile Image
Pete Coulis

Oct 13, 2:09 AM
Please stop

S
Profile Image
Me

Oct 13, 2:09 AM
Okay I will leave it

S
Profile Image
Me

Oct 13, 2:09 AM
Let me know if needed any help

P
Profile Image
Pete Coulis

Oct 13, 4:01 AM
Thanks. There is 1 last issue I can't figure out. The add to cart button on the product page has an error and does not work. Could you please take a look at this?


Screenshot 2025-10-12 183058.png

(98.61 kB)

S
Profile Image
Me

Oct 13, 4:02 AM
Replied

Pete Coulis

Oct 13, 4:01 AM

Thanks. There is 1 last issue I can't figure out. The add to cart button on the product page has an error and does not work. Could you please take a look at this?


Ok I will look into it

P
Profile Image
Pete Coulis

Oct 13, 4:03 AM
Thank you

S
Profile Image
Me

Oct 13, 4:08 AM
plz check now

P
Profile Image
Pete Coulis

Oct 13, 4:09 AM
works thanks. What was the issue?

S
Profile Image
Me

Oct 13, 4:26 AM
I have also updated the button to appear more like amazon one


image.png

(26.32 kB)

S
Profile Image
Me

Oct 13, 4:30 AM
I have done the changes now you can refresh and do the changes yourself if you want

S
Profile Image
Me

Oct 13, 4:30 AM
If you want me to improve just message me once

P
Profile Image
Pete Coulis

Oct 13, 4:35 AM
Thanks you. That looks better

S
Profile Image
Me

Oct 13, 4:39 AM
yeah Can you let me know if I could help with making anything else better

S
Profile Image
Me

Nov 10, 5:26 PM
Hey, I hope you’re doing really well! 
I just wanted to take a moment to say a that it was awesome working with you on your project - really appreciate the trust and collaboration. I’m really grateful for the opportunity and for how smooth and collaborative the process was, clients like you make this work so rewarding.

Speaking of which, if you’re happy with how everything turned out, I’d be super thankful if you could take a quick moment to share your experience by leaving a review. Your feedback not only helps me grow but also means a lot personally, it’s always great to know that my work made a positive impact.

Thanks again for your trust and support, and I truly wish your project great success ahead!

S
Profile Image
Me

Nov 10, 5:28 PM
Please disregard the message above since you've already shared your precious review. Thank you so much

P
Profile Image
Pete Coulis

Dec 04, 7:46 PM
Hi there. I have several more Shopify stores for you to build. CAn I get any sort of bulk pricing for repeat biz?

S
Profile Image
Me

Dec 04, 8:01 PM
Can you Tell me how many store you have and what exactly is needed in those stores?

P
Profile Image
Pete Coulis

Dec 04, 8:11 PM
They will all be the same/similar type store that you already built for me

P
Profile Image
Pete Coulis

Dec 04, 8:11 PM
Simple stores with additional link to amazon on the product page

S
Profile Image
Me

Dec 04, 8:12 PM
Replied

Pete Coulis

Dec 04, 8:11 PM

They will all be the same/similar type store that you already built for me

1 product store with Amazon redirection ?

S
Profile Image
Me

Dec 04, 8:12 PM
Replied

Pete Coulis

Dec 04, 8:11 PM

Simple stores with additional link to amazon on the product page

Got it

P
Profile Image
Pete Coulis

Dec 04, 8:12 PM
Yes but also with shopify checkout

P
Profile Image
Pete Coulis

Dec 04, 8:12 PM
Using this as the example template:

https://beeftallowforcooking.com/

S
Profile Image
Me

Dec 04, 8:13 PM
Got it

P
Profile Image
Pete Coulis

Dec 04, 8:14 PM
I have 3 total stores that need building. 2 of those stores with priority to start asap

P
Profile Image
Pete Coulis

Dec 04, 8:14 PM
and more in the future

S
Profile Image
Me

Dec 04, 8:26 PM
Can we have a Quick google meet...?

P
Profile Image
Pete Coulis

Dec 04, 8:40 PM
sure

S
Profile Image
Me

Dec 04, 8:41 PM
Invite - https://meet.google.com/zgg-vdtu-you

S
Profile Image
Me

Dec 04, 8:58 PM
Here's your custom offer

$600
I will be google ads expert for ppc campaigns manager youtube merchant center audit
I’ll set up and manage Google Ads for two of your Shopify stores like (beef tallow style 1-product sites and 1 for company Product showcase store) for $600 total.

What’s included

Account & Tracking Setup
• New Google Ads account or full audit/cleanup of existing one
• Conversion tracking setup (purchases, ATC, key page views) via Shopify + GA4

Campaign Build for BOTH stores
• 2–3 high-intent search campaigns per store with tightly themed ad groups
• In-depth keyword research (branded, non-branded, competitor, long-tail)
• Up to 6 ad copy variants + 6 audience sets to test angles
• 6+ ad extensions (sitelinks, callouts, structured snippets, etc.) to boost CTR

Store Optimization (CRO)
I’ll optimize both stores “our way” — headlines, sections, trust elements, CTA placements, and key content so the landing pages match the ad message, improve Quality Score, and convert better.

Ongoing Management (first month)
• Daily/weekly bid & budget tuning
• Negative keyword pruning
• A/B testing of ads & extensions
• Campaign QA + performance reporting with clear next-step recommendations

This order covers the full setup + first month of optimization for both stores.

Read more
Your offer includes

14 Days Delivery

Account setup

Ad copy suggestions

Audience targeting suggestions

Ad extensions

Campaign QA

Ongoing management

S
Profile Image
Me

Dec 04, 8:59 PM
This is the offer for 2 store Let me know when you want to get started with 3rd store

P
Profile Image
Pete Coulis

Dec 04, 8:59 PM
Thanks but I thought you meant $300 total. $600 is more expensive than our previous projects?

S
Profile Image
Me

Dec 04, 9:00 PM
I think this was a misunderstanding 300$ per store I told you sorry for confusion

P
Profile Image
Pete Coulis

Dec 04, 9:02 PM
These were previous stores.

Download All

Screenshot 2025-12-04 103142.png

(39.09 kB)


Screenshot 2025-12-04 103127.png

(39.09 kB)

S
Profile Image
Me

Dec 04, 9:06 PM
Sorry i misunderstood the last order amount I missed that you had coupon added in your last offer


image.png

(18.13 kB)

S
Profile Image
Me

Dec 04, 9:07 PM
You’re right, these new stores are in the same family as the previous builds. To keep things fair on our side with the time and custom work involved, the best I can do for a bulk rate is $250 per store.

So for the new batch it would be:
Store 1 – $250
Store 2 – $250
Store 3 – $250 (whenever you’re ready to start)

P
Profile Image
Pete Coulis

Dec 04, 9:07 PM
ok. #250 is fair. Thank you

P
Profile Image
Pete Coulis

Dec 04, 9:07 PM
$250

S
Profile Image
Me

Dec 04, 9:08 PM
I will resend the offer now

S
Profile Image
Me

Dec 04, 9:09 PM
Here's your custom offer

$714
I will be google ads expert for ppc campaigns manager youtube merchant center audit
I’ll set up and manage Google Ads for two of your Shopify stores like (beef tallow style 1-product sites and 1 for company Product showcase store) for $600 total.

What’s included

Account & Tracking Setup
• New Google Ads account or full audit/cleanup of existing one
• Conversion tracking setup (purchases, ATC, key page views) via Shopify + GA4

Campaign Build for BOTH stores
• 2–3 high-intent search campaigns per store with tightly themed ad groups
• In-depth keyword research (branded, non-branded, competitor, long-tail)
• Up to 6 ad copy variants + 6 audience sets to test angles
• 6+ ad extensions (sitelinks, callouts, structured snippets, etc.) to boost CTR

Store Optimization (CRO)
I’ll optimize both stores “our way” — headlines, sections, trust elements, CTA placements, and key content so the landing pages match the ad message, improve Quality Score, and convert better.

Ongoing Management (first month)
• Daily/weekly bid & budget tuning
• Negative keyword pruning
• A/B testing of ads & extensions
• Campaign QA + performance reporting with clear next-step recommendations

This order covers the full setup + first month of optimization for both stores.

Read more
Your offer includes

14 Days Delivery

Account setup

Ad copy suggestions

Audience targeting suggestions

Ad extensions

Campaign QA

Ongoing management

View order
P
Profile Image
Pete Coulis

Dec 04, 9:37 PM
All paid. Please ignore my selections on your questions. I was required to fill them out. I will get you the info required to start these stores shortly

S
Profile Image
Me

Dec 04, 9:37 PM
Ok no issues

S
Profile Image
Me

Dec 08, 3:43 PM
Hi, just following up to check if you had a chance to share the details needed to get started. Whenever it’s convenient for you, please let me know.
Thanks!

P
Profile Image
Pete Coulis

Dec 08, 10:44 PM
hi there. Our "Brand Directory" website can get started - https://drive.google.com/drive/folders/19xeazgKItOqrxhrnjV0muYGdigybg3p_?usp=sharing

P
Profile Image
Pete Coulis

Dec 08, 10:45 PM
This will be a simple website that showcases the different product collections we offer. For now you can leave them unlinked.

S
Profile Image
Me

Dec 09, 11:45 AM
Got it, we'll start working on the store...Do you have shopify account for that store?

P
Profile Image
Pete Coulis

Dec 09, 5:41 PM
Just created it. How should I add you as a user?

P
Profile Image
Pete Coulis

Dec 09, 6:28 PM
Shopify changed something with adding users? I don't see where I can add you or send a pin?

P
Profile Image
Pete Coulis

Dec 09, 6:32 PM
Found it. here is PIN code: 9182

S
Profile Image
Me

Dec 09, 9:06 PM
To give me collaborator access to your Shopify store, please follow these steps:

🔐Step-by-step process:
Generate an access code: Go to Settings > Users > Security in your Shopify admin, then copy the 4-digit collaborator access code
Share the code: Provide this 4-digit code to your collaborator (developer, freelancer, or agency)
Collaborator submits request: The collaborator uses this code to submit an access request from their Partner Dashboard
Review and approve: You'll receive an mail notification and can manage the request by going to Settings > Users, filtering by "Requests" status
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

S
Profile Image
Me

Dec 09, 9:07 PM
Please share store url also.

P
Profile Image
Pete Coulis

Dec 09, 10:30 PM
hyvia-health.myshopify.com

P
Profile Image
Pete Coulis

Dec 09, 10:30 PM
code: 9182

S
Profile Image
Me

Dec 09, 11:49 PM
Please approve the request as we send for collaborator access

P
Profile Image
Pete Coulis

Dec 10, 12:37 AM
Granted. Thanks

S
Profile Image
Me

Dec 12, 2:17 PM
I hope you’re doing well! 😊
I’ve completed the main setup and design updates for your store.
You can now preview the store and go through the layout, sections, product pages, and overall flow.

Please review the design and let me know if you’d like any adjustments or additional changes.
Once I receive your feedback, I’ll finalize everything.

Looking forward to your thoughts!

P
Profile Image
Pete Coulis

Dec 12, 5:43 PM
Thanks.

1. Please remove these AI images. Just keep it clean and simple. And use the images I provided
2. We are missing a couple products - Hydroxyapatite Powder and Carpet Freshener Powder. These were provided in the google folder I shared
3. Please get rid of the contact form and just have a support email (info@hyviahealth.com)

Download All

Screenshot 2025-12-12 070947.png

(1.54 MB)


Screenshot 2025-12-12 071005.png

(931.2 kB)

S
Profile Image
Me

Dec 12, 5:52 PM
Thank you for the update I will make the changes

S
Profile Image
Me

Dec 12, 7:16 PM
Please have a look at store once again I have removed the AI images and use the images which you have provided . Also added remaining products . And I have removed the contact form and just added email support.
Please have a look at store and let me know if you want any other changes

P
Profile Image
Pete Coulis

Dec 12, 9:45 PM
thanks. Can we just get rid of the banner image? all together

P
Profile Image
Pete Coulis

Dec 12, 9:46 PM
Also, for the blu fuel website, there is an error: Maybe you ujsed an invalid key?


Screenshot 2025-12-12 111543.png

(31 kB)

P
Profile Image
Pete Coulis

Dec 12, 9:47 PM
https://leucomethyleneblue.com/

P
Profile Image
Pete Coulis

Dec 12, 9:52 PM
For the tagline on the top banner: Thoughtful Products for Better Health

S
Profile Image
Me

Dec 13, 10:51 AM
Replied

Pete Coulis

Dec 12, 9:45 PM

thanks. Can we just get rid of the banner image? all together

Sure , We’ll remove the banner image and keep a clean text-only top section with the tagline ‘Thoughtful Products for Better Health.

S
Profile Image
Me

Dec 13, 2:51 PM
Hi , I want to give you update on your recent change .I’ve removed the banner image and updated the top section to a clean, text-only layout. It now features the tagline ‘Thoughtful Products for Better Health’ . Please let me know if you’d like any adjustments.

S
Profile Image
Me

Dec 13, 10:03 PM
I’ve completed all the requested updates across the store, including the latest design refinements, content updates, and layout adjustments.

Please take some time to review the store in detail—design, content, functionality, and overall flow. Let me know if you’d like any further changes, additional features, app integrations, or functionality enhancements. I’m happy to make any final adjustments needed.

Once you’re satisfied with everything, please confirm so we can proceed with the final delivery of the store.

Looking forward to your feedback.

P
Profile Image
Pete Coulis

Dec 14, 5:48 PM
Replied

Pete Coulis

Dec 12, 9:46 PM

Also, for the blu fuel website, there is an error: Maybe you ujsed an invalid key?


Can you please check on this website? It is no longer valid?

P
Profile Image
Pete Coulis

Dec 14, 6:09 PM
Change to "Our Products & Brands"


Screenshot 2025-12-14 073910.png

(253.32 kB)

P
Profile Image
Pete Coulis

Dec 14, 6:09 PM
disable bundle & save


Screenshot 2025-12-14 073506.png

(17.72 kB)

P
Profile Image
Pete Coulis

Dec 14, 6:10 PM
Get rid of excess bullet points shown here on product pages


Screenshot 2025-12-14 073446.png

(45.75 kB)

S
Profile Image
Me

Dec 15, 10:31 AM
Thank you for the update . I will make these changes and let you know as soon as it is completed

S
Profile Image
Me

Dec 15, 10:32 AM
Replied

Pete Coulis

Dec 14, 5:48 PM

Can you please check on this website? It is no longer valid?

Yes, I will check it and I will let you know what's the issue

S
Profile Image
Me

Dec 15, 12:06 PM
Replied

Pete Coulis

Dec 14, 5:48 PM

Can you please check on this website? It is no longer valid?

Please check this website now it is working

S
Profile Image
Me

Dec 15, 3:55 PM
Hey, I want to give you update on your recent changes
I have change the heading from "Our Collections" to "Our Products & Brands"
I have disabled the bundle & save from the product pages
I have removed the bullet points shown on the product pages .
Please have a look at website and let me know if you want any other changes or any app integration.

P
Profile Image
Pete Coulis

Dec 15, 7:30 PM
looks good. This is acceptable thanks. I will get you info on the smelling salts shortly so you can do that site

S
Profile Image
Me

Dec 15, 7:41 PM
Sure , I will add the smelling salts info as soon as you shared

S
Profile Image
Me

Dec 16, 1:18 PM
Hello,

The store has been completed from our side, and all agreed design, layout, and functionality work has been implemented. I will add smelling salts info as soon as you shared.

We kindly ask you to review the store and let us know if you would like any changes, refinements, or additional app integrations. We’ll be happy to implement them promptly.

As the project timeline has now been reached, we are moving forward with the delivery. Please rest assured that we will continue to provide full support and make any necessary adjustments until everything is fully finalized to your satisfaction.

Thank you, and we look forward to your feedback.` },
  { filename: "Chat_5_Malcolm_J2N.txt", client: "Malcolm Marable (J2N)", niche: "Streetwear / Custom Apparel (Pasadena, CA)", content: `Client Name: -  malcolmmarab699


malcolmmarab699

PROMOTED

Nov 24, 11:17 AM
hello brotha, i had a guy that i was working with to update my website everytime i dropped new clothes. I lost contact with him. I also need to update my shipping, right now it is general $12. I need it to be based on weight and the customers location. can you help with this?

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Nov 24, 11:18 AM
The $600 Mistake That Cost Him $50,000+
.
Last month, a client came to us after spending $50K+ on Facebook ads with barely any sales.
His store? Built for $600 on Fiverr. Looked decent. But...

→ Mobile cart broke at checkout (70% of his traffic was mobile)
→ Page load: 8 seconds (lost 40% of visitors instantly)
→ No proper tracking (couldn't even tell which ads worked)
→ Upsells? Trust badges? Email automation? Nothing.
He burned through his ad budget sending traffic to a broken foundation.

Here's what most people don't understand:

Your Shopify store isn't an expense. It's the foundation of your entire empire.
❌ You're about to spend $10K, $50K, maybe $100K+ on Meta ads, Google ads, TikTok campaigns, influencers...
But if your foundation has cracks? Every dollar you pour in leaks out.
.
✅ REMEMBER : Branding builds trust. Marketing makes you known. 
Without proper branding, your marketing is just noise. You need both.
.
⭐ That's why our Enterprise Package is $1,800.
Not because we're expensive — but because we refuse to build anything that won't support your growth.
→ Premium theme + custom AI visuals for every product
→ Professional branding that builds instant trust
→ 90+ speed scores = fewer abandoned carts
→ Advanced conversion systems that turn clicks into customers
→ Complete tracking so you know EXACTLY what's working
→ 3 months VIP support so you're never stuck during launch
This is a one-time investment in a foundation that everything else builds upon.
After this? Run your organic campaigns. Scale your paid ads. Build your empire.
But you need a store that can handle it.
.
➡️ We only work with founders who see this as an investment in their everlasting brand — not a short-term revenue machine.
People who understand that cutting corners on your foundation means cutting corners on your future.
We are backed by 8+ years and our 2.5 Million+ YouTube community.
👋 If you are Ready to invest in your foundation the right way Please GO Ahead Share me your vision

S
Profile Image
Me

Nov 24, 11:18 AM
Hi how are you?

M
malcolmmarab699

Nov 24, 11:18 AM
I am okay, how are you?

S
Profile Image
Me

Nov 24, 11:19 AM
I am doing Good Thanks for asking

S
Profile Image
Me

Nov 24, 11:19 AM
Replied

malcolmmarab699

Nov 24, 11:17 AM

hello brotha, i had a guy that i was working with to update my website everytime i dropped new clothes. I lost contact with him. I also need to update my shipping, right now it is general $12. I need it to be based on weight and the customers location. can you help with this?

Can you send me your current website link.?

M
malcolmmarab699

Nov 24, 11:20 AM
www.j2nclothing.com

S
Profile Image
Me

Nov 24, 11:21 AM
Replied

malcolmmarab699

Nov 24, 11:20 AM

www.j2nclothing.com

Great website ..

S
Profile Image
Me

Nov 24, 11:22 AM
How many products are you looking to add? and what is the source of information for each product you want to add?

M
malcolmmarab699

Nov 24, 11:24 AM
I can add the products myself. I just need to update the front page oncve I get the new pictures in, i need to change the free shipping total to $85, and I need to fix the general priority shipping, it should ship by weight and location

S
Profile Image
Me

Nov 24, 11:25 AM
Replied

malcolmmarab699

Nov 24, 11:24 AM

I can add the products myself. I just need to update the front page oncve I get the new pictures in, i need to change the free shipping total to $85, and I need to fix the general priority shipping, it should ship by weight and location

Got it Are you looking to Revamp Whole Website Design or Just the home page/Front page?

M
malcolmmarab699

Nov 24, 11:26 AM
Just the front page. but im also open to your suggestions as well

S
Profile Image
Me

Nov 24, 11:31 AM
Here’s what we can handle for you 👇

✅ Website Updates & Design
Front page redesign / seasonal refresh
New collection drops added seamlessly
Banner & hero section updates
Professional product layout & styling
Mobile-first optimization (most clothing buyers shop mobile)
Improved navigation & user experience

✅ Shipping & Checkout Improvements
Weight-based and location-based shipping setup
Free shipping threshold update (e.g., $85)
USPS / UPS / FedEx real-time rates
Local delivery / pickup options
Faster, cleaner checkout experience
Reduced abandoned carts

✅ App Integrations (We can install & configure)
Upsell & cross-sell apps
Size charts
Reviews (Judge.me / Loox / AliReviews)
mail & SMS marketing (Klaviyo / Mailchimp / SMSBump)
Trust badges & checkout security
Currency converter / multi-country support
Wishlist
Order tracking page
Inventory & fulfillment tools

✅ Branding & Visuals
Custom banners for new drops
Product image enhancement & background cleanup
Collection visuals & storytelling sections
Matching brand colors & typography

✅ Speed & Performance
Speed optimization (faster loading = more sales)
Image compression & lazy loading
App cleanup (remove unnecessary apps slowing store)

✅ SEO & Traffic Foundation
So your clothing shows up on Google:
Product SEO (titles, descriptions, tags)
Image alt tags
Meta titles & descriptions
URL structure fixes
Blog setup for organic traffic
Goolge indexing setup

✅ Tracking & Analytics
Facebook Pixel setup
TikTok Pixel
Google Analytics 4
Conversion tracking
Event tracking (add to cart, checkouts, purchases)

Basically, if it’s Shopify and it helps you sell more or run smoother, we’ve got you covered.

M
malcolmmarab699

Nov 24, 11:46 AM
I understand, let me know the price for everything, and let me know the price for only the services that I originally asked for please

S
Profile Image
Me

Nov 24, 11:59 AM
Price for ONLY what you originally asked for

(Front page update + shipping fixes)

→ Front page refresh
→ Update free shipping to $85
→ Fix shipping to weight-based + location-based
→ Clean the design flow of the homepage
→ Update banners/graphics once you share the new pictures

Price: $250 (one-time)
Timeline: 2–3 days

Perfect if you just want the quick fixes and basic updates for now.

M
malcolmmarab699

Nov 24, 12:05 PM
And what is the price for everything else you mentioned?

S
Profile Image
Me

Nov 24, 1:07 PM
You’ve already got the $250 option for just the basics you asked for…
Now for “everything else”, I’d suggest 2 paths depending on how far you want to take the brand right now 👇

✨ $1,200 Growth Setup (for what you need now + smart upgrades)
🧥 Full homepage redesign to match your new clothing drops & brand vibe
📸 Ongoing hero/banner sections setup so every new drop looks premium
🚚 Shipping fixed: weight-based + location-based + free shipping at $85
⚙️ Essential apps tuned for clothing brands (reviews, size guide, upsells, trust)
⚡ Speed + mobile optimization so the site feels smooth on phones
📊 Basic tracking setup so you can see what’s working (GA4 + Meta pixel)
🤝 1 month support for homepage tweaks + new drop updates

🏆 $1,800 Enterprise Build (full system, ready to scale with ads)
🛒 Everything in the $1,200 plan
🎨 Deeper brand-level redesign so J2N looks like a premium streetwear label
📦 Product/collection structure optimized for higher AOV (bundles, upsells, FOMO)
🔎 Full Google ecosystem: GA4, Search Console, Merchant Center setup
📈 Advanced tracking & events (add to cart, checkout steps, purchase)
⚡ Stronger speed optimization and cleanup of anything slowing you down
🧪 Conversion-focused layout sections built to get more people from browse → checkout
🛠️ 3 months priority support so you’re never stuck when you drop new collections

I’ve been doing this for 8+ years and lead a 2.5M+ YouTube ecom community, so the goal here is not just “make it look nice” but actually set you up to scale without losing money on a broken store 💰

Quick question so I can fine-tune this for you:
🧵 How often do you usually drop new collections each month?

👉 Based on your budget and how big you want to go right now, does the $1,200 Growth Setup or the $1,800 Enterprise Build feel like the better fit so I can lock it in and send a custom offer?

M
malcolmmarab699

Nov 25, 4:32 AM
Is $250 the best deal you can offer me for what I need?

M
malcolmmarab699

Nov 25, 6:04 AM
Let me know, I need everything finished by Friday

S
Profile Image
Me

Nov 25, 6:13 AM
Replied

malcolmmarab699

Nov 25, 4:32 AM

Is $250 the best deal you can offer me for what I need?

Yes, We can start right away..

S
Profile Image
Me

Nov 25, 6:13 AM
Replied

malcolmmarab699

Nov 25, 6:04 AM

Let me know, I need everything finished by Friday

Yea we can finish by Black Friday..

S
Profile Image
Me

Nov 25, 6:15 AM
To give me collaborator access to your Shopify store, please follow these steps:

🔐Step-by-step process:
Generate an access code: Go to Settings > Users > Security in your Shopify admin, then copy the 4-digit collaborator access code
Share the code: Provide this 4-digit code to your collaborator (developer, freelancer, or agency)
Collaborator submits request: The collaborator uses this code to submit an access request from their Partner Dashboard
Review and approve: You'll receive an mail notification and can manage the request by going to Settings > Users, filtering by "Requests" status
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

M
malcolmmarab699

Nov 25, 6:30 AM
Okay Im at work right now. I can do this when im home tonight

S
Profile Image
Me

Nov 25, 6:33 AM
Replied

malcolmmarab699

Nov 25, 6:30 AM

Okay Im at work right now. I can do this when im home tonight

We can get start with the work right away since it's close to black Friday 
You Don't need to worry about the paayment

M
malcolmmarab699

Nov 25, 6:34 AM
Okay thank you 🙏🏾

M
malcolmmarab699

Nov 25, 12:26 PM
9419

M
malcolmmarab699

Nov 25, 12:27 PM
https://j2nclothing.com/

M
malcolmmarab699

Nov 25, 12:28 PM
Let me know once you've received it

S
Profile Image
Me

Nov 25, 12:52 PM
Access Requested "Request sent to Just2Nice."


image.png

(3.12 kB)

M
malcolmmarab699

Nov 25, 12:55 PM
Where does the request go?

S
Profile Image
Me

Nov 25, 12:56 PM
Setting > User>

M
malcolmmarab699

Nov 25, 1:00 PM
1 File


FIVERR_20251124_233006_2525792087598325299.jpg

(3.52 MB)

S
Profile Image
Me

Nov 25, 1:01 PM
Yes Digital Marketing Heroes One

M
malcolmmarab699

Nov 25, 1:02 PM
I accepted

M
malcolmmarab699

Nov 25, 1:03 PM
Did it work?

S
Profile Image
Me

Nov 25, 1:15 PM
Yes I will start working on your project

M
malcolmmarab699

Nov 25, 1:17 PM
Okay, and let me know when you need the weight of the items 🙏🏾

S
Profile Image
Me

Nov 25, 1:37 PM
You can send the weight of item right now then please do that

M
malcolmmarab699

Nov 25, 2:52 PM
The hats weight should already be there

S
Profile Image
Me

Nov 25, 2:52 PM
ok

M
malcolmmarab699

Nov 25, 2:53 PM
Here is the weight of all hoodies, jerseys, and tee shirts


1000060931.jpg

(277.2 kB)

S
Profile Image
Me

Nov 25, 2:54 PM
ok I will add this to all the hoodies,jersey and tee

S
Profile Image
Me

Nov 25, 3:28 PM
Can you tell me the price you want for each weight range?

M
malcolmmarab699

Nov 25, 3:31 PM
That's a great question,  im not sure. I assumed the weight and distance would be calculated like at the post office

M
malcolmmarab699

Nov 25, 3:31 PM
Is there general rates I can choose from?

S
Profile Image
Me

Nov 25, 3:35 PM
Right now you have two options, depending on how you want to keep it:
Option 1 — Use USPS/UPS Real-Time Shipping (Automatic)
This means Shopify will calculate the shipping price exactly like the post office, based on:
customer distance
product weight
package size
✔ Shipping prices are generated automatically
✔ No need for you to set manual prices
✔ Accurate and fair for customers
If you want this option, I can set it up for you immediately.
Option 2 — Choose General/Flat Weight-Based Rates (Manual)
If you prefer simple fixed rules, here are standard clothing rates most stores use:
0 – 0.5 lb → $4.95
0.5 – 1 lb → $6.95
1 – 2 lb → $8.95
2 – 3 lb → $12.95
3+ lb → $16.95
✔ Works great for T-shirts, jerseys, hoodies
✔ Easy to manage
✔ Predictable cost for customers
I can apply these for you as well.

M
malcolmmarab699

Nov 25, 3:39 PM
I think the first option is best. But I would like your opinion

S
Profile Image
Me

Nov 25, 3:49 PM
If you are on Basic, you CANNOT add USPS live rates unless you upgrade

M
malcolmmarab699

Nov 25, 3:50 PM
I think im on basic

M
malcolmmarab699

Nov 25, 3:50 PM
Do whatever is best with my current plan please 🙏🏾

S
Profile Image
Me

Nov 25, 3:56 PM
Got it Malcolm if you want to stay on the Basic plan, no problem at all.
Here are the two options you can choose from:
Option A-Add the $20/month shipping feature
Shopify can enable “Third-Party Carrier Calculated Shipping” on your Basic plan for an extra $20/month.
This will allow me to set up automatic USPS/UPS rates that calculate by weight + distance (like the post office).
You can easily request this from Shopify Support, and once they enable it, I’ll set everything up for you.
Option B-We use weight-based shipping with fixed prices
If you don’t want to add the $20 feature, we can still set up manual weight-based rates, like:
0–0.5 lb → $4.95
0.5–1 lb → $6.95
1–2 lb → $8.95
2–3 lb → $12.95
3+ lb → $16.95

M
malcolmmarab699

Nov 25, 3:58 PM
Let's do the 2nd option

S
Profile Image
Me

Nov 25, 4:12 PM
ok then

S
Profile Image
Me

Nov 25, 5:13 PM
Hey Malcolm, before I activate UPS shipping, UPS requires your business address. Can you share:
• Full Name
• Business Address
• City
• State
• ZIP Code
• Phone Number
I just need this once so I can finish your shipping setup.

Download All

image.png

(22.93 kB)


Screenshot 2025-11-25 171106.png

(26.15 kB)

M
malcolmmarab699

Nov 25, 11:40 PM
Full business name or my name?

M
malcolmmarab699

Nov 25, 11:56 PM
Just 2 Nice
445 north Garfield ave #208

M
malcolmmarab699

Nov 25, 11:56 PM
Pasadena California

M
malcolmmarab699

Nov 25, 11:56 PM
91101

M
malcolmmarab699

Nov 25, 11:57 PM
626 200 7445

S
Profile Image
Me

Nov 26, 12:56 AM
ok

S
Profile Image
Me

Nov 26, 10:37 AM
Replied

malcolmmarab699

Nov 25, 11:40 PM

Full business name or my name?

I would need both of them -yout full name and business name

M
malcolmmarab699

Nov 26, 10:51 AM
Malcolm Marable

S
Profile Image
Me

Nov 26, 11:05 AM
When do you think you’ll be able to share the new images for the homepage banner? Once I have those, I can finish the Black Friday section and overall front-page update much more precisely.

M
malcolmmarab699

Nov 26, 11:07 AM
I can share some now

M
malcolmmarab699

Nov 26, 11:11 AM
2 Files

Download All

1000060654.jpg

(1.91 MB)


1000060656.jpg

(2.34 MB)

M
malcolmmarab699

Nov 26, 11:16 AM
5 Files

Download All

1000057631.jpg

(8.08 MB)


1000059366.jpg

(5.63 MB)


1000057722.jpg

(6.73 MB)


1000057632.jpg

(7.77 MB)


1000057724.jpg

(10.59 MB)

M
malcolmmarab699

Nov 26, 11:19 AM
These pictures describe our brand
Luxury Sportswear built on confidence and inspired by street culture

S
Profile Image
Me

Nov 26, 11:42 AM
I’ll make sure the homepage design, banners, fonts and overall layout all reflect that vibe-clean, premium and bold, but still very street-inspired and wearable.

M
malcolmmarab699

Nov 26, 11:43 AM
Perfect,  let me know if you need more pictures

S
Profile Image
Me

Nov 26, 11:46 AM
I will let you know when I need something

S
Profile Image
Me

Nov 27, 1:48 PM
Quick update-I’ve made all the changes in your draft theme:
1.Added correct weights for hoodies, jerseys and t-shirts.
2.Set up weight-based shipping for the U.S. with free shipping on orders $85+.
3.Updated the homepage with the new Black Friday banner and extra sections to highlight products.
Please preview the draft theme on your side and let me know if you’d like any tweaks before we publish it.


image.png

(52.79 kB)

M
malcolmmarab699

Nov 27, 1:52 PM
How can I check it out?

S
Profile Image
Me

Nov 27, 8:12 PM
Go to Online Store → Themes.
Scroll to Theme Library.
Find the theme (e.g., Copy of OPTIMIZED).
Click three dots→ Preview.
The theme opens in a new tab to view.


image.png

(477.12 kB)

M
malcolmmarab699

Nov 28, 4:47 AM
Hey brotha I dont want to do a Black Friday website, because you will have to change it again right after. Let just edit as a regular everyday functioning site 🙏🏾

M
malcolmmarab699

Nov 28, 4:47 AM
What is this part?


FIVERR_20251127_151726_3510245099602057548.jpg

(2.55 MB)

M
malcolmmarab699

Nov 28, 4:49 AM
I like this
Can we have the big letters just say LIVE LIFE CONFIDENT


FIVERR_20251127_151726_3510245099602057548.jpg

(2.5 MB)

M
malcolmmarab699

Nov 28, 4:52 AM
Can we have this say THE MOST CONFIDENT BRAND


FIVERR_20251127_151726_3510245099602057548.jpg

(2.28 MB)

M
malcolmmarab699

Nov 28, 4:54 AM
The main focus is this Sunday. We are having an event on Sunday and I am doing a photoshoot tomorrow. I will have new pictures by tomorrow night to post online as well

M
malcolmmarab699

Nov 28, 4:55 AM
I would like the newer clothes used as the main photo. Also make it easy to find everything

M
malcolmmarab699

Nov 28, 5:40 AM
Also, I appreciate everything you've done so far 🙏🏾

S
Profile Image
Me

Nov 28, 12:48 PM
Replied

malcolmmarab699

Nov 28, 4:52 AM

Can we have this say THE MOST CONFIDENT BRAND


Yes I will change that

S
Profile Image
Me

Nov 28, 12:49 PM
Replied

malcolmmarab699

Nov 28, 4:54 AM

The main focus is this Sunday. We are having an event on Sunday and I am doing a photoshoot tomorrow. I will have new pictures by tomorrow night to post online as well

I will add the images once you sent me

S
Profile Image
Me

Nov 28, 12:49 PM
Replied

malcolmmarab699

Nov 28, 5:40 AM

Also, I appreciate everything you've done so far 🙏🏾

Glad that you liked everything

S
Profile Image
Me

Nov 28, 2:32 PM
Replied

malcolmmarab699

Nov 28, 4:47 AM

What is this part?


In this section you can add the new products that are on sale during black friday

M
malcolmmarab699

Nov 28, 2:33 PM
Okay, lets skip that section. Since we are not doing a Black Friday edit 🙏🏾

S
Profile Image
Me

Nov 28, 2:34 PM
Ok I will remove that do you want tme to include the sunday event in the site

S
Profile Image
Me

Nov 28, 2:38 PM
I have removed the black friday theme sections and changed the texts you asked me

S
Profile Image
Me

Nov 28, 2:39 PM
Once I have the pictures I will add them too.

M
malcolmmarab699

Nov 28, 2:39 PM
The Sunday event will be in person,  so I just need to upload the new clothes and have the new pics ready by then

M
malcolmmarab699

Nov 28, 2:39 PM
Replied

Me

Nov 28, 2:38 PM

I have removed the black friday theme sections and changed the texts you asked me

Perfect 🙏🏾

M
malcolmmarab699

Nov 28, 2:40 PM
Replied

Me

Nov 28, 2:39 PM

Once I have the pictures I will add them too.

I will get them to you tomorrow

S
Profile Image
Me

Nov 28, 2:40 PM
Great

M
malcolmmarab699

Nov 30, 11:27 AM
Speed Racer tee

Download All

DSC07350.JPG

(5.6 MB)


DSC07325.JPG

(9.21 MB)


DSC07327.JPG

(8.57 MB)


DSC07256.JPG

(6.64 MB)


DSC07441.JPG

(7.51 MB)

M
malcolmmarab699

Nov 30, 11:30 AM
City Hall Hoodie (Pasadena Green)

Download All

DSC07469.JPG

(7.66 MB)


DSC07130.jpg

(365.73 kB)


DSC07134.jpg

(484.36 kB)


DSC07144.jpg

(441.22 kB)


DSC07120.JPG

(7.76 MB)

M
malcolmmarab699

Nov 30, 11:36 AM
Peaceful Hoodie (Acid wash Black)

Download All

DSC07468.JPG

(7.57 MB)


DSC07199.JPG

(6.77 MB)


DSC07201.JPG

(7.06 MB)


DSC07229.JPG

(7.16 MB)

M
malcolmmarab699

Nov 30, 11:37 AM
These will be fore the product description. I will give you some for the website

M
malcolmmarab699

Nov 30, 11:42 AM
Website Front page

Download All

DSC07333.jpg

(342.64 kB)


DSC07157.JPG

(6.47 MB)


DSC07396.JPG

(6.16 MB)


DSC07228.JPG

(7.26 MB)


DSC07142.JPG

(7.1 MB)

M
malcolmmarab699

Nov 30, 11:44 AM
I like the picture that you currently have at the top, lets just add these in place of the other photos currently on the front page

M
malcolmmarab699

Nov 30, 12:11 PM
Also these pictures had to be resized in order tom add them, but they are too small. I put them 2000 pix by 2000


Screenshot 2025-11-29 at 10.39.53 PM.png

(358.41 kB)

M
malcolmmarab699

Nov 30, 12:12 PM
I forgot to add this one with the Speed racer tee pictures I sent you first


DSC07326.JPG

(7.07 MB)

S
Profile Image
Me

Nov 30, 12:13 PM
Replied

malcolmmarab699

Nov 30, 11:44 AM

I like the picture that you currently have at the top, lets just add these in place of the other photos currently on the front page

OK I will replace the pictures in the home page with the images you have given

S
Profile Image
Me

Nov 30, 12:13 PM
Replied

malcolmmarab699

Nov 30, 12:12 PM

I forgot to add this one with the Speed racer tee pictures I sent you first


I will add this one also

S
Profile Image
Me

Nov 30, 12:13 PM
Replied

malcolmmarab699

Nov 30, 12:11 PM

Also these pictures had to be resized in order tom add them, but they are too small. I put them 2000 pix by 2000


I will try to resize them and then add to the store

M
malcolmmarab699

Nov 30, 12:14 PM
Replied

Me

Nov 30, 12:13 PM

I will try to resize them and then add to the store

Thank you, if you have trouble let me know 🙏🏾

S
Profile Image
Me

Nov 30, 12:15 PM
As we dont work on Sundays so I will make these changes tommorow and give you an update soon

M
malcolmmarab699

Nov 30, 12:15 PM
I am also adding the 2 hoodies now online. I will keep them as a draft until tomorrow

M
malcolmmarab699

Nov 30, 12:15 PM
Replied

Me

Nov 30, 12:15 PM

As we dont work on Sundays so I will make these changes tommorow and give you an update soon

Okay sounds great 🙏🏾

S
Profile Image
Me

Nov 30, 12:17 PM
Perfect

S
Profile Image
Me

Nov 30, 2:12 PM
Hey Let me know when you are ready to accept the invoice.....

M
malcolmmarab699

Nov 30, 2:41 PM
Im ready

S
Profile Image
Me

Nov 30, 2:46 PM
Here's your custom offer

$250
I will be google ads expert for ppc campaigns manager youtube merchant center audit
(Front page update + shipping fixes)
+ Free Google ads account 
→ Front page refresh
→ Update free shipping to $85
→ Fix shipping to weight-based + location-based
→ Clean the design flow of the homepage
→ Update banners/graphics once you share the new pictures

Price: $250 (one-time)

Read more
Your offer includes

15 Days Delivery

Account setup

Ad copy suggestions

Audience targeting suggestions

Ad extensions

Campaign QA

Ongoing management

View order
S
Profile Image
Me

Nov 30, 2:50 PM
Thanks for the offer we will continue the work ASAP, Have a great rest of your day :)

M
malcolmmarab699

Nov 30, 4:01 PM
Here's the green hoodie


FIVERR_20251130_023034_2093308100321189048.jpg

(2.92 MB)

M
malcolmmarab699

Nov 30, 4:12 PM
Peaceful hoodie


FIVERR_20251130_023034_2093308100321189048.jpg

(3.39 MB)

M
malcolmmarab699

Dec 01, 9:39 AM
Hello brotha

M
malcolmmarab699

Dec 01, 9:39 AM
The event is over. The plan is to be fully updated and go live tomorrow 🙏🏾

M
malcolmmarab699

Dec 01, 1:12 PM
Hello?

S
Profile Image
Me

Dec 01, 1:30 PM
Hi, We've started working on the store.

M
malcolmmarab699

Dec 01, 1:31 PM
Thank you 🙏🏾

S
Profile Image
Me

Dec 01, 3:03 PM
We've updated the images on the store and cropped the product images as well. Could you please take a look of the homepage and confirm if it feels right to you?

M
malcolmmarab699

Dec 01, 9:11 PM
Im trying to take a look, but this is what it says


FIVERR_20251201_074053_8712543243790699611.jpg

(5.17 MB)

S
Profile Image
Me

Dec 01, 9:16 PM
The same is on my side for all the shopify stores. I believe that shopify is down

M
malcolmmarab699

Dec 01, 9:19 PM
I see that you fixed these, this is great. Can we have these at the top when you press "all products" and they also needed to be added to the front page with featured collection

Download All

1000061213.jpg

(622.01 kB)


1000061215.jpg

(568.04 kB)

M
malcolmmarab699

Dec 01, 9:19 PM
Replied

Me

Dec 01, 9:16 PM

The same is on my side for all the shopify stores. I believe that shopify is down

Oh okay

M
malcolmmarab699

Dec 01, 9:22 PM
Also, Im not seeing this shirt right now. This shirt should be at the top as well, and with featured collection (once shopify is working again)


1000061150.jpg

(342.64 kB)

S
Profile Image
Me

Dec 01, 9:23 PM
Got it, I'll add now

S
Profile Image
Me

Dec 01, 9:26 PM
are you checking in this theme? because Ive added them in the homepage


image.png

(73.44 kB)

M
malcolmmarab699

Dec 01, 9:27 PM
No, I was looking at the actual website. My apologies

M
malcolmmarab699

Dec 01, 9:29 PM
It still wint let me in. I think shopify is still down

S
Profile Image
Me

Dec 01, 9:30 PM
No problem, let me know once get in and I'll fix everything accordingly

M
malcolmmarab699

Dec 02, 3:40 AM
Okay brotha everything looks good, can we add all the pictures I sent you from each of the new pieces please


FIVERR_20251201_140937_2212700576353455663.jpg

(1.61 MB)

M
malcolmmarab699

Dec 02, 3:40 AM
Right now it's only 1 picture for each of them

M
malcolmmarab699

Dec 02, 3:41 AM
Replied

malcolmmarab699

Nov 30, 12:11 PM

Also these pictures had to be resized in order tom add them, but they are too small. I put them 2000 pix by 2000


Please use all of these

M
malcolmmarab699

Dec 02, 3:41 AM
Replied

malcolmmarab699

Nov 30, 11:36 AM

Peaceful Hoodie (Acid wash Black)

+4


And these

M
malcolmmarab699

Dec 02, 3:41 AM
Replied

malcolmmarab699

Nov 30, 11:30 AM

City Hall Hoodie (Pasadena Green)

+5


And these

M
malcolmmarab699

Dec 02, 3:43 AM
Also lets change this, this is a jersey picture, lets put a shirt picture here


FIVERR_20251201_140937_2212700576353455663.jpg

(3.33 MB)

M
malcolmmarab699

Dec 02, 3:46 AM
Also I dont like the bkack background, lets keep it consistently a white background please


FIVERR_20251201_140937_2212700576353455663.jpg

(3.07 MB)

M
malcolmmarab699

Dec 02, 1:42 PM
Hello?

S
Profile Image
Me

Dec 02, 2:50 PM
Hi, I'll make the changes right away

S
Profile Image
Me

Dec 02, 5:46 PM
I’ve updated all the products. Please check and tell me if anything else needs to be added or changed.

M
malcolmmarab699

Dec 02, 10:31 PM
Everything looks great. One last thing.
I like what you have at the top row, can we add the hoodies and the new shirt to the second row, just so that all of the new stuff is right at the top when you search all products.


FIVERR_20251202_085931_7101016884621345820.jpg

(2.64 MB)

M
malcolmmarab699

Dec 02, 10:34 PM
The second row should have both hoodies, the new shirt/jersey(speed racer tee) and the (city hall tee)


FIVERR_20251202_085931_7101016884621345820.jpg

(3.36 MB)

S
Profile Image
Me

Dec 02, 10:59 PM
I'll make the changes right away

M
malcolmmarab699

Dec 03, 12:18 PM
Once the changes are made, we can make the new site live ✅️

S
Profile Image
Me

Dec 03, 2:20 PM
I’ve made the changes   please preview.

M
malcolmmarab699

Dec 03, 8:57 PM
Looks great

M
malcolmmarab699

Dec 03, 8:58 PM
Please make it live now

M
malcolmmarab699

Dec 03, 9:02 PM
Or I can do it

S
Profile Image
Me

Dec 03, 9:22 PM
I will do it

S
Profile Image
Me

Dec 03, 9:23 PM
Please check it I have make it live now

M
malcolmmarab699

Dec 04, 12:45 AM
Everything is launched. Thank you for your help brotha

S
Profile Image
Me

Dec 05, 1:25 AM
Great to hear everything has launched smoothly!
I just wanted to follow up and make sure everything is functioning perfectly on your end, across all pages, features, and devices.

If everything looks good to you and the site is now exactly how you want it, we can move forward and officially wrap up the delivery on Fiverr. Completing the delivery helps finalize the project on the platform and also ensures you receive your full post-delivery support from my side.

Of course, if you notice anything that needs a quick adjustment or refinement before we close things out, feel free to let me know, I’m happy to help with any final touches.

Looking forward to your confirmation!

S
Profile Image
Me

Dec 06, 1:16 AM
I’m really glad everything’s looking perfect now!
When you get a moment, could you please leave a quick review for your order? 😊
Click here - 
https://www.fiverr.com/orders/FO62206862404/activities

It helps us a lot on Fiverr and supports our team in continuing to deliver great results for clients like you.

S
Profile Image
Me

Dec 15, 8:39 PM
Hi 😊 just wanted to share this in case it’s helpful.
I’m offering the Google-side setup (Analytics, Search Console, Merchant Center, etc.) at a very low $50 right now mainly because I’m rebuilding traction for this specific service on Fiverr.

It’s the same clean, proper setup I normally do — just priced lower temporarily while I gather more completed orders and feedback. Absolutely no obligation at all, and feel free to ignore this if you’re already set 👍

M
malcolmmarab699

Dec 15, 8:48 PM
Yes brotha im interested

S
Profile Image
Me

Dec 15, 8:49 PM
Sending you offer now, 
Thanks for showing Interest :)

M
malcolmmarab699

Dec 15, 8:50 PM
Can you explain more in depth how this ads value to my brand/ website please

S
Profile Image
Me

Dec 15, 8:52 PM
Here’s the Basic Google Setup package I can do for you 👇

Price: $50 (one-time, discounted just for existing clients)

What I’ll set up for you:

1️⃣ Google Analytics 4 (GA4) – Proper Tracking Setup
Create or clean up your GA4 property
Connect it correctly with your Shopify store
Turn on enhanced e-commerce and make sure key events are tracked, like:
Product view
Add to cart
Begin checkout
Purchase / thank-you page
Make sure data is flowing so you can actually see what’s happening in your store

2️⃣ Google Search Console – So Google Can “See” Your Store
Set up / verify your domain in Search Console
Submit your sitemap so all important pages can be indexed
Basic check for coverage issues (pages not indexed, soft 404s, etc.)
Set preferred domain and basic settings so your site is technically clean in Google’s eyes

3️⃣ Google Merchant Center – Foundation for Shopping Ads (Optional but Included)
If you want to run Shopping Ads later (or just be ready for them), I will:
Create and configure your Google Merchant Center account
Connect it to your Shopify store
Set up the product feed via Shopify / app
Configure basic shipping, returns & business info
Fix simple disapprovals where possible (policy text, missing info, etc.)

4️⃣ Basic Tag / Pixel Hygiene
Make sure GA4 + Merchant Center are linked correctly
Keep the setup lightweight (no messy duplicate tags or double-tracking)

5️⃣ Final Check + Walkthrough
I’ll test the main events (view product, add to cart, checkout, purchase)
Share a short explanation of:
Where to see your data in GA4
How to check Search Console & Merchant Center basics

What I’ll need from you:
A Gmail / Google account to connect everything under your name
Access to your Shopify (which you’ve already given earlier)
Any existing GA / GMC you’ve created before (if you have them), so we don’t duplicate accounts by mistake

S
Profile Image
Me

Dec 15, 8:56 PM
Replied

malcolmmarab699

Dec 15, 8:50 PM

Can you explain more in depth how this ads value to my brand/ website please

Great question bro, let me break it down in simple terms 👇

Right now this $50 Google setup is like wiring the whole house with electricity.
Once it’s done, you can plug in any kind of ads and actually see what’s working and what’s wasting money.

✅ What this setup gives your brand

With GA4 + Search Console + Merchant Center in place, you’ll be able to:

See where your buyers come from
Instagram, TikTok, direct, Google – you’ll see which traffic actually turns into orders.

See which products really make money
Example: maybe hoodies get all the clicks, but tees close more sales – GA4 will show that.

See what people are searching for before they land on J2N
Things like “Pasadena hoodie”, “streetwear clothing”, etc. from Search Console.

Be ready for Shopping Ads
Merchant Center connects your products to Google so your items can show with photo + price right inside Google results.

So instead of “I feel like this is working”, you’ll have real numbers to decide what to push.
🎯 What types of ads you can run with this
Once this foundation is set, you (or I, if you want later) can run:

1️⃣ Google Shopping / Performance Max (for sales)
These are the picture ads you see at the top of Google with:
Product image
Price
Brand / store name
Perfect for:
“Streetwear hoodie”
“Graphic tee”
“Pasadena hoodie”
“Luxury sportswear”
👉 Result: High-intent traffic – people already searching to buy clothes, not just browsing.

2️⃣ Search Ads (text ads on Google)
Text ads that show when people search things like:
“J2N Clothing”
“Just 2 Nice clothing”
“Streetwear brand Pasadena”
👉 Result: You own your brand name on Google and catch people already looking for you or similar brands.

3️⃣ Remarketing / Retargeting Ads
Because GA4 + Merchant Center are connected, you can later run ads to:
People who visited but didn’t buy
People who added to cart but bounced
People who bought once and you want them back for the next drop
👉 Result: Cheaper conversions, because they already know the brand.

4️⃣ YouTube / Discovery Ads (top-of-funnel brand building)
With tracking in place, you can run:
Short video ads showing your fits, event clips, lifestyle shots, etc.
Then see how many people watched → visited site → bought.

👉 Result: Build brand awareness + traffic, and GA4 tells you if YouTube is actually leading to sales or just views.

S
Profile Image
Me

Dec 15, 8:56 PM
🧩 Why we’re doing this now, even before heavy ads
Because once this is set up:
Any money you spend on Google later (Shopping / Search / YouTube) will be trackable.
You’ll know which drops, sizes, colors, locations are most profitable.
You can scale with confidence, not blind.
So this $50 setup is basically your Google foundation:
“Track everything now → make smarter ad decisions later → stop guessing.”

M
malcolmmarab699

Dec 17, 1:46 PM
I like it, lets do it

S
Profile Image
Me

Dec 17, 6:52 PM
Here's your custom offer

$50
I will be google ads expert for ppc campaigns manager youtube merchant center audit
✅ What this setup gives your brand

With GA4 + Search Console + Merchant Center in place, you’ll be able to:

See where your buyers come from
Instagram, TikTok, direct, Google – you’ll see which traffic actually turns into orders.

See which products really make money
Example: maybe hoodies get all the clicks, but tees close more sales – GA4 will show that.

See what people are searching for before they land on J2N
Things like “Pasadena hoodie”, “streetwear clothing”, etc. from Search Console.

Be ready for Shopping Ads
Merchant Center connects your products to Google so your items can show with photo + price right inside Google results.

So instead of “I feel like this is working”, you’ll have real numbers to decide what to push.
🎯 What types of ads you can run with this
Once this foundation is set, you (or I, if you want later) can run:

1️⃣ Google Shopping / Performance Max (for sales)
These are the picture ads you see at the top of Google with:
Product image
Price
Brand / store name
Perfect for:
“Streetwear hoodie”
“Graphic tee”
“Pasadena hoodie”
“Luxury sportswear”
👉 Result: High-intent traffic – people already searching to buy clothes, not just browsing.

2️⃣ Search Ads (text ads on Google)
Text ads that show when people search things like:
“J2N Clothing”
“Just 2 Nice clothing”
“Streetwear brand Pasadena”
👉 Result: You own your brand name on Google and catch people already looking for you or similar brands.

Read more
Your offer includes

10 Days Delivery

Account setup

Ad copy suggestions

Audience targeting suggestions

Ad extensions

Campaign QA

View order
S
Profile Image
Me

Dec 22, 11:47 PM
hi there kindly provide Credential to do SEO and all of you store and also Confirm that is your store name is Still : Just2Nice

S
Profile Image
Me

Dec 23, 12:09 PM
hi there kindly provide Credential to SEO and all of you store and also Confirm that is your store name is Still: Just2Nice

M
malcolmmarab699

Dec 23, 12:42 PM
Yes, how do I do this?

S
Profile Image
Me

Dec 23, 1:10 PM
Thanks For Confirmation, Share your Gmail and Password and We are Doing SEO on your Store.

M
malcolmmarab699

Dec 23, 8:59 PM
Gmail and password to the online website?

S
Profile Image
Me

Dec 23, 10:04 PM
No, The mail and password on which you've created you GMC account

M
malcolmmarab699

Dec 24, 8:24 PM
My Gmail password?

M
malcolmmarab699

Dec 24, 8:24 PM
Partyboy777

S
Profile Image
Me

Dec 24, 9:16 PM
Gmail id and Password.

M
malcolmmarab699

Dec 24, 9:49 PM
Mrjust2nice@gmail.com

S
Profile Image
Me

Dec 24, 10:18 PM
Thank you for the info, I'll try to login shortly and I'll let you know if I need something else. I'll keep you updated on the progress.

S
Profile Image
Me

Dec 24, 10:25 PM
hi there i have tried to login please click on 71 on your device s23+

M
malcolmmarab699

Dec 25, 1:44 AM
Did you get in?

S
Profile Image
Me

Dec 25, 10:38 AM
The session got expired on our end. We’ll send a new access request shortly so we can log in again.

M
malcolmmarab699

Dec 25, 10:46 AM
Okay

S
Profile Image
Me

Dec 25, 1:15 PM
hi there i have tried to login please click on 13 on your device s23+

M
malcolmmarab699

Dec 25, 1:44 PM
Where do I click on 13?

M
malcolmmarab699

Dec 25, 1:47 PM
It just shows this


1000062421.jpg

(272.95 kB)

S
Profile Image
Me

Dec 25, 1:48 PM
Give me a moment I'll try again

S
Profile Image
Me

Dec 25, 1:53 PM
no worries it just a google security to make account stronger, goto in check activity  the click on allow that me option.

M
malcolmmarab699

Dec 25, 1:58 PM
It doesn't allow that. It just shows this and ask if i want to change my password


1000062423.jpg

(309.88 kB)

S
Profile Image
Me

Dec 25, 2:11 PM
no worries click on sus. activity then confirm that was me.

S
Profile Image
Me

Dec 25, 2:35 PM
hi there i have tried to login please click on 67 on your device s23+

M
malcolmmarab699

Dec 26, 12:08 AM
Im just waking up

M
malcolmmarab699

Dec 26, 12:09 AM
Please try again

S
Profile Image
Me

Dec 26, 12:33 AM
hi there i have tried to login please click on 19 on your device s23+

M
malcolmmarab699

Dec 26, 1:29 AM
I keep accepting it too late

M
malcolmmarab699

Dec 26, 1:29 AM
Text me before you try again please

S
Profile Image
Me

Dec 26, 8:46 AM
No worries at all. I’ll text you before trying again next time.

M
malcolmmarab699

Dec 26, 8:54 AM
Okay 🙏🏾

S
Profile Image
Me

Dec 26, 1:44 PM
Hi Malcolm,
Our Fiverr delivery time is running out, and I’ve tried logging in multiple times, but we’re getting stuck at the final verification step each time.
Could you please connect with us or let us know a suitable time so we can complete the verification together and finish the work smoothly? We’re ready to proceed as soon as we’re connected.
Thank you for your cooperation.

M
malcolmmarab699

Dec 26, 1:58 PM
Im ready now

M
malcolmmarab699

Dec 26, 2:01 PM
Its late here. I will go to bed soon. Let me know if you are ready

M
malcolmmarab699

Dec 26, 2:05 PM
Which number?

M
malcolmmarab699

Dec 26, 2:05 PM
23?

M
malcolmmarab699

Dec 26, 2:05 PM
36?

M
malcolmmarab699

Dec 26, 2:05 PM
17?

S
Profile Image
Me

Dec 26, 2:06 PM
i have tried to login please click on 23 on you device s23+

S
Profile Image
Me

Dec 26, 2:06 PM
23

M
malcolmmarab699

Dec 26, 2:06 PM
Done ✅️

S
Profile Image
Me

Dec 26, 2:07 PM
Thank You I Have Logged in successfully.

S
Profile Image
Me

Dec 26, 2:12 PM
while login with shopify it again asked so kindly please verify that sent a notification to your Galaxy S23+. Tap Yes on the Google then tap 58 on your phone to verify it’s you.

S
Profile Image
Me

Dec 26, 2:52 PM
hello, while doing setup it asks again for the verification.

M
malcolmmarab699

Dec 26, 9:36 PM
Hello im just waking up

M
malcolmmarab699

Dec 26, 9:37 PM
Do you still need verification?

S
Profile Image
Me

Dec 26, 9:45 PM
Yes please

M
malcolmmarab699

Dec 26, 10:00 PM
Okay im ready now

S
Profile Image
Me

Dec 26, 10:26 PM
hi there i have tried to login please click on 4 on your device s23+

M
malcolmmarab699

Dec 26, 10:26 PM
Done ✅️

S
Profile Image
Me

Dec 26, 10:27 PM
Thanks

S
Profile Image
Me

Dec 27, 12:23 AM
hi there i think you had secure account whenever i start linking with store it asks for the Verification. can we connect over a meet and do the process so atleast i get signed up with the store.

S
Profile Image
Me

Dec 27, 12:32 AM
I’m currently finalizing the setup. I noticed the Fiverr countdown is running low due to the slight delay we had with the login process earlier.
To keep our project timeline on track within the system, would you be comfortable if I marked the order as 'delivered' now? Please rest assured that my work doesn't stop here. I am fully committed to completing the entire setup and ensuring everything is perfect for your store, even after the order is marked complete. Your satisfaction is my top priority!"

M
malcolmmarab699

Dec 27, 12:33 AM
Yessir

M
malcolmmarab699

Dec 27, 12:33 AM
That's fine

M
malcolmmarab699

Dec 27, 12:33 AM
I will accept

S
Profile Image
Me

Dec 27, 12:34 AM
Thank you so much, please be active about 5 minutes i am just trying to login with store again it will require verification code.

S
Profile Image
Me

Dec 27, 12:36 AM
85
Check your Galaxy S23+

S
Profile Image
Me

Dec 27, 12:37 AM
please tap on 85
Check your Galaxy S23+

M
malcolmmarab699

Dec 27, 12:42 AM
Did it work?

M
malcolmmarab699

Dec 27, 12:43 AM
Which number?

S
Profile Image
Me

Dec 27, 12:43 AM
no that not worked i have re sended - 22

S
Profile Image
Me

Dec 27, 12:45 AM
yes that works this time and thank you so much for your support and feedback

S
Profile Image
Me

Dec 27, 12:54 PM
I wanted to let you know that although we've moved forward with the delivery we'll ensure that everything is working an properly connected. We've also assigned a person to your store and he'll take care of your needs right away. I'll keep you updated on the progress.

Thank you for your understanding and support!

M
malcolmmarab699

Dec 27, 1:06 PM
Thank you 🙏🏾

S
Profile Image
Me

Dec 27, 1:07 PM
Hi,

We’ve now completed the required updates to your Refund & Return Policy and Privacy Policy to ensure they fully align with Google Merchant Center compliance guidelines.

At this stage, everything on the store side is set up correctly and follows Google’s requirements. However, I want to be fully transparent that Google Merchant Center approval is ultimately handled by Google’s internal review system, and no agency or developer can guarantee 100% approval.

What we do guarantee is that your store and product feed are structured correctly, compliant with Google policies, and submitted using best-practice standards to give the highest possible chance of approval.

If Google raises any feedback or additional requirements during review, we will address them promptly and guide you through the next steps.

Please let me know when you’re ready for us to proceed with the next phase of the GMC setup.

Best regards,
Shreyansh

S
Profile Image
Me

Dec 27, 4:01 PM
I have successfully updated the website's policies and footer details to align with your store’s information.

I also noticed that some products include international shipping options, so I will need to add specific policies for those separately.

Important: For the time being, please do not edit the website or add new products. Google is currently in the process of verifying the store. They are extremely strict, and even a minor discrepancy can cause them to flag or reject the account. It is best to keep the site static until the verification is complete` },
];


// ─── CHAT FILES DAY 4 ───────────────────────────────────────────────────────
const CHAT_FILES_DAY4 = [
  { filename: "Chat_6_Tudki.txt", client: "tudki", niche: "Shopify Store Project", content: `Client name: tudki



Me

Oct 07, 11:50 AM
Hello...

S
Profile Image
Me

Oct 07, 11:52 AM
Can you send your reference store ...

S
Profile Image
Me

Oct 07, 11:52 AM
To give me collaborator access to your Shopify store, please follow these steps:

🔐Step-by-step process:
Generate an access code: Go to Settings > Users > Security in your Shopify admin, then copy the 4-digit collaborator access code
Share the code: Provide this 4-digit code to your collaborator (developer, freelancer, or agency)
Collaborator submits request: The collaborator uses this code to submit an access request from their Partner Dashboard
Review and approve: You'll receive an email notification and can manage the request by going to Settings > Users, filtering by "Requests" status
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

T
tudiki

Oct 07, 12:03 PM
Collaborator code 6962

S
Profile Image
Me

Oct 07, 12:04 PM
Can you send the URL of the store

T
tudiki

Oct 07, 12:04 PM
www.tudiki.com

S
Profile Image
Me

Oct 07, 12:06 PM
Okay and what do you require to be changed?

S
Profile Image
Me

Oct 07, 12:06 PM
in your existing store ?

S
Profile Image
Me

Oct 07, 12:06 PM
or a complete redesing?

S
Profile Image
Me

Oct 07, 12:07 PM
access request ..

T
tudiki

Oct 07, 12:07 PM
I need to do a complete redesign and upload new products and change the product mapping

S
Profile Image
Me

Oct 07, 12:08 PM
Okay

S
Profile Image
Me

Oct 07, 12:08 PM
About the product mapping what do you need?\\

S
Profile Image
Me

Oct 07, 12:08 PM
Replied

tudiki

Oct 07, 12:07 PM

I need to do a complete redesign and upload new products and change the product mapping

Do you have the product file or you want use to take it from somewhere?

S
Profile Image
Me

Oct 07, 12:09 PM
Do you have any reference site also that match you vision or you want us to freely design your store...

T
tudiki

Oct 07, 12:09 PM
Not yet for the new products. I will be maintaining my current inventory

T
tudiki

Oct 07, 12:09 PM
Let me share my logo and brand kit

S
Profile Image
Me

Oct 07, 12:10 PM
Replied

tudiki

Oct 07, 12:09 PM

Not yet for the new products. I will be maintaining my current inventory

ok

S
Profile Image
Me

Oct 07, 12:11 PM
Replied

tudiki

Oct 07, 12:09 PM

Let me share my logo and brand kit

You can give a google drive link in which you can update images over time and add new once so you don't have to come to fiverr to send files..

T
tudiki

Oct 07, 12:12 PM
got it. what's your email

S
Profile Image
Me

Oct 07, 12:15 PM
Fiverr Doesn't allow us to share email can you drop your sharable link ..

T
tudiki

Oct 07, 12:15 PM
ok

S
Profile Image
Me

Oct 07, 12:17 PM
mabtang1 at gmail.com

T
tudiki

Oct 07, 12:17 PM
ok. sharing shortly

T
tudiki

Oct 07, 12:19 PM
i want to emphasize that we are keeping inventory. we can remove products with ugly pics from website but keep them in store POS

S
Profile Image
Me

Oct 07, 12:20 PM
Replied

tudiki

Oct 07, 12:19 PM

i want to emphasize that we are keeping inventory. we can remove products with ugly pics from website but keep them in store POS

Noted

T
tudiki

Oct 07, 12:20 PM
Also it's a store in Zimbabwe so let's use black kids and other races too

T
tudiki

Oct 07, 12:21 PM
:)

S
Profile Image
Me

Oct 07, 12:22 PM
Replied

tudiki

Oct 07, 12:20 PM

Also it's a store in Zimbabwe so let's use black kids and other races too

Got it ...

T
tudiki

Oct 07, 12:28 PM
I just shared it

S
Profile Image
Me

Oct 07, 4:19 PM
Can you share any reference site that match your vision??

T
tudiki

Oct 07, 5:01 PM
I wrote everything in the requirements section of the order. The website I like is there.

S
Profile Image
Me

Oct 07, 5:42 PM
No worries i'm on it !

T
tudiki

Oct 07, 5:54 PM
I am also dropping a document in the Google folder with the redesigned site menu.

S
Profile Image
Me

Oct 07, 6:45 PM
ok I will look into it

T
tudiki

Oct 07, 7:04 PM
The document is in there now

S
Profile Image
Me

Oct 07, 8:55 PM
Replied

tudiki

Oct 07, 7:04 PM

The document is in there now

ok

T
tudiki

Oct 07, 10:07 PM
does what i sent in document make sense. I will send the product file later this evening. Please let me know if you have questions

S
Profile Image
Me

Oct 08, 11:54 PM
Yes, I’ve reviewed the document , it makes perfect sense and gives a clear direction for the redesign. Thank you for organizing it so well.
Once you share the product file, I’ll begin aligning the structure and updates accordingly. If I have any questions while working through the details, I’ll reach out right away.

T
tudiki

Oct 09, 8:42 PM
Hi, I updated the document, Please check. thanks

S
Profile Image
Me

Oct 09, 9:50 PM
sure checking

S
Profile Image
Me

Oct 10, 12:03 AM
Here is a quick update:

We’ve redesigned and organized the navigation bar, refined the theme, and set up the “Everyday Essentials” section to match the new layout and visual direction. 

Next, we’ll move on to the full store redesign on the new theme to bring all pages in line with the refreshed style.

T
tudiki

Oct 10, 1:05 AM
I just took a look and the colors are not what I requested. Overall Look & Feel
Clean white or soft beige background for clarity and sophistication. Pops of color from the TUDiki logo palette.

T
tudiki

Oct 10, 1:06 AM
Fonts:
Headings: Poppins / Nunito / Outfit
Body Text: Lato / Open Sans
Accent Font Handwritten playful font for taglines.

T
tudiki

Oct 10, 1:07 AM
Can you also look at the document and see the drop down categories.

T
tudiki

Oct 10, 1:08 AM
🧩 Top Navigation Menu (Desktop)
| Home | Babies (0–24M) | Toddlers (2–5Y) | Kids (5–12Y) | Maternity | Baby Gear | Toys & Education | Party & Celebration | Gift Registry | Brands| Our Story |
                                                                                                                   [Search 🔍] [Account 👤] [Cart 🛒]

T
tudiki

Oct 10, 1:09 AM
Don't worry about the products file for now. Lets perfect the design.

S
Profile Image
Me

Oct 10, 1:13 AM
Replied

tudiki

Oct 10, 1:08 AM

🧩 Top Navigation Menu (Desktop) | Home | Babies (0–24M) | Toddlers (2–5Y) | Kids (5–12Y) | Maternity | Baby Gear | Toys & Education | Party & Celebration | Gift Registry | Brands| Our Story | [Search 🔍] [Account 👤] [Cart 🛒]

Got it I will make it very similar

T
tudiki

Oct 10, 1:17 AM
Here is the page I want my site to look https://jamiekay.com/

T
tudiki

Oct 10, 1:18 AM
I want my page tolook like the Jamie Jay dot come website

T
tudiki

Oct 10, 1:18 AM
Jamie Kay dot com

S
Profile Image
Me

Oct 10, 11:50 AM
Ok we will try our best

S
Profile Image
Me

Oct 10, 10:16 PM
Here is a quick update:

The homepage has been redesigned from scratch using the new warm beige color palette, and the footer has been set up. Next, we’ll be implementing the navigation bar structure.

Please feel free to review the updates and let me know if you’d like to add, remove, or adjust anything - we’ll be more than happy to do so for you.

S
Profile Image
Me

Oct 11, 11:05 PM
Here is a quick update: The homepage and footer have been refined further, and the slider issue has been fixed.

Next, we’ll be resolving the menu (navigation) bug and making updates as per the your feedback.

Please feel free to review the updates so far and let me know if you’d like to add, remove, or adjust anything - we’ll be more than happy to do so for you.

T
tudiki

Oct 14, 7:23 PM
Hi,This is how I have been asking you to do the menu and drop down 🧩 Top Navigation Menu (Desktop)
| Home | Babies (0–24M) | Toddlers (2–5Y) | Kids (5–12Y) | Maternity | Baby Gear | Toys & Education | Party & Celebration | Gift Registry | Brands| Our Story |
                                                                                                                   [Search 🔍] [Account 👤] [Cart 🛒]

Dropdown Categories:
Babies (0–24M)
Clothing


Accessories


Blankets & Swaddles


Gift Sets


Toddlers (2–5Y)
Boys


Girls


Shoes
Accessories


Back to School


Kids (5–12Y)
Boys


Girls


Shoes


Accessories


Back to School


Maternity
Maternity Wear


Nursing Essentials


Self-Care & Accessories


Baby Gear
Diaper Bags


Carriers & Wraps


Feeding


Bath Time


Nursery
Travel


Toys & Education
Montessori & Wooden Toys


STEM Learning


Books


Stationary
Toys


Party & Celebration
Party Accessories (plates, cups, napkins, straws)


Party Décor (banners, garlands, backdrops)


Birthday Shop (balloons, candles, hats)



Baby Shower Essentials (decor, favors, banners)


Gift Wrap & Cards (bags, wrapping paper, tags)


Party Bundles (pre-made sets)


Gift Registry
Create a Registry


Find a Registry


Gift Ideas for Parents


Gift Cards


Our Story
About TUDiki


Our Values & Inspiration


Sustainability & Community


Contact Us

T
tudiki

Oct 14, 7:24 PM
Can you please follow the detailed instructions on the google doc I sent you. https://docs.google.com/document/d/1WfFm1LDAobXj3Af165ai2VUlKWA0zOjN9JN_5PjWRtE/edit?tab=t.0#heading=h.3pumy7iakxc5

T
tudiki

Oct 14, 7:26 PM
I also asked you to use images of black kids because my store is in Zimbabwe. Other races are ok but I dont see that on what you have done..

T
tudiki

Oct 14, 7:28 PM
You just used a template and have not made any updates

S
Profile Image
Me

Oct 15, 11:28 AM
it will be ready by eod

S
Profile Image
Me

Oct 15, 11:28 AM
im wokring on it

S
Profile Image
Me

Oct 18, 5:14 PM
Hi,
The store redesign, colors, featured collections, FAQs, and Gift Registry Page is ready. The navigation menu is also set up, but a few links aren’t connected yet since some collections don’t exist in the store. Kindly review and share your feedback.

S
Profile Image
Me

Oct 19, 11:36 PM
I just wanted to check in. I’m still waiting for your feedback. 💬
Your thoughts mean a lot to me, and I really want to make sure everything feels right and aligned with your vision.

T
tudiki

Oct 20, 7:11 PM
I am reviewing the site now. Thanks

T
tudiki

Oct 20, 10:05 PM
Please take a look at the google document with the revisions. I am currently adding content to the document. I will create the collections that are missing so you can link them. https://docs.google.com/document/d/1WfFm1LDAobXj3Af165ai2VUlKWA0zOjN9JN_5PjWRtE/edit?tab=t.0#heading=h.s9ai5xkgmw3n

S
Profile Image
Me

Oct 20, 10:15 PM
Ok, We will make these changes

T
tudiki

Oct 20, 10:26 PM
The document is a live document so you can see the tect I am sending

T
tudiki

Oct 20, 11:06 PM
What is the best way to send you the links to the menu items

T
tudiki

Oct 20, 11:07 PM
I have some collections set up already. Example Feeding https://admin.shopify.com/store/tudiki/collections/279742120087?link_source=search

T
tudiki

Oct 20, 11:08 PM
Do you want it this way?

S
Profile Image
Me

Oct 21, 11:30 PM
hey

T
tudiki

Oct 21, 11:56 PM
hi

S
Profile Image
Me

Oct 22, 12:15 AM
hi there i made change according to your sheet kindly review , give your valuable feedback

S
Profile Image
Me

Oct 22, 12:18 AM
Here’s an overview of all the updates completed as per your most recent revision sheet ✅
🏠 Homepage Updates
✅ Replaced video banner with a new 4-image slideshow (TUDiki Babies, Toddlers, Kids, and Storefront).
✅ Updated color palette to use soft lilac as accent (per your latest notes).
✅ Removed all ribbons, sale banners, and discount strips.
✅ Replaced hero section baby image (“Where Little Dreams Begin”) with the one you provided.
✅ Updated “Made for Little Adventures” section with your new image and removed the “Growing Little Wonders” section.
✅ Removed the sections: “Shop by Age,” “Shop Our Latest Styles,” and “Growing Little Wonders.”
✅ Created a clean Gift Registry section including:
 • Banner: “Celebrate Every Little Moment — Create Your TUDiki Gift Registry.”
 • Buttons: Create a Registry / Find a Registry / Shop Gift Ideas
 • 3-Step guide: Create → Add → Share
 • Integration ready for Gift Reggie App/ need your permission because its paid i am using gitRegistry application. it integrated
✅ Added a new Gift Cards Section at the bottom (replacing FAQs + family photo) with:
 • Provided Gift Card image
 • Headline: “Give the Gift of Choice”
 • Subtext: “A perfect present for every little milestone.”
 • Button: Shop Gift Cards →
🧭 Navigation & Structure.
✅ Updated headings:
 • Removed age labels (now simply “Babies,” “Toddlers,” “Kids”)
 • Updated dropdowns (e.g. under Babies → Boys, Girls)
✅ Modified Party & Celebration submenu — removed parentheses (kept clean titles).
✅ Updated About section titles:
 • Replaced Our Values & Inspiration → TUDiki Magazine
 • Changed Sustainability & Community → Community

S
Profile Image
Me

Oct 22, 12:22 AM
i still working for navigation bar it little difficult to adjust all menus in single line because its to many options. can we reduce it

T
tudiki

Oct 22, 12:32 AM
Can you move the logo to the far left. Also the slide show pics are too large. Can you resize.

S
Profile Image
Me

Oct 22, 12:39 AM
I NEED 4:3 RATIO IMAGE FOR THIS

S
Profile Image
Me

Oct 22, 12:39 AM
BECAUSE OF STORE IMAGE rest images not adjusting well

S
Profile Image
Me

Oct 22, 12:41 AM
i am sharing screen shot of putting logo on left side top

S
Profile Image
Me

Oct 22, 12:47 AM
kindly do the preview i have changed to logo

S
Profile Image
Me

Oct 22, 12:50 AM
1 File


Screenshot 2025-10-22 004031.png

(51.16 kB)

S
Profile Image
Me

Oct 22, 12:51 AM
i have shared screen shot kindly preview it. waiting for your response

S
Profile Image
Me

Oct 22, 1:30 AM
after publishing the store, the parenthesis text will be removed it was already fixed from backend, waiting for your response.

S
Profile Image
Me

Oct 22, 2:15 AM
i have fixed the banner issue after removed that store front image added logo rest logos only now it looks balanced, share your valuable feedback Thank you

T
tudiki

Oct 22, 6:53 PM
Just waking up. Let me take a look

T
tudiki

Oct 22, 6:56 PM
Looks great. Please remove this section.


image.png

(1.66 MB)

T
tudiki

Oct 22, 6:57 PM
Can we now start linking the website to the correct items.  What do you need from me so I can work on it.

T
tudiki

Oct 22, 7:04 PM
Also remove the bundle and save, buy it now, and delivery timeline.


image.png

(118.92 kB)

T
tudiki

Oct 22, 7:04 PM
and the feedback/reviews section

T
tudiki

Oct 22, 7:23 PM
This part is also missing.                                                                                                                                                                                 Community
From the very beginning, TUDiki has been more than a store — it’s been a community.
 Founded on family values and shared joy, we believe in giving back and creating spaces that bring people together.
Over the years, we’ve hosted events like the TUDiki Shower, a joyful celebration for mothers and little ones that brings families, brands, and communities together to share love, laughter, and inspiration. Beyond our walls, we’ve proudly supported local charities, children’s homes, and community causes, giving a portion of our time and proceeds to uplift those in need.
Every TUDiki initiative — whether it’s a donation drive, a baby shower event, or a school partnership — is rooted in our belief that when we nurture families, we strengthen the whole community.

T
tudiki

Oct 22, 8:18 PM
Link WhatsApp on Social Media +263784714385

T
tudiki

Oct 22, 8:21 PM
we can remove this and just keep the old my registry application that was on the old website.


image.png

(93 kB)

T
tudiki

Oct 22, 8:23 PM
The gift card is a seperate product and the gift registry is an app integration. I see the gift card is directing me to the gift registry

T
tudiki

Oct 22, 8:30 PM
Under baby gear please add a sub menu Health

S
Profile Image
Me

Oct 22, 9:27 PM
Okay, I’ll go ahead and make all the requested changes.

However, I’m a bit unclear on this part:
"The gift card is a separate product and the gift registry is an app integration. I see the gift card is directing me to the gift registry."
Could you please send me a screenshot of what you're seeing, so I can better understand the issue and fix it accurately?

T
tudiki

Oct 22, 10:03 PM
We see the TUDiki Gift Card. https://admin.shopify.com/store/tudiki/products/7841454850199?link_source=search#:~:text=https%3A//tudiki.com%20%E2%80%BA%20products%20%E2%80%BA%20tudiki%2Dgift%2Dcard

T
tudiki

Oct 22, 10:08 PM
The gift registry is for customers to create a registry. I have one set up already. It's supposed to link to this page.


image.png

(235.86 kB)

S
Profile Image
Me

Oct 22, 11:27 PM
I need your help to make collection for the menus option so whenever customer click on the particular option then it should display that product  only not all product .  if you want a demo I can provide a clip how to make collection , so the atleast menus work perfectly , rest I am working on changes and need more acknowledgment on gift registry , kindly give response I am waiting for your response

T
tudiki

Oct 22, 11:47 PM
Please send me a demo on doing the collections.

T
tudiki

Oct 22, 11:49 PM
On the gift registry, i saw shopify has their own app integration called Gift Reggie. Do you want to try that and replace the "My registry"app integration with "Gift Reggie"?

S
Profile Image
Me

Oct 22, 11:54 PM
ok just a mint

S
Profile Image
Me

Oct 22, 11:54 PM
i will share you a video

S
Profile Image
Me

Oct 23, 12:04 AM
video become to large in memory space, so here is briefing how to add collection step  1 click on products then on right side there is option of "Create Collection "


Screenshot 2025-10-23 000120.png

(106.49 kB)

S
Profile Image
Me

Oct 23, 12:07 AM
: add collection >> add title name it should be same or related name with respect to navigation menus 
at the bottom there is  search option for product >> then checked the item you want to display on that particular collection :
:Now click on save hence collection created successfully / that collection i will link

T
tudiki

Oct 23, 12:10 AM
ok i will do this tonight. I am currenlt at work now. thanks

S
Profile Image
Me

Oct 23, 12:19 AM
i have attached the screenshot for better understanding hope it will be helpful ! 
you know your product better what to add / display and what not :
if you had any difficulty or look to many product just add 10-30 item . so after that i can link all collection on menus perfectly in future you want to add more item/product on collection it will display. hope it's helpful 

your change will be in next 2 hours only gift section needs bit more briefing


Screenshot 2025-10-23 000120.png

(106.49 kB)

S
Profile Image
Me

Oct 23, 12:20 AM
thanks for your response here is the step 2 screen shot.


Screenshot 2025-10-23 001115.png

(90.12 kB)

S
Profile Image
Me

Oct 23, 3:50 PM
I’ve did all the requested updates:
✅ Removed the “Bundle & Save,” “Buy Now,” and “Delivery Time” sections.
✅ Fixed the main menu and added the “Health” option under Baby Gear.
✅ Added the new Community page with your provided text.
✅ Fixed the Gift Card, it now correctly redirects to the product page.
✅ Integrated the Gift Registry section (using the free version).
Please note, the Gift Reggie app requires a paid plan once it’s activated, I’ll connect and finalize it right away. but for currently using gift Registry which is previously installed. 
Kindly review the updates and share your feedback. the store is now looking much cleaner ✨

T
tudiki

Oct 24, 9:30 AM
Hello, I have created the collections.

T
tudiki

Oct 24, 10:02 AM
Sorry to make this change again on the menu. I realised it's a bit too much. :) BABIES - Clothing, Accesories, Gift Sets. TODDLERS - Boys, Girls, Shoes. KIDS - Boys, Girls, Shoes, MATERNITY - No Sub menu. TOYS & EDUCATION Add one more called School Gear. PARTY & CELEBRATION - No Sub Menu. GIFT REGISTRY - Remove Gift Ideas for Parents. Thank you. We are almost there.

S
Profile Image
Me

Oct 24, 10:04 AM
no issue is will do the changes

S
Profile Image
Me

Oct 24, 10:07 AM
No issue at all I’ll handle the changes and update you once everything’s done.

T
tudiki

Oct 24, 10:09 AM
Thank you.

S
Profile Image
Me

Oct 24, 10:15 AM
You’re very welcome! I appreciate your clear feedback it really helps keep everything aligned.

T
tudiki

Oct 24, 10:15 AM
Also please remove this from the product section.


image.png

(28.98 kB)

T
tudiki

Oct 24, 10:15 AM
1 File


image.png

(28.98 kB)

T
tudiki

Oct 24, 10:16 AM
Just leave the add to cart.

S
Profile Image
Me

Oct 24, 10:18 AM
Sure, I’ll update those right away.

S
Profile Image
Me

Oct 24, 5:56 PM
store Progress : 
🔗 All collections re-linked everything is now properly connected across the site.
🧸 3 new homepage collections added:
Babies/Toddlers/Kids
📦 70+ items added to each new collection (previously unlinked due to renamed collections — now fixed).
🛒 Product page cleanup: removed the delivery date chart, leaving only the Add to Cart option for a simpler checkout flow.
👀 Please take a quick look at the updates and let me know your thoughts I’ll refine everything based on your feedback.

T
tudiki

Oct 24, 7:42 PM
This looks great. The Babies section should only have BABIES - Clothing, Accesories, Gift Sets. Nothing else no boys and girls. The clothing is no longer seperated by boys and girls on the BABIES section. I noticed when you hover over Accessorries there is another sub menu that shows up. Please remove. When you hover over Gift Sets, there is a submene with unrelated products, please remove. Under TODDLERS. The collections are not mapped correctly. KIDS - Boys Collection not linked. OUR STORY. Order should be About Us, Community, TUDiki Magazine, Contact Us. The Contact Us Should show our social media handles Facebook, Instagram, LinkedIn, TikTok, YouTube, WhatsApp WhatsApp +263784714385. Locations Borrowdale Village Walk and Madokero Mall. The TUDiki Magazine. I had the content from the old website. Do you see the info and magazine pages and links? QUICKLINKS. Replace Outreach with COMMUNITY and link the section. Update the whatapp logo at the footer section and link with out phone number. Also please check the whatsapp link. It's supposed to link to chat and not download section. Can the Logo at the top header be bigger? Thanks again.

T
tudiki

Oct 24, 7:43 PM
typo. Update the whatapp logo at the footer section and link with our phone number.

T
tudiki

Oct 24, 8:06 PM
I fixed the toddler section. It was the collections that had an issue

T
tudiki

Oct 24, 8:07 PM
but remove accessories from toddler

T
tudiki

Oct 24, 8:08 PM
whatapp link is fine.

T
tudiki

Oct 24, 8:10 PM
GIFT REGISTRY. Will you be updating it to the shopify version Gift Reggie

S
Profile Image
Me

Oct 24, 8:27 PM
"I have a few questions regarding the requested changes:

1-Babies Menu: Can I remove the sub-menus for 'Clothing for Girls' and 'Clothing for Boys' under the 'Babies' section? I understand that the clothing is no longer separated by gender and is now the same for all babies.

2-Collections Mapping: I noticed that renaming the collections caused the previous links to break. Therefore, I have manually recreated the collection links for Babies, Toddlers, and Kids.

3-Gift Registry: It appears the Gift Registry feature requires payment to be activated and used. Could you please review this?

4- Kids - Boys Collection: I was unable to find the correct collection link for 'Kids - Boys Collection.' Could you please provide the exact name of that collection so I can link it correctly?

5 - TUDiki Magazine: The link to the blog used for the magazine content appears to be broken, which is why the magazine pages are sometimes not displaying. ("If you want i will make a seprate page where your content will show then we don't need to relay on blog page . if yes then share context ")
I will proceed with the remaining changes immediately. Thank you for your feedback."

T
tudiki

Oct 24, 8:39 PM
1. Yes. 2. Ok Great. 3. Will do. 4. I fixed it. Some collections just beed cleaning up and retagging on end. I am not doing a blog. Its the TUDiki Magazine and I have the old editions in the page fly section of the previous website. You can dispplay them by cover page in order.

T
tudiki

Oct 24, 8:45 PM
I have subscribed to the Gift Reggie. Let's try that and see how it looks

T
tudiki

Oct 24, 8:45 PM
If we use this option I will remove the My registry app that is currently on there

S
Profile Image
Me

Oct 24, 11:20 PM
i am working on it once thinks get completed i will notify you soon and trying to get all changes under 2-3 hours you can preview it and give your feedback

T
tudiki

Oct 24, 11:33 PM
Great. Thanks

T
tudiki

Oct 24, 11:40 PM
When checking out I noticed store pick up is not available when product is not available at that location. i would like a customer to choose their pick up location irregardless of availability at that location. We will be responsible for consolidating the order and taking it to customer's choice of pick up location.


image.png

(10.66 kB)

T
tudiki

Oct 25, 12:01 AM
Where can I edit the brands and logos

T
tudiki

Oct 25, 12:12 AM
and i dont wan't it to display what is left. see note in red


image.png

(25.36 kB)

S
Profile Image
Me

Oct 25, 1:56 AM
for brand logos its downloaded manually by visiting brand website if have any issue with log please provide some information regarding it i will make changes and still if you want to change logo you can click on collection > right side it has search icon > search brand > then click on collection >> after opening collection > right side there is add image option you can replace it . that will display on website .

S
Profile Image
Me

Oct 25, 4:28 PM
here small update regarding the changes :Navigation fixed (Babies, Toddlers, Kids, Maternity, Toys & Education, Gift Registry, Our Story).
Logo size increased.
Footer updated – WhatsApp linked, Outreach → Community, social links + locations added.
Gift Registry section added with Create / Find / Shop buttons.
Gift Card section fixed – now links correctly to product page.
Community page added with full content.
Product page cleaned – removed Bundle & Save, Buy Now, Delivery timeline, Reviews.
Collections re-linked and cleaned (Babies/Toddlers/Kids).

S
Profile Image
Me

Oct 26, 12:45 AM
I have added About us Page also kindly review and give your feedback.

T
tudiki

Oct 26, 8:58 PM
Thanks. Babies>Accesories is not linked. Please remove the submenu under goft sets. Under KIDS> Remove kids accesories. I see the gift registry has not been updated. Please add the gift reggie. I am on the free trial.

S
Profile Image
Me

Oct 27, 9:04 AM
Okay I’m on it

S
Profile Image
Me

Oct 27, 10:20 PM
hi there Updates ,
✅ Added About Us page (new content & layout).
✅ Fixed Gift Registry link and integrated Gift Reggie (free-trial setup).
✅ Removed submenu under Gift Sets.
✅ Removed Kids Accessories from Kids menu.
✅ Linked Babies > Accessories correctly.
✅ Enlarged and repositioned logo for better header balance.
✅ Updated footer – WhatsApp logo , linked to wa.me/263784714385).
✅ Verified all social links and footer layout.
✅ Minor image and ratio adjustments on slideshow (improved desktop fit).
Thank you for your clear feedback and collaboration we’re very close to the perfect final version!
Your guidance has really helped fine-tune the look and functionality of the store.
one again Thanks Alot

S
Profile Image
Me

Oct 28, 3:59 PM
Hi! I haven’t received any response from you yet.
Please get back to me once you’re online so we can continue with the next updates.
Thanks!

T
tudiki

Oct 28, 7:39 PM
the create registry is the new application, but its not synched to the button on the products side. tat is still showing the old application.


image.png

(602.91 kB)

T
tudiki

Oct 28, 7:41 PM
Nothing on Our story is going to the correct section. About Us, Our community, TUDiki Magazine, Contact Us are not going to the right place

T
tudiki

Oct 28, 7:42 PM
The Brands are also not connected to anything.

S
Profile Image
Me

Oct 28, 11:47 PM
i working on it updates will be done in next under 2 hours 
i need more briefing for Brands Option what you want on this

S
Profile Image
Me

Oct 28, 11:49 PM
and Tudiki Magazine is blog and that link isn't working that's why its showing blank page if you want i can put some Text content if you have something kindly provide

S
Profile Image
Me

Oct 29, 1:17 AM
1- old gift registry has been removed and new app integrated successfully on products also 
2 -This is not a menu problem — it’s a page-template / redirect conflict caused by:
PageFly overrides (their custom PageFly URLs replacing Shopify’s native page template).
Or the default page template.

S
Profile Image
Me

Oct 29, 12:59 PM
links are fixed now. 
-About Us
-Our Community
-Tudiki Magazine - you provide blog link not working thats why showing nothing.
-Contact Us
Thank you,

S
Profile Image
Me

Oct 29, 2:32 PM
Hi,

I’m happy to let you know that your TUDiki store redesign is now complete and fully aligned with your creative direction.

Here’s what’s been completed in this final version:

Clean, boutique-style layout inspired by Jamie Kay, following your Google Doc directions.
Pastel color palette derived from your logo for a soft, child-friendly aesthetic.
Navigation menu rebuilt exactly as per your structure.
Homepage and featured sections refined with rounded shapes, playful icons, and balanced white space.
Product images unified for consistent sizing and cohesive presentation.
Interactive elements improved (sliders, collection cards, and mobile layout).

As a gesture of appreciation, I’ve also included 1 month of free after-delivery support covering:
✅ Any small design or layout tweaks
✅ Assistance adding new products or collections
✅ Minor banner or content adjustments

Please review the live store and share your thoughts, I’ll be glad to adjust anything you’d like.
Once you’re satisfied, kindly accept the delivery so Fiverr can close the order officially.

Even after delivery, if you ever want to tweak text, layout, products, or add new features, just message me in the inbox and I’ll take care of it right away.

Thank you so much for your trust and patience your new TUDiki store now perfectly captures that warm, boutique, and playful feel you envisioned.

Warm regards,
Shreyansh Singh
Digital Marketing Heroes


tudikl.png

(538.25 kB)

T
tudiki

Oct 29, 8:16 PM
Thank you, Looks great. Let's make it live and I will provide the TUDiki Magazine information

T
tudiki

Oct 29, 8:17 PM
Can you help me with SEO for my store to pop up first when someone searches for Zimbabwe baby store kids clothing

S
Profile Image
Me

Oct 29, 9:14 PM
I’m so glad you liked it. I’ll make the store live right away.

And absolutely, I can help with SEO to boost your store’s visibility. I’ll start optimizing it so it ranks higher for keywords like “Zimbabwe baby store” and “kids clothing.” Once it’s live, I’ll also suggest a few targeted keywords and content updates to strengthen your ranking even more.

T
tudiki

Oct 29, 9:19 PM
Perfect. Thank you

S
Profile Image
Me

Oct 29, 9:25 PM
No problem don't worry i'll fix everything

S
Profile Image
Me

Oct 31, 4:29 PM
If you're happy with the work, I'd be incredibly grateful if you could leave a review! Here's why it would mean the world to us:

1 - Support a small business grow 💙 - As a small team, every review helps us reach more clients and continue doing what we love. Your kind words directly support our growth and motivate us to keep delivering excellent service.

2 - Unlock a FREE 1-month support bonus 🎁 - As a thank you for taking the time to write a review, we'll add a complimentary month of ongoing support (valued at $200) to your account!

What's included in your FREE month of Ongoing Support:

✅ 20 new products managed monthly 🛍️ → Keep growing your store without manual uploads
✅ Seasonal/holiday graphics 🎉 → Always look fresh for events — no last-minute design stress
✅ Conversion suggestions & reports 📊 → Know what to fix for higher sales without guessing
✅ App & mail troubleshooting 🔧 → Avoid downtime or broken tools disrupting your sales
✅ Priority assistance 🚀 → Immediate help when urgent issues come up, so you never stall

Your feedback truly makes a difference for us, and we want to show our appreciation by making sure your store continues to thrive!

S
Profile Image
Me

Oct 31, 4:29 PM
Here is the link - https://www.fiverr.com/orders/FO72F46ABB147/activities

T
tudiki

Nov 01, 9:42 AM
I left a review yesterday. Can we go live.

T
tudiki

Nov 01, 9:43 AM
do you see it

S
Profile Image
Me

Nov 01, 10:30 AM
Yeah thankyou so much I’m greatful !` },
  { filename: "Chat_7_CharmPopParty.txt", client: "charmpopparty", niche: "Shopify Store Project", content: `Client name:  charmpopparty




charmpopparty

Oct 21, 2:57 AM
Hi! I have a shopify store currently but i feel like it needs some updating .. i used a basic template to make it pretty but i am sure i am missing so much opportunity for my brand. would you be able to help with this?

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Oct 21, 2:57 AM
Hey! I'm Shreyansh from "Digital Marketing Heroes" (2.5M+ YouTube). We teach Shopify Store Design & Brand building.

Portfolio: https://indulgentbutters.com (Pass: ROYAL) • https://americandreamprinting.com • https://shipezusa.com • https://patasymimos.com • https://gooubeauty.com • https://mycommercialkitchen.co • https://maajab.com

Enterprise Package - $1,800 (3 Months VIP Support)

Here is our complete business-ready solution designed :

→ Upto 100 products uploads 
→ Custom AI visuals for EVERY product → without designers
→ Premium theme customization → Unique brand identity
→ Mobile + Speed optimization (90+ score) → 20% fewer abandonments
→ Professional branding → Logo, colors, typography, guidelines

Advanced Conversion & Sales Systems:
→ Multi-tier upsell & cross-sell Setup
→ Trust badges & social proof integration 
→ Typography pairing for brand consistency
→ Automated email sequences (Welcome, Abandoned Cart, Post-Purchase) 
→ A/B testing setup → Continuous improvement framework
→ Complete tracking & SEO (GA4, Meta Pixel, TikTok Pixel)

Enterprise-Only Features:
→ 7 rounds of revisions → Perfect everything
→ Priority support (24-48hr response) for 3 months via Google Meet/Zoom → Never stuck during critical launch phase
→ Custom app recommendations + Seasonal Graphics → For any specific needs
→ On Demand Video walkthrough → Understand all features

🏆 Why Trust Us
✅ 8+ years Shopify/eCom experience (Fiverr Pro verified)
✅ Founder, Digital Marketing Heroes (2.5M+ YouTube subscribers)
✅ Our stores: ~4.2% conversion vs ~1.8% industry average
✅ CRO mindset & quality builds you won't find anywhere else
✅ No outsourcing: Everything done in-house personally


Share your brand vision, preferred style (minimalist/bold/luxury), and any design references you love as this helps me create the perfect look for your store! If you have a lower budget, we can explore lower package options with less features from the Enterprise plan.
Looking forward to Building together!

S
Profile Image
Me

Oct 21, 3:04 AM
hi how are you?

C
charmpopparty

Oct 21, 3:05 AM
Hi! im doing well how are you

S
Profile Image
Me

Oct 21, 3:06 AM
I am also doing great Thanks for asking..

S
Profile Image
Me

Oct 21, 3:06 AM
Can you share you Current store link?

C
charmpopparty

Oct 21, 3:07 AM
for sure!

C
charmpopparty

Oct 21, 3:07 AM
www.charmpopparty.com

S
Profile Image
Me

Oct 21, 3:08 AM
We can definitely improve Your work I want to share some of our recent work with you can you take a look 
Art/Creative store - https://eyeamcreation.com/
1 Product/Dropshipping store - https://www.nutripium.com/
Journals/Creative Store - https://theawwshop.com/
Beauty/Wellness store - https://emani.com/
https://biggamesports.co.uk/
let me know Your thoughts :)

S
Profile Image
Me

Oct 21, 3:09 AM
Do you have a Reference website which matches your vision in terms of style, Design and Functionality..

C
charmpopparty

Oct 21, 3:11 AM
https://www.littlewordsproject.com/

C
charmpopparty

Oct 21, 3:12 AM
our brand is similar to this site .. we both offer unique jewelry .. but we also have the interactive option. like they offer book a bead party, we offer a charm party option. so i want to be able to highlight both effectively. both from a e-commerce standpoint where all my products are like clearly shown but also easilyl identify the process to have a charm party .. ike how there page shows book a bead party and explains the process

C
charmpopparty

Oct 21, 3:13 AM
i love the scroling feature on their home page .. alos the option to see their locations. i will have a second location next month. and also the bead bar option like i said we do charm party

S
Profile Image
Me

Oct 21, 3:17 AM
Can you tell me more about Bead bar Booking how that workes?

S
Profile Image
Me

Oct 21, 3:19 AM
I can definitely see the Booking Appointment system here but i have to understand the service more to get better idea of things and your vision

C
charmpopparty

Oct 21, 3:19 AM
so basically for us you are able to request to book a charm party .. when a customer requests to book with us they select a date and time and pay $150 booking fee, from  that point we usually email them to get any party details etc.

C
charmpopparty

Oct 21, 3:20 AM
i used to use an app with shopify that allowed our customers to book on our site with a scheduling app, i took it down recently when i started to work on cleaning up our site but at this point it is prob best to have a professional lol i do everything on my own currently

S
Profile Image
Me

Oct 21, 3:24 AM
Replied

charmpopparty

Oct 21, 3:20 AM

i used to use an app with shopify that allowed our customers to book on our site with a scheduling app, i took it down recently when i started to work on cleaning up our site but at this point it is prob best to have a professional lol i do everything on my own currently

No worries Yes in app integration and In app design is Hard nut to crack

C
charmpopparty

Oct 21, 3:27 AM
lol yeah exactly

S
Profile Image
Me

Oct 21, 3:28 AM
I’ve reviewed your site (charmpopparty.com) and the reference (littlewordsproject.com) closely, and I can already see the huge potential your brand has 💫

Here’s a complete breakdown of what we can do to take Charm Pop Party to the next level — both visually and functionally 👇

💎 Full Shopify Redesign & Experience Optimization

We’ll refresh your entire site for a clean, modern, and joyful experience that reflects your brand energy — similar to Little Words Project, but unique to you.
✅ Custom homepage layout with:
Scrolling hero banners (with movement + text overlays)
Story-driven sections (“Our Mission”, “What’s a Charm Party?”, “How It Works”)
Dynamic product showcase for your bestsellers & new arrivals
Featured press or community highlights
Location section for both stores (with “Find Us” & Google Maps integration)

✅ Product page optimization
Clear product variants (color, charm type, size)
“Add to Stack” and “Build Your Set” options
Interactive gallery + lifestyle image blocks
Back-in-stock and wishlist buttons
Review & social proof integration

🎉 Charm Party Booking & Experience Integration

Since your charm parties are the heart of your brand, we’ll build a complete booking & experience flow just like “Book a Bead Bar” on Little Words Project.

✅ Dedicated “Book a Charm Party” page with:
Date & time selector (using Shopify scheduling or a custom app)
Booking fee paayment integration ($150 deposit)
Confirmation mails & automated follow-ups
Dynamic calendar view + availability
Optional “Request Info” or “Corporate Event” forms
Integration with Google Calendar or Outlook
✅ Admin dashboard to manage all party bookings easily.
✅ Custom reminder mails for hosts and guests.

🛍 eCommerce Systems & Apps

Your jewelry line should feel as premium as your brand message — we’ll make your online shop effortless to browse and purchase from.

✅ Enhanced navigation: “Shop All”, “Build Your Bracelet”, “Gift Sets”, “Charm Bar”, “Locations”
✅ Product filters (style, color, message, price, new arrivals)
✅ Upsell/Cross-sell logic: “Add matching charms” or “Complete the look”
✅ Abandoned cart recovery + discount popups
✅ Gift card & loyalty program setup
✅ Reviews (Loox/Judge.me)
✅ Social media integration (Instagram feed, TikTok gallery)

S
Profile Image
Me

Oct 21, 3:28 AM
💌 Marketing Automations & Customer Flow

We’ll connect your marketing systems so your brand runs smoothly behind the scenes.

✅ Automated mail flows (welcome, abandoned cart, post-purchase, review request)
✅ Integration with Klaviyo or Shopify mail
✅ Popups for newsletter signup & offers
✅ SMS notifications for confirmations or special events
✅ Post-purchase thank-you page with shareable links

⚙️ Technical Optimization & SEO

✅ Full SEO optimization (meta tags, structured data, product schema)
✅ Speed optimization (90+ on mobile)
✅ Accessibility & mobile-first design
✅ Analytics setup (Google Analytics 4, Meta Pixel, TikTok Pixel)
✅ Search-friendly URLs & keyword structure for “charm party”, “custom jewelry”, etc.

🌈 Brand Identity & Visual System

✅ Refine your colors, typography, and design elements for a cohesive, high-end look.
✅ Consistent brand tone and storytelling across pages.
✅ New imagery layouts for lifestyle and product photography.
✅ Custom icons & badges for charm categories, shipping, and guarantees.

🤝 Post-Launch Support & Growth

✅ Video walkthrough of your full backend setup.
✅ 30 days of direct support after delivery.
✅ Guidance for scaling (ads, SEO, mail marketing, influencer strategy).
✅ App & automation recommendations based on your growth goals.

In short — we’ll make Charm Pop Party not just look as stunning as Little Words Project, but perform even better: faster, clearer, and built to convert browsers into buyers and party bookings 🎊

C
charmpopparty

Oct 21, 3:30 AM
yeah that sounds amazing .. exactly what i would love to see

S
Profile Image
Me

Oct 21, 3:34 AM
That’s awesome — I’m really glad this aligns with your vision 🙌

For everything we discussed — the full redesign, charm party booking flow, app integrations, SEO, automation, and brand-experience setup — the complete build would come under our $1,800 Enterprise Brand Plan 💎

This plan isn’t just about designing your site — it’s a complete business-ready system that makes your brand look amazing, run smoothly, and scale with confidence.

Here’s exactly what’s included 👇

💻 Complete Build + Automation

You’ll get everything we covered:
Custom Shopify redesign with animation and premium UX
Booking system (date/time selection, paayment, confirmation mails)
SEO + speed optimization (90+ mobile score)
App integrations for reviews, loyalty, gift cards, Klaviyo, and social media
Advanced product filtering, upsells, cross-sells, and bundle logic
Abandoned cart + post-purchase automations
Analytics setup (GA4, Meta Pixel, TikTok Pixel)

🤝 3-Month VIP Support

This is what makes the plan truly special — you won’t just get a finished website; you’ll have a partner walking beside you during launch and growth.

✅ Priority support (24–48 hr response) via chat or Google Meet/Zoom — never waiting when something urgent comes up.
✅ Ongoing improvements — we’ll monitor and tweak performance, design, and conversions after launch.
✅ App guidance & updates — new features, seasonal campaigns, or graphics, all implemented during the support period.
✅ Training & walkthroughs — personalized video sessions showing how to manage products, bookings, and marketing tools.
✅ Brand growth check-ins — we’ll review data and suggest next-step improvements for ads, SEO, and automation.

In short — you’ll have a full-service build plus a dedicated partner for the next three months, ensuring Charm Pop Party launches perfectly and keeps improving even after it’s live 🚀

Would you like me to send over the custom $1,800 offer so we can get started on your new store setup this week?

C
charmpopparty

Oct 21, 3:35 AM
yikes haha .. i knew it would be pricey :(

C
charmpopparty

Oct 21, 3:35 AM
it is totally included for the 1800 ? for the whole 3months? and typically how long does it take to have the website like refreshed?

S
Profile Image
Me

Oct 21, 3:39 AM
Yes absolutely — the 3 months of VIP support is fully included in the $1,800 plan 🙌

To clarify — that support is post-delivery support, meaning once your new version of the store is launched, we stay with you for 3 months to ensure a smooth transition into your updated business setup.

During that time, you’ll have:
✅ Live chat support for any questions or tweaks
✅ Guidance over Google Meet whenever you need clarity or walkthroughs
✅ Help with managing apps, updates, seasonal graphics, or performance improvements — all included in your support window

As for the build itself — we can deliver the full project within 25 to 30 days, depending on how quickly we finalize feedback and content approvals.

After that, your 3-month support period begins — so you’ll never feel like you’re on your own once the new site is live 💪

C
charmpopparty

Oct 21, 3:40 AM
okay incredible

C
charmpopparty

Oct 21, 3:40 AM
lets do it

S
Profile Image
Me

Oct 21, 3:41 AM
Thanks great Sending you the offer now..

S
Profile Image
Me

Oct 21, 3:43 AM
Replied

charmpopparty

Oct 21, 3:35 AM

yikes haha .. i knew it would be pricey :(

I will make sure it brings you 100 times more success and value to you than it costs

S
Profile Image
Me

Oct 21, 3:44 AM
Here's your custom offer

$1,800
I will build shopify store, design redesign copy ecommerce website, dropshipping store
Enterprise Brand Plan – $1,800 (3 Months VIP Support Included)
A complete Shopify brand transformation built for Charm Pop Party 💎
We’ll redesign your entire website for a premium, joyful, and high-converting experience — inspired by Little Words Project, but uniquely yours.

✨ What’s Included:

Full Shopify redesign (custom homepage, dynamic banners, mission/story sections)

Product page revamp with “Add to Stack”, “Build Your Set”, and lifestyle imagery

Dedicated “Book a Charm Party” page with date/time selector, $150 booking payment, confirmation emails, and Google Calendar integration

Admin dashboard for managing events + automated reminders

Enhanced navigation (“Shop All”, “Gift Sets”, “Charm Bar”, “Locations”)

Upsell & cross-sell setup, loyalty, reviews, gift cards, discount popups

SEO optimization, GA4, Meta & TikTok Pixel setup

Klaviyo & email automations (welcome, abandoned cart, post-purchase)

90+ mobile speed optimization & mobile-first design

Refined branding — colors, fonts, imagery & icons

Social media & TikTok/Instagram feed integration

🕒 Timeline:
Full delivery in 25–30 days, followed by 3 months of post-delivery VIP support — ensuring a smooth transition into your upgraded store.

🤝 Support Includes:
✅ Live chat + Google Meet guidance
✅ Quick fixes & seasonal updates
✅ App management help
✅ Growth check-ins & walkthrough videos

Launch confidently with a brand-ready Shopify experience built to convert, scale, and shine ✨

Read more
Your offer includes

7 Revisions

30 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Oct 21, 3:52 AM
I'm absolutely thrilled to work on your Shopify project! Your trust means everything to us.

**IMPORTANT NEXT STEP:**
Please fill out the requirement form which Fiverr is sending you with as much detail as possible. The more information you provide about your vision, the closer we can bring your dream store to life! 

Include details like:
- Your exact niche/products
- Design preferences & color schemes  
- Reference websites you love
- Target countries & currency
- Any specific features you want
- Brand materials (logo, images, etc.)

**What happens next:**
✅ You fill the detailed requirement form
✅ We can Schedule a call if you feel the need to discuss your idea
✅ Our team starts building your store
✅ Regular progress updates throughout

The more clarity you give us upfront, the better we can execute your vision without any back-and-forth delays!

Can't wait to create something amazing for you! 🚀

Shreyansh Singh
Digital Marketing Heroes

C
charmpopparty

Oct 21, 4:02 AM
i filled out the form but hnestly the brand i shared is a pretty good example. if you have any questions at all i am happy to respond as quick as possible. everything is already on our website to the best of my ability.

S
Profile Image
Me

Oct 21, 4:06 AM
I just received your form, thank you for sending it through so quickly! And yes, your reference (Little Words Project) is absolutely perfect

S
Profile Image
Me

Oct 21, 4:06 AM
Can you approve the Request sent to Charm Pop Party.
Yes We will be needing Your Guidance alone the way...

C
charmpopparty

Oct 21, 4:14 AM
yes one second!

C
charmpopparty

Oct 21, 4:15 AM
what role do i assign ?

S
Profile Image
Me

Oct 21, 4:17 AM
Replied

charmpopparty

Oct 21, 4:15 AM

what role do i assign ?

It's Collaborator access So just have to accept it..
It will not ask for role 
Staff accounts have that Functionality ..

C
charmpopparty

Oct 21, 4:17 AM
oh okay

C
charmpopparty

Oct 21, 4:18 AM
approved!

S
Profile Image
Me

Oct 21, 1:32 PM
I’ve received access and will start working on your store shortly. I’ll keep you updated as I make progress .

C
charmpopparty

Oct 21, 5:56 PM
Ok thank you

S
Profile Image
Me

Oct 21, 9:47 PM
Just wanted to let you know that I’ve started working on the store. I’ll keep you updated as I make progress.

C
charmpopparty

Oct 21, 10:24 PM
Thank you!

S
Profile Image
Me

Oct 21, 10:26 PM
You're welcome. I'll keep you updated.

S
Profile Image
Me

Oct 25, 8:59 PM
Just wanted to let you know that I’m working on your store. Could you please share the font you mentioned earlier? Also, let me know if there’s anything specific you’d like me to focus on.  I’ll keep you updated as I make progress.

C
charmpopparty

Oct 26, 11:38 PM
Hi I’m sorry I just saw your message. I am traveling for the weeend I will send the font when I get back tomorrow.

S
Profile Image
Me

Oct 27, 9:04 AM
Okay no problem.

S
Profile Image
Me

Oct 27, 12:46 PM
Hey! Hope you had a great weekend and safe travels back!
Whenever you get a chance, please share the font you mentioned earlier. Also, could you let me know all the specific details or sections you’d like me to add or focus on for your store?  I’d love to make sure everything matches your exact vision before I move ahead.

C
charmpopparty

Oct 31, 7:18 PM
Hi there! I apologize for my delay! I’m back online and catching up.

C
charmpopparty

Oct 31, 7:18 PM
I wanted to add another reference for the charm side of things … https://www.fablelaneshop.com

S
Profile Image
Me

Oct 31, 7:22 PM
No worries, Thank you for sharing the reference. I'll go through it and implement on the store

C
charmpopparty

Nov 03, 10:19 PM
Hey!! Thank you for your patience — I finally caught up from traveling 😅

Fonts coming your way in a sec, but I also wanted to share one more inspo that fits the charm/product side really well → https://www.fablelaneshop.com

So tone + direction wise, I’m thinking a mix of:
✨ Kendra Scott professionalism + clean luxury feel
✨ Little Words Project energy + “book a bead bar” (but ours is book a charm party)
✨ Fable Lane’s clear charm categories + builder flow

Basically, playful + feminine + elevated, AND super clear/easy to shop charms + also easy to book our charm party experience.

Main things I want to make sure we have:
-Homepage that shows our charm bar experience + shopping vibeCharm categories laid out clearly (like Fable Lane)

“Book a Charm Party” page (like LWP’s bead bar)

Two locations (Jupiter + “Wellington opening soon”)

About/story

Email/SMS capture & gift cards

I have someone shooting fresh photos weekly too, so we’ll be updating imagery a lot — placeholders for now are totally fine.

Let me know if you need anything else from me right now — super excited to see where you take this!

C
charmpopparty

Nov 03, 10:21 PM
2 Files

Download All
DELIGHTFULMONOLINESANS-REGULAR.OTF

(38.77 kB)

DELIGHTFULMONOLINE-REGULAR.OTF

(47.82 kB)

C
charmpopparty

Nov 03, 10:21 PM
those are the fonts ^

C
charmpopparty

Nov 03, 10:22 PM
weve also revamped our charm party packages to the attached.


NEW.pdf

(80.96 kB)

S
Profile Image
Me

Nov 03, 10:41 PM
Alright, I’ll go through all of these and get back to you once I’m done.

C
charmpopparty

Nov 03, 10:42 PM
thank you so much!

C
charmpopparty

Nov 03, 10:42 PM
we are opening Wellington location this month. November 20th. its under construction right now

S
Profile Image
Me

Nov 03, 10:47 PM
Oh that's great news congrats !

S
Profile Image
Me

Nov 03, 10:47 PM
We're working on your store will keep you updated

C
charmpopparty

Nov 03, 10:47 PM
thank you!

S
Profile Image
Me

Nov 07, 1:23 AM
Hey!  I’m really excited to share that we’ve made great progress on your store, the homepage setup is almost complete, and we’re still refining a few details to make sure everything aligns perfectly with your vision and brand tone.

Since the theme isn’t published yet, a few pages might not be visible from your end, but you can still take a look at the live preview link below to see how things are shaping up so far. Your feedback will be really valuable in helping us fine-tune the design and make sure every detail matches what you have in mind. We’ll continue improving and adjusting based on your inputs until everything feels just right.

Here’s the preview link to check the progress:
Store: https://www.charmpopparty.com/?_ab=0&_fd=0&_sc=1&preview_theme_id=132787109943

S
Profile Image
Me

Nov 08, 9:44 PM
Hi! I just wanted to check in and see if you’ve had a chance to look over your site. 😊
Please let me know if everything feels aligned with your vision, or if there’s anything you’d like us to add, remove, or update, we’ll be more than happy to refine it further for you. We're looking forward to your detailed feedback on the store's progress so far.

Once we receive your detailed feedback, it’ll help us fine-tune the store even more to perfectly match your expectations.
Looking forward to hearing your thoughts, your 100% satisfaction is my top priority, and I’ll make sure everything turns out exactly how you envision it.

S
Profile Image
Me

Nov 10, 9:28 PM
Hi! I just wanted to check in again to see if you’d like us to make any updates or changes to your store.
We’d be more than happy to take care of them right away, whether it’s design tweaks, content adjustments, or new ideas you’d like us to include.

Your detailed feedback really helps us refine everything and make sure the final version reflects your exact vision for Charm Pop Party. 
Please feel free to share your thoughts whenever you can, we’ll handle all refinements promptly to ensure everything feels just right.

C
charmpopparty

Nov 10, 9:30 PM
Hi I am going to go over this today im sorry for the delay

S
Profile Image
Me

Nov 10, 11:06 PM
No problem at all. Take your time and let us know in detail whatever changes you want in the store. We'll be more than happy to do so.

C
charmpopparty

Nov 11, 11:12 PM
Hi there .. so some suggestions and edits we would like to see, 
can we change the format of the pages on the top to be same as how littlewodsproject.com has it, logo in center and page titles on both sides, the left side could be all e-commerce based, the right side is our services and charm party. 
on the home page can we have more banners that share our feartures: build a charm stack, permanent jewelry, book a charm party.. 
I know our signature font is currentlty used for the titles but the all caps doesnt look clean, its hard to read. 
i also need info on our home page and a landing page where it shares our two locations. like how bead bar lets you book in different locations. we have Jupiter and Wellington. 
i also want our website to be less "kid" and more like professional brand, not a fan of the checker background ... our vibes are more like taylor swift - pinks and iridecsent colors, disco ball, sparkles, etc 
also typo on permanent jewelry on the top headers, 
i like on little words project how they have a space for their loyalty program, we also have one set up on shopify.

S
Profile Image
Me

Nov 11, 11:20 PM
Thank you for the feedback. I've gone through it and I'll ensure that everything is implemented on the store with necessary updates. I'll keep you updated on the progress.

S
Profile Image
Me

Nov 13, 11:58 PM
Hi! I wanted to share a quick update with you:

Completed

🟢 The homepage banners have been updated (Build a Charm Stack, Permanent Jewelry, Book a Charm Party).
🟢 The overall branding has been refreshed to match your vibe — softer pinks, iridescent tones, sparkles, and a more professional aesthetic.
🟢 The checker background and “kid-like” elements have been removed.
🟢 Updated the information sections for both locations: Jupiter and Wellington.
🟢 The typo in “Permanent Jewelry” on the top header has been corrected.
🟢 Loyalty program space added similar to Little Words Project.
🟢 Fonts updated for better readability (removed all-caps where needed).

Pending

- Header navigation rebuild — matching the layout of LittleWordsProject.com
* Logo centered
* Left side for e-commerce pages
* Right side for services + charm party
* Ensuring a clean, balanced, professional feel across desktop + mobile

- Finishing touches for mobile adjustments (logo centering + menu alignment).

Next Steps

Once the header structure is finalized, I will proceed with:
* Final spacing + layout refinements
* Hover interactions + soft iridescent touches

Please have a look and let me know if everything aligns with your vision.

C
charmpopparty

Nov 14, 4:51 AM
HI thank you so much for the update.. it is looking good. 
- is it possible to lessen the items on the homepage i feel like you scroll for a while to see everything, could we remove the Whats a Charm Party and just include that on  the Charm Party Page. 
- I'm not crazy about the square photo on the plan you visit, i think we could do without the shape in background and just have the squares with the city names. can you remove the book now buttons and just make each city clickable to the landing page for each separate location. 
- Choose your charm party experience i think should be on the Charm Party landing page 
- Build your own i like the layout but also dont think it belongs on the home page, i think when you click on charm builder you should see  this info first and then be able to open the actual product to build your charm necklace. 
- instead of the about us, i would like to change the banner to Meet the Team and then the landing page for meet the team should have space available to include everyone with a photo (i have 6 of us) i would also still like to feature myself and courtney first at the top and the story of how we started. the current banner when you go to about us page is very off brand. 
- instead of charm party moments maybe just link our instagram feed?

C
charmpopparty

Nov 14, 4:55 AM
also im not sure what happened but my current website that i had in place was updated and i amissing key information on my website for my charm parties and permanent jewelry.

S
Profile Image
Me

Nov 14, 8:03 AM
Thank you for the feedback. I'll make the changes on the store and update you once done.

S
Profile Image
Me

Nov 15, 12:52 AM
Replied

charmpopparty

Nov 14, 4:55 AM

also im not sure what happened but my current website that i had in place was updated and i amissing key information on my website for my charm parties and permanent jewelry.

I checked the store, could you please tell me more about this? were you able to find it again?

S
Profile Image
Me

Nov 15, 12:53 AM
also, we're adding business location on your store, however we'll need full address so that visitors can directly visit your store. For now we've added the city only, it'd be great if you could share the full address for both the locations.

S
Profile Image
Me

Nov 15, 8:51 PM
Hi! I just wanted to share a quick update, we’re currently working through all the changes you requested, and everything is coming along nicely. We’ve also made a few refinements on the homepage to enhance the overall experience.

Whenever convenient, could you please share access to your Klaviyo account so I can configure the mail automations for you? Additionally, I’ll need your store’s address details to add them properly in the map that I've put on the homepage.

Thank you so much, and please feel free to reach out if you need anything!

C
charmpopparty

Nov 17, 6:31 AM
hi so our new location in wellington is 10300 forest hill blvd ste 140 wellington fl 33414 .. i will have a phone number tomorrow for that location. it is also a good reference that is is downstairs next to aeropostale. 

i still am not a fan of the font on the website, i want something more clean not like handwriting. our brand is def pink but i want to lean in to the white and gold also so its less kid and more upscale professional.

C
charmpopparty

Nov 17, 7:00 AM
also not sure if its helpful but we have a google drive with tons of content we can use for the site that is actually our photos https://drive.google.com/drive/folders/1dS2MwpVKyBgU5OpaQDUQVuDL7QC_pjbI?usp=drive_link

S
Profile Image
Me

Nov 17, 10:06 AM
Hi! Thank you so much for the update.

I’ve noted the new Wellington location details and will update the site accordingly. Please feel free to share the phone number whenever it’s ready, and I’ll add that as well. The reference about it being downstairs next to Aeropostale is very helpful too  thank you!

Regarding the font, I completely understand your preference. I’ll explore cleaner, more modern font options that align with a white–gold, upscale, and professional look, while still keeping the hint of pink that represents your brand.

Thank you also for sharing the Google Drive folder with your content. I’ll start reviewing the photos and incorporate them into the site to ensure everything looks consistent and high-quality.

Please let me know if you’d like any specific sections updated first. I’m on it!

S
Profile Image
Me

Nov 17, 8:40 PM
We'd like to give you a quick update, to ensure we meet the Fiverr delivery timeline on our end, we’d like to move ahead with the delivery. However, please rest assured that marking the order as delivered does not stop our work. We will continue making all necessary tweaks, updates, and improvements until you’re fully satisfied with the store. Your comfort and satisfaction remain our priority, and we’re here to support you throughout the entire process.

Also, whenever it’s convenient for you, could you please share the Klaviyo login credentials so I can continue with the setup?
And I’ll need the details for your team members—their photo, name, title/role, and a short introduction (optional)—so I can complete the “Meet the Team” section. These will help me keep refining the store even after delivery.

Even after the delivery we'll keep the refining the store according to your feedback, so feel free to share any more changes or updates that you want on the store. We'd take care of it right away.

S
Profile Image
Me

Nov 17, 10:07 PM
Hi,

I’m happy to share that we’re ready to deliver your CharmPopParty Shopify store!
The site has come a long way and is now fully structured, professionally designed, and aligned with the updated brand direction you shared — more modern, white-gold, pink accents, and a clean upscale aesthetic.

We’re moving forward with the delivery to stay aligned with Fiverr’s timeline, but please know this is not the final version. I will continue refining every detail until the store perfectly reflects your vision.

Here’s what has been completed so far:

✅ Updated homepage with refined banners (Charm Stack, Permanent Jewelry, Charm Party)
✅ Branding refreshed — softer pinks, iridescent touches, white + gold accents
✅ Removed the “kid-like” elements and checker background
✅ Updated both locations (Jupiter + Wellington)
✅ Corrected “Permanent Jewelry” typo
✅ Loyalty program placement added similar to LittleWordsProject
✅ Fonts updated for improved readability
✅ Started integrating your real photos from the Google Drive
✅ Multiple layout improvements across homepage + key pages
✅ Prepared sections for Charm Party, Meet the Team, and Locations

✨ Very important:
Delivering today does not stop the work.
You can continue sharing your feedback, notes, and change requests right here in the chat, and I will update everything for you immediately. Your satisfaction and the final quality of your brand are my top priority.

I’m excited to keep refining the store with your input, feel free to send any more ideas, changes, or photos anytime. I’m here to take care of everything for you.

Warm regards,
Shreyansh Singh
Digital Marketing Heroes

S
Profile Image
Me

Nov 17, 10:08 PM
I just wanted to reassure you that even though the order has been delivered on Fiverr, I will continue working on your store exactly the same way as before. Delivery does not mean the work stops, it simply helps us stay aligned with Fiverr’s timeline.
You can keep sending updates, ideas, and corrections here in the chat, and I’ll continue refining everything until it’s perfect.

What I need from you:

📌 Klaviyo login credentials so I can complete the automation setup
📌 Team member details — photos, names, roles, and a short intro (optional)
📌 Any additional references for fonts or layouts you’d like me to use
📌 Confirmation if you want extra homepage sections removed or rearranged

Please feel free to send these anytime, I’m here and actively working on all the pending parts.
Your store will continue improving step-by-step until it fully matches your vision.

S
Profile Image
Me

Nov 17, 10:39 PM
We’ve also assigned a dedicated team member specifically for your store. He’ll be taking care of all your needs, so feel free to take your time and let us know anything you’d like changed, we’ll handle it right away.

C
charmpopparty

Nov 18, 12:50 AM
Thank you. I will get everything to you today

C
charmpopparty

Nov 18, 6:02 AM
klaviyo is 
stephanie@charmpopparty.com 
LeoFam1705!$

C
charmpopparty

Nov 18, 6:13 AM
i like the new font ... 
do i have access to change out photos? example the photo on the permanent jewelry page like the gallery arent actual permanent jewelry products or images, and the care instructions circular pics either .. 

can we add somewhere on the permanent jewelry page to book an appointment for permanent? 

the store hours for wellington location will mimic the store hours teh mall has. 

on charm parties page can we update the form for requesting charm parties .. ideally i would like the booking system on that page where they could choose based on location and the package and even pay their $150 booking fee. 

i am working on the team member details.i also should have updated photos of both locations end of this week. wellington is almost done. 

on the homepage i think having shop and collections is redundant, can we have shop and then maybe you can click to view collections from the shop page? or shop all items.

S
Profile Image
Me

Nov 18, 1:51 PM
Thanks for the font! Yes, you can change the image too, but please tell us exactly which images you want changed and where they are located with which image justi have that drive link all images. I will update them right away so you can see the changes live.

S
Profile Image
Me

Nov 18, 2:08 PM
I have attempted to set up Klaviyo, but it requires a verification code. Could you please provide this code so I can complete the setup?

C
charmpopparty

Nov 18, 6:09 PM
799626

S
Profile Image
Me

Nov 19, 12:14 AM
the otp session expired whenever you are online just send a response will try to setup klaviyo right Away.

S
Profile Image
Me

Nov 19, 8:38 AM
Hi,
I wanted to check in regarding the appointment booking feature for both Permanent Jewellery and Charm Party services. To set this up correctly, I just need a few details from you so I can complete everything smoothly.

I also need a few clarifications:

Booking fee (if any) for Permanent Jewelery appointments
Time duration you want for each booking slot
The email address where you want to receive appointment notifications

Once I have these details, I’ll move forward with the setup.

Thank you so much! Let me know whenever you’re ready.

C
charmpopparty

Nov 25, 7:34 PM
Hi, I’m really sorry. Haven’t gotten back to you. We’re opening our new location tomorrow so this week has been very hectic. I plan to sit down and address all your questions after we get through this opening. I really appreciate all of your help.

S
Profile Image
Me

Nov 27, 5:36 PM
Hi! No problem at all . I understand how busy things must be with the new location opening. Congratulations! 
Whenever you get a moment, please just share the booking fee, and the email for notifications so I can complete the setup.
Thanks so much!

C
charmpopparty

Dec 04, 8:59 PM
Hi! We finally opened and the store is operating smoothly.... i am going to focus on getting this project wrapped up. 

here are the answers you need: 

Booking fee (if any) for Permanent Jewelery appointments - we can do $25 booking fee which goes towards their total purchase. 
Time duration you want for each booking slot - 30 minutes is fine 
The email address where you want to receive appointment notifications - info@charmpopparty.com

C
charmpopparty

Dec 04, 9:20 PM
can we use this style layout for the party packaging info .. but i dont want the pricing displayed. i want them to contact us for pricing. https://www.getcharmedco.com/charm-bar-parties

S
Profile Image
Me

Dec 04, 9:56 PM
Hi! Thank you so much for the details, this really helps. 
I will update the Permanent Jewelry appointment settings as follows:
$25 booking fee (which will be applied toward their total purchase)
30-minute time slots
Appointment notification email set to info@charmpopparty.com
Regarding the party packaging section, yes, we can definitely use the same layout style from the link you shared. I’ll add the information without showing any pricing, and instead include a clear “Contact us for pricing” call-to-action.
I’ll make all these updates and share the preview with you shortly

C
charmpopparty

Dec 04, 10:52 PM
okay thank you. is it possible to add on the top rather than have our loyalty program as a tab to have our locations as a tab which brings you to a page where it shares about our two locations and what we offer?

S
Profile Image
Me

Dec 06, 9:30 AM
Yes, absolutely, it’s possible, and it’s a great idea.
We can replace the Loyalty Program tab in the top navigation with a Locations tab. This tab will take users to a dedicated page where we can highlight both of your locations along with details like the services offered, hours, contact information, and booking links.
Also, please let me know where you’d like the Loyalty Program page to be placed instead. I can add it to a different section of the menu or move it to the footer whichever you prefer.

S
Profile Image
Me

Dec 06, 9:52 AM
Hi, there is a small issue on Shopify’s end with the section generation tool right now. As soon as it gets resolved, I will update and edit the package section exactly the way you wanted.
Thank you for your patience!

S
Profile Image
Me

Dec 06, 8:15 PM
Hi,
I’ve completed all the changes you requested. Please review them and let me know if you’d like any further adjustments.
Also, could you please confirm where you would like the Loyalty Program page to be placed in the menu? Once I have your preference, I’ll update it accordingly.
Thanks!

C
charmpopparty

Dec 10, 8:44 PM
is it possible to update some of the b anners and images to align with what i currently have on my website? i think some of the images arent really on brand for us and it is throwing me off.

S
Profile Image
Me

Dec 11, 1:09 PM
afcourse, I'll update some images and update you once done

S
Profile Image
Me

Dec 13, 1:14 PM
Hi,
Could you please specify which banners or images you feel are not aligning with your brand? Once you point them out, I’ll update those accordingly for you.

S
Profile Image
Me

Dec 13, 1:27 PM
I just wanted to check if the location page banner looks good to you, or if you would prefer me to replace it with the banner you’ve shared in the file. Please let me know your preference, and I’ll be happy to update it accordingly.

S
Profile Image
Me

Dec 13, 1:32 PM
And also  , I wanted to let you know that I’ve replaced the Charm Party page banner with the one you shared in the file. If you’d like, I can also add the new one as well please feel free to share your thoughts, and I’ll make the changes accordingly.` },
  { filename: "Chat_8_Alpha0999.txt", client: "alpha_099", niche: "Shopify Store Project", content: `Client name: alpha_099



alpha_0999

Oct 06, 7:44 PM
Hi there! I’m looking for someone who can help me create a new Shopify store for my small business. Can you tell me a bit about your process and what you’ll need from me to get started?

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Oct 06, 7:45 PM
Hey! I'm Shreyansh from "Digital Marketing Heroes" (2.5M+ YouTube). We teach Shopify Store Design & Brand building.

Portfolio: https://indulgentbutters.com (Pass: ROYAL) • https://americandreamprinting.com • https://shipezusa.com • https://patasymimos.com • https://gooubeauty.com • https://mycommercialkitchen.co • https://maajab.com

Enterprise Package - $1,800 (3 Months VIP Support)

Here is our complete business-ready solution designed :

→ Upto 100 products uploads 
→ Custom AI visuals for EVERY product → without designers
→ Premium theme customization → Unique brand identity
→ Mobile + Speed optimization (90+ score) → 20% fewer abandonments
→ Professional branding → Logo, colors, typography, guidelines

Advanced Conversion & Sales Systems:
→ Multi-tier upsell & cross-sell Setup
→ Trust badges & social proof integration 
→ Typography pairing for brand consistency
→ Automated email sequences (Welcome, Abandoned Cart, Post-Purchase) 
→ A/B testing setup → Continuous improvement framework
→ Complete tracking & SEO (GA4, Meta Pixel, TikTok Pixel)

Enterprise-Only Features:
→ 7 rounds of revisions → Perfect everything
→ Priority support (24-48hr response) for 3 months via Google Meet/Zoom → Never stuck during critical launch phase
→ Custom app recommendations + Seasonal Graphics → For any specific needs
→ On Demand Video walkthrough → Understand all features

🏆 Why Trust Us
✅ 8+ years Shopify/eCom experience (Fiverr Pro verified)
✅ Founder, Digital Marketing Heroes (2.5M+ YouTube subscribers)
✅ Our stores: ~4.2% conversion vs ~1.8% industry average
✅ CRO mindset & quality builds you won't find anywhere else
✅ No outsourcing: Everything done in-house personally


Share your brand vision, preferred style (minimalist/bold/luxury), and any design references you love as this helps me create the perfect look for your store! If you have a lower budget, we can explore lower package options with less features from the Enterprise plan.
Looking forward to Building together!

S
Profile Image
Me

Oct 06, 7:46 PM
Hi how are you ?

S
Profile Image
Me

Oct 06, 7:46 PM
Hey! Thanks for reaching out  I’d love to help with your Shopify store.
Before I send you a proper quote, could you please share a few details?

What kind of products are you planning to sell (niche)?
Do you already have a Shopify account?

And do you have any specific design preferences or color themes in mind?

A
alpha_0999

Oct 06, 7:48 PM
Sure! I’m starting a store that sells home decor items — things like candles, cushions, and small furniture pieces. I already have a Shopify account, but I haven’t done any setup yet. I want something clean, elegant, and easy to navigate.

S
Profile Image
Me

Oct 06, 7:48 PM
Perfect, that helps a lot!
Would you like me to handle everything from homepage design, product uploads, and essential app setup (like reviews and email popups), or just the design part?

A
alpha_0999

Oct 06, 7:49 PM
I’d prefer a complete setup since I’m new to Shopify. I’ll provide all the product images and descriptions. Also, I’d like you to make it look professional — not too flashy but definitely modern.

S
Profile Image
Me

Oct 06, 7:49 PM
Got it! I’ll build your home decor store using a modern, minimalist layout with soft tones — something that highlights your products beautifully.

I’ll include:
 Full store setup (homepage, collection pages, product pages)
 Up to 10 product uploads
 Basic SEO optimization
 Installation of essential apps (reviews, pop-up, trust badges)
 Mobile-friendly design

For all this, the total price would be $110

A
alpha_0999

Oct 06, 7:50 PM
That actually sounds great! Can you also include a simple announcement bar and footer section with social links?

S
Profile Image
Me

Oct 06, 7:51 PM
Absolutely! I’ll set up the header, announcement bar, and footer with your branding - all included in the same package, no extra cost.

A
alpha_0999

Oct 06, 7:51 PM
Perfect 👍 Let’s go ahead then. I’ll place the order now and share the store access details with you.

S
Profile Image
Me

Oct 06, 7:54 PM
Great then, I am sending the offer

A
alpha_0999

Oct 06, 7:54 PM
Sure

S
Profile Image
Me

Oct 06, 8:01 PM
Here's your custom offer

$110
I will build shopify store, design redesign copy ecommerce website, dropshipping store
I will build a modern and professional Shopify home decor store that’s clean, elegant, and conversion-focused.

Here’s what this offer includes:
✅ Full Shopify store setup (Homepage, Collection pages, Product pages)
✅ Up to 10 product uploads with proper descriptions and images
✅ Mobile-friendly design that looks great on all devices
✅ Basic SEO optimization for better visibility
✅ Installation and setup of essential apps (reviews, pop-ups, trust badges)
✅ Header with announcement bar and footer with social links
✅ Consistent color palette and layout to match your home decor branding
✅ Smooth navigation and layout optimization for user experience

🎯 Goal: A clean, stylish, and easy-to-navigate Shopify store that highlights your products beautifully and feels premium.

Read more
Your offer includes

1 Revision

4 Days Delivery

Functional website

Number of pages

Responsive design

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Oct 09, 11:07 PM
Hi Alpha!

I’m delighted to deliver your HavenHue Home Décor Shopify Store 🎁

Here’s what’s included:

Fully customized Shrine theme setup
Home, Shop, About, and Contact pages
SEO-optimized 15 products with meta descriptions
Clean luxury color palette (white, beige, warm grey)
Newsletter popup, product reviews, and trust badges installed

Your store is live and fully responsive across all devices.
Thank you so much for trusting me with this project — it was an absolute pleasure working with you 🤍

And don't forget, I am always here for you. If you ever need store management, marketing setup, or product upload help, I’d be happy to assist again in the future.

Best regards,
— Shreyansh Singh
Digital Marketing Heroes


image.png

(838.96 kB)` },
  { filename: "Chat_9_Lukeone234.txt", client: "lukeone234", niche: "Shopify Store Project", content: `Client Name:- lukeone234



lukeone234

Sep 30, 10:39 AM
Hey, 
I need branded dropshipping Shopify. 

I do not need products, research etc as i already have this. 

Just need a very nice website.

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Sep 30, 10:39 AM
Hey! I'm Shreyansh from "Digital Marketing Heroes" (2.5M+ YouTube). We teach Shopify Dropshipping & Brand building.
Portfolio: https://indulgentbutters.com (Pass: ROYAL) • https://americandreamprinting.com • https://shipezusa.com • https://patasymimos.com • https://gooubeauty.com • https://mycommercialkitchen.co • https://maajab.com
What sets us apart: Custom AI graphics & conversion builds most freelancers can't deliver.

🌟 Premium - $800 (1 Month)
50 products uploaded → Skip weeks manual work
Custom AI visuals → Professional look without designers
SEO foundation → Show up on Google without ads
Scarcity triggers → Higher conversions automatically
Mobile optimization → Capture 70%+ mobile traffic

🔥 Premium Pro - $1,200 (3 Months)
Everything in Premium PLUS:
75 products → Bigger catalog for more sales
Conversion tracking → Know which products sell best
Email capture → Build customer list from day one
Cart recovery → Recover 15-20% of lost sales

🚀 Enterprise - $1,800 (6 Months VIP)
Everything in Premium Pro PLUS:
150 products → Massive catalog advantage
Google ecosystem (GA4, Console, Merchant) → Full visibility
Meta Pixel → Run ads with accurate data
Speed optimization → 20% fewer cart abandonments
Professional branding → Look premium, charge premium
Email sequences → Sales while you sleep
Upsell funnels → 30-40% higher order value
Product research → Start with proven winners
A/B testing → Continuous improvement
Advanced SEO → Rank for money keywords

🏆 Why Trust Us
✅ 8+ years Shopify/eCom experience (Fiverr Pro verified)
✅ Founder, Digital Marketing Heroes (2.5M+ YouTube subscribers)
✅ Our stores: ~4.2% conversion vs ~1.8% industry average
✅ CRO mindset & quality builds you won't find anywhere else
✅ Real business owners: We run our own 6-figure stores
✅ No outsourcing: Everything done in-house personally


Please take time to write down your specific problems and goals so I can better help you choose the right package. 😊Looking forward to Building together!

L
lukeone234

Sep 30, 10:42 AM
Hi, I’m launching a premium motorcycle streetwear brand called Full Throttle Therapy and I need a Shopify expert to fully build and design my store. Please read carefully — this is exactly what I want:

Requirements:
	•	Use a premium Shopify theme (clean, bold, premium look).
	•	Build the following pages:
	•	Home Page
	•	Product Pages (5 products to start, each with XS–XXL variants, size guide included on product page)
	•	FAQ Page
	•	Damage Guarantee Page
	•	“Share & Win” Page → yearly giveaway:
	•	$500 to the person who tags us with the most likes
	•	$250 to a random person who tags us
	•	Shipping & Delivery Page (clear shipping times + info)
	•	Contact Page / About Page

Store Setup:
	•	Product setup: 5 products, XS–XXL variants.
	•	Upsells & bundles:
	•	“Buy a second and save X”
	•	“Add pants and save X”
	•	Currency setup for AUD + USD.
	•	Dropshipping automation: every order must automatically email my manufacturer with:
	•	Order details
	•	Customer name & shipping address
	•	Discount codes, email capture, automated campaigns (abandoned cart, welcome series, post-purchase).
	•	Integrate Facebook Pixel + Conversion API.
	•	Integrate Google Analytics 4 + Google Tag Manager.
	•	Instagram feed on homepage.
	•	Real customer reviews with photos (Loox or Judge.me).

Apps to Install (or recommend best alternatives):
	•	Klaviyo (email flows & campaigns)
	•	Loox or Judge.me (reviews with photo uploads)
	•	Instafeed (IG feed integration)
	•	ReConvert (post-purchase upsell)
	•	Bundler or Bold Bundles (product bundles / multi-buy discounts)
	•	Sticky Add to Cart / Slide Cart
	•	TinyIMG (speed optimisation)
	•	Lucky Orange / Hotjar (heatmaps & session replays – optional but nice)
	•	Geolocation app (auto-detect US/AU for currency & shipping rules)

What I Will Supply:
	•	Branding (logo, fonts, colours)
	•	Banners / lifestyle images
       •      All text


Timeline:
	•	Must be 100% completed within two weeks.

Extra Notes:
	•	Store must look premium, bold, and professional (not a cheap dropship store).
	•	Recommend any additional apps you believe will improve conversions, analytics, or marketing.
	•	Ensure store is easy for me to edit/add new products later.

Im sending this to 5 developers, i hope you get the job. 

Regards, 
Luke

S
Profile Image
Me

Sep 30, 11:02 AM
Hey Luke — Shreyansh here. Love the “Full Throttle Therapy” concept — premium motorcycle streetwear with a bold, clean aesthetic is right in my wheelhouse. 🏍️💎

🔎 You want a branded dropshipping Shopify store, premium theme, 5 products (XS–XXL) with size guides, AUD+USD, bundles/upsells, auto-email to manufacturer per order, Klaviyo flows, Meta Pixel + CAPI, GA4 + GTM, IG feed, photo reviews — all done in two weeks and easy to manage later. I’ve got you covered.

❓ Do you have 1–2 reference sites (vibe, typography, motion) or a specific premium theme you like (we’re licensed and can recommend the best fit)?
❓ For the auto-email to your manufacturer, do you prefer a Gmail SMTP app workflow or a serverless automation (OrderlyPrint/Mechanic/Zapier) with a branded HTML template?

🎨 Here’s how I’ll deliver a premium, conversion-ready build for a fast launch
✅ Licensed premium theme tailored to streetwear: bold hero, cinematic lifestyle sections, gritty type pairings, dark mode accents
✅ 5 product pages with XS–XXL variants, size-guide modal, trust badges, sticky ATC, back-in-stock
✅ Bundles & upsells: “Buy a second and save X”, “Add pants and save X”, cart drawer cross-sells, post-purchase offers (ReConvert)
✅ Klaviyo foundation: abandoned cart, welcome, post-purchase, review request, plus list growth via high-converting popups
✅ Reviews with UGC photos (Loox or Judge.me) + IG feed (Instafeed)
✅ Currency geolocation for AUD/USD with shipping rules and duties messaging
✅ Speed & UX polish: TinyIMG, lazy-load, clean app footprint, semantic sections, mobile-first animations
✅ Analytics stack done right: GA4 + GTM, Meta Pixel + CAPI, event mapping for view_content/add_to_cart/checkout/purchase
✅ Manufacturer auto-email on each order: templated line-items, customer info, notes — fully tested
✅ Admin-friendly: reusable sections, documentation, Loom videos, and a simple content system so you can edit fast

S
Profile Image
Me

Sep 30, 11:02 AM
🧠 Why choose me over the other 5 developers reaching out to you
✅ Proven conversion track record: ~4.2% avg vs ~1.8% industry — fashion/streetwear is my home turf
✅ Premium design + CRO mindset: I blend brand aesthetics with data-driven layouts for higher AOV and fewer drop-offs
✅ Analytics & pixels set up properly: cleaner data = better ads, better scaling, and smarter decisions
✅ AI-enhanced graphics & micro-animations: premium feel without bloating load times
✅ No outsourcing, in-house execution: faster decisions, tighter QA, consistent quality
✅ Clear handover: Loom training, checklists, rollback points, and post-launch optimization tips

🛡️ Best fit for your strict timeline & scope — Recommended
✅ Premium Build + Long-Term Support — $1,800 (6 Months VIP)
→ Everything you’ve requested, built to a premium standard within two weeks
→ 6 months VIP support: CRO suggestions, monthly improvements, urgent assistance, troubleshooting apps/integrations
→ Speed optimization, advanced SEO groundwork, A/B test ideas, and growth-ready analytics

(If you want alternatives, I also offer the other tiers below — but for your brief and deadline, VIP is the safest, highest-impact choice.)
✅ Premium Build — $625 (7 Days Support)
✅ Premium Build + Extended Support — $800 (1 Month)

🤝 We have your back — and for your safety, we’ll keep all communication and payments within Fiverr. I’ll provide a clear project plan, milestones, and daily progress updates inside the order chat. 🚀

Ready for me to lock in the $1,800 VIP plan and start today?

L
lukeone234

Sep 30, 11:06 AM
I do want to start today

L
lukeone234

Sep 30, 11:07 AM
Let me review your plans. 
The $1800 has 150 products, and ive only got 2 ready to go so this seems like overkill

L
lukeone234

Sep 30, 11:10 AM
The premium store setup for $625 sounds more like what a need

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Sep 30, 11:20 AM
Totally hear you: with only 2 products ready, the 150-product capacity in the $1,800 VIP can feel like overkill. Here’s a sharper fit that still gives you the premium build and full growth stack. 🏍️💎

✅ Custom Premium Build — $1,500 (3 Months Support)
✅ Premium streetwear theme setup and brand styling (cinematic hero, gritty typography, dark mode accents)
✅ 2 product pages fully optimized (XS–XXL variants, size-guide modal, trust badges, sticky ATC, back-in-stock)
✅ Upsells & bundles: “Buy a second & save X”, “Add pants & save X”, cart-drawer cross-sells, post-purchase offers
✅ Analytics done right: GA4 + GTM, Meta Pixel + CAPI with clean events (view_content → purchase)
✅ Email engine: Klaviyo welcome, abandoned cart, post-purchase, review request, list-grow popup
✅ Reviews with photos (Loox/Judge.me) + IG feed (Instafeed)
✅ Currency & shipping logic for AUD/USD with geolocation
✅ Speed/SEO polish: image optimization, lazy-load, lightweight app footprint
✅ Manufacturer auto-email per order (templated with line items & shipping info)
✅ Admin-friendly build: reusable sections, documentation, Loom videos
✅ Timeline: 2 weeks from kickoff
✅ Support: 3 months of priority tweaks, troubleshooting, and CRO suggestions

🧠 Why this beats the $625 option for your launch
✅ The $625 covers a beautiful core build, but skips the deeper tracking, Klaviyo flows, post-purchase funnels, and speed/SEO hygiene that lower CAC and lift AOV from day one
✅ With your two-week deadline and premium positioning, this $1,500 package ensures the site both looks premium and performs like a brand

🛡️ We have your back — for safety, all payments and comms stay within Fiverr. I’ll share a clear roadmap, milestones, and a staging link inside the order chat. 🚀

L
lukeone234

Sep 30, 11:27 AM
If you can do it for 1300usd we have a deal

L
lukeone234

Sep 30, 11:27 AM
That is 2000 aud

L
lukeone234

Sep 30, 11:28 AM
Ill send you my competition websites

L
lukeone234

Sep 30, 11:32 AM
https://www.officialsinner.com

https://avilelife.com

https://twowheelappeal.com

https://www.hooligoon.shop/

S
Profile Image
Me

Sep 30, 11:37 AM
Sure

S
Profile Image
Me

Sep 30, 11:37 AM
Do you have your own products?

S
Profile Image
Me

Sep 30, 11:37 AM
And do you have existing website already?

L
lukeone234

Sep 30, 11:38 AM
No website. This is new start up

S
Profile Image
Me

Sep 30, 11:38 AM
okay

S
Profile Image
Me

Sep 30, 11:38 AM
Then we will create on our end with 3 months trial link

L
lukeone234

Sep 30, 11:39 AM
Own design products. Paid and made in advance at the Pakistan factory, shipped to the customer from the factory

S
Profile Image
Me

Sep 30, 11:39 AM
Here's your custom offer

$1,625
I will build shopify store, design redesign copy ecommerce website, dropshipping store
✅ Custom Premium Build — $1,500 (3 Months Support)
✅ Premium streetwear theme setup and brand styling (cinematic hero, gritty typography, dark mode accents)
✅ 2 product pages fully optimized (XS–XXL variants, size-guide modal, trust badges, sticky ATC, back-in-stock)
✅ Upsells & bundles: “Buy a second & save X”, “Add pants & save X”, cart-drawer cross-sells, post-purchase offers
✅ Analytics done right: GA4 + GTM, Meta Pixel + CAPI with clean events (view_content → purchase)
✅ Email engine: Klaviyo welcome, abandoned cart, post-purchase, review request, list-grow popup
✅ Reviews with photos (Loox/Judge.me) + IG feed (Instafeed)
✅ Currency & shipping logic for AUD/USD with geolocation
✅ Speed/SEO polish: image optimization, lazy-load, lightweight app footprint
✅ Manufacturer auto-email per order (templated with line items & shipping info)
✅ Admin-friendly build: reusable sections, documentation, Loom videos
✅ Timeline: 2 weeks from kickoff
✅ Support: 3 months of priority tweaks, troubleshooting, and CRO suggestions

Read more
Your offer includes

7 Revisions

20 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Sep 30, 11:40 AM
I’ve sent you a custom offer within your budget — I was able to make this possible by applying a special discount while still including all the Enterprise Build package features.

Please note, Fiverr does not allow me to extend or recreate the same discount once the offer expires. If it’s not accepted within the given timeframe, the system will automatically remove it and I won’t be able to provide the same rate again.

Looking forward to collaborating with you and creating a premium Shopify store for your brands

S
Profile Image
Me

Sep 30, 11:42 AM
🔥 Order confirmed! 🎉 THANK YOU lukeone234 for your order! 

I'm absolutely thrilled to work on your Shopify project! Your trust means everything to us.

**IMPORTANT NEXT STEP:**
Please fill out the requirement form which Fiverr is sending you with as much detail as possible. The more information you provide about your vision, the closer we can bring your dream store to life! 

Include details like:
- Your exact niche/products
- Design preferences & color schemes  
- Reference websites you love
- Target countries & currency
- Any specific features you want
- Brand materials (logo, images, etc.)

**What happens next:**
✅ You fill the detailed requirement form
✅ We can Schedule a call if you feel the need to discuss your idea
✅ Our team starts building your store
✅ Regular progress updates throughout

The more clarity you give us upfront, the better we can execute your vision without any back-and-forth delays!

Can't wait to create something amazing for you! 🚀

Shreyansh Singh
Digital Marketing Heroes

S
Profile Image
Me

Sep 30, 11:42 AM
To give me collaborator access to your Shopify store, please follow these steps:

🔐 How to Share Collaborator Access:
Log in to your Shopify Admin Panel.
In the left-hand menu, go to "Settings" > then click on "Users and Permissions".
Scroll down to the Collaborators section.
You'll see an "Only people with a collaborator request code can send a request" option — copy your Collaborator Request Code from there.
Also, copy your full store URL (e.g., ourstorename . myshopify . com)
Send both of these to me here:
✅ Collaborator Request Code: ___________
✅ Store URL: __________

Once I have those, I’ll send the access request and you’ll just need to approve it from your admin panel.

L
lukeone234

Sep 30, 12:00 PM
Code is 6193


Attachment_1759213820.jpeg

(5.34 MB)

L
lukeone234

Sep 30, 12:01 PM
http://buhtek-5x.myshopify.com

L
lukeone234

Sep 30, 12:14 PM
I just bought the domain 
fullthrottletherapy.co from shopify. 

Im not sure if that changes anything your end

L
lukeone234

Sep 30, 12:14 PM
Can you let me know when you have access to

S
Profile Image
Me

Sep 30, 12:17 PM
Access request pending. can you approve from your side?

L
lukeone234

Sep 30, 12:18 PM
Done

S
Profile Image
Me

Sep 30, 1:10 PM
Yes we have the access to the domain Ok we will start working on your preview right away. In the meantime you can provide any additional requirements or competitor websites and functionality that you need in your store. Feel free to share them all and ask any thing you have in mind right away.

L
lukeone234

Sep 30, 1:32 PM
I have sent you competition above

L
lukeone234

Sep 30, 1:32 PM
1 File


F2B9C8D6-9984-4E90-A09B-FEF8EED562DB.png

(920.77 kB)

S
Profile Image
Me

Sep 30, 1:33 PM
Replied

lukeone234

Sep 30, 1:32 PM

1 File


Got it Thanks

S
Profile Image
Me

Sep 30, 2:38 PM
Hey Luke, thanks again for confirming everything Just a quick reminder whenever you’re ready, please share the branding assets (logo, fonts, colors, banners images) so I can align the design perfectly with your brand identity. For now, I’ll set up the premium theme and structure with placeholders, and we’ll swap in your assets as soon as you provide them.

L
lukeone234

Sep 30, 2:38 PM
Ok

S
Profile Image
Me

Sep 30, 2:40 PM
also please share the full product details  names, descriptions, prices, size chart, and any product images you’d like me to use

L
lukeone234

Oct 01, 9:59 AM
Dont fucking die hoodie

The FTT Don’t Fucking Die Hoodie is built for riders who demand more than just style. Designed for the streets, this hoodie fuses premium comfort with serious protection. A reflective graphic across the back and subtle front print boost visibility at night, while every detail is engineered with safety and function in mind.

Fully lined with 220 GSM DuPont™️ Kevlar®️ and paired with an optional CE-rated armour upgrade, this hoodie turns a streetwear staple into real road protection. Whether you’re carving through city streets or parking up at the café, this is gear that performs on and off the bike.

Features
	•	Pullover hoodie, streetwear fit – casual look with protective performance
	•	100% DuPont™️ Kevlar®️ lining (220 GSM) – full coverage, impact and abrasion resistant
	•	Optional CE-rated armour (back, shoulders, elbows)
	•	Reflective print front & back – increased visibility at night
	•	Zipper kangaroo pocket – secure storage while riding
	•	Thumb holes – keeps sleeves locked in at speed
	•	Drawstring-free hood – no distractions, no flapping cords
	•	Comfortable mesh lining – breathable all-day wear

S
Profile Image
Me

Oct 01, 9:58 PM
Here is a quick update:

The homepage, policy pages, About Us page, and product page are shaping along well and coming together nicely. Next, we’ll be focusing on adding the products, and progress on this is ongoing.

Please feel free to review the updates so far and let me know if you’d like to add, remove, or adjust anything, we’ll be more than happy to do so for you.

S
Profile Image
Me

Oct 03, 4:14 PM
I just wanted to check in and see if you had a chance to review the store. I’d love to hear your thoughts and make sure I’m moving in the right direction according to your vision. If there’s anything you’d like adjusted, I’m happy to make those changes.

S
Profile Image
Me

Oct 08, 6:52 PM
Hi, hope you’re doing well.
I just wanted to check in since I haven’t heard back from you in a while. 
The main store setup is now complete, and we’ll continue refining any small details once you share the remaining inputs — I’ll be happy to add them right away.

Since the core setup is ready, I wanted to ask if we can go ahead with the delivery? And as promised, I’ll continue providing full support for the agreed period directly here in our inbox.

✅ You’ll still receive all fixes, tweaks, and updates as discussed
✅ My full commitment to your project remains unchanged
✅ It simply helps clear my Fiverr queue while keeping your support active

Would you like me to send the delivery now?

L
lukeone234

Oct 09, 8:10 AM
Ill be home in 1 hour to review

L
lukeone234

Oct 09, 8:10 AM
Send it now thought

S
Profile Image
Me

Oct 09, 8:18 AM
Replied

lukeone234

Oct 09, 8:10 AM

Ill be home in 1 hour to review

You can Review the whole site from your side and let us know if any things that we still needs to fix.
NOTE - We will cover all the technical and bugs fixes in the support also.
Let Us know when we can deliver :)

L
lukeone234

Oct 09, 9:38 AM
Yes

L
lukeone234

Oct 09, 9:38 AM
Can you tell me how to change the font. I dont like this one

S
Profile Image
Me

Oct 09, 9:41 AM
Customize Your theme > Go to theme settings > Typography


image.png

(32.6 kB)

L
lukeone234

Oct 09, 9:46 AM
Thanks

L
lukeone234

Oct 09, 9:46 AM
I will work on this for the rest of the afternoon

L
lukeone234

Oct 09, 9:46 AM
You can finalize your end with fiverr

L
lukeone234

Oct 09, 1:50 PM
I have not received the notification to finalize

L
lukeone234

Oct 09, 1:50 PM
Can you create a page for this and link this button to it please


Attachment_1759998025.jpeg

(4.38 MB)

S
Profile Image
Me

Oct 09, 1:53 PM
Yes sure anything else you want to add let me know. I'll fix everything before send you the final delivery.

L
lukeone234

Oct 09, 2:00 PM
How long is support after final delivery?

L
lukeone234

Oct 09, 2:01 PM
Im happy to sign if off now if there is time.

S
Profile Image
Me

Oct 09, 2:02 PM
Support post-delivery : 3 months of priority tweaks, troubleshooting, and CRO suggestions

L
lukeone234

Oct 09, 2:03 PM
Oh thats plenty

L
lukeone234

Oct 09, 2:03 PM
I can mark if off now if you want

L
lukeone234

Oct 09, 2:04 PM
Ill be working on it all night so there will be a few within the hours

S
Profile Image
Me

Oct 09, 2:05 PM
Replied

lukeone234

Oct 09, 2:03 PM

I can mark if off now if you want

Sure that will greatly help us with the average time delivery Metric ..
Thanks you again We will keep making Tweaks and changes if you need in future :)

L
lukeone234

Oct 09, 2:05 PM
Thank you

L
lukeone234

Oct 09, 2:43 PM
Also can you make the background black black so logos and photos blend


Attachment_1760001199.jpeg

(2.88 MB)

S
Profile Image
Me

Oct 09, 2:45 PM
Replied

lukeone234

Oct 09, 2:43 PM

Also can you make the background black black so logos and photos blend


Ok will do that or we can do the order way around if you prefer removing the background of the photo.......

L
lukeone234

Oct 09, 2:47 PM
I think black black background is better for me

S
Profile Image
Me

Oct 09, 2:47 PM
Replied

lukeone234

Oct 09, 2:47 PM

I think black black background is better for me

ok got it

L
lukeone234

Oct 09, 2:47 PM
I dont have photoshop skills

L
lukeone234

Oct 09, 2:47 PM
I can just tell GPT black

S
Profile Image
Me

Oct 09, 2:48 PM
Replied

lukeone234

Oct 09, 2:47 PM

I dont have photoshop skills

No worries we got you..

L
lukeone234

Oct 09, 2:53 PM
Also change this button to  @ WIN $$$
And create a page.


Attachment_1760001724.jpeg

(1.58 MB)

L
lukeone234

Oct 09, 2:53 PM
Can you let me know when this is done so i can fill in the page and move on

S
Profile Image
Me

Oct 09, 3:05 PM
Hi,

Your Shopify store, Full Throttle Therapy, is now fully set up and ready to roll!

Here’s what’s live:

Homepage, About Us, and Policy pages
Product pages with your “Don’t F*ing Die”** hoodie range and sweatpants
Dark, badass design matching your biker streetwear vibe
Store configured for Australia and USA

The core setup is complete, and I’ll continue supporting you with any tweaks, updates, or additions — consider it full throttle support even after delivery.

✅ Store ready to go live
✅ All refinements covered during our support period

Even after delivery:
If you notice anything you’d like adjusted — big or small — just message me here and I’ll take care of it right away. My only goal is for you to feel confident, 100% satisfied, and proud before going live.

Please take some time to explore the updated store and share your thoughts when you’re ready — your feedback genuinely means a lot to me. We’ll keep polishing things together during your included support period.

Warm regards,
Shreyansh Singh
Digital Marketing Heroes


Full throttle.png

(380.16 kB)

S
Profile Image
Me

Oct 09, 7:02 PM
Hi thank you for the review

S
Profile Image
Me

Oct 09, 7:03 PM
If you ever need help with anything let me know

L
lukeone234

Oct 12, 3:33 PM
Hi friend

L
lukeone234

Oct 12, 3:33 PM
Contact us page (all pages also)
Need header and footer


Attachment_1760263411.jpeg

(1.44 MB)

L
lukeone234

Oct 12, 3:36 PM
Please remove this part on every page. (Where the mouse pointer is) 

Subscribe to emails is already in footer


Attachment_1760263487.jpeg

(2.58 MB)

L
lukeone234

Oct 12, 3:37 PM
Can you please fix the bullet points on wreck replacement page


Attachment_1760263616.jpeg

(1.51 MB)

L
lukeone234

Oct 12, 3:37 PM
They should look like this

L
lukeone234

Oct 12, 3:37 PM
1 File


Attachment_1760263658.jpeg

(4.16 MB)

S
Profile Image
Me

Oct 12, 3:51 PM
Yes i am fixing it right now...
meanwhile let me know if you have anymore changes

L
lukeone234

Oct 12, 5:10 PM
Can you fix all the bullet points on this page too. Also if you let me know what im doing wrong, i ill correct so i dont need to ask for help


Attachment_1760269169.jpeg

(2.22 MB)

L
lukeone234

Oct 12, 5:10 PM
Also this banner is still here


Attachment_1760269225.jpeg

(2.61 MB)

S
Profile Image
Me

Oct 12, 7:03 PM
Replied

lukeone234

Oct 12, 5:10 PM

Also this banner is still here


OK i will remove it

S
Profile Image
Me

Oct 13, 1:05 PM
Hi Luke,
I’ve completed all the requested updates:

⦁	Added the header and footer to all pages, including the Contact Us page.
⦁	Removed the extra “Subscribe to emails” section from every page.
⦁	Fixed the bullet points styling on the Wreck Replacement page.
⦁	Fixed the bullet points on the other page you mentioned.
⦁	Removed the old banner that was still showing.

Please have a look and let me know if there’s anything else you’d like me to adjust.

L
lukeone234

Oct 29, 6:03 PM
Hi friend. Some updates…

L
lukeone234

Oct 29, 6:04 PM
Please remove this image


319704DF-F1B0-428A-A274-3382A4480E1A.png

(719.55 kB)

L
lukeone234

Oct 29, 6:05 PM
Please remove this part

L
lukeone234

Oct 29, 6:05 PM
1 File


D6C137DE-EBDA-44C3-988B-39F65F149077.png

(265.09 kB)

L
lukeone234

Oct 29, 6:07 PM
Please change this variant

L
lukeone234

Oct 29, 6:07 PM
1 File


6BBA8937-3FB0-46B6-A3C9-6F3426E9087C.png

(265.09 kB)

L
lukeone234

Oct 29, 6:10 PM
Replied

lukeone234

Oct 29, 6:07 PM

1 File


Not this

L
lukeone234

Oct 29, 6:11 PM
Please change this variant


6B651E97-A0BA-4E4F-8FB4-1DB46725811E.png

(211.49 kB)

L
lukeone234

Oct 29, 6:11 PM
To up-sale exactly like this

L
lukeone234

Oct 29, 6:11 PM
1 File


97CDCB75-6AD1-493F-840D-F9EC262E0BCE.png

(796.84 kB)

L
lukeone234

Oct 29, 6:11 PM
1 File


4A9F6BE4-0729-4E00-93C6-59739162622A.png

(250.45 kB)

L
lukeone234

Oct 29, 6:12 PM
Armor Upgrade

CE Level 2 Armor
$39

S
Profile Image
Me

Oct 29, 6:14 PM
Thank you for the detailed feedback. I'll go through them and update them on the store.

L
lukeone234

Oct 29, 6:32 PM
Thank you friend. 

Finally …

L
lukeone234

Oct 29, 6:33 PM
Drop down boxes like this…

Description 
Features 
Care info
Wreck replacement 
Shipping info


106C971F-C8E4-4617-BF03-3BEAB504A0ED.png

(2.54 MB)

S
Profile Image
Me

Oct 29, 6:45 PM
Got it, I'll update them in the store

L
lukeone234

Oct 30, 4:29 AM
Thank you

S
Profile Image
Me

Oct 31, 3:23 PM
All the changes you shared earlier have been completed. Please review the store and let me know if there’s anything else you’d like to adjust.

L
lukeone234

Nov 15, 10:24 AM
Hi friend. 
I want to launch the website tomorrow. 
Will you be available for edits this time tomorrow?

L
lukeone234

Nov 15, 6:17 PM
Hello, if i have any problems it would be really appreciated

L
lukeone234

Nov 15, 6:18 PM
First is changing the homepage hero to the video ive uploaded. 

Ill do my best to figure it out it….

But also very important, how to i change the size guide

S
Profile Image
Me

Nov 15, 8:01 PM
I'm on it i'll update   you

L
lukeone234

Nov 15, 8:01 PM
Are you available in the next 12 hours?

L
lukeone234

Nov 15, 8:02 PM
If not can i ask how now?

S
Profile Image
Me

Nov 15, 8:03 PM
I'm out of town   I'll be back by Monaday

L
lukeone234

Nov 15, 8:03 PM
So no?

S
Profile Image
Me

Nov 15, 8:04 PM
on monday we can probably sir

L
lukeone234

Nov 18, 11:42 AM
Hi friend. 
I opened the website sunday night. Had some good sales, im happy. 

6 missed sales in the abandoned cart however, i think this is very high as 50% sales 50% abandoned cart. Can you have a look and tell me why this might be. We need to reduce it significantly

L
lukeone234

Nov 18, 11:43 AM
There was a few things i removed. Fake reviews, non origional photos and videos

L
lukeone234

Nov 18, 11:43 AM
Can you also make the following changes…

L
lukeone234

Nov 18, 11:47 AM
Update logo on cart/ sale confirmation page

I have uploaded new white background and black background logo into shopify photos.


05A43379-CF17-4877-9FD6-4A91D71C927D.png

(296.53 kB)

L
lukeone234

Nov 18, 12:10 PM
Please note 95% of traffic will be on mobile so we need to prioritize mobile visits

L
lukeone234

Nov 18, 12:11 PM
Please make header logo larger. Also hide the country/ location selection.


BE5EECA6-9219-4574-B129-A0A35C24605A.png

(795.01 kB)

L
lukeone234

Nov 18, 12:13 PM
This button is not optimized for mobile


9A608C99-6822-4E09-AA2B-D8CCF3B580B4.png

(586.09 kB)

L
lukeone234

Nov 18, 12:14 PM
Page in page creates friction. Please link this button to the product page.


0B21F269-FB81-4007-9F59-4DC006B61C4C.png

(425.43 kB)

L
lukeone234

Nov 18, 12:15 PM
Please make footer logo same size as header


8BF669B9-FC35-4490-B4CF-53E8ABD742B1.png

(156.58 kB)

L
lukeone234

Nov 18, 12:17 PM
All pages should be here, wreck replacement etc…


5B38B63D-988B-4EEB-A505-68BEB1A1EBBA.png

(175.2 kB)

L
lukeone234

Nov 18, 12:18 PM
Menu should also have all pages on the site


C00285BD-15B1-4F46-A629-45EF913850E7.png

(650.41 kB)

L
lukeone234

Nov 18, 12:18 PM
This is all for now. 

Thank you

S
Profile Image
Me

Nov 18, 1:58 PM
alright I will do all these changes and update you soon

L
lukeone234

Nov 18, 4:52 PM
Thank you very much

L
lukeone234

Nov 18, 4:52 PM
I also found 2 more minor edits i do not know how to change myself…

L
lukeone234

Nov 18, 4:53 PM
Can you include 3XL and 4XL in size 
I will edit the numbers


CEFAFB1A-E9C5-49F3-B158-68FC23FFA6A0.png

(303.83 kB)

L
lukeone234

Nov 18, 4:55 PM
Please make the chest formal the same as length and sleeve. 

Currently:
56 cm / 22 in

Change to:
56 cm /
22 in

L
lukeone234

Nov 18, 5:00 PM
Also in the drop down please add 
Size guide: 

For detailed sizing measurements refer to the size guide button below the price.  
  
Ebony is 5”7 and wears a S
Luke is 5”10 and wears a L
Kim is 6”2 and wears XXL


68E258C5-98C1-4FE3-BAE4-E372D6690A98.png

(311.63 kB)

S
Profile Image
Me

Nov 18, 11:44 PM
I’ve updated all the changes you requested, including the new edits for the sizes, formatting, and size-guide text, logo, dropdown, navigation menu. Please have a look whenever you get a moment and let me know if you’d like anything else adjusted happy to refine anything further.

L
lukeone234

Nov 19, 12:14 AM
Amazing thank you

L
lukeone234

Dec 02, 8:31 AM
Hi friend. Ive had some people from the USA tell me that price is the same as the AUD price. Can we make it change based on location?

S
Profile Image
Me

Dec 02, 11:50 AM
yes, we can definitely set up location-based pricing so customers in the USA see prices in USD instead of AUD. This will automatically adjust based on the customer’s location. I can take care of this for you just let me know when you’d like me to proceed.

L
lukeone234

Dec 08, 5:24 PM
Hi friend. Can you please implement this, world wide so price is shown in local currency

L
lukeone234

Dec 08, 5:25 PM
Also unlock shipping world wide

L
lukeone234

Dec 08, 5:26 PM
Finally create a streetwear section on the homepage and in the shop tap and link the 3 t shirts to the streetwear page

S
Profile Image
Me

Dec 08, 6:44 PM
yest it can be done okay i will check

L
lukeone234

Dec 10, 3:26 AM
Thank you

L
lukeone234

Dec 11, 12:47 PM
Can you update me when this is done. I have a customer in the USA who cant use the website

S
Profile Image
Me

Dec 13, 2:06 PM
ok I'll update you once it done

L
lukeone234

Dec 18, 4:09 PM
Friend, how is the update

S
Profile Image
Me

Dec 18, 5:06 PM
work in progress just give me little time and I'll update you

L
lukeone234

Dec 23, 11:43 AM
Bro, its been like 2 weeks. These changes should only take 5 minutes. Whats going on

S
Profile Image
Me

Dec 23, 1:13 PM
hi there Can you share The Changes You want to Do on your Store Because i have gone through the chats i got Bit Confused, what has been done and what's left

L
lukeone234

Dec 24, 12:08 PM
Local currency 
World wide shipping
Create a streetwear section

S
Profile Image
Me

Dec 24, 12:21 PM
Ok sir i've started working on these changes thanks for sharing i'll ping you once completed from my end

S
Profile Image
Me

Dec 24, 1:50 PM
hi there,
Just updating you, all the requested changes have been completed:
Local currency setup: Prices now automatically display in each customer’s local currency based on their location.
Worldwide shipping: Global shipping has been enabled so customers from any country can checkout smoothly.
Streetwear section: A Streetwear section has been added to the homepage and the 3 T-shirts are linked to the Streetwear collection.
Please check everything on your side and let me know if you’d like any further adjustments. Happy to help anytime!

L
lukeone234

Dec 24, 1:51 PM
Thank you friend. Have a good Christmas

S
Profile Image
Me

Dec 24, 3:11 PM
Thank you so much Wishing you the same` },
  { filename: "Chat_10_Petarkolakovic.txt", client: "petarkolakovic", niche: "Shopify Store Project", content: `Client Name:- petarkolakovic



petarkolakovic

PROMOTED

Sep 19, 5:55 AM
Hi Mr. Singh, I am the owner of Noravele.com and I am looking for someone to redesign my site so it can look just like https://omniluxled.com/, is that something you can do? I will provide all the images, i already have all the products(13 of them are going on the new site) connected, and I will provide the text. And of course I dont need all the featuers and sections, if you are up for the job we can have a call so I can tell you exacly how i want the site to look like.
Thanks in advnace

This message relates to:

Related item image
I will build shopify store, design redesign copy ecommerce website, dropshipping store

S
Profile Image
Me

Sep 19, 5:55 AM
Hey! Hope you're doing well!
I'm Shreyansh and we teach how to do  Shopify Ecom Dropshipping & Brand building on our YouTube "Digital Marketing Heroes" with 2.5 Million + subscribers.

Here are some stores created by me. Please have a look-
https://indulgentbutters.com/  Password -    ROYAL   - Peanut Store
(Custom AI Graphics and Build)
https://americandreamprinting.com/ - Printing Solutions
https://shipezusa.com/ - Jersey's Print on Demand
https://patasymimos.com/ - Pet Brand
https://gooubeauty.com/  -  Beauty & Makeup 
https://mycommercialkitchen.co/ - Kitchen Brand
https://maajab.com/ - Organic Skincare

What sets us apart: We deliver what others can't custom AI graphics, and conversion-focused builds and much more that most freelancers on Fiverr simply don't have access to or skills for. 
I'd love to bring my expertise to your store! I will soon handle your query Please take time to write down your problems

S
Profile Image
Me

Sep 19, 9:17 AM
Hey! Thanks for reaching out and sharing your vision 💎

I checked OmniluxLED and I see exactly what you mean—it’s a clean, luxurious, conversion-driven layout with strong trust signals. Totally doable ✅ I can redesign Noravele.com in the same style, but customized to your brand and products so it feels premium and unique (not just a copy).

Since you already have your products, images, and text ready, that speeds things up a lot 🚀 I’ll handle:
✅ Modern redesign inspired by OmniluxLED
✅ Branded layout with your 13 products
✅ Mobile-first optimization (very important in beauty/wellness niches)
✅ Integration of reviews, trust badges, FAQ, and upsells/cross-sells
✅ Smooth cart → checkout flow for max conversions

S
Profile Image
Me

Sep 19, 9:17 AM
Here’s how I’d structure packages for you:

✅ Premium Build — $625 (7 Days Support)
→ Full Shopify redesign (homepage, collections, product, cart, checkout)
→ Clean, luxurious design aligned with OmniluxLED style
→ Conversion-focused layout (hero sections, reviews, cross-sells)
→ Custom AI graphics & branded visuals
→ Mobile-first optimization
→ Payment & shipping setup check
→ Newsletter/email capture integration
→ Up to 3 design revisions
→ 7 days of support

✅ Premium Build + Extended Support — $800 (1 Month)
→ Everything in $625 + 1-month ongoing support
→ Product uploads/updates (up to 20 SKUs)
→ Seasonal banner & minor tweaks
→ Quick troubleshooting for apps/theme
→ Priority response

✅ Premium Build + Long-Term Support — $1200 (3 Months)
→ Everything in Premium Build + 3-month support
→ Monthly mgmt of up to 20 new products
→ Seasonal/holiday graphics & banners
→ Conversion optimization suggestions & reports
→ App/email/integration troubleshooting
→ Priority urgent assistance

Timeline: 7 days for full redesign.

P
Profile Image
petarkolakovic

Sep 19, 6:13 PM
No i need it to be as close to as omnilux as it can be do you understand?

S
Profile Image
Me

Sep 19, 6:14 PM
Sure we willl get done

S
Profile Image
Me

Sep 19, 6:14 PM
Please choose a package you would like

P
Profile Image
petarkolakovic

Sep 19, 6:15 PM
Why are you charing me more then it says on the gig, is it because of the complexitiy of the site or?

S
Profile Image
Me

Sep 19, 6:16 PM
🚀 Starter Build — $420 (7 days support 🤝)
Launch your first Shopify store fast 🛒. Includes a clean, mobile-optimized site 📱, up to 10 products, smooth checkout 💳, trust pages ✅, and essential policies 📑. Ideal if you want a professional setup without overwhelm 🎯.

✨ Premium Brand Build — $800 (1 month support ⚡)
Scale with style 👩‍💻. You get everything in Starter + 50 products 🛍️, custom AI visuals 🎨, scarcity/FOMO triggers ⏳🔥, SEO-ready foundation 🌍, and conversion-focused design 💹. Includes seasonal banners 🎉 and product updates 📦 for a brand that looks premium and converts higher 🚀.

🏆 Enterprise Build — $1,800 (3 months premium support 🛠️)
Built for domination 💼. Includes everything in Premium + 100 products 🛒, Google ecosystem setup 🔎 (SEO, GA4, Merchant Center, Console), Meta Pixel 📊, advanced speed optimization ⚡, and CRO-focused layouts 🎯. With seasonal graphics 🖼️ and monthly reports 📈, you’ll have a store that keeps improving every month 🌟.

👑 Done-For-You Empire — $3,000+ (6 months VIP support 💎)
The ultimate hands-free Shopify empire 👑🔥. We do everything A–Z: product research 🧭, branding ✨, persuasive copy ✍️, custom graphics 🎨, SEO 🌍, advanced apps ⚙️, automated emails 📧, upsell funnels 🔄, CRO testing 🧪. Includes detailed CRO/SEO reports 📊 and mentorship 🧑‍🏫. Perfect if you want to skip trial & error and own a ready-to-scale empire 🚀.

Support (in any plan) : includes bug fixes 🐛, seasonal banner updates 🎉, product uploads/edits 📦 (up to 20 SKUs), priority responses ⚡

⚖️ Final Note: The right plan depends on your budget 💵 and how much ongoing support you want. Each tier is designed to match your stage—from starting small to scaling into a full empire.

S
Profile Image
Me

Sep 19, 6:16 PM
Each package includes various functionality which clients need

S
Profile Image
Me

Sep 19, 6:16 PM
It is upto the person how much he wants for his business

P
Profile Image
petarkolakovic

Sep 19, 6:20 PM
Could do do the premium brand deal for 400$, i already have the products connectef to my store and I will provide the images and I am already SEO-d?

S
Profile Image
Me

Sep 19, 8:00 PM
Okay

S
Profile Image
Me

Sep 19, 8:00 PM
Here's your custom offer

$625
I will build shopify store, design redesign copy ecommerce website, dropshipping store
✨ Premium Brand Build — $800 (1 month support ⚡)
Scale with style 👩‍💻. You get everything in Starter + 50 products 🛍️, custom AI visuals 🎨, scarcity/FOMO triggers ⏳🔥, SEO-ready foundation 🌍, and conversion-focused design 💹. Includes seasonal banners 🎉 and product updates 📦 for a brand that looks premium and converts higher 🚀.

Read more
Your offer includes

7 Revisions

16 Days Delivery

Functional website

Number of pages

Responsive design

Content upload

Plugins/extensions installation

E-commerce functionality

Number of products

Payment Integration

Opt-in form

Autoresponder integration

Speed optimization

Hosting setup

Social media icons

Revisions

View order
S
Profile Image
Me

Sep 19, 8:00 PM
30% is the maximum Discount I can add on to the plan

S
Profile Image
Me

Sep 19, 8:01 PM
I’ve sent you a custom offer within your budget — I was able to make this possible by applying a special discount while still including all the Premium Build package features.

Please note, Fiverr does not allow me to extend or recreate the same discount once the offer expires. If it’s not accepted within the given timeframe, the system will automatically remove it and I won’t be able to provide the same rate again.

Looking forward to collaborating with you and creating a premium Shopify store for your brands

P
Profile Image
petarkolakovic

Sep 19, 8:03 PM
Can we do video consloltation before godin ahead with the project so i can tell you exacly how i want the website to look?

S
Profile Image
Me

Sep 19, 8:04 PM
Sure After you are done with the order

S
Profile Image
Me

Sep 19, 8:04 PM
placement I will go ahead schedule a call with you

P
Profile Image
petarkolakovic

Sep 19, 8:09 PM
Okay perfect i plaved an order, can we do a call in 2.5 horus?

S
Profile Image
Me

Sep 19, 9:06 PM
Yes sure !

P
Profile Image
petarkolakovic

Sep 19, 9:47 PM
Perfect we will talk in about an hour

P
Profile Image
petarkolakovic

Sep 19, 10:23 PM
Can we scheduale the call in 25min?

S
Profile Image
Me

Sep 19, 10:31 PM
Yes Sure let's do 11:15 PM IST

P
Profile Image
petarkolakovic

Sep 19, 10:35 PM
Please 11:25 PM IST, I am running a bit late, I am very sorry

S
Profile Image
Me

Sep 19, 10:35 PM
suggest me time  what you'll be available  ?

P
Profile Image
petarkolakovic

Sep 19, 10:43 PM
11:25 PM IST

P
Profile Image
petarkolakovic

Sep 19, 10:53 PM
you can send me the link any time now, I am ready

P
Profile Image
petarkolakovic

Sep 19, 11:01 PM
hello

S
Profile Image
Me

Sep 19, 11:14 PM
ok sending

P
Profile Image
petarkolakovic

Sep 19, 11:15 PM
perfect

S
Profile Image
Me

Sep 19, 11:17 PM
https://meet.google.com/ave-vjgg-zgp

P
Profile Image
petarkolakovic

Sep 19, 11:27 PM
https://omniluxled.com/

S
Profile Image
Me

Sep 19, 11:36 PM
https://gooubeauty.com/

P
Profile Image
petarkolakovic

Sep 19, 11:41 PM
1 File


wmremove-transformed (1)_imgupscaler.ai_Upscaler_2K.png

(1.91 MB)

S
Profile Image
Me

Sep 19, 11:47 PM
Here’s how you can share it:

Go to your Shopify Admin Dashboard → Settings → Users and permissions.

Click “Add staff” or “Add collaborator”.
Enter my mail- mabtang1 at gmail.com
Select the relevant permissions (Products, Themes, Settings, Apps, etc.).
Hit Send Invite.
please share the link of your store as well

P
Profile Image
petarkolakovic

Sep 19, 11:59 PM
Its saying I need a better plan

P
Profile Image
petarkolakovic

Sep 20, 12:02 AM
I can give you a collaborator code its 5588

S
Profile Image
Me

Sep 20, 12:07 AM
I'm sending you the request you have accept it

P
Profile Image
petarkolakovic

Sep 20, 12:08 AM
Will do, when its send give me another message

S
Profile Image
Me

Sep 20, 12:11 AM
sent

P
Profile Image
petarkolakovic

Sep 20, 12:12 AM
I accepted

S
Profile Image
Me

Sep 20, 12:14 AM
Got It i'll start the work today onwards and keep you updated

P
Profile Image
petarkolakovic

Sep 20, 12:20 AM
Perfect, thanks a lot, and for the mobile version also keep it the same as omnilux.com without the sections I said I do not want

S
Profile Image
Me

Sep 20, 9:35 AM
🔥 Order confirmed! 🎉 THANK YOU petarkolakovic for your order! 

I'm absolutely thrilled to work on your Shopify project! Your trust means everything to us.

**IMPORTANT NEXT STEP:**
Please fill out the requirement form which Fiverr is sending you with as much detail as possible. The more information you provide about your vision, the closer we can bring your dream store to life! 

Include details like:
- Your exact niche/products
- Design preferences & color schemes  
- Reference websites you love
- Target countries & currency
- Any specific features you want
- Brand materials (logo, images, etc.)

**What happens next:**
✅ You fill the detailed requirement form
✅ We can Schedule a call if you feel the need to discuss your idea
✅ Our team starts building your store
✅ Regular progress updates throughout

The more clarity you give us upfront, the better we can execute your vision without any back-and-forth delays!

Can't wait to create something amazing for you! 🚀

Shreyansh Singh
Digital Marketing Heroes

S
Profile Image
Me

Sep 26, 12:33 AM
Hi, Here’s a quick update on the store, most of the requested changes related to mobile view have been completed. We’re still working on refining the header for a sleeker look and setting up the dermatology experts panel carousel as per your instructions. 

In the meantime, please feel free to preview the updates so far and let me know if there’s anything you’d like refined, I’ll be more than happy to make those adjustments for you.

S
Profile Image
Me

Sep 27, 12:11 AM
Here’s a quick update for you, we’ve refreshed the banner and carousel. Please take a look and let me know if you’d like any adjustments. 

We’re still finalizing the product page, and in the meantime, if you’d like any additional changes on the homepage, kindly share the details clearly. This way, we can implement everything exactly as you’d like and keep the project on track for timely completion.

S
Profile Image
Me

Sep 27, 9:33 PM
Hi, we wanted to share a quick update with you, we’ve refined both the product page and the homepage. Please take a moment to review them and let us know if there’s anything you’d like us to add, adjust, or remove.

It would be really helpful if you could share your feedback in detail so we can make the final touches and have your store ready on time. Your satisfaction is our top priority, and we want to ensure everything looks just the way you envision it.

S
Profile Image
Me

Sep 29, 11:52 PM
For the Zendrop integration, we’ll be ready to update the site as soon as you share the new product. Once the theme is published live, we’ll also assign each product to its unique product page with the correct details. At the moment, this step isn’t possible while the theme is still unpublished, but please rest assured — as soon as it goes live, we’ll handle everything smoothly so your store is set up exactly as planned.

S
Profile Image
Me

Sep 29, 11:56 PM
Hi Petar,

I’m happy to deliver your completed Premium Shopify Build

✅ Homepage & landing page redesigned with your requested refinements (banner, carousel, review placement, icons removed).
✅ Product page optimized with technical specifications, reviews section styled close to Omnilux, and updated image + text button section.
✅ Before/after carousel now works smoothly with both finger swipe & button navigation.
✅ Seasonal banners + AI-enhanced graphics included for a polished, premium look.

Your store is now fully functional, conversion-optimized, and mobile-ready, with everything you need to start selling confidently. You’ll also have 7 days of ongoing support, so I’ll be here for product uploads (up to 20), seasonal banner tweaks, or troubleshooting.

Please don’t worry about a thing — my focus is fully on ensuring every detail is completed to your satisfaction. Even though I’m delivering early (as we’re closing the month), this allows us to both maintain our ratings and make sure your needs are met in a timely way. You can rest assured I’ll continue working closely with you until everything is exactly how you want it.

Please take some time to explore the updated store and, if everything looks good, kindly share your feedback — it truly means a lot 🙏. We’ll continue fine-tuning together as part of your included support.

I’m confident your brand now has a strong foundation to grow, and I’ll keep supporting you so we can hit your monthly goals without worry. Consider me part of your team — you focus on scaling, and I’ll keep your store sharp and ready.

Best regards,
Shreyansh Singh
Digital Marketing Heroes


Peter noravele.png

(198.42 kB)

S
Profile Image
Me

Sep 30, 10:29 PM
Hi Petar,

I’ve completed all the requested changes ✅:

Switched the main product with the new mask and updated all old mask images across the site (including catalog and sections).
Ensured product images are centered and not cropped.
Removed the side reviews section and added a reviews setup.
Improved the landing image quality on PC.
Added the new main product to the Newest Edition section with only 1 slideshow image.

However, regarding the reviews and unique content for each product — for them to display properly, the theme needs to be published first. At the moment, while the review functionality is added, the reviews won’t show uniquely per product until the theme goes live.

Once you publish the theme, we’ll update each product with its relevant content and reviews so everything displays correctly.

Let me know once the theme is published, and I’ll handle the updates right away.

P
Profile Image
petarkolakovic

Sep 30, 10:43 PM
Okay, I will check the PC version and get back to you ASAP

P
Profile Image
petarkolakovic

Sep 30, 11:02 PM
1) For every product remove these icons
2) On serums instead of "contraindicators" put ingridnet list 
3) On serums instead of supercharge your resaults put "you may also like" and add the main product
4) the main image on PC looks still is not to standrad, use a different one if needed or switch to the old one


After publishing

add uniqe photos and images to each prodcut
add reviews for each product

Download All

Attachment_1759253040.jpeg

(3.2 MB)


Attachment_1759253105.jpeg

(2.82 MB)

S
Profile Image
Me

Oct 01, 10:59 AM
Thank you for pointing these, I'll fix it and update you soon

S
Profile Image
Me

Oct 01, 10:21 PM
Here is a quick update,

We’ve changed the image back to the previous one. To make each product unique with its own ingredients, photos, and details, the theme first needs to be published. Once published, we’ll be able to assign separate product pages and customize them individually, ensuring each product is presented in the best way.

Here’s what we’re currently refining:

On serums, replacing “Contraindicators” with the ingredients list.
On serums, updating “Supercharge your results” to “You may also like,” and adding the main product.

After publishing the theme, we’ll continue with the next steps to ensure each product feels unique, including adding individual photos, detailed ingredients, and client reviews.

Please feel free to review these updates and let me know if there’s anything you’d like to add, remove, or adjust — we’ll be more than happy to make those changes for you.

P
Profile Image
petarkolakovic

Oct 01, 11:55 PM
Okay and also add the price to the home page of the new product and display that they are discounted
After that I will publish the theme so you can do the rest of the final work


8E8309CE-A3EA-4F9A-967A-0925AB42887D.png

(1.26 MB)

P
Profile Image
petarkolakovic

Oct 01, 11:55 PM
Onde you do this let me know, I will publish the new store

S
Profile Image
Me

Oct 02, 5:15 PM
I’ve added the price to the homepage of the new product and set it to show as discounted as requested. Everything is ready on my end, once you publish the theme, I’ll take care of the remaining final touches.

S
Profile Image
Me

Oct 06, 1:29 AM
Hi can we get a feedback please this will really help our small business grow

P
Profile Image
petarkolakovic

Oct 06, 12:35 PM
The product on the small page is still not fixed and the product images are still the same...

P
Profile Image
petarkolakovic

Oct 06, 1:40 PM
On the home* page

P
Profile Image
petarkolakovic

Oct 06, 1:40 PM
Will you finish these changes, pleade tell me now so I know whether or not I need to hire someone else

S
Profile Image
Me

Oct 06, 2:44 PM
no no i im on it

P
Profile Image
petarkolakovic

Oct 06, 2:57 PM
Perfect, once you fix the home page i will publish the theme right away

S
Profile Image
Me

Oct 06, 3:27 PM
Should i change the banner image of the home page with the new product?

P
Profile Image
petarkolakovic

Oct 06, 3:37 PM
No need

S
Profile Image
Me

Oct 06, 6:26 PM
I've ensured that none of the product images are cropped, and I've updated the main product image to a portrait resolution. Kindly take a look and let me know if everything appears correct.

P
Profile Image
petarkolakovic

Oct 06, 7:58 PM
Amazing, I will publish the thene now co you can sort everything else

S
Profile Image
Me

Oct 06, 9:06 PM
Let me know if you face any issue again...

P
Profile Image
petarkolakovic

Oct 06, 9:17 PM
Just edit the product pages as requested and thats it

S
Profile Image
Me

Oct 06, 9:45 PM
Sure, I'm on it. I'll update you soon.

P
Profile Image
petarkolakovic

Oct 06, 9:52 PM
Sounds good.

S
Profile Image
Me

Oct 06, 11:43 PM
We've updated the product pages. Please have a look and let us know if you want something to be added, removed or updated. We'll be more than happy to do that for you.

P
Profile Image
petarkolakovic

Oct 06, 11:50 PM
Okay, just add reviews and please fix this if you can, on mobile you can zoom out the page like this, I dont know if this is shopify error.


D8852536-8CEA-42AE-B8A4-A403A9A3FC87.png

(463.49 kB)

P
Profile Image
petarkolakovic

Oct 06, 11:54 PM
And these buy now buttons on the product pages center, after these 3 changes that would be all


D9F697B7-C356-4A12-8E2F-F72FF2D146C7.png

(242.85 kB)

S
Profile Image
Me

Oct 06, 11:58 PM
Sure, I'll look into the zoom out situation along with other changes and update you once resolved.

S
Profile Image
Me

Oct 08, 12:21 AM
Here is a quick update, we’ve added reviews to 12 products and adjusted the button alignment to be centered. We’re still working on fixing the zoomed-out issue, progress on that is ongoing.

P
Profile Image
petarkolakovic

Oct 08, 1:30 AM
Okay once the zoom issue is fixed that would be everything, thank you for keeping me updated

S
Profile Image
Me

Oct 09, 11:53 PM
Hi, thanks for your patience, just wanted to let you know that we’ve fixed the swipe issue on mobile. Everything should now function smoothly when browsing between products.

Please have a look and let us know if everything appears fine on your end.

P
Profile Image
petarkolakovic

Oct 10, 12:17 AM
It happend again....


CAF01544-E289-4DA1-B4A5-1F90E11AD7C3.png

(599.99 kB)

P
Profile Image
petarkolakovic

Oct 10, 12:19 AM
And its the same for all products.

S
Profile Image
Me

Oct 10, 12:26 AM
On "Near Infrared Therapy Face Mask" product page the mobile view is fixed. For the rest of the products, I'll fix it shortly and update you.

P
Profile Image
petarkolakovic

Oct 10, 12:27 AM
Okay

S
Profile Image
Me

Oct 10, 8:47 PM
The issue has been fixed, please have a look and confirm if everything is good from your end.

P
Profile Image
petarkolakovic

Oct 10, 11:22 PM
Everything looks perfect, thank you a lot for the job done

S
Profile Image
Me

Oct 10, 11:27 PM
Replied

petarkolakovic

Oct 10, 11:22 PM

Everything looks perfect, thank you a lot for the job done

I’m really glad everything’s looking perfect now!
When you get a moment, could you please leave a quick review for your order? 😊
Click here - 
https://www.fiverr.com/shreyanshsin261/build-shopify-store-design-redesign-copy-ecommerce-website-dropshipping-store

It helps us a lot on Fiverr and supports our team in continuing to deliver great results for clients like you.

P
Profile Image
petarkolakovic

Oct 10, 11:31 PM
I already left a review dont worry😌


EFAA81EF-7AB2-4213-9304-7836983E3BC9.png

(356.72 kB)

S
Profile Image
Me

Oct 10, 11:41 PM
Thank you soo much

P
Profile Image
petarkolakovic

Oct 10, 11:43 PM
No problem, it was a pleasure working with you, if anybody I knwo will need something done on the Shopify store i will reffear you.

S
Profile Image
Me

Oct 10, 11:44 PM
Thank you so much! It was a pleasure working with you as well. I really appreciate the referral and look forward to helping anyone you recommend in the future.

S
Profile Image
Me

Oct 10, 11:57 PM
If you ever face any bug or issues we are just a message away Please don't hesitate to reach out to us 😊

P
Profile Image
petarkolakovic

Oct 15, 1:38 AM
hello i found a lot of bugs on my website and faulty buttons etc. could you fix it I am willing to pay you

S
Profile Image
Me

Oct 15, 11:16 AM
Yeah i will   i re- check everything again and fix it

P
Profile Image
petarkolakovic

Oct 15, 9:15 PM
Hello, there was a issue with a button and the backgorund but they were simple fixes(could have been shopify) since it was not like that when you were done, thank you for your time never the less

S
Profile Image
Me

Oct 15, 9:44 PM
can you share photo i ;ll do it now

P
Profile Image
petarkolakovic

Oct 15, 9:48 PM
Nono its fine, i manage to fix it, it was 3min, but thank you a lot` },
];
function downloadChat(chat) {
  const blob = new Blob([chat.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = chat.filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ChatPhase({ day, S: appState, U: setAppState, onComplete, trainee }) {
  const phKey = `DAY${day}`;
  const isDone = (appState.completedPhases || []).includes(phKey);
  const cKey = `day${day}Checks`;
  const checks = appState[cKey] || {};
  const toggle = i => setAppState(s => ({ ...s, [cKey]: { ...checks, [i]: !checks[i] } }));
  const [downloaded, setDownloaded] = useState({});
  const items = day === 3
    ? ["Client requirements — what exactly does the client want?", "Objections raised — what concerns or hesitations did they show?", "Response strategy — how were replies handled by our team?", "Tone and language used — how did we communicate?", "Common patterns — what repeats across all 5 chats?"]
    : ["Closing strategies used to convert the client", "Pricing discussions — how price was presented and objections handled", "Follow-up techniques applied after initial contact", "Objection handling patterns across all 5 chats", "Combined patterns from all 10 chats (Days 3 + 4 together)"];
  const count = Object.values(checks).filter(Boolean).length;
  const canComplete = count >= items.length;

  const handleDownload = (chat) => {
    downloadChat(chat);
    setDownloaded(d => ({ ...d, [chat.filename]: true }));
  };

  return (
    <div className="content fade-up">
      <div className="ph-badge">💬 Day {day}</div>
      <h1 className="ph-title">Client Chat Analysis — Part {day - 2}</h1>
      <p className="ph-intro">{day === 3
        ? "Download each file, open in Notepad, read carefully and take notes."
        : "Today you study chats 6–10. Download each file, open in Notepad, and focus on closing strategies, pricing discussions, and follow-up techniques."}</p>

      <RulesBlock items={[
        "Download ALL 5 chat files below — do not skip any",
        "Open each file in Notepad or any text editor on your device",
        "Read every single chat FULLY — no skipping, no skimming",
        "Take separate detailed notes for each individual chat",
        "Identify minimum 3–5 common patterns across all chats",
        "You WILL be questioned on these chats in the Second Interview",
        "These are CONFIDENTIAL internal chats — do not share outside DMH",
        "Do NOT mark complete until you have read and analysed every chat",
      ]} />

      <InstrBlock title="📋 How to Complete This Day" items={[
        day === 3
          ? "Click the Download button for each chat file below"
          : "Click the Download button for each of the 5 chat files below",
        "Open the downloaded .txt file in Notepad (Windows) or TextEdit (Mac)",
        "Read the full conversation — every message, from start to finish",
        day === 3
          ? "For each chat note: client requirements, objections raised, how team responded"
          : "Focus on: closing strategies, pricing discussions, and follow-up techniques",
        day === 3
          ? "Pay attention to the TONE and LANGUAGE used by our sales team"
          : "Compare these chats with Day 3 — note what is similar and what is different",
        "After reading all 5, tick the analysis checklist below",
      ]} />

      {day === 3 ? (
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>
            📁 Download All 5 Chat Files — Open in Notepad
          </div>
          {CHAT_FILES.map((chat, i) => (
            <div key={i} className="dl-row" style={{
              background: downloaded[chat.filename] ? "rgba(5,26,15,.7)" : "var(--navy-card)",
              border: `1px solid ${downloaded[chat.filename] ? "rgba(13,74,37,.8)" : "rgba(255,255,255,.06)"}`,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: downloaded[chat.filename] ? "rgba(74,222,128,.15)" : "rgba(201,162,39,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: downloaded[chat.filename] ? "var(--grn-tx)" : "var(--gold)", flexShrink: 0 }}>
                {downloaded[chat.filename] ? "✓" : String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: downloaded[chat.filename] ? "var(--grn-tx)" : "var(--white)", fontSize: 14 }}>{chat.client}</div>
                <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{chat.niche}</div>
                <div style={{ fontSize: 11, color: downloaded[chat.filename] ? "rgba(74,222,128,.6)" : "rgba(154,165,196,.4)", marginTop: 3 }}>
                  {downloaded[chat.filename] ? "✅ Downloaded — open in Notepad to read" : `📄 ${chat.filename}`}
                </div>
              </div>
              <button
                onClick={() => handleDownload(chat)}
                className="dl-btn"
                style={{ background: downloaded[chat.filename] ? "linear-gradient(135deg,#0a5c3e,#0e7a52)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}
              >
                <span style={{ fontSize: 15 }}>{downloaded[chat.filename] ? "↻" : "⬇"}</span>
                {downloaded[chat.filename] ? "Re-download" : "Download .txt"}
              </button>
            </div>
          ))}
          <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 9, padding: "12px 16px", fontSize: 13, color: "var(--gold-light)", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <span>After downloading, open each file with <strong>Notepad</strong> (Windows) or <strong>TextEdit</strong> (Mac). Read the full conversation and take notes before ticking the checklist.</span>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>
            📁 Download All 5 Chat Files — Open in Notepad
          </div>
          {CHAT_FILES_DAY4.map((chat, i) => (
            <div key={i} className="dl-row" style={{
              background: downloaded[chat.filename] ? "rgba(5,26,15,.7)" : "var(--navy-card)",
              border: `1px solid ${downloaded[chat.filename] ? "rgba(13,74,37,.8)" : "rgba(255,255,255,.06)"}`,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: downloaded[chat.filename] ? "rgba(74,222,128,.15)" : "rgba(201,162,39,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: downloaded[chat.filename] ? "var(--grn-tx)" : "var(--gold)", flexShrink: 0 }}>
                {downloaded[chat.filename] ? "✓" : String(i + 6).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: downloaded[chat.filename] ? "var(--grn-tx)" : "var(--white)", fontSize: 14 }}>{chat.client}</div>
                <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{chat.niche}</div>
                <div style={{ fontSize: 11, color: downloaded[chat.filename] ? "rgba(74,222,128,.6)" : "rgba(154,165,196,.4)", marginTop: 3 }}>
                  {downloaded[chat.filename] ? "✅ Downloaded — open in Notepad to read" : `📄 ${chat.filename}`}
                </div>
              </div>
              <button
                onClick={() => handleDownload(chat)}
                className="dl-btn"
                style={{ background: downloaded[chat.filename] ? "linear-gradient(135deg,#0a5c3e,#0e7a52)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}
              >
                <span style={{ fontSize: 15 }}>{downloaded[chat.filename] ? "↻" : "⬇"}</span>
                {downloaded[chat.filename] ? "Re-download" : "Download .txt"}
              </button>
            </div>
          ))}
          <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 9, padding: "12px 16px", fontSize: 13, color: "var(--gold-light)", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <span>After downloading, open each file with <strong>Notepad</strong> (Windows) or <strong>TextEdit</strong> (Mac). Compare these chats with Day 3 — note what is similar and what is different.</span>
          </div>
        </div>
      )}

      {isDone ? <DoneBanner phase={`Day ${day}`} /> : (
        <>
          <div className="checklist">
            <div className="cl-title">🔍 Analysis Checklist — Tick After Reading & Analysing Each Point</div>
            {items.map((item, i) => <CB key={i} label={item} checked={!!checks[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canComplete && <div className="lock-warn"><span>⚠️</span>Complete all {items.length} analysis points to unlock ({count}/{items.length} done)</div>}
          <CompletionSection label={`Mark Day ${day} Complete — Unlock Day ${day + 1} 🔓`} disabled={!canComplete} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel={`Day ${day} — Chat Analysis Part ${day - 2}`} />
        </>
      )}
      <NoteBottom>Once done, inform Sarthak to receive your Day {day + 1} code.</NoteBottom>
    </div>
  );
}

function Day5Phase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("DAY5");
  const checks = appState.day5Checks || {};
  const toggle = i => setAppState(s => ({ ...s, day5Checks: { ...checks, [i]: !checks[i] } }));

  const themes = [
    { name: "Dawn",      free: true,  best: "General, Fashion, Home Décor",          style: "Clean, minimal, modern grid",         arch: "Flexible sections, large hero, sticky header",                 limit: "Limited visual complexity, basic animations" },
    { name: "Sense",     free: true,  best: "Beauty, Skincare, Wellness",            style: "Soft, editorial, feminine",           arch: "Overlapping sections, large typography, clean PDP",            limit: "Not ideal for large catalogs" },
    { name: "Craft",     free: true,  best: "Handmade, Artisan, Food & Beverage",    style: "Warm, textured, story-driven",        arch: "Strong About section, featured collection, image-heavy",       limit: "Fewer conversion tools out of the box" },
    { name: "Refresh",   free: true,  best: "Supplements, Health, Single Product",   style: "Bold CTA, bright, benefit-focused",   arch: "Hero with CTA, product highlights, FAQ, reviews",              limit: "Can feel generic without customisation" },
    { name: "Debut",     free: true,  best: "Beginners, Small Catalogs",             style: "Simple, clean, lightweight",          arch: "Basic homepage, collection, product page — minimal extras",     limit: "Very limited sections, outdated feel" },
    { name: "Shrine",    paid: true,  best: "Premium Fashion, Streetwear, Luxury",   style: "Cinematic, editorial, video-first",   arch: "Full-width video hero, scrolling animations, lookbook layout", limit: "Heavy load time, needs optimisation" },
    { name: "Impulse",   paid: true,  best: "Large Stores, Multi-Category Retail",   style: "Bold, sale-focused, high contrast",   arch: "Mega menu, promo banners, countdown timers, featured rows",    limit: "Can feel busy; needs careful customisation" },
    { name: "Prestige",  paid: true,  best: "Luxury, High-End Fashion, Jewellery",   style: "Refined, minimal, editorial luxury",  arch: "Fullscreen hero, lookbook, elegant typography, rich PDP",      limit: "Limited app compatibility, expensive" },
    { name: "Turbo",     paid: true,  best: "Large Catalogs, Fast-Growing Brands",   style: "Speed-optimised, conversion-first",   arch: "Advanced mega menu, quick buy, infinite scroll, predictive search", limit: "Complex setup, overkill for small stores" },
    { name: "Symmetry",  paid: true,  best: "Home Décor, Lifestyle, Gift Shops",     style: "Elegant, balanced, grid-heavy",       arch: "Multi-column layout, lookbook, featured collection grids",     limit: "Less flexible hero customisation" },
  ];

  const items = [
    "Visited the live demo for all 10 themes on themes.shopify.com",
    "Noted which type of store each theme is best suited for",
    "Understood the design architecture — layout, sections, hero style",
    "Listed at least 1 key limitation for each theme",
    "Can explain which theme you would recommend for different client niches",
    "Written all notes in your own words — no copy-paste",
  ];
  const count = Object.values(checks).filter(Boolean).length;
  const canComplete = count >= items.length;

  return (
    <div className="content fade-up">
      <div className="ph-badge">🎨 Day 5</div>
      <h1 className="ph-title">Shopify Theme Research</h1>
      <p className="ph-intro">Today you research the Top 10 Shopify themes in depth. Understanding themes is what separates a good salesperson from a great one — clients will ask "which theme should I use?" and you need a confident, accurate answer.</p>

      <RulesBlock items={[
        "Visit the LIVE DEMO for every single theme on themes.shopify.com — no shortcuts",
        "Do NOT copy-paste from the internet — understand each theme and write in your own words",
        "You need to know: what type of store it suits, its design architecture, and its limitations",
        "You will be tested on ALL 10 themes in the Second Interview",
        "Knowing limitations is just as important as knowing strengths — clients ask about both",
        "Do NOT mark complete until all checklist items are ticked",
      ]} />

      <InstrBlock title="📋 How to Complete Day 5" items={[
        "Go to themes.shopify.com — click on each theme listed in the table below",
        "Click 'View demo store' for each theme and explore it fully on both desktop and mobile",
        "For each theme, understand: what kind of products look best, how the homepage flows, what sections are available",
        "Use the reference table below as your starting guide — then build your own detailed notes",
        "Ask yourself: which theme would I recommend to a fashion client? A supplement client? A luxury brand?",
      ]} />

      {/* Theme Reference Table */}
      <div className="submit-card">
        <div className="sc-title">📊 Top 10 Themes — Reference & Study Guide</div>
        <p style={{ fontSize: 13, color: "var(--dim)", marginBottom: 14, lineHeight: 1.6 }}>
          Use this table as a starting point. Visit each theme's live demo and build your own detailed notes beyond what's shown here.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Theme</th>
                <th>Price</th>
                <th>Best For (Store Type)</th>
                <th>Design Style</th>
                <th>Architecture / Layout</th>
                <th>Key Limitation</th>
              </tr>
            </thead>
            <tbody>
              {themes.map(t => (
                <tr key={t.name}>
                  <td style={{ color: "var(--gold-light)", fontWeight: 700, whiteSpace: "nowrap" }}>{t.name}</td>
                  <td>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: t.free ? "rgba(74,222,128,.12)" : "rgba(201,162,39,.12)", color: t.free ? "var(--grn-tx)" : "var(--gold)" }}>
                      {t.free ? "FREE" : "PAID"}
                    </span>
                  </td>
                  <td style={{ fontSize: 12.5 }}>{t.best}</td>
                  <td style={{ fontSize: 12.5 }}>{t.style}</td>
                  <td style={{ fontSize: 12.5 }}>{t.arch}</td>
                  <td style={{ fontSize: 12.5, color: "var(--red-tx)" }}>{t.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, padding: "11px 14px", background: "rgba(59,130,246,.07)", border: "1px solid rgba(59,130,246,.15)", borderRadius: 8, fontSize: 13, color: "#93c5fd", lineHeight: 1.6 }}>
          💡 <strong>Study tip:</strong> After visiting each demo, ask yourself — "If a client selling [product] came to me, would I recommend this theme? Why or why not?" Being able to answer this confidently is the goal.
        </div>
      </div>

      {/* Theme cards for quick visual reference */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>🔗 Quick Access — Visit Each Theme Demo</div>
        <div className="grid-2col" style={{ gap: 9 }}>
          {themes.map((t, i) => (
            <a key={t.name} href={`https://themes.shopify.com/themes/${t.name.toLowerCase()}/styles/default`} target="_blank" rel="noreferrer"
              style={{ background: "var(--navy-card)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 11, padding: "13px 15px", display: "flex", alignItems: "center", gap: 11, textDecoration: "none", transition: "all .2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--gold)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"}
            >
              <div style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(201,162,39,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--gold)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--white)" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 1 }}>{t.best.split(",")[0]}</div>
              </div>
              <span style={{ fontSize: 11, color: "var(--blue)" }}>View Demo ↗</span>
            </a>
          ))}
        </div>
      </div>

      {isDone ? <DoneBanner phase="Day 5" /> : (
        <>
          <div className="checklist">
            <div className="cl-title">✅ Research Completion Checklist</div>
            {items.map((item, i) => <CB key={i} label={item} checked={!!checks[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canComplete && <div className="lock-warn"><span>⚠️</span>Complete all {items.length} checklist items to unlock Day 6 ({count}/{items.length} done)</div>}
          <CompletionSection label="Mark Day 5 Complete — Unlock Day 6 🔓" disabled={!canComplete} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Day 5 — Shopify Theme Research" />
        </>
      )}
      <NoteBottom>Once done, inform Sarthak to receive your Day 6 code.</NoteBottom>
    </div>
  );
}

function Day6Phase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("DAY6");
  const checks = appState.day6Checks || {};
  const toggle = i => setAppState(s => ({ ...s, day6Checks: { ...checks, [i]: !checks[i] } }));
  const [openStore, setOpenStore] = useState(null);

  const stores = [
    {
      e: "💪", n: "Gymshark", url: "https://www.gymshark.com",
      revenue: "$500M+ annually", niche: "Fitness Apparel",
      why: "Community-first brand. Built entirely on social proof, athlete partnerships, and limited drops. The homepage rotates between lifestyle and product — never feels like a store, feels like a movement.",
      study: ["Mega menu with clean category breakdown", "Full-width video hero — emotion over product", "Sticky header with persistent cart icon", "Social proof: athlete endorsements + UGC grid", "Limited edition drops creating urgency", "Strong loyalty program (Gymshark Owned)"],
      lesson: "Community + scarcity = the most powerful sales formula in fitness apparel.",
    },
    {
      e: "👗", n: "Fashion Nova", url: "https://www.fashionnova.com",
      revenue: "$400M+ annually", niche: "Fast Fashion",
      why: "Instagram-native brand. Every product page looks like it was made for a story. Built for impulse buying — almost no friction from browse to checkout.",
      study: ["Constant promo banner at top (e.g. 50% off)", "Grid-heavy product display — maximum products per scroll", "Size inclusive imagery throughout", "Social media feed embedded on homepage", "Aggressive email popups on entry", "Flash sale countdown timers on PDPs"],
      lesson: "Speed and volume over elegance. Fast fashion wins on price visibility and product density.",
    },
    {
      e: "💄", n: "Kylie Cosmetics", url: "https://www.kyliecosmetics.com",
      revenue: "$200M+ annually", niche: "Celebrity Beauty",
      why: "Drop model perfection. The store is built around scarcity and exclusivity — not always having everything available makes customers come back obsessively.",
      study: ["Minimalist, luxury-feel homepage", "Hero section features Kylie herself (personal brand)", "Limited drop countdown timers creating hype", "Clean product pages with shade selectors", "Strong \"Sold Out\" social proof on past drops", "Simple navigation — Shop, Collections, About"],
      lesson: "Scarcity + personal brand = customers who refresh the page on drop day.",
    },
    {
      e: "👟", n: "Allbirds", url: "https://www.allbirds.com",
      revenue: "$250M+ annually", niche: "Sustainable Footwear",
      why: "The ultimate sustainability storytelling store. Every section educates the customer about materials and impact. Buying Allbirds feels like a moral decision, not just a shoe purchase.",
      study: ["Carbon footprint displayed on every product page", "Material education sections throughout", "Minimal, clean product photography on white", "Benefit-driven copywriting — not features, but feelings", "Strong About Us / Impact page", "Subtle but effective upsell (shop the look)"],
      lesson: "If your client has a sustainability angle — this is the playbook to follow.",
    },
    {
      e: "⌚", n: "MVMT Watches", url: "https://www.mvmtwatches.com",
      revenue: "$150M+ annually", niche: "DTC Watches / Accessories",
      why: "Redefined affordable luxury. Sold the idea that expensive-looking watches don't need to cost $500. The store is built on aspirational lifestyle photography with clear, confident pricing.",
      study: ["Lifestyle photography — product in real-world scenarios", "Bundle and gift set upsells throughout", "Strong cross-sell: watches + sunglasses + straps", "Clear pricing with 'Compare at' crossed-out prices", "Free shipping threshold prominently displayed", "Gift-focused sections (birthday, holidays)"],
      lesson: "Aspirational lifestyle imagery + affordable luxury positioning = high AOV.",
    },
    {
      e: "🏠", n: "Ruggable", url: "https://www.ruggable.com",
      revenue: "$100M+ annually", niche: "Home Décor / Rugs",
      why: "Solved a real problem (washable rugs) and built an entire store experience around that USP. Every section of the homepage reinforces why Ruggable is different from every other rug brand.",
      study: ["Hero section leads with the USP: 'Machine Washable'", "How-it-works section — 3-step explanation", "Room visualizer tool (AR preview)", "Strong testimonial section with real customer photos", "Style quiz CTA to help customers choose", "Interior design influencer collaborations"],
      lesson: "If a product solves a real problem, build the entire store around that problem-solution story.",
    },
    {
      e: "🧦", n: "Bombas", url: "https://www.bombas.com",
      revenue: "$300M+ annually", niche: "Premium Socks / Apparel",
      why: "Mission-driven brand with a '1 purchased = 1 donated' model. Every product page reinforces this. Customers don't just buy socks — they feel good about buying socks.",
      study: ["Mission banner at top of every page", "Product pages with bee better badge + impact counter", "Bundle discounts prominently shown (buy more, save more)", "Subscription model option on product pages", "Strong reviews section with verified buyer tags", "Gift set positioning for holidays"],
      lesson: "Social mission as a conversion tool. Customers pay premium when they believe in the cause.",
    },
    {
      e: "☕", n: "Death Wish Coffee", url: "https://www.deathwishcoffee.com",
      revenue: "$50M+ annually", niche: "Specialty Coffee",
      why: "Extreme branding done right. Every word, every image, every section of the store is on-brand. Dark, bold, unapologetic. The brand voice alone is a conversion tool.",
      study: ["Dark, bold homepage — completely on brand", "Strong hero copy: 'World's Strongest Coffee'", "Subscription model front and centre", "Product pages with roasting details and intensity levels", "Story-driven About page — origin, mission, obsession", "UGC and press mentions throughout"],
      lesson: "When brand voice is this strong and consistent, the store sells itself.",
    },
    {
      e: "👟", n: "Steve Madden", url: "https://www.stevemadden.com",
      revenue: "$2B+ annually", niche: "Fashion Footwear / Accessories",
      why: "Large-scale fashion retail done on Shopify. Study this to understand how major brands handle large catalogs, complex navigation, and multi-category stores without losing the brand feel.",
      study: ["Mega menu with visual category thumbnails", "Seasonal campaign homepage — changes regularly", "Lookbook-style featured collections", "Quick add to bag on collection pages", "Strong loyalty program (SM Pass)", "Clear sale section with prominent pricing"],
      lesson: "Large catalog management: how to keep a store clean, navigable and on-brand at scale.",
    },
    {
      e: "🎒", n: "Herschel Supply Co.", url: "https://www.herschel.com",
      revenue: "$100M+ annually", niche: "Bags / Lifestyle Accessories",
      why: "Premium lifestyle brand with immaculate visual consistency. Every image, every product page, every collection looks like it belongs in a magazine. Study this for understanding elevated product photography standards.",
      study: ["Cinematic, editorial homepage photography", "Clean product pages with lifestyle + flat lay images", "Colour variant swatches front and centre", "Collaboration collections (Disney, Star Wars, etc.)", "Instagram-style lookbook grid section", "Strong About page with brand story"],
      lesson: "Visual consistency at this level creates a brand that customers aspire to own.",
    },
  ];

  const items = [
    "Visited all 10 store websites live — not screenshots or articles",
    "Noted the homepage structure and hero section approach for each store",
    "Identified at least 3 standout design or conversion elements per store",
    "Understood what makes each store's revenue strategy work",
    "Can explain which store's approach to recommend for different client types",
    "Written structured notes in your own words for each store",
  ];
  const count = Object.values(checks).filter(Boolean).length;
  const canComplete = count >= items.length;

  return (
    <div className="content fade-up">
      <div className="ph-badge">🏪 Day 6</div>
      <h1 className="ph-title">Top 10 High-Revenue Shopify Stores</h1>
      <p className="ph-intro">Today you research 10 of the world's highest-revenue Shopify stores. Your goal is to understand <strong style={{ color: "var(--gold-light)" }}>WHY</strong> they convert — not just what they look like. Study the strategy, sections, and decisions behind each store.</p>

      <RulesBlock items={[
        "Visit EVERY store's live website — no shortcuts, no relying on articles",
        "Study each store as if you are going to present it to a new client tomorrow",
        "For every store: understand the homepage flow, key sections, and revenue strategy",
        "Identify at least 3 specific elements you would recommend copying for a client",
        "You will be tested on ALL 10 stores in the Second Interview — know them deeply",
        "Do NOT mark complete until all checklist items are ticked",
      ]} />

      <InstrBlock title="📋 For Each Store, Analyse These 5 Things" items={[
        "Hero section — what is the first thing the customer sees? What emotion does it create?",
        "Key sections used — testimonials, UGC, how-it-works, countdown, bundles, etc.",
        "Pricing & conversion strategy — how does the store push people toward buying?",
        "Brand voice & visual style — how does the design reinforce the brand identity?",
        "What would you recommend to a client from this store? Be specific.",
      ]} />

      {/* Store cards */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>
          🛒 10 Stores — Click Each to Study
        </div>
        {stores.map((s, i) => (
          <div key={s.n} style={{ marginBottom: 10 }}>
            {/* Header row */}
            <div
              onClick={() => setOpenStore(openStore === i ? null : i)}
              style={{
                background: openStore === i ? "rgba(201,162,39,.1)" : "var(--navy-card)",
                border: `1px solid ${openStore === i ? "rgba(201,162,39,.4)" : "rgba(255,255,255,.06)"}`,
                borderRadius: openStore === i ? "12px 12px 0 0" : 12,
                padding: "14px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12, transition: "all .2s",
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,162,39,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--gold)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{s.e}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--white)", fontSize: 14 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{s.niche} · <span style={{ color: "var(--gold)" }}>{s.revenue}</span></div>
              </div>
              <a href={s.url} target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontSize: 12, color: "var(--blue)", textDecoration: "none", padding: "6px 12px", border: "1px solid rgba(59,130,246,.3)", borderRadius: 7, flexShrink: 0, whiteSpace: "nowrap" }}>
                Visit Store ↗
              </a>
              <div style={{ fontSize: 13, color: openStore === i ? "var(--gold)" : "var(--dim)", transition: "transform .2s", transform: openStore === i ? "rotate(180deg)" : "none", flexShrink: 0 }}>▼</div>
            </div>

            {/* Expanded study guide */}
            {openStore === i && (
              <div style={{ background: "rgba(10,15,30,.85)", border: "1px solid rgba(201,162,39,.2)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "20px 20px 22px" }}>
                {/* Why study this */}
                <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.12)", borderRadius: 9 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>💡 Why This Store Matters</div>
                  <p style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.7 }}>{s.why}</p>
                </div>

                {/* What to study */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--grn-tx)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>🔍 Key Elements to Study</div>
                  {s.study.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 13, color: "#86efac", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--grn-tx)", flexShrink: 0 }}>▸</span><span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Key lesson */}
                <div style={{ padding: "12px 14px", background: "rgba(59,130,246,.07)", border: "1px solid rgba(59,130,246,.15)", borderRadius: 9 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>🧠 Key Sales Lesson</div>
                  <p style={{ fontSize: 13.5, color: "#bfdbfe", lineHeight: 1.65 }}>{s.lesson}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isDone ? <DoneBanner phase="Day 6" /> : (
        <>
          <div className="checklist">
            <div className="cl-title">✅ Research Completion Checklist</div>
            {items.map((item, i) => <CB key={i} label={item} checked={!!checks[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canComplete && <div className="lock-warn"><span>⚠️</span>Complete all {items.length} tasks to unlock Day 7 ({count}/{items.length} done)</div>}
          <CompletionSection label="Mark Day 6 Complete — Unlock Day 7 🔓" disabled={!canComplete} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Day 6 — High Revenue Store Research" />
        </>
      )}
      <NoteBottom>Once done, inform Sarthak to receive your Day 7 code.</NoteBottom>
    </div>
  );
}

function Day7Phase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("DAY7");
  const checks = appState.day7Checks || {};
  const toggle = i => setAppState(s => ({ ...s, day7Checks: { ...checks, [i]: !checks[i] } }));

  const stores = [
    { name: "Big Game Sports",  url: "https://biggamesports.co.uk/",  emoji: "🏆", desc: "Sports & fitness e-commerce store — study every section" },
    { name: "Emania",           url: "https://emani.com/",            emoji: "💎", desc: "Premium beauty & wellness brand store — study every section" },
  ];

  const focusAreas = [
    { icon: "🎨", label: "Design Flow",       desc: "How does the overall design look and feel? What emotion does it create? What colours, fonts, and spacing are used?" },
    { icon: "⚙️", label: "Features",          desc: "What special features and functionalities are included? Filters, popups, animations, review widgets, sticky cart, etc." },
    { icon: "📐", label: "Section Placement", desc: "How are sections structured and arranged from top to bottom? Why is each section placed where it is?" },
    { icon: "✨", label: "What Makes It Premium", desc: "What specific elements stand out as high quality? What would you point out to a client as the best part of this store?" },
  ];

  const items = [
    "Visited the full DMH portfolio at portfolio.digitalheroes.co.in",
    "Studied Big Game Sports — design flow, features, section placement, premium elements",
    "Studied Emania — design flow, features, section placement, premium elements",
    "Browsed ALL other stores in the portfolio — not just the two highlighted",
    "Taken detailed notes — can answer specific questions about any section",
    "Prepared to explain what makes each store effective and why",
  ];
  const count = Object.values(checks).filter(Boolean).length;
  const canComplete = count >= items.length;

  return (
    <div className="content fade-up">
      <div className="ph-badge">📁 Day 7</div>
      <h1 className="ph-title">Portfolio Store Review</h1>
      <p className="ph-intro">
        Today you study our official portfolio inside out. Your <strong style={{ color: "var(--gold-light)" }}>Second Interview is tomorrow</strong> — and it will include deep, specific questions about the stores below. This is your last task. Give it everything.
      </p>

      <RulesBlock title="⚠️ CRITICAL — Read Before You Begin" items={[
        "Go through the ENTIRE portfolio at portfolio.digitalheroes.co.in — not just the two highlighted stores",
        "Study Big Game Sports and Emania inside out — every section, every feature, every design decision",
        "The Second Interview will ask DEEP, specific questions about these stores — 'what section comes after the hero?' type questions",
        "Not knowing these stores thoroughly = failing the Second Interview — there is no shortcut here",
        "Take DETAILED notes — you will be questioned on specific sections and design choices",
        "Know WHY things are designed the way they are — not just WHAT they look like",
        "This is your LAST task before the final interview — prepare like it matters",
      ]} />

      <InstrBlock title="📋 How to Complete Day 7" items={[
        "Step 1: Open portfolio.digitalheroes.co.in and browse every store in the portfolio",
        "Step 2: Open Big Game Sports — go through it section by section, top to bottom, on both desktop and mobile",
        "Step 3: Open Emania — repeat the same thorough process",
        "Step 4: For each store, write notes covering all 4 focus areas below",
        "Step 5: Review your notes and make sure you can speak confidently about every section",
      ]} />

      {/* Portfolio link — prominent */}
      <a href="https://portfolio.digitalheroes.co.in/" target="_blank" rel="noreferrer"
        style={{ display: "flex", alignItems: "center", gap: 14, background: "linear-gradient(135deg,rgba(201,162,39,.1),rgba(201,162,39,.04))", border: "1px solid rgba(201,162,39,.35)", borderRadius: 13, padding: "18px 22px", textDecoration: "none", marginBottom: 20, transition: "all .2s" }}
        onMouseOver={e => e.currentTarget.style.borderColor = "var(--gold)"}
        onMouseOut={e => e.currentTarget.style.borderColor = "rgba(201,162,39,.35)"}
      >
        <div style={{ fontSize: 32 }}>🌐</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 15 }}>DMH Official Portfolio</div>
          <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 3 }}>portfolio.digitalheroes.co.in — Browse every store, not just the two highlighted</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", background: "rgba(201,162,39,.12)", padding: "8px 16px", borderRadius: 8 }}>Open ↗</div>
      </a>

      {/* Priority stores */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>🎯 Priority Stores — Study These in Full Detail</div>
        {stores.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(5,26,15,.7)", border: "1px solid rgba(13,74,37,.8)", borderRadius: 12, padding: "16px 20px", marginBottom: 10, textDecoration: "none", transition: "all .2s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = "var(--grn-tx)"}
            onMouseOut={e => e.currentTarget.style.borderColor = "rgba(13,74,37,.8)"}
          >
            <div style={{ fontSize: 28 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "var(--grn-tx)", fontSize: 15 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "rgba(74,222,128,.6)", marginTop: 3 }}>{s.desc}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--grn-tx)", background: "rgba(74,222,128,.1)", padding: "7px 14px", borderRadius: 7 }}>Visit Store ↗</div>
          </a>
        ))}
      </div>

      {/* 4 Focus Areas */}
      <div className="submit-card" style={{ marginBottom: 20 }}>
        <div className="sc-title">🔍 For Each Store — Observe & Note These 4 Things</div>
        <div className="grid-2col focus-grid" style={{ gap: 12 }}>
          {focusAreas.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "14px 15px" }}>
              <div style={{ fontSize: 20, marginBottom: 7 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: "var(--white)", fontSize: 13.5, marginBottom: 6 }}>{f.label}</div>
              <div style={{ fontSize: 12.5, color: "var(--dim)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: "11px 14px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, fontSize: 13, color: "#fca5a5", lineHeight: 1.6 }}>
          🚨 <strong>Interview warning:</strong> You will be asked questions like "What section comes after the hero on Big Game Sports?" and "What makes Emania feel premium?" — prepare to answer these without hesitation.
        </div>
      </div>

      {isDone ? <DoneBanner phase="Day 7" /> : (
        <>
          <div className="checklist">
            <div className="cl-title">✅ Review Completion Checklist</div>
            {items.map((item, i) => <CB key={i} label={item} checked={!!checks[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canComplete && <div className="lock-warn"><span>⚠️</span>Complete all {items.length} items to unlock the Second Interview ({count}/{items.length} done)</div>}
          <CompletionSection label="Mark Day 7 Complete — Unlock Second Interview 🔓" disabled={!canComplete} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Day 7 — Portfolio Review" />
        </>
      )}
      <NoteBottom>Complete this today — your Second Interview is scheduled for tomorrow. Give it everything you have! 🚀</NoteBottom>
    </div>
  );
}

function FinalPhase({ S: appState, U: setAppState, onComplete, trainee }) {
  const isDone = (appState.completedPhases || []).includes("FINAL");
  const tech = appState.finalTech || {};
  const toggle = i => setAppState(s => ({ ...s, finalTech: { ...tech, [i]: !tech[i] } }));
  const [confirmed, setConfirmed] = useState(appState.finalConfirmed || false);
  const techItems = ["Microphone tested and working perfectly", "Internet connection stable", "Laptop with camera ready — on throughout", "Quiet, distraction-free environment", "All notes from ALL 7 days ready for reference", "Both portfolio stores reviewed and memorized"];
  const allTopics = ["All 10 Day 1 training videos — every concept and workflow", "Shopify basics, Sales SOP, client handling process", "Client chat analysis — all 10 chats from Days 3 & 4", "Shopify Theme Research — all 10 themes from Day 5", "Top Branded Shopify Stores — all 10 brands from Day 6", "Big Game Sports portfolio store — every detail", "Imania portfolio store — every detail", "Your Shopify practice store", "Your Anti-Gravity website"];
  const count = Object.values(tech).filter(Boolean).length;
  const canConfirm = count >= techItems.length;
  const canComplete = confirmed || appState.finalConfirmed;
  const handleConfirm = () => { setAppState(s => ({ ...s, finalConfirmed: true })); setConfirmed(true); };

  return (
    <div className="content fade-up">
      <div className="ph-badge">🏆 Second Interview</div>
      <h1 className="ph-title" style={{ background: "linear-gradient(90deg,#c9a227,#f0d060,#c9a227)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Prove Your Worth</h1>
      <p className="ph-intro">Congratulations on completing all 7 days! 🎉 This is your final step before officially joining the <strong style={{ color: "var(--gold-light)" }}>Digital Marketing Heroes Sales Team.</strong></p>

      <RulesBlock title="⚠️ SECOND INTERVIEW RULES — Non-Negotiable" items={[
        "Minimum 80% accuracy required — below this you do NOT join the team, period",
        "Be on time — there will be ZERO tolerance for lateness",
        "Camera ON, microphone crystal clear — unclear audio = immediate rescheduling",
        "This interview covers ALL content from ALL 7 days — prepare everything",
        "Deep specific questions will be asked about BOTH portfolio stores",
        "You get ONE chance — be 100% prepared before confirming readiness",
        "This is your last opportunity — do not waste it by being underprepared",
      ]} />

      <div className="submit-card" style={{ marginBottom: 18 }}>
        <div className="sc-title">📋 Everything You Will Be Tested On</div>
        {allTopics.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 13.5, color: "var(--dim)" }}>
            <span style={{ color: "var(--gold)", fontSize: 13 }}>◆</span>{item}
          </div>
        ))}
      </div>

      {isDone ? (
        <div>
          <DoneBanner phase="Second Interview" />
          <div style={{ textAlign: "center", marginTop: 32, padding: "0 20px" }}>
            <div style={{ fontSize: 56, animation: "float 3s infinite" }}>🏆</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--gold-light)", marginTop: 16 }}>Congratulations!</div>
            <p style={{ color: "var(--dim)", fontSize: 15, marginTop: 8, lineHeight: 1.7 }}>You've completed the entire 7-day training program.<br />Welcome to the Digital Marketing Heroes Sales Team!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="checklist">
            <div className="cl-title">🖥️ Technical Checklist — Complete BEFORE the Interview</div>
            {techItems.map((item, i) => <CB key={i} label={item} checked={!!tech[i]} onChange={() => toggle(i)} />)}
          </div>
          {!canConfirm && <div className="lock-warn"><span>⚠️</span>Complete all {techItems.length} technical checks to activate the button ({count}/{techItems.length} done)</div>}
          {canComplete ? (
            <>
              <div className="ok-box" style={{ marginBottom: 14 }}><span>✅</span><span>Readiness confirmed! This is your moment — go show them what you are made of! 🚀</span></div>
              <CompletionSection label="Mark Second Interview Complete — Finish Program 🏆" disabled={false} isDone={isDone} onClick={onComplete} trainee={trainee} phaseLabel="Second Interview" />
            </>
          ) : (
            <button className="btn-final" style={!canConfirm ? { opacity: .35, cursor: "not-allowed", animation: "none" } : {}} onClick={canConfirm ? handleConfirm : undefined}>
              I Am Ready for My Second Interview 🚀
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────

function WelcomeScreen({ onLogin }) {
  const [name, setName] = useState(""); const [code, setCode] = useState(""); const [error, setError] = useState(""); const [shake, setShake] = useState(false);
  const doLogin = () => {
    if (!name.trim()) { setError("Please enter your full name."); setShake(true); setTimeout(() => setShake(false), 500); return; }
    if (!code.trim()) { setError("Please enter your phase code."); setShake(true); setTimeout(() => setShake(false), 500); return; }
    const found = Object.entries(PHASE_CODES).find(([, v]) => v === code.trim().toUpperCase());
    if (!found) { setError("Invalid code. Please contact Sarthak."); setShake(true); setTimeout(() => setShake(false), 500); return; }
    onLogin(name.trim(), found[0]);
  };
  const steps = ["Initial Task", "Day 1", "Day 2 (Interview)", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Second Interview"];
  return (
    <div className="welcome-bg">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "clamp(28px,5vw,56px) clamp(14px,4vw,22px) 72px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }} className="fade-up">
          <div className="hero-badge" style={{ marginBottom: 22 }}>⭐ Sales Training Program</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px,6vw,70px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
            <span className="gold-text">Digital Marketing</span><br /><span style={{ color: "var(--white)" }}>Heroes</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,20px)", color: "var(--dim)", fontStyle: "italic" }}>"Your journey to becoming a top sales expert starts here."</p>
        </div>

        <div className="fade-up-1" style={{ background: "rgba(22,32,53,.7)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 18, padding: "28px 32px", marginBottom: 36, backdropFilter: "blur(10px)" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--gold-light)", marginBottom: 14 }}>About This Program</h2>
          <p style={{ color: "var(--dim)", lineHeight: 1.8, fontSize: 14.5 }}>
            The <strong style={{ color: "var(--white)" }}>Digital Marketing Heroes Sales Training Program</strong> is a structured 7-day intensive that transforms you into a high-performing Shopify sales professional. You'll master client handling, market research, the complete DMH sales workflow, and everything needed to close deals and build lasting client relationships. <strong style={{ color: "var(--gold-light)" }}>Each phase must be completed before the next unlocks.</strong>
          </p>
          <div style={{ display: "flex", gap: 28, marginTop: 22, flexWrap: "wrap" }}>
            {[["7","Days"],["10","Training Videos"],["9","Total Phases"],["80%","Pass Mark"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "var(--gold)", fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up-2" style={{ marginBottom: 44 }}>
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 18 }}>Program Timeline</div>
          <div className="timeline">
            {steps.map((s, i) => (
              <div className="tl-step" key={i}>
                <div className="tl-badge">{s}</div>
                {i < steps.length - 1 && <span className="tl-arrow">→</span>}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--gold-dim)", fontSize: 12.5, marginTop: 14 }}>Each phase must be completed before the next unlocks. Admin gives each code only after confirming completion.</p>
        </div>

        <div className="fade-up-3">
          <div className="login-card" style={{ animation: shake ? "shake .4s ease" : "none" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "var(--white)", marginBottom: 5 }}>Enter Your Portal</h2>
            <p style={{ color: "var(--dim)", fontSize: 13.5, marginBottom: 24 }}>Enter your name and the phase code from Sarthak to begin.</p>
            {error && <div className="err-box"><span>⚠️</span>{error}</div>}
            <div className="ig"><label className="lbl">Your Full Name</label><input className="inp" placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} /></div>
            <div className="ig"><label className="lbl">Phase Code</label><input className="inp" placeholder="e.g. DMH-DAY1" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} style={{ letterSpacing: ".08em", fontWeight: 600 }} /></div>
            <button className="btn-gold" onClick={doLogin} style={{ marginTop: 8 }}>Enter Training Portal →</button>
            <p style={{ textAlign: "center", color: "var(--dim)", fontSize: 12.5, marginTop: 14 }}>Don't have a code? Contact <strong style={{ color: "var(--gold-light)" }}>Sarthak</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────


function Dashboard({ trainee, unlockedPhaseKey, onLogout }) {
  const unlockedIdx = PHASES.findIndex(p => p.key === unlockedPhaseKey);
  const [appState, setAppState] = useState({ completedPhases: [] });
  const [activePhase, setActivePhase] = useState(unlockedPhaseKey);
  const completedPhases = appState.completedPhases || [];

  // Phase is viewable if all previous phases are completed.
  // The login code sets the starting phase; completing a phase unlocks the next automatically.
  const isViewable = (idx) => {
    if (idx === 0) return true;
    for (let i = 0; i < idx; i++) {
      if (!completedPhases.includes(PHASES[i].key)) return false;
    }
    return true;
  };

  const handleComplete = (phaseKey) => {
    setAppState(s => ({
      ...s,
      completedPhases: s.completedPhases.includes(phaseKey) ? s.completedPhases : [...s.completedPhases, phaseKey],
    }));
    const idx = PHASES.findIndex(p => p.key === phaseKey);
    const next = PHASES[idx + 1];
    if (next) setActivePhase(next.key);
  };

  const doneCount = completedPhases.length;
  const progress = Math.round((doneCount / PHASES.length) * 100);

  const renderContent = () => {
    const idx = PHASES.findIndex(p => p.key === activePhase);
    if (!isViewable(idx)) {
      const blocking = PHASES.find((p, i) => i < idx && !completedPhases.includes(p.key));
      return (
        <div className="locked-phase">
          <div style={{ fontSize: 56, marginBottom: 20 }}>🔒</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--white)", marginBottom: 12 }}>Phase Locked</div>
          <p style={{ color: "var(--dim)", fontSize: 15, maxWidth: 380, lineHeight: 1.7 }}>
            You must complete <strong style={{ color: "var(--gold-light)" }}>{blocking?.label}</strong> first before this phase unlocks.
          </p>
          <button
            onClick={() => setActivePhase(blocking.key)}
            style={{ marginTop: 22, background: "rgba(201,162,39,.1)", border: "1px solid rgba(201,162,39,.3)", borderRadius: 10, padding: "12px 24px", color: "var(--gold-light)", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
          >← Go to {blocking?.label}</button>
        </div>
      );
    }
    const onComplete = () => handleComplete(activePhase);
    const props = { S: appState, U: setAppState, onComplete, trainee };
    switch (activePhase) {
      case "INITIAL": return <InitialPhase {...props} />;
      case "DAY1":    return <Day1Phase    {...props} />;
      case "DAY2":    return <Day2Phase    {...props} />;
      case "DAY3":    return <ChatPhase    day={3} {...props} />;
      case "DAY4":    return <ChatPhase    day={4} {...props} />;
      case "DAY5":    return <Day5Phase    {...props} />;
      case "DAY6":    return <Day6Phase    {...props} />;
      case "DAY7":    return <Day7Phase    {...props} />;
      case "FINAL":   return <FinalPhase   {...props} />;
      default: return null;
    }
  };

  return (
    <div className="dash">
      <aside className="sbar">
        <div className="sbar-hdr">
          <div className="sbar-logo">Digital Marketing Heroes</div>
          <div className="sbar-sub">Sales Training Program</div>
        </div>
        <nav className="phase-nav">
          {PHASES.map((phase, idx) => {
            const viewable = isViewable(idx);
            const completedHere = completedPhases.includes(phase.key);
            const active = phase.key === activePhase;
            return (
              <div key={phase.key}
                className={`nav-item ${active ? "nav-active" : ""} ${!viewable ? "nav-locked" : ""}`}
                onClick={() => viewable && setActivePhase(phase.key)}
                title={!viewable ? "Complete previous phase first" : ""}
              >
                <div className="nav-icon">{phase.icon}</div>
                <div className="nav-label">{phase.label}</div>
                <div className="nav-status">{completedHere ? "✅" : !viewable ? "🔒" : active ? "🔵" : "○"}</div>
              </div>
            );
          })}
        </nav>
        <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <button onClick={onLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, padding: "10px 14px", color: "var(--dim)", fontSize: 12.5, cursor: "pointer", width: "100%", fontFamily: "'DM Sans',sans-serif" }}>← Exit Portal</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div className="topbar">
          <div className="tb-name">Welcome, <span style={{ color: "var(--gold-light)" }}>{trainee}</span>!</div>
          <div className="prog-wrap">
            <div className="prog-lbl"><span>Program Progress</span><span style={{ color: "var(--gold)" }}>{doneCount}/{PHASES.length} complete</span></div>
            <div className="prog-track"><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="mob-nav">
          {PHASES.map((phase, idx) => {
            const viewable = isViewable(idx);
            return (
              <button key={phase.key} className={`mob-btn ${phase.key === activePhase ? "active" : ""}`} onClick={() => viewable && setActivePhase(phase.key)} disabled={!viewable}>
                {!viewable ? "🔒" : phase.icon} {phase.short}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }}>{renderContent()}</div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(null);
  return (
    <>
      <S />
      {session
        ? <Dashboard trainee={session.name} unlockedPhaseKey={session.phaseKey} onLogout={() => setSession(null)} />
        : <WelcomeScreen onLogin={(name, phaseKey) => setSession({ name, phaseKey })} />
      }
    </>
  );
}
