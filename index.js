const API = (function () {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const getTODOs = () =>
    fetch([baseUrl, "todos"].join("/")).then((response) => response.json());
  return { getToDos };
})();

API.getToDos().then((json) => console.log(json));

// * ~~~~~~~~~~~View~~~~~~~~~~~~~ */
const View = (() => {
    const render = () =
  //should be hold be iffi?
  return {};
})();

// * ~~~~~~~~~~~Model~~~~~~~~~~~~~ */

const Model = ((api) => {
    return {...api};//this is a destructure
  })(API);
  

// * ~~~~~~~~~~~Controller~~~~~~~~~~~~~ */
const Controller = ((model) => {
    const init = ()=>{
        model.getToDos().then(console.log)
    }
  return {init};//this is a destructure
})(Model);

//export default API
//later can import
import { getToDos, baseUrl } from "";
