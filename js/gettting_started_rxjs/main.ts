import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {

    return Observable.create(
        observer => {
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("load", () => {
                if(xhr.status=== 200) {
                    let data = JSON.parse(xhr.responseText);
                    observer.next(data);
                    observer.complete();
                }else {
                    observer.error(xhr.statusText);
                }
            });
            xhr.open("GET", url);
            xhr.send();
        }).retryWhen(retryStrategy({attempts:3,delay: 1500}));
}

function retryStrategy({attempts = 4, delay = 1000}){
    return function (errors) {
        return errors.scan((acc,value)=>{
            console.log(acc, value)
            return acc+1;
        },0).takeWhile(acc=> acc <attempts)
            .delay(delay);
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
        console.log("render");
    });
}

load("movies.json");


click.flatMap(e => load("movies.json")).subscribe(
   renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log("complete"));

/*click.subscribe(
 e => load("movies.json"),
 e => console.log(`error: ${e}`),
 ()=> console.log("complete")
 );*/

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



