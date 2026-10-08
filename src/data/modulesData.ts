import { StudyModule } from '../types/atv';

export const studyModules: StudyModule[] = [
  {
    id: 'anatomia',
    title: 'Anatomía y Fisiología Básica',
    subtitle: 'Planos corporales, esqueleto, órganos vitales y constantes fisiológicas',
    iconName: 'Activity',
    color: 'emerald',
    recommendedOrder: 1,
    description: 'La base indispensable de todo ATV: cómo funciona el cuerpo del perro y gato, qué valores son normales y cómo detectar anomalías en la exploración.',
    lessons: [
      {
        id: 'anat-1',
        moduleId: 'anatomia',
        title: '1. Constantes Vitales Clínicas (Perro y Gato)',
        durationMinutes: 18,
        summary: 'Aprende a medir temperatura, frecuencia cardíaca, respiratoria y tiempo de relleno capilar sin miedo.',
        sections: [
          {
            title: '¿Por qué las constantes vitales son la primera tarea del ATV?',
            content: [
              'Al recibir a un paciente en consulta o en urgencias, el auxiliar veterinario es quien realiza la exploración inicial (Triage o Triaje). Las constantes nos indican de inmediato si el animal está en peligro vital o estable.',
              'Jamás des por sentado el estado de un paciente por su apariencia externa: un perro tranquilo puede estar en hipotermia severa o en shock.'
            ],
            keyPoints: [
              'Siempre mide la temperatura por vía rectal con termómetro digital lubricado con vaselina.',
              'El pulso se palpa principalmente en la arteria femoral (cara interna del muslo).',
              'El tiempo de relleno capilar (TRC) normal es SIEMPRE inferior a 2 segundos.'
            ],
            clinicalTip: 'Consejo en consulta: Habla suavemente al paciente mientras colocas el termómetro. En gatos, hazlo al final de la exploración para evitar que se estrese antes de tiempo.',
            table: {
              headers: ['Parámetro', 'Perro (Valores normales)', 'Gato (Valores normales)', 'Significado clínico'],
              rows: [
                ['Temperatura Rectal', '37,5 °C – 39,0 °C', '38,0 °C – 39,2 °C', '> 39,5 °C = Fiebre/Golpe calor | < 37 °C = Hipotermia'],
                ['Frecuencia Cardíaca (FC)', '60 – 140 lpm (más alta en razas pequeñas)', '140 – 220 lpm', 'Taquicardia (dolor/estrés/shock) o Bradicardia'],
                ['Frecuencia Respiratoria (FR)', '10 – 30 rpm (respiraciones/min)', '20 – 30 rpm', 'Taquipnea / Disnea (dificultad respiratoria)'],
                ['TRC (Tiempo Relleno Capilar)', '< 2 segundos', '< 2 segundos', 'Presionar encía: > 2 seg indica mala perfusión/shock'],
                ['Color de Mucosas', 'Rosa claro brillante', 'Rosa pálido / Salmón', 'Pálidas (anemia/shock), Azuladas (cianosis), Amarillas (ictericia)']
              ]
            }
          },
          {
            title: 'Color de Mucosas y Evaluación de Hidratación',
            content: [
              'Las mucosas (encías, conjuntiva ocular, mucosa genital) son una ventana directa al sistema vascular del animal.',
              'El pliegue cutáneo: levantamos la piel del lomo y soltamos. Si vuelve de inmediato, hidratación normal. Si tarda 2-4 segundos, deshidratación del 6-8%. Si queda levantada como una carpa, deshidratación grave (> 10-12%).'
            ],
            keyPoints: [
              'Mucosas blancas/pálidas: sospecha inmediata de hemorragia interna, anemia o shock.',
              'Mucosas cianóticas (azul/violáceo): falta grave de oxígeno (urgencia máxima).',
              'Mucosas ictéricas (amarillentas): problemas hepáticos o hemólisis masiva.'
            ]
          }
        ]
      },
      {
        id: 'anat-2',
        moduleId: 'anatomia',
        title: '2. Eje Esquelético y Planos Anatómicos',
        durationMinutes: 22,
        summary: 'Orientación espacial veterinaria: craneal, caudal, dorsal, ventral y fórmula vertebral.',
        sections: [
          {
            title: 'Terminología direccional en veterinaria',
            content: [
              'En medicina veterinaria no decimos "arriba" o "abajo" porque los animales caminan en cuatro patas. Usamos ejes universales para que el veterinario y el auxiliar se entiendan sin error en radiografías y quirófano.',
              'Craneal: hacia la cabeza. Caudal: hacia la cola. Dorsal: hacia la columna/espalda. Ventral: hacia el vientre o suelo.'
            ],
            keyPoints: [
              'Medial: más cerca de la línea media corporal.',
              'Lateral: hacia el exterior o costado.',
              'Proximal: cercano al punto de unión del miembro con el cuerpo.',
              'Distal: alejado (ejemplo: las falanges o pezuñas son distales respecto al fémur).'
            ],
            clinicalTip: 'Regla mnemotécnica para radiografía: Cuando te pidan una proyección "VD", significa "Ventro-Dorsal" (los rayos entran por el vientre y salen por el dorso; el animal está boca arriba).'
          },
          {
            title: 'Fórmula Vertebral Canina y Felina',
            content: [
              'Tanto el perro como el gato comparten casi la misma estructura vertebral principal:',
              'Cervicales: 7 (C1 Atlas, C2 Axis). Torácicas: 13 (asociadas a costillas). Lumbares: 7. Sacras: 3 (fusionadas). Caudales o coxígeas: 20-23 (según longitud de la cola).'
            ],
            table: {
              headers: ['Región Vertebral', 'Cantidad', 'Función / Relevancia Clínica'],
              rows: [
                ['Cervical (C)', '7', 'Soporte y movimiento del cráneo. C1 Atlas y C2 Axis'],
                ['Torácica (T)', '13', 'Articulan con las 13 costillas protegiendo corazón y pulmones'],
                ['Lumbar (L)', '7', 'Gran soporte de peso. Zona habitual de hernias discales en Teckels'],
                ['Sacra (S)', '3', 'Fusionadas en el sacro, articulan con la pelvis'],
                ['Caudal / Coxígea (Cd)', '20 – 23', 'Cola y equilibrio']
              ]
            }
          }
        ]
      },
      {
        id: 'anat-3',
        moduleId: 'anatomia',
        title: '3. Aparato Digestivo y Órganos Abdominales',
        durationMinutes: 20,
        summary: 'Recorrido del alimento, estómago monogástrico y órganos accesorios vitales.',
        sections: [
          {
            title: 'Características del carnívoro doméstico',
            content: [
              'Perros y gatos tienen un estómago monogástrico muy ácido (pH 1-2) diseñado para digerir carne y huesos, y un intestino relativamente corto comparado con herbívoros.',
              'El páncreas cumple función endocrina (insulina/glucagón) y exocrina (enzimas digestivas: amilasa, lipasa, tripsina). Su inflamación produce pancreatitis, muy frecuente por ingesta de grasas.'
            ],
            keyPoints: [
              'Hígado: filtra toxinas, produce bilis y factores de coagulación.',
              'Bazo: almacena y recicla glóbulos rojos; se lesiona fácilmente en atropellos.',
              'Riñones: filtran urea y creatinina. En gatos mayores es crítico vigilar la insuficiencia renal crónica (IRC).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'farmacologia',
    title: 'Farmacología y Terapéutica Veterinaria',
    subtitle: 'Cálculo de dosis, vías de administración y familias de fármacos esenciales',
    iconName: 'Pill',
    color: 'teal',
    recommendedOrder: 2,
    description: 'Aprende a preparar medicaciones con precisión milimétrica, dominar la regla de tres de clínica y conocer los fármacos más usados en el hospital.',
    lessons: [
      {
        id: 'farm-1',
        moduleId: 'farmacologia',
        title: '1. Vías de Administración en Medicina Veterinaria',
        durationMinutes: 25,
        summary: 'Cuándo y cómo utilizar la vía intravenosa, subcutánea, intramuscular y oral de manera segura.',
        sections: [
          {
            title: 'Comparativa de vías de absorción',
            content: [
              'Como ATV, prepararás jeringas y sueros continuamente. Elegir y conocer la vía prescrita por el veterinario es vital para la velocidad de acción y seguridad del paciente.',
              'Vía Intravenosa (IV): Biodisponibilidad del 100%. Efecto instantáneo. Obligatoria para anestésicos, fluidoterapia y fármacos de emergencia.',
              'Vía Subcutánea (SC): Absorción lenta y sostenida. Ideal para vacunas, insulina y fluidos de mantenimiento ambulatorios.',
              'Vía Intramuscular (IM): Absorción moderadamente rápida. Músculo cuádriceps, semimembranoso/semitendinoso (¡cuidado con el nervio ciático!) o epiaxiales lumbares.'
            ],
            keyPoints: [
              'Antes de inyectar IM o SC: aspirar SIEMPRE con el émbolo. Si sale sangre, rectificar posición.',
              'Vía Oral (PO): comprimidos, jarabes, pastas. Nunca forzar en animales con vómitos incoercibles o inconscientes.'
            ],
            clinicalTip: '¡Atención al nervio ciático! Al inyectar en la pata trasera (semitendinoso/semimembranoso), dirige la aguja caudalmente para no lesionar jamás el nervio ciático, lo que causaría cojera permanente.'
          }
        ]
      },
      {
        id: 'farm-2',
        moduleId: 'farmacologia',
        title: '2. Cálculo de Dosis: La Fórmula Mágica del ATV',
        durationMinutes: 30,
        summary: 'Domina los cálculos de miligramos y mililitros con ejemplos paso a paso.',
        sections: [
          {
            title: 'El paso a paso que no falla nunca',
            content: [
              'Muchos auxiliares se asustan con los números al principio, pero solo hay 2 fórmulas sencillas que se repiten en el 99% de los casos:',
              'Paso 1: Calcular la dosis en miligramos (mg):',
              'Dosis en mg = Peso del animal (kg) × Dosis pautada (mg/kg)',
              'Paso 2: Calcular el volumen en mililitros (ml) a extraer del vial:',
              'Volumen en ml = Dosis en mg / Concentración del fármaco (mg/ml)'
            ],
            table: {
              headers: ['Caso Práctico', 'Datos', 'Paso 1 (Dosis mg)', 'Paso 2 (Volumen ml a inyectar)'],
              rows: [
                ['Perro Toby (20 kg)', 'Meloxicam 0,2 mg/kg. Concentración vial: 5 mg/ml', '20 kg × 0,2 mg/kg = 4 mg', '4 mg / (5 mg/ml) = 0,8 ml'],
                ['Gata Luna (4 kg)', 'Amoxicilina 15 mg/kg. Concentración vial: 100 mg/ml', '4 kg × 15 mg/kg = 60 mg', '60 mg / (100 mg/ml) = 0,6 ml'],
                ['Cachorro Rocky (2,5 kg)', 'Metadona 0,2 mg/kg. Concentración vial: 10 mg/ml', '2,5 kg × 0,2 mg/kg = 0,5 mg', '0,5 mg / (10 mg/ml) = 0,05 ml (usar jeringa de insulina)']
              ]
            },
            clinicalTip: 'Regla de oro: Si el resultado te da más de 5-10 ml en un animal pequeño, PARA Y REVISA. Puede que hayas multiplicado en vez de dividir.'
          }
        ]
      },
      {
        id: 'farm-3',
        moduleId: 'farmacologia',
        title: '3. Familias Principales y Fármacos Prohibidos',
        durationMinutes: 20,
        summary: 'AINEs, antibióticos y toxicidades letales que debes advertir a los tutores.',
        sections: [
          {
            title: 'Fármacos humanos altamente tóxicos en mascotas',
            content: [
              'Paracetamol: Letal en gatos debido a deficiencia de glucuroniltransferasa. Provoca metahemoglobinemia (sangre color chocolate) y fallo hepático fulminante.',
              'Ibuprofeno y Aspirina: Provocan úlceras gástricas perforantes e insuficiencia renal aguda en perros y gatos.'
            ],
            keyPoints: [
              'AINEs veterinarios seguros con receta: Meloxicam (Metacam), Robenacoxib (Onsior), Carprofeno (Rimadyl).',
              'Antibióticos comunes: Amoxicilina-Ácido Clavulánico (Sinulox), Cefalexina, Enrofloxacino.',
              'Antiparasitarios: Ivermectina (¡Tóxica en razas con mutación del gen MDR1 como Collies y Pastores Australianos!).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'quirofano',
    title: 'Instrumental de Quirófano y Anestesia',
    subtitle: 'Nombres de pinzas, tiempos quirúrgicos, asepsia y monitorización',
    iconName: 'Scissors',
    color: 'sky',
    recommendedOrder: 3,
    description: 'Conoce cada tijera, pinza y sutura como la palma de tu mano, prepara al paciente asépticamente y asiste al cirujano.',
    lessons: [
      {
        id: 'quir-1',
        moduleId: 'quirofano',
        title: '1. Clasificación del Instrumental Quirúrgico',
        durationMinutes: 25,
        summary: 'Diferencia Metzenbaum de Mayo, pinzas hemostáticas y porta-agujas.',
        sections: [
          {
            title: 'Los 4 grupos de instrumental quirúrgico',
            content: [
              '1. Diéresis o corte: Mangos de bisturí (nº 3 para hojas pequeñas 10-15, nº 4 para hojas grandes 20-24) y tijeras.',
              '2. Disección y prensión: Pinzas de tejido (Adson con dientes de ratón para piel firme, Adson sin dientes para tejido delicado).',
              '3. Hemostasia: Pinzas con cremallera para ocluir vasos sanguíneos.',
              '4. Síntesis o sutura: Porta-agujas para manipular la aguja curva.'
            ],
            table: {
              headers: ['Instrumento', 'Tipo', 'Característica Visual', 'Uso Clínico'],
              rows: [
                ['Tijera Metzenbaum', 'Corte / Disección', 'Hojas largas y delgadas, ramas finas', 'Disección de tejidos blandos y delicados. NUNCA cortar suturas con ella'],
                ['Tijera Mayo', 'Corte pesado', 'Hojas gruesas, rectas o curvas', 'Corte de tejidos duros (fascias, tendones) y material de sutura'],
                ['Pinza Mosquito (Halsted)', 'Hemostasia', 'Pequeña, estriada transversalmente', 'Oclusión de pequeños vasos sanguíneos sangrantes'],
                ['Pinza Kelly / Crile', 'Hemostasia', 'Más grande que Mosquito', 'Vasos de mayor calibre y pedículos ováricos'],
                ['Pinza Backhaus (Campo)', 'Sujeción', 'Puntas agudas en pinza curva', 'Fijar paños quirúrgicos de campo estéril a la piel'],
                ['Porta-agujas Mayo-Hegar', 'Síntesis', 'Mandíbula corta y estriada con cremallera', 'Sostener y guiar la aguja de sutura con precisión'],
                ['Porta-agujas Mathieu', 'Síntesis', 'Mango con resorte sin anillas', 'Cierre y apertura rápida con presión en la palma']
              ]
            },
            clinicalTip: '¡Regla sagrada de quirófano! Jamás cortes gasas o hilos de sutura con las tijeras Metzenbaum; perderán su filo para tejidos blandos y el cirujano se enfadará.'
          }
        ]
      },
      {
        id: 'quir-2',
        moduleId: 'quirofano',
        title: '2. Preparación del Paciente y Protocolo Aséptico',
        durationMinutes: 20,
        summary: 'Rasurado, embrocado centrífugo y campos quirúrgicos.',
        sections: [
          {
            title: 'El protocolo de lavado del campo quirúrgico',
            content: [
              'Rasurado: Con cuchilla nº 40 a favor y en contra del pelo, abarcando al menos 10-15 cm alrededor de la incisión prevista.',
              'Limpieza en espiral centrífuga: Con gasa impregnada en Clorhexidina jabonosa al 4% o Povidona yodada. Se empieza en el centro de la incisión y se gira en círculos concéntricos hacia afuera. NUNCA vuelvas al centro con la misma gasa.'
            ],
            keyPoints: [
              'Se realiza un mínimo de 3 pases de limpieza alternando con alcohol o suero estéril.',
              'El personal del equipo viste pijama quirúrgico, gorro, mascarilla y calzas antes de entrar a quirófano.'
            ]
          }
        ]
      },
      {
        id: 'quir-3',
        moduleId: 'quirofano',
        title: '3. Monitorización Anestésica para el ATV',
        durationMinutes: 25,
        summary: 'Capnógrafo, pulsioxímetro, presión arterial y reflejos del paciente dormido.',
        sections: [
          {
            title: 'Parámetros del monitor multiparamétrico',
            content: [
              'La misión más importante del auxiliar durante la cirugía es vigilar al paciente anestesiado segundo a segundo.',
              'Pulsioximetría (SpO2): Porcentaje de saturación de hemoglobina. Normal: 95-100%. Si baja de 90%, hipoxemia grave.',
              'Capnografía (EtCO2): Dióxido de carbono al final de la espiración. Normal: 35-45 mmHg. Permite detectar apnea o desconexión del tubo antes de que el corazón falle.',
              'Presión Arterial Media (PAM): Debe mantenerse SIEMPRE por encima de 60 mmHg para asegurar la perfusión de los riñones.'
            ],
            table: {
              headers: ['Signo / Reflejo', 'Plano Ligero (Despierto)', 'Plano Quirúrgico Ideal', 'Plano Demasiado Profundo (Peligro)'],
              rows: [
                ['Reflejo Palpebral', 'Presente y activo', 'Débil o ausente', 'Totalmente ausente'],
                ['Posición del Ojo', 'Central', 'Rotado ventromedial (hacia abajo y adentro)', 'Central con midriasis (pupila dilatada fija)'],
                ['Tono Mandibular', 'Fuerte resistencia', 'Relajado pero con ligera tensión', 'Flácido por completo'],
                ['FC y Presión Arterial', 'Aumenta ante estímulo', 'Estable', 'Hipotensión y bradicardia severa']
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'razas',
    title: 'Razas, Manejo Clínico y Etología',
    subtitle: 'Morfología, predisposiciones patológicas, contención segura y lenguaje corporal',
    iconName: 'Dog',
    color: 'amber',
    recommendedOrder: 4,
    description: 'Aprende a sujetar a perros difíciles y gatos asustados sin causarles daño ni sufrir mordeduras, reconociendo además los riesgos de cada raza.',
    lessons: [
      {
        id: 'raz-1',
        moduleId: 'razas',
        title: '1. Clasificación Morfológica y Predisposiciones',
        durationMinutes: 20,
        summary: 'Braquicéfalos, dolicocéfalos, condrodistróficos y sus patologías típicas.',
        sections: [
          {
            title: 'Tipos de conformación craneal y corporal',
            content: [
              'Braquicéfalos (cráneo ancho y hocico achatado): Bulldog Francés, Bulldog Inglés, Carlino/Pug, Bóxer, gato Persa. Sufren Síndrome Braquiocefálico (narinas estenóticas, paladar blando elongado, eversión de sáculos laríngeos). ¡Extremo cuidado con el calor y el estrés!',
              'Dolicocéfalos (cabeza larga y estrecha): Galgo, Collie, Doberman. Mayor riesgo de aspergilosis nasal y torsión gástrica.',
              'Mesocefálicos (proporciones equilibradas): Pastor Alemán, Labrador, Beagle.',
              'Condrodistróficos (patas cortas y columna larga): Teckel, Basset Hound, Corgi. Muy propensos a hernias discales (enfermedad de disco intervertebral).'
            ]
          }
        ]
      },
      {
        id: 'raz-2',
        moduleId: 'razas',
        title: '2. Manejo Seguro y Manejo "Cat Friendly"',
        durationMinutes: 22,
        summary: 'Técnica de burrito con toalla, bozal de lazo y venopunción tranquila.',
        sections: [
          {
            title: 'El arte de la contención veterinaria',
            content: [
              'Contención no significa aplastar al animal; significa inmovilizar de forma firme y calmada para proteger al paciente y al equipo clínico.',
              'Técnica del Gato Burrito: Envolver al gato con una toalla gruesa dejando solo una pata libre para canalizar o extraer sangre. Reduce el estrés al 90%.',
              'Bozal de lazo: Si un perro agresivo o dolorido no tiene bozal a mano, se improvisa con una venda de gasa ancha con nudo dorsal y doble lazada tras las orejas.'
            ],
            keyPoints: [
              'Nunca mires fijamente a los ojos a un perro temeroso ni te inclines directamente sobre su lomo.',
              'Venopunción cefálica: El ATV abraza la cabeza del perro con un brazo y con la otra mano rota ligeramente la extremidad anterior ocluyendo la vena en el codo.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'patologias',
    title: 'Patologías Comunes, Urgencias y Triaje',
    subtitle: 'Enfermedades infecciosas críticas, triaje de urgencias y RCP veterinaria',
    iconName: 'ShieldAlert',
    color: 'rose',
    recommendedOrder: 5,
    description: 'Identifica al instante a pacientes críticos: parvovirus, torsión de estómago, obstrucción urinaria felina y escala de Manchester.',
    lessons: [
      {
        id: 'pat-1',
        moduleId: 'patologias',
        title: '1. Enfermedades Infecciosas Críticas',
        durationMinutes: 24,
        summary: 'Parvovirosis, Moquillo, Panleucopenia felina y Leishmaniosis.',
        sections: [
          {
            title: 'Patologías infecciosas que verás a diario',
            content: [
              'Parvovirosis Canina: Virus resistente sin envuelta. Afecta cachorros no vacunados. Destruye las vellosidades intestinales causando diarrea hemorrágica con olor característico fétido y vómitos incoercibles.',
              'Moquillo Canino (Distemper): Morbillivirus. Fase catarral (mocos, tos), fase digestiva, hiperqueratosis de almohadillas y fase neurológica (mioclonías, convulsiones).',
              'Panleucopenia Felina: El "parvo del gato". Destruye los glóbulos blancos causando inmunodepresión severa y deshidratación brutal.',
              'Leishmaniosis Canina: Provocada por el parásito protozoo Leishmania infantum, transmitido por la picadura del flebótomo (mosquito hembra Phlebotomus). Causa alopecia periocular (gafas), onicogrifosis (uñas largas) e insuficiencia renal.'
            ],
            clinicalTip: 'Protocolo de aislamiento en parvovirus: El parvovirus se transmite por fómites (ropa, zapatos). El ATV debe usar bata desechable, guantes y desinfectar con lejía diluida 1:30 (la clorhexidina NO lo destruye).'
          }
        ]
      },
      {
        id: 'pat-2',
        moduleId: 'patologias',
        title: '2. Urgencias Vitales Frecuentes',
        durationMinutes: 26,
        summary: 'Dilatación-Torsión Vólvulo Gástrico (GDV) y Síndrome Urológico Felino (FLUTD).',
        sections: [
          {
            title: 'Torsión Gástrica (GDV)',
            content: [
              'Ocurre principalmente en razas grandes de pecho profundo (Gran Danés, Pastor Alemán, Weimaraner) tras comer con ansia y hacer ejercicio.',
              'Síntomas clave: Arcadas no productivas (intenta vomitar y no sale nada), abdomen timpánico duro como un tambor y shock inminente.',
              'Acción del ATV: Canalizar 2 vías de gran calibre en extremidades anteriores (las traseras tienen retorno venoso colapsado por compresión de la cava).'
            ]
          },
          {
            title: 'Obstrucción Uretral Felina (Gato obstruido / FLUTD)',
            content: [
              'Típico en gatos macho castrados por su uretra estrecha. Tapón mucoso o arenilla de estruvita.',
              'El tutor suele decir: "Mi gato tiene estreñimiento, va al arenero y llora". En realidad tiene la vejiga llena a tensión (vejiga pletórica como una pelota de tenis dura).',
              '¡Peligro de muerte por hiperpotasemia en 24-48 horas si no se desobstruye!'
            ]
          }
        ]
      },
      {
        id: 'pat-3',
        moduleId: 'patologias',
        title: '3. Triaje y Soporte Vital Básico (RCP)',
        durationMinutes: 20,
        summary: 'Clasificación de colores en triaje y protocolo RECOVER de compresiones cardíacas.',
        sections: [
          {
            title: 'Escala de Triaje Veterinario',
            content: [
              'El triaje es la herramienta que permite al ATV discernir qué paciente no puede esperar ni un segundo y cuál puede aguardar en la sala de espera sin riesgo vital.',
              'En urgencias no se atiende por orden de llegada, sino por estricta prioridad fisiológica según las constantes vitales.'
            ],
            table: {
              headers: ['Nivel / Color', 'Condición Clínica', 'Tiempo de Espera Máximo', 'Ejemplos'],
              rows: [
                ['Rojo (Reanimación)', 'Peligro de muerte inminente', '0 minutos (Inmediato)', 'Parada cardiorrespiratoria, hemorragia arterial activa, colapso'],
                ['Naranja (Emergencia)', 'Alto riesgo vital', '< 15 minutos', 'Disnea grave, convulsiones prolongadas, sospecha de torsión gástrica'],
                ['Amarillo (Urgente)', 'Estable pero con dolor agudo', '< 60 minutos', 'Vómitos continuos, fractura cerrada, dolor abdominal moderado'],
                ['Verde (No urgente)', 'Problema leve o rutinario', '< 120 minutos', 'Dermatitis leve, corte de uñas, cojera sin dolor agudo']
              ]
            },
            keyPoints: [
              'RCP Veterinaria (RECOVER): 100 a 120 compresiones por minuto.',
              'Profundidad de compresión: 1/3 a 1/2 del diámetro torácico.',
              'Ciclos de 2 minutos sin interrupciones para no perder presión de perfusión coronaria.'
            ]
          }
        ]
      }
    ]
  }
];
