import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Search,
  Bell,
  CheckCircle2,
  Lock,
  ChevronDown,
  BarChart3,
  Calendar,
  FileText,
  Sliders,
  DollarSign,
  Box,
  Layers,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';

interface ProjectMockupProps {
  projectId: string;
  onExpand?: () => void;
}

export function ProjectMockupUI({ projectId, onExpand }: ProjectMockupProps) {
  if (projectId === 'proj-1') {
    return <SupplyRegisterMockup onExpand={onExpand} />;
  }
  if (projectId === 'proj-2') {
    return <CadoganTateMockup onExpand={onExpand} />;
  }
  if (projectId === 'proj-3') {
    return <SocietyManagementMockup onExpand={onExpand} />;
  }
  return null;
}

/**
 * 1. The Supply Register - Realistic SaaS Workforce & Analytics Portal
 */
function SupplyRegisterMockup({ onExpand }: { onExpand?: () => void }) {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="w-full h-full bg-[#0a0c13] text-slate-200 flex flex-col font-sans select-none overflow-hidden relative border border-white/10 rounded-xl">
      {/* Realistic Browser / Desktop Window Bar */}
      <div className="h-7 px-3 bg-[#11131c] border-b border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#0b0d14] border border-white/5 text-[10px] font-mono text-slate-400 max-w-[240px] truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300">app.supplyregister.uk</span>
          <span className="text-slate-500">/workforce/analytics</span>
        </div>

        <div className="flex items-center gap-2">
          {onExpand && (
            <button 
              onClick={(e) => { e.stopPropagation(); onExpand(); }}
              className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Expand Preview"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Main SaaS App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Mini Sidebar */}
        <div className="w-12 bg-[#0c0e17] border-r border-white/[0.06] flex flex-col items-center py-2.5 gap-3 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-[11px] shadow-sm">
            SR
          </div>
          <div className="w-6 h-px bg-white/10 my-0.5" />
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${activeTab === 'overview' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${activeTab === 'analytics' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setActiveTab('staff')} 
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${activeTab === 'staff' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Users className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setActiveTab('docs')} 
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${activeTab === 'docs' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-2.5 bg-[#090b11] overflow-hidden">
          {/* App Topbar */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.06]">
            <div>
              <div className="text-[11px] font-semibold text-white flex items-center gap-1.5 leading-tight">
                <span>The Supply Register</span>
                <span className="text-[8px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">Enterprise Trust</span>
              </div>
              <div className="text-[9px] text-slate-400 flex items-center gap-1">
                <span>NHS Region North</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Live Sync Active</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="h-6 px-2 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5 text-[9px] text-slate-300">
                <Search className="w-2.5 h-2.5 text-slate-500" />
                <span className="hidden sm:inline">Search shift or trust...</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white border border-white/20">
                SJ
              </div>
            </div>
          </div>

          {/* Metric KPI Widgets */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            <div className="bg-[#111420] border border-white/[0.07] rounded-lg p-1.5 flex flex-col justify-between">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">Active Shifts</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xs font-bold text-white font-mono">1,428</span>
                <span className="text-[8px] font-semibold text-emerald-400 flex items-center">
                  +12.4%
                </span>
              </div>
            </div>

            <div className="bg-[#111420] border border-white/[0.07] rounded-lg p-1.5 flex flex-col justify-between">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">Fill Rate SLA</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xs font-bold text-purple-300 font-mono">98.2%</span>
                <span className="text-[8px] font-semibold text-blue-400">Target 95%</span>
              </div>
            </div>

            <div className="bg-[#111420] border border-white/[0.07] rounded-lg p-1.5 flex flex-col justify-between">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">Cost Efficiency</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xs font-bold text-emerald-300 font-mono">£342.5k</span>
                <span className="text-[8px] font-semibold text-emerald-400">-4.1%</span>
              </div>
            </div>
          </div>

          {/* Dual Panel: Real Chart & Live Shifts Table */}
          <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
            {/* Chart Column (2/5) */}
            <div className="col-span-2 bg-[#10131e] border border-white/[0.07] rounded-lg p-2 flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-semibold text-slate-200">Weekly Placements</span>
                <span className="text-[8px] font-mono text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">Realtime</span>
              </div>
              
              {/* Scalable SVG Area / Bar Chart */}
              <div className="flex-1 w-full flex flex-col justify-end">
                <div className="flex items-end justify-between gap-1 h-16 w-full pt-2 px-1">
                  {[
                    { day: 'M', h1: 65, h2: 45 },
                    { day: 'T', h1: 80, h2: 70 },
                    { day: 'W', h1: 95, h2: 85 },
                    { day: 'T', h1: 75, h2: 60 },
                    { day: 'F', h1: 90, h2: 88 },
                    { day: 'S', h1: 60, h2: 50 },
                    { day: 'S', h1: 45, h2: 38 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-0.5 h-full">
                        <div 
                          style={{ height: `${item.h1}%` }} 
                          className="w-1.5 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 opacity-90" 
                        />
                        <div 
                          style={{ height: `${item.h2}%` }} 
                          className="w-1.5 rounded-t bg-gradient-to-t from-purple-600 to-indigo-400 opacity-80" 
                        />
                      </div>
                      <span className="text-[7px] text-slate-500 font-mono mt-0.5">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[7px] text-slate-400 pt-1 border-t border-white/[0.06] mt-1">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                  <span>Placed</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
                  <span>Target</span>
                </div>
              </div>
            </div>

            {/* Live Requisitions Table (3/5) */}
            <div className="col-span-3 bg-[#10131e] border border-white/[0.07] rounded-lg p-2 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-semibold text-slate-200">Live Client Requests</span>
                <span className="text-[8px] text-slate-400">4 new today</span>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col justify-between text-[8px]">
                {[
                  { role: 'Lead Radiographer', dept: 'Oncology', shift: '12h Night', status: 'Fulfilled', color: 'emerald' },
                  { role: 'Specialist Registrar', dept: 'A&E Trauma', shift: '8h Day', status: 'In Review', color: 'blue' },
                  { role: 'SEN Lead Teacher', dept: 'Regional Trust', shift: 'Full Term', status: 'Assigned', color: 'purple' },
                  { role: 'Clinical Matron', dept: 'ICU Unit', shift: 'Twilight', status: 'Fulfilled', color: 'emerald' }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-none">
                    <div className="truncate max-w-[90px]">
                      <div className="font-medium text-slate-200 truncate">{row.role}</div>
                      <div className="text-[7px] text-slate-500">{row.dept} • {row.shift}</div>
                    </div>
                    <span className={`text-[7px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      row.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      row.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Cadogan Tate - Realistic Warehouse Management System (Quotation Module UI)
 */
function CadoganTateMockup({ onExpand }: { onExpand?: () => void }) {
  const [selectedVault, setSelectedVault] = useState<'climate' | 'bonded'>('climate');
  const [volume, setVolume] = useState(2450);

  return (
    <div className="w-full h-full bg-[#0b0d14] text-slate-200 flex flex-col font-sans select-none overflow-hidden relative border border-white/10 rounded-xl">
      {/* Realistic Browser Header */}
      <div className="h-7 px-3 bg-[#12141e] border-b border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#090b10] border border-white/5 text-[10px] font-mono text-slate-400 max-w-[240px] truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300">wms.cadogantate.com</span>
          <span className="text-slate-500">/quotes/generator-v2</span>
        </div>

        <div className="flex items-center gap-2">
          {onExpand && (
            <button 
              onClick={(e) => { e.stopPropagation(); onExpand(); }}
              className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Expand Preview"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
          <span className="text-[9px] text-amber-400 font-mono font-medium">LHR-HUB</span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="px-3 py-1 bg-[#10131f] border-b border-white/[0.05] flex items-center justify-between text-[8px]">
        <div className="flex items-center gap-1 text-slate-400">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
          <span>Client Specs</span>
        </div>
        <div className="w-4 h-px bg-white/10" />
        <div className="flex items-center gap-1 font-semibold text-purple-300">
          <span className="w-3 h-3 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center font-mono text-[7px] border border-purple-400/50">2</span>
          <span>Storage & Vault Tier</span>
        </div>
        <div className="w-4 h-px bg-white/10" />
        <div className="flex items-center gap-1 text-slate-500">
          <span className="w-3 h-3 rounded-full bg-white/5 text-slate-500 flex items-center justify-center font-mono text-[7px]">3</span>
          <span>Logistics SLA</span>
        </div>
        <div className="w-4 h-px bg-white/10" />
        <div className="flex items-center gap-1 text-slate-500">
          <span className="w-3 h-3 rounded-full bg-white/5 text-slate-500 flex items-center justify-center font-mono text-[7px]">4</span>
          <span>Summary</span>
        </div>
      </div>

      {/* Main 2-Column Quotation Workspace */}
      <div className="flex-1 p-2.5 grid grid-cols-12 gap-2 overflow-hidden bg-[#090b12]">
        {/* Left Configurator (7 Cols) */}
        <div className="col-span-7 flex flex-col justify-between overflow-hidden">
          {/* Storage Vault Tiers */}
          <div>
            <div className="text-[9px] font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
              <span>Select Storage Environment</span>
              <span className="text-[8px] text-slate-500">ISO 9001 Certified</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => setSelectedVault('climate')}
                className={`p-1.5 rounded-lg border text-left transition-all ${
                  selectedVault === 'climate'
                    ? 'bg-purple-950/20 border-purple-500/60 shadow-sm shadow-purple-900/20'
                    : 'bg-[#10131e] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold text-white">Fine Art Vault</span>
                  {selectedVault === 'climate' && <CheckCircle2 className="w-2.5 h-2.5 text-purple-400" />}
                </div>
                <div className="text-[7px] text-slate-400 mt-0.5">21°C Climate • 50% RH</div>
                <div className="text-[8px] font-mono text-emerald-400 font-semibold mt-1">£1.85 / cu.ft</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVault('bonded')}
                className={`p-1.5 rounded-lg border text-left transition-all ${
                  selectedVault === 'bonded'
                    ? 'bg-purple-950/20 border-purple-500/60 shadow-sm shadow-purple-900/20'
                    : 'bg-[#10131e] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold text-white">Bonded Customs</span>
                  {selectedVault === 'bonded' && <CheckCircle2 className="w-2.5 h-2.5 text-purple-400" />}
                </div>
                <div className="text-[7px] text-slate-400 mt-0.5">HMRC Bonded Staging</div>
                <div className="text-[8px] font-mono text-blue-400 font-semibold mt-1">£1.40 / cu.ft</div>
              </button>
            </div>
          </div>

          {/* Volume Slider & Metric */}
          <div className="bg-[#10131e] border border-white/[0.06] rounded-lg p-2 mb-2">
            <div className="flex items-center justify-between text-[8px] mb-1">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Box className="w-2.5 h-2.5 text-purple-400" />
                Required Cubic Capacity
              </span>
              <span className="font-mono text-purple-300 font-bold text-[9px]">
                {volume.toLocaleString()} cu. ft <span className="text-slate-500">({(volume * 0.0283).toFixed(1)} m³)</span>
              </span>
            </div>

            {/* Slider track UI */}
            <div className="w-full py-1">
              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
            
            <div className="flex items-center justify-between text-[7px] text-slate-500 font-mono">
              <span>500 cu. ft</span>
              <span>2,500</span>
              <span>5,000 cu. ft</span>
            </div>
          </div>

          {/* Value Add Toggles */}
          <div className="flex items-center gap-1 text-[7px]">
            <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300 flex items-center gap-1">
              <CheckCircle2 className="w-2 h-2 text-emerald-400" /> Museum Crating
            </span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300 flex items-center gap-1">
              <CheckCircle2 className="w-2 h-2 text-emerald-400" /> Tarmac Escort
            </span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-400">
              Condition API
            </span>
          </div>
        </div>

        {/* Right Live Estimate Breakdown (5 Cols) */}
        <div className="col-span-5 bg-[#111422] border border-purple-500/20 rounded-lg p-2 flex flex-col justify-between">
          <div>
            <div className="text-[9px] font-bold text-white mb-0.5 flex items-center justify-between">
              <span>Quotation Summary</span>
              <span className="text-[7px] px-1 py-0.2 bg-purple-500/20 text-purple-300 rounded font-mono">EST-9241</span>
            </div>
            <div className="text-[7px] text-slate-400 mb-2">Cadogan Tate UK Logistics Hub</div>

            <div className="space-y-1 text-[8px] border-y border-white/[0.06] py-1.5 my-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Base Racking Space</span>
                <span className="font-mono text-slate-200">£{((volume * (selectedVault === 'climate' ? 1.85 : 1.40)) * 0.5).toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>HVAC & Humidity SLA</span>
                <span className="font-mono text-slate-200">£380.00</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Bonded Insurance ($2M)</span>
                <span className="font-mono text-slate-200">£420.00</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-[8px] text-slate-400 font-semibold uppercase">Total Monthly</span>
              <div className="text-right">
                <span className="text-xs font-bold text-white font-mono">
                  £{(volume * (selectedVault === 'climate' ? 1.85 : 1.40) * 0.5 + 800).toFixed(0)}
                </span>
                <span className="text-[7px] text-slate-500"> /mo</span>
              </div>
            </div>

            <button className="w-full py-1 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-[8px] shadow-sm shadow-purple-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-1">
              <span>Generate PDF Quote</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Society Management System - Realistic Membership & Residential Portal
 */
function SocietyManagementMockup({ onExpand }: { onExpand?: () => void }) {
  const [activeTab, setActiveTab] = useState<'directory' | 'dues' | 'facilities'>('directory');

  return (
    <div className="w-full h-full bg-[#0b0e14] text-slate-200 flex flex-col font-sans select-none overflow-hidden relative border border-white/10 rounded-xl">
      {/* Realistic Window Chrome */}
      <div className="h-7 px-3 bg-[#111420] border-b border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#080a10] border border-white/5 text-[10px] font-mono text-slate-400 max-w-[240px] truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300">portal.societyhub.io</span>
          <span className="text-slate-500">/admin/directory</span>
        </div>

        <div className="flex items-center gap-2">
          {onExpand && (
            <button 
              onClick={(e) => { e.stopPropagation(); onExpand(); }}
              className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Expand Preview"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Main SaaS Top Navigation Bar */}
      <div className="px-2.5 py-1.5 bg-[#0e111c] border-b border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-bold text-white">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Emerald Heights</span>
          </div>
          <span className="text-[8px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
            Tower A & B
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="h-5 px-2 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1 text-[8px] text-slate-300">
            <Search className="w-2.5 h-2.5 text-slate-500" />
            <span>Search unit, vehicle...</span>
          </div>
          <button className="h-5 px-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-[8px] font-medium text-white flex items-center gap-0.5">
            <span>+ Add</span>
          </button>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="px-2.5 py-1 bg-[#0a0d15] border-b border-white/[0.04] flex items-center gap-3 text-[8px]">
        <button 
          onClick={() => setActiveTab('directory')}
          className={`pb-0.5 font-medium transition-colors ${activeTab === 'directory' ? 'text-purple-300 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-300'}`}
        >
          Resident Directory
        </button>
        <button 
          onClick={() => setActiveTab('dues')}
          className={`pb-0.5 font-medium transition-colors ${activeTab === 'dues' ? 'text-purple-300 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-300'}`}
        >
          Maintenance & Dues
        </button>
        <button 
          onClick={() => setActiveTab('facilities')}
          className={`pb-0.5 font-medium transition-colors ${activeTab === 'facilities' ? 'text-purple-300 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-300'}`}
        >
          Clubhouse Bookings
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2 bg-[#090b12] flex flex-col justify-between overflow-hidden">
        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <div className="bg-[#10131f] border border-white/[0.06] rounded p-1.5">
            <div className="text-[7px] text-slate-400 uppercase font-semibold">Total Occupancy</div>
            <div className="text-[11px] font-bold text-white font-mono mt-0.5">312 / 320 <span className="text-[7px] text-emerald-400 font-sans font-normal">(97.5%)</span></div>
          </div>
          <div className="bg-[#10131f] border border-white/[0.06] rounded p-1.5">
            <div className="text-[7px] text-slate-400 uppercase font-semibold">Dues Collection</div>
            <div className="text-[11px] font-bold text-purple-300 font-mono mt-0.5">94.8% <span className="text-[7px] text-slate-400 font-sans font-normal">($142k)</span></div>
          </div>
          <div className="bg-[#10131f] border border-white/[0.06] rounded p-1.5">
            <div className="text-[7px] text-slate-400 uppercase font-semibold">Active Gate Passes</div>
            <div className="text-[11px] font-bold text-cyan-300 font-mono mt-0.5">48 Today</div>
          </div>
        </div>

        {/* Directory Table View */}
        <div className="flex-1 bg-[#10131e] border border-white/[0.06] rounded-lg p-2 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[8px] pb-1 border-b border-white/[0.06]">
            <span className="font-semibold text-slate-300">Registered Members</span>
            <div className="flex items-center gap-1 text-[7px] text-slate-400">
              <span className="px-1 py-0.2 bg-white/5 rounded">Wing A</span>
              <span className="px-1 py-0.2 bg-white/5 rounded">Wing B</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between py-1 text-[8px]">
            {[
              { name: 'Dr. Rajesh Patel', unit: 'Unit A-1402', role: 'Owner', dues: 'Paid ✓', duesColor: 'emerald' },
              { name: 'Elena Rostova', unit: 'Unit B-0804', role: 'Tenant', dues: 'Pending ($340)', duesColor: 'amber' },
              { name: 'Marcus Vance', unit: 'Unit A-0201', role: 'Owner', dues: 'Paid ✓', duesColor: 'emerald' },
              { name: 'Dr. Amara Singh', unit: 'Unit B-1102', role: 'Medical Exec', dues: 'Paid ✓', duesColor: 'purple' },
            ].map((resident, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[8px] text-purple-200">
                    {resident.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 leading-none">{resident.name}</div>
                    <div className="text-[7px] text-slate-500 mt-0.5">{resident.unit} • {resident.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[7px] px-1.5 py-0.2 rounded font-medium ${
                    resident.duesColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    resident.duesColor === 'amber' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
                    'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                  }`}>
                    {resident.dues}
                  </span>
                  <span className="text-[7px] text-slate-400 hover:text-white cursor-pointer">•••</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Amenity Reservation Footer Strip */}
          <div className="pt-1 border-t border-white/[0.05] flex items-center justify-between text-[7px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-2.5 h-2.5 text-cyan-400" />
              <span>Amenity: Tennis Court #2 • 6:30 PM Reserved</span>
            </span>
            <span className="text-purple-400 font-medium">3 Pending Approvals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
