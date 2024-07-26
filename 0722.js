function foo() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]); //even we don't specify arguments here, don't report errors
  }
}

foo(1, 2, 3, 4, 5);
//arguments feature is not used frequently.

//rest parameter vs spread operator
//... has different meanings
function foo2(a, b, ...arr) {
  console.log(arr);
}
foo2(1, 2, 3, 4, 5, 6); //catch the rest of parameters
//rest parameter has to be at the last of your input

const nums = [1, 2, 3];
console.log([...nums] == nums);
//how to compare the value?
//use shallow copy, use reference; deep copy, independent
// console.log(JSON.stringify(student)==JSON.stringigy(n))
//todo deep copy vs shallow copy

const a = { content: { name: "john", age: 20 }, gender: "male" };
const b = JSON.stringify(a);
console.log(b);
const c = JSON.parse(b);
console.log(c);
//convert c to json again
//deep copy use recursion to unfold every property + use stringify and parse
//object doesn't not create a context. blah blah.

//second half of lecture on 07/23
//closure
function createCounter() {
  let count = 0;
  function increment() {
    count++;
    console.log(count);
  }
  return increment;
}
const counter1 = createCounter();
counter1();
counter1();
counter1();
counter1();

function scoreboard() {
  let count = 0;
  function increment() {
    count++;
    console.log(count);
  }
  function decrement() {
    count--;
    console.log(count);
  }
  //how to return it? **** important.
  return [increment, decrement];
}
//create a scoreBoard
const [addscore, minusscore] = scoreboard(); //use this structure to hold an array of functions
addscore();
addscore();
minusscore();
minusscore();

//Currying, transform the function?
//allows you to transform a function that takes multiple arguments into a sequence
//of functions that each take a single argument.
function add(a, b, c, d, e) {
  return a + b + c + d + e;
}
function curryAdd(a) {
  //use the idea of closure
  return function (b) {
    return function (c) {
      return function (d) {
        return function (e) {
          return a + b + c + d + e;
        };
      };
    };
  };
}
console.log(curryAdd(1)(2)(3)(4)(5));

//js is single threaded. one ops at a time.
//have async, not parallel, but concurrent. meaning task can be done out of order without affecting the result

//call stack
//9th function
//8th function
//xxxx
//1st function
//LIFO

//synchronized, seqential, each ops will wait for the prior to complete

//ex
function timeconsumingTask() {
  console.log("long time");
}
function task() {
  let n = 1000000;
  while (n > 0) {
    n--;
  }
  console.log("reading a file");
}
console.log("started 1");
// task()
//应该要take time 但是直接run出来了 哪里错了
// setTimeout(()=>{console.log("download")},5000) some operation execute after x secs
timeconsumingTask();
console.log("ended");

//aync function//
// put them in task queue first
//event loop continue to look at task queue if the call stack is empty
// task queue follows a FIFO

fetch("https://jsonplaceholder.typicode.com/posts/3")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request Failed"); //then will return a promise
    }
    return response.json();
  })
  .then((data) => {
    console.log("fetched data", data);
  })
  .catch((err) => {
    console.log("error fetch data", err);
  });

//Promise Chain

const promise1 = new Promise((resolve, reject) => {
  let condition = false;
  if (condition) {
    resolve(123);
  } else {
    reject("error at step 1");
  }
});
promise1
  .then(
    (res) => {
      console.log("input at step 2", res);
      return "data from step2";
    },
    (error) => {
      console.log("error", error);
      // throw new Error("error at step 2");
      return "error is resolved in step 2";
    }
  )
  .then((res) => {
    console.log("input at step 3", res);
    return "data from step 3";
  }) //why is it undefined. because we only console log in 152, we need to return it
  .catch((error) => {
    console.log("error at step 3", error);
  })
  .then((res1) => console.log(res1)); //why is this line not outputing

//catch error in then quote, or after using .catch
//propogate the error to the chain or return data after resolved

//promise.all.
//fulfill if all promise ful. reject if any one reject
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("data1");
  }, 1000)
);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(() => {
    reject("data2");
  }, 2000)
);
const promise4 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("data4");
  }, 3000)
);

Promise.all([promise2, promise3, promise4])
  .then((result) => {
    console.log("all data are fetched", result);
  })
  .catch((error) => {
    console.log("error fetching data", error);
  }); //it will only return error, no result from other ok promises

  //set time out, promise, promise first, then callback function from set timeout. why 

  //async, await
  //alow us to write async code looks like sequential code

  // codes before await is running async
  function resolveAfter25seconds(){
    return new Promise((resolve)=>{
      setTimeout(()=> {resolve("resolve first")},2000)
    })
  }

  async function fetchData(){
    console.log("fetching data")
    const result = await resolveAfter25seconds()
    console.log(result)//if no await all codes is still synchron
    console.log("done")
  }
fetchData()
//js visualize 9000, what is microtask queue
