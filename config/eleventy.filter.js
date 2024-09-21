const { DateTime } = require('luxon')

const strayFilterHtmlDateString = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
}

const strayFilterReadableDate = (dateObj, format, zone) => {
  // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
    format || 'dd LLLL yyyy'
  )
}

const strayInit11tyFilter = (cfg) => {
  cfg.addFilter('readableDate', strayFilterReadableDate)
  cfg.addFilter('htmlDateString', strayFilterHtmlDateString)
}

module.exports = {
  strayInit11tyFilter,
}
