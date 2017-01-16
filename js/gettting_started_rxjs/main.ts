import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

let output= document.getElementById("output");
let button =document.getElementById("button");

let click= Observable.fromEvent(button,"click");

function load(url: string){
    let xhr= new XMLHttpRequest();

    xhr.addEventListener("load", ()=>{
        let movies= JSON.parse(xhr.responseText);
        movies.forEach(m=>{
            let div=document.createElement("div");
            div.innerText= m.title;
            output.appendChild(div);
        });
    });
    xhr.open("GET",url);
    xhr.send();
}

click.subscribe(
    e => load("movies.json"),
    e => console.log(`error: ${e}`),
    ()=> console.log("complete")
);

/*let numbers = [1, 5, 10, 15];
let sourceDiv = Observable.fromEvent(document, "mousemove")
    .map((e: MouseEvent) => {
        return {
            x: e.clientX,
            y: e.clientY
        }
    }).filter(val=>val.x<400).delay(50);
let circle = document.getElementById("circle");
let source = Observable.create(observer => {
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++])

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    }
    produceValue();

}).map(n => n * 2).filter(n => n > 4);

function onNextDiv(value){
    circle.style.left=value.x;
    circle.style.top=value.y;
}

sourceDiv.subscribe(
    onNextDiv,
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);*/



