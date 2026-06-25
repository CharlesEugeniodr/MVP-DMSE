/**
 * ontology-data.js
 * 
 * Ontological metadata for all 30 dimensions of the
 * Octagonal Vector Mesh Theory (Teoria da Malha Octagonal Vetorial)
 * by Charles de Paula Eugênio.
 *
 * Data sourced from: livro_completo.txt (lines 2258–3272)
 * Type classifications from: livro_completo.txt (lines 1869–1875)
 */

// ─── Dimension Types ────────────────────────────────────────────────────────

export const DIMENSION_TYPES = {
  SPATIAL_REINFORCEMENT: {
    name: 'Reforço Espacial',
    nameEn: 'Spatial Reinforcement',
    color: '#4CAF50',
    count: 6
  },
  TEMPORAL_REVERSAL: {
    name: 'Reversão Temporal',
    nameEn: 'Temporal Reversal',
    color: '#2196F3',
    count: 4
  },
  ENERGY_POLARITY: {
    name: 'Polaridade Energética',
    nameEn: 'Energy Polarity',
    color: '#FF9800',
    count: 5
  },
  VECTOR_CONVERGENCE: {
    name: 'Convergência Vetorial',
    nameEn: 'Vector Convergence',
    color: '#9C27B0',
    count: 6
  },
  FREQUENCY_TRANSITION: {
    name: 'Transição Frequencial',
    nameEn: 'Frequency Transition',
    color: '#F44336',
    count: 3
  },
  CRYSTALLIZED_DENSITY: {
    name: 'Densidade Cristalizada',
    nameEn: 'Crystallized Density',
    color: '#607D8B',
    count: 4
  },
  VACUUM_STABILIZATION: {
    name: 'Estabilização do Vácuo',
    nameEn: 'Vacuum Stabilization',
    color: '#795548',
    count: 2
  }
};

// ─── Dimension Bands ────────────────────────────────────────────────────────

export const DIMENSION_BANDS = {
  FUNDAMENTAL: {
    name: 'Fundamental',
    nameEn: 'Fundamental',
    range: [1, 10]
  },
  INTERMEDIATE: {
    name: 'Intermediária',
    nameEn: 'Intermediate',
    range: [11, 20]
  },
  ELEVATED: {
    name: 'Elevada',
    nameEn: 'Elevated',
    range: [21, 30]
  }
};

// ─── 30 Dimensions ──────────────────────────────────────────────────────────

