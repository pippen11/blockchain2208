const getQuery = (queryString) => {
  //쿼리스트링을 나누고 쿼리로 리턴
  if (!queryString) return {}; //없으면 빈객체

  const query = {};
  queryString = queryString.split("&");
  for (let i = 0; i < queryString.length; ++i) {
    const temp = queryString[i].split("=");
    query[temp[0].trim()] = temp[1].trim();
  }
  return query;
};

const getMessage = (lines) => {
  const headers = {};
  while (true) {
    const temp = lines.shift();
    if (!temp) break;

    const index = temp.indexOf(":");
    let value = temp.slice(index + 1).trim();
    if (!isNaN(+value)) value = +value;

    headers[
      temp[0].toLowerCase() + temp.slice(1, index).replaceAll("-", "").trim()
    ] = value;
  }
  let body = lines.join("");
  if (body) {
    if (
      global.isJson &&
      headers["contentType"].indexOf("application/json") > -1
    ) {
      body = JSON.parse(body);
    } else if (
      headers["contentType"].indexOf("application/x-www-form-urlencoded") > -1
    ) {
      body = getQuery(body);
      console.log(body);
    }
  }

  return { headers, body };
};

const parser = (data) => {
  const lines = data.split("\r\n");

  const firstLine = lines.shift().split(" ");

  const method = firstLine[0];
  const url = firstLine[1];
  const version = firstLine[2];

  const path = url.split("?")[0];
  const queryString = url.split("?")[1];
  const query = getQuery(queryString);

  const dataObj = getMessage(lines);

  return { method, url, version, path, query, ...dataObj };
};

module.exports = parser;
