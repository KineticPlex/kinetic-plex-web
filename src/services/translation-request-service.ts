import BaseEndPoint from "../constants/base/base-endpoint";
import BaseService from "./base/base-service";
import type { CreateOrUpdateTranslationRequest } from "../dtos/translation-requests/create-or-update-translation-request";

class TranslationRequestService extends BaseService {
  
  public static getAll = async <T>(): Promise<T> => {
    const headers = this.getHeaders();
    const url = `${BaseEndPoint.BASE}translationRequests`;

    const promise = new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'FETCH_API',
        url: url,
        method: 'GET',
        headers: headers
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (response && response.success) {
          resolve(response.data as T);
        } else {
          reject(response?.error || 'Unknown error fetching data');
        }
      });
    });

    return promise as Promise<T>;
  }

  public static create = async <T>(translationRequest: CreateOrUpdateTranslationRequest): Promise<T> => {
    const headers = this.getHeaders();
    const url = `${BaseEndPoint.BASE}/translationRequests`;

    const promise = new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'FETCH_API',
        url: url,
        method: 'POST',
        headers: headers,
        body: translationRequest
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (response && response.success) {
          resolve(response.data as T);
        } else {
          reject(response?.error || 'Unknown error creating data');
        }
      });
    });

    return promise as Promise<T>;
  }
}

export default TranslationRequestService;