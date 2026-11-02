# ask-lu

Public knowledge base for the "Ask Lu" chat on lujindesign.com.

Everything in this folder can be read by any website visitor through the chat.
Only put things here you are happy to see quoted publicly.

## Structure

- `system-prompt.md` — rules for the assistant (load as the system prompt)
- `about.md` — who Lu is, positioning
- `experience.md` — career overview (paste the CV here)
- `cases/` — one file per case study
- `playground.md` — personal / AI side projects
- `how-i-work.md` — process and collaboration
- `availability.md` — what roles Lu is open to
- `contact.md` — how to reach Lu

## Rules for editing

1. One topic per file. Short sections, plain facts.
2. Only numbers and claims you can back up in an interview.
3. Lines starting with `TODO(Lu):` are treated as unknown by the assistant. Replace them with real content or delete them.
4. Never put here: applications to specific companies, reasons for leaving a job, reference letters, salary, family details.
5. Wrap drafts in `<!-- -->` to keep them out of the chat.
6. When a visitor asks something the chat can't answer well, add the answer to the right file.

Files are bundled into the chat at build time by `scripts/build-ask-lu.mjs`. Push to GitHub → Vercel redeploys → the chat knows the new content.
