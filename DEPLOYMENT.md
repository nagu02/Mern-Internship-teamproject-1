# Deployment Guide - 5Rings Sports Website

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Production deployment:**
```bash
vercel --prod
```

**Benefits:**
- Free hosting
- Automatic HTTPS
- Global CDN
- Zero configuration
- Automatic deployments from Git

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy
```

4. **Production:**
```bash
netlify deploy --prod
```

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/5rings-sports"
}
```

3. **Update vite.config.js:**
```javascript
export default defineConfig({
  base: '/5rings-sports/',
  plugins: [react()]
})
```

4. **Deploy:**
```bash
npm run deploy
```

### Option 4: Traditional Web Hosting (cPanel/FTP)

1. **Build the project:**
```bash
npm run build
```

2. **Upload the `dist` folder contents to your web server**

3. **Configure `.htaccess` for SPA routing:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔧 Pre-Deployment Checklist

- [ ] Update all placeholder content
- [ ] Add real images
- [ ] Test on multiple devices
- [ ] Check all links work
- [ ] Verify contact form (if backend added)
- [ ] Test performance with Lighthouse
- [ ] Enable HTTPS
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure SEO meta tags
- [ ] Set up custom domain
- [ ] Test cross-browser compatibility

## 📊 Performance Optimization

### Image Optimization
```bash
# Install image optimization package
npm install vite-plugin-image-optimizer -D
```

### Add to vite.config.js:
```javascript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 }
    })
  ]
})
```

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to project settings
2. Add custom domain
3. Update DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

### For Netlify:
1. Go to Domain settings
2. Add custom domain
3. Update DNS:
   - A record: Netlify's IP
   - CNAME: `yoursite.netlify.app`

## 📧 Email Setup

Consider using:
- Google Workspace (professional)
- Zoho Mail (free tier available)
- Email forwarding services

## 🔐 Security Recommendations

1. **HTTPS only** - Always use SSL/TLS
2. **Environment Variables** - Store API keys securely
3. **CSP Headers** - Add Content Security Policy
4. **Regular Updates** - Keep dependencies updated

## 📱 Progressive Web App (Optional)

To convert to PWA:

1. **Install workbox:**
```bash
npm install vite-plugin-pwa -D
```

2. **Update vite.config.js:**
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '5Rings Sports',
        short_name: '5Rings',
        theme_color: '#FF6B00'
      }
    })
  ]
})
```

## 🎯 Post-Deployment

1. **Submit to Google Search Console**
2. **Create sitemap.xml**
3. **Set up Google Analytics**
4. **Monitor with Google PageSpeed Insights**
5. **Set up social media meta tags**
6. **Create robots.txt**

## 📞 Support

For deployment assistance:
- Email: info@5rings.in
- Phone: (91) 9150277760

---

**Last Updated:** February 2026
