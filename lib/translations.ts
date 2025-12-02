export const translations = {
  pt: {
    // Header
    home: "Início",
    questions: "Questões",
    content: "Conteúdos",
    contribute: "Atribuir",
    login: "Entrar",
    logout: "Sair",

    // Auth
    teacherArea: "Área do Professor",
    authSubtitle: "Entre ou cadastre-se para acessar a plataforma",
    authentication: "Autenticação",
    exclusiveAccess: "Acesso exclusivo para professores",
    email: "Email",
    password: "Senha",
    fullName: "Nome Completo",
    specialty: "Especialidade",
    selectSpecialty: "Selecione sua especialidade",
    register: "Cadastrar",
    registering: "Cadastrando...",
    entering: "Entrando...",
    minChars: "Mínimo 6 caracteres",

    // Email verification
    emailVerificationTitle: "Verifique seu Email",
    emailVerificationMessage:
      "Enviamos um link de confirmação para seu email. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta antes de fazer login.",
    emailVerificationNote: "Não esqueça de verificar a pasta de spam!",

    // Specialties
    mathematics: "Matemática",
    portuguese: "Português",
    history: "História",
    geography: "Geografia",
    biology: "Biologia",
    physics: "Física",
    chemistry: "Química",
    english: "Inglês",
    specialEducation: "Educação Especial",
    pedagogy: "Pedagogia",
    other: "Outro",
  },
  en: {
    // Header
    home: "Home",
    questions: "Questions",
    content: "Content",
    contribute: "Contribute",
    login: "Login",
    logout: "Logout",

    // Auth
    teacherArea: "Teacher Area",
    authSubtitle: "Login or register to access the platform",
    authentication: "Authentication",
    exclusiveAccess: "Exclusive access for teachers",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    specialty: "Specialty",
    selectSpecialty: "Select your specialty",
    register: "Register",
    registering: "Registering...",
    entering: "Logging in...",
    minChars: "Minimum 6 characters",

    // Email verification
    emailVerificationTitle: "Verify Your Email",
    emailVerificationMessage:
      "We sent a confirmation link to your email. Please check your inbox and click the link to activate your account before logging in.",
    emailVerificationNote: "Don't forget to check your spam folder!",

    // Specialties
    mathematics: "Mathematics",
    portuguese: "Portuguese",
    history: "History",
    geography: "Geography",
    biology: "Biology",
    physics: "Physics",
    chemistry: "Chemistry",
    english: "English",
    specialEducation: "Special Education",
    pedagogy: "Pedagogy",
    other: "Other",
  },
  es: {
    // Header
    home: "Inicio",
    questions: "Preguntas",
    content: "Contenidos",
    contribute: "Contribuir",
    login: "Entrar",
    logout: "Salir",

    // Auth
    teacherArea: "Área del Profesor",
    authSubtitle: "Inicie sesión o regístrese para acceder a la plataforma",
    authentication: "Autenticación",
    exclusiveAccess: "Acceso exclusivo para profesores",
    email: "Correo electrónico",
    password: "Contraseña",
    fullName: "Nombre Completo",
    specialty: "Especialidad",
    selectSpecialty: "Seleccione su especialidad",
    register: "Registrarse",
    registering: "Registrando...",
    entering: "Entrando...",
    minChars: "Mínimo 6 caracteres",

    // Email verification
    emailVerificationTitle: "Verifique su Correo Electrónico",
    emailVerificationMessage:
      "Enviamos un enlace de confirmación a su correo electrónico. Por favor, revise su bandeja de entrada y haga clic en el enlace para activar su cuenta antes de iniciar sesión.",
    emailVerificationNote: "¡No olvide revisar la carpeta de spam!",

    // Specialties
    mathematics: "Matemáticas",
    portuguese: "Portugués",
    history: "Historia",
    geography: "Geografía",
    biology: "Biología",
    physics: "Física",
    chemistry: "Química",
    english: "Inglés",
    specialEducation: "Educación Especial",
    pedagogy: "Pedagogía",
    other: "Otro",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.pt
