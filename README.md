# mfsjea

한/영 전환을 하지 않고 영문 상태로 친 타자를 고쳐 줍니다.

지원하는 자판 내에서 어떤 영문 자판으로 어떤 한글 타자를 치든 바로잡아 줍니다.

※ 'mfsjea'은 영문 쿼티 상태에서 세벌식으로 '한영'을 타자한 결과입니다.


## 사용법

```js
const {Mfsjea} = require('mfsjea')
```


### 기본 영한 변환

```js
const mfsjea = Mfsjea.DEFAULT_ENKO // 기본 영한 변환 인스턴스
```

```js
mfsjea.convertBest('mfsjea')
/* ConvertResult {
     input: 'mfsjea',
     output: '한영',
     score: 0.6854639684106614,
     inputName: 'Qwerty',
     outputName: '세벌식 390' }
*/
```

```js
const result = mfsjea.convertBest('itoege;npt eto ahpehefv')
result.output // '한영키가 안 먹어요.' : 변환된 텍스트
result.score // 0.42900812169074765 : 변환된 텍스트의 점수 (최적의 결과를 뽑아낼 때 쓰임)
result.inputName // 'Dvorak' : 인식된 입력 자판 종류 (이 경우에서는 영문 자판임)
result.outputName // '두벌식 표준' : 인식된 출력 자판 종류 (이 경우에서는 한글 자판임)
```

```js
mfsjea.convertBest('0vwupxndjv kcogwksx').output
// '콜맥으로 세벌식'
```

```js
mfsjea.convertAll('fltmxm') // 모든 변환 결과를 리스트로 반환
/* [ ConvertResult {
     ...
     } ... ]
*/
```


### 사용자 지정 인스턴스 생성

두벌식 표준 - 영문 쿼티 변환 예시입니다.

```js
const anotherMfsjea = new Mfsjea([Mfsjea.LAYOUTS.DUBEOL_STANDARD], [Mfsjea.LAYOUTS.QWERTY], [])
// 입력 자판 리스트, 출력 자판 리스트, 평가 항목 리스트
```

```js
anotherMfsjea.convertBest('쏘ㅑㄴ ㅑㄴ ㅁ ㅅㄷㄴㅅ').output
// 'This is a test'
```

