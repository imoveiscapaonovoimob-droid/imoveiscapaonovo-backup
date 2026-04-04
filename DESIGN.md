# Design System Strategy: High-End Editorial Real Estate

## 1. Overview & Creative North Star
**Creative North Star: The Architectural Curator**
This design system is built to evoke the same sense of permanence, weight, and exclusivity as a luxury architectural portfolio. Moving away from the generic "grid-and-box" real estate site, we embrace an editorial approach that treats every property as a masterpiece. 

We break the "template" look through **intentional asymmetry**—allowing large-scale typography to overlap imagery and utilizing "white space" as a functional design element rather than just a gap. The aesthetic is defined by the tension between the cold, structural feel of raw concrete and the warmth of metallic gold accents, anchored by an authoritative Navy depth.

## 2. Colors
The palette is a dialogue between deep maritime tones and industrial textures.

*   **Primary (#001629) & Primary Container (#002B49):** Use these for deep immersion. Hero sections should utilize the darker primary to establish immediate authority.
*   **Secondary (#775a19) & Secondary Fixed (#ffdea5):** These represent the metallic gold. They are used sparingly for "high-value" interaction points like primary CTAs or exclusivity badges.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To define layout boundaries, transition the background color (e.g., moving from `surface` to `surface-container-low`) or introduce a subtle concrete texture shift.
*   **Surface Hierarchy & Nesting:** Depth is created through stacking. A property card (`surface-container-lowest`) should sit atop a subtle concrete-textured section (`surface-container-low`). This "nested" depth creates an organic, physical feel.
*   **The "Glass & Gradient" Rule:** Use Glassmorphism for floating navigation bars and property detail overlays. Utilize `surface` at 70% opacity with a `20px` backdrop blur.
*   **Signature Textures:** Apply a subtle noise or concrete grain overlay (opacity 3-5%) on `surface-variant` backgrounds to mimic the logo’s presentation in Image 1.

## 3. Typography
The typography scale creates a high-contrast, editorial rhythm.

*   **Display & Headlines (Noto Serif):** These are your "Statement" fonts. They should be used with generous leading. Headlines in `display-lg` should often be center-aligned or intentionally offset to create an editorial layout.
*   **Title & Body (Manrope):** A clean, architectural sans-serif that provides a "technical" counterpoint to the serif headings. 
*   **Hierarchy as Identity:** The jump between `display-lg` (3.5rem) and `body-lg` (1rem) is intentional. It forces a clear hierarchy where the property name or brand message feels like a title on a magazine cover, while the details feel like precise, curated data.

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Use the `surface-container` tiers (Lowest to Highest) to separate content. For example, a "Schedule a Tour" modal should be the `surface-container-highest` to feel closest to the user.
*   **Ambient Shadows:** If a shadow is required for a floating action button, use a highly diffused blur (20-40px) at 6% opacity using a tint of `primary`. This simulates natural light hitting a matte surface rather than a digital "glow."
*   **The "Ghost Border" Fallback:** For input fields or secondary buttons, use `outline-variant` at 15% opacity. It should be felt more than seen.
*   **Glassmorphism:** Navigation menus should always feel like "Frosted Glass" over high-resolution property photography, maintaining a visual connection to the imagery even when menus are open.

## 5. Components

### Buttons
*   **Primary:** Solid `secondary` (Gold) with `on-secondary` (White) text. Use `DEFAULT` roundedness (0.25rem) to maintain a sharp, architectural edge.
*   **Secondary:** `outline-variant` (Ghost Border) with `primary` text.
*   **Hover State:** Transition to a subtle gold gradient—moving from `secondary` to `secondary_fixed_dim`.

### Cards & Lists
*   **Prohibition of Dividers:** Do not use lines to separate listings. Use vertical spacing (Scale `12` or `16`) or alternating background tones (`surface` vs `surface-container-low`).
*   **Property Cards:** Use a "Bleed" layout where the image occupies 100% of the card width, with typography overlaid on a glassmorphic footer at the bottom of the image.

### Inputs
*   **Styling:** Minimalist. Only a bottom border using `outline-variant` at 30% opacity. Upon focus, the border transitions to `secondary` (Gold).

### Signature Component: The "Exclusivity Badge"
*   A small, floating chip using `tertiary` (Dark Charcoal) with a `secondary` (Gold) serif label. Used for "Penthouse" or "Sold" status.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text blocks and images slightly overlap (referencing the editorial feel of `guilhermepilger.com`).
*   **Do** prioritize high-resolution, professional architectural photography as a core "material" of the UI.
*   **Do** use the Spacing Scale `20` and `24` for section padding to allow the design to breathe.

### Don't
*   **Don't** use 100% black. Use `primary` (#001629) for deep blacks to keep the luxury Navy undertone consistent.
*   **Don't** use standard "Material" rounded corners (e.g., 24px). Stick to the sharp, sophisticated `0.25rem` or `none` for a more "built" look.
*   **Don't** crowd the layout. If you feel you need a divider line, you actually need more whitespace (`Spacing 16`).