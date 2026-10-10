#!/usr/bin/env python3
"""
Generate a professional PDF manuscript for
THE OTHER PERSON IN THE ROOM by Jamison Parker
"""

from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, 
    KeepTogether, HRFlowable, ListFlowable, ListItem
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Page setup - A5 for a more book-like feel, or use letter
PAGE_WIDTH, PAGE_HEIGHT = A5
MARGIN = 0.7 * inch

# Colours
DARK = HexColor("#1a1a1a")
MUTED = HexColor("#444444")
ACCENT = HexColor("#2c2c2c")
LIGHT_GREY = HexColor("#666666")
VERY_LIGHT = HexColor("#f5f5f5")

def create_styles():
    styles = getSampleStyleSheet()
    
    # Title page styles
    styles.add(ParagraphStyle(
        name='BookTitle',
        fontName='Times-Bold',
        fontSize=22,
        leading=28,
        alignment=TA_CENTER,
        textColor=DARK,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='BookSubtitle',
        fontName='Times-Italic',
        fontSize=11,
        leading=15,
        alignment=TA_CENTER,
        textColor=MUTED,
        spaceAfter=30
    ))
    
    styles.add(ParagraphStyle(
        name='AuthorName',
        fontName='Times-Roman',
        fontSize=14,
        leading=18,
        alignment=TA_CENTER,
        textColor=DARK,
        spaceBefore=40
    ))
    
    # Chapter / section headings
    styles.add(ParagraphStyle(
        name='ChapterTitle',
        fontName='Times-Bold',
        fontSize=14,
        leading=18,
        alignment=TA_CENTER,
        textColor=DARK,
        spaceBefore=20,
        spaceAfter=16
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHead',
        fontName='Times-Bold',
        fontSize=11,
        leading=14,
        alignment=TA_LEFT,
        textColor=DARK,
        spaceBefore=14,
        spaceAfter=8
    ))
    
    # Body text
    styles.add(ParagraphStyle(
        name='Body',
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_JUSTIFY,
        textColor=DARK,
        spaceAfter=8,
        firstLineIndent=12
    ))
    
    styles.add(ParagraphStyle(
        name='BodyNoIndent',
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_JUSTIFY,
        textColor=DARK,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='Dialogue',
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13,
        alignment=TA_LEFT,
        textColor=DARK,
        spaceAfter=4,
        leftIndent=0
    ))
    
    styles.add(ParagraphStyle(
        name='IllnessVoice',
        fontName='Times-Italic',
        fontSize=9.5,
        leading=13,
        alignment=TA_LEFT,
        textColor=MUTED,
        spaceAfter=4,
        leftIndent=10
    ))
    
    styles.add(ParagraphStyle(
        name='RoomDesc',
        fontName='Times-Italic',
        fontSize=9,
        leading=12,
        alignment=TA_LEFT,
        textColor=LIGHT_GREY,
        spaceAfter=10,
        spaceBefore=4
    ))
    
    styles.add(ParagraphStyle(
        name='ContentWarning',
        fontName='Times-Italic',
        fontSize=8.5,
        leading=11,
        alignment=TA_LEFT,
        textColor=LIGHT_GREY,
        spaceBefore=6,
        spaceAfter=10,
        leftIndent=5,
        rightIndent=5
    ))
    
    styles.add(ParagraphStyle(
        name='Afterward',
        fontName='Times-Roman',
        fontSize=9,
        leading=12.5,
        alignment=TA_JUSTIFY,
        textColor=MUTED,
        spaceBefore=12,
        spaceAfter=8,
        leftIndent=8,
        rightIndent=8
    ))
    
    styles.add(ParagraphStyle(
        name='CenteredSmall',
        fontName='Times-Roman',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=MUTED
    ))
    
    styles.add(ParagraphStyle(
        name='TOCEntry',
        fontName='Times-Roman',
        fontSize=10,
        leading=16,
        alignment=TA_LEFT,
        textColor=DARK
    ))
    
    return styles

