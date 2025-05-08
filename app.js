const securityCheckData = {
    name: "Security",
    version: "1.0.0",
    numOfQuestions: 2, // Antal spørgsmål
    answers: "", // Indeholder svar, f.eks BA
    details: {
        description: "A project with a branching structure on security.",
        author: "Cecilie Oxenbøll Pallesen"
    },
    frontpage: { // Forside tekster
        title: "Datasikkerheds<wbr>udfordring",
        content: "I en virksomhed, der håndtér følsomme data, er det vigtigt at vide hvordan man skal handle sikkert og forebygge cyberangreb.\n\nDu skal derfor prøve at træffe valg, som bedst muligt beskytter virksomhedens informationer. Dine valg fører til én af tre mulige slutninger.",
        button: "Start testen",
    },

    questions: { // Spørgsmålstekster og svartekster
        "initial": { 
            title: "Mistænkelig aktivitet på din arbejdskonto",
            content: "Din arbejdskonto viser logins fra en ukendt enhed, du ikke kan genkende.\n\nHvad gør du? Tryk på en af følgende svarmuligheder:",
            answerA: "Ignorer advarslen, da du ikke har oplevet problemer",
            answerB: "Ændr din adgangskode, og rapporter det til IT-afdelingen"
        },
        "A": {
            title: "Konto<wbr>kompromittering",
            content: "Efter et par dage kan du se, at der er filer der forsvinder og kollegaer fortæller, at de har modtaget mærkelige mails fra din konto.\nHvad gør du nu? Vælg en af følgende svarmuligheder:",
            answerA: "Prøver at løse det selv ved at gendanne slettede filer",
            answerB: "Kontakter IT-afdelingen for hjælp"
        },
        "B": {
            title: "Hurtig reaktion",
            content: "IT-afdelingen kan se, at en hacker har forsøgt at få adgang til din konto. Din hurtige reaktion er værdsat og yderligere sikkerhedsforanstaltninger bliver implementeret.\n\nHvad gør du nu? Vælg en af følgende svarmuligheder:",
            answerA: "Aktivere 2-faktor godkendelse for ekstra sikkerhed",
            answerB: "Ingenting. Du stoler på at IT-afdelingen har styr på det."
        },
    },

    summaries : { // Opsummeringstekster
        "ending": {
            title: "Dine valg har haft konsekvenser",
            content: "For at sikre datasikkerheden er det vigtigt at reagere hurtigt og ansvarligt. Vil du træffe samme valg næste gang?",
        },
        "AA": {
            title: "Datasikkerheds<wbr>katastrofe",
            content: "En hacker har fået fuld kontrol over din konto og følsomme data er kompromitteret. Dette har store konsekvenser for virksomhedens økonomi og omdømme. Din mangel på hurtig og sikker handling har haft alvorlige konsekvenser", 
        },
        "AB": {
            title: "Skades<wbr>begrænsning",
            content: "IT-afdelingen får hurtigt sikret din konto, men skaden er allerede sket. Selvom de får styr på situationen, har manglen på hurtig handling kostet både tid og ressourcer. Det er vigtig at reagere hurtigt og grundigt ved sikkerhedssager.",
        },
        "BA": {
            title: "Datasikkerheds<wbr>rollemodel",
            content: "Du har handlet hurtigt og grundigt, og din indsats har hjulpet med at forhindre fremtidige cyberangreb. Virksomheden roser dig for din ansvarlige håndtering, som har sikret virksomhedens data.",
        },
        "BB": {
            title: "Skades<wbr>begrænsning",
            content: "IT-afdelingen får hurtigt sikret din konto, men skaden er allerede sket. Selvom de får styr på situationen, har manglen på hurtig handling kostet både tid og ressourcer. Det er vigtig at reagere hurtigt og grundigt ved sikkerhedssager.",
        },
    },
};

// Opsætning ved load af siden, her sættes forside tekster, og relevant knap vises
$onload = function() {
    $("#title").html(securityCheckData.frontpage.title);
    $("#oneButton").text(securityCheckData.frontpage.button);
    $("#content").html(securityCheckData.frontpage.content.replace(/\n/g, "<br>"));
    $("#answerA").hide();
    $("#answerB").hide();
    $("#oneButton").show().text(securityCheckData.frontpage.button).off('click').on('click', function() {
        startQuiz();
    });
};

// Opsætter første spørgsmål(initial), og viser relevante knapper
function startQuiz() {
    nextQuestion("initial");
    $("#oneButton").hide();
    $("#answerA").show();
    $("#answerB").show();    
}

// Håndterer svar
function answer(answer) {
  	// Gem svar
    securityCheckData.answers += answer;
  	// Hvis alle spørgsmål er besvaret, laves opsummering
    if (securityCheckData.answers.length >= securityCheckData.numOfQuestions) {
       summarize(securityCheckData.answers);
    } else {
       // Hent næste spørgsmål baseret på tidligere svar
       nextQuestion(securityCheckData.answers);
    }
}

// Opsætter næste spørgsmål, baseret på tidligere svar
function nextQuestion(answers) {
    if (securityCheckData.questions[answers]) {
        $("#title").html(securityCheckData.questions[answers].title);
        $("#answerA").html(securityCheckData.questions[answers].answerA);
        $("#answerB").html(securityCheckData.questions[answers].answerB);
        $("#content").html(securityCheckData.questions[answers].content.replace(/\n/g, "<br>"));
    } else { // Fejlhåndtering, hvis eventuelt spørgsmål ikke findes
        $("#title").html("Overskrift for " + answers + " mangler");
        $("#content").html("Der er ikke flere spørgsmål i denne sektion.");
        $("#answerA").hide(); 
        $("#answerB").hide();
        $("#oneButton").show().text("Start forfra").off('click').on('click', function() {
            location.reload();
        });
    }
}

function summarize(answers) {
 	// Svarene hentes og bliver listet op
    questionIndex = "initial";
    let content = "Du valgte følgende svar:\n\n";
    for (let i = 0; i < answers.length; i++) {
        answer = answers.substring(i, i+1)
        if (answer == "A") {
            content += i+1 + ". " + securityCheckData.questions[questionIndex].answerA + "\n\n";
        } else {
            content += i+1 + ". " + securityCheckData.questions[questionIndex].answerB + "\n\n";
        }

        questionIndex = answers.substring(0, i+1)
    }
  	// Herefter tilføjes den korrekte opsummering for de pågældende valg
    content += securityCheckData.summaries[answers].content;
    $("#title").html(securityCheckData.summaries[answers].title);
    $("#content").html(content.replace(/\n/g, "<br>"));
    $("#answerA").hide(); 
    $("#answerB").hide();
    $("#oneButton").show().text("Videre").off('click').on('click', function() {
        end();
    });
}

// Opsætter slutsiden
function end() {
    $("#title").html(securityCheckData.summaries.ending.title);
    $("#content").html(securityCheckData.summaries.ending.content);
    $("#answerA").hide(); 
    $("#answerB").hide();
    $("#oneButton").show().text("Tag testen igen").off('click').on('click', function() {
        location.reload();
    });
}

// Kald $onload ved sidelæsning
window.onload = $onload;