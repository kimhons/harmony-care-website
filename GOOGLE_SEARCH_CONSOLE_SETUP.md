# Google Search Console Setup Guide for HarmonyCare

This guide provides step-by-step instructions for verifying domain ownership, submitting your sitemap, and requesting indexing in Google Search Console to accelerate search visibility for www.harmonycare.ai.

---

## Prerequisites

- Access to your domain registrar (where you purchased harmonycare.ai)
- Access to your Vercel deployment dashboard
- Google account for Search Console access

---

## Step 1: Access Google Search Console

1. Navigate to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add Property"** in the top-left dropdown

---

## Step 2: Choose Verification Method

You have two options for adding your property:

### Option A: Domain Property (Recommended)

- Covers all subdomains (www, blog, etc.) and protocols (http, https)
- Requires DNS verification

### Option B: URL Prefix Property

- Covers only the specific URL you enter
- Multiple verification methods available

**We recommend Option A (Domain Property)** for comprehensive coverage.

---

## Step 3: Verify Domain Ownership (DNS Method)

### For Domain Property:

1. **Enter your domain**: `harmonycare.ai` (without www or https)
2. **Copy the TXT record** provided by Google Search Console
   - It will look like: `google-site-verification=XXXXXXXXXXXXXXXXXXXXX`

3. **Add DNS TXT Record to your domain registrar:**

   **If using Vercel DNS:**
   - Go to your Vercel dashboard → Settings → Domains
   - Click on `harmonycare.ai`
   - Scroll to "DNS Records"
   - Click "Add Record"
   - Type: `TXT`
   - Name: `@` (or leave blank for root domain)
   - Value: Paste the verification code from Google
   - TTL: `3600` (or default)
   - Click "Save"

   **If using external DNS provider (Namecheap, GoDaddy, Cloudflare, etc.):**
   - Log in to your domain registrar
   - Navigate to DNS management
   - Add a new TXT record:
     - Host/Name: `@` or leave blank
     - Value: Paste the verification code
     - TTL: 3600 seconds (1 hour)
   - Save changes

4. **Wait for DNS propagation** (usually 5-15 minutes, can take up to 48 hours)

5. **Return to Google Search Console** and click **"Verify"**

---

## Step 4: Alternative Verification Methods (URL Prefix Only)

If you chose URL Prefix property (`https://www.harmonycare.ai`), you have additional verification options:

### HTML File Upload (Vercel):

1. Download the HTML verification file from Google
2. In your project: `/home/ubuntu/harmony-website/client/public/`
3. Place the verification file (e.g., `google1234567890abcdef.html`) in the `public` folder
4. Commit and push to GitHub
5. Wait for Vercel deployment to complete
6. Return to Google Search Console and click "Verify"

### HTML Meta Tag (Already Implemented):

1. The SEOHead component supports adding verification meta tags
2. Add to `/home/ubuntu/harmony-website/client/src/components/SEOHead.tsx`:
   ```tsx
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Deploy to production
4. Click "Verify" in Google Search Console

---

## Step 5: Submit Your Sitemap

Once verified, submit your sitemap for faster indexing:

1. In Google Search Console, select your property
2. Navigate to **"Sitemaps"** in the left sidebar
3. Enter your sitemap URL: `https://www.harmonycare.ai/sitemap.xml`
4. Click **"Submit"**

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

Google will crawl these pages and index them over the next few days to weeks.

---

## Step 6: Request Indexing for Key Pages

To accelerate indexing of your most important pages:

1. In Google Search Console, go to **"URL Inspection"** (top search bar)
2. Enter the full URL of a page (e.g., `https://www.harmonycare.ai/`)
3. Click **"Request Indexing"**
4. Repeat for high-priority pages:
   - `https://www.harmonycare.ai/`
   - `https://www.harmonycare.ai/pricing`
   - `https://www.harmonycare.ai/solutions/group-homes`
   - `https://www.harmonycare.ai/solutions/icf-id`
   - `https://www.harmonycare.ai/agents`
   - `https://www.harmonycare.ai/signup`

**Note:** You can request indexing for ~10-12 URLs per day. Prioritize your most important landing pages.

---

## Step 7: Monitor Indexing Status

### Check Coverage Report:

1. Go to **"Coverage"** in the left sidebar
2. View which pages are indexed, have errors, or are excluded
3. Fix any errors reported

### Check Performance:

1. Go to **"Performance"** in the left sidebar
2. Monitor impressions, clicks, CTR, and average position
3. Identify top-performing queries and pages

---

## Step 8: Validate Structured Data

Your website now includes rich structured data (Service schema, FAQ schema, Organization schema). Validate it:

1. Go to **"Enhancements"** in the left sidebar
2. Check for:
   - **FAQ** (should show FAQ-rich results for Pricing, Group Homes, ICF-ID pages)
   - **Organization** (should show your organization info)
3. If errors appear, click to see details and fix them

### Manual Testing:

