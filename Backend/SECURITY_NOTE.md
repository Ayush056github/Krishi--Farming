Security note — secrets removed from repo

I removed the real GEMINI API key from `Backend/.env` and replaced it with placeholders. Important follow-ups you must do locally:

1) Rotate exposed keys immediately
   - If the key in the repo was real, please rotate it in the provider console (Google Cloud / Gemini).

2) Keep secrets out of the repo
   - Add real keys to a local `.env` file that is ignored by git (already covered by `.gitignore`).
   - Example `Backend/.env` should look like `OPENAI_API_KEY=sk-...` etc.

3) Remove secret(s) from git history (optional but recommended)
   - If you need to purge the secret from the repository history, use one of the following approaches. Be careful: rewriting history affects collaborators.

   A) Use BFG Repo-Cleaner (recommended, easier):
      - Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
      - Example commands (PowerShell):

```powershell
# clone a fresh mirror
git clone --mirror https://github.com/<owner>/<repo>.git
cd <repo>.git
# replace the secret value
java -jar ..\bfg.jar --replace-text replacements.txt
# where replacements.txt contains the secret value(s) to remove
# then run
git reflog expire --expire=now --all
git gc --prune=now --aggressive
# push cleaned repo
git push --force
```

   B) Use git filter-repo (powerful):
      - Install: https://github.com/newren/git-filter-repo
      - Example:

```powershell
git clone --mirror https://github.com/<owner>/<repo>.git
cd <repo>.git
git filter-repo --replace-text replacements.txt
# push back
git push --force
```

   C) If you prefer not to rewrite history now, at minimum rotate the keys and mark this as done.

4) Verify local .gitignore
   - `Backend/.gitignore` already contains `.env`.
   - Root `.gitignore` also ignores `.env`.

If you want, I can:
- Add a commit message template and a pre-commit hook to prevent .env from being added in future.
- Prepare a `replacements.txt` with the exact secret strings (but I won't include secrets in the repo). 

Tell me if you want me to: 1) add a pre-commit hook to block accidental .env commits, or 2) prepare the BFG/git-filter-repo steps with the exact secret strings (you'll paste the real values), or 3) do nothing else.