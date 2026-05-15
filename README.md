# Kids Music - Deploy GitHub + Vercel

## 📁 Estrutura do Projeto

```
/
├── index.html          → HTML estrutural + tracking inline
├── css/
│   └── styles.min.css  → CSS minificado
├── js/
│   └── app.obf.js      → JavaScript ofuscado + anti-debug
├── vercel.json         → Headers de segurança (Vercel)
└── README.md           → Este arquivo
```

## 🚀 Deploy no Vercel (GitHub)

### Passo 1: Commit no GitHub

1. Crie um novo repositório no GitHub (ex: `kidsmusic-site`)
2. Faça upload dos arquivos:
   - `index.html`
   - `css/styles.min.css`
   - `js/app.obf.js`
   - `vercel.json`
3. Commit e push para a branch `main`

### Passo 2: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em **"Add New Project"**
3. Importe o repositório `kidsmusic-site`
4. O Vercel detectará automaticamente como **"Other"** (HTML estático)
5. Clique em **"Deploy"**

### Passo 3: Configurar Domínio (opcional)

1. No dashboard do Vercel, vá em **Settings → Domains**
2. Adicione seu domínio personalizado
3. Siga as instruções de DNS fornecidas pelo Vercel

## 🛡️ O que foi feito

### Separação de Arquivos
- CSS extraído para `css/styles.min.css`
- JS extraído para `js/app.obf.js`
- Tracking scripts (Meta Pixel, Google Tag, Clarity, UTMify) mantidos inline no `<head>`

### Segurança Aplicada
- **Minificação**: CSS e JS comprimidos
- **Ofuscação JS**: Variáveis renomeadas, strings codificadas, fluxo embaralhado
- **Anti-Debug**: Detecção de DevTools
- **Self-Defending**: Código detecta modificação e quebra
- **Anti-Cópia**: Bloqueio de right-click, seleção de texto, atalhos F12/Ctrl+Shift+I
- **Headers de Segurança**: Via `vercel.json` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

### Correções de Bugs
- `initVimeoPlayer` duplicada → unificada
- IDs faltantes (`navbar`, `burger`, `mobileMenu`) adicionados
- Eventos inline (`onclick`) convertidos para `data-action` + `addEventListener`

## ⚠️ Limitações de Segurança

Nenhuma proteção client-side é 100% infalível. Um desenvolvedor experiente com ferramentas especializadas ainda pode reverter o código. A estratégia é tornar a engenharia reversa economicamente inviável para 99% dos usuários.

Para proteção REAL de lógica sensível (URL do Google Sheets, redirecionamento de pagamento), considere mover o processamento para um **backend** no futuro.

## 🔧 Atualizações Futuras

Para atualizar o site:
1. Faça as alterações nos arquivos locais
2. Commit e push para o GitHub
3. O Vercel fará deploy automaticamente (CI/CD)

## 📞 Suporte

Em caso de problemas após o deploy:
1. Verifique o console do navegador (F12) por erros
2. Confira os logs no dashboard do Vercel
3. Certifique-se de que todos os arquivos foram commitados no GitHub
