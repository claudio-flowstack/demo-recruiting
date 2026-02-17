import { useEffect } from "react";

const RecruitingDashboardPage = () => {
  useEffect(() => {
    document.title = "Recruiting Ad Performance – Dashboard";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8] text-slate-900 antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Side Navigation */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#136dec] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">RecruitFlow</h1>
              <p className="text-xs text-slate-500 font-medium">Analytics Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#136dec]/10 text-[#136dec] font-semibold" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-sm">Kampagnen</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">ads_click</span>
            <span className="text-sm">Anzeigenquellen</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm">Kandidaten</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="text-sm">ROI-Berichte</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Einstellungen</span>
          </a>
          <div className="flex items-center gap-3 px-3 py-4 mt-2 border-t border-slate-100">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">MK</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Marie Koch</p>
              <p className="text-[10px] text-slate-500 truncate">HR Marketing Lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recruiting Ad Performance</h2>
            <p className="text-xs text-slate-500">Aktualisiert vor 12 Minuten</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white shadow-sm border border-slate-200">Letzte 30 Tage</button>
              <button className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700">Letzte 90 Tage</button>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 cursor-pointer">
              <span className="material-symbols-outlined text-slate-500 text-sm">calendar_month</span>
              <span className="text-xs font-medium">01.01.2025 – 31.01.2025</span>
            </div>
            <button className="bg-[#136dec] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              PDF Export
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Ad Spend */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#136dec]/30 transition-colors">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Ad Spend</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">€8.450</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#136dec]" style={{ width: "65%" }}></div>
              </div>
            </div>

            {/* Bewerbungen */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Bewerbungen</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">264</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 18%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#136dec]" style={{ width: "78%" }}></div>
              </div>
            </div>

            {/* Qualifizierte Kandidaten */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Qualifiziert</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">87</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 9%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400" style={{ width: "55%" }}></div>
              </div>
            </div>

            {/* Gespräche */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Gespräche</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">34</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 21%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-400" style={{ width: "62%" }}></div>
              </div>
            </div>

            {/* Einstellungen */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Einstellungen</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">12</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 33%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "80%" }}></div>
              </div>
            </div>

            {/* Kosten pro Einstellung */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-[#136dec]">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Kosten / Einstellung</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">€704</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px]">arrow_downward</span> 8%
                </span>
              </div>
              <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>

          {/* Main Chart & Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Funnel Progression Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-bold text-slate-900">Bewerbungen & Einstellungen über Zeit</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#136dec]"></span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">Einstellungen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-200"></span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">Bewerbungen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">Impressionen</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="relative h-64 w-full bg-slate-50 rounded-lg flex items-end px-4 gap-2 overflow-hidden border border-slate-100">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-4 px-2 pointer-events-none opacity-20">
                  <div className="border-t border-slate-400 w-full"></div>
                  <div className="border-t border-slate-400 w-full"></div>
                  <div className="border-t border-slate-400 w-full"></div>
                  <div className="border-t border-slate-400 w-full"></div>
                </div>

                {[
                  { label: "KW1", imp: "h-32", bew: "h-10", ein: "h-3" },
                  { label: "KW2", imp: "h-40", bew: "h-14", ein: "h-4" },
                  { label: "KW3", imp: "h-48", bew: "h-20", ein: "h-6" },
                  { label: "KW4", imp: "h-36", bew: "h-12", ein: "h-5" },
                  { label: "KW5", imp: "h-52", bew: "h-18", ein: "h-8" },
                  { label: "KW6", imp: "h-44", bew: "h-16", ein: "h-6" },
                  { label: "KW7", imp: "h-38", bew: "h-14", ein: "h-4" },
                ].map((w) => (
                  <div key={w.label} className="flex-1 flex flex-col justify-end gap-1 group">
                    <div className={`w-full bg-slate-200 ${w.imp} rounded-t-sm`}></div>
                    <div className={`w-full bg-blue-200 ${w.bew} rounded-t-sm group-hover:bg-blue-300 transition-colors`}></div>
                    <div className={`w-full bg-[#136dec] ${w.ein} rounded-t-sm`}></div>
                    <span className="text-[9px] text-slate-400 mt-2 text-center uppercase font-bold">{w.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiting Funnel */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900">Recruiting Funnel</h3>
                <span className="material-symbols-outlined text-slate-400 cursor-help">info</span>
              </div>

              <div className="flex-1 space-y-4">
                {/* Step 1: Impressionen */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Ad Impressionen</p>
                    <p className="text-xs font-bold">100%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-4" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)" }}>
                    <div className="absolute inset-0 bg-slate-300"></div>
                    <span className="relative z-10 text-xs font-bold text-slate-700">420.000</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white rounded-full p-1 border border-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-xs">arrow_downward</span>
                  </div>
                </div>

                {/* Step 2: Klicks */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Klicks zur Seite</p>
                    <p className="text-xs font-bold text-amber-500">2,0%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-6" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)" }}>
                    <div className="absolute inset-0 bg-blue-200" style={{ width: "75%" }}></div>
                    <span className="relative z-10 text-xs font-bold text-slate-700">8.240 Klicks</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white rounded-full p-1 border border-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-xs">arrow_downward</span>
                  </div>
                </div>

                {/* Step 3: Bewerbungen */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Bewerbungen</p>
                    <p className="text-xs font-bold text-blue-500">3,2%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-6" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)" }}>
                    <div className="absolute inset-0 bg-[#136dec]/40" style={{ width: "55%" }}></div>
                    <span className="relative z-10 text-xs font-bold text-slate-700">264</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white rounded-full p-1 border border-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-xs">arrow_downward</span>
                  </div>
                </div>

                {/* Step 4: Qualifiziert */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Qualifizierte Kandidaten</p>
                    <p className="text-xs font-bold text-violet-500">33%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-6" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)" }}>
                    <div className="absolute inset-0 bg-violet-300" style={{ width: "40%" }}></div>
                    <span className="relative z-10 text-xs font-bold text-slate-700">87</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white rounded-full p-1 border border-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-xs">arrow_downward</span>
                  </div>
                </div>

                {/* Step 5: Gespräche */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Bewerbungsgespräche</p>
                    <p className="text-xs font-bold text-orange-500">39%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-6" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)" }}>
                    <div className="absolute inset-0 bg-orange-200" style={{ width: "28%" }}></div>
                    <span className="relative z-10 text-xs font-bold text-slate-700">34</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white rounded-full p-1 border border-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-xs">arrow_downward</span>
                  </div>
                </div>

                {/* Step 6: Einstellungen */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Einstellungen</p>
                    <p className="text-xs font-bold text-emerald-500">35%</p>
                  </div>
                  <div className="h-9 w-full bg-slate-100 rounded relative overflow-hidden flex items-center px-6" style={{ clipPath: "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)" }}>
                    <div className="absolute inset-0 bg-emerald-400" style={{ width: "18%" }}></div>
                    <span className="relative z-10 text-xs font-bold text-white">12</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-rose-500">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <p className="text-[11px] font-medium leading-tight">Absprungrate bei Formularschritt 2 ("Erfahrung") erhöht – 42% brechen ab.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ad Source Breakdown Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Anzeigenquellen – Übersicht</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    className="pl-8 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-48 focus:ring-[#136dec] focus:border-[#136dec] outline-none"
                    placeholder="Quelle suchen..."
                    type="text"
                    readOnly
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
                </div>
                <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-sm">tune</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Anzeigenquelle</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ausgaben</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Bewerbungen</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Qualifiziert</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Gespräche</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Einstellungen</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Funnel-Performance</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">CPH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* LinkedIn */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-sm">work</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">LinkedIn Ads</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Aktiv</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€4.280</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">142</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">52</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">21</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">7</td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#136dec]" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">85%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">€611</td>
                  </tr>

                  {/* Meta */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-indigo-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-600 text-sm">groups</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">Meta Kampagnen</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Aktiv</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€2.680</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">82</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">24</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">9</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">3</td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#136dec]" style={{ width: "52%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">52%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">€893</td>
                  </tr>

                  {/* Indeed */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-purple-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-purple-600 text-sm">person_search</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">Indeed Sponsored</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Aktiv</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€980</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">28</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">8</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">3</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">1</td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#136dec]" style={{ width: "40%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">40%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">€980</td>
                  </tr>

                  {/* Google */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-red-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-red-600 text-sm">search</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">Google Search</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-400 border border-slate-200 italic">Pausiert</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€510</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">12</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">3</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">1</td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300" style={{ width: "22%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">22%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">€510</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-medium text-slate-500 uppercase">Performance der Top 4 Quellen · CPH = Cost per Hire</p>
              <a className="text-[10px] font-bold text-[#136dec] uppercase hover:underline" href="#">Alle Kanäle anzeigen</a>
            </div>
          </div>

          {/* Einzelne Anzeigen – Detailansicht */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Einzelne Anzeigen – Funnel-Tracking</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Welche Anzeige bringt Leads und tatsächliche Einstellungen?</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <button className="px-3 py-1.5 text-[10px] font-semibold rounded-md bg-white shadow-sm border border-slate-200">Alle</button>
                  <button className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Mit Einstellungen</button>
                  <button className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Ohne Ergebnis</button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Anzeige</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quelle</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ausgaben</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Klicks</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Bewerbungen</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Qualifiziert</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Gespräche</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Einstellungen</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Funnel</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">CPH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Anzeige 1 – Top Performer */}
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">Senior React Dev – München</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Carousel · "Werde Teil unseres Teams"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-[10px]">work</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">LinkedIn</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€1.840</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1.420</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">48</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">22</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">9</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">3</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "46%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "41%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "33%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">€613</td>
                  </tr>

                  {/* Anzeige 2 */}
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">DevOps Engineer – Remote</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Single Image · "100% Remote möglich"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-[10px]">work</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">LinkedIn</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€1.260</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">980</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">38</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">14</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">6</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">2</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "37%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "43%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "33%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">€630</td>
                  </tr>

                  {/* Anzeige 3 */}
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">Fullstack Dev – Hamburg</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Video · "Ein Tag bei uns im Office"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-indigo-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-600 text-[10px]">groups</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">Meta</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€1.480</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">2.180</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">42</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">12</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">5</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">2</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "29%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "42%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "40%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">€740</td>
                  </tr>

                  {/* Anzeige 4 – Leads aber keine Einstellungen */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">Frontend Dev – Berlin</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Carousel · "Gestalte die Zukunft"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-indigo-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-600 text-[10px]">groups</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">Meta</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€1.200</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1.860</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">40</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">12</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">4</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">1</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "30%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "33%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "25%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-amber-600">€1.200</td>
                  </tr>

                  {/* Anzeige 5 – Leads, Gespräch, keine Einstellung */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">Backend Entwickler – Frankfurt</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Single Image · "Dein nächster Karriereschritt"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-[10px]">work</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">LinkedIn</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€1.180</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">890</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">56</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">16</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">6</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">2</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "29%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "38%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "33%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">€590</td>
                  </tr>

                  {/* Anzeige 6 – Viele Klicks, wenig Ergebnis */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">IT Projektleiter – Köln</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Story Ad · "Führungsrolle übernehmen"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-indigo-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-600 text-[10px]">groups</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">Meta</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€680</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1.540</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">18</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">4</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">0</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "22%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "25%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-slate-300" style={{ width: "0%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-400">–</td>
                  </tr>

                  {/* Anzeige 7 – Google Paused */}
                  <tr className="hover:bg-slate-50 transition-colors opacity-60">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">Software Engineer – DACH</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Search Ad · "Software Jobs DACH"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-red-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-red-600 text-[10px]">search</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">Google</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€510</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">620</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">12</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">3</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">1</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">1</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "25%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "33%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "100%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">€510</td>
                  </tr>

                  {/* Anzeige 8 – Indeed */}
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800">QA Engineer – Stuttgart</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Sponsored Listing · "Qualität hat Priorität"</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-purple-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-purple-600 text-[10px]">person_search</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">Indeed</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-slate-600">€980</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">750</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">28</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">8</td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">3</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">1</span>
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex gap-0.5 items-center">
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-l-full overflow-hidden"><div className="h-full bg-slate-400" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-blue-300" style={{ width: "100%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-violet-300" style={{ width: "29%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 overflow-hidden"><div className="h-full bg-orange-300" style={{ width: "38%" }}></div></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-r-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: "33%" }}></div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-bold text-emerald-600">€980</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-[10px] font-medium text-slate-500 uppercase">8 Anzeigen · CPH = Cost per Hire</p>
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-slate-400 rounded-sm"></div>
                    <span className="text-[9px] text-slate-500">Klicks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-blue-300 rounded-sm"></div>
                    <span className="text-[9px] text-slate-500">Bewerbungen</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-violet-300 rounded-sm"></div>
                    <span className="text-[9px] text-slate-500">Qualifiziert</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-orange-300 rounded-sm"></div>
                    <span className="text-[9px] text-slate-500">Gespräche</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-emerald-400 rounded-sm"></div>
                    <span className="text-[9px] text-slate-500">Einstellungen</span>
                  </div>
                </div>
              </div>
              <a className="text-[10px] font-bold text-[#136dec] uppercase hover:underline" href="#">Alle Anzeigen anzeigen</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruitingDashboardPage;
