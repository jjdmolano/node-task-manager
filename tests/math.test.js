const { calculateTip } = require('../src/math')

test('Test if calc tip works', () => {
    const total = calculateTip(10, .3)

    if (total !== 13) {
        throw new Error(`Total tip should be 13. Got ${total}`)
    }
})
