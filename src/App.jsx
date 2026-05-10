import { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wpepsotmontkwnhtuyfs.supabase.co",
  "sb_publishable_UiLReVRAO5g0sm3fqoLZ2g_ijUk3rjV"
);

const GROUPS = {
  A: ["México", "Corea del Sur", "Sudáfrica", "Rep. Checa"],
  B: ["Canadá", "Suiza", "Qatar", "Bosnia-Herzegovina"],
  C: ["Brasil", "Marruecos", "Escocia", "Haití"],
  D: ["Estados Unidos", "Australia", "Paraguay", "Turquía"],
  E: ["Alemania", "Ecuador", "Costa de Marfil", "Curazao"],
  F: ["Países Bajos", "Japón", "Túnez", "Nueva Zelanda"],
  G: ["Bélgica", "Irán", "Egipto", "Arabia Saudita"],
  H: ["España", "Serbia", "Ghana", "Cabo Verde"],
  I: ["Francia", "Uruguay", "Senegal", "Iraq"],
  J: ["Argentina", "Argelia", "Austria", "Jordania"],
  K: ["Portugal", "Colombia", "DR Congo", "Uzbekistán"],
  L: ["Inglaterra", "Croacia", "Noruega", "Camerún"],
};

const FLAGS = {
  "México": "🇲🇽", "Corea del Sur": "🇰🇷", "Sudáfrica": "🇿🇦", "Rep. Checa": "🇨🇿",
  "Canadá": "🇨🇦", "Suiza": "🇨🇭", "Qatar": "🇶🇦", "Bosnia-Herzegovina": "🇧🇦",
  "Brasil": "🇧🇷", "Marruecos": "🇲🇦", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Haití": "🇭🇹",
  "Estados Unidos": "🇺🇸", "Australia": "🇦🇺", "Paraguay": "🇵🇾", "Turquía": "🇹🇷",
  "Alemania": "🇩🇪", "Ecuador": "🇪🇨", "Costa de Marfil": "🇨🇮", "Curazao": "🇨🇼",
  "Países Bajos": "🇳🇱", "Japón": "🇯🇵", "Túnez": "🇹🇳", "Nueva Zelanda": "🇳🇿",
  "Bélgica": "🇧🇪", "Irán": "🇮🇷", "Egipto": "🇪🇬", "Arabia Saudita": "🇸🇦",
  "España": "🇪🇸", "Serbia": "🇷🇸", "Ghana": "🇬🇭", "Cabo Verde": "🇨🇻",
  "Francia": "🇫🇷", "Uruguay": "🇺🇾", "Senegal": "🇸🇳", "Iraq": "🇮🇶",
  "Argentina": "🇦🇷", "Argelia": "🇩🇿", "Austria": "🇦🇹", "Jordania": "🇯🇴",
  "Portugal": "🇵🇹", "Colombia": "🇨🇴", "DR Congo": "🇨🇩", "Uzbekistán": "🇺🇿",
  "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croacia": "🇭🇷", "Noruega": "🇳🇴", "Camerún": "🇨🇲",
};

const STICKERS_PER_TEAM = 20;

const initialState = () => {
  const state = {};
  Object.values(GROUPS).flat().forEach(team => {
    state[team] = new Array(STICKERS_PER_TEAM).fill(false);
  });
  return state;
};

const GROUP_COLORS = {
  A: "#e63946", B: "#457b9d", C: "#2d6a4f", D: "#e76f51",
  E: "#7b2d8b", F: "#c77dff", G: "#f4a261", H: "#2a9d8f",
  I: "#e9c46a", J: "#264653", K: "#6d6875", L: "#b5838d",
};

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0e6d3", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "rgba(255,255,255,0.1)", padding: "40px", borderRadius: "12px", width: "300px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#ffd700" }}>{isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "none" }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "none" }}
          />
          {authError && <p style={{ color: "red", marginBottom: "10px" }}>{authError}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", background: "#ffd700", color: "#1a1a00", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            {loading ? "Cargando..." : isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>
        <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: "10px", background: "none", color: "#ffd700", border: "none", cursor: "pointer" }}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
}

