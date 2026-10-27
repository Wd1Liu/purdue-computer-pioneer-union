from pathlib import Path
P=Path(__file__).resolve().parents[1]/'dist/assets/reports'; P.mkdir(exist_ok=True,parents=True)
def svg(name,c,content):
    s=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 620" fill="none"><g stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{content}</g></svg>'''
    (P/(name+'.svg')).write_text(s)
def txt(x,y,t,c,size=11,opacity=1):return f'<text x="{x}" y="{y}" fill="{c}" stroke="none" font-family="Arial, sans-serif" font-size="{size}" letter-spacing="1.4" opacity="{opacity}">{t}</text>'
def rect(x,y,w,h,c,r=0,opacity=1):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" fill-opacity="{opacity}"/>'
# The compute die and its surrounding resources.
c='#e5bc68';s='<path d="M80 128H560M80 492H560M138 74V548M502 74V548" opacity=".14"/>'
for i in range(6):
 y=200+i*42;s+=f'<path d="M80 {y}H166L202 {y+20}H230M410 {y+20}H448L480 {y}H558" opacity=".42"/><circle cx="80" cy="{y}" r="3" fill="{c}"/><circle cx="558" cy="{y}" r="3" fill="{c}"/>'
s+='<rect x="199" y="170" width="242" height="281" rx="5" fill="#201d12"/><rect x="217" y="188" width="206" height="245" stroke-dasharray="2 8" opacity=".5"/><rect x="249" y="220" width="142" height="167" fill="#e5bc68" fill-opacity=".08"/>'
for x in range(264,390,21):s+=f'<path d="M{x} 233V373" opacity=".25"/>'
for y in range(233,374,20):s+=f'<path d="M264 {y}H377" opacity=".25"/>'
s+=txt(275,297,'TENSOR',c,13)+txt(285,320,'CORE',c,13)+txt(68,165,'DATA IN',c,9)+txt(470,165,'DATA OUT',c,9)
s+='<path d="M276 170V130H226V95M362 451V487H414V526M318 170V95M276 451V526" opacity=".65"/><circle cx="226" cy="95" r="4"/><circle cx="318" cy="95" r="4"/><circle cx="414" cy="526" r="4"/><circle cx="276" cy="526" r="4"/>'
s+=txt(247,412,'SCHEDULE / OVERLAP',c,9)+txt(253,558,'NOT JUST FLOPS',c,9,.7)
svg('chip-architecture',c,s)
# An experimental feedback loop over a precise coordinate field.
c='#86b9ef';s='<path d="M88 110V482H567" opacity=".4"/>'
for x in range(118,568,50):s+=f'<path d="M{x} 100V482" opacity=".1"/>'
for y in range(132,483,50):s+=f'<path d="M88 {y}H567" opacity=".1"/>'
s+='<path d="M102 441L141 417L177 435L216 363L254 381L296 317L330 330L371 259L416 277L453 204L502 227L548 158" stroke-width="2.5"/><path d="M102 441L141 417L177 435L216 363L254 381L296 317L330 330L371 259L416 277L453 204L502 227L548 158V482H102Z" fill="#86b9ef" fill-opacity=".04" stroke="none"/>'
for x,y in [(141,417),(216,363),(296,317),(371,259),(453,204),(548,158)]:s+=f'<circle cx="{x}" cy="{y}" r="4" fill="{c}"/>'
s+='<path d="M166 198V154H340M340 154l-9-6m9 6-9 6M478 382V424H303M303 424l9-6m-9 6 9 6" opacity=".7"/>'
for x,y,w,label,sub in [(115,194,160,'HYPOTHESIS','01 / RESEARCH'),(337,116,194,'EXPERIMENT','02 / DEVELOPMENT'),(303,397,152,'FEEDBACK','03 / EVALUATION')]:
 s+=f'<rect x="{x}" y="{y}" width="{w}" height="78" fill="#101a27"/>'+txt(x+17,y+28,sub,c,8,.7)+txt(x+17,y+54,label,c,12)
