const express = require('express')
const productModel = require('../models/products')
const { productSchema } = require('../validations/product.validation');

const allProducts = (req, res) => {
  productModel.find((err, products) =>{
    if(!err)
      res.render('products', {products})
    else
      console.log(`Error occured: ${err}`)
  })
}

const addProduct = (req, res) => {
  if(req.body._id == '')
    insertProduct(req, res)
  else
    updateProduct(req, res)
}

const singelProduct = (req, res) =>{
  productModel.findById(req.params.id, (err, product) => {
    if(!err)
      res.render('addProduct', {product})
    else
      console.log(`Error Occured: ${err}`)
  })
}

//insert product
function insertProduct(req, res){

  const error_msg = [];
  const params = req.body;

  const { error } = productSchema.validate(params, { abortEarly: false });


  if(error){
      error.details.map(err => error_msg.push(err.message));
      //res.status(404).json({ errors: error_msg });    
  console.log({errors: error_msg})
    }


  const newProduct = new productModel()
  newProduct.name = req.body.name
  newProduct.details = req.body.details
  newProduct.amount = req.body.amount

  newProduct.save((err, doc) => {
    if(!err){
      res.redirect('/products/list')
      console.log("no error!")
    }
    else
      if(err.name === 'ValidationError'){
        handleError(err, req)
        res.render('addproduct', {
          product: req.body
        })
      }
      else
        console.log(`Error occured: ${err}`)
  })
}

//update product
function updateProduct(req, res){
  // const error_msg = [];
  // const params = req.body;

  // const { error } = productSchema.validate(params, { abortEarly: false });


  productModel.updateOne({_id: req.body._id}, req.body, {new: true, runValidators: true}, (err) => {
    if(!err)
      res.redirect('/products/list')
    else {
      if(err.name === 'ValidationError'){
        handleError(err, req)
        res.render('addproduct', {
          product: req.body
        })
      }
      else
        console.log(`Error Occured: ${err}`)
    }
  })
}

// Check Errors
function handleError(err, req){
  for(let field in err.errors){
    switch(err.errors[field].path){
      case 'name':
          req.body.nameError = err.errors[field].message
          break;
      case 'details':
          req.body.detailsError = err.errors[field].message
          break;
      case 'amount':
          req.body.amountError = err.errors[field].message
      default:
          break;
    }
  }
}

module.exports = {allProducts, addProduct, singelProduct}