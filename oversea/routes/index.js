var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
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
  res.render('reports/reports', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'reports',
    loggedIn: true,
    reportsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET administration page. */
router.get('/:userRole/administration/administration', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('administration/administration', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'administration',
    loggedIn: true,
    adminPage: true,
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
    adminPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET tools page. */
router.get('/:userRole/tools', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/tools', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tools',
    loggedIn: true,
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
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET update personal preferences page. */
router.get('/:userRole/profile/update_personal_preferences', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/update_personal_preferences', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
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

/* GET 404 error page. */
router.get('*', function(req, res){
  res.render('errors/404', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'error'
  });
});

module.exports = router;
