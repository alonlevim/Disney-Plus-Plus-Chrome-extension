import * as storageConstant from "../storage.constant";

const storageConstantKeys = Object.values(storageConstant);

const getFlags = () =>
  new Promise((resolve, reject) => {
    if (!chrome.storage?.local) {
      return reject();
    }

    const sync = chrome.storage?.sync?.get(storageConstantKeys);
    const local = chrome.storage?.local?.get(storageConstantKeys);

    Promise.all([sync, local])
      .then((list: any[]) => {
        if (Array.isArray(list) && list.length) {
          const obj: any = {};

          list.forEach((data) => {
            Object.keys(data).forEach((key: string) => {
              obj[key] = data[key];
            });
          });

          return resolve(obj);
        }
      });
  });

export default getFlags;