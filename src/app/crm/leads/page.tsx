"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Search, Plus, X } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: number;
  company_name: string;
  company_website: string | null;
  contact_name: string | null;
  contact_email: string | null;
  stage: string;
  priority: string;
  deal_value: number | null;
  source: string | null;
  next_follow_up: string | null;
  created_at: string;
}

const STAGES = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"];
const PRIORITIES = ["low", "medium", "high", "urgent"];
const SOURCES = ["scraper", "manual", "referral", "inbound"];

const stageLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  meeting: "Meeting",
  proposal: "Proposal",
  closed_won: "Won",
  closed_lost: "Lost",
};

function formatUsd(amount: number | null) {
  if (!amount) return "—";
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [priority, setPriority] = useState("");

  // New lead form
  const [newLead, setNewLead] = useState({ company_name: "", company_website: "", contact_name: "", contact_email: "", stage: "new", priority: "medium", source: "manual", deal_value: "" });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (stage) params.set("stage", stage);
    if (priority) params.set("priority", priority);
    params.set("page", page.toString());
    params.set("limit", "25");

    const res = await fetch(`/api/crm/leads?${params}`);
    const json = await res.json();
    setLeads(json.data);
    setTotal(json.total);
    setTotalPages(json.totalPages);
    setLoading(false);
  }, [search, stage, priority, page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...newLead,
      deal_value: newLead.deal_value ? parseFloat(newLead.deal_value) : null,
    };
    const res = await fetch("/api/crm/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setShowCreate(false);
      setNewLead({ company_name: "", company_website: "", contact_name: "", contact_email: "", stage: "new", priority: "medium", source: "manual", deal_value: "" });
      fetchLeads();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Leads</h1>
        <span className="text-muted text-sm">{total} total</span>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Lead
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-heading">Create Lead</h2>
            <button onClick={() => setShowCreate(false)} className="text-muted hover:text-heading"><X size={18} /></button>
          </div>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input required placeholder="Company Name *" value={newLead.company_name} onChange={(e) => setNewLead({ ...newLead, company_name: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50" />
            <input placeholder="Website" value={newLead.company_website} onChange={(e) => setNewLead({ ...newLead, company_website: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50" />
            <input placeholder="Contact Name" value={newLead.contact_name} onChange={(e) => setNewLead({ ...newLead, contact_name: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50" />
            <input placeholder="Contact Email" value={newLead.contact_email} onChange={(e) => setNewLead({ ...newLead, contact_email: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50" />
            <input placeholder="Deal Value" type="number" value={newLead.deal_value} onChange={(e) => setNewLead({ ...newLead, deal_value: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50" />
            <select value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50">
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="md:col-span-2 lg:col-span-3 flex justify-end">
              <button type="submit" className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors">Create Lead</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-raised border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <select value={stage} onChange={(e) => { setStage(e.target.value); setPage(1); }} className="px-3 py-2 bg-raised border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50">
          <option value="">All Stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{stageLabels[s]}</option>)}
        </select>
        <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }} className="px-3 py-2 bg-raised border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50">
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-edge">
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Company</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Contact</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Stage</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Priority</th>
                <th className="text-right px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Deal Value</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium hidden lg:table-cell">Source</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">No leads found. Create one or import from funding data.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-edge/50 hover:bg-card/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/crm/leads/${lead.id}`} className="font-medium text-heading hover:text-accent transition-colors">
                        {lead.company_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{lead.contact_name ? lead.contact_name.split("\n")[0] : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`stage-${lead.stage} px-2 py-0.5 rounded-full text-xs border`}>
                        {stageLabels[lead.stage] || lead.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`priority-${lead.priority} text-xs font-medium capitalize`}>{lead.priority}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-heading">{formatUsd(lead.deal_value)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted capitalize">{lead.source || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-edge">
            <span className="text-xs text-muted">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 rounded text-xs bg-card border border-edge text-muted hover:text-heading disabled:opacity-50 transition-colors">Previous</button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 rounded text-xs bg-card border border-edge text-muted hover:text-heading disabled:opacity-50 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
