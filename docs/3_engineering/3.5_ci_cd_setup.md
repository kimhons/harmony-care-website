# CI/CD Setup Guide

This guide explains how to set up automated testing and deployment workflows for the HarmonyCare website using GitHub Actions and Vercel.

---

## 📋 Overview

The project includes two GitHub Actions workflows:

1. **Automated Testing** (`.github/workflows/test.yml`) - Runs tests, linting, and builds on every push and PR
2. **Vercel Deployment** (`.github/workflows/deploy.yml`) - Automatically deploys to Vercel on main branch pushes

---

## 🚀 Quick Setup

### Step 1: Push Workflow Files to GitHub

The workflow files are already created locally. Push them to GitHub:

```bash
cd /home/ubuntu/harmony-website
git add .github/ vercel.json
git commit -m "ci: Add GitHub Actions workflows and Vercel configuration"
git push origin main
```

**Alternative:** Upload files manually via GitHub web interface:
1. Go to https://github.com/kimhons/harmonycare-website
2. Click "Add file" → "Upload files"
3. Upload the `.github/workflows/` directory and `vercel.json`

### Step 2: Configure GitHub Secrets

For the deployment workflow to work, add these secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret" and add:

| Secret Name | Description | How to Get It |
|------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel API token | Go to https://vercel.com/account/tokens → Create new token |
| `VERCEL_ORG_ID` | Your Vercel organization ID | Run `vercel link` in project, then check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Same as above, found in `.vercel/project.json` |

### Step 3: Link Project to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Link project to Vercel
cd /home/ubuntu/harmony-website
vercel link

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No (create new)
# - Project name? harmonycare-website
# - Directory? ./ (current directory)
```

This creates a `.vercel` directory with `project.json` containing your IDs.

### Step 4: Get Vercel IDs

```bash
cat .vercel/project.json
```

Copy the `orgId` and `projectId` values and add them as GitHub secrets (Step 2).

---

## 📝 Workflow Details

### Automated Testing Workflow

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
1. **Test** - Runs unit tests with Vitest
2. **Lint** - Runs ESLint to check code quality
3. **Build** - Verifies the project builds successfully

**What it does:**
- Installs dependencies with pnpm
- Runs TypeScript type checking
- Executes all 41 tests
- Lints code with ESLint
- Builds production bundle
- Uploads test results and build artifacts

**Badge:** Add this to your README.md:
```markdown
[![Tests](https://github.com/kimhons/harmonycare-website/actions/workflows/test.yml/badge.svg)](https://github.com/kimhons/harmonycare-website/actions/workflows/test.yml)
```

### Vercel Deployment Workflow

**Triggers:**
- Push to `main` branch (production deployment)
- Pull requests (preview deployment)
- Manual trigger via "Run workflow" button

**Jobs:**
1. **Deploy** - Deploys to Vercel production
2. **Deploy Preview** - Creates preview deployment for PRs

**What it does:**
- Runs tests before deployment (safety check)
- Builds production bundle
- Deploys to Vercel
- Comments deployment URL on PRs

**Badge:** Add this to your README.md:
```markdown
[![Deploy](https://github.com/kimhons/harmonycare-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/kimhons/harmonycare-website/actions/workflows/deploy.yml)
```

---

## 🔧 Vercel Configuration

The `vercel.json` file configures:

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### SPA Routing
- Rewrites all routes to `/index.html` for client-side routing
- Supports React Router/Wouter navigation

### Caching
- Static assets cached for 1 year (`max-age=31536000`)
- Immutable flag for optimal performance

### Runtime
- Node.js 22.x for API functions
- Production environment variables

---

## 🧪 Testing the Workflows

### Test Workflow Locally

Before pushing, test the workflow locally:

```bash
# Run tests
pnpm test

# Run linting
pnpm exec eslint . --ext .ts,.tsx

# Run type checking
pnpm exec tsc --noEmit

# Build project
pnpm build
```

### Trigger Workflows Manually

1. Go to https://github.com/kimhons/harmonycare-website/actions
2. Select a workflow (Test or Deploy)
3. Click "Run workflow"
4. Select branch and click "Run workflow"

### View Workflow Results

1. Go to https://github.com/kimhons/harmonycare-website/actions
2. Click on a workflow run to see details
3. Expand job steps to see logs
4. Download artifacts (test results, build output)

---

## 🐛 Troubleshooting

### Workflow Fails on Test Job

**Problem:** Tests fail in GitHub Actions but pass locally

**Solutions:**
- Check if environment variables are set correctly
- Verify Node.js version matches (22.x)
- Review test logs in Actions tab
- Ensure all dependencies are in `package.json`

### Workflow Fails on Deploy Job

**Problem:** Deployment fails with authentication error

**Solutions:**
- Verify `VERCEL_TOKEN` is valid (regenerate if needed)
- Check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- Ensure secrets are added to repository (not organization)
- Run `vercel link` again to refresh IDs

### Build Fails in GitHub Actions

**Problem:** Build succeeds locally but fails in CI

**Solutions:**
- Check for missing environment variables
- Verify all dependencies are listed in `package.json`
- Ensure build command is correct in workflow
- Review build logs for specific errors

### Deployment URL Not Commented on PR

**Problem:** Preview deployment works but URL not posted

**Solutions:**
- Verify GitHub Actions has write permissions
- Check workflow has `permissions: write-all` or `pull-requests: write`
- Ensure PR is from same repository (not fork)

---

## 🔐 Security Best Practices

### Secrets Management
- Never commit secrets to git
- Rotate tokens regularly (every 90 days)
- Use least-privilege access (read-only where possible)
- Audit secret usage in Actions logs

### Workflow Security
- Pin action versions to specific commits (e.g., `@v4.1.0`)
- Review third-party actions before use
- Limit workflow permissions with `permissions:` key
- Use `pull_request_target` carefully (security risk)

### Deployment Security
- Enable Vercel deployment protection
- Require approval for production deployments
- Use environment-specific secrets
- Monitor deployment logs for anomalies

---

## 📊 Monitoring & Notifications

### GitHub Actions Notifications

Configure notifications in GitHub settings:
1. Go to https://github.com/settings/notifications
2. Under "Actions", enable:
   - ✅ Send notifications for failed workflows
   - ✅ Include workflow run details

### Vercel Notifications

Configure in Vercel dashboard:
1. Go to https://vercel.com/kimhons/harmonycare-website/settings/notifications
2. Enable:
   - ✅ Deployment started
   - ✅ Deployment ready
   - ✅ Deployment failed

### Slack Integration (Optional)

Add Slack notifications to workflows:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    payload: |
      {
        "text": "❌ Deployment failed for ${{ github.repository }}"
      }
```

---

## 🎯 Next Steps

### Recommended Enhancements

1. **Add Code Coverage**
   ```yaml
   - name: Upload coverage to Codecov
     uses: codecov/codecov-action@v4
     with:
       files: ./coverage/lcov.info
   ```

2. **Add Lighthouse CI**
   ```yaml
   - name: Run Lighthouse CI
     uses: treosh/lighthouse-ci-action@v10
     with:
       urls: |
         https://harmonycare-website.vercel.app
       uploadArtifacts: true
   ```

3. **Add Dependency Updates**
   - Enable Dependabot in repository settings
   - Configure `.github/dependabot.yml`
   - Auto-merge minor/patch updates

4. **Add Release Automation**
   - Use semantic-release for versioning
   - Auto-generate changelogs
   - Create GitHub releases on tag push

5. **Add Performance Monitoring**
   - Integrate Sentry for error tracking
   - Add bundle size checks
   - Monitor Core Web Vitals

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [pnpm CI Guide](https://pnpm.io/continuous-integration)

---

## 🆘 Support

If you encounter issues:

1. **Check workflow logs** in GitHub Actions tab
2. **Review Vercel deployment logs** in dashboard
3. **Search GitHub Issues** for similar problems
4. **Open an issue** on the repository with:
   - Workflow run URL
   - Error message
   - Steps to reproduce
   - Environment details

---

**Last Updated:** November 25, 2025  
**Version:** 1.0.0
