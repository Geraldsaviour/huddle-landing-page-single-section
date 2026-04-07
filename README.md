# Huddle Landing Page — Single Introductory Section

A pixel-faithful recreation of the [Frontend Mentor Huddle landing page challenge](https://www.frontendmentor.io/challenges/huddle-landing-page-with-a-single-introductory-section-B_2Wvxgi0), built with plain HTML and CSS — no frameworks, no build tools.

![Desktop preview](./design/desktop-preview.jpg)

---

## Project Structure

```
/
├── design/                   # Reference design images (not shipped to users)
│   ├── active-states.jpg     # Shows hover/focus states for interactive elements
│   ├── desktop-design.jpg    # Full desktop layout reference
│   ├── desktop-preview.jpg   # Thumbnail preview
│   └── mobile-design.jpg     # Mobile layout reference
├── images/                   # All production assets
│   ├── bg-desktop.svg        # Background pattern for desktop
│   ├── bg-mobile.svg         # Background pattern for mobile
│   ├── favicon-32x32.png     # Browser tab icon
│   ├── illustration-mockups.svg  # Hero illustration
│   └── logo.svg              # Huddle brand logo
├── .gitignore                # Prevents accidental upload of design/sketch files
├── index.html                # Single page markup
├── style.css                 # All styles
├── style-guide.md            # Original design tokens (colors, fonts, breakpoints)
└── README.md                 # This file
```

---

## index.html — Section by Section

### `<head>` — Document Metadata

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

**Why:** The style guide specifies two typefaces — Poppins (headings, weights 400 and 600) and Open Sans (body, weight 400). Both are loaded from Google Fonts. `preconnect` hints tell the browser to open the DNS/TCP connection early, reducing font load latency.

Font Awesome is loaded via CDN for the social icons. The style guide explicitly recommends a font icon library (Font Awesome, IcoMoon, or Ionicons). Font Awesome was chosen because it has the widest icon coverage and the most familiar class syntax (`fab fa-facebook-f`, etc.).

---

### `.page-wrapper` — Full-Page Container

```html
<div class="page-wrapper">
```

**Why:** A single wrapper div gives us one element to attach the background image, min-height, and flex column layout to. Without it, we'd have to split those responsibilities across `body` and multiple children, making the layout harder to reason about.

---

### `<header>` — Logo

```html
<header class="header">
  <img src="./images/logo.svg" alt="Huddle logo" class="logo">
</header>
```

**Why:** The design places the Huddle logo in the top-left corner. Using `<header>` is semantically correct — it marks the introductory/navigational content of the page. The `alt` attribute is set to a meaningful description for screen readers. SVG format is used because it scales perfectly at any resolution without quality loss.

---

### `<main>` — Two-Column Hero Section

```html
<main class="main">
  <div class="illustration"> ... </div>
  <div class="content"> ... </div>
</main>
```

**Why:** `<main>` is the semantic landmark for the primary content of the page. The two children — illustration and content — are laid out side-by-side on desktop using Flexbox. This mirrors the design exactly: mockup image on the left, text and CTA on the right.

#### Illustration

```html
<img src="./images/illustration-mockups.svg" alt="App mockup illustration">
```

**Why:** The SVG mockup is the visual anchor of the page. It's wrapped in its own `div` so we can control its flex sizing independently (`flex: 1.2`) to give it slightly more space than the text column, matching the design proportions.

#### Heading

```html
<h1>Build The Community Your Fans Will Love</h1>
```

**Why:** There is only one primary heading on this page, so `<h1>` is correct. It uses Poppins 600 (bold) as specified in the style guide for headings.

#### Body Copy

```html
<p>Huddle re-imagines the way we build communities...</p>
```

**Why:** Plain paragraph element. Uses Open Sans 400 as specified for body text. `max-width: 480px` is applied in CSS to prevent the line length from becoming too wide on large screens, keeping it readable.

#### Register Button

```html
<a href="#" class="btn-register">Register</a>
```

**Why:** An `<a>` tag is used rather than `<button>` because this is a navigation/call-to-action link, not a form submission. The pill shape (border-radius: 50px), white background, and violet text match the design. On hover it transitions to soft magenta background with white text — exactly as shown in `active-states.jpg`.

---

### `<footer>` — Social Icons + Attribution

```html
<footer class="footer">
  <div class="social-links">
    <a href="#" class="social-link" aria-label="Facebook">
      <i class="fab fa-facebook-f"></i>
    </a>
    ...
  </div>
</footer>
```

**Why:** `<footer>` is the semantic element for page-level footer content. The social links are grouped in their own `div` for independent layout control.

Each icon link uses `aria-label` to describe its purpose to screen readers, since the icon itself carries no text. The circular border style (1px solid white, border-radius 50%) matches the design. On hover, both the border and icon color transition to soft magenta, matching `active-states.jpg`.

---

## style.css — Section by Section

### CSS Custom Properties (Variables)

```css
:root {
  --violet: hsl(257, 40%, 49%);
  --soft-magenta: hsl(300, 69%, 71%);
  --white: hsl(0, 0%, 100%);
}
```

**Why:** The style guide defines two primary colors. Storing them as CSS custom properties means they're defined once and referenced everywhere. If a color needs to change, it changes in one place. HSL values are used verbatim from the style guide for accuracy.

---

### Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**Why:** `box-sizing: border-box` makes padding and borders included in an element's declared width/height, which prevents unexpected overflow. Zeroing margin and padding removes browser default spacing that would otherwise cause inconsistencies across browsers.

---

### Background & Page Layout

```css
.page-wrapper {
  background-image: url('./images/bg-desktop.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 3rem 5rem 2rem;
}
```

**Why:** The background SVG pattern is applied here rather than on `body` so it stays contained within the wrapper. `background-size: cover` ensures it fills the entire viewport regardless of screen size. Flexbox column layout stacks header → main → footer vertically, with `flex: 1` on `<main>` pushing the footer to the bottom.

---

### Two-Column Hero Layout

```css
.main {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  flex: 1;
}

.illustration { flex: 1.2; }
.content      { flex: 1; }
```

**Why:** Flexbox row layout places the illustration and content side by side. `align-items: center` vertically centers both columns relative to each other. The `flex: 1.2` vs `flex: 1` ratio gives the illustration slightly more horizontal space, matching the visual weight in the design. `gap` provides consistent spacing between the two columns without needing margin hacks.

---

### Register Button Hover State

```css
.btn-register:hover,
.btn-register:focus {
  background-color: var(--soft-magenta);
  color: var(--white);
}
```

**Why:** The `active-states.jpg` design reference shows the button turning soft magenta on hover. `:focus` is included alongside `:hover` so keyboard users get the same visual feedback — this is a basic accessibility requirement. `transition: background-color 0.3s ease` makes the change smooth rather than jarring.

---

### Social Icon Hover State

```css
.social-link:hover,
.social-link:focus {
  border-color: var(--soft-magenta);
  color: var(--soft-magenta);
}
```

**Why:** Matches the `active-states.jpg` reference where both the circle border and the icon itself turn soft magenta on hover. Again, `:focus` is included for keyboard accessibility.

---

### Mobile Responsive Layout

```css
@media (max-width: 768px) {
  .page-wrapper {
    background-image: url('./images/bg-mobile.svg');
    background-size: contain;
    background-position: top center;
  }

  .main {
    flex-direction: column;
    text-align: center;
  }

  .content {
    align-items: center;
  }
}
```

**Why:** The style guide specifies a mobile breakpoint at 375px. The media query triggers at 768px to cover all tablet and phone sizes. On mobile:
- The background switches to `bg-mobile.svg` (a different pattern designed for portrait orientation) and uses `contain` so it doesn't distort
- The two-column flex row becomes a single column (`flex-direction: column`)
- Text and button center-align to match the `mobile-design.jpg` reference
- The button uses `align-self: center` to stay centered within the flex column

---

## Design Decisions & Trade-offs

| Decision | Chosen Approach | Why |
|---|---|---|
| Icon library | Font Awesome via CDN | Fastest setup, no npm required, covers all three icons needed |
| Fonts | Google Fonts CDN | No local font files needed, matches style guide exactly |
| Layout | Flexbox only | The design is a single-row layout — CSS Grid would be overkill |
| Breakpoint | 768px | Covers all common phone/tablet sizes; style guide only defines 375px min |
| Button element | `<a>` not `<button>` | It's a navigation link, not a form action |
| No JavaScript | Pure HTML/CSS | The design has zero interactive behavior beyond CSS hover states |

---

## How to Run

No build step required. Open `index.html` directly in any browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 3000

# Using Node (npx)
npx serve .
```

---

## Credits

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Fonts: [Google Fonts](https://fonts.google.com)
- Icons: [Font Awesome](https://fontawesome.com)
