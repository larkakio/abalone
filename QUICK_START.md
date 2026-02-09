# Abalone Mini App - Quick Start Guide

🎯 **Your Abalone strategy game is ready to deploy!**

## What You Have

✅ Complete Next.js 14 mini app with TypeScript  
✅ Futuristic neon UI with smooth animations  
✅ Hexagonal board with full Abalone game logic  
✅ Swipe controls + haptic feedback  
✅ Farcaster Mini App SDK integration  
✅ Base Network (Web3) support  
✅ Tutorial system for new players  
✅ Beautiful icon and hero image (no white corners!)  

## Quick Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Test Locally

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser**:
   - Visit: http://localhost:3000
   - Tutorial will appear on first load
   - Try the game:
     - Tap marbles to select
     - Swipe to move
     - Push 6 opponent marbles off to win!

## Deploy to Production

Follow the detailed guide in `DEPLOYMENT.md` or quick steps:

1. **Push to GitHub**
2. **Deploy on Vercel** (connect your repo)
3. **Update domain** in Vercel env vars and `farcaster.json`
4. **Generate account association** at https://base.dev/preview
5. **Test on Warpcast** - create a cast with your URL

## File Structure

```
abalone/
├── app/
│   ├── layout.tsx          ← Farcaster metadata
│   ├── page.tsx            ← Main game page
│   └── api/webhook/        ← Farcaster webhook
├── components/
│   ├── GameBoard.tsx       ← Hexagonal board
│   ├── Marble.tsx          ← Animated marbles
│   ├── GameControls.tsx    ← UI controls
│   ├── ScoreDisplay.tsx    ← Score tracker
│   ├── Tutorial.tsx        ← Onboarding
│   └── FarcasterReady.tsx  ← SDK integration
├── utils/
│   ├── boardUtils.ts       ← Hex grid math
│   ├── moveValidator.ts    ← Game rules
│   └── types.ts            ← TypeScript types
├── public/
│   ├── icon.png            ← 1024x1024 app icon
│   ├── hero-image.png      ← 1200x630 hero banner
│   └── .well-known/
│       └── farcaster.json  ← Manifest (UPDATE DOMAIN!)
└── README.md               ← Full documentation
```

## Important Notes

### ⚠️ Before Deployment

1. **Update domain** in these files:
   - `public/.well-known/farcaster.json` (all URLs)
   - Vercel environment variable: `NEXT_PUBLIC_APP_URL`

2. **Generate account association** after first deploy:
   - Visit: https://base.dev/preview?tab=account
   - Sign with your Farcaster account
   - Copy JSON to `farcaster.json`

3. **Verify embed**:
   - Check: https://base.dev/preview?url=YOUR-URL
   - Should show: ✅ Embed Valid

### 🎮 Game Controls

- **Tap** marble to select (up to 3 in a line)
- **Swipe** in any direction to move
- **Win** by pushing 6 opponent marbles off

### 🎨 Design Colors

- Deep Space Blue: `#0a0e1a` (background)
- Cyber Blue: `#3b82f6` (accents)
- Electric Cyan: `#06b6d4` (highlights)
- Neon Purple: `#8b5cf6` (special effects)

## Next Steps

1. ✅ **Test locally** - Play a few games
2. 🚀 **Deploy to Vercel** - Follow `DEPLOYMENT.md`
3. 🔗 **Integrate with Farcaster** - Generate account association
4. 📢 **Share on Warpcast** - Post your app URL
5. 🏆 **Apply for featuring** (optional) - Submit to Base

## Resources

- **Full Deployment Guide**: See `DEPLOYMENT.md`
- **Game Documentation**: See `README.md`
- **Farcaster Docs**: https://docs.farcaster.xyz
- **Base Docs**: https://docs.base.org

## Support

If you encounter issues:

1. Check `DEPLOYMENT.md` troubleshooting section
2. Verify all domains are updated correctly
3. Test embed validity at https://base.dev/preview
4. Check Vercel deployment logs

---

**Ready to deploy?** Follow `DEPLOYMENT.md` for step-by-step instructions! 🚀

Good luck! 🎯
