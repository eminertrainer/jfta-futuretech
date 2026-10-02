# Jitra Future Tech Academy — Cloudflare Deployment

This version uses **Cloudflare Pages + Pages Functions + D1**. No Google Apps Script is required.

## Project structure
- `public/` — website files
- `functions/api/register.js` — receives form submissions
- `functions/api/export.js` — CSV export protected by a key
- `schema.sql` — D1 table schema
- `wrangler.toml.example` — optional CLI configuration example

## Recommended setup in Cloudflare

### 1. Create the D1 database
In Cloudflare Dashboard, create a D1 database named `jfta-applications`.
Open the D1 console and run all SQL in `schema.sql`.

### 2. Deploy the Pages project
Because this project contains `/functions`, deploy using **Git integration** or **Wrangler**. Dashboard Direct Upload does not deploy Pages Functions.

#### Option A — Git integration
1. Put this project in a GitHub/GitLab repository.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: leave blank.
4. Build output directory: `public`.
5. Deploy.

#### Option B — Wrangler CLI
Install Wrangler, authenticate, then deploy the project. Use the example config after replacing the D1 database ID.

### 3. Add the D1 binding
In the Pages project:
Settings → Bindings → Add → D1 database.
- Variable name: `DB`
- D1 database: `jfta-applications`
Redeploy after adding the binding.

### 4. Add the CSV export secret
Pages project → Settings → Variables and Secrets.
Create a secret/environment variable:
- Name: `EXPORT_KEY`
- Value: choose a private strong key, e.g. a long random phrase.
Redeploy after adding it.

Then download registrations as CSV from:
`https://futuretech.andaitech.my/api/export?key=YOUR_EXPORT_KEY`

Do not share that URL/key publicly.

### 5. Connect the custom domain
Pages project → Custom domains → Set up a domain → enter:
`futuretech.andaitech.my`

If `andaitech.my` DNS is already managed by the same Cloudflare account, Cloudflare can create the DNS record automatically after confirmation.

### 6. Test before students arrive
Submit one test application at `futuretech.andaitech.my`.
Confirm the row appears in D1, then test the CSV export URL.

## Data fields stored
Candidate ID, timestamp, name, gender, school, computer access, guardian phone, prior Word/Excel/AI/coding exposure, three reflection answers, and consent.

## Privacy note
The app records only a coarse IP hint (first two IPv4 octets) for basic troubleshooting, not the full IP address. Remove the `ip_hash_hint` logic if you do not want this stored at all.
