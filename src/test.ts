const LEP = require('./index');

const requirements = 'REGISTED AND (SPECIAL OR INVITED)';
const listA = ['REGISTED', 'INVITED'];
const listB = ['SPECIAL', 'EXPERT'];

const resultA = LEP.parse(requirements, t => listA.includes(t));
const resultB = LEP.parse(requirements, t => listB.includes(t));
console.log({ resultA, resultB });

// Getting AST only
const ast = LEP.ast(requirements);
console.log({ ast });
