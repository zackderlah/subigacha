# 🎁 Gacha Gift - Birthday Surprises!

A cute and interactive single-page birthday website where users can click a "Pull" button to get random virtual gifts themed around Pokémon, anime, K-pop, skincare, and fashion.

## ✨ Features

- **Interactive Gacha Machine**: Click the "Pull!" button to get random gifts
- **Beautiful Animations**: Smooth reveal animations, confetti effects, and floating elements
- **Music Toggle**: Background music with on/off functionality
- **Mobile-Friendly**: Responsive design that works on all devices
- **Keyboard Shortcuts**: 
  - `Spacebar` - Pull a gift
  - `Escape` - Close gift display
  - `M` - Toggle music
- **Touch Support**: Swipe up to pull, swipe down to close on mobile
- **Easter Eggs**: Click the title 5 times for a secret mode!

## 🎨 Design

- **Pastel Color Scheme**: Soft pink, lavender, and baby blue gradients
- **Playful Typography**: Comic Neue and Poppins fonts
- **Rounded UI Elements**: Soft shadows and modern design
- **Smooth Animations**: Bounce, float, and sparkle effects


## 🖼️ Adding Custom Images

To add your own gift images:

1. Place your images in the `images/` folder
2. Use the following naming convention:
   - `glow-serum.png`
   - `denim-jacket.png`
   - `totoro-boba.png`
   - `eevee-mask.png`
   - `dance-potion.png`
   - `pikachu-mirror.png`
   - `lightstick.png`
   - `hair-clips.png`
   - `sheet-masks.png`
   - `vip-pass.png`

3. Recommended image specifications:
   - **Format**: PNG or JPG
   - **Size**: 200x200 pixels (square)
   - **Style**: Cute, colorful, and themed to match the gift

## 🚀 How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Pull a gift**: Click the "Pull!" button or press Spacebar
3. **View your gift**: Each gift shows a title, image, and fun message
4. **Try again**: Click "Pull!" again for a new random gift
5. **Toggle music**: Click the music icon in the top-right corner
6. **Close gift**: Click the × button or press Escape

## 🎵 Music

The website includes a background music toggle. The current music source is a placeholder - you can replace it with your own music file by updating the audio source in `index.html`.

## 🎯 Customization

### Adding More Gifts

To add more gifts, edit the `gifts` array in `script.js`:

```javascript
const gifts = [
    // ... existing gifts ...
    {
        title: "Your Custom Gift",
        image: "images/your-image.png",
        message: "Your custom message here!"
    }
];
```

### Changing Colors

Modify the CSS variables in `styles.css` to change the color scheme:

```css
/* Main colors */
--primary-color: #ff6b9d;
--secondary-color: #ff9a9e;
--accent-color: #fecfef;
```

### Adding Sound Effects

Replace the audio sources in `script.js` for custom sound effects.

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎉 Special Features

- **Confetti Animation**: Colorful confetti falls when pulling gifts
- **Interactive Sparkles**: Sparkles follow your mouse movement
- **Smooth Transitions**: All animations are smooth and performant
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Technical Details

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No external dependencies
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Birthday! 🎂✨**

Enjoy pulling virtual gifts and spreading joy with this interactive birthday website! 
