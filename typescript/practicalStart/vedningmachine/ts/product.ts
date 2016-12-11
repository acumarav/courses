/// <reference path="./productCategory"/>

interface Product{
  name:string
  price:number
  category?: ProductCategory

}

class CocaCola implements Product{
  name="Coca-Cola"
  price= 2.30
  category=new SodaCategory()
}

class Initial implements Product{
  name="Please select a product"
  price=0
}

class Gummies implements Product{
  name:string ="Gummies"
  price=1.30
  category=new CandyBarCategory()
}

class Hersey implements Product{
  name: string ="Hersey's"
  price=1.30
  category=new CandyBarCategory()
}

class MilkyWay implements Product{
  name: string ="Milky Way"
  price = 1.80
  category = new CandyBarCategory()
}

class Fanta implements Product {
    name: string = "Fanta"
    price = 2
    category = new SodaCategory()
}

class Sprite implements Product {
    name: string = "Sprite"
    price = 1.80
    category = new SodaCategory()
}

class Peanuts implements Product {
    name: string = "Peanuts"
    price = 1.50
    category = new NutsCategory()
}

class Cashews implements Product {
    name: string = "Cashews"
    price = 2.80
    category = new NutsCategory()
}

class Plain implements Product {
    name: string = "Plain"
    price = 2
    category = new ChipsCategory()
}

class Cheddar implements Product {
    name: string = "Cheddar"
    price = 2
    category = new ChipsCategory()
}

class Mints implements Product {
    name: string = "Mints"
    price = 1.30
    category = new CandyCategory()
}
