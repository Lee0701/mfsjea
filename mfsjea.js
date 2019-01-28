const REGEX_2350 = /[가-각간갇-갊감-갗같-객갠갤갬-갭갯-갱갸-갹갼걀걋걍걔걘걜거-걱건걷-걸걺검-겁것-겆겉-게겐겔겜-겝겟-겡겨-겪견겯-결겸-겹겻-경곁계곈곌곕곗고-곡곤곧-골곪곬곯-곱곳공-곶과-곽관괄괆괌-괍괏광괘괜괠괩괬-괭괴-괵괸괼굄-굅굇굉교굔굘굡굣구-국군굳-굶굻-굽굿궁-궂궈-궉권궐궜-궝궤궷귀-귁귄귈귐-귑귓규균귤그-극근귿-긁금-급긋긍긔기-긱긴긷-길긺김-깁깃깅-깆깊까-깎깐깔깖깜-깝깟-깡깥깨-깩깬깰깸-깹깻-깽꺄-꺅꺌꺼-꺾껀껄껌-껍껏-껑께-껙껜껨껫껭껴껸껼꼇-꼈꼍꼐꼬-꼭꼰꼲꼴꼼-꼽꼿꽁-꽃꽈-꽉꽐꽜-꽝꽤-꽥꽹꾀꾄꾈꾐-꾑꾕꾜꾸-꾹꾼꿀꿇-꿉꿋꿍-꿎꿔꿜꿨-꿩꿰-꿱꿴꿸뀀-뀁뀄뀌뀐뀔뀜-뀝뀨끄-끅끈끊끌끎끓-끕끗끙끝끼-끽낀낄낌-낍낏낑나-낚난낟-낢남-납낫-낯낱낳-낵낸낼냄-냅냇-냉냐-냑냔냘냠냥너-넉넋-넌널넒-넓넘-넙넛-넝넣-넥넨넬넴-넵넷-넹녀-녁년녈념-녑녔-녕녘녜녠노-녹논놀놂놈-놉놋농높-놔놘놜놨뇌뇐뇔뇜-뇝뇟뇨-뇩뇬뇰뇹뇻뇽누-눅눈눋-눌눔-눕눗눙눠눴눼뉘뉜뉠뉨-뉩뉴-뉵뉼늄-늅늉느-늑는늘-늚늠-늡늣능-늦늪늬늰늴니-닉닌닐닒님-닙닛닝닢다-닦단닫-닯닳-답닷-닻닿-댁댄댈댐-댑댓-댕댜더-덖던덛-덜덞-덟덤-덥덧덩덫덮데-덱덴델뎀-뎁뎃-뎅뎌뎐뎔뎠-뎡뎨뎬도-독돈돋-돌돎돐돔-돕돗동돛돝돠돤돨돼됐되된될됨-됩됫됴두-둑둔둘둠-둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드-득든듣-들듦듬-듭듯등듸디-딕딘딛-딜딤-딥딧-딪따-딱딴딸땀-땁땃-땅땋-땍땐땔땜-땝땟-땡떠-떡떤떨떪-떫떰-떱떳-떵떻-떽뗀뗄뗌-뗍뗏-뗑뗘뗬또-똑똔똘똥똬똴뙈뙤뙨뚜-뚝뚠뚤뚫-뚬뚱뛔뛰뛴뛸뜀-뜁뜅뜨-뜩뜬뜯-뜰뜸-뜹뜻띄띈띌띔-띕띠띤띨띰-띱띳띵라-락란랄람-랍랏-랒랖-랙랜랠램-랩랫-랭랴-략랸럇량러-럭런럴럼-럽럿-렁렇-렉렌렐렘-렙렛렝려-력련렬렴-렵렷-령례롄롑롓로-록론롤롬-롭롯롱롸롼뢍뢨뢰뢴뢸룀-룁룃룅료룐룔룝룟룡루-룩룬룰룸-룹룻룽뤄뤘뤠뤼-뤽륀륄륌륏륑류-륙륜률륨-륩륫륭르-륵른를름-릅릇릉-릊릍-릎리-릭린릴림-립릿링마-막만많-맒맘-맙맛망-맞맡맣-맥맨맬맴-맵맷-맺먀-먁먈먕머-먹먼멀멂멈-멉멋멍-멎멓-멕멘멜멤-멥멧-멩며-멱면멸몃-명몇몌모-목몫-몬몰몲몸-몹못몽뫄뫈뫘-뫙뫼묀묄묍묏묑묘묜묠묩묫무-묶문묻-묾뭄-뭅뭇뭉뭍뭏-뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미-믹민믿-밀밂밈-밉밋-밍및밑바-반받-밟밤-밥밧방밭배-백밴밸뱀-뱁뱃-뱅뱉뱌-뱍뱐뱝버-벅번벋-벌벎범-법벗벙-벚베-벡벤벧-벨벰-벱벳-벵벼-벽변별볍볏-병볕볘볜보-볶본볼봄-봅봇봉봐봔봤봬뵀뵈-뵉뵌뵐뵘-뵙뵤뵨부-북분붇-붊붐-붑붓붕붙-붚붜붤붰붸뷔-뷕뷘뷜뷩뷰뷴뷸븀븃븅브-븍븐블븜-븝븟비-빅빈빌빎빔-빕빗빙-빛빠-빡빤빨빪빰-빱빳-빵빻-빽뺀뺄뺌-뺍뺏-뺑뺘-뺙뺨뻐-뻑뻔뻗-뻘뻠뻣-뻥뻬뼁뼈-뼉뼘-뼙뼛-뼝뽀-뽁뽄뽈뽐-뽑뽕뾔뾰뿅뿌-뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨-쁩삐-삑삔삘삠-삡삣삥사-삭삯-산삳-삶삼-삽삿-상샅새-색샌샐샘-샙샛-생샤-샥샨샬샴-샵샷샹섀섄섈섐섕서-선섣-설섦-섧섬-섭섯-성섶세-섹센셀셈-셉셋-셍셔-셕션셜셤-셥셧-셩셰셴셸솅소-솎손솔솖솜-솝솟송솥솨-솩솬솰솽쇄쇈쇌쇔쇗-쇘쇠쇤쇨쇰-쇱쇳쇼-쇽숀숄숌-숍숏숑수-숙순숟-술숨-숩숫숭숯숱-숲숴쉈쉐-쉑쉔쉘쉠쉥쉬-쉭쉰쉴쉼-쉽쉿슁슈-슉슐슘슛슝스-슥슨슬-슭슴-습슷승시-식신싣-실싫-십싯싱싶싸-싹싻-싼쌀쌈-쌉쌌-쌍쌓-쌕쌘쌜쌤-쌥쌨-쌩썅써-썩썬썰썲썸-썹썼-썽쎄쎈쎌쏀쏘-쏙쏜쏟-쏠쏢쏨-쏩쏭쏴-쏵쏸쐈쐐쐤쐬쐰쐴쐼-쐽쑈쑤-쑥쑨쑬쑴-쑵쑹쒀쒔쒜쒸쒼쓩쓰-쓱쓴쓸쓺쓿-씁씌씐씔씜씨-씩씬씰씸-씹씻씽아-악안-않알-앎앓-압앗-앙앝-앞애-액앤앨앰-앱앳-앵야-약얀얄얇얌-얍얏양얕얗-얘얜얠얩어-억언-얹얻-얾엄-엊엌엎에-엑엔엘엠-엡엣엥여-엮연열엶-엷염-영옅-예옌옐옘-옙옛-옜오-옥온올-옮옰옳-옵옷옹옻와-왁완왈왐-왑왓-왕왜-왝왠왬왯왱외-왹왼욀욈-욉욋욍요-욕욘욜욤-욥욧용우-욱운울-욺움-웁웃웅워-웍원월웜-웝웠-웡웨-웩웬웰웸-웹웽위-윅윈윌윔-윕윗윙유-육윤율윰-윱윳융윷으-윽은을읊음-읍읏응-의읜읠읨읫이-익인일-읾잃-입잇-잊잎자-작잔잖-잘잚잠-잡잣-잦재-잭잰잴잼-잽잿-쟁쟈-쟉쟌쟎쟐쟘쟝쟤쟨쟬저-적전절젊점-접젓정-젖제-젝젠젤젬-젭젯젱져젼졀졈-졉졌-졍졔조-족존졸졺좀-좁좃종-좇좋-좍좔좝좟좡좨좼-좽죄죈죌죔-죕죗죙죠-죡죤죵주-죽준줄-줆줌-줍줏중줘줬줴쥐-쥑쥔쥘쥠-쥡쥣쥬쥰쥴쥼즈-즉즌즐즘-즙즛증지-직진짇-질짊짐-집짓징-짖짙-짚짜-짝짠짢짤짧짬-짭짯-짱째-짹짼쨀쨈-쨉쨋-쨍쨔쨘쨩쩌-쩍쩐쩔쩜-쩝쩟-쩡쩨쩽쪄쪘쪼-쪽쫀쫄쫌-쫍쫏쫑쫓쫘-쫙쫠쫬쫴쬈쬐쬔쬘쬠-쬡쭁쭈-쭉쭌쭐쭘-쭙쭝쭤쭸-쭹쮜쮸쯔쯤쯧쯩찌-찍찐찔찜-찝찡-찢찧-착찬찮찰참-찹찻-찾채-책챈챌챔-챕챗-챙챠챤챦챨챰챵처-척천철첨-첩첫-청체-첵첸첼쳄-쳅쳇쳉쳐쳔쳤쳬쳰촁초-촉촌촐촘-촙촛총촤촨촬촹최쵠쵤쵬-쵭쵯쵱쵸춈추-축춘출춤-춥춧충춰췄췌췐취췬췰췸-췹췻췽츄츈츌츔츙츠-측츤츨츰-츱츳층치-칙친칟-칡침-칩칫칭카-칵칸칼캄-캅캇캉캐-캑캔캘캠-캡캣-캥캬-캭컁커-컥컨컫-컬컴-컵컷-컹케-켁켄켈켐-켑켓켕켜켠켤켬-켭켯-켱켸코-콕콘콜콤-콥콧콩콰-콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠-쿡쿤쿨쿰-쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴-퀵퀸퀼큄-큅큇큉큐큔큘큠크-큭큰클큼-큽킁키-킥킨킬킴-킵킷킹타-탁탄탈-탉탐-탑탓-탕태-택탠탤탬-탭탯-탱탸턍터-턱턴털턺텀-텁텃-텅테-텍텐텔템-텝텟텡텨텬텼톄톈토-톡톤톨톰-톱톳통톺톼퇀퇘퇴퇸툇툉툐투-툭툰툴툼-툽툿퉁퉈퉜퉤튀-튁튄튈튐-튑튕튜튠튤튬튱트-특튼튿-틀틂틈-틉틋틔틘틜틤-틥티-틱틴틸팀-팁팃팅파-팎판팔팖팜-팝팟-팡팥패-팩팬팰팸-팹팻-팽퍄-퍅퍼-퍽펀펄펌-펍펏-펑페-펙펜펠펨-펩펫펭펴편펼폄-폅폈-평폐폘폡폣포-폭폰폴폼-폽폿퐁퐈퐝푀푄표푠푤푭푯푸-푹푼푿-풀풂품-풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔-픕픗피-픽핀필핌-핍핏핑하-학한할핥함-합핫항해-핵핸핼햄-햅햇-행햐향허-헉헌헐헒험-헙헛헝헤-헥헨헬헴-헵헷헹혀-혁현혈혐-협혓-형혜혠혤혭호-혹혼홀홅홈-홉홋홍홑화-확환활홧황홰-홱홴횃횅회-획횐횔횝횟횡효횬횰횹횻후-훅훈훌훑훔훗훙훠훤훨훰훵훼-훽휀휄휑휘-휙휜휠휨-휩휫휭휴-휵휸휼흄흇흉흐-흑흔흖-흙흠-흡흣흥흩희흰흴흼-흽힁히-힉힌힐힘-힙힛힝]/g
const REGEX_JAMO = /[ㄱ-ㅎㅏ-ㅣᄀ-하-ᅵᆨ-ᇂ]/g

