# 🏥 MediStore - Modern Pharmacy Marketplace

MediStore is a premium, full-stack pharmaceutical marketplace designed for a seamless medicine buying and selling experience. Built with the latest web technologies, it offers role-based access control, AI-powered features, and a high-performance interactive UI.

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **AI Search Suggestions**: Real-time, intelligent medicine suggestions as you type, powered by Google Gemini.
- **MediBot Support**: An integrated AI chatbot providing instant pharmaceutical assistance and support.

### 👥 Role-Based Portals
- **Customer**: Browse medicines, manage a persistent shopping cart, track orders, and leave product reviews.
- **Seller (Pharmacist)**: Dedicated dashboard for inventory management (Add/Update/Delete medicines) and order fulfillment tracking.
- **Admin (System Manager)**: Full oversight of the platform, user management (Approve/Ban), category creation, and global order monitoring.

### 🛒 E-Commerce Excellence
- **Smart Catalog**: Detailed medicine listing with category filtering and manufacturer information.
- **Secure Checkout**: Seamless multi-step checkout process with order history and status tracking.
- **Responsive Management**: Dynamic stock updates and real-time inventory reflecting pricing changes.

### 🎨 Premium UI/UX
- **Modern Aesthetics**: Sleek glassmorphism effects, curated color palettes, and polished dark/light modes.
- **Dynamic Animations**: Smooth transitions and micro-interactions powered by Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **State Management**: React Hooks & Server Actions
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT & Role-Based Access Control (RBAC)
- **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL (or your preferred database supported by Prisma)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medistore
   ```

2. **Frontend Setup**
   ```bash
   cd medistore_client
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd ../Medistore
   npm install
   npx prisma generate
   ```

4. **Environment Configuration**
   Create a `.env` file in both `medistore_client` and `Medistore` directories following the `.env.example` templates.

5. **Run Development Server**
   ```bash
   # In medistore_client
   npm run dev
   ```

---

## 📸 Screenshots

*(Add screenshots here once the project is deployed)*

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.