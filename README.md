# MediQueue — Tutor Booking System

A modern full-stack tutor booking platform where students can browse, filter and book sessions with verified tutors.

## 🌐 Live Site
**[https://mediqueue-client-omega.vercel.app](https://mediqueue-client-omega.vercel.app)**
## 🌐 Repository Link
**[https://github.com/code-samid/mediqueue-client](https://github.com/code-samid/mediqueue-client)**



## ✨ Features

- 🔐 Firebase authentication — Email/Password and Google login
- 📚 Browse and search tutors by name or session date
- 📅 Real-time slot tracking — slots decrease on each booking
- 🌙 Dark / Light theme toggle
- 👤 Private dashboard — manage tutors and booked sessions
- 🎠 Animated hero carousel and smooth page transitions
- 📱 Fully responsive on all screen sizes

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, Tailwind CSS v4, shadcn/ui
- **Animations:** Framer Motion, Swiper.js
- **Auth:** Firebase (Email/Password + Google) + JWT
- **HTTP:** Axios with JWT interceptor
- **Alerts:** React Hot Toast, SweetAlert2
- **Deploy:** Vercel

## 🚀 Run Locally

```bash
git clone //https://github.com/code-samid/mediqueue-client
cd mediqueue-client
npm install
npm run dev
```

## 🔑 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://mediqueue-server-f4dh.onrender.com
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔗 Related

- **Backend:** [mediqueue-server](https://github.com/YOURUSERNAME/mediqueue-server)
- **Live API:** [https://mediqueue-server-f4dh.onrender.com](https://mediqueue-server-f4dh.onrender.com)

---
- **Author:**
 Samid Ahmed