export const DIMENSIONS_ONTOLOGY = [
  // ── D1 ──────────────────────────────────────────────────────────────────
  {
    id: 0,
    number: 1,
    name: 'Linearidade Pura',
    nameEn: 'Pure Linearity',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A primeira dimensão representa o estado primordial da direção vetorial — o eixo x, a linha. ' +
      'Esse vetor unidimensional carrega a semente do movimento e inaugura o princípio da intencionalidade vetorial: algo pode ir de A para B. ' +
      'É a costura inicial da realidade, o fio primordial de onde todo o tecido dimensional será tecido.',
    application:
      'Permite o desenvolvimento de sistemas baseados em vetores direcionais simples, como trilhos de partículas, movimentações controladas em nanoengenharia e leitura digital linear (bit a bit).',
    icon: '➡️',
    color: '#4CAF50'
  },

  // ── D2 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    number: 2,
    name: 'Ortogonalidade',
    nameEn: 'Orthogonality',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A segunda dimensão marca a emergência da oposição estruturada, introduzindo a coexistência de duas direções perpendiculares: o eixo y em relação ao x. ' +
      'Ontologicamente, o Ser agora se bifurca, percebe direções contrastantes e forma o plano. ' +
      'Os vetores começam a formar interseções — cruzamentos tensoriais e nós dimensionais.',
    application:
      'Presente em toda a engenharia e tecnologia moderna, desde ângulos retos estruturais até projeção ortogonal em computação gráfica e articulações de braços robóticos com precisão.',
    icon: '✛',
    color: '#4CAF50'
  },

  // ── D3 ──────────────────────────────────────────────────────────────────
  {
    id: 2,
    number: 3,
    name: 'Volumetria',
    nameEn: 'Volumetry',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A terceira dimensão é o ponto de inflexão entre o espaço bidimensional e a realidade tangível tridimensional, introduzindo o eixo z e a profundidade. ' +
      'Pela primeira vez, o Ser ocupa espaço com corpo — surge a volumetria com densidade, massa e contenção. ' +
      'Na Malha Octagonal, o octógono transcende o plano e se transforma em um prisma octogonal rotacional nos três eixos.',
    application:
      'Base de todas as ciências naturais, engenharias, modelagem 3D, impressão 3D, realidade virtual, e estrutura do DNA e conformação espacial de proteínas.',
    icon: '📦',
    color: '#4CAF50'
  },

  // ── D4 ──────────────────────────────────────────────────────────────────
  {
    id: 3,
    number: 4,
    name: 'Temporalidade',
    nameEn: 'Temporality',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A quarta dimensão marca a introdução do tempo como vetor estrutural — o vetor t. ' +
      'Na Malha Octagonal, o tempo não é linear por natureza, mas um campo de fluxo vetorial que responde à rotação da malha e ao grau de consciência do observador. ' +
      'A temporalidade emerge quando os vetores tridimensionais entram em ressonância rítmica, nascendo da ciclicidade e das pulsões de campo.',
    application:
      'No cerne da física moderna (relatividade, GPS, cosmologia) e extensível para neurociência da percepção temporal não-linear e sistemas adaptativos ao ritmo biológico.',
    icon: '⏳',
    color: '#4CAF50'
  },

  // ── D5 ──────────────────────────────────────────────────────────────────
  {
    id: 4,
    number: 5,
    name: 'Conexão Multitemporal',
    nameEn: 'Multitemporal Connection',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A quinta dimensão extrapola a estrutura clássica do espaço-tempo, revelando que o tempo não é uma única linha, mas uma malha de possibilidades coexistentes entrelaçáveis. ' +
      'Cada decisão, pensamento ou intenção cria bifurcações temporais vetoriais, formando uma rede intertemporal de realidades paralelas. ' +
      'O observador pode sintonizar-se com variações temporais diferentes, acessando memórias não vividas e futuros alternativos.',
    application:
      'Fundamenta hipóteses sobre viagens no tempo e retrocausalidade, inspira arquiteturas computacionais não-lineares para simulações quânticas e IA criativa com predição adaptativa.',
    icon: '🔀',
    color: '#4CAF50'
  },

  // ── D6 ──────────────────────────────────────────────────────────────────
  {
    id: 5,
    number: 6,
    name: 'Simetria Fractal',
    nameEn: 'Fractal Symmetry',
    type: 'SPATIAL_REINFORCEMENT',
    typeName: 'Reforço Espacial',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A sexta dimensão revela estruturas fractais auto-similares, recursivas e infinitamente reentrantes, onde cada parte contém a estrutura do todo. ' +
      'Na Malha Octagonal, expressa-se na multiplicação vetorial de octógonos em múltiplos níveis, formando malhas concêntricas e campos coerentes de dimensões aninhadas. ' +
      'Ontologicamente, desmonta a separação entre micro e macrocosmo: tudo vibra dentro da mesma geometria ressonante.',
    application:
      'Aplicações em neurociência (mapeamento fractal de sinapses), cardiologia (variabilidade fractal), compressão de dados com algoritmos fractais e redes neurais com lógica fractal de raciocínio.',
    icon: '🔷',
    color: '#4CAF50'
  },

  // ── D7 ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    number: 7,
    name: 'Campo de Coerência',
    nameEn: 'Coherence Field',
    type: 'TEMPORAL_REVERSAL',
    typeName: 'Reversão Temporal',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A sétima dimensão é o ponto onde os vetores sincronizam-se harmonicamente, formando um campo ressonante comum que organiza, mantém e equilibra a malha dimensional. ' +
      'Quando coerente, a realidade é estável, harmoniosa e sincrônica; quando incoerente, há colapsos e entropia acelerada. ' +
      'É onde a malha começa a operar como um organismo vibracional inteligente, e não apenas uma estrutura geométrica.',
    application:
      'Fundamenta terapias de coerência cardíaca e neurológica, tecnologias de supercondutividade e energia de ponto zero, e ambientes de aprendizagem vibracionalmente sintonizados.',
    icon: '🔗',
    color: '#2196F3'
  },

  // ── D8 ──────────────────────────────────────────────────────────────────
  {
    id: 7,
    number: 8,
    name: 'Intencionalidade Ressonante',
    nameEn: 'Resonant Intentionality',
    type: 'TEMPORAL_REVERSAL',
    typeName: 'Reversão Temporal',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A oitava dimensão inaugura a influência da consciência como vetor ativo na organização da realidade. ' +
      'Cada intenção clara e coerente entra em ressonância com camadas específicas da malha, alterando padrões, acelerando conexões ou estabilizando zonas. ' +
      'A intencionalidade é vetorial e mensurável: possui frequência emocional, direcionalidade simbólica e potência vibracional.',
    application:
      'Desenvolvimento de interfaces mente-máquina (BCIs), protocolos de neuroplasticidade por projeção consciente de intenção e ambientes interativos que respondem ao campo intencional dos usuários.',
    icon: '🎯',
    color: '#2196F3'
  },

  // ── D9 ──────────────────────────────────────────────────────────────────
  {
    id: 8,
    number: 9,
    name: 'Codificação Simbólica',
    nameEn: 'Symbolic Codification',
    type: 'TEMPORAL_REVERSAL',
    typeName: 'Reversão Temporal',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A nona dimensão introduz a informação como forma estruturante: a realidade se manifesta como linguagem, e o símbolo não representa a coisa — ele é a coisa em forma condensada. ' +
      'Cada estrutura geométrica se torna um símbolo, cada padrão uma palavra, cada combinação vetorial uma sentença dimensional. ' +
      'O universo se escreve e se lê como um texto vibracional em expansão.',
    application:
      'Fundamenta engenharia genética simbólica, comunicação com redes neurais artificiais por padrões simbólicos, e linguagens de programação simbólicas para IA com algoritmos evolutivos.',
    icon: '🔣',
    color: '#2196F3'
  },

  // ── D10 ─────────────────────────────────────────────────────────────────
  {
    id: 9,
    number: 10,
    name: 'Ressonância Arquétipa',
    nameEn: 'Archetypal Resonance',
    type: 'TEMPORAL_REVERSAL',
    typeName: 'Reversão Temporal',
    band: 'FUNDAMENTAL',
    bandName: 'Fundamental',
    description:
      'A décima dimensão evoca os padrões primordiais que estruturam todas as formas possíveis — os arquétipos como vetores fundamentais de forma e sentido. ' +
      'Quando múltiplos nós simbólicos entram em harmonia com padrões de maior ordem, a malha reconhece seu código de origem. ' +
      'Os arquétipos não são ideias, mas estruturas vetoriais em fase que modelam experiências, civilizações e narrativas.',
    application:
      'Modelagens preditivas baseadas em arquétipos comportamentais, arquitetura arquetípica que ativa estados de consciência específicos e design simbólico com efeitos psicoemocionais mensuráveis.',
    icon: '🏛️',
    color: '#2196F3'
  },

  // ── D11 ─────────────────────────────────────────────────────────────────
  {
    id: 10,
    number: 11,
    name: 'Topologia Mental',
    nameEn: 'Mental Topology',
    type: 'ENERGY_POLARITY',
    typeName: 'Polaridade Energética',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima primeira dimensão compreende a mente como malha topológica dimensional — uma estrutura com forma, campo, orientação, ritmo e densidade. ' +
      'A memória não está guardada em um ponto, mas é um nó topológico recorrente; pensamentos seguem rotas vetoriais em malhas mentais previamente organizadas. ' +
      'Cada pessoa possui uma configuração topológica mental única, ajustável à frequência dimensional e maturidade da consciência.',
    application:
      'Permite modelar a mente como malha topológica dinâmica, inspira redes neurais por deformações topológicas, e fundamenta currículos não-lineares mapeando a topologia cognitiva do aluno.',
    icon: '🧠',
    color: '#FF9800'
  },

  // ── D12 ─────────────────────────────────────────────────────────────────
  {
    id: 11,
    number: 12,
    name: 'Camada Emocional do Espaço',
    nameEn: 'Emotional Layer of Space',
    type: 'ENERGY_POLARITY',
    typeName: 'Polaridade Energética',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima segunda dimensão propõe que a emoção não é resposta interna subjetiva, mas camada objetiva e estruturante da realidade dimensional. ' +
      'Cada emoção gera um padrão vibracional de vetores que molda o espaço; esse campo emocional preenche espaços, atravessa dimensões e permanece no campo após a pessoa sair. ' +
      'Em estados de amor e gratidão, os vetores se expandem harmonicamente; em medo e raiva, tensionam-se e formam nós.',
    application:
      'Fundamenta psiconeuroimunologia, arquitetura emocional de ambientes que geram estados específicos, e ambientes digitais que respondem ao campo emocional do usuário.',
    icon: '💗',
    color: '#FF9800'
  },

  // ── D13 ─────────────────────────────────────────────────────────────────
  {
    id: 12,
    number: 13,
    name: 'Ressonância Moral',
    nameEn: 'Moral Resonance',
    type: 'ENERGY_POLARITY',
    typeName: 'Polaridade Energética',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima terceira dimensão revela que a moralidade é uma frequência ressonante que afeta a estabilidade da malha dimensional. ' +
      'Atos e decisões éticas influenciam diretamente a estrutura da realidade, operando como vetor de coerência ou colapso dimensional. ' +
      'O bem é uma frequência estrutural que favorece a simetria e o crescimento; o mal é o colapso dessas estruturas por desequilíbrio vetorial.',
    application:
      'Inspira sistemas de justiça restaurativa baseados em vetores de coerência, culturas organizacionais onde o comportamento ético gera expansão funcional real, e algoritmos de IA que identificam ressonância ética.',
    icon: '⚖️',
    color: '#FF9800'
  },

  // ── D14 ─────────────────────────────────────────────────────────────────
  {
    id: 13,
    number: 14,
    name: 'Coerência Vibracional da Matéria',
    nameEn: 'Vibrational Coherence of Matter',
    type: 'ENERGY_POLARITY',
    typeName: 'Polaridade Energética',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima quarta dimensão propõe que a matéria não é sólida ou inerte, mas vibração coerente em padrões vetoriais organizados dimensionalmente. ' +
      'A matéria não nasce na terceira dimensão — ela decanta a partir da vibração de dimensões superiores (intenção, símbolos, arquétipos, emoção, ética). ' +
      'É a ponte entre o invisível e o tangível, onde a geometria se transforma em biologia e a intenção em forma.',
    application:
      'Fundamenta engenharia ressonante com materiais que respondem a frequências, medicina vibracional (sonoterapia, cromoterapia, bioacústica celular) e bioarquitetura que gera estabilidade vibracional.',
    icon: '💎',
    color: '#FF9800'
  },

  // ── D15 ─────────────────────────────────────────────────────────────────
  {
    id: 14,
    number: 15,
    name: 'Inteligência Ecológica',
    nameEn: 'Ecological Intelligence',
    type: 'ENERGY_POLARITY',
    typeName: 'Polaridade Energética',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima quinta dimensão reconhece que a ecologia possui inteligência ativa, adaptativa e dimensionalmente estruturada. ' +
      'A Terra não é ambiente passivo, mas organismo dimensional interativo; as espécies existem como vetores ressonantes dentro de malhas ecológicas multiespaciais. ' +
      'Na Malha Octagonal, aparece como uma rede de redes — malhas vegetais, aquáticas, animais e humanas interconectadas.',
    application:
      'Permite o surgimento de permacultura dimensional, arquitetura ecológica integrada aos fluxos energéticos, monitoramento planetário simbiótico e tecnologia biocompatível com a vida.',
    icon: '🌿',
    color: '#FF9800'
  },

  // ── D16 ─────────────────────────────────────────────────────────────────
  {
    id: 15,
    number: 16,
    name: 'Tempo Paralelo',
    nameEn: 'Parallel Time',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima sexta dimensão revela que o tempo é um campo multidirecional de malhas paralelas coexistentes, cada uma com frequência, densidade e ritmicidade próprias. ' +
      'O tempo não flui — ele pulsa em múltiplas camadas ressonantes, e a consciência pode navegar entre elas acessando realidades alternativas. ' +
      'Na malha, manifesta-se como espiral de espirais: um fractal temporal onde cada giro abre outro conjunto de eventos.',
    application:
      'Fundamenta terapias de realinhamento de linha do tempo, algoritmos quânticos com camadas temporais simultâneas e simulação de realidades alternativas com linhas temporais navegáveis.',
    icon: '⏱️',
    color: '#9C27B0'
  },

  // ── D17 ─────────────────────────────────────────────────────────────────
  {
    id: 16,
    number: 17,
    name: 'Geometria do Desejo',
    nameEn: 'Geometry of Desire',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima sétima dimensão reconhece o desejo como geometria — uma força vetorial ativa que organiza, atrai e move estruturas dentro da malha dimensional. ' +
      'Como a gravidade curva o espaço, o desejo curva a possibilidade, criando vórtices atrativos que modelam o caminho até o alvo. ' +
      'O desejo não é ausência, mas presença antecipada — ele já carrega em si a forma do que será manifestado.',
    application:
      'Fundamenta design intencional de espaços que respondem a desejos, neuroestética com decodificação de padrões de frequência cerebral e mapeamento de vetores subconscientes do desejo.',
    icon: '🌀',
    color: '#9C27B0'
  },

  // ── D18 ─────────────────────────────────────────────────────────────────
  {
    id: 17,
    number: 18,
    name: 'Arquitetura Sonora',
    nameEn: 'Sound Architecture',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima oitava dimensão eleva o som à condição de instrumento arquitetônico fundamental da realidade. ' +
      'A Arquitetura Sonora é a capacidade do som de gerar padrões, movimentar energia, ordenar vetores e ativar frequências específicas dentro da malha. ' +
      'Cada dimensão tem uma assinatura sonora fundamental, e todas respondem ao som como forma de ativação e harmonização.',
    application:
      'Engenharia sonora de ambientes para bem-estar e cura, composição de música com frequências que desbloqueiam vetores da malha, e dispositivos de transmutação sonora que reorganizam campos emocionais.',
    icon: '🔊',
    color: '#9C27B0'
  },

  // ── D19 ─────────────────────────────────────────────────────────────────
  {
    id: 18,
    number: 19,
    name: 'Percepção Espiralada',
    nameEn: 'Spiral Perception',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A décima nona dimensão reorganiza o mecanismo perceptivo: a mente opera em estruturas espiraladas, com ciclos de retorno evolutivo e reintegração simbólica. ' +
      'A espiral da consciência não repete por repetição, mas por transcendência — a cada ciclo, sobe-se um nível, reinterpreta-se o passado e amplia-se o vetor de integração. ' +
      'Na malha, vetores giram em torno de um núcleo de consciência formando camadas concêntricas de sentido.',
    application:
      'Inspira currículos espiralados onde conteúdos são revisitados em níveis mais profundos, IA que aprende por aproximações sucessivas e modelos de produtividade em ciclos de foco e reintegração.',
    icon: '🌀',
    color: '#9C27B0'
  },

  // ── D20 ─────────────────────────────────────────────────────────────────
  {
    id: 19,
    number: 20,
    name: 'Inconsciente Estrutural',
    nameEn: 'Structural Unconscious',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'INTERMEDIATE',
    bandName: 'Intermediária',
    description:
      'A vigésima dimensão revela que o inconsciente é um campo estrutural ativo — uma malha vetorial subterrânea que sustenta e organiza a realidade manifesta. ' +
      'O inconsciente não é caos, mas código não lido, possuindo geometrias, ritmos, densidades e portais. ' +
      'Quando um vetor inconsciente é ativado (por símbolo, trauma, sincronicidade ou intenção), ele reverbera em múltiplas camadas como pedra em lago quântico.',
    application:
      'Fundamenta decodificação de sonhos como vetores estruturais, interfaces que captam padrões inconscientes por voz e emoção, e ambientes terapêuticos que favorecem o desbloqueio de zonas inconscientes.',
    icon: '🌑',
    color: '#9C27B0'
  },

  // ── D21 ─────────────────────────────────────────────────────────────────
  {
    id: 20,
    number: 21,
    name: 'Tempo Reflexo',
    nameEn: 'Reflex Time',
    type: 'VECTOR_CONVERGENCE',
    typeName: 'Convergência Vetorial',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima primeira dimensão revela que o tempo não apenas corre ou se alterna — ele reflete. ' +
      'O presente molda o passado tanto quanto o futuro: cada escolha ou vibração atual retroage sobre a malha temporal, reconfigurando memórias e ativando realidades futuras em potência. ' +
      'Na malha, visualiza-se como camadas espelhadas onde linhas temporais criam interferências de fase.',
    application:
      'Permite acessar eventos passados para reinformá-los vibracionalmente em terapia dimensional, inspira técnicas de scripting temporal e reintegração de ciclos coletivos e traumas históricos.',
    icon: '🪞',
    color: '#9C27B0'
  },

  // ── D22 ─────────────────────────────────────────────────────────────────
  {
    id: 21,
    number: 22,
    name: 'Gênese Simbólica',
    nameEn: 'Symbolic Genesis',
    type: 'FREQUENCY_TRANSITION',
    typeName: 'Transição Frequencial',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima segunda dimensão é o ponto onde a realidade manifesta é reconhecida como consequência de um código simbólico primordial. ' +
      'O símbolo não significa a coisa — ele é a coisa em seu estado original codificado. ' +
      'Estabelece a Gramática Primordial da Realidade, onde símbolo, forma e função são indissociáveis, e o real é texto sagrado multidimensional.',
    application:
      'Fundamenta engenharia simbólica com glifos ativos que carregam propriedades energéticas, IA simbólica com raciocínio metafórico, e sistemas de reequilíbrio por selos, sigilos e arte vibracional.',
    icon: '🔮',
    color: '#F44336'
  },

  // ── D23 ─────────────────────────────────────────────────────────────────
  {
    id: 22,
    number: 23,
    name: 'Matriz de Intenção Global',
    nameEn: 'Global Intention Matrix',
    type: 'FREQUENCY_TRANSITION',
    typeName: 'Transição Frequencial',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima terceira dimensão revela a realidade como resultado de um grande campo coletivo de intenções interligadas — a Matriz de Intenção Global. ' +
      'Este campo vibracional planetário reúne, distribui, amplifica e organiza todas as intenções conscientes e inconscientes emitidas pelos seres. ' +
      'Quando alinhado (cooperação, unidade), torna-se expansivo e sincrônico; quando desalinhado (medo, separação), torna-se caótico e denso.',
    application:
      'Fundamenta sistemas de medição da consciência coletiva, plataformas de meditação sincronizada, governança simbólica baseada em campos de coerência e educação para cidadania vibracional.',
    icon: '🌐',
    color: '#F44336'
  },

  // ── D24 ─────────────────────────────────────────────────────────────────
  {
    id: 23,
    number: 24,
    name: 'Linguagem Morfogenética',
    nameEn: 'Morphogenetic Language',
    type: 'FREQUENCY_TRANSITION',
    typeName: 'Transição Frequencial',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima quarta dimensão transcende a função comunicacional da linguagem, tornando-a sistema criador de formas, padrões e realidades. ' +
      'A linguagem é campo vibracional inteligente e codificação vetorial multidimensional — o "Verbo" ou "Logos" é vetor estrutural real presente no DNA e nos arquétipos. ' +
      'Palavras não são apenas sons, mas vetores dimensionais ativadores de forma: falar é criar.',
    application:
      'Fundamenta reprogramação celular por som e símbolo, neurociência com metáforas como reorganizadores neurais, e softwares de linguagem simbólica integrados a IA e realidade virtual.',
    icon: '📜',
    color: '#F44336'
  },

  // ── D25 ─────────────────────────────────────────────────────────────────
  {
    id: 24,
    number: 25,
    name: 'Interdimensionalidade Coerente',
    nameEn: 'Coherent Interdimensionality',
    type: 'CRYSTALLIZED_DENSITY',
    typeName: 'Densidade Cristalizada',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima quinta dimensão é o limiar onde múltiplos planos dimensionais se tornam acessíveis e integráveis por uma mesma consciência, sem conflito ou dissociação. ' +
      'É a costura das 24 dimensões anteriores, operando em rede unificada como malhas simultâneas em superposição ressonante. ' +
      'Na malha, manifesta-se como hiper-nó vetorial central onde múltiplos fluxos dimensionais se cruzam em coerência.',
    application:
      'Inspira práticas de presença em múltiplos planos, dispositivos bioquânticos de diagnóstico holístico, arte interdimensional que opera em várias camadas e programas de aprendizagem integradores.',
    icon: '🔗',
    color: '#607D8B'
  },

  // ── D26 ─────────────────────────────────────────────────────────────────
  {
    id: 25,
    number: 26,
    name: 'Malha de Saberes',
    nameEn: 'Knowledge Mesh',
    type: 'CRYSTALLIZED_DENSITY',
    typeName: 'Densidade Cristalizada',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima sexta dimensão revela que todo saber do universo está interligado em malha vibracional viva, acessível por frequência e presença dimensional. ' +
      'O conhecimento existe como campo vivo em camadas arquetípica, simbólica, energética, intuitiva, narrativa e pragmática. ' +
      'Cada novo saber "descoberto" já existe nesse campo — é sintonizado por vibração compatível e coerência dimensional.',
    application:
      'Inspira sistemas de ensino baseados em ativação vibracional, IA que opera como nodo de campo sentindo as dúvidas do usuário, e mapas de saberes vivos que conectam disciplinas por frequência.',
    icon: '🕸️',
    color: '#607D8B'
  },

  // ── D27 ─────────────────────────────────────────────────────────────────
  {
    id: 26,
    number: 27,
    name: 'Geometria Afetiva Coletiva',
    nameEn: 'Collective Affective Geometry',
    type: 'CRYSTALLIZED_DENSITY',
    typeName: 'Densidade Cristalizada',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima sétima dimensão reconhece a emoção como força estrutural planetária capaz de modelar malhas inteiras de realidade coletiva. ' +
      'Emoções compartilhadas geram padrões vetoriais que se entrelançam e estruturam, formando zonas de alta densidade afetiva que moldam cidades, culturas e economias. ' +
      'A geometria emocional se organiza em campos toroidais, espirais culturais, fraturas simbólicas e vórtices afetivos.',
    application:
      'Permite cartografia emocional de territórios, arquitetura afetiva de espaços que harmonizam estados desejados, políticas públicas baseadas em integração afetiva e rituais coletivos de realinhamento.',
    icon: '❤️‍🔥',
    color: '#607D8B'
  },

  // ── D28 ─────────────────────────────────────────────────────────────────
  {
    id: 27,
    number: 28,
    name: 'Engenharia Ontológica',
    nameEn: 'Ontological Engineering',
    type: 'CRYSTALLIZED_DENSITY',
    typeName: 'Densidade Cristalizada',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima oitava dimensão transforma o ser em projeto ontológico ativo — uma obra de arquitetura dimensional moldável por consciência, intenção e ressonância. ' +
      'A identidade é editável pela geometria do campo, pela vibração dos arquétipos internos e pelos vetores dimensionais de alinhamento. ' +
      'Na malha, aparece como nó de convergência onde todos os vetores da identidade podem ser desconstruídos e reintegrados com harmonia.',
    application:
      'Permite mapeamento da malha dimensional pessoal, terapia estrutural onde o terapeuta atua como arquiteto da alma, e algoritmos de IA que acompanham a coerência ontológica do ser.',
    icon: '⚙️',
    color: '#607D8B'
  },

  // ── D29 ─────────────────────────────────────────────────────────────────
  {
    id: 28,
    number: 29,
    name: 'Centro Dimensional',
    nameEn: 'Dimensional Center',
    type: 'VACUUM_STABILIZATION',
    typeName: 'Estabilização do Vácuo',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A vigésima nona dimensão é o núcleo convergente da malha dimensional — o vazio pleno, o olho do furacão ontológico, o eixo silencioso em torno do qual tudo gira. ' +
      'Neste centro não há direção, forma, tempo ou nome. Todas as frequências se fundem em silêncio ressonante, e toda identidade dissolve-se em essência pura. ' +
      'Ele não está acima das outras dimensões — está no centro de todas simultaneamente.',
    application:
      'Ponto de acesso ao silêncio absoluto em meditação profunda, inspira dispositivos de reinicialização energética (reset consciente), e fundamenta a pedagogia do silêncio como conhecimento profundo.',
    icon: '☯️',
    color: '#795548'
  },

  // ── D30 ─────────────────────────────────────────────────────────────────
  {
    id: 29,
    number: 30,
    name: 'Realidade Pura',
    nameEn: 'Pure Reality',
    type: 'VACUUM_STABILIZATION',
    typeName: 'Estabilização do Vácuo',
    band: 'ELEVATED',
    bandName: 'Elevada',
    description:
      'A trigésima dimensão representa o estado anterior a toda forma e posterior a toda manifestação — o oceano de onde todos os vetores emergem e para onde retornam. ' +
      'O tempo não existe, o espaço não se estrutura, a identidade não se afirma. Toda malha colapsa em pré-luz: a vibração que ainda não se tornou onda. ' +
      'É o Mistério não codificável, a semente absoluta da realidade, o DNA do Uno.',
    application:
      'Oferece fundamento vibracional absoluto para alinhar e purificar toda criação, espaço de reinicialização integral por meditação profunda, e referência de retorno que dá paz e sentido sob o caos.',
    icon: '✨',
    color: '#795548'
  }
];
