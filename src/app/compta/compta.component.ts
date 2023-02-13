import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


interface User {
  nom: string;
  prenom: string;
  ttc: any;
}
@Component({
  selector: 'app-compta',
  templateUrl: './compta.component.html',
  styleUrls: ['./compta.component.scss']
})

export class ComptaComponent implements OnInit {
  form: FormGroup;
  results: User[] = [];
  listeClass: any[] = [];
  listeSousClass: any[] = [];
  listeChoix1: any[] = [];
  listChoix2: any[] = [];
  listeModeReglement: any[] = [];
  listeNature: any[] = [];
  imageSrc: string = '';
  parentClasse: string = '';
  sousClasse: string = '';
  valueSelect: any[] = [];
  Tva: any = '';
  Mht: any = '';
  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({ 
    });
  }
 

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      ttc:[''],
      // Autres champs
    });

    this.listeClass = [
      {
        id: 0,
        value: 'FACTURE',
      },
      {
        id: 1,
        value: 'BANQUE',
      },
      {
        id: 2,
        value: 'SOCIAL',
      },
      {
        id: 3,
        value: 'FISCAL',
      },
      {
        id: 4,
        value: 'OPERATIONS DIVERS',
      },
      {
        id: 5,
        value: 'AUTRE',
      }
    ]

    this.listeSousClass = [
      {
        id: 0,
        value: 'ACHATS',
      },
      {
        id: 1,
        value: 'VENTES',
      },
      {
        id: 2,
        value: 'PIEDS DE BANQUES',
      },
      {
        id: 3,
        value: 'AUTRES',
      }
    ]

    this.listeChoix1 = [
      {
        id: 0,
        value: 'CLIENT 20%'
      },
      {
        id: 1,
        value: 'CLIENT 10%'
      },
      {
        id: 2,
        value: 'CLIENT 5.5%'
      }
    ]

    this.listChoix2 = [
      {
        id: 0,
        value: '0DIVER',
      },
      {
        id: 1,
        value: '0CARBU',
      },
      {
        id: 2,
        value: '0POSTE',
      },
      {
        id: 3,
        value: '0ORANG',
      },
      {
        id: 4,
        value: '0BOUYG',
      },
      {
        id: 5,
        value: '0CABIN',
      }
    ]

    this.listeModeReglement = [
      {
        id: 0,
        value: 'CHEQUES',
      },
      {
        id: 1,
        value: 'VIREMENT',
      },
      {
        id: 2,
        value: 'PRELEVEMENT',
      },
      {
        id: 3,
        value: 'CB',
      }
    ]

    this.listeNature = [
      {
        value: "201100 - FRAIS DE CONSTITUTION",
      },
      {
        value: "201200 - FRAIS 1ER ETABLISSEMENT",
      },
      {
        value: "201300 - FRAIS D'AUGMENT.CAPITAL",
      },
      {value: "203000	- FRAIS RECHERCHE & DEVELOP"},
      {value: "205000	- CONCESS.BREVETS LICENCES"},
      {value: "206000	- DROIT AU BAIL"},
      {value: "207000	- FONDS COMMERCIAL"},
      {value: "208000	- AUTRES IMMOS.INCORPOREL."},
      {value: "211000	- TERRAINS"},
      {value: "212000	- AGENC./AMENAGMT.TERRAINS"},
      {value: "213100	- CONSTRUCTION BATIMENTS"},
      {value: "213500	- INST.AGENC./CONSTRUCT."},
      {value: "214100	- CONSTR. S/SOL D'AUTRUI"},
      {value: "214500	- AGENC.CONST.SOL AUTRUI"},
      {value: "215000	- MATERIEL ET OUTILLAGE"},
      {value: "215400	- MATERIELS INDISTRIELS"},
      {value: "218100	- INSTALLATIONS AGENCEMENTS"},
      {value: "218200	- MATERIEL DE TRANSPORT"},
      {value: "218300	- MATERIEL DE BUREAU"},
      {value: "218400	- MOBILIER"},
      {value: "218600	- EMBALLAGES RECUPERABLES"},
      {value: "220000	- IMMOBILIS. CONCEDANT"},
      {value: "229000	- APPORT DU CONCEDANT"},
      {value: "231000	- IMMO.CORPOREL. EN COURS"},
      {value: "232000	- IMMO.INCORPOR. EN COURS"},
      {value: "237000	- AVANCES S/IMMO INCORPOREL"},
      {value: "238000	- AVANCES S/IMMO CORPORELLE"},
      {value: "261000	- TITRES DE PARTICIPATION"},
      {value: "262000	- PARTICIP.EVALUEES EQUIVAL"},
      {value: "267180	- CREANCES P.GROUPE (-1 AN)"},
      {value: "267470	- CREANCES PART HS GR.(+1AN"},
      {value: "267480	- CREANCES PART HS GR.(-1AN"},
      {value: "267800	- INT.COURUS S/CREANCE PART"},
      {value: "268100	- CREANCES RATT.SOC.PARTIC."},
      {value: "268800	- INT.COURUS/CRE.SOC.PARTIC"},
      {value: "269700	- VERS.A EFFECT./TITRES+1AN"},
      {value: "269800	- VERS.A EFFECT./TITRES-1AN"},
      {value: "271000	- AUTRES TITRES IMMOBILISES"},
      {value: "274100	- PRETS PARTICIPATIFS"},
      {value: "274370	- PRETS AU PERSONNEL (+1 AN"},
      {value: "274380	- PRETS AU PERSONNEL (-1 an"},
      {value: "274870	- AUTRES PRETS (+ 1 AN)"},
      {value: "274880	- AUTRES PRETS (- 1 AN)"},
      {value: "275000	- DEPOTS & CAUTIONNEMENTS"},
      {value: "276800	- INT.COUR.S/AUTRES IMMO FI"},
      {value: "401000	- FOURNISSEURS"},
      {value: "404000	- FOURNISSEURS IMMO. (CT)"},
      {value: "411000	- CLIENT B/S"},
      {value: "445510	- TVA A DECAISSER"},
      {value: "445580	- TAXES ASSIM.TVA A DECAIS."},
      {value: "445620	- TVA DEDUCTIBLE SUR IMMO"},
      {value: "445660	- TVA DEDUCTIBLE SUR ABS"},
      {value: "445662	- TVA DEDUCT.S/FRAIS GENER."},
      {value: "445663	- TVA S ACQUISITION CEE"},
      {value: "445670	- CREDIT DE TVA"},
      {value: "445680	- TAXES DEDUCT.ASSIMIL.TVA"},
      {value: "445710	- TVA COLLECTEE 10%"},
      {value: "445711	- TVA COLLECTEE 20%"},
      {value: "445715	- TVA COLLECTEE 5,5%"},
      {value: "455000	- COMPTE COURANT ASSOCIE"},
      {value: "467000	- DEBITEURS CREDIT.DIVERS"},
      {value: "601000	- ACHATS MATIERES PREMIERES"},
      {value: "601100	- ACHATS MATIERE A"},
      {value: "601200	- ACHATS MATIERE B"},
      {value: "602100	- ACHATS MATIER.CONSOMMABLE"},
      {value: "602200	- ACHATS FOURNIT.CONSOMMAB."},
      {value: "602600	- ACHATS D'EMBALLAGES"},
      {value: "603100	- VARIAT.STOCKS MAT.PREM."},
      {value: "603200	- VARIAT.STOCKS AUTRES APPR"},
      {value: "603700	- VARIAT.STOCK MARCHANDISES"},
      {value: "604000	- ACHATS ETUDES PRESTATIONS SERVICE"},
      {value: "604100	- FORMATIONS"},
      {value: "605000	- ACH.MATERIEL ET TRAVAUX"},
      {value: "606110	- EDF"},
      {value: "606120	- EAU"},
      {value: "606130	- FOURN.NON STOCK.(GAZ)"},
      {value: "606140	- CARBURANT"},
      {value: "606141	- CARBURANT TVA ND 20% DIESEL ESSENCE"},
      {value: "606142	- CARBURANT - TVA ND 40% ESSENCE"},
      {value: "606150	- FOURN.NON STOCK.(COMB.CHA"},
      {value: "606300	- ACHATS FOURN.ENTRET.PETIT EQUIPEMENT"},
      {value: "606400	- ACHATS FOURNIT.ADMINISTRATIVES"},
      {value: "607000	- ACHATS DE MARCHANDISES"},
      {value: "608100	- FRAIS ACCES/ACHAT MAT 1ø"},
      {value: "608200	- FRAIS ACCES/AUTRES APPRO."},
      {value: "608400	- FRAIS ACCES/ETUDES &SERV."},
      {value: "608500	- FRAIS ACCES/ACH.MATERIEL."},
      {value: "608600	- FRAIS ACCES/ACH.MAT.FOUR."},
      {value: "608700	- FRAIS ACCES/ACH.MARCHAND."},
      {value: "609100	- RRRO/ACH. MATIERES 1ø"},
      {value: "609200	- RRRO/ACH. AUTRES APPRO."},
      {value: "609400	- RRRO/ACH. ETUDES & PREST."},
      {value: "609500	- RRRO/ACH. MATERIEL EQUIP."},
      {value: "609600	- RRRO/ACH. APPRO.NON STOCK"},
      {value: "609700	- RRRO/ACH. MARCHANDISES"},
      {value: "609800	- RRRO/ACH. NON AFFECTES"},
      {value: "611000	- SOUS-TRAITANCE GENERALE"},
      {value: "612100	- LEASING PHOTOCOPIEUR"},
      {value: "612200	- CREDIT-BAIL MOBILIER"},
      {value: "612500	- CREDIT-BAIL IMMOBILIER"},
      {value: "613200	- LOCATIONS IMMOBILIERES"},
      {value: "613500	- LOCATIONS MOBILIERES"},
      {value: "614000	- CHARGES LOCATIVE/COPROPRI"},
      {value: "615000	- ENTRETIEN REPARATIONS"},
      {value: "615100	- ENTRETIEN IMMOBILIER"},
      {value: "615200	- ENTRETIEN IMMOBILIER"},
      {value: "615510	- ENTRETIEN VEHICULE"},
      {value: "615520	- ENTRETIEN MAT.TRANSPORT"},
      {value: "615600	- MAINTENANCE"},
      {value: "616000	- ASSURANCES"},
      {value: "616001	- ASSURANCE BNP"},
      {value: "616010	- SEGAP"},
      {value: "616200	- ASSURANCE EMPRUNT"},
      {value: "618100	- DOCUMENTATION GENERALE"},
      {value: "618300	- DOCUMENTATION TECHNIQUE"},
      {value: "618500	- FRAIS DE COLLOQUES - SEMINAIRES"},
      {value: "621000	- PERSONNEL EXTE.A L'ENTREP"},
      {value: "622100	- COMMISSIONS ET COURTAGES"},
      {value: "622200	- COMMIS&COURT.S/VENTES"},
      {value: "622280	- COM.&COURT/VTES RETROCESS"},
      {value: "622400	- REMUNERATIONS/TRANSITAIRE"},
      {value: "622600	- HONORAIRES"},
      {value: "622680	- RETROCESSION HONORAIRES"},
      {value: "622700	- FRAIS ACTES & CONTENTIEUX"},
      {value: "622800	- HONORAIRES DIVERS"},
      {value: "623000	- PUBLICITE PUBLICATION"},
      {value: "623100	- ANNONCES ET INSERTIONS"},
      {value: "623101	- PRESSIMMO ON LINE"},
      {value: "623102	- BON COIN"},
      {value: "623103	- IBL GRAPHIQUE"},
      {value: "623104	- MARKETING IMMOBILIER"},
      {value: "623105	- EXPOSIO PHOTO"},
      {value: "623106	- IMMO FACILE"},
      {value: "623107	- DIGITAL VIRGOMEDIA"},
      {value: "623108	- EUROSUD"},
      {value: "623109	- BIEN ICI"},
      {value: "623110	- PARU VENDU"},
      {value: "623120	- MEILLEURS AGENTS PRO"},
      {value: "623121	- COMPARE AGENCES"},
      {value: "623122	- SE LOGER"},
      {value: "623123	- IMMOPAD"},
      {value: "623124	- VITRINE MEDIA"},
      {value: "623125	- SOLOCAL"},
      {value: "623300	- FOIRES ET EXPOSITIONS"},
      {value: "623400	- CADEAUX A LA CLIENTELE"},
      {value: "623600	- CATALOGUES ET IMPRIMES"},
      {value: "623800	- POURBOIRES DONS COURANTS"},
      {value: "624100	- TRANSPORTS S/ACHATS"},
      {value: "624200	- TRANSPORTS S/VENTES"},
      {value: "624800	- TRANSPORTS DIVERS"},
      {value: "625001	- INDEMNITES KILOMETRIQUE"},
      {value: "625100	- VOYAGES ET DEPLACEMENTS"},
      {value: "625600	- MISSIONS"},
      {value: "625700	- RESTAURANTS"},
      {value: "625710	- RECEPTION CLIENTS"},
      {value: "626000	- FRAIS POSTAUX"},
      {value: "626100	- FRAIS POSTAUX"},
      {value: "626400	- BOUYGUES"},
      {value: "626410	- ORANGE"},
      {value: "626420	- VIRGIN MOBILE"},
      {value: "626700	- SFR"},
      {value: "626800	- ILIAD TELECOM"},
      {value: "626900	- FREE"},
      {value: "627000	- SERVICES BANCAIRES"},
      {value: "627200	- COMMISS.S/EMISSION EMPR."},
      {value: "627500	- SERVICES BANCAIRES"},
      {value: "627800	- COMMISSIONS CARTE BLEUE"},
      {value: "628100	- CONCOURS DIVERS COTISATIONS"},
      {value: "628400	- FRAIS DE RECRUT.PERSONNEL"},
      {value: "631200	- IMPOTS TAXE APPRENTISSAGE"},
      {value: "631300	- PART.FORM.CONTINUE(TRESOR"},
      {value: "633100	- VERSEMENT DE TRANSPORT"},
      {value: "633200	- ALLOCATION LOGEMENT"},
      {value: "633300	- IMPOTS.PARTICIP EMPLOYEUR FORMAT CONTINU"},
      {value: "633400	- PARTICIP.EFFORT CONSTRUCT"},
      {value: "633500	- VERSENT.LIBE.TAXE APPRENT"},
      {value: "634600	- TAXE INTER.PROD PETROLIER"},
      {value: "635110	- CFE"},
      {value: "635120	- TAXES FONCIERES"},
      {value: "635140	- TVS"},
      {value: "635300	- IMPOTS INDIRECTS"},
      {value: "635400	- DROITS D'ENREGIST.&TIMBRE"},
      {value: "635800	- AUTRES DROITS"},
      {value: "637100	- CONTRIB.SOCIALE SOLIDAR."},
      {value: "637800	- IMPOTS TAXES DIVERSES"},
      {value: "637810	- CSG DEDUCTIBLE"},
      {value: "637820	- CSG NON DEDUCTIBLE"},
      {value: "641100	- SALAIRES BRUTS"},
      {value: "641150	- SALAIRES ADMINIS.&GERANTS"},
      {value: "641200	- CONGES PAYES"},
      {value: "641300	- PERS PRIMES ET GRATIFICATIONS"},
      {value: "641400	- INDEM.ET AVANTAGES DIVERS"},
      {value: "644000	- REMUNERATION GERANT"},
      {value: "645000	- SECURITE SOCIALE PREVOYAN"},
      {value: "645100	- PERS COTISATIONS A L'URSSAF"},
      {value: "645200	- CHARGES SUR CONGES PAYES"},
      {value: "645300	- RETRAITE"},
      {value: "645310	- COTIS.RETRAITE (CADRES)"},
      {value: "645320	- COTIS.RETRAITE(SALARIES)"},
      {value: "645400	- COTIS. AUX ASSEDIC"},
      {value: "645800	- AUTRES CHRGES DE PERSONNEL"},
      {value: "646000	- COTIS.SOC.PERS.EXPLOITANT"},
      {value: "646100	- RSI"},
      {value: "646400	- MAAF SANTE"},
      {value: "646410	- BNP RETRAITE"},
      {value: "647100	- ABONDEMENT"},
      {value: "647500	- PERS MEDECINE DU TRAVAIL PHARMACIE"},
      {value: "648000	- AUTRES CHARGES DE PERS."},
      {value: "648001	- AUTRES CHARGES DE PERSONNEL"},
      {value: "651000	- SOLVIMO"},
      {value: "651100	- SACEM"},
      {value: "653000	- JETONS DE PRESENCE"},
      {value: "654000	- PERTES S/CREANCES IRREC."},
      {value: "655000	- QUOTES-PARTS RESULT./OP.C"},
      {value: "658000	- CHARGES DIV.GESTION COURANTE"},
      {value: "661100	- INTERETS EMPRUNTS ET DETTES"},
      {value: "661160	- INTERETS EMPRUNTS &DETTES"},
      {value: "661170	- INT.DETTES PARTICIPATIONS"},
      {value: "661500	- INTERETS COMPTES COURANTS"},
      {value: "661600	- INTERETS BANCAIRES &S/ESC"},
      {value: "661700	- INTERETS OBLIGAT.CAUTION."},
      {value: "661800	- INTERETS AUTRES DETTES"},
      {value: "664000	- PERTES S/CREAN.PARTICIP."},
      {value: "665000	- ESCOMPTES ACCORDES"},
      {value: "666000	- PERTES DE CHANGE"},
      {value: "667000	- CHARGES S/CESS.VAL.PLACEM"},
      {value: "668000	- AUTRES CHARGES FINANC."},
      {value: "668800	- Compte d'arrondi"},
      {value: "671000	- PENALITES AMENDES"},
      {value: "671200	- PENALITES ET AMENDES"},
      {value: "671300	- DONS LIBERALITES"},
      {value: "671400	- CREANCES DEV.IRRE.DS EXER"},
      {value: "671500	- CHARGES EXCEPT.SUBV.ACCOR"},
      {value: "671700	- RAPPELS D'IMPOTS NON IS."},
      {value: "671800	- AUTRES CHAR.EXCEP.GESTION"},
      {value: "672000	- CHARGES DIV.COUR.S/EX.ANT"},
      {value: "675000	- VAL.NET.COMPT.ELEM.CEDES"},
      {value: "675100	- VALEUR DES IMMOS VENDUES"},
      {value: "675200	- VNC DES IMMOS VENDUES"},
      {value: "678800	- CHARGES EXCEP.DIVERSES"},
      {value: "681110	- DOT.AMORT.IMMO.INCORP."},
      {value: "681120	- DOTATIONS AUX AMORTISSEMENTS"},
      {value: "681200	- DOT.AMORT.CHARGE.EX.A REP"},
      {value: "681500	- DOT.PROV.CHAR.EX.(CONG.PA"},
      {value: "681610	- DOT.PROV.DEPRE.IMMO.INCOR"},
      {value: "681620	- DOT.PROV.DEPRE.IMMO.CORP."},
      {value: "681730	- DOT.PROV.STOCKS &EN-COURS"},
      {value: "681740	- DOT.PROV.DEPRE.CREANCES"},
      {value: "686400	- DOT.PR.RISQ.PART.EVAL.EQU"},
      {value: "686500	- DOT.PROV.RISQUE (CHANGE)"},
      {value: "686620	- DOT.PROV.IMMO.FINANCIERES"},
      {value: "686630	- DOT.PR.DEPR.PART.EVAL.EQU"},
      {value: "686650	- DOT.PROV.VAL.PLACEMENT"},
      {value: "687250	- DOT.AMORT.DEROGATOIRES"},
      {value: "687300	- DOT.PROV.REGLEMENTEES"},
      {value: "687400	- DOT.AUTRES PROV.REGLEM."},
      {value: "687500	- DOT.PROV.RISQ.& CHAR.EXCP"},
      {value: "687600	- DOT.PROV.DEPREC.EXCEPT."},
      {value: "689000	- DOT.PROV.POUR IMPOTS"},
      {value: "691000	- PARTICIPATION SALARIES"},
      {value: "695000	- IMPOTS S/LES BENEFICES"},
      {value: "697000	- IMP.FORFAIT.ANNUELLE.SOC."},
      {value: "698100	- INTEGRATION FISCALE CHARG"},
      {value: "698900	- INTEGRATION FISCALE PROD."},
      {value: "699000	- PROD. REPORT ARRIERE DEF."},
      {value: "699500	- PROD.CRED.IMPOT RECHERCHE"},
      {value: "699600	- PROD.CRED.IMPOT FORMATION"},
      {value: "701000	- VENTES DE PRODUITS FINIS"},
      {value: "701100	- VENTES PRODUITS FINIS A"},
      {value: "701200	- VENTES PRODUITS FINIS B"},
      {value: "701900	- VENTES PROD.FINIS  EXPORT"},
      {value: "702000	- VENTES PROD.INTERMEDIAIRE"},
      {value: "702900	- VENTES PROD.INTERM.EXPORT"},
      {value: "703000	- VENTES PRODUITS RESIDUELS"},
      {value: "703900	- VENTES PROD.RESIDU.EXPORT"},
      {value: "704000	- VENTES DE TRAVAUX"},
      {value: "704900	- VENTES DE TRAVAUX  EXPORT"},
      {value: "705000	- ETUDES"},
      {value: "705900	- ETUDES EXPORT"},
      {value: "706000	- HONORAIRES TRANSACTION"},
      {value: "706100	- HONORAIRES LOCATION"},
      {value: "706200	- COMMISSIONS"},
      {value: "706300	- HONORAIRES GESTION"},
      {value: "706400	- SOLVIMO GESTION"},
      {value: "706900	- PREST.DE SERVICES  EXPORT"},
      {value: "707000	- VENTES DE MARCHANDISES"},
      {value: "707080	- RETROCES.A PRIX COUTANT"},
      {value: "707900	- VENTES DE MARCH.  EXPORT"},
      {value: "708200	- COMMISSIONS & COURTAGES"},
      {value: "708290	- COMMISSIONS & COURTAG.EXP"},
      {value: "708300	- LOCATIONS DIVERSES"},
      {value: "708390	- LOCATIONS DIVERSES EXPORT"},
      {value: "708400	- MISE A DISPOS.PERSON.FACT"},
      {value: "708500	- PORTS &FRAIS FACT"},
      {value: "708590	- PORTS &FRAIS FACTURES EXP"},
      {value: "708800	- AUTRES PROD.ACTI.ANNEXES"},
      {value: "708890	- AUTRES PROD.ACTI.ANNEX.EX"},
      {value: "709100	- RRR S/PROD.FINIS (FRANCE)"},
      {value: "709190	- RRR S/PROD.FINIS (EXPORT)"},
      {value: "709200	- RRR S/PROD.INTERM(FRANCE)"},
      {value: "709290	- RRR S/PROD.INTERM(EXPORT)"},
      {value: "709400	- RRR S/TRAVAUX (FRANCE)"},
      {value: "709490	- RRR S/TRAVAUX (EXPORT)"},
      {value: "709500	- RRR S/ETUDES  (FRANCE)"},
      {value: "709590	- RRR S/ETUDES  (EXPORT)"},
      {value: "709600	- RRR S/PREST.SERV.(FRANCE"},
      {value: "709690	- RRR S/PREST.SERV.(EXPORT)"},
      {value: "709700	- RRR S/MARCHANDISES(FRANCE"},
      {value: "709790	- RRR S/MARCHANDISES(EXPORT"},
      {value: "709800	- RRR S/PROD.ACTIVIT.ANNEXE"},
      {value: "709890	- RRR S/PROD.ACTIVIT.AN.EXP"},
      {value: "713300	- VARIAT.EN-COURS PROD.BIEN"},
      {value: "713400	- VARIAT.EN-COURS PROD.SERV"},
      {value: "713500	- VARIAT.STOCKS PROD.FINIS"},
      {value: "720000	- PRODUCTION IMMOBILISEE"},
      {value: "730000	- PROD.NETS PARTIEL.OP.LT."},
      {value: "740000	- SUBVENTIONS D'EXPLOITAT."},
      {value: "751000	- REDEVANCES P.BREVETS LIC."},
      {value: "752000	- REV.IMMEUB.NON AFF.A EXPL"},
      {value: "755000	- QUOTES-PARTS RESULT./OP.C"},
      {value: "758000	- PRODUITS DIV.GESTION COURANTE"},
      {value: "761000	- PRODUITS DE PARTICIPATION"},
      {value: "761001	- INTERET SUR DAT"},
      {value: "762000	- PROD.DES AUTRES IMMO.FIN"},
      {value: "763000	- REVENUS DES AUTRES CREANC"},
      {value: "764000	- REV.DES VALEURS DE PLACEM"},
      {value: "765000	- ESCOMPTES OBTENUS"},
      {value: "766000	- GAINS DE CHANGE"},
      {value: "767000	- PRODUIT S/CESS.VAL.PLACEM"},
      {value: "768000	- AUTRES PROD.FINANCIERS"},
      {value: "771400	- RENTREES S/CREAN.AMORTIES"},
      {value: "771500	- SUBVENTIONS D'EQUILIBRE"},
      {value: "771700	- DEGREV.D'IMPOTS NON IS."},
      {value: "771800	- AUTRES PROD.EXCEP.GESTION"},
      {value: "772000	- PROD.DIV.COUR.S/EX.ANTE."},
      {value: "775000	- PRODUITS CESS ELEM.CEDES"},
      {value: "777000	- QUOTE-PART SUBVENT.INVEST"},
      {value: "778800	- PRODUITS EXCEPT.DIVERS"},
      {value: "781110	- REP/AMORT.IMMOB.INCORP."},
      {value: "781120	- REP/AMORT.IMMOB.CORPOR."},
      {value: "781500	- REP/PROV. RISQ.& CH.EXPL."},
      {value: "781610	- REP/PROV.DEPREC.IMMO.INC."},
      {value: "781620	- REP/PROV.DEPREC.IMMO.CORP"},
      {value: "781730	- REP/PROV.DEPREC.STOCKS"},
      {value: "781740	- REP/PROV.DEPREC.CREANCES"},
      {value: "786400	- REP/PR.RISQ.PART.EVAL.EQU"},
      {value: "786500	- REP.PROV.RISQUE (CHANGE)"},
      {value: "786620	- REP.PROV.IMMO.FINANCIERES"},
      {value: "786630	- REP.PR.DEPR.PART.EVAL.EQU"},
      {value: "786650	- REP.PROV.VAL.PLACEMENT"},
      {value: "787250	- REP/PROV.REG.AMORT.DEROG"},
      {value: "787260	- REP/PROV.REG.SPECIAL REEV"},
      {value: "787270	- REP/PROV.REG.PL-VAL.REINV"},
      {value: "787300	- REP/PROV.REGLEM.(STOCKS)"},
      {value: "787400	- REP/AUTRES PROV.REGLEM."},
      {value: "787500	- REP/PROV.RISQ.& CH.EXCEP."},
      {value: "787600	- REP/PROV.DEPRECIATION EXC"},
      {value: "789000	- REP/PROV.POUR IMPOTS"},
      {value: "791000	- TRANSF.CHARGES D'EXPLOIT."},
      {value: "791100	- TRANSFERT DE CHARGES TVA"},
      {value: "796000	- TRANSF.CHARGES FINANC."},
      {value: "797000	- TRANF.CHARGES EXCEPTION."}
    ]
  }

  // submitForm() {
  //   //@ts-ignore
  //   this.results.push(this.form.value);
  //   console.log(this.results);
  //   this.form.reset();
  // }


  displayImage(event: Event) {
    console.log(event);
    const reader = new FileReader();
    const files = (event?.target as HTMLInputElement).files;
    console.log(files);
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        this.imageSrc = reader.result as string;
      };
    }

  }

  checkValClass(){
    if(this.parentClasse == "FACTURE" && this.sousClasse == "VENTES"){
      this.valueSelect = this.listeChoix1;
    }else if(this.parentClasse == "FACTURE" && this.sousClasse == "ACHATS"){
      this.valueSelect = this.listChoix2;
    }else{
      this.valueSelect = [
        {
          value: 'AUTRE',
        }
      ];
    }
  }

  calculeCompta(val: any){

    if(val == "CLIENT 20%"){
      this.Tva = (this.form.get('ttc')?.value/(1.2))*(0.2);
      this.Mht = (this.form.get('ttc')?.value/this.Tva)
    }
     if(val == "CLIENT 10%"){
      this.Tva = (this.form.get('ttc')?.value/(1.1))*(0.1);
      this.Mht = (this.form.get('ttc')?.value/this.Tva)
  
    }
    if(val == "CLIENT 5.5%"){
      this.Tva = (this.form.get('ttc')?.value/(1.055))*(0.055);
      this.Mht = (this.form.get('ttc')?.value/this.Tva)
  
    }
    console.log("tva",this.Tva);
    console.log("Mht",this.Mht); 
  }

}
