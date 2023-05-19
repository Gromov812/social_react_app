export const generatePagination = (curPage, totalPages) => {

    let res = [];

    if (totalPages < 7) {
      for (let i = 1; i <= totalPages; i++) {
        res.push(i)
      }
    }
    else {
      if (curPage <= 3) {
        for (let i = 1; i <= 7; i++) {
          res.push(i);
        }
      }
      else if (curPage >= totalPages - 3) {
        for (let i = curPage - (6 - (totalPages - curPage)); i <= totalPages; i++) {
          res.push(i);
        }
      }

      else if (curPage > 3) {
        for (let i = curPage - 3; i < curPage + 4; i++) {
          res.push(i);
        }
      }
    }

    return res
}
