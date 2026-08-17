import React, { useEffect, useRef, useState } from "https://esm.sh/react@18.3.1";

/* =====================================================================
   MoveWell Physiotherapy — animated, single-file React site
   ---------------------------------------------------------------------
   Drop this component into any React app (CRA / Vite / Next "use client").
   Zero external dependencies — icons are inline SVG, animations are
   hand-rolled with IntersectionObserver + CSS transitions, so it works
   the moment you import it. Just `import MoveWellSite from "./MoveWellSite"`
   and render <MoveWellSite />.
===================================================================== */

/* ----------------------------- DATA ---------------------------------- */

const NAV_LINKS = [
  { href: "/about", label: "Doctor's Profile" },
];

const SERVICES = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-6 0h6",
    title: "Neurological Rehab",
    text: "Specialised therapy for stroke recovery, Parkinson's and nerve injuries to improve balance and coordination.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    detail: "Neurological physiotherapy is a specialist area focused on helping people who have experienced brain, spinal cord or nerve damage. Conditions like stroke, Parkinson's disease, multiple sclerosis and traumatic brain injury can significantly affect movement, balance, strength and daily function. Our home-based neurological rehab programme is designed to harness the brain's natural ability to rewire itself — a concept known as neuroplasticity — through targeted, repetitive and progressively challenging exercises.",
    treats: ["Stroke rehabilitation", "Parkinson's disease", "Multiple sclerosis (MS)", "Traumatic brain injury", "Spinal cord injury", "Peripheral nerve injuries", "Balance and coordination disorders", "Cerebral palsy (adults)"],
    approach: ["Gait re-training and walking rehabilitation", "Balance exercises using progressive challenge techniques", "Upper and lower limb strengthening and coordination", "Constraint-induced movement therapy (CIMT)", "Functional electrical stimulation (FES) where indicated", "Cognitive-motor dual-task training", "Home safety and fall prevention assessment"],
    benefits: ["Improved balance and reduced fall risk", "Regained ability to walk independently", "Greater upper limb control and hand function", "Reduced muscle spasticity and stiffness", "Improved speech-related posture and breathing", "Enhanced confidence and independence in daily activities", "Better quality of life for both patient and caregiver"],
  },
  {
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    title: "Senior Mobility Care",
    text: "Gentle, safe exercises for older adults focused on fall prevention, balance and maintaining independent movement.",
    img: "./Assets/explanation/senior_care.jpg",
    detail: "As we age, our muscles naturally weaken, joints stiffen and reaction times slow — all of which increase the risk of falls, injuries and loss of independence. Our Senior Mobility Care programme is specifically designed for adults aged 60 and above, focusing on safe, gentle and evidence-based exercises that can be performed at home. Every session is conducted by a qualified physiotherapist who understands the unique needs and limitations of older adults, ensuring each movement is performed correctly and comfortably.",
    treats: ["Age-related muscle weakness (sarcopenia)", "Reduced balance and coordination", "Osteoarthritis of hip, knee and spine", "Osteoporosis and fracture risk", "Dizziness and vertigo", "Post-fall anxiety and confidence issues", "Chronic joint stiffness and pain", "Difficulty walking, climbing stairs or rising from chairs"],
    approach: ["Personalised fall prevention exercise programmes", "Balance and proprioception training", "Gentle joint mobilisation and stretching", "Functional strength training (sit-to-stand, stepping)", "Home environment safety assessment", "Gait training with or without walking aids", "Education on safe movement and activity modification"],
    benefits: ["Significantly reduced fall risk", "Greater confidence walking and moving independently", "Improved strength for daily tasks like climbing stairs", "Reduced joint pain and stiffness", "Better posture and spinal alignment", "Maintained independence for longer", "Improved mood, energy and overall wellbeing"],
  },
  {
    icon: "M4.93 4.93a10 10 0 1 0 14.14 0M12 2v6",
    title: "Post-Surgical Recovery",
    text: "Structured rehabilitation after orthopaedic surgeries to restore strength, flexibility and function safely.",
    img: "./Assets/explanation/post_surgery.jpg",
    detail: "Surgery is only half the journey — structured rehabilitation is what determines how fully and quickly you recover. Whether you've had a total knee or hip replacement, spinal surgery, rotator cuff repair or ligament reconstruction, our post-surgical physiotherapy programme is tailored to your specific procedure and surgical timeline. Our physiotherapist works closely with your surgeon's protocol to guide you through each phase of recovery safely, from early mobilisation to full return of function.",
    treats: ["Total knee replacement (TKR)", "Total hip replacement (THR)", "Rotator cuff repair", "ACL / ligament reconstruction", "Spinal fusion or discectomy", "Shoulder or elbow arthroplasty", "Fracture fixation (ORIF) recovery", "Carpal tunnel release"],
    approach: ["Early post-operative mobilisation and swelling management", "Scar tissue management and wound care monitoring", "Progressive range of motion exercises", "Muscle activation and strengthening protocols", "Gait re-training and functional activity practice", "Electrotherapy for pain and swelling control", "Return-to-activity planning aligned with surgeon clearance"],
    benefits: ["Faster, safer return to full movement", "Reduced post-operative stiffness and scar tissue formation", "Prevented complications like blood clots and muscle wasting", "Restored strength to pre-surgical levels", "Reduced dependence on pain medication", "Confident return to daily activities, work and hobbies", "Clear milestones and measurable progress every session"],
  },
  {
    icon: "M12 2v20M8 6l4-4 4 4M8 18l4 4 4-4",
    title: "Joint Pain & Arthritis",
    text: "Hands-on therapy to relieve pain, improve range of motion and slow joint degeneration in knees, hips and shoulders.",
    img: "./Assets/explanation/joints.jpg",
    detail: "Joint pain and arthritis affect millions of people, making everyday activities like walking, climbing stairs or even getting dressed a painful challenge. Whether you're dealing with osteoarthritis (wear-and-tear), rheumatoid arthritis (inflammatory) or non-specific joint pain, physiotherapy is one of the most effective, evidence-based treatments available — without the side effects of long-term medication. Our approach combines hands-on therapy with targeted strengthening to relieve pain, restore movement and slow the progression of joint degeneration.",
    treats: ["Osteoarthritis of knee, hip and spine", "Rheumatoid arthritis", "Gout-related joint stiffness", "Frozen shoulder (adhesive capsulitis)", "Patellofemoral pain syndrome", "Sacroiliac joint dysfunction", "Ankle and foot arthritis", "Wrist and thumb joint pain"],
    approach: ["Joint mobilisation and manual therapy techniques", "Therapeutic ultrasound and TENS for pain relief", "Targeted muscle strengthening around affected joints", "Hydrotherapy advice and home aquatic exercise guidance", "Postural correction to reduce joint load", "Taping and bracing support where indicated", "Activity and lifestyle modification guidance"],
    benefits: ["Significant reduction in daily joint pain", "Improved joint range of motion and flexibility", "Stronger muscles that protect and support the joint", "Slowed progression of cartilage degeneration", "Less dependence on pain killers and anti-inflammatories", "Ability to return to favourite activities and hobbies", "Improved sleep quality due to reduced night pain"],
  },
  {
    icon: "M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3M12 10v11",
    title: "Sports Injury Rehab",
    text: "From ligament sprains to muscle tears — evidence-based recovery plans to get athletes back to full performance.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    detail: "Sports injuries don't just affect professional athletes — they affect anyone who runs, trains at the gym, plays weekend sports or stays active. A poorly managed injury can sideline you for months or leave lasting weakness that leads to re-injury. Our sports injury rehabilitation programme is built around getting you back to full performance as quickly and safely as possible, using evidence-based techniques tailored to your specific sport, position and fitness level. Every plan includes a detailed return-to-sport protocol.",
    treats: ["ACL, PCL and meniscus injuries", "Hamstring, quadriceps and calf strains", "Ankle sprains and ligament tears", "Shoulder dislocations and rotator cuff strains", "Tennis elbow and golfer's elbow", "Plantar fasciitis and Achilles tendinopathy", "Shin splints and stress fractures", "IT band syndrome and runner's knee"],
    approach: ["Acute phase: PRICE protocol, taping and pain management", "Biomechanical and movement pattern analysis", "Sport-specific strength and conditioning", "Proprioception and neuromuscular control training", "Plyometric and power training for return to sport", "Video gait analysis for runners", "Individualised return-to-sport milestone programme"],
    benefits: ["Full restoration of pre-injury strength and flexibility", "Dramatically reduced re-injury risk", "Improved movement mechanics and sports performance", "Faster return to training and competition", "Greater body awareness and injury prevention skills", "Sport-specific conditioning that goes beyond basic recovery", "Confidence to perform at full intensity again"],
  },
  {
    icon: "M12 3v3M12 18v3M3 12h3M18 12h3M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    title: "Back & Neck Pain",
    text: "Targeted mobilisation and strengthening for chronic or acute back and neck pain — get you back to daily life faster.",
    img: "./Assets/explanation/back_nect.jpg",
    detail: "Back and neck pain is one of the leading causes of disability worldwide, affecting people of all ages. Whether it's a sudden acute episode from lifting something heavy, or a chronic ache that's been present for years, physiotherapy addresses the root cause — not just the symptoms. Our approach combines manual therapy, targeted exercise and education to relieve pain, restore normal movement patterns and prevent recurrence. The majority of back and neck pain cases resolve completely with the right physiotherapy programme.",
    treats: ["Lower back pain (acute and chronic)", "Cervical neck pain and stiffness", "Disc herniation and sciatica", "Spondylosis and degenerative disc disease", "Facet joint syndrome", "Whiplash associated disorders", "Text neck and postural neck pain", "Thoracic and mid-back pain"],
    approach: ["Spinal joint mobilisation and manipulation", "Soft tissue release and trigger point therapy", "McKenzie method for disc-related pain", "Core stability and spinal strengthening", "TENS and therapeutic ultrasound", "Postural re-education and ergonomic advice", "Personalised home exercise programme"],
    benefits: ["Rapid reduction in acute pain intensity", "Restored full range of spinal motion", "Strong core muscles that protect the spine long-term", "Ability to return to work, driving and daily activities", "Understanding of what caused the pain and how to prevent it", "Freedom from reliance on pain medication", "Lasting relief — not just temporary symptom management"],
  },
  {
    icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z",
    title: "Posture & Ergonomics",
    text: "Assessment and correction of poor posture caused by desk work and sedentary lifestyles before they cause lasting damage.",
    img: "./Assets/explanation/posture_correction.jpg",
    detail: "Modern life — long hours at a desk, constant screen use and sedentary habits — is quietly damaging our posture and musculoskeletal health. Poor posture doesn't just cause pain; over time it leads to permanent structural changes, nerve compression, reduced lung capacity and decreased energy. Our Posture & Ergonomics programme combines a comprehensive postural assessment with targeted corrective exercises and practical advice on setting up your workstation, sleeping position and daily habits — stopping the damage before it becomes irreversible.",
    treats: ["Forward head posture (tech neck)", "Rounded shoulders and kyphosis", "Lumbar hyperlordosis (sway back)", "Scoliosis-related postural imbalance", "Desk-related neck and shoulder tension", "Repetitive strain injuries (RSI)", "Chest tightness from poor thoracic posture", "Jaw pain related to forward head position"],
    approach: ["Comprehensive postural analysis and movement assessment", "Workstation and home office ergonomics review", "Targeted stretching for tight, overactive muscles", "Strengthening of weak, underactive postural muscles", "Breathing retraining and thoracic mobility work", "Taping for postural cueing", "Daily habit and activity modification coaching"],
    benefits: ["Significant reduction in neck, shoulder and back tension", "Improved posture visible within weeks", "Greater energy and reduced fatigue from better alignment", "Prevented progression to chronic musculoskeletal problems", "Reduced headache frequency related to neck tension", "Better breathing capacity and lung function", "Increased productivity and comfort during desk work"],
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    title: "Pain Management",
    text: "Multi-modal approach combining electrotherapy, dry needling and manual techniques to control and reduce chronic pain.",
    img: "./Assets/explanation/pain_management.jpg",
    detail: "Chronic pain — pain that persists beyond 3 months — is complex, deeply personal and affects every aspect of life, from sleep and mood to relationships and the ability to work. Unlike acute pain, chronic pain often involves central sensitisation, where the nervous system itself becomes hypersensitive. Our multi-modal pain management programme addresses both the physical and neurological dimensions of chronic pain using a combination of hands-on therapy, electrotherapy, education and graded activity — without dependence on medication.",
    treats: ["Chronic lower back pain", "Fibromyalgia", "Complex regional pain syndrome (CRPS)", "Chronic headaches and migraines", "Neuropathic pain and nerve pain", "Myofascial pain syndrome", "Osteoarthritis-related chronic pain", "Post-injury or post-surgical persistent pain"],
    approach: ["TENS (transcutaneous electrical nerve stimulation)", "Dry needling for trigger point release", "Therapeutic ultrasound and interferential therapy", "Graded activity and graded exposure therapy", "Pain neuroscience education (PNE)", "Manual therapy and soft tissue techniques", "Mindful movement and relaxation strategies"],
    benefits: ["Measurable reduction in pain intensity scores", "Greater control over flare-ups and triggers", "Reduced reliance on pain medication", "Improved sleep quality and daily energy", "Restored ability to engage in meaningful activities", "Better understanding of pain and reduced fear of movement", "Improved mood, confidence and quality of life"],
  },
];

