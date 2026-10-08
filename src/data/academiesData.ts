import { Academy } from '../types/atv';

export const valenciaAcademies: Academy[] = [
  {
    id: 'ised-valencia',
    name: 'ISED Valencia — Instituto Superior de Estudios',
    location: 'Carrer de Xàtiva, 14 / Marqués de Sotelo, 46002 Valencia (Junto a Estación del Norte)',
    zone: 'Valencia Centro',
    modality: 'Semipresencial',
    totalHours: 460,
    theoryHours: 300,
    practiceHours: 160,
    clinicPartnersDescription: 'Convenios con más de 45 clínicas y centros veterinarios concertados en Valencia capital, Torrent, Paterna, Gandia y Sagunto.',
    priceTotal: 2245,
    breakdown: [
      {
        concept: 'Matrícula y reserva de plaza',
        amount: 250,
        note: 'Garantiza plaza y acceso inmediato al campus online'
      },
      {
        concept: 'Docencia teórica presencial / streaming (9 mensualidades de 215 €)',
        amount: 1935,
        note: 'Clases con veterinarios colegiados en activo'
      },
      {
        concept: 'Seguro de Responsabilidad Civil y Accidentes en Prácticas',
        amount: 60,
        note: 'Cobertura legal obligatoria durante toda la estancia en clínica'
      },
      {
        concept: 'Material didáctico impreso, atlas anatómico y plataforma digital',
        amount: 0,
        note: 'Incluido en la matrícula (sin coste adicional)'
      }
    ],
    deadlines: [
      {
        id: 'ised-oct-2025',
        name: 'Convocatoria Otoño — Grupo Fin de Semana',
        deadlineDate: '2025-10-25',
        status: 'closing_soon',
        seatsLeft: 4,
        note: 'Últimas plazas para clases los viernes tarde y sábados mañana'
      },
      {
        id: 'ised-feb-2026',
        name: 'Convocatoria Invierno — Grupo Diario',
        deadlineDate: '2026-02-10',
        status: 'next_call',
        seatsLeft: 12,
        note: 'Matrícula anticipada con descuento por pronto pago disponible'
      }
    ],
    features: [
      'Clases impartidas 100% por veterinarios colegiados en la provincia de Valencia',
      'Talleres prácticos de quirófano y suturas en las instalaciones de Valencia',
      'Bolsa de trabajo activa con alta inserción laboral en hospitales 24h',
      'Certificado acreditativo de Auxiliar Técnico Veterinario (ATV)'
    ],
    contact: {
      phone: '963 53 08 30',
      email: 'valencia@ised.es',
      address: 'C/ Xàtiva 14, 1ª planta, 46002 Valencia',
      websiteUrl: 'https://www.ised.es/curso/auxiliar-tecnico-veterinario-valencia/'
    }
  },
  {
    id: 'cim-valencia',
    name: 'CIM Formación Valencia',
    location: 'Carrer del Pintor Sorolla, 4 / Periodista Azzati, 46002 Valencia',
    zone: 'Valencia Centro / Colón',
    modality: 'Presencial',
    totalHours: 550,
    theoryHours: 350,
    practiceHours: 200,
    clinicPartnersDescription: 'Prácticas hospitalarias de 200 horas en centros de referencia como Hospital Veterinario Valencia Sur, AniCura e IVC Evidensia.',
    priceTotal: 2410,
    breakdown: [
      {
        concept: 'Matrícula de inscripción y apertura de expediente',
        amount: 290,
        note: 'Incluye alta en el sistema educativo y carné de estudiante'
      },
      {
        concept: 'Cuotas de formación teórica y talleres (8 cuotas de 245 €)',
        amount: 1960,
        note: 'Formación presencial intensiva con grupos reducidos (máx. 16 alumnos)'
      },
      {
        concept: 'Pijama sanitario veterinario corporativo + tarjeta identificativa',
        amount: 45,
        note: 'Uniforme homologado para realizar las prácticas clínicas'
      },
      {
        concept: 'Seguro médico de accidentes y responsabilidad civil',
        amount: 75,
        note: 'Póliza suscrita con aseguradora médica de ámbito nacional'
      },
      {
        concept: 'Kit instrumental de quirófano personal para prácticas (pinzas, tijera, bisturí)',
        amount: 40,
        note: 'Material en propiedad que conserva el estudiante para su carrera'
      }
    ],
    deadlines: [
      {
        id: 'cim-nov-2025',
        name: 'Convocatoria Presencial Intensiva Valencia',
        deadlineDate: '2025-11-05',
        status: 'closing_soon',
        seatsLeft: 3,
        note: '¡Últimas 3 plazas disponibles en turno de mañanas!'
      },
      {
        id: 'cim-mar-2026',
        name: 'Convocatoria Primavera 2026',
        deadlineDate: '2026-03-01',
        status: 'next_call',
        seatsLeft: 16,
        note: 'Plazas abiertas para el nuevo ciclo lectivo'
      }
    ],
    features: [
      '200 horas reales de prácticas en hospitales veterinarios 24 horas de la Comunidad Valenciana',
      'Talleres monográficos incluidos: Anestesia y quirófano, Urgencias y Animales Exóticos',
      'Centro con más de 35 años de experiencia formando auxiliares técnicos',
      'Facilidades de pago fraccionado sin intereses bancarios'
    ],
    contact: {
      phone: '963 51 02 02',
      email: 'valencia@cimformacion.com',
      address: 'C/ Pintor Sorolla 4, 46002 Valencia',
      websiteUrl: 'https://www.cimformacion.com/cursos/auxiliar-tecnico-veterinario-atv-valencia/'
    }
  },
  {
    id: 'essat-valencia',
    name: 'ESSAT Formación Valencia',
    location: 'Gran Via del Marqués del Túria, 49, 46005 Valencia (Zona Ruzafa / Gran Vía)',
    zone: 'Gran Vía / Ensanche',
    modality: 'Semipresencial',
    totalHours: 500,
    theoryHours: 320,
    practiceHours: 180,
    clinicPartnersDescription: 'Red de más de 30 centros veterinarios colaboradores en Valencia, L\'Horta Nord, Torrent y Camp de Túria.',
    priceTotal: 2220,
    breakdown: [
      {
        concept: 'Matrícula de acceso y plataforma e-learning 24/7',
        amount: 200,
        note: 'Acceso a videoclases grabadas y foros de dudas'
      },
      {
        concept: 'Mensualidades lectivas (10 cuotas mensuales de 190 €)',
        amount: 1900,
        note: 'Tutorías presenciales quincenales y resolución de casos clínicos'
      },
      {
        concept: 'Tasas de expedición del Diploma Profesional y Carnet ATV',
        amount: 120,
        note: 'Certificado oficial acreditativo al finalizar las prácticas'
      },
      {
        concept: 'Seguro de accidentes y cobertura de prácticas hospitalarias',
        amount: 0,
        note: 'Bonificado al 100% por la academia'
      }
    ],
    deadlines: [
      {
        id: 'essat-oct-2025',
        name: 'Convocatoria Octubre — Turno Tardes',
        deadlineDate: '2025-10-30',
        status: 'open',
        seatsLeft: 7,
        note: 'Abierta la selección de centro de prácticas para este curso'
      },
      {
        id: 'essat-ene-2026',
        name: 'Convocatoria Enero Nuevo Año',
        deadlineDate: '2026-01-15',
        status: 'next_call',
        seatsLeft: 14,
        note: 'Periodo de preinscripción con beca de matrícula del 10%'
      }
    ],
    features: [
      'Garantía de prácticas por contrato firmado antes de iniciar la formación',
      'Especialización adicional opcional en Atención al Cliente y Gestión de Clínica',
      'Talleres prácticos con modelos anatómicos y simulación de quirófano en aula',
      'Bolsa de empleo exclusiva gestionada con clínicas de la Comunidad Valenciana'
    ],
    contact: {
      phone: '963 81 22 44',
      email: 'info.valencia@essatformacion.com',
      address: 'Gran Vía Marqués del Turia 49, 46005 Valencia',
      websiteUrl: 'https://www.essatformacion.com/cursos-veterinaria/curso-auxiliar-tecnico-veterinario-valencia'
    }
  },
  {
    id: 'campus-training-valencia',
    name: 'Campus Training Valencia',
    location: 'Carrer de Colón, 26, 46004 Valencia (Pleno centro comercial Colón)',
    zone: 'C/ Colón',
    modality: 'Flexible + Prácticas',
    totalHours: 600,
    theoryHours: 300,
    practiceHours: 300,
    clinicPartnersDescription: 'Hasta 300 horas de prácticas garantizadas en clínicas y hospitales de toda la provincia de Valencia adaptadas al horario del alumno.',
    priceTotal: 2160,
    breakdown: [
      {
        concept: 'Matrícula inicial y asignación de tutor personal 1 a 1',
        amount: 180,
        note: 'Plan de estudio adaptado al ritmo de cada alumno'
      },
      {
        concept: 'Financiación formativa flexible (12 mensualidades de 165 €)',
        amount: 1980,
        note: 'Cuotas cómodas sin intereses'
      },
      {
        concept: 'Gestión y seguro para 300 horas de prácticas en clínicas',
        amount: 0,
        note: 'Sin coste añadido (garantizadas por contrato)'
      },
      {
        concept: 'Campus virtual, temarios digitales y manuales físicos',
        amount: 0,
        note: 'Incluidos los envíos de material a domicilio'
      }
    ],
    deadlines: [
      {
        id: 'campus-flex-2025',
        name: 'Matrícula Continua Flexible — Convocatoria Abierta',
        deadlineDate: '2025-10-31',
        status: 'open',
        seatsLeft: 9,
        note: 'Puedes comenzar cualquier día del mes con tutor individual'
      }
    ],
    features: [
      'Máxima flexibilidad: ideal para compaginar con trabajo u otros estudios',
      'Hasta 300 horas de prácticas clínicas reales (de las más amplias de Valencia)',
      'Tutor pedagógico individualizado que realiza seguimiento semanal',
      'Preparación de CV y entrevistas de trabajo para clínicas veterinarias'
    ],
    contact: {
      phone: '963 94 48 00',
      email: 'valencia@campustraining.es',
      address: 'C/ Colón 26, 46004 Valencia',
      websiteUrl: 'https://www.campustraining.es/cursos/veterinaria/auxiliar-tecnico-veterinario-valencia/'
    }
  },
  {
    id: 'nubika-valencia',
    name: 'Nubika Escuela Veterinaria Valencia',
    location: 'Carrer de Sant Vicent Màrtir, 85, 46007 Valencia (Junto a Plaza de España)',
    zone: 'Plaza de España / San Vicente',
    modality: 'Semipresencial',
    totalHours: 550,
    theoryHours: 350,
    practiceHours: 200,
    clinicPartnersDescription: 'Estancias formativas en clínicas y centros veterinarios concertados en Valencia y área metropolitana.',
    priceTotal: 2320,
    breakdown: [
      {
        concept: 'Matrícula y pack de bienvenida con instrumental básico',
        amount: 220,
        note: 'Incluye fonendoscopio básico y termómetro clínico digital'
      },
      {
        concept: 'Curso completo con clases telepresenciales y masterclasses (10 cuotas de 210 €)',
        amount: 2100,
        note: 'Masterclasses mensuales con veterinarios especialistas'
      },
      {
        concept: 'Seguro de responsabilidad civil y accidentes en estancia clínica',
        amount: 0,
        note: 'Incluido en el convenio formativo'
      },
      {
        concept: 'Diploma acreditativo y acreditación de horas prácticas',
        amount: 0,
        note: 'Sin tasas de expedición añadidas'
      }
    ],
    deadlines: [
      {
        id: 'nubika-nov-2025',
        name: 'Convocatoria Noviembre 2025',
        deadlineDate: '2025-11-12',
        status: 'open',
        seatsLeft: 6,
        note: 'Plazas limitadas por aula virtual y grupos de prácticas'
      }
    ],
    features: [
      'Masterclasses temáticas en directo sobre exóticos, rehabilitación y anestesia',
      'Pack de bienvenida con material clínico para prácticas desde el primer día',
      'Acceso vitalicio a actualizaciones del temario en el campus',
      'Convenios con protectoras y centros de recuperación de fauna'
    ],
    contact: {
      phone: '900 83 83 23',
      email: 'hola@nubika.es',
      address: 'C/ Sant Vicent Màrtir 85, 46007 Valencia',
      websiteUrl: 'https://nubika.es/cursos/veterinaria/auxiliar-tecnico-veterinario/'
    }
  }
];
