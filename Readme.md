# Bleedr

> Javacript performance graph in browser.

## Install
**Installing via cdn**

```
<script src="https://unpkg.com/bleedr"></script>
```

**Installing the npm module**

```
npm install bleedr
```

## Usage

```js
const bleedr = new Bleedr();
bleedr.bleed();
```

```js
const options = {
  frames: 150, //Number of frames 
  colWidth: "2px", //width of each frames
  flameColor: "#f6cc33", //flame color
  shadesCount: 10, //no of shades for linear gradient
  maxPixel: 500, //max pixel height for linear gradient
}
const bleedr = new Bleedr(options);
bleedr.bleed();
```

## Demo

[https://bleedr.surge.sh/](https://bleedr.surge.sh/)