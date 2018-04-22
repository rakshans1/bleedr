export default class Bleedr {
  constructor(options) {
    this.options = Object.assign({}, this.getDefaultOptions(), options);
  }

  getDefaultOptions() {
    return {
      frames: 150,
      colWidth: "2px",
      flameColor: "#660000",
      shadesCount: 10,
      maxPixel: 500,
    }
  }

  bleed() {
    let {flameColor, shadesCount} = this.options;
    this.shades  = this.generateShades(flameColor, shadesCount);
    this.generateBleeds();
    this.index = 0;
    this.last = performance.now();
  }

  generateShades(baseColor, number) {
    const shades = [];
    const templateStart = "linear-gradient(to bottom,"
    const templateEnd = ")"
    let increment = 100 / number;
    for (let i = 0; i < number; i++) {
      let inc = increment;
      let color = baseColor;
      for (let j = 0; j <= i; j++) {
        color = `${color},${this.shadeColor(baseColor, inc)}`
        inc +=  increment;
      }
      shades[i] = `${templateStart}${color}${templateEnd}`
    }
    return shades;
  }

  generateBleeds() {
    this.bleedContainer = document.createElement("div");
    this.bleedContainer.style.position = "fixed";
    this.bleedContainer.style.right = "0px";
    this.bleedContainer.style.top = "0";
    this.bleedContainer.style.zIndex = "99999";
    let { frames } = this.options;
    for (let i = 0; i < frames; i++) {
      const fc = document.createElement("div");
      fc.style.background = this.shades[0];
      fc.style.width = this.options.colWidth;
      fc.style.display = "inline-block";
      fc.style.verticalAlign = "top";
      fc.style.opacity = "0.8";
      this.bleedContainer.appendChild(fc);
      fc.style.height = "0px";
    }
    document.body.appendChild(this.bleedContainer);
    requestAnimationFrame(this.refresh.bind(this));
  }

  shadeColor(color, percent) {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  }

  getHex(length) {
    let { maxPixel, shadesCount } = this.options;
    let shades = this.shades;
    if (length > maxPixel) return shades[shades.length - 1];
    length = Math.ceil(length);
    const slot = Math.ceil(maxPixel / shadesCount);
    const index = Math.floor(length / slot);
    return shades[index];
  }

  refresh() {
    let { frames } = this.options;
    const now = performance.now();
    const diff = now - this.last;
    this.last = now;
    this.bleedContainer.childNodes[this.index % frames].style.backgroundImage = this.getHex(diff);
    this.bleedContainer.childNodes[this.index % frames].style.height = diff + "px";
    this.index++;
    this.bleedContainer.childNodes[this.index % frames].style.background = "black";
    requestAnimationFrame(this.refresh.bind(this));
  }
}