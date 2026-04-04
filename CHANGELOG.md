# Changelog - Imóveis Capão Novo

Todas as mudanças notáveis para o projeto "Imóveis Capão Novo Site" serão documentadas neste arquivo.

## [1.5.0] - 2026-04-03
### Adicionado
- **Painel Administrativo CMS:** Rota `/admin` protegida por NextAuth para gestão de imóveis.
- **Integração MongoDB:** Persistência de dados completa para os imóveis.
- **Cloudinary Media:** Sistema de upload de imagens integrado ao CMS.
- **Busca Dinâmica:** A barra "Encontre seu imóvel ideal" agora filtra resultados reais do banco de dados.
- **Página de Resultados:** Nova rota `/imoveis` com grid dinâmico baseado em filtros.
- **Autocompletar de Endereço:** Lista de ruas de Capão Novo integrada ao formulário de cadastro.

### Alterado
- **Home Page:** Seção "Novos Agenciamentos" agora exibe automaticamente os 8 imóveis mais recentes do banco.
- **Next Config:** Aumentado limite de `bodySizeLimit` para 20MB para suportar uploads de fotos de alta resolução.

### Corrigido
- **Payload Error:** Resolvido o erro de "Unexpected Error" durante o upload de múltiplas fotos pesadas.
- **Máscaras de Valor:** Implementada formatação em tempo real (R$) para os campos de preço, condomínio e IPTU no Admin.

---

## [1.0.0] - 2026-03-23
### Adicionado
- Estrutura inicial do projeto em Next.js 14.
- Design Premium (Navy / Gold / Noto Serif).
- Páginas estáticas para SEO.
- Integração com Google Analytics e Scroll Tracker.
