var express = require('express');
var router = express.Router();
const studentModel = require('../model/studentModel')
const multer = require('multer');
const { get } = require('mongoose');

multer 
let storage = multer.diskStorage({
  destination: function(req,res, cb){
    cb(null, './public/images')
  },
  filename: function(req, file , cb){
    cb(null, `${file.fieldname}-${Date.now()}.jpg`)
  }
})

router.get('/', async (req,res,next)=>{
  let student = await studentModel.find({})
  res.render('student/index', {student})
})

const upload = multer({storage: storage});

router.get('/create',(req,res)=>{
  res.render('student/create')
})

router.post('/create',upload.single('image'), async (req,res)=>{
  const body = req.body
  const file = req.file
  let stu = new studentModel({
    fullname : body.fullname,
    email: body.email,
    phone: body.phone,
    address: body.address,
    image: file.filename

  })
  await stu.save()
  res.redirect('/student')  
})

router.get('/update/:id',async (req,res)=>{
  const students = await studentModel.findById(req.params.id)
  res.render('student/update',{students})
})

router.post('/update/:id',upload.single('image'), async (req,res)=>{
  const body = req.body
  const file = req.file
  if(!file){
    await studentModel.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/student')
  }
  else{
    let stu = {
      fullname : body.fullname,
      email: body.email,
      phone: body.phone,
      address: body.address,
      image: file.filename
    }
    await studentModel.findByIdAndUpdate(req.params.id,stu)
    res.redirect('/student')  
  }
})
router.get('/delete/:id', async(req, res, next) => {
  await studentModel.deleteOne({_id: req.params.id});
  res.redirect('/student');
})

module.exports = router



