const paginate = arr => {
  const arrLength = arr.length;
  const pages = [];
  const numPages = arrLength / 10;
  let start = 0;
  let end = 10;
  for (let i = 0; i <= numPages; i++) {
    pages.push(arr.slice(start, end));
    start += 10;
    end += 10;
  }
  return pages;
};

export default paginate;
