import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllCondominiums } from "@/lib/actions/condominium.actions";
import CondominiumTable from "@/components/admin/CondominiumTable";

export default async function AdminCondominiumsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { condominiums = [] } = await getAllCondominiums();

  const totalCount = condominiums.length;
  const featuredCount = condominiums.filter((c: any) => c.isFeatured).length;
  const publishedCount = condominiums.filter((c: any) => c.isPublished).length;

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-noto text-4xl text-[#001629] tracking-tighter mb-1">
              Painel de <em className="font-normal italic text-[#775a19]">Condomínios</em>
            </h1>
            <p className="font-manrope text-[11px] uppercase tracking-[0.2em] text-[#001629]/40">
              Residenciais e empreendimentos da região
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/admin/dashboard"
              className="px-5 py-2.5 border border-[#001629]/20 text-[#001629] text-[10px] font-manrope uppercase tracking-widest hover:border-[#001629] transition-all"
            >
              ← Imóveis
            </a>
            <a
              href="/"
              target="_blank"
              className="px-5 py-2.5 border border-[#001629]/20 text-[#001629] text-[10px] font-manrope uppercase tracking-widest hover:border-[#001629] transition-all"
            >
              Ver Site
            </a>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { label: "Total de Condomínios", value: totalCount, accent: false },
            { label: "Em Destaque", value: featuredCount, accent: true },
            { label: "Publicados", value: publishedCount, accent: false },
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

        {/* Actions bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-noto text-xl text-[#001629]">
            Condomínios Cadastrados
          </h2>
          <a
            href="/admin/condominiums/new"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#001629] text-white text-[10px] font-manrope uppercase tracking-[0.3em] hover:bg-[#775a19] transition-colors duration-300"
          >
            <span className="text-base leading-none">+</span>
            Novo Condomínio
          </a>
        </div>

        {condominiums.length === 0 ? (
          <div className="bg-white border border-[#001629]/5 p-20 text-center">
            <p className="font-noto text-2xl text-[#001629]/20 mb-4">Nenhum condomínio cadastrado</p>
            <p className="font-manrope text-xs text-[#001629]/30 uppercase tracking-widest mb-8">
              Cadastre o primeiro residencial ou empreendimento
            </p>
            <a
              href="/admin/condominiums/new"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#001629] text-white text-[10px] font-manrope uppercase tracking-[0.3em]"
            >
              + Novo Condomínio
            </a>
          </div>
        ) : (
          <CondominiumTable condominiums={condominiums} />
        )}

      </div>
    </div>
  );
}
