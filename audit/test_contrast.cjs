const { getContrast } = require('./compute_contrast.cjs');

const tests = [
  { name: 'Light Primary Text on Fill', color1: '#3A2620', color2: '#FFD64D', min: 4.5 },
  { name: 'Light Primary Text on Hover Fill', color1: '#3A2620', color2: '#FFE066', min: 4.5 },
  { name: 'Light Ghost Text on Page Bg', color1: '#3A2620', color2: '#FFF6DC', min: 4.5 },
  { name: 'Light Ghost Text on Card Bg', color1: '#3A2620', color2: '#FFFDF9', min: 4.5 },
  { name: 'Light Primary Edge on Page Bg', color1: '#3A2620', color2: '#FFF6DC', min: 3.0 },
  { name: 'Light Ghost Edge on Page Bg', color1: '#3A2620', color2: '#FFF6DC', min: 3.0 },
  { name: 'Light Focus Ring on Page Bg', color1: '#5B5BD6', color2: '#FFF6DC', min: 3.0 },
  { name: 'Light Disabled Text on Fill', color1: '#654B41', color2: '#F2DFCB', min: 4.5 },
  { name: 'Light Disabled Border on Page Bg', color1: '#8B6F63', color2: '#FFF6DC', min: 3.0 },
  { name: 'Dark Primary Text on Fill', color1: '#2B1D18', color2: '#FFD64D', min: 4.5 },
  { name: 'Dark Primary Text on Hover Fill', color1: '#2B1D18', color2: '#FFE066', min: 4.5 },
  { name: 'Dark Ghost Text on Page Bg', color1: '#FFFDF9', color2: '#2B1D18', min: 4.5 },
  { name: 'Dark Ghost Text on Card Bg', color1: '#FFFDF9', color2: '#35241E', min: 4.5 },
  { name: 'Dark Primary Edge on Page Bg', color1: '#DCA828', color2: '#2B1D18', min: 3.0 },
  { name: 'Dark Ghost Edge on Page Bg', color1: '#FFFDF9', color2: '#2B1D18', min: 3.0 },
  { name: 'Dark Focus Ring on Page Bg', color1: '#FFFDF9', color2: '#2B1D18', min: 3.0 },
  { name: 'Dark Disabled Text on Fill', color1: '#654B41', color2: '#F2DFCB', min: 4.5 },
  { name: 'Dark Disabled Border on Page Bg', color1: '#8B6F63', color2: '#2B1D18', min: 3.0 },
];

let allPassed = true;
tests.forEach(t => {
  const ratio = getContrast(t.color1, t.color2);
  const pass = ratio >= t.min;
  if (!pass) allPassed = false;
  console.log(`${pass ? 'PASS' : 'FAIL'} | ${t.name}: ${ratio.toFixed(2)}:1 (req >= ${t.min}:1)`);
});

if (allPassed) {
  console.log('\nALL 18 CONTRAST CHECKS PASSED!');
} else {
  console.error('\nSOME CONTRAST CHECKS FAILED');
  process.exit(1);
}
