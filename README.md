# 🚀 ADmyBRAND AI Suite - AI-Powered Marketing Automation

ADmyBRAND AI Suite is a beautifully designed front-end prototype for an AI-powered digital marketing platform. It includes interactive features like pricing toggles, testimonials carousel, smooth scrolling, mobile navigation, modal overlays, and FAQ accordions — all wrapped in a modern, glassmorphism-inspired design.

---

## 🧰 Tech Stack

* **HTML5**
* **CSS3** (with custom CSS variables and responsive layout)
* **Vanilla JavaScript** (DOM manipulation, IntersectionObserver, and event handling)
* **Glassmorphism** UI
* **Dark Mode** support (via `prefers-color-scheme` and custom data attributes)

---

## 📁 Project Structure

```
project-root/
│
├── index.html         # Main entry point
├── style.css          # Styling with CSS variables, themes, components
├── app.js             # JavaScript for all interactive behavior
└── assets/            # (Optional) Add images/icons/fonts here
```

---

## 💡 Features

### ✅ Homepage Sections

* **Hero Section** with CTA, animated text and chart preview
* **Features Grid** showcasing core AI capabilities
* **Pricing Plans** with toggle switch (Monthly / Annual)
* **Testimonials Carousel** with autoplay and touch support
* **FAQ Accordion** for common queries
* **Responsive Navbar** with sticky behavior and mobile toggle
* **Modal Trigger** for viewing components
* **Smooth Scrolling** across sections
* **Custom Notifications** for feedback

### 🎨 Design Highlights

* **Glassmorphism Cards** (frosted glass look)
* **Dark Mode Friendly**
* **Fully Responsive** for all devices
* **CSS Tokens** (color, spacing, font-size, etc.)
* **Animations on Scroll** via IntersectionObserver

---

## 🚀 Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/admybrand-ai-suite.git
cd admybrand-ai-suite
```

### 2. Open in Browser

Just open the `index.html` file in your favorite browser:

```bash
open index.html
# or double-click the file
```

> ⚠️ No build steps or dependencies required. Everything is vanilla HTML/CSS/JS.

---

## 🔧 Key JavaScript Modules (in `app.js`)

| Module                       | Purpose                                          |
| ---------------------------- | ------------------------------------------------ |
| `initScrollAnimations()`     | Animates cards on scroll                         |
| `initPricingToggle()`        | Switches pricing between monthly/annual          |
| `initTestimonialsCarousel()` | Auto-playing customer testimonials               |
| `initFAQAccordion()`         | Expand/collapse FAQ answers                      |
| `initMobileMenu()`           | Toggle mobile nav visibility                     |
| `initSmoothScrolling()`      | Smooth scroll to anchor links                    |
| `initFormHandling()`         | Basic email validation and feedback              |
| `initModal()`                | Modal popup with escape-close and backdrop click |
| `initNavbarScroll()`         | Navbar shrink and hide on scroll                 |

---

## ✨ Customization Tips

* 🖼 Replace `🚀` and brand names with your own logos/text.
* 🎨 Update CSS tokens in `:root` for global theming.
* 🔌 Integrate backend logic (email, auth, analytics) as needed.
* 🌓 Toggle dark/light mode using:

  ```html
  <html data-color-scheme="dark"> or "light"
  ```

---

## 📷 Screenshots

<img width="1852" height="854" alt="Screenshot 2025-07-29 151611" src="https://github.com/user-attachments/assets/85476a2b-76db-40ea-bf08-0b3cee15b1d2" />
<img width="1841" height="860" alt="Screenshot 2025-07-29 151816" src="https://github.com/user-attachments/assets/c290f899-3c0e-4d25-8c8c-550d53683f76" />
<img width="1831" height="851" alt="Screenshot 2025-07-29 152015" src="https://github.com/user-attachments/assets/b3377c6d-9fc9-4c0a-a1b5-d305c2620d9e" />
<img width="1845" height="656" alt="Screenshot 2025-07-29 151937" src="https://github.com/user-attachments/assets/6875ade2-2d02-4412-9891-7f8fd00b9810" />
<img width="1849" height="860" alt="Screenshot 2025-07-29 151912" src="https://github.com/user-attachments/assets/2ee9dc3a-5824-491c-a092-11a80fe2ca7b" />



---

## 📦 Future Enhancements

* Backend integrations (e.g. contact forms, pricing logic)
* Accessibility improvements (ARIA roles, focus traps)
* i18n support (multi-language)
* Component refactor using frameworks (e.g. React or Next.js)

---

## 📝 License

This project is for demo/portfolio use only. For commercial use, replace branding and assets as needed.


