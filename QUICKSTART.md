# 🚀 Quick Start Guide - 5Rings Sports Website

## ⚡ Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```
This will install React, Vite, and all necessary packages.

### Step 2: Start Development Server
```bash
npm run dev
```
Your website will open automatically at `http://localhost:3000`

### Step 3: Start Building!
The website is now running. You can:
- Edit `src/App.jsx` to modify content
- Update colors in the CSS variables
- Add your own images and content

## 📁 Project Files

```
5rings-sports-website/
├── src/
│   ├── App.jsx           # ⭐ Main application (edit this!)
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Build configuration
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
├── COMPONENTS.md         # Component reference
└── .gitignore           # Git ignore rules
```

## 🎨 Quick Customizations

### Change Colors
In `src/App.jsx`, find the `:root` CSS section:
```css
:root {
  --primary: #FF6B00;     /* Change this */
  --secondary: #00D9FF;   /* Change this */
  --accent: #FFE500;      /* Change this */
}
```

### Update Contact Info
Find the `Contact` component in `src/App.jsx`:
```javascript
const Contact = () => {
  return (
    <section className="contact" id="contact">
      // Update phone, email, addresses here
```

### Add Sports
Find the `Sports` component:
```javascript
const sports = [
  { name: 'Your Sport', icon: '🎯' },
  // Add more sports here
];
```

## 🌐 Going Live

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📱 View on Phone

1. Find your computer's local IP:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. On your phone's browser, go to:
   `http://YOUR_IP:3000`

## ❓ Common Issues

### Port 3000 Already in Use
```bash
# Kill the process
npx kill-port 3000
# Or use a different port
vite --port 3001
```

### Module Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear cache
npm run build -- --force
```

## 📚 Learn More

- **Full README:** Complete documentation
- **DEPLOYMENT:** How to deploy to production
- **COMPONENTS:** Component structure reference

## 🆘 Need Help?

**Contact:**
- Email: info@5rings.in
- Phone: (91) 9150277760

## ✅ Checklist for Internship

- [ ] Project runs locally
- [ ] Understand component structure
- [ ] Made basic customizations
- [ ] Added own content
- [ ] Tested on mobile
- [ ] Deployed to web
- [ ] Documented changes

---

**Happy Coding! 🎉**

Made for 5Rings Sports internship project.
