import * as storageConstant from "../storage.constant";

const storageConstantKeys = Object.values(storageConstant);

const getFlags = () =>
  new Promise((resolve, reject) => {
    if (!chrome.storage?.sync) {
      return reject();
    }

    chrome.storage?.sync?.get(storageConstantKeys).then((data: any) => {
      return resolve(
        Object.fromEntries(
          storageConstantKeys.map((key) => [key, data[key] ?? true])
        )
      );
    });
  });

  export default getFlags;