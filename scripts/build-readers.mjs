import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(dist,'articles.js'),'utf8'),ctx);
const original=ctx.window.PCPU_ARTICLES;
const events=ctx.window.PCPU_EVENTS;
// Keep the expanded editorial source in the repository so the static build is reproducible.
const reportSource=path.join(root,'data/reports.json');
const enhanced=fs.existsSync(reportSource)?JSON.parse(fs.readFileSync(reportSource,'utf8')).posts:[];
const metadata={
 'chips-ai':{slug:'flashattention-4',theme:'chips',short:'GPU systems',art:'chip-architecture',label:'HARDWARE / SOFTWARE',visualNote:'Attention is more than matrix multiplication.'},
 'quantitative-research':{slug:'rd-agent-quant',theme:'quant',short:'Automated discovery',art:'quant-experiments-hero',label:'HYPOTHESIS / EXPERIMENT',visualNote:'More experiments. A higher bar for evidence.'},
 robotics:{slug:'pi07-robot-coaching',theme:'robotics',short:'Embodied intelligence',art:'robot-coaching',label:'LANGUAGE / ACTION',visualNote:'Separate the skill from the help it receives.'},
 'autonomous-driving':{slug:'waymo-world-model',theme:'autonomy',short:'World models',art:'road-counterfactuals',label:'SIMULATION / REALITY',visualNote:'An alternative route needs a credible world.'},
 'ai-education':{slug:'ai-tutor-study-routine',theme:'education',short:'Learning systems',art:'learning-notebook',label:'ASSISTANCE / UNDERSTANDING',visualNote:'The study routine is part of the technology.'},
 'ai-healthcare':{slug:'amie-video-consultations',theme:'healthcare',short:'Real-time agents',art:'clinical-signals',label:'PERCEPTION / REASONING',visualNote:'Smooth conversation is not the whole evaluation.'},
 'multimodal-vision':{slug:'sam-3-concept-segmentation',theme:'vision',short:'Visual grounding',art:'vision-segmentation',label:'CONCEPT / PIXEL',visualNote:'Find every match. Know when there are none.'}
};
const posts=original.map(p=>({...p,...enhanced.find(e=>e.id===p.id),...metadata[p.id]}));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const back='<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 12H4m7-7-7 7 7 7"/></svg>';
const url=p=>`/notes/${p.slug}.html`;
const header=(section)=>`<a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"></div><header class="header"><a class="brand" href="/" aria-label="PCPU home"><img class="brand-logo" src="/assets/logo-mark.svg" width="36" height="36" alt="" aria-hidden="true"><span>PCPU<span class="brand-sub">COMPUTER PIONEER UNION</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span>Menu</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button><nav id="navigation" aria-label="Main navigation"><a href="/#about">The union</a><a href="/#frontiers"${section==='notes'?' aria-current="page"':''}>Field notes</a><a href="/team.html">People</a><a href="/#sessions" class="nav-cta"${section==='events'?' aria-current="page"':''}>Explore sessions <span aria-hidden="true">${arrow}</span></a></nav></header>`;
const footer=()=>`<footer class="footer report-footer"><div><strong>Purdue Computer Pioneer Union</strong></div><div class="footer-links"><a href="/#about">The union</a><a href="/#frontiers">Field notes</a><a href="/team.html">People</a><a href="/#sessions">Sessions</a></div><div class="footer-end"><span>CURIOSITY IS THE STARTING POINT.</span><a href="#top">BACK TO TOP ${arrow}</a></div></footer>`;
const head=(title,desc,canonical)=>`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#141512"><meta name="description" content="${esc(desc)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><title>${esc(title)} — PCPU</title><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/readers.css"><script src="/script.js" defer></script><script src="/readers.js" defer></script></head>`;
const sourceList=sources=>`<ol class="report-sources">${sources.map((s,i)=>`<li id="source-${i+1}"><span class="source-index">${String(i+1).padStart(2,'0')}</span><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label||s.title)} ${arrow}</a></li>`).join('')}</ol>`;
function figureHtml(f,index){const name=path.basename(f.src||f.filename||'');return `<figure class="report-figure"><img src="/assets/reports/${esc(name)}" alt="${esc(f.alt||f.title||'Explanatory research diagram')}" loading="lazy" decoding="async" width="1000" height="600"><figcaption><span>FIG. ${String(index+1).padStart(2,'0')}</span><div>${esc(f.caption)}${f.sourceUrl?` <a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Source ${arrow}</a>`:''}</div></figcaption></figure>`;}
function articlePage(post,index){
 const sections=post.sections||post.body.map((x,i)=>({heading:['The question','How it works','What the evidence says','Our reading'][i]||`Closer reading ${i+1}`,paragraphs:[typeof x==='string'?x:x.text]}));
 const wordCount=sections.flatMap(s=>s.paragraphs||[]).join(' ').split(/\s+/).length;
 const readTime=post.readTime&&enhanced.find(e=>e.id===post.id)?post.readTime:`${Math.max(3,Math.ceil(wordCount/190))} min read`;
 post.readTime=readTime;
 const figures=post.figures||[];
 const body=sections.map((s,i)=>`<section class="report-section" id="section-${i+1}"><div class="report-section-label">${String(i+1).padStart(2,'0')} / CLOSER READING</div><h2>${esc(s.heading)}</h2>${(s.paragraphs||[]).map(p=>`<p>${esc(typeof p==='string'?p:p.text)}</p>`).join('')}${s.sourceRefs?.length?`<p class="section-references">In this section: ${s.sourceRefs.map(n=>`<a href="#source-${n}" aria-label="See source ${n}">[${n}]</a>`).join(' ')}</p>`:''}${s.figure?figureHtml(s.figure,i):''}</section>${figures.filter(f=>Number(f.afterSection)===i).map(f=>figureHtml(f,figures.indexOf(f))).join('')}`).join('');
 const next=posts[(index+1)%posts.length];
 return `${head(post.title,post.deck,url(post))}<body id="top" class="report-page theme-${post.theme}">${header('notes')}<main id="main"><section class="report-hero"><div class="report-breadcrumb"><a href="/#frontiers">${back} All field notes</a><span>PCPU / RESEARCH REPORT ${String(index+1).padStart(2,'0')}</span></div><div class="report-hero-layout"><div class="report-hero-copy"><p class="report-kicker"><span></span>${esc(post.researchLabel||post.category)}</p><h1>${esc(post.title)}</h1><p class="report-deck">${esc(post.deck)}</p><a class="report-start" href="#report-content">Read the report <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16m-7-7 7 7 7-7"/></svg></a></div><div class="report-art" aria-hidden="true"><span class="report-art-code">${esc(post.label)}</span><img src="/assets/reports/${post.art}.svg" width="640" height="620" alt=""><span class="report-art-note">${esc(post.visualNote)}</span></div></div><div class="report-dateline"><div><span>BY</span><strong>PCPU Editorial</strong></div><div><span>${esc(post.researchDateType||'SOURCE DATE')}</span><strong>${esc(post.researchDate)}</strong></div><div><span>EVIDENCE STATUS</span><strong>${esc(post.publicationStatus||'Research analysis')}</strong></div><div><span>READING TIME</span><strong>${esc(readTime)}</strong></div></div></section><div class="report-paper" id="report-content"><div class="report-layout"><aside class="report-rail"><div class="report-toc"><p class="rail-label">IN THIS REPORT</p><nav aria-label="Article contents">${sections.map((s,i)=>`<a href="#section-${i+1}"><span>${String(i+1).padStart(2,'0')}</span>${esc(s.heading)}</a>`).join('')}<a href="#sources"><span>REF</span>Primary sources</a></nav><a class="rail-back" href="/#frontiers">${back} Back to field notes</a></div></aside><article class="report-content" aria-label="Research analysis">${post.takeaways?.length?`<aside class="report-takeaways"><p class="rail-label">THE SHORT VERSION</p><ul>${post.takeaways.map(t=>`<li>${esc(typeof t==='string'?t:t.text)}</li>`).join('')}</ul></aside>`:''}${body}<aside class="report-question"><p class="rail-label">TAKE IT TO THE ROOM</p><h2>${esc(post.question)}</h2><a href="/#sessions">Explore PCPU sessions ${arrow}</a></aside><section class="report-source-section" id="sources"><p class="rail-label">FOLLOW THE EVIDENCE</p><h2>Primary sources</h2><p class="sources-intro">This is an independent PCPU reading of the work. Findings, limitations, and our interpretation are kept distinct. Conceptual diagrams are labelled as such; reported measurements retain their source and conditions.</p>${sourceList(post.sources)}</section></article></div></div><section class="report-next"><div><span class="rail-label">KEEP EXPLORING</span><p>The frontier doesn’t end here.</p></div><a href="${url(next)}"><span>${esc(next.short)}</span><h2>${esc(next.title)}</h2>${arrow}</a></section></main>${footer()}</body></html>`;
}
function eventPage(id){
 const data=events[id],infra=id==='ai',theme=infra?'infrastructure':'egocentric',name=infra?'from-hbm-to-agents':'ego-scaling',short=infra?'From HBM to Agents':'Ego Scaling',subtitle=infra?'The AI Infrastructure Conversation':'Learning from a First-Person World';
 const contents=[['session-overview','The session flow'],['workshop','Speaker-led workshop'],['pizza','Pizza & open conversation'],['brainstorming','Optional brainstorming'],['follow-up','Support & follow-up'],['sources','Optional pre-reading']];
 const workshop=data.workshop.map((step,i)=>`<li><span class="event-step-number">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(step.title)}</h3><p>${esc(step.detail)}</p><p class="event-exercise">${esc(step.activity)}</p></div></li>`).join('');
 const ideas=data.projectIdeas.map(idea=>`<li><span class="event-idea-type">${esc(idea.type)}</span><h3>${esc(idea.title)}</h3><p>${esc(idea.detail)}</p></li>`).join('');
 return `${head(data.title,data.intro,`/events/${name}.html`)}
<body id="top" class="report-page event-page theme-${theme}">${header('events')}
<main id="main">
 <section class="report-hero event-hero">
  <div class="report-breadcrumb"><a href="/#sessions">${back} All sessions</a><span>PCPU / IN THE ROOM</span></div>
  <div class="report-hero-layout">
   <div class="report-hero-copy"><p class="report-kicker"><span></span>PROPOSED SESSION / ${infra?'01':'02'}</p><h1>${short}<span>${subtitle}</span></h1><p class="report-deck">${esc(data.intro)}</p><a class="report-start" href="#conversation">Explore the session plan <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16m-7-7 7 7 7-7"/></svg></a></div>
   <div class="report-art event-art" aria-hidden="true"><span class="report-art-code">${infra?'MEMORY / COMPUTE / USEFUL WORK':'OBSERVE / ALIGN / ACT'}</span><img src="/assets/reports/event-${theme}.svg" width="640" height="620" alt=""><span class="report-art-note">${infra?'From the silicon to the systems we build.':'A first-person world. A different kind of learner.'}</span></div>
  </div>
  <div class="report-dateline event-dateline"><div><span>STATUS</span><strong>Proposed session</strong></div><div><span>DATE & TIME</span><strong>To be announced</strong></div><div><span>VENUE</span><strong>To be announced</strong></div><div><span>FORMAT</span><strong>Workshop → pizza → optional brainstorming</strong></div></div>
 </section>
 <div class="report-paper" id="conversation"><div class="report-layout event-layout">
  <aside class="report-rail"><div class="report-toc"><p class="rail-label">LEARN. CONNECT. BUILD.</p><p class="event-side-note">Start with the workshop. Meet someone over pizza. Stay to build an idea if you want to.</p><nav aria-label="Session contents">${contents.map(([anchor,label],i)=>`<a href="#${anchor}"><span>${String(i+1).padStart(2,'0')}</span>${esc(label)}</a>`).join('')}</nav><a class="rail-back" href="/#sessions">${back} Back to sessions</a></div></aside>
  <article class="report-content" aria-label="Proposed session plan">
   <section id="session-overview" class="event-overview report-section">
    <p class="report-section-label">THE SESSION FLOW</p><h2>One topic. A room of possibilities.</h2>${data.body.map(p=>`<p>${esc(p)}</p>`).join('')}
    <ol class="event-flow" aria-label="Session sequence">
     <li><a href="#workshop"><span class="event-flow-number">01</span><span class="event-flow-title">Speaker-led<br>workshop</span><span class="event-flow-detail">Explore the topic</span></a></li>
     <li><a href="#pizza"><span class="event-flow-number">02</span><span class="event-flow-title">Pizza & open<br>conversation</span><span class="event-flow-detail">15 minutes</span></a></li>
     <li><a href="#brainstorming"><span class="event-flow-number">03</span><span class="event-flow-title">Brainstorm<br>& find a team</span><span class="event-flow-detail">Optional</span></a></li>
    </ol>
   </section>
   <section id="workshop" class="event-workshop report-section">
    <p class="report-section-label">01 / SPEAKER-LED WORKSHOP</p><h2>${infra?'From the memory wall to useful work.':'From a human view to a robot action.'}</h2>
    <p>A topic speaker will guide the technical walkthrough, with space to pause, compare approaches, and work through examples. The speaker is to be confirmed; the outline and exercises below are proposed.</p>
    <ol class="event-workshop-steps">${workshop}</ol>
   </section>
   <section id="pizza" class="event-discussion report-section">
    <p class="report-section-label">02 / PIZZA & OPEN CONVERSATION</p><div class="event-section-heading"><h2>Put the slides aside.</h2><span class="event-duration">15 MINUTES</span></div>
    <p>After the workshop, we will take exactly 15 minutes for pizza, meeting new people, and free-form discussion. Join any conversation, compare notes with someone new, or bring up the question that did not fit into the workshop. There is no assigned group or required pitch.</p>
    <p class="event-prompts-label">Suggested conversation starters—not a record of questions asked:</p>
    <ol>${data.agenda.map((a,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><p>${esc(a)}</p></li>`).join('')}</ol>
   </section>
   <section id="brainstorming" class="event-brainstorming report-section">
    <p class="report-section-label">03 / OPTIONAL BRAINSTORMING & TEAM FORMATION</p><h2>Stay for the idea you want to pursue.</h2>
    <p>The final segment is for anyone who wants to turn the conversation into a research question or startup idea. Bring an idea, join someone else’s, or listen first. Participation and team formation are optional—you do not need a finished pitch or a team in advance.</p>
    <ul class="event-team-steps"><li><strong>Find a shared question.</strong> Say what interests you, who a solution might help, and what you would like to learn.</li><li><strong>Meet possible teammates.</strong> Compare interests and skills, then decide whether you want to explore an idea together.</li><li><strong>Choose a first test.</strong> Sketch a small experiment or prototype, the evidence it should produce, and what support the team might need.</li></ul>
    <h3 class="event-ideas-heading">Possible starting points</h3><p class="event-ideas-note">These are suggested project directions, not existing teams, announced projects, or reported outcomes.</p>
    <ul class="event-ideas">${ideas}</ul>
   </section>
   <section id="follow-up" class="event-follow-up report-section">
    <p class="report-section-label">AFTER THE SESSION / SUPPORT & FOLLOW-UP</p><h2>An idea can keep going after the room clears.</h2>
    <p>Teams can discuss available PCPU support and agree on next steps. Resource support will depend on the project’s needs and what the organization can make available; this is not a promise of funding, equipment, or a fixed allocation.</p>
    <p>PCPU will stay in touch with teams that choose to continue. Follow-up check-ins will give teams a place to share progress, surface blockers, and refine their next experiment or prototype. The check-in plan and any resource arrangements will be agreed with each team.</p>
   </section>
   <aside class="report-question"><p class="rail-label">A PROMPT TO TAKE WITH YOU</p><h2>${esc(data.question)}</h2></aside>
   <section class="report-source-section" id="sources"><p class="rail-label">OPTIONAL PRE-READING</p><h2>A starting point</h2><p class="sources-intro">No need to arrive with every answer. These primary sources give the workshop and conversation something concrete to build on.</p>${sourceList(data.sources)}</section>
   <aside class="event-status-note"><span class="status-dot"></span><div><strong>This session is a proposal, not a confirmed event.</strong><p>Date, time, venue, and speaker are still to be announced. Workshop exercises and project directions are suggestions; this page does not report a past event or completed team outcomes. Confirmed details will be added when available.</p></div></aside>
  </article>
 </div></div>
 <section class="report-next"><div><span class="rail-label">ANOTHER CONVERSATION</span><p>Follow your curiosity.</p></div><a href="/events/${infra?'ego-scaling':'from-hbm-to-agents'}.html"><span>PROPOSED PCPU SESSION</span><h2>${esc(events[infra?'xr':'ai'].title)}</h2>${arrow}</a></section>
