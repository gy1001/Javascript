const val = (+{} + [])[+[]]
console.log(val) // N

/*

(+{} + [])[+[]]
// +{}  => NaN
(NaN + [])[+[]]
// [] 隐式转换 ''
(NaN + '')[+[]]
// NaN + '' => 'NaN'
('NaN')[+[]]
// +[] => 0
('NaN')[0]
// 'N'

*/
