# 📧 EmailJS Setup Guide

This guide will help you set up the contact form to send emails to **m.tharunkumar9047@gmail.com**

## 🚀 Quick Setup (5 minutes)

### Step 1: Install EmailJS Package

```bash
npm install @emailjs/browser
```

(Already added to package.json - just run `npm install`)

---

### Step 2: Create Free EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **Sign Up** (it's FREE - no credit card needed)
3. Sign up with any email (you can use m.tharunkumar9047@gmail.com)

---

### Step 3: Add Email Service

1. After signing in, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Click **Connect Account**
5. Sign in with **m.tharunkumar9047@gmail.com**
6. Allow EmailJS to access (it's safe)
7. **Copy the Service ID** (looks like: `service_abc1234`)

---

### Step 4: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

**Template Settings:**
- **Template Name:** Contact Form - 5Rings Sports
- **Subject:** New Contact Form Submission - {{sport}}

**Template Content:**
```
New message from 5Rings Sports Website!

Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}
Sport Interest: {{sport}}

Message:
{{message}}

---
Sent from 5rings.in contact form
```

4. **Important:** Set **To Email** to: `m.tharunkumar9047@gmail.com`
5. Click **Save**
6. **Copy the Template ID** (looks like: `template_xyz5678`)

---

### Step 5: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** section
3. **Copy your Public Key** (looks like: `aBcD1234567890`)

---

### Step 6: Update Your Code

Open `src/App.jsx` and find the Contact component (around line 370).

Replace these three lines:
```javascript
const serviceId = 'YOUR_SERVICE_ID';  
const templateId = 'YOUR_TEMPLATE_ID'; 
const publicKey = 'YOUR_PUBLIC_KEY';   
```

With your actual values:
```javascript
const serviceId = 'service_abc1234';  // Your Service ID from Step 3
const templateId = 'template_xyz5678'; // Your Template ID from Step 4
const publicKey = 'aBcD1234567890';    // Your Public Key from Step 5
```

---

### Step 7: Test It!

1. Save the file
2. Make sure your dev server is running (`npm run dev`)
3. Scroll to the contact form
4. Fill in the form and click "Send Message"
5. Check **m.tharunkumar9047@gmail.com** inbox!

---

## 🎯 What Happens When Someone Submits?

1. User fills the form on your website
2. EmailJS sends the data to their servers
3. EmailJS formats it using your template
4. Email arrives at **m.tharunkumar9047@gmail.com**
5. User sees success message on website

---

## ✅ Verification Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created with correct "To Email"
- [ ] All three IDs copied (Service, Template, Public Key)
- [ ] IDs pasted in `src/App.jsx`
- [ ] `npm install` run successfully
- [ ] Test email sent and received

---

## 🔧 Troubleshooting

### "Failed to send message"
- Check your internet connection
- Verify all three IDs are correct (no extra spaces)
- Make sure you saved the file
- Check browser console for errors (F12)

### Email not received
- Check spam/junk folder
- Verify "To Email" in template is correct
- Wait a few minutes (sometimes delayed)
- Check EmailJS dashboard for send history

### "Module not found: @emailjs/browser"
```bash
npm install @emailjs/browser
```

---

## 📊 EmailJS Free Tier Limits

- ✅ **200 emails/month** (FREE)
- ✅ Unlimited templates
- ✅ Unlimited services
- ✅ No credit card required

Perfect for your internship project!

---

## 🎨 Customization

### Change Success Message
In `src/App.jsx`, find:
```javascript
✅ Message sent successfully! We'll get back to you soon.
```
Change to whatever you want!

### Change Email Template
Go back to EmailJS dashboard → Templates → Edit your template

### Add More Fields
1. Add input to form with `name="field_name"`
2. Add `{{field_name}}` to EmailJS template

---

## 🔒 Security Notes

**Important:** Your Public Key is SAFE to expose in frontend code. It's designed to be public.

**Never expose:**
- ❌ Private Key
- ❌ Service passwords
- ❌ Gmail password

EmailJS handles this securely!

---

## 📞 Need Help?

**EmailJS Support:** support@emailjs.com
**EmailJS Docs:** https://www.emailjs.com/docs/

**Your Project Contact:**
Email: m.tharunkumar9047@gmail.com

---

## 🎓 For Your Internship Report

You can mention:
- "Implemented serverless email functionality using EmailJS"
- "No backend server required - fully frontend solution"
- "Secure contact form with real-time validation"
- "Professional email templating system"

---

**Last Updated:** February 2026
**Status:** Ready to Configure ✅
