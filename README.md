# The MathMatriX Academy Website

A complete, production-ready, highly conversion-focused website for **The MathMatriX Academy**. Built with **Next.js (App Router)**, **TypeScript**, and **Vanilla CSS**.

---

## 🚀 Key Features
- **Responsive Layouts:** Designed to look premium on Desktop, Tablet, and Mobile.
- **Conversion-Optimized Funnel:** Direct assessment booking form with localized, dynamic states.
- **Meta Ad Landing Page (`/landing`):** Zero distraction headers, targeted hook styling, and direct action triggers.
- **API Form Submission Routes:** Server-side input validation, HTML sanitization, and honeypot spam protection.
- **Dynamic SEO System:** Fully customized layouts matching meta tag indexing, XML Sitemaps, and robots restrictions.
- **Accessibility Alignment:** Keyboard navigation focus rings, custom skip links, and semantic structural tags.

---

## 🛠️ Tech Stack & Structure
- **Framework:** Next.js (App Router, static pre-rendering, serverless APIs)
- **Language:** TypeScript (strict type checking)
- **Styling:** Vanilla CSS Custom Properties (CSS variables in `globals.css`)
- **Key Modules:**
  - `src/components/`: Reusable components (`Navbar`, `Footer`, `Button`, `SectionHeading`, `FAQAccordion`, `AssessmentForm`, `ContactForm`, `MentorForm`).
  - `src/app/api/`: Endpoint files for form submissions (`assessment/route.ts`, `mentor/route.ts`, `contact/route.ts`).
  - `src/app/`: Static inner page layouts (`/about`, `/programs`, `/curricula`, `/subjects`, `/how-it-works`, `/results`, `/faqs`, `/contact`, `/apply-mentor`, `/landing`).
  - `public/images/`: Local asset directory (circular logo, generated header banner).

---

## ⚙️ Backend Form Architecture & Local Fallback
To remain fully functional right out of the box, all form handlers feature a **transparent database fallback system**:
1. If the production environment variable `DATABASE_URL` is set, submissions are saved to the database.
2. If `DATABASE_URL` is missing, the backend logs a warning and saves submissions to local JSON files in the project root:
   - `leads_development.json` (Academic Assessment leads)
   - `mentors_development.json` (Mentor job applications)
   - `contact_enquiries_development.json` (General contact questions)

### Environment Variables
Create a `.env.local` file in the root directory to configure production hooks:

```env
# Database Credentials (e.g. Postgres, MongoDB)
DATABASE_URL=your_production_database_connection_string

# Email Service API Credentials (e.g. Resend, SendGrid)
EMAIL_API_KEY=your_email_service_api_key
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build & Compile for Production
```bash
npm run build
```
This tests typescript checks and outputs an optimized production build.

### 4. Start Production Server
```bash
npm run start
```

---

## ☁️ Deployment

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. Vercel will auto-detect Next.js and apply build commands.
4. Add environment variables (`DATABASE_URL`, `EMAIL_API_KEY`) in Vercel project settings if connecting to production databases.
5. Deploy.

---

## 🔒 Security & Spam Prevention
- **Honeypot Protection:** All forms include a hidden honeypot input field (`honeypot`). If populated (usually by auto-fill bots), the API rejects the request instantly.
- **Input Sanitization:** All values are stripped of HTML tags (`<`, `>`) server-side to prevent cross-site scripting (XSS) attacks.
- **Server Validation:** Forms validate data constraints server-side, preventing bypasses from browser tools.