Use [Google Rich Results Test](https://search.google.com/test/rich-results):

1. Enter your page URL (e.g., `https://www.harmonycare.ai/pricing`)
2. Click "Test URL"
3. Review detected structured data
4. Fix any warnings or errors

---

## Step 9: Set Up Email Notifications

1. In Google Search Console, click the **gear icon** (Settings)
2. Go to **"Users and permissions"**
3. Add team members who should receive alerts
4. Configure notification preferences for:
   - Critical site errors
   - Manual actions
   - Security issues

---

## Step 10: Additional Optimizations

### Enable International Targeting (if applicable):

1. Go to **Settings** → **International Targeting**
2. Set target country if you primarily serve US or Canada

### Submit Additional Sitemaps (if created):

- Blog sitemap: `/blog-sitemap.xml` (if you add more blog posts)
- Image sitemap: `/image-sitemap.xml` (if you want images indexed separately)

### Monitor Mobile Usability:

1. Go to **"Mobile Usability"** in the left sidebar
2. Fix any mobile-specific issues reported

### Check Core Web Vitals:

1. Go to **"Core Web Vitals"** in the left sidebar
2. Monitor page experience metrics (LCP, FID, CLS)
3. Optimize pages with "Poor" ratings

---

## Expected Timeline

| Action                 | Timeframe                |
| ---------------------- | ------------------------ |
| DNS verification       | 5 minutes - 48 hours     |
| Sitemap processing     | 1-7 days                 |
| Initial indexing       | 3-14 days                |
| Full site indexing     | 2-4 weeks                |
| Rich results appearing | 1-2 weeks after indexing |
| Performance data       | 2-3 days after indexing  |

---

## Troubleshooting

### Verification Failed:

- **DNS not propagated**: Wait 24-48 hours and try again
- **Wrong DNS record**: Double-check you copied the entire TXT value
- **Multiple TXT records**: Some registrars require quotes around the value

### Sitemap Not Found:

- Verify sitemap is accessible: Visit `https://www.harmonycare.ai/sitemap.xml` in your browser
- Check for typos in the URL
- Ensure sitemap is deployed to production (not just local dev)

### Pages Not Indexing:

- Check `robots.txt` isn't blocking pages: `https://www.harmonycare.ai/robots.txt`
- Verify pages don't have `noindex` meta tags
- Ensure pages return 200 status code (not 404 or 500)
- Check if pages are linked from other pages (internal linking)

### Structured Data Not Showing:

- Use [Rich Results Test](https://search.google.com/test/rich-results) to validate
- Ensure JSON-LD is properly formatted (no syntax errors)
- Wait 1-2 weeks for Google to process and display rich results

---

## Schema Markup Summary

Your website now includes the following structured data:

### Organization Schema (Homepage):

- Organization name, logo, social profiles
- Contact information
- Service areas (US, Canada)

### Service Schema (Solution Pages):

- Group Homes: Pricing, service description, availability
- ICF-ID: Pricing, service description, availability

### FAQ Schema (3 Pages):

- Pricing page: 6 questions about pricing and plans
- Group Homes page: 6 questions about group home solutions
- ICF-ID page: 6 questions about ICF-ID compliance and features

### Benefits:

- **FAQ Rich Results**: Your FAQs may appear directly in search results
- **Service Rich Snippets**: Pricing and service details may show in search
- **Knowledge Panel**: Organization info may appear in Google's knowledge graph
- **Higher CTR**: Rich results attract more clicks than plain listings

---

## Monitoring Best Practices

1. **Check Search Console weekly** for new errors or issues
2. **Review performance monthly** to track search growth
3. **Update sitemap** whenever you add new pages
4. **Request indexing** for time-sensitive content (new blog posts, announcements)
5. **Monitor competitors** using the "Search Analytics" report
6. **Track keyword rankings** for target terms like "group home software", "ICF-ID management"

---

## Additional Resources

- [Google Search Console Help Center](https://support.google.com/webmasters)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

---

## Support

If you encounter issues during setup:

1. Check the troubleshooting section above
2. Review Google Search Console's error messages (they're usually specific)
3. Consult Google's official documentation
4. Reach out to your development team for technical assistance

---

## Checklist

Use this checklist to track your progress:

- [ ] Access Google Search Console
- [ ] Add property (Domain or URL Prefix)
- [ ] Add DNS TXT record to domain registrar
- [ ] Verify domain ownership
- [ ] Submit sitemap.xml
- [ ] Request indexing for 5-10 key pages
- [ ] Validate structured data with Rich Results Test
- [ ] Set up email notifications
- [ ] Add team members to Search Console
- [ ] Monitor Coverage report for errors
- [ ] Check Performance report after 3-7 days
- [ ] Review Enhancements for FAQ/Service rich results
- [ ] Verify mobile usability
- [ ] Check Core Web Vitals

---

**Congratulations!** Your HarmonyCare website is now fully optimized for Google Search. You should start seeing search traffic within 2-4 weeks as Google indexes your pages and begins showing rich results.
