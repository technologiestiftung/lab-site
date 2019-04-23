/**
 * this monkey patches the frontnmatter
 */
export interface IObject {
  [thing: string]: any;
}
export default function patch(template: IObject, update: IObject): IObject {
  const patched = {...template, ...update};
  return patched;
}
