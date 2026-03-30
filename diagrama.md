# Arquitetura do Projeto — Matriz de Eisenhower

```mermaid
graph TB
    subgraph Cliente["🌐 Cliente (Vercel)"]
        UI["React + TypeScript\n(Vite)"]
        subgraph Componentes
            SB["Sidebar\n(PERSONAL / WORK)"]
            Q1["Q1 — Urgente + Importante"]
            Q2["Q2 — Importante, Não Urgente"]
            Q3["Q3 — Urgente, Não Importante"]
            Q4["Q4 — Não Urgente, Não Importante"]
        end
        API_SVC["services/api.ts\n(axios)"]
    end

    subgraph Backend["☁️ Backend (Render — Docker)"]
        CTRL["TaskController\n/api/tasks"]
        SVC["TaskService"]
        REPO["TaskRepository\n(Spring Data JPA)"]
        SWAGGER["Swagger UI\n/swagger-ui.html"]
    end

    subgraph DB["🗄️ Banco de Dados (PostgreSQL)"]
        TASKS[("tasks\nid · title · description\nquadrant · status · matrix\ndueDate · createdAt · completedAt")]
    end

    UI --> SB
    UI --> Q1 & Q2 & Q3 & Q4
    Q1 & Q2 & Q3 & Q4 -->|"drag & drop\nonMoveTask"| Q1
    UI --> API_SVC

    API_SVC -->|"POST /tasks"| CTRL
    API_SVC -->|"GET /tasks?matrix="| CTRL
    API_SVC -->|"PATCH /{id}/complete"| CTRL
    API_SVC -->|"PATCH /{id}/move"| CTRL
    API_SVC -->|"DELETE /{id}"| CTRL

    CTRL --> SVC --> REPO --> TASKS

    SWAGGER -.->|documenta| CTRL
```

## Fluxo resumido

1. O usuário escolhe a **matriz** (Pessoal ou Trabalho) na Sidebar
2. O frontend busca as tarefas via `GET /tasks?matrix=` e distribui nos 4 quadrantes
3. Cada ação (criar, concluir, mover, deletar) dispara um request REST para o backend
4. O **TaskController** delega para o **TaskService**, que persiste no PostgreSQL via JPA
5. O backend roda em container Docker no Render; o frontend está no Vercel
