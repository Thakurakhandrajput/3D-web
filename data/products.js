// Sample catalogue — 50 SKUs, generated so the client can see how a
// larger product set renders in the grid without needing real photography yet.

const CATEGORIES = [
  { tag: 'OUTER', name: 'Outerwear', names: ['Draped Trench', 'Structured Bomber', 'Raw-Hem Overcoat', 'Quilted Field Jacket', 'Oversized Parka'] },
  { tag: 'KNIT', name: 'Knitwear', names: ['Cable Rib Sweater', 'Boucle Cardigan', 'Turtleneck Pullover', 'Cropped Sweater Vest', 'Merino Half-Zip'] },
  { tag: 'DRESS', name: 'Dresses', names: ['Bias-Cut Slip Dress', 'Column Midi Dress', 'Asymmetric Wrap Dress', 'Corset Panel Dress', 'Layered Tulle Dress'] },
  { tag: 'DENIM', name: 'Denim', names: ['Straight-Leg Jean', 'Raw Selvedge Jean', 'Wide-Leg Jean', 'Denim Trench', 'Cropped Denim Jacket'] },
  { tag: 'FOOT', name: 'Footwear', names: ['Chunky Sole Boot', 'Minimal Court Sneaker', 'Pointed Ankle Boot', 'Woven Slide', 'Platform Loafer'] },
  { tag: 'ACC', name: 'Accessories', names: ['Structured Tote', 'Sculptural Belt', 'Silk Twill Scarf', 'Chain Link Necklace', 'Angular Sunglasses'] },
  { tag: 'TAIL', name: 'Tailoring', names: ['Single-Breasted Blazer', 'Wide-Leg Trouser', 'Vest & Trouser Set', 'Double-Breasted Coat', 'Pleated Skirt Suit'] },
  { tag: 'BASE', name: 'Basics', names: ['Ribbed Tank', 'Heavyweight Tee', 'Relaxed Shirt', 'Silk Cami', 'Compact Hoodie'] },
  { tag: 'ACTV', name: 'Activewear', names: ['Seamless Legging', 'Cropped Performance Top', 'Zip-Through Track Jacket', 'Mesh Panel Short', 'Ribbed Bralette'] },
  { tag: 'EVE', name: 'Eveningwear', names: ['Sequin Slip Gown', 'Tuxedo Jumpsuit', 'Draped Satin Gown', 'Beaded Cocktail Dress', 'Velvet Evening Blazer'] },
];

const FABRICS = ['Merino Wool', 'Italian Denim', 'Silk Twill', 'Brushed Cotton', 'Recycled Nylon', 'Boiled Wool', 'Organic Linen'];
const COLORWAYS = ['Ink', 'Bone', 'Clay', 'Slate', 'Moss', 'Rust', 'Ivory'];

function buildCatalogue() {
  const products = [];
  let sku = 1000;
  CATEGORIES.forEach((cat, ci) => {
    cat.names.forEach((base, ni) => {
      sku += 1;
      const fabric = FABRICS[(ci + ni) % FABRICS.length];
      const colorway = COLORWAYS[(ci * 2 + ni) % COLORWAYS.length];
      const price = 3200 + ((ci * 5 + ni * 3) % 12) * 950;
      products.push({
        id: sku,
        sku: `WG-${cat.tag}-${sku}`,
        name: base,
        category: cat.name,
        fabric,
        colorway,
        price,
        threeD: (ci + ni) % 3 === 0, // flag a subset as "3D try-on ready" for the pitch
        seed: `${cat.tag}${sku}`,
      });
    });
  });
  // Trim/pad to exactly 50 to match the client's stated catalogue size.
  return products.slice(0, 50);
}

module.exports = { products: buildCatalogue() };
