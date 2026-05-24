# Personal Portfolio Website

**Dasari Sridevi** · B.Tech Computer Science · Aspiring Full-Stack Developer

---

## Live demo

| | URL |
|---|-----|
| **Live site** | [https://24a31a05bp.github.io/Portfolio/](https://24a31a05bp.github.io/Portfolio/) |
| **GitHub repo** | `https://github.com/24A31A05BP/Portfolio` |

> Update `config.js`, `robots.txt`, `sitemap.xml`, and meta tags with your real URLs before going live.

---

## About this project

A professional portfolio website showcasing my skills, projects, education, and contact information — built for recruiters and hiring managers.

**Features:**

- Professional homepage & introduction  
- Projects section with filters and detail modals  
- Interactive About & Resume sections  
- Contact form with email notifications  
- SEO-friendly semantic HTML & structured data  
- Responsive layout (mobile & desktop)  
- Dark / light mode toggle  

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 (semantic, accessible) |
| Styling | CSS3, Bootstrap 5.3, custom variables & animations |
| Interactions | Vanilla ES6 JavaScript |
| Icons | Bootstrap Icons |
| Fonts | Google Fonts — Outfit, Fira Code |
| Contact API | [Web3Forms](https://web3forms.com) (free email notifications) |
| Deployment | GitHub Pages (recommended) |

---

## Project structure

```
Portfolio/
├── index.html
├── style.css
├── script.js
├── config.js
├── robots.txt
├── sitemap.xml
├── assets/
└── README.md
```

---

## Setup (local)

1. **Clone the repository**
   ```bash
   git clone https://github.com/24A31A05BP/Portfolio.git
   cd Portfolio
   ```

2. **Configure** `config.js`:
   - `liveSiteUrl` — your deployed URL  
   - `githubRepo` — this repository URL  
   - `web3formsAccessKey` — from [web3forms.com](https://web3forms.com)

3. **Run locally**
   ```bash
   python -m http.server 8080
   ```
   Visit `http://localhost:8080`

---

## Contact form setup

1. Go to [https://web3forms.com](https://web3forms.com)  
2. Enter **dasarisridevi481@gmail.com** and get your **Access Key**  
3. Paste it in `config.js`:
   ```js
   web3formsAccessKey: "your-actual-key-here",
   contactMethod: "web3forms",
   ```

---

## Deployment (GitHub Pages)

```bash
git init
git add .
git commit -m "Add personal portfolio website"
git branch -M main
git remote add origin https://github.com/24A31A05BP/Portfolio.git
git push -u origin main
```

GitHub → **Settings → Pages** → deploy from `main` branch.

Update `config.js`, `index.html` (canonical/og:url), `robots.txt`, and `sitemap.xml` with your live URL.

---

## Resume PDF

Open `assets/Resume_CSE_Student.html` → **Print → Save as PDF**

---

## Author

**Dasari Sridevi**  
📧 dasarisridevi481@gmail.com · 📱 8121592499  
[GitHub](https://github.com/24A31A05BP) · [LinkedIn](https://www.linkedin.com/in/sridevi-dasari-41205232b) · [LeetCode](https://leetcode.com/u/Dasari_Sridevi/)
