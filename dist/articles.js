'use strict';
// PCPU Field Notes: current research analyses, not fixed areas of focus.
// Research dates refer to the cited sources; publication status is shown in each reader.
window.PCPU_ARTICLES = [
  {
    "id": "chips-ai",
    "category": "Kernel engineering",
    "eyebrow": "Research note · GPU systems",
    "title": "FlashAttention-4 Finds the Work Faster GPUs Leave Behind",
    "deck": "Blackwell makes matrix multiplication faster, but attention still has other work to do. FlashAttention-4 shows why the next performance gain can come from scheduling, exponentials, and moving less data.",
    "researchLabel": "FlashAttention-4 · March 2026",
    "researchDate": "2026-03-05",
    "researchDateType": "Preprint submitted",
    "tags": [
      "FlashAttention-4",
      "GPU kernels",
      "Hardware–software co-design"
    ],
    "readTime": "2 min read",
    "body": [
      "A new GPU can make yesterday’s optimization strategy less useful. FlashAttention-4, released in March 2026, tackles a specific imbalance in NVIDIA’s Blackwell architecture: matrix-multiplication throughput has grown faster than the resources that handle exponentials and shared-memory traffic. Attention needs all of them, so accelerating its headline operation exposes the cost of the surrounding work.",
      "The authors redesign how those operations overlap. In the forward pass, the kernel interleaves matrix work with softmax, the operation that converts attention scores into weights. It also computes some exponentials in software. In the backward pass, it uses Blackwell’s tensor memory and paired thread-block operations to reduce data movement. The paper reports up to 1.3× speedup over cuDNN 9.13 and 2.7× over Triton on B200 with BF16 inputs.",
      "Those are kernel results under specified benchmark conditions, not a promise that an entire model or service becomes 2.7× faster. PyTorch’s accompanying FlexAttention integration adds another useful dimension: researchers can customize attention patterns through Python while targeting the new backend. That lowers the practical barrier between trying an idea and testing an efficient implementation.",
      "Our read: the interesting lesson is how directly software choices follow the balance of hardware resources. Start with the resource balance, then trace why each scheduling decision exists. For a reproduction, we would vary sequence length and attention masks, measure end-to-end training time, and record numerical differences. The valuable result would be a map of where the optimization helps, including the cases where another part of the system takes over as the bottleneck."
    ],
    "question": "If attention becomes twice as fast in your model, which measurement would reveal what now limits the whole training step?",
    "sources": [
      {
        "label": "FlashAttention-4 paper · submitted 5 March 2026",
        "url": "https://arxiv.org/abs/2603.05451"
      },
      {
        "label": "Authors’ technical walkthrough · Together AI",
        "url": "https://www.together.ai/blog/flashattention-4"
      },
      {
        "label": "PyTorch: FlexAttention + FlashAttention-4 · 5 March 2026",
        "url": "https://pytorch.org/blog/flexattention-flashattention-4-fast-and-flexible/"
      }
    ],
    "publicationStatus": "Research preprint"
  },
  {
    "id": "quantitative-research",
    "category": "Research agents",
    "eyebrow": "Research note · Automated discovery",
    "researchLabel": "R&D-Agent-Quant · NeurIPS 2025",
    "researchDate": "2025-05-21",
    "researchDateType": "First preprint submitted",
    "publicationStatus": "Peer-reviewed conference paper · NeurIPS 2025",
    "tags": [
      "Research agents",
      "Evaluation"
    ],
    "readTime": "2 min read",
    "title": "When a Quant Agent Can Rewrite Its Own Experiment",
    "deck": "R&D-Agent-Quant links financial hypotheses, executable code, and backtest feedback. Its most interesting contribution is a research loop we can inspect, along with new reasons to protect the evaluation.",
    "body": [
      "Imagine giving an agent a research question instead of asking it which stock to buy. R&D-Agent-Quant, introduced in May 2025, proposes candidate financial signals, writes their implementations, evaluates them, and uses the results to choose its next experiment. It can revise both the input factors and the model that combines them.",
      "The design makes a useful distinction between research and development: an idea must become executable code before it earns a result. A scheduling mechanism chooses whether the next round should improve factors or models. In the paper’s CSI 300 experiments, jointly refining both improves several predictive and portfolio metrics relative to the tested baselines. Microsoft has released the framework’s code.",
      "The revised paper also tests CSI 500 and NASDAQ 100 data with 2024–2025 evaluation periods. That broadens the evidence, but these remain historical tests rather than dependable future returns. The authors identify reliance on the language model’s built-in financial knowledge and limited real-time adaptation as constraints.",
      "Our reading: automation makes the experimental protocol more important. A system that tries more ideas also gets more opportunities to fit quirks in the data. For a student replication, we would freeze an untouched final period, log every attempted hypothesis, and compare equal search budgets. The exciting outcome would be a reproducible research assistant whose discoveries survive fresh evidence. A polished backtest alone would leave the central question unanswered."
    ],
    "question": "What should an automated researcher be allowed to see before its final evaluation?",
    "sources": [
      {
        "label": "R&D-Agent-Quant paper · first submitted 21 May 2025",
        "url": "https://arxiv.org/abs/2505.15155"
      },
      {
        "label": "NeurIPS 2025 conference publication",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/ac5c2b6e423883cbcacbcccf88491b78-Abstract-Datasets_and_Benchmarks_Track.html"
      },
      {
        "label": "Microsoft: RD-Agent source code",
        "url": "https://github.com/microsoft/RD-Agent"
      }
    ]
  },
  {
    "id": "robotics",
    "category": "Robot generalization",
    "eyebrow": "Research note · Learning through coaching",
    "researchLabel": "π0.7 · April 2026",
    "researchDate": "2026-04-16",
    "researchDateType": "Company research report released",
    "publicationStatus": "Company research report",
    "tags": [
      "Robotics",
      "Learning from context"
    ],
    "readTime": "2 min read",
    "title": "π0.7 and the Difference a Robot Coach Makes",
    "deck": "Physical Intelligence’s π0.7 uses richer prompts to combine diverse robot experience. Its appliance experiments suggest a practical route to new skills, but coaching and unaided generalization need separate scorecards.",
    "body": [
      "A robot facing an unfamiliar air fryer gives us a surprisingly clear test of generalization. In Physical Intelligence’s April 2026 π0.7 report, the model only partly completes the task from a single instruction. Step-by-step language coaching helps it perform much more effectively. That difference deserves as much attention as the successful demonstration.",
      "The technical contribution is a unified way to condition a vision-language-action model on how a task should be performed. Training examples can include language, visual subgoals, control-mode labels, and metadata about speed or quality. Those annotations let the model learn from heterogeneous demonstrations and autonomous attempts without treating every behavior as equally desirable.",
      "The team also reports laundry folding on a two-arm UR5e system without training examples of that task on that robot. However, unfamiliar task combinations do not mean wholly unfamiliar ingredients: the authors found related air-fryer interactions in their wider training data. Some autonomous appliance demonstrations additionally use a high-level policy fine-tuned from language coaching.",
      "Our take is that coaching could be a valuable interface, especially where collecting fresh teleoperation data is expensive. But we would keep three evaluation columns: success from one instruction, success with human coaching, and success after adaptation. Combining them would hide how much help a deployment still needs. A strong next experiment would hold out both appliances and coaches, record every intervention, and test whether the learned procedure transfers to another kitchen."
    ],
    "question": "When does human coaching count as generalization, and when should we call it task-specific training?",
    "sources": [
      {
        "label": "Physical Intelligence: π0.7 research report · 16 April 2026",
        "url": "https://www.pi.website/blog/pi07"
      },
      {
        "label": "π0.7 technical paper",
        "url": "https://www.pi.website/download/pi07.pdf"
      }
    ]
  },
  {
    "id": "autonomous-driving",
    "category": "World models",
    "eyebrow": "Research note · Counterfactual simulation",
    "researchLabel": "Waymo World Model · February 2026",
    "researchDate": "2026-02-06",
    "researchDateType": "Technical announcement published",
    "publicationStatus": "Company technical release",
    "tags": [
      "Simulation",
      "Autonomy"
    ],
    "readTime": "2 min read",
    "title": "Waymo’s World Model Turns “What If?” into a Test",
    "deck": "Waymo’s World Model generates camera and lidar scenes that respond to driving actions. That opens useful counterfactual tests, while raising a harder question: how do we validate the simulated world?",
    "body": [
      "What if the car had moved forward instead of yielding? Replaying recorded sensor data cannot fully answer that question, because the recording contains only the route actually taken. Waymo’s World Model, announced in February 2026, aims to generate the alternative sensor observations needed for such counterfactual tests.",
      "The system adapts Google DeepMind’s Genie 3 to driving and produces both camera imagery and lidar data. Engineers can steer scenarios through vehicle actions, scene layouts, and language prompts. Waymo demonstrates changing weather, introducing unusual obstacles, and following routes that diverge from the original recording. These are concrete capabilities for expanding the situations a driving system encounters in simulation.",
      "The evidence released with the announcement is primarily demonstrations and a technical description, not a public estimate of how much this simulator reduces crashes. Genie 3’s own report also flags difficulties with multi-agent interactions and long-duration consistency. Those are relevant research questions, though they do not establish identical limitations in Waymo’s adapted system.",
      "Our view: the important test is whether a simulator preserves the consequences of a decision. A convincing image can still encode the wrong braking distance or pedestrian response. We would compare generated outcomes against held-out real maneuvers, check agreement between camera and lidar, and track whether discovered failures reproduce elsewhere. Rare scenarios are valuable, but their realism and coverage need independent measurement before they can support a safety claim."
    ],
    "question": "Which simulator error would most seriously mislead an autonomous-driving evaluation?",
    "sources": [
      {
        "label": "Waymo World Model technical announcement · 6 February 2026",
        "url": "https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation/"
      },
      {
        "label": "Google DeepMind: Genie 3 capabilities and limitations",
        "url": "https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/"
      }
    ]
  },
  {
    "id": "ai-education",
    "category": "Learning systems",
    "eyebrow": "Research note · Learning systems",
    "researchLabel": "AI tutoring trial · October 2026",
    "researchDate": "2026-10",
    "researchDateType": "Working paper publication month",
    "publicationStatus": "IZA discussion paper · preliminary findings",
    "tags": [
      "AI tutoring",
      "Randomized trials",
      "Learning design"
    ],
    "readTime": "2 min read",
    "title": "An AI Tutor Trial Shows Why the Study Routine Matters",
    "deck": "A new university trial makes AI tutoring harder to summarize in a headline. Its most useful result concerns how access to an assistant can change the rest of studying.",
    "body": [
      "An October 2026 working paper by Jing Liu and colleagues follows a course-integrated AI study assistant across 2,379 undergraduates. The tool retrieved instructor-selected materials rather than answering from a generic chat window. In the subgroup comparing sections of the same course, access reduced final grades and recorded participation in the learning platform.",
      "The implementation matters. Most instructors kept the default direct-instruction mode, and the researchers did not prescribe how to build the assistant into learning activities. Compare that with Kestin and colleagues’ 2025 physics experiment: an intentionally scaffolded tutor improved immediate post-lesson performance relative to an active-learning class. These studies tested different educational arrangements, not interchangeable versions of “AI tutoring.”",
      "The new result also has limits. Course grades are not independent tests of learning, platform logs miss offline study, and only about 15% of students offered the assistant used it. The experiment measures the consequences of introducing access, not a clean dose-response effect of individual chatbot use.",
      "Our read: a tutor should be evaluated as part of a study routine. Did it prompt another attempt, invite feedback, or replace a conversation with a teacher? For a student-built tutoring project, we would start with one explicit learning activity, then test unaided understanding later. A friendly interface and accurate retrieval are useful engineering achievements; the harder design goal is preserving the work through which understanding develops."
    ],
    "question": "What behavior would you measure to distinguish productive help from replacing the effort of learning?",
    "sources": [
      {
        "label": "Liu et al. · Randomized university trial (working paper, October 2026)",
        "url": "https://docs.iza.org/dp18989.pdf"
      },
      {
        "label": "Kestin et al. · AI tutoring versus active learning (Scientific Reports, 2025)",
        "url": "https://www.nature.com/articles/s41598-025-97652-6"
      }
    ]
  },
  {
    "id": "ai-healthcare",
    "category": "Real-time agents",
    "eyebrow": "Research note · Real-time agents",
    "researchLabel": "AMIE (Video) · August 2026",
    "researchDate": "2026-08-10",
    "researchDateType": "First preprint submitted",
    "publicationStatus": "Research preprint · simulated consultations",
    "tags": [
      "Multimodal agents",
      "Clinical evaluation",
      "Real-time systems"
    ],
    "readTime": "2 min read",
    "title": "AMIE’s Video Study Tests More Than Medical Answers",
    "deck": "AMIE’s video-consultation study makes a systems problem visible: conversation cannot stop whenever reasoning gets difficult. The architecture is interesting, but its simulated clinical evaluation sets clear limits on the claim.",
    "body": [
      "Google’s August 2026 AMIE (Video) paper separates a medical conversation into three concurrent jobs. A talker maintains spoken interaction, a planner updates clinical reasoning, and a perception agent examines the incoming audio and video. The system can ask patient actors to demonstrate movements and use observations alongside their descriptions.",
      "The evaluation covered 100 clinical scenarios and 300 consultations, comparing video AMIE, text AMIE, and physicians using video. Independent clinical evaluators rated video AMIE competitively on several consultation competencies, with particular strength in eliciting physical signs and guiding virtual examinations. That is more informative than testing answers to medical questions: the system must decide what information to collect during an unfolding exchange.",
      "The boundary is equally important. These were standardized encounters with professional patient actors, not evidence of improved outcomes for real patients. The paper reports remaining difficulties with fine anatomical detail, subtle emotional cues, and fast movements. Conditions that cannot be convincingly acted are also harder to represent in this setup.",
      "Our read: the transferable advance is the separation of fast interaction from slower deliberation. Similar designs could help other real-time assistants, but they create a new coordination question: what happens when the talker speaks before the planner notices a problem? We would want evaluations that track correction delays and unresolved disagreements between agents, alongside clinical quality. Smooth conversation should make careful oversight easier, not make a system’s uncertainty harder to see."
    ],
    "question": "How would you test whether an assistant corrects itself quickly enough when perception and reasoning disagree?",
    "sources": [
      {
        "label": "Nagda et al. · AMIE real-time video consultations (preprint, 10 August 2026)",
        "url": "https://arxiv.org/abs/2608.09861"
      },
      {
        "label": "Google Research · Architecture, study design, and limitations (11 August 2026)",
        "url": "https://research.google/blog/advancing-amie-towards-expert-level-audio-visual-clinical-consultations/"
      }
    ]
  },
  {
    "id": "multimodal-vision",
    "category": "Visual grounding",
    "eyebrow": "Research note · Visual grounding",
    "researchLabel": "SAM 3 · ICLR 2026",
    "researchDate": "2025-11-20",
    "researchDateType": "First preprint submitted",
    "publicationStatus": "Peer-reviewed conference paper · ICLR 2026",
    "tags": [
      "SAM 3",
      "Segmentation",
      "Visual grounding"
    ],
    "readTime": "2 min read",
    "title": "SAM 3 and the Problem of Finding Every Match",
    "deck": "SAM 3 turns a short concept prompt into masks for matching objects across images and video. Its most revealing test may be a prompt whose answer should be empty.",
    "body": [
      "Ask for “red cups” in a crowded scene. A useful visual system needs to find every matching cup, exclude other objects, and preserve each cup’s identity as the video moves. SAM 3 formalizes this as promptable concept segmentation: short noun phrases or visual examples specify what the model should detect, segment, and track.",
      "The paper, first released in November 2025, combines a detector with a memory-based tracker. A presence head distinguishes whether the concept appears from where its instances are located. Training includes hard negative prompts, and the released SA-Co benchmark tests concept-level segmentation. The authors’ ablations show that both the presence mechanism and difficult negatives contribute to performance.",
      "The scope is narrower than unrestricted visual understanding. The base task uses short concept phrases, not long instructions that require reasoning. Ambiguous descriptions can admit multiple valid interpretations, and tracking adds the challenge of maintaining identity through time. The paper supports interactive refinement rather than assuming the first prompt always captures the user’s intent.",
      "Our read: this is a useful shift in how we should test visual tools. Attractive masks on a few selected objects are an incomplete demonstration. A student project could build a small stress test with absent concepts, near-matching distractors, and objects that briefly disappear. Score missed instances, false positives, and identity switches separately. Those failures tell us whether language is becoming a dependable interface to pixels, rather than merely a convenient way to produce a plausible-looking result."
    ],
    "question": "Which failure would hurt your application most: missing a match, inventing one, or switching identities?",
    "sources": [
      {
        "label": "Carion et al. · SAM 3 paper (first submitted November 2025)",
        "url": "https://arxiv.org/abs/2511.16719"
      },
      {
        "label": "Meta · Official SAM 3 code and evaluation resources",
        "url": "https://github.com/facebookresearch/sam3"
      },
      {
        "label": "SAM 3 · ICLR 2026 conference publication",
        "url": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/e0982cbc81401df3430ee1ff780dc7a2-Abstract-Conference.html"
      }
    ]
  }
];

