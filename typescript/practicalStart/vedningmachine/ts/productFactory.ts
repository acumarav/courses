import * as products from "./product"

export default function GetProduct(): products.Product {
    let rnd = Math.floor(Math.random() * 11);
    switch (rnd) {
        case 0: return new products.CocaCola()
        case 1: return new products.Gummies();
        case 2: return new products.MilkyWay();
        case 3: return new products.Hersey();
        case 4: return new products.Fanta();
        case 5: return new products.Sprite();
        case 6: return new products.Plain();
        case 7: return new products.Cheddar();
        case 8: return new products.Mints();
        case 9: return new products.Peanuts();
        case 10: return new products.Cashews();
    }
}
