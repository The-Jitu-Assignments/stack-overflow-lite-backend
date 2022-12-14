exports.getDays = (data) => {
  return data.map(item => {
    let todaysDate = new Date();
    let itemDate = item.date;
    let diffTime = Math.ceil((todaysDate - itemDate) / (1000 * 60 * 60 * 24));
    return {
      ...item,
      days: `${diffTime > 1 ? `${diffTime} days`: `${diffTime} day`}`
    }
  })
}

// let newData = questions.map(qn => {
//       questionId = qn.id;
//       let todaysDate = new Date();
//       let qnDate = qn.date;
//       let diffTime = Math.ceil((todaysDate - qnDate) / (1000 * 60 * 60 * 24))
//       return {
//         ...qn,
        
//       }