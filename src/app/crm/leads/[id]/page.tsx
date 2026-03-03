"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Building2, Globe, User, Mail, Briefcase,
  Calendar, MessageSquare, Phone, Video, Send, Clock,
  ChevronDown, Plus, Check, Trash2, ExternalLink, StickyNote,
  UserPlus, X,
} from "lucide-react";
import Link from "next/link";

interface Lead {
  id: number;
  fundingRoundId: number | null;
  companyName: string;
  companyWebsite: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactTitle: string | null;
  stage: string;
  priority: string;
  dealValue: number | null;
  source: string | null;
  lostReason: string | null;
  nextFollowUp: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  id: number;
  leadId: number;
  type: string;
  title: string;
  description: string | null;
  metadata: string | null;
  createdAt: string;
}

interface FollowUp {
  id: number;
  leadId: number;
  dueDate: string;
  title: string;
  completed: number;
  createdAt: string;
}

interface Contact {
  id: number;
  leadId: number;
  name: string;
  email: string | null;
  title: string | null;
  phone: string | null;
  createdAt: string;
}

interface Note {
  id: number;
  leadId: number;
  content: string;
  authorName: string | null;
  createdAt: string;
}

const STAGES = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"];
const stageLabels: Record<string, string> = { new: "New", contacted: "Contacted", meeting: "Meeting", proposal: "Proposal", closed_won: "Won", closed_lost: "Lost" };
const activityIcons: Record<string, typeof MessageSquare> = { note: MessageSquare, email: Send, call: Phone, meeting: Video, stage_change: ChevronDown, other: MessageSquare };

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activitiesList, setActivities] = useState<Activity[]>([]);
  const [followUpsList, setFollowUps] = useState<FollowUp[]>([]);
  const [contactsList, setContacts] = useState<Contact[]>([]);
  const [notesList, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityForm, setActivityForm] = useState({ type: "note", title: "", description: "" });
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [followUpForm, setFollowUpForm] = useState({ title: "", due_date: "" });
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", title: "", phone: "" });
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteForm, setNoteForm] = useState({ content: "", author_name: "" });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string>>({});

  const fetchLead = useCallback(async () => {
    const res = await fetch(`/api/crm/leads/${id}`);
    if (!res.ok) { router.push("/crm/leads"); return; }
    const json = await res.json();
    setLead(json.lead);
  }, [id, router]);

  const fetchActivities = useCallback(async () => {
    const res = await fetch(`/api/crm/leads/${id}/activities`);
    const json = await res.json();
    setActivities(json.activities);
  }, [id]);

  const fetchFollowUps = useCallback(async () => {
    const res = await fetch(`/api/crm/leads/${id}/follow-ups`);
    const json = await res.json();
    setFollowUps(json.followUps);
  }, [id]);

  const fetchContacts = useCallback(async () => {
    const res = await fetch(`/api/crm/leads/${id}/contacts`);
    const json = await res.json();
    setContacts(json.contacts);
  }, [id]);

  const fetchNotes = useCallback(async () => {
    const res = await fetch(`/api/crm/leads/${id}/notes`);
    const json = await res.json();
    setNotes(json.notes);
  }, [id]);

  useEffect(() => {
    Promise.all([fetchLead(), fetchActivities(), fetchFollowUps(), fetchContacts(), fetchNotes()]).then(() => setLoading(false));
  }, [fetchLead, fetchActivities, fetchFollowUps, fetchContacts, fetchNotes]);

  const handleStageChange = async (newStage: string) => {
    await fetch(`/api/crm/leads/${id}/stage`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: newStage }),
    });
    fetchLead();
    fetchActivities();
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/crm/leads/${id}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityForm),
    });
    setActivityForm({ type: "note", title: "", description: "" });
    setShowActivityForm(false);
    fetchActivities();
  };

  const handleAddFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/crm/leads/${id}/follow-ups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followUpForm),
    });
    setFollowUpForm({ title: "", due_date: "" });
    setShowFollowUpForm(false);
    fetchFollowUps();
    fetchLead();
  };

  const handleCompleteFollowUp = async (fuId: number) => {
    await fetch(`/api/crm/follow-ups/${fuId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    fetchFollowUps();
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/crm/leads/${id}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm),
    });
    setContactForm({ name: "", email: "", title: "", phone: "" });
    setShowContactForm(false);
    fetchContacts();
  };

  const handleDeleteContact = async (contactId: number) => {
    await fetch(`/api/crm/leads/${id}/contacts/${contactId}`, { method: "DELETE" });
    fetchContacts();
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/crm/leads/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteForm),
    });
    setNoteForm({ content: "", author_name: "" });
    setShowNoteForm(false);
    fetchNotes();
  };

  const handleDeleteNote = async (noteId: number) => {
    await fetch(`/api/crm/leads/${id}/notes/${noteId}`, { method: "DELETE" });
    fetchNotes();
  };

  const handleSaveEdit = async () => {
    await fetch(`/api/crm/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditing(false);
    fetchLead();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this lead? This action cannot be undone.")) return;
    await fetch(`/api/crm/leads/${id}`, { method: "DELETE" });
    router.push("/crm/leads");
  };

  if (loading || !lead) {
    return <div className="text-muted py-12 text-center">Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/crm/leads" className="inline-flex items-center gap-1 text-sm text-muted hover:text-heading mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to Leads
        </Link>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-2xl text-heading flex items-center gap-2">
              <Building2 size={24} className="text-accent shrink-0" />
              {lead.companyName}
            </h1>
            {lead.companyWebsite && (
              <a href={lead.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center gap-1 mt-1">
                <Globe size={12} /> {lead.companyWebsite}
                <ExternalLink size={10} />
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setEditing(true); setEditForm({ contact_name: lead.contactName || "", contact_email: lead.contactEmail || "", contact_title: lead.contactTitle || "", deal_value: lead.dealValue?.toString() || "", priority: lead.priority }); }} className="px-3 py-1.5 text-xs bg-card border border-edge rounded-lg text-muted hover:text-heading transition-colors">Edit</button>
            <button onClick={handleDelete} className="px-3 py-1.5 text-xs bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage Pipeline */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStageChange(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    s === lead.stage ? `stage-${s}` : "bg-card/50 border-edge text-muted hover:text-heading hover:border-edge-light"
                  }`}
                >
                  {stageLabels[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-heading mb-4">Edit Lead</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted mb-1 block">Contact Name</label>
                  <input value={editForm.contact_name || ""} onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })} className="w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Contact Email</label>
                  <input value={editForm.contact_email || ""} onChange={(e) => setEditForm({ ...editForm, contact_email: e.target.value })} className="w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Contact Title</label>
                  <input value={editForm.contact_title || ""} onChange={(e) => setEditForm({ ...editForm, contact_title: e.target.value })} className="w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Deal Value</label>
                  <input type="number" value={editForm.deal_value || ""} onChange={(e) => setEditForm({ ...editForm, deal_value: e.target.value })} className="w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Priority</label>
                  <select value={editForm.priority || "medium"} onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })} className="w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition-colors">Save</button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 bg-card border border-edge text-muted text-sm rounded-lg hover:text-heading transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-heading text-sm flex items-center gap-2">
                <StickyNote size={14} className="text-accent" /> Notes
              </h3>
              <button onClick={() => setShowNoteForm(!showNoteForm)} className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            {showNoteForm && (
              <form onSubmit={handleAddNote} className="mb-4 p-3 bg-surface rounded-lg border border-edge space-y-3">
                <input placeholder="Your name (optional)" value={noteForm.author_name} onChange={(e) => setNoteForm({ ...noteForm, author_name: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <textarea required placeholder="Write a note..." value={noteForm.content} onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })} rows={3} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none resize-none" />
                <div className="flex gap-2">
                  <button type="submit" className="px-3 py-1.5 bg-accent text-white text-xs rounded hover:bg-accent/90 transition-colors">Save Note</button>
                  <button type="button" onClick={() => setShowNoteForm(false)} className="px-3 py-1.5 bg-card border border-edge text-xs text-muted rounded hover:text-heading transition-colors">Cancel</button>
                </div>
              </form>
            )}
            <div className="space-y-3">
              {notesList.length === 0 ? (
                <p className="text-muted text-xs py-4 text-center">No notes yet</p>
              ) : (
                notesList.map((note) => (
                  <div key={note.id} className="p-3 bg-surface rounded-lg border border-edge/50 group">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-heading whitespace-pre-wrap flex-1">{note.content}</p>
                      <button onClick={() => handleDeleteNote(note.id)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-all shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-dim">
                      {note.authorName && <span>{note.authorName}</span>}
                      {note.authorName && <span>·</span>}
                      <span>{new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-heading text-sm">Activity Timeline</h3>
              <button onClick={() => setShowActivityForm(!showActivityForm)} className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            {showActivityForm && (
              <form onSubmit={handleAddActivity} className="mb-4 p-3 bg-surface rounded-lg border border-edge space-y-3">
                <div className="flex gap-2">
                  <select value={activityForm.type} onChange={(e) => setActivityForm({ ...activityForm, type: e.target.value })} className="px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading focus:outline-none">
                    <option value="note">Note</option>
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="other">Other</option>
                  </select>
                  <input required placeholder="Title" value={activityForm.title} onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })} className="flex-1 px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                </div>
                <textarea placeholder="Description (optional)" value={activityForm.description} onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })} rows={2} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none resize-none" />
                <div className="flex gap-2">
                  <button type="submit" className="px-3 py-1.5 bg-accent text-white text-xs rounded hover:bg-accent/90 transition-colors">Save</button>
                  <button type="button" onClick={() => setShowActivityForm(false)} className="px-3 py-1.5 bg-card border border-edge text-xs text-muted rounded hover:text-heading transition-colors">Cancel</button>
                </div>
              </form>
            )}
            <div className="space-y-3">
              {activitiesList.length === 0 ? (
                <p className="text-muted text-xs py-4 text-center">No activities yet</p>
              ) : (
                activitiesList.map((a) => {
                  const Icon = activityIcons[a.type] || MessageSquare;
                  return (
                    <div key={a.id} className="flex gap-3 py-2 border-b border-edge/50 last:border-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${a.type === "stage_change" ? "bg-purple-500/10 text-purple-400" : "bg-accent/10 text-accent"}`}>
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-heading">{a.title}</p>
                        {a.description && <p className="text-xs text-muted mt-0.5">{a.description}</p>}
                        <p className="text-xs text-dim mt-1">{new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Info */}
          <div className="glass-card rounded-xl p-4 space-y-3">
            <h3 className="font-display font-semibold text-heading text-sm">Details</h3>
            <div className="space-y-2 text-sm">
              {lead.contactName && (() => {
                const names = lead.contactName!.split("\n");
                const emails = (lead.contactEmail || "").split("\n");
                const titles = (lead.contactTitle || "").split("\n");
                return names.map((name, i) => (
                  <div key={i} className={`space-y-0.5 ${i > 0 ? "pt-2 border-t border-edge/50" : ""}`}>
                    <div className="flex items-center gap-2 text-muted"><User size={14} /> {name}</div>
                    {emails[i] && emails[i] !== "-" && (
                      <div className="flex items-center gap-2 text-muted pl-5"><Mail size={14} /> <a href={`mailto:${emails[i]}`} className="hover:text-accent text-xs">{emails[i]}</a></div>
                    )}
                    {titles[i] && titles[i] !== "-" && (
                      <div className="flex items-center gap-2 text-muted pl-5"><Briefcase size={14} /> <span className="text-xs">{titles[i]}</span></div>
                    )}
                  </div>
                ));
              })()}
              <div className="flex items-center gap-2 text-muted"><Calendar size={14} /> Created {new Date(lead.createdAt).toLocaleDateString()}</div>
              {lead.dealValue && (
                <div className="flex items-center gap-2 text-heading font-mono">
                  ${lead.dealValue.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className={`priority-${lead.priority} text-xs font-medium capitalize`}>{lead.priority} priority</span>
              </div>
              {lead.source && (
                <div className="text-xs text-muted capitalize">Source: {lead.source}</div>
              )}
            </div>
          </div>

          {/* Contacts */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-heading text-sm">Contacts</h3>
              <button onClick={() => setShowContactForm(!showContactForm)} className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors">
                <UserPlus size={14} />
              </button>
            </div>
            {showContactForm && (
              <form onSubmit={handleAddContact} className="mb-3 p-3 bg-surface rounded-lg border border-edge space-y-2">
                <input required placeholder="Name *" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <input placeholder="Email" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <input placeholder="Title" value={contactForm.title} onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <input placeholder="Phone" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <div className="flex gap-2">
                  <button type="submit" className="px-3 py-1.5 bg-accent text-white text-xs rounded hover:bg-accent/90 transition-colors">Add</button>
                  <button type="button" onClick={() => setShowContactForm(false)} className="px-3 py-1.5 bg-card border border-edge text-xs text-muted rounded hover:text-heading transition-colors">Cancel</button>
                </div>
              </form>
            )}
            <div className="space-y-2">
              {contactsList.length === 0 ? (
                <p className="text-muted text-xs text-center py-2">No additional contacts</p>
              ) : (
                contactsList.map((c) => (
                  <div key={c.id} className="p-2.5 bg-surface rounded-lg border border-edge/50 group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-xs font-medium text-heading flex items-center gap-1.5"><User size={12} /> {c.name}</p>
                        {c.email && <p className="text-xs text-muted flex items-center gap-1.5"><Mail size={12} /> <a href={`mailto:${c.email}`} className="hover:text-accent truncate">{c.email}</a></p>}
                        {c.title && <p className="text-xs text-muted flex items-center gap-1.5"><Briefcase size={12} /> {c.title}</p>}
                        {c.phone && <p className="text-xs text-muted flex items-center gap-1.5"><Phone size={12} /> {c.phone}</p>}
                      </div>
                      <button onClick={() => handleDeleteContact(c.id)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-all shrink-0 mt-0.5">
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Follow-ups */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-heading text-sm">Follow-ups</h3>
              <button onClick={() => setShowFollowUpForm(!showFollowUpForm)} className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors">
                <Plus size={14} />
              </button>
            </div>
            {showFollowUpForm && (
              <form onSubmit={handleAddFollowUp} className="mb-3 p-3 bg-surface rounded-lg border border-edge space-y-2">
                <input required placeholder="Title" value={followUpForm.title} onChange={(e) => setFollowUpForm({ ...followUpForm, title: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading placeholder:text-dim focus:outline-none" />
                <input required type="date" value={followUpForm.due_date} onChange={(e) => setFollowUpForm({ ...followUpForm, due_date: e.target.value })} className="w-full px-2 py-1.5 bg-card border border-edge rounded text-xs text-heading focus:outline-none" />
                <button type="submit" className="px-3 py-1.5 bg-accent text-white text-xs rounded hover:bg-accent/90 transition-colors">Add</button>
              </form>
            )}
            <div className="space-y-2">
              {followUpsList.length === 0 ? (
                <p className="text-muted text-xs text-center py-2">No follow-ups</p>
              ) : (
                followUpsList.map((fu) => (
                  <div key={fu.id} className={`flex items-start gap-2 py-1.5 ${fu.completed ? "opacity-50" : ""}`}>
                    <button
                      onClick={() => handleCompleteFollowUp(fu.id)}
                      className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        fu.completed ? "bg-accent-alt/20 border-accent-alt text-accent-alt" : "border-edge hover:border-accent"
                      }`}
                    >
                      {fu.completed ? <Check size={10} /> : null}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs ${fu.completed ? "line-through text-muted" : "text-heading"}`}>{fu.title}</p>
                      <p className="text-xs text-dim flex items-center gap-1">
                        <Clock size={10} /> {fu.dueDate}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
