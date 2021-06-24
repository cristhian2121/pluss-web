export const assembleUrlPage = (forward, next, previous, final = 0) => {
  let urlSplit;
  switch (forward) {
    case "next":
      urlSplit = next ? next.split("?") : "";
      return `?${urlSplit[1]}`;
    case "previous":
      urlSplit = previous ? previous.split("?") : "";
      return `?${urlSplit[1]}`;
    case "last":
      urlSplit = next ? next.split("?") : "";
      return `?${urlSplit[1].split("&")[0]}&offset=${final}`;
    case "first":
      urlSplit = "?";
      return urlSplit;
    default:
      break;
  }
  return urlSplit;
};
