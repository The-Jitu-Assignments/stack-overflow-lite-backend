exports.getDays = (data) => {
  return data.map(item => {
    let todaysDate = new Date();
    let itemDate = item.date;
    let diffTime = Math.ceil((todaysDate - itemDate) / (1000 * 60 * 60 * 24));

    let time;

    if (diffTime < 1) {
      time = 'A few mins'
    } else {
      time = `${diffTime > 1 ? `${diffTime} days`: `${diffTime} day`}`
    }

    return {
      ...item,
      days: time
    }
  })
}
