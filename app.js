/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-spaces */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');

// eslint-disable-next-line no-unused-vars
const  halamanModel = require('./models/halaman_model');
const  userModel = require('./models/user_model');
const  menuModel = require('./models/menu_model');
const  identitasModel = require('./models/identitas_model');
const  linkModel = require('./models/link_model');
const  aksescepatModel = require('./models/aksescepat_model');
const  sopModel = require('./models/sop_model');
const  downloadModel = require('./models/download_model');
const  albumModel = require('./models/album_model');
const  agendaModel = require('./models/agenda_model');
const  kegiatanModel = require('./models/kegiatan_model');
const  beritaModel = require('./models/berita_model');
const  posisiModel = require('./models/posisi_model');
const  panduanModel = require('./models/panduan_model');
const  visitormessageModel = require('./models/visitormessage_model');
const  msdesainindustriModel = require('./models/msdesainindustri_model');
const  ddesainindustriModel = require('./models/ddesainindustri_model');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const halamanRouter = require('./routes/halaman');
const menuRouter = require('./routes/menu');
const identitasRouter = require('./routes/identitas');
const linkRouter = require('./routes/link');
const aksescepatRouter = require('./routes/aksescepat');
const sopRouter = require('./routes/sop');
const downloadRouter = require('./routes/download');
const albumRouter = require('./routes/album');
const agendaRouter = require('./routes/agenda');
const kegiatanRouter = require('./routes/kegiatan');
const beritaRouter = require('./routes/berita');
const dashboardRouter = require('./routes/dashboard');
const getRouter = require('./routes/lib/download');
const panduanRouter = require('./routes/panduan');
const visitormessageRouter = require('./routes/visitormessage');
const desainindustriRouter = require('./routes/desainindustri');
const ddesainindustriRouter = require('./routes/ddesainindustri');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/halaman', halamanRouter);
app.use('/menu', menuRouter);
app.use('/identitas', identitasRouter);
app.use('/link', linkRouter);
app.use('/aksescepat', aksescepatRouter);
app.use('/sop', sopRouter);
app.use('/download', downloadRouter);
app.use('/album', albumRouter);
app.use('/agenda', agendaRouter);
app.use('/kegiatan', kegiatanRouter);
app.use('/berita', beritaRouter);
app.use('/dashboard', dashboardRouter);
app.use('/lib/download', getRouter);
app.use('/panduan', panduanRouter);
app.use('/visitormessage', visitormessageRouter);
app.use('/desainindustri', desainindustriRouter);
app.use('/ddesainindustri', ddesainindustriRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({
      force: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
