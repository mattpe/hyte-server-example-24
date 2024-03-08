/**
 * Fetches JSON data from API
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 * @return {Object} response json data
 */
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(
        `${response.status} - ${response.statusText} -
         ${errorData.error?.message}`,
      );
      console.error(errorData?.error);
      throw error;
    }
    return await response.json();
  } catch (error) {
    console.error('fetchData() error', error);
    return {};
  }
};

export {fetchData};
