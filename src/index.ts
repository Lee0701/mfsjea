
interface Keyboard {
    name: string
    convertFrom(input: string): number[]
    convertTo(input: number[]): string
}

interface Scorer {
    weight: number
    calculateScore(input: string): number
}

class SimpleKeyboard implements Keyboard {
    layout: string[]
    name: string
    constructor(name: string, layout: string[]) {
        this.name = name
        this.layout = layout
    }
    convertFrom(input: string): number[] {
        return input.split('').map(c => this.layout.indexOf(c))
    }
    convertTo(input: number[]): string {
        return input.map(i => this.layout[i]).join('')
    }
}

class Hangul2Keyboard extends SimpleKeyboard {
    static COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
    static COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
    static CONVERT_CHO = 'ᄀᄁ\0ᄂ\0\0ᄃᄄᄅ\0\0\0\0\0\0\0ᄆᄇᄈ\0ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
    static CONVERT_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'
    static CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ\0ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ\0ᆹᆺᆻᆼᆽ\0ᆾᆿᇀᇁᇂ'
    static COMPAT_JAMO = Hangul2Keyboard.COMPAT_CHO + Hangul2Keyboard.COMPAT_JUNG + Hangul2Keyboard.COMPAT_CHO
    static STANDARD_JAMO = Hangul2Keyboard.CONVERT_CHO + Hangul2Keyboard.CONVERT_JUNG + Hangul2Keyboard.CONVERT_JONG
    combinations: Map<string, string>
    decombinations: Map<string, string>
    constructor(name: string, layout: string[], combinations: Map<string, string>) {
        super(name, layout)
        this.combinations = combinations
        this.decombinations = new Map(Array.from(combinations.entries()).map(e => [e[1], e[0]]))
    }
    convertFrom(input: string): number[] {
        return super.convertFrom(this.standardJamoToCompatJamo(this.decombinate(input.normalize('NFD'))))
    }
    convertTo(input: number[]): string {
        return this.combinate(this.compatJamoToStandardJamo(super.convertTo(input))).normalize('NFC')
    }
    combinate(input: string): string {
        return input.split('').reduce((a, c) => {
            const sequence = a.charAt(a.length - 1) + c
            return a.slice(0, a.length - 1) + (this.combinations.get(sequence) || sequence)
        }, '')
    }
    decombinate(input: string): string {
        return input.split('').map(c => this.decombinations.get(c) || c).join('')
    }
    compatJamoToStandardJamo(input: string): string {
        const convertCho = (c: string) => c.split('').map(d => Hangul2Keyboard.CONVERT_CHO[Hangul2Keyboard.COMPAT_CHO.indexOf(d)]).join('')
        const convertJung = (c: string) => c.split('').map(d => Hangul2Keyboard.CONVERT_JUNG[Hangul2Keyboard.COMPAT_JUNG.indexOf(d)]).join('')
        const convertJong = (c) => c ? c.split('').map(d => Hangul2Keyboard.CONVERT_JONG[Hangul2Keyboard.COMPAT_CHO.indexOf(d)]).join('') : ''
        return input.replace(/([ㄱ-ㅎ])([ㅏ-ㅣ][ㅏ-ㅣ]?)([ㄱ-ㅎ]?[ㄱ-ㅎ]?)(?![ㅏ-ㅣ])/g, (_, cho, jung, jong) =>
                convertCho(cho) + convertJung(jung) + convertJong(jong))
    }
    standardJamoToCompatJamo(input: string): string {
        return input.split('').map(c => Hangul2Keyboard.COMPAT_JAMO[Hangul2Keyboard.STANDARD_JAMO.indexOf(c)] || c).join('')
    }
}

class Hangul3Keyboard extends SimpleKeyboard {
    combinations: Map<string, string>
    decombinations: Map<string, string>
    constructor(name: string, layout: string[], combinations: Map<string, string>) {
        super(name, layout)
        this.combinations = combinations
        this.decombinations = new Map(Array.from(combinations.entries()).map(e => [e[1], e[0]]))
    }
    convertFrom(input: string): number[] {
        return super.convertFrom(this.decombinate(input.normalize('NFD')))
    }
    convertTo(input: number[]): string {
        return this.combinate(super.convertTo(input)).normalize('NFC')
    }
    combinate(input: string): string {
        return input.split('').reduce((a, c) => {
            const sequence = a.charAt(a.length - 1) + c
            return a.slice(0, a.length - 1) + (this.combinations.get(sequence) || sequence)
        }, '')
    }
    decombinate(input: string): string {
        return input.split('').map(c => this.decombinations.get(c) || c).join('')
    }
}

