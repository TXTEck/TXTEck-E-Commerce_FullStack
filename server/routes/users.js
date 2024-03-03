const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')  // needed for password encryption

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer = require('multer')
const upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

const emptyFolder = require('empty-folder')





router.get(`/users`, (req, res) => {   
    usersModel.find((error, data) => {
        if(error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(data);
        }
    });
});



// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, (req, res) => {
    usersModel.deleteMany({}, (error, data) => {
        if (data) {
            const adminPassword = `123!"£qweQWE`
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                usersModel.create({ name: "Administrator", email: "admin@admin.com", password: hash, accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN) }, (createError, createData) => {
                    if (createData) {
                        emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) =>
                        {
                            res.json(createData)
                        })
                    }
                    else {
                        res.json({ errorMessage: `Failed to create Admin user for testing purposes` })
                    }
                })
            })
        }
        else {
            res.json({ errorMessage: `User is not logged in` })
        }
    })
})


router.post(`/users/register/:name/:email/:password/:address`, upload.single("profilePhoto"), (req, res) => {
    if (!req.file) {
        res.json({ errorMessage: `No file was selected to be uploaded` })
    }
    else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => { res.json({ errorMessage: `Only .png, .jpg and .jpeg format accepted` }) })
    }
    else {
        // If a user with this email does not already exist, then create new user
        usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
            if (uniqueData) {
                res.json({ errorMessage: `User already exists` })
            }
            else {
                bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                    usersModel.create({ name: req.params.name, email: req.params.email, password: hash,profilePhotoFilename:req.file.filename,address: req.params.address }, (error, data) => {
                        if (data) {
                            const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })
                            fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => 
                            {
                                res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:fileData, token:token})
                            })
                        }
                        else {
                            res.json({ errorMessage: `User was not registered` })
                        }
                    })
                })
            }
        })
    }
})


router.post(`/users/login/:email/:password`, (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })
                    console.log(data)
                    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhotoFilename}`, 'base64', (err, fileData) => 
                            {
                                console.log("fileData", fileData)
                                res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:fileData, token:token})
                            })
                }
                else {
                    res.json({ errorMessage: `User is not logged in` })
                }
            })
        }
        else {
            console.log("not found in db")
            res.json({ errorMessage: `User is not logged in` })
        }
    })
})

router.delete(`/users/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage: `User is not logged in`});
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {
                usersModel.findByIdAndRemove(req.params.id, (error, data) => 
                {
                    if (!error) {
                        res.json({message: "User deleted successfully"});
                    } else {
                        res.status(500).json({errorMessage: "Error deleting user"});
                    }
                })
            }
            else
            {
                res.json({errorMessage: `User is not an administrator, so they cannot delete records`});
            }        
        }
    })
});



router.post(`/users/logout`, (req, res) => {
    res.json({})
})


module.exports = router