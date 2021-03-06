const axios = require('axios');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer();

/* POST checkKey api endpoint. */
router.post('/api/games/checkKey', function(req, res, next) {
  var validKeys = ['25D4755C-ED3D-48BF-9E5A-96744C6BE206'];
  var gameIds = ['54965D4D-9C57-475D-BDA0-2D2EFB1CEE68'];
  if (validKeys.indexOf(req.body.key) === -1) res.send('{"result": false}');
  else if (gameIds.indexOf(req.body.gameId) === -1) res.send('{"result": false}');
  else res.send('{"result": true}');
});

/* POST checkKey api endpoint. */
router.post('/api/games/postScore', function(req, res, next) {
  var validKeys = ['25D4755C-ED3D-48BF-9E5A-96744C6BE206'];
  var gameIds = ['54965D4D-9C57-475D-BDA0-2D2EFB1CEE68'];
  if (validKeys.indexOf(req.body.key) === -1) res.send('{"result": false}');
  else if (gameIds.indexOf(req.body.gameId) === -1) res.send('{"result": false}');
  else if (req.body.score === undefined) res.send('{"result": false}');
  else if (isNaN(req.body.score)) res.send('{"result": false}');
  else res.send('{"result": true}');
});

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

/* GET reset password page. */
router.get('/reset_password', function(req, res, next) {
  res.render('profile/reset_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  res.render('privacy', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET terms page. */
router.get('/terms', function(req, res, next) {
  res.render('terms', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET sign out page. */
router.get('/signout', function(req, res, next) {
  res.redirect('/');
});

/* GET home page. */
router.get('/:userRole/home', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('home/home', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'home',
    loggedIn: true,
    homePage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET assignments page. */
router.get('/:userRole/assignments/assignments', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('assignments/assignments', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'assignments',
    loggedIn: true,
    assignmentsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET track resources page. */
router.get('/:userRole/tracking/resources', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('tracking/resources', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tracking',
    loggedIn: true,    
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET track resources page. */
router.get('/:userRole/resources/resources', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('resources/resources', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'resources',
    loggedIn: true,
    resourcesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET reports page. */
router.get('/:userRole/reports/reports', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  var reportType = req.query.type;
  var proficiencyReport = (reportType === 'proficiency');
  var usageReport = (reportType === 'usage');
  res.render('reports/reports', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'reports',
    loggedIn: true,
    reportsPage: true,
    proficiencyReport: proficiencyReport,
    usageReport: usageReport,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET manage school page. */
router.get('/:userRole/administration/manage_school', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/manage_school', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    schoolPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET manage user account page. */
router.get('/:userRole/administration/manage_user_account', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/manage_user_account', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    userAccountPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET manage form class page. */
router.get('/:userRole/administration/manage_form_class', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/manage_form_class', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    formClassPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET manage school group page. */
router.get('/:userRole/administration/manage_school_group', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/manage_school_group', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    schoolGroupPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET login as student page. */
router.get('/:userRole/administration/login_as_student', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/login_as_student', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    loginAsStudentPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET login as student page. */
router.get('/:userRole/administration/login_as_teacher', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/login_as_teacher', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    loginAsTeacherPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view class page. */
router.get('/:userRole/class', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/class', {
    layout: 'teacher/class_layout',
    title: 'Marshall Cavendish Education',
    module: 'class',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view user page. */
router.get('/:userRole/user', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/user', {
    layout: 'teacher/user_layout',
    title: 'Marshall Cavendish Education',
    module: 'user',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET update avatar page. */
router.get('/:userRole/profile/update_profile_picture', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/update_profile_picture', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    profilePage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET update personal particulars page. */
router.get('/:userRole/profile/update_personal_particulars', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/update_personal_particulars', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    profilePage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET update personal preferences page. */
router.get('/:userRole/profile/update_personal_settings', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/update_personal_settings', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    profilePage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET change password page. */
router.get('/:userRole/profile/change_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/change_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    passwordPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET reset student password page. */
router.get('/:userRole/profile/reset_student_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/reset_student_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    passwordPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET reset student password page. */
router.get('/:userRole/profile/reset_teacher_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/reset_teacher_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    passwordPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view subject page. */
router.get('/subject', function(req, res, next) {
  res.render('subject/subject', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'subject',
    loggedIn: true,
    userRole: userRole
  });
});

/* GET lessons page. */
router.get('/:userRole/lessons/lessons', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('lessons/lessons', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'lessons',
    loggedIn: true,
    lessonsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET create lesson page. */
router.get('/:userRole/lessons/create_lesson', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('lessons/create_lesson', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'lessons',
    loggedIn: true,
    lessonsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET add mylibrary page. */
router.get('/shared/add_library_resources', function(req, res, next) {
  res.render('shared/add_library_resources', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET add myresources page. */
router.get('/shared/add_resources', function(req, res, next) {
  res.render('shared/add_resources', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET add mytests page. */
router.get('/shared/add_tests', function(req, res, next) {
  res.render('shared/add_tests', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET create test page. */
router.get('/shared/create_test', function(req, res, next) {
  res.render('shared/create_test', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET add questions page. */
router.get('/shared/add_questions', function(req, res, next) {
  res.render('shared/add_questions', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET add myfiles page. */
router.get('/shared/add_files', function(req, res, next) {
  res.render('shared/add_files', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET add google page. */
router.get('/shared/add_google', function(req, res, next) {
  res.render('shared/add_google', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET search google page. */
router.get('/shared/search_google', function(req, res, next) {
  var keyword = req.query.keyword;
  var url = 'https://www.googleapis.com/customsearch/v1?q=' + keyword
    + '&key=AIzaSyCXd3M-Cb0KvyBMKTNS23nfaoiez6l51Go&cx=011138866815983095785%3Abvwtd3ixiqy';
  var request = axios.create({
    headers: {
      'X-Origin': 'https://developers.google.com',
      'X-Referer': 'https://developers.google.com',
      'Referer': 'https://content.googleapis.com'
    }
  });
  request.get(url)
    .then(function(response) {
      res.send(JSON.stringify(response.data));
    })
    .catch('error', (error) => {
      res.send(error);
    });
});

/* GET add youtube page. */
router.get('/shared/add_youtube', function(req, res, next) {
  res.render('shared/add_youtube', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET search youtube page. */
router.get('/shared/search_youtube', function(req, res, next) {
  var keyword = req.query.keyword;
  var url = 'https://content.googleapis.com/youtube/v3/search?part=snippet&q=' + keyword
    + '&type=video&key=AIzaSyCXd3M-Cb0KvyBMKTNS23nfaoiez6l51Go';
  var request = axios.create({
    headers: {
      'X-Origin': 'https://developers.google.com',
      'X-Referer': 'https://developers.google.com',
      'Referer': 'https://content.googleapis.com'
    }
  });
  request.get(url)
    .then(function(response) {
      res.send(JSON.stringify(response.data));
    })
    .catch('error', (error) => {
      res.send(error);
    });
});

/* GET assign resource page. */
router.get('/shared/assign_resource', upload.any(), function(req, res, next) {
  res.render('shared/assign_resource', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET track lesson page. */
router.get('/shared/track_lesson', upload.any(), function(req, res, next) {
  res.render('shared/track_lesson', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET track lesson user page. */
router.get('/shared/track_lesson_user', upload.any(), function(req, res, next) {
  var referrer = req.get('Referrer');
  var assignmentsPage = referrer.endsWith('/assignments/assignments');
  res.render('shared/track_lesson_user', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared',
    assignmentsPage: assignmentsPage
  });
});

/* GET track test page. */
router.get('/shared/track_test', upload.any(), function(req, res, next) {
  res.render('shared/track_test', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET track test user page. */
router.get('/shared/track_test_user', upload.any(), function(req, res, next) {
  var referrer = req.get('Referrer');
  var assignmentsPage = referrer.endsWith('/assignments/assignments');
  res.render('shared/track_test_user', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared',
    assignmentsPage: assignmentsPage
  });
});

/* GET upload page. */
router.post('/shared/upload', upload.any(), function(req, res, next) {
  res.send('{"status": "OK", "location": "/static/images/user.png"}');
});

/* GET tests page. */
router.get('/:userRole/tests/tests', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('tests/tests', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tests',
    loggedIn: true,
    testsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET create test page. */
router.get('/:userRole/tests/create_test', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('tests/create_test', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tests',
    loggedIn: true,
    testsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET questions page. */
router.get('/:userRole/questions/questions', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('questions/questions', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'questions',
    loggedIn: true,
    questionsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET create question page. */
router.get('/:userRole/questions/create_question', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  var questionType = req.query.type;
  var mcqQuestion = (questionType === 'MCQ');
  var mrqQuestion = (questionType === 'MRQ');
  var tfqQuestion = (questionType === 'TFQ');
  var fibQuestion = (questionType === 'FIB');
  var essayQuestion = (questionType === 'ESSAY');
  res.render('questions/create_question', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'questions',
    loggedIn: true,
    questionsPage: true,
    mcqQuestion: mcqQuestion,
    mrqQuestion: mrqQuestion,
    tfqQuestion: tfqQuestion,
    fibQuestion: fibQuestion,
    essayQuestion: essayQuestion,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET assignment page. */
router.get('/:userRole/assignments/assignment', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('assignments/assignment', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'assignments',
    loggedIn: true,
    testsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET announcements page. */
router.get('/:userRole/announcements/announcements', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('announcements/announcements', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'announcements',
    loggedIn: true,
    announcementsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET notifications page. */
router.get('/:userRole/notifications/notifications', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('notifications/notifications', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'notifications',
    loggedIn: true,
    notificationsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET add booking page. */
router.get('/:userRole/facilities/add_booking', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('facilities/add_booking', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'facility-booking',
    loggedIn: true,
    facilitiesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET facility bookings page. */
router.get('/:userRole/facilities/bookings', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('facilities/bookings', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'facility-booking',
    loggedIn: true,
    facilitiesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET pdf viewer page. */
router.get('/viewers/pdf_viewer', function(req, res, next) {
  res.render('viewers/pdf_viewer', {
    layout: '',
    title: 'Marshall Cavendish Education',
    module: 'viewers'
  });
});

/* GET logging page. */
router.post('/logging', function(req, res) {
  console.log('loggin messages...');
  res.send('{status: "OK"}');
});

/* GET games page. */
router.get('/:userRole/achievements/games', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('achievements/games', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'achievements',
    loggedIn: true,
    achievementsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET legacy page. */
router.get('/:userRole/legacy/legacy', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('legacy/legacy', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'legacy',
    loggedIn: true,
    legacyPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET legacy module page. */
router.get('/shared/legacy', function(req, res, next) {
  res.render('shared/legacy', {
    layout: 'iframe_layout',
    title: 'Marshall Cavendish Education',
    module: 'shared'
  });
});

/* GET 404 error page. */
router.get('*', function(req, res) {
  var url = req.originalUrl;
  var loggedIn = (/^\/(admin|teacher|student)\//i).test(url);

  if (loggedIn) {
    var userRole = (/^\/(admin|teacher|student)\//i).exec(url)[1];
    var studentUser = (userRole === 'student');
    var teacherUser = (userRole === 'teacher');
    var adminUser = (userRole === 'admin');
    res.render('errors/404', {
      layout: 'layout',
      title: 'Marshall Cavendish Education',
      module: 'error',
      loggedIn: true,
      errorPage: true,
      userRole: userRole,
      studentUser: studentUser,
      teacherUser: teacherUser,
      adminUser: adminUser
    });
  } else {
    res.render('errors/404', {
      layout: 'layout',
      title: 'Marshall Cavendish Education',
      module: 'error',
      loggedIn: false,
      errorPage: true
    });
  }
});

module.exports = router;
