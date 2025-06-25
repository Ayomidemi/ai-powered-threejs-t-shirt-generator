# 🚀 Deployment Guide - Vercel

## Prerequisites

- GitHub account
- Vercel account (free)
- Your project pushed to GitHub

## 🔧 Setup Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: shirt-generator (or your choice)
# - Directory: ./
# - Override settings? No
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repo
4. Choose your shirt-generator repository
5. Click "Deploy"

### 3. Set Environment Variables (Optional)

If you want to use Hugging Face AI:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add: `HUGGINGFACE_API_KEY` = your_hugging_face_api_key

### 4. Test Your Deployment

- Your app will be available at: `https://your-project-name.vercel.app`
- Test the AI generation feature
- Test file uploads
- Test color changes

## 🎯 Features That Work

- ✅ 3D shirt visualization
- ✅ Color picker
- ✅ File upload (logo/full texture)
- ✅ AI pattern generation (fallback)
- ✅ Download functionality

## 📱 Development vs Production

- **Development**: `npm run dev` (uses localhost:8080 for API)
- **Production**: Uses Vercel serverless functions at `/api/dalle`

## 🔧 Troubleshooting

### Build Errors

```bash
# Install dependencies
npm install
cd client && npm install
```

### API Not Working

- Check Vercel function logs in dashboard
- Ensure environment variables are set
- Test with simple prompts first

### 3D Models Not Loading

- Ensure `public/shirt_baked.glb` is in the client/public directory
- Check browser console for CORS errors

## 🚀 Auto-Deployment

- Any push to `main` branch automatically redeploys
- Preview deployments for pull requests
- Real-time build logs in Vercel dashboard

Your T-shirt generator is now live! 🎉
