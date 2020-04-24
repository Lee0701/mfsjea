# mfsjea

한/영 전환을 하지 않고 영문 상태로 친 타자를 고쳐 줍니다.

지원하는 자판 내에서 어떤 영문 자판으로 어떤 한글 타자를 치든 바로잡아 줍니다.

※ 'mfsjea'은 영문 쿼티 상태에서 세벌식으로 '한영'을 타자한 결과입니다.


## 사용법
```js
const mfsjea = require('./mfsjea.js')

mfsjea.jeamfs('mfsjea') // { name: 'Qwerty - 세벌식 390', str: '한영', count: 2, score: 2 }

mfsjea.jeamfs('itoege;npt eto ahpehefv') // { name: 'Dvorak - 두벌식 표준', str: '한영키가 안 먹어요.', count: 8, score: 8 }

const result = mfsjea.jeamfs('0vwupxndjv kcogwksx') // { name: 'Colemak - 세벌식 390', str: '콜맥으로 세벌식', count: 7, score: 7 }
result.name // 'Colemak - 세벌식 390' : 인식된 한글 - 영문 자판 종류
result.str // '콜맥으로 세벌식' : 변환된 한글
result.score // 7 : 변환된 한글의 점수 (최적의 결과를 뽑아낼 때 쓰임)

mfsjea.jeamfsList('fltmxm') // [ ... ]
```