</main>${footer()}</body></html>`;
}
for(const p of ['notes','events','assets/reports'])fs.mkdirSync(path.join(dist,p),{recursive:true});
posts.forEach((p,i)=>fs.writeFileSync(path.join(dist,'notes',p.slug+'.html'),articlePage(p,i)));
for(const id of ['ai','xr'])fs.writeFileSync(path.join(dist,'events',id==='ai'?'from-hbm-to-agents.html':'ego-scaling.html'),eventPage(id));
let home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const cards=posts.map((post,index)=>`<article class="editorial-card theme-${post.theme}${index===0?' editorial-feature':''}"><a href="${url(post)}" class="editorial-art" aria-label="Read ${esc(post.title)}"><span class="editorial-number">${String(index+1).padStart(2,'0')}</span><img src="/assets/reports/${post.art}.svg" alt="" aria-hidden="true" width="640" height="620" loading="lazy"><span class="editorial-art-label">${esc(post.label)}</span></a><div class="editorial-content"><span class="editorial-category">${esc(post.researchLabel||post.category)}</span><h3><a class="article-link" href="${url(post)}">${esc(post.title)}</a></h3><p class="editorial-summary">${esc(post.summary||post.deck)}</p><div class="editorial-card-bottom"><span class="read-time">${esc(post.readTime)}</span><a class="article-link editorial-read" href="${url(post)}" aria-label="Read the analysis: ${esc(post.title)}">Read the analysis <span aria-hidden="true">${arrow}</span></a></div></div></article>`).join('\n');
home=home.replace(/<div class="editorial-grid" id="editorial-grid">[\s\S]*?<\/div>\s*(?:<noscript>[\s\S]*?<\/noscript>)?\s*<div class="editorial-footnote">/,`<div class="editorial-grid" id="editorial-grid">${cards}</div>\n      <div class="editorial-footnote">`);
home=home.replace(/\s*<dialog[\s\S]*?<\/dialog>/g,'').replace(/\s*<script src="articles.js" defer><\/script>/,'');
if(!home.includes('href="readers.css"'))home=home.replace('<link rel="stylesheet" href="styles.css">','<link rel="stylesheet" href="styles.css">\n  <link rel="stylesheet" href="readers.css">');
home=home.replace(/<button([^>]*\bdata-event="(ai|xr)"[^>]*)>([\s\S]*?)<\/button>/g,(_,attrs,id,contents)=>`<a${attrs.replace(/ type="button"/g,'').replace(/ data-event="(?:ai|xr)"/,'')} href="/events/${id==='ai'?'from-hbm-to-agents':'ego-scaling'}.html">${contents}</a>`);
home=home.replace('<h3>From HBM to Agents:<br>The AI Infrastructure Conversation</h3>','<h3><a href="/events/from-hbm-to-agents.html">From HBM to Agents:<br>The AI Infrastructure Conversation</a></h3>').replace('<h3>Ego Scaling:<br>Learning from a First-Person World</h3>','<h3><a href="/events/ego-scaling.html">Ego Scaling:<br>Learning from a First-Person World</a></h3>');
// Both entry pages use the same footer as the generated reports and sessions.
// Keep this replacement in the build so old standalone markup cannot return.
const sharedFooter=html=>html.replace(/<footer\b[\s\S]*?<\/footer>/,footer())
 .replace(/<body(?![^>]*\bid=)([^>]*)>/,'<body id="top"$1>');
// Session panels use the existing original topical illustrations, not venue imagery.
const eventPanel=(slug)=>{
 const infra=slug==='from-hbm-to-agents',theme=infra?'infrastructure':'egocentric';
 const title=infra?'From HBM to Agents: The AI Infrastructure Conversation':'Ego Scaling: Learning from a First-Person World';
 return `<a class="event-topic-banner theme-${theme}" aria-label="View details for ${title}" href="/events/${slug}.html"><span class="event-topic-label">${infra?'MEMORY / COMPUTE / USEFUL WORK':'OBSERVE / ALIGN / ACT'}</span><img src="/assets/reports/event-${theme}.svg" alt="" aria-hidden="true" loading="lazy" width="640" height="620"><span class="event-topic-arrow" aria-hidden="true">${arrow}</span></a>`;
};
home=home.replace(/<a\b(?=[^>]*class="(?:event-image-button|event-topic-banner)[^"]*")(?=[^>]*href="\/events\/(from-hbm-to-agents|ego-scaling)\.html")[^>]*>[\s\S]*?<\/a>/g,(_,slug)=>eventPanel(slug));
home=home.replace(/\s*<p class="concept-note">[\s\S]*?<\/p>/g,'');
home=sharedFooter(home);
const teamPath=path.join(dist,'team.html');
fs.writeFileSync(teamPath,sharedFooter(fs.readFileSync(teamPath,'utf8')));
fs.writeFileSync(path.join(dist,'index.html'),home);
fs.writeFileSync(path.join(dist,'report-index.json'),JSON.stringify(posts.map(p=>({id:p.id,path:url(p),title:p.title,sections:p.sections?.length||0,figures:p.figures?.length||0})),null,2));
console.log(`Built ${posts.length} full article pages (${enhanced.length} expanded reports), 2 event pages and static homepage cards.`);
