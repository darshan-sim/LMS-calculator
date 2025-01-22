//v.1
// export const handleInput = (() => {
//   let isDecimal = false;
//   const checkInput = (input) => {
//     input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//     console.log(isDecimal);
//     console.log(isDecimal);
//     return input;
//   };
//   return checkInput;
// })();

// v.2
// let isDecimal = false;
// export const handleInput = (() => {
//   const checkInput = (input) => {
//     input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//     console.log(isDecimal);
//     console.log(input)
//     return input;
//   };
//   return checkInput;
// })();

// v.3
// let isDecimal = false;
// const checkInput = (input) => {
//   input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//   console.log(isDecimal);
//   console.log(input);
//   return input;
// };
// export const handleInput = (input) => {
//   return checkInput(input);
// };

// v.4
// export const handleInput = (() => {
//   let isDecimal = false;

//   const checkInput = (input) => {
//     input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//     console.log(isDecimal);
//     console.log(input);
//     return input;
//   };

//   return {
//     processInput: checkInput,
//   };
// })();
