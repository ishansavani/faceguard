import safeLocalStorage from "./safeLocalStorage";

export default class Utils {
  static cacheStorage = safeLocalStorage;

  static isObject(obj) {
    if (!obj) return false;
    return typeof obj === "function" || typeof obj === "object";
  }

  static isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static toBase64Unicode(str) {
    return window.btoa(encodeURIComponent(str));
  }

  static getCachedVariables(key) {
    try {
      const cachedVariables = {};
      for (let i = 0; i < this.cacheStorage.length; i++) {
        const item = this.cacheStorage.key(i);
        if (item) {
          const itemValue = this.cacheStorage.getItem(item);
          const base64Regex =
            /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
          if (base64Regex.test(item)) {
            const decodedKey = window.atob(item);
            const decodedValue = decodeURIComponent(window.atob(itemValue));
            cachedVariables[decodedKey] = this.isJSONString(decodedValue)
              ? JSON.parse(decodedValue)
              : decodedValue;
          } else {
            cachedVariables[item] = this.isJSONString(
              decodeURIComponent(itemValue),
            )
              ? JSON.parse(decodeURIComponent(itemValue))
              : decodeURIComponent(itemValue);
          }
        }
      }
      return key ? cachedVariables?.[key] : cachedVariables;
    } catch {
      this.cacheStorage.clear();
      return {};
    }
  }

  static capitalizeFirstLetterOfEachWord = (text) => {
    if (!text) return "";
    const normalized = text.replace(/-/g, " ");
    const words = normalized.split(/[\s_]+/);

    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return `${firstLetter}${restOfWord}`;
    });

    return capitalizedWords.join(" ");
  };

  static catchErrorResponse = (error) => {
    const errorData = error?.response?.data;
    const nestedError = errorData?.error;
    return (
      nestedError?.message ??
      nestedError ??
      errorData?.message ??
      error?.message ??
      "An error occurred while processing your request."
    );
  };

  static replaceBase64WithUrls = (content, fileData) => {
    const imageExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
    ];
    const regex = /\[([^\]]+)\]\(([^)]*)\)/g;

    return content.replace(regex, (match, fileName, urlString) => {
      if (/^['"]?data:/.test(urlString)) {
        const fileInfo = fileData?.find((item) => item.name === fileName);
        if (fileInfo) {
          const isImage = imageExtensions.includes(
            fileInfo?.ext?.toLowerCase(),
          );
          return isImage
            ? `[${fileName}](${fileInfo.url})`
            : `[${fileName}]('${fileInfo.url}')`;
        }
      }
      return match;
    });
  };

  static base64ToFile = (base64Data, filename) => {
    const matches = base64Data?.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid Base64 format");
    }
    const mimeType = matches[1];
    const byteString = atob(matches[2]);
    const buffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }
    return new File([buffer], filename, { type: mimeType });
  };

  static getNameFromEmail = (email) => {
    if (typeof email !== "string" || !email.includes("@")) return "";
    const namePart = email.split("@")[0];
    const cleaned = namePart.replace(/[._-]+/g, " ");
    const formatted = cleaned
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formatted;
  };

  static toPercentage(value, decimals = 2) {
    if (typeof value !== "number" || isNaN(value)) return "Invalid number";
    return `${(value * 100).toFixed(decimals)}%`;
  }
}
