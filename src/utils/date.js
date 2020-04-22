const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const formatDate = isoDate => {
  let date = new Date(isoDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

const findLastMonth = monthIdx => {
  const lastMonth = monthIdx === 0 ? 11 : monthIdx - 1;

  return lastMonth;
};

const filterMatchesByMonth = (items, timeFrame) => {
  return items.filter(item => {
    const postDate = new Date(item.published_at);
    const postMonth = postDate.getMonth();

    const postYear = postDate.getFullYear();
    const now = new Date();
    const month =
      timeFrame === "current" ? now.getMonth() : findLastMonth(now.getMonth());
    const year = now.getFullYear();

    if (postMonth === month && postYear === year) {
      return true;
    }
    return false;
  });
};

export { formatDate, filterMatchesByMonth };
