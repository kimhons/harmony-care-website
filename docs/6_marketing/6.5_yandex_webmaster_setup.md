# Yandex Webmaster Setup Guide for HarmonyCare

This guide provides step-by-step instructions for verifying domain ownership, submitting your sitemap, and optimizing your website for Yandex, Russia's leading search engine and a significant player in Eastern Europe and Central Asia.

---

## Why Yandex Webmaster?

**Market Reach**: Yandex is the dominant search engine in:

- **Russia**: 60%+ market share
- **Belarus**: 40%+ market share
- **Kazakhstan**: 50%+ market share
- **Turkey**: Growing presence
- **Ukraine**: Significant presence

**Benefits for HarmonyCare**:

- Access to Russian-speaking healthcare markets
- Reach international care facilities with Russian-speaking residents
- Expand to Eastern European markets
- Diversify search traffic sources
- Free SEO tools and insights
- Advanced technical SEO features

**Note**: While HarmonyCare primarily targets US/Canada markets, many care facilities serve Russian-speaking populations and may search in Russian or use Yandex as their default search engine.

---

## Prerequisites

- Yandex account (create at yandex.com)
- Access to your domain registrar or DNS settings
- Access to your Vercel deployment dashboard
- Your website must be live and accessible
- Basic understanding of HTML (for meta tag verification)

---

## Step 1: Create Yandex Account

