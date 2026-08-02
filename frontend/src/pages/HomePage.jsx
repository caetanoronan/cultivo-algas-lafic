import { ApiStatus } from '../components/ApiStatus';
import { SectionCard } from '../components/SectionCard';

const quickLinks = [
  {
    label: 'Abrir experimento',
    href: '../experimento_entressafra.html',
    style: 'bg-slate-950 text-white hover:bg-slate-800',
  },
  {
    label: 'Abrir app de bancada',
    href: '../app/Registro_semanal_bancada.html',
    style: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50',
  },
];

const roadmap = [
  'Frontend principal em React + Vite + Tailwind',
  'Backend Express no Render com integração ao Notion',
  'GitHub Pages para o material público do projeto',
  'App de bancada com leitura e escrita de medições',
];

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-8 md:py-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-glow backdrop-blur-xl md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,95,115,0.12),transparent_28%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-lagoon-800/70">LAFIC / UFSC</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Cultivo de macroalgas nativas na entressafra.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Repositório unificado para o experimento principal, o app de bancada e o backend que grava os dados no Notion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${link.style}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-slate-950 p-6 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Estrutura atual</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              {roadmap.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          eyebrow="Frontend"
          title="Experimento principal"
          description="A versão clássica do experimento continua disponível como HTML estático, já com os gráficos e desenhos organizados para publicação pública."
        >
          <p className="text-sm leading-7 text-slate-600">
            Ideal para GitHub Pages, apresentações e compartilhamento rápido com a equipe.
          </p>
        </SectionCard>

        <SectionCard
          eyebrow="Operação"
          title="App de bancada"
          description="A interface semanal de medições continua em HTML/JS, mas agora conversa com o backend modular do Render."
        >
          <p className="text-sm leading-7 text-slate-600">
            Abra o app para registrar medições e acompanhar o histórico ligado ao Notion.
          </p>
        </SectionCard>
      </section>

      <div className="mt-6">
        <ApiStatus />
      </div>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        <SectionCard
          eyebrow="Publicação"
          title="GitHub Pages"
          description="Hospeda o material institucional e o frontend principal a partir da branch main."
        />
        <SectionCard
          eyebrow="Backend"
          title="Render"
          description="Serviço Node apontando para backend/ com as variáveis do Notion configuradas."
        />
        <SectionCard
          eyebrow="Banco de dados"
          title="Notion"
          description="O cadastro das medições depende da integração e do database ID já preparados."
        />
      </section>
    </main>
  );
}