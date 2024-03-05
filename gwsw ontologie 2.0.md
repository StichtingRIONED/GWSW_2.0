# GWSW Ontologie 2.0

<!-- gebruik voor lokaal editen -->
<script src="./builds/respec-rioned.js"></script>

**Een beschrijving van de GWSW Ontologie op basis van de [NEN 2660-2:2022 nl](https://www.nen.nl/nen-2660-2-2022-nl-291667)**

Versie historie
<div style="font-size: 0.90em">

20230822: Review Wouter van Riel verwerkt   
20230802: Review CROW en Johan Post verwerkt   
20230711: Samenvatting uitgebreid, tekst correcties   
20230530: Oplevering openbaar concept-document  
20230522: Eerste commentaarronde (Michel Bohms) verwerkt  
20230511: Vervolg implementatie NEN2660  
20221220: Eerste aanpassingen op vervanging NTA 8035 door NEN2660  
20221220: Algemene update, hou synchroon met figerende GWSW Ontololgie-document  
20221202: Overzicht verschillen met IMBOR-LD toegevoegd  
20211025: Hoofdstuk indeling afgestemd op document GWSW Ontologie in RDF
20201005: Hst Modelleerprincipes bijgewerkt
20200817: Voorwaarden bij concept-annotaties uitgeschreven  
20200814: Annotaties vanuit Gellish toegevoegd (editor, fact-collectie)  
20200514: Figuren met metamodellen en bestandsvormen bijgewerkt  
20200509: URI-strategie toegevoegd, ook voorstel voor individuen  
20200507: Commentaar van Michel (overleg dd 20200506) verwerkt  
20200505: Diverse kleine tekstaanpassingen  
20200430: Volledig bijgewerkt op basis laatste NTA 8035:2020 en SHACL proefnemingen  
20200415: Proefneming in voorbeelden uitgewerkt  
20200408: SHACL toepassing voor data-verificatie toegevoegd  
20200325: Bijgewerkt op basis (teams)overleg met TNO (Michel) (20200324)  
20200214: Bijgewerkt op basis laatste versie van NTA 8035:2020 (20200211)  
20200103: Opmerking toegevoegd: is Topologisch element wel een nen2660:Property?  
20200102: Voorstel integratie van NTA 8035
</div> 

# Inleiding

Het W3C definieert standaarden voor het Semantisch Web met als basis de triple-vorm: de Subject-Predicate-Object constructie. Het basisprotocol dat hieraan ten grondslag ligt is de linked data taal RDF.

Begin 2020 is gestart met het ontwerp van GWSW 2.0, gebaseerd op de in die tijd uitgebrachte NEN NTA 8035:2020, opgevolgd door de NEN 2660 deel 1 en 2. Het generieke uitwisselformaat GWSW-OroX wordt hiermee ook herzien, de uitwisseling en toepassing van de GWSW linked data gegevens zal functioneel nauwelijks gaan wijzigen. GWSW versie 2.0 beschrijft de RDF-implementatie op de NEN 2660-2 (verder genoemd NEN2660) voor de discipline Stedelijk Water. In een enkel geval wordt teruggegrepen op de NEN 2660-1, dat wordt dan expliciet vermeld.

Bij de uitwerking van dit document is er van uitgegaan dat de lezer bekend is met de principes van het RDF en daarop gebaseerde standaarden. Ook kennis van het uitwisselformaat Turtle is aanbevolen, in de voorbeelden (van datamodel, dataset en SHACLshapes) en in de praktijk (bij uitwisseling van GWSW-gegevens) gebruiken we dat Turtle-formaat.

In deze inleiding vindt u de gebruikte begrippen en uitgangspunten bij de modellering. De volgende hoofdstukken beschrijven de modelleringsprincipes, overzichten en details van het datamodel, de toepassing van het datamodel in datasets en de verificatie-opties met SHACL. Het laatste hoofdstuk bevat bruikbare voorbeelden van data-afleiding en -verificatie.

## Gebruikte begrippen

**Linked data: RDF, RDFS, OWL, SHACL**  
RDF staat voor Resource Description Framework, de basisdefinitie van modellen op basis van subject-predicate-object. In de tekst verstaan we onder "linked data" de combinatie van RDF en de daarop gebaseerde schema's RDFS (RDF Schema), OWL 2 (Web Ontology Language) en SHACL (Shapes Constraint Language). Met de term OWL wordt OWL 2 aangeduid.

**CE, OPE, DPE**  
Deze afkortingen hanteren we in de OWL definities. De afkorting CE wordt gebruikt voor Class Expressions (in Description Logics “complex concepts”). CE’s worden ondermeer gevormd door Classes te binden aan Object Property Expressions (OPE). Data Property Expressions (DPE) beschrijven restricties op de waardetypes.

**Concept, ding, symbool**  
We hanteren deze begrippen zoals gesymboliseerd in de "betekenisdriehoek" (aangehaald in de NEN 2660-1): een individueel ding is iets dat waarneembaar of voorstelbaar is in de werkelijkheid, een individueel concept is de mentale voorstelling van het ding, een symbool is altijd iets materieels (meestal een woord) dat het concept (en ding) representeert.  

**Individu**  
Een synoniem van Individueel Concept (NEN 2660-1): een enkelplaatsig (unair) Individueel Ding (in de "Werkelijke Wereld") dat existentieel onafhankelijk is, de conceptualisatie van iets aanwijsbaars of voorstelbaars uit de werkelijkheid. Zoals individu “0980” in werkelijkheid de betonnen constructie van de klasse/concept “rioolput” is.

**Klasse, subtype, supertype**  
Klassen zijn de bouwstenen van de soortenboom, ook wel taxonomie genoemd. In de GWSW-hiërarchie gebruiken we de termen Supertype - Klasse - Subtype. Een subtype is de "specialisatie" van de klasse, het supertype is de "generalisatie" van de klasse.

**Property, predicate (attribuut, relatie)**  
Voor de relatie (tussen subject en object) zijn meerdere namen gebruikelijk (“predicate”, “property”). Conform de NEN 2660-2 hanteren we de term "attribuut" voor niet-geobjectiviceerde kenmerken en annotaties, en voor de overigen de term "relatie". Voor de verzamelnaam gebruiken we "property".

**Ontologie**  
Een samenhangende gegevensstructuur bestaande uit concepten, hun attributen en onderlinge relaties, instanties van die concepten en waardetypen.

**Datamodel, Dataset**  
Binnen de GWSW ontologie beschrijft het datamodel de concepten met hun attributen en relaties. De dataset bevat de individuen, bijvoorbeeld een gemeentelijk afvalwatersysteem. Voor het datamodel wordt ook wel de term TBox gebruikt: “terminological components”. Voor de dataset wordt ook de term ABox gebruikt: “assertion components”.

**OWA, CWA, UNA**  
OWA / Open World Assumption: neem aan dat individuen binnen de dataset ook elders beschreven kunnen zijn  
CWA / Closed World Assumption: neem aan dat individuen alleen binnen de dataset beschreven zijn  
UNA / Unique Name Assumption: neem aan dat individuen een unieke naam (URI) hebben  

## Hoofdstructuur datamodel

De ontologie is gebaseerd op de volgende hoofdstructuren:
-   Soortenboom
-   Samenstelling
-   Proces
-   Collecties

De belangrijkste "top level" concepten (supertypes) zijn:
-   Fysiek object
-   Activiteit

Bij het ontwerp van de datastructuur spelen deze elementen de hoofdrol. Met de NEN2660 vormen ze het ontwerpkader, de ruggengraat van het GWSW. De GWSW ontologie onderscheidt zich door diepgang in semantiek en reikwijdte in de toepassing (van systeem tot proces). De soortenboom van het GWSW bevat op dit moment (versie 1.6) circa 1500 klassen.

## Modelvormen

De ontologie omvat zowel het datamodel (de klassen, attributen en relaties, zie [data.gwsw.nl](https://data.gwsw.nl)) als de daarop gebaseerde datasets (de individuen, zie [apps.gwsw.nl](https://apps.gwsw.nl)). Vanaf GWSW 2.0 wordt naast het <span class="blue">Datamodel</span> en <span class="blue">Dataset</span> een derde datastructuur gebruikt: de <span class="blue">Shapes</span> met daarin SHACL graphs als constraints voor data -verificatie (de conformiteitsklasse - CFK). (De Shapes vervangen de filters op vorige GWSW-versies met daarin aangescherpte OWL-restricties).

Het datamodel kan nog worden onderverdeeld naar modelvormen (zie ook hst [MOF en MIM](#mof-en-mim)), de integratie in IMBOR vraagt mogelijk om zo'n onderverdeling:

**Begrippenmodel en conceptueel model (vocabulaire)**  
Een modelvorm met het begrippenkader (het universe of discourse) en een beschrijving van de data-betekenis en structuur.  
Deze modelvorm bevat voor GWSW 2.0 de soortenboom (supertypes, klassen, subtypes) met hun annotaties (labels en definitie).
Deze modelvorm kunnen we ook beschouwen als woordenboek/vocabulaire, geschikt voor op zichzelf staande presentaties (conform IMBOR). 

**Logisch model**
Beschrijft de interactie tussen systemen en hun gebruikers en tussen systemen onderling.  
Deze modelvorm bevat voor GWSW 2.0 de OWL-restricties op relaties en attributen. Daarmee worden alle interacties beschreven.

**Technisch model**  
Beschrijft de technologie waarin de informatie wordt vastgelegd of uitgewisseld.  
RDF vormt het kader voor het technisch model. De SHACL-graphs (Shapes) met verificatie-specificaties kunnen we als onderdeel van het technisch model beschouwen. 

Het *datamodel* is zo ingericht dat hiermee vergaande afleiding van de data in de *dataset* mogelijk is ("inferencing"). Daarnaast dienen de *shapes* om - afhankelijk van het toepassingsproces - kwaliteitseisen te formuleren en via de SHACL processor te verifiëren.  

*De rol van de bestandsvormen Datamodel, Dataset en Shapes bij de toepassing van het GWSW:*

<img src="media/image1.png" style="width:100%;height:40%" />

Voorbeelden van de bestandsvormen zijn in dit document als volgt gemarkeerd:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
    Voorbeeld datamodel
</pre></div>
<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
    Voorbeeld dataset
</pre></div>
<div class="example-shapes"><div class="example-title marker">Shapes:</div><pre>
    Voorbeeld SHACL graphs
</pre></div>


## Uitgangspunten

Een belangrijk principe is de object-georiënteerde modellering: het datamodel hanteert overerving-principes en maakt zo expliciet mogelijk onderscheid in subtypen. Dat is een heel andere benadering dan bijvoorbeeld het ontwerp van een relationeel datamodel. Daarbij ligt de nadruk op het interpreteren van informatie met een hoofdrol voor de normalisatie-techniek om opslagruimte te beperken en redundantie te voorkomen. RDF is vanwege zijn binaire relaties van zichzelf optimaal genormaliseerd, wijzigingen beperken zich tot toevoegen of verwijderen van triples.

Voor de modellering is uitgegaan van het OWL RL (Rule Language) profiel. Dit profiel gebruikt nagenoeg alle OWL 2 semantiek en is toereikend voor het modelleren van de GWSW-Ontologie.

Voor de definitie van klassen, eigenschappen, datatypen en restricties kunnen verschillende benaderingen gekozen worden. De volgende uitgangspunten zijn gehanteerd:

Uitgangspunten bij de bouw van de GWSW ontologie:
* Bij de indeling van soorten, de vaststelling van de taxonomie, wordt de onderscheidende definitie zo expliciet mogelijk beschreven.
* Validaties en specificaties voor data-verificatie beschrijven we in SHACL.
* De SHACL graphs kunnen in meerdere vormen voorkomen en staan naast de GWSW ontologie. De shapes worden gebaseerd op de vereiste datakwaliteit per proces. De zogenaamde conformiteitsklassen.
* De ontologie is volledig gebaseerd op de NEN2660. Het GWSW gebruikt ook de NEN-methode voor het beschrijven van attributen. Die is geïnspireerd op de Ontology for Property Management (OPM), zie https://w3c-lbd-cg.github.io/opm .
* De modellering wordt getest met Protégé 5.5.0, in combinatie met de HermiT- en Pellet-reasoners en SPARQL- en SHACL-plugins.

Het laatste hoofdstuk bevat voorbeelden waarbij deze uitgangspunten worden toegepast.

### Versiebeheer

De GWSW Ontologie wordt vanaf versie 1.5.2 in GitHub, onderhouden. Daarmee is er volledige controle over de versie-aanpassingen. Van de versies voorafgaand aan 1.5.2 zijn de ontologie-bestanden uiteraard nog voorhanden, ze zijn ook op internet gepubliceerd. Alle aanpassingen zijn daarnaast in een logboek vastgelegd. 
In de ontologie is <span class="blue">owl:versionInfo</span> opgenomen, daarin staat de aanmaakdatum. Vanaf versie 2.0 wordt daarin ook expliciet het versienummer opgenomen.

In de URL van GWSW-concepten is (al dan niet via een prefix) expliciet het versienummer opgenomen (exclusief patch-nummer, bijvoorbeeld voor versie 1.5.2 blijft het 1.5). 
Elk GWSW-concept heeft dus een eigen beschrijving per versie op het web, die concepten zijn daar tot versie 1.3.1 ook terug te vinden. Vanaf versie 1.4 worden de patch-nummers
niet meer in de URL opgenomen.

Met een alias wordt voor het browse-gemak altijd naar de meest recente versie (in het deelmodel Totaal) verwezen:
* Aliasen https://data.gwsw.nl/put en https://data.gwsw.nl/1.6/totaal/put verwijzen beide naar https://data.gwsw.nl/def/1.6/totaal/put (de actuele versie)
* Alias https://data.gwsw.nl/1.4/totaal/put verwijst naar https://data.gwsw.nl/def/1.4/totaal/put

Een gewijzigd versie-nummer (exclusief patch-nummer) vraagt altijd om aanpassing/evaluatie van de toepassing. 
In datasets wordt daarom alijd expliciet verwezen (met de URL) naar de bijbehorende ontologie-versie.

### Taalbinding naar RDF gebaseerde standaarden

De volgende standaardformaten of -talen hanteren we in de GWSW ontologie:

| Formaat | Omschrijving                                                                                                                                                                                                    |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RDF     | Het Resource Description Framework, de basisdefinitie van modellen op basis van subject-predicate-object.                                                                                                       |
| RDFS    | Een schema op RDF voor het structureren van ontologieën, onderscheidt concepten en individuen.                                                                                                                  |
| OWL     | Web Ontology Language (versie 2), voegt mogelijkheden toe om klassen, properties en datatypes door middel van restricties te definiëren. (OWA)                                                                  |
| SHACL   | Shapes Constraint Language, een taal waarmee restricties op RDF graphs beschreven worden. (CWA)                                                                                                                 |
| SKOS    | Simple Knowledge Organization System. Gericht op het uitdrukken van kennisorganisatie systemen (KOS) zoals vocabulaires, woordenboeken en thesauri.                                                             |
| NEN2660 | De door NEN gepubliceerde "Regels voor informatiemodellering van de gebouwde omgeving - Deel 2: Praktische configuratie, extensie en implementatie van NEN 2660-1". Gebaseerd op RDF, RDFS, OWL, SKOS en SHACL. |

### Gebruikte namespaces

Overzicht van de relevante namespaces

| Onderwerp      | Prefix        | Url                                                 |
|----------------|---------------|-----------------------------------------------------|
| RDF            | rdf:          | &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt; |
| RDFS           | rdfs:         | &lt;http://www.w3.org/2000/01/rdf-schema#&gt;       |
| OWL            | owl:          | &lt;http://www.w3.org/2002/07/owl#&gt;              |
| SHACL          | sh:           | &lt;http://www.w3.org/ns/shacl#&gt;                 |
| SKOS           | skos:         | &lt;http://www.w3.org/2004/02/skos/core#&gt;        |
| NEN2660        | nen2660:      | &lt;https://w3id.org/nen2660/def#&gt;               |
| Datatypes      | xsd:          | &lt;http://www.w3.org/2001/XMLSchema#&gt;           |
| Geo-definities | geo:          | &lt;http://www.opengis.net/ont/geosparql#&gt;       |
| Grootheden     | quantitykind: | &lt;http://qudt.org/vocab/quantitykind/&gt;         |
| Eenheden       | unit:         | &lt;http://qudt.org/vocab/unit/&gt;                 |
| IMBOR          | imbor:        | &lt;https://data.crow.nl/imbor/def/&gt;             |

Voor de concepten en relaties uit de GWSW-Ontologie hanteren we in de voorbeelden de prefix “gwsw:”. Voor individuen in een dataset wordt de prefix “ex:” gebruikt.

| Onderwerp      | Prefix | Url                                       |
|----------------|--------|-------------------------------------------|
| GWSW-Datamodel | gwsw:  | &lt;https://data.gwsw.nl/2.0/totaal/&gt;  |
| GWSW-Dataset   | ex:    | &lt;https://sparql.gwsw.nl/id/Juinen#&gt; |

 (https://data.gwsw.nl/2.0/totaal/ is een alias voor https://data.gwsw.nl/def/2.0/totaal/)
 
# Modelleerprincipes - Algemeen

Een groot deel van de gehanteerde modelleerprincipes stammen uit de oorspronkelijke opzet (gestart in 2006) van het datamodel in Gellish-vorm. Deze principes zijn natuurlijk taalonafhankelijk, ook in de RDF-vorm blijven ze van groot belang. Veel dank gaat naar Andries van Renssen, geestelijk vader van Gellish en Matthé van Koetsveld, intensief betrokken bij de modellering in Gellish van het GWSW en zijn voorlopers.

## Reikwijdte datamodel

Het GWSW Datamodel volgt de ontwikkelingen in het vakgebied. Het bevat concepten die actief worden toegepast (in uitwisseling en applicaties) of die in ontwerpen voor toepassing (bijvoorbeeld nieuwe uitwisselvormen) zijn opgenomen. Dat geldt ook (en vooral) voor kenmerken van objecten.  
Terminologie waarbij het uitsluitend gaat om vastleggen van definities wordt met terughoudendheid opgenomen, maar het GWSW heeft zeker ook een woordenboek-functie.

Bij het ontwerp van het GWSW Datamodel spelen altijd de volgende **invalshoeken** mee:
* Wordt het concept algemeen gebruikt in - native - databases, wordt het (straks) uitgewisseld via GWSW Datasets
* Welke gevolgen heeft de aanpassing voor de toepassingen:
  * Externe applicaties die GWSW Datasets gebruiken
  * De geografische presentaties (en onderliggende queries)
  * De uitwisselformaten HydX, RibX
  * De kwaliteitsmetingen van datasets: dataverificatie met Nulmeting, SHACL
* Zijn de aanpassingen relevant voor het GWSW als naslagwerk en woordenboek

**"As is", de momentopname**  
Het datamodel beschrijft de "as is" situatie, het bevat een momentopname van systemen en processen binnen de discipline stedelijk water. Het beschrijft dus geen historische gegevens of de levenscyclus van objecten zoals bij bitemporeel datamanagement of binnen de context van system engineering.

<div class="box"><strong>Versioning objecten in IMBOR</strong>

IMBOR bevat vanaf 2024 een kader voor versionering van objecten (implementatie NEN 3610: temporele aspecten). Het moet tussen IMBOR en GWSW duidelijk zijn of deze tijdlijngegevens wel of niet tot de alignment gaan behoren.
</div>

## Structureren

Zoals genoemd is de datastructuur object-georiënteerd waarbij objecten in een aantal hoofdstructuren zijn ondergebracht:

* Soortenboom: de taxonomie of klasse-indeling
* Samenstelling: de meronomie of (typische) deel-geheel indeling
* Proces: de activiteiten-schema's
* Groeperingen: collecties van concepten (individuen en klassen)

Bij het ontwerp spelen deze structuren de hoofdrol, ze vormen het ontwerpkader. Met het principe van object-oriëntatie hanteert het datamodel overerving-principes en maakt zo expliciet mogelijk onderscheid in (relaties tussen) subtypes.

<div class="box"><strong>Voorbeelden:</strong>

Afgeleide gegevens komen niet voor in de definitie van fysieke objecten, bijvoorbeeld het kenmerk "aantal pompen". Zo'n gegeven wordt (in presentaties) afgeleid uit het aantal voorkomens van de relatie <span class="blue">heeft deel</span> tussen Gemaal en Pomp. De objecten Gemaal en Pomp worden expliciet beschreven.  

Afgeleide gegevens zoals rekenresultaten en data-analyses komen in het GWSW wel voor in de vorm van gemodelleerde rapportages, bijvoorbeeld in GWSW Kengetallen. 

Eigenschappen van de bovengrond en ondergrond (maaiveldhoogte, grondsoort) komen niet voor als aspecten van de fysieke objecten die zich daarin bevinden. Een leiding heeft niet als kenmerk "Grondsoort", wel wordt er een relatie <span class="blue">is deel van</span> met de ondergrond - en dus met bijbehorende kenmerken - gedefinieerd.

<strong>Consistentie met topmodel IMBOR</strong>

Met het GWSW als onderdeel van IMBOR is hier meer integratie binnen het topmodel nodig. In IMBOR is bijvoorbeeld Beheerder een kenmerk van de top-level-klasse FysiekObject terwijl in het GWSW de klasse Beheerder een subtype van Levensvorm is met <span class="blue">heeft invoer</span> het FysiekObject.  
Het streven is om de concepten op topniveau op gelijke wijze te modelleren, als die integratie niet volledig lukt moet de afstemming minstens via alignment worden bereikt. Op discipline-niveau (de specialisaties van de top-level-klassen) is er natuurlijk meer modelleervrijheid.
</div>

## Concepten en annotaties

1. Elk GWSW-concept is van het generieke type owl:Class (en dus van het type rdfs:Class).
2. Een concept en elke CE wordt altijd voorzien van de annotaties zoals opgenomen in hst [Details annotaties](#details-annotatie-attributen)
3. Voeg zoveel mogelijk extra informatie toe zoals afbeeldingen (verwijs via <span class="blue">rdfs:seeAlso</span>)

## Naamgeving

_Terminologie_

Zie hst [Identificatie van concepten](#identificatie-van-concepten)

1. Een concept wordt geïdentificeerd door een URI (namespace + naam)
2. Volg de gebruikelijke termen binnen het vakgebied, bedenk geen nieuwe conceptnamen die misschien de lading beter dekken of neutraler zijn. Dat geldt ook - waar mogelijk - voor abstracte concepten.
3. Voorkom zoveel mogelijk het gebruik van handels- of merknamen in de conceptnamen.
4. Geef alle gebruikelijke vakgebied-termen die gelden voor het te modelleren systeem of proces een plek, als apart concept of als synoniem van een concept. De zoekfunctie wordt daarmee volledig.
5. Laat algemene termen die niet specifiek bij de discipline horen zoveel mogelijk buiten beschouwing. Modelleer bijvoorbeeld het concept "calamiteit" alleen als het als supertype nodig is.
6. Verwijs voor algemene termen waar mogelijk naar andere databronnen (<span class="blue">rdfs:seeAlso</span>).

## Data-afleiding en -verificatie

Bij de definitie van klassen ligt de focus op data-afleiding (determinatie). Definieer klassen zo uitgebreid mogelijk op basis van hun eigenschappen. Daarmee worden datasets op basis van het datamodel ruimer interpreteerbaar en beter verifieerbaar. Hier volgt een opsomming van de mogelijke afleidingen (inferences) en uit de CE's afgeleide validaties. In enkele gevallen is reasoning op basis van het UNA principe nodig. De controle op kardinaliteit is beperkt vanwege het OWA principe in RDF.

* Controle op referentie-waarden binnen domein van collecties / keuzelijsten (CWA/UNA)
* Controle op correcte typering binnen samenstellingen via "heeft deel" relatie.
  - Ruimte heeft deel “object” => object is van de klasse Ruimte of FysiekObject
  - FysiekObject heeft deel “object” => object is van de klasse Ruimte of FysiekObject
* Inferencing: Individu-klasse wordt afgeleid uit intrinsiek kenmerk.
  - individu heeft kenmerk "breedte leiding" => individu is van de klasse Leiding
* Inferencing: Individu-klasse wordt afgeleid uit onderscheidend kenmerk.
  - individu heeft uitvoering "klein" => individu is van de klasse KleinObject
* Controle op correct gebruik datatype bij "heeft waarde" (datatypes decimal, string, integer, double, date, time, year).
* Controle op numerieke waarden binnen minimum en maximum grenzen
* Kardinaliteit, aantal voorkomens van de relatie of attribuut boven het voor het subject gedefinieerde maximum (CWA/UNA).
  - ook “inverse”-kardinaliteit wordt in de reasoning meegenomen
  - minimum kardinaliteit en shall-relatie wel gemodelleerd, controle op strijdigheid met typering niet mogelijk (OWA)
  
## Soortenboom

<br/><img src="media/taxonomie.png" style="width:50%;" />

<div class="box"><strong>Tips bij opbouw taxonomie (bron: Bart Bink)</strong>

- basis is overerving, ook meervoudig (multiple inheritance)
- start met de class die je kent
- plaats ze in een hiërarchie door subtypering (taxonomie)
- geef aan in definitie waarin de class zich onderscheidt van de bovenliggende class
- geef aan in eigenschappen waarin de class zich onderscheidt van de bovenliggende class en omliggende classes
- let op orthogonaliteit (speelt in het GWSW minder een rol, zie <a href="#orthogonaliteit">Orthogonaliteit</a>)
- plaats een eigenschap (kenmerk) zo hoog mogelijk
</div>

### Definiëren klassen

Definieer zo min mogelijk supertypes, neem ze alleen opgenomen indien noodzakelijk voor de indeling (ervingsprincipe) of als de klasse voorkomt als gebruikelijke term (woordenboek-functie).

Bouw de soortenboom op basis van onderscheidende kenmerken, zie hst [Details onderscheidende kenmerken](#details-onderscheidende-kenmerken).

1. Voor het classificeren van een concept uitgaan van onderscheidende kenmerken in de (abstracte) soortenboom. Denk aan determineren van planten volgens Linnaeus: na het maken van een aantal keuzes wordt de soort gevonden
2. Streef ernaar om met de onderscheidende kenmerken de (in je hoofd) uitgeschreven definitie te vervangen
3. Gebruik de beschreven onderscheidende kenmerken bij fysieke objecten en activiteiten
4. Kwalificeer het onderscheidende kenmerk impliciet (gwsw:uitvoering "groot"). Expliciete kwalificaties (in de vorm van subtypes van generieke kenmerken) worden dus (nog) niet gebruikt

### Abstracte klassen

*Hier verstaan we onder "abstract" de klassen (en collecties) die niet voor classificatie worden gebruikt / niet instantieerbaar zijn*

1. Hou ze beperkt, hou de soortenboom zo veel mogelijk concreet. Supertypes zijn vaak alleen verdichtingen, geen soort dus abstract.
2. Concepten zijn herkenbaar als abstract wanneer ze bijvoorbeeld niet in de deel-geheel relaties (bijvoorbeeld als deel van een rioleringsgebied) voorkomen.
3. Abstracte concepten bij voorkeur als groep/collectie (en niet als supertype) definiëren. Bijvoorbeeld groepering naar thema's, denk aan infiltratievoorzieningen.
4. Subtypes op hetzelfde niveau dienen in grote lijn hetzelfde samenstellingsniveau te hebben.

<div class="box"><strong>Oormerken met behulp van conformiteitsklassen</strong><br/>
In deelmodellen met conformiteitsklassen (CFK) worden abstracte klassen gemarkeerd en daarop gevalideerd. In CFK-presentaties blijven ze verborgen. <a href="#validity-context">Zie validity context</a>
</div>

<div class="box"><strong>Abstracte klassen in SHACL</strong><br/>
De DASH Data Shapes Vocabulary definieert een abstracte klasse als "A class is called abstract if it cannot have direct instances - only non-abstract subclasses of an abstract class can be instantiated directly". DASH bevat de property <span class="blue">dash:abstract</span> met domein <span class="blue">rdfs:Class</span> en range <span class="blue">true</span> voor het markeren van abstracte klassen.
De SHACL validatie hanteert de dash:abstact definitie niet, valideren op (foutief) gebruik van abstracte klassen wordt met SHACL-statements opgelost.
<a href="#details-specialsatie-en-classificatie">Zie Details specialsatie en classificatie</a>
</div>

### Bladerobjecten

1. Specialiseer de klassen zoveel als mogelijk, tot aan de "bladerobjecten", het ultieme subtype, de klasse zonder subtype.
2. Introduceer geen subtype als het geen onderscheidend kenmerk heeft. Bijvoorbeeld geen extra subtype "standaard hemelwaterstelsel" naast "verbeterd hemelwaterstelsel".
3. Hou er rekening mee dat de individuen in de dataset zo specifiek mogelijk geclassificeerd worden. Classificatie gebeurt op bladerobject-niveau tenzij dat bladerobject niet van toepassing is (denk aan het eerdere voorbeeld "hemelwaterstelsel") of als het type onbekend is. Bijvoorbeeld wordt het supertype "kolk" gebruikt als het subtype (straatkolk, trottoirkolk) onbekend is.

In IMBOR heten deze bladerobjecten "Concrete klassen", de subtypes van nen2650:Object heten "Objecttypen". 

### Orthogonaliteit

Binnen de GWSW taxonomie kunnen begrippen haaks (orthogonaal) op elkaar staan, de orthogonaliteit is dus niet bepalend voor de opbouw van de soortenboom. Bijoorbeeld kun je de in het GWSW opgenomen concepten Blinde Put en Overstortput als orthogonaal beschouwen: de één wordt onderscheiden vanwege de constructie, de ander wordt onderscheiden vanwege de functie.  
Dat vraagt extra aandacht bij de toepassing ervan. Zo kan een individu zowel van het type Blinde Put als van het type Overstortput maar dat geldt niet voor de combinatie van de typen Overstortput als Stuwput. Die laatste combinatie conflicteert vanwege de scheiding in functie. In het datamodel kun je dat expliciteren door conflicterende typeringen met <span class="blue">owl:disjointWith</span> te beschrijven. In het GWSW datamodel is dat niet uitgewerkt, via de onderscheidende kenmerken is de orthogonaliteit wel herkenbaar.

## Kenmerken (attributen, aspecten)

**Beschrijf alleen relevante - toegepaste - kenmerken bij een concept.**

1. Kenmerken horen altijd bij een entiteit en kunnen niet bestaan zonder de entiteit
2. Beschrijf met CE's de kardinaliteit op de kenmerken, ook als ze niet definiërend zijn. Hanteer de kardinaliteit "minimum=0" en "maximum=1" voor globale uitdrukkingen.

<div class="box">**Kenmerken in CE's ondersteunen de data-afleiding**<br/>
Als een individu kenmerk X heeft is het mogelijk van type Y ("sufficient")
</div>  

3. Hou kenmerken en entiteiten gescheiden en blijf object-georiënteerd. Bijvoorbeeld Dekselmateriaal en Beheerdernaam kunnen geen kenmerken van een Put zijn, dat zijn kenmerken van het concept Deksel en Beheerder. Die entiteiten kunnen vervolgens een relatie (heeft deel, is invoer) hebben met de put.
4. Voorkom het opnemen van optionele kenmerken bij een supertype (kenmerken die niet voor alle subtypes gelden), definieer de kenmerken dus niet op een te hoog niveau.
5. Gebruik het multi-parent principe. Als alleen kunststof leidingen het gebruikte kenmerk "kleur" hebben, introduceer dan het concept "kunststof leiding" met het kenmerk "kleur". Een individu is dan zowel een "vrijverval rioolleiding" als een "kunststof leiding" en heeft daarmee dat extra kenmerk.

**Geen typelijsten**  
Kenmerken die verwijzen naar een typelijst (bijvoorbeeld het kenmerk Soort Deksel van het concept Deksel) komen niet voor. Een typelijst wordt uitgedrukt in de taxonomie (bijvoorbeeld als subtypes van Deksel).

### Intrinsieke kenmerken

1. Specialiseer waar nodig de kenmerken, zodat restricties op de kenmerk-waarde zo specifiek mogelijk zijn. Bijvoorbeeld:
    * Definieer het kenmerk "materiaal put" als subtype van "materiaal" met bijbehorende - beperkte - domeinwaarden
    * Definieer het kenmerk "diameter leiding" als subtype van "diameter" met specifieke restricties (min/max) op de afmetingen.
2. Intrinsieke kenmerken zijn niet altijd noodzakelijk maar de combinatie met restricties (bijvoorbeeld minimum/maximum waarde) maakt ze waardevol en daarnaast wordt het datamodel robuuster: als een individu het kenmerk heeft, dan hoort het van een bepaald type te zijn.
3. Intrinsieke kenmerken zijn waardevol/noodzakelijk als ze een toegevoegde definitie hebben. Bijvoorbeeld de beschrijving of de "diameter leiding" de inwendige of uitwendige maat is. 

### Kwaliteitseisen

Beschrijf in het datamodel de eisen voor de gegevenskwaliteit, met name die voor nauwkeurigheid via restricties aan waardetype en waardebereik.

1. Specificeer altijd de waardetypes bij de aspectwaarden
2. Specificeer waar nodig ook het waardebereik (in combinatie met het waardetype)
3. Start de URI van een gemodelleerd datatype altijd met "Dt_"
4. Modelleer waar nodig het metagegeven <span class="blue">heeft inwinning</span> voor beschrijving van de actualiteit en betrouwbaarheid.

## Relaties - Samenstelling en proces

<br/><img src="media/meronomie.png" style="width:40%;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="media/proces.png" style="width:35%;" />

Definieer de samenstelling, de topologie en het proces op basis van de relaties bij een concept, zie hst [Details relaties](#details-relaties)

1. Beschrijf met CE's de kardinaliteit van de relaties bij concepten, ook als ze niet definiërend zijn. Hanteer de kardinaliteit "minimum=0" en "maximum=1" voor globale uitdrukkingen.
    * Met de kardinaliteit beschrijven we ook dat een fysiek object bijvoorbeeld per definitie andere fysieke objecten als onderdeel heeft.
2. Beschrijf op dezelfde wijze ook altijd de inverse relatie. Voor de dataverificatie is die inverse vaak waardevol. Een constructie kan bijvoorbeeld meerdere delen bevatten (<span class="blue">heeft als deel</span>) maar het deel hoort bij één constructie (<span class="blue">is deel van</span>).

<div class="box">
De meronomie speelt in IMBOR geen grote rol maar voor het GWSW is die heel belangrijk voor het structureren van datasets en data-afleiding.
</div>

### Erven van samenstellingen

1. Voorkom redundantie van deel-geheel relaties, die relatie mag niet dubbel voorkomen voor een subtype en het bijbehorende supertype.
2. Definieer de samenstelling - hoewel verleidelijk - dus niet op een te hoog niveau

## Deelmodellen

Zie hst [Details deelmodellen](#details-deelmodellen).

Vanaf GWSW versie 1.5.2 (na afscheid van het Gellish bronmodel) is de **Collection of Facts** (CoF) op conceptniveau in de RDF-bron opgenomen. De CoF speelt nog steeds een belangrijke rol in de RDF-versie van het GWSW. Het wordt beschreven met het annotatie-attribuut <span class="blue">skos:scopeNote</span>, de annotatie-waarde (de URI van een CollectionOfFacts-subtype) verwijst naar een deelmodel (GWSW-Basis, GWSW-Kengetallen, enz.) horen.

Op basis van de CoF worden dus de GWSW deelmodellen samengesteld. Zo'n deelmodel is een filter op het datamodel waarbij de klassen, de CE's en de individuen worden geselecteerd op de gekoppelde CoF. De deelmodellen hebben meerdere functies:

* het overzichtelijk presenteren van specifieke GWSW onderdelen
* het overzichtelijk onderhouden van het datamodel. Veel deelmodellen hebben een heel specifieke functie, anderen worden met een lage frequentie onderhouden. Denk bijvoorbeeld aan uitwisselformaten.
* het samenstellen van conformiteitsklassen, data-verificatie voor bepaalde processen
* het koppelen van alleen de relevante modelonderdelen aan datasets, afgestemd op de praktijk van uitwisselen

Hou rekening met de onderverdeling van de context-specifieke deelmodellen. Combineren van deelmodellen met behoud van overzicht is in RDF-editors mogelijk. Handhaaf een logisch onderverdeling door modelaanpassingen in het juiste bronbestand (geïmporteerde turtle-bestand) te doen en consequent de annotatie skos:scopeNote te vullen.

# Modelleerprincipes - Specifiek GWSW 2.0

* Kwalitatieve attributen hebben altijd exact 1 range van een specialisatie van <span class="blue">nen2660:QualityValue</span>
* Kwantitatieve attributen hebben altijd exact 1 range van een specialisatie van <span class="blue">nen:2660:QuantityValue</span>
* Kenmerk-relaties hebben altijd exact 1 range van een specialisatie van<span class="blue"> nen2660:RelationReference</span>
* Kwalitatieve attributen, kwantitatieve attributen of kenmerk-relaties hebben altijd de naam van de range-class met het eerste karakter in lowercase
* Definieer abstracte klassen expliciet als subtype van <span class="blue">nen2660:AbstractConcept</span>

# Relatie met andere (meta)modellen

## IMBOR

De GWSW Ontologie wordt met de introductie van versie 2.0 onderdeel van IMBOR.

Door CROW is het - oorspronkelijk in MS Access uitgewerkte - IMBOR datamodel omgezet naar een linked-data vorm, gebaseerd op de NEN 2660-2. Dat was een belangrijke aanleiding om het GWSW 2.0 te ontwikkelen.

Relevante links naar CROW publicaties over het IMBOR (versie 2022):
* De huidige linked-data-versie IMBOR2022, https://begrippen.crow.nl/imbor/nl
* Het delen van IMBOR gegevens middels RDF, https://docs.crow.nl/imbor/uitwisseling_rdf 
* Ontologie-alignment: https://docs.crow.nl/ontology-alignment/whitepaper/

In de roadmap van het IMBOR Kernteam is opgenomen dat in 2022/2023 het meta-model voor de mapping van ontologiën wordt ontwikkeld. 

De bedoeling is dat de GWSW Ontologie op zichzelf blijft bestaan en dat het IMBOR voor de discipline Stedelijk Water koppelt aan het GWSW. Het datamodel GWSW wordt volledig geïntegreerd en de module IMBOR Riolering komt te vervallen. Het GWSW wordt dus niet omgezet conform IMBOR-LD principes maar moet natuurlijk wel voldoende te koppelen zijn, daarvoor worden de datamodellen in lijn gebracht ("alignment").

Schematisch overzicht IMBOR basisstructuur/architectuur

<img src="media/IMBOR LD.png" style="width:80%; height:85%" />

<span class="mark">NOG TOEVOEGEN: ALIGNMENT PRINCIPES</span>

Tussen het basismodel IMBOR en deelmodellen zoals GWSW 2.0 kunnen en mogen natuurlijk verschillen bestaan vanwege disciplinecontext en data-toepassingen. Hierna volgt een overzicht van de belangrijkste principiële verschillen tussen IMBOR en GWSW.

### RDF-schema en SHACL

**IMBOR**: RDFS/SHACL-gebaseerd (rdfs:Class)
* Gebruikt SKOS voor de vocabulaire, RDFS voor de klasse-definitie en SHACL voor (shapes met) verificatie-regels (CWA)
*	SHACL-expressies maken deel uit van het datamodel, toegepast voor globale verificaties

**GWSW**: RDFS/OWL-gebaseerd (owl:Class)
* Gebruikt RDFS en SKOS voor de vocabulaire, RDFS en OWL voor de klasse-definitie en SHACL voor (shapes met) verificatie-regels (CWA)
*	Bevat OWL-gebaseerde expressies en restricties (OWA), toegepast voor data-afleiding en data-integriteit
* SHACL-expressies staan naast het datamodel (worden ervan afgeleid) en worden gebruikt voor CWA verificaties (algemeen en toepassingsgericht via CFK’en)

<div class="box">
Het GWSW bevat per concept en daaraan toegevoegde OWL-restricties het annotatie-predicate <span class="blue">gwsw:hasValidity</span>. Die annotatie bevat coderingen waarmee automatisch SHACL-expressies per CFK worden afgeleid.

SHACL kan voor het GWSW nog meer strikt worden toegepast door het ook voor het basis datamodel te introduceren (en niet alleen voor de CFK'en). In het datamodel is bijvoorbeeld met een OWL-restrictie beschreven dat een <span class="blue">gwsw:Overstortput</span> als deel een <span class="blue">gwsw:Overstortdrempel</span> moet hebben. Dat is een definiërende voorwaarde, maar in een CFK hoeft die OWL-restrictie niet persé te gelden (kan uitgeschakeld zijn via <span class="blue">gwsw:hasValidity</span>).
</div>

### URI concepten

**IMBOR**: URI van concepten is taalonafhankelijk (UUID)
<div class="example"><div class="example-title marker">Datamodel:</div><pre>
imbor:f8c9faf7-ba95-4d70-a1b9-9586ca55d0f1
        skos:definition  "Een rioolput met een inrichting bestemd voor het verpompen van afvalwater."@nl ;
        skos:prefLabel   "Pompput"@nl .
</div>

*	Voordeel: Semantiekloos, daardoor bijvoorbeeld geen verwarring met homoniemen (IMBOR beschrijft veel klassen uit verschillende disciplines)
* Voordeel: Flexibeler als er veel mutaties in klasse-namen voorkomen
*	Nadeel: Alleen goed leesbaar (in bijvoorbeeld turtle-files) met specifieke tooling (label-georiënteerd)
* Nadeel: Query-ontwerp lastiger (de waarde van skos:prefLabel is mutatie-gevoelig en garandeert geen unieke identificatie, het kan/mag meervoudig voorkomen bij verschillende concepten)

**GWSW**: URI van concepten is human-readable (taalafhankelijk)
<div class="example"><div class="example-title marker">Datamodel:</div><pre>
gwsw:Pompput 
        skos:definition  "Een rioolput met een inrichting bestemd voor het verpompen van afvalwater."@nl ;
        skos:prefLabel   "Pompput"@nl .
</div>

*	Voordeel: Leesbaarheid van datamodel, datasets en queries. Ook met eenvoudige tools
*	Nadeel: Minder eenvoudig aan te maken en te onderhouden (de URI is een camelcase-notatie van het concept-label en kan daarmee uit de pas gaan lopen)

Bij het ontwerp van SPARQ-queries zal om praktische redenen het IMBOR datamodel vaak worden bevraagd met het leesbare <span class="blue">skos:prefLabel</span> voor de selectie op klasse. Dat label is echter geen unieke identificatie, dat vraagt extra aandacht bij het modelleren. In queries op het GWSW datamodel kan voor de selectie op klasse eenvoudig de human-readable URI gebruikt.
Dit verschil in aanpak kan naast elkaar bestaan, het is technisch geen punt maar moet wel goed gedocumenteerd worden.

### Reikwijdte datamodel

Exclusief **GWSW**:
* Hanteert onderscheidende kenmerken (Uitvoering, Functie) voor expliciete definities
*	Gebruikt deel/geheel-relaties (restricties op <span class="blue">nen2660:hasPart</span>)
*	Gebruikt proces-relaties (<span class="blue">gwsw:hasInput</span>, <span class="blue">gwsw:hasOutput</span>)
* Bevat drie "lagen": fysiek, topologie, geometrie (netwerk via <span class="blue">gwsw:hasConnecion</span>)

### Datamodel inrichting

Exclusief **IMBOR**:
* Enumeratiewaarden staan in een apart datamodel
* Specificatie eenheden (nen2660:unit) op dataset-niveau
* Geen complexe kenmerken, kenmerken zijn datatype-properties, geen gebruik van waarde-objecten

Exclusief **GWSW**:
* Specificatie eenheden (nen2660:unit) op datamodel-niveau
* Hanteert consequent complexe kenmerken, kenmerken zijn object-properties die verwijzen naar waarde-objecten 

## Relatiemodel Harmonisator

De Harmonisator vergelijkt (meta)datamodellen die binnen gemeentelijke organisaties in gebruik zijn.
Voor die analyse hanteert de Harmonisator onder andere het Relatiemodel Harmonisator (R-model). 
Met dat model worden de mogelijke concept-relaties in datamodellen gerubriceerd en vergelijkbaar gemaakt.

<img src="media/Harmonisator.png" style="width:100%; height:85%" />

De indeling van de relaties in het R-model komt voor een groot deel overeen met de gebruikte GWSW-relaties.
In de volgende tabel staat de vergelijking.

R-model en GWSW 2.0

| R-model                 | GWSW                                        | Opmerking                            |
|-------------------------|---------------------------------------------|--------------------------------------|
| R0 - is van type        | rdf:type                                    |                                      |
| R1 - verwant            |                                             |                                      |
| R2 - kenmerk            | nen2660:QualityValue, nen2660:QuantityValue |                                      |
| R2U - kenmerkcluster    | kenmerk/kenmerk                             | kenmerk van kenmerk                  |
| R3 - relatie            | nen2660:isConnectedTo                       | was gwsw:hasConnection               |
| R4 - samenstelling      | nen2660:hasPart                             | cardinaliteit n,n                    |
| R4C - compositie        | nen2660:hasPart                             | cardinaliteit 0,n                    |
| R4G - groep             | rdfs:Container                              | niet in gebruik                      |
| R5 - overerving         | rdfs:subClassOf                             |                                      |
| R6 - regelset           |                                             |                                      |
| R7 - functie/activiteit | gwsw:hasInput, gwsw:hasOutput               |                                      |
| R8 - collectie          | owl:oneOf                                   |                                      |
| R9 - waarde             | rdf:value                                   | was gwsw:hasValue, gwsw:hasReference |

## MOF en MIM

DIT HOOFDSTUK WORDT NOG VERDER UITGEWERKT
MIM PRINCIPES KUNNEN GEDEELTELIJK WORDEN TOEGEPAST OP DE GWSW-MODELLEERPRINCIPES
DEFINIEER DAAR OOK HET BESCHOUWDE DOMEIN (UNIVERSE OF DISCOURSE)

**MOF - Meta Object Facility**

| Niveau | Omschrijving                                       | Toelichting            |
|--------|----------------------------------------------------|------------------------|
| M3     | Defines a language for specifying a metamodel      | Bijvoorbeeld MOF       |
| M2     | Defines a language for specifying models           | Bijvoorbeeld UML       |
| M1     | Defines a language that describes semantic domains | User models            |
| M0     | Instance Models                                    | Individuen op basis M1 |

RDF is een taal op M3, M2 - niveau.

**MIM - Metamodel Informatie Modellering**

Het MIM-document (17 feb 2022):  https://docs.geostandaarden.nl/mim/mim/ 

RDFS/OWL/SKOS en de NEN2660 zijn, net als het MIM, informatiemodellen op M1-niveau (een taal voor semantische domein modellen).

| Niveau | Omschrijving                              | Toelichting                                                                          |
|--------|-------------------------------------------|--------------------------------------------------------------------------------------|
| MIM-1  | Het begrippen model                       | Beschrijft begrippen en hun relaties binnen het beschouwde domein                    |
| MIM-2  | Het conceptuele informatie model          | Beschrijft de modellering van de relevante informatie                                |
| MIM-3  | Logisch informatie- of gegevensmodel      | Beschrijft de toepassing van concepten bij interacties tussen systemen en gebruikers |
| MIM-4  | Fysiek of techisch gegevens- of datamodel | Beschrijft de technologie voor informatie-vastlegging en -uitwisseling               |

<span class="mark">Het onderscheid in datamodellen tussen MIM-2, MIM-3 en MIM-4 vervaagt in RDF-gebaseerde ontologiën ??</span>

Als semantische modellen beschreven in RDF/RDFS/OWL zijn uitgebreid met SKOS en de NEN2660 voegt MIM-2 nauwelijks inhoudelijke waarde toe. 

Een beperkte vergelijking tussen GWSW en MIM:

| GWSW  2.0                    | MIM                   | Opmerking          |
|------------------------------|-----------------------|--------------------|
| **Annotatie-atributen**      |                       |                    |
| skos:definition              | mim:definition        |                    |
| skos:prefLabel               | mim:alias             |                    |
| skos:altLabel                | mim:alias             |                    |
| nen2660:unit                 |                       |                    |
| rdfs:seeAlso                 | mim:herkomstDefinitie |                    |
| **Kwalitatieve attributen**  |                       |                    |
|                              | mim:attribuut         | was gwsw:hasAspect |
| **Kwantitatieve attributen** |                       |                    |
|                              | mim:attribuut         | was gwsw:hasAspect |
| **Relaties**                 |                       |                    |
| kenmerk-relatie              | mim:attribuut         | was gwsw:hasAspect |
| nen2660:hasPart              |                       |                    |

## DCMI

DCMI - Dublin Core™ Metadata Initiative

Het DCMI voorziet in 15 metadata-elementen (zie http://purl.org/dc/elements/1.1/, prefix dc:) en een uitbreiding daarop (zie http://purl.org/dc/terms/, prefix dcterms:). De metadata-elementen zijn vooral gericht op interoperabel gebruik van datamodellen (dus ook linked-data oplossingen), zodat bijvoorbeeld eigenaar en geldigheidsdatum van een datamodel herkenbaar zijn.

In IMBOR worden op deelmodel-niveau (vocabulaire-schema) de volgende DCMI elementen gebruikt:
* dc:creator - De verantwoordelijke organisatie <span class="mark">Opnemen in GWSW 2.0</span>
* dc:description - Een beschrijving van de deelmodel-inhoud
* dc:format - Het gebruikte basis RDF-schema
* dc:language - De gebruikte taal <span class="mark">Opnemen in GWSW 2.0</span>

* dcterms:dateAccepted - Datum datamodel-versie <span class="mark">Opnemen in GWSW 2.0 (staat niet in IMBOR)</span>

## Verschil met vorige GWSW versies

Een overzicht van wijzigingen in GWSW 2.0 ten opzichte van eerdere versies (GWSW 1.n):

* Kenmerken uitdrukken als kwalitatieve/kwantitatieve attributen, relatie gwsw:hasAspect vervalt
* De materiaal- en grondsoort-kenmerken worden uitgedrukt met nen2660:consistsOf
* Materiaal en grondsoort worden een IMBOR-type, waren een type van één of meerdere collecties
* Geometrie-waarde uitdrukken als WKT, was GML in vorige versies
* Vocabulaire binnen datamodel onderscheiden en apart publiceren/presenteren
* In owl:versionInfo het versienummer (inclusief patch-nummer) opnemen 

Samenvatting van gewijzigde klassen:

| Naam                      | Oude naam (1.6)         | Toelichting                                                                                    |
|---------------------------|-------------------------|------------------------------------------------------------------------------------------------|
| nen2660:Activity          | gwsw:Activiteit         |                                                                                                |
| nen2660:PhysicalObject    | gwsw:FysiekObject       |                                                                                                |
| nen2660:Matter            | gwsw:Materie            | gwsw:Materiaal en gwsw:Grondsoort is subtype van nen2660:Matter (was subtype van gwsw:Kenmerk) |
| nen2660:QuantityValue     | gwsw:Kenmerk            | De waarde is numeriek                                                                          |
| nen2660:QualityValue      | gwsw:Kenmerk            | De waarde is een string                                                                        |
| nen2660:RelationReference | gwsw:Kenmerk            | De "waarde" is een individu                                                                    |
| nen2660:EnumerationType   | gwsw:VerzamelingSoorten |                                                                                                |
| rdfs:Container            | gwsw:VerzamelingSoorten | Bij informatiedragers (gwsw:hasPart wordt rdfs:member)                                         |

Samenvatting van gewijzigde properties:

| Naam               | Oude naam (1.6)      | Toelichting                                  |
|--------------------|----------------------|----------------------------------------------|
| nen2260:executes   | gwsw:functie         | Onderscheidend kenmerk, optioneel doorvoeren |
| skos:editorialNote | gwsw:hasDateStart    | Annotatie, vermelding auteur en datum        |
|                    | gwsw:hasDateChange   | Opnemen in skos:editorialNote                |
|                    | gwsw:hasAuthorStart  | Opnemen in skos:editorialNote                |
|                    | gwsw:hasAuthorChange | Opnemen in skos:editorialNote                |
| skos:prefLabel     | rdfs:label           | Impliciete voorkeur expliciet maken          |
| gwsw:hasPart       | rdfs:member          | Gaat gelden voor informatiedragers           |

# Details van de GWSW semantiek

## Details soortenboom

### Top-level-klassen

De top-level-klassen in de GWSW ontologie zijn de concepten die boven in de soortenboom staan. Deze concepten zijn geen subtype van andere concepten, ze zijn van het generieke type owl:Class.

Tabel: Top-level-klassen

| Naam                      | Oude naam (1.6)                                       | Toelichting / definitie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| nen2660:Activity          | gwsw:Activiteit                                       | Een entiteit die plaatsvindt of kan plaatsvinden in een concrete ruimte-tijd. Een activiteit transformeert objecten en wordt uitgevoerd door een object.<br/>Informatie objecten kunnen als input resp. sturing dienen voor het uitvoeren van een activiteit.                                                                                                                                                                                                                                                                                                                                                                 |
| nen2660:PhysicalObject    | gwsw:FysiekObject<br/>gwsw:Levensvorm<br/>gwsw:Ruimte | Object dat bestaat of kan bestaan binnen de fysieke 4D ruimte-tijd. Een fysiek object vormt een manifestatie en een afbakening van materie en/of energie, en is (in)direct waarneembaar door de zintuigen.<br/>Een fysiek object voert activiteiten uit, en wordt ook getransformeerd door activiteiten. (…) Ook een (levend) organisme is een FysiekObject, waarmee ook een mens een FysiekObject is maar ook een organisatie van mensen is een FysiekObject.<br/>Ook gwsw:Ruimte is een FysiekObject. nen2660:SpatialRegion is een topologisch / representatie-element en daardoor geen logisch supertype voor gwsw:Ruimte. |
| nen2660:InformationObject | gwsw:Informatiedrager                                 | Een object dat een beschrijving vormt van een ding in de werkelijkheid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| gwsw:TopologischElement   | gwsw:TopologischElement                               | Netwerkbeschrijving van knooppunt (vertex) of verbinding (edge en vertices). <span class="mark">(link met nen2660:SpatialRegion?)</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| nen2660:QuantityValue     | gwsw:Kenmerk                                          | De objectivering van een waarde van een hoeveelheid (typisch met een grootheid en een eenheid) met een complexe waarde zoals een eenvoudige waarde sec gecombineerd met andere metadata of alleen een combinatie van eenvoudige waarden                                                                                                                                                                                                                                                                                                                                                                                       |
| nen2660:QualityValue      | gwsw:Kenmerk                                          | De objectivering van een waarde van een kwaliteit met een complexe waarde zoals een eenvoudige waarde sec gecombineerd met andere metadata of alleen een combinatie van eenvoudige waarden                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nen2660:RelationReference | gwsw:Kenmerk                                          | De objectivering van een referentie voor een relatie met een complexe waarde zoals een simpele referentie sec gecombineerd met andere metadata of alleen een combinatie van simpele referenties (n-ary relaties)                                                                                                                                                                                                                                                                                                                                                                                                              |
| nen2660:EnumerationType   | gwsw:VerzamelingSoorten                               | A meta-concept having concepts as instances having no further attributes or relations (annotations only)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| rdfs:Container            | gwsw:VerzamelingSoorten                               | Collectie, verzameling klassen en/of individuen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Details specialsatie en classificatie

Voor de definitie van de soortenboom gebruiken we basiselementen uit RDF, RDFS en OWL. Ter illustratie de hiërachische indeling van de familie "put":

<div class="example"><div class="example-title marker">Datamodel: de put-familie</div><pre>
  gwsw:Put        rdf:type                   owl:Class ;                   
                  rdfs:subClassOf            nen2660:PhysicalObject ; # het supertype uit NEN2660
                  skos:prefLabel             "Put"@nl .
  gwsw:Rioolput   rdf:type                   owl:Class ;                   
                  rdfs:subClassOf            gwsw:Put ;
                  skos:prefLabel             "Rioolput"@nl .               
  gwsw:Stuwput    rdf:type                   owl:Class ;                   
                  rdfs:subClassOf            gwsw:Rioolput ;               
                  skos:prefLabel             "Stuwput"@nl ,                
                  skos:prefLabel             “Weir”@en .      
  gwsw:BlindePut  rdf:type                   owl:Class ;                   
                  rdfs:subClassOf            gwsw:Rioolput ;               
                  skos:prefLabel             "Blinde put"@nl .
  gwsw:Hulpstuk   rdf:type                   owl:Class ;      
                  rdfs:subClassOf            gwsw:Constructieonderdeel ;
                  rdfs:subClassOf            nen2660:AbstractConcept . # Hulpstuk is een abstracte klasse, kan niet in een dataset voorkomen
       
</pre></div>

In een dataset wordt altijd zoveel mogelijk verwezen naar de [bladerobjecten](#bladerobjecten).

<div class="example-dataset"><div class="example-title marker">Dataset: individuen typeren als GWSW concept</div><pre>
  ex:Put_1        rdf:type      gwsw:Put .          # te generiek voor veel toepassingen
  ex:Put_2        rdf:type      gwsw:Stuwput ,      # specifiek genoeg voor veel toepassingen
                                gwsw:BlindePut .    # tweede typering
</pre></div>

Het individu ex:Put_2 is dus zowel een stuwput (een put met een stuwconstructie) als een blinde put (een put zonder deksel).

Verificatie van het gebruik van abstracte klassen wordt uitgedrukt in SHACL:

<div class="example-shapes"><div class="example-title marker">Shapes: Controleer op abstracte klasse</div><pre>

  De abstracte klasse is focusnode

  cfk:TypeNotAllowed rdf:type       sh:NodeShape ;
                     sh:targetNode  gwsw:Put ; # type is abstract, niet gebruiken in datasets
                     sh:targetNode  gwsw:Hulpstuk ; # enzovoort, voor alle abstracte klassen
                     sh:property
                     [
                       sh:path [ sh:inversePath rdf:type ] ; # de focusnode is de abstracte klasse
                       sh:maxCount 0 ;
                     ] .

  Een alternatieve manier, met de individual als focusnode (NIET IN GEBRUIK, levert meer en overbodige rapportage op)
  
  cfk:TypeNotAllowed rdf:type            sh:NodeShape ;
                     sh:targetSubjectsOf rdf:type;
                     sh:property
                     [ 
                       sh:path rdf:type;
                       sh:not [ sh:or ([ sh:hasValue gwsw:Put ] [ sh:hasValue gwsw:Hulpstuk ]) ] ; # enzovoort, voor alle abstracte klassen
                     ] .
</pre></div>


### Details onderscheidende kenmerken

**Expliciete definitie: basis voor determinatie**  

Voor de hiërachische indeling van soorten, de bepaling van de taxonomie, wordt de onderscheidende definitie zo expliciet mogelijk beschreven. Determinerend kan daarmee (de naam van) een soort (klasse) worden bepaald. Verschillende elementen in de ontologie spelen hierbij een rol, die zijn beschreven in de volgende paragrafen.

De onderscheidende kenmerken definiëren dus de klassen, de GWSW ontologie hanteert de volgende:
* Doel (waarvoor)
* Toepassing (waarin)
* Functie (wat doet het)
* Uitvoering (hoe)
* Structuur (waaruit)

Meer specifiek voor activiteiten:
* Technologie (werkwijze, eisen)
* Mechanisme (waarmee)
* Resultaat (wat doet het)

Vooral Functie en Uitvoering worden veel gebruikt om het onderscheid te maken.

<div class="box"><strong>nen2660:executes</strong>
In IMBOR wordt nen2660:executes gebruikt, dat is een alternatief voor gwsw:functie.
</div>

Daarnaast kunnen ook relaties tussen GWSW concepten definiërend voor de classificering zijn. Een gwsw:Inspectieput moet bijvoorbeeld een gwsw:Deksel hebben. De compositie (de deel-geheel relatie) is dan bepalend, er geldt een beperking voor de property <span class="blue">nen2660:hasPart</span> .

De onderscheidende kenmerken worden beschreven door een relatie met als range een individu van het type onderscheidend kenmerk (simpel modelleerpatroon voor kenmerken volgens NEN2660).

Met een CE wordt een restrictie op de properties <span class="blue">doel</span>, <span class="blue">toepassing</span>, <span class="blue">functie</span>, <span class="blue">uitvoering</span>, <span class="blue">structuur</span>, <span class="blue">technologie</span>, <span class="blue">resultaat</span>, <span class="blue">mechanisme</span> gecombineerd met een restrictie op <span class="blue">de waarde</span>.

Een onderscheidend kenmerk wordt gemodelleerd met restricties binnen een CE. Bij benoeming van de CE als equivalentClass vragen deze restricties veel rekenkracht, daarom is hier ook voor een éénzijdige subtypering (rdfs:subClassOf ipv owl:equivalentClass) gekozen. Daarmee leveren we wel semantiek in (“sufficient”, niet “necessary”). Een onderscheidend kenmerk wordt gemodelleerd als enumeratiewaarde van het type onderscheidend kenmerk.

<div class="example"><div class="example-title marker">Datamodel: Definieer de onderscheidende kenmerken</div><pre>
  gwsw:onderscheidendKenmerk  rdf:type                owl:ObjectProperty .
</pre></div>

<div class="example"><div class="example-title marker">Datamodel: Definieer type uitvoering "Klein" als onderscheidend Kenmerk</div><pre>
  gwsw:uitvoering             rdf:type                owl:ObjectProperty ;
                              rdfs:subPropertyOf      gwsw:onderscheidendKenmerk ;  
                              skos:prefLabel          "heeft uitvoering"@nl ; 
                              rdfs:range              gwsw:Uitvoering .   
  gwsw:Uitvoering             rdf:type                owl:Class ;         
                              rdf:type                nen2660:EnumerationType . # punning: is klasse en wordt hier ook individu
  gwsw:Klein                  rdf:type                gwsw:Uitvoering ;   
                              skos:definition         “echt klein" .    
</pre></div>
<div class="example"><div class="example-title marker">Datamodel: Combineer het kenmerk en de waarde ervan in een CE</div><pre>
  gwsw:Putje                  rdfs:subClassOf         nen2660:PhysicalObject ; 
                              rdfs:subClassOf                                
                              [        
                                rdf:type              owl:Restriction ;   
                                owl:onProperty        gwsw:uitvoering ;   
                                owl:hasValue          gwsw:Klein ;      # individu                  
                              ] .      
</pre></div>

Afgeleid wordt dat ex:Put_1 (ook) van het type gwsw:Putje is

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Put_1                    gwsw:uitvoering          gwsw:Klein .        
</pre></div>

## Overzicht properties

### Properties in het datamodel

De toegepaste **attributen** (annotatie, kwaliteit en kwantiteit) in een diagram: WORDT NOG UITGEWERKT

<!--img src="media/image2.png" style="width:100%; height:85%" /-->

De toegepaste **relaties** in een diagram: WORDT NOG UITGEWERKT

<!--img src="media/image3.png" style="width:100%;height:50%" /-->

De toepassing van properties is in de GWSW-Ontologie vaak aan regels gebonden door middel van een Class Expression (CE). In de volgende tabel is dat aangegeven met **CE**.

 | Predicate                                        | Oude naam (1.6)                                                                           | Omschrijving                                                                                                                                                                                                                                                                                                                                                                                                                            |
 |--------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | **Annotatie-attributen**                         |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | owl:versionInfo                                  | owl:versionInfo                                                                           | *Subject (ontologie)* <span class="blue">heeft versieomschrijving</span> *Literal*                                                                                                                                                                                                                                                                                                                                                      |
 | skos:prefLabel                                   | rdfs:label                                                                                | *Subject* <span class="blue">heeft als voorkeursnaam</span> *Literal* (één per concept)                                                                                                                                                                                                                                                                                                                                                 |
 | skos:altLabel                                    | skos:altLabel                                                                             | *Subject* <span class="blue">heeft als synoniem</span> *Literal*                                                                                                                                                                                                                                                                                                                                                                        |
 | skos:notation                                    | skos:notation                                                                             | *Subject* <span class="blue">heeft als code</span> *Literal*                                                                                                                                                                                                                                                                                                                                                                            |
 | skos:definition                                  | skos:definition                                                                           | *Subject* <span class="blue">heeft als definitie</span> *Literal* (komt enkelvoudig per taal voor, interne definitie *zonder* bron-referentie)                                                                                                                                                                                                                                                                                          |
 | rdfs:isDefinedBy                                 | rdfs:isDefinedBy                                                                          | *Subject* <span class="blue">is gedefinieerd door</span> *Literal* (kan meevoudig voorkomen, definitie *met* bron-referentie)                                                                                                                                                                                                                                                                                                           |
 | rdfs:seeAlso                                     | rdfs:seeAlso                                                                              | *Subject* <span class="blue">heeft aanvullende infomatie op</span> *Literal* (URL)                                                                                                                                                                                                                                                                                                                                                      |
 | rdfs:comment                                     | rdfs:comment<br/>skos:hiddenLabel                                                         | *Subject* <span class="blue">heeft als commentaar</span> *Literal*                                                                                                                                                                                                                                                                                                                                                                      |
 | skos:editorialNote                               | gwsw:hasDateStart<br/>gwsw:hasAuthorStart<br/>gwsw:hasDateChange<br/>gwsw:hasAuthorChange | *Subject* <span class="blue">heeft als opmerking door de auteur</span> *Literal* (kan meervoudig voorkomen: bevat bij voorkeur *datum*, *auteur* en *soort wijziging*)                                                                                                                                                                                                                                                                  |
 |                                                  | gwsw:hasDateChange                                                                        | *Subject* <span class="blue">heeft als wijzigingsdatum</span> *Literal* (kan meervoudig voorkomen)                                                                                                                                                                                                                                                                                                                                      |
 |                                                  | gwsw:hasAuthorStart                                                                       | *Subject* <span class="blue">heeft als auteur aanmaak</span> *Literal* (naam modelleur die het concept - op de startdatum - heeft aangemaakt)                                                                                                                                                                                                                                                                                           |
 |                                                  | gwsw:hasAuthorChange                                                                      | *Subject* <span class="blue">heeft als auteur wijziging</span> *Literal* (naam modelleur die het concept - op de wijzigingsdatum - heeft gewijzigd)                                                                                                                                                                                                                                                                                     |
 | gwsw:hasFactColl                                 | gwsw:hasFactColl                                                                          | *Subject* <span class="blue">heeft als feitencollectie</span> *Literal* (string met codes van één of meer graphs) (feiten-collectie in Gellish-taal)                                                                                                                                                                                                                                                                                    |
 | gwsw:hasValidity                                 | gwsw:hasValitity                                                                          | *Subject* <span class="blue">heeft als validatie-code</span> *Literal* (code voor dataverificate, gebruikt voor SHACL-definities en conformiteitsklassen)                                                                                                                                                                                                                                                                               |
 | **Kwantitatief attibuut**                        |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | gwsw:"kwantiteit"                                | gwsw:hasAspect<br/>(gwsw:isAspectOf)                                                      | *Subject* <span class="blue">heeft als "kwantiteit"</span> *Waarde*. Het object is een kenmerk, een subtype van nen2660:QuantityValue met een numerieke waarde                                                                                                                                                                                                                                                                          |
 | **Kwalitatief attribuut**                        |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | gwsw:"kwaliteit"                                 | gwsw:hasAspect<br/>(gwsw:isAspectOf)                                                      | *Subject* <span class="blue">heeft als "kwaliteit"</span> *Waarde*. Het object is een kenmerk, een subtype van nen2660:QualityValue met een tekenreeks-waarde                                                                                                                                                                                                                                                                           |
 | **Classificatie**                                |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | rdf:type                                         | rdf:type                                                                                  | *Subject* <span class="blue">is van het type</span> *Object*                                                                                                                                                                                                                                                                                                                                                                            |
 | owl:inverseOf                                    | owl:inverseOf                                                                             | *Subject-property* <span class="blue">is de inverse van</span> *Object-property*                                                                                                                                                                                                                                                                                                                                                        |
 | **Specialisatie**                                |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | rdfs:subClassOf                                  | rdfs:subClassOf                                                                           | *Subject* <span class="blue">is van het subtype</span> *Object*                                                                                                                                                                                                                                                                                                                                                                         |
 | **Compositie**                                   |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | nen2660:hasPart<br/>(gwsw:isPartOf)              | gwsw:hasPart<br/>(gwsw:isPartOf)                                                          | <span class="blue">CE</span> beschrijft restrictie op kardinaliteit: Bij subject mag property hasPart 0-n maal of min 0-n en max 1-n maal voorkomen. De NEN2660 heeft niet de inverse property<br/>Opmerking: de NEN2660 hanteert nen2660:hasPart alleen voor relaties tussen FysiekObject, InformatieObject of Activiteit onderling. Ruimte is ook een FysiekObject, daarmee blijft nen2660:hasPart voor het GWSW algemeen toepasbaar. |
 | **Associatie**                                   |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | gwsw:hasInput<br/>(gwsw:isInputOf)               | gwsw:hasInput<br/>(gwsw:isInputOf)                                                        | <span class="blue">CE</span> beschrijft restrictie op kardinaliteit: Bij subject mag property hasInput 0-n maal of min 0-n en max 1-n maal voorkomen                                                                                                                                                                                                                                                                                    |
 | gwsw:hasOutput (gwsw:isOutputOf)                 | gwsw:hasOutput (gwsw:isOutputOf)                                                          | <span class="blue">CE</span> beschrijft restrictie op kardinaliteit: Bij subject mag property hasOutput 0-n maal of min 0-n en max 1-n maal voorkomen                                                                                                                                                                                                                                                                                   |
 | nen2660:isConnectedTo                            | gwsw:hasConnection                                                                        | <span class="blue">CE</span> beschrijft restrictie op kardinaliteit: Bij subject mag property hasConnection 0-n maal of min 0-n en max 1-n maal voorkomen                                                                                                                                                                                                                                                                               |
 | gwsw:hasRepresentation (gwsw:isRepresentationOf) | gwsw:hasRepresentation (gwsw:isRepresentationOf)                                          | Verwijst naar (range is) InformationObject                                                                                                                                                                                                                                                                                                                                                                                              |
 | **Referentie**                                   |                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | rdfs:member | | *Subject* <span class="blue">heeft lid in verzameling</span> *Referentie* Het object is een klasse of individu
 | nen2660:hasQuantityKind                     |                                             | *Subject* <span class="blue">heeft als grootheid</span> *qudt:Quantitykind*. Het object is een grootheid-individu                                                                                                                                                                                                                                                                                                                       |
 | nen2660:unit                                | gwsw:hasUnit                                | *Subject* <span class="blue">heeft als eenheid</span> *qudt:Unit*. Het object is een eenheid-individu                                                                                                                                                                                                                                                                                                                                   |
 | gwsw:"referentie"                           | gwsw:hasAspect<br/>(gwsw:isAspectOf)             | *Subject* <span class="blue">heeft als "referentie"</span> *Referentie*. Het object is een kenmerk-individu van het (super)type nen2660:RelationReference                                                                                                                                                                                                        |
 | gwsw:doel                                   |                                             | *Subject* <span class="blue">heeft als doel</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu("waarvoor")                                                                                                                                                                                                                                                                                                  |
 | gwsw:toepassing                             |                                             | *Subject* <span class="blue">heeft als toepassing</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu ("waarin")                                                                                                                                                                                                                                                                                             |
 | gwsw:functie                                |                                             | *Subject* <span class="blue">heeft als functie</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu ("wat doet het")                                                                                                                                                                                                                                                                                          |
 | gwsw:uitvoering                             |                                             | *Subject* <span class="blue">heeft als uitvoering</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu ("hoe")                                                                                                                                                                                                                                                                                                |
 | gwsw:structuur                              |                                             | *Subject* <span class="blue">heeft als structuur</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu ("waaruit")                                                                                                                                                                                                                                                                                             |
 | gwsw:technologie                            |                                             | *Subject* <span class="blue">heeft als technologie</span> *Referentie*. Het object is een onderscheidend-kenmerk-individu ("werkwijze")                                                                                                                                                                                                                                                                                         |
 | gwsw:mechanisme                             |                                             | *Subject* <span class="blue">heeft als mechanisme</span> Referentie*. Het object is een onderscheidend-kenmerk-individu ("waarmee")                                                                                                                                                                                                                                                                                            |
 

Inverse properties zijn voor data-afleiding nodig om verschillen in kardinaliteit bij omgekeerde relaties te kunnen definiëren. Ze worden gebruikt bij object-properties waarvan het type niet-symmetrisch (niet van type <span class="blue">nen2660:isConnectedTo</span>) of functioneel is.

Voor het uitdrukken van CE/OPE voorziet OWL in een groot aantal (restrictie) properties. Daarmee kunnen we klassen expliciet onderscheiden, de GWSW Ontologie bevat de volgende:

 | Predicate                   | Wijze van toepassing in GWSW                                      |
 |-----------------------------|-------------------------------------------------------------------|
 | owl:onClass                 | Uitdrukken van kardinaliteit en onderscheidende kenmerken         |
 | owl:onProperty              | Uitdrukken van kardinaliteit en onderscheidende kenmerken         |
 | owl:hasValue                | Uitdrukken van onderscheidende kenmerken                          |
 | owl:allValuesFrom           | Uitdrukken van range bij waarden                                  |
 | owl:qualifiedCardinality    | Uitdrukken van verplichte properties met een specifieke range     |
 | owl:maxQualifiedCardinality | Uitdrukken van maximum aantal properties met een specifieke range |
 | owl:minQualifiedCardinality | Uitdrukken van minimum aantal properties met een specifieke range |

### Properties in de dataset

In datasets conform het GWSW komen de volgende properties voor:

| Property          | Oude naam (1.6)   | Toelichting                                                                                  |
|-------------------|-------------------|----------------------------------------------------------------------------------------------|
| **Attributen**    |                   |                                                                                              |
| skos:prefLabel    | rdfs:label        | *Subject* heeft als naam *Literal*                                                           |
| gwsw:"kwantiteit" | gwsw:hasAspect    | *Subject* heeft als "kwantiteit" *Waarde* Het object is een kenmerk-waarde, numerieke waarde |
| gwsw:"kwaliteit"  | gwsw:haAspect     | *Subject* heeft als "kwaliteit" *Waarde* Het object is een kenmerk-waarde, een tekenreeks    |
| **Relaties**      |                   |                                                                                              |
| rdf:type          | rdf:type          | *Subject* is van het type *Object* (klasse-naam)                                             |
| rdf:value         | gwsw:hasValue     | *Subject* heeft als waarde *Literal* (subject is attribuut)                                  |
| gwsw:"referentie" | gwsw:hasReference | *Subject* heeft als "referentie" *Waarde* Het object is een kenmerk-waarde, een individu     |
| gwsw:hasInput     | gwsw:hasInput     | *Subject* heeft als invoer *Object*                                                          |
| gwsw:hasOutput    | gwsw:hasOutput    | *Subject* heeft als uitvoer *Object*                                                         |
| nen2660:hasPart   | nen2660:hasPart   | *Subject* heeft als deel *Object*                                                            |
| gwsw:isPartOf     | gwsw:isPartOf     | *Subject* is deel van *Object*                                                               |

## Details annotatie-attributen

Zie voor het overzicht en een toelichting op de annotatie-attributen hst [Overzicht properties](#overzicht-properties)):
Een voorbeeld van gebruikte annotaties:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Put  rdf:type              owl:Class ;           
            skos:prefLabel        "Put"@nl ;            
            rdfs:subClassOf       nen2660:PhysicalObject ;   
            skos:definition       "Verticale waterdichte ….”@nl ; # interne (eigen) definitie  
            rdfs:seeAlso          "[IMGeo:1.0/2007] Gegraven of … "@nl ,
                                  "https://imgeo.geostandaarden.nl/def/imgeo-object/put" ;
            rdfs:comment          "Toelichting bij modellering put" ;
            gwsw:hasValidity	    "1f 3f 4f " ; # codering voor samenstellen conformiteitsklasse
            skos:scopeNote	      gwsw:_TOP ;
            skos:editorialNote    "Gemaakt dd 23 mei 2006, door Tini Feitsma" ;
            skos:editorialNote    "20220523/evg: Definitie aangepast" .
</pre></div>

<div class="box"><strong>skos:editorialNote</strong>

Vanaf GWSW 2.0 volstaat skos:editorialNote voor vermelding van bijvoorbeeld auteur en wijzingsdatum. In eerdere versies werd de auteur en datum bij aanmaak en wijziging van een klasse of CE in vier annotatie-attributen opgenomen (hasDateStart, hasDateChange, hasAuthorStart, :hasAuthorChange).
Op elementniveau (klassen, CE's) binnen één datamodel/discipline wordt de metadata over historie (tijdstip en wijze van aanmaak) al voldoende in andere bronnen gedocumenteerd.

Metadata op datamodel-niveau met bijvoorbeeld de naam van de eigenaar en de geldigheidsdatum is voor linked-data-toepassingen natuurlijk wel wenselijk. Zie hst [DCMI](#dcmi)
</div>

### Annotaties per klasse

Een GWSW concept van het type owl:Class heeft altijd de volgende annotaties:

* skos:prefLabel
* skos:editorialNote (met bij voorkeur datum, auteur en soort wijziging)
* skos:scopeNote
* skos:definition

Daarnaast zijn de volgende annotaties onder voorwaarden opgenomen:

* skos:editorialNote: indien andere annotaties zoals skos:definition gewijzigd zijn. Als een CE bij de klasse wijzigt wordt de auteurs-notitie alleen bij die CE opgenomen.
* nen2660:unit: indien de klasse een kwantitatief aspect is

### Annotaties per CE

Een GWSW concept van het type owl:Restriction heeft altijd de volgende annotaties:

* skos:editorialNote (met bij voorkeur datum, auteur en soort wijziging)
* skos:scopeNote

Daarnaast wordt elke aanpassing van concepten in een annotatie opgenomen:

* skos:editorialNote (met bij voorkeur datum, auteur en soort wijziging)

### Identificatie van concepten

#### URI-strategie

<span style="font-size: 1.5em">De URI-strategie wordt herzien, zie https://geonovum.github.io/uri-bp . De inhoud van dit hoofdstuk is daarop nog niet aangepast.</span>

De details van de URI-opbouw zijn beschreven in het document "GWSW URI Strategie". Daarin is op basis van de richtlijnen van het Platform Linked Data Nederland (PLDN) voor het GWSW-datamodel de URI-opbouw beschreven.

**<span class="smallcaps">Identificatie van concepten</span>**

Om te verwijzen naar documentlocaties van GWSW-concepten gebruiken we:

<pre class="simp">https://{domain}/{type}/{version}/{filter}/{reference}</pre>

**{domain}** is het web-domein: voor de GWSW-Ontologie is {locatie}.gwsw.nl. Het subdomein {locatie} voor de ontologie is <span class="blue">data</span>.

**{type}** is het soort resource: voor concepten / definities van een term is dat type <span class="blue">def</span>. In de URI hoeft het type niet te worden opgenomen, het default-type (bij ontbreken) is <span class="blue">def</span>.

**{version}** is de versie: voor deze GWSW ontologie is dat <span class="blue">2.0</span>.

**{filter}** is het geldende filter ("view") op de GWSW ontologie: om alle concepten op te kunnen vragen geldt filter <span class="blue">Totaal</span>.

**{reference}** is de verwijzing naar het specifieke concept, de conceptnaam.

#### Conceptnaam, synoniem, vertaling

Het hanteren van begrijpbare namen voor concepten is een gangbare RDF praktijk en ook voor het GWSW heel bruikbaar. We gaan uit van camelCase en CamelCase notatie van de namen voor respectievelijk de properties (starten met lowercase) en de klassen (starten met uppercase).

Een <span class="blue">externe overstortput</span> is een GWSW concept (klasse) en heeft in GWSW versie 2.0 de URI 
<pre class="simp">https://data.gwsw.nl/2.0/Totaal/ExterneOverstortput</pre>

De <span class="blue">breedte</span> van een <span class="blue">put</span> is een attribuut en heeft de URI 
<pre class="simp">https://data.gwsw.nl/2.0/Totaal/breedtePut></pre>

Een URI van een GWSW-klasse bestaat dus uit een ontologie-locatie (de namespace), aangevuld met de conceptnaam (in CamelCase). In de voorbeelden wordt de ontologie-locatie aangeduid met de prefix gwsw: .

We volgen de NEN2660, de voorkeursterm van een GWSW concept wordt aangeduid met de property skos:prefLabel, maximaal één per taal. Voor synoniemen van de voorkeursterm gebruiken we de property skos:altLabel.

<div class="example"><div class="example-title marker">Datamodel: Voorbeeld URI en namen</div><pre>
    @prefix gwsw:                         &lt;https://data.gwsw.nl/2.0/totaal/&gt; . 
    gwsw:ExterneOverstortput              skos:prefLabel             "Externe overstortput"@nl ; 
                                          skos:prefLabel             "External weir"@en ; 
                                          skos:altLabel              "Externe overstort"@nl . 
    gwsw:breedtePut                       skos:prefLabel             "Breedte put"@nl . 
</pre></div>

### Identificatie individuen

Het verwijzen naar individuen met URI’s is essentieel in het linked-data principe, zeker nu er meer linked-data platforms verschijnen en de GWSW datasets steeds breder worden toegepast.

Een uniforme URI-strategie voor individuen in de "bebouwde omgeving" ontbreekt nog. In zo'n URI kan dan bijvoorbeeld de eigenaar van de gegevens (gemeente, samenwerkingsregio, waterschap, provincie) worden onderscheiden. Op korte termijn zou deze strategie uitgewerkt, vastgesteld en gebruikt moeten worden.

Een voorbeeld van de mogelijkheden met gebruik van de eerder genoemde opbouw:
<pre class="simp">https://{domain}/{type}/{organisatie}#{reference} </pre>

**{domain}**: Identiek aan het GWSW-datamodel

**{type}**: Het betreft nu een individual, dus is het type een identifier <span class="blue">id</span>.

**{organisatie}**: De organisatie/eigenaar/beheerder van het individu. Voor het organisatienummer (het identificeren van een lokaal pad) wordt conform de URI-strategie van het Digitaal Stelsel Omgevingswet de CBS-systematiek gehanteerd. Dit is de code van de overheidslaag (01 rijk, 02 uitvoeringsorgaan, 03 provincie, 04 waterschap, 05 gemeenschappelijke regeling, 06 gemeente) gevolgd door de viercijferige CBS-code van de overheidsinstelling. Voor "Roosendaal" betekent dit de code "0601674".

**{reference}**: Als URL-fragment, de identificatie van het object (bijvoorbeeld een GUID).

De URI naar een specifieke rioolput in gemeente Roosendaal wordt daarmee:
<pre class="simp">https://data.gwsw.nl/id/061674#b2ad189a-8c46-49f2-557ba07c49a2</pre>

Vanwege het ontbreken van een uniforme identificatie gebruiken we in dit document de neutrale aanduiding van individuen.

<div class="example-dataset"><div class="example-title marker">Dataset: Voorbeeld identificatie</div><pre>
    @prefix gwsw: &lt;https://data.gwsw.nl/2.0/totaal/&gt; .
    @prefix ex: &lt;https://w3id.org/def/example#&gt; .
    ex:Put_1    rdf:type gwsw:ExterneOverstortput .
</pre></div>

### Waarden, grootheden en eenheden

Voor de specificatie van waarden bij de kwantitatieve aspecten (in het GWSW alleen rdf:value) hanteert de NEN2660 de QUDT-ontologie versie 2.1 voor de definitie van grootheden en eenheden. QUDT is volledig afgestemd met ISO/IEC 80000 (systematiek, namen, definities, symbolen, enz.).

Grootheden: http://qudt.org/vocab/quantitykind , wordt naar verwezen door de property <span class="blue">nen2660:hasQuantityKind</span>.

Eenheden: http://qudt.org/vocab/unit , wordt naar verwezen door de property <span class="blue">nen2660:unit</span>.

Het GWSW definieert nog weinig grootheden, de eenheden zijn wel volledig gemodelleerd. We hanteren de volgende:

| QUDT Units http://qudt.org/2.1/vocab/unit/                                                                            | Oude versie | Datatype       |
|-----------------------------------------------------------------------------------------------------------------------|-------------|----------------|
| PERCENT                                                                                                               | %           | xsd:integer    |
| PER-HR                                                                                                                | 1/h         | xsd:decimal    |
| PER-MIN                                                                                                               | 1/min       | xsd:decimal    |
| BAR                                                                                                                   | bar         | xsd:decimal    |
| DEG_C                                                                                                                 | degC        | xsd:integer    |
| DeciM3                                                                                                                | dm3         | xsd:decimal    |
| DeciM3-PER-SEC                                                                                                        | dm3/s       | xsd:decimal    |
| HR                                                                                                                    | h           | xsd:integer    |
| M                                                                                                                     | m           | xsd:decimal    |
| <span class="mark">M-PER-HR of gwsw:M-PER-DAY</span><br/>(instantie van qudt:unit, of wel bekend in qudt-versie 2.1?) | m/dag       | xsd:decimal    |
| M2                                                                                                                    | m2          | xsd:decimal    |
| M3-PER-HR                                                                                                             | m3/h        | xsd:decimal    |
| MiLiM                                                                                                                 | mm          | xsd:integer    |
| MiLiM-PER-HR                                                                                                          | mm/h        | xsd:decimal    |
| MiLiM-PER-MIN                                                                                                         | mm/min      | xsd:decimal    |
| Geen eenheid: string "yyyy-mm-dd"                                                                                     | yyyymmdd    | xsd:date       |
| YR                                                                                                                    | yyyy        | xsd:gYear      |
| NUM                                                                                                                   | pcs         | xsd:integer    |
| PPM                                                                                                                   | ppm         | xsd:integer    |
| Geen eenheid: string "hh:mm:ss"                                                                                       | hhmmss      | xsd:time       |
| <span class="mark">mg/L (nog niet in gebruik, mogelijk straks bij concepten BZV, CZV)</span><br/>                     | -           | xsd:integer    |
| Geen eenheid: string "wkt..."  (was gmlLiteral in GWSW 1.n)<br/><span class="mark">Datatype "gml" wordt "wkt"</span>  | gml         | geo:wktLiteral |
| Geen eenheid: getal                                                                                                   | - (factor)  | xsd:decimal    |

Uit praktische overwegingen worden de eenheden op datamodel-niveau gedefinieerd. In de datasets is de eenheid niet variabel, het datamodel schrijft voor. Dat houdt de toepassing van GWSW-datasets efficiënt.

### Contextgevoelige coderingen

Coderingen komen veel voor in het GWSW, bijvoorbeeld als taalonafhankelijke aanduidingen van toestandsaspecten in de EN13508-2. Codes van concepten zijn de waarde van het annotatie-attribuut <span class="blue">skos:notation</span>. In dit voorbeeld de gebruikte codes voor (gegevensuitwisseling bij) de activiteiten Inspecteren en reinigen leiding:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
gwsw:StartNodeReference     skos:notation     “AAB"^^:Dt_Notation_IL . (inspecteren leiding)
gwsw:StartNodeReference     skos:notation     "GAB"^^:Dt_Notation_RL . (reinigen leiding)
gwsw:Dt_Notation_RRB        rdfs:label        "Codering reinigen put/leiding"@nl ;
                            rdf:type          rdfs:Datatype .
</pre></div>

Bij een concept kunnen meerdere codes afhankelijk van de context voorkomen. Bij de uitwisseling van gegevens over het reinigen van een leiding worden bijvoorbeeld andere codes gebruikt dan over het inspecteren van een leiding. Om dat onderscheid te kunnen maken is in de GWSW-Ontologie een datatype aan de code toegevoegd. Dat datatype representeert het geldende notatie-schema. De volgende datatypes worden gebruikt bij de waarde van skos:notation:

| Datatype van code | Gebruikt in context              |
|-------------------|----------------------------------|
| Dt_Notation_HY    | Hydraulisch rekenen              |
| Dt_Notation_IL    | Inspecteren leiding              |
| Dt_Notation_IP    | Inspecteren put                  |
| Dt_Notation_IR    | Inspecteren en reinigen algemeen |
| Dt_Notation_NC    | NLCS-coderingen voor materiaal   |
| Dt_Notation_RK    | Reinigen en inspecteren leiding  |
| Dt_Notation_RL    | Reinigen leiding                 |
| Dt_Notation_RP    | Reinigen put                     |
| Dt_Notation_RS    | Reinigen stortbon                |
| Dt_Notation_RC    | Reinigen calamiteit              |
| Dt_Notation_RT    | Reinigen stagnatie               |

In het GWSW Datamodel worden context-specifieke coderingen meestal gecombineerd met het context-afhankelijke datatype. Alleen voor algemene coderingen (zoals de code HWA voor gwsw:AfvloeiendHemelwater) en voor coderingen van concepten binnen een exclusief deelmodel (bijvoorbeeld de NLCS symbolen) wordt geen specifiek datatype gebruikt.

### Details deelmodellen

Deelmodellen worden gemarkeerd met het annotatie-attribuut <span class="blue">skos:scopeNote</span>, de bijbehorende waarde geeft aan welke triples bij welk deelmodel (GWSW-Basis, GWSW-Kengetallen, enz.) horen. De deelmodel-markeringen zijn van het type <span class="blue">gwsw:CollectionOfFacts</span>, ze zijn als volgt in het GWSW datamodel opgenomen:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
gwsw:clsTOP
  rdf:type                      owl:Class ;  
  rdfs:label                    "Collection of facts TOP"@nl ;
  rdfs:subClassOf               gwsw:ExclusieveCollectie ;
.
gwsw:cofTOP
  rdf:type                      gwsw:clsTOP ; # wordt hiermee individu
  skos:definition               "Bevat algemene supertypes"@nl ;
.
gwsw:DeelmodelKengetallen
  rdf:type                      owl:Class ;
  rdfs:label                    "Deelmodel Kengetallen"@nl ;
  rdfs:subClassOf               gwsw:GWSWDeelmodel ;
  skos:definition               "Deelmodel voor afvoerscenario's en kengetallen. Bevat het rioleringsnetwerk, het afvoernetwerk (verbindingen tussen stelsels) en gemeentelijke activiteiten voor optimaliseren afvalwaterketen"@nl ;
.
</pre></div>

De annotatie skos:scopeNote kan meervoudig voorkomen (als het concept in meerdere deelmodellen voorkomt) en wordt altijd opgenomen bij:

* De typering (relatie rdf:type) van alle GWSW-klassen. De (combinatie van) skos:scopeNote bij de typering geldt ook voor alle annotaties bij de klasse (horen binnen dezelfde scope).
* De CE's met restrictie op concept-relaties (nen2660:hasPart, gwsw:hasAspect) (dus niet voor de CE's met onderscheidende kenmerken).
* De typering van individuen binnen een collectie (de verzameling kan variëren vanwege bijvoorbeeld een externe normering)

<div class="box"><strong>Individuen, een speciaal geval</strong>

Individuen in het GWSW Datamodel kunnen meervoudig geclassificeerd zijn. Bijvoorbeeld: het individu gwsw:Rond is geclassificeerd als gwsw:VormPutColl, gwsw:VormLeidingColl, gwsw:VormStroomprofiel. Om te kunnen bepalen of de classificatie van een individu binnen een deelmodel valt moet zowel de skos:scopeNote van het individu als de skos:scopeNote van de klasse binnen het deelmodel vallen.   
</div>

Voor de volgende concepten is de scope per definitie identiek aan de scope van klasse-typering. De annotatie skos:scopeNote wordt daarom **niet** opgenomen bij:

* De CE's voor de kwalificatie van onderscheidende kenmerken, die vallen binnen de scope van de betrokken klasse. De onderscheidende kenmerken en de individuen/instanties ervan zijn in één centraal deelmodel opgenomen
* CE's met restrictie op datatype (waarde binnen een collectie of van een xsd-type), bij de relaties gwsw:hasValue en gwsw:hasReference
* In vervolg daarop: CE's met restricties op waardebereik (min/max)
* CE's met restrictie op metagegevens bij kenmerken (kenmerken van kenmerken): bijvoorbeeld het metagegeven Inwinning bij kenmerken zoals hoogteligging

### Validity context

Voor de definitie van conformiteitsklassen.

Vergelijkbaar met de Collection of Facts speelt ook de **Validity context** vanuit Gellish nog steeds een rol in de RDF-vorm van het GWSW. Met de annotatie **gwsw:hasValidity** worden de triples nabewerkt voor een bepaalde conformiteitsklasse (met kwaliteitseisen per proces). Deze annotatie wordt in veel gevallen toegevoegd aan de CE's bij een concept, als deze annotatie ontbreekt wordt de CE-inhoud ongewijzigd vertaald naar kwaliteitseisen voor de betreffence conformiteitsklasse.

De waarde bij gwsw:hasValidity bevat een codering voor toepassing van de conformiteitsklassen. Het is een string met de volgende opbouw:

**" 1f 2t 5f enz."**

Het cijfer in deze condering staat voor het type conformiteitsklasse:

| Nummer | Conformiteitsklasse |
|--------|---------------------|
| 1      | MdsProj             |
| 2      | RibHeen             |
| 3      | MdsPlan             |
| 4      | IMBOR               |
| 5      | Hyd                 |

De letter geeft het soort kwaliteitseis aan:

| Letter | Betekenis                                                                                                                                                                                                                                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| t      | Draai de kardinaliteit, bijvoorbeeld *minimaal 0* wordt *exact 1*                                                                                                                                                                                       |
| d      | De klasse doet niet mee in de kwaliteitseis, meestal gaat het om een CE                                                                                                                                                                                 |
| f      | De klasse is te abstract binnen de conformiteitsklasse. Bij de aanmaak van het RDF bestand met de conformiteitsklasse wordt op basis van deze code de Opmerking-kolom bijgewerkt met tekst: \[cfk fout\]. Deze tekst wordt gescand in validatie-queries |

<div class="box">
Voorlopig is de range van gwsw:hasValidity een xsd:string. De structuur van deze waarde is nu nog experimenteel, zodra het concept meer vaste vorm krijgt kunnen conformiteitsklassen en kwaliteitseisen ook als enumeratie-waarde worden beschreven.
</div>

## Details kenmerken

*Kwalitatieve attributen, kwantitatieve attributen, relaties*

### Kenmerken: simpel versus complex

De NEN2660 specificeert voor kenmerken twee modelleerpatronen: simpel (SIMPLE) en complex (COMPLEX). 

In het modelleerpatroon SIMPLE wordt het kenmerk met één triple uitgedrukt, het kwalitatieve/kwantitatieve attribuut of de relatie verwijst naar de kenmerkwaarde.

Met het modelleerpatroon COMPLEX worden samengestelde kenmerkwaarden en metadata bij kenmerkwaarden gemodelleerd. In die modelleervorm wordt de waarde van het kwalitatieve/kwantitatieve attribuut of de relatie "geobjectiviceerd". Het GWSW hanteert (ook in eerdere versies) dit principe van "geobjectiviceerde kenmerkwaarden", in voorgaande GWSW versies werden kenmerken echter via de generieke relatie "hasAspect" (type owl:ObjectProperty) beschreven.

Vanaf versie 2.0 volgt het GWSW de NEN2660 en hanteert het de modelvorm COMPLEX. In het datamodel worden de kenmerken als relatie naar complexe kenmerkwaarden gemodelleerd. De relatie heeft minimaal één domein (bij welke klasse hoort het: rdfs:domain) en exact één bereik (welke kenmerkwaarde heeft het: rdfs:range). 

Het modelleerpatroon COMPLEX biedt een uitgebreide semantiek, het GWSW voegt daar nog iets aan toe door subtypes te definiëren van de kenmerkwaarden nen2660:QuantityValue, nen2660:QualityValue en nen2660:RelationReference (modelleerpatroon COMPLEX+).

Het patroon COMPLEX+ heeft een aantal voordelen die van nut zijn voor het GWSW:
* Geobjectificeerde kenmerkwaarden (waarde-objecten) kunnen worden uitgedrukt in class-expressions (CE), bijvoorbeeld voor restricties op datatype (de range). 
* Het waarde-object kan zelf waarde-objecten bevatten, bijvoorbeeld metagegevens over de inwinning (datum en wijze van inwinning). In GWSW datasets wordt dit veel toegepast.
* Het waarde-object kan eenvoudig in andere relaties voorkomen, bijvoorbeeld gekopppeld aan een berekening (activiteit) met de relatie "heeft invoer".

Het modelleerpatroon COMPLEX+ resulteert in een uitgebreider datamodel maar de complexiteit blijft in datasets (de praktijk van gegevensuitwisseling) beperkt. De syntax in datasets is identiek aan het modelleerpatroon COMPLEX.
 
We werken hierna ter illustratie de drie modelleervormen uit, allen gebaseerd op de NEN2660:
* SIMPLE
* COMPLEX
* COMPLEX+

In de voorbeelden staat een leiding met de volgende kenmerken:
* diameter leiding (integer, eenheid=mm)
* begindatum (datum aanleg, kenmerk van supertype "fysiek object") (tekenreeks, eenheid=xsd:date)
* materiaal leiding (een materiaal)

Deze leiding wordt volgens de genoemde patronen gemodelleerd (datamodel) en als individu (dataset) uitgewerkt.

**SIMPLE**

Voorbeeld van het modelleerpatroon voor "simpele" kenmerkwaarden:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Leiding            rdf:type              owl:Class ;
                          rdfs:subClassOf       nen2660:PhysicalObject .
  gwsw:diameterLeiding    rdf:type              owl:DatatypeProperty ;      # kwantitatief attribuut
                          rdfs:label            "Diameter leiding" ;
                          rdfs:domain           gwsw:Leiding ;                        
                          rdfs:range            xsd:integer .               
  gwsw:begindatum         rdf:type              owl:DatatypeProperty ;      # kwalitatief attribuut
                          rdfs:label            "Begindatum" ;
                          rdfs:domain           nen2660:PhysicalObject ;             
                          rdfs:range            xsd:date .                  # tekenreeks 
  gwsw:materiaalLeiding   rdf:type              owl:ObjectProperty ;        # relatie-referentie
                          rdfs:label            "Materiaal leiding" ;
                          rdfs:domain           gwsw:Leiding ;                       
                          rdfs:range            gwsw:MateriaalLeiding .     
  gwsw:MateriaalLeiding   rdf:type              owl:Class ;
                          rdf:type              nen2660:EnumerationType .   # punning: is klasse en wordt hier ook individu
                          owl:oneOf             (gwsw:Beton) .              # individuen
  gwsw:Beton              rdf:type              gwsw:MateriaalLeiding .     # individu             
</pre></div>

Individuals van leidingmateriaal worden direct gekoppeld via de property 

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Leiding_1            rdf:type              gwsw:Leiding ;
                          gwsw:diameterLeiding  500 ;
                          gwsw:begindatum       "2012-05-01"^^xsd:date ;          
                          gwsw:materiaalLeiding gwsw:Beton .
</pre></div>

**COMPLEX**

Voorbeeld van het modelleerpatroon voor "complexe" kenmerkwaarden:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Leiding            rdf:type              owl:Class ;
                          rdfs:subClassOf       nen2660:PhysicalObject .
  gwsw:diameterLeiding    rdf:type              owl:ObjectProperty ;          # kwantitatief attribuut
                          rdfs:label            "Diameter leiding" ;
                          rdfs:domain           gwsw:Leiding ;                         
                          rdfs:range            nen2660:QuantityValue ;
  gwsw:begindatum         rdf:type              owl:ObjectProperty ;          # kwalitatief attribuut
                          rdfs:label            "Begindatum" ;
                          rdfs:domain           nen2660:PhysicalObject ;              
                          rdfs:range            nen2660:QualityValue ;
  gwsw:materiaalLeiding   rdf:type              owl:ObjectProperty ;          # relatie-referentie
                          rdfs:label            "Materiaal leiding" ;
                          rdfs:domain           gwsw:Leiding ;                        
                          rdfs:range            nen2660:RelationReference .   
  gwsw:MateriaalLeiding   rdf:type              owl:Class ;
                          rdf:type              nen2660:EnumerationType ;     # punning: is klasse en wordt hier ook individu
                          owl:oneOf             (gwsw:Beton) .                # individuen
  gwsw:Beton              rdf:type              gwsw:MateriaalLeiding .       # individu             
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Leiding_1            rdf:type              gwsw:Leiding ;
                          gwsw:diameterLeiding       
                          [ 
                            rdf:value           400 ;
                            nen2660:unit        unit:MiliM .                   
                          ] ; 
                          gwsw:begindatum       
                          [ 
                            rdf:value           "2012-05-01"^^xsd:date ;
                            rdfs:comment        "commentaar bij deze begindatum" ;
                          ] ; 
                          gwsw:materiaalLeiding [
                            rdf:value           gwsw:Beton ;
                            rdfs:comment        "commentaar bij deze materiaalleiding" ;
                          ] .
</pre></div>

**COMPLEX+**

Omwille van de consistententie objectificeren we de (meta)kenmerkwaarden volgens modelleerpatroon COMPLEX+. De enige uitzonderingen hierop zijn de onderscheidende kenmerken.
Aan het kenmerk "materiaal leiding" is, ter illustratie van de voordelen van kenmerk-objectificatie, het meta-kenmerk "inwinning" toegevoegd.
Zie voor de definitie van dat meta-kenmerk hst [Betrouwbaarheid, actualiteit](#betrouwbaarheid-actualiteit)

De annotaties bij het kenmerk worden - conform de NEN2660 - aan de property gekoppeld. 

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Leiding              rdf:type            owl:Class ;
                            rdfs:subClassOf     nen2660:PhysicalObject .
  gwsw:diameterLeiding      rdf:type            owl:ObjectProperty ;          # de attribuut-URI is consequent de range-class-URI, startend met lower-case
                            rdfs:label          "Diameter leiding" ; 
                            skos:definition     "De lengte van de middellijn van de cirkel die de binnenzijde van de leidingdoorsnede beschrijft" ;
                            rdfs:domain         gwsw:Leiding ;                # minimaal 1 domein          
                            rdfs:range          gwsw:DiameterLeiding .        # exact 1 range (OWA: tenminste 1) 
  gwsw:DiameterLeiding      rdf:type            owl:Class ;
                            rdfs:subClassOf     nen2660:QuantityValue ;       
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [
                              rdf:type          owl:Restriction ;
                              owl:onProperty    rdf:value ;
                              owl:allValuesFrom xsd:integer ;
                            ] ;
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [ 
                              rdf:type          owl:Restriction;
                              owl:onProperty    nen2660:unit ;
                              owl:hasValue      unit:MiliM ;
                            ] .
  gwsw:begindatum           rdf:type            owl:ObjectProperty ;          # de attribuut-URI is consequent de range-class-URI, startend met lower-case
                            rdfs:label          "Begindatum" ;               
                            rdfs:domain         nen2660:PhysicalObject ;      # minimaal 1 domein          
                            rdfs:range          gwsw:Begindatum .             # exact 1 range (OWA: tenminste 1) 
  gwsw:Begindatum           rdf:type              owl:Class ;
                            rdfs:subClassOf     nen2660:QualityValue ;       
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [
                              rdf:type          owl:Restriction ;
                              owl:onProperty    rdf:value ;
                              owl:allValuesFrom xsd:date ;
                            ] .
  gwsw:materiaalLeiding     rdf:type            owl:ObjectProperty ;
                            rdfs:label          "Materiaal leiding" ;         
                            rdfs:domain         gwsw:Leiding ;                # minimaal 1 domein          
                            rdfs:range          gwsw:MateriaalLeiding .       # exact 1 range (OWA: tenminste 1)
  gwsw:MateriaalLeiding     rdf:type            owl:Class ;
                            rdfs:subClassOf     nen2660:RelationReference ;   # relatie-referentie
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [
                              rdf:type          owl:Restriction;
                              owl:onProperty    rdf:value ;
                              owl:allValuesFrom gwsw:MateriaalLeidingColl ;
                            ] ; 
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [ 
                              rdf:type          owl:Restriction;
                              owl:onProperty    gwsw:inwinning ;
                              owl:maxQualifiedCardinality "1"^^xsd:nonNegativeInteger ;
                            ] . 
  gwsw:MateriaalLeidingColl rdf:type            owl:Class ;
                            rdf:type            nen2660:EnumerationType ;     # punning: is klasse en wordt hier ook individu
                            owl:oneOf           (gwsw:Beton) .                # individuen
  # gwsw:Beton                rdf:type           gwsw:MateriaalLeidingColl .   # wordt individu
  gwsw:Beton                rdf:type           imbor:52ab27f2-fb67-4752-8cfc-ac4f3638df4e . # individu is van type IMBOR-Kern owl:Class
</pre></div>

In de dataset komt de declaratie in de basis overeen met die van COMPLEX, daarnaast kan in COMPLEX+ (zoals inwinningsgegevens) nu metadata bij het kenmerk worden opgenomen.

<div class="box">
  Een complex modelleerpatroon is niet persé gecompliceerd, zeker niet in datasets (bij toepassingen).
</div>

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Leiding_1  rdf:type              gwsw:Leiding ;  
                gwsw:diameterLeiding                                                         
                [
                  rdf:value           400 ; 
                ] ;     
                gwsw:begindatum                                                         
                [
                  # rdf:type          gwsw:Begindatum ;                         expliciet typeren niet nodig, liever niet (redundant)
                  rdf:value           "2012-05-01"^^xsd:date; 
                ] ;     
                gwsw:materiaalLeiding                                         # impliciet gwsw:MateriaalLeiding, heeft meta-data
                [
                  rdf:value           gwsw:Beton ;
                  gwsw:inwinning                                              # impliciet gwsw:Inwinning
                  [
                    gwsw:datumInwinning                                       # impliciet gwsw:DatumInwinning
                    [
                      rdf:value       "2023-05-11"^^xsd:date ;
                    ]
                  ] ;
                ] .
</pre></div>

<span class="mark">VARIANT MET nen2660:Matter </span>

<div class="example"><div class="example-title marker">Datamodel: <span class="mark">Variant met nen2660:Matter</span></div><pre>
  gwsw:Leiding              rdf:type            owl:Class ;
                            rdfs:subClassOf     nen2660:RealObject ;          # NEN2660: hoeveelheid materie (domein van nen2660:consistsOf)
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [ 
                              rdf:type          owl:Restriction;
                              owl:maxQualifiedCardinality "1"^^xsd:nonNegativeInteger ;
                              owl:onProperty    nen2660:consistsOf ;
                              owl:onClass       gwsw:MateriaalLeiding ;
                            ] . 
  gwsw:MateriaalLeiding     rdf:type            owl:Class ;
                            rdfs:subClassOf     nen2660:RelationReference ;   # relatie-referentie
                            rdfs:subClassOf     nen2660:Matter ;              # range van nen2660:consistsOf
                            rdfs:subClassOf                                   # restricties op klasse-niveau
                            [ 
                              rdf:type          owl:Restriction;
                              owl:onProperty    rdf:value ;
                              owl:allValuesFrom gwsw:MateriaalLeidingColl ;
                            ] . 
  gwsw:MateriaalLeidingColl rdf:type            owl:Class ;
                            rdf:type            nen2660:EnumerationType ;     # punning: is klasse en wordt hier ook individu
                            owl:oneOf           (gwsw:Beton) .                # individuen (alle mogelijke leidingmaterialen)
#   gwsw:Beton                rdf:type            gwsw:MateriaalLeidingColl .   # wordt individu        
  gwsw:Beton                rdf:type            imbor:52ab27f2-fb67-4752-8cfc-ac4f3638df4e . # individu is van type “Beton” (een IMBOR-Kern owl:Class)
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: <span class="mark">Variant met nen2660:Matter</span></div><pre>
  ex:Leiding_1  rdf:type              gwsw:Leiding ;  
                nen2660:consistsOf                                            # impliciet nen2660:Matter (of nen2660:MatterPortion)
                [
                  rdf:value           gwsw:Beton ;
                ] .
</pre></div>

<span class="mark">NOG EEN VARIANT MET nen2660:Matter</span>
Handhaaf attribuut <span class="blue">gwsw:materiaalLeiding</span> als <span class="blue">rdfs:subPropertyOf</span> van <span class="blue">nen2660:consistsOf</span>

<div class="box"><strong>Kenmerken in vorige versies</strong>
<div class="example"><div class="example-title marker">De OUDE GWSW (versie 1.n) kenmerk-domein-definitie:</div><pre>
  gwsw:Leiding              rdfs:subClassOf
                            [
                              rdf:type                      owl:Restriction ;
                              owl:minQualifiedCardinality   "0"^^xsd: nonNegativeInteger ;
                              owl:onProperty                gwsw:hasAspect ;  # de "oude" generieke attribuut-property
                              owl:onClass                   gwsw:DiameterLeiding ;
                            ] . 
  gwsw:FysiekObject         rdfs:subClassOf
                            [
                              rdf:type                      owl:Restriction ;
                              owl:minQualifiedCardinality   "0"^^xsd: nonNegativeInteger ;
                              owl:onProperty                gwsw:hasAspect ;  # de "oude" generieke attribuut-property
                              owl:onClass                   gwsw:Begindatum .
                            ] . 
  gwsw:Leiding              [
                              rdf:type                      owl:Restriction ;
                              owl:minQualifiedCardinality   "0"^^xsd: nonNegativeInteger ;
                              owl:onProperty                gwsw:hasAspect ;
                              owl:onClass                   gwsw:Materiaalleiding ;
                            ] .
  gwsw:MateriaalLeiding     rdfs:subClassOf
                            [
                              rdf:type                      owl:Restriction ;
                              owl:onProperty                gwsw:hasReference;
                              owl:allValuesFrom             gwsw:MateriaalLeidingColl ;
                            ] ;
                            rdfs:subClassOf
                            [
                              owl:maxQualifiedCardinality   "1"^^xsd: nonNegativeInteger ;
                              owl:onProperty                gwsw:hasAspect ;
                              owl:onClass                   gwsw:Inwinning ;
                            ] .
</pre></div>

<div class="example-dataset"><div class="example-title marker">De oude GWSW (versie 1.n) kenmerk-declaratie:</div><pre>
  ex:Leiding_1  rdf:type              gwsw:Leiding ;
                gwsw:hasAspect                                                            
                [                                   
                  rdf:type            gwsw:Begindatum ;                       # expliciet typeren
                  gwsw:hasValue       "2012-05-01"^^xsd:date; 
                ] ,     
                [ 
                  rdf:type            gwsw:MateriaalLeiding ;                 # expliciet typeren
                  gwsw:hasAspect
                  [ 
                    rdf:type          gwsw:Inwinning                          # expliciet typeren
                    [ 
                      gwsw:hasAspect 
                      [      
                        rdf:type      gwsw:Datuminwinning                     # expliciet typeren
                        gwsw:hasValue "2023-05-11"^^xsd:date ;
                      ]
                  ] ] ;
                  gwsw:hasReference   gwsw:Beton ;
                ] .
</pre></div>
</div>

### Eenheden op datamodel-niveau

De eenheden bij waarden definiëren we op datamodel-niveau, dat kan eenvoudig door ze als annotaties bij de properties op te nemen.

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:DiameterLeiding      rdf:type                  owl:Class ;         
                            rdfs:subClassOf           nen2660:QuantityValue ;  
                            rdfs:label                "Diameter leiding" ;
                            skos:definition           "De lengte van de middellijn van de cirkel die de binnenzijde van de leidingdoorsnede beschrijft" ;
                            rdfs:subClassOf         
                            [ 
                              rdf:type                owl:Restriction;
                              owl:onProperty          nen2660:unit ;
                              owl:hasValue            unit:MiLiM ;
                            ] ; 
</pre></div>

In datasets kan een eenheid bij de waarde worden opgenomen, maar dan is alleen de eenheid uit het datamodel toegestaan. Het specificeren van de eenheid in de dataset is niet voorgeschreven maar vanwege linked-gegevensgebruik wordt het wel aanbevolen.

<div class="example-dataset"><div class="example-title marker">Dataset: wel correct</div><pre>
  ex:Leiding_1             gwsw:diameterLeiding         
                            [         
                              rdf:value               160.0 ;
                              nen2660:unit            unit:MiLiM ; # optioneel, wel aanbevolen
                            ] .         
</pre></div>

GWSW toepassingen hanteren de datamodel-eenheid, datasets met afwijkende eenheden zijn niet bruikbaar voor die toepassingen. Verificatie van de gebruikte eenheid in de dataset wordt uitgedrukt in SHACL:

<div class="example-shapes"><div class="example-title marker">Shapes: Controleer de gebruikte eenheid</div><pre>
  gwsw:DiameterLeiding      rdf:type             rdfs:Class, # om impliciet TargetClass te definiëren
                                                 sh:NodeShape ;     
                            sh:property                                    
                            [        
                              sh:path            nen2660:unit ;           
                              sh:hasValue        unit:MiLiM ;        
                              sh:message         "Use unit Milimeter for value of gwsw:diameterLeiding" ; 
                              sh:severity        sh:Violation ;      
                            ] .      
</pre></div>

### Betrouwbaarheid, actualiteit

**<span class="smallcaps">Metagegeven Inwinning (kenmerk van kenmerk)</span>**

Voor de beschrijving van de gegevenskwaliteit - met name nauwkeurigheid, actualiteit en betrouwbaarheid - definieert de GWSW Ontologie voor veel kenmerken het metagegeven <span class="blue">Inwinning</span>. Dat is volgens het class-central principe eenvoudig te beschrijven:

<div class="example"><div class="example-title marker">Datamodel: het aspect/metagegeven gwsw:inwinning</div><pre>
  gwsw:inwinning              rdf:type                    owl:ObjectProperty ;   
                              rdfs:range                  gwsw:Inwinning .       
  gwsw:Inwinning              rdf:type                    owl:Class ;            
                              rdfs:subClassOf             nen2660:RelationReference .
  gwsw:datumInwinning         rdf:type                    owl:ObjectProperty ;   
                              rdfs:range                  gwsw:DatumInwinning .       
  gwsw:DatumInwinning         rdf:type                    owl:Class ;            
                              rdfs:subClassOf             nen2660:QualityValue .
  gwsw:wijzeVanInwinning      rdf:type                    owl:ObjectProperty ;   
                              rdfs:label                  "Wijze van inwinning" ;      
                              rdfs:range                  gwsw:WijzeVanInwinning .       
  gwsw:WijzeVanInwinning      rdfs:subClassOf             nen2660:RelationReference ;   # het object, met waarde en metakenmerken
                              rdfs:subClassOf                                           # restricties op klasse-niveau
                              [ 
                                rdf:type                  owl:Restriction;
                                owl:onProperty            rdf:value ;
                                owl:allValuesFrom         gwsw:WijzeVanInwinningColl ;
                              ] . 
  gwsw:WijzeVanInwinningColl  rdf:type                    owl:Class ;            
                              rdf:type                    nen2660:EnumerationType ;      # punning: is klasse en wordt hier ook individu
                              owl:oneOf                   (gwsw:Inmeting gwsw:Schatting) ; 
  gwsw:Inmeting               rdf:type                    gwsw:WijzeVanInwinningColl .   # waarde is ingemeten
  gwsw:Schatting              rdf:type                    gwsw:WijzeVanInwinningColl .   # waarde is geschat
</pre></div>

Bij ex:Put_1 registreren dat de waarde van gwsw:hoogtePut is geschat

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Put_1                    gwsw:hoogtePut                                 
                              [        
                                rdf:value                    1000^^xsd:integer ; 
                                gwsw:inwinning                               
                                [      
                                  gwsw:wijzeVanInwinning 
                                  [                               
                                    rdf:value                 gwsw:Schatting ;
                                  ]
                                  gwsw:datumInwinning    
                                  [
                                    rdf:value                 "2020-05-03"^^xsd:date ;
                                  ]
                                ] ;    
                              ] .      
</pre></div>

### Nauwkeurigheid, kwaliteit

<span class="smallcaps">Minimum/maximum waarde, datatype</span>

We hanteren twee soorten datatypes:

* de standaard xsd types: integer, decimal, date, gYear, time
* de maatwerk datatypes: van het type rdfs:datatype in combinatie met waarde-restricties

De eisen aan nauwkeurigheid drukken we uit als restrictie op de kenmerk-waarde. Een voorbeeld met alleen een restrictie op het standaard datatype:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:HoogtePut      rdfs:subClassOf       nen2660:QuantityValue ;
                      rdfs:subClassOf
                      [
                        rdf:type            owl:Restriction ;
                        owl:onProperty      rdf:value ;
                        owl:allValuesFrom   xsd:integer ;
                      ] .
</pre></div>

Voor extra restricties op min/max waarde voegen we een apart datatype toe, daarin wordt ook de restrictie op kenmerk-waarde opgenomen:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:HoogtePut      rdfs:subClassOf       nen2660:QuantityValue ;
                      rdfs:subClassOf
                      [
                        rdf:type            owl:Restriction ;
                        owl:onProperty      rdf:value ;
                        owl:allValuesFrom   gwsw:Dt_HoogtePut
                      ] .
  gwsw:Dt_HoogtePut   rdf:type              rdfs:Datatype ;           # typering verplicht in OWL RL
                      rdfs:label            “Put hoogte - datatype” ;
                      owl:equivalentClass
                      [
                        rdf:type            rdfs:Datatype ;
                        owl:onDatatype      xsd:integer
                        owl:withRestrictions
                        ( [xsd:minInclusive "300"^^xsd:integer] [xsd:maxExclusive "4000"^^xsd:integer] )
                      ] .
</pre></div>

### Details intrinsieke kenmerken

Intrinsieke kenmerken horen exclusief (per definitie) bij een klasse, ze hebben maar één domein. We gebruiken voor bijvoorbeeld de hoogte van de klasse gwsw:Put niet de algemene property gwsw:hoogte maar de gespecialiseerde property gwsw:hoogtePut. Voor een intrinsiek kenmerk is exact één domein gespecificeerd.

Zie hst [Intrinsieke kenmerken](#intrinsieke-kenmerken)

<div class="example"><div class="example-title marker">Datamodel: Definiërend</div><pre>
  gwsw:hoogtePut            rdf:type                   owl:ObjectProperty ;
                            rdf:type                   owl:FunctionalProperty ;      # max 1 per object          
                            rdfs:domain                gwsw:Put ;          
                            rdfs:range                 gwsw:HoogtePut .  
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Object_1               gwsw:hoogtePut ;   
                            [        
                              rdf:value                "2000"^^xsd:integer ;        
                            ] .      
</pre></div>

Afgeleid wordt dat ex:Object_1 mogelijk van de klasse Put is

<div class="box">
In GWSW 1.n was de definitie van intrinsieke kenmerken meer complex:

<div class="example"><div class="example-title marker">Datamodel: OUDE (versie 1.n) kenmerk-definitie:</div><pre>
  gwsw:Put                  rdfs:subClassOf
                            [   
                              rdf:type              owl:Restriction ;
                              owl:onProperty        gwsw:hasAspect ;
                              owl:someValuesFrom    gwsw:HoogtePut ;
                            ] .
</pre></div>
</div>

### Kwalificatie standaardwaardes

In eerdere GWSW-versies was het mogelijk om kenmerken bij concepten te definiëren met een specifieke kwalificatie, bijvoorbeeld om het kenmerk "versie" te definiëren en daaraan een vaste waarde toe te kennen. Dit modelleeraspect word sporadisch gebruikt. Met de komst van de NEN2660 definiëren we dergelijke kenmerken als annotatie-attributen met een specifieke kwaliteit (waarde).

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:version              rdf:type                owl:AnnotationProperty ;
                            rdfs:label              "Heeft versie"@nl ;
                            rdfs:range              xsd:string .
  gwsw:DeelmodelBasis       rdfs:label              "Deelmodel Basis"@nl ;
                            gwsw:version            "2.0" .
</div>

### Beperking en afleiding

Conform de NEN2660 maakt het GWSW onderscheid in definiërende en specificerende beperkingen op attributen en datatypes.

**Definiërende beperking, afleiding**

Het afleiden van klasse-typering blijft bij attributen beperkt tot de inferencing van predicates rdfs:domain en rdfs:range bij kenmerken.
Als de typering van een subject is af te leiden uit rdfs:domain betreft het een intrinsiek kenmerk (zie hst [Details intrinsieke kenmerken](#details-intrinsieke-kenmerken)). 

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:diameterLeiding      rdf:type                  owl:ObjectProperty ;
                            rdf:type                  owl:FunctionalProperty ; # attribuut komt max 1x voor
                            nen2660:unit              unit:MiLiM ;
                            rdfs:label                "Diameter leiding" ;
                            skos:definition           "De lengte van de middellijn van de cirkel die de binnenzijde van de leidingdoorsnede beschrijft" ;
                            rdfs:domain               gwsw:Leiding ;      
                            rdfs:range                gwsw:DiameterLeiding .
  gwsw:DiameterLeiding      rdf:type                  owl:Class ;         
                            rdfs:subClassOf           nen2660:QuantityValue ;
                            rdfs:subClassOf                                  
                            [ 
                              rdf:type                owl:Restriction;
                              owl:onProperty          nen2660:unit ;
                              owl:hasValue            unit:MiLiM ;
                            ] . 
  gwsw:Drukleiding          rdf:type                  owl:Class ;         
                            rdfs:subClassOf           gwsw:Leiding .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Object_1               gwsw:diameterLeiding         
                            [         
                              rdf:value                        63 ;
                            ] .         
</pre></div>

De reasoner leidt af dat ex:Object_1 van de (super)klasse Leiding is en dat ex:Leiding_1 een kenmerkwaarde van de klasse DiameterLeiding heeft. 
Met een query kan vervolgens het individu-type (?type) en de eenheid (?unit) worden opgevraagd:

<pre class="file">
PREFIX gwsw: <http://data.gwsw.nl/2.0/totaal/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX nen2660: <https://w3id.org/nen2660/def#>
SELECT *
WHERE 
{
    ?sub gwsw:diameterLeiding ?dia .
    ?sub sesame:directType ?type .
    ?dia rdf:type [
      rdfs:subClassOf [ 
        owl:onProperty nen2660:unit ;
        owl:hasValue ?unit ;
      ] ;
    ] .
}
</pre>

**Specificerende beperking**

Dit type beperkingen gebruiken we voor data-verificatie. In de conformiteitsklassen is altijd volledig beschreven welke aspecten per klasse kunnen voorkomen, binnen die reeks kunnen ook aspecten verplicht zijn.

Bijvoorbeeld de klasse Leiding kent alleen de aspecten gwsw:begindatum en gwsw:diameterLeiding, waarvan het aspect gwsw:diameterLeiding moet voorkomen bij een leiding.

<div class="example-shapes"><div class="example-title marker">Shapes: De mogelijke aspecten per leiding</div><pre>
  gwsw:Leiding            rdf:type              rdfs:Class, # om impliciet TargetClass te definiëren
                                                sh:NodeShape ;     
                          sh:closed             true ;  # de reeks properties is eindig
                          sh:property         
                          [         
                            sh:path             gwsw:begindatum ;
                          ] ;         
                          sh:ignoredProperties  (rdf:type nen2660:hasPart) ;   # Deze properties
                          sh:property                                          # mogen ook voorkomen
                          [         
                            sh:path             gwsw:diameterLeiding ;
                            sh:minCount         1 ;
                            sh:maxCount         1 ;
                            sh:message          "diameterLeiding: property is missing" ;
                            sh:severity         sh:Violation ;
                          ] .         
</pre></div>

Individuele aspecten worden soms verder beperkt. Bijvoorbeeld dient de waarde van gwsw:diameterLeiding een geheel getal (integer) te zijn tussen 50 en 4000. 
In de ontologie zijn die restricties op kenmerk-niveau via datatypes opgenomen, zie hst [Nauwkeurigheid, kwaliteit](#nauwkeurigheid-kwaliteit).

Specificeer de generieke beperkingen voor gwsw:diameterLeiding voor een SHACL-validatie:

<div class="example-shapes"><div class="example-title marker">Shapes:</div><pre>
  gwsw:diameterLeiding    rdf:type                  sh:NodeShape ;
                          sh:targetObjectsOf        gwsw:diameterLeiding ; # Individuen van klasse DiameterLeiding
                          sh:property         
                          [         
                            sh:path                 rdf:value ;
                            sh:minCount             1 ;
                            sh:maxCount             1 ;
                            sh:message              "diameterLeiding: has no value" ;
                            sh:severity             sh:Violation ;
                          ] ;         
                          sh:property         
                          [         
                            sh:path                 rdf:value ;
                            sh:datatype             xsd:nonNegativeInteger ;
                            sh:message              "diameterLeiding: not an integer" ;
                            sh:severity             sh:Violation ;
                          ] ;         
                          sh:property         
                          [         
                            sh:path                 rdf:value ;
                            sh:minExclusive         50 ;
                            sh:maxExclusive         4000 ;
                            sh:message              "diameterLeiding: out of bounds" ;
                            sh:severity             sh:Warning ;
                          ] .         
</pre></div>

Vaak zijn kenmerken niet intrinsiek, hetzelfde kenmerk komt bij meerdere klassen voor. Het bijbehorede datatype definieert dan vaak generieke kwaliteitseisen. Die eisen kunnen verschillen, afhankelijk van het attribuut-domein. Voor verificatie in die gevallen is SHACL de aangewezen weg. Ter illustratie: een drukleiding heeft een kleine diameter, het datatype bij het generieke kenmerk DiameterLeiding defineert veel ruimere grenzen (min=63mm, max =4000mm).

Met SHACL scherpen we de verificatie aan:

<div class="example-shapes"><div class="example-title marker">Shapes:</div><pre>
  gwsw:Drukleiding         rdf:type             rdfs:Class, # om impliciet TargetClass te definiëren
                                                sh:NodeShape ;     
                           sh:property         
                           [         
                             sh:path             (gwsw:diameterLeiding rdf:value) ;
                             sh:minInclusive     50 ;
                             sh:maxInclusive     160 ;
                             sh:message          "diameterLeiding: value is out of bounds" ;
                             sh:severity         sh:Violation ;
                           ] .         
</pre></div>

SHACL rapporteert dat de typering van ex:Leiding_2 niet consistent is

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Leiding_2             rdf:type              gwsw:Drukleiding ;
                            gwsw:diameterLeiding         
                            [          
                              rdf:value          163 ;
                            ] .         
</pre></div>

## Details relaties

*Deel-geheel, verbindingen, proces*

Het GWSW definieert relaties voor de samenstelling (meronomie) en de verbindingen (netwerk, topologie). Het datamodel beschrijft de restricties op deze relaties. De volgende relaties worden gebruikt (in datamodel en dataset):

* nen2660:hasPart, gwsw:isPartOf
* gwsw:hasInput, gwsw:isInputOf (staat in de NEN 2660-1, maar is niet overgenomen in de NEN 2660-2)
* gwsw:hasOutput, gwsw:isOutputOf (staat in de NEN 2660-1, maar is niet overgenomen in de NEN 2660-2)
* nen2660:hasConnection  (symetrisch, geldt voor fysieke objecten, niet voor topologische elementen?)

### Relaties proces (activiteiten)

De relaties <span class="blue">gwsw:hasInput</span> en <span class="blue">gwsw:hasOutput</span> worden gebruikt voor de beschrijving van activiteiten en processen, een voorbeeld:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
    gwsw:hasInput            rdf:type                   owl:ObjectProperty ;
                             skos:prefLabel             "has as input" .
    gwsw:InspecterenPut      rdf:type                   owl:Class ;
                             rdfs:subClassOf            nen2660:Activity ;
                             skos:prefLabel             "Inspecteren van een put"@nl .
</pre></div>

Het individu ex:Rioolput_1 is onderwerp van inspectie ex:InspecterenPut_1:

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
    ex:Rioolput_1            rdf:type                   gwsw:Rioolput ;
    ex:InspecterenPut_1      rdf:type                   gwsw:InspecterenPut ;  # de activiteit
                             gwsw:hasInput              ex:Rioolput_1 .
</pre></div>

### Topologie

*Netwerkbeschrijving* 

Het GWSW definieert ook de concepten voor een (topologische) netwerkbeschrijving. In het datamodel kunnen we drie lagen onderscheiden: fysiek, topologie en geometrie. 
De topologie beschrijft de samenhang en oriëntatie van de fysieke objecten, al dan niet binnen een netwerk. Daarvoor worden de onderlinge verbindingen beschreven via de elementen "oriëntatie" die onderling gerelateerd zijn via <span class="blue">nen2660:isConnectedTo</span>. Deze relatie is van het type owl:SymmetricProperty.

<img src="media/image4.png" style="width:100%;height:50%" />

De topologie wordt beschreven via de elementen "oriëntatie". Een oriëntatie kan een subtype van een vertex of edge zijn. Het topologische element "face" voor vlakken wordt niet toegepast. In een hydraulische netwerkmodel worden vertex en edge gemodelleerd als "knooppunt" en "verbinding". Een verbinding kan dan zowel een leiding (de meest voorkomende) als een pomp, doorlaat of wand zijn. Voor de netwerkdefinitie worden begin- en eindpunt van een edge beschreven, dat zijn vertices die de punt-objecten representeren.

<span class="blue">nen2660:isConnectedTo</span> is van het type owl:SymmetricProperty (heeft geen inverse). Voor de netwerk-beschrijving is deze relatie bepalend, het verbindt de topologische elementen van fysieke objecten. De relatie wordt echter ook voor de algemene fysieke beschrijving gebruikt, bijvoorbeeld om te beschrijven dat een gemaal verbonden is met een persleiding.

<div class="example"><div class="example-title marker">Datamodel: Topologie-elementen bij leiding en put</div><pre>
  gwsw:leidingorientatie    rdf:type                  owl:ObjectProperty ;
                            rdfs:domain               gwsw:Leiding ;
                            rdfs:range                gwsw:Leidingorientatie .
  gwsw:Leidingorientatie    rdf:type                  owl:Class ;
                            rdfs:subClassOf           gwsw:TopologischElement ;
                            skos:prefLabel            "Leidingoriëntatie"@nl .
  gwsw:Vertex               rdf:type                  owl:Class ;
                            rdfs:prefLabel            "Vertex"@nl;
                            skos:definition           "Het punt waar lijnstukken bij elkaar komen, in de grafentheorie een knoop, in de meetkunde een hoekpunt"@nl;
                            skos:altLabel             "Knoop"@nl;
                            rdfs:subClassOf           gwsw:TopologischElement.
  gwsw:BeginpuntLeiding     rdf:type                  owl:Class ;
                            rdfs:subClassOf           gwsw:Vertex ;
                            skos:prefLabel            "Beginpunt leiding"@nl .
  gwsw:EindpuntLeiding      rdf:type                  owl:Class ;
                            rdfs:subClassOf           gwsw:Vertex ;
                            skos:prefLabel            "Eindpunt leiding"@nl .
  gwsw:putorientatie        rdf:type                  owl:ObjectProperty ;
                            rdfs:domain               gwsw:Put ;
                            rdfs:range                gwsw:Putorientatie .
  gwsw:Putorientatie        rdf:type                  owl:Class ;
                            rdfs:subClassOf           gwsw:Vertex ;
                            skos:prefLabel            "Putoriëntatie"@nl .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: In een netwerk is een put via begin- en eindpunt verbonden met een leiding</div><pre>
  ex:Leiding_1              gwsw:leidingorientatie         
                            [         
                              nen2660:hasPart         ex:Eindpunt_1 ;
                            ] .
  ex:Eindpunt_1             rdf:type                  gwsw:EindpuntLeiding .         
  ex:Put_1                  gwsw:putorientatie         
                            [         
                              nen2660:isConnectedTo   ex:Eindpunt_1 ;
                            ] .         
</pre></div>

### Geometrie

In het datamodel onderscheiden we drie geometrie-elementen, allen subtype van <span class="blue">gwsw:Geometrie</span>:
* gwsw:Punt - een subtype van het topologie-element vertex
* gwsw:Lijn - een subtype van het topologie-element edge
* gwsw:Buitengrens - een subtype van het topologie-element edge

Zie ook hst [Topologie](#topologie)

Een voorbeeld met <span class="blue">gwsw:Lijn</span>

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Lijn           rdfs:subClassOf       nen2660:QualityValue ;
                      rdfs:subClassOf
                      [
                        rdf:type            owl:Restriction ;
                        owl:onProperty      rdf:value ;
                        owl:allValuesFrom   geo:wktLiteral ;              # was geo:gmlLiteral in vorige versies
                      ] .
  gwsw:lijn           rdf:type              owl:ObjectProperty ;
                      rdfs:label            "Lijn" ;               
                      rdfs:domain           gwsw:TopologischElement ;     # gekoppeld aan de topologie
                      rdfs:range            gwsw:Lijn .                   # exact 1 range (OWA: tenminste 1) 
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: De geometrie bij de leidingoriëntatie</div><pre>
  ex:Leiding_1        gwsw:leidingorientatie         
                      [         
                        nen2660:hasPart     ex:Eindpunt_1 ;
                        gwsw:lijn 
                        [ 
                          rdf:value         "LINESTRING (30 10, 10 30, 40 40)"^^geo:wktLiteral ;
                        ] ;
                      ] .
  ex:Eindpunt_1       rdf:type              gwsw:EindpuntLeiding .         
</pre></div>

### Relaties compositie (deel-geheel)

De NEN2660 definieert <span class="blue">nen2660:hasPart</span> van het type owl:ObjectProperty, de relatie geldt tussen Fysiek Objecten (inclusief gwsw:Ruimte) onderling en Activiteiten onderling.

Compositie op constructie-niveau:

<div class="example"><div class="example-title marker">Datamodel: Stuwput en zijn onderdelen</div><pre>
  gwsw:Stuwput            rdf:type                        owl:Class ;
                          rdfs:subClassOf                 gwsw:Rioolput ;
                          rdfs:subClassOf
                          [              
                            rdf:type                      owl:Restriction ;
                            owl:qualifiedCardinality      "1"^^xsd:nonNegativeInteger ; # exact 1 stuwmuur, zie ook volgende hoofdstuk
                            owl:onProperty                nen2660:hasPart ;
                            owl:onClass                   gwsw:Stuwmuur .
                          ] ;    
                          rdfs:subClassOf
                          [              
                            rdf:type                      owl:Restriction ;
                            owl:minQualifiedCardinality   "2"^^xsd:nonNegativeInteger ; # min 2 compartimenten, zie ook volgende hoofdstuk
                            owl:onProperty                nen2660:hasPart ;
                            owl:onClass                   gwsw:Compartiment .
                          ] .    
  gwsw:Stuwmuur           rdf:type                        owl:Class ;
                          rdfs:subClassOf                 gwsw:Wand .
  gwsw:Compartiment       rdf:type                        owl:Class ;
                          rdfs:subClassOf                 gwsw:Ruimte .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: Compositie van een stuwput, heeft als deel een stuwmuur en een compartiment</div><pre>
  ex:Stuwmuur_1           rdf:type                        gwsw:Stuwmuur ;
                          skos:prefLabel                  "0987/w1" .
  ex:Comp_1               rdf:type                        gwsw:Compartiment;
                          skos:prefLabel                  "0987/c1" .
  ex:Stuwput_1            rdf:type                        gwsw:Stuwput ;
                          skos:prefLabel                  "0987" ;
                          nen2660:hasPart                 ex:Stuwmuur_1 ;
                          nen2660:hasPart                 ex:Comp_1 .
</pre></div>

Compositie op gebieds-niveau:

<div class="example"><div class="example-title marker">Datamodel: Gebied en stelsel</div><pre>
  gwsw:Kern               rdf:type                        owl:Class ;
                          rdfs:subClassOf                 gwsw:Ruimte ;
                          rdfs:subClassOf
                          [              
                            rdf:type                      owl:Restriction ;
                            owl:minQualifiedCardinality   "0"^^xsd:nonNegativeInteger ; # kan een stelsel bevatten, zie ook volgende hoofdstuk
                            owl:onProperty                nen2660:hasPart ;
                            owl:onClass                   gwsw:Stelsel .
                          ] .
  gwsw:Rioolstelsel       rdf:type                        owl:Class ;
                          rdfs:subClassOf                 gwsw:Stelsel .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: Het gebied bevat het stelsel</div><pre>
  ex:Stelsel_1            rdf:type                        gwsw:Rioolstelsel;
                          skos:prefLabel                  "Stelsel 1" .
  ex:Kern_1               rdf:type                        gwsw:Kern ;
                          nen2660:hasPart                 ex:Stelsel_1 ;
                          skos:prefLabel                  "Kern 1" .
</pre></div>

### Beperking en afleiding

Ook voor relaties maken we conform de NEN2660 onderscheid in definiërende en specificerende beperkingen. Relaties die een deel-geheel, een proces of een topologie beschrijven zijn vaak definiërend voor de classificatie. Zo geldt bijvoorbeeld:

*   de activiteit Putinspectie heeft als invoer minimaal één Rioolput (proces)
*   een Inspectieput moet minimaal één Deksel hebben (deel-geheel)
*   een Rioolput is verbonden aan een Rioolleiding (topologie)

Deze relaties beschrijven we definiërend in OWL. Voor de genoemde relaties geldt een gelijke graph-structuur.

<div class="example"><div class="example-title marker">Datamodel: Een inspectieput moet een deksel hebben om een echte inspectieput te zijn</div><pre>
  gwsw:Inspectieput         rdfs:subClassOf                    # restrictie in 1 richting, 
                            [                                  # andere puttypes hebben ook deksels
                              rdf:type                         owl:Restriction ;
                              owl:minQualifiedCardinality      "1"^^xsd:nonNegativeInteger ;
                              owl:onProperty                   nen2660:hasPart ;
                              owl:onClass                      gwsw:Deksel .
                            ] .         
</pre></div>

**Inverse kardinaliteit**

Kardinaliteit kan tweezijdig worden beschreven, daarvoor zijn er omgekeerde relaties nodig. gwsw:isPartOf is gedefinieerd als inverse van nen2660:hasPart.

<div class="example"><div class="example-title marker">Datamodel: Een deksel hoort bijvoorbeeld bij één inspectieput</div><pre>
  gwsw:Deksel               owl:equivalentClass         
                            [         
                              rdf:type                        owl:Restriction ;
                              owl:maxQualifiedCardinality     "1"^^xsd:nonNegativeInteger ;
                              owl:onProperty                  gwsw:isPartOf ;
                              owl:onClass                     gwsw:Inspectieput ;
                            ] .         
</pre></div>

Afgeleid wordt dat ex:Put_1 mogelijk een gwsw:Inspectieput is:

<div class="example-dataset"><div class="example-title marker">Dataset:</div><pre>
  ex:Put_1                  nen2660:hasPart         
                            [         
                              rdf:type                        gwsw:Deksel ;
                            ] .         
</pre></div>

En we beschrijven in SHACL de data-verificatie:

<div class="example-shapes"><div class="example-title marker">Shapes: SHACL processor rapporteert dat de putdeksel ontbreekt</div><pre>
  gwsw:Inspectieput         rdf:type                          rdfs:Class, # om impliciet TargetClass te definiëren
                                                              sh:NodeShape ;     
                            sh:property         
                            [         
                              sh:path                         nen2660:hasPart ;
                              sh:class                        gwsw:Deksel ;
                              sh:minCount                     1 ;
                              sh:message                      "Inspectieput: deksel ontbreekt" ;
                              sh:severity                     sh:Warning ;
                            ] .         
</pre></div>

## Collecties

### Enumeratie

Voor de modellering van waarde-collecties gebruiken we een enumeratie van individuen. Alle collectiemembers (elementen) zijn dus in de GWSW-topologie opgenomen als individuen (met eigen annotatieproperties).

<div class="example"><div class="example-title marker">Datamodel: De putmaterialen</div><pre>
gwsw:Materiaal            rdf:type                          owl:Class ;
                          rdfs:subClassOf                   nen2660:RelationReference .
  gwsw:MateriaalPut       rdf:type                          owl:Class ;
                          rdfs:subClassOf                   gwsw:Materiaal ;
                          rdfs:subClassOf                                   
                          [ 
                            rdf:type                        owl:Restriction;
                            owl:onProperty                  rdf:value ;
                            owl:allValuesFrom               gwsw:MateriaalPutColl ;
                          ] .
  gwsw:MateriaalPutColl   rdf:type                          owl:Class ;
                          rdf:type                          nen2660:EnumerationType;      # punning: is klasse en wordt hier ook individu
                          owl:oneOf                         (gwsw:Beton gwsw:Polyester) . # individuen
  gwsw:Beton              rdf:type                          gwsw:MateriaalPutColl ;       # wordt hiermee individu
                          skos:prefLabel                    "beton" ;                     # annotatie: naam
                          skos:notation                     "A" .                         # annotatie: code
  gwsw:Polyester          rdf:type                          gwsw:MateriaalPutColl .       # wordt hiermee individu
  gwsw:materiaalPut       rdfs:subClassOf                   owl:ObjectProperty ;
                          skos:prefLabel                    "Materiaal put"@nl ;
                          rdfs:domain                       gwsw:Put ;
                          rdfs:range                        gwsw:MateriaalPut .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: In de dataset verwijzen naar het materiaal-individu</div><pre>
  ex:Put_1                rdf:type                          gwsw:Put ;
                          gwsw:materiaalPut                             
                          [                                                 # is impliciet MateriaalPut
                            rdf:value                       gwsw:Beton ;
                          ] .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: In de dataset ontbreekt het materiaal-individu</div><pre>
  ex:Put_2                rdf:type                          gwsw:Put .
</pre></div>

<div class="example-dataset"><div class="example-title marker">Dataset: In de dataset verwijzen naar een niet getypeerd individu</div><pre>
  ex:Put_3                rdf:type                          gwsw:Put ;
                          gwsw:materiaalPut                             
                          [                                        
                            rdf:value                       gwsw:Betonnnn ;
                          ] .
</pre></div>

Validator rapporteert dat het materiaal van ex:Put_2 ontbreekt en van ex:Put3 onbekend is

<div class="example-shapes"><div class="example-title marker">Shapes:</div><pre>
  gwsw:Put                rdf:type                          rdfs:Class, # om impliciet TargetClass te definiëren
                                                            sh:NodeShape ;     
                          sh:property         
                          [         
                            sh:path                         gwsw:materiaalPut ;
                            sh:minCount                     1 ;      # Put heeft 1 materiaal
                            sh:maxCount                     1 ;
                            sh:message                      "Materiaal put onbreekt" ;
                            sh:severity                     sh:Warning ;
                          ] .   
  gwsw:materiaalPut       rdf:type                          sh:NodeShape ;
                          sh:targetObjectsOf                gwsw:materiaalPut ; # Individuen van klasse MateriaalPut
                          sh:property         
                          [         
                            sh:path                         rdf:Value ;
                            sh:in                           ( gwsw:Beton gwsw:Polyester ) ;
                            sh:message                      "Materiaal put onbekend" ;
                            sh:severity                     sh:Violation ;
                          ] .         
</pre></div>

### Groepering

In het GWSW komen verzamelingen van concepten en individuen voor die niet gestructureerd zijn via een taxonomie, meronomie of enumeratie. Voorbeeld is de verzameling infiltratievoorzieningen, deze concepten zijn in de taxonomie als subtype van reservoir, leiding, put gedefinieerd. 
Het begrip infiltratievoorziening is echter als verzamelnaam in gebruik:

<div class="example"><div class="example-title marker">Datamodel:</div><pre>
  gwsw:Infiltratiebassin        rdfs:subClassOf              gwsw:Infiltratiereservoir .
  gwsw:Infiltratiekolk          rdfs:subClassOf              gwsw:Kolk .
  gwsw:Infiltratieriool         rdfs:subClassOf              gwsw:VrijvervalRioolleiding .
  gwsw:Infiltratievoorziening   rdf:type                     rdfs:Container ;  # is individual
                                rdfs:member                  gwsw:Infiltratiebassin ;
                                rdfs:member                  gwsw:Infiltratiekolk ;
                                rdfs:member                  gwsw:Infiltratieleiding .
</pre></div>

# Voorbeelden data-afleiding en data-verificatie

Zie ook het hst met de modelleerprincipes van de GWSW Ontologie:

**Toepassing OWL (data-afleiding)**  
Voor de indeling in soorten, de vaststelling van de taxonomie volgen we het principe dat op basis van objecteigenschappen het objecttype wordt gedefinieerd. Om dat uit te drukken gebruiken we de class expressions in OWL.

**Toepassing SHACL (data-verificatie)**  
Validaties en specificaties die niet onderscheidend zijn voor de classificatie van GWSW concepten beschrijven we met de SHACL taal.

Ter illustratie, beschrijf de situaties met de volgende voorwaarden:

> 1a De klasse "brug" heeft per definitie als deel een "brugdek"  
> 1b Toets of de klasse "brug" als deel een "brugdek" heeft
>
> 2a Een "metalen brug" heeft per definitie als materiaal "staal" of "ijzer"  
> 2b Toets of de klasse "metalen brug" van het materiaal "staal" of "ijzer" is
>
> 3a Een "korte brug" heeft per definitie een lengte tussen 0 en 100  
> 3b Toets of de klasse "korte brug" een lengte tussen 0 en 100 heeft
>
> 4 Toets of bij de eigenschap "hoogte" minimaal 1 maal is geregistreerd hoe de waarde is ingewonnen. Deze metagegevens staan in de klasse "inwinning" met de eigenschappen "wijze van inwinning" en "datum inwinning"

Hierna volgt de inhoud van drie proefbestanden:

Bestand <span class="blue">Proef GWSW 2.0.ttl</span> bevat het datamodel en de dataset  
Bestand <span class="blue">Proef GWSW 2.0 domain.rq</span> bevat de SPARQL query om de inferencing te testen  
Bestand <span class="blue">Proef GWSW 2.0.sh.ttl</span> bevat de SHACL graphs

## Bestand "Proef GWSW 2.0.ttl"

<pre class="file">
@prefix rdf: &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;.
@prefix rdfs:	&lt;http://www.w3.org/2000/01/rdf-schema#&gt;.
@prefix owl:	&lt;http://www.w3.org/2002/07/owl#&gt;.
@prefix sh:	&lt;http://www.w3.org/ns/shacl#&gt;.
@prefix skos:	&lt;http://www.w3.org/2004/02/skos/core#&gt;.
@prefix xsd:	&lt;http://www.w3.org/2001/XMLSchema#&gt;.
@prefix geo:	&lt;http://www.opengis.net/ont/geosparql#&gt;.
@prefix unit:	&lt;http://qudt.org/vocab/unit/&gt;.

@prefix nen2660:	&lt;https://w3id.org/nen2660/def#&gt;.
@prefix gwsw: &lt;http://data.gwsw.nl/2.0/totaal/&gt;.
@prefix ex:   &lt;http://sparql.gwsw.nl/Juinen#&gt; .

# DATAMODEL: modelleerpatroon COMPLEX+

gwsw:Leiding              rdfs:subClassOf     nen2660:PhysicalObject .
gwsw:DiameterLeiding      rdfs:subClassOf     nen2660:QuantityValue ;       
                          rdfs:subClassOf                                   # restricties op klasse-niveau
                          [
                            rdf:type          owl:Restriction ;
                            owl:onProperty    rdf:value ;
                            owl:allValuesFrom xsd:integer ;
                          ] ;
                          rdfs:subClassOf                                   # restricties op klasse-niveau
                          [ 
                            rdf:type          owl:Restriction;
                            owl:onProperty    nen2660:unit ;
                            owl:hasValue      unit:MiliM ;
                          ] .
gwsw:diameterLeiding      rdf:type            owl:ObjectProperty ;          # de attribuut-URI is consequent de range-class-URI, startend met lower-case
                          rdfs:label          "Diameter leiding" ;     
                          skos:definition     "De lengte van de middellijn van de cirkel die de binnenzijde van de leidingdoorsnede beschrijft" ;
                          rdfs:domain         gwsw:Leiding ;                # minimaal 1 domein          
                          rdfs:range          gwsw:DiameterLeiding .        # exact 1 range (OWA: tenminste 1) 
gwsw:Begindatum           rdfs:subClassOf     nen2660:QualityValue ;       
                          rdfs:subClassOf                                   # restricties op klasse-niveau
                          [
                            rdf:type          owl:Restriction ;
                            owl:onProperty    rdf:value ;
                            owl:allValuesFrom xsd:date ;
                          ] .
gwsw:begindatum           rdf:type            owl:ObjectProperty ;          # de attribuut-URI is consequent de range-class-URI, startend met lower-case
                          rdfs:label          "Begindatum" ;               
                          rdfs:domain         nen2660:PhysicalObject ;      # minimaal 1 domein          
                          rdfs:range          gwsw:Begindatum .             # exact 1 range (OWA: tenminste 1) 
gwsw:MateriaalLeidingColl rdf:type            owl:Class ;
                          rdf:type            nen2660:EnumerationType;      # punning: is klasse en wordt hier ook individu
                          owl:oneOf           (gwsw:Beton) .                # individuen
gwsw:Beton                rdf:type            gwsw:MateriaalLeidingColl .   # wordt individu             
gwsw:MateriaalLeiding     rdfs:subClassOf     nen2660:RelationReference ;   # relatie-referentie
                          rdfs:subClassOf                                   # restricties op klasse-niveau
                          [ 
                            rdf:type          owl:Restriction;
                            owl:onProperty    rdf:value ;
                            owl:allValuesFrom gwsw:MateriaalLeidingColl ;
                          ] ; 
                          rdfs:subClassOf                                   # restricties op klasse-niveau
                          [ 
                            rdf:type          owl:Restriction;
                            owl:onProperty    gwsw:inwinning ;
                            owl:maxQualifiedCardinality "1"^^xsd:nonNegativeInteger ;
                          ] . 
gwsw:materiaalLeiding     rdf:type            owl:ObjectProperty ;
                          rdfs:label          "Materiaal leiding" ;         
                          rdfs:domain         gwsw:Leiding ;                # minimaal 1 domein          
                          rdfs:range          gwsw:MateriaalLeiding .       # exact 1 range (OWA: tenminste 1)

# DATASET:

ex:Leiding_1              rdf:type              gwsw:Leiding ;  
                          gwsw:diameterLeiding                                                         
                          [
                            rdf:value           400 ; 
                          ] ;     
                          gwsw:begindatum                                                         
                          [
                            # rdf:type          gwsw:Begindatum ;                         expliciet typeren niet nodig, liever niet (redundant)
                            rdf:value           "2012-05-01"^^xsd:date; 
                          ] ;     
                          gwsw:materiaalLeiding                                         # impliciet gwsw:MateriaalLeiding, heeft meta-data
                          [
                            rdf:value           gwsw:Beton ;
                            gwsw:inwinning                                              # impliciet gwsw:Inwinning
                            [
                              gwsw:datumInwinning                                       # impliciet gwsw:DatumInwinning
                              [
                                rdf:value       "2023-05-11"^^xsd:date ;
                              ]
                            ] ;
                          ] .

# Proef met definierende afleiding:

ex:Object_1               gwsw:diameterLeiding         
                          [         
                            rdf:value                        63 ;
                          ] .         
</pre>

## Bestand "Proef GWSW 2.0 domain.rq"

<pre class="file">
PREFIX rdf: &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;
PREFIX rdfs:	&lt;http://www.w3.org/2000/01/rdf-schema#&gt;
PREFIX owl:	&lt;http://www.w3.org/2002/07/owl#&gt;
PREFIX sh:	&lt;http://www.w3.org/ns/shacl#&gt;
PREFIX skos:	&lt;http://www.w3.org/2004/02/skos/core#&gt;
PREFIX xsd:	&lt;http://www.w3.org/2001/XMLSchema#&gt;
PREFIX geo:	&lt;http://www.opengis.net/ont/geosparql#&gt;

PREFIX nen2660:	&lt;https://w3id.org/nen2660/def#&gt;
PREFIX gwsw: &lt;http://data.gwsw.nl/2.0/totaal/&gt;
PREFIX ex:   &lt;http://sparql.gwsw.nl/Juinen#&gt;

SELECT *
WHERE 
{
  gwsw:begindatum   rdfs:label             ?labDat .
  ?begdat           rdf:type               gwsw:Begindatum . # expliciet
                    gwsw:materiaalLeiding  rdfs:label ?labMat .
  ?sub              gwsw:materiaalLeiding  ?mat .
  ?mat              sesame:directType      ?typMat . # impliciet, wordt afgeleid van range
                    gwsw:diameterLeiding   skos:definition ?defDia .
  ?sub              sesame:directType      ?typSub .
}
</pre>

## Bestand "Proef GWSW 2.0.sh.ttl"

<pre class="file">
WORDT NOG UITGEWERKT
</pre>

## Test: Leid af dat het individu een inspectieput is

Iets is een inspectieput als het minimaal één deksel heeft.
Beschrijf de onderscheidende kenmerken in OWL class expressions:

<pre class="file">
WORDT NOG UITGEWERKT
</pre>

Een OWL-reasoner leidt af dat ex:Inspectieput_1 mogelijk van het type gwsw:Inspectieput is:

<pre class="file">
ex:Inspectieput_1	  nen2660:hasPart			
                    [
                      rdf:type		gwsw:Deksel ;
                    ] ; 
</pre>
