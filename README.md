# HarmonyCare - AI-Native Care Management Platform

> **Transforming residential care with 20 autonomous AI agents**

HarmonyCare is a comprehensive automation platform for residential care facilities, featuring intelligent care coordination, compliance automation, family engagement, and strategic analytics. This repository contains the founding member portal and marketing website.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)](https://tailwindcss.com/)

---

## 🚀 Features

### Core Platform
- **Homepage** with hero section, feature showcase, and compelling CTAs
- **About Page** with mission, vision, core values, team profiles, and press coverage
- **Blog Section** with 5 professional articles on AI in healthcare and industry trends
- **Signup Form** with referral code integration and email confirmation
- **Demo Page** with platform walkthrough
- **Admin Dashboard** with comprehensive analytics

### Complete Referral Program
- **Referral Code System** - Automatic generation (HARMONY-XXXX format)
- **Code Validation API** - Real-time validation with visual feedback
- **Referral Tracking** - Database-backed relationship tracking
- **Analytics Dashboard** - Admin view with top referrers, conversion rates, and charts
- **Founding Member Portal** (`/referrals`) - Personal stats, progress tracking, shareable links
- **5-Tier Reward System** - Bronze to Diamond with escalating benefits ($25-$1,500)
- **Social Sharing Templates** - 11 pre-written variations for email, LinkedIn, Twitter, Facebook
- **Branded Graphics** - 6 tier-specific social media images (1200x630px)
- **One-Click Sharing** - Copy, download, and share functionality

### Automated Email System
- Welcome emails with unique referral codes
- Referral success notifications
- Milestone achievement celebrations
- Monthly referral performance summaries
- Professional HTML templates with Resend API

### Milestone Celebration System
- 8 milestone types (first referral, tier upgrades, leaderboard positions)
- Achievement badge graphics (8 unique designs)
- Confetti animations with tier-specific colors
- Personalized social media posts
- Database tracking of milestone notifications

### Admin Features
- Comprehensive analytics dashboard
- Signup tracking and metrics
- Referral analytics with interactive charts
- User management
- Email campaign monitoring
- UTM parameter tracking and attribution

---

## 🛠 Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Lightweight routing
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons
- **Chart.js** - Data visualization
- **canvas-confetti** - Celebration animations

### Backend
- **Node.js 22** - JavaScript runtime
- **tRPC** - End-to-end type-safe APIs
- **Drizzle ORM** - Type-safe database toolkit
- **MySQL** - Relational database (PlanetScale)
- **Zod** - Schema validation

### Authentication & Email
- Built-in OAuth system with Google integration
- JWT-based sessions
- Resend API for transactional emails

### Development Tools
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Vitest** - Unit testing (41 tests)
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📦 Installation

### Prerequisites
- Node.js 22 or higher
- pnpm package manager
- MySQL database (or PlanetScale account)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/harmony-website.git
   cd harmony-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=mysql://user:password@host:port/database
   
   # Authentication
   JWT_SECRET=your-jwt-secret
   OAUTH_SERVER_URL=https://oauth.example.com
   VITE_OAUTH_PORTAL_URL=https://portal.example.com
   
   # Email (Resend)
   RESEND_API_KEY=re_your_api_key
   
   # Application
   VITE_APP_TITLE=HarmonyCare - AI-Native Care Management
   VITE_APP_LOGO=/logo.svg
   
   # Analytics (optional)
   VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
   VITE_ANALYTICS_WEBSITE_ID=your-website-id
   ```

4. **Set up database**
   ```bash
   pnpm db:push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open browser**
   Navigate to `http://localhost:3000`

---

## 🧪 Testing

Run the test suite:
```bash
pnpm test
```

Run specific tests:
```bash
pnpm test referral
pnpm test milestone
```

Test coverage: **41 tests passing**

---

## 📁 Project Structure

```
harmony-website/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   │   ├── logo.svg
│   │   ├── share-graphics/    # Social media images (6 files)
│   │   └── milestones/        # Achievement badges (8 files)
│   └── src/
│       ├── components/    # Reusable UI components
│       │   ├── ui/       # shadcn/ui components
│       │   ├── Navigation.tsx
│       │   ├── ShareTemplates.tsx
│       │   └── MilestoneCelebration.tsx
│       ├── pages/        # Page components
│       │   ├── Home.tsx
│       │   ├── About.tsx
│       │   ├── Blog.tsx
│       │   ├── BlogArticle.tsx
│       │   ├── Signup.tsx
│       │   ├── Referrals.tsx
│       │   ├── Admin.tsx
│       │   └── Demo.tsx
│       ├── contexts/     # React contexts
│       ├── hooks/        # Custom hooks
│       ├── lib/          # Utility functions
│       ├── App.tsx       # Main app component
│       └── main.tsx      # Entry point
├── server/               # Backend tRPC server
│   ├── routers.ts       # API route definitions
│   ├── db.ts            # Database operations
│   ├── referral.ts      # Referral code logic
│   ├── referralAnalytics.ts  # Analytics functions
│   ├── referralEmails.ts     # Email templates
│   ├── milestoneService.ts   # Milestone detection
│   └── index.ts         # Server entry point
├── shared/              # Shared code between client/server
│   ├── const.ts         # Constants
│   ├── referralRewards.ts    # Reward tier definitions
│   ├── milestones.ts         # Milestone definitions
│   ├── shareTemplates.ts     # Social sharing templates
│   └── blogData.ts           # Blog article data
├── drizzle/             # Database schema and migrations
│   └── schema.ts        # Database schema
├── DEPLOYMENT-GUIDE.md  # Comprehensive deployment documentation
├── todo.md              # Project task tracking (269 completed)
└── package.json         # Dependencies and scripts
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Via Management UI (Easiest)**
   - Click "Publish" button in the Management UI
   - Website deploys automatically to `https://[your-prefix].manus.space`
   - Configure custom domain in Settings → Domains

2. **Manual Deployment**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - See `DEPLOYMENT-GUIDE.md` for complete list

### Other Platforms

The application can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

See `DEPLOYMENT-GUIDE.md` for detailed instructions.

---

## 📊 Database Schema

### Tables

**signups** - Founding member signups
- id, email, name, facilityName, facilityType, residentCount
- tier, interestedFeatures, additionalNeeds
- referralCode (unique HARMONY-XXXX format)
- referredBy (optional referral code used)
- UTM tracking fields
- createdAt, updatedAt

**referrals** - Referral relationships
- id, referrerId, referredId
- status (pending, completed, rewarded)
- createdAt, rewardedAt

**milestone_notifications** - Achievement tracking
- id, userId, milestoneType
- isViewed, createdAt

**users** - Authentication
- id, email, name, role
- OAuth integration fields

---

## 🎨 Customization

### Branding

Update logo and colors in:
- `client/src/const.ts` - APP_LOGO constant
- `client/src/index.css` - CSS variables for colors
- `client/public/logo.svg` - Logo file

### Content

- **Blog Articles:** Edit `shared/blogData.ts`
- **Team Members:** Edit `client/src/pages/About.tsx`
- **Referral Rewards:** Edit `shared/referralRewards.ts`
- **Social Templates:** Edit `shared/shareTemplates.ts`

### Email Templates

Edit email templates in `server/referralEmails.ts`:
- `sendWelcomeEmail()` - Welcome message with referral code
- `sendReferralNotification()` - Referral success notification
- `sendMilestoneCelebration()` - Milestone achievement email

---

## 📈 Analytics & Tracking

### Built-in Analytics
- Signup conversions by source
- Referral attribution and conversion rates
- Top referrers leaderboard
- Milestone achievement tracking
- UTM parameter tracking

### Admin Dashboard
Access at `/admin` (requires admin role):
- Total signups and growth trends
- Referral program performance
- Facility type distribution
- Tier distribution
- Interested features analysis

---

## 🔒 Security

### Implemented Measures
- JWT-based authentication
- Secure cookie storage
- OAuth integration (Google)
- Type-safe API endpoints (tRPC)
- Input validation (Zod)
- Parameterized database queries
- XSS protection (React escaping)
- CSRF protection
- Secure headers (Vercel default)

### Recommendations
- Enable 2FA for admin accounts
- Regular security audits
- Monitor for suspicious activity
- Keep dependencies updated
- Backup database regularly

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow existing code style
- Run linter before committing

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **tRPC** - End-to-end type safety
- **Drizzle ORM** - Type-safe database toolkit
- **Resend** - Email API
- **Vercel** - Deployment platform

---

## 📞 Support

- **Documentation:** See `DEPLOYMENT-GUIDE.md` for comprehensive deployment instructions
- **Issues:** Open an issue on GitHub
- **Email:** support@harmonycare.com
- **Website:** https://harmonycare.com

---

## 🗺 Roadmap

### Completed ✅
- [x] Complete referral program with 5-tier rewards
- [x] Automated email system with milestone celebrations
- [x] Social sharing templates and branded graphics
- [x] Admin analytics dashboard
- [x] Blog section with 5 articles
- [x] About page with team and press coverage

### In Progress 🚧
- [ ] Video production (scripts and storyboard complete)
- [ ] Public referral leaderboard
- [ ] Reward redemption center

### Planned 📋
- [ ] Multi-language support
- [ ] Advanced analytics with A/B testing
- [ ] Integration with CRM systems
- [ ] Mobile app (React Native)
- [ ] White-label solution for partners

---

## 📊 Project Stats

- **Total Features:** 269 completed
- **Test Coverage:** 41 tests passing
- **Lines of Code:** ~15,000+
- **Components:** 50+
- **API Endpoints:** 25+
- **Database Tables:** 4
- **Email Templates:** 4
- **Social Share Templates:** 11
- **Achievement Badges:** 8

---

**Built with ❤️ by the HarmonyCare team**

*Transforming residential care, one facility at a time.*
