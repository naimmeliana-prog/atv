import { GlossaryTerm } from '../types/atv';

export const initialGlossaryTerms: GlossaryTerm[] = [
  // --- ANATOMÍA Y EXPLORACIÓN ---
  {
    id: 'term-trc',
    term: 'TRC (Tiempo de Relleno Capilar)',
    moduleId: 'anatomia',
    category: 'Exploración Física y Cardiovascular',
    definition: 'Tiempo en segundos que tarda la mucosa en recuperar su color rosado tras presionar con el pulgar para desplazar la sangre de los capilares.',
    synonyms: ['Tiempo de llenado capilar', 'CRT (Capillary Refill Time)', 'Perfusión periférica'],
    practicalExample: 'En triaje de urgencias: Al explorar a un perro atropellado, presionas la encía durante 2 segundos y sueltas. Si tarda 3,5 segundos en volver a ser rosa, informas al veterinario de un TRC prolongado, signo clave de mala perfusión o inicio de shock circulatorio.'
  },
  {
    id: 'term-decubito',
    term: 'Decúbito',
    moduleId: 'anatomia',
    category: 'Planos y Posicionamiento Anatómico',
    definition: 'Postura corporal de un animal acostado sobre una superficie horizontal. Puede ser lateral (sobre el costado), esternal o prono (sobre el pecho y vientre), o supino (sobre la espalda).',
    synonyms: ['Postura acostada', 'Posición tumbada', 'Decubitus'],
    practicalExample: 'En quirófano y radiología: Para realizar una ecografía abdominal completa, el ATV coloca y sostiene al perro en "decúbito dorsal" (boca arriba) sobre una cuna de espuma acolchada con los miembros anteriores extendidos.'
  },
  {
    id: 'term-midriasis',
    term: 'Midriasis',
    moduleId: 'anatomia',
    category: 'Oftalmología y Neurología',
    definition: 'Dilatación anormal o fisiológica de la pupila ocular. Lo opuesto a miosis (contracción pupilar).',
    synonyms: ['Pupila dilatada', 'Midriático'],
    practicalExample: 'Durante la monitorización anestésica: Si el paciente bajo anestesia presenta de forma repentina midriasis bilateral fija y arreactiva a la luz, es una señal de alarma de plano anestésico excesivamente profundo o paro circulatorio cerebral inminente.'
  },
  {
    id: 'term-disnea',
    term: 'Disnea',
    moduleId: 'anatomia',
    category: 'Aparato Respiratorio',
    definition: 'Dificultad respiratoria perceptible, caracterizada por esfuerzo visible, respiración con la boca abierta en gatos, cuello estirado y movimientos costales o abdominales marcados.',
    synonyms: ['Dificultad respiratoria', 'Falta de aire', 'Patrón respiratorio restrictivo/obstructivo'],
    practicalExample: 'En sala de espera: Llega un gato con la boca abierta, jadeando y con los codos separados del cuerpo (postura ortopneica). El ATV lo clasifica de inmediato con código Naranja, llevándolo a la jaula de oxigenoterapia sin forzar la manipulación.'
  },
  {
    id: 'term-normotermia',
    term: 'Normotermia',
    moduleId: 'anatomia',
    category: 'Fisiología Básica',
    definition: 'Mantenimiento de la temperatura corporal dentro del rango fisiológico normal de la especie (37,5 °C – 39,0 °C en perros y 38,0 °C – 39,2 °C en gatos).',
    synonyms: ['Temperatura corporal normal', 'Eutermia'],
    practicalExample: 'En el posoperatorio: Tras una cirugía de 2 horas, el ATV coloca una manta de aire caliente (Bair Hugger) hasta que el termómetro rectal marque al menos 37,8 °C (normotermia), garantizando que el animal metabolice los fármacos anestésicos.'
  },

  // --- FARMACOLOGÍA ---
  {
    id: 'term-aine',
    term: 'AINE (Antiinflamatorio No Esteroideo)',
    moduleId: 'farmacologia',
    category: 'Terapéutica y Farmacología',
    definition: 'Grupo de fármacos con acción analgésica, antipirética y antiinflamatoria que actúan inhibiendo las enzimas ciclooxigenasas (COX-1 y COX-2) sin estructura esteroidea.',
    synonyms: ['NSAID', 'Analgésico antiinflamatorio no corticoideo'],
    practicalExample: 'En prescripción de traumatología: Tras fijar una fractura en un perro, se pauta Meloxicam oral (AINE selectivo COX-2). El ATV recuerda al tutor que debe administrárselo siempre junto con el alimento para proteger la mucosa gástrica.'
  },
  {
    id: 'term-biodisponibilidad',
    term: 'Biodisponibilidad',
    moduleId: 'farmacologia',
    category: 'Farmacocinética',
    definition: 'Fracción o porcentaje de la dosis administrada de un fármaco que alcanza la circulación sistémica inalterada y la velocidad a la que esto ocurre.',
    synonyms: ['Disponibilidad biológica sistémica', 'Fracción absorbida (F)'],
    practicalExample: 'En administración de fármacos: Cuando inyectamos un bolo de propofol por vía intravenosa, la biodisponibilidad es del 100% inmediata; si se administrara por vía oral, la degradación gástrica y el metabolismo de primer paso hepático la reducirían casi a cero.'
  },
  {
    id: 'term-mdr1',
    term: 'Gen MDR1 (Mutación ABCB1)',
    moduleId: 'farmacologia',
    category: 'Farmacogenética y Toxicología',
    definition: 'Defecto genético hereditario común en razas de pastoreo (Collie, Pastor Australiano, Border Collie) que impide la producción adecuada de glicoproteína P, provocando neurotoxicidad por fármacos comunes.',
    synonyms: ['Deficiencia de Glicoproteína P', 'Gen de resistencia a múltiples fármacos tipo 1'],
    practicalExample: 'Al revisar la cartilla de un cachorro Pastor Australiano para desparasitación: El ATV revisa si tiene el test de MDR1 negativo antes de que el veterinario recete ivermectina, milbemicina a dosis altas o loperamida, evitando convulsiones o coma neurotóxico.'
  },
  {
    id: 'term-fluidoterapia',
    term: 'Fluidoterapia',
    moduleId: 'farmacologia',
    category: 'Terapéutica Hospitalaria',
    definition: 'Método terapéutico consistente en la administración parenteral de líquidos (cristaloides o coloides) para restablecer el volumen intravascular, equilibrio hidroelectrolítico y ácido-base.',
    synonyms: ['Sueroterapia', 'Infusión intravenosa continua'],
    practicalExample: 'En hospitalización: Un cachorro con gastroenteritis severa tiene un 8% de deshidratación. El ATV calcula el ritmo de infusión en la bomba de fluidos a 15 ml/h de Ringer Lactato sumando el mantenimiento diario más el déficit hídrico.'
  },

  // --- QUIRÓFANO Y ANESTESIA ---
  {
    id: 'term-asepsia',
    term: 'Asepsia',
    moduleId: 'quirofano',
    category: 'Protocolo Quirúrgico y Esterilización',
    definition: 'Conjunto de procedimientos científicos destinados a impedir la llegada de microorganismos patógenos a un medio estéril, instrumental quirúrgico o campo operatorio.',
    synonyms: ['Técnica estéril', 'Esterilidad quirúrgica'],
    practicalExample: 'En preparación de mesa de mayo: El ATV abre los paquetes de paños y cajas de instrumental sin tocar el interior estéril, usando guantes quirúrgicos estériles mediante la técnica cerrada para preservar la asepsia antes de que entre el cirujano.'
  },
  {
    id: 'term-halsted-mosquito',
    term: 'Pinza Mosquito (Halsted)',
    moduleId: 'quirofano',
    category: 'Instrumental Quirúrgico de Hemostasia',
    definition: 'Pinza pequeña y fina con cremallera y estriaciones transversales continuas a lo largo de toda su mandíbula, diseñada para ocluir vasos sanguíneos de pequeño calibre.',
    synonyms: ['Pinza hemostática de Halsted', 'Mosquito curva/recta'],
    practicalExample: 'En ovariohisterectomía: Cuando el cirujano corta el tejido subcutáneo y sangra un capilar diminuto, el ATV le pasa con rapidez una pinza Mosquito curva cerrada en el primer punto de cremallera para pinzar el vaso y electrocoagularlo.'
  },
  {
    id: 'term-capnografia',
    term: 'Capnografía (EtCO2)',
    moduleId: 'quirofano',
    category: 'Monitorización Anestésica',
    definition: 'Registro continuo y gráfico de la concentración de dióxido de carbono espirado por el paciente durante todo el ciclo respiratorio. El valor al final de la espiración es el EtCO2.',
    synonyms: ['Monitorización de dióxido de carbono espirado', 'End-Tidal CO2'],
    practicalExample: 'En anestesia inhalatoria: El monitor pita alertando de un EtCO2 de 56 mmHg (normal: 35-45 mmHg). El ATV avisa de hipercapnia e hipoventilación, procediendo a ventilar manualmente al paciente apretando la bolsa de reservorio cada 15 segundos.'
  },
  {
    id: 'term-autoclave',
    term: 'Autoclave',
    moduleId: 'quirofano',
    category: 'Esterilización',
    definition: 'Aparato que utiliza vapor de agua a presión y alta temperatura (habitualmente 121 °C durante 20 min o 134 °C durante 5 min) para esterilizar instrumental quirúrgico destruyendo esporas bacterianas.',
    synonyms: ['Esterilizador a vapor húmedo'],
    practicalExample: 'En zona sucia/limpia de quirófano: Al finalizar la jornada, el ATV lava el instrumental, lo seca meticulosamente, aplica lubricante en las articulaciones, empaqueta las cajas con cinta de control biológico e introduce la carga en el ciclo de 134 °C del autoclave.'
  },

  // --- RAZAS Y MANEJO ---
  {
    id: 'term-braquicefalo',
    term: 'Braquicéfalo',
    moduleId: 'razas',
    category: 'Conformación Anatómica y Razas',
    definition: 'Animal cuya cabeza tiene una longitud craneofacial acortada y una anchura proporcionalmente aumentada, con hocico achatado (ej. Bulldog Francés, Carlino, gato Persa).',
    synonyms: ['Síndrome braquicefálico', 'Raza de hocico chato'],
    practicalExample: 'En sala de espera en verano: Llega un Carlino jadeando ruidosamente con estridor faríngeo. El ATV lo pasa a una consulta con aire acondicionado prioritariamente para evitar que el estrés desate un golpe de calor por incapacidad de jadear eficazmente.'
  },
  {
    id: 'term-gato-burrito',
    term: 'Técnica de Gato Burrito',
    moduleId: 'razas',
    category: 'Manejo Felino Amable (Cat Friendly)',
    definition: 'Maniobra de contención pasiva que consiste en envolver el cuerpo del felino con una toalla gruesa como un cilindro, dejando protegidas las patas con uñas y exponiendo únicamente la cabeza o la extremidad a explorar.',
    synonyms: ['Envoltura con toalla', 'Towel wrap method'],
    practicalExample: 'Para medir la tensión arterial doppler a un gato asustado: En lugar de sujetarlo con fuerza, el ATV realiza la técnica del burrito con una toalla impregnada de feromonas Feliway, permitiendo colocar el manguito en la cola sin que el gato intente arañar.'
  },
  {
    id: 'term-senales-calma',
    term: 'Señales de Calma',
    moduleId: 'razas',
    category: 'Etología y Comunicación Canina',
    definition: 'Patrones de lenguaje corporal sutiles que emiten los perros (bostezar, lamerse la trufa, desviar la mirada, olfatear el suelo) para comunicar incomodidad, pacificar a otros individuos y evitar conflictos.',
    synonyms: ['Señales apaciguadoras', 'Calming signals'],
    practicalExample: 'Al acercarse a un perro hospitalizado: El ATV observa que el perro bosteza repetidamente y aparta la cabeza cuando intenta acariciarlo. Interpretando las señales de calma, el ATV se agacha de lado sin mirarle fijamente a los ojos para desescalar la tensión.'
  },

  // --- PATOLOGÍAS Y URGENCIAS ---
  {
    id: 'term-gdv',
    term: 'Torsión Gástrica (GDV)',
    moduleId: 'patologias',
    category: 'Urgencias y Cirugía Abdominal',
    definition: 'Síndrome agudo en el que el estómago se dilata de gas y rota sobre su eje mesentérico (vólvulo), bloqueando cardias y píloro y colapsando la vena cava caudal y los vasos esplénicos.',
    synonyms: ['Dilatación-Torsión Vólvulo Gástrico', 'Torsión de estómago'],
    practicalExample: 'En recepción nocturna: Un tutor trae a su Pastor Alemán inquieto con el estómago hinchado como un globo y arcadas improductivas. El ATV activa el protocolo de quirófano urgente, preparando fluidoterapia de choque en extremidades torácicas y catéteres 16G/18G.'
  },
  {
    id: 'term-flutd',
    term: 'FLUTD / Obstrucción Uretral',
    moduleId: 'patologias',
    category: 'Urología Felina',
    definition: 'Feline Lower Urinary Tract Disease. Enfermedad del tracto urinario inferior que en machos suele provocar una obstrucción física completa de la uretra por tapones mucosos o cálculos, impidiendo vaciar la vejiga.',
    synonyms: ['Síndrome urológico felino', 'Gato obstruido', 'Uropatía obstructiva'],
    practicalExample: 'En triaje: Un gato macho castrado no puede orinar desde hace 24 horas. El ATV palpa una vejiga abdominal dura y dolorosa del tamaño de una naranja pletórica, avisando al veterinario para realizar sedación, ecografía y sondaje uretral inmediato.'
  },
  {
    id: 'term-parvovirus',
    term: 'Parvovirosis Canina (CPV-2)',
    moduleId: 'patologias',
    category: 'Enfermedades Infecciosas',
    definition: 'Infección vírica altamente contagiosa provocada por un parvovirus sin envoltura que destruye las células mitóticamente activas de las criptas intestinales y la médula ósea en cachorros.',
    synonyms: ['Parvo canino', 'Enteritis viral parvoviral'],
    practicalExample: 'En aislamiento de infecciosos: Se ingresa un cachorro de 3 meses con diarrea sanguinolenta fétida y leucopenia. El ATV utiliza equipo de protección individual (EPI: patucos, bata, guantes) y desinfecta la jaula con hipoclorito sódico (lejía) diluido 1:30.'
  },
  {
    id: 'term-triaje-manchester',
    term: 'Triaje Manchester Veterinario',
    moduleId: 'patologias',
    category: 'Protocolo de Urgencias',
    definition: 'Sistema estandarizado de clasificación de pacientes según la gravedad fisiológica de sus constantes y síntomas, asignando colores de prioridad: Rojo (inmediato), Naranja (muy urgente), Amarillo (urgente) y Verde (estándar).',
    synonyms: ['Escala de Triaje', 'Clasificación de prioridades clínicas'],
    practicalExample: 'En un sábado saturado con 6 pacientes esperando: El ATV aplica el triaje y pasa por delante de una dermatitis a un perro atropellado con mucosas pálidas y disnea (código naranja), explicando pedagógicamente el criterio a los propietarios en espera.'
  },
  {
    id: 'term-leishmaniosis',
    term: 'Leishmaniosis Canina',
    moduleId: 'patologias',
    category: 'Parasitología e Infecciosas',
    definition: 'Enfermedad parasitaria sistémica y zoonótica causada por el protozoo Leishmania infantum, transmitida por la picadura de mosquitos flebótomos hembra en climas cálidos y templados.',
    synonyms: ['Leishmania', 'Enfermedad del mosquito flebótomo'],
    practicalExample: 'En consulta preventiva en Valencia: El ATV enseña al propietario a revisar las uñas excesivamente largas (onicogrifosis) y la descamación alrededor de los ojos (alopecia periocular), recomendando collares repelentes de flebótomo y test serológico rápido anual.'
  }
];