class NonHangulPenaltyScorer implements Scorer {
    weight: number
    constructor(weight: number) {
        this.weight = weight
    }
    calculateScore(input: string): number {
        return -input.split('').filter(c => !(c >= '가' && c <= '힣')).length / input.length
    }
}

class Hangul2350Scorer implements Scorer {
    static HANGUL_2350_LIST = '가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝'
    weight: number
    constructor(weight: number) {
        this.weight = weight
    }
    calculateScore(input: string): number {
        return input.split('').filter(c => Hangul2350Scorer.HANGUL_2350_LIST.indexOf(c) !== -1).length / input.length
    }
}

class HangulSyllableFrequencyScorer implements Scorer {
    static SYLLABLE_FREQUENCY = '이다의는에을하한고가로기지사서은도를대정리자수시으있어구인나제국과그해전부것일적아연라성들상원여보장화주소동공조스경계용위우게학만개면되관문유선중산치신회발비분생내방무와세니물등할실통었미모러업교체진재안야명민간며단당요년거마금된오본했법합식없각였결영행때데력반설터려속운양현차종말형음술석바입역임않작히및건질표외강두까백권트르직불호심따처타태출파천남람던점감저난후포또특최크달예같능변북드프래책김노함박배추환열평증매울품약집군향근알초온급목더료른론확준토록활련격월광판키청습험번절류규루복량많피새레응받령란날편못항살았검측필망독린효립언육올축뉴느투병런름철협디든총될극담족억버순농별삼쟁율범길늘템져존접색너황막앞승침럼충돌찰림써송카손악씨코높참탄채렇창견쓰택잘겠줄폭워잡획균밀논누머겨갖염갈압쪽벌착완랑께희걸층큰친밝취액핵놓컴맞테졌허메네쳐왔베곡움혁왕뿐퓨글탈풍곳켜눈락뒤암좋밖애얼귀먹혼돼덕끝촉긴얻혀패폐죽럽째엔례홍됐티볼익득떤돈헌힘페찾윤끼융뜻델듯몇므났봉죄욱닌냐념훈님징둘풀엄웨넘률브떻즘칼커떠슬골틀빠값굴몰땅칙찬섬엇퇴몸탁녀케괴플봅팔싸렸앙객욕답롯숙릴략퍼즈싶왜곧흥좌꾸큼깨클떨킨센혹낮혔냉팀낸궁붙흡탕첫램옥척첨잠빈벽놀먼흐짐혈즉칠십널꽃픽턴섭닐션휴잔링씩갔곤휘끌짓킬넓맥믿칭납낙웃깊멀탐렬옛쇄렵갑넣쉽랜촌둔슨흔숨뢰녹뿌뛰혜묘짜펴읍헤쌀뇌콘밤켰룹춘맡텔빛벼읽벗블빨싱맹흘폴힌콜졸뜨듣쉬냈쿠딸잎쇠닥흑엘둥캐젊롭앉밑렌깔콩셈륙옷빌톱좀웅쌍묻웠츠잃벨엽됨쯤렀멸찍쳤혐솔푸첩슴붕잇랐닭빚묵톤끄찌꼭즐쓸뒷듭슈럴겪맛낼옮탑쓴몽겼빼핀룩슷늄홀꺼셨랄짝냥걱릇듬늦낭굳컨삭튼꼬쥐핑랍밥꿈삶섯낌팅씀겁봄겸긍쌓팽섰낳싼똑룡털숭컬곱덤셀끊짧멘끗맺렴옳흰럭뽑뮬씬얘젠끔맨뀌덜믹멍밭뚜텐횡끈잉잊봐꼴훨틸흉좁닫앗옆빙띠놈춤캠숫옹겹셋몬괄롤텍붉덩셔낱흙젖썼궤탓뷰꾼팩렷덴뼈랫겉쾌엑엉춰듈눌릭덮벤젤쁜섞륨칸딩떼냄깃닷룬긋훌릉틱묶쇼꼽녕곰펼힐쫓폰쏟렁쁘퀴껴칩덧틈륭톨룰갱옐둑뤄롱걷딱몫펜빗렉닉쩌떡훼굽밟곽돋왼닝펄댐싫윈뭐늬겐밍젓틴넷컫돕꾀픈낀턱뚫롬녁탱껍륜썩큐닿솟껏땐햇짚슘킴킹멋삽뉘픔씻싹펙띄켈샤헬딘끓릿뻗뭇뚝콤푼깝얽맑펌뭣캄꿔곁됩랭숲짙뇨칫줌튀벡랙팎떳샘깎찮켓핫뻔엿땀늙뿔컷윗쩔꿀뉜뜯쩍멈딴뚱죠궐팡헐앤짖쏘뜸랬꽂굵닦얀젝흠릅웬릎잖갓잭낄텅챙꺾굶헝딪랴핍낚멜셰붓띤앓줘닙녔볍딜깥솜킷넉엮컸뭉캔핏헨뮤얇닮몹멕잦봤씌촬휩빵뻐얹쑤겔핸엎쑥넥흩깜빔낡댄벅뭔밸뜩뜬낫밴렘갯옴갚캘봇튜팬펠걀젼뱃훔굿홉삐뱀뜰붐헛툼촛옵읊꽤툴듐깡낯렛잣쁨톡괘찔셧늠쪼썽쏠꿰솥갇꼈벙슐괜귤찢쿄콕쯔홈앵엌컵샌꽁눠뤼쥴앨볕늑싣횟썰퉁숱뱅룸얕즙둠웰뀐폼뿜듀븐륵엊둬맙덟룻풋뽕슭넬쨌셜줍짠넌줬꼼팥똥젯팍뭄뾰쭉랩텝뛴눗껑긁쿨럿뺀섹펀굉댁덱탠깐냇왈댕빅퍽뎀콧엷늪둡짱댈셉씹햄윌맘쥬쿵얄뮴깍댔엠폈삿뱉볏섣샀펩랗썬깅쭈갤츰궂쌈맵쿼췌돔넨돗켄꿩캡뭘탔뀔댓쉴툭덥꿇묽춧씁렐튿샐갸닛멎딛휠훑싯튬맴넋밋쬐킥휨샅팜잿빤쩡첼돛쉘탤훗숯콥찹뺄엣빽꽉늉촘찡밉춥꺽짤퐁볶푹녘냅헥껄멧탬맷쥔멱맏딕겊닳딧찧줏뺏곶윽깁눕썹좇뷔쉰샬쎄톰벳뺨뀜샴얗홑텃훤뜀멤팝켤앰짊쩐땜챔툰갠벚쁠웍뚤펑찼뎌슛퀘앎텀팁윙밧떴쐐텁칵똘뮌믐엾껌숟깻쏜깬멩놔챈찜뵈탭삯퓰렙핥뒹뽐벵맣귓귄잼숍놋뛸뎅왁췄튕잴밈꾹탉랏퀀콰겟찐얌갛샹뻘뺑꿍빴룽엥옻뽀빡뻑즌왠띨쉐텨곪펫팠눅혓닻얏꽝횃뤘웁섶괭쵸넙셸믈띈듦컥뗏잰쭐렝뼉츄끽쪄켠뎃눔잽딤쇳캉윷뻤땄낟슁꿋쓱뿍쉼찻휜큘뼛틔펭땡뫼휙맬뗀쟈갉쾅냘톈꼰씸퀸꿨촐헷갭헵겅땔솝덫챌꽹랠콸짭옅뵙둣뒀헴뻣깟뻥힙핌댑샛쏴갗뺌섀쿤뇽빻칡첸짢쳇옇쿡팻챗샨괸햐잤휼폿멥쏭챠텄깰궈뗄홧끙홋괌갹쐬꿎꽈헉곬솎꿉쑨컹왓슥깼볐닢캬숴넴탯폄힉퉈겋핼앴숀킵벰뮈펐흄뼘큽놨켐훅넝헹꼇맸헙튤꼐쌌넛틂빳뭏쥘쯧푯뎠웜꼿겻씰쭝쾰쫑띔몄캅됫퀵셍챘숄쩨뙈옭굼벧앳눴쁩옌떫윅쨋욘쨍껐쌔셴씽쇽뷴췹촨떵튈낍틋넜햅귐뭍뺐퓌죈넸댜긷깽믓샵빰긱땋벋짇븀픕쿰엡샷쳬톳쎈읜훠돠쌘쾨짬쑈믄죤펨푄뵐욜뷸낵휫먀냠츨땠쳄뱌죔삥젬홰욥켕뭡겆꾐빕쭙귈걔뵌콱곯뙤쉥셩켯짹쑹롸앱셌딥쏙졍곗쳉붑팰뎨놉죌띌쬘됴쩝흗뱄텟쫙쥰붇촤쟤꾜킁쪘읠졔묄쌩켁끕쫀쇤툐뗐풂쳔쎌얜팸숌뵤캥넒뮐캤퓐뜹껀탸콴갬멓섧쾡짰쉈휀뢴툇솨굄묏냑썅윔뗑읗퍄뉼찝숑쟀좡땟쬔뼁갰웩뒈샜웹삔녈롼눼횐윰쌉숩퀄삑퀭돤숏녜퀼챤챨겜뱁앝쭤낑읕멉얍훙띕첵켬슝꿜휑켸힛닯셤왬봬퓸윳귿쒸팼껸땃겄욤삣욧돎껭읒읓꿴흴뎡뻬휄눙팟꼍똬읔쐰팹읖쌕쥼츌뎬옜튄꾄훽띵꽥쒜쩜켑뇔쟌녑뮨쉿뇰볘궜쫄돐뎐솬먕텡캇텬텼덖롄캑쬠똔흽뽄냔읏왝긔쉔졈겡괼꺅웝홱펏좽첬뇩횔돨쟎퉤쟝깩엶죵궉빪뀨땁뤽륀낏훰왹쨈듸욀겯쨔캣뷜닺띰샥옘퀑뉠뗌럇뫄팖풔룀뎁룔챕큠퓽뉨큭뵀쫏눋췻곌쫘벱좆퇘츤힝짼윕쨉룐솽샙놂튱걋젱뀄쵤쿱쿳굇틉졀윱틘싻뻠밌묜괵붜붸꾕큄큇뗘좃껜벴옰쌜츙쌤좟뼝쭁좨깠쭌놘쭘늚섦븍퍅쮸걘읨뭅뿅랸늡넵쏀륄빎왱쉠쀼줴멨쥑쏩욈쥠폅롑돝뇐잗걍뒬쐼몃뇜딨퐈푀꺄쑬푠쑴몌쒀뎔챵넹톄쒼휸쓩뱍풩뱐삵켭뱝쓿웡톺톼쟨덛뜁뵘깆흼뢸뵨짯랒툿먈뺘퉜랖'
    weight: number
    syllableFrequency: string
    constructor(weight: number, syllableFrequency: string = HangulSyllableFrequencyScorer.SYLLABLE_FREQUENCY) {
        this.weight = weight
        this.syllableFrequency = syllableFrequency
    }
    calculateScore(input: string): number {
        return input.split('').map(c => (this.syllableFrequency.indexOf(c) || 0) / this.syllableFrequency.length)
                .reduce((a, c) => a + c) / input.length
    }
}