s+=txt(90,518,'THE SEARCH IS NOT THE TEST',c,10,.85)
svg('quant-experiments-hero',c,s)
# Physical linkage, trajectories, and language as a distinct supervisory input.
c='#eda27e';s='<path d="M82 491H562M96 504H550" opacity=".3"/><circle cx="327" cy="311" r="180" stroke-dasharray="2 10" opacity=".25"/><path d="M151 305A184 184 0 0 1 430 151" opacity=".5"/><path d="M430 151l-13-1m13 1-5-12" opacity=".5"/>'
s+='<path d="M199 474L223 365L334 284L403 335" stroke-width="40" stroke="#5b3928"/><path d="M199 474L223 365L334 284L403 335" stroke-width="16" stroke="#281b15"/>'
for x,y,r in [(199,474,25),(223,365,23),(334,284,20),(403,335,14)]:s+=f'<circle cx="{x}" cy="{y}" r="{r}" fill="#2d2019"/><circle cx="{x}" cy="{y}" r="{r/3}" fill="{c}"/>'
s+='<path d="M415 344l31 24-15 28M412 351l7 31-21 18" stroke-width="5"/><path d="M160 492v-29h74v29"/><rect x="435" y="419" width="64" height="70" fill="#eda27e" fill-opacity=".08"/><path d="M435 419l15-16h63l-14 16M499 419l14-16v70l-14 16" opacity=".5"/><path d="M408 365Q445 370 462 414" stroke-dasharray="5 7"/>'
s+='<path d="M254 102H470V173H339L314 198V173H254Z" fill="#281c18"/>'+txt(276,132,'LANGUAGE COACHING',c,10)+txt(276,154,'A DIFFERENT INPUT',c,8,.65)+txt(101,548,'OBSERVE',c,9,.7)+txt(276,548,'GUIDE',c,9,.7)+txt(442,548,'ACT',c,9,.7)
svg('robot-coaching',c,s)
# Diverging roads and alternate future trajectories.
c='#8bd6bc';s=''
for x,y,w,h in [(72,100,105,89),(91,223,86,91),(450,89,107,133),(459,255,87,73),(80,384,103,112),(433,407,115,98)]:
 s+=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#8bd6bc" fill-opacity=".025" opacity=".35"/>'