const REGEX_NUMBERS = /[0-9,.+\-*\/%]{2,}/g
const REGEX_PARENTHESIS = /\(.+\)/g

const STD_CHO = 'ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
const STD_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'
const STD_JONG = 'ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ'

const COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'

const CONVERT_CHO = 'ᄀᄁ ᄂ  ᄃᄄᄅ       ᄆᄇᄈ ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
const CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ ᆹᆺᆻᆼᆽ ᆾᆿᇀᇁᇂ'

const HANGUL_SYLLABLE_3 = /([ᄀ-ᄒ]+)([ᅡ-ᅵ]+)([ᆨ-ᇂ]*)/g
const HANGUL_SYLLABLE_2 = /([ㄱ-ㅎ])([ㅏ-ㅣ][ㅏ-ㅣ]?)([ㄱ-ㅎ]?[ㄱ-ㅎ]?)(?![ㅏ-ㅣ])/g

const LAYOUT_ALPHABET_QWERTY = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWeErRtTyYuUiIoOpP[{]}aAsSdDfFgGhHjJkKlL;:\'"zZxXcCvVbBnNmM,<.>/?'
const LAYOUT_ALPHABET_DVORAK = ' `~1!2@3#4$5%6^7&8*9(0)[{]}\\|\'",<.>pPyYfFgGcCrRlL/?=+aAoOeEuUiIdDhHtTnNsS\-_;:qQjJkKxXbBmMwWvVzZ'
const LAYOUT_ALPHABET_COLEMAK = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWfFpPgGjJlLuUyY;:[{]}aArRsStTdDhHnNeEiIoO\'"zZxXcCvVbBkKmM,<.>/?'

