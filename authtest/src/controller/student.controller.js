const express = require("express");
const studentschema = require("../models/studentschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createStudent = async (req, res) => {
  const { name, email, department, age, password } = req.body;
  console.log(name, email, department, age, password);

  const verifyEmail = await studentschema.findOne({ email: email });

  //generate matric number
  const dept = department.slice(0, 3);
  const currentYear = new Date().getFullYear();
  const randomInteger = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  const matnum = `${dept}/${randomInteger}/${currentYear}`;
  console.log(matnum);

  try {
    if (verifyEmail) {
      return res
        .status(403)
        .json({ message: "Email already exists", success: false });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hashresult) => {
          const student = new studentschema({
            matric_number: matnum,
            name: name,
            email: email,
            department: department,
            age: age,
            password: hashresult,
          });
          student.save().then((response) => {
            return res.status(201).json({
              message: "Student created successfully",
              success: true,
              data: response,
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  } catch (err) {
    return res.status(412).send({
      message: "Error creating student",
      success: false,
      error: err,
    });
  }
};

module.exports = { createStudent };
