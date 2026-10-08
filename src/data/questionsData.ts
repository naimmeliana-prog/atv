import { Question } from '../types/atv';

export const questionsBank: Question[] = [
  // --- ANATOMÍA Y FISIOLOGÍA ---
  {
    id: 'q-anat-1',
    moduleId: 'anatomia',
    question: '¿Cuál es el rango de temperatura corporal rectal considerado fisiológico (normal) en un perro adulto en reposo?',
    options: [
      '36,0 °C – 37,0 °C',
      '37,5 °C – 39,0 °C',
      '39,5 °C – 41,0 °C',
      '35,5 °C – 36,8 °C'
    ],
    correctIndex: 1,
    explanation: 'La temperatura normal de un perro adulto oscila entre 37,5 °C y 39,0 °C (hasta 39,2 °C en cachorros o estados de excitación leve). Por encima de 39,5 °C se considera hipertermia/fiebre y por debajo de 37,0 °C hipotermia.',
    clinicalContext: 'Exploración inicial en triaje de consulta general.',
    difficulty: 'básica'
  },
  {
    id: 'q-anat-2',
    moduleId: 'anatomia',
    question: 'Al presionar la encía de un perro y soltar, observas que el color rosa tarda 3,5 segundos en recuperarse. ¿Qué indica este hallazgo?',
    options: [
      'Que el animal está perfectamente hidratado y oxigenado',
      'Un Tiempo de Relleno Capilar (TRC) prolongado, indicativo de mala perfusión o shock',
      'Un proceso alérgico agudo localizado en la mucosa oral',
      'Que la presión aplicada fue insuficiente'
    ],
    correctIndex: 1,
    explanation: 'El TRC normal debe ser SIEMPRE inferior a 2 segundos. Un TRC de más de 2 segundos indica que la sangre no está circulando adecuadamente por los lechos capilares periféricos, típico de deshidratación severa, vasoconstricción periférica, hipotensión o shock.',
    clinicalContext: 'Evaluación rápida de un paciente politraumatizado.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-anat-3',
    moduleId: 'anatomia',
    question: 'Si el veterinario te solicita colocar al paciente para una radiografía en proyección "Ventro-Dorsal" (VD), ¿cómo debe situarse el perro?',
    options: [
      'Tumbado de lado (decúbito lateral derecho o izquierdo)',
      'Boca arriba (decúbito supino), apoyando la columna sobre la mesa y el vientre hacia el tubo de rayos X',
      'Boca abajo (decúbito prono), apoyando el vientre sobre la mesa',
      'De pie apoyado sobre sus cuatro patas'
    ],
    correctIndex: 1,
    explanation: 'En la proyección Ventro-Dorsal (VD), el haz de rayos X penetra primero por la cara ventral (vientre) y emerge por la cara dorsal (espalda). Por tanto, el paciente se posiciona en decúbito supino (boca arriba).',
    clinicalContext: 'Servicio de radiodiagnóstico para estudio de displasia de cadera.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-anat-4',
    moduleId: 'anatomia',
    question: '¿Cuántas vértebras lumbares (L) componen habitualmente la columna vertebral del perro y el gato?',
    options: [
      '5 vértebras lumbares',
      '7 vértebras lumbares',
      '12 vértebras lumbares',
      '9 vértebras lumbares'
    ],
    correctIndex: 1,
    explanation: 'La fórmula vertebral del perro y gato es C7, T13, L7, S3, Cd20-23. Poseen 7 vértebras lumbares de gran movilidad, donde con frecuencia se producen hernias discales.',
    clinicalContext: 'Lectura de informe traumatológico y neurológico.',
    difficulty: 'básica'
  },
  {
    id: 'q-anat-5',
    moduleId: 'anatomia',
    question: '¿Dónde se palpa de forma estándar el pulso arterial periférico en un gato o perro en la mesa de exploración?',
    options: [
      'En la arteria carótida en el cuello exclusivamente',
      'En la arteria femoral, en la cara medial (interna) del muslo',
      'En la arteria braquial cerca de la trufa',
      'En la arteria caudal de la punta de la cola'
    ],
    correctIndex: 1,
    explanation: 'La arteria femoral es el sitio anatómico de referencia más accesible y fiable para palpar la frecuencia y calidad del pulso (fuerte, débil, filiforme, concordante con los latidos cardíacos).',
    clinicalContext: 'Examen físico protocolario en consulta de medicina felina.',
    difficulty: 'básica'
  },

  // --- FARMACOLOGÍA ---
  {
    id: 'q-farm-1',
    moduleId: 'farmacologia',
    question: 'Un perro de 10 kg necesita una dosis de Meloxicam a 0,2 mg/kg. Dispones de un vial con concentración 5 mg/ml. ¿Cuántos mililitros (ml) debes cargar en la jeringa?',
    options: [
      '2,0 ml',
      '0,4 ml',
      '0,8 ml',
      '1,2 ml'
    ],
    correctIndex: 1,
    explanation: 'Paso 1: Dosis en mg = 10 kg × 0,2 mg/kg = 2 mg. Paso 2: Volumen en ml = 2 mg / 5 mg/ml = 0,4 ml. Por tanto, se deben inyectar exactamente 0,4 ml.',
    clinicalContext: 'Preparación de medicación analgésica prequirúrgica en mesa de tratamiento.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-farm-2',
    moduleId: 'farmacologia',
    question: '¿Por qué el Paracetamol está terminantemente contraindicado y resulta potencialmente letal en gatos?',
    options: [
      'Porque causa parada cardíaca súbita por bloqueo auriculoventricular en menos de 5 minutos',
      'Porque los gatos carecen de la enzima glucuroniltransferasa, generando metahemoglobinemia tóxica y necrosis hepática severa',
      'Porque destruye el esmalte dental provocando anorexia',
      'Porque anula la absorción de vitamina B12 en el íleon'
    ],
    correctIndex: 1,
    explanation: 'Los felinos tienen una deficiencia metabólica en la vía de glucuronoconjugación (glucuroniltransferasa). El paracetamol se metaboliza en metabolitos tóxicos altamente reactivos que transforman la hemoglobina en metahemoglobina (incapaz de transportar oxígeno, sangre color marrón/chocolate) y destruyen el hígado.',
    clinicalContext: 'Urgencias: llamada telefónica de un tutor preguntando si puede darle media pastilla de paracetamol a su gato que tiene fiebre.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-farm-3',
    moduleId: 'farmacologia',
    question: 'Al realizar una inyección intramuscular (IM) o subcutánea (SC), ¿qué maniobra de seguridad DEBE realizar siempre el ATV antes de empujar el émbolo?',
    options: [
      'Girar la aguja 180 grados bruscamente',
      'Aspirar ligeramente hacia atrás con el émbolo para comprobar que no sale sangre (no se ha entrado en un vaso)',
      'Inyectar aire para abrir el espacio tisular',
      'Masajear fuertemente la zona antes de pinchar'
    ],
    correctIndex: 1,
    explanation: 'Aspirar antes de administrar cualquier inyección IM o SC es un paso de seguridad crítico. Si aparece sangre en el cono de la jeringa, se ha alcanzado accidentalmente un vaso sanguíneo; se debe retirar y recolocar antes de administrar.',
    clinicalContext: 'Administración de sedación intramuscular en sala de hospitalización.',
    difficulty: 'básica'
  },
  {
    id: 'q-farm-4',
    moduleId: 'farmacologia',
    question: '¿Qué vía de administración proporciona una biodisponibilidad del 100% y el efecto terapéutico más inmediato?',
    options: [
      'Vía Subcutánea (SC)',
      'Vía Oral (PO)',
      'Vía Intravenosa (IV)',
      'Vía Tópica transdérmica'
    ],
    correctIndex: 2,
    explanation: 'La vía intravenosa (IV) introduce el principio activo directamente al torrente circulatorio general, por lo que su biodisponibilidad es del 100% y no requiere fase de absorción, lo que la hace indispensable en emergencias y anestesia.',
    clinicalContext: 'Manejo de fármacos de urgencia en parada cardiorrespiratoria.',
    difficulty: 'básica'
  },
  {
    id: 'q-farm-5',
    moduleId: 'farmacologia',
    question: '¿Qué precaución farmacogenética especial debe tenerse con antiparasitarios como la Ivermectina en perros de raza Collie, Pastor Australiano o Whippet?',
    options: [
      'Pueden tener una mutación en el gen MDR1 (ABCB1) que permite que el fármaco cruce la barrera hematoencefálica provocando neurotoxicidad grave o coma',
      'Provoca pancreatitis hemorrágica irreversible en menos de una hora',
      'Genera una reacción anafiláctica que solo responde a dosis altas de calcio',
      'Inactiva por completo las vacunas administradas en los últimos 2 años'
    ],
    correctIndex: 0,
    explanation: 'La mutación del gen MDR1 hace que la glicoproteína P de la barrera hematoencefálica sea defectuosa, permitiendo que la ivermectina y otros fármacos alcancen concentraciones neurotóxicas letales en el sistema nervioso central.',
    clinicalContext: 'Desparasitación y prescripción preventiva en medicina de raza.',
    difficulty: 'avanzada'
  },

  // --- QUIRÓFANO Y ANESTESIA ---
  {
    id: 'q-quir-1',
    moduleId: 'quirofano',
    question: '¿Cuál es la función principal de las tijeras Metzenbaum en quirófano y qué acción está prohibida realizar con ellas?',
    options: [
      'Están diseñadas para cortar huesos; está prohibido cortar piel con ellas',
      'Están diseñadas para disección fina de tejidos blandos; está terminantemente prohibido cortar hilos de sutura o gasas con ellas',
      'Son exclusivas para cortar vendajes y escayolas',
      'Se usan para apretar las cremalleras de los porta-agujas'
    ],
    correctIndex: 1,
    explanation: 'Las tijeras Metzenbaum tienen ramas largas y delgadas para disecar planos tisulares suaves. Si se usan para cortar suturas, alambres o apósitos, sus hojas pierden el filo de precisión instantáneamente y quedan inutilizables para cirugía.',
    clinicalContext: 'Instrumentación durante una ovariohisterectomía canina.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-quir-2',
    moduleId: 'quirofano',
    question: '¿Cómo debe realizarse el embrocado y lavado antiséptico de la piel del paciente en la zona donde se realizará la incisión quirúrgica?',
    options: [
      'Frotando de arriba a abajo en zigzag repetidamente sobre toda la zona',
      'Desde el centro de la incisión prevista hacia la periferia en espiral concéntrica, sin volver nunca al centro con la misma gasa',
      'Desde los bordes sucios hacia el centro de la incisión',
      'Rociando alcohol al 96% y dejando secar sin frotar con gasa'
    ],
    correctIndex: 1,
    explanation: 'El lavado del campo quirúrgico sigue siempre la técnica aséptica centrífuga: se empieza en el punto más limpio (el centro de la incisión futura) y se avanza hacia el exterior en espiral. Volver con la misma gasa al centro arrastraría gérmenes de la periferia a la zona de incisión.',
    clinicalContext: 'Preparación aséptica del abdomen previo a laparotomía exploratoria.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-quir-3',
    moduleId: 'quirofano',
    question: 'Durante la anestesia general inhalatoria, ¿qué parámetro mide el capnógrafo y cuál es su valor fisiológico normal de EtCO2?',
    options: [
      'Mide la presión sistólica de oxígeno; valor normal 120-140 mmHg',
      'Mide la concentración de dióxido de carbono al final de la espiración; valor normal 35 – 45 mmHg',
      'Mide la temperatura central en el esófago; valor normal 38 °C',
      'Mide el volumen de orina acumulado en vejiga'
    ],
    correctIndex: 1,
    explanation: 'El capnógrafo mide la concentración de CO2 en el gas espirado (EtCO2 o End-Tidal CO2). En perros y gatos su rango óptimo es de 35 a 45 mmHg. Un valor superior a 50 mmHg indica hipoventilación, mientras que un descenso brusco a 0 alerta de paro cardíaco o desconexión del tubo endotraqueal.',
    clinicalContext: 'Monitorización anestésica intraoperatoria.',
    difficulty: 'avanzada'
  },
  {
    id: 'q-quir-4',
    moduleId: 'quirofano',
    question: '¿Qué instrumento se utiliza de forma específica para fijar los paños o campos estériles a la piel del paciente delimitando la zona quirúrgica?',
    options: [
      'Pinzas Mosquito Halsted',
      'Pinzas de campo Backhaus',
      'Porta-agujas Mayo-Hegar',
      'Pinzas Adson con dientes de ratón'
    ],
    correctIndex: 1,
    explanation: 'Las pinzas de campo Backhaus poseen ramas curvas y extremos muy afilados que perforan el paño y penetran levemente en la dermis, fijando el campo quirúrgico estéril para que no se mueva durante la intervención.',
    clinicalContext: 'Montaje del campo quirúrgico tras el embrocado.',
    difficulty: 'básica'
  },
  {
    id: 'q-quir-5',
    moduleId: 'quirofano',
    question: 'En un paciente bajo anestesia general, ¿qué indica que el globo ocular se encuentre en posición rotada ventromedial (hacia abajo y adentro) con reflejo palpebral débil?',
    options: [
      'Que el paciente está despierto y siente dolor agudo',
      'Un plano anestésico quirúrgico adecuado (profundidad óptima para operar)',
      'Que el paciente ha fallecido de parada cardiorrespiratoria',
      'Que el paciente tiene un traumatismo craneoencefálico'
    ],
    correctIndex: 1,
    explanation: 'En el plano quirúrgico III (estadio 2 de Guedel adaptado), el globo ocular canino/felino rota hacia abajo y adentro (ventromedial) y el reflejo palpebral se atenúa o desaparece. Si el ojo vuelve al centro con pupila midriática fija, el plano es excesivamente profundo (peligro de sobredosis).',
    clinicalContext: 'Evaluación del plano anestésico a requerimiento del cirujano.',
    difficulty: 'intermedia'
  },

  // --- RAZAS Y MANEJO CLÍNICO ---
  {
    id: 'q-raz-1',
    moduleId: 'razas',
    question: '¿Cuáles de las siguientes características anatómicas forman parte del Síndrome Braquiocefálico en razas como el Bulldog Francés o Carlino?',
    options: [
      'Hocico excesivamente alargado y narinas gigantescas',
      'Estenosis de narinas (orificios nasales muy estrechos) y paladar blando elongado',
      'Columna vertebral con 9 vértebras lumbares',
      'Atrofia progresiva de la mandíbula inferior'
    ],
    correctIndex: 1,
    explanation: 'Los perros braquicéfalos sufren el síndrome de las vías respiratorias altas, caracterizado por narinas estenóticas, paladar blando excesivamente largo que ocluye la laringe, eversión de los sáculos laríngeos e hipoplasia traqueal. Esto dificulta enormemente la termorregulación y la ventilación.',
    clinicalContext: 'Recepción de un Bulldog en un día caluroso en Valencia con jadeo ruidoso.',
    difficulty: 'básica'
  },
  {
    id: 'q-raz-2',
    moduleId: 'razas',
    question: 'Para extraer sangre o canalizar la vena cefálica a un gato muy estresado y asustado en consulta, ¿cuál es la técnica de manejo respetuoso ("Cat Friendly") más aconsejada?',
    options: [
      'Inmovilizarlo aplastándolo fuertemente con tres personas contra la mesa metálica fría',
      'La técnica del "Gato Burrito", envolviéndolo suavemente con una toalla dejando al descubierto solo la pata delantera necesaria',
      'Sujetarlo exclusivamente por el rabo levantándolo en el aire',
      'Ponerle un bozal de perro apretado de cuero duro'
    ],
    correctIndex: 1,
    explanation: 'La técnica de la toalla o "burrito" proporciona contención segura, limita los movimientos de garras sin causar dolor ni pánico, mantiene al gato caliente y disminuye los estímulos visuales aterradores, garantizando la seguridad del personal y del animal.',
    clinicalContext: 'Extracción de sangre para perfil prequirúrgico en consulta felina.',
    difficulty: 'básica'
  },
  {
    id: 'q-raz-3',
    moduleId: 'razas',
    question: '¿Qué conformación anatómica predispone gravemente a razas como el Teckel (Dachshund) o el Basset Hound a sufrir hernias discales?',
    options: [
      'Conformación braquicéfala extrema',
      'Conformación condrodistrófica (patas cortas por osificación prematura y columna vertebral desproporcionadamente larga)',
      'Conformación dolicocéfala de pecho plano',
      'Ausencia de ligamento nucal en la columna'
    ],
    correctIndex: 1,
    explanation: 'Las razas condrodistróficas presentan una degeneración prematura condroide del núcleo pulposo de los discos intervertebrales (metaplasia cartilaginosa), lo que sumado a la gran longitud biomecánica de su lomo predispone a hernias discales tipo Hansen I.',
    clinicalContext: 'Consulta de urgencias: Teckel de 4 años que no apoya las patas traseras tras saltar del sofá.',
    difficulty: 'intermedia'
  },

  // --- PATOLOGÍAS Y URGENCIAS ---
  {
    id: 'q-pat-1',
    moduleId: 'patologias',
    question: 'Llega de urgencia un Gran Danés de 5 años con el abdomen muy hinchado, duro a la palpación y realizando constantes arcadas no productivas (intenta vomitar pero no sale nada). ¿Cuál es la sospecha clínica prioritaria?',
    options: [
      'Indigestión leve por bolas de pelo',
      'Síndrome de Dilatación-Torsión Vólvulo Gástrico (GDV), una emergencia quirúrgica vital',
      'Parvovirosis canina clásica',
      'Fractura de cadera izquierda'
    ],
    correctIndex: 1,
    explanation: 'Las arcadas improductivas asociadas a timpanismo abdominal agudo en un perro de raza grande con tórax profundo son patognomónicas de una Dilatación-Torsión de Estómago. El estómago gira sobre su eje ocluyendo entrada y salida e interrumpe el retorno venoso por la vena cava, causando shock en cuestión de horas si no se interviene.',
    clinicalContext: 'Triaje de noche en hospital de urgencias 24h.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-pat-2',
    moduleId: 'patologias',
    question: 'Un propietario acude diciendo que su gato macho castrado de 3 años "está estreñido porque va al arenero 20 veces al día, empuja, maúlla de dolor y solo echa dos gotitas con sangre". ¿Qué patología grave debes sospechar de inmediato?',
    options: [
      'Estreñimiento fecal común por falta de fibra',
      'Obstrucción uretral felina aguda (gato obstruido por cálculo o tapón uretral, FLUTD)',
      'Alergia a la arena de sílice',
      'Gastritis por hierba para gatos'
    ],
    correctIndex: 1,
    explanation: 'La tenesmo o disuria en gatos macho castrados frecuentemente es confundida por los tutores con estreñimiento. La uretra peniana se tapona por espasmo, arenilla o matriz proteica. La orina se retiene en vejiga, acumulando potasio en sangre (hiperpotasemia), lo que produce arritmias y paro cardíaco en 24-48h si no se sondaje con urgencia.',
    clinicalContext: 'Atención al mostrador y triaje inmediato en clínica veterinaria.',
    difficulty: 'intermedia'
  },
  {
    id: 'q-pat-3',
    moduleId: 'patologias',
    question: 'En el triaje veterinario bajo la escala internacional de colores, ¿cuál de los siguientes pacientes debe clasificarse con el código ROJO (atención inmediata sin espera)?',
    options: [
      'Gato con pulgas y picor continuo en el lomo desde hace tres días',
      'Perro que ha sufrido un atropello, se encuentra inconsciente y en apnea o paro respiratorio',
      'Cachorro con tos leve tras volver del parque',
      'Perro con un corte superficial en la almohadilla que ya no sangra'
    ],
    correctIndex: 1,
    explanation: 'El código ROJO se reserva en triaje exclusivamente para pacientes con parada cardiorrespiratoria, fallo circulatorio catastrófico, hemorragias arteriales desangrantes o colapso vital que morirán en cuestión de segundos o minutos si no se inicia soporte vital avanzado.',
    clinicalContext: 'Asignación de prioridades en el box de urgencias.',
    difficulty: 'básica'
  },
  {
    id: 'q-pat-4',
    moduleId: 'patologias',
    question: '¿Cuál es el vector transmisor responsable del contagio de la Leishmaniosis canina en la cuenca mediterránea (incluyendo Valencia)?',
    options: [
      'La garrapata común del perro (Rhipicephalus sanguineus)',
      'El flebótomo hembra (mosquito del género Phlebotomus)',
      'La pulga del gato (Ctenocephalides felis)',
      'El piojo masticador canino'
    ],
    correctIndex: 1,
    explanation: 'La Leishmaniosis no se contagia por mordedura ni por garrapatas, sino por la picadura de las hembras de insectos dípteros llamados flebótomos (Phlebotomus perniciosus y ariasi), que inoculan la forma promastigote del protozoo Leishmania infantum al alimentarse de sangre.',
    clinicalContext: 'Campañas preventivas y vacunación frente a leishmania en la Comunidad Valenciana.',
    difficulty: 'básica'
  },
  {
    id: 'q-pat-5',
    moduleId: 'patologias',
    question: 'Durante la Reanimación Cardiopulmonar (RCP) en perros y gatos siguiendo las directrices internacionales RECOVER, ¿a qué frecuencia deben realizarse las compresiones torácicas?',
    options: [
      '40 – 60 compresiones por minuto',
      '100 – 120 compresiones por minuto',
      '180 – 220 compresiones por minuto',
      '30 compresiones cada 10 minutos'
    ],
    correctIndex: 1,
    explanation: 'Las guías oficiales RECOVER establecen una frecuencia de 100 a 120 compresiones por minuto, deprimiendo el tórax entre un tercio y la mitad de su anchura, permitiendo la reexpansión completa y en ciclos continuos ininterrumpidos de 2 minutos.',
    clinicalContext: 'Entrenamiento de equipo y protocolo de parada cardiorrespiratoria.',
    difficulty: 'intermedia'
  }
];
