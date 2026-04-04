# 🎨 TaskSphere - Advanced React Productivity Platform

**CPAN 144 Final Exam Project** - Humber College, Semester 2  
A modern, fully-designed Next.js application showcasing professional web development practices with React, TypeScript, and modern CSS design patterns.

[![GitHub](https://img.shields.io/badge/GitHub-raj271197%2Ffinalexam-blue?style=flat-square&logo=github)](https://github.com/raj271197/finalexam)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🎯 Interactive Components
- **Counter** - Increment/Decrement/Reset functionality with dynamic feedback
- **Todo List** - Add/Remove tasks with smooth animations and Enter key support
- **Post Display** - Load and display posts from JSONPlaceholder API
- **User Profile** - Beautiful profile cards with hover effects
- **Navigation** - Smooth page navigation with sticky navbar

### 🎨 Visual Design
- Beautiful gradient backgrounds (purple-to-violet)
- Glassmorphism effects with backdrop blur
- Smooth animations (fadeIn, slideDown, slideIn, pulse)
- Hover effects with elevation transitions
- Loading and error state UI
- Fully responsive design (mobile-first)
- Custom scrollbar styling

### 📱 Responsive Design
- **Desktop:** 1200px+ (full experience)
- **Tablet:** 768px-1199px (adjusted layouts)
- **Mobile:** <768px (optimized for small screens)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/raj271197/finalexam.git
cd finalexam
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
finalexam/
├── src/
│   ├── components/
│   │   ├── Counter.tsx           # Counter component
│   │   ├── Counter.module.css    # Counter styling
│   │   ├── TodoList.tsx          # Todo list component
│   │   ├── TodoList.module.css   # Todo list styling
│   │   ├── PostList.tsx          # Post display component
│   │   ├── PostList.module.css   # Post list styling
│   │   ├── UserProfile.tsx       # User profile component
│   │   ├── UserProfile.module.css# User profile styling
│   │   ├── Navbar.tsx            # Navigation component
│   │   └── Navbar.module.css     # Navbar styling
│   ├── pages/
│   │   ├── _app.js               # App wrapper with Navbar
│   │   ├── _document.js          # Document wrapper
│   │   ├── index.tsx             # Home page
│   │   ├── about.tsx             # About page
│   │   └── api/
│   │       └── hello.js          # Example API route
│   └── styles/
│       ├── globals.css           # Global styles
│       └── Home.module.css       # Home page styles
├── public/                        # Static assets
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.mjs               # Next.js config
└── PROJECT_DESCRIPTION.md        # Detailed project documentation
```

---

## 🎨 Design System

### Color Palette
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary Gradient Start | Purple | `#667eea` |
| Primary Gradient End | Violet | `#764ba2` |
| Secondary Gradient | Pink to Red | `#f093fb` → `#f5576c` |
| Text (Light) | White | `#ffffff` |
| Text (Dark) | Dark Gray | `#333333` |

### Typography
- **Font Family:** Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
- **Heading 1:** 3.5rem, bold, white with text-shadow
- **Heading 2:** 2.2rem, bold, purple (#667eea)
- **Body:** 16px, line-height 1.6

### Effects
- **Shadows:** `0 8px 32px`, `0 20px 60px`, `0 30px 80px` (varying intensity)
- **Backdrop Filter:** `blur(10px)` for glassmorphism
- **Animations:** 4 unique animations with smooth easing
- **Border Radius:** 8px-50px (pill-shaped buttons)

---

## 🛠️ Technology Stack

```
Framework:        Next.js 15.3.1
UI Library:       React 19.0.0
Language:         TypeScript 5.8.3
Styling:          CSS Modules
API:              JSONPlaceholder (https://jsonplaceholder.typicode.com/)
Runtime:          Node.js
Package Manager:  npm
```

---

## 📚 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🎯 Key Improvements & Updates

### CSS Enhancements
- ✅ Modern gradient backgrounds everywhere
- ✅ Glassmorphism design with backdrop blur
- ✅ Smooth animations and transitions
- ✅ Hover effects with elevation
- ✅ Enhanced button styling (pill-shaped, gradients)
- ✅ Improved spacing and typography

### Component Improvements
- ✅ Integrated Counter on home page
- ✅ Enhanced TodoList with Enter key support
- ✅ Dynamic PostList with API integration
- ✅ Responsive UserProfile cards
- ✅ Sticky Navigation with animated underline
- ✅ Comprehensive About page

### User Experience
- ✅ Emoji icons for better visual communication
- ✅ Loading states with feedback
- ✅ Error handling UI
- ✅ Empty state messages
- ✅ Keyboard support (Enter key in todos)
- ✅ Visual feedback on all interactions

---

## 📊 Project Statistics

- **Total Components:** 7
- **CSS Files:** 6 (all with modern styling)
- **Pages:** 3 (Home, About, API example)
- **Animations:** 4 (fadeIn, slideDown, slideIn, pulse)
- **Responsive Breakpoints:** 1 (768px)
- **Color Palette:** 4+ gradient combinations

---

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Next.js Configuration
- Pages Router (not App Router)
- CSS Modules for component styling
- TypeScript enabled
- ESLint configured

---

## 📖 Detailed Documentation

For comprehensive information about all changes, design system details, and before/after comparisons, see **[PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md)**.

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raj271197/finalexam)

### Deploy on Other Platforms

1. **Build:** `npm run build`
2. **Start:** `npm start`
3. **Port:** Default is 3000 (configurable with PORT env var)

---

## 📝 API Routes

### Available Endpoints
- `GET /api/hello` - Returns a simple JSON response

---

## 🤝 Contributing

This is a school project, but if you have suggestions or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Raj Patel**
- GitHub: [@raj271197](https://github.com/raj271197)
- Email: patelrj2711@gmail.com

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- Humber College - CPAN 144 Course

---

## 📞 Support

If you encounter any issues:

1. Check the [PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md) for detailed information
2. Review the [Issues](https://github.com/raj271197/finalexam/issues) page
3. Create a new issue with a detailed description

---

**Happy coding! 🚀**
