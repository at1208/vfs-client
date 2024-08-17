export const constructURL = (url, queryParams = {}) => {
  // Filter out queryParams with empty values
  const filteredParams = Object.entries(queryParams)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  // Convert the filtered params to a query string
  const params = new URLSearchParams(filteredParams).toString();

  // Construct the final URL
  return params ? `${url}?${params}` : url;
};

export const toTitleCase = (str) => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/_./g, (match) => " " + match.charAt(1).toUpperCase()) // Replace underscores with space and capitalize the following character
    .replace(/^\w/, (match) => match.toUpperCase()); // Capitalize the first character of the entire string
};
