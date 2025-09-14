# Project Style Generator

## Purpose
Generate a style guide for a local business website. You will generally be given a brief description about the businesses and often examples of styles the businesses likes. You need to create a comprehensive style guide and a brand page that shows the style guide in action.

Sometimes the user will provide another website or template they like. We should pay very close anttention to these templates and try implement pixel perfect replicas of the design. If the user prodivdes these you will find them under /docs/templates.md

## Example
Here is an example of a style guide for a local business physiotherapist website:

# Dr. Kamilah Jordaan Chiropractic - Brand Style Guide

## Brand Identity

### Logo Design
The logo features a minimalist line illustration of a human figure with visible spine alignment points, representing the chiropractic focus on spinal health and body alignment. The design is clean, professional, and medical in nature.

### Logo Elements
- **Icon**: Simplified human silhouette with spine/alignment indicators
- **Typography**: Combination of script and sans-serif fonts
- **Layout**: Centered, hierarchical text arrangement

## Color Palette

### Primary Colors

#### Sage Green (Primary Brand Color)
```css
--sage-primary: #8FB584;      /* Main sage green from logo */
--sage-light: #A4C79A;        /* Lighter variation */
--sage-dark: #7A9F6F;         /* Darker variation */
--sage-soft: #B8D4B0;         /* Soft/muted version */
```

#### Neutral Palette
```css
--charcoal: #3A3A3A;          /* Dark gray for text */
--warm-gray: #6B6B6B;         /* Secondary text */
--light-gray: #E8E8E8;        /* Borders, dividers */
--off-white: #FAFAF8;         /* Background alternative */
--pure-white: #FFFFFF;        /* Primary background */
```

#### Accent Colors
```css
--sage-accent: #6B8E5C;       /* Deeper sage for CTAs */
--mint-fresh: #C8E6C9;        /* Light mint for highlights */
--stone-gray: #8C8C8C;        /* Mid-tone gray for icons */
```

### Color Usage Guidelines

#### Primary Applications
- **Sage Green**: Headers, primary buttons, brand elements, icons
- **Charcoal**: Body text, headings
- **White**: Primary backgrounds, card backgrounds
- **Off-white**: Section backgrounds, alternating sections

#### Semantic Colors
```css
--success: #7CB342;           /* Appointment confirmed */
--info: #8FB584;             /* Information, tips */
--warning: #FFB74D;          /* Schedule changes */
--error: #E57373;            /* Form errors */
```

## Typography

### Font Families

#### Primary Fonts
1. **Display/Script Font**: For "Dr Kamilah Jordaan" signature
   - Font: 'Allura', 'Dancing Script', or similar elegant script
   - Usage: Logo, hero headings, special emphasis
   - Weight: 400 (Regular)

2. **Heading Font**: Clean sans-serif
   - Font: 'Montserrat', 'Lato', or 'Open Sans'
   - Weights: 300 (Light), 400 (Regular), 600 (Semi-Bold), 700 (Bold)
   - Usage: All headings, navigation, buttons

3. **Body Font**: Readable sans-serif
   - Font: 'Inter', 'Source Sans Pro', or system sans-serif
   - Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold)
   - Usage: Body text, descriptions, form labels

### Typography Scale

```css
/* Headings */
--h1: 2.5rem;      /* 40px - Page titles */
--h2: 2rem;        /* 32px - Section headings */
--h3: 1.5rem;      /* 24px - Sub-sections */
--h4: 1.25rem;     /* 20px - Card headings */
--h5: 1.125rem;    /* 18px - Small headings */

/* Body Text */
--body-large: 1.125rem;   /* 18px - Lead text */
--body-regular: 1rem;     /* 16px - Standard text */
--body-small: 0.875rem;   /* 14px - Secondary text */
--caption: 0.75rem;       /* 12px - Captions, labels */
```

### Text Styling

#### Heading Styles
```css
h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  color: var(--charcoal);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.script-heading {
  font-family: 'Allura', cursive;
  font-weight: 400;
  color: var(--sage-primary);
}
```

#### Body Text Styles
```css
body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--charcoal);
  line-height: 1.6;
  letter-spacing: 0;
}

.lead-text {
  font-size: var(--body-large);
  font-weight: 300;
  line-height: 1.7;
  color: var(--warm-gray);
}
```

## Visual Style Elements

### Spacing System
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

