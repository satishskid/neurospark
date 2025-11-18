# Google Form Setup Guide

## Step 1: Create the Google Form

1. Go to https://forms.google.com
2. Click "+ Blank" to create a new form
3. Title: "GreyWaken Medical - Register Interest"

## Step 2: Add These Questions

### Question 1: Name
- Type: Short answer
- Required: Yes
- Question: "Full Name"

### Question 2: Email
- Type: Short answer
- Required: Yes
- Validation: Email
- Question: "Email Address"

### Question 3: Institution
- Type: Short answer
- Required: Yes
- Question: "Institution/Hospital Name"

### Question 4: Role
- Type: Multiple choice
- Required: Yes
- Question: "Your Role"
- Options:
  * Doctor/Physician
  * Nurse/Nurse Practitioner
  * Healthcare Administrator
  * Medical Student/Resident
  * Other

### Question 5: Specialty (if applicable)
- Type: Short answer
- Required: No
- Question: "Medical Specialty (if applicable)"

### Question 6: Interest Level
- Type: Multiple choice
- Required: Yes
- Question: "How interested are you in this course?"
- Options:
  * Very interested - Ready to enroll
  * Interested - Want to learn more
  * Somewhat interested - Just exploring
  * Not sure yet

### Question 7: Preferred Start Date
- Type: Multiple choice
- Required: Yes
- Question: "When would you like to start?"
- Options:
  * January 2025
  * February 2025
  * March 2025
  * Later in 2025
  * Flexible

### Question 8: How did you hear about us?
- Type: Multiple choice
- Required: No
- Question: "How did you hear about GreyWaken Medical?"
- Options:
  * Colleague recommendation
  * Social media
  * Medical conference
  * Email
  * Search engine
  * Other

### Question 9: Additional Comments
- Type: Paragraph
- Required: No
- Question: "Any questions or comments?"

## Step 3: Configure Form Settings

1. Click the gear icon (Settings)
2. Under "Responses":
   - ✅ Collect email addresses
   - ✅ Limit to 1 response
   - ✅ Send respondents a copy of their response
3. Under "Presentation":
   - ✅ Show progress bar
   - Confirmation message: "Thank you for your interest! We'll contact you soon at the email you provided."

## Step 4: Get the Form Link

1. Click "Send" button (top right)
2. Click the link icon (🔗)
3. Click "Shorten URL"
4. Copy the link (it will look like: https://forms.gle/XXXXX)

## Step 5: Add Link to Environment Variables

Create a file `.env.local` in the neurospark folder:

```
VITE_REGISTER_INTEREST_FORM=https://forms.gle/YOUR-FORM-ID
```

## Step 6: Test the Form

1. Open the form link in incognito mode
2. Fill it out completely
3. Submit
4. Check that you receive the response in Google Forms

## Step 7: Set Up Response Notifications

1. In Google Forms, click "Responses" tab
2. Click the three dots menu
3. Select "Get email notifications for new responses"
4. You'll receive an email for each submission

## Step 8: View Responses

- Go to Google Forms
- Click on your form
- Click "Responses" tab
- View summary or individual responses
- Export to Google Sheets for analysis

## Optional: Connect to Google Sheets

1. In "Responses" tab, click the Sheets icon
2. Create a new spreadsheet
3. All responses will automatically populate
4. Use for tracking and follow-up

---

**Once you have the form link, update the .env.local file and the code will automatically use it!**
