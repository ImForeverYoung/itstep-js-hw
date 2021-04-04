

const logCircle = circle => 
  console.log("Круг: " + circle.radius)

const logTriangle = triangle => 
  console.log("Треугольник: " + triangle.a + ", " + triangle.b + ", " + triangle.c);


class constructRectangle{
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get perimeter() {
    return (this.width + this.height) * 2;
  }
  log() {
    logRectangle(this);
  }
  get area(){
    return this.width*this.height;
  }
  logRectangle() {
  console.log("Прямоугольник: " + this.width + ", " + this.height);
  }
}

class constructCircle{
  constructor(radius) {
    this.radius = radius;  
  }
  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
  logCircle() {
    console.log("Круг: " + this.radius)
  }
  get area(){
    return Math.PI * Math.pow(this.radius,2);
  }
}

class constructTriangle{
   constructor(a = 0, b = 0, c = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
  }
  get perimeter() {
    return this.a + this.b + this.c;
  }
  log() {
    console.log("Треугольник: " + this.a + ", " + this.b + ", " + this.c);
    
  }
  get area(){
    let p = (this.perimeter())/2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c))
  }
  static areEqual(t1, t2) {
    if (t1 instanceof Triangle && t2 instanceof Triangle) {
      const sides1 = [t1.a, t1.b, t1.c].sort();
      const sides2 = [t2.a, t2.b, t2.c].sort();

      return sides1[0] === sides2[0] && sides1[1] === sides2[1] && sides1[2] === sides2[2]; 

      
    } else {
      return false;
    }
  }
}
class EquilateralTriangle extends constructTriangle{
    constructor(a = 0) {
        super(a, a, a);
      }
    
      print() {
        console.log("Равносторонний треугольник: " + this.a);
      }
}
const shapes = [
  constructRectangle(100, 50),
  constructRectangle(150, 20), 
  constructCircle(100), 
  constructCircle(200), 
  constructTriangle(100, 150, 200), 
  constructTriangle(300, 400, 500)
];
console.log(shapes);

/*shapes.forEach(shape => {
  switch (shape.$type) {
    case "rectangle": logRectangle(shape); break;
    case "circle": logCircle(shape); break;
    case "triangle": logTriangle(shape); break;
    default: console.log("Неизвестная фигура");
  }
});

console.log("--------");
shapes.forEach(shape => shape.log(shape));

console.log(shapes.map(shape => shape.perimeter()));*/