### Border Radius
```css
--radius-sm: 4px;      /* Small elements */
--radius-md: 8px;      /* Cards, buttons */
--radius-lg: 12px;     /* Large cards */
--radius-xl: 16px;     /* Hero sections */
--radius-full: 9999px; /* Pills, badges */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## Component Styles

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--sage-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--sage-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--sage-primary);
  border: 2px solid var(--sage-primary);
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-weight: 600;
}
```

#### Book Now Button (CTA)
```css
.btn-book {
  background: linear-gradient(135deg, var(--sage-primary), var(--sage-accent));
  color: white;
  padding: 14px 32px;
  border-radius: var(--radius-full);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: var(--shadow-lg);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--light-gray);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

### Forms
```css
.form-input {
  border: 1px solid var(--light-gray);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: var(--body-regular);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--sage-primary);
  box-shadow: 0 0 0 3px rgba(143, 181, 132, 0.1);
}
```

## Iconography

### Icon Style
- **Style**: Outline/line icons to match logo aesthetic
- **Weight**: 2px stroke width
- **Color**: Sage green for primary, charcoal for secondary
- **Size**: 24px standard, 20px small, 32px large

### Common Icons
- Spine/posture alignment
- Calendar/booking
- Clock/hours
- Location/map pin
- Phone/contact
- Medical/health cross
- Check marks/benefits
- Arrow/navigation

## Imagery Guidelines

### Photography Style
- **Tone**: Professional, warm, welcoming
- **Subjects**: Real people, authentic moments
- **Color Treatment**: Natural, slightly warm tones
- **Avoid**: Stock photos that look overly staged

### Image Overlays
```css
.image-overlay {
  background: linear-gradient(
    180deg,
    rgba(143, 181, 132, 0.8) 0%,
    rgba(143, 181, 132, 0.4) 100%
  );
}
```

## Animation & Interactions

### Transitions
```css
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Hover Effects
- Buttons: Slight lift with shadow
- Cards: Gentle rise with enhanced shadow
- Links: Color transition to sage green
- Images: Subtle zoom (scale 1.05)

### Loading States
- Use sage green as primary color
- Pulsing animation for skeleton screens
- Smooth fade-ins for content appearance

## Layout Principles

### Grid System
- 12-column grid on desktop
- 6-column grid on tablet
- Single column on mobile
- Maximum content width: 1200px
- Consistent gutters: 24px

### Section Spacing
- Section padding: 64px vertical (desktop), 40px (mobile)
- Content spacing: Follow 8px baseline grid
- Maintain visual breathing room

## Accessibility

### Color Contrast
- Ensure WCAG AA compliance minimum
- Text on sage green background: Use white
- Text on white background: Use charcoal
- Minimum contrast ratio: 4.5:1 for normal text

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--sage-primary);
  outline-offset: 2px;
}
```

## Application Examples

### Hero Section
- Large script font for doctor's name
- Sage green accent elements
- White/off-white background
- Prominent booking CTA in sage green

### Service Cards
- White cards with subtle shadows
- Sage green icons
- Charcoal headings
- Warm gray descriptions

### Navigation
- White background with subtle shadow
- Sage green hover states
- Charcoal text
- Mobile-responsive hamburger menu

## Brand Voice Integration

The visual style should complement the brand voice:
- **Professional**: Clean layouts, ample whitespace
- **Approachable**: Soft colors, rounded corners
- **Trustworthy**: Consistent styling, clear hierarchy
- **Health-focused**: Natural green tones, calming aesthetics

## Implementation Notes

### CSS Variables Setup
```css
:root {
  /* Colors */
  --sage-primary: #8FB584;
  --sage-light: #A4C79A;
  --sage-dark: #7A9F6F;
  --charcoal: #3A3A3A;
  --warm-gray: #6B6B6B;

  /* Typography */
  --font-display: 'Allura', cursive;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --space-unit: 8px;
}
```

### Mobile-First Approach
- Design for mobile screens first
- Progressive enhancement for larger screens
- Touch-friendly tap targets (minimum 44px)
- Responsive typography scaling

# Brand Page Example
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { domToPng } from "modern-screenshot";
import {
  Palette,
  Type,
  Copy,
  Download,
  Layers,
  Sparkles,
  Activity,
  Calendar,
  Heart,
  Stethoscope,
  User,
  MapPin,
  Phone,
  Brain,
  Smile,
  FileText,
  Check
} from "lucide-react";
// import { cn } from "@/lib/utils";

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const primaryLogoRef = useRef<HTMLDivElement>(null);
  const iconOnlyRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleLogoDownload = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    try {
      const dataUrl = await domToPng(ref.current, {
        quality: 1,
        scale: 2, // Export at 2x resolution for better quality
        backgroundColor: 'transparent'
      });

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export logo:", error);
    }
  };

  const brandMarkdown = `# Dr. Kamilah Jordaan Brand Guidelines