1. Navigate to [Yandex](https://yandex.com)
2. Click **"Sign in"** in the top right
3. Click **"Register"** or **"Create ID"**
4. Fill in your details:
   - Email address
   - Password
   - Phone number (for verification)
5. Verify your phone number with SMS code
6. Complete registration

**Note**: Yandex interface is available in English, but defaults to Russian. Look for language selector in top right.

---

## Step 2: Access Yandex Webmaster

1. Navigate to [Yandex Webmaster](https://webmaster.yandex.com)
2. Sign in with your Yandex account
3. Accept the terms of service
4. You'll see the main dashboard

**Interface Language**: Click the language selector (usually top right) and choose **"English"** if it defaults to Russian.

---

## Step 3: Add Your Website

1. Click **"Add site"** or **"+"** button
2. Enter your website URL: `https://www.harmonycare.ai`
3. Click **"Add"**
4. Yandex will show verification options

---

## Step 4: Verify Site Ownership

Yandex offers four verification methods:

### Method 1: Meta Tag (Recommended)

1. **Copy the meta tag** provided by Yandex:

   ```html
   <meta name="yandex-verification" content="XXXXXXXXXXXXXXXX" />
   ```

2. **Add to your SEOHead component**:

   ```tsx
   // In client/src/components/SEOHead.tsx
   // Add this line in the <Head> section:
   <meta name="yandex-verification" content="YOUR_VERIFICATION_CODE" />
   ```

3. **Commit and deploy**:

   ```bash
   cd /home/ubuntu/harmony-website
   git add client/src/components/SEOHead.tsx
   git commit -m "Add Yandex verification meta tag"
   git push
   ```

4. **Wait for Vercel deployment** to complete

5. **Verify the tag is present**:
   - Visit: `https://www.harmonycare.ai/`
   - Right-click → View Page Source
   - Search for "yandex-verification"

6. **Return to Yandex Webmaster** and click **"Check"** or **"Verify"**

### Method 2: HTML File Upload

1. **Download the verification file** (e.g., `yandex_XXXXXXXXXXXXXXXX.html`)

2. **Upload to your website root**:

   ```bash
   cd /home/ubuntu/harmony-website/client/public/
   # Place the verification file here
   ```

3. **Commit and deploy**:

   ```bash
   git add client/public/yandex_*.html
   git commit -m "Add Yandex verification file"
   git push
   ```

4. **Verify the file is accessible**:
   - Visit: `https://www.harmonycare.ai/yandex_XXXXXXXXXXXXXXXX.html`

5. **Return to Yandex Webmaster** and click **"Check"**

### Method 3: DNS TXT Record

1. **Copy the TXT record** provided by Yandex

2. **Add to your DNS settings**:

   **If using Vercel DNS:**
   - Go to Vercel dashboard → Settings → Domains
   - Click on `harmonycare.ai`
   - Add TXT record:
     - Name: `@` (or leave blank for root domain)
     - Value: Paste the verification code from Yandex
     - TTL: 3600

   **If using external DNS:**
   - Log in to your domain registrar
   - Navigate to DNS management
   - Add TXT record with Yandex's value
   - Save changes

3. **Wait for DNS propagation** (5-60 minutes, up to 48 hours)

4. **Return to Yandex Webmaster** and click **"Check"**

### Method 4: WHOIS (Domain Registrar Email)

1. Yandex sends verification email to the domain registrar contact email
2. Check the email associated with your domain registration
3. Click the verification link in the email
4. Your site will be automatically verified

**Note**: This method only works if you have access to the registrar email.

---

## Step 5: Submit Your Sitemap

Once verified, submit your sitemap:

1. In Yandex Webmaster, select your site
2. Navigate to **"Indexing"** → **"Sitemap files"** in the left sidebar
3. Click **"Add sitemap"**
4. Enter your sitemap URL: `https://www.harmonycare.ai/sitemap.xml`
5. Click **"Add"**

Yandex will begin processing your sitemap within 24 hours.

**Your sitemap includes:**

- Homepage (/)
- Pricing (/pricing)
- AI Agents (/agents)
- Group Homes Solution (/solutions/group-homes)
- ICF-ID Solution (/solutions/icf-id)
- About (/about)
- Blog (/blog)
- Resources (/resources)
- Signup (/signup)
- Demo (/demo)
- Referrals (/referrals)

---

## Step 6: Configure Site Settings

### Set Main Mirror (WWW vs Non-WWW):

1. Go to **"Indexing"** → **"Site address"**
2. Choose your preferred version:
   - **Main mirror**: `https://www.harmonycare.ai` (recommended)
   - **Additional mirror**: `https://harmonycare.ai`
3. Click **"Save"**

This tells Yandex which version to index and show in search results.

### Set Regional Affiliation:

1. Go to **"Indexing"** → **"Regional affiliation"**
2. Select **"United States"** (or your primary market)
3. Click **"Save"**

### Set Main Page:

1. Go to **"Indexing"** → **"Main page"**
2. Confirm it's set to: `https://www.harmonycare.ai/`
3. Click **"Save"** if needed

---

## Step 7: Configure Robots.txt

Yandex analyzes your robots.txt file:

1. Go to **"Indexing"** → **"robots.txt analysis"**
2. Yandex will show your current robots.txt
3. Verify it allows Yandex crawler:
   ```
   User-agent: Yandex
   Allow: /
   ```
4. If there are issues, update your robots.txt file

Your current robots.txt should already allow all crawlers, but verify:

```
User-agent: *
Allow: /

Sitemap: https://www.harmonycare.ai/sitemap.xml
```

---

## Step 8: Submit Individual URLs for Indexing

To accelerate indexing of important pages:

1. Go to **"Indexing"** → **"Reindex pages"**
2. Enter URLs (one per line):
   ```
   https://www.harmonycare.ai/
   https://www.harmonycare.ai/pricing
   https://www.harmonycare.ai/solutions/group-homes
   https://www.harmonycare.ai/solutions/icf-id
   https://www.harmonycare.ai/agents
   https://www.harmonycare.ai/signup
   ```
3. Click **"Add to reindex queue"**

**Limits**: Yandex allows reindexing requests, but has daily quotas based on site quality and age.

---

## Step 9: Check Indexing Status

Monitor which pages Yandex has indexed:

1. Go to **"Indexing"** → **"Indexed pages"**
2. View:
   - **Total indexed pages**
   - **Pages excluded from index** (with reasons)
   - **Indexing history** (graph over time)

### Check Specific URL:

1. Go to **"Tools"** → **"Check URL"**
2. Enter a URL (e.g., `https://www.harmonycare.ai/pricing`)
3. Click **"Check"**
4. View:
   - Indexing status
   - Last crawl date
   - HTTP status code
   - Redirect chains
   - Canonical URL

---

## Step 10: Monitor Search Queries

View which keywords bring traffic from Yandex:

1. Go to **"Search queries"** in the left sidebar
2. View:
   - **Popular queries**: Most frequent search terms
   - **Impressions**: How often your site appears
   - **Clicks**: How many users click through
   - **CTR**: Click-through rate
   - **Average position**: Your ranking

### Filter by:

- Date range
- Device type (desktop, mobile, tablet)
- Region
- Query type

---

## Step 11: Review Site Quality

Yandex provides a **Site Quality Index (SQI)**:

1. Go to **"Site quality"** in the left sidebar
2. View your SQI score (0-100)
3. Higher scores indicate:
   - Better content quality
   - Stronger user engagement
   - Higher trustworthiness
   - Better technical implementation

### Improve SQI:

- Publish high-quality, original content
- Improve page load speed
- Reduce bounce rate
- Increase time on site
- Build quality backlinks
- Fix technical errors

---

## Step 12: Check Site Security

Yandex monitors security issues:

1. Go to **"Security and violations"** in the left sidebar
2. Check for:
   - **Malware**: Infected files or scripts
   - **Phishing**: Suspicious pages
   - **Spam**: Low-quality content
   - **Hacked pages**: Compromised content

If issues are detected:

- Fix the security problem
- Request reconsideration
- Yandex will re-check within 24-48 hours

---

## Step 13: Monitor Site Speed

Yandex provides page speed insights:

1. Go to **"Site speed"** in the left sidebar
2. View:
   - **Average load time**
   - **Slow pages** (list of pages with issues)
   - **Speed history** (graph over time)

### Improve Speed:

- Optimize images (use WebP, lazy loading)
- Enable compression (Gzip, Brotli)
- Minimize JavaScript and CSS
- Use CDN for static assets
- Implement caching

---

## Step 14: Set Up Turbo Pages (Optional)

**Yandex Turbo Pages** are fast-loading mobile pages (similar to Google AMP):

1. Go to **"Turbo pages"** in the left sidebar
2. Click **"Connect Turbo pages"**
3. Choose integration method:
   - **RSS feed**: Automatic conversion from RSS
   - **Manual**: Upload HTML for each page

**Benefits**:

- Instant loading on mobile
- Higher rankings in mobile search
- Better user experience
- Increased mobile traffic

**Recommendation**: Consider implementing for blog posts if targeting Russian-speaking mobile users.

---

## Step 15: Configure Notifications

Get alerts for important events:

1. Go to **"Settings"** (gear icon, top right)
2. Navigate to **"Notifications"**
3. Enable email notifications for:
   - **Critical errors**: Site unavailable, security issues
   - **Indexing problems**: Crawl errors, blocked pages
   - **Manual actions**: Penalties, warnings
   - **Important changes**: New features, updates

4. Add team members' email addresses
5. Click **"Save"**

---

## Yandex-Specific Optimization Tips

### 1. Optimize for Yandex's Ranking Factors:

**Yandex prioritizes**:

- **User behavior signals**: Time on site, bounce rate, return visits
- **Content quality**: Original, well-written, comprehensive
- **Site structure**: Clear navigation, logical hierarchy
- **Regional relevance**: Local content, regional hosting
- **Social signals**: Shares, likes, comments
- **Domain age and trust**: Established domains rank better

### 2. Use Yandex Metrica (Analytics):

Yandex offers free analytics more detailed than Google Analytics:

1. Visit [Yandex Metrica](https://metrica.yandex.com)
2. Create a tag for your site
3. Install tracking code on your website
4. Link Metrica to Webmaster Tools

**Benefits**:

- **Session replay**: Watch user sessions
- **Heatmaps**: See where users click
- **Form analytics**: Track form completions
- **E-commerce tracking**: Monitor conversions

### 3. Implement Yandex Structured Data:

Yandex supports Schema.org markup (which you already have):

- **Organization**: ✅ Already implemented
- **Service**: ✅ Already implemented
- **FAQPage**: ✅ Already implemented

Yandex also supports:

- **BreadcrumbList**: Add breadcrumb navigation
- **Article**: For blog posts
- **Review**: For testimonials

### 4. Optimize for Russian-Speaking Users:

If targeting Russian-speaking populations:

- Add Russian language version of key pages
- Use `hreflang` tags to indicate language variants:
  ```html
  <link rel="alternate" hreflang="en" href="https://www.harmonycare.ai/" />
  <link rel="alternate" hreflang="ru" href="https://www.harmonycare.ai/ru/" />
  ```
- Translate key content (pricing, features, signup)
- Consider Russian-language customer support

---

## Expected Timeline

| Action              | Timeframe                |
| ------------------- | ------------------------ |
| Site verification   | Immediate                |
| Sitemap processing  | 24-48 hours              |
| Initial crawling    | 3-7 days                 |
| First pages indexed | 7-21 days                |
| Full site indexing  | 3-6 weeks                |
| Search query data   | 7-14 days after indexing |
| Site Quality Index  | 2-4 weeks after indexing |

**Note**: Yandex typically takes longer than Google to index new sites, especially non-Russian sites.

---

## Troubleshooting

### Verification Failed:

- **Meta tag not found**: Clear cache, verify tag is in `<head>` section
- **HTML file not found**: Ensure file is in `/client/public/` and deployed
- **DNS not propagated**: Wait 24-48 hours for TXT record changes
- **WHOIS email not accessible**: Use alternative verification method

### Sitemap Not Processing:

- **404 error**: Verify sitemap is accessible at `/sitemap.xml`
- **XML format error**: Validate with [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- **Encoding issues**: Ensure sitemap uses UTF-8 encoding
- **Too many URLs**: Yandex supports up to 50,000 URLs per sitemap

### Pages Not Indexing:

- **Robots.txt blocking**: Check if Yandex crawler is allowed
- **Noindex tag**: Ensure pages don't have `<meta name="robots" content="noindex">`
- **Low site quality**: New sites may have limited crawl budget
- **Duplicate content**: Yandex may skip duplicate pages
- **Server errors**: Check for 5xx errors in crawl stats

### Low Site Quality Index:

- **Thin content**: Add more comprehensive, original content
- **High bounce rate**: Improve user experience and page relevance
- **Slow load times**: Optimize page speed
- **Few backlinks**: Build quality links from Russian sites
- **New site**: SQI improves over time (2-6 months)

### No Search Query Data:

- **Not enough traffic**: Yandex requires minimum traffic threshold
- **Too new**: Wait 2-3 weeks after indexing
- **Privacy settings**: Ensure data collection is enabled

---

## Comparison: Yandex vs Google vs Bing

| Feature               | Google           | Bing       | Yandex         |
| --------------------- | ---------------- | ---------- | -------------- |
| Global market share   | ~92%             | ~3%        | ~1%            |
| Russia market share   | ~40%             | ~5%        | ~55%           |
| Indexing speed        | 3-7 days         | 5-14 days  | 7-21 days      |
| URL submission        | Limited          | 10,000/day | Quota-based    |
| Analytics integration | Google Analytics | Clarity    | Yandex Metrica |
| Structured data       | Excellent        | Good       | Good           |
| User behavior signals | Moderate         | Moderate   | Strong         |
| Regional targeting    | Good             | Good       | Excellent      |
| Turbo pages           | AMP              | None       | Turbo Pages    |

---

## Monitoring Best Practices

1. **Check Yandex Webmaster monthly** (less frequently than Google/Bing)
2. **Monitor indexing status** for new pages and blog posts
3. **Track Site Quality Index** and work to improve it over time
4. **Review search queries** to identify Russian-language opportunities
5. **Check security reports** to ensure site is not compromised
6. **Monitor site speed** and optimize slow pages
7. **Compare Yandex vs Google/Bing** to identify unique opportunities

---

## When to Prioritize Yandex

**High Priority** if:

- You serve Russian-speaking populations
- You plan to expand to Eastern European markets
- You have physical locations in Russia, Belarus, Kazakhstan
- Your competitors are targeting Russian-speaking users
- You offer multilingual support

**Low Priority** if:

- You exclusively target US/Canada English-speaking markets
- You have no Russian-speaking staff or content
- Your budget is limited (focus on Google/Bing first)

**For HarmonyCare**: Consider Yandex a **secondary priority** after Google and Bing, unless you specifically target Russian-speaking care facilities or plan international expansion.

---

## Checklist

Use this checklist to track your setup:

- [ ] Create Yandex account
- [ ] Access Yandex Webmaster
- [ ] Add site (www.harmonycare.ai)
- [ ] Verify site ownership (meta tag, HTML file, or DNS)
- [ ] Submit sitemap.xml
- [ ] Set main mirror (www vs non-www)
- [ ] Set regional affiliation (United States)
- [ ] Verify robots.txt allows Yandex
- [ ] Submit 5-10 high-priority URLs for reindexing
- [ ] Check indexing status
- [ ] Monitor search queries (after 2-3 weeks)
- [ ] Review Site Quality Index
- [ ] Check security and violations
- [ ] Monitor site speed
- [ ] Set up email notifications
- [ ] (Optional) Set up Yandex Metrica
- [ ] (Optional) Implement Turbo Pages for blog
- [ ] (Optional) Add Russian language version

---

## Additional Resources

- [Yandex Webmaster Help](https://yandex.com/support/webmaster/)
- [Yandex Webmaster Guidelines](https://yandex.com/support/webmaster/recommendations/recommendations.html)
- [Yandex Search Quality Guidelines](https://yandex.com/support/webmaster/search-results/quality-guidelines.html)
- [Yandex Metrica](https://metrica.yandex.com)
- [Yandex Turbo Pages Documentation](https://yandex.com/support/turbo/)
- [Yandex Blog](https://yandex.com/blog/yacompany-en)

---

## Support

If you encounter issues during setup:

1. Check the troubleshooting section above
2. Review Yandex's error messages and help documentation
3. Visit the [Yandex Webmaster Forum](https://yandex.com/support/webmaster/forum.html)
4. Contact Yandex support (available in English and Russian)
5. Reach out to your development team for technical assistance

---

**Congratulations!** Your HarmonyCare website is now registered with Yandex Webmaster. While Yandex indexing may take longer than Google or Bing, you've expanded your search visibility to Russian-speaking markets and Eastern European regions. Monitor your progress monthly and optimize based on Yandex's unique ranking factors.