export default function PaniniTracker() {
  const [collected, setCollected] = useState(initialState);
  const [expandedTeams, setExpandedTeams] = useState({});
  const [filterGroup, setFilterGroup] = useState("ALL");
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase.from("Figuritas").select("*").eq("user_id", user.id);
      if (error) { console.error(error); setLoading(false); return; }
      if (data && data.length > 0) {
        const newState = initialState();
        data.forEach(row => {
          if (newState[row.team]) newState[row.team] = JSON.parse(row.stickers);
        });
        setCollected(newState);
      }
      setLoading(false);
    };
    if (user) loadData();
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const saveToSupabase = async (team, stickers) => {
    setSaving(true);
    await supabase.from("Figuritas").upsert(
      { team, stickers: JSON.stringify(stickers), user_id: user.id },
      { onConflict: ["team", "user_id"] }
    );
    setSaving(false);
  };

  const toggle = useCallback((team, idx) => {
    setCollected(prev => {
      const updated = { ...prev, [team]: [...prev[team]] };
      updated[team][idx] = !updated[team][idx];
      saveToSupabase(team, updated[team]);
      return updated;
    });
  }, []);

  const toggleTeam = (team) => {
    setExpandedTeams(prev => ({ ...prev, [team]: !prev[team] }));
  };

  const toggleAllTeam = (team) => {
    setCollected(prev => {
      const all = prev[team].every(Boolean);
      const newStickers = new Array(STICKERS_PER_TEAM).fill(!all);
      saveToSupabase(team, newStickers);
      return { ...prev, [team]: newStickers };
    });
  };

  const totalStickers = 48 * STICKERS_PER_TEAM;
  const totalCollected = Object.values(collected).flat().filter(Boolean).length;
  const pct = Math.round((totalCollected / totalStickers) * 100);

  const groups = filterGroup === "ALL"
    ? Object.entries(GROUPS)
    : Object.entries(GROUPS).filter(([g]) => g === filterGroup);

  const exportAndPrint = (collectedState) => {
    const rows = Object.entries(GROUPS).map(([groupKey, teams]) => {
      const teamRows = teams.map(team => {
        const stickers = collectedState[team].map((has, i) =>
          `<span class="stk ${has ? "got" : ""}">${i + 1}</span>`
        ).join("");
        const cnt = collectedState[team].filter(Boolean).length;
        return `<tr><td class="team-cell">${FLAGS[team] || ""} ${team}</td><td>${stickers}</td><td class="count-cell">${cnt}/20</td></tr>`;
      }).join("");
      return `<tr class="group-row"><td colspan="3">GRUPO ${groupKey}</td></tr>${teamRows}`;
    }).join("");
    const total = Object.values(collectedState).flat().filter(Boolean).length;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Panini Mundial 2026</title>
    <style>body{font-family:Arial,sans-serif;font-size:11px;margin:20px;color:#111}h1{text-align:center;font-size:20px;margin-bottom:4px}.sub{text-align:center;color:#555;margin-bottom:16px;font-size:12px}table{width:100%;border-collapse:collapse}td{padding:4px 6px;border-bottom:1px solid #eee;vertical-align:middle}.group-row td{background:#1a1a3e;color:white;font-weight:bold;font-size:12px;padding:6px 8px;letter-spacing:2px}.team-cell{width:160px;font-weight:bold;white-space:nowrap}.count-cell{width:40px;text-align:right;color:#888}.stk{display:inline-block;width:22px;height:22px;border:1px solid #ccc;border-radius:4px;text-align:center;line-height:22px;margin:1px;font-size:10px;color:#bbb}.stk.got{background:#ffd700;border-color:#ffd700;color:#333;font-weight:bold}</style></head>
    <body><h1>🏆 PANINI · COPA MUNDIAL FIFA 2026</h1>
    <div class="sub">${total} / 960 figuritas (${Math.round(total/960*100)}%)</div>
    <table>${rows}</table></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const resetAll = async () => {
    if (confirm("¿Resetear todo el progreso?")) {
      setCollected(initialState());
      await supabase.from("figuritas").delete().neq("team", "");
    }
  };

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffd700", fontFamily: "Georgia, serif", fontSize: 20 }}>
      Cargando autenticación...
    </div>
  );

  if (!user) return <Auth />;

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffd700", fontFamily: "Georgia, serif", fontSize: 20 }}>
      Cargando tu álbum... 🏆
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", minHeight: "100vh", background: "linear-gradient(135deg,#0a0a1a 0%,#0d1b3e 40%,#1a0a2e 100%)", color: "#f0e6d3", padding: "0 0 60px 0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        .sticker-btn { width:36px;height:36px;border-radius:6px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;font-family:'Lato',sans-serif; }
        .sticker-btn:hover { transform:scale(1.1);border-color:rgba(255,255,255,0.5); }
        .sticker-btn.collected { background:linear-gradient(135deg,#ffd700,#ffaa00);border-color:#ffd700;color:#1a1a00;box-shadow:0 0 8px rgba(255,215,0,0.5); }
        .team-card { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;margin-bottom:10px;overflow:hidden;transition:all 0.2s ease; }
        .team-card:hover { background:rgba(255,255,255,0.06); }
        .team-header { display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;user-select:none; }
        .progress-mini { height:4px;background:rgba(255,255,255,0.1);border-radius:2px;flex:1;overflow:hidden; }
        .progress-fill { height:100%;border-radius:2px;transition:width 0.3s ease; }
        .filter-btn { padding:6px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.7);cursor:pointer;font-size:13px;font-family:'Lato',sans-serif;font-weight:700;transition:all 0.15s;letter-spacing:0.5px; }
        .filter-btn.active { background:#ffd700;color:#1a1a00;border-color:#ffd700; }
        .filter-btn:hover:not(.active) { border-color:rgba(255,255,255,0.5); }
        .group-header { display:flex;align-items:center;gap:12px;padding:8px 0 14px 0; }
      `}</style>

      <div style={{ background:"linear-gradient(180deg,#0a0a2e 0%,#1a1050 100%)", borderBottom:"3px solid #ffd700", padding:"28px 20px 24px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:10, left:16 }}>
          <button onClick={() => supabase.auth.signOut()} style={{ padding:"5px 12px", borderRadius:20, border:"1px solid rgba(255,255,255,0.3)", background:"transparent", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontFamily:"'Lato',sans-serif", fontSize:12 }}>Cerrar Sesión</button>
        </div>
        {saving && <div style={{ position:"absolute", top:10, right:16, fontSize:11, color:"#ffd700", fontFamily:"'Lato',sans-serif" }}>💾 Guardando...</div>}
        <div style={{ fontSize:13, color:"#ffd700", letterSpacing:4, fontFamily:"'Lato',sans-serif", fontWeight:700, marginBottom:6, textTransform:"uppercase" }}>🏆 Copa Mundial de la FIFA™</div>
        <div style={{ fontFamily:"'Oswald',serif", fontSize:"clamp(28px,7vw,52px)", fontWeight:700, letterSpacing:2, lineHeight:1 }}>PANINI 2026</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontFamily:"'Lato',sans-serif", marginTop:6, letterSpacing:1 }}>RASTREADOR DE FIGURITAS · USA · MÉXICO · CANADÁ</div>
        <div style={{ maxWidth:500, margin:"20px auto 0", padding:"0 10px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily:"'Lato',sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)" }}>{totalCollected} / {totalStickers} figuritas</span>
            <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, color:"#ffd700", fontWeight:700 }}>{pct}%</span>
          </div>
          <div style={{ height:10, background:"rgba(255,255,255,0.1)", borderRadius:5, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:5, width:`${pct}%`, background:"linear-gradient(90deg,#ffd700,#ff8c00)", transition:"width 0.4s ease", boxShadow:"0 0 12px rgba(255,215,0,0.6)" }} />
          </div>
          <div style={{ textAlign:"center", marginTop:8, fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Lato',sans-serif" }}>
            Te faltan <strong style={{ color:"#ff8c00" }}>{totalStickers - totalCollected}</strong> figuritas para completar el álbum
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 16px 0", maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Lato',sans-serif", marginRight:4, textTransform:"uppercase", letterSpacing:1 }}>Grupo:</span>
          <button className={`filter-btn ${filterGroup==="ALL"?"active":""}`} onClick={() => setFilterGroup("ALL")}>TODOS</button>
          {Object.keys(GROUPS).map(g => (
            <button key={g} className={`filter-btn ${filterGroup===g?"active":""}`} onClick={() => setFilterGroup(g)}>{g}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", fontFamily:"'Lato',sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)" }}>
            <input type="checkbox" checked={showOnlyMissing} onChange={e => setShowOnlyMissing(e.target.checked)} />
            Solo equipos incompletos
          </label>
          <button onClick={() => exportAndPrint(collected)} style={{ marginLeft:"auto", padding:"7px 18px", borderRadius:20, border:"1px solid rgba(255,255,255,0.3)", background:"transparent", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontFamily:"'Lato',sans-serif", fontSize:13 }}>🖨️ Imprimir</button>
          <button onClick={resetAll} style={{ padding:"7px 18px", borderRadius:20, border:"1px solid rgba(255,80,80,0.4)", background:"transparent", color:"rgba(255,120,120,0.7)", cursor:"pointer", fontFamily:"'Lato',sans-serif", fontSize:13 }}>🗑️ Reset</button>
        </div>
      </div>

      <div style={{ padding:"10px 16px 0", maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:16, fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Lato',sans-serif" }}>
          <span>⬜ = Falta</span>
          <span style={{ color:"#ffd700" }}>🟨 = Tengo</span>
          <span>· Guardado automático en la nube ☁️</span>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"16px 16px 0" }}>
        {groups.map(([groupKey, teams]) => {
          const color = GROUP_COLORS[groupKey];
          const filteredTeams = showOnlyMissing ? teams.filter(t => !collected[t].every(Boolean)) : teams;
          if (filteredTeams.length === 0) return null;
          return (
            <div key={groupKey} style={{ marginBottom:28 }}>
              <div className="group-header">
                <div style={{ width:40, height:40, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald',serif", fontSize:18, fontWeight:700, color:"white", flexShrink:0, boxShadow:`0 0 16px ${color}88` }}>{groupKey}</div>
                <div style={{ fontFamily:"'Oswald',serif", fontSize:20, letterSpacing:2, color }}>GRUPO {groupKey}</div>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${color}44,transparent)` }} />
                <div style={{ fontFamily:"'Lato',sans-serif", fontSize:12, color:"rgba(255,255,255,0.4)" }}>{teams.reduce((s,t) => s+collected[t].filter(Boolean).length,0)} / {teams.length*STICKERS_PER_TEAM}</div>
              </div>
              {filteredTeams.map(team => {
                const cnt = collected[team].filter(Boolean).length;
                const teamPct = Math.round((cnt/STICKERS_PER_TEAM)*100);
                const isExpanded = expandedTeams[team] !== false;
                return (
                  <div key={team} className="team-card">
                    <div className="team-header" onClick={() => toggleTeam(team)}>
                      <span style={{ fontSize:22 }}>{FLAGS[team]||"🏳"}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"'Oswald',serif", fontSize:16, letterSpacing:1, marginBottom:5 }}>{team}</div>
                        <div className="progress-mini">
                          <div className="progress-fill" style={{ width:`${teamPct}%`, background:cnt===STICKERS_PER_TEAM?"linear-gradient(90deg,#00c851,#00e676)":`linear-gradient(90deg,${color},${color}99)` }} />
                        </div>
                      </div>
                      <div style={{ fontFamily:"'Lato',sans-serif", fontSize:12, color:cnt===STICKERS_PER_TEAM?"#00e676":"rgba(255,255,255,0.5)", minWidth:50, textAlign:"right" }}>{cnt===STICKERS_PER_TEAM?"✅ COMPLETO":`${cnt}/${STICKERS_PER_TEAM}`}</div>
                      <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12, marginLeft:4 }}>{isExpanded?"▲":"▼"}</span>
                    </div>
                    {isExpanded && (
                      <div style={{ padding:"0 16px 14px" }}>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                          {collected[team].map((has,i) => (
                            <button key={i} className={`sticker-btn ${has?"collected":""}`} onClick={() => toggle(team,i)} title={has?`Figurita ${i+1} — Tenés`:`Figurita ${i+1} — Falta`}>{i+1}</button>
                          ))}
                        </div>
                        <button onClick={() => toggleAllTeam(team)} style={{ padding:"5px 14px", borderRadius:14, border:`1px solid ${color}66`, background:"transparent", color:`${color}cc`, cursor:"pointer", fontFamily:"'Lato',sans-serif", fontSize:12, fontWeight:700 }}>
                          {collected[team].every(Boolean)?"Desmarcar todo":"Marcar todo"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign:"center", padding:"30px 16px 0", fontFamily:"'Lato',sans-serif", fontSize:11, color:"rgba(255,255,255,0.2)", letterSpacing:1 }}>
        PANINI WORLD CUP 2026 · 48 SELECCIONES · 960 FIGURITAS TOTALES
      </div>
    </div>
  );
}
