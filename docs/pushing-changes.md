# How to push changes to GitHub

Use these steps to push your local changes to a GitHub repository:

1. **Check status** to see what has changed:
   ```bash
   git status
   ```
2. **Stage files** you want to push (replace paths as needed):
   ```bash
   git add <path/to/file>
   ```
3. **Commit with a clear message** describing the change:
   ```bash
   git commit -m "Your descriptive commit message"
   ```
4. **Verify your remote** is pointed at GitHub. You can list remotes with:
   ```bash
   git remote -v
   ```
   If you need to add or update the origin remote:
   ```bash
   git remote add origin https://github.com/<owner>/<repo>.git
   ```
5. **Push the branch** to GitHub. Replace `branch-name` with your branch:
   ```bash
   git push origin branch-name
   ```
6. **Open a pull request** on GitHub after pushing to share your changes and request review.

If the repository uses authentication (personal access token or SSH), be sure your credentials are configured before running `git push`.
