// end - start가 최대 표시 페이지 수가 되어야 함 주의 할 것 
const getRange = (start, end) => {
  return Array.from({ length: end - start }).map((_, index) => start + index);
};

module.exports = getRange;