const PRICING_PLANS = [
  {
    tag: "SINGLE VISIT",
    title: "Home Assessment",
    desc: "A thorough one-on-one physiotherapy session at your home — full assessment, hands-on treatment and personalised exercise plan.",
    price: "₹799",
    per: "/ session",
    note: "No package required · GST incl.",
    conditions: "*Conditions apply — details discussed in your first call with Dr. Sushil",
    featured: false,
    img: "./Assets/explanation/home.jpg",
    detail: "Our Home Assessment session is the perfect starting point for anyone dealing with pain, restricted movement or a recent injury. A BPT-certified physiotherapist visits your home fully equipped, conducts a comprehensive evaluation of your condition, delivers hands-on treatment and leaves you with a tailored exercise programme. It's clinical-grade physiotherapy without the clinic — convenient, personal and immediately effective.",
    includes: [
      "Full musculoskeletal & postural assessment",
      "Hands-on manual therapy and soft tissue treatment",
      "Electrotherapy (TENS/ultrasound) if indicated",
      "Personalised home exercise programme",
      "Written session notes and progress update",
      "Advice on activity modification and recovery",
      "Direct communication with your physiotherapist post-session",
    ],
    advantages: [
      "No travel — treatment comes to you",
      "No waiting rooms or appointment delays",
      "Familiar environment aids faster recovery",
      "Full 45-60 minutes of dedicated, one-on-one care",
      "Physiotherapist sees your home environment and gives practical advice",
      "Flexible booking — morning, afternoon or evening",
    ],
    rating: 4.9,
    ratingCount: "47 reviews",
    highlight: "Most popular for first-time patients",
  },
  {
    tag: "FOLLOW-UP",
    title: "Video Consultation",
    desc: "Live one-on-one video session to review your progress, adjust your exercise plan and answer your questions from anywhere.",
    price: "₹399",
    per: "/ session",
    note: "Book same-day · GST incl.",
    conditions: "*Conditions apply — details discussed in your first call with Dr. Sushil",
    featured: false,
    img: "./Assets/explanation/video_consultation.jpg",
    detail: "Our Video Consultation is designed as a smart, affordable way to stay on track between home visits. Your physiotherapist reviews your progress, corrects your exercise form live on video, adjusts your programme based on how you've responded and answers all your questions. It's the same expert guidance you'd get in person — without any travel, at a fraction of the cost. Same-day bookings are available so you're never left waiting.",
    includes: [
      "Live one-on-one video session (25-35 minutes)",
      "Progress review and outcome measurement",
      "Exercise form correction with real-time feedback",
      "Updated home exercise programme sent post-session",
      "Answers to all your questions and concerns",
      "Decision on next steps: home visit, continue, or discharge",
      "Session summary notes via WhatsApp or email",
    ],
    advantages: [
      "Zero travel — join from home, work or anywhere",
      "Same-day bookings available",
      "Significantly lower cost than a home visit",
      "Ideal between home visits to maintain momentum",
      "Available 7 days a week including evenings",
      "No compromise on quality — same qualified physiotherapist",
    ],
    rating: 4.8,
    ratingCount: "31 reviews",
    highlight: "Best for maintaining progress between home visits",
  },
  {
    tag: "HYBRID PHYSIO",
    title: "Recovery, reimagined.",
    desc: "Weekly home visit combined with unlimited video follow-ups — consistent, personalised care that fits your schedule and budget.",
    price: "₹999",
    per: "/ week",
    note: "Billed weekly · cancel anytime · GST incl.",
    conditions: "*Conditions apply — details discussed in your first call with Dr. Sushil",
    featured: true,
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    detail: "The Hybrid Physio package is our most comprehensive and best-value offering — designed for patients who want consistent, professional physiotherapy care without the high cost of daily home visits. You receive one hands-on home visit per week for direct assessment and treatment, combined with unlimited video follow-up sessions throughout the week to keep your recovery on track every single day. It's the perfect blend of in-person clinical excellence and flexible digital support.",
    includes: [
      "1 home visit per week (full hands-on treatment session)",
      "Unlimited video follow-up sessions throughout the week",
      "Ongoing home exercise programme with weekly updates",
      "Real-time form correction and progress tracking",
      "WhatsApp access to your physiotherapist between sessions",
      "Monthly outcome review and goal-setting session",
      "Discharge planning and long-term prevention advice",
    ],
    advantages: [
      "Best value — combines home visits and video at one weekly rate",
      "Cancel anytime — no long-term commitment",
      "Continuous care 7 days a week",
      "Faster recovery through consistent monitoring",
      "Direct physiotherapist contact whenever you need it",
      "Suitable for all conditions — from acute injury to chronic pain",
      "Transparent weekly billing — no surprises",
    ],
    rating: 5.0,
    ratingCount: "28 reviews",
    highlight: "Best value · Most comprehensive care plan",
  },
];

const SPECIALTY_PROGRAMS = [
  {
    label: "PROGRAMME · FOR ACTIVE INDIVIDUALS",
    title: "Sports & Fitness Rehab",
    tagline: "Recover. Perform. Excel.",
    desc: "A focused programme for athletes, runners and gym-goers dealing with sports injuries or overuse pain. Includes movement analysis, sport-specific strengthening, manual therapy and a return-to-sport plan.",
    tags: ["Assessment", "Strengthening", "Return to Sport"],
    cta: "Explore Sports Rehab",
    img: "./Assets/IMAGE_14.jpeg",
  },
  {
    label: "PROGRAMME · FOR DESK WORKERS",
    title: "Desk Warrior Programme",
    tagline: "Sit Smart. Move Often.",
    desc: "Built for professionals who sit for long hours. We assess your posture and workstation, deliver targeted mobility exercises and teach you simple daily habits to eliminate neck, shoulder and back pain.",
    tags: ["Posture Correction", "Ergonomics", "Mobility"],
    cta: "Explore Desk Warrior",
    img: "./Assets/IMAGE_13.jpeg",
  },
  {
    label: "PROGRAMME · FOR SENIORS",
    title: "Senior Wellness Programme",
    tagline: "Steady. Strong. Independent.",
    desc: "Gentle, evidence-based home sessions designed for older adults — focusing on improving balance, reducing fall risk, building functional strength and maintaining independence in daily activities.",
    tags: ["Balance Training", "Fall Prevention", "Strength"],
    cta: "Explore Senior Wellness",
    img: "./Assets/IMAGE_10.jpg",
  },
];

const CARE_MODES = [
  {
    title: "At Home",
    text: "A qualified physiotherapist visits with all the equipment needed for hands-on assessment and treatment — right in your living room.",
    img: "https://images.unsplash.com/photo-1645005513709-77336f075dc8?q=80&w=800&auto=format&fit=crop",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-6 0h6",
  },
  {
    title: "On Video",
    text: "Live one-on-one follow-ups between home visits, to check form, adjust your plan and keep progress on track.",
    img: "https://images.unsplash.com/photo-1758691463620-188ca7c1a04f?q=80&w=800&auto=format&fit=crop",
    icon: "M2 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12H4a2 2 0 0 1-2-2V5zM16 10l6-4v12l-6-4",
  },
];

const STATS = [
  { end: 2, suffix: "+", label: "Years of hands-on physiotherapy experience" },
  { end: 50, suffix: "+", label: "Home visit clients treated successfully" },
  { end: 150, suffix: "+", label: "Total patients treated and back to movement" },
  { end: 100, suffix: "%", label: "Home-based care — no clinic travel needed" },
];

const PROCESS_STEPS = [
  { n: "01", title: "Therapeutic Exercise", text: "Personalised movement programmes to rebuild strength, restore function and prevent re-injury." },
  { n: "02", title: "Manual Therapy", text: "Hands-on soft tissue release, joint mobilisation and myofascial techniques to relieve pain at the source." },
  { n: "03", title: "Electrotherapy", text: "TENS, ultrasound and other modalities to control pain, reduce inflammation and accelerate healing." },
  { n: "04", title: "Home Exercise Plans", text: "Customised daily programmes so recovery doesn't stop between sessions — with progress tracking and adjustments." },
];

const JOURNEY_STEPS = [
  { n: "01", title: "Book a Home Visit", text: "Choose a time that works for you — a qualified physiotherapist will come directly to your home, fully equipped." },
  { n: "02", title: "Assessment & Diagnosis", text: "Your physiotherapist evaluates posture, joint mobility, muscle strength and pain patterns to find the true root cause." },
  { n: "03", title: "Treatment & Recovery", text: "Receive a tailored combination of manual therapy, exercise and electrotherapy — with regular reviews to ensure steady progress." },
];

const TESTIMONIALS = [
  { initials: "RP", name: "Rekha P.", loc: "Home visit patient, Koramangala", quote: "I had severe lower back pain that made it impossible to get through a workday. After just a few home sessions, the stiffness disappeared and I'm back to full activity." },
  { initials: "AK", name: "Arjun K.", loc: "Home visit patient, Indiranagar", quote: "My shoulder injury was correctly diagnosed on the very first visit. The personalised plan and constant follow-ups made all the difference — I didn't need surgery after all." },
  { initials: "SN", name: "Sunita N.", loc: "Home visit patient, HSR Layout", quote: "My mother had been suffering with knee pain for years. The home physiotherapy sessions were gentle, thorough and professional. She can now walk independently again." },
  { initials: "MV", name: "Meera V.", loc: "Home visit patient, Jayanagar", quote: "The exercises were tailored specifically to my condition and the video follow-ups kept me on track between sessions. My knee mobility has improved dramatically." },
  { initials: "DR", name: "David R.", loc: "Home visit patient, Whitefield", quote: "I was doubtful about physiotherapy at home, but the level of expertise and the convenience completely changed my mind. Fully recovered in less time than expected!" },
];

const BLOG_POSTS = [
  {
    tag: "Joint Health",
    title: "Knee pain when climbing stairs? Here's what it means",
    text: "Recognising the early signs of knee degeneration and why early physiotherapy intervention makes all the difference.",
    img: "./Assets/IMAGE_03.jpg",
  },
  {
    tag: "Back Pain",
    title: "5 common causes of lower back pain and how physiotherapy helps",
    text: "From poor posture to disc problems — understand what's really behind your back pain and how targeted therapy can resolve it.",
    img: "./Assets/IMAGE_09.jpg",
  },
  {
    tag: "Home Recovery",
    title: "Why home physiotherapy is just as effective as clinic-based care",
    text: "Research-backed reasons why recovering in your own environment can actually speed up your return to full function.",
    img: "./Assets/IMAGE_02.jpg",
  },
];

const SERVICE_OPTIONS = [
  "Back & Neck Pain",
  "Joint Pain & Arthritis",
  "Sports Injury Rehab",
  "Post-Surgical Recovery",
  "Neurological Rehab",
  "Posture & Ergonomics",
  "Senior Mobility Care",
  "Pain Management",
  "General Consultation",
];

/* ------------------------- SMALL SHARED ICONS ------------------------- */

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const IconArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.14L2 22l5.09-1.53a9.87 9.87 0 0 0 4.95 1.32h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.31-1.93 1.36-.5.05-1 .24-3.33-.7-2.82-1.13-4.63-3.98-4.77-4.17-.14-.19-1.14-1.52-1.14-2.9 0-1.37.72-2.05.97-2.33.25-.28.55-.35.73-.35h.53c.17 0 .4-.03.61.47.24.58.8 2 .87 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" /></svg>
);

