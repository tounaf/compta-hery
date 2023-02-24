import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from '../excel.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


interface User {
  ttc: any;
  parentClasse: string;
  sousClasse: string;
  sousClasse2: string;
  compte: string;
  date: any;
  date2: any;
  fileName: any;
  fournisseur: any;
  achat: any;
  vente: any;
  veTtc: any;
  acTtc: any;
  nature: any;
  TauxTva: any;
  TauxTva2: any;
  veCredit1: any;
  veCredit2: any;
  veDebit1: any;
  veDebit2: any;
  acCredit1: any;
  acCredit2: any;
  acDebit1: any;
  acDebit2: any;
  classe6: any;
  reglement: any;
  AutreInfo: any;
  numFac: any;
  fournisseur2: any;
  fileName2: any;
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
  compte = '';
  date = '';
  fileName = '';
  fournisseur = '';
  nature: any = '';
  valueTva: any[] = [];
  reglement: any[] = [];
  AutreInfo: any[] = [];
  numFac = '';
  indexImage: any = '';
  listImage: any = '';
  fournisseur2: any = '';
  fileName2: any = '';

  images: string[] = [];
  selectedImage: string = '';
  currentIndex = 0;
  pdfSrc: any = '';

  currentVeTtc = ''

  zoomValue: number = 1;
  newLists: User[] = [];
  rotation: number = 0;
  thumbPdfs: string[] = [];
  thumbImages: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.form = new FormGroup({
    });
  }

  ngOnInit(): void {
    this.router.navigateByUrl('compta');
    this.form = this.formBuilder.group({
      ttc: [''],
      parentClasse: [''],
      sousClasse: [''],
      sousClasse2: [''],
      compte: [''],
      date: [''],
      date2: [''],
      fileName: [''],
      fournisseur: [''],
      nature: [''],
      achat: [''],
      vente: [''],
      veTtc: [''],
      acTtc: [''],
      TauxTva: [''],
      TauxTva2: [''],
      veCredit1: [''],
      veCredit2: [''],
      veDebit1: [''],
      veDebit2: [''],
      acCredit1: [''],
      acCredit2: [''],
      acDebit1: [''],
      acDebit2: [''],
      classe6: [''],
      reglement: [''],
      AutreInfo: [''],
      numFac: [''],
      fournisseur2: [''],
      fileName2: [''],
      // Autres champs
    });


    // const pw = this.sessionStorage.retrieve('password');


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
      },
      {
        id: 3,
        value: 'CLIENT 0%'
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
      { numero: "201100", value: "FRAIS DE CONSTITUTION" },
      { numero: "201200", value: "FRAIS 1ER ETABLISSEMENT" },
      { numero: "201300", value: "FRAIS D'AUGMENT.CAPITAL" },
      { numero: "203000", value: "FRAIS RECHERCHE & DEVELOP" },
      { numero: "205000", value: "CONCESS.BREVETS LICENCES" },
      { numero: "206000", value: "DROIT AU BAIL" },
      { numero: "207000", value: "FONDS COMMERCIAL" },
      { numero: "208000", value: "AUTRES IMMOS.INCORPOREL." },
      { numero: "211000", value: "TERRAINS" },
      { numero: "212000", value: "AGENC./AMENAGMT.TERRAINS" },
      { numero: "213100", value: "CONSTRUCTION BATIMENTS" },
      { numero: "213500", value: "INST.AGENC./CONSTRUCT." },
      { numero: "214100", value: "CONSTR. S/SOL D'AUTRUI" },
      { numero: "214500", value: "AGENC.CONST.SOL AUTRUI" },
      { numero: "215000", value: "MATERIEL ET OUTILLAGE" },
      { numero: "215400", value: "MATERIELS INDISTRIELS" },
      { numero: "218100", value: "INSTALLATIONS AGENCEMENTS" },
      { numero: "218200", value: "MATERIEL DE TRANSPORT" },
      { numero: "218300", value: "MATERIEL DE BUREAU" },
      { numero: "218400", value: "MOBILIER" },
      { numero: "218600", value: "EMBALLAGES RECUPERABLES" },
      { numero: "220000", value: "IMMOBILIS. CONCEDANT" },
      { numero: "229000", value: "APPORT DU CONCEDANT" },
      { numero: "231000", value: "IMMO.CORPOREL. EN COURS" },
      { numero: "232000", value: "IMMO.INCORPOR. EN COURS" },
      { numero: "237000", value: "AVANCES S/IMMO INCORPOREL" },
      { numero: "238000", value: "AVANCES S/IMMO CORPORELLE" },
      { numero: "261000", value: "TITRES DE PARTICIPATION" },
      { numero: "262000", value: "PARTICIP.EVALUEES EQUIVAL" },
      { numero: "267180", value: "CREANCES P.GROUPE (-1 AN)" },
      { numero: "267470", value: "CREANCES PART HS GR.(+1AN" },
      { numero: "267480", value: "CREANCES PART HS GR.(-1AN" },
      { numero: "267800", value: "INT.COURUS S/CREANCE PART" },
      { numero: "268100", value: "CREANCES RATT.SOC.PARTIC." },
      { numero: "268800", value: "INT.COURUS/CRE.SOC.PARTIC" },
      { numero: "269700", value: "VERS.A EFFECT./TITRES+1AN" },
      { numero: "269800", value: "VERS.A EFFECT./TITRES-1AN" },
      { numero: "271000", value: "AUTRES TITRES IMMOBILISES" },
      { numero: "274100", value: "PRETS PARTICIPATIFS" },
      { numero: "274370", value: "PRETS AU PERSONNEL (+1 AN" },
      { numero: "274380", value: "PRETS AU PERSONNEL (-1 an" },
      { numero: "274870", value: "AUTRES PRETS (+ 1 AN)" },
      { numero: "274880", value: "AUTRES PRETS (- 1 AN)" },
      { numero: "275000", value: "DEPOTS & CAUTIONNEMENTS" },
      { numero: "276800", value: "INT.COUR.S/AUTRES IMMO FI" },
      { numero: "401000", value: "FOURNISSEURS" },
      { numero: "404000", value: "FOURNISSEURS IMMO. (CT)" },
      { numero: "411000", value: "CLIENT B/S" },
      { numero: "445510", value: "TVA A DECAISSER" },
      { numero: "445580", value: "TAXES ASSIM.TVA A DECAIS." },
      { numero: "445620", value: "TVA DEDUCTIBLE SUR IMMO" },
      { numero: "445660", value: "TVA DEDUCTIBLE SUR ABS" },
      { numero: "445662", value: "TVA DEDUCT.S/FRAIS GENER." },
      { numero: "445663", value: "TVA S ACQUISITION CEE" },
      { numero: "445670", value: "CREDIT DE TVA" },
      { numero: "445680", value: "TAXES DEDUCT.ASSIMIL.TVA" },
      { numero: "445710", value: "TVA COLLECTEE 10%" },
      { numero: "445711", value: "TVA COLLECTEE 20%" },
      { numero: "445715", value: "TVA COLLECTEE 5,5%" },
      { numero: "455000", value: "COMPTE COURANT ASSOCIE" },
      { numero: "467000", value: "DEBITEURS CREDIT.DIVERS" },
      { numero: "601000", value: "ACHATS MATIERES PREMIERES" },
      { numero: "601100", value: "ACHATS MATIERE A" },
      { numero: "601200", value: "ACHATS MATIERE B" },
      { numero: "602100", value: "ACHATS MATIER.CONSOMMABLE" },
      { numero: "602200", value: "ACHATS FOURNIT.CONSOMMAB." },
      { numero: "602600", value: "ACHATS D'EMBALLAGES" },
      { numero: "603100", value: "VARIAT.STOCKS MAT.PREM." },
      { numero: "603200", value: "VARIAT.STOCKS AUTRES APPR" },
      { numero: "603700", value: "VARIAT.STOCK MARCHANDISES" },
      { numero: "604000", value: "ACHATS ETUDES PRESTATIONS SERVICE" },
      { numero: "604100", value: "FORMATIONS" },
      { numero: "605000", value: "ACH.MATERIEL ET TRAVAUX" },
      { numero: "606110", value: "EDF" },
      { numero: "606120", value: "EAU" },
      { numero: "606130", value: "FOURN.NON STOCK.(GAZ)" },
      { numero: "606140", value: "CARBURANT" },
      { numero: "606141", value: "CARBURANT TVA ND 20% DIESEL ESSENCE" },
      { numero: "606142", value: "CARBURANT - TVA ND 40% ESSENCE" },
      { numero: "606150", value: "FOURN.NON STOCK.(COMB.CHA" },
      { numero: "606300", value: "ACHATS FOURN.ENTRET.PETIT EQUIPEMENT" },
      { numero: "606400", value: "ACHATS FOURNIT.ADMINISTRATIVES" },
      { numero: "607000", value: "ACHATS DE MARCHANDISES" },
      { numero: "608100", value: "FRAIS ACCES/ACHAT MAT 1ø" },
      { numero: "608200", value: "FRAIS ACCES/AUTRES APPRO." },
      { numero: "608400", value: "FRAIS ACCES/ETUDES &SERV." },
      { numero: "608500", value: "FRAIS ACCES/ACH.MATERIEL." },
      { numero: "608600", value: "FRAIS ACCES/ACH.MAT.FOUR." },
      { numero: "608700", value: "FRAIS ACCES/ACH.MARCHAND." },
      { numero: "609100", value: "RRRO/ACH. MATIERES 1ø" },
      { numero: "609200", value: "RRRO/ACH. AUTRES APPRO." },
      { numero: "609400", value: "RRRO/ACH. ETUDES & PREST." },
      { numero: "609500", value: "RRRO/ACH. MATERIEL EQUIP." },
      { numero: "609600", value: "RRRO/ACH. APPRO.NON STOCK" },
      { numero: "609700", value: "RRRO/ACH. MARCHANDISES" },
      { numero: "609800", value: "RRRO/ACH. NON AFFECTES" },
      { numero: "611000", value: "SOUS-TRAITANCE GENERALE" },
      { numero: "612100", value: "LEASING PHOTOCOPIEUR" },
      { numero: "612200", value: "CREDIT-BAIL MOBILIER" },
      { numero: "612500", value: "CREDIT-BAIL IMMOBILIER" },
      { numero: "613200", value: "LOCATIONS IMMOBILIERES" },
      { numero: "613500", value: "LOCATIONS MOBILIERES" },
      { numero: "614000", value: "CHARGES LOCATIVE/COPROPRI" },
      { numero: "615000", value: "ENTRETIEN REPARATIONS" },
      { numero: "615100", value: "ENTRETIEN IMMOBILIER" },
      { numero: "615200", value: "ENTRETIEN IMMOBILIER" },
      { numero: "615510", value: "ENTRETIEN VEHICULE" },
      { numero: "615520", value: "ENTRETIEN MAT.TRANSPORT" },
      { numero: "615600", value: "MAINTENANCE" },
      { numero: "616000", value: "ASSURANCES" },
      { numero: "616001", value: "ASSURANCE BNP" },
      { numero: "616010", value: "SEGAP" },
      { numero: "616200", value: "ASSURANCE EMPRUNT" },
      { numero: "618100", value: "DOCUMENTATION GENERALE" },
      { numero: "618300", value: "DOCUMENTATION TECHNIQUE" },
      { numero: "618500", value: "FRAIS DE COLLOQUES - SEMINAIRES" },
      { numero: "621000", value: "PERSONNEL EXTE.A L'ENTREP" },
      { numero: "622100", value: "COMMISSIONS ET COURTAGES" },
      { numero: "622200", value: "COMMIS&COURT.S/VENTES" },
      { numero: "622280", value: "COM.&COURT/VTES RETROCESS" },
      { numero: "622400", value: "REMUNERATIONS/TRANSITAIRE" },
      { numero: "622600", value: "HONORAIRES" },
      { numero: "622680", value: "RETROCESSION HONORAIRES" },
      { numero: "622700", value: "FRAIS ACTES & CONTENTIEUX" },
      { numero: "622800", value: "HONORAIRES DIVERS" },
      { numero: "623000", value: "PUBLICITE PUBLICATION" },
      { numero: "623100", value: "ANNONCES ET INSERTIONS" },
      { numero: "623101", value: "PRESSIMMO ON LINE" },
      { numero: "623102", value: "BON COIN" },
      { numero: "623103", value: "IBL GRAPHIQUE" },
      { numero: "623104", value: "MARKETING IMMOBILIER" },
      { numero: "623105", value: "EXPOSIO PHOTO" },
      { numero: "623106", value: "IMMO FACILE" },
      { numero: "623107", value: "DIGITAL VIRGOMEDIA" },
      { numero: "623108", value: "EUROSUD" },
      { numero: "623109", value: "BIEN ICI" },
      { numero: "623110", value: "PARU VENDU" },
      { numero: "623120", value: "MEILLEURS AGENTS PRO" },
      { numero: "623121", value: "COMPARE AGENCES" },
      { numero: "623122", value: "SE LOGER" },
      { numero: "623123", value: "IMMOPAD" },
      { numero: "623124", value: "VITRINE MEDIA" },
      { numero: "623125", value: "SOLOCAL" },
      { numero: "623300", value: "FOIRES ET EXPOSITIONS" },
      { numero: "623400", value: "CADEAUX A LA CLIENTELE" },
      { numero: "623600", value: "CATALOGUES ET IMPRIMES" },
      { numero: "623800", value: "POURBOIRES DONS COURANTS" },
      { numero: "624100", value: "TRANSPORTS S/ACHATS" },
      { numero: "624200", value: "TRANSPORTS S/VENTES" },
      { numero: "624800", value: "TRANSPORTS DIVERS" },
      { numero: "625001", value: "INDEMNITES KILOMETRIQUE" },
      { numero: "625100", value: "VOYAGES ET DEPLACEMENTS" },
      { numero: "625600", value: "MISSIONS" },
      { numero: "625700", value: "RESTAURANTS" },
      { numero: "625710", value: "RECEPTION CLIENTS" },
      { numero: "626000", value: "FRAIS POSTAUX" },
      { numero: "626100", value: "FRAIS POSTAUX" },
      { numero: "626400", value: "BOUYGUES" },
      { numero: "626410", value: "ORANGE" },
      { numero: "626420", value: "VIRGIN MOBILE" },
      { numero: "626700", value: "SFR" },
      { numero: "626800", value: "ILIAD TELECOM" },
      { numero: "626900", value: "FREE" },
      { numero: "627000", value: "SERVICES BANCAIRES" },
      { numero: "627200", value: "COMMISS.S/EMISSION EMPR." },
      { numero: "627500", value: "SERVICES BANCAIRES" },
      { numero: "627800", value: "COMMISSIONS CARTE BLEUE" },
      { numero: "628100", value: "CONCOURS DIVERS COTISATIONS" },
      { numero: "628400", value: "FRAIS DE RECRUT.PERSONNEL" },
      { numero: "631200", value: "IMPOTS TAXE APPRENTISSAGE" },
      { numero: "631300", value: "PART.FORM.CONTINUE(TRESOR" },
      { numero: "633100", value: "VERSEMENT DE TRANSPORT" },
      { numero: "633200", value: "ALLOCATION LOGEMENT" },
      { numero: "633300", value: "IMPOTS.PARTICIP EMPLOYEUR FORMAT CONTINU" },
      { numero: "633400", value: "PARTICIP.EFFORT CONSTRUCT" },
      { numero: "633500", value: "VERSENT.LIBE.TAXE APPRENT" },
      { numero: "634600", value: "TAXE INTER.PROD PETROLIER" },
      { numero: "635110", value: "CFE" },
      { numero: "635120", value: "TAXES FONCIERES" },
      { numero: "635140", value: "TVS" },
      { numero: "635300", value: "IMPOTS INDIRECTS" },
      { numero: "635400", value: "DROITS D'ENREGIST.&TIMBRE" },
      { numero: "635800", value: "AUTRES DROITS" },
      { numero: "637100", value: "CONTRIB.SOCIALE SOLIDAR." },
      { numero: "637800", value: "IMPOTS TAXES DIVERSES" },
      { numero: "637810", value: "CSG DEDUCTIBLE" },
      { numero: "637820", value: "CSG NON DEDUCTIBLE" },
      { numero: "641100", value: "SALAIRES BRUTS" },
      { numero: "641150", value: "SALAIRES ADMINIS.&GERANTS" },
      { numero: "641200", value: "CONGES PAYES" },
      { numero: "641300", value: "PERS PRIMES ET GRATIFICATIONS" },
      { numero: "641400", value: "INDEM.ET AVANTAGES DIVERS" },
      { numero: "644000", value: "REMUNERATION GERANT" },
      { numero: "645000", value: "SECURITE SOCIALE PREVOYAN" },
      { numero: "645100", value: "PERS COTISATIONS A L'URSSAF" },
      { numero: "645200", value: "CHARGES SUR CONGES PAYES" },
      { numero: "645300", value: "RETRAITE" },
      { numero: "645310", value: "COTIS.RETRAITE (CADRES)" },
      { numero: "645320", value: "COTIS.RETRAITE(SALARIES)" },
      { numero: "645400", value: "COTIS. AUX ASSEDIC" },
      { numero: "645800", value: "AUTRES CHRGES DE PERSONNEL" },
      { numero: "646000", value: "COTIS.SOC.PERS.EXPLOITANT" },
      { numero: "646100", value: "RSI" },
      { numero: "646400", value: "MAAF SANTE" },
      { numero: "646410", value: "BNP RETRAITE" },
      { numero: "647100", value: "ABONDEMENT" },
      { numero: "647500", value: "PERS MEDECINE DU TRAVAIL PHARMACIE" },
      { numero: "648000", value: "AUTRES CHARGES DE PERS." },
      { numero: "648001", value: "AUTRES CHARGES DE PERSONNEL" },
      { numero: "651000", value: "SOLVIMO" },
      { numero: "651100", value: "SACEM" },
      { numero: "653000", value: "JETONS DE PRESENCE" },
      { numero: "654000", value: "PERTES S/CREANCES IRREC." },
      { numero: "655000", value: "QUOTES-PARTS RESULT./OP.C" },
      { numero: "658000", value: "CHARGES DIV.GESTION COURANTE" },
      { numero: "661100", value: "INTERETS EMPRUNTS ET DETTES" },
      { numero: "661160", value: "INTERETS EMPRUNTS &DETTES" },
      { numero: "661170", value: "INT.DETTES PARTICIPATIONS" },
      { numero: "661500", value: "INTERETS COMPTES COURANTS" },
      { numero: "661600", value: "INTERETS BANCAIRES &S/ESC" },
      { numero: "661700", value: "INTERETS OBLIGAT.CAUTION." },
      { numero: "661800", value: "INTERETS AUTRES DETTES" },
      { numero: "664000", value: "PERTES S/CREAN.PARTICIP." },
      { numero: "665000", value: "ESCOMPTES ACCORDES" },
      { numero: "666000", value: "PERTES DE CHANGE" },
      { numero: "667000", value: "CHARGES S/CESS.VAL.PLACEM" },
      { numero: "668000", value: "AUTRES CHARGES FINANC." },
      { numero: "668800", value: "Compte d'arrondi" },
      { numero: "671000", value: "PENALITES AMENDES" },
      { numero: "671200", value: "PENALITES ET AMENDES" },
      { numero: "671300", value: "DONS LIBERALITES" },
      { numero: "671400", value: "CREANCES DEV.IRRE.DS EXER" },
      { numero: "671500", value: "CHARGES EXCEPT.SUBV.ACCOR" },
      { numero: "671700", value: "RAPPELS D'IMPOTS NON IS." },
      { numero: "671800", value: "AUTRES CHAR.EXCEP.GESTION" },
      { numero: "672000", value: "CHARGES DIV.COUR.S/EX.ANT" },
      { numero: "675000", value: "VAL.NET.COMPT.ELEM.CEDES" },
      { numero: "675100", value: "VALEUR DES IMMOS VENDUES" },
      { numero: "675200", value: "VNC DES IMMOS VENDUES" },
      { numero: "678800", value: "CHARGES EXCEP.DIVERSES" },
      { numero: "681110", value: "DOT.AMORT.IMMO.INCORP." },
      { numero: "681120", value: "DOTATIONS AUX AMORTISSEMENTS" },
      { numero: "681200", value: "DOT.AMORT.CHARGE.EX.A REP" },
      { numero: "681500", value: "DOT.PROV.CHAR.EX.(CONG.PA" },
      { numero: "681610", value: "DOT.PROV.DEPRE.IMMO.INCOR" },
      { numero: "681620", value: "DOT.PROV.DEPRE.IMMO.CORP." },
      { numero: "681730", value: "DOT.PROV.STOCKS &EN-COURS" },
      { numero: "681740", value: "DOT.PROV.DEPRE.CREANCES" },
      { numero: "686400", value: "DOT.PR.RISQ.PART.EVAL.EQU" },
      { numero: "686500", value: "DOT.PROV.RISQUE (CHANGE)" },
      { numero: "686620", value: "DOT.PROV.IMMO.FINANCIERES" },
      { numero: "686630", value: "DOT.PR.DEPR.PART.EVAL.EQU" },
      { numero: "686650", value: "DOT.PROV.VAL.PLACEMENT" },
      { numero: "687250", value: "DOT.AMORT.DEROGATOIRES" },
      { numero: "687300", value: "DOT.PROV.REGLEMENTEES" },
      { numero: "687400", value: "DOT.AUTRES PROV.REGLEM." },
      { numero: "687500", value: "DOT.PROV.RISQ.& CHAR.EXCP" },
      { numero: "687600", value: "DOT.PROV.DEPREC.EXCEPT." },
      { numero: "689000", value: "DOT.PROV.POUR IMPOTS" },
      { numero: "691000", value: "PARTICIPATION SALARIES" },
      { numero: "695000", value: "IMPOTS S/LES BENEFICES" },
      { numero: "697000", value: "IMP.FORFAIT.ANNUELLE.SOC." },
      { numero: "698100", value: "INTEGRATION FISCALE CHARG" },
      { numero: "698900", value: "INTEGRATION FISCALE PROD." },
      { numero: "699000", value: "PROD. REPORT ARRIERE DEF." },
      { numero: "699500", value: "PROD.CRED.IMPOT RECHERCHE" },
      { numero: "699600", value: "PROD.CRED.IMPOT FORMATION" },
      { numero: "701000", value: "VENTES DE PRODUITS FINIS" },
      { numero: "701100", value: "VENTES PRODUITS FINIS A" },
      { numero: "701200", value: "VENTES PRODUITS FINIS B" },
      { numero: "701900", value: "VENTES PROD.FINIS  EXPORT" },
      { numero: "702000", value: "VENTES PROD.INTERMEDIAIRE" },
      { numero: "702900", value: "VENTES PROD.INTERM.EXPORT" },
      { numero: "703000", value: "VENTES PRODUITS RESIDUELS" },
      { numero: "703900", value: "VENTES PROD.RESIDU.EXPORT" },
      { numero: "704000", value: "VENTES DE TRAVAUX" },
      { numero: "704900", value: "VENTES DE TRAVAUX  EXPORT" },
      { numero: "705000", value: "ETUDES" },
      { numero: "705900", value: "ETUDES EXPORT" },
      { numero: "706000", value: "HONORAIRES TRANSACTION" },
      { numero: "706100", value: "HONORAIRES LOCATION" },
      { numero: "706200", value: "COMMISSIONS" },
      { numero: "706300", value: "HONORAIRES GESTION" },
      { numero: "706400", value: "SOLVIMO GESTION" },
      { numero: "706900", value: "PREST.DE SERVICES  EXPORT" },
      { numero: "707000", value: "VENTES DE MARCHANDISES" },
      { numero: "707080", value: "RETROCES.A PRIX COUTANT" },
      { numero: "707900", value: "VENTES DE MARCH.  EXPORT" },
      { numero: "708200", value: "COMMISSIONS & COURTAGES" },
      { numero: "708290", value: "COMMISSIONS & COURTAG.EXP" },
      { numero: "708300", value: "LOCATIONS DIVERSES" },
      { numero: "708390", value: "LOCATIONS DIVERSES EXPORT" },
      { numero: "708400", value: "MISE A DISPOS.PERSON.FACT" },
      { numero: "708500", value: "PORTS &FRAIS FACT" },
      { numero: "708590", value: "PORTS &FRAIS FACTURES EXP" },
      { numero: "708800", value: "AUTRES PROD.ACTI.ANNEXES" },
      { numero: "708890", value: "AUTRES PROD.ACTI.ANNEX.EX" },
      { numero: "709100", value: "RRR S/PROD.FINIS (FRANCE)" },
      { numero: "709190", value: "RRR S/PROD.FINIS (EXPORT)" },
      { numero: "709200", value: "RRR S/PROD.INTERM(FRANCE)" },
      { numero: "709290", value: "RRR S/PROD.INTERM(EXPORT)" },
      { numero: "709400", value: "RRR S/TRAVAUX (FRANCE)" },
      { numero: "709490", value: "RRR S/TRAVAUX (EXPORT)" },
      { numero: "709500", value: "RRR S/ETUDES  (FRANCE)" },
      { numero: "709590", value: "RRR S/ETUDES  (EXPORT)" },
      { numero: "709600", value: "RRR S/PREST.SERV.(FRANCE" },
      { numero: "709690", value: "RRR S/PREST.SERV.(EXPORT)" },
      { numero: "709700", value: "RRR S/MARCHANDISES(FRANCE" },
      { numero: "709790", value: "RRR S/MARCHANDISES(EXPORT" },
      { numero: "709800", value: "RRR S/PROD.ACTIVIT.ANNEXE" },
      { numero: "709890", value: "RRR S/PROD.ACTIVIT.AN.EXP" },
      { numero: "713300", value: "VARIAT.EN-COURS PROD.BIEN" },
      { numero: "713400", value: "VARIAT.EN-COURS PROD.SERV" },
      { numero: "713500", value: "VARIAT.STOCKS PROD.FINIS" },
      { numero: "720000", value: "PRODUCTION IMMOBILISEE" },
      { numero: "730000", value: "PROD.NETS PARTIEL.OP.LT." },
      { numero: "740000", value: "SUBVENTIONS D'EXPLOITAT." },
      { numero: "751000", value: "REDEVANCES P.BREVETS LIC." },
      { numero: "752000", value: "REV.IMMEUB.NON AFF.A EXPL" },
      { numero: "755000", value: "QUOTES-PARTS RESULT./OP.C" },
      { numero: "758000", value: "PRODUITS DIV.GESTION COURANTE" },
      { numero: "761000", value: "PRODUITS DE PARTICIPATION" },
      { numero: "761001", value: "INTERET SUR DAT" },
      { numero: "762000", value: "PROD.DES AUTRES IMMO.FIN" },
      { numero: "763000", value: "REVENUS DES AUTRES CREANC" },
      { numero: "764000", value: "REV.DES VALEURS DE PLACEM" },
      { numero: "765000", value: "ESCOMPTES OBTENUS" },
      { numero: "766000", value: "GAINS DE CHANGE" },
      { numero: "767000", value: "PRODUIT S/CESS.VAL.PLACEM" },
      { numero: "768000", value: "AUTRES PROD.FINANCIERS" },
      { numero: "771400", value: "RENTREES S/CREAN.AMORTIES" },
      { numero: "771500", value: "SUBVENTIONS D'EQUILIBRE" },
      { numero: "771700", value: "DEGREV.D'IMPOTS NON IS." },
      { numero: "771800", value: "AUTRES PROD.EXCEP.GESTION" },
      { numero: "772000", value: "PROD.DIV.COUR.S/EX.ANTE." },
      { numero: "775000", value: "PRODUITS CESS ELEM.CEDES" },
      { numero: "777000", value: "QUOTE-PART SUBVENT.INVEST" },
      { numero: "778800", value: "PRODUITS EXCEPT.DIVERS" },
      { numero: "781110", value: "REP/AMORT.IMMOB.INCORP." },
      { numero: "781120", value: "REP/AMORT.IMMOB.CORPOR." },
      { numero: "781500", value: "REP/PROV. RISQ.& CH.EXPL." },
      { numero: "781610", value: "REP/PROV.DEPREC.IMMO.INC." },
      { numero: "781620", value: "REP/PROV.DEPREC.IMMO.CORP" },
      { numero: "781730", value: "REP/PROV.DEPREC.STOCKS" },
      { numero: "781740", value: "REP/PROV.DEPREC.CREANCES" },
      { numero: "786400", value: "REP/PR.RISQ.PART.EVAL.EQU" },
      { numero: "786500", value: "REP.PROV.RISQUE (CHANGE)" },
      { numero: "786620", value: "REP.PROV.IMMO.FINANCIERES" },
      { numero: "786630", value: "REP.PR.DEPR.PART.EVAL.EQU" },
      { numero: "786650", value: "REP.PROV.VAL.PLACEMENT" },
      { numero: "787250", value: "REP/PROV.REG.AMORT.DEROG" },
      { numero: "787260", value: "REP/PROV.REG.SPECIAL REEV" },
      { numero: "787270", value: "REP/PROV.REG.PL-VAL.REINV" },
      { numero: "787300", value: "REP/PROV.REGLEM.(STOCKS)" },
      { numero: "787400", value: "REP/AUTRES PROV.REGLEM." },
      { numero: "787500", value: "REP/PROV.RISQ.& CH.EXCEP." },
      { numero: "787600", value: "REP/PROV.DEPRECIATION EXC" },
      { numero: "789000", value: "REP/PROV.POUR IMPOTS" },
      { numero: "791000", value: "TRANSF.CHARGES D'EXPLOIT." },
      { numero: "791100", value: "TRANSFERT DE CHARGES TVA" },
      { numero: "796000", value: "TRANSF.CHARGES FINANC." },
      { numero: "797000", value: "TRANF.CHARGES EXCEPTION." },
    ]

    this.valueTva = this.listeChoix1;
  }

  submitForm() {
    // ==============fournisseur==============
    const valFournisseur = this.form.get('fournisseur')?.value;
    const reglemt = this.form.get('reglement')?.value;
    const info = this.form.get('AutreInfo')?.value;
    const numFact = this.form.get('numFac')?.value;
    const infoValue = info ? info : '';

    this.form.get('fournisseur')?.setValue(valFournisseur + ' ' + numFact + ' ' + reglemt + ' ' + infoValue);


    // ===========filename================
    this.form.get('fileName')?.setValue(this.fileName);

    // ===========set valeur vente et achat================
    if (this.form.get('sousClasse')?.value == "VENTES") {
      // this.form.get('numFac')?.setValue(this.form.get('fournisseur')?.value);
      this.form.get('sousClasse')?.setValue("VE");
      this.form.get('veTtc')?.setValue(this.form.get('ttc')?.value);
      this.form.get('acTtc')?.setValue(0);
      if (this.form.get('TauxTva')?.value == "CLIENT 20%") {
        const calVeCredit1 = 1.2;
        this.form.get('veCredit1')?.setValue((this.form.get('ttc')?.value / calVeCredit1).toFixed(2));
        this.form.get('veCredit2')?.setValue(((this.form.get('ttc')?.value / (1.2)) * (0.2)).toFixed(2));
        this.form.get('veDebit1')?.setValue(0);
        this.form.get('veDebit2')?.setValue(0);
        this.form.get('sousClasse2')?.setValue('VE');
        this.form.get('TauxTva2')?.setValue(4457);
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.value;

      }
      if (this.form.get('TauxTva')?.value == "CLIENT 10%") {
        const calVeCredit1 = 1.1;
        this.form.get('veCredit1')?.setValue((this.form.get('ttc')?.value / calVeCredit1).toFixed(2));
        this.form.get('veCredit2')?.setValue(((this.form.get('ttc')?.value / (1.1)) * (0.1)).toFixed(2));
        this.form.get('veDebit1')?.setValue(0);
        this.form.get('veDebit2')?.setValue(0);
        this.form.get('sousClasse2')?.setValue('VE');
        this.form.get('TauxTva2')?.setValue(4457);
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.value;
      }
      if (this.form.get('TauxTva')?.value == "CLIENT 5.5%") {
        const calVeCredit1 = 1.055;
        this.form.get('veCredit1')?.setValue((this.form.get('ttc')?.value / calVeCredit1).toFixed(2));
        this.form.get('veCredit2')?.setValue(((this.form.get('ttc')?.value / (1.055)) * (0.055)).toFixed(2));
        this.form.get('veDebit1')?.setValue(0);
        this.form.get('veDebit2')?.setValue(0);
        this.form.get('sousClasse2')?.setValue('VE');
        this.form.get('TauxTva2')?.setValue(4457);
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.value;
      }
      if (this.form.get('TauxTva')?.value == "CLIENT 0%") {
        this.form.get('veCredit1')?.setValue(this.form.get('ttc')?.value);
        this.form.get('veDebit1')?.setValue(0);
        this.form.get('fournisseur')?.value;
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('TauxTva2')?.setValue('');
        this.form.get('compte')?.value;
        this.form.get('sousClasse2')?.setValue('');
        this.form.get('date2')?.setValue('');
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('fournisseur2')?.setValue('');
        this.form.get('fileName2')?.setValue('');
        this.form.get('fileName')?.value;
      }


    }
    if (this.form.get('sousClasse')?.value == "ACHATS") {
      // this.form.get('numFac')?.setValue(this.form.get('fournisseur')?.value);
      this.form.get('sousClasse')?.setValue("AC");
      this.form.get('acTtc')?.setValue(this.form.get('ttc')?.value);
      this.form.get('veTtc')?.setValue(0);

      if (this.form.get('TauxTva')?.value == "CLIENT 20%") {
        const calAcCredit1 = 1.2;
        this.form.get('veDebit1')?.setValue((this.form.get('ttc')?.value / calAcCredit1).toFixed(2));
        this.form.get('veDebit2')?.setValue(((this.form.get('ttc')?.value / (1.2)) * (0.2)).toFixed(2));
        this.form.get('veCredit1')?.setValue(0);
        this.form.get('veCredit2')?.setValue(0);
        this.form.get('TauxTva')?.setValue(4456);
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('sousClasse2')?.setValue('AC');
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('TauxTva2')?.setValue(this.form.get('TauxTva')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.setValue(this.fileName);
      }
      if (this.form.get('TauxTva')?.value == "CLIENT 10%") {
        const calAcCredit1 = 1.1;
        this.form.get('veDebit1')?.setValue((this.form.get('ttc')?.value / calAcCredit1).toFixed(2));
        this.form.get('veDebit2')?.setValue(((this.form.get('ttc')?.value / (1.1)) * (0.1)).toFixed(2));
        this.form.get('veCredit1')?.setValue(0);
        this.form.get('veCredit2')?.setValue(0);
        this.form.get('TauxTva')?.setValue(4456);
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('sousClasse2')?.setValue('AC');
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('TauxTva2')?.setValue(this.form.get('TauxTva')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.setValue(this.fileName);
      }
      if (this.form.get('TauxTva')?.value == "CLIENT 5.5%") {
        const calAcCredit1 = 1.055;
        this.form.get('veDebit1')?.setValue((this.form.get('ttc')?.value / calAcCredit1).toFixed(2));
        this.form.get('veDebit2')?.setValue(((this.form.get('ttc')?.value / (1.055)) * (0.055)).toFixed(2));
        this.form.get('veCredit1')?.setValue(0);
        this.form.get('veCredit2')?.setValue(0);
        this.form.get('TauxTva')?.setValue(4456);
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('sousClasse2')?.setValue('AC');
        this.form.get('date2')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('TauxTva2')?.setValue(this.form.get('TauxTva')?.value);
        this.form.get('fournisseur2')?.setValue(this.form.get('fournisseur')?.value);
        this.form.get('fileName2')?.setValue(this.form.get('fileName')?.value);
        this.form.get('fileName')?.setValue(this.fileName);
      }
      if (this.form.get('TauxTva')?.value == "CLIENT 0%") {
        this.form.get('veDebit1')?.setValue(this.form.get('ttc')?.value);
        this.form.get('veCredit1')?.setValue(0);
        this.form.get('classe6')?.setValue(this.form.get('nature')?.value);
        this.form.get('TauxTva2')?.setValue('');
        this.form.get('compte')?.value;
        this.form.get('sousClasse2')?.setValue('');
        this.form.get('date2')?.setValue('');
        this.form.get('date')?.setValue(this.datePipe.transform(this.form.get('date')?.value, 'dd/MM/yyyy'));
        this.form.get('fournisseur2')?.setValue('');
        this.form.get('fileName2')?.setValue('');
        this.form.get('fournisseur')?.value;
      }
    }

    // ===========calcule achat================
    const calculAchat = ((this.nature + this.Tva) / this.form.get('ttc')?.value);
    this.form.get('achat')?.setValue(calculAchat);

    // ===========calcule vente================
    if ((this.form.get('compte')?.value) || (this.form.get('TauxTva')?.value) == "CLIENT 20%") {
      const client = 0.2;
      const calculVente = ((client) / (this.nature + this.Tva));
      this.form.get('vente')?.setValue(calculVente);
      // this.form.get('TauxTva')?.setValue(445712);

    }
    if ((this.form.get('compte')?.value) || (this.form.get('TauxTva')?.value) == "CLIENT 10%") {
      const client = 0.1;
      const calculVente = ((client) / (this.nature + this.Tva));
      this.form.get('vente')?.setValue(calculVente);
      // this.form.get('TauxTva')?.setValue(445710);
    }
    if ((this.form.get('compte')?.value) || (this.form.get('TauxTva')?.value) == "CLIENT 5.5%") {
      const client = 0.05;
      const calculVente = ((client) / (this.nature + this.Tva));
      this.form.get('vente')?.setValue(calculVente);
    }


    this.results.push(this.form.value);
    this.form.reset();


  }

  export() {
    let body = [['date', 'journal', 'compte', 'numéro de pièces', 'libellé', 'Debit', 'Credit']];

    this.results.forEach((item: User) => {
      body.push(
        [item.date, item.sousClasse, item.compte, item.fileName, item.fournisseur, item.veTtc, item.acTtc]
      )

      body.push(
        [item.date, item.sousClasse, item.classe6, item.fileName, item.fournisseur, item.veDebit1, item.veCredit1]
      )
      console.log("***************", this.form.get('TauxTva')?.value);

      if (this.form.get('TauxTva')?.value != 'CLIENT 0%') {
        body.push(
          [item.date2, item.sousClasse2, item.TauxTva2, item.fileName2, item.fournisseur2, item.veDebit2, item.veCredit2]
        )
      }
    })

    this.newLists.forEach((item: User) => {
      body.push([item.date, item.sousClasse, item.compte, item.fileName, item.fournisseur, item.veTtc, item.acTtc]);
    })

    this.excelService.exportFromArray(body);
    location.reload();
    this.router.navigateByUrl('compta');
  }

  showImage(index: number): void {
    this.indexImage = `${index}`.split(' ')[0];
    const nomPhotos = this.listImage[this.indexImage].name;
    this.fileName = nomPhotos.split('.')[0];

    console.log('------------', this.fileName);

    this.resetFile();
    this.currentIndex = index;
    this.selectedImage = this.images[index];
    this.setCurrentFile();
  }

  displayImage(event: Event) {
    const reader = new FileReader();
    const files = (event?.target as HTMLInputElement).files;
    this.listImage = files;

    this.resetFile();

    if (files) {
      const firstFile = files[0];

      //@ts-ignore
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {

          const data = e.target.result;
          const fileFormat = this.getFileFormat(data);
          console.log('dataddd')
          console.log(data)
          const typefile = data.split(';')[0].split(':')[1];
          if (typefile === 'application/pdf') {
            // Handle PDF file
            this.thumbPdfs.push(data);
          } else {
            // Handle image file
            this.thumbImages.push(data)
          }

          // this.images.push(e.target.result);
        };
      }
      if (firstFile.type === 'application/pdf') {

        const fileReader = new FileReader();
        
        fileReader.onload = () => {
          this.pdfSrc = fileReader.result;
        };
        fileReader.readAsArrayBuffer(firstFile);

      } else {
        reader.readAsDataURL(firstFile);
        const name = firstFile.name;
        this.fileName = name.split('.')[0];

        reader.onload = (e) => {

          this.imageSrc = reader.result as string;
        };
      }

    }

  }

  //@ts-ignore
  onFileSelected(event): void {
    if (event.target.files) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };

      }
      this.selectedImage = this.images[0];
    }
  }


  setCurrentFile() {
    if (this.selectedImage.split(';')[0].includes('pdf')) {
      this.pdfSrc = this.selectedImage;
    } else {
      this.imageSrc = this.selectedImage;
    }
  }

  prevImage(): void {
    this.resetFile();
    if (this.currentIndex > 0) {
      const current = this.currentIndex - 1;
      const nomPhotos = this.listImage[current].name;
      this.fileName = nomPhotos.split('.')[0];

      console.log("moin==========", this.fileName);
      this.currentIndex--;
      this.selectedImage = this.images[this.currentIndex];
    }
    this.setCurrentFile();
  }

  nextImage(): void {
    this.resetFile();
    if (this.currentIndex < this.images.length - 1) {
      const current = this.currentIndex + 1;
      const nomPhotos = this.listImage[current].name;
      this.fileName = nomPhotos.split('.')[0];
      console.log("plus==========", this.fileName);
      this.currentIndex++;
      this.selectedImage = this.images[this.currentIndex];
    }
    this.setCurrentFile();
  }

  resetFile() {
    this.imageSrc = '';
    this.pdfSrc = '';
  }


  checkValClass() {
    if (this.form.get("parentClasse")?.value == "FACTURE" && this.form.get("sousClasse")?.value == "VENTES") {
      this.valueSelect = this.listeChoix1;
    } else if (this.form.get("parentClasse")?.value == "FACTURE" && this.form.get("sousClasse")?.value == "ACHATS") {
      this.valueSelect = this.listChoix2;
    } else {
      this.valueSelect = [
        {
          value: 'AUTRE',
        }
      ];
    }

    // if(this.form.get("sousClasse")?.value == "ACHATS"){
    //   this.valueTva = [{value: 'fournisseur'}];
    // }else{
    //   this.valueTva = this.listeChoix1;
    // }
  }

  calculeCompta(val: any) {

    if (val == "CLIENT 20%") {
      this.Tva = ((this.form.get('ttc')?.value / (1.2)) * (0.2)).toFixed(2);
      this.Mht = (this.form.get('ttc')?.value / this.Tva).toFixed(2);
    }
    if (val == "CLIENT 10%") {
      this.Tva = ((this.form.get('ttc')?.value / (1.1)) * (0.1)).toFixed(2);
      this.Mht = (this.form.get('ttc')?.value / this.Tva).toFixed(2);

    }
    if (val == "CLIENT 5.5%") {
      this.Tva = ((this.form.get('ttc')?.value / (1.055)) * (0.055)).toFixed(2);
      this.Mht = (this.form.get('ttc')?.value / this.Tva).toFixed(2);

    }
    if (val == "CLIENT 0%") {
      this.Tva = ((this.form.get('ttc')?.value / (1)) * (0)).toFixed(2);
      this.Mht = (this.form.get('ttc')?.value / this.Tva)

    }
    if (val == "CLIENT 0%") {
      this.Tva = ((this.form.get('ttc')?.value / (1)) * (0)).toFixed(2);
      this.Mht = (this.form.get('ttc')?.value / this.Tva)

    }
  }

  onFilePdfSelected(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.pdfSrc = fileReader.result;
    };
    fileReader.readAsArrayBuffer(file);
  }

  vedebit1($event: any, props: string, index: number) {
    //@ts-ignore
    this.results[index][props] = $event.value
  }

  quiter() {
    this.router.navigateByUrl('login');
    localStorage.removeItem("password")
  }

  zoomIn() {
    this.zoomValue += 0.1;
  }

  zoomOut() {
    this.zoomValue -= 0.1;
    if (this.zoomValue < 0.1) {
      this.zoomValue = 0.1;
    }
  }

  onScroll(event: any) {
    // Calculate the zoom delta based on the scroll event
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    const zoomDelta = delta * 0.1;

    // Update the zoom value and limit it to the range of 0.1 to 10
    this.zoomValue += zoomDelta;
    if (this.zoomValue < 0.1) {
      this.zoomValue = 0.1;
    } else if (this.zoomValue > 10) {
      this.zoomValue = 10;
    }

    // Prevent the default scroll behavior
    event.preventDefault();
  }

  newLine() {
    //@ts-ignore
    const newUser: User = {
      date: '', sousClasse2: '', compte: '', fileName2: '', fournisseur2: '', veDebit2: '', veCredit2: ''
    }

    const form = this.formBuilder.group({
      // nom: [''],
      // prenom: [''],
      ttc: [''],
      parentClasse: [''],
      sousClasse: [''],
      sousClasse2: [''],
      compte: [''],
      date: [''],
      date2: [''],
      fileName: [''],
      fournisseur: [''],
      nature: [''],
      achat: [''],
      vente: [''],
      veTtc: [''],
      acTtc: [''],
      TauxTva: [''],
      TauxTva2: [''],
      veCredit1: [''],
      veCredit2: [''],
      veDebit1: [''],
      veDebit2: [''],
      acCredit1: [''],
      acCredit2: [''],
      acDebit1: [''],
      acDebit2: [''],
      classe6: [''],
      reglement: [''],
      AutreInfo: [''],
      numFac: [''],
      fournisseur2: [''],
      fileName2: [''],
      // Autres champs
    });
    console.log(form.value);
    this.newLists.push(form.value);
    console.log('------------------', this.newLists);
    // this.results.push([newUser.date2, newUser.sousClasse, newUser.TauxTva, newUser.fileName2, newUser.fournisseur2, newUser.veCredit2, newUser.veCredit2])
  }

  removeItem(i: number, context: string = '') {
    if (context == 'new') {
      this.newLists.splice(i, 1);
    } else {
      this.results.splice(i, 1);
    }
  }

  vedebit1N($event: any, props: string, index: number) {
    console.log("********------------", this.newLists);

    //@ts-ignore
    this.newLists[index][props] = $event.value
  }

  rotateClockwise() {
    // Add 90 degrees to the rotation property
    this.rotation += 90;
  }

  rotateCounterClockwise() {
    // Subtract 90 degrees from the rotation property
    this.rotation -= 90;
  }

  getFileFormat(data: any): string {
    // Get the first few bytes of the file data
    const headerBytes = new Uint8Array(data.slice(0, 4));

    // Check if the file format matches a PDF or an image format
    if (headerBytes[0] === 0x25 && headerBytes[1] === 0x50 && headerBytes[2] === 0x44 && headerBytes[3] === 0x46) {
      return 'pdf';
    } else if ((headerBytes[0] === 0xff && headerBytes[1] === 0xd8 && headerBytes[2] === 0xff) ||
      (headerBytes[0] === 0x89 && headerBytes[1] === 0x50 && headerBytes[2] === 0x4e && headerBytes[3] === 0x47) ||
      (headerBytes[0] === 0x47 && headerBytes[1] === 0x49 && headerBytes[2] === 0x46 && headerBytes[3] === 0x38)) {
      return 'image';
    } else {
      return 'unknown';
    }
  }


}