const ALPHABET_QWERTY = {name: 'Qwerty', layout: LAYOUT_ALPHABET_QWERTY}
const ALPHABET_DVORAK = {name: 'Dvorak', layout: LAYOUT_ALPHABET_DVORAK}
const ALPHABET_COLEMAK = {name: 'Colemak', layout: LAYOUT_ALPHABET_COLEMAK}

const ALPHABET_LAYOUTS = [ALPHABET_QWERTY, ALPHABET_DVORAK, ALPHABET_COLEMAK]

const LAYOUT_DUBEOL_STANDARD = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|ㅂㅃㅈㅉㄷㄸㄱㄲㅅㅆㅛㅛㅕㅕㅑㅑㅐㅒㅔㅖ[{]}ㅁㅁㄴㄴㅇㅇㄹㄹㅎㅎㅗㅗㅓㅓㅏㅏㅣㅣ;:\'"ㅋㅋㅌㅌㅊㅊㅍㅍㅠㅠㅜㅜㅡㅡ,<.>/?'

const LAYOUT_SEBEOL_390 = ' `~ᇂᆽᆻ@ᆸ#ᅭ$ᅲ%ᅣ^ᅨ&ᅴ*ᅮ(ᄏ)-_=+\\|ᆺᇁᆯᇀᅧᆿᅢᅤᅥ;ᄅ<ᄃ7ᄆ8ᄎ9ᄑ>[{]}ᆼᆮᆫᆭᅵᆰᅡᆩᅳ/ᄂ\'ᄋ4ᄀ5ᄌ6ᄇ:ᄐ"ᆷᆾᆨᆹᅦᆱᅩᆶᅮ!ᄉ0ᄒ1,2.3ᅩ?'
const LAYOUT_SEBEOL_FINAL = ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'

