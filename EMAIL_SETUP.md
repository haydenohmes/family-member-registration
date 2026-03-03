# Waitlist email setup (Gmail — no domain verification)

So testers receive the waitlist confirmation in their own inbox (any email provider).

## Steps

1. **Use a Gmail account** (e.g. haydenohmes@gmail.com) as the sender.

2. **Turn on 2-Step Verification** (required for App Passwords):
   - https://myaccount.google.com/signinoptions/two-step-verification

3. **Create an App Password**:
   - https://myaccount.google.com/apppasswords
   - Choose "Mail" and your device, then Generate.
   - Copy the 16-character password (e.g. `abcd efgh ijkl mnop`).

4. **Put it in `.env.local`**:
   - Open `.env.local` in this project.
   - Set `GMAIL_APP_PASSWORD=` to that password (spaces optional):
   ```bash
   GMAIL_USER=haydenohmes@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

5. **Restart the dev server** so it loads the new env.

### If you see "The setting you are looking for is not available"

Turn on **2-Step Verification** first. App Passwords only appear after 2-Step Verification is enabled.

1. Go to **https://myaccount.google.com/security**
2. Under "How you sign in to Google," click **2-Step Verification** and turn it **On** (e.g. with your phone).
3. After it is on, open **https://myaccount.google.com/apppasswords** again. You should see App passwords and can create one for Mail.

If it still does not appear, on the Security page scroll to "How you sign in to Google" and look for **App passwords**, or search "App passwords" in the Google Account search box.

After that, run the waitlist flow and enter a tester’s email; they’ll get the confirmation at that address (Gmail, work, Outlook, etc.).
