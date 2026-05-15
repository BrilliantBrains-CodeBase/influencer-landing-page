Ready for review
Select text to add comments on the plan
Meta App + Apps Script Full Setup Fix Plan
Context
The Instagram OAuth flow is not working. From inspecting the Meta Developer Console screenshots, the root cause is that the OAuth redirect URI has never been registered in Meta — the user filled in the Webhooks fields (which are for a different purpose entirely) and left the actual OAuth login configuration (Step 3) unconfigured. This plan documents every action needed across Meta, Apps Script, and code to make the full flow work locally and in production.

Diagnosis from Screenshots
Screenshot	What's missing / wrong
API Setup	Step 3 "Set up Instagram business login" is collapsed / unconfigured — the Valid OAuth Redirect URI is NOT added
API Setup	Step 2 Webhooks (Callback URL + Verify Token) — filled in but irrelevant, we don't use webhooks
Basic Settings	App Domains: empty — needs brilliantbrains.ai and script.google.com
Basic Settings	App Icon: missing (required for App Review)
Advanced Settings	"Authorize Callback URL" — leave empty (that's for Facebook Login, not Instagram Login)
App Mode	Still Development — only accounts added as Test Users can authenticate
The exact redirect URI the code sends (must exactly match Meta):

https://script.google.com/macros/s/AKfycbwEFJStQpN_1FXSAY8bzHMld_D-7maE9Daav_V_R_mJzq1jgKX-AMw7wFO7Haw6i5kz/exec?action=callback
Fix Plan — Priority 1: Make it work in Development (no App Review needed)
Step 1 — Meta: Add OAuth Redirect URI
Location: Meta Developer → Instagram → API setup with Instagram login → Step 3 "Set up Instagram business login" (click to expand)

Find the field "Valid OAuth redirect URIs" and add:

https://script.google.com/macros/s/AKfycbwEFJStQpN_1FXSAY8bzHMld_D-7maE9Daav_V_R_mJzq1jgKX-AMw7wFO7Haw6i5kz/exec?action=callback
Click Save.

Note: Do NOT fill in the Webhooks "Callback URL" — that is for real-time push notifications, completely unrelated to OAuth.

Step 2 — Meta: Add Your Instagram Account as a Test User
Location: Meta Developer → App Roles → Test Users → Add Instagram Testers

In Development mode, only Instagram accounts explicitly added here can log in. Add your own Instagram account. The tester must accept the invite from within the Instagram app (Settings → Apps and Websites → Tester Invites).

Step 3 — Apps Script: Set Script Properties
Location: script.google.com → your project → Extensions → Script Properties

Add all three:

Property	Value
INSTAGRAM_APP_ID	2026403001420687
INSTAGRAM_APP_SECRET	(copy from Meta Basic Settings → Show)
FRONTEND_URL	http://localhost:5173 (for local dev)
Step 4 — Apps Script: Redeploy after setting properties
Click Deploy → Manage deployments → edit (pencil icon)
Change version to "New version"
Click Deploy
The URL stays the same — no need to update .env
Step 5 — Code: Fix VITE_API_URL (broken by recent change)
File: .env

VITE_API_URL was changed to http://localhost:5173 (the frontend itself) — this breaks the admin login backend. Change it back:

VITE_API_URL=http://localhost:5000
The Instagram flow uses direct fetch() to Apps Script — it does NOT use VITE_API_URL — so this fix has zero effect on Instagram.

Fix Plan — Priority 2: Production (https://brilliantbrains.ai)
Step 6 — Meta: Add App Domains
Location: Basic Settings → App Domains

Add both:

brilliantbrains.ai
script.google.com
Step 7 — Meta: Upload App Icon
Location: Basic Settings → App Icon

Upload a 1024×1024 PNG. Required before App Review can be submitted.

Step 8 — Apps Script: Switch FRONTEND_URL to production
Location: Script Properties

Change:

FRONTEND_URL = https://brilliantbrains.ai
Then redeploy (new version).

Step 9 — Meta: Submit App Review
Location: App Review → Permissions and Features

Request Advanced Access for:

instagram_business_basic
instagram_manage_insights
Meta requires a screen recording showing the OAuth flow and how insights are used. Review typically takes 1–5 business days.

Step 10 — Meta: Switch App Mode to Live
Location: Top bar toggle (Development → Live)

Only possible AFTER App Review is approved. In Live mode, any Instagram Creator/Business account can connect — no Test User invite needed.

What the Code Already Sends (Correct — No Changes Needed)
The OAuth URL built by src/lib/instagram.ts sends exactly:

https://api.instagram.com/oauth/authorize
  ?client_id=2026403001420687
  &redirect_uri=https://script.google.com/.../exec?action=callback
  &response_type=code
  &scope=instagram_business_basic,instagram_manage_insights
This is correct. The only reason it fails today is that the redirect_uri is not registered in Meta.

Full Flow (Once Fixed)
1. Creator clicks "Connect Instagram" on /influencer page
2. Popup opens → Instagram OAuth page (Meta checks redirect_uri → now matches ✓)
3. Creator approves → Instagram redirects popup to Apps Script ?action=callback&code=...
4. Apps Script: exchanges code for long-lived token, fetches profile + insights, stores session in Sheet
5. Apps Script: redirects popup to http://localhost:5173/creator-hub/dashboard?session=UUID
6. DashboardPage: detects popup → saves session to localStorage → postMessage to form → closes popup
7. RegistrationForm: receives message → fetches profile from Apps Script → shows connected badge
Verification Checklist
 Step 3 expanded in Meta and redirect URI saved
 Test user added and invite accepted in Instagram app
 Script Properties: all 3 values set (APP_ID, APP_SECRET, FRONTEND_URL)
 Apps Script redeployed with new version
 VITE_API_URL reverted to http://localhost:5000 in .env
 Click "Connect Instagram" in registration form → popup opens (not error)
 After approving → popup closes → connected badge appears in form
Plan: Instagram Login + Creator Dashboard for Influencer Landing Page
Context
The influencer landing page currently has a static registration form that collects Instagram handles as plain text. The goal is to upgrade this to a proper Instagram OAuth login so creators can authenticate with their Instagram account and view real Instagram analytics (followers, reach, engagement, top posts, audience demographics) on a dedicated creator dashboard — similar to the creator hub concept at creator-hub.maccaron.in.

API: Instagram Graph API with Instagram Login
Not the Basic Display API — that was deprecated in December 2024. Use the Graph API.

Item	Value
Auth endpoint	https://api.instagram.com/oauth/authorize
Token exchange	https://api.instagram.com/oauth/access_token
Data host	https://graph.instagram.com
Required scopes	instagram_business_basic, instagram_manage_insights
Account requirement	Creator or Business Instagram account (personal accounts NOT supported)
App Review	Required for Advanced Access (multiple users); not needed in development while testing with your own account
Key Insight Endpoints
GET /graph.instagram.com/{user_id} — profile, follower_count, media_count
GET /graph.instagram.com/{user_id}/insights — reach, views, engagement, follower_demographics
GET /graph.instagram.com/{user_id}/media — list of posts with metrics
GET /graph.instagram.com/{media_id}/insights — per-post engagement, saves, shares, reach
Token Lifecycle
Short-lived token (1 hour) → exchange via backend for long-lived token (60 days)
Long-lived token can be refreshed before expiry via GET /refresh_access_token
Tokens must never be exposed to frontend — stored server-side only
OAuth Flow
1. User clicks "Connect Instagram" on /creator-hub
2. Frontend redirects to Instagram OAuth URL with app_id, redirect_uri, scopes
3. User grants permission → Instagram redirects to /creator-hub/callback?code=...
4. CallbackPage sends code to backend: POST /api/instagram/exchange-token
5. Backend: code → short-lived token → long-lived token (stored in DB/session)
6. Backend returns session/user info to frontend
7. Frontend navigates to /creator-hub/dashboard
8. Dashboard fetches data via backend proxy endpoints
Backend Endpoints Required (spec for backend team)
Method	Endpoint	Purpose
POST	/api/instagram/exchange-token	Receive OAuth code, exchange for token, store, return session
GET	/api/instagram/profile	Return user profile (username, pfp, follower_count, media_count)
GET	/api/instagram/insights	Return account insights (reach, views, engagement)
GET	/api/instagram/media	Return top posts with per-media metrics
POST	/api/instagram/refresh-token	Refresh long-lived token before expiry
New Frontend Routes
Route	Purpose
/creator-hub	Landing page — hero + "Connect Instagram" CTA
/creator-hub/callback	OAuth callback handler (exchange code, then redirect)
/creator-hub/dashboard	Protected dashboard with real Instagram insights
Files to Create / Modify
New Files
src/pages/creator-hub/
├── CreatorHubPage.tsx              # Landing: hero + "Connect with Instagram" button
├── CallbackPage.tsx                # Extracts ?code=, calls backend, redirects
├── DashboardPage.tsx               # Protected container, fetches all insight data
└── components/
    ├── ProfileCard.tsx             # Avatar, name, @handle, followers, posts
    ├── MetricsGrid.tsx             # 4 KPI cards: reach, impressions, engagement, growth
    ├── TopPosts.tsx                # Grid of top 6 posts with thumbnail + metrics overlay
    └── AudienceDemographics.tsx    # Simple bar/pie for age/gender/top cities

src/context/InstagramContext.tsx    # Instagram session state (user, isConnected, loading)
src/lib/instagram.ts               # buildOAuthUrl(), parseCallback()
Modified Files
File	Change
src/App.tsx	Add 3 new routes: /creator-hub, /creator-hub/callback, /creator-hub/dashboard
.env	Add VITE_INSTAGRAM_APP_ID, VITE_INSTAGRAM_REDIRECT_URI
Dashboard Metrics to Display
Section	Metrics
Profile Card	Username, avatar, follower count, media count, account type
KPI Grid	30-day reach, 30-day views, total engagement (likes+comments+saves), follower growth %
Audience	Age distribution, gender split, top 5 cities, top 3 countries
Top Posts	Thumbnail, post type (reel/photo/carousel), reach, likes, comments, saves
Meta Developer App Setup (Prerequisite — do before coding)
Go to developers.facebook.com → Create App → Business type
Add product: Instagram
Under "Instagram → API setup with Instagram Login" → Add OAuth redirect URI: http://localhost:5173/creator-hub/callback (dev) + production URL
Note the App ID (not secret — secret stays backend only)
In development, add test Instagram accounts under "Roles → Test Users" — no App Review needed to test
For production (multiple users): submit App Review for instagram_manage_insights Advanced Access
Implementation Order
Meta Developer App setup (prerequisite)
Backend endpoints (coordinate with backend team using the spec above)
src/lib/instagram.ts — OAuth URL builder
src/context/InstagramContext.tsx — session state
CreatorHubPage.tsx — connect page with styled CTA matching existing dark/orange design system
CallbackPage.tsx — handles redirect, shows loading spinner, calls backend
Dashboard components — ProfileCard → MetricsGrid → TopPosts → AudienceDemographics
DashboardPage.tsx — assembles components, fetches data, handles loading/error states
src/App.tsx — wire up new routes
Design Consistency
Follow existing design system:

Background: black #000000
Accent gradient: #F95A1B → #E9DBB9
Animations: Framer Motion (match existing page patterns)
UI components: Shadcn/ui (Card, Button, Skeleton for loading states)
Icons: Lucide React
Verification
Dev flow: Set VITE_INSTAGRAM_APP_ID, run npm run dev, click "Connect Instagram" → Instagram authorization page loads
Callback: After auth, /creator-hub/callback receives ?code=, calls backend, redirects to dashboard
Dashboard: Real follower count, reach, and top posts render from live Instagram data
Token refresh: Verify long-lived token stored in backend and refreshed before 60-day expiry
Error states: Test with personal (non-Business) account → show clear error message guiding user to switch to Creator/Business account
Add Comment