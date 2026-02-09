# Abalone Mini App - Deployment Guide

Complete step-by-step guide to deploy your Abalone mini app to Vercel and integrate with Farcaster.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Farcaster account on Base app

## Part 1: Initial Deployment to Vercel

### Step 1: Prepare Repository

1. **Initialize Git repository (if not already done)**:
```bash
git init
git add .
git commit -m "Initial commit: Abalone mini app"
```

2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "abalone-miniapp")
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/abalone-miniapp.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Select "abalone-miniapp"

2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps`

3. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_APP_URL` = (leave empty for now, we'll update after deployment)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Note your production URL (e.g., `https://abalone-miniapp.vercel.app`)

### Step 3: Update Configuration

1. **Update Environment Variable in Vercel**:
   - Go to Project Settings → Environment Variables
   - Edit `NEXT_PUBLIC_APP_URL`
   - Set value to your production URL: `https://abalone-miniapp.vercel.app`
   - Save

2. **Update Farcaster Manifest**:
   - Edit `public/.well-known/farcaster.json`
   - Replace ALL instances of `YOUR-DOMAIN.vercel.app` with your actual domain
   - Example: `https://abalone-miniapp.vercel.app`

3. **Commit and Push**:
```bash
git add .
git commit -m "Update domain configuration"
git push
```

4. **Wait for automatic redeployment** (Vercel will redeploy automatically)

## Part 2: Farcaster Integration

### Step 4: Verify Deployment

1. **Check Manifest Accessibility**:
   - Open: `https://your-domain.vercel.app/.well-known/farcaster.json`
   - Should display JSON without errors

2. **Test App Loading**:
   - Open: `https://your-domain.vercel.app`
   - Game should load and display tutorial

### Step 5: Generate Account Association

This is **CRITICAL** for Farcaster integration!

1. **Visit Base Preview Tool**:
   - Go to: https://base.dev/preview?tab=account
   - Or: https://www.base.org/build (navigate to "Preview" tab)

2. **Enter Your Domain**:
   - In "App URL" field, enter: `your-domain.vercel.app` (without https://)
   - Click "Submit"

3. **Verify and Sign**:
   - Click "Verify" button that appears
   - Follow prompts to connect your Farcaster account
   - Sign the message with your wallet

4. **Copy Account Association**:
   - After signing, you'll receive a JSON object like:
   ```json
   {
     "header": "eyJmaWQiOjEyM...",
     "payload": "eyJkb21haW4iOi...",
     "signature": "MHhmNGQzN2M2OT..."
   }
   ```
   - Copy this entire object

5. **Update Manifest**:
   - Open `public/.well-known/farcaster.json`
   - Replace the empty `accountAssociation` object with your copied data
   - Example:
   ```json
   {
     "accountAssociation": {
       "header": "eyJmaWQiOjEyM...",
       "payload": "eyJkb21haW4iOi...",
       "signature": "MHhmNGQzN2M2OT..."
     },
     "miniapp": {
       ...
     }
   }
   ```

6. **Deploy Updated Manifest**:
```bash
git add public/.well-known/farcaster.json
git commit -m "Add Farcaster account association"
git push
```

## Part 3: Verification

### Step 6: Test Embed Validity

1. **Base Preview Tool**:
   - Go to: https://base.dev/preview
   - Enter your full URL: `https://your-domain.vercel.app`
   - Check results:
     - ✅ HTTP Status: 200
     - ✅ Embed Present
     - ✅ Embed Valid
     - ✅ Preview Image Shows

2. **Metadata Tab**:
   - Click "Metadata" tab
   - Verify all fields are populated:
     - Name: Abalone
     - Description: Present
     - Icon: Shows correctly
     - Hero Image: Shows correctly

3. **Account Tab**:
   - Click "Account" tab
   - Should show: ✅ Account Association Valid

### Step 7: Test in Farcaster (Warpcast)

1. **Create Test Cast**:
   - Open Warpcast app or https://warpcast.com
   - Create a new cast
   - Paste your app URL: `https://your-domain.vercel.app`
   - You should see:
     - Hero image preview
     - App name "Abalone"
     - "Play Now" button

2. **Test Launch**:
   - Click the preview or "Play Now" button
   - App should launch within Farcaster
   - Tutorial should appear
   - Game should be playable

3. **Test Share Functionality**:
   - Play a game
   - Click "Share" button
   - Should open Warpcast composer with pre-filled message

## Part 4: Optional Enhancements

### Step 8: Register on Base.dev (Optional)

1. **Create Account**:
   - Go to https://base.dev
   - Sign up or log in

2. **Register App**:
   - Navigate to "Create Mini App" or "Register App"
   - Fill in details:
     - Name: Abalone
     - Description: Strategy Board Game
     - Category: Games
     - URL: Your Vercel URL
   - Upload icon and screenshots

3. **Get Base App ID**:
   - After registration, you'll receive a `base:app_id`
   - Add to `.env.local`:
   ```
   NEXT_PUBLIC_BASE_APP_ID=your-base-app-id
   ```
   - Update `app/layout.tsx` metadata:
   ```typescript
   other: {
     // ... other metadata
     'base:app_id': process.env.NEXT_PUBLIC_BASE_APP_ID || '',
   }
   ```

### Step 9: Apply for Featured Placement (Optional)

If you want your app featured in Farcaster/Base:

1. **Ensure Quality Standards**:
   - ✅ App loads in < 3 seconds
   - ✅ In-app actions complete in < 1 second
   - ✅ Supports light and dark modes
   - ✅ Touch targets minimum 44px
   - ✅ Icon is 1024×1024 PNG with no transparency
   - ✅ Hero image is 1200×630 PNG

2. **Submit for Review**:
   - Visit: https://docs.google.com/forms/d/e/1FAIpQLSeZiB3fmMS7oxBKrWsoaew2LFxGpktnAtPAmJaNZv5TOCXIZg/viewform
   - Fill out the submission form
   - Wait for review (can take 1-2 weeks)

## Troubleshooting

### Common Issues

**Issue**: Embed shows as Invalid
- **Fix**: Verify `fc:miniapp` and `fc:frame` in `layout.tsx` have identical JSON
- **Fix**: Ensure `version: '1'` is a string, not a number
- **Fix**: Check that `action.type` is exactly `'launch_frame'`

**Issue**: "Ready not called" error
- **Fix**: Ensure `<FarcasterReady />` is first component in `page.tsx`
- **Fix**: Verify dynamic import in `FarcasterReady.tsx`

**Issue**: Opens external browser instead of staying in Farcaster
- **Fix**: Use `useFarcasterSDK().openUrl()` instead of `window.open()`

**Issue**: Images not loading
- **Fix**: Verify images are true PNG format (not JPEG renamed to .png)
- **Fix**: Check images are in `public/` folder
- **Fix**: Use absolute URLs in manifest: `https://domain.com/icon.png`

**Issue**: Account association fails
- **Fix**: Ensure Vercel Deployment Protection is OFF
- **Fix**: Verify manifest is accessible at `/.well-known/farcaster.json`
- **Fix**: Re-generate account association with correct domain

### Verification Checklist

Before going live, verify:

- [ ] App loads successfully at production URL
- [ ] Manifest accessible at `/.well-known/farcaster.json`
- [ ] Account association present in manifest
- [ ] Base Preview shows "Embed Valid"
- [ ] Test cast in Warpcast shows correct preview
- [ ] App launches within Farcaster (doesn't open external browser)
- [ ] Tutorial appears on first load
- [ ] Game is playable (select, swipe, move marbles)
- [ ] Win condition triggers correctly
- [ ] Share button opens Warpcast composer
- [ ] All animations are smooth (60fps)

## Post-Deployment

### Monitoring

- Check Vercel Analytics for usage stats
- Monitor error logs in Vercel dashboard
- Track shares and engagement in Farcaster

### Updates

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy.

### Domain (Optional)

To use custom domain:
1. Add domain in Vercel project settings
2. Update DNS records with your domain provider
3. Update `NEXT_PUBLIC_APP_URL` environment variable
4. Regenerate account association with new domain
5. Update all URLs in manifest

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Farcaster Docs**: https://docs.farcaster.xyz
- **Base Docs**: https://docs.base.org
- **Mini Apps Guide**: https://docs.base.org/mini-apps

Good luck with your deployment! 🎯🚀
