# Backlog — Página de Performance Pessoal

Evolução do projeto para uma plataforma completa de desenvolvimento de carreira,
com a Matriz de Eisenhower como ponto de partida.

---

## Nível 1 — CRUD simples (prioridade alta)

- [ ] **Livros** — título, autor, categoria, status (lido/lendo/quero ler), avaliação (1-5 estrelas), principais pontos/aprendizados, data de leitura. Visualização em lista simples.
- [ ] **Feedback Recebido** — texto, data, quem deu, contexto. Lista ordenada por data.
- [ ] **Certificações e Cursos** — título, instituição, status (concluído/em andamento/planejado), data de conclusão, link.
- [ ] **Conquistas** — título, descrição, data, impacto. Portfólio de entregas relevantes.

## Nível 2 — CRUD com mais estrutura

- [ ] **1:1s** — data, gestor, pauta (lista de itens), anotações, próximos passos.
- [ ] **Diário de Bordo** — entradas por data com tipo (aprendizado / conquista / desafio) e descrição.
- [ ] **PDI** (Plano de Desenvolvimento Individual) — metas com prazo, % de progresso, categorização em curto/médio/longo prazo.
- [ ] **Hábitos** — tracker de hábitos diários com registro por dia e histórico de sequência.

## Nível 3 — Lógica e visualização mais complexa

- [ ] **Metas OKR** — hierarquia Objective → Key Results com cálculo automático de % de conclusão.
- [ ] **Habilidades** — mapa de competências técnicas e comportamentais com nível atual vs desejado.
- [ ] **Trilha de Carreira** — visualização do caminho atual → próximo nível → longo prazo.
- [ ] **Roda da Vida** — avaliação periódica de equilíbrio entre áreas (carreira, saúde, relacionamentos etc.) com gráfico radial.

---

## Próximo passo

Implementar **Livros** (Nível 1) seguindo o mesmo padrão das tasks:
- Backend: tabela `books` + CRUD REST
- Frontend: nova página no menu lateral com lista simples
