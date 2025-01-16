<img src="../src/images/banner.webp" alt="Ink Kit Banner" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;" />

# Welcome to Ink Kit

Ink Kit is an onchain-focused SDK that delivers a delightful developer experience with ready-to-use app layout templates, themes, and magical animated components.

## Install

```bash
npm install @inkonchain/ink-kit
# or
pnpm install @inkonchain/ink-kit
```

## Usage

```tsx
// Import styles first at the root of your project (required)
import "@inkonchain/ink-kit/style.css";
```

```tsx
// Import components as needed
import { Button } from "@inkonchain/ink-kit";

function App() {
  return (
    <div>
      <Button onClick={() => {}} size="md" variant="secondary">
        Ship It
      </Button>
    </div>
  );
}
```

Note: Ink Kit classes are prefixed with `ink:` and can be customized using CSS variables instead of Tailwind classes. They should be imported first so that your own custom classes are taking precedence.

## Key Features

- 🎨 **Customizable app layout templates**
- ✨ **Magical animated components**
- 🎭 **Vibrant themes**
- ⛓️ **Onchain-focused development**
- 🚀 **Efficient developer experience**
- 📱 **Polished, engaging interfaces**

## Theming

By default, Ink Kit provides a couple of themes already in the stylesheet:

- Light (`light-theme`)
- Dark (`dark-theme`)
- Contrast (`contrast-theme`)
- Neo (`neo-theme`)
- Morpheus (`morpheus-theme`)

To specify which theme to use, add the `ink:THEME_ID` to your document root:

```tsx
<html class="ink:dark-theme">
  ...
```

If you want to programmatically set this value, you can use the `useInkThemeClass`:

```tsx
const theme = getMyCurrentTheme();
useInkThemeClass(theme === "light" ? "ink:neo-theme" : "ink:dark-theme");
```

### Custom Theme

To create a custom theme, you can override CSS variables:

```css
:root {
  --ink-button-primary: rgb(10, 55, 10);
  ...
}
```

To see examples on specific colors that you can override, check the following [theme](https://github.com/inkonchain/ink-kit/tree/main/src/styles/theme) section of the Ink Kit repository.

## Resources

- **Documentation**: Visit our [Storybook](https://ink-kit.inkonchain.com/)
- **Contributing**: Visit our [GitHub repository](https://github.com/inkonchain/ink-kit)

## WIP Notice

This is a work in progress: we are constantly adding new components, improving the developer experience, and fixing bugs.
*