s+='<path d="M266 570V440Q266 360 322 310Q397 245 397 54" stroke-width="90" stroke="#1b3b30"/><path d="M267 450Q267 352 224 294Q195 251 195 56" stroke-width="52" stroke="#16342b"/>'
s+='<path d="M219 570V444Q219 332 291 274Q350 224 350 54M313 570V447Q313 386 354 348Q444 267 444 54" opacity=".55"/><path d="M266 570V440Q266 360 322 310Q397 245 397 54" stroke-dasharray="12 15" opacity=".5"/><path d="M267 450Q267 352 224 294Q195 251 195 56" stroke-dasharray="5 9" opacity=".55"/>'
s+='<rect x="249" y="438" width="34" height="62" rx="8" fill="#8bd6bc" fill-opacity=".2"/><rect x="254" y="449" width="24" height="24" rx="3"/><path d="M266 414Q277 361 322 321" stroke-width="4"/><path d="M313 324l9-3-1 10" stroke-width="2"/><path d="M249 413Q230 366 214 338" stroke-dasharray="4 6"/><circle cx="397" cy="170" r="56" opacity=".3"/><circle cx="397" cy="170" r="38" opacity=".5"/><circle cx="397" cy="170" r="6" fill="#8bd6bc"/>'
s+=txt(69,351,'WHAT IF?',c,11)+txt(422,355,'BRANCH B',c,8,.6)+txt(90,560,'COUNTERFACTUAL / NOT REPLAY',c,9,.75)
svg('road-counterfactuals',c,s)
# A notebook makes the learner's work the subject.
c='#b9a5e9';s='<g transform="rotate(-7 320 310)"><path d="M131 112H461L507 159V500H131Z" fill="#2c2539"/><path d="M461 112V159H507"/><path d="M179 113V500" opacity=".4"/>'
for y in [187,230,273,316,359,402,445]:s+=f'<path d="M198 {y}H468" opacity=".18"/>'
for y in range(144,491,42):s+=f'<path d="M117 {y}H144" stroke-width="5"/><circle cx="144" cy="{y}" r="4" fill="#201b2b"/>'
s+=txt(208,168,'TRY IT YOURSELF',c,14)+txt(210,216,'QUESTION',c,10,.6)+txt(210,259,'ATTEMPT',c,10,.6)+txt(210,302,'FEEDBACK',c,10,.6)
s+='<path d="M211 343l9 8 15-19M251 344H396M211 388l9 8 15-19M251 389H438M211 431l9 8 15-19M251 432H361" opacity=".7"/><circle cx="410" cy="253" r="28" stroke-dasharray="3 5"/><path d="M397 253l9 9 16-18" stroke-width="2.5"/></g><path d="M458 375l51-131 15 6-50 132-21 30Z" fill="#b9a5e9" fill-opacity=".12"/><path d="M509 244l5-13 16 6-6 13M458 375l16 7M453 412l12-11"/>'
s+=txt(141,550,'HELP THAT PRESERVES THE EFFORT',c,9,.75)
svg('learning-notebook',c,s)
# Parallel streams, deliberately restrained and clinical.
c='#8ccbc9';s='<rect x="89" y="110" width="462" height="376" rx="6" fill="#132527"/><path d="M89 161H551M240 161V486" opacity=".4"/>'+txt(111,141,'REAL-TIME CONSULTATION',c,10)+txt(463,141,'LIVE',c,8,.65)
for y,label,num in [(230,'TALK','01'),(337,'PLAN','02'),(444,'SEE','03')]:
 s+=f'<circle cx="164" cy="{y-9}" r="31" fill="#8ccbc9" fill-opacity=".035"/>'+txt(149,y-7,num,c,11)+txt(148,y+44,label,c,8,.8)
s+='<path d="M267 231H293L306 217L319 245L334 199L350 259L365 226H397L408 217L423 237L436 228H524" stroke-width="1.8"/><path d="M270 317h51m-51 14h101m-101 14h78m-78 14h118" opacity=".5"/><rect x="425" y="310" width="96" height="47" rx="2" stroke-dasharray="4 5" opacity=".65"/><path d="M278 402h27v57h-27zm45 15h27v42h-27zm45-29h27v71h-27z" fill="#8ccbc9" fill-opacity=".1"/><path d="M429 408h83v45h-83zm0 22h83m-42-22v45" opacity=".5"/><path d="M268 276H524M268 381H524" opacity=".2"/>'
s+='<path d="M164 492V524H470V492" stroke-dasharray="3 6" opacity=".4"/>'+txt(236,545,'COORDINATION MATTERS',c,9,.8)
svg('clinical-signals',c,s)
# Semantic segmentation, with visible masks and a distinct absent-match panel.
c='#f69c8f';s='<rect x="76" y="126" width="488" height="343" rx="3" fill="#311f20"/><path d="M76 338H564M76 388H564" opacity=".17"/>'
for x in range(98,565,47):s+=f'<path d="M{x} 126V469" opacity=".06"/>'
for x,y in [(131,260),(297,299),(439,235)]:
 s+=f'<path d="M{x} {y}h55l-5 87h-45Z" fill="#f69c8f" fill-opacity=".3"/><path d="M{x+55} {y+12}h15q19 28-4 43h-13"/><ellipse cx="{x+27}" cy="{y}" rx="27" ry="7" fill="#4f2a27"/><rect x="{x-12}" y="{y-23}" width="91" height="123" rx="2" stroke-dasharray="4 5" opacity=".65"/>'
