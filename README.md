# Barber-shop

![GitHub stars](https://img.shields.io/github/stars/Rhuann01/Barber-shop?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/Rhuann01/Barber-shop?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/Rhuann01/Barber-shop?style=for-the-badge&logo=github) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## 📑 Table of Contents

- [Barber-shop](#barber-shop)
  - [📑 Table of Contents](#-table-of-contents)
  - [📝 Description](#-description)
  - [✨ Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [⚡ Quick Start](#-quick-start)
  - [📦 Key Dependencies](#-key-dependencies)
  - [🚀 Run Commands](#-run-commands)
  - [📁 Project Structure](#-project-structure)
  - [🛠️ Development Setup](#️-development-setup)
    - [Node.js/JavaScript Setup](#nodejsjavascript-setup)
  - [👥 Contributing](#-contributing)
  - [📜 License](#-license)

## 📝 Description

Barber-shop is a high-performance, full-stack SaaS platform meticulously crafted to streamline barbershop operations and elevate the client booking experience. Developed using Next.js, React, and TypeScript, the application ensures a type-safe, responsive, and SEO-friendly environment. Key features include a robust scheduling engine, secure user authentication for both staff and customers, and a dedicated API-driven architecture that facilitates real-time data persistence through a scalable database. This modern web solution empowers barbers to manage their business efficiently while providing clients with a frictionless interface to book appointments anytime, anywhere.

## ✨ Features

- 🌐 Api
- 🗄️ Database
- 🔐 Auth
- 🕸️ Web

## 🛠️ Tech Stack

<div align="center">
  <img alt="typescript" src="https://skillicons.dev/icons?i=ts" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=react" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=next" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=tailwindcss" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=docker" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=prisma" height=35 >
  <img alt="typescript" src="https://skillicons.dev/icons?i=postgres" height=35 >
</div>

## ⚡ Quick Start

```bash

# Clone the repository
git clone https://github.com/Rhuann01/Barber-shop.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Key Dependencies

```
@auth/prisma-adapter: ^2.11.2
@hookform/resolvers: ^5.2.2
@next-auth/prisma-adapter: ^1.0.7
@prisma/adapter-pg: ^7.7.0
@prisma/client: ^7.7.0
@prisma/extension-accelerate: ^3.0.1
class-variance-authority: ^0.7.1
clsx: ^2.1.1
date-fns: ^4.1.0
dotenv: ^17.4.2
git-commit-msg-linter: ^5.0.8
husky: ^9.1.7
lint-staged: ^16.4.0
lucide-react: ^1.8.0
next: 16.2.4
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **start**: `npm run start`
- **lint**: `npm run lint`
- **prepare**: `npm run prepare`

## 📁 Project Structure

```
.
├── .husky
│   ├── commit-msg
│   └── pre-commit
├── LICENSE.txt
├── app
│   ├── _actions
│   │   ├── create-booking.ts
│   │   ├── delete-booking.ts
│   │   └── get-booking.ts
│   ├── _components
│   │   ├── barbershop-item.tsx
│   │   ├── booking-item.tsx
│   │   ├── header.tsx
│   │   ├── phone-item.tsx
│   │   ├── providers.tsx
│   │   ├── sectionTitle.tsx
│   │   ├── sing-in-dialog.tsx
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar-edit-item.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── delete-booking-item.tsx
│   │       ├── dialog.tsx
│   │       ├── field.tsx
│   │       ├── footer.tsx
│   │       ├── label.tsx
│   │       ├── menuIconBtn.tsx
│   │       ├── search-item.tsx
│   │       ├── separator.tsx
│   │       ├── services-item.tsx
│   │       ├── sheet.tsx
│   │       ├── sideebar-sheet.tsx
│   │       ├── sonner.tsx
│   │       ├── spinner.tsx
│   │       ├── tabs.tsx
│   │       └── user-hello-item.tsx
│   ├── _lib
│   │   ├── auth-options.ts
│   │   ├── filter.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── _providers
│   │   └── auth.tsx
│   ├── api
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
│   ├── barbershops
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── bookings
│   │   └── page.tsx
│   ├── constants
│   │   ├── hors.ts
│   │   └── search.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── schemas
│       └── schemas.ts
├── components.json
├── docker-compose.yml
├── eslint.config.mjs
├── exemple.env
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20260416205127_init_db
│   │   │   └── migration.sql
│   │   ├── 20260419162211_add_auth_tables
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
├── public
│   ├── Banner.svg
│   ├── Banner01.png
│   ├── Google.svg
│   ├── Logo.png
│   ├── barba.svg
│   ├── hidrat.svg
│   ├── lamina.svg
│   ├── map.png
│   ├── massagem.svg
│   ├── noImgPerfil.jpg
│   ├── sobrancelha.svg
│   └── tesoura.svg
├── tsconfig.json
└── types
    └── next-auth.d.ts
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup

1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/Rhuann01/Barber-shop.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the MIT License.
