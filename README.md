# Abalone - Strategy Board Game Mini App

A futuristic mobile-first implementation of the classic Abalone strategy board game, built as a Mini App for Base and Farcaster.

## Game Description

Abalone is an award-winning two-player abstract strategy board game. Players control 14 marbles each (Black vs White) on a hexagonal board. The objective: **push 6 opponent marbles off the board to win!**

### Core Mechanics
- **Board**: 61 circular spaces in hexagonal arrangement
- **Movement**: Move 1-3 contiguous marbles per turn in straight lines
- **Sumito (Pushing)**: 3 marbles can push 2 or 1 opponent marbles; 2 marbles can push 1
- **Win Condition**: First to push 6 opponent marbles off the edge wins

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (60fps)
- **Web3**: Wagmi v2, OnchainKit
- **Network**: Base (Chain ID: 8453)
- **Platform**: Farcaster Mini App SDK
- **Deployment**: Vercel

## Features

✨ **Futuristic Neon Design** - Unique glassmorphic UI with cyber blue and electric cyan color scheme  
🎮 **Intuitive Swipe Controls** - Mobile-first gesture-based gameplay  
📳 **Haptic Feedback** - Tactile responses for every action  
🎯 **Tutorial System** - Interactive onboarding for new players  
🔗 **Farcaster Integration** - Share results directly to Farcaster  
⚡ **Base Network** - Built on Base L2 for future Web3 features  
🌟 **Smooth Animations** - 60fps gameplay with spring physics  

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deployment Guide

### Step 1: Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy (automatic)
4. Get your production URL (e.g., `https://your-app.vercel.app`)

### Step 2: Update Environment Variables

In Vercel dashboard:
- Add `NEXT_PUBLIC_APP_URL` = `https://your-app.vercel.app`

### Step 3: Update Farcaster Manifest

1. Update `public/.well-known/farcaster.json`:
   - Replace all instances of `YOUR-DOMAIN.vercel.app` with your actual domain
   
2. Redeploy to Vercel

### Step 4: Generate Account Association

1. Visit: `https://base.dev/preview?tab=account`
2. Enter your domain URL
3. Click "Verify" and follow instructions
4. Copy the generated `accountAssociation` object
5. Paste into `public/.well-known/farcaster.json`
6. Commit and redeploy

### Step 5: Verify Deployment

1. **Embed Tool**: `https://base.dev/preview?url=YOUR-URL`
   - Should show: ✅ Embed Valid
   
2. **Test in Warpcast**: 
   - Create a cast with your app URL
   - Verify embed appears correctly
   - Click to launch and test gameplay

## Project Structure

```
abalone/
├── app/
│   ├── layout.tsx          # Root layout with Farcaster metadata
│   ├── page.tsx            # Main game page
│   ├── globals.css         # Global styles
│   └── api/webhook/        # Farcaster webhook endpoint
├── components/
│   ├── FarcasterReady.tsx  # SDK ready() caller
│   ├── GameBoard.tsx       # Hexagonal board renderer
│   ├── Marble.tsx          # Individual marble component
│   ├── GameControls.tsx    # UI controls and win overlay
│   ├── ScoreDisplay.tsx    # Score tracking display
│   ├── ShareButton.tsx     # Farcaster share integration
│   └── Tutorial.tsx        # First-time user tutorial
├── context/
│   ├── GameContext.tsx     # Game state management
│   └── Web3Context.tsx     # Web3 providers (Wagmi + OnchainKit)
├── hooks/
│   ├── useFarcasterSDK.ts  # Farcaster SDK hook
│   ├── useSwipeControls.ts # Swipe gesture detection
│   └── useHaptics.ts       # Haptic feedback wrapper
├── utils/
│   ├── types.ts            # TypeScript types
│   ├── constants.ts        # Game constants
│   ├── boardUtils.ts       # Hexagonal coordinate system
│   └── moveValidator.ts    # Movement rules validation
└── public/
    ├── icon.png            # 1024x1024 app icon
    ├── hero-image.png      # 1200x630 hero image
    └── .well-known/
        └── farcaster.json  # Farcaster manifest
```

## Game Controls

- **Tap** a marble to select it (up to 3 in a line)
- **Swipe** in any direction to move selected marbles
- **Tap** empty space to deselect

## Strategy Tips

🎯 **Control the Center** - Maintain presence in center for mobility  
🤝 **Stay Connected** - Keep marbles close for defense  
⬡ **Hexagon Formation** - Create defensive shapes  
💪 **Play Aggressively** - Push forward to avoid stalemates  
⚠️ **Edge Awareness** - Be cautious near board edges  

## Future Enhancements

- 🤖 AI opponent with difficulty levels
- 🌐 Multiplayer via WebSocket
- 🏆 Tournament mode with brackets
- 🎨 Custom themes and marble skins
- 📊 On-chain game history (Base)
- 🏅 NFT achievements for milestones

## License

MIT

## Credits

Game design by Michel Lalet and Laurent Lévi (1987)  
Mini App implementation by [Your Name]  

---

Built with ❤️ for Base and Farcaster