const COMB_DUBEOL_STANDARD = {cho: {}, jung: {'ㅗㅏ':'ㅘ', 'ㅗㅐ':'ㅙ', 'ㅗㅣ':'ㅚ', 'ㅜㅓ':'ㅝ', 'ㅜㅔ':'ㅞ', 'ㅜㅣ':'ㅟ', 'ㅡㅣ':'ㅢ'}, jong: {'ㄱㅅ':'ㄳ', 'ㄴㅈ':'ㄵ', 'ㄴㅎ':'ㄶ', 'ㄹㄱ':'ㄺ', 'ㄹㅁ':'ㄻ', 'ㄹㅂ':'ㄼ', 'ㄹㅅ':'ㄽ', 'ㄹㅌ':'ㄾ', 'ㄹㅍ':'ㄿ', 'ㄹㅎ':'ㅀ', 'ㅂㅅ':'ㅄ'}}

const COMB_SEBEOL_390 = {cho: {'ᄀᄀ':'ᄁ', 'ᄃᄃ':'ᄄ', 'ᄇᄇ':'ᄈ', 'ᄉᄉ':'ᄊ', 'ᄌᄌ':'ᄍ'}, jung: {'ᅩᅡ':'ᅪ', 'ᅩᅢ':'ᅫ', 'ᅩᅵ':'ᅬ', 'ᅮᅥ':'ᅯ', 'ᅮᅦ':'ᅰ', 'ᅮᅵ':'ᅱ', 'ᅳᅵ':'ᅴ'}, jong: {'ᆨᆨ':'ᆩ', 'ᆨᆺ':'ᆪ', 'ᆫᆽ':'ᆬ', 'ᆫᇂ':'ᆭ', 'ᆯᆨ':'ᆰ', 'ᆯᆷ':'ᆱ', 'ᆯᆸ':'ᆲ', 'ᆯᆺ':'ᆳ', 'ᆯᇀ':'ᆴ', 'ᆯᇁ':'ᆵ', 'ᆯᇂ':'ᆶ', 'ᆸᆺ':'ᆹ', 'ᆺᆺ':'ᆻ'}}
const COMB_SEBEOL_FINAL = {cho: {'ᄀᄀ':'ᄁ', 'ᄃᄃ':'ᄄ', 'ᄇᄇ':'ᄈ', 'ᄉᄉ':'ᄊ', 'ᄌᄌ':'ᄍ'}, jung: {'ᅩᅡ':'ᅪ', 'ᅩᅢ':'ᅫ', 'ᅩᅵ':'ᅬ', 'ᅮᅥ':'ᅯ', 'ᅮᅦ':'ᅰ', 'ᅮᅵ':'ᅱ', 'ᅳᅵ':'ᅴ'}, jong: {}} // STRICT mode.

