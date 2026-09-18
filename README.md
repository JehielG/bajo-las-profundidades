# 🎮 Bajo las Profundidades (Under the Depths)

> Final project for the **Game Development** course (*Desarrollo de Videojuegos*).

A 2D puzzle and adventure web game built with **Phaser 3** and **JavaScript (ES6 Modules)**, featuring logic riddles, custom physics, interactive puzzles, and subterranean exploration across multiple levels.

---
## 🕹️ Play Online
You can play the game directly in any modern web browser without installing anything:
👉 **[Play Bajo las Profundidades Online](https://jehielg.github.io/bajo-las-profundidades/)**
---
## ⌨️ Controls

| Action | Key / Input |
| :--- | :--- |
| **Move Left / Right** | `←` / `→` or `A` / `D` |
| **Jump / Climb** | `Spacebar` or `↑` / `W` |
| **Interact / Advance Dialogues** | `Enter` |
| **Navigate Menus** | Arrow Keys + `Enter` |

---

## ✨ Features
- **Puzzles & Riddles:** Solve challenges, wiring minigames, and logic obstacles to progress through each stage.
- **Exploration & Storyline:** Venture across subterranean caverns, secret labs, jungle zones, and lava caves with interactive dialogues.
- **Minigames & Mechanics:** Custom mini-games (cable wiring, elevator timing), health system, and minimap tracking.
- **Pixel Art & Smooth Tweens:** Retro visuals powered by Phaser's tween and physics engine.

---

## 🛠️ Built With
- **Game Engine:** [Phaser 3](https://phaser.io/) (v3.55.2 via CDN)
- **Language:** Vanilla JavaScript (Native ES Modules)
- **Graphics & Audio:** HTML5 Canvas / WebGL, Web Audio API

---

## 💻 Running Locally

Because the project uses ES Modules and dynamically loads audio/image assets, it requires a local web server (opening via `file:///` is restricted by browser CORS policies):

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
   ```

2. **Start a local HTTP server:**
   - **VS Code:** Right-click `index.html` and choose **"Open with Live Server"**.
   - **Node.js (npx):**
     ```bash
     npx serve
     ```
   - **Python:**
     ```bash
     python -m http.server 8000
     ```

3. **Open in browser:**
   Navigate to `http://localhost:8000` (or the port indicated by your server).

---

## 👥 Credits & Authors

### **Pegasus Fantasy Games**
- **López Grande Jehiel**
- **Morales Salazar José Miguel**
- **Pardo Albisua Ana Erika**
- **Pérez Bonilla Marco Antonio**

### **Illustrations**
- **Silvia Giselle**

### **Asset Attribution & Third-Party Resources**
- Art by **MrBeast**. Commissioned by [OpenGameArt.org](http://opengameart.org)
- Awesome Jungle Pack - **Jesse M** / Twitter: [@Jsf23Art](https://twitter.com/Jsf23Art)
- Lab tileset 2 by **SandoAir**
- "[LPC] Jungle" by **bluecarrot16, KnoblePersona, Lanea Zimmerman (Sharm), Talosaurus, Hyptosis**, and the Open Pixel Project contributors ([OpenPixelProject.com](https://openpixelproject.com)) - *CC-BY-SA 3.0*
- My submission for the OGA Art Challenge, "Share the Love" by **Fleurman**
