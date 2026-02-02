#!/bin/bash

echo "🏅 5RINGS SPORTS WEBSITE - SETUP SCRIPT"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation successful!"
    echo ""
    echo "🚀 Quick Commands:"
    echo "   npm run dev      - Start development server"
    echo "   npm run build    - Build for production"
    echo "   npm run preview  - Preview production build"
    echo ""
    echo "📚 Documentation:"
    echo "   README.md        - Full documentation"
    echo "   QUICKSTART.md    - Quick start guide"
    echo "   DEPLOYMENT.md    - Deployment instructions"
    echo ""
    echo "🎯 Ready to start? Run: npm run dev"
    echo ""
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above."
    exit 1
fi