window.PCPU_EVENTS = {
  "ai": {
    "label": "WORKSHOP + PIZZA + OPTIONAL BRAINSTORMING / PROPOSED 01",
    "title": "From HBM to Agents: The AI Infrastructure Conversation",
    "intro": "From memory bottlenecks to useful AI work: a speaker-led workshop, 15 minutes of pizza and open conversation, then optional research and startup brainstorming.",
    "body": [
      "Why do companies such as Micron keep appearing in conversations about AI? This proposed session connects the hardware question to the work people want AI to do. We will trace a path from HBM and GPU infrastructure to Claude-based workflows, asking what limits a system at each layer and how to measure useful progress.",
      "The session starts with a topical, speaker-led workshop. Then we will put the slides aside for exactly 15 minutes of pizza, casual conversation, and spontaneous discussion. Anyone who wants to keep going can stay for brainstorming, find potential teammates, and explore a research or startup idea. This is a technical and economic discussion, not a stock pitch or investment recommendation."
    ],
    "agenda": [
      "When is an AI workload limited by compute, memory bandwidth, memory capacity, or communication?",
      "What should a team measure before buying GPUs, renting capacity, or changing its deployment architecture?",
      "When does an agent add value over a simpler workflow—and how should we measure cost per successful task?"
    ],
    "question": "What would demonstrate that AI compute is becoming productive infrastructure rather than merely installed capacity?",
    "sources": [
      {
        "label": "Micron: HBM",
        "url": "https://www.micron.com/products/memory/hbm"
      },
      {
        "label": "NVIDIA: Reference architectures",
        "url": "https://docs.nvidia.com/enterprise-reference-architectures/white-paper/latest/introducing-nvidia-reference-architectures.html"
      },
      {
        "label": "Anthropic: Building effective agents",
        "url": "https://www.anthropic.com/research/building-effective-agents"
      }
    ],
    "workshop": [
      {
        "title": "Find the bottleneck: HBM & Micron",
        "detail": "The speaker will introduce memory capacity, bandwidth, and data movement, using HBM and Micron as a starting point. We will distinguish a workload that cannot fit in memory from one that spends too much time moving data.",
        "activity": "Suggested exercise: sketch the path from memory to accelerator and mark what you would measure before calling a workload compute-bound."
      },
      {
        "title": "Build the GPU infrastructure picture",
        "detail": "Move from a single accelerator to a usable system: interconnects, networking, power, cooling, scheduling, and utilization. The discussion will connect hardware choices to a concrete workload rather than treating GPU count as the goal.",
        "activity": "Suggested exercise: compare a single-GPU setup with a multi-GPU deployment and list the new bottlenecks each introduces."
      },
      {
        "title": "Evaluate a Claude-based workflow",
        "detail": "Move up the stack to a task with tools, inputs, and a testable result. The workshop will compare a predefined workflow with an agent-directed approach and discuss reliability, latency, review effort, and cost per successful task.",
        "activity": "Suggested exercise: outline a small evaluation set and a simple non-agent baseline before choosing a more complex system."
      },
      {
        "title": "Connect compute to productivity",
        "detail": "Bring the layers together: which constraint matters to the person using the result? We will discuss how completed, verified work differs from installed capacity, generated tokens, or a compelling demo.",
        "activity": "Suggested exercise: define a useful-work metric for one research or product workflow, including the human time needed to check the output."
      }
    ],
    "projectIdeas": [
      {
        "type": "Research direction",
        "title": "A bottleneck field guide",
        "detail": "Design a reproducible comparison that records memory use, data movement, utilization, and end-to-end task time across a small set of workloads."
      },
      {
        "type": "Research / startup direction",
        "title": "A workflow evaluation bench",
        "detail": "Compare a simple baseline and a Claude-based workflow on one narrow task, tracking verified completion, review effort, latency, and cost."
      },
      {
        "type": "Startup direction",
        "title": "Useful-compute planning for small teams",
        "detail": "Explore a tool that helps a team describe its workload, identify likely constraints, and test deployment choices before expanding its infrastructure."
      }
    ]
  },
  "xr": {
    "label": "WORKSHOP + PIZZA + OPTIONAL BRAINSTORMING / PROPOSED 02",
    "title": "Ego Scaling: Learning from a First-Person World",
    "intro": "Explore first-person data and robot learning in a speaker-led workshop, take 15 minutes for pizza and open conversation, then optionally build a research or startup team.",
    "body": [
      "People create rich examples of physical behavior by handling objects, preparing food, and moving through everyday spaces. First-person video captures some of that experience. This proposed session uses EgoScale as a starting point to explore what a robot can learn from human observation—and what still requires action labels, alignment, and robot interaction.",
      "A topical, speaker-led workshop will connect the data pipeline to robot transfer and evaluation. Afterward, exactly 15 minutes of pizza and spontaneous conversation will make room for questions and new connections. The final brainstorming segment is optional: stay to develop a research or startup idea, meet possible collaborators, and choose a next step together."
    ],
    "agenda": [
      "What useful information does egocentric video contain, and what action or physical-state information is missing?",
      "How should we compare more hours of data with better labels, greater diversity, or closer alignment to a target robot?",
      "Which human skills transfer across embodiments, and where do geometry, contact, and control differences become decisive?"
    ],
    "question": "What experiment would distinguish memorizing familiar tasks from generalizing to new objects, tasks, and robot bodies?",
    "sources": [
      {
        "label": "NVIDIA Research: EgoScale",
        "url": "https://research.nvidia.com/labs/gear/egoscale/"
      },
      {
        "label": "EgoScale paper",
        "url": "https://arxiv.org/abs/2602.16710"
      }
    ],
    "workshop": [
      {
        "title": "Read a first-person demonstration",
        "detail": "The speaker will unpack what egocentric data captures: objects, hand motion, scene context, and the order of actions. We will also identify what video alone may leave uncertain, including contact forces and the state of objects outside the camera view.",
        "activity": "Suggested exercise: break an everyday manipulation task into observations, actions, and missing information, without collecting anyone’s personal footage."
      },
      {
        "title": "Turn observations into aligned action data",
        "detail": "Use EgoScale to discuss action-labeled human data and the stages that connect human and robot experience. We will examine label quality, timing, embodiment differences, and why more video is not automatically a better robot training set.",
        "activity": "Suggested exercise: propose an annotation schema for one task and identify where a human-hand action needs a different representation for a robot."
      },
      {
        "title": "Test transfer, not just a familiar demo",
        "detail": "Connect the data choices to a target robot and a defensible evaluation. The workshop will distinguish performance on familiar tasks from transfer to new objects, settings, or embodiments, with human interventions recorded separately.",
        "activity": "Suggested exercise: sketch a held-out test split, a comparison baseline, and a failure log before deciding what a successful transfer result would mean."
      }
    ],
    "projectIdeas": [
      {
        "type": "Research direction",
        "title": "An action-label quality study",
        "detail": "Plan a small comparison of annotation choices on appropriately licensed data, asking which labels are most useful for a clearly defined downstream task."
      },
      {
        "type": "Research direction",
        "title": "A transfer-evaluation scorecard",
        "detail": "Design a protocol that separates familiar-task success, new-object transfer, and human assistance, with a consistent way to record failures."
      },
      {
        "type": "Startup direction",
        "title": "A first-person data review tool",
        "detail": "Explore an interface for inspecting action labels, alignment errors, consent, and dataset permissions before footage enters a robot-learning pipeline."
      }
    ]
  }
};
