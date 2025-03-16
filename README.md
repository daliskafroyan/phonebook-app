# React + Vite Phonebook Application

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dan5py/react-vite-ui/blob/main/LICENSE)

A modern phonebook application built with React, Vite, and shadcn/ui, featuring contact management with Supabase backend.

## 🎉 Features

- **Contact Management** - Add, delete, and view contacts with ease
- **Real-time Updates** - Instant UI updates using React Query
- **Search & Filter** - Quick contact search functionality
- **Responsive Design** - Mobile-friendly interface
- **Dark Mode** - Built-in dark mode support
- **Modern Stack**:
  - **React** - A JavaScript library for building user interfaces
  - **Vite** - Next generation frontend tooling
  - **TypeScript** - Type safety for robust applications
  - **Tailwind CSS** - Utility-first CSS framework
  - **shadcn/ui** - Beautifully designed components
  - **Supabase** - Open source Firebase alternative
  - **React Query** - Powerful data synchronization
  - **Zod** - TypeScript-first schema validation

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager)
- Supabase account and project setup

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/dan5py/react-vite-ui.git
   ```

2. Navigate to the project directory:
   ```bash
   cd react-vite-ui
   ```

3. Install the dependencies:
   ```bash
   pnpm install
   ```

4. Set up your environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

## 📜 Available Scripts

- `pnpm dev` - Starts the development server
- `pnpm build` - Builds the production-ready code
- `pnpm lint` - Runs ESLint to analyze and lint the code
- `pnpm preview` - Starts the Vite preview server

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
react-vite-ui/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── eslint.config.js     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.ts # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
