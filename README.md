Application is still in development 

TO DO
- [ ] Login page for admin which is available only under '/admin' url (no other buttons)
- [ ] Whole backend and improved frontend for Admin side to manage players and staff in club:
  - for players:
      - adding
        - [ ] frontend
        - [x] backend 
      - editing
        - [ ] frontend
        - [x] backend 
      - deleting
        - [ ] frontend
        - [x] backend
  - for staff:
      - adding
        - [x] frontend
        - [x] backend 
      - editing
        - [x] frontend
        - [x] backend 
      - deleting
        - [x] frontend
        - [x] backend
- [ ] display details about player ( vizualization by graphs and diagrams )
- [x] change layout 'about us'
- [x] connect club stats with database instead of hardcode way
- [x] side for admin create new tournaments
- [x] side for admin create new matches (single or in tournament)
- [x] side to manage the tournament (each tournament will have the DB with player stats from this tournaments)
- [x] side to manage the matches (adding new events, by this modify player stats) (after the end of the game, 'finish match' button should aplied all stats to players)
- [ ] display the details about each match or each tournament (top scorrers, winner, ect.)



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
