import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllProperties } from "@/lib/actions/property.actions";
import PropertyTable from "@/components/admin/PropertyTable";

const CATEGORY_LABELS: Record<string, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { properties = [] } = await getAllProperties();

  const totalCount = properties.length;
  const featuredCount = properties.filter((p: any) => p.isFeatured).length;
  const publishedCount = properties.filter((p: any) => p.isPublished).length;

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-noto text-4xl text-[#001629] tracking-tighter mb-1">
              Painel de <em className="font-normal italic text-[#775a19]">Controle</em>
            </h1>
            <p className="font-manrope text-[11px] uppercase tracking-[0.2em] text-[#001629]/40">
              Gerencie seus imóveis e conteúdos
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-manrope uppercase tracking-widest text-[#001629]/40">
              Olá, {session.user?.name}
            </span>
            <a
              href="/"
              target="_blank"
              className="px-5 py-2.5 border border-[#001629]/20 text-[#001629] text-[10px] font-manrope uppercase tracking-widest hover:border-[#001629] transition-all"
            >
              Ver Site
            </a>
            <a
              href="/api/auth/signout"
              className="px-5 py-2.5 bg-[#001629] text-white text-[10px] font-manrope uppercase tracking-widest hover:bg-[#001629]/80 transition-all"
            >
              Sair
            </a>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { label: "Total de Imóveis", value: totalCount, accent: false },
            { label: "Em Destaque", value: featuredCount, accent: true },
            { label: "Publicados", value: publishedCount, accent: false },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-[#001629]/5 p-8"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
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
            Vitrine Imobiliária
          </h2>
          <a
            href="/admin/properties/new"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#001629] text-white text-[10px] font-manrope uppercase tracking-[0.3em] hover:bg-[#775a19] transition-colors duration-300"
          >
            <span className="text-base leading-none">+</span>
            Novo Imóvel
          </a>
        </div>

        {/* Property Table — Client Component for interactivity */}
        {properties.length === 0 ? (
          <div className="bg-white border border-[#001629]/5 p-20 text-center">
            <p className="font-noto text-2xl text-[#001629]/20 mb-4">Nenhum imóvel cadastrado</p>
            <p className="font-manrope text-xs text-[#001629]/30 uppercase tracking-widest mb-8">
              Adicione seu primeiro patrimônio à vitrine
            </p>
            <a
              href="/admin/properties/new"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#001629] text-white text-[10px] font-manrope uppercase tracking-[0.3em]"
            >
              + Novo Imóvel
            </a>
          </div>
        ) : (
          <PropertyTable properties={properties} categoryLabels={CATEGORY_LABELS} />
        )}

      </div>
    </div>
  );
}