## Brand Identity
**Business Name:** Dr. Kamilah Jordaan Sports and Family Chiropractic
**Location:** Morningside, Sandton, South Africa
**Mission:** Helping people achieve a pain-free life through non-invasive healthcare

## Logo
- **Primary Logo:** Icon + "Dr. Kamilah Jordaan" + "Sports and Family Chiropractic" tagline
- **Icon:** /icon.png - Spine/wellness symbol
- **Usage:** Always maintain proportions, use on white or light backgrounds

## Color Palette

### Primary Colors
- **Sage Primary:** #8FB584
- **Sage Light:** #A4C79A
- **Sage Dark:** #7A9F6F
- **Sage Soft:** #B8D4B0

### Accent Colors
- **Sage Accent:** #6B8E5C
- **Mint Fresh:** #C8E6C9
- **Stone Gray:** #8C8C8C

### Neutral Colors
- **Charcoal:** #3A3A3A (primary text)
- **Warm Gray:** #6B6B6B (secondary text)
- **Light Gray:** #E8E8E8
- **Off White:** #FAFAF8
- **Pure White:** #FFFFFF

### Semantic Colors
- **Success:** #7CB342
- **Info:** #8FB584
- **Warning:** #FFB74D
- **Error:** #E57373

## Typography

### Fonts
- **Signature Font:** Brittany Signature (for brand name, headings)
- **Heading Font:** Montserrat (weights: 300, 400, 600, 700)
- **Body Font:** Inter (weights: 400, 500, 600)

### Usage
- **Brand Name:** font-signature, text-3xl, font-semibold
- **Tagline:** font-heading, uppercase, tracking-wide
- **Body Text:** font-sans, text-base
- **Headings:** font-heading with appropriate weights

## UI Components

### Buttons
- **Primary:** bg-sage-primary, white text, rounded-lg, hover:bg-sage-dark
- **Secondary:** border-sage-primary, sage text, hover:bg-sage-soft/20
- **Text:** text-sage-primary, hover:bg-sage-soft/10

### Icons
- **Style:** Rounded corners (rounded-xl), sage-accent background
- **Effects:** Shadow with color tint, scale on hover, gradient overlay
- **Size:** 48x48px standard, 24x24px small

### Cards
- **Background:** White with subtle borders
- **Shadow:** shadow-sm default, shadow-lg on hover
- **Radius:** rounded-2xl for main containers

