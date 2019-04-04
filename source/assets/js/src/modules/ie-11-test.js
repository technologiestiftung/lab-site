/* eslint-disable no-undef */

export const ie11Test = () => {
  const foo = Object.assign({}, {foo: 'ie11'});
  // tslint:disable-next-line: no-console
  console.log(foo);
  const p = new Promise((resolve, reject) => {
    resolve(fetch('https://reqres.in/api/users?delay=3'));
  });
  p.then(res => {
    // tslint:disable-next-line: no-console
    console.log(res);
  }).catch(err => {
    // tslint:disable-next-line: no-console
    console.log(err);
  });
};
