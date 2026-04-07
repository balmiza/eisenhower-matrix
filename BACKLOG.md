# Backlog — Plataforma Performance

> Portal focado em ajudar profissionais a se organizarem melhor no dia a dia, gerenciar metas e objetivos de carreira.

---

## Como usar este arquivo

Cada item tem uma prioridade (🔴 Alta / 🟡 Média / 🔵 Baixa), uma estimativa de complexidade (P = Pequeno, M = Médio, G = Grande) e um status.

**Status:** `[ ]` Pendente · `[x]` Concluído · `[-]` Em progresso

---

## 🗂️ Matriz de Eisenhower

- [ ] 🔴 P — Filtro para exibir apenas tarefas pendentes ou concluídas
- [ ] 🔴 M — Notificação/alerta visual para tarefas com prazo vencido
- [ ] 🟡 M — Edição inline de tarefas (sem abrir modal)
- [ ] 🟡 M — Subtarefas dentro de uma tarefa
- [ ] 🟡 P — Contador de tarefas por quadrante no header
- [ ] 🔵 G — Histórico de tarefas concluídas com linha do tempo
- [ ] 🔵 M — Exportar tarefas em CSV ou PDF
- [ ] 🔵 P — Arrastar e soltar tarefas entre quadrantes (drag and drop)

---

## 🎯 PDI (Plano de Desenvolvimento Individual)

- [ ] 🔴 M — Barra de progresso visual por meta
- [ ] 🔴 M — Notificação de metas com prazo próximo (menos de 30 dias)
- [ ] 🟡 M — Checklist de ações dentro de cada meta
- [ ] 🟡 G — Histórico de atualizações de progresso por meta
- [ ] 🟡 P — Badge/conquista ao concluir uma meta
- [ ] 🔵 G — Relatório de evolução do PDI com gráfico de progresso ao longo do tempo
- [ ] 🔵 M — Modelo de meta com sugestões pré-preenchidas por categoria (Técnico, Comportamental, Liderança)

---

## 📚 Livros

- [ ] 🔴 P — Filtro por status (Quero Ler, Lendo, Lido)
- [ ] 🟡 P — Filtro por categoria
- [ ] 🟡 M — Campo de notas/citações por livro
- [ ] 🟡 M — Meta de leitura anual com acompanhamento (ex: "quero ler 12 livros em 2026")
- [ ] 🔵 M — Busca de livro por título ou autor com auto-complete via API pública (Open Library)
- [ ] 🔵 P — Exportar lista de livros lidos

---

## 📝 Diário de Bordo

- [ ] 🔴 P — Filtro por tipo de entrada (Aprendizado, Conquista, Desafio)
- [ ] 🟡 M — Busca por conteúdo das entradas
- [ ] 🟡 G — Resumo semanal automático das entradas (agrupado por semana)
- [ ] 🔵 M — Mood tracker (estado emocional) junto com cada entrada
- [ ] 🔵 G — Exportar diário em PDF

---

## 🤝 1:1s

- [ ] 🔴 P — Filtro por gestor/manager
- [ ] 🟡 M — Template de pauta pré-definida para novos 1:1s
- [ ] 🟡 M — Ação de "duplicar reunião" para reaproveitar pauta de encontros anteriores
- [ ] 🟡 P — Campo de status (Agendado, Realizado, Cancelado)
- [ ] 🔵 G — Relatório de frequência de 1:1s por gestor

---

## 🏠 Geral / Plataforma

- [ ] 🔴 M — Dashboard inicial com resumo de todas as seções (tarefas pendentes, metas em andamento, último 1:1, última entrada do diário)
- [ ] 🔴 M — Notificações in-app (tarefas vencidas, metas próximas do prazo)
- [ ] 🟡 G — Modo escuro / claro (toggle de tema)
- [ ] 🟡 M — Perfil do usuário (foto, nome, cargo, empresa)
- [ ] 🟡 G — Relatório semanal consolidado por e-mail com resumo da semana
- [ ] 🔵 G — Integração com Google Calendar para sincronizar 1:1s e tarefas com prazo
- [ ] 🔵 G — Versão mobile (PWA ou app nativo)
- [ ] 🔵 M — Onboarding para novos usuários (tour guiado nas funcionalidades)

---

## 🔒 Segurança / Tech Debt

- [ ] 🟡 M — Atualizar Spring Boot para versão mais recente (atualmente 3.2.3)
- [ ] 🟡 P — Restringir `allowedHeaders` no CORS para `Authorization, Content-Type`
- [ ] 🟡 P — Adicionar Content-Security-Policy (CSP) no vercel.json
- [ ] 🔵 P — Adicionar Referrer-Policy no index.html
- [ ] 🔵 M — Adicionar OWASP Dependency-Check ao pipeline de CI
