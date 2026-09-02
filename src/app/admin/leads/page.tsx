import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSiteLeads } from "@/lib/actions/site-lead.actions";

const WHATSAPP_BASE = "https://wa.me/";

function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  const local = d.startsWith("55") ? d.slice(2) : d;
  if (local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  if (local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  return digits;
}

function formatDate(value?: string): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { leads = [] } = await getSiteLeads();

  const verified = leads.filter((l: any) => l.verified);
  const pending = leads.filter((l: any) => !l.verified);

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-noto text-4xl text-[#001629] tracking-tighter mb-1">
              Leads do <em className="font-normal italic text-[#775a19]">Site</em>
            </h1>
            <p className="font-manrope text-[11px] uppercase tracking-[0.2em] text-[#001629]/40">
              Contatos que pediram para ver todas as fotos
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/admin/dashboard"
              className="px-5 py-2.5 border border-[#001629]/20 text-[#001629] text-[10px] font-manrope uppercase tracking-widest hover:border-[#001629] transition-all"
            >
              ← Imóveis
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { label: "Total de Leads", value: leads.length, accent: false },
            { label: "Número Confirmado", value: verified.length, accent: true },
            { label: "Não Confirmaram", value: pending.length, accent: false },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#001629]/5 p-8">
              <p className="text-[10px] font-manrope uppercase tracking-[0.25em] text-[#001629]/40 mb-4">
                {stat.label}
              </p>
              <p className={`font-noto text-5xl ${stat.accent ? "text-[#775a19]" : "text-[#001629]"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {leads.length === 0 ? (
          <div className="bg-white border border-[#001629]/5 p-20 text-center">
            <p className="font-noto text-2xl text-[#001629]/20 mb-4">Nenhum lead capturado ainda</p>
            <p className="font-manrope text-xs text-[#001629]/30 uppercase tracking-widest">
              Aparecem aqui assim que alguém pedir para ver todas as fotos de um imóvel
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#001629]/5 overflow-hidden">
            <div className="grid grid-cols-[1fr_140px_1fr_120px_130px] gap-0 px-6 py-4 border-b border-[#001629]/5 bg-[#001629]/[0.02]">
              {["Nome", "WhatsApp", "Imóvel de interesse", "Confirmado", "Quando"].map((h) => (
                <span key={h} className="font-manrope text-[9px] uppercase tracking-[0.25em] text-[#001629]/40">
                  {h}
                </span>
              ))}
            </div>

            {leads.map((lead: any) => (
              <div
                key={lead._id}
                className="grid grid-cols-[1fr_140px_1fr_120px_130px] gap-0 px-6 py-4 border-b border-[#001629]/5 items-center hover:bg-[#001629]/[0.015] transition-colors"
              >
                <span className="font-noto text-sm text-[#001629] truncate pr-4">{lead.name}</span>

                <a
                  href={`${WHATSAPP_BASE}${lead.phone.startsWith("55") ? lead.phone : `55${lead.phone}`}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-xs text-[#775a19] hover:underline"
                >
                  {formatPhone(lead.phone)}
                </a>

                <span className="font-manrope text-xs text-[#001629]/60 truncate pr-4">
                  {lead.propertySlug ? (
                    <a
                      href={`/imoveis/${lead.propertySlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#775a19] hover:underline"
                    >
                      {lead.propertyTitle || lead.propertySlug}
                    </a>
                  ) : (
                    lead.propertyTitle || "—"
                  )}
                </span>

                <span>
                  {lead.verified ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-manrope font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Confirmado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#001629]/5 text-[#001629]/50 text-[9px] font-manrope font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#001629]/20" />
                      Pendente
                    </span>
                  )}
                </span>

                <span className="font-manrope text-[11px] text-[#001629]/40 tabular-nums">
                  {formatDate(lead.verifiedAt || lead.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