class ConvertResult {
    input: string
    output: string
    score: number
    inputName: string
    outputName: string
    constructor(input: string, output: string, score: number, inputName: string, outputName: string) {
        this.input = input
        this.output = output
        this.score = score
        this.inputName = inputName
        this.outputName = outputName
    }
    applyScore(score: number) {
        return new ConvertResult(this.input, this.output, score, this.inputName, this.outputName)
    }
}

class Mfsjea {
    static LAYOUTS = {
        QWERTY: new SimpleKeyboard('Qwerty', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWeErRtTyYuUiIoOpP[{]}aAsSdDfFgGhHjJkKlL;:\'"zZxXcCvVbBnNmM,<.>/?'.split('')),
        DVORAK: new SimpleKeyboard('Dvorak', ' `~1!2@3#4$5%6^7&8*9(0)[{]}\\|\'",<.>pPyYfFgGcCrRlL/?=+aAoOeEuUiIdDhHtTnNsS\-_;:qQjJkKxXbBmMwWvVzZ'.split('')),
        COLEMAK: new SimpleKeyboard('Colemak', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWfFpPgGjJlLuUyY;:[{]}aArRsStTdDhHnNeEiIoO\'"zZxXcCvVbBkKmM,<.>/?'.split('')),
        DUBEOL_STANDARD: new Hangul2Keyboard('두벌식 표준', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|ㅂㅃㅈㅉㄷㄸㄱㄲㅅㅆㅛㅛㅕㅕㅑㅑㅐㅒㅔㅖ[{]}ㅁㅁㄴㄴㅇㅇㄹㄹㅎㅎㅗㅗㅓㅓㅏㅏㅣㅣ;:\'"ㅋㅋㅌㅌㅊㅊㅍㅍㅠㅠㅜㅜㅡㅡ,<.>/?'.split(''), new Map([['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᅳᅵ', 'ᅴ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ']])),
        SEBEOL_390: new Hangul3Keyboard('세벌식 390', ' `~ᇂᆽᆻ@ᆸ#ᅭ$ᅲ%ᅣ^ᅨ&ᅴ*ᅮ(ᄏ)-_=+\\|ᆺᇁᆯᇀᅧᆿᅢᅤᅥ;ᄅ<ᄃ7ᄆ8ᄎ9ᄑ>[{]}ᆼᆮᆫᆭᅵᆰᅡᆩᅳ/ᄂ\'ᄋ4ᄀ5ᄌ6ᄇ:ᄐ"ᆷᆾᆨᆹᅦᆱᅩᆶᅮ!ᄉ0ᄒ1,2.3ᅩ?'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᆨᆨ', 'ᆩ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ'], ['ᆺᆺ', 'ᆻ']])),
        SEBEOL_FINAL: new Hangul3Keyboard('세벌식 최종', ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᆨᆨ', 'ᆩ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ'], ['ᆺᆺ', 'ᆻ']])),
        SEBEOL_FINAL_STRICT: new Hangul3Keyboard('세벌식 최종 (정석)', ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ']])),
    }
    static DEFAULT_ENKO = new Mfsjea([Mfsjea.LAYOUTS.QWERTY, Mfsjea.LAYOUTS.DVORAK, Mfsjea.LAYOUTS.COLEMAK], [Mfsjea.LAYOUTS.DUBEOL_STANDARD, Mfsjea.LAYOUTS.SEBEOL_390, Mfsjea.LAYOUTS.SEBEOL_FINAL], [new NonHangulPenaltyScorer(5), new Hangul2350Scorer(10), new HangulSyllableFrequencyScorer(1)])
    inputKeyboards: Keyboard[]
    outputKeyboards: Keyboard[]
    scorers: Scorer[]
    constructor(inputKeyboards: Keyboard[], outputKeyboards: Keyboard[], scorers: Scorer[]) {
        this.inputKeyboards = inputKeyboards
        this.outputKeyboards = outputKeyboards
        this.scorers = scorers
    }
    score(result: ConvertResult): number {
        return this.scorers.map(scorer => scorer.calculateScore(result.output) * scorer.weight).reduce((a, c) => a + c) / this.scorers.map(scorer => scorer.weight).reduce((a, c) => a + c)
    }
    convertAll(input: string): ConvertResult[] {
        return this.outputKeyboards.map(outputKeyboard => this.inputKeyboards.map(inputKeyboard => Mfsjea.convert(input, inputKeyboard, outputKeyboard))).flat()
    }
    scoreAll(results: ConvertResult[]): ConvertResult[] {
        return results.map(result => result.applyScore(this.score(result)))
    }
    convertBest(input: string): ConvertResult {
        return this.scoreAll(this.convertAll(input)).sort((a, b) => b.score - a.score)[0]
    }
    static convert(input: string, inputKeyboard: Keyboard, outputKeyboard: Keyboard): ConvertResult {
        const result = outputKeyboard.convertTo(inputKeyboard.convertFrom(input))
        return new ConvertResult(input, result, null, inputKeyboard.name, outputKeyboard.name)
    }
}

export default Mfsjea
