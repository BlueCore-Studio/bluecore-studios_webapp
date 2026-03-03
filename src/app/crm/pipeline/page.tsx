"use client";

import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Kanban, Building2, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: number;
  companyName: string;
  companyWebsite: string | null;
  contactName: string | null;
  stage: string;
  priority: string;
  dealValue: number | null;
  source: string | null;
  nextFollowUp: string | null;
  createdAt: string;
  updatedAt: string;
}

const STAGES = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"];
const stageLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  meeting: "Meeting",
  proposal: "Proposal",
  closed_won: "Won",
  closed_lost: "Lost",
};
const stageColors: Record<string, string> = {
  new: "border-t-slate-500",
  contacted: "border-t-blue-500",
  meeting: "border-t-purple-500",
  proposal: "border-t-yellow-500",
  closed_won: "border-t-emerald-500",
  closed_lost: "border-t-red-500",
};

function formatUsd(amount: number | null) {
  if (!amount) return null;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export default function PipelinePage() {
  const [pipeline, setPipeline] = useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = useState(true);

  const fetchPipeline = useCallback(async () => {
    const res = await fetch("/api/crm/pipeline");
    const json = await res.json();
    setPipeline(json.pipeline);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPipeline(); }, [fetchPipeline]);

  const handleDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    const newStage = destination.droppableId;
    const leadId = parseInt(draggableId);

    // Optimistic update
    const oldPipeline = { ...pipeline };
    const newPipeline = { ...pipeline };
    for (const stage of STAGES) {
      newPipeline[stage] = [...(newPipeline[stage] || [])];
    }

    // Find and remove lead from old column
    let movedLead: Lead | undefined;
    for (const stage of STAGES) {
      const idx = newPipeline[stage].findIndex((l) => l.id === leadId);
      if (idx !== -1) {
        movedLead = newPipeline[stage][idx];
        newPipeline[stage].splice(idx, 1);
        break;
      }
    }

    if (!movedLead) return;

    // Add to new column at destination index
    movedLead = { ...movedLead, stage: newStage };
    newPipeline[newStage].splice(destination.index, 0, movedLead);
    setPipeline(newPipeline);

    // API call
    try {
      await fetch(`/api/crm/leads/${leadId}/stage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
    } catch {
      setPipeline(oldPipeline);
    }
  };

  if (loading) {
    return <div className="text-muted py-12 text-center">Loading pipeline...</div>;
  }

  const totalValue = Object.values(pipeline).flat().reduce((sum, l) => sum + (l.dealValue || 0), 0);
  const activeLeads = Object.values(pipeline).flat().length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Kanban size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Pipeline</h1>
        <div className="ml-auto flex items-center gap-4 text-sm text-muted">
          <span>{activeLeads} leads</span>
          {totalValue > 0 && <span className="font-mono text-heading">{formatUsd(totalValue)} total</span>}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-8 lg:px-8">
          {STAGES.map((stage) => {
            const stageLeads = pipeline[stage] || [];
            const stageValue = stageLeads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

            return (
              <div key={stage} className="flex-shrink-0 w-72">
                <div className={`bg-raised rounded-xl border border-edge ${stageColors[stage]} border-t-2 overflow-hidden`}>
                  {/* Column Header */}
                  <div className="px-3 py-2.5 border-b border-edge">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-heading">{stageLabels[stage]}</h3>
                      <span className="text-xs text-muted bg-card px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                    </div>
                    {stageValue > 0 && (
                      <p className="text-xs text-muted font-mono mt-0.5">{formatUsd(stageValue)}</p>
                    )}
                  </div>

                  {/* Cards */}
                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-2 min-h-[120px] space-y-2 transition-colors ${
                          snapshot.isDraggingOver ? "bg-accent/5" : ""
                        }`}
                      >
                        {stageLeads.map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-card border border-edge rounded-lg p-3 cursor-grab active:cursor-grabbing transition-shadow ${
                                  snapshot.isDragging ? "shadow-lg shadow-accent/10 border-accent/30" : ""
                                }`}
                              >
                                <Link href={`/crm/leads/${lead.id}`} className="block">
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h4 className="text-sm font-medium text-heading leading-tight hover:text-accent transition-colors">
                                      {lead.companyName}
                                    </h4>
                                    <span className={`priority-${lead.priority} text-[10px] font-medium capitalize shrink-0`}>
                                      {lead.priority}
                                    </span>
                                  </div>
                                  {lead.contactName && (
                                    <div className="flex items-center gap-1 text-xs text-muted mb-1">
                                      <Building2 size={10} /> {lead.contactName.split("\n")[0]}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-3 mt-2">
                                    {lead.dealValue && (
                                      <span className="flex items-center gap-1 text-xs text-accent-alt font-mono">
                                        <DollarSign size={10} />{formatUsd(lead.dealValue)}
                                      </span>
                                    )}
                                    {lead.nextFollowUp && (
                                      <span className="flex items-center gap-1 text-xs text-muted">
                                        <Calendar size={10} />{lead.nextFollowUp}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {stageLeads.length === 0 && (
                          <div className="text-center py-6 text-xs text-dim">
                            Drop leads here
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