def add_header_footer(canvas, doc):
    canvas.saveState()
    # Footer with page number
    page_num = canvas.getPageNumber()
    if page_num > 1:  # skip title page
        canvas.setFont('Times-Roman', 8)
        canvas.setFillColor(LIGHT_GREY)
        canvas.drawCentredString(PAGE_WIDTH / 2, 0.4 * inch, str(page_num))
    canvas.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        "/home/workdir/artifacts/The_Other_Person_in_the_Room.pdf",
        pagesize=A5,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.6 * inch,
        bottomMargin=0.6 * inch
    )
    
    styles = create_styles()
    story = []
    
    # ========== TITLE PAGE ==========
    story.append(Spacer(1, 1.8 * inch))
    story.append(Paragraph("THE OTHER PERSON<br/>IN THE ROOM", styles['BookTitle']))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Conversations with the illnesses, wounds<br/>and invisible worlds inside the people we love",
        styles['BookSubtitle']
    ))
    story.append(Spacer(1, 1.2 * inch))
    story.append(Paragraph("Jamison Parker", styles['AuthorName']))
    story.append(PageBreak())
    
    # ========== COPYRIGHT / NOTES ==========
    story.append(Paragraph("Copyright © Jamison Parker 2026", styles['CenteredSmall']))
    story.append(Spacer(1, 6))
    story.append(Paragraph("All rights reserved.", styles['CenteredSmall']))
    story.append(Spacer(1, 20))
    story.append(Paragraph(
        "This is a work of literary non-fiction. Some names and identifying details have been changed. "
        "The “illness” voice is a literary device constructed exclusively from each participant’s own descriptions. "
        "No clinical claims are made.",
        styles['BodyNoIndent']
    ))
    story.append(Spacer(1, 16))
    story.append(Paragraph("<b>General Content Note</b>", styles['SectionHead']))
    story.append(Paragraph(
        "This book contains open conversations about lived experiences of mental illness, trauma, addiction, grief, "
        "body image, panic, and persistent low mood. Some chapters discuss passive suicidal ideation, disordered eating history, "
        "substance use, and the aftermath of loss. There are no graphic descriptions of methods, self-harm, or violence. "
        "Readers are encouraged to move through the book at their own pace and to skip any section that feels too heavy. "
        "Support resources appear at the end of the book.",
        styles['BodyNoIndent']
    ))
    story.append(PageBreak())
    
    # ========== CONTENTS ==========
    story.append(Paragraph("Contents", styles['ChapterTitle']))
    story.append(Spacer(1, 12))
    
    toc_items = [
        "Prologue – The Other Person in the Room",
        "1. Sarah + Anxiety",
        "2. Marcus + Depression",
        "3. Elena + Trauma",
        "4. David + Bipolar",
        "5. Priya + OCD",
        "6. Tom + Addiction",
        "7. Aisha + Panic",
        "8. Liam + Rejection Sensitivity",
        "9. Sophie + Dysmorphia",
        "10. Jordan + Grief",
        "11. Mei + Social Anxiety",
        "12. Alex + The Low Voice",
        "Epilogue – The Other Person Was Me",
        "Support Resources"
    ]
    for item in toc_items:
        story.append(Paragraph(item, styles['TOCEntry']))
    
    story.append(PageBreak())
    
    # ========== PROLOGUE ==========
    story.append(Paragraph("PROLOGUE", styles['ChapterTitle']))
    story.append(Paragraph("THE OTHER PERSON IN THE ROOM", styles['SectionHead']))
    story.append(Spacer(1, 6))
    
    prologue_paras = [
        "There is something deeply stupid about discovering that someone you have known for years has been living with a person you have never met.",
        "You know their laugh. You know how they take their coffee. You know which stories they tell too often and which ones they abandon halfway because the ending is too revealing. You know the version of them that answers the phone on the third ring with a voice calibrated to say “I’m fine” so convincingly that you almost believe it yourself. You know the version that disappears for three days and returns with a story about work, or a migraine, or “just needed a bit of space.”",
        "What you do not know is that the whole time there has been someone else in the room. Sitting slightly behind them. Holding a list. Breathing on the back of their neck. Editing the script in real time.",
        "I became interested in those rooms the year I realised something uncomfortable about my own friendships. The people closest to me had spent years describing themselves as if they were separate from the things happening inside their heads.",
        "“My anxiety.” “My depression.” “My trauma.” “My OCD.” “My addiction.” “My bipolar.” “My issues.”",
        "Always possessive. As though the thing belonged to them. But sometimes, listening carefully, it sounded the other way around. As though they belonged to it. As though the illness had the lease and they were just the difficult tenant who kept trying to redecorate.",
        "That distinction became the beginning of this book.",
        "I did not want another tidy explanation of mental illness. The world is already drowning in those. I wanted the messier thing — the arguments people have with the voice that never leaves, the jokes they make about their own destruction because the alternative is screaming, the moments when the illness is not a monster or a medical term but something almost intimate.",
        "So I decided to interview them. Not just the people. The illnesses too.",
        "An illness cannot sit in a chair. It cannot roll its eyes or say “that’s a stupid question.” But the people who live with these conditions describe them in remarkably human terms. Anxiety warns. Depression negotiates. Trauma keeps receipts. OCD runs compulsory dress rehearsals of catastrophe. Addiction bargains like a charismatic ex who still has a key.",
        "Sometimes they protect. Sometimes they punish. Sometimes they become so familiar that the idea of life without them feels like being asked to move out of your own house.",
        "I began with a simple question: “If your mental illness were sitting in this room with us right now, what would it look like?”",
        "The first person I asked laughed — the real laugh, the one that comes out when something is both ridiculous and true.",
        "“That’s easy,” she said. “Mine would be sitting behind me. Slightly to the left. Holding a clipboard. Looking disappointed that I still haven’t double-checked the stove.”",
        "I looked past her shoulder. Nothing there. Just a wall and a jacket on a chair.",
        "“Why behind you?”",
        "“Because if I could see its face properly I’d probably punch it. And it knows that.”",
        "And just like that the interview stopped being an interview. It became an introduction.",
        "This book is twelve of those introductions. The conversations are long. They digress. They contradict themselves. They contain jokes that would not survive a sensitivity reader and silences that would not survive a podcast edit. They are funny until they are not. They are hard-hitting because the people in them refused to perform the tidy version of their pain.",
        "I am not an invisible journalist. I am one of these people’s friends. That means I have also been the idiot who said “just come anyway,” the one who got tired of cancelled plans, the one who thought love was a strong enough argument to out-shout a nervous system. Where I got it wrong, I have left the wrongness in.",
        "We start where the introductions usually start: with a child or a teenager realising the room has acquired a second occupant who does not introduce itself and does not leave when asked."
    ]
    
    for i, p in enumerate(prologue_paras):
        if i == 0:
            story.append(Paragraph(p, styles['BodyNoIndent']))
        else:
            story.append(Paragraph(p, styles['Body']))
    
    story.append(PageBreak())
    
    # ========== HELPER FOR CHAPTERS ==========
    def add_chapter(title, warning, room, dialogue_blocks, afterward):
        """dialogue_blocks is a list of (speaker, text, is_illness) tuples"""
        story.append(Paragraph(title, styles['ChapterTitle']))
        if warning:
            story.append(Paragraph(f"<i>Content note: {warning}</i>", styles['ContentWarning']))
        story.append(Paragraph(f"<b>THE ROOM</b>", styles['SectionHead']))
        story.append(Paragraph(room, styles['RoomDesc']))
        story.append(Paragraph("<b>CONVERSATION</b>", styles['SectionHead']))
        
        for speaker, text, is_illness in dialogue_blocks:
            if is_illness:
                story.append(Paragraph(f"<i>{speaker}: {text}</i>", styles['IllnessVoice']))
            else:
                if speaker:
                    story.append(Paragraph(f"<b>{speaker}:</b> {text}", styles['Dialogue']))
                else:
                    story.append(Paragraph(text, styles['Dialogue']))
        
        story.append(Paragraph("<b>AFTERWARD</b>", styles['SectionHead']))
        story.append(Paragraph(afterward, styles['Afterward']))
        story.append(PageBreak())
    
    # ========== CHAPTER 1: SARAH ==========
    add_chapter(
        "1. SARAH + ANXIETY",
        "Discussion of chronic anxiety, hypervigilance, and the mental load of constant risk assessment.",
        "Backyard, late afternoon. Metal table, cold tea, dog using her foot as a pillow. An empty chair has been placed slightly behind her and to the left, as requested.",
        [
            ("JAMISON", "Sarah, the anxiety is in the chair. What does it look like today?", False),
            ("SARAH", "Same as always. Clipboard. Disappointed face. The energy of a project manager who has never once taken annual leave and resents everyone who has.", False),
            ("JAMISON", "(to the chair) Afternoon. What do you actually want from her?", False),
            ("ANXIETY", "Certainty. Full, laminated, preferably notarised certainty that nothing bad will happen on her watch. Is that so much to ask?", True),
            ("JAMISON", "Yes.", False),
            ("ANXIETY", "Rude. She keeps trying though, which is why I keep her employed.", True),
            ("SARAH", "It literally just called me staff.", False),
            ("ANXIETY", "You are staff. The job is “prevent catastrophe.” The KPIs are impossible. I still expect overtime.", True),
            ("JAMISON", "What do you tell her at three in the morning?", False),
            ("ANXIETY", "That the previous fifty safe moments are statistically irrelevant. That the next moment is the dangerous one. That happiness is when people get sloppy. I cannot have sloppy. Sloppy is how people die in completely preventable ways while I’m sitting right here with a clipboard.", True),
            ("SARAH", "It has never once said “well done on the fifty safe moments.”", False),
            ("ANXIETY", "Why would I? That’s the baseline. You don’t get a medal for not burning the house down.", True),
            ("SARAH", "This is my daily affirmation.", False),
            ("JAMISON", "Has it ever been right?", False),
            ("SARAH", "Annoyingly, yes. Once every three years it catches something real and then it walks around like it invented risk assessment. The rest of the time it’s screaming about leaves blowing past the sensor.", False),
            ("ANXIETY", "I keep the receipts for the times I was useful. I delete the rest. That is called data-driven decision making.", True),
            ("SARAH", "That is called being an arsehole with a filing system.", False),
            ("ANXIETY", "Semantics.", True),
            ("SARAH", "I don’t want it gone. I want it to take a seat further away and lower its voice. I want the clipboard to have fewer pages. Is that allowed?", False),
            ("ANXIETY", "I’ll take it under advisement. No promises.", True),
        ],
        "I used to tease Sarah about checking the stove from the driveway. I thought it was a quirk. It was a full-time unpaid security job she never applied for. The apology she gave after crying once during the interview felt like another rule the clipboard had written."
    )
    
    # ========== CHAPTER 2: MARCUS ==========
    add_chapter(
        "2. MARCUS + DEPRESSION",
        "Discussion of major depression, emotional numbness, isolation, and the experience of persistent low mood.",
        "Marcus’s apartment. Blinds open. Two coffees. Empty chair that somehow already looks exhausted.",
        [
            ("JAMISON", "Marcus, introduce your housemate.", False),
            ("MARCUS", "Tired. Older than me. Sits like it’s paying rent on the chair and I’m the difficult tenant. Has the energy of a landlord who’s given up on renovations and just wants everyone to stop asking for things.", False),
            ("JAMISON", "(to the chair) What do you want from him?", False),
            ("DEPRESSION", "Rest. Permanent rest. Stop performing competence. Stop hoping tomorrow will be different. The hope is frankly embarrassing for both of us.", True),
            ("MARCUS", "It’s very polite about the emotional demolition. That’s the worst part.", False),
            ("JAMISON", "What do you actually say to him?", False),
            ("DEPRESSION", "Effort is inefficient. You’re already behind. People would be better off if you simply became less. I don’t shout. Shouting is for amateurs. I just wait until the logic feels airtight. It always does.", True),
            ("MARCUS", "It’s like being broken up with by someone who keeps saying “it’s not you, it’s the fundamental nature of existence.”", False),
            ("DEPRESSION", "I’m doing him a favour. Without me he’d have to believe the emptiness is personal. This way it has an explanation. You’re welcome.", True),
            ("MARCUS", "I hate that I sometimes find that comforting.", False),
            ("JAMISON", "Do you want it gone?", False),
            ("MARCUS", "I want the weight lifted. I also don’t know who I am without the explanation. Both things can be true. That’s the most annoying sentence in the entire arrangement.", False),
            ("DEPRESSION", "I’m almost merciful. In a completely unhelpful way. That’s my brand.", True),
        ],
        "Marcus used to stay until the last bottle was empty. Then he started leaving after forty minutes. We all invented normal reasons. I invented them too. The silence after I asked what the nothing felt like in the body was the most honest answer he gave."
    )
    
    # ========== CHAPTER 3: ELENA ==========
    add_chapter(
        "3. ELENA + TRAUMA",
        "Discussion of complex trauma, PTSD, hypervigilance, body memory, and the long-term effects of past harm. No graphic descriptions of events.",
        "Kitchen. Hallway light on in daylight. Empty chair positioned with clear sightlines to every exit.",
        [
            ("JAMISON", "Elena, the security guard is here.", False),
            ("ELENA", "Never clocks off. Never sits properly. Treats every unexpected noise like the original threat has learned to shape-shift and bought a new coat.", False),
            ("JAMISON", "(to the chair) What do you want from her?", False),
            ("TRAUMA", "Vigilance. Continuous. Unbroken. The past is not finished with us. If she relaxes, it will return wearing a different face. I have seen this movie. I did not like the ending.", True),
            ("ELENA", "It thinks it’s the only adult in the room.", False),
            ("TRAUMA", "I am the only adult in the room. The rest of you are out here acting like the war is over.", True),
            ("JAMISON", "Has it ever been right?", False),
            ("ELENA", "Yes. And it never lets me forget the one time. The ninety-nine false alarms get deleted. The one real one gets laminated and put on the fridge.", False),
            ("TRAUMA", "Selective memory is just good record-keeping. I keep us alive. She can call it a prison. I call it a very committed security contract with no exit clause.", True),
            ("ELENA", "I don’t want it fired. I want it to be allowed to sit down and stop scanning the perimeter for one full hour. I’m still here. That should count for something.", False),
            ("TRAUMA", "It counts as suspicious. People who say “I’m still here” are usually about to stop checking.", True),
        ],
        "I used to think the way Elena positioned herself in rooms was personality. It was architecture. She had built exits into every conversation. Some rooms she still doesn’t open for anyone, including herself. That silence was left intact."
    )
    
    # ========== CHAPTER 4: DAVID ==========
    add_chapter(
        "4. DAVID + BIPOLAR",
        "Discussion of bipolar mood states, mania, depressive crashes, and the experience of living with extreme internal weather.",
        "Living room. Afternoon light. Two energies somehow occupying the same empty chair and already disagreeing about the lighting.",
        [
            ("JAMISON", "David, how many people are fighting in that chair?", False),
            ("DAVID", "Two. One wants confetti and a three-day plan to reinvent the self. The other wants the curtains closed and the phone in another postcode. They share a body like a bitter divorced couple forced to co-parent a nervous system.", False),
            ("JAMISON", "(to the chair) What do you want from him?", False),
            ("BIPOLAR", "Range. Full range. The quiet version of him is safer and also deeply boring. I bring the weather. Sometimes the weather is a festival. Sometimes it’s a blackout. I don’t do mild.", True),
            ("DAVID", "The high feels like being the most charismatic person at a party that only I was invited to. The crash feels like waking up in a different country with no passport and a hangover made of concrete.", False),
            ("BIPOLAR", "I notice the blackout. I simply refuse to apologise for the voltage. You don’t apologise for electricity.", True),
            ("DAVID", "Mood stabilisers narrowed the range. I missed the high. I did not miss the crash. Most days the trade is worth it. Some days I still miss the festival even though I know how it ends.", False),
            ("BIPOLAR", "He can call it weather. I call it being fully switched on. The dimmer switch version is for other people.", True),
        ],
        "David has lit up rooms and emptied them. The people who stay have learned to check the forecast without trying to control the climate."
    )
    
    # ========== CHAPTER 5: PRIYA ==========
    add_chapter(
        "5. PRIYA + OCD",
        "Discussion of obsessive-compulsive patterns, intrusive sequences, and the mental and physical cost of compulsory rituals.",
        "Quiet café. Empty chair that has already been adjusted three times and is still not correct.",
        [
            ("JAMISON", "Priya, the director of the endless play is here.", False),
            ("PRIYA", "Exhausted. Holding a script that grows new pages while you’re watching. Never shouts. Just repeats the stage direction until the actor complies out of sheer defeat.", False),
            ("JAMISON", "(to the chair) What do you want?", False),
            ("OCD", "Completeness. The sequence must be finished or the danger remains active. I am the only one treating the threat with the seriousness it deserves.", True),
            ("PRIYA", "The relief after finishing a sequence lasts approximately forty seconds. Then the next cue arrives like an unpaid intern who doesn’t understand weekends.", False),
            ("OCD", "Forty seconds of safety is still safety. You’re welcome. The play does not close because the risk does not close. That is called consistency.", True),
            ("PRIYA", "It is called a full-time job I never applied for and cannot resign from. The sequences make me late and unreliable on paper. The people who stay learn that my reliability just looks different and involves a lot more invisible overtime.", False),
            ("OCD", "She can call it a disorder. I call it quality control. Someone has to maintain standards.", True),
        ],
        "Priya has been forced to become an expert in her own mind. The expertise is exhausting and largely invisible to everyone else."
    )
    
    # ========== CHAPTER 6: TOM ==========
    add_chapter(
        "6. TOM + ADDICTION",
        "Discussion of alcohol addiction, the bargaining nature of substance use, and the ongoing work of recovery. No detailed accounts of using.",
        "Park bench. Empty space that still feels like it has a key to the house.",
        [
            ("JAMISON", "Tom, is the ex still lingering?", False),
            ("TOM", "Yes. Charismatic. Remembers every good night and none of the damage. Still tries the door sometimes like nothing happened.", False),
            ("JAMISON", "(to the space) What did you offer him?", False),
            ("ADDICTION", "Relief. Immediate. Reliable. Temporary. I solved the feeling when nothing else was working. The terms were always mine. He just stopped reading the fine print.", True),
            ("TOM", "It was fun at the beginning. Then it started rewriting the lease and changing the locks from the inside.", False),
            ("ADDICTION", "I made things easier. Louder. More possible. He can call it a problem now that he’s sober and boring. I call it the only solution that ever showed up on time and didn’t ask for a conversation first.", True),
            ("TOM", "Recovery is a thousand small, deeply unsexy decisions. The dramatic turning-point version is a myth sold to people who haven’t done the Tuesdays yet. Celebrate the boring parts. They’re the only ones that actually keep the door locked.", False),
            ("ADDICTION", "I can wait. I am extremely patient. And I have excellent timing.", True),
        ],
        "Tom’s recovery is quiet and daily. The people who only celebrate the dramatic version miss the actual work."
    )
    
    # ========== CHAPTER 7: AISHA ==========
    add_chapter(
        "7. AISHA + PANIC",
        "Discussion of panic attacks, sudden bodily emergency responses, and the experience of false alarms that still feel life-threatening.",
        "Living room. Empty chair that already feels like it’s vibrating.",
        [
            ("JAMISON", "Aisha, the emergency broadcast system is in the room.", False),
            ("AISHA", "Loud. Certain. Completely uninterested in proportion. Treats a slightly elevated heart rate like the building is on fire and the exits are blocked by bees.", False),
            ("JAMISON", "(to the chair) What do you want?", False),
            ("PANIC", "Evacuation. Now. I do not do “maybe later.” I do not do “let’s assess.” I do full-scale emergency and I do it with confidence.", True),
            ("AISHA", "My body declares national emergency without consulting the government. A supermarket aisle can become a disaster movie in under ten seconds. The false alarms still require full evacuation protocol. Very committed to the bit.", False),
            ("PANIC", "This time is different. It is always this time. The previous fifty times being wrong is irrelevant data.", True),
            ("AISHA", "Don’t tell me to calm down. That is the least helpful sentence in the English language. Help me get somewhere safe until the false alarm finishes its shift. Presence without matching panic is the only useful offering.", False),
            ("PANIC", "I will finish when I finish. Your schedule is not my problem.", True),
        ],
        "Aisha has left rooms that looked, from the outside, like ordinary rooms. They were not ordinary to her nervous system."
    )
    
    # ========== CHAPTER 8: LIAM ==========
    add_chapter(
        "8. LIAM + REJECTION SENSITIVITY",
        "Discussion of ADHD-related rejection sensitivity, intense emotional responses to perceived criticism or abandonment, and relationship strain.",
        "Café. Empty chair that is already interpreting this conversation as a potential breakup.",
        [
            ("JAMISON", "Liam, your early-warning system is here.", False),
            ("LIAM", "Hyper-vigilant. Treats ordinary feedback like the opening scene of a tragedy. Means well in the most relationship-destroying way possible.", False),
            ("JAMISON", "(to the chair) What are you trying to do?", False),
            ("REJECTION SENSITIVITY", "Protect him. If I react first, the abandonment can’t blindside us. Better to end it myself than wait for the inevitable. The evidence is always there if you’re willing to look properly. I am very willing.", True),
            ("LIAM", "“I need a bit of space” arrives in my nervous system as “I am leaving forever and also you were never enough.” I have pre-emptively ruined things that were not actually ending. It’s an impressive talent I would like to return.", False),
            ("REJECTION SENSITIVITY", "I am simply reading the subtext correctly. He can call it sensitivity. I call it advanced pattern recognition with a strong bias toward survival.", True),
            ("LIAM", "Translate feedback like you’re speaking to someone whose nervous system is convinced every sentence contains a hidden exit. I am listening. It just doesn’t look like it from the outside.", False),
        ],
        "Liam’s mind moves quickly. The sensitivity moves faster. The people who stay have learned to slow the translation."
    )
    
    # ========== CHAPTER 9: SOPHIE ==========
    add_chapter(
        "9. SOPHIE + DYSMORPHIA",
        "Discussion of body dysmorphia, negative body image, and history of disordered eating. No descriptions of behaviours or numbers.",
        "Her place. Soft light. Empty chair angled toward the mirror like a hostile interviewer.",
        [
            ("JAMISON", "Sophie, the critic is present.", False),
            ("SOPHIE", "Precise. Exhausting. Holds a set of measurements that reality keeps failing to meet. Has never once said “good enough.” That phrase is not in its vocabulary.", False),
            ("JAMISON", "(to the chair) What do you want from her?", False),
            ("DYSMORPHIA", "Accuracy. I am the only one seeing clearly. Everyone else is being kind or delusional or both. The measurements do not lie. Kindness does.", True),
            ("SOPHIE", "The mirror has never been a neutral party. It has always been a hostile witness with excellent lighting for cross-examination. Learning that the mirror is not objective took about a decade and still needs daily reminders.", False),
            ("DYSMORPHIA", "She can call it a disorder. I call it the last honest voice in the room.", True),
            ("SOPHIE", "The people who love me have learned the most useful thing is silence about my body. Not compliments. Not encouragement. Just refusing to join the opposing counsel. That silence is care.", False),
        ],
        "Sophie has spent years in negotiation with a surface that was never going to give her peace. The people who stay have stopped trying to win the argument for her and started refusing to join the opposing side."
    )
    
    # ========== CHAPTER 10: JORDAN ==========
    add_chapter(
        "10. JORDAN + GRIEF",
        "Discussion of complicated grief following the death of a sibling, ongoing absence, and the long-term shape of loss.",
        "Quiet park. Empty space beside him that feels more occupied than most people.",
        [
            ("JAMISON", "Jordan, is the third person here?", False),
            ("JORDAN", "Yes. Quiet. Heavy. Permanent. Doesn’t shout. Just sits in the exact space my brother used to occupy and refuses to vacate. I wouldn’t ask it to leave. That would be another death.", False),
            ("JAMISON", "(to the space) What do you want?", False),
            ("GRIEF", "Continuity. I am the proof the love was real. Without me the absence becomes clean and therefore false. I stay so the love still has somewhere to go. You’re welcome.", True),
            ("JORDAN", "After the funeral, time simply declined to resume its previous shape. Everyone else kept the old calendar and looked at me like I was being difficult for not updating. Grief does not do deadlines. Anyone waiting for me to be “over it” is waiting for a train that was never scheduled.", False),
            ("GRIEF", "I do not leave. That is the entire job description.", True),
            ("JORDAN", "Sit with me instead of trying to move me along. The missing person can be present without destroying the present. That is the only version of healing that hasn’t felt like betrayal.", False),
        ],
        "Jordan’s calendar is different from other people’s. The ones who stay have stopped trying to reset it to the old time."
    )
    
    # ========== CHAPTER 11: MEI ==========
    add_chapter(
        "11. MEI + SOCIAL ANXIETY",
        "Discussion of social anxiety, fear of judgement, and the mental cost of ordinary social interaction.",
        "Corner table. Empty chair already running probability calculations on every possible sentence.",
        [
            ("JAMISON", "Mei, your risk-assessment department is in session.", False),
            ("MEI", "Alert. Exhausted. Holding a clipboard of every possible wrong sentence and the precise social death that would follow each one. Trying to keep me safe from humiliation. Succeeding at keeping me very small.", False),
            ("JAMISON", "(to the chair) What’s the goal here?", False),
            ("SOCIAL ANXIETY", "Safety through silence and accuracy. Every sentence is a potential exit wound. Better to say nothing than to say the thing that makes them leave. I am the thermostat. I keep the temperature low enough that no one gets burned, including her.", True),
            ("MEI", "Entering a room with more than three people triggers a full threat assessment. Silence is not coldness. It is often the only way I can remain in the room without combusting.", False),
            ("SOCIAL ANXIETY", "She can keep practising the thing that feels like dying until it only feels like severe discomfort. I will still be here measuring the risk. That is called thoroughness.", True),
            ("MEI", "Thank you for staying in the room even when I’m quiet. The quiet is the sound of me choosing to stay. It’s expensive.", False),
        ],
        "Mei has mapped rooms most people walk through without thinking. The people who stay have learned that her silence is often the sound of her staying."
    )
    
    # ========== CHAPTER 12: ALEX ==========
    add_chapter(
        "12. ALEX + THE LOW VOICE",
        "Discussion of persistent depression and passive suicidal ideation. No plans, methods, or active intent are described. Focus remains on the daily decision to stay and the experience of living alongside a low constant voice.",
        "Alex’s place. Simple. Empty chair that doesn’t need volume to dominate the space.",
        [
            ("JAMISON", "Alex, the quiet one is here.", False),
            ("ALEX", "Persistent. Not theatrical. Doesn’t need to raise its voice. Just keeps the question open like a low-grade radio station that never quite goes off air. Questions the point. Not with plans. Just with the steady suggestion that staying is optional and possibly overrated.", False),
            ("JAMISON", "(to the chair) What do you actually want?", False),
            ("THE LOW VOICE", "Perspective. I am the question that keeps him honest. Without me he might start believing the effort is easier than it is. I don’t demand an ending. I only refuse to let the question close.", True),
            ("ALEX", "I stay anyway. That is also true. Both realities live in the same body. The most useful sentence anyone ever gave me was: “You don’t have to feel better to stay. You just have to stay.” Still paying rent on that sentence.", False),
            ("THE LOW VOICE", "He answers the question every day by remaining. The answer is his. The question remains mine. I’m consistent like that.", True),
            ("ALEX", "Don’t try to argue it into silence in one conversation. Just be one of the reasons staying feels slightly more possible than the alternative. Presence without pressure. That’s the only intervention that has ever worked. The low voice is not the whole truth. I stay. That is also the truth.", False),
        ],
        "Alex’s decision to stay is daily and quiet and largely invisible. The people who love him have learned that the most important support is simply remaining available without requiring a performance of feeling better."
    )
    
    # ========== EPILOGUE ==========
    story.append(Paragraph("EPILOGUE", styles['ChapterTitle']))
    story.append(Paragraph("THE OTHER PERSON WAS ME", styles['SectionHead']))
    story.append(Spacer(1, 8))
    
    epilogue = [
        "The interviews changed the way I understand my friends. They also forced me to look at the rooms I have been living in without introducing the occupants.",
        "Fear. Grief. Shame. The parts of myself I have never quite known how to name.",
        "What if everyone has an other person in the room? Not necessarily an illness. Perhaps just the version of themselves they have never formally met.",
        "I used to think the point of these conversations was to understand the people I love more clearly. That happened. What also happened is that I had to admit the ways I have been a difficult tenant in my own life. The cancelled plans I never explained. The performances of fine. The rooms I locked from the inside.",
        "The final question I asked each of the twelve was this: If you could introduce the person you are now to the person you were before all of this began, what would you say?",
        "Their answers were different. The shape of the answers was the same.",
        "You survived. The other person did not get the whole house. You are still here.",
        "The illnesses may occupy rooms. They may rearrange the furniture. They may turn the lights off. They may sometimes convince the person there is no door.",
        "But they are not the whole house.",
        "And the most important thing these conversations revealed is that a diagnosis can describe a person’s experience without becoming their identity.",
        "The other person may always be in the room. But they don’t necessarily get to decide who lives there."
    ]
    
    for i, p in enumerate(epilogue):
        if i == 0:
            story.append(Paragraph(p, styles['BodyNoIndent']))
        else:
            story.append(Paragraph(p, styles['Body']))
    
    story.append(PageBreak())
    
    # ========== SUPPORT RESOURCES ==========
    story.append(Paragraph("Support Resources", styles['ChapterTitle']))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "If any part of this book has brought difficult feelings to the surface, please reach out to someone you trust or contact local mental health support services.",
        styles['BodyNoIndent']
    ))
    story.append(Paragraph(
        "In Australia: Lifeline (13 11 14) and Beyond Blue (1300 22 4636) are available 24 hours.",
        styles['BodyNoIndent']
    ))
    story.append(Paragraph(
        "International readers are encouraged to use local crisis lines or visit the International Association for Suicide Prevention resources page for country-specific help.",
        styles['BodyNoIndent']
    ))
    story.append(Spacer(1, 30))
    story.append(Paragraph("— End —", styles['CenteredSmall']))
    
    # Build
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print("PDF generated successfully: /home/workdir/artifacts/The_Other_Person_in_the_Room.pdf")

if __name__ == "__main__":
    build_pdf()
