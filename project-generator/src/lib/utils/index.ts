import {statSync} from 'fs';
import {resolve} from 'path';
import slugify from 'slugify';

// https://gist.github.com/baamenabar/d639055caaacd5dbd139c302caf8a4f9

export function slug(str: string) {
  return slugify(str).toLowerCase();
}
export function buildTargetPath(foldername: string) {
  return resolve(process.cwd(), `${targetPathRoot}${foldername}`);
}
export const targetPathRoot = 'source/projects/';

export function isFolderSync(path: string) {
  try {
    const stat = statSync(path);
    // process.stdout.write(JSON.stringify(stat));
    return stat.isDirectory();
  } catch (err) {
      // if it's simply a not found error
    if (isErrorNotFound(err)) {
      return false;
    }
      //othewise throw the error
    throw err;
  }
}

/**
 * Util function we will reuse to check if the caught error is simply a "not found" error
 *
 */
function isErrorNotFound(err: any) {
  return err.code === 'ENOENT';
}