/* ------------------------------- HOOKS -------------------------------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as = "div", ...rest }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ end, suffix = "", duration = 1400 }) {
  const [ref, visible] = useReveal(0.1);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------ HEADER -------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={scrolled ? "is-scrolled" : ""}>
      <div className="nav-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {currentPath !== "/" && (
            <a
              href="/"
              className="btn btn-sm btn-outline-dark back-btn"
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "6px 10px", border: "1px solid rgba(0,0,0,0.12)",
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)",
                color: "var(--teal-darker)", fontWeight: "600", fontSize: "0.82rem"
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </a>
          )}
          {/* Logo */}
          <a href="/" className="logo">
            <img src="./Assets/LOGO_01.png" alt="Hudadi Logo" className="header-logo-img" style={{ borderRadius: "8px" }} />
          </a>
        </div>

        {/* Desktop actions */}
        <div className="nav-right desktop-nav-right">
          <span className="nav-phone">
            <IconPhone />
            <span className="txt">+91 63645 89646</span>
          </span>
          <a
            href="/about"
            className="btn btn-sm"
            style={{
              background: currentPath === "/about" ? "var(--teal-tint)" : "transparent",
              color: "var(--teal-deep)",
              border: "1.5px solid var(--teal-deep)",
              fontWeight: 600,
            }}
          >
            Doctor's Profile
          </a>
          <a href="/#contact" className="btn btn-coral btn-sm">
            Book Appointment
          </a>
          <a href="https://wa.me/916364589646" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
            <IconWhatsapp /> Chat with Us
          </a>
        </div>

        {/* Mobile menu toggle icon button */}
        <button
          type="button"
          className={`mobile-menu-btn ${mobileOpen ? "is-active" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* Mobile Collapsible Dropdown Menu */}
      <div className={`mobile-nav-panel ${mobileOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-inner">
          <a
            href="/about"
            className="mobile-item profile-item"
            onClick={() => setMobileOpen(false)}
            style={{
              background: currentPath === "/about" ? "var(--teal-tint)" : "var(--teal-tint-2)",
            }}
          >
            <div className="item-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="item-text">
              <span className="title">Doctor's Profile</span>
              <span className="subtitle">Dr. Sushil Hudadi (BPT, MPT)</span>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "16px", height: "16px", marginLeft: "auto", color: "var(--teal-deep)" }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>

          <a
            href="/#contact"
            className="btn btn-coral mobile-action-btn"
            onClick={() => setMobileOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px" }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Appointment
          </a>

          <a
            href="https://wa.me/916364589646"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mobile-action-btn"
            onClick={() => setMobileOpen(false)}
          >
            <IconWhatsapp /> Chat with Us
          </a>

          <div className="mobile-nav-footer">
            <a href="tel:+916364589646" className="mobile-phone-link" onClick={() => setMobileOpen(false)}>
              <IconPhone />
              <span>Call: +91 63645 89646</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- HERO --------------------------------- */

function Hero() {
  return (
    <section className="hero" id="home">
      {/* full-bleed background image */}
      <div className="hero-bg">
        <img src="./Assets/IMAGE_01.jpg" alt="Physiotherapy background" />
        <div className="hero-overlay" />
      </div>

      {/* centred content */}
      <div className="hero-center">
        <div className="hero-badge-row">
          <span className="hero-badge">🏅 BPT-Certified Physiotherapist</span>
          <span className="hero-badge">📍 Home Visit · Bangalore</span>
        </div>

        <h1 className="hero-headline">
          Expert Physiotherapy,
          <br />
          <em>Right At Your Doorstep</em>
        </h1>

        <p className="hero-sub">
          Skip the clinic. Our qualified physiotherapist brings hands-on assessment,
          treatment and personalised care directly to your home — anytime, any day.
        </p>


        {/* appointment booking filter placed in hero */}
        <div style={{ width: "100%", marginTop: "10px" }}>
          <BookingFilter />
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-scroll-cue">
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ------------------------------ INFO BAR -------------------------------- */

function InfoBar() {
  return (
    <div className="info-bar" style={{ background: "var(--teal-darker)", padding: "30px 0" }}>
      <div className="container" style={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "center" }}>
        <div className="hero-trust" style={{ border: "none", background: "transparent", boxShadow: "none" }}>
          <div className="hero-trust-item">
            <span className="ht-num">150+</span>
            <span className="ht-lbl">Patients Treated</span>
          </div>
          <div className="ht-sep" />
          <div className="hero-trust-item">
            <span className="ht-num">★ 4.9</span>
            <span className="ht-lbl">Average Rating</span>
          </div>
          <div className="ht-sep" />
          <div className="hero-trust-item">
            <span className="ht-num">50+</span>
            <span className="ht-lbl">Home Visits Done</span>
          </div>
          <div className="ht-sep" />
          <div className="hero-trust-item">
            <span className="ht-num">100%</span>
            <span className="ht-lbl">Home-Based Care</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- ABOUT --------------------------------- */

function About() {
  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <Reveal className="about-photos" as="div">
          <div className="about-photo-main">
            <img
              src="./Assets/IMAGE_11.jpg"
              alt="Physiotherapist guiding a patient through a strengthening exercise at home"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">About Hudadi Physiotherapy</span>
          <h2 className="h2-tight">
            Clinical excellence,
            <br />
            delivered to your door.
          </h2>
          <p className="about-lead">
            Hudadi Physiotherapy & Rehabilitation was founded on one belief: you shouldn't have to travel when you're in pain.
            Our physiotherapist brings evidence-based care, professional equipment and genuine
            compassion directly to you — helping you recover from the root cause, not just the symptoms.
          </p>
          <ul className="about-list">
            {[
              "Qualified, BPT-certified physiotherapist",
              "Transparent, affordable pricing",
              "Evidence-based treatment methods",
              "Personalised home exercise plans",
            ].map((t) => (
              <li key={t}>
                <span className="tick"><IconCheck /></span>
                {t}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-outline">Book a Consultation</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- SERVICES -------------------------------- */

function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="svc-modal-overlay" onClick={onClose}>
      <div className="svc-modal-page" onClick={(e) => e.stopPropagation()}>
        {/* Hero image */}
        <div className="svc-modal-hero">
          <img src={service.img} alt={service.title} />
          <div className="svc-modal-hero-overlay" />
          <button className="svc-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="svc-modal-hero-content">
            <div className="svc-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={service.icon} />
              </svg>
            </div>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </div>
        </div>

        {/* Body */}
        <div className="svc-modal-body">
          <div className="svc-modal-container">

            {/* Overview */}
            <div className="svc-modal-section">
              <span className="svc-modal-eyebrow">Overview</span>
              <h3>What is {service.title}?</h3>
              <p>{service.detail}</p>
            </div>

            <div className="svc-modal-two-col">
              {/* What We Treat */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">Conditions Covered</span>
                <h3>What We Treat</h3>
                <ul className="svc-modal-list">
                  {service.treats.map((t) => (
                    <li key={t}>
                      <span className="svc-modal-bullet" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Approach */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">Our Method</span>
                <h3>Treatment Approach</h3>
                <ul className="svc-modal-list svc-modal-list--approach">
                  {service.approach.map((a, i) => (
                    <li key={a}>
                      <span className="svc-modal-num">{String(i + 1).padStart(2, "0")}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="svc-modal-section svc-modal-benefits-section">
              <span className="svc-modal-eyebrow" style={{ color: "var(--coral)" }}>Results</span>
              <h3>Benefits After Treatment</h3>
              <div className="svc-modal-benefits-grid">
                {service.benefits.map((b) => (
                  <div key={b} className="svc-modal-benefit-card">
                    <span className="svc-modal-benefit-tick">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="svc-modal-cta">
              <p>Ready to start your recovery journey?</p>
              <a href="/#contact" className="btn btn-coral" onClick={onClose}>Book a Home Visit</a>
              <a href={`https://wa.me/916364589646`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [showAll, setShowAll] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const visible = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <>
      <section className="services" id="services">
        <div className="container">
          <Reveal className="section-head center" as="div">
            <span className="eyebrow">What We Treat</span>
            <h2>Conditions we specialise in</h2>
            <p>
              Whether it's a sudden injury, chronic pain or post-surgical stiffness — every condition
              is thoroughly assessed and treated with a personalised plan built for your body.
            </p>
          </Reveal>

          <div className="service-grid">
            {visible.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="service-card" onClick={() => setSelectedService(s)} style={{ cursor: "pointer" }}>
                <div className="service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="know-more">Know More →</span>
              </Reveal>
            ))}
          </div>

          <div className="services-footnote">
            <p>Every treatment plan is tailored to your specific condition, monitored session-by-session and adjusted as you progress — because no two recoveries are the same.</p>
            <button className="btn btn-outline" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Collapse ↑" : "View All Services ↓"}
            </button>
          </div>
        </div>
      </section>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </>
  );
}

/* -------------------------------- SHARED DATA --------------------------------- */
export const SERVICE_AREAS = [
  { area: "Kengeri" },
  { area: "Nagarabhavi" },
  { area: "Ullal" },
  { area: "Vijayanagar" },
  { area: "Deepanjali Nagar" },
  { area: "Banashankari" },
  { area: "Girinagar" },
  { area: "Kumaraswamy Layout" },
  { area: "Basavanagudi" },
  { area: "Sunkadakatte" },
  { area: "Laggere" },
  { area: "Srinagar" },
  { area: "Basaveshwaranagar" },
  { area: "Nayandalli" },
];

export const SPECIALIZATIONS = [
  { icon: "🏃", title: "Sports Injuries & Therapy", desc: "Diagnosis and rehabilitation of ligament, muscle, and joint injuries for athletes." },
  { icon: "💊", title: "Pain Management", desc: "Multi-modal approach to controlling and reducing chronic and acute pain." },
  { icon: "👶", title: "Pediatric Physiotherapy", desc: "Gentle, safe therapy programs tailored for children's developing bodies." },
  { icon: "👴", title: "Geriatric Physiotherapy", desc: "Fall prevention, balance training, and mobility care for older adults." },
  { icon: "🧠", title: "Neurological Physiotherapy", desc: "Rehabilitation for stroke, Parkinson's, and nerve-related conditions." },
  { icon: "🙌", title: "Manual Therapy", desc: "Hands-on joint mobilisation and soft tissue techniques for rapid relief." },
  { icon: "🪡", title: "Dry Needling", desc: "Targeted needling to release muscle trigger points and reduce tension." },
  { icon: "🏥", title: "Pre & Post-Operative Rehab", desc: "Structured plans to prepare for and recover from orthopaedic surgery." },
  { icon: "🧬", title: "Motor Neuron Diseases", desc: "Specialist support for MND patients to maintain function and independence." },
];

export const CONDITIONS_WE_TREAT = [
  {
    category: "Cardiorespiratory Physiotherapy",
    emoji: "❤️",
    conditions: [
      "Airway Clearance",
      "Asthma",
      "Breathing Exercises",
      "Bronchitis",
      "COPD",
      "Cardiac Rehabilitation",
      "Exercise & Endurance Training",
      "ICU / Critical Care Physiotherapy",
      "Pneumonia",
      "Post-CABG Rehabilitation",
      "Post-COVID Respiratory Rehabilitation",
      "Post-MI Rehabilitation",
      "Post-operative Chest Physiotherapy",
      "Pulmonary Rehabilitation"
    ]
  },
  {
    category: "Disability & Rehabilitation Physiotherapy",
    emoji: "♿",
    conditions: [
      "Activities of Daily Living (ADL) Training",
      "Amputee Rehabilitation",
      "Assistive Device Training",
      "Balance & Mobility Training",
      "Contracture Prevention",
      "Functional Independence Training",
      "Gait Training",
      "Neurological Disability Rehabilitation",
      "Physical Disability Rehabilitation",
      "Postural Correction",
      "Prosthetic & Orthotic Training",
      "Spinal Cord Injury Rehabilitation",
      "Stroke Rehabilitation",
      "Wheelchair Training"
    ]
  },
  {
    category: "Geriatric Physiotherapy",
    emoji: "🩺",
    conditions: [
      "Age-related Muscle Weakness",
      "Fall Prevention",
      "Falls & Balance Problems",
      "Gait Disorders",
      "General Deconditioning",
      "Joint Stiffness",
      "Mobility & Functional Training",
      "Osteoarthritis",
      "Osteoporosis",
      "Parkinson’s Rehabilitation",
      "Post-fracture Rehabilitation",
      "Stroke Rehabilitation"
    ]
  },
  {
    category: "Neurological Physiotherapy",
    emoji: "🧠",
    conditions: [
      "Ataxia & Balance Disorders",
      "Bell’s Palsy / Facial Palsy",
      "Cerebral Palsy",
      "Guillain-Barré Syndrome (GBS)",
      "Motor Neuron Disease",
      "Multiple Sclerosis (MS)",
      "Muscle weakness and coordination problems",
      "Neuropathy",
      "Parkinson’s Disease",
      "Peripheral Nerve Injuries",
      "Post-neurosurgical rehabilitation",
      "Spinal Cord Injury (SCI)",
      "Stroke / Hemiplegia",
      "Traumatic Brain Injury (TBI)",
      "Vestibular disorders & Vertigo"
    ]
  },
  {
    category: "OBG / Women’s Health Physiotherapy",
    emoji: "🤰",
    conditions: [
      "Antenatal Physiotherapy",
      "C-section Rehabilitation",
      "Diastasis Recti",
      "Normal Delivery Recovery",
      "Pelvic Floor Dysfunction",
      "Pelvic Floor Muscle Training",
      "Pelvic Girdle Pain",
      "Postnatal Physiotherapy",
      "Postpartum Rehabilitation",
      "Postural & Core Rehabilitation",
      "Pre- and Postnatal Exercise Programs",
      "Pregnancy-related Back Pain",
      "Urinary Incontinence"
    ]
  },
  {
    category: "Orthopaedic Physiotherapy",
    emoji: "🦴",
    conditions: [
      "Ankle Sprain",
      "Cervical Spondylosis",
      "Disc Bulge / Herniated Disc",
      "Frozen Shoulder / Adhesive Capsulitis",
      "Golfer’s Elbow",
      "Intervertebral Disc Prolapse (IVDP)",
      "Joint Stiffness",
      "Knee Osteoarthritis",
      "Ligament Injuries",
      "Low Back Pain",
      "Lumbar Spondylosis",
      "Muscle Strains",
      "Neck Pain",
      "Post-operative Fracture Rehabilitation",
      "Post-operative Orthopaedic Rehabilitation",
      "Rotator Cuff Injuries",
      "Sciatica",
      "Tendinitis / Tendinopathy",
      "Tennis Elbow",
      "Total Hip Replacement (THR)",
      "Total Knee Replacement (TKR)"
    ]
  },
  {
    category: "Pain Management",
    emoji: "🔥",
    conditions: [
      "Acute & Chronic Pain",
      "Electrotherapy-based Pain Management",
      "Headache-related Musculoskeletal Pain",
      "Joint Pain",
      "Knee Pain",
      "Low Back Pain",
      "Muscle Spasm",
      "Myofascial Pain",
      "Neck Pain",
      "Post-operative Pain",
      "Sciatica",
      "Shoulder Pain"
    ]
  },
  {
    category: "Pediatric Physiotherapy",
    emoji: "👶",
    conditions: [
      "Cerebral Palsy",
      "Congenital Deformities",
      "Delayed Milestones",
      "Developmental Coordination Disorders",
      "Developmental Delay",
      "Down Syndrome",
      "Erb’s Palsy / Brachial Plexus Injury",
      "Gait Abnormalities",
      "Muscular Dystrophy",
      "Pediatric Neurological Conditions",
      "Post-operative Pediatric Rehabilitation",
      "Spina Bifida",
      "Torticollis"
    ]
  },
  {
    category: "Post-operative Rehabilitation",
    emoji: "🏥",
    conditions: [
      "Abdominal Surgery Rehabilitation",
      "ACL Reconstruction Rehabilitation",
      "Cancer Surgery Rehabilitation",
      "Fracture Rehabilitation",
      "Joint Replacement Rehabilitation",
      "Post-operative Mobility & Gait Training",
      "Rotator Cuff Surgery Rehabilitation",
      "Spinal Surgery Rehabilitation",
      "THR Rehabilitation",
      "TKR Rehabilitation"
    ]
  },
  {
    category: "Sports Physiotherapy",
    emoji: "🏃",
    conditions: [
      "Achilles Tendinopathy",
      "ACL / PCL Injuries",
      "Ankle Sprains",
      "Calf Muscle Injuries",
      "Groin Strain",
      "Hamstring Strain",
      "MCL / LCL Injuries",
      "Meniscus Injuries",
      "Muscle Cramps",
      "Overuse Injuries",
      "Quadriceps Strain",
      "Return-to-Sport Rehabilitation",
      "Rotator Cuff Injuries",
      "Shin Splints",
      "Shoulder Dislocation",
      "Sports Injury Prevention & Performance Rehabilitation",
      "Sports-related Fractures",
      "Tennis Elbow"
    ]
  }
];

/* -------------------------------- SHARED COMPONENTS --------------------------- */
export function BookingFilter() {
  const [location, setLocation] = useState("");
  const [injury, setInjury] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split('T')[0];

  const handleBook = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (injury) params.append("injury", injury);
    if (date) params.append("date", date);

    const href = `/#contact?${params.toString()}`;
    const a = document.createElement('a');
    a.href = href;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="ap-booking-filter">
      {/* Location */}
      <div className="ap-bf-field">
        <label>Location</label>
        <div style={{ position: "relative" }}>
          <select value={location} onChange={e => setLocation(e.target.value)} className="ap-bf-input">
            <option value="">Select Area</option>
            {SERVICE_AREAS.map(s => <option key={s.area} value={s.area}>{s.area}</option>)}
          </select>
          <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-soft)" }}>▼</div>
        </div>
      </div>

      {/* Injury */}
      <div className="ap-bf-field">
        <label>Condition</label>
        <div style={{ position: "relative" }}>
          <select value={injury} onChange={e => setInjury(e.target.value)} className="ap-bf-input">
            <option value="">Select Condition</option>
            {CONDITIONS_WE_TREAT.map(cat => (
              <optgroup key={cat.category} label={`${cat.emoji} ${cat.category}`}>
                {cat.conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </optgroup>
            ))}
          </select>
          <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-soft)" }}>▼</div>
        </div>
      </div>

      {/* Date */}
      <div className="ap-bf-field">
        <label>Preferred Date</label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={e => setDate(e.target.value)}
          className="ap-bf-input"
          style={{ padding: "13px 16px" }}
        />
      </div>

      {/* Button */}
      <div>
        <button onClick={handleBook} className="ap-bf-btn">
          Book Now
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- PRICING --------------------------------- */

function PricingModal({ plan, onClose }) {
  useEffect(() => {
    if (!plan) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [plan, onClose]);

  if (!plan) return null;

  const stars = Math.round(plan.rating);

  return (
    <div className="svc-modal-overlay" onClick={onClose}>
      <div className="svc-modal-page pm-page" onClick={(e) => e.stopPropagation()}>

        {/* Hero */}
        <div className="svc-modal-hero pm-hero">
          <img src={plan.img} alt={plan.title} />
          <div className="svc-modal-hero-overlay" />
          <button className="svc-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="svc-modal-hero-content">
            <span className="pm-hero-tag">{plan.tag}</span>
            <h2>{plan.featured ? "Recovery, reimagined." : plan.title}</h2>
            <p>{plan.desc}</p>
            <div className="pm-hero-price">
              <span className="pm-price-big">{plan.price}</span>
              <span className="pm-price-per">{plan.per}</span>
              <span className="pm-price-note">{plan.note}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="svc-modal-body">
          <div className="svc-modal-container">

            {/* Rating + Highlight */}
            <div className="pm-rating-bar">
              <div className="pm-rating-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < stars ? "var(--coral)" : "#ddd", fontSize: "1.3rem" }}>★</span>
                ))}
                <strong>{plan.rating}</strong>
                <span className="pm-rating-count">({plan.ratingCount})</span>
              </div>
              {plan.highlight && (
                <span className="pm-highlight-badge">{plan.highlight}</span>
              )}
            </div>

            {/* Overview */}
            <div className="svc-modal-section">
              <span className="svc-modal-eyebrow">About This Plan</span>
              <h3>What is the {plan.title.includes("reimagined") ? "Hybrid Physio" : plan.title} plan?</h3>
              <p>{plan.detail}</p>
            </div>

            <div className="svc-modal-two-col">
              {/* What's Included */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">What's Included</span>
                <h3>Every session includes</h3>
                <ul className="svc-modal-list">
                  {plan.includes.map((item) => (
                    <li key={item}>
                      <span className="svc-modal-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">Why Choose This</span>
                <h3>Key advantages</h3>
                <ul className="svc-modal-list svc-modal-list--approach">
                  {plan.advantages.map((a, i) => (
                    <li key={a}>
                      <span className="svc-modal-num">{String(i + 1).padStart(2, "0")}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits after treatment */}
            <div className="svc-modal-section svc-modal-benefits-section">
              <span className="svc-modal-eyebrow" style={{ color: "var(--coral)" }}>Outcomes</span>
              <h3>Benefits of Consistent Physiotherapy</h3>
              <div className="svc-modal-benefits-grid">
                {[
                  "Pain significantly reduced or eliminated",
                  "Restored strength and full range of motion",
                  "Faster recovery vs. unguided self-treatment",
                  "Lower risk of re-injury or chronic relapse",
                  "Reduced dependence on pain medication",
                  "Return to work, sport and daily activities",
                  "Greater body awareness and self-management skills",
                  "Improved sleep, energy and quality of life",
                  "Personalised care — no generic protocols",
                ].map((b) => (
                  <div key={b} className="svc-modal-benefit-card">
                    <span className="svc-modal-benefit-tick">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="svc-modal-cta">
              <p>Ready to book the <strong style={{ color: "#9FD8FF" }}>{plan.title.includes("reimagined") ? "Hybrid Physio" : plan.title}</strong> plan?</p>
              <a href="/#contact" className="btn btn-coral" onClick={onClose}>Book Now — {plan.price}{plan.per}</a>
              <a href="https://wa.me/916364589646" target="_blank" rel="noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <>
      <section className="pricing" id="pricing">
        <div className="container">
          <Reveal className="section-head center" as="div">
            <span className="eyebrow">Transparent Pricing</span>
            <h2>
              Honest costs. <em>No surprises.</em>
            </h2>
            <p>
              All session prices are clear and upfront — no hidden charges, no pressure to buy packages.
              A home visit session starts at ₹799, making professional physiotherapy accessible to everyone.
            </p>
          </Reveal>

          <div className="pricing-grid">
            {PRICING_PLANS.map((p, i) =>
              p.featured ? (
                <Reveal key={p.title} delay={i * 100} className="price-card price-card--featured" onClick={() => setSelectedPlan(p)} style={{ cursor: "pointer" }}>
                  <div className="price-badges">
                    <span className="pill pill-teal">NEW</span>
                    <span className="pill pill-outline">{p.tag}</span>
                  </div>
                  <h3>
                    {p.title.split(",")[0]}, <em>{p.title.split(",")[1]}</em>
                  </h3>
                  <p>{p.desc}</p>
                  <div className="price-row">
                    <div className="price-big">
                      <span className="rupee">₹</span>
                      {p.price.replace("₹", "")}
                      <span className="per">{p.per}</span>
                    </div>
                    <span className="price-note">{p.note}</span>
                  </div>
                  {p.conditions && <span className="price-conditions">{p.conditions}</span>}
                  <div className="price-featured-footer">
                    <span>Prefer to talk first? <a href="#contact">Book a tele-consult</a></span>
                    <span className="btn btn-coral btn-sm">Learn More →</span>
                  </div>
                </Reveal>
              ) : (
                <Reveal key={p.title} delay={i * 100} className="price-card" onClick={() => setSelectedPlan(p)} style={{ cursor: "pointer" }}>
                  <span className="pill pill-outline-dark">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="price-row">
                    <div className="price-big price-big--dark">
                      {p.price}
                      <span className="per">{p.per}</span>
                    </div>
                  </div>
                  <span className="price-note">{p.note}</span>
                  {p.conditions && <span className="price-conditions">{p.conditions}</span>}
                  <span className="btn btn-outline price-cta">Learn More →</span>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>
      <PricingModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </>
  );
}

/* --------------------------- SPECIALTY PROGRAMS ---------------------------- */

function SpecialtyPrograms() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const program = SPECIALTY_PROGRAMS[active];
  const INTERVAL = 5000;

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
    }, 50);
    const advance = setTimeout(() => {
      setActive((a) => (a + 1) % SPECIALTY_PROGRAMS.length);
    }, INTERVAL);
    return () => { clearInterval(tick); clearTimeout(advance); };
  }, [active]);

  return (
    <section className="programs" id="programs">
      <div className="container">
        <Reveal className="section-head center" as="div">
          <span className="eyebrow" style={{ color: "var(--coral)" }}>Specialty Programs</span>
          <h2>Care built for how you actually live</h2>
          <p>Focused programmes for the people and problems we see most — pick the one that matches your life.</p>
        </Reveal>

        <div className="program-tabs">
          {SPECIALTY_PROGRAMS.map((p, i) => (
            <button
              key={p.title}
              className={`program-tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {p.title}
              {i === active && (
                <span className="tab-progress-bar" style={{ width: `${progress}%` }} />
              )}
            </button>
          ))}
        </div>

        <div className="program-card" key={program.title}>
          <div className="program-copy">
            <span className="program-label">{program.label}</span>
            <h3>
              {program.title} — <em>{program.tagline}</em>
            </h3>
            <p>{program.desc}</p>
            <div className="program-tags">
              {program.tags.map((t) => (
                <span key={t} className="pill pill-program">{t}</span>
              ))}
            </div>
            <a href="#contact" className="btn btn-coral">
              {program.cta} <IconArrowUpRight />
            </a>
          </div>
          <div className="program-photo">
            <span className="live-badge">
              <span className="live-dot" /> LIVE
            </span>
            <img src={program.img} alt={program.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CARE MODES -------------------------------- */

function CareModes() {
  return (
    <section className="modes">
      <div className="container">
        <Reveal className="section-head center" as="div">
          <span className="eyebrow" style={{ color: "var(--coral)" }}>Care, Your Way</span>
          <h2>Recovery delivered to your home</h2>
          <p>Trained physiotherapists delivering the same clinical standard of care, in two flexible formats — no travel required.</p>
        </Reveal>

        <div className="mode-grid">
          {CARE_MODES.map((m, i) => (
            <Reveal key={m.title} delay={i * 120} className="mode-card">
              <div className="mode-body">
                <div className="mi">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={m.icon} />
                  </svg>
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <a href="#contact" className="btn btn-outline btn-sm btn-on-dark">Book Now</a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="stat-strip" as="div">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <h4><CountUp end={s.end} suffix={s.suffix} /></h4>
              <p>{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- PROCESS --------------------------------- */

function Process() {
  return (
    <section className="process">
      <div className="container">
        <Reveal className="section-head" as="div">
          <span className="eyebrow">Our Method</span>
          <h2>How we treat: a structured approach to recovery</h2>
          <p>Every treatment follows a proven, multi-modal protocol designed to deliver lasting results — not just temporary relief.</p>
        </Reveal>

        <div className="process-grid">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="process-card">
              <div className="process-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="therapy-banner" as="div">
          <img
            src="https://images.unsplash.com/photo-1540205895360-4ad4cffb3aa8?q=80&w=1400&auto=format&fit=crop"
            alt="Physiotherapist performing manual therapy on a patient at home"
          />
          <div className="overlay">
            <div className="overlay-text">
              <h3>Hands-on care in your own space</h3>
              <p>Every home visit is fully equipped — bringing clinical tools and expert hands-on therapy to your living room so you recover faster without leaving home.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- JOURNEY ---------------------------------- */

function Journey() {
  return (
    <section className="journey">
      <div className="container journey-grid">
        <div>
          <span className="eyebrow">How It Works</span>
          <h2 className="h2-tight">Your recovery journey — step by step</h2>
          <div className="journey-steps">
            {JOURNEY_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100} className="jstep">
                <div className="jn">{s.n}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="journey-art" delay={150} as="div">
          <img
            src="./Assets/IMAGE_12.jpg"
            alt="Physiotherapist supporting a patient's recovery at home"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS -------------------------------- */

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <Reveal className="section-head center" as="div">
          <span className="eyebrow" style={{ color: "var(--coral)" }}>Testimonials</span>
          <h2>What our patients say</h2>
          <p>Real stories from people who found their way back to pain-free movement.</p>
        </Reveal>
      </div>

      <div className="marquee-wrapper">
        <div className="t-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="t-card">
              <span className="stars">★★★★★</span>
              <p className="quote">{t.quote}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="t-grid" aria-hidden="true">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name + "-dup"} className="t-card">
              <span className="stars">★★★★★</span>
              <p className="quote">{t.quote}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- BLOG ------------------------------------ */

function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="blog-top">
          <Reveal className="section-head" style={{ marginBottom: 0 }} as="div">
            <span className="eyebrow">From the Blog</span>
            <h2>Latest articles on movement & recovery</h2>
          </Reveal>
          <a href="#" className="btn btn-outline">View All Blogs</a>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((b, i) => (
            <Reveal key={b.title} delay={i * 100} className="blog-card">
              <div className="blog-thumb">
                <img src={b.img} alt={b.title} />
              </div>
              <div className="blog-body">
                <span className="blog-tag">{b.tag}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CONTACT FORM --------------------------------- */

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get("location");
    const inj = params.get("injury");
    const dt = params.get("date");
    if (loc || inj || dt) {
      setForm(f => ({
        ...f,
        message: `Hi, I would like to book an appointment.\nLocation: ${loc || 'Not specified'}\nCondition: ${inj || 'Not specified'}\nPreferred Date: ${dt || 'Not specified'}`
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.phone.trim()) errs.phone = "Please enter a phone number";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setStatus("success"); // Graceful fallback
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      }
    } catch (err) {
      console.warn("Contact submission error:", err);
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <Reveal as="div">
          <span className="eyebrow">Contact Info</span>
          <h2 className="h2-tight">
            We're Here to Help — <span className="accent-blue">Let's Get You Moving Again</span>
          </h2>
          <p className="about-lead">
            Living with pain or restricted movement? Our physiotherapist will come to your home,
            assess your condition thoroughly and start treatment on the very first visit. Reach
            out today — recovery starts with one message.
          </p>
          <ul className="contact-meta">
            <li><IconPhone /> +91 63645 89646</li>
            <li>
              <IconMail />
              <a href="mailto:infohudadi@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                infohudadi@gmail.com
              </a>
            </li>
            <li><IconClock /> Mon to Sat 8:00AM to 9:00PM</li>
          </ul>
        </Reveal>

        <Reveal delay={120} as="div">
          {status === "success" ? (
            <div className="form-success">
              <div className="form-success-icon"><IconCheck /></div>
              <h3>Thanks, we got it!</h3>
              <p>A member of our care team will reach out within one business day.</p>
              <button className="btn btn-outline" onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select Service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-coral" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- CTA BANNER ---------------------------------- */

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner-inner">
        <Reveal as="div">
          <h2>Ready to move without pain?</h2>
          <p>Book your first home physiotherapy session today — our therapist will be at your door within 24 hours, fully equipped and ready to help.</p>
        </Reveal>
        <a href="tel:+916364589646" className="btn btn-coral">Call +91 63645 89646</a>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER ------------------------------------- */

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <img src="./Assets/LOGO_01.png" alt="Hudadi Logo" style={{ height: "60px", background: "var(--teal-tint-2)", padding: "8px 24px", borderRadius: "12px", boxSizing: "content-box" }} />
            </a>
            <p>Expert physiotherapy care to relieve pain, restore mobility and improve overall wellbeing — with treatment plans built around you.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="#" aria-label="WhatsApp"><IconWhatsapp /></a>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/about">Doctor's Profile</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4>Areas We Cover</h4>
            <ul>
              <li><a href="#contact">Kengeri</a></li>
              <li><a href="#contact">Nagarabhavi</a></li>
              <li><a href="#contact">Vijayanagar</a></li>
              <li><a href="#contact">Banashankari</a></li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Neurological Rehab</a></li>
              <li><a href="#services">Senior Mobility Care</a></li>
              <li><a href="#services">Post-Surgical Recovery</a></li>
              <li><a href="#services">Joint Pain & Arthritis</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Hudadi Physiotherapy & Rehabilitation. All Rights Reserved.</span>
          <span style={{ fontWeight: 600, letterSpacing: "0.05em", color: "var(--coral)" }}>MOVE BETTER. LIVE BETTER.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- FLOATING ACTION BUTTONS -------------------------- */

function Fabs() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fab-stack">
      {showTop && (
        <button className="fab fab-secondary" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <IconArrowUp />
        </button>
      )}
      <a className="fab fab-secondary" aria-label="Call us" href="tel:+916364589646">
        <IconPhone />
      </a>
      <a className="fab fab-whatsapp" aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer" href="https://wa.me/916364589646">
        <IconWhatsapp />
      </a>
    </div>
  );
}

/* ---------------------------------- STYLES -------------------------------------- */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

/* ── Booking Filter ── */
.ap-booking-filter {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 24px 32px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 24px;
  align-items: end;
  width: 100%;
  position: relative;
  z-index: 2;
}
.ap-bf-field label { display: block; font-size: 0.85rem; font-family: var(--ff-display); font-weight: 700; color: var(--teal-darker); margin-bottom: 8px; }
.ap-bf-input {
  width: 100%; padding: 14px 40px 14px 16px; border-radius: 12px; border: 1px solid rgba(10,60,66,0.15);
  background: var(--white); box-shadow: 0 2px 8px rgba(10,60,66,0.04) inset;
  font-family: var(--ff-display); font-size: 0.95rem; color: var(--ink); outline: none; cursor: pointer;
  appearance: none; box-sizing: border-box;
}
.ap-bf-btn {
  width: 100%;
  background: var(--coral); color: var(--white); font-family: var(--ff-display); font-weight: 700;
  padding: 15px 36px; border-radius: 12px; border: none; cursor: pointer;
  font-size: 1.05rem; box-shadow: 0 6px 20px rgba(255,107,77,0.3);
  transition: transform 0.2s, box-shadow 0.2s; height: 48px;
}
.ap-bf-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,77,0.4); }

@media (max-width: 900px) {
  .ap-booking-filter { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .ap-booking-filter { grid-template-columns: 1fr; }
}


.mw-root{
  --teal-deep:#0A5C63;
  --teal-darker:#073E42;
  --teal-tint:#E7F2F1;
  --teal-tint-2:#F2F8F7;
  --coral:#FF6B4D;
  --coral-dark:#E5502F;
  --cream:#FAF8F4;
  --ink:#16292C;
  --ink-soft:#4B6165;
  --white:#FFFFFF;
  --line:#DCE6E4;
  --radius:16px;
  --shadow:0 10px 30px rgba(10,60,66,0.08);
  --ff-display:'Outfit',sans-serif;
  --ff-body:'Inter',sans-serif;
  font-family:var(--ff-body);
  color:var(--ink);
  background:var(--cream);
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.mw-root *{box-sizing:border-box;}
.mw-root img{max-width:100%;display:block;}
.mw-root a{text-decoration:none;color:inherit;}
.mw-root ul{list-style:none;margin:0;padding:0;}
.mw-root h1,.mw-root h2,.mw-root h3,.mw-root h4{font-family:var(--ff-display);color:var(--teal-darker);line-height:1.15;margin:0;}
.mw-root .container{max-width:1180px;margin:0 auto;padding:0 24px;}
html{scroll-behavior:smooth;}

.mw-root .eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-family:var(--ff-body);font-weight:600;font-size:.78rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--coral-dark);
  margin-bottom:14px;
}
.mw-root .eyebrow::before{content:"";width:22px;height:2px;background:var(--coral);display:inline-block;}

.mw-root .btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:15px 30px;border-radius:999px;font-family:var(--ff-body);
  font-weight:600;font-size:.95rem;cursor:pointer;border:none;
  transition:transform .25s ease, box-shadow .25s ease, background .25s ease;
  white-space:nowrap;
}
.mw-root .btn svg{width:15px;height:15px;}
.mw-root .btn-sm{padding:11px 22px;font-size:.85rem;}
.mw-root .btn-coral{background:var(--coral);color:#fff;box-shadow:0 8px 20px rgba(255,107,77,.35);}
.mw-root .btn-coral:hover{background:var(--coral-dark);transform:translateY(-2px);}
.mw-root .btn-coral:disabled{opacity:.7;cursor:not-allowed;transform:none;}
.mw-root .btn-whatsapp{background:#25D366;color:#fff;box-shadow:0 8px 20px rgba(37,211,102,.35);}
.mw-root .btn-whatsapp:hover{background:#1EBE5D;transform:translateY(-2px);}
.mw-root .btn-whatsapp svg{fill:currentColor;}
.mw-root .btn-outline{background:transparent;color:var(--teal-darker);border:1.5px solid var(--teal-darker);}
.mw-root .btn-outline:hover{background:var(--teal-darker);color:#fff;transform:translateY(-2px);}
.mw-root .btn-on-dark{color:#fff;border-color:#fff;}
.mw-root .btn-ghost-light{background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(255,255,255,.5);}
.mw-root .btn-ghost-light:hover{background:#fff;color:var(--teal-darker);}

/* reveal-on-scroll */
.mw-root .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);}
.mw-root .reveal.is-visible{opacity:1;transform:none;}
@media (prefers-reduced-motion: reduce){
  .mw-root .reveal{opacity:1 !important;transform:none !important;transition:none !important;}
  .mw-root *{animation:none !important;}
}

/* ===== HEADER ===== */
.mw-root header{
  position:sticky;top:0;z-index:100;
  background:rgba(250,248,244,.90);backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(10,60,66,.07);
  transition:box-shadow .3s ease, border-color .3s ease, background .3s ease;
}
.mw-root header.is-scrolled{border-bottom:1px solid var(--line);box-shadow:0 6px 24px rgba(10,60,66,.08);background:rgba(250,248,244,.98);}
.mw-root .nav-wrap{display:flex;align-items:center;justify-content:space-between;padding:14px 40px;width:100%;}
.mw-root .header-logo-img{height:56px;border-radius:8px;object-fit:contain;transition:height .2s ease;}

/* Desktop right actions */
.mw-root .desktop-nav-right{display:flex;align-items:center;gap:14px;}
.mw-root .desktop-nav-right .btn{box-shadow:none;}
.mw-root .nav-phone{display:flex;align-items:center;gap:8px;font-weight:600;font-size:.92rem;color:var(--teal-darker);}
.mw-root .nav-phone svg{width:16px;height:16px;}

/* Mobile Menu Icon Button (Single sleek button on right corner) */
.mw-root .mobile-menu-btn{
  display:none;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:5px;
  width:44px;
  height:44px;
  border-radius:12px;
  background:rgba(10,60,66,.08);
  border:1.5px solid rgba(10,60,66,.14);
  cursor:pointer;
  padding:0;
  transition:all .25s cubic-bezier(.4,0,.2,1);
  box-shadow:0 2px 8px rgba(10,60,66,.06);
}
.mw-root .mobile-menu-btn:hover{background:rgba(10,60,66,.14);}
.mw-root .mobile-menu-btn.is-active{background:var(--teal-deep);border-color:var(--teal-deep);box-shadow:0 4px 14px rgba(10,60,66,.25);}
.mw-root .mobile-menu-btn .bar{
  width:20px;
  height:2.5px;
  background:var(--teal-darker);
  border-radius:2px;
  transition:transform .25s cubic-bezier(.4,0,.2,1), opacity .2s ease, background .25s ease;
}
.mw-root .mobile-menu-btn.is-active .bar{background:#fff;}
.mw-root .mobile-menu-btn.is-active .bar:nth-child(1){transform:translateY(7.5px) rotate(45deg);}
.mw-root .mobile-menu-btn.is-active .bar:nth-child(2){opacity:0;transform:scaleX(0);}
.mw-root .mobile-menu-btn.is-active .bar:nth-child(3){transform:translateY(-7.5px) rotate(-45deg);}

/* Mobile Dropdown Panel */
.mw-root .mobile-nav-panel{
  display:none;
  max-height:0;
  overflow:hidden;
  opacity:0;
  background:rgba(255,255,255,.98);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--line);
  transition:max-height .35s cubic-bezier(.4,0,.2,1), opacity .25s ease;
}
.mw-root .mobile-nav-panel.is-open{
  max-height:480px;
  opacity:1;
  border-top:1px solid rgba(10,60,66,.07);
  box-shadow:0 20px 40px rgba(10,60,66,.14);
}
.mw-root .mobile-nav-inner{
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:18px 20px 22px;
}
.mw-root .mobile-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 16px;
  border-radius:14px;
  text-decoration:none;
  transition:all .2s ease;
}
.mw-root .profile-item{
  border:1.5px solid var(--teal-deep);
  color:var(--teal-darker);
}
.mw-root .profile-item:active{
  background:var(--teal-tint) !important;
}
.mw-root .item-icon-wrap{
  width:38px;
  height:38px;
  border-radius:10px;
  background:var(--teal-deep);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}
.mw-root .item-text{display:flex;flex-direction:column;text-align:left;}
.mw-root .item-text .title{font-weight:700;font-size:.95rem;color:var(--teal-darker);line-height:1.2;}
.mw-root .item-text .subtitle{font-size:.78rem;color:var(--ink-light);margin-top:2px;}
.mw-root .mobile-action-btn{
  width:100%;
  padding:14px 18px;
  border-radius:12px;
  font-size:1rem;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  text-decoration:none;
  box-shadow:0 4px 14px rgba(0,0,0,.08);
}
.mw-root .mobile-nav-footer{
  margin-top:4px;
  padding-top:10px;
  border-top:1px dashed rgba(10,60,66,.12);
}
.mw-root .mobile-phone-link{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding:10px;
  border-radius:10px;
  background:rgba(10,60,66,.05);
  color:var(--teal-darker);
  font-weight:600;
  font-size:.9rem;
  text-decoration:none;
}

/* ===== HERO ===== */
.mw-root .hero{
  position:relative;
  width:100%;height:100vh;min-height:640px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  overflow:hidden;text-align:center;
}
/* background image layer */
.mw-root .hero-bg{
  position:absolute;inset:0;z-index:0;
}
.mw-root .hero-bg img{
  width:100%;height:100%;object-fit:cover;object-position:center 30%;
  display:block;
  transform:scale(1.05);
  animation:mwHeroZoom 14s ease-in-out infinite alternate;
}
@keyframes mwHeroZoom{
  from{transform:scale(1.05);}
  to{transform:scale(1.0);}
}
.mw-root .hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(
    160deg,
    rgba(4,28,31,0.78) 0%,
    rgba(7,62,66,0.65) 50%,
    rgba(4,20,22,0.82) 100%
  );
}
/* centered content */
.mw-root .hero-center{
  position:relative;z-index:2;
  display:flex;flex-direction:column;align-items:center;
  padding:0 24px;width:100%;max-width:1180px;
  animation:mwFadeUp .9s ease both;
}
.mw-root .hero-badge-row{
  display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:28px;
}
.mw-root .hero-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(255,255,255,.12);
  backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,.25);
  color:#fff;font-size:.78rem;font-weight:600;
  letter-spacing:.07em;text-transform:uppercase;
  padding:7px 16px;border-radius:999px;
}
.mw-root .hero-headline{
  font-family:var(--ff-display);
  font-size:clamp(2.4rem,5.5vw,4.2rem);
  font-weight:800;color:#fff;
  line-height:1.1;margin-bottom:22px;
  text-shadow:0 4px 24px rgba(0,0,0,.4);
}
.mw-root .hero-headline em{
  font-style:normal;
  background:linear-gradient(90deg,#FF8A6D,var(--coral));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
}
.mw-root .hero-sub{
  font-size:clamp(1rem,1.6vw,1.16rem);color:rgba(255,255,255,.82);
  max-width:560px;line-height:1.7;margin-bottom:34px;
}
.mw-root .hero-cta-row{
  display:flex;gap:16px;align-items:center;flex-wrap:wrap;
  justify-content:center;margin-bottom:52px;
}
.mw-root .btn-hero-ghost{
  background:rgba(255,255,255,.1);
  backdrop-filter:blur(6px);
  color:#fff;border:1.5px solid rgba(255,255,255,.45);
  padding:15px 30px;border-radius:999px;
  font-weight:600;font-size:.95rem;
  transition:background .25s ease,transform .25s ease;
}
.mw-root .btn-hero-ghost:hover{background:rgba(255,255,255,.22);transform:translateY(-2px);}
/* trust strip */
.mw-root .hero-trust{
  display:flex;align-items:center;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.16);
  border-radius:20px;padding:18px 24px;
  flex-wrap:nowrap;justify-content:center;gap:0;
  white-space:nowrap;
}
.mw-root .hero-trust-item{
  display:flex;flex-direction:column;align-items:center;
  padding:0 28px;
}
.mw-root .ht-num{
  font-family:var(--ff-display);font-weight:800;
  font-size:1.55rem;color:#fff;line-height:1;
  margin-bottom:4px;
}
.mw-root .ht-lbl{
  font-size:.72rem;text-transform:uppercase;
  letter-spacing:.08em;color:rgba(255,255,255,.6);
}
.mw-root .ht-sep{
  width:1px;height:36px;background:rgba(255,255,255,.2);
  flex-shrink:0;
}
/* scroll cue */
.mw-root .hero-scroll-cue{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px;
  color:rgba(255,255,255,.5);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  animation:mwFadeUp 1s ease .6s both;
}
.mw-root .scroll-line{
  width:1px;height:40px;
  background:linear-gradient(to bottom,rgba(255,255,255,.4),rgba(255,255,255,0));
  animation:mwScrollPulse 1.8s ease-in-out infinite;
}
@keyframes mwScrollPulse{
  0%,100%{opacity:.5;transform:scaleY(1);}
  50%{opacity:1;transform:scaleY(1.15);}
}
.mw-root .stars{color:var(--coral);letter-spacing:2px;font-size:1rem;}
.mw-root .rating-chip{display:flex;align-items:center;gap:10px;font-size:.9rem;color:var(--ink-soft);}
.mw-root .rating-chip strong{color:var(--teal-darker);}

@keyframes mwFadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}

/* ===== INFO BAR ===== */
.mw-root .info-bar{background:var(--teal-darker);color:#fff;margin-top:40px;}
.mw-root .info-bar-grid{display:flex;align-items:center;gap:44px;padding:56px 56px;flex-wrap:wrap;}
.mw-root .info-divider{width:1px;align-self:stretch;background:rgba(255,255,255,.15);min-height:70px;}
.mw-root .info-item{display:flex;align-items:center;gap:22px;flex:1 1 240px;}
.mw-root .info-item .ic{width:68px;height:68px;border-radius:18px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.mw-root .info-item .ic svg{width:32px;height:32px;stroke:var(--coral);}
.mw-root .info-item h4{color:#fff;font-size:1.2rem;margin-bottom:6px;}
.mw-root .info-item p{font-size:1rem;color:#CFE3E1;line-height:1.5;margin:0;}
.mw-root .info-cta{flex-shrink:0;padding:20px 40px;font-size:1.05rem;margin-left:auto;}
.mw-root .info-cta svg{width:15px;height:15px;transition:transform .2s ease;}
.mw-root .info-cta:hover svg{transform:translate(2px,-2px);}

/* ===== SECTION GENERAL ===== */
.mw-root section{padding:88px 0;}
.mw-root .section-head{max-width:640px;margin-bottom:52px;}
.mw-root .section-head.center{margin-left:auto;margin-right:auto;text-align:center;}
.mw-root .section-head h2{font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;}
.mw-root .section-head h2 em{font-style:normal;color:var(--coral);}
.mw-root .section-head p{color:var(--ink-soft);margin-top:14px;font-size:1.02rem;line-height:1.65;}
.mw-root .h2-tight{font-size:clamp(1.8rem,3vw,2.5rem);margin-bottom:16px;}
.mw-root .accent-blue{color:#2B7FD1;}
.mw-root .about-lead{color:var(--ink-soft);font-size:1.02rem;line-height:1.7;max-width:520px;margin-bottom:20px;}

/* ===== ABOUT ===== */
.mw-root .about{background:var(--white);}
.mw-root .about-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:56px;align-items:center;}
.mw-root .about-photos{position:relative;}
.mw-root .about-photo-main{border-radius:20px;overflow:hidden;aspect-ratio:1/1.05;background:linear-gradient(155deg,var(--teal-tint),var(--teal-tint-2));position:relative;}
.mw-root .about-photo-main img{width:100%;height:100%;object-fit:cover;display:block;}
.mw-root .about-photo-badge{
  position:absolute;bottom:-24px;right:-24px;background:var(--coral);color:#fff;
  width:118px;height:118px;border-radius:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;box-shadow:0 10px 24px rgba(255,107,77,.4);
}
.mw-root .about-photo-badge .n{font-family:var(--ff-display);font-weight:800;font-size:1.7rem;}
.mw-root .about-photo-badge .t{font-size:.68rem;text-transform:uppercase;letter-spacing:.06em;}
.mw-root .about-list{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:28px 0 32px;}
.mw-root .about-list li{display:flex;align-items:flex-start;gap:10px;font-weight:500;font-size:.95rem;}
.mw-root .about-list li .tick{width:22px;height:22px;border-radius:50%;background:var(--teal-tint);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;color:var(--teal-deep);}
.mw-root .about-list li .tick svg{width:12px;height:12px;}

/* ===== SERVICES ===== */
.mw-root .services{background:var(--teal-tint-2);}
.mw-root .service-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.mw-root .service-card{
  background:#fff;border-radius:var(--radius);padding:30px 26px;box-shadow:var(--shadow);
  transition:transform .25s ease, box-shadow .25s ease, background .25s ease;border:1px solid transparent;
}
.mw-root .service-card:hover{transform:translateY(-6px);background:var(--teal-darker);}
.mw-root .service-card:hover h3, .mw-root .service-card:hover p, .mw-root .service-card:hover .know-more {color:#fff;}
.mw-root .service-card:hover .service-icon {background:rgba(255,255,255,0.15);color:var(--coral);}
.mw-root .service-icon{width:52px;height:52px;border-radius:14px;background:var(--teal-tint);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:var(--teal-deep);transition:all .25s ease;}
.mw-root .service-icon svg{width:26px;height:26px;}
.mw-root .service-card h3{font-size:1.12rem;margin-bottom:10px;transition:color .25s ease;}
.mw-root .service-card p{font-size:.92rem;color:var(--ink-soft);line-height:1.55;margin-bottom:16px;transition:color .25s ease;}
.mw-root .service-card .know-more{font-size:.85rem;font-weight:600;color:var(--coral-dark);display:inline-flex;align-items:center;gap:6px;transition:color .25s ease;}
.mw-root .services-footnote{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:44px;flex-wrap:wrap;padding-top:36px;border-top:1px solid var(--line);}
.mw-root .services-footnote p{max-width:520px;color:var(--ink-soft);margin:0;}

/* ===== PRICING ===== */
.mw-root .pricing{background:var(--white);}
.mw-root .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch;}
.mw-root .price-card{
  background:#fff;border:1px solid var(--line);border-radius:20px;padding:32px 28px;
  display:flex;flex-direction:column;gap:14px;box-shadow:var(--shadow);
  transition:transform .25s ease, box-shadow .25s ease;
}
.mw-root .price-card:hover{transform:translateY(-6px);}
.mw-root .price-card p{color:var(--ink-soft);font-size:.92rem;line-height:1.6;margin:0;flex-grow:1;}
.mw-root .price-card h3{font-size:1.2rem;}
.mw-root .pill{display:inline-flex;align-items:center;padding:5px 13px;border-radius:999px;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;width:fit-content;}
.mw-root .pill-teal{background:var(--teal-deep);color:#fff;}
.mw-root .pill-outline{border:1px solid rgba(255,255,255,.5);color:#fff;}
.mw-root .pill-outline-dark{border:1px solid var(--line);color:var(--ink-soft);}
.mw-root .pill-program{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);color:#fff;}
.mw-root .price-badges{display:flex;gap:8px;}
.mw-root .price-row{display:flex;flex-direction:column;gap:4px;}
.mw-root .price-big{font-family:var(--ff-display);font-weight:800;font-size:2.3rem;color:#fff;display:flex;align-items:baseline;gap:4px;}
.mw-root .price-big--dark{color:var(--teal-darker);}
.mw-root .price-big .rupee{font-size:1.4rem;}
.mw-root .price-big .per{font-family:var(--ff-body);font-weight:500;font-size:.85rem;color:inherit;opacity:.7;margin-left:4px;}
.mw-root .price-note{font-size:.78rem;color:var(--ink-soft);}
.mw-root .price-cta{margin-top:6px;}
.mw-root .price-card--featured{
  background:linear-gradient(155deg,var(--teal-deep),var(--teal-darker));color:#fff;
  border:none;position:relative;overflow:hidden;
}
.mw-root .price-card--featured::before{
  content:"";position:absolute;top:-60px;right:-60px;width:200px;height:200px;
  background:radial-gradient(circle,rgba(255,107,77,.35),transparent 70%);
}
.mw-root .price-card--featured h3{color:#fff;}
.mw-root .price-card--featured h3 em{font-style:normal;color:#9FD8FF;}
.mw-root .price-card--featured p{color:#CFE3E1;}
.mw-root .price-card--featured .price-note{color:#B9D3D0;}
.mw-root .price-featured-footer{
  margin-top:auto;padding-top:18px;border-top:1px solid rgba(255,255,255,.15);
  display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;
  font-size:.85rem;color:#CFE3E1;position:relative;z-index:1;
}
.mw-root .price-featured-footer a{color:#fff;text-decoration:underline;}

/* ===== SPECIALTY PROGRAMS ===== */
.mw-root .programs{background:var(--teal-tint-2);}
.mw-root .program-tabs{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;}
.mw-root .program-tab{
  padding:10px 20px;border-radius:999px;border:1.5px solid var(--line);background:#fff;
  font-family:var(--ff-body);font-weight:600;font-size:.88rem;color:var(--ink-soft);cursor:pointer;
  transition:all .2s ease;
}
.mw-root .program-tab:hover{border-color:var(--teal-deep);color:var(--teal-deep);}
.mw-root .program-tab.is-active{background:var(--teal-deep);border-color:var(--teal-deep);color:#fff;position:relative;overflow:hidden;}
.mw-root .tab-progress-bar{position:absolute;bottom:0;left:0;height:3px;background:rgba(255,255,255,.5);border-radius:0;transition:width 50ms linear;}
.mw-root .program-card{
  display:grid;grid-template-columns:1fr 1fr;gap:0;background:var(--teal-darker);border-radius:24px;
  overflow:hidden;box-shadow:0 20px 50px rgba(7,62,66,.25);animation:mwFadeUp .5s ease both;
}
.mw-root .program-copy{padding:52px 48px;display:flex;flex-direction:column;gap:16px;align-self:center;}
.mw-root .program-label{font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8FD9C4;display:flex;align-items:center;gap:6px;}
.mw-root .program-copy h3{color:#fff;font-size:1.7rem;}
.mw-root .program-copy h3 em{font-style:normal;color:#8FC2FF;}
.mw-root .program-copy p{color:#B9D3D0;line-height:1.65;font-size:.96rem;}
.mw-root .program-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;}
.mw-root .program-copy .btn{width:fit-content;}
.mw-root .program-copy .btn svg{width:14px;height:14px;}
.mw-root .program-photo{position:relative;min-height:320px;}
.mw-root .program-photo img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.mw-root .live-badge{
  position:absolute;top:16px;left:16px;z-index:2;background:rgba(0,0,0,.55);color:#fff;
  padding:6px 12px;border-radius:999px;font-size:.7rem;font-weight:700;letter-spacing:.06em;
  display:flex;align-items:center;gap:6px;
}
.mw-root .live-dot{width:7px;height:7px;border-radius:50%;background:#FF4D4D;animation:mwPulse 1.6s infinite;}
@keyframes mwPulse{0%{box-shadow:0 0 0 0 rgba(255,77,77,.6);}70%{box-shadow:0 0 0 7px rgba(255,77,77,0);}100%{box-shadow:0 0 0 0 rgba(255,77,77,0);}}

/* ===== CARE MODES ===== */
.mw-root .modes{background:var(--teal-darker);color:#fff;position:relative;overflow:hidden;padding:52px 0;}
.mw-root .modes .section-head h2{color:#fff;}
.mw-root .modes .section-head p{color:#B9D3D0;}
.mw-root .mode-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:36px;}
.mw-root .mode-card{
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
  border-radius:var(--radius);overflow:hidden;transition:background .25s ease;
}
.mw-root .mode-card:hover{background:rgba(255,255,255,.12);}
.mw-root .mode-photo{aspect-ratio:16/10;overflow:hidden;}
.mw-root .mode-photo img{width:100%;height:100%;object-fit:cover;display:block;}
.mw-root .mode-card .mode-body{padding:20px 22px 24px;}
.mw-root .mode-card .mi{width:40px;height:40px;border-radius:10px;background:var(--coral);display:flex;align-items:center;justify-content:center;margin-bottom:14px;position:relative;z-index:1;box-shadow:0 8px 18px rgba(0,0,0,.25);}
.mw-root .mode-card .mi svg{width:20px;height:20px;}
.mw-root .mode-card h3{color:#fff;font-size:1.05rem;margin-bottom:8px;}
.mw-root .mode-card p{color:#B9D3D0;font-size:.88rem;line-height:1.55;margin-bottom:14px;}
.mw-root .stat-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding-top:28px;border-top:1px solid rgba(255,255,255,.14);}
.mw-root .stat-strip .stat h4{font-family:var(--ff-display);font-weight:800;font-size:2rem;color:var(--coral);margin-bottom:4px;}
.mw-root .stat-strip .stat p{color:#B9D3D0;font-size:.85rem;line-height:1.5;margin:0;}

/* ===== PROCESS ===== */
.mw-root .process{background:var(--white);}
.mw-root .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.mw-root .process-card{padding:28px 4px;border-top:3px solid var(--coral);}
.mw-root .process-num{font-family:var(--ff-display);font-weight:800;font-size:2.2rem;color:var(--teal-tint);margin-bottom:14px;-webkit-text-stroke:1.5px var(--teal-deep);}
.mw-root .process-card h3{font-size:1.05rem;margin-bottom:10px;}
.mw-root .process-card p{font-size:.9rem;color:var(--ink-soft);line-height:1.55;margin:0;}
.mw-root .therapy-banner{position:relative;border-radius:24px;overflow:hidden;margin-top:56px;aspect-ratio:16/6;}
.mw-root .therapy-banner img{width:100%;height:100%;object-fit:cover;display:block;}
.mw-root .therapy-banner .overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,62,66,.92) 0%,rgba(7,62,66,.55) 45%,rgba(7,62,66,.1) 80%);display:flex;align-items:center;padding:0 48px;}
.mw-root .therapy-banner .overlay-text{max-width:380px;}
.mw-root .therapy-banner .overlay-text h3{color:#fff;font-size:1.4rem;margin-bottom:10px;}
.mw-root .therapy-banner .overlay-text p{color:#CFE3E1;font-size:.92rem;line-height:1.6;margin:0;}

/* ===== JOURNEY ===== */
.mw-root .journey{background:var(--white);}
.mw-root .journey-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
.mw-root .journey-steps{display:flex;flex-direction:column;gap:0;}
.mw-root .jstep{display:flex;gap:20px;padding:22px 0;border-bottom:1px solid var(--line);}
.mw-root .jstep:last-child{border-bottom:none;}
.mw-root .jstep .jn{font-family:var(--ff-display);font-weight:800;font-size:1.3rem;color:var(--coral);min-width:36px;}
.mw-root .jstep h3{font-size:1.08rem;margin-bottom:6px;}
.mw-root .jstep p{font-size:.92rem;color:var(--ink-soft);line-height:1.6;margin:0;}
.mw-root .journey-art{border-radius:20px;overflow:hidden;aspect-ratio:1/1;background:linear-gradient(150deg,var(--teal-deep),var(--teal-tint));position:relative;}
.mw-root .journey-art img{width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;}

/* ===== TESTIMONIALS ===== */
.mw-root .testimonials{background:var(--teal-darker);color:#fff;overflow:hidden;}
.mw-root .testimonials .section-head h2{color:#fff;}
.mw-root .testimonials .section-head p{color:#B9D3D0;}
.mw-root .marquee-wrapper{display:flex;overflow:hidden;gap:22px;width:100%;}
.mw-root .t-grid{display:flex;gap:22px;animation:mwMarquee 40s linear infinite;flex-shrink:0;}
.mw-root .marquee-wrapper:hover .t-grid{animation-play-state:paused;}
.mw-root .t-card{width:340px;flex-shrink:0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;gap:16px;transition:transform .25s ease;}
@keyframes mwMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 22px)); }
}
.mw-root .t-card:hover{transform:translateY(-4px);}
.mw-root .t-card .stars{color:var(--coral);font-size:.95rem;letter-spacing:2px;}
.mw-root .t-card p.quote{font-size:.92rem;line-height:1.65;color:#DCEAE8;flex-grow:1;margin:0;}
.mw-root .t-author{display:flex;align-items:center;gap:12px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12);}
.mw-root .t-avatar{width:38px;height:38px;border-radius:50%;background:var(--coral);display:flex;align-items:center;justify-content:center;font-family:var(--ff-display);font-weight:700;font-size:.85rem;color:#fff;flex-shrink:0;}
.mw-root .t-author .name{font-weight:600;font-size:.9rem;color:#fff;}
.mw-root .t-author .loc{font-size:.76rem;color:#9FC2BE;}

/* ===== BLOG ===== */
.mw-root .blog{background:var(--white);}
.mw-root .blog-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:44px;gap:20px;flex-wrap:wrap;}
.mw-root .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.mw-root .blog-card{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);background:#fff;transition:transform .25s ease;}
.mw-root .blog-card:hover{transform:translateY(-6px);}
.mw-root .blog-thumb{aspect-ratio:16/10;overflow:hidden;background:var(--teal-tint-2);}
.mw-root .blog-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;}
.mw-root .blog-card:hover .blog-thumb img{transform:scale(1.06);}
.mw-root .blog-body{padding:22px;}
.mw-root .blog-tag{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--coral-dark);margin-bottom:10px;display:inline-block;}
.mw-root .blog-body h3{font-size:1.05rem;margin-bottom:10px;line-height:1.4;}
.mw-root .blog-body p{font-size:.88rem;color:var(--ink-soft);line-height:1.55;margin-bottom:16px;}
.mw-root .blog-read{font-size:.85rem;font-weight:600;color:var(--teal-deep);}

/* ===== CONTACT ===== */
.mw-root .contact{background:var(--teal-tint-2);}
.mw-root .contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:flex-start;}
.mw-root .contact-meta{display:flex;flex-direction:column;gap:12px;margin-top:8px;}
.mw-root .contact-meta li{display:flex;align-items:center;gap:10px;font-size:.92rem;color:var(--ink-soft);font-weight:500;}
.mw-root .contact-meta li svg{width:16px;height:16px;color:var(--teal-deep);flex-shrink:0;}
.mw-root .contact-form{background:#fff;border-radius:20px;padding:32px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:16px;}
.mw-root .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.mw-root .form-field{display:flex;flex-direction:column;gap:6px;}
.mw-root .contact-form input,.mw-root .contact-form select,.mw-root .contact-form textarea{
  width:100%;padding:14px 16px;border-radius:12px;border:1.5px solid var(--line);
  font-family:var(--ff-body);font-size:.92rem;color:var(--ink);background:#fff;
  transition:border-color .2s ease, box-shadow .2s ease;resize:vertical;
}
.mw-root .contact-form input:focus,.mw-root .contact-form select:focus,.mw-root .contact-form textarea:focus{
  outline:none;border-color:var(--teal-deep);box-shadow:0 0 0 3px rgba(10,92,99,.12);
}
.mw-root .contact-form input.has-error,.mw-root .contact-form select.has-error{border-color:var(--coral-dark);}
.mw-root .field-error{font-size:.76rem;color:var(--coral-dark);}
.mw-root .contact-form select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234B6165' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;}
.mw-root .contact-form button{align-self:flex-start;}
.mw-root .form-success{background:#fff;border-radius:20px;padding:48px 32px;box-shadow:var(--shadow);text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;}
.mw-root .form-success-icon{width:56px;height:56px;border-radius:50%;background:var(--teal-tint);color:var(--teal-deep);display:flex;align-items:center;justify-content:center;}
.mw-root .form-success-icon svg{width:26px;height:26px;}
.mw-root .form-success p{color:var(--ink-soft);max-width:320px;margin:0;}

/* ===== CTA BANNER ===== */
.mw-root .cta-banner{background:linear-gradient(120deg,var(--teal-deep),var(--teal-darker));color:#fff;position:relative;overflow:hidden;padding:0;}
.mw-root .cta-banner-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:nowrap;padding:60px 24px;position:relative;z-index:1;}
.mw-root .cta-banner h2{color:#fff;font-size:clamp(1.6rem,2.6vw,2.1rem);max-width:520px;}
.mw-root .cta-banner p{color:#BFE0DC;margin-top:10px;font-size:.98rem;}
.mw-root .cta-banner .btn{white-space:nowrap;flex-shrink:0;}

/* ===== FOOTER ===== */
.mw-root footer{background:#062F33;color:#B9D3D0;padding-top:70px;}
.mw-root .footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;padding-bottom:50px;border-bottom:1px solid rgba(255,255,255,.1);}
.mw-root .footer-brand .logo{color:#fff;}
.mw-root .footer-brand p{margin:18px 0 22px;font-size:.9rem;line-height:1.65;max-width:300px;color:#9FC2BE;}
.mw-root .footer-social{display:flex;gap:12px;}
.mw-root .footer-social a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;transition:background .2s;color:#fff;}
.mw-root .footer-social a:hover{background:var(--coral);}
.mw-root .footer-social svg{width:16px;height:16px;}
.mw-root footer h4{color:#fff;font-family:var(--ff-display);font-size:1rem;margin-bottom:20px;}
.mw-root footer ul li{margin-bottom:12px;}
.mw-root footer ul li a{font-size:.9rem;color:#9FC2BE;transition:color .2s;}
.mw-root footer ul li a:hover{color:var(--coral);}
.mw-root .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding:26px 0;font-size:.82rem;color:#7FA5A0;flex-wrap:wrap;gap:10px;}

/* ===== FABS ===== */
.mw-root .fab-stack{position:fixed;bottom:26px;right:26px;display:flex;flex-direction:column;gap:14px;z-index:200;}
.mw-root .fab{
  width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  box-shadow:0 10px 24px rgba(0,0,0,.18);transition:transform .2s ease;color:#fff;animation:mwFadeUp .3s ease both;
}
.mw-root .fab:hover{transform:scale(1.08);}
.mw-root .fab svg{width:22px;height:22px;}
.mw-root .fab-whatsapp{background:#25D366;width:58px;height:58px;box-shadow:0 10px 24px rgba(37,211,102,.4);}
.mw-root .fab-whatsapp svg{width:26px;height:26px;fill:#fff;}
.mw-root .fab-secondary{background:var(--teal-deep);}

/* ===== RESPONSIVE ===== */
@media (max-width:980px){
  .mw-root .about-grid,.mw-root .journey-grid,.mw-root .contact-grid{grid-template-columns:1fr;}
  .mw-root .hero-trust{gap:0;}
  .mw-root .hero-trust-item{padding:0 16px;}
  .mw-root .service-grid,.mw-root .pricing-grid{grid-template-columns:repeat(2,1fr);}
  .mw-root .mode-grid{grid-template-columns:1fr;}
  .mw-root .program-card{grid-template-columns:1fr;}
  .mw-root .program-photo{min-height:240px;}
  .mw-root .stat-strip{grid-template-columns:repeat(2,1fr);row-gap:32px;}
  .mw-root .process-grid{grid-template-columns:repeat(2,1fr);row-gap:32px;}
  .mw-root .blog-grid{grid-template-columns:1fr;}
  .mw-root .therapy-banner{aspect-ratio:16/9;}
  .mw-root .therapy-banner .overlay{padding:0 28px;}
  .mw-root .footer-grid{grid-template-columns:1fr 1fr;row-gap:36px;}
  .mw-root .info-bar-grid{justify-content:flex-start;}
  .mw-root .info-divider{display:none;}
}
@media (max-width:860px){
  .mw-root .desktop-nav-right{display:none !important;}
  .mw-root .mobile-menu-btn{display:flex !important;}
  .mw-root .mobile-nav-panel{display:block !important;}
  .mw-root .nav-wrap{padding:12px 20px;}
  .mw-root .header-logo-img{height:46px;}
}
@media (max-width:760px){
  .mw-root nav.main-nav{display:none;}
  .mw-root section{padding:60px 0;}
  .mw-root .service-grid,.mw-root .pricing-grid{grid-template-columns:1fr;}
  .mw-root .footer-grid{grid-template-columns:1fr;}
  .mw-root .therapy-banner .overlay-text p{display:none;}
  .mw-root .form-row{grid-template-columns:1fr;}
  .mw-root .program-copy{padding:36px 28px;}
}
@media (max-width:480px){
  .mw-root .nav-wrap{padding:10px 14px;}
  .mw-root .header-logo-img{height:40px;}
  .mw-root .mobile-menu-btn{width:40px;height:40px;border-radius:10px;}
  .mw-root .mobile-nav-inner{padding:14px 14px 18px;}
}

/* ===== SERVICE MODAL ===== */
.svc-modal-overlay{
  position:fixed;inset:0;z-index:1000;
  background:rgba(4,20,22,0.65);
  backdrop-filter:blur(4px);
  animation:svcFadeIn .25s ease both;
  overflow-y:auto;
}
@keyframes svcFadeIn{from{opacity:0;}to{opacity:1;}}
.svc-modal-page{
  min-height:100vh;background:var(--cream);
  animation:svcSlideUp .4s cubic-bezier(.2,.8,.3,1) both;
}
@keyframes svcSlideUp{from{transform:translateY(40px);opacity:0;}to{transform:translateY(0);opacity:1;}}

/* Hero */
.svc-modal-hero{
  position:relative;height:420px;overflow:hidden;
}
.svc-modal-hero img{width:100%;height:100%;object-fit:cover;display:block;}
.svc-modal-hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(160deg,rgba(4,28,31,0.82) 0%,rgba(7,62,66,0.6) 60%,rgba(4,20,22,0.75) 100%);
}
.svc-modal-close{
  position:absolute;top:24px;right:24px;z-index:10;
  width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;
  background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;color:#fff;
  transition:background .2s,transform .2s;
}
.svc-modal-close:hover{background:rgba(255,255,255,0.28);transform:scale(1.08);}
.svc-modal-close svg{width:20px;height:20px;}
.svc-modal-hero-content{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:40px 56px;
}
.svc-modal-icon{
  width:56px;height:56px;border-radius:16px;
  background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);
  display:flex;align-items:center;justify-content:center;
  color:var(--coral);margin-bottom:14px;
}
.svc-modal-icon svg{width:28px;height:28px;}
.svc-modal-hero-content h2{
  font-family:var(--ff-display);font-weight:800;
  font-size:clamp(1.8rem,3.5vw,2.6rem);color:#fff;margin-bottom:10px;line-height:1.1;
}
.svc-modal-hero-content p{color:rgba(255,255,255,0.82);font-size:1rem;line-height:1.6;max-width:560px;}

/* Body */
.svc-modal-body{padding:60px 0 80px;}
.svc-modal-container{max-width:1060px;margin:0 auto;padding:0 40px;}
.svc-modal-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-family:var(--ff-body);font-weight:600;font-size:.75rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--coral-dark);
  margin-bottom:10px;
}
.svc-modal-eyebrow::before{content:"";width:18px;height:2px;background:var(--coral);display:inline-block;}
.svc-modal-section{margin-bottom:48px;}
.svc-modal-section h3{font-family:var(--ff-display);font-size:1.45rem;font-weight:700;color:var(--teal-darker);margin-bottom:16px;}
.svc-modal-section > p{color:var(--ink-soft);font-size:1rem;line-height:1.75;max-width:740px;}

/* Two column */
.svc-modal-two-col{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:48px;}

/* Lists */
.svc-modal-list{display:flex;flex-direction:column;gap:10px;padding:0;margin:0;list-style:none;}
.svc-modal-list li{display:flex;align-items:flex-start;gap:12px;font-size:.94rem;color:var(--ink-soft);line-height:1.5;}
.svc-modal-bullet{width:8px;height:8px;border-radius:50%;background:var(--coral);flex-shrink:0;margin-top:6px;}
.svc-modal-list--approach li{gap:16px;align-items:flex-start;}
.svc-modal-num{
  font-family:var(--ff-display);font-weight:800;font-size:1.1rem;
  color:var(--teal-deep);opacity:0.35;min-width:32px;line-height:1.4;flex-shrink:0;
}

/* Benefits */
.svc-modal-benefits-section{
  background:var(--white);border-radius:24px;padding:40px;
  border:1px solid var(--line);
}
.svc-modal-benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:4px;}
.svc-modal-benefit-card{
  display:flex;align-items:flex-start;gap:12px;
  background:var(--teal-tint-2);border-radius:14px;padding:16px 18px;
  font-size:.9rem;color:var(--ink);line-height:1.5;
}
.svc-modal-benefit-tick{
  width:26px;height:26px;border-radius:50%;
  background:var(--teal-deep);display:flex;align-items:center;justify-content:center;
  flex-shrink:0;margin-top:1px;color:#fff;
}
.svc-modal-benefit-tick svg{width:13px;height:13px;}

/* CTA */
.svc-modal-cta{
  margin-top:56px;padding:44px;border-radius:24px;
  background:linear-gradient(130deg,var(--teal-deep),var(--teal-darker));
  display:flex;align-items:center;gap:24px;flex-wrap:wrap;
}
.svc-modal-cta p{color:rgba(255,255,255,0.9);font-size:1.05rem;font-weight:600;margin:0;flex:1;min-width:200px;}
.svc-modal-cta .btn{white-space:nowrap;}

/* Responsive */
@media(max-width:760px){
  .svc-modal-hero{height:320px;}
  .svc-modal-hero-content{padding:28px 24px;}
  .svc-modal-container{padding:0 20px;}
  .svc-modal-two-col{grid-template-columns:1fr;}
  .svc-modal-benefits-grid{grid-template-columns:1fr 1fr;}
  .svc-modal-cta{flex-direction:column;align-items:flex-start;padding:28px;}
}
@media(max-width:480px){
  .svc-modal-benefits-grid{grid-template-columns:1fr;}
}

/* ===== PRICING MODAL ===== */
.pm-hero-tag{
  display:inline-flex;align-items:center;padding:5px 14px;border-radius:999px;
  font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);
  color:#fff;margin-bottom:14px;
}
.pm-hero-price{
  display:flex;align-items:baseline;gap:10px;margin-top:20px;flex-wrap:wrap;
}
.pm-price-big{
  font-family:var(--ff-display);font-weight:800;font-size:3rem;color:#fff;line-height:1;
}
.pm-price-per{
  font-size:1.1rem;color:rgba(255,255,255,0.75);font-weight:500;
}
.pm-price-note{
  font-size:0.8rem;color:rgba(255,255,255,0.55);
  background:rgba(255,255,255,0.1);border-radius:999px;
  padding:4px 12px;
}
.pm-rating-bar{
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;
  background:var(--white);border-radius:16px;padding:20px 28px;
  margin-bottom:44px;box-shadow:var(--shadow);
}
.pm-rating-stars{
  display:flex;align-items:center;gap:6px;
}
.pm-rating-stars strong{font-family:var(--ff-display);font-size:1.2rem;color:var(--teal-darker);margin-left:4px;}
.pm-rating-count{font-size:.88rem;color:var(--ink-soft);}
.pm-highlight-badge{
  display:inline-flex;align-items:center;
  background:var(--teal-tint);color:var(--teal-deep);
  font-size:.78rem;font-weight:700;letter-spacing:.05em;
  padding:8px 18px;border-radius:999px;border:1.5px solid var(--teal-deep);
}
.mw-root .price-conditions{
  display:block;
  font-size:.75rem;
  color:var(--ink-soft);
  opacity:0.8;
  margin-top:6px;
  font-style:italic;
}
.mw-root .price-card--featured .price-conditions{
  color:#ffffff;
  opacity:0.9;
}
`;

/* ---------------------------------- APP ----------------------------------------- */

export default function MoveWellSite() {
  return (
    <div className="mw-root">
      <style>{STYLES}</style>
      <Header />
      <Hero />
      <InfoBar />
      <About />
      <Services />
      <Pricing />
      <SpecialtyPrograms />
      <CareModes />
      <Process />
      <Journey />
      <Testimonials />
      <Blog />
      <ContactSection />
      <CtaBanner />
      <Footer />
      <Fabs />
    </div>
  );
}

export { Header, Footer, Reveal, IconCheck, STYLES };
