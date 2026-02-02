# ⚡ EmailJS Quick Reference Card

## 📝 What You Need to Do

### 1️⃣ Install Package
```bash
npm install @emailjs/browser
```

### 2️⃣ Get 3 Keys from EmailJS.com
- **Service ID** (from Gmail service)
- **Template ID** (from your template)
- **Public Key** (from Account settings)

### 3️⃣ Update Code in src/App.jsx
Find line ~375 and replace:
```javascript
const serviceId = 'service_YOUR_ID';  
const templateId = 'template_YOUR_ID'; 
const publicKey = 'YOUR_PUBLIC_KEY';   
```

### 4️⃣ Done! 🎉

---

## 🎯 Where Emails Go

**Destination:** m.tharunkumar9047@gmail.com

(You can change this in the EmailJS template settings)

---

## 📧 Email Template (Copy This)

**Subject Line:**
```
New Contact - 5Rings Sports - {{sport}}
```

**Email Body:**
```
New message from 5Rings Sports Website!

Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}
Sport: {{sport}}

Message:
{{message}}

---
Sent from www.5rings.in
```

**To Email:** m.tharunkumar9047@gmail.com

---

## ✅ Form Fields (Already in Code)

- `user_name` → Name
- `user_email` → Email  
- `user_phone` → Phone
- `sport` → Selected Sport
- `message` → Message text

---

## 🔗 Quick Links

**EmailJS Dashboard:** https://dashboard.emailjs.com/
**Sign Up:** https://www.emailjs.com/
**Full Guide:** See EMAILJS_SETUP.md

---

## 💡 Features Already Built

✅ Form validation (required fields)
✅ Success/error messages
✅ Loading state ("Sending...")
✅ Auto-reset form after send
✅ Beautiful styling
✅ Mobile responsive

---

## 🆘 Quick Troubleshoot

**Error?** → Check all 3 IDs are correct
**No email?** → Check spam folder
**Still not working?** → See EMAILJS_SETUP.md

---

**Need detailed help? Read: EMAILJS_SETUP.md**