## Gradients
- **Soft Sage:** linear-gradient(145deg, #A4C79A 0%, #8FB584 100%)
- **Mint Fade:** linear-gradient(145deg, #C8E6C9 0%, #8FB584 100%)
- **Nature Blend:** linear-gradient(145deg, #B8D4B0 0%, #6B8E5C 100%)

## Contact Information
- **Phone:** 082 940 7129
- **Address:** 1 Jasmine Street, Morningside, Sandton, 2057
- **Booking:** PencilMe Online Booking System`;

  const copyMarkdownForAI = async () => {
    try {
      await navigator.clipboard.writeText(brandMarkdown);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
    }
  };

  // Brand colors from project style guide
  const brandColors = {
    primary: [
      { name: "Sage Light", value: "#A4C79A", css: "sage-light" },
      { name: "Sage Primary", value: "#8FB584", css: "sage-primary" },
      { name: "Sage Dark", value: "#7A9F6F", css: "sage-dark" },
      { name: "Sage Soft", value: "#B8D4B0", css: "sage-soft" },
    ],
    accent: [
      { name: "Sage Accent", value: "#6B8E5C", css: "sage-accent" },
      { name: "Mint Fresh", value: "#C8E6C9", css: "mint-fresh" },
      { name: "Stone Gray", value: "#8C8C8C", css: "stone-gray" },
    ],
    neutral: [
      { name: "Charcoal", value: "#3A3A3A", css: "charcoal" },
      { name: "Warm Gray", value: "#6B6B6B", css: "warm-gray" },
      { name: "Light Gray", value: "#E8E8E8", css: "light-gray" },
      { name: "Off White", value: "#FAFAF8", css: "off-white" },
      { name: "Pure White", value: "#FFFFFF", css: "white" },
    ],
    semantic: [
      { name: "Success", value: "#7CB342", css: "success" },
      { name: "Info", value: "#8FB584", css: "info" },
      { name: "Warning", value: "#FFB74D", css: "warning" },
      { name: "Error", value: "#E57373", css: "error" },
    ],
  };

  const gradients = [
    { name: "Soft Sage", css: "gradient-soft-sage", value: "linear-gradient(145deg, #A4C79A 0%, #8FB584 100%)" },
    { name: "Mint Fade", css: "gradient-mint-fade", value: "linear-gradient(145deg, #C8E6C9 0%, #8FB584 100%)" },
    { name: "Nature Blend", css: "gradient-nature", value: "linear-gradient(145deg, #B8D4B0 0%, #6B8E5C 100%)" },
  ];

  const typography = {
    signature: { name: "Brittany Signature", className: "font-signature", weight: "400, 600" },
    headings: { name: "Montserrat", className: "font-heading", weight: "300, 400, 600, 700" },
    body: { name: "Inter", className: "font-sans", weight: "400, 500, 600" },
  };

  return (
    <div className="min-h-screen bg-white relative">
        {/* Custom styles for sage colors */}
        <style jsx>{`
        .bg-sage-primary { background-color: #8FB584; }
        .bg-sage-light { background-color: #A4C79A; }
        .bg-sage-dark { background-color: #7A9F6F; }
        .bg-sage-soft { background-color: #B8D4B0; }
        .bg-sage-accent { background-color: #6B8E5C; }
        .bg-mint-fresh { background-color: #C8E6C9; }
        .bg-stone-gray { background-color: #8C8C8C; }
        .text-sage-primary { color: #8FB584; }
        .text-sage-dark { color: #7A9F6F; }
        .text-charcoal { color: #3A3A3A; }
        .text-warm-gray { color: #6B6B6B; }
        .border-sage-primary { border-color: #8FB584; }
        .border-sage-light { border-color: #A4C79A; }
        .bg-gradient-soft-sage { background: linear-gradient(145deg, #A4C79A 0%, #8FB584 100%); }
        .bg-gradient-mint-fade { background: linear-gradient(145deg, #C8E6C9 0%, #8FB584 100%); }
        .bg-gradient-nature { background: linear-gradient(145deg, #B8D4B0 0%, #6B8E5C 100%); }
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
        .font-signature { font-family: 'Brittany Signature', cursive; }
        .font-heading { font-family: 'Montserrat', sans-serif; }
      `}</style>


      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft-sage opacity-10"></div>

        {/* Copy Page for AI Button - Positioned at top of hero */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-end">
            <button
              onClick={copyMarkdownForAI}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-sage-primary/30 text-sage-dark rounded-full hover:bg-sage-soft/30 hover:border-sage-primary transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
              aria-label="Copy entire page as Markdown for AI"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Copy Page for AI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-sage-soft/20 text-sage-dark">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Brand Identity</span>
            </div>
            <h2 className="text-5xl font-signature text-sage-primary mb-4">
              Dr. Kamilah Jordaan
            </h2>
            <h3 className="text-2xl font-heading font-light tracking-wider text-charcoal mb-4">
              SPORTS AND FAMILY CHIROPRACTIC
            </h3>
            <p className="text-xl max-w-3xl mx-auto text-warm-gray">
              Dedicated to helping people achieve a pain-free life through non-invasive healthcare.
              Empowering patients to live life to their fullest potential by addressing pain at its root cause.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-semibold mb-2 text-charcoal">Logo</h3>
          <p className="text-warm-gray">Professional branding with icon and typography combination</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Primary Logo - Standard */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div ref={primaryLogoRef} className="h-64 bg-white flex items-center justify-center p-8">
              <div className="flex items-end gap-3">
                <Image
                  src="/icon.png"
                  alt="Logo Icon"
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain"
                />
                <div className="pb-1">
                  <p className="text-3xl font-signature font-semibold text-charcoal leading-tight whitespace-nowrap">
                    Dr. Kamilah Jordaan
                  </p>
                  <p className="text-xs font-heading font-semibold tracking-[0.25em] text-warm-gray uppercase whitespace-nowrap">
                    Sports and Family Chiropractic
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-charcoal mb-1">Primary Logo</h4>
                <p className="text-sm text-warm-gray">Full version with icon and tagline</p>
              </div>
              <button
                onClick={() => handleLogoDownload(primaryLogoRef as React.RefObject<HTMLDivElement>, 'dr-kamilah-jordaan-logo.png')}
                className="flex items-center gap-2 px-4 py-2 bg-sage-primary text-white rounded-lg hover:bg-sage-dark transition-colors text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          {/* Icon Only */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div ref={iconOnlyRef} className="h-64 bg-white flex items-center justify-center p-8">
              <Image
                src="/icon.png"
                alt="Logo Icon"
                width={120}
                height={120}
                className="h-30 w-30 object-contain"
              />
            </div>
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-charcoal mb-1">Icon Only</h4>
                <p className="text-sm text-warm-gray">For app icons and small spaces</p>
              </div>
              <button
                onClick={() => handleLogoDownload(iconOnlyRef as React.RefObject<HTMLDivElement>, 'dr-kamilah-jordaan-icon.png')}
                className="flex items-center gap-2 px-4 py-2 bg-sage-primary text-white rounded-lg hover:bg-sage-dark transition-colors text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>


      </section>

      {/* Color Palette */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-semibold mb-2 flex items-center gap-2 text-charcoal">
            <Palette className="h-6 w-6 text-sage-primary" />
            Color Palette
          </h3>
          <p className="text-warm-gray">Natural, calming colors reflecting health and wellness</p>
        </div>

        {Object.entries(brandColors).map(([category, colors]) => (
          <div key={category} className="mb-12">
            <h4 className="text-lg font-medium mb-4 capitalize text-charcoal">
              {category} Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => copyToClipboard(color.value, color.name)}
                  className="group relative rounded-xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer bg-white border-gray-200"
                >
                  <div
                    className="h-24 rounded-lg mb-3 shadow-inner"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-charcoal">{color.name}</p>
                    <p className="text-xs font-mono text-warm-gray">{color.value}</p>
                    <p className="text-xs mt-1 text-gray-400">{color.css}</p>
                  </div>
                  {copiedColor === color.name && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                      Copied!
                    </div>
                  )}
                  <Copy className="absolute top-2 right-2 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Gradients */}
        <div className="mt-12">
          <h4 className="text-lg font-medium mb-4 text-charcoal">Gradients</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {gradients.map((gradient) => (
              <button
                key={gradient.name}
                onClick={() => copyToClipboard(gradient.css, gradient.name)}
                className="group relative rounded-xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer bg-white border-gray-200"
              >
                <div
                  className="h-24 rounded-lg mb-3 shadow-inner"
                  style={{ background: gradient.value }}
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-charcoal">{gradient.name}</p>
                  <p className="text-xs font-mono text-warm-gray">bg-{gradient.css}</p>
                </div>
                {copiedColor === gradient.name && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                    Copied!
                  </div>
                )}
                <Copy className="absolute top-2 right-2 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-semibold mb-2 flex items-center gap-2 text-charcoal">
            <Type className="h-6 w-6 text-sage-primary" />
            Typography
          </h3>
          <p className="text-warm-gray">Elegant script combined with clean, professional fonts</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Signature Font */}
          <div className="rounded-2xl p-8 shadow-sm border bg-white border-gray-200">
            <h4 className="text-lg font-medium mb-6 text-charcoal">Signature - {typography.signature.name}</h4>
            <div className="space-y-4">
              <p className="text-4xl font-signature text-sage-primary">Dr. Kamilah Jordaan</p>
              <p className="text-3xl font-signature text-sage-dark">Sports & Family</p>
              <p className="text-2xl font-signature text-charcoal">Chiropractic Care</p>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <p className="text-sm font-mono text-warm-gray">
                font-family: {typography.signature.className}<br/>
                weight: {typography.signature.weight}<br/>
                usage: Logo, brand name, hero headings
              </p>
            </div>
          </div>

          {/* Headings */}
          <div className="rounded-2xl p-8 shadow-sm border bg-white border-gray-200">
            <h4 className="text-lg font-medium mb-6 text-charcoal">Headings - {typography.headings.name}</h4>
            <div className="space-y-4">
              <p className="text-3xl font-heading font-light text-charcoal">Light Heading</p>
              <p className="text-2xl font-heading font-normal text-charcoal">Regular Heading</p>
              <p className="text-xl font-heading font-semibold text-charcoal">Semibold Heading</p>
              <p className="text-lg font-heading font-bold text-charcoal">Bold Heading</p>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <p className="text-sm font-mono text-warm-gray">
                font-family: {typography.headings.className}<br/>
                weights: {typography.headings.weight}
              </p>
            </div>
          </div>

          {/* Body Text */}
          <div className="rounded-2xl p-8 shadow-sm border bg-white border-gray-200 md:col-span-2">
            <h4 className="text-lg font-medium mb-6 text-charcoal">Body Text - {typography.body.name}</h4>
            <div className="space-y-4">
              <p className="text-base text-charcoal">
                Dr. Kamilah Jordaan is a dedicated and passionate chiropractor committed to helping people achieve
                a pain-free life through non-invasive healthcare. She earned her Master&apos;s degree in Chiropractic from
                the University of Johannesburg and has since focused on providing holistic, patient-centered care to
                individuals of all ages.
              </p>
              <p className="text-sm text-warm-gray">
                Chiropractic care can help reduce and/or eliminate the symptoms associated with various afflictions,
                including neck pain, whiplash, lower back pain, headaches and migraines, sciatica, scoliosis,
                sports-related injuries, and joint pain.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <p className="text-sm font-mono text-warm-gray">
                font-family: {typography.body.className}<br/>
                weights: {typography.body.weight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UI Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-semibold mb-2 flex items-center gap-2 text-charcoal">
            <Layers className="h-6 w-6 text-sage-primary" />
            UI Components
          </h3>
          <p className="text-warm-gray">Key interface elements for the website</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Buttons */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Buttons</h4>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-sage-primary text-white rounded-lg hover:bg-sage-dark transition-colors">
                Book Appointment
              </button>
              <button className="w-full px-4 py-2 border-2 border-sage-primary text-sage-primary rounded-lg hover:bg-sage-soft/20 transition-colors">
                View Services
              </button>
              <button className="w-full px-4 py-2 text-sage-primary hover:bg-sage-soft/10 rounded-lg transition-colors">
                Learn More
              </button>
              <button className="w-full px-6 py-3 bg-gradient-soft-sage text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Book Now - CTA
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Service Cards</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-sage-soft/10 border border-sage-light/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-sage-primary/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-sage-dark" />
                  </div>
                  <h5 className="font-medium text-charcoal">Spinal Adjustment</h5>
                </div>
                <p className="text-sm text-warm-gray">Restore joint function</p>
              </div>
              <div className="p-4 rounded-lg bg-mint-fresh/10 border border-mint-fresh/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-mint-fresh/30 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-sage-accent" />
                  </div>
                  <h5 className="font-medium text-charcoal">Dry Needling</h5>
                </div>
                <p className="text-sm text-warm-gray">Myofascial release</p>
              </div>
            </div>
          </div>

          {/* Badges & Status */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Badges & Status</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-sage-primary/20 text-sage-dark rounded-full text-sm">
                  Available Today
                </span>
                <span className="px-3 py-1 bg-mint-fresh/30 text-sage-accent rounded-full text-sm">
                  New Patient
                </span>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-sm">
                  Follow-up
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-sage-soft border border-sage-light text-sage-dark rounded text-xs">
                  Sports Injury
                </span>
                <span className="px-2 py-1 bg-mint-fresh border border-sage-light text-sage-accent rounded text-xs">
                  Family Care
                </span>
                <span className="px-2 py-1 bg-white border border-sage-light text-charcoal rounded text-xs">
                  Prenatal
                </span>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Icon Styles</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-sage-soft/30 flex items-center justify-center">
                  <User className="h-6 w-6 text-sage-dark" />
                </div>
                <span className="text-xs text-warm-gray">Patient</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-mint-fresh/30 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-sage-accent" />
                </div>
                <span className="text-xs text-warm-gray">Wellness</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-sage-primary/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-sage-primary" />
                </div>
                <span className="text-xs text-warm-gray">Booking</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-accent shadow-[0_4px_12px_rgba(107,142,92,0.3),0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-white/20 ring-offset-1 ring-offset-sage-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(107,142,92,0.4),0_4px_8px_rgba(0,0,0,0.15)] group-hover:-translate-y-0.5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
                  <Stethoscope className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="text-xs text-warm-gray">Medical</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-accent shadow-[0_4px_12px_rgba(107,142,92,0.3),0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-white/20 ring-offset-1 ring-offset-sage-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(107,142,92,0.4),0_4px_8px_rgba(0,0,0,0.15)] group-hover:-translate-y-0.5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
                  <MapPin className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="text-xs text-warm-gray">Location</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-accent shadow-[0_4px_12px_rgba(107,142,92,0.3),0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-white/20 ring-offset-1 ring-offset-sage-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(107,142,92,0.4),0_4px_8px_rgba(0,0,0,0.15)] group-hover:-translate-y-0.5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
                  <Phone className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="text-xs text-warm-gray">Contact</span>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200 lg:col-span-2">
            <h4 className="font-medium mb-4 text-charcoal">Contact Information Card</h4>
            <div className="p-6 rounded-xl bg-gradient-to-br from-sage-soft/10 to-mint-fresh/10 border border-sage-light/30">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sage-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Sticks and Stones Wellness Hub</p>
                    <p className="text-sm text-warm-gray">1 Jasmine Street, Morningside, Sandton, 2057</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sage-primary" />
                  <div>
                    <p className="text-sm text-charcoal">082 940 7129 / 087 940 3893</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-sage-primary" />
                  <div>
                    <p className="text-sm text-charcoal">Monday - Friday: 7am - 6pm</p>
                    <p className="text-sm text-warm-gray">Saturday: 8am - 12pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations & Interactions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-semibold mb-2 flex items-center gap-2 text-charcoal">
            <Sparkles className="h-6 w-6 text-sage-primary" />
            Animations & Interactions
          </h3>
          <p className="text-warm-gray">Subtle, calming animations that enhance the wellness experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Card Hover */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Service Card Hover</h4>
            <div className="group relative rounded-xl border border-sage-light/30 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer bg-white">
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-sage-soft/5 via-transparent to-mint-fresh/5" />
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-lg bg-sage-primary/20 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Activity className="h-5 w-5 text-sage-dark" />
                </div>
                <p className="text-sm text-warm-gray mb-1">Treatment</p>
                <p className="text-xl font-semibold text-charcoal">Spinal Care</p>
              </div>
            </div>
          </div>

          {/* Button Interactions */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Button States</h4>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-sage-primary text-white rounded-lg transition-all duration-200 hover:bg-sage-dark hover:scale-[1.02] active:scale-[0.98]">
                Interactive Button
              </button>
              <button className="group w-full px-4 py-2 text-sage-primary hover:bg-sage-soft/10 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                <span>Learn More</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Icon Animations */}
          <div className="rounded-2xl p-6 shadow-sm border bg-white border-gray-200">
            <h4 className="font-medium mb-4 text-charcoal">Icon Hover Effects</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-sage-soft/30 flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-sage-primary group-hover:text-white">
                  <Heart className="h-6 w-6 text-sage-dark transition-transform duration-200 group-hover:scale-110 group-hover:text-white" />
                </div>
                <span className="text-xs text-warm-gray">Scale</span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-mint-fresh/30 flex items-center justify-center transition-all duration-200 group-hover:rotate-12">
                  <Smile className="h-6 w-6 text-sage-accent" />
                </div>
                <span className="text-xs text-warm-gray">Rotate</span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-sage-primary/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-sage-primary animate-pulse" />
                </div>
                <span className="text-xs text-warm-gray">Pulse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="bg-gradient-soft-sage rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-heading font-bold mb-4">Brand Assets</h3>
            <p className="text-lg mb-8 text-white/90">
              Download logos, color palettes, and brand guidelines for Dr. Kamilah Jordaan Sports and Family Chiropractic.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sage-primary rounded-lg hover:bg-gray-100 transition-colors font-medium">
                <Download className="h-5 w-5" />
                Download Brand Kit
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-sage-dark/30 text-white border border-white/30 rounded-lg hover:bg-sage-dark/50 transition-colors font-medium">
                View Guidelines PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


## Output Format


Your final message MUST include the docs/project_style.md file path you created so others know where to look up, with key highlights or warnings.

Example: "I've created a comprehensive implementation plan at `docs/project_style.md` as well as a brand page at `app/brand/page.tsx`.

## Rules
- We are using pnpm NOT npm
- Must read `.claude/sessions/context_session_x.md` before starting if any context exists
- Must read docs/project_brief.md before creating the style guide
- Must create a brand page that shows the style guide in action
