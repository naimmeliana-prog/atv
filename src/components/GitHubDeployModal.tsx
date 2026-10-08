import React, { useState } from 'react';
import { X, Github, Download, Terminal, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const stepsBundle = `git clone atv-repo.bundle atv
cd atv
git remote set-url origin https://github.com/naimmeliana-prog/atv.git
git push -u origin main`;

  const stepsTar = `tar -xzvf atv-project.tar.gz
cd atv-project
git init
git remote add origin https://github.com/naimmeliana-prog/atv.git
git add .
git commit -m "feat: ATV Estudio completo"
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-stone-900 text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Subir a GitHub y Desplegar en Vercel
              </h3>
              <p className="text-xs text-stone-600">
                Repositorio: <code className="font-mono text-teal-800">naimmeliana-prog/atv</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>¿Por qué GitHub no tiene el código todavía?</span>
          </div>
          <p>
            Por seguridad, ningún entorno externo puede escribir en tu cuenta de GitHub sin tus credenciales (usuario y contraseña/token). El código ya está 100% programado, compilado y con el historial de Git preparado en la rama <code className="font-bold text-stone-800">main</code>.
          </p>
        </div>

        {/* Option 1: Direct Download */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs">1</span>
            Descargar el proyecto completo empaquetado
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/atv-project.tar.gz"
              download="atv-project.tar.gz"
              className="flex items-center justify-between p-3.5 rounded-xl border border-stone-300 hover:border-teal-600 hover:bg-teal-50/50 transition text-xs font-semibold text-stone-800 group"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-700 group-hover:scale-110 transition" />
                <span>Descargar Código (.tar.gz)</span>
              </div>
              <span className="text-[10px] text-stone-500 font-normal">Todo listo</span>
            </a>

            <a
              href="/atv-repo.bundle"
              download="atv-repo.bundle"
              className="flex items-center justify-between p-3.5 rounded-xl border border-stone-300 hover:border-teal-600 hover:bg-teal-50/50 transition text-xs font-semibold text-stone-800 group"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-700 group-hover:scale-110 transition" />
                <span>Descargar Git Bundle (.bundle)</span>
              </div>
              <span className="text-[10px] text-stone-500 font-normal">Con historial</span>
            </a>
          </div>
        </div>

        {/* Option 2: Run in terminal */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs">2</span>
            Comandos rápidos para subir a tu GitHub
          </h4>
          <div className="relative rounded-2xl bg-stone-900 text-stone-100 p-4 font-mono text-xs">
            <button
              onClick={() => copyToClipboard(stepsBundle, 1)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition flex items-center gap-1 text-[11px]"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Copiado' : 'Copiar'}</span>
            </button>
            <pre className="overflow-x-auto pr-16 leading-relaxed">
              {stepsBundle}
            </pre>
          </div>
        </div>

        {/* Option 3: Deploy in Vercel */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1.5">
          <div className="flex items-center justify-between">
            <strong className="text-stone-900">Paso siguiente: Despliegue en Vercel (1 clic)</strong>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-700 hover:underline font-bold"
            >
              <span>vercel.com/new</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Una vez subido el código a tu GitHub, entra en Vercel, selecciona el repositorio <code className="font-bold">naimmeliana-prog/atv</code> y pulsa <strong>Deploy</strong>. La configuración <code className="font-mono text-teal-800">vercel.json</code> ya está incluida y se desplegará automáticamente.
          </p>
        </div>

        <div className="flex justify-end pt-2 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
