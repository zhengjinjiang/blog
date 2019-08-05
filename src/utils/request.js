import axios from 'axios';

const API_BASE = 'http://www.zheng-jinjiang.com';

function request(options) {
  return new Promise((resolve, reject) => {
    if (options) {
      options.headers = {
        ...options.headers,
      };
      options.withCredentials = true;
    }
    axios(options)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  /**
   * get request
   * @param {String} url
   * @param {Object} options
   */
  get(url, options) {
    return request({
      ...options,
      url: API_BASE + url,
      method: 'get',
    });
  },
};
