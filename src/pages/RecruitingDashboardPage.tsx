import { useEffect } from "react";

const RecruitingDashboardPage = () => {
  useEffect(() => {
    document.title = "Recruiting Ad Performance – Dashboard";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8] text-slate-900 antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Side Navigation ── */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#136dec] flex items-center justify-center text-white">
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>rocket_launch</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">RecruitFlow</h1>
              <p className="text-xs text-slate-500 font-medium">Analytics Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#136dec]/10 text-[#136dec] font-semibold" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>dashboard</span>
            <span className="text-sm">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>campaign</span>
            <span className="text-sm">Kampagnen</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>ads_click</span>
            <span className="text-sm">Anzeigenquellen</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>group</span>
            <span className="text-sm">Kandidaten</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>monitoring</span>
            <span className="text-sm">ROI-Berichte</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
            <span className="text-sm">Einstellungen</span>
          </a>
          <div className="flex items-center gap-3 px-3 py-4 mt-2 border-t border-slate-100">
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">MK</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Marie Koch</p>
              <p className="text-xs text-slate-500 truncate">HR Marketing Lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recruiting Ad Performance</h2>
            <p className="text-sm text-slate-500 mt-0.5">Aktualisiert vor 12 Minuten</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button className="px-4 py-2 text-sm font-semibold rounded-md bg-white shadow-sm border border-slate-200">Letzte 30 Tage</button>
              <button className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Letzte 90 Tage</button>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 cursor-pointer">
              <span className="material-symbols-outlined text-slate-500" style={{ fontSize: 18 }}>calendar_month</span>
              <span className="text-sm font-medium">01.01.2025 – 31.01.2025</span>
            </div>
            <button className="bg-[#136dec] text-white text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1060d4] transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              PDF Export
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-8">

          {/* ── KPI Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { label: "Ad Spend", value: "€8.450", change: "+12%", up: true, color: "bg-[#136dec]", pct: 65 },
              { label: "Bewerbungen", value: "264", change: "+18%", up: true, color: "bg-[#136dec]", pct: 78 },
              { label: "Qualifiziert", value: "87", change: "+9%", up: true, color: "bg-blue-400", pct: 55 },
              { label: "Gespräche", value: "34", change: "+21%", up: true, color: "bg-violet-500", pct: 62 },
              { label: "Einstellungen", value: "12", change: "+33%", up: true, color: "bg-emerald-500", pct: 80 },
              { label: "Kosten / Hire", value: "€704", change: "-8%", up: false, color: "bg-emerald-500", pct: 40, accent: true },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow ${kpi.accent ? "border-l-4 border-l-[#136dec]" : ""}`}
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${kpi.up ? "text-emerald-600 bg-emerald-50" : "text-emerald-600 bg-emerald-50"}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      {kpi.up ? "trending_up" : "arrow_downward"}
                    </span>
                    {kpi.change}
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${kpi.color} rounded-full`} style={{ width: `${kpi.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Chart + Funnel Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Bewerbungen & Einstellungen pro Woche</h3>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-slate-300"></span>
                    <span className="text-xs font-medium text-slate-500">Impressionen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-blue-300"></span>
                    <span className="text-xs font-medium text-slate-500">Bewerbungen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#136dec]"></span>
                    <span className="text-xs font-medium text-slate-500">Einstellungen</span>
                  </div>
                </div>
              </div>

              <div className="relative h-72 w-full bg-slate-50 rounded-lg flex items-end px-6 gap-3 overflow-hidden border border-slate-100">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="border-t border-slate-200 w-full"></div>
                  ))}
                </div>

                {[
                  { label: "KW 1", imp: 128, bew: 40, ein: 12 },
                  { label: "KW 2", imp: 160, bew: 56, ein: 16 },
                  { label: "KW 3", imp: 192, bew: 80, ein: 24 },
                  { label: "KW 4", imp: 144, bew: 48, ein: 20 },
                  { label: "KW 5", imp: 208, bew: 72, ein: 32 },
                  { label: "KW 6", imp: 176, bew: 64, ein: 24 },
                  { label: "KW 7", imp: 152, bew: 56, ein: 16 },
                ].map((w) => (
                  <div key={w.label} className="flex-1 flex flex-col justify-end gap-1 group pb-8">
                    <div className="w-full bg-slate-300 rounded-t group-hover:bg-slate-400 transition-colors" style={{ height: w.imp }}></div>
                    <div className="w-full bg-blue-300 rounded-t group-hover:bg-blue-400 transition-colors" style={{ height: w.bew }}></div>
                    <div className="w-full bg-[#136dec] rounded-t" style={{ height: w.ein }}></div>
                    <span className="text-xs text-slate-500 mt-3 text-center font-semibold">{w.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiting Funnel */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">Recruiting Funnel</h3>
                <span className="material-symbols-outlined text-slate-400 cursor-help" style={{ fontSize: 20 }}>info</span>
              </div>

              <div className="flex-1 space-y-3">
                {[
                  { label: "Ad Impressionen", value: "420.000", pct: "100%", pctColor: "text-slate-700", barPct: 100, barColor: "bg-slate-400" },
                  { label: "Klicks zur Seite", value: "8.240", pct: "2,0%", pctColor: "text-amber-600", barPct: 60, barColor: "bg-blue-300" },
                  { label: "Bewerbungen", value: "264", pct: "3,2%", pctColor: "text-blue-600", barPct: 42, barColor: "bg-[#136dec]" },
                  { label: "Qualifizierte Kandidaten", value: "87", pct: "33%", pctColor: "text-violet-600", barPct: 28, barColor: "bg-violet-400" },
                  { label: "Bewerbungsgespräche", value: "34", pct: "39%", pctColor: "text-orange-600", barPct: 18, barColor: "bg-orange-400" },
                  { label: "Einstellungen", value: "12", pct: "35%", pctColor: "text-emerald-600", barPct: 10, barColor: "bg-emerald-500" },
                ].map((step, i) => (
                  <div key={step.label}>
                    {/* Arrow between steps */}
                    {i > 0 && (
                      <div className="flex justify-center -mt-1 mb-1">
                        <span className="material-symbols-outlined text-slate-300" style={{ fontSize: 16 }}>arrow_downward</span>
                      </div>
                    )}
                    <div className="flex justify-between items-end mb-1.5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{step.label}</p>
                      <p className={`text-sm font-bold ${step.pctColor}`}>{step.pct}</p>
                    </div>
                    <div className="h-10 w-full bg-slate-100 rounded-lg relative overflow-hidden flex items-center">
                      <div
                        className={`absolute inset-y-0 left-0 ${step.barColor} rounded-lg transition-all`}
                        style={{ width: `${step.barPct}%` }}
                      ></div>
                      <span className={`relative z-10 text-sm font-bold px-4 ${step.barPct > 30 ? "text-white" : "text-slate-700"}`}>
                        {step.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2 text-rose-500">
                  <span className="material-symbols-outlined mt-0.5" style={{ fontSize: 18 }}>warning</span>
                  <p className="text-sm font-medium leading-snug">Absprungrate bei Formularschritt 2 ("Erfahrung") erhöht – 42% brechen ab.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Anzeigenquellen Tabelle ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Anzeigenquellen – Übersicht</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-52 focus:ring-[#136dec] focus:border-[#136dec] outline-none"
                    placeholder="Quelle suchen..."
                    type="text"
                    readOnly
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400" style={{ fontSize: 18 }}>search</span>
                </div>
                <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-500" style={{ fontSize: 18 }}>tune</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Anzeigenquelle</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ausgaben</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Bewerbungen</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Qualifiziert</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Gespräche</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Einstellungen</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">CPH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "LinkedIn Ads", icon: "work", iconBg: "bg-blue-50", iconColor: "text-blue-600", status: "Aktiv", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100", spend: "€4.280", bew: "142", qual: "52", gesp: "21", ein: "7", perfPct: 85, cph: "€611" },
                    { name: "Meta Kampagnen", icon: "groups", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", status: "Aktiv", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100", spend: "€2.680", bew: "82", qual: "24", gesp: "9", ein: "3", perfPct: 52, cph: "€893" },
                    { name: "Indeed Sponsored", icon: "person_search", iconBg: "bg-purple-50", iconColor: "text-purple-600", status: "Aktiv", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100", spend: "€980", bew: "28", qual: "8", gesp: "3", ein: "1", perfPct: 40, cph: "€980" },
                    { name: "Google Search", icon: "search", iconBg: "bg-red-50", iconColor: "text-red-600", status: "Pausiert", statusColor: "bg-slate-50 text-slate-400 border-slate-200", spend: "€510", bew: "12", qual: "3", gesp: "1", ein: "1", perfPct: 22, cph: "€510" },
                  ].map((src) => (
                    <tr key={src.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-lg ${src.iconBg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${src.iconColor}`} style={{ fontSize: 18 }}>{src.icon}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">{src.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${src.statusColor}`}>{src.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-slate-600">{src.spend}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{src.bew}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{src.qual}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{src.gesp}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-emerald-600">{src.ein}</td>
                      <td className="px-6 py-4 w-44">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#136dec] rounded-full" style={{ width: `${src.perfPct}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 w-8 text-right">{src.perfPct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{src.cph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">Performance der Top 4 Quellen · CPH = Cost per Hire</p>
              <a className="text-xs font-bold text-[#136dec] hover:underline" href="#">Alle Kanäle anzeigen</a>
            </div>
          </div>

          {/* ── Einzelne Anzeigen – Funnel-Tracking ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Einzelne Anzeigen – Funnel-Tracking</h3>
                <p className="text-sm text-slate-500 mt-0.5">Welche Anzeige bringt Leads und tatsächliche Einstellungen?</p>
              </div>
              <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button className="px-4 py-2 text-xs font-semibold rounded-md bg-white shadow-sm border border-slate-200">Alle</button>
                <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700">Mit Einstellungen</button>
                <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700">Ohne Ergebnis</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Anzeige</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Quelle</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ausgaben</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Klicks</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Bewerbungen</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Qualifiziert</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Gespräche</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Einst.</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Funnel</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">CPH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { title: "Senior React Dev – München", desc: 'Carousel · "Werde Teil unseres Teams"', src: "LinkedIn", srcIcon: "work", srcBg: "bg-blue-50", srcColor: "text-blue-600", spend: "€1.840", klicks: "1.420", bew: "48", qual: "22", gesp: "9", ein: 3, cph: "€613", highlight: true, funnel: [100, 100, 46, 41, 33] },
                    { title: "DevOps Engineer – Remote", desc: 'Single Image · "100% Remote möglich"', src: "LinkedIn", srcIcon: "work", srcBg: "bg-blue-50", srcColor: "text-blue-600", spend: "€1.260", klicks: "980", bew: "38", qual: "14", gesp: "6", ein: 2, cph: "€630", highlight: true, funnel: [100, 100, 37, 43, 33] },
                    { title: "Fullstack Dev – Hamburg", desc: 'Video · "Ein Tag bei uns im Office"', src: "Meta", srcIcon: "groups", srcBg: "bg-indigo-50", srcColor: "text-indigo-600", spend: "€1.480", klicks: "2.180", bew: "42", qual: "12", gesp: "5", ein: 2, cph: "€740", highlight: true, funnel: [100, 100, 29, 42, 40] },
                    { title: "Backend Entwickler – Frankfurt", desc: 'Single Image · "Dein nächster Karriereschritt"', src: "LinkedIn", srcIcon: "work", srcBg: "bg-blue-50", srcColor: "text-blue-600", spend: "€1.180", klicks: "890", bew: "56", qual: "16", gesp: "6", ein: 2, cph: "€590", highlight: true, funnel: [100, 100, 29, 38, 33] },
                    { title: "Frontend Dev – Berlin", desc: 'Carousel · "Gestalte die Zukunft"', src: "Meta", srcIcon: "groups", srcBg: "bg-indigo-50", srcColor: "text-indigo-600", spend: "€1.200", klicks: "1.860", bew: "40", qual: "12", gesp: "4", ein: 1, cph: "€1.200", highlight: false, funnel: [100, 100, 30, 33, 25] },
                    { title: "QA Engineer – Stuttgart", desc: 'Sponsored · "Qualität hat Priorität"', src: "Indeed", srcIcon: "person_search", srcBg: "bg-purple-50", srcColor: "text-purple-600", spend: "€980", klicks: "750", bew: "28", qual: "8", gesp: "3", ein: 1, cph: "€980", highlight: false, funnel: [100, 100, 29, 38, 33] },
                    { title: "IT Projektleiter – Köln", desc: 'Story Ad · "Führungsrolle übernehmen"', src: "Meta", srcIcon: "groups", srcBg: "bg-indigo-50", srcColor: "text-indigo-600", spend: "€680", klicks: "1.540", bew: "18", qual: "4", gesp: "1", ein: 0, cph: "–", highlight: false, funnel: [100, 100, 22, 25, 0] },
                    { title: "Software Engineer – DACH", desc: 'Search Ad · "Software Jobs DACH"', src: "Google", srcIcon: "search", srcBg: "bg-red-50", srcColor: "text-red-600", spend: "€510", klicks: "620", bew: "12", qual: "3", gesp: "1", ein: 1, cph: "€510", highlight: false, paused: true, funnel: [100, 100, 25, 33, 100] },
                  ].map((ad) => (
                    <tr
                      key={ad.title}
                      className={`hover:bg-slate-50 transition-colors ${ad.highlight ? "bg-emerald-50/40" : ""} ${ad.paused ? "opacity-50" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <span className="text-sm font-bold text-slate-800">{ad.title}</span>
                          <p className="text-xs text-slate-500 mt-0.5">{ad.desc}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-7 w-7 rounded ${ad.srcBg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${ad.srcColor}`} style={{ fontSize: 14 }}>{ad.srcIcon}</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">{ad.src}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-slate-600">{ad.spend}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{ad.klicks}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{ad.bew}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{ad.qual}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{ad.gesp}</td>
                      <td className="px-6 py-4 text-right">
                        {ad.ein > 0 ? (
                          <span className={`text-sm font-bold px-2.5 py-1 rounded border ${ad.ein >= 2 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-amber-600 bg-amber-50 border-amber-100"}`}>
                            {ad.ein}
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-slate-300 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">0</span>
                        )}
                      </td>
                      <td className="px-6 py-4 w-36">
                        <div className="flex gap-0.5 items-center">
                          {[
                            { color: "bg-slate-400", val: ad.funnel[0] },
                            { color: "bg-blue-300", val: ad.funnel[1] },
                            { color: "bg-violet-400", val: ad.funnel[2] },
                            { color: "bg-orange-400", val: ad.funnel[3] },
                            { color: ad.funnel[4] > 0 ? "bg-emerald-500" : "bg-slate-200", val: ad.funnel[4] },
                          ].map((seg, j) => (
                            <div
                              key={j}
                              className={`h-2.5 flex-1 bg-slate-200 overflow-hidden ${j === 0 ? "rounded-l-full" : ""} ${j === 4 ? "rounded-r-full" : ""}`}
                            >
                              <div className={`h-full ${seg.color}`} style={{ width: `${seg.val}%` }}></div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-sm font-bold ${ad.ein >= 2 ? "text-emerald-600" : ad.ein === 1 ? "text-amber-600" : "text-slate-400"}`}>
                          {ad.cph}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className="text-xs font-medium text-slate-500">8 Anzeigen · CPH = Cost per Hire</p>
                <div className="flex items-center gap-4">
                  {[
                    { color: "bg-slate-400", label: "Klicks" },
                    { color: "bg-blue-300", label: "Bewerbungen" },
                    { color: "bg-violet-400", label: "Qualifiziert" },
                    { color: "bg-orange-400", label: "Gespräche" },
                    { color: "bg-emerald-500", label: "Einstellungen" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-5 ${l.color} rounded-sm`}></div>
                      <span className="text-xs text-slate-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a className="text-xs font-bold text-[#136dec] hover:underline" href="#">Alle Anzeigen anzeigen</a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RecruitingDashboardPage;