s+='<path d="M218 215l31-16 31 16v67l-31 17-31-17Z" fill="#c8babc" fill-opacity=".1" stroke="#c8babc" opacity=".5"/><path d="M218 215l31 15 31-15m-31 15v69" stroke="#c8babc" opacity=".4"/>'
s+='<rect x="101" y="91" width="177" height="48" fill="#281a1b"/>'+txt(117,120,'PROMPT: RED CUPS',c,10)+txt(113,419,'MASK 01',c,8)+txt(297,437,'MASK 02',c,8)+txt(434,399,'MASK 03',c,8)
s+='<path d="M83 499H557" opacity=".25"/>'+txt(92,531,'MATCH THE CONCEPT. NOT JUST THE SHAPE.',c,9,.8)
svg('vision-segmentation',c,s)
# Event 01: infrastructure layers, from HBM stacks to useful agent work.
c='#f0bd61';s=''
for x in [123,215,307]:
 for y in [405,390,375,360]:s+=f'<path d="M{x} {y}l34-13 61 13-34 13Z" fill="#3b2c16"/><path d="M{x} {y}v10l61 14 34-13v-11" opacity=".55"/>'
s+=txt(130,457,'HBM / MEMORY',c,10)+ '<path d="M324 352V299H483V239M324 299H159V239" opacity=".5"/>'
for x in [107,270,433]:
 s+=f'<rect x="{x}" y="156" width="100" height="83" fill="#332716"/><rect x="{x+10}" y="167" width="80" height="12" opacity=".5"/><rect x="{x+10}" y="187" width="80" height="12" opacity=".5"/><rect x="{x+10}" y="207" width="80" height="12" opacity=".5"/>'
s+=txt(115,137,'COMPUTE',c,8)+txt(278,137,'NETWORK',c,8)+txt(441,137,'TOOLS',c,8)+ '<path d="M157 155V93H484V155M320 93V62" opacity=".6"/><circle cx="320" cy="62" r="6" fill="#f0bd61"/>'
s+='<path d="M436 356h86v79h-86zM453 373h51m-51 13h35m-35 13h43M374 397h62"/><circle cx="481" cy="460" r="4"/>'+txt(398,488,'COMPLETED WORK',c,9)+txt(141,544,'CAPACITY IS NOT THE SAME AS VALUE',c,9,.75)
svg('event-infrastructure',c,s)
# Event 02: camera frustum, first-person hand geometry, and embodiment alignment.
c='#7fd6e5';s='<path d="M89 178V111H156M484 111H551V178M89 434V501H156M484 501H551V434" stroke-width="2.5"/><rect x="112" y="134" width="416" height="344" rx="70" opacity=".22"/><path d="M156 176L320 306L485 177M155 438L320 306L485 438" stroke-dasharray="2 8" opacity=".2"/><ellipse cx="320" cy="304" rx="168" ry="128" opacity=".18"/><circle cx="320" cy="306" r="50" opacity=".25"/><path d="M305 306h30m-15-15v30" opacity=".6"/>'
s+='<path d="M210 472L230 409L203 361L185 337L195 326L232 357L229 274L246 267L259 348L270 243L288 244L286 347L306 260L324 264L312 358L338 302L354 311L333 390L297 444L284 482" fill="#7fd6e5" fill-opacity=".04" stroke-width="2"/>'
s+='<path d="M230 409L279 391L297 444M279 391L259 348M279 391L286 347M279 391L312 358M279 391L232 357" opacity=".6"/>'
for x,y in [(230,409),(279,391),(259,348),(286,347),(312,358),(232,357),(297,444)]:s+=f'<circle cx="{x}" cy="{y}" r="4" fill="{c}"/>'
s+='<path d="M397 244h70l-8 84h-54Z" fill="#7fd6e5" fill-opacity=".1"/><ellipse cx="432" cy="244" rx="35" ry="9"/><rect x="380" y="217" width="102" height="131" stroke-dasharray="5 6" opacity=".5"/><path d="M344 373Q387 356 413 333" stroke-dasharray="4 5"/><circle cx="122" cy="160" r="4" fill="#7fd6e5"/>'
s+=txt(136,164,'FIRST-PERSON VIEW',c,8,.8)+txt(153,547,'HUMAN EXPERIENCE / ROBOT ACTION',c,9,.75)
svg('event-egocentric',c,s)
print('Created 9 topic-specific SVG hero illustrations.')