const SEBEOL_390 = {name: '세벌식 390', layout: LAYOUT_SEBEOL_390, combination: COMB_SEBEOL_390, beol: 3}
const SEBEOL_FINAL = {name: '세벌식 최종', layout: LAYOUT_SEBEOL_FINAL, combination: COMB_SEBEOL_390, beol: 3}
const DUBEOL_STANDARD = {name: '두벌식 표준', layout: LAYOUT_DUBEOL_STANDARD, combination: COMB_DUBEOL_STANDARD, beol: 2}

const HANGUL_LAYOUTS = [DUBEOL_STANDARD, SEBEOL_390, SEBEOL_FINAL]

const countRegex = (s, regex) => (s = s.match(regex)) ? s.length : 0
const count2350 = (s) => countRegex(s, REGEX_2350)
const countNumbers = (s) => {
  s = s.match(REGEX_NUMBERS)
  let score = 0
  if(s === null) return score
  s.forEach((c) => {
    score += c.length
  })
  return score
}

const convert = (str, fr, to) => [...str].map(c => to[fr.indexOf(c)] || c).join('')

const convertCompatibleCho = (c) => [...c].map(d => CONVERT_CHO[COMPAT_CHO.indexOf(d)])
const convertCompatibleJung = (c) => [...c].map(d => STD_JUNG[COMPAT_JUNG.indexOf(d)])
const convertCompatibleJong = (c) => c === '' ? '' : [...c].map(d => CONVERT_JONG[COMPAT_CHO.indexOf(d)])

const dudgks = (str, fr, to) => convert(str, fr.layout, to.layout).replace(HANGUL_SYLLABLE_2, (match, cho, jung, jong) => convertCompatibleCho(to.combination.cho[cho] || cho) + convertCompatibleJung(to.combination.jung[jung] || jung) + convertCompatibleJong(to.combination.jong[jong] || jong)).normalize('NFC')
const jeamfs = (str, fr, to) => convert(str, fr.layout, to.layout).replace(HANGUL_SYLLABLE_3, (match, cho, jung, jong) => (to.combination.cho[cho] || cho) + (to.combination.jung[jung] || jung) + (to.combination.jong[jong] || jong)).normalize('NFC')

const jeamfsORdudgks = (str, fr, to) => to.beol == 3 ? jeamfs(str, fr, to) : dudgks(str, fr, to)

const output = (result, alphabet, hangul) => ({source: alphabet.name, destination: hangul.name, str: result, count: count2350(result), score: count2350(result)*10 + countNumbers(result) + countRegex(result, REGEX_PARENTHESIS)*10 - countRegex(result, REGEX_JAMO)*50})
const jeamfsList = (str) => ALPHABET_LAYOUTS.flatMap(alphabet => HANGUL_LAYOUTS.map(hangul => output(jeamfsORdudgks(str, alphabet, hangul), alphabet, hangul)))

const jeamfsAuto = function(str) {
  const list = jeamfsList(str)
  list.sort((a, b) => b.score - a.score)
  return list[0]
}

module.exports = {jeamfsList: jeamfsList, jeamfs: jeamfsAuto, count2350: count2350}
