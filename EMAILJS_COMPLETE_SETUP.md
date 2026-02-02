# 🚀 EmailJS Setup - COMPLETE GUIDE

## ✅ What I've Done For You

I've set up your project to use environment variables for EmailJS credentials. Now you just need to fill in your credentials!

---

## 📋 Step-by-Step Setup (2 minutes)

### Step 1: Create Free EmailJS Account
- Go to **https://www.emailjs.com/**
- Click **Sign Up** (FREE - no credit card needed)
- Sign up with any email

### Step 2: Connect Gmail Service
1. After login, go to **Email Services** (left menu)
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account**
5. Sign in with **m.tharunkumar9047@gmail.com**
6. Allow access
7. **COPY your Service ID** (it looks like: `service_abc1234`)

### Step 3: Create Email Template
1. Go to **Email Templates** (left menu)
2. Click **Create New Template**
3. Fill in:
   - **Template Name:** `Contact Form - 5Rings Sports`
   - **Subject:** `New Contact Form Submission - {{sport}}`
   - **To Email:** `m.tharunkumar9047@gmail.com`

4. In the template content area, paste this:
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

5. Click **Save**
6. **COPY your Template ID** (looks like: `template_xyz5678`)

### Step 4: Get Your Public Key
1. Go to **Account** → **General** (top right)
2. Find **Public Key** section
3. **COPY your Public Key** (looks like: `aBcD1234567890`)

---

## 🔧 Add Credentials to Your Project

Open the `.env` file in your project root and replace:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=aBcD1234567890
VITE_RECEIVER_EMAIL=m.tharunkumar9047@gmail.com
```

**Replace with YOUR actual credentials from EmailJS!**

---

## ✨ Test It!

1. **Restart your development server** (stop and run `npm run dev` again)
2. Go to the **Contact** page
3. Fill in the form:
   - Name: Your Name
   - Email: Your Email
   - Phone: Your Phone
   - Sport: Select a sport
   - Message: Your message

4. Click **Send Message**
5. Check your email at **m.tharunkumar9047@gmail.com** ✅

---

## 🎯 Where to Find Your Credentials

| What | Where to Find |
|-----|---|
| Service ID | Email Services → Click your Gmail service → Copy Service ID |
| Template ID | Email Templates → Click your template → Copy Template ID at top |
| Public Key | Account → General → Public Key section |

---

## ⚠️ Troubleshooting

### "Failed to send message"
- Check you restarted the dev server after adding .env file
- Verify all 3 credentials are correct (no extra spaces)
- Check browser console (F12) for error messages

### Email not received
- Check **spam/junk folder** first!
- Make sure "To Email" in template is `m.tharunkumar9047@gmail.com`
- Wait a few seconds (sometimes delayed)
- Check EmailJS dashboard to see if email was sent

### Can't find the IDs in EmailJS
- Make sure you're logged into EmailJS
- Email Services should show your Gmail service
- Email Templates should show your template
- Account tab at top-right shows your Public Key

---

## 📞 Need Help?

If emails still don't work after setup:
1. Check browser console (F12) for error messages
2. Check EmailJS dashboard for sending history
3. Verify all three values in `.env` file are correct

**Your email is ready once you add the credentials!** 🎉
