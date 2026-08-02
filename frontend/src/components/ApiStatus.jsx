import { useEffect, useState } from 'react';
import { fetchHealth, getApiBaseUrl } from '../services/api';
import { StatusPill } from './StatusPill';

export function ApiStatus() {
  const [state, setState] = useState('checking');

  useEffect(() => {
    let mounted = true;

    fetchHealth()
      .then(() => mounted && setState('online'))
      .catch(() => mounted && setState('offline'));

    return () => {
      mounted = false;
    };
  }, []);

  const config = {
    checking: {
      label: 'Verificando backend',
      tone: 'amber',
      text: 'Conectando ao serviço do Render.',
    },
    online: {
      label: 'API online',
      tone: 'emerald',
      text: 'O backend respondeu e o app pode enviar medições ao Notion.',
    },
    offline: {
      label: 'API offline',
      tone: 'amber',
      text: 'Defina VITE_API_BASE_URL ou publique o backend no Render.',
    },
  };

  const current = config[state];

  return (
    <div className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-glow backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lagoon-800/60">Conexão</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Backend e Notion</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{current.text}</p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <StatusPill label={current.label} tone={current.tone} />
          <p className="text-xs text-slate-500">Base atual: {getApiBaseUrl()}</p>
        </div>
      </div>
    </div>
  );